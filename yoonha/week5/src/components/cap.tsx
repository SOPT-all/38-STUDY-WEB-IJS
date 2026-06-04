import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const Cap = () => {
  const { scene } = useGLTF("/graduation-cap.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.fromTo(
      groupRef.current.position,
      { x: -1.5, y: 1.5, z: 0 },
      { x: 1, y: 0.5, z: -0.5, duration: 2 },
    )
      .fromTo(
        groupRef.current.rotation,
        { x: 0, y: 0, z: 0 },
        { x: Math.PI * 2, y: Math.PI * 4, z: Math.PI, duration: 2 },
        "<",
      )

      .to(groupRef.current.position, { x: 2.5, y: 1.5, z: 0 })
      .to(
        groupRef.current.rotation,
        { x: Math.PI * 4, y: Math.PI * 9, z: Math.PI * 2 },
        "<",
      )

      .to(groupRef.current.position, { x: 2, y: 0, z: 0 })
      .to(
        groupRef.current.rotation,
        { x: Math.PI * 4, y: Math.PI * 10, z: Math.PI * 2 },
        "<",
      );
  }, []);

  return (
    <group ref={groupRef} position={[-1.5, 1.5, 0]} scale={0.5}>
      <primitive object={scene} />
    </group>
  );
};
