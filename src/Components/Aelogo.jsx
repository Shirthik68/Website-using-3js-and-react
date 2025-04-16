import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { Float, useGLTF } from '@react-three/drei';

const Ae = (props) => {
  const { nodes, materials } = useGLTF('models/AE.glb');
  const AeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.5,
        })
    }, AeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (hovered) {
      gsap.to(AeRef.current.rotation, {
        x: '+=2',
        y: '+=2',
        duration: 2,
        ease: 'power1.inOut',
      });
    }
  }, [hovered]);

  return (
    <Float floatIntensity={2}>
      <group
        ref={AeRef}
        position={[9, -4, 0]}
        rotation={[1, 0, 1]}
        scale={0.74}
        dispose={null}
        {...props}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.AE_Base.geometry}
          material={materials.AE_Dark_Blue}
          onPointerEnter={(e) => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={(e) => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          {/* Optional Matcap Material */}
          {/* <meshMatcapMaterial matcap={texture} toneMapped={false} /> */}
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.AE_Rim.geometry}
          material={materials.AE_Light_Purple}
          position={[0, -0.05, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={materials['Material.001']}
          position={[0.001, 0.252, -0.115]}
          scale={1.384}
        />
      </group>
    </Float>
  );
};

useGLTF.preload('models/AE.glb');

export default Ae;
