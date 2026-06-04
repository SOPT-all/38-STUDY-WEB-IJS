import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Box = () => {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return undefined;

    const tween = gsap.to(meshRef.current.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="violet" roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

const Scene = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1, 3);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1} />
      <Box />
      <Environment preset="park" background />
    </>
  );
};

export default function App() {
  return (
    <>
      <Canvas
        shadows
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Scene />
      </Canvas>
      <div
        id="wrap"
        style={{ position: 'relative', width: '100%', height: '500vh' }}
      >
        <p
          style={{
            position: 'absolute',
            top: '50vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay',
          }}
        >
          스크롤 하세요.
        </p>
        <p
          style={{
            position: 'absolute',
            top: '300vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay',
          }}
        >
          계속 스크롤 해보세요.
        </p>
        <p
          style={{
            position: 'absolute',
            top: '400vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay',
          }}
        >
          거의 다 왔어요.
        </p>
      </div>
    </>
  );
}
