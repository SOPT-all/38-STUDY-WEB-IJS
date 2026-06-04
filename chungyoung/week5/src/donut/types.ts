import type { MutableRefObject } from "react";

export type Flavor = {
  eyebrow: string;
  name: string;
  note: string;
  metric: string;
  base: string;
  icing: string;
  accent: string;
  bg: string;
  bg2: string;
  ink: string;
};

export type MotionState = {
  flavor: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  positionX: number;
  positionY: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
};

export type MotionRef = MutableRefObject<MotionState>;
