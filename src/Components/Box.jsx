import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Box = ({ position = [2, -1, -2], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/models/box.glb');
  const groupRef = useRef();
  const lidRef = useRef();

  useEffect(() => {
    const lid = scene.getObjectByName('Lid'); // Change "Lid" to your actual object name
    if (lid) {
      lidRef.current = lid;
    } else {
      console.warn('Lid not found in the GLB model');
    }
  }, [scene]);

  useEffect(() => {
    if (!lidRef.current) return;

    gsap.to(lidRef.current.rotation, {
      x: -Math.PI / 2, // 90 degrees
      scrollTrigger: {
        trigger: '#trigger-element', // Ensure this exists in your DOM
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

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/box.glb');
export default Box;
