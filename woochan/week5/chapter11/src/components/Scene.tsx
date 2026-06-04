import { Suspense, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Airplane } from './Airplane';

gsap.registerPlugin(ScrollTrigger);

interface ISceneProps {
  isMobile: boolean;
}

export const Scene = ({ isMobile }: ISceneProps) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, isMobile ? 5 : 4);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#wrap', start: 'top top', end: 'bottom bottom', scrub: 1 },
    });

    if (isMobile) {
      tl.to(camera.position, { y: -0.4, z: 4.5 });
    } else {
      tl.to(camera.position, { x: 1, y: 0.6, z: 4 })
        .to(camera.position, { x: -0.6, y: -0.4, z: 4.5 })
        .to(camera.position, { x: -0.4, y: -0.3, z: 3.2 });
    }
  }, [camera, isMobile]);

  useFrame(() => camera.lookAt(0, 0, 0));

  return (
    <>
      <color attach="background" args={['#5fa8d3']} />
      <ambientLight intensity={1.3} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} castShadow />
      <pointLight position={[-5, -4, -4]} intensity={1.1} />
      <spotLight position={[8, 10, 8]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
      <Suspense fallback={null}>
        <Airplane isMobile={isMobile} />
      </Suspense>
    </>
  );
};
