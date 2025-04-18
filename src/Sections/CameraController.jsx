import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const CameraController = ({ characterRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Character center
    const center = new THREE.Vector3(0, 0, 0);
    if (characterRef?.current) {
      characterRef.current.getWorldPosition(center);
    }

    // Vertical orbit around X-axis
    gsap.to({}, {
      scrollTrigger: {
        trigger: '#trigger-element',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const radius = 6;

          camera.position.x = 0;
          camera.position.y = radius * Math.sin(0.01); // Vertical movement
          camera.position.z = radius * Math.cos(0); // Forward/backward

          camera.lookAt(center);
        },
      },
    });

// Optional: animate character position on scroll
if (characterRef?.current) {
    gsap.to(characterRef.current.position, {
      y: 5, // or any other value you want for the position change
      x: 2, // optional: add horizontal movement if needed
      z: 0, // optional: add depth movement if needed
      scrollTrigger: {
        trigger: '#trigger-element',
        start: 'top center',
        end: 'bottom center',
        scrub: true, // Makes the animation sync with scroll
        markers: false, // You can turn this on for debugging
      },
      ease: 'power2.out', // Smoothing easing for the animation
    });
  }
  

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, [camera, characterRef]);

  return null;
};

export default CameraController;
