import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const STATS = [
  { value: '1M+', label: 'Wallets Created' },
  { value: '$4.2B', label: 'Trading Volume' },
  { value: '180+', label: 'Countries' },
];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Entrance animation
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        coinRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll('.headline-line') ?? [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 },
          '-=0.6'
        )
        .fromTo(
          subheadlineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          '-=0.35'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.35'
        )
        .fromTo(
          statsRef.current?.querySelectorAll('.stat-item') ?? [],
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Scroll-driven exit
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: !isMobile, // Disable pin on mobile
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(
              [coinRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, statsRef.current],
              { opacity: 1, x: 0, y: 0, scale: 1 }
            );
          },
        },
      });

      scrollTl.fromTo(
        coinRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.5, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
        0.72
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '5vh', opacity: 0, ease: 'power2.in' },
        0.74
      );
      scrollTl.fromTo(
        statsRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`hero-section section-pinned bg-dark overflow-hidden ${className}`}>

      {/* ── ANIMATED BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Slow-drifting dot grid */}
        <div className="hero-dot-grid absolute inset-0" />
        {/* Glowing aurora orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        {/* Horizontal scanline sweep */}
        <div className="hero-scanline" />
        {/* Bottom horizon glow */}
        <div className="hero-horizon" />
      </div>

      {/* ── COIN + ORBITAL RINGS (centered, single instance) ── */}
      <div className="hero-visual absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Outer dashed rotating ring */}
          <div className="hero-ring hero-ring-outer absolute" />
          {/* Inner counter-rotating ring */}
          <div className="hero-ring hero-ring-inner absolute" />
          {/* Ambient pulse glow */}
          <div className="hero-coin-glow absolute" />
          {/* The coin — only once */}
          <img
            ref={coinRef}
            src="/CoinRend_01_200x200.gif"
            alt="Satoshi Coin"
            className="relative z-10 w-[220px] h-[220px] md:w-[300px] md:h-[300px] object-contain"
          />
        </div>
      </div>

      {/* ── HEADLINE (top-left) ── */}
      <div ref={headlineRef} className="hero-headline absolute left-6 lg:left-14 top-[13vh] z-20 max-w-lg">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-[2px] bg-neon inline-block" />
          <span className="font-mono text-xs tracking-[0.25em] text-neon uppercase">Web3 Ecosystem</span>
        </div>
        <h1 className="font-display font-bold text-foreground">
          <span className="headline-line block text-[clamp(40px,6.5vw,78px)] leading-[0.93] tracking-tight">
            YOUR
          </span>
          <span className="headline-line block text-[clamp(40px,6.5vw,78px)] leading-[0.93] tracking-tight neon-text">
            CRYPTO
          </span>
          <span className="headline-line block text-[clamp(40px,6.5vw,78px)] leading-[0.93] tracking-tight">
            HUB
          </span>
        </h1>
      </div>

      {/* ── SUBHEADLINE + CTA (bottom-left) ── */}
      <div className="hero-copy absolute left-6 lg:left-14 bottom-[10vh] z-20 max-w-sm">
        <p ref={subheadlineRef} className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-7">
          The hub for digital identity and interoperable applications
        </p>
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <button className="btn-primary flex items-center gap-2 group">
            Create Identity
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-foreground hover:text-neon transition-colors text-sm font-medium tracking-wide">
            Explore Features →
          </button>
        </div>
      </div>

      {/* ── STATS (right column) ── */}
      <div ref={statsRef} className="hero-stats absolute right-6 lg:right-14 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8 text-right">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-item">
            <div className="font-display font-bold text-[clamp(24px,3.2vw,40px)] text-foreground leading-none">
              {value}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1.5 uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HeroSection;
