# Offline libraries for v1 trial pages

Trial pages render without network access to CDNs. These unmodified files come from npm.

| Folder | Package | License |
| --- | --- | --- |
| three/ | three 0.170.0 (build, OrbitControls, RoomEnvironment, GLTFLoader, BufferGeometryUtils) | MIT, see three/LICENSE |
| gsap/ | gsap 3.13.0 (gsap, ScrollTrigger, SplitText) | GSAP standard no-charge license, gsap.com/standard-license |
| lenis/ | lenis 1.3.4 | MIT |

Use from a run folder `evals/v1/runs/<arm>/<case>/index.html`:

```html
<script type="importmap">{"imports":{"three":"../../../vendor/three/three.module.js","three/addons/":"../../../vendor/three/addons/"}}</script>
<script src="../../../vendor/gsap/gsap.min.js"></script>
<script src="../../../vendor/gsap/ScrollTrigger.min.js"></script>
<script src="../../../vendor/lenis/lenis.min.js"></script>
```

Google Fonts links work at render time. Other CDNs do not.
