import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const Hamster = () => {
  const { scene } = useGLTF("/hamster.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.visible = false;

    const sections = document.querySelectorAll(".section");
    const lastSection = sections[sections.length - 1];
    if (!lastSection) return;

    ScrollTrigger.create({
      trigger: lastSection,
      start: "top center",
      end: "bottom bottom",
      onEnter: () => {
        if (groupRef.current) groupRef.current.visible = true;
      },
      onEnterBack: () => {
        if (groupRef.current) groupRef.current.visible = true;
      },
      onLeaveBack: () => {
        if (groupRef.current) groupRef.current.visible = false;
      },
    });
  }, []);

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        position={[2, -1.5, 0]}
        scale={1.5}
        rotation={[0, -Math.PI / 5, 0]}
      />
    </group>
  );
};
