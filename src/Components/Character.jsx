import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect, forwardRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Character = forwardRef(({ position = [0, 2, 0], scale = [1, 1, 1] }, ref) => {
  const { scene } = useGLTF('/models/Shirthik web.glb')
  const { camera, pointer } = useThree()
  const faceRef = useRef()
  const characterGroup = useRef() // Ref to entire character
  const [target] = useState(() => new THREE.Vector3())
  const raycaster = new THREE.Raycaster()

  // Animate character drop-in on scroll
  useEffect(() => {
    if (!characterGroup.current) return;
  
    // Animate position
    gsap.to(characterGroup.current.position, {
      x: 0,
      y: -2.9,
      z: 0,
      scrollTrigger: {
        trigger: '#trigger-element',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
      },
      ease: 'power2.out',
    });
  
    // Animate scale
    gsap.to(characterGroup.current.scale, {
      x: 3,
      y: 3,
      z: 3,
      scrollTrigger: {
        trigger: '#trigger-element',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
      },
      ease: 'power2.out',
    });
  
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Head tracking logic
  useEffect(() => {
    const face = scene.getObjectByName('Head')
    if (face) {
      faceRef.current = face
    } else {
      console.warn('Head not found in the model')
    }
  }, [scene])

  useFrame(() => {
    const face = faceRef.current
    if (!face || typeof face.lookAt !== 'function') return

    raycaster.setFromCamera(pointer, camera)
    const point = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(3))
    target.copy(point)

    const currentQuat = face.quaternion.clone()
    face.lookAt(target)
    const targetQuat = face.quaternion.clone()
    face.quaternion.copy(currentQuat)
    face.quaternion.slerp(targetQuat, 0.1)
  })

  return (
    <group ref={characterGroup} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  )
})

useGLTF.preload('/models/Shirthik web.glb')
export default Character
