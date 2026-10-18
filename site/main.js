import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

function showRun(index) {
  document.querySelectorAll('.run-state').forEach((el, i) => {
    el.hidden = i !== index;
  });
  window.__activeSheet = index;
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
function sizeCompare() {
  if (!frame) return;
  const fullW = frame.clientWidth;
  const fullH = frame.clientHeight;
  frame.querySelectorAll('img').forEach(img => {
    img.style.width = fullW + 'px';
    img.style.height = fullH + 'px';
  });
}
function setCompare(value) {
  if (!clip) return;
  const pct = Math.max(8, Math.min(92, Number(value) || 50));
  clip.style.width = pct + '%';
  sizeCompare();
  if (compare) compare.setAttribute('aria-valuetext', Math.round(pct) + ' percent owner screen');
}
if (compare) {
  setCompare(compare.value);
  compare.addEventListener('input', () => setCompare(compare.value));
  addEventListener('resize', () => setCompare(compare.value));
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

const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
if (menu && navLinks) {
  menu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

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

if (reduced) {
  document.querySelectorAll('.run-state, .artifact').forEach(el => { el.hidden = false; });
  document.querySelectorAll('.scene, .process').forEach(el => el.classList.add('flat'));
} else if (document.getElementById('run')) {
  if (fine) {
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  gsap.from('.scene h1 .line', {
    yPercent: 110,
    duration: 0.8,
    stagger: 0.07,
    ease: 'power3.out',
  });
  document.querySelectorAll('[data-act] h2 .line').forEach(line => {
    gsap.from(line, {
      yPercent: 110,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: line, start: 'top 86%' },
    });
  });
  ScrollTrigger.create({
    trigger: '#run',
    start: 'top top',
    end: () => '+=' + window.innerHeight * 3,
    pin: true,
    scrub: true,
    onUpdate: self => {
      showRun(Math.min(4, Math.floor(self.progress * 5)));
      window.__fileLift = self.progress;
    },
  });
  const steps = document.querySelectorAll('[data-artifact]').length || 1;
  ScrollTrigger.create({
    trigger: '#process',
    start: 'top top',
    end: () => '+=' + window.innerHeight * 2.4,
    pin: true,
    scrub: true,
    onUpdate: self => showStep(Math.min(steps - 1, Math.floor(self.progress * steps))),
  });
}

const canvas = document.getElementById('view');
const poster = document.querySelector('[data-poster]');
let yaw = 0.62;
let pitch = 0.62;

function showPoster() {
  if (canvas) canvas.hidden = true;
  if (poster) poster.hidden = false;
}

document.getElementById('orbit')?.addEventListener('click', () => { yaw += 0.65; });

if (reduced || !canvas) {
  showPoster();
} else {
  try {
    const stage = canvas.parentElement;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x1a1816, 1);
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1816);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    scene.add(new THREE.HemisphereLight(0xf6f1e8, 0x1a1816, 0.9));
    const key = new THREE.DirectionalLight(0xfff6ee, 2.5);
    key.position.set(2.6, 4.4, 3.2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd9cfc2, 0.55);
    fill.position.set(-3.2, 1.6, -1.4);
    scene.add(fill);
    const titles = ['Research', 'Options', 'Build', 'Test', 'Record'];
    const sheets = titles.map((title, index) => {
      const board = document.createElement('canvas');
      board.width = 512;
      board.height = 704;
      const ctx = board.getContext('2d');
      ctx.fillStyle = '#f3f0ea';
      ctx.fillRect(0, 0, 512, 704);
      ctx.fillStyle = '#9d3419';
      ctx.beginPath();
      ctx.arc(430, 86, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#161412';
      ctx.font = '56px Georgia, serif';
      ctx.fillText(title, 40, 110);
      ctx.fillStyle = '#5c564e';
      ctx.font = '22px Georgia, serif';
      ctx.fillText('File ' + (index + 1) + ' of 5', 40, 168);
      ctx.fillText('Illustrative. Not a screenshot.', 40, 204);
      const tex = new THREE.CanvasTexture(board);
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      const side = new THREE.MeshStandardMaterial({ color: 0xe4ddd2, roughness: 0.92 });
      const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.78 });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.034, 2.72), [side, side, face, side, side, side]);
      mesh.position.y = index * 0.04;
      mesh.userData.home = index * 0.04;
      scene.add(mesh);
      return mesh;
    });
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.15, 40),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28 }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.04;
    scene.add(shadow);
    canvas.hidden = false;
    if (poster) poster.hidden = true;
    function size() {
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight || 320);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    size();
    addEventListener('resize', size);
    let dragging = false;
    let mode = '';
    let lx = 0;
    let ly = 0;
    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      mode = '';
      lx = event.clientX;
      ly = event.clientY;
    });
    canvas.addEventListener('pointerup', () => { dragging = false; mode = ''; });
    canvas.addEventListener('pointercancel', () => { dragging = false; mode = ''; });
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      const dx = event.clientX - lx;
      const dy = event.clientY - ly;
      if (!mode) {
        if (Math.hypot(dx, dy) < 8) return;
        mode = Math.abs(dx) > Math.abs(dy) ? 'turn' : 'scroll';
        if (mode === 'turn') canvas.setPointerCapture(event.pointerId);
      }
      if (mode !== 'turn') return;
      yaw += dx * 0.01;
      pitch = Math.max(0.15, Math.min(1.05, pitch + dy * 0.004));
      lx = event.clientX;
      ly = event.clientY;
    });
    function place() {
      const lift = window.__fileLift || 0;
      const active = window.__activeSheet || 0;
      const radius = 3.15;
      const cos = Math.cos(pitch);
      camera.position.set(Math.sin(yaw) * cos * radius, 0.85 + Math.sin(pitch) * 0.85, Math.cos(yaw) * cos * radius);
      camera.lookAt(0, 0.12 + lift * 0.22, 0);
      sheets.forEach((mesh, index) => {
        const open = lift * index * 0.34;
        const focus = index === active ? lift * 0.08 : 0;
        mesh.position.y = mesh.userData.home + open + focus;
        mesh.rotation.z = (index - 2) * lift * 0.03;
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
    if (frame) setCompare(compare ? compare.value : 50);
  } catch {
    showPoster();
  }
}
