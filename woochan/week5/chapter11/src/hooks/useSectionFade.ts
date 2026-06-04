import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionFade = (): void => {
  useEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>('.fade-target');

    targets.forEach((target) => {
      gsap.fromTo(
        target,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
          },
        },
      );
    });
  }, []);
};
