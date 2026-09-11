import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createSceneTimeline(
  scope: Element,
  trigger: Element,
  build: (timeline: gsap.core.Timeline) => void,
) {
  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
    build(timeline);
  }, scope);

  return () => context.revert();
}
