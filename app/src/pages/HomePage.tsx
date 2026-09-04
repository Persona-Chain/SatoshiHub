import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import FeatureSection from '../sections/FeatureSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={mainRef} className="relative isolate">
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-black" aria-hidden="true">
        <div className="incubator-art-frame">
          <picture className="absolute inset-0">
            <img src="/satoshi-hub-illustration.webp" alt="" className="h-full w-full object-cover" />
          </picture>
          <img src="/satoshi-hub-eggless-plate.png" alt="" className="incubator-egg-removal-plate" />
          <div className="incubator-egg">
            <img src="/satoshi-hub-egg.png" alt="" />
          </div>
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
