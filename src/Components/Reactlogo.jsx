import { useGLTF } from '@react-three/drei'
import { Float } from '@react-three/drei'

const ReactLogo = (props) => {
  const { nodes, materials } = useGLTF('/models/react.glb')
  return (
    <Float floatIntensity={1} >
    <group dispose={null} position={[8,6,0]} scale={0.03} {...props} >
      <mesh
        geometry={nodes['React-Logo_Material002_0'].geometry}
        material={materials['Material.002']}
        position={[9, 5, 0]}
        rotation={[0, 0, -Math.PI / 5]}
        scale={[0.039*3, 0.039*3, 0.05*3]}
      />
    </group>
    </Float>
  )
}

useGLTF.preload('/models/react.glb')
export default ReactLogo