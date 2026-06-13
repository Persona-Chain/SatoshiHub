import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Shield, Wallet } from 'lucide-react';import { useIsMobile } from '../hooks/use-mobile';
gsap.registerPlugin(ScrollTrigger);

interface WalletSectionProps {
  className?: string;
}

const WalletSection = ({ className = '' }: WalletSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const badgesRef = useRef<HTMLDivElement>(null);

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

      const badges = badgesRef.current?.querySelectorAll('.wallet-badge') || [];
      scrollTl.fromTo(
        badges,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
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
        badges,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
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
          background: 'radial-gradient(circle at 20% 30%, rgba(182,255,46,0.2), transparent 44%), radial-gradient(circle at 78% 72%, rgba(182,255,46,0.14), transparent 42%), linear-gradient(130deg, #0b0c10 10%, #12171a 52%, #0b0c10 90%)'
        }} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(182,255,46,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(182,255,46,0.08) 1px, transparent 1px)',
          backgroundSize: '34px 34px'
        }} />
        <div className="absolute inset-0 bg-dark/45" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Neon Frame */}
      <div
        ref={frameRef}
        className="showcase-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[640px] aspect-square"
      >
        <div className="w-full h-full rounded-sm border border-[#B6FF2E66] bg-[#0f1216d1] shadow-[0_0_40px_rgba(182,255,46,0.2)]">
          <div className="absolute inset-4 lg:inset-8 flex items-center justify-center">
            <div className="glass-card rounded-sm p-6 lg:p-8 w-full max-w-sm border border-[#B6FF2E40]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E2B] flex items-center justify-center">
                  <Wallet size={20} className="text-neon" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">Portfolio Balance</p>
                  <p className="text-2xl font-display font-bold text-foreground">$24,320.00</p>
                </div>
              </div>
              <div className="h-1 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="h-full rounded-full w-[72%] bg-neon" />
              </div>
              <div ref={badgesRef} className="grid grid-cols-3 gap-2">
                {['BTC', 'BSV', 'BCH', 'HATCH', 'MNEE', 'NFT'].map((coin) => (
                  <span key={coin} className="wallet-badge text-[11px] font-mono text-center py-1.5 rounded-sm border border-[#B6FF2E40] text-neon bg-[#B6FF2E14]">
                    {coin}
                  </span>
                ))}
              </div>
            </div>
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
            <Shield size={20} className="text-neon" />
            <span className="font-mono text-xs tracking-[0.2em] text-neon">EGGWALLET</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] text-foreground leading-tight">
            Your coins. One secure home.
          </h2>
        </div>

        {/* Bottom-right Body */}
        <div
          ref={bodyRef}
          className="showcase-body absolute right-6 lg:right-12 bottom-[12vh] max-w-sm text-right"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Manage BTC, BSV, BCH, HATCH, MNEE and NFT assets in a single dashboard with fast approvals and multi-chain clarity.
          </p>
          <div
            className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium"
            style={{
              color: '#B6FF2E',
              borderColor: 'rgba(182,255,46,0.35)',
              background: 'rgba(182,255,46,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            EggWallet Coming Soon
            <ArrowUpRight size={16} className="opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
