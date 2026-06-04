import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { Mesh } from "three";

interface IDonut {
  url: string;
}

export const Donut = ({ url }: IDonut) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<Mesh>(null);

  return (
    <group scale={1.5}>
      <primitive object={scene} ref={meshRef} />
    </group>
  );
};
