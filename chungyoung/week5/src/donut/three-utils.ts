import * as THREE from "three";
import { flavors } from "./flavors";
import type { Flavor } from "./types";

type ColorKey = keyof Pick<Flavor, "base" | "icing" | "accent" | "bg">;

export function mixFlavorColor(progress: number, key: ColorKey) {
  const clamped = THREE.MathUtils.clamp(progress, 0, flavors.length - 1);
  const fromIndex = Math.floor(clamped);
  const toIndex = Math.min(fromIndex + 1, flavors.length - 1);
  const localProgress = clamped - fromIndex;

  return new THREE.Color(flavors[fromIndex][key]).lerp(
    new THREE.Color(flavors[toIndex][key]),
    localProgress,
  );
}

export function createWobblyTorusGeometry(
  majorRadius: number,
  tubeRadius: number,
  radialSegments: number,
  tubularSegments: number,
  wobble: number,
) {
  const geometry = new THREE.TorusGeometry(majorRadius, tubeRadius, radialSegments, tubularSegments);
  const position = geometry.attributes.position as THREE.BufferAttribute;

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const z = position.getZ(index);
    const angle = Math.atan2(y, x);
    const ripple = Math.sin(angle * 3.1) * 0.55 + Math.sin(angle * 7.2 + z * 3) * 0.25;
    const radialScale = 1 + ripple * wobble;
    const tubeScale = 1 + Math.cos(angle * 5.4) * wobble * 0.38;

    position.setXYZ(index, x * radialScale, y * radialScale, z * tubeScale);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}
