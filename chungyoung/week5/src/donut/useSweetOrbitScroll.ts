import { useEffect, useRef } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flavors, getFlavorIndexFromProgress } from "./flavors";
import { getInitialMotion, getScrollTimelineSteps } from "./motion";
import type { MotionRef } from "./types";

gsap.registerPlugin(ScrollTrigger);

type UseSweetOrbitScrollParams = {
  rootRef: RefObject<HTMLDivElement | null>;
  experienceRef: RefObject<HTMLElement | null>;
  motionRef: MotionRef;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  setActiveFlavorIndex: Dispatch<SetStateAction<number>>;
};

export function useSweetOrbitScroll({
  rootRef,
  experienceRef,
  motionRef,
  isMobile,
  prefersReducedMotion,
  setActiveFlavorIndex,
}: UseSweetOrbitScrollParams) {
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const experience = experienceRef.current;

    if (!root || !experience) {
      return;
    }

    const motion = motionRef.current;
    Object.assign(motion, getInitialMotion(isMobile));

    const syncProgress = (progress: number) => {
      const nextIndex = getFlavorIndexFromProgress(progress);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveFlavorIndex(nextIndex);
      }
    };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "sweet-orbit",
          trigger: experience,
          start: "top top",
          end: "bottom bottom",
          scrub: prefersReducedMotion ? true : 0.9,
          onUpdate: (self) => syncProgress(self.progress),
        },
      });

      getScrollTimelineSteps({ isMobile, prefersReducedMotion }).forEach(({ target, at }) => {
        timeline.to(motion, target, at);
      });

      syncProgress(timeline.scrollTrigger?.progress ?? 0);
    }, root);

    return () => ctx.revert();
  }, [experienceRef, isMobile, motionRef, prefersReducedMotion, rootRef, setActiveFlavorIndex]);
}
