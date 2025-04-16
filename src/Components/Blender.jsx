import { useGLTF, Float } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Blender = (props) => {
  const { nodes, materials } = useGLTF('/models/blender_logo.glb');
  const blenderRef = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.5,
        })
    }, blenderRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (hovered) {
      gsap.to(blenderRef.current.rotation, {
        x: '+=2',
        y: '+=2',
        duration: 2,
        ease: 'power1.inOut',
      });
    }
  }, [hovered]);

  return (
    <Float floatIntensity={1}>
      <group
        ref={blenderRef}
        dispose={null}
        rotation={[-Math.PI / 1, 2.5, 5.5]}
        position={[8, 6, 0]}
        scale={0.01}
        {...props}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['Material.001']}
          onPointerEnter={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials['Material.003']}
        />
      </group>
    </Float>
  );
};

useGLTF.preload('/models/blender_logo.glb');
export default Blender;
