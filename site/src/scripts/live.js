import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

function mountScene(canvas, kind) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
  } catch {
    canvas.remove()
    return null
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40)
  camera.position.set(0, 0.1, 6.4)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  let mesh
  if (kind === 'depth') {
    mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshStandardMaterial({ color: 0xc5e7f2, metalness: 0.62, roughness: 0.28 }),
    )
    scene.add(new THREE.AmbientLight(0x9eb4c8, 0.55))
    const key = new THREE.DirectionalLight(0xf4fbff, 2.1)
    key.position.set(-2.4, 2.2, 3.4)
    scene.add(key)
  } else if (kind === 'grid') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 20, 14),
      new THREE.MeshBasicMaterial({ color: 0x1c1c1c, wireframe: true }),
    )
  } else {
    mesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.95, 0.26, 120, 16),
      new THREE.MeshStandardMaterial({ color: 0xb9b9b4, metalness: 0.08, roughness: 0.42 }),
    )
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const key = new THREE.DirectionalLight(0xffffff, 1.4)
    key.position.set(2.2, 2.8, 3.2)
    scene.add(key)
  }
  scene.add(mesh)

  const fit = () => {
    const phone = window.innerWidth < 760
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2))
    const w = canvas.clientWidth || 320
    const h = canvas.clientHeight || 220
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  }

  const render = () => renderer.render(scene, camera)
  fit()
  render()

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf = 0
  let running = false
  const tick = () => {
    if (kind === 'depth') mesh.rotation.z += 0.003
    else mesh.rotation.y += kind === 'grid' ? 0.0025 : 0.0045
    render()
    raf = requestAnimationFrame(tick)
  }
  const start = () => {
    if (running || reduce) return
    running = true
    raf = requestAnimationFrame(tick)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const stage = canvas.closest('[data-stage]')
  const watch = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) start()
    else stop()
  })
  if (stage) watch.observe(stage)
  const onHide = () => {
    if (document.hidden) stop()
    else start()
  }
  document.addEventListener('visibilitychange', onHide)
  window.addEventListener('resize', () => {
    fit()
    render()
  })
  if (!reduce) start()

  return { mesh, render }
}

const kind = document.body.dataset.motion
const canvas = document.querySelector('canvas[data-scene]')
const sceneApi = canvas ? mountScene(canvas, canvas.dataset.scene || 'air') : null

const motion = gsap.matchMedia()
motion.add('(prefers-reduced-motion: no-preference)', () => {
  const lenis = new Lenis({ respectReducedMotion: true, autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  const onTick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  if (kind === 'air') {
    gsap.to('[data-stage]', {
      y: -40,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    })
  }

  if (kind === 'depth' && sceneApi) {
    gsap.to(sceneApi.mesh.rotation, {
      y: Math.PI * 0.9,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }

  if (kind === 'grid') {
    gsap.to('.rule', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#gallery', start: 'top 85%', end: 'top 35%', scrub: true },
    })
  }

  return () => {
    lenis.destroy()
    gsap.ticker.remove(onTick)
  }
})
