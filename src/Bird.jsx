import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Bird(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/bird.glb');
  const { actions } = useAnimations(animations, group);

  // Play the first animation
  React.useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  // Optional: Add custom animation or movement
  useFrame((state, delta) => {
    // Example: Make the bird move up and down
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Scene} />
    </group>
  );
}

export default Bird;
