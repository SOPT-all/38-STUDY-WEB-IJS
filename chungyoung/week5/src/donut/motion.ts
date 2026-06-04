import type { MotionState } from "./types";

export const initialMotion: MotionState = {
  flavor: 0,
  rotationX: 0.1,
  rotationY: -0.08,
  rotationZ: -0.05,
  scale: 0.96,
  positionX: 0.64,
  positionY: 0,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 5.6,
};

type TimelineOptions = {
  isMobile: boolean;
  prefersReducedMotion: boolean;
};

type TimelineStep = {
  at: number;
  target: Partial<MotionState>;
};

export function getInitialMotion(isMobile: boolean): MotionState {
  return {
    ...initialMotion,
    scale: isMobile ? 0.68 : 0.78,
    positionX: isMobile ? 0 : 1.55,
    positionY: isMobile ? -0.72 : 0,
    cameraZ: isMobile ? 7.25 : 6.35,
  };
}

export function getScrollTimelineSteps({
  isMobile,
  prefersReducedMotion,
}: TimelineOptions): TimelineStep[] {
  return [
    {
      at: 0,
      target: {
        flavor: 0.85,
        rotationX: prefersReducedMotion ? 0.08 : 0.24,
        rotationY: prefersReducedMotion ? 0.16 : Math.PI * 0.2,
        rotationZ: -0.14,
        scale: isMobile ? 0.74 : 0.82,
        positionX: isMobile ? 0 : 1.48,
        positionY: isMobile ? -0.62 : 0.04,
        cameraY: isMobile ? 0.18 : 0,
        cameraZ: isMobile ? 7.05 : 6.12,
      },
    },
    {
      at: 1,
      target: {
        flavor: 1.75,
        rotationX: prefersReducedMotion ? 0.18 : -0.1,
        rotationY: prefersReducedMotion ? 0.4 : Math.PI * 1.03,
        rotationZ: 0.28,
        scale: isMobile ? 0.84 : 0.86,
        positionX: isMobile ? 0 : 1.46,
        positionY: isMobile ? -0.58 : 0.16,
        cameraX: isMobile ? 0 : 0.12,
        cameraZ: isMobile ? 6.95 : 6.05,
      },
    },
    {
      at: 2,
      target: {
        flavor: 2.65,
        rotationX: prefersReducedMotion ? 0.16 : -0.28,
        rotationY: prefersReducedMotion ? 0.58 : Math.PI * 2.08,
        rotationZ: -0.18,
        scale: isMobile ? 0.78 : 0.82,
        positionX: isMobile ? 0 : 1.5,
        positionY: isMobile ? -0.62 : -0.04,
        cameraX: isMobile ? 0 : 0.1,
        cameraY: isMobile ? 0.14 : -0.06,
        cameraZ: isMobile ? 7.15 : 6.18,
      },
    },
    {
      at: 3,
      target: {
        flavor: 3,
        rotationX: prefersReducedMotion ? 0.12 : 0.16,
        rotationY: prefersReducedMotion ? 0.75 : Math.PI * 3.02,
        rotationZ: prefersReducedMotion ? -0.04 : -0.34,
        scale: isMobile ? 0.72 : 0.78,
        positionX: isMobile ? 0 : 1.55,
        positionY: isMobile ? -0.6 : 0.06,
        cameraX: isMobile ? 0 : 0.08,
        cameraY: 0,
        cameraZ: isMobile ? 7.45 : 6.35,
      },
    },
  ];
}
