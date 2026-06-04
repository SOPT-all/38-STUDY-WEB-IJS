import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Box(props) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" roughness={0.3} metalness={1.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.35}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Box position={[0, 0, 0]} />
    </>
  );
}

export default function App() {
  return (
    <Canvas>
      <Scene />
      <OrbitControls />
      <Environment preset="sunset" background />
    </Canvas>
  );
}
