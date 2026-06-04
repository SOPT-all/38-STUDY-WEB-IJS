import { Suspense, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Donut } from './Donut';
import { gsap } from 'gsap';

export const Scene = ({ isMobile }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, isMobile ? 4 : 3);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    if (!isMobile) {
      tl.to(camera.position, {
        x: 1,
        y: 0.5,
        z: 3.5,
      })
        .to(camera.position, {
          x: -0.5,
          y: -0.5,
          z: 4,
        })
        .to(camera.position, {
          x: -0.5,
          y: -0.5,
          z: 2.5,
        });
    } else {
      tl.to(camera.position, {
        y: -0.5,
        z: 3.5,
      });
    }
  }, [camera, isMobile]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={['#ff8c42']} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.8}
        castShadow
      />

      <Suspense fallback={null}>
        <Donut isMobile={isMobile} />
      </Suspense>
    </>
  );
};
