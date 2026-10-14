import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const kind = document.body.dataset.motion
if (kind) {
  const motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    if (kind === 'split') {
      gsap.to('.hair', {
        scaleY: 1,
        duration: 0.7,
        ease: 'power2.out',
        transformOrigin: 'top center',
      })
      gsap.utils.toArray('.case').forEach((el) => {
        gsap.from(el, {
          y: 16,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }

    if (kind === 'night') {
      gsap.fromTo(
        '.bleed img',
        { scale: 1.04 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bleed',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }

    if (kind === 'press') {
      gsap.to('.readbar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }
  })
}
