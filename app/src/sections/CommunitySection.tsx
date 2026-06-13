import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, Blocks } from 'lucide-react';import { useIsMobile } from '../hooks/use-mobile';
gsap.registerPlugin(ScrollTrigger);

interface CommunitySectionProps {
  className?: string;
}

const CommunitySection = ({ className = '' }: CommunitySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: !isMobile,
          scrub: 0.6,
        },
      });

      // Background entrance
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Frame entrance
      scrollTl.fromTo(
        frameRef.current,
        { scale: 0.78, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-14vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { x: '14vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%) - hold

      // Exit animations (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        frameRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.1, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`showcase-section section-pinned bg-dark ${className}`}
    >
      {/* Animated Background */}
      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 22% 20%, rgba(255,139,46,0.18), transparent 38%), radial-gradient(circle at 80% 76%, rgba(255,139,46,0.16), transparent 40%), linear-gradient(145deg, #0b0c10 8%, #1b1411 46%, #0b0c10 90%)'
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,139,46,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,139,46,0.12) 1px, transparent 1px)',
          backgroundSize: '38px 38px'
        }} />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Neon Frame */}
      <div
        ref={frameRef}
        className="showcase-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[640px] aspect-square"
      >
        <div className="w-full h-full rounded-sm border border-[#FF8B2E66] bg-[#0f1216d1] shadow-[0_0_40px_rgba(255,139,46,0.24)] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#FF8B2E26] flex items-center justify-center">
                <Users size={28} style={{ color: '#FF8B2E' }} />
              </div>
              <div className="w-16 h-16 rounded-full bg-[#FF8B2E1A] flex items-center justify-center">
                <Blocks size={28} style={{ color: '#FF8B2E' }} />
              </div>
            </div>
            <p className="text-foreground font-display font-bold text-2xl mb-2">10,247</p>
            <p className="text-muted-foreground text-sm mb-3">Active Communities</p>
            <p className="text-[11px] font-mono tracking-widest" style={{ color: '#FF8B2E' }}>PERSONA + HATCH ECOSYSTEM</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="showcase-content relative z-10 w-full h-full">
        {/* Top-left Headline */}
        <div
          ref={headlineRef}
          className="showcase-headline absolute left-6 lg:left-12 top-[16vh] max-w-md lg:max-w-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} style={{ color: '#FF8B2E' }} />
            <span className="font-mono text-xs tracking-[0.2em]" style={{ color: '#FF8B2E' }}>COMMUNITIES</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] text-foreground leading-tight">
            Build with your network.
          </h2>
        </div>

        {/* Bottom-right Body */}
        <div
          ref={bodyRef}
          className="showcase-body absolute right-6 lg:right-12 bottom-[12vh] max-w-sm text-right"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Discover circles, events, and ecosystem updates across EggWallet, Hatch Social, Persona Blockchain, and IncubEx.
          </p>
          <a
            href="/persona-blockchain"
            className="inline-flex items-center gap-2 hover:underline group"
            style={{ color: '#FF8B2E' }}
          >
            Explore Persona
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
