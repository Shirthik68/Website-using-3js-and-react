import { Center, useTexture } from '@react-three/drei';
import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

const Rings = ({ position = [0, 0, 0] }) => {
  const refList = useRef([]);
  const texture = useTexture('textures/rings.png');
  const initialized = useRef(false); // To ensure GSAP only runs once
  const [ringPosition, setRingPosition] = useState(position);

  // Check if there is a saved position in localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('ringPosition');
    if (savedPosition) {
      setRingPosition(JSON.parse(savedPosition)); // Load the saved position
    }
  }, []);

  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  useEffect(() => {
    if (refList.current.length === 0 || initialized.current) return;

    initialized.current = true;

    // Set the initial position based on the saved or default position
    refList.current.forEach((r) => {
      r.position.set(ringPosition[0], ringPosition[1], ringPosition[2]);
    });

    // Start GSAP animation
    gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(
        refList.current.map((r) => r.rotation),
        {
          y: `+=${Math.PI * 2}`,
          x: `-=${Math.PI * 2}`,
          duration: 2.5,
          stagger: {
            each: 0.15,
          },
          ease: 'none',
        }
      );
  }, [ringPosition]);

  // Save the position to localStorage when it changes
  useEffect(() => {
    if (ringPosition) {
      localStorage.setItem('ringPosition', JSON.stringify(ringPosition));
    }
  }, [ringPosition]);

  return (
    <Center>
      <group scale={0.2} position={[-7.5, 1.5, 0]} rotation={[0, 0, 0]}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Center>
  );
};

export default Rings;
