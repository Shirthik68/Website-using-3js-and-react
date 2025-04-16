import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../Components/CanvasLoader";
//import HackerRoom from "../Components/HackerRoom";
import Target from '../Components/Target';
import ReactLogo from "../Components/Reactlogo";
import Aelogo from "../Components/Aelogo";
import Blender from "../Components/Blender";
import Character from "../Components/Character";


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
      CharacterPosition: [0, 0, 0]
    };
  } else if (isMobile) {
    return {
      deskScale: 0.06,
      deskPosition: [1, -7, -10],
      targetPosition: [0, -1.5, 0],
      ReactLogoPosition: [-2, 1, 0],
      CubePosition: [0, 1, 1],
      BlenderPosition: [2, 1, 0],
      CharacterPosition: [0, 0, 0]
    };
  } else if (isTablet) {
    return {
      deskScale: 0.07,
      deskPosition: [1, -8, -10],
      targetPosition: [0, -1.5, 0],
      ReactLogoPosition: [-2, 1, 0],
      CubePosition: [0, 1, 1],
      BlenderPosition: [2, 1, 0],
      CharacterPosition: [0, 0, 0]
    };
  } else {
    return {
      deskScale: 0.07,
      deskPosition: [1, -8, -10],
      targetPosition: [-2, -2, 1],
      ReactLogoPosition: [0, 0, 0],
      CubePosition: [2.5, -1, 1],
      BlenderPosition: [-3, 1, 0],
      CharacterPosition: [0, -1, 0]
    };
  }
};


const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

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

      {/* 3D Canvas */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
          <Suspense fallback={<CanvasLoader />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />

            {/*<HackerRoom
              scale={sizes.deskScale}
              position={sizes.deskPosition}
              rotation={[0.1, -Math.PI, 0]}
            />*/}

            <Target position={sizes.targetPosition} scale={[0.2, 0.2, 0.2]} />

            <ReactLogo position={sizes.ReactLogoPosition} scale={[0.3, 0.3, 0.3]} />

            <Aelogo position={sizes.CubePosition} scale={[0.2, 0.2, 0.2]} />

            <Blender position={sizes.BlenderPosition} scale={[0.15, 0.15, 0.15]} />

            <Character position={sizes.CharacterPosition} scale={[8, 8, 8]} />

        
          </Suspense>

        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
