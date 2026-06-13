import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Newspaper, Clock } from 'lucide-react';import { useIsMobile } from '../hooks/use-mobile';
gsap.registerPlugin(ScrollTrigger);

interface NewsSectionProps {
  className?: string;
}

const NewsSection = ({ className = '' }: NewsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const coinRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);

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
        { scale: 1.06, opacity: 0 },
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

      // Article card entrance
      scrollTl.fromTo(
        articleRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
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

      // Coin entrance
      scrollTl.fromTo(
        coinRef.current,
        { x: '10vw', rotateY: -70, opacity: 0 },
        { x: 0, rotateY: -20, opacity: 1, ease: 'none' },
        0.15
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
        articleRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
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

      scrollTl.fromTo(
        coinRef.current,
        { x: 0, rotateY: -20, opacity: 1 },
        { x: '18vw', rotateY: 60, opacity: 0, ease: 'power2.in' },
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
          background: 'radial-gradient(circle at 20% 22%, rgba(124,62,227,0.18), transparent 38%), radial-gradient(circle at 78% 76%, rgba(124,62,227,0.14), transparent 40%), linear-gradient(142deg, #0b0c10 8%, #1a1419 48%, #0b0c10 90%)'
        }} />
        <div className="absolute inset-0 opacity-24" style={{
          backgroundImage: 'linear-gradient(rgba(124,62,227,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,62,227,0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }} />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Neon Frame */}
      <div
        ref={frameRef}
        className="showcase-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[640px] aspect-square"
      >
        <div className="w-full h-full rounded-sm border border-[#7C3AED66] bg-[#0f1216d1] shadow-[0_0_40px_rgba(124,62,227,0.22)]">
          {/* Article Card inside frame */}
          <div
            ref={articleRef}
            className="absolute inset-4 lg:inset-8 flex items-center justify-center"
          >
            <div className="glass-card rounded-sm p-6 lg:p-8 w-full max-w-sm border border-[#7C3AED40]">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-mono rounded-sm" style={{ background: 'rgba(124,62,227,0.25)', color: '#7C3AED' }}>
                  LATEST
                </span>
                <span className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock size={12} />
                  2h ago
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-3">
                Satoshi Updates
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Latest ecosystem news from EggWallet, Hatch Social, Persona Blockchain, and IncubEx. Updates and announcements.
              </p>
              <a
                href="/hatch-social"
                className="inline-flex items-center gap-2 text-sm hover:underline group"
                style={{ color: '#7C3AED' }}
              >
                Read more
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Coin Badge */}
      <div
        ref={coinRef}
        className="news-coin absolute right-[8vw] top-[18vh] w-[15vw] max-w-[160px] aspect-square"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-20deg) rotateX(10deg)' }}
      >
        <img
          src="/CoinRend_01_200x200.gif"
          alt="Coin badge"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="showcase-content relative z-10 w-full h-full">
        {/* Top-left Headline */}
        <div
          ref={headlineRef}
          className="showcase-headline absolute left-6 lg:left-12 top-[16vh] max-w-md lg:max-w-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Newspaper size={20} style={{ color: '#7C3AED' }} />
            <span className="font-mono text-xs tracking-[0.2em]" style={{ color: '#7C3AED' }}>ECOSYSTEM NEWS</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] text-foreground leading-tight">
            Stay in the loop.
          </h2>
        </div>

        {/* Bottom-right Body */}
        <div
          ref={bodyRef}
          className="showcase-body absolute right-6 lg:right-12 bottom-[12vh] max-w-sm text-right"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ecosystem updates, product launches, and community highlights. Stay informed about the Satoshi Hub universe.
          </p>
          <a
            href="/hatch-social"
            className="inline-flex items-center gap-2 hover:underline group"
            style={{ color: '#7C3AED' }}
          >
            Read Updates
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
