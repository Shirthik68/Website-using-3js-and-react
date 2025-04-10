import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.glb"
);

const Target = (props) => {
  const ref = useRef();
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.glb"
  );

  return <primitive ref={ref} object={scene} {...props} />;
};

export default Target;
