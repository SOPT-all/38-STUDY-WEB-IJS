import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

interface IDonut {
  url: string;
  isMobile: boolean;
}

interface IRotation {
  x: number;
  y: number;
  z: number;
}

export const Donut = ({ url, isMobile }: IDonut) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<IRotation>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.roughness = 0.2;
          child.material.metalness = 0.1;
        }
      }
    });

    const startX = isMobile ? 0 : 1.2;
    const endX = isMobile ? 0 : 0.5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    if (groupRef.current) {
      tl.fromTo(
        groupRef.current.position,
        { x: startX, y: -0.5, z: -0.25 },
        { x: endX, y: 0.5, z: -0.25 },
      )
        .to(groupRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 }, "<")
        .to(
          rotationRef.current,
          { x: Math.PI, y: Math.PI * 2, z: Math.PI },
          "<",
        )
        .to(groupRef.current.position, { x: endX, y: 0, z: 0 })
        .to(groupRef.current.scale, { x: 1.3, y: 1.3, z: 1.3 }, "<")
        .to(rotationRef.current, { x: Math.PI / 2, y: 0, z: 0 }, "<");
    }

    return () => {
      tl.kill();
    };
  }, [scene, isMobile]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (rotationRef.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (rotationRef.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z +=
        (rotationRef.current.z - groupRef.current.rotation.z) * 0.05;

      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
};
