import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupAnimations = () => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray('.section').forEach((section) => {
      const content = section.querySelector('.content');

      if (!content) return;

      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        },
      );
    });
  });

  return () => ctx.revert();
};
