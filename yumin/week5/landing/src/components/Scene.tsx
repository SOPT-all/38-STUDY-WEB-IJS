import { Suspense, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Donut } from "./Donut";

gsap.registerPlugin(ScrollTrigger);

export const Scene = () => {
  const { camera } = useThree();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    camera.position.set(0, 0, 3);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

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

    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#ff8c42"]} />

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
        <Donut url="/donut.glb" isMobile={isMobile} />
      </Suspense>
    </>
  );
};
