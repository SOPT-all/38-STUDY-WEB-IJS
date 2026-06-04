import { Suspense } from "react";
import { Donut } from "./Donut";

export const Scene = () => {
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
        <Donut url="/donut.glb" />
      </Suspense>
    </>
  );
};
