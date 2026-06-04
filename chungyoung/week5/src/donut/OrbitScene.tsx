import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Donut } from "./Donut";
import { flavors } from "./flavors";
import { mixFlavorColor } from "./three-utils";
import type { MotionRef } from "./types";

type OrbitSceneProps = {
  motionRef: MotionRef;
  prefersReducedMotion: boolean;
};

export function OrbitScene({ motionRef, prefersReducedMotion }: OrbitSceneProps) {
  const { camera } = useThree();
  const fogRef = useRef(new THREE.Fog(flavors[0].bg, 7, 12));

  useFrame((state, delta) => {
    const motion = motionRef.current;

    if (state.scene.fog !== fogRef.current) {
      state.scene.fog = fogRef.current;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, motion.cameraX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, motion.cameraY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, motion.cameraZ, 0.08);
    camera.lookAt(0, 0, 0);

    fogRef.current.color.lerp(mixFlavorColor(motion.flavor, "bg"), 0.06);
  });

  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[-4, 5, 6]} intensity={2.8} />
      <spotLight position={[4, 5, 4]} angle={0.35} penumbra={0.7} intensity={18} />
      <pointLight position={[-3, -2, 4]} intensity={3.2} color="#ffffff" />

      <Float
        speed={prefersReducedMotion ? 0 : 1.25}
        rotationIntensity={prefersReducedMotion ? 0 : 0.22}
        floatIntensity={prefersReducedMotion ? 0 : 0.28}
      >
        <Donut motionRef={motionRef} />
      </Float>
    </>
  );
}
