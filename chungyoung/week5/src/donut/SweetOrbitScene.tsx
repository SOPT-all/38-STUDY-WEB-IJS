import { Canvas } from "@react-three/fiber";
import { OrbitScene } from "./OrbitScene";
import type { MotionRef } from "./types";

type SweetOrbitSceneProps = {
  motionRef: MotionRef;
  prefersReducedMotion: boolean;
};

export function SweetOrbitScene({ motionRef, prefersReducedMotion }: SweetOrbitSceneProps) {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitScene motionRef={motionRef} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}
