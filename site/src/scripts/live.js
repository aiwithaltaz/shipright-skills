import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const stage = document.querySelector('[data-stage]')
const canvas = stage?.querySelector('canvas')
const failNote = document.querySelector('[data-webgl-fail]')
if (!stage || !canvas) {
  // No hero on this page.
} else {
  mount(stage, canvas, failNote)
}

function mount(stage, canvas, failNote) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })
  } catch {
    canvas.remove()
    if (failNote) failNote.hidden = false
    return
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.92
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 30)
  camera.position.set(0, 0.08, 6.15)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.055).texture
  scene.environmentIntensity = 1.05
  pmrem.dispose()

  const key = new THREE.DirectionalLight(0xf5f9fc, 1.15)
  key.position.set(-3.4, 4.4, 3.2)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xc5eaf8, 1.7)
  rim.position.set(4.4, 0.2, -3.8)
  scene.add(rim)
  scene.add(new THREE.AmbientLight(0x9eb0c2, 0.12))

  const phone = window.innerWidth < 760
  const geometry = new THREE.IcosahedronGeometry(1.18, phone ? 5 : 6)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xd5e4ee,
    metalness: 1,
    roughness: 0.18,
    clearcoat: 0.35,
    clearcoatRoughness: 0.28,
    envMapIntensity: 1.05,
  })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 }
    material.userData.shader = shader
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        vec3 liquid(vec3 p) {
          float w = sin(p.y * 2.05 + uTime * 0.42);
          w += sin(p.x * 1.55 - uTime * 0.26) * 0.62;
          w += sin(p.z * 1.85 + uTime * 0.2) * 0.5;
          return p + normalize(p) * w * 0.045;
        }`,
      )
      .replace('#include <begin_vertex>', 'vec3 transformed = liquid(vec3(position));')
  }
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const spin = { y: 0.35 }
  const drag = { yaw: 0 }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let idle = 0

  const apply = () => {
    mesh.rotation.y = spin.y + idle + drag.yaw + pointer.x * 0.2
    mesh.rotation.x = pointer.y * 0.14
  }

  const fit = () => {
    const narrow = window.innerWidth < 760
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2))
    const w = stage.clientWidth || 320
    const h = stage.clientHeight || 240
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  }

  const render = () => {
    apply()
    renderer.render(scene, camera)
  }

  fit()
  render()
  stage.classList.add('is-live')

  let raf = 0
  let running = false
  let last = performance.now()
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const shader = material.userData.shader
    if (shader) shader.uniforms.uTime.value += dt
    idle += dt * 0.12
    pointer.x += (pointer.tx - pointer.x) * 0.08
    pointer.y += (pointer.ty - pointer.y) * 0.08
    render()
    raf = requestAnimationFrame(tick)
  }
  const start = () => {
    if (running || reduce) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const watch = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) start()
    else stop()
  })
  watch.observe(stage)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop()
    else start()
  })
  window.addEventListener('resize', () => {
    fit()
    render()
  })

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      pointer.tx = event.clientX / window.innerWidth - 0.5
      pointer.ty = event.clientY / window.innerHeight - 0.5
    })
  }

  let dragging = false
  let lastX = 0
  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragging = true
    lastX = event.clientX
  })
  window.addEventListener('pointerup', () => {
    dragging = false
  })
  window.addEventListener('pointermove', (event) => {
    if (!dragging) return
    drag.yaw += (event.clientX - lastX) * 0.005
    lastX = event.clientX
    if (reduce) render()
  })

  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') drag.yaw -= 0.18
    else if (event.key === 'ArrowRight') drag.yaw += 0.18
    else if (event.key === 'ArrowUp') pointer.y = Math.max(-1, pointer.y - 0.25)
    else if (event.key === 'ArrowDown') pointer.y = Math.min(1, pointer.y + 0.25)
    else return
    event.preventDefault()
    if (reduce) render()
  })

  const shots = { front: 0.35, side: Math.PI * 0.5, back: Math.PI }
  document.querySelectorAll('[data-shot]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-shot')
      if (name === 'reset') {
        drag.yaw = 0
        pointer.x = 0
        pointer.y = 0
        pointer.tx = 0
        pointer.ty = 0
      } else if (shots[name] !== undefined) {
        drag.yaw = shots[name] - spin.y - idle
        pointer.y = 0
      }
      render()
    })
  })

  if (!reduce) start()

  const motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const lenis = new Lenis({ respectReducedMotion: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    gsap.to(spin, {
      y: Math.PI * 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  })
}
