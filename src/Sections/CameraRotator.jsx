import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const CameraRotator = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Rotate the camera 90 degrees around the Y-axis
    //camera.rotation.x = 2;
    //camera.rotation.y = 2;
    //camera.rotation.z = 0;
  }, [camera]);

  return null;
};
export default CameraRotator;