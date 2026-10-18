import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

function showRun(index) {
  document.querySelectorAll('.run-state').forEach((el, i) => {
    el.hidden = i !== index;
  });
  document.querySelectorAll('.ticks li').forEach((el, i) => {
    el.classList.toggle('on', i <= Math.max(0, index - 3));
  });
}

function showStep(index) {
  document.querySelectorAll('[data-go]').forEach(btn => {
    const on = Number(btn.dataset.go) === index;
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  document.querySelectorAll('[data-artifact]').forEach(el => {
    el.hidden = Number(el.dataset.artifact) !== index;
  });
}

const compare = document.getElementById('compare-range');
const clip = document.getElementById('before-clip');
const frame = document.getElementById('compare-frame');
function sizeCompare() {}
function setCompare(value) {
  if (!clip) return;
  const pct = Math.max(12, Math.min(88, Number(value) || 50));
  clip.style.width = pct + '%';
  const img = clip.querySelector('img');
  if (img) img.style.width = (10000 / pct) + '%';
  if (compare) compare.setAttribute('aria-valuetext', Math.round(pct) + ' percent owner screen');
}
if (compare) {
  sizeCompare();
  setCompare(compare.value);
  compare.addEventListener('input', () => setCompare(compare.value));
  addEventListener('resize', sizeCompare);
}

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
function selectTab(id) {
  const show = document.getElementById(id)?.getAttribute('aria-controls');
  tabs.forEach(tab => {
    const on = tab.id === id;
    tab.setAttribute('aria-selected', String(on));
    tab.classList.toggle('fill', on);
  });
  panels.forEach(panel => { panel.hidden = panel.id !== show; });
}
tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab.id)));
if (tabs[0]) selectTab(tabs[0].id);

const copyBtn = document.getElementById('copy-cmd');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    const panel = panels.find(item => !item.hidden);
    const text = panel ? panel.textContent : '';
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Command copied.';
    } catch {
      status.textContent = 'Copy did not work. Select the command and copy it yourself.';
    }
  });
}

document.querySelectorAll('[data-go]').forEach(btn => {
  btn.addEventListener('click', () => showStep(Number(btn.dataset.go)));
});

document.querySelectorAll('[data-transition]').forEach(link => {
  link.addEventListener('click', event => {
    if (reduced || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const wipe = document.querySelector('.wipe');
    gsap.to(wipe, {
      yPercent: -100,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => { location.href = link.href; },
    });
  });
});

if (!reduced && document.getElementById('run')) {
  if (fine) {
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  ScrollTrigger.create({
    trigger: '#run',
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: true,
    onUpdate: self => showRun(Math.min(4, Math.floor(self.progress * 5))),
  });
  const steps = document.querySelectorAll('[data-artifact]').length;
  ScrollTrigger.create({
    trigger: '#process',
    start: 'top top',
    end: '+=180%',
    pin: true,
    scrub: true,
    onUpdate: self => showStep(Math.min(steps - 1, Math.floor(self.progress * steps))),
  });
  ScrollTrigger.create({
    trigger: '#product',
    start: 'top 70%',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => { window.__keelExplode = self.progress; },
  });
}

const canvas = document.getElementById('view');
const poster = document.querySelector('[data-poster]');
let yaw = 0.7;
let pitch = 0.35;
let explode = 0;
let model = null;
const base = new Map();

function showPoster() {
  if (canvas) canvas.hidden = true;
  if (poster) poster.hidden = false;
}

document.getElementById('orbit')?.addEventListener('click', () => { yaw += 0.7; });

if (reduced || !canvas) {
  showPoster();
} else {
  try {
    const stage = canvas.parentElement;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0xf3f0e8, 1);
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f0e8);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    scene.add(new THREE.HemisphereLight(0xfff6ea, 0x2a2926, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3.2, 5.2, 2.4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd5dbe8, 0.7);
    fill.position.set(-3.4, 1.4, -2);
    scene.add(fill);
    const gltf = await new GLTFLoader().loadAsync('/models/keel.glb');
    model = gltf.scene;
    ['body', 'collar', 'cap'].forEach(name => {
      const part = model.getObjectByName(name);
      if (part) base.set(name, part.position.y);
    });
    scene.add(model);
    canvas.hidden = false;
    if (poster) poster.hidden = true;
    function size() {
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, canvas.clientHeight || 460);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    size();
    addEventListener('resize', size);
    let dragging = false;
    let lx = 0;
    let ly = 0;
    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      lx = event.clientX;
      ly = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointerup', () => { dragging = false; });
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      yaw += (event.clientX - lx) * 0.01;
      pitch = Math.max(0.05, Math.min(1.1, pitch + (event.clientY - ly) * 0.005));
      lx = event.clientX;
      ly = event.clientY;
    });
    function place() {
      explode = window.__keelExplode || 0;
      const radius = 3.5;
      const cos = Math.cos(pitch);
      camera.position.set(Math.sin(yaw) * cos * radius, 0.85 + Math.sin(pitch) * 1.4, Math.cos(yaw) * cos * radius);
      camera.lookAt(0, 0.55, 0);
      model.rotation.y = explode * Math.PI * 0.85;
      base.forEach((y, name) => {
        const part = model.getObjectByName(name);
        if (!part || name === 'body') return;
        part.position.y = y + explode * (name === 'cap' ? 0.85 : 0.38);
      });
    }
    function loop() {
      if (!document.hidden) {
        place();
        renderer.render(scene, camera);
      }
      requestAnimationFrame(loop);
    }
    place();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  } catch {
    showPoster();
  }
}
