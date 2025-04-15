import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

const Character = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const groupRef = useRef()
  const faceRef = useRef()
  const { scene } = useGLTF('/models/Shirthik web.glb')
  const { camera, pointer } = useThree()
  const [target] = useState(() => new THREE.Vector3())
  const raycaster = new THREE.Raycaster()

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

    // Update target with raycast
    raycaster.setFromCamera(pointer, camera)
    const point = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(3))
    target.copy(point)

    

    // Smoothly rotate using quaternion
    const currentQuat = face.quaternion.clone()
    face.lookAt(target)
    const targetQuat = face.quaternion.clone()
    face.quaternion.copy(currentQuat)
    face.quaternion.slerp(targetQuat, 0.05)
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/Shirthik web.glb')
export default Character
