import React, { Suspense, useRef, useLayoutEffect, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../Components/CanvasLoader";
import Target from "../Components/Target";
import ReactLogo from "../Components/Reactlogo";
import Aelogo from "../Components/Aelogo";
import Blender from "../Components/Blender";
import Character from "../Components/Character";
import Box from "../Components/Box";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Responsive scaling and positioning
const calculateSizes = (isSmall, isMobile, isTablet) => {
  if (isSmall) {
    return {
      deskScale: 0.05,
      deskPosition: [0, -5, -10],
      targetPosition: [0, -1.5, 0],
      ReactLogoPosition: [-2, 1, 0],
      CubePosition: [0, 1, 1],
      BlenderPosition: [2, 1, 0],
      CharacterPosition: [0, 0, 0],
      boxPosition: [0, -3, 0],
    };
  } else if (isMobile) {
    return {
      deskScale: 0.06,
      deskPosition: [1, -7, -10],
      targetPosition: [0, -1.5, 0],
      ReactLogoPosition: [-2, 1, 0],
      CubePosition: [0, 1, 1],
      BlenderPosition: [2, 1, 0],
      CharacterPosition: [0, 0, 0],
      boxPosition: [0, -3, 0],
    };
  } else if (isTablet) {
    return {
      deskScale: 0.07,
      deskPosition: [1, -8, -10],
      targetPosition: [0, -1.5, 0],
      ReactLogoPosition: [-2, 1, 0],
      CubePosition: [0, 1, 1],
      BlenderPosition: [2, 1, 0],
      CharacterPosition: [0, 0, 0],
      boxPosition: [0, -3, 0],
    };
  } else {
    return {
      deskScale: 0.07,
      deskPosition: [1, -8, -10],
      targetPosition: [-1, 0, 1],
      ReactLogoPosition: [-1.5, 0.5, 0],
      CubePosition: [1, 0.5, 1],
      BlenderPosition: [-1.5, 1.5, 0],
      CharacterPosition: [0, 2.2, 0],
      boxPosition: [0, -3, 0],
    };
  }
};

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);


  // Ref for the 3D object inside Character
  const characterRef = useRef();

  useLayoutEffect(() => {
    if (characterRef.current) {
      gsap.to(characterRef.current.position, {
        x: 10,
        y: 5,
        z: 0,
        scrollTrigger: {
          trigger: '#trigger-element',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: true,
        },
            ease: 'power2.out',
          });
        }
    
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }, [sizes]);
  
    // Cleanup the GSAP context on component unmount
   // Re-run the effect if `sizes` changes
  
  return (
    <section className="min-h-screen w-full flex flex-col relative text-white">
      {/* Hero Text */}
      <div className="w-full mx-auto flex flex-col mt-20 sm:mt-36 c-space gap-3 z-10 relative">
        <p className="text-3xl sm:text-5xl font-medium text-white text-center">
          Hi, I'm <span className="text-indigo-400 font-bold">Shirthik</span>{" "}
          <span className="waving-hand">👋</span>
        </p>
        <p className="text-base sm:text-lg text-gray-400 text-center">
          A passionate developer exploring the intersection of 3D, web, and creativity.
        </p>
        <p className="hero_tag text-gray-gradient text-center">
          Building <span className="text-indigo-200 font-bold">Products</span> &{" "}
          <span className="text-indigo-200 font-bold">Brands</span>
        </p>
      </div>

      {/* Trigger Element for GSAP Scroll */}
      <div id="trigger-element" className="h-[150vh] w-full"></div>

      {/* 3D Canvas */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
          <Suspense fallback={<CanvasLoader />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />

            {/* Existing Objects */}
            <Target position={sizes.targetPosition} scale={[0.1, 0.1, 0.1]} />
            <ReactLogo position={sizes.ReactLogoPosition} scale={[0.3, 0.3, 0.3]} />
            <Aelogo position={sizes.CubePosition} scale={[0.1, 0.1, 0.1]} />
            <Blender position={sizes.BlenderPosition} scale={[0.1, 0.1, 0.1]} />

            {/* Character (Move to Box) */}
            <Character
              ref={characterRef} // Use ref here for the mesh
              position={sizes.CharacterPosition}
              scale={[4, 4, 4]}
            />

            {/* Box (Fixed in Position) */}
            <Box position={sizes.boxPosition} scale={[3, 3, 3]} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
