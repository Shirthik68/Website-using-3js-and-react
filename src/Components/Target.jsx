import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";




// Preload the model (optional but good for performance)
useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf"
);

const Target = (props) => {
  const ref = useRef();

  // Load the model
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf"
  );

  // Optional: Replace materials if needed

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.position, {
        y: ref.current.position.y + 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        
      });
    }
  }, []);
  
  return (
    <primitive ref={ref} rotation={[0, Math.PI / 3, 0]} object={scene} {...props} />
  );
};

export default Target;
