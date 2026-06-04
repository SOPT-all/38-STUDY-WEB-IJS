import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Donut = () => {
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
    <mesh ref={meshRef} castShadow receiveShadow scale={1.5}>
      <torusGeometry args={[0.8, 0.28, 32, 96]} />
      <meshStandardMaterial color="hotpink" roughness={0.45} metalness={0.2} />
    </mesh>
  );
};

const Scene = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);

    const positionTween = gsap.to(camera.position, {
      x: 6,
      y: 5,
      z: 4,
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const rotationTween = gsap.to(camera.rotation, {
      x: -0.8,
      y: 1,
      z: 1.2,
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      positionTween.scrollTrigger?.kill();
      rotationTween.scrollTrigger?.kill();
      positionTween.kill();
      rotationTween.kill();
    };
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1} />
      <Donut />
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
        style={{
          position: 'relative',
          width: '100%',
          height: '500vh',
          fontSize: '3rem',
        }}
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
