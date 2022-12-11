import { useEffect, useRef } from "react"
import { AmbientLight, Color, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

function ThreeCanvas() {
  const canvas = useRef(null)
  let requestRef: number

  useEffect(() => {
    if (!canvas.current) return

    // scene
    const scene = new Scene()

    //create our sphere
    const geometry = new SphereGeometry(3,128,128)
    const material = new MeshStandardMaterial({
      color: '#00ff83'
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    // sizes
    const sizes = {
      with  : window.innerWidth,
      height: window.innerHeight
    }

    // light
    const light = new PointLight("#fff", 1, 100)
    light.position.set(0,10,10)

    const ambientLight = new AmbientLight("#d2d2d2", 0.1);
    scene.add(light)
    scene.add(ambientLight)

    // camera
    const camera = new PerspectiveCamera(45, sizes.with / sizes.height, 0.1, 100)
    camera.position.z = 20
    scene.add(camera)

    // renderer
    const renderer = new WebGLRenderer({
      canvas: canvas.current,
      // antialias: true
    })
    renderer.setSize(sizes.with, sizes.height)
    // renderer.setPixelRatio(2)
    renderer.render(scene, camera)

    // controls
    const controls = new OrbitControls(camera, canvas.current)
    controls.enableDamping   = true
    controls.enablePan       = false
    controls.enableZoom      = false
    controls.autoRotate      = true
    controls.autoRotateSpeed = 5

    // loop
    const animate = () => {
      console.log('loop')
      controls.update()
      renderer.render(scene, camera)
      requestRef = requestAnimationFrame(animate)
    }
    animate()

    // timeline magic
    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
    
    // function betterRandom () {
    //   let newColor = new Color(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
    //   gsap.to(mesh.material.color, { 
    //     duration: 2,
    //     r: newColor.r,
    //     b: newColor.b,
    //     g: newColor.g,
    //     // '--randomColor': "rgb(random(0,155,100), random(1,255,0), random(155,0,1))", 
    //     onComplete: betterRandom
    //   })
    // }
    // betterRandom()

    // event window
    const eventResizeWindow = () => {
      sizes.with = window.innerWidth
      sizes.height = window.innerHeight

      // update camera
      camera.aspect = sizes.with / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.with, sizes.height)
    }
    window.addEventListener('resize', eventResizeWindow)

    return () => {
      window.removeEventListener('resize', eventResizeWindow)
      cancelAnimationFrame(requestRef)
    }
  })

  return (
    <canvas ref={canvas} id="myThreeJsCanvas"></canvas>
  )
}

export default ThreeCanvas