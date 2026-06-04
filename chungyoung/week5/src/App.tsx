import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CopyPanels } from "./donut/CopyPanels";
import { FlavorRail } from "./donut/FlavorRail";
import { SweetOrbitScene } from "./donut/SweetOrbitScene";
import { flavors } from "./donut/flavors";
import { initialMotion } from "./donut/motion";
import { useMediaQuery } from "./donut/useMediaQuery";
import { useSweetOrbitScroll } from "./donut/useSweetOrbitScroll";
import type { Flavor, MotionState } from "./donut/types";

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const motionRef = useRef<MotionState>({ ...initialMotion });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [activeFlavorIndex, setActiveFlavorIndex] = useState(0);
  const activeFlavor = flavors[activeFlavorIndex];

  useSweetOrbitScroll({
    rootRef,
    experienceRef,
    motionRef,
    isMobile,
    prefersReducedMotion,
    setActiveFlavorIndex,
  });

  return (
    <main ref={rootRef} className="sweet-orbit" style={getThemeStyle(activeFlavor)}>
      <section ref={experienceRef} className="experience" aria-labelledby="page-title">
        <SweetOrbitScene motionRef={motionRef} prefersReducedMotion={prefersReducedMotion} />
        <FlavorRail activeIndex={activeFlavorIndex} />
        <CopyPanels />
      </section>
    </main>
  );
}

function getThemeStyle(flavor: Flavor) {
  return {
    "--theme-bg": flavor.bg,
    "--theme-bg-2": flavor.bg2,
    "--theme-ink": flavor.ink,
    "--theme-accent": flavor.accent,
  } as CSSProperties;
}

export default App;
