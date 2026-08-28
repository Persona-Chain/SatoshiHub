import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import FeatureSection from '../sections/FeatureSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all sections have mounted
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    const world = worldRef.current;
    if (!main || !world || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        world,
        { scale: 1.04, yPercent: 0, xPercent: 0 },
        {
          scale: 1.12,
          yPercent: -3,
          xPercent: 1.25,
          ease: 'none',
          scrollTrigger: { trigger: main, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
        },
      );
    }, main);

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      world.style.setProperty('--pointer-x', `${x * 14}px`);
      world.style.setProperty('--pointer-y', `${y * 10}px`);
      world.style.setProperty('--pointer-x-reverse', `${x * -8}px`);
      world.style.setProperty('--pointer-y-reverse', `${y * -5}px`);
      world.style.setProperty('--pointer-x-soft', `${x * -4}px`);
      world.style.setProperty('--pointer-y-soft', `${y * -2}px`);
    };
    const resetPointer = () => {
      world.style.setProperty('--pointer-x', '0px');
      world.style.setProperty('--pointer-y', '0px');
      world.style.setProperty('--pointer-x-reverse', '0px');
      world.style.setProperty('--pointer-y-reverse', '0px');
      world.style.setProperty('--pointer-x-soft', '0px');
      world.style.setProperty('--pointer-y-soft', '0px');
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetPointer);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', resetPointer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative isolate">
      <div ref={worldRef} className="fixed inset-[-4%] z-0 overflow-hidden bg-dark" aria-hidden="true">
        <div className="incubator-world-motion absolute inset-0">
          <img src="/satoshi-hub-cinematic-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <img src="/satoshi-hub-cinematic-hero.png" alt="" className="incubator-parallax-layer incubator-layer-capsule" />
          <img src="/satoshi-hub-cinematic-hero.png" alt="" className="incubator-parallax-layer incubator-layer-samurai" />
          <img src="/satoshi-hub-cinematic-hero.png" alt="" className="incubator-parallax-layer incubator-layer-foreground" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.42)_100%)]" />
      </div>
      <HeroSection className="z-10" />
      <FeatureSection className="z-20" />
      <ContactSection className="z-30" />
    </div>
  );
};

export default HomePage;
