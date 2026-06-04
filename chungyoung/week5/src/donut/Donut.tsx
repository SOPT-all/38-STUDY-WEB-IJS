import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { flavors } from "./flavors";
import { createWobblyTorusGeometry, mixFlavorColor } from "./three-utils";
import type { MotionRef } from "./types";

type DonutProps = {
  motionRef: MotionRef;
};

type Sprinkle = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
};

type Drip = {
  x: number;
  y: number;
  height: number;
  radius: number;
};

const SPRINKLE_COLORS = ["#ffffff", "#f6cf56", "#f57b9e", "#5bd1c4"];

const DRIP_CONFIG = [
  { angle: 4.05, height: 0.34, radius: 0.06 },
  { angle: 4.48, height: 0.52, radius: 0.075 },
  { angle: 4.96, height: 0.4, radius: 0.058 },
  { angle: 5.42, height: 0.28, radius: 0.052 },
];

export function Donut({ motionRef }: DonutProps) {
  const groupRef = useRef<THREE.Group>(null);
  const geometries = useMemo(createDonutGeometries, []);
  const materials = useMemo(createDonutMaterials, []);
  const sprinkles = useMemo(createSprinkles, []);
  const drips = useMemo(createDrips, []);

  useEffect(() => {
    return () => {
      geometries.cake.dispose();
      geometries.icing.dispose();
      materials.cake.dispose();
      materials.icing.dispose();
    };
  }, [geometries, materials]);

  useFrame((_, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const motion = motionRef.current;
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      motion.rotationX,
      7,
      delta,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      motion.rotationY,
      7,
      delta,
    );
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, motion.rotationZ, 7, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, motion.positionX, 6, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, motion.positionY, 6, delta);
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, motion.scale, 6, delta));

    materials.cake.color.lerp(mixFlavorColor(motion.flavor, "base"), 0.08);
    materials.icing.color.lerp(mixFlavorColor(motion.flavor, "icing"), 0.08);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <primitive attach="geometry" object={geometries.cake} />
        <primitive attach="material" object={materials.cake} />
      </mesh>

      <mesh position={[0, 0, 0.44]} scale={[1.02, 1.02, 0.42]}>
        <primitive attach="geometry" object={geometries.icing} />
        <primitive attach="material" object={materials.icing} />
      </mesh>

      {drips.map((drip) => (
        <IcingDrip key={`${drip.x}-${drip.y}`} drip={drip} material={materials.icing} />
      ))}

      {sprinkles.map((sprinkle, index) => (
        <SprinkleMesh key={index} sprinkle={sprinkle} />
      ))}
    </group>
  );
}

function IcingDrip({ drip, material }: { drip: Drip; material: THREE.Material }) {
  return (
    <group position={[drip.x, drip.y, 0.5]}>
      <mesh position={[0, -drip.height / 2, 0]}>
        <cylinderGeometry args={[drip.radius, drip.radius * 0.82, drip.height, 18]} />
        <primitive attach="material" object={material} />
      </mesh>
      <mesh position={[0, -drip.height, 0]}>
        <sphereGeometry args={[drip.radius * 1.12, 18, 18]} />
        <primitive attach="material" object={material} />
      </mesh>
    </group>
  );
}

function SprinkleMesh({ sprinkle }: { sprinkle: Sprinkle }) {
  return (
    <mesh
      position={sprinkle.position}
      rotation={sprinkle.rotation}
      scale={sprinkle.scale}
    >
      <boxGeometry args={[0.16, 0.035, 0.035]} />
      <meshStandardMaterial color={sprinkle.color} roughness={0.4} />
    </mesh>
  );
}

function createDonutGeometries() {
  return {
    cake: createWobblyTorusGeometry(1.1, 0.48, 72, 192, 0.028),
    icing: createWobblyTorusGeometry(1.1, 0.34, 56, 192, 0.018),
  };
}

function createDonutMaterials() {
  return {
    cake: new THREE.MeshStandardMaterial({
      color: flavors[0].base,
      roughness: 0.58,
      metalness: 0.02,
    }),
    icing: new THREE.MeshStandardMaterial({
      color: flavors[0].icing,
      roughness: 0.24,
      metalness: 0.03,
    }),
  };
}

function createSprinkles(): Sprinkle[] {
  return Array.from({ length: 86 }, (_, index) => {
    const angle = (index / 86) * Math.PI * 2;
    const tubeAngle = Math.PI * (0.2 + (index % 7) * 0.085);
    const surfaceRadius = 1.1 + Math.cos(tubeAngle) * 0.3;

    return {
      position: [
        Math.cos(angle) * surfaceRadius,
        Math.sin(angle) * surfaceRadius,
        0.5 + Math.sin(tubeAngle) * 0.08,
      ],
      rotation: [Math.sin(index) * 0.45, Math.cos(index) * 0.28, angle + Math.PI / 2],
      scale: 0.68 + Math.sin(index * 2.41) * 0.16,
      color: SPRINKLE_COLORS[index % SPRINKLE_COLORS.length],
    };
  });
}

function createDrips(): Drip[] {
  return DRIP_CONFIG.map((config, index) => {
    const radius = 1.18 + Math.sin(index * 1.7) * 0.12;

    return {
      x: Math.cos(config.angle) * radius,
      y: Math.sin(config.angle) * radius,
      height: config.height,
      radius: config.radius,
    };
  });
}
