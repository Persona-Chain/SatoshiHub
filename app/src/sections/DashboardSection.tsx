import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BarChart3, TrendingUp, Shield } from 'lucide-react';import { useIsMobile } from '../hooks/use-mobile';
gsap.registerPlugin(ScrollTrigger);

interface DashboardSectionProps {
  className?: string;
}

const DashboardSection = ({ className = '' }: DashboardSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const dashboardRef = useRef<HTMLDivElement>(null);

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

      // Dashboard UI entrance
      scrollTl.fromTo(
        dashboardRef.current,
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
        dashboardRef.current,
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
          background: 'radial-gradient(circle at 24% 24%, rgba(0,188,212,0.2), transparent 40%), radial-gradient(circle at 76% 78%, rgba(0,188,212,0.16), transparent 38%), linear-gradient(135deg, #0b0c10 10%, #1a1820 50%, #0b0c10 90%)'
        }} />
        <div className="absolute inset-0 opacity-28" style={{
          backgroundImage: 'linear-gradient(rgba(0,188,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute inset-0 bg-dark/48" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Neon Frame */}
      <div
        ref={frameRef}
        className="showcase-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[640px] aspect-square"
      >
        <div className="w-full h-full rounded-sm border border-[#00BCD466] bg-[#0f1216d1] shadow-[0_0_40px_rgba(0,188,212,0.2)]">
          {/* Dashboard UI inside frame */}
          <div
            ref={dashboardRef}
            className="absolute inset-4 lg:inset-8 flex items-center justify-center"
          >
            <div className="glass-card rounded-sm p-6 lg:p-8 w-full max-w-sm border border-[#00BCD440]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,188,212,0.25)' }}>
                    <BarChart3 size={20} style={{ color: '#00BCD4' }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">Multi-Asset Portfolio</p>
                    <p className="text-lg font-display font-bold text-foreground">$42,891.50</p>
                  </div>
                </div>
                <div className="flex items-center gap-1" style={{ color: '#00BCD4' }}>
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">+8.2%</span>
                </div>
              </div>
              
              {/* Mini Chart */}
              <div className="h-16 mb-6 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{ background: 'rgba(0,188,212,0.35)', height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Security Score */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-sm">
                <Shield size={18} style={{ color: '#00BCD4' }} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Security Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full rounded-full" style={{ background: '#00BCD4' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#00BCD4' }}>92%</span>
                  </div>
                </div>
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
            <BarChart3 size={20} style={{ color: '#00BCD4' }} />
            <span className="font-mono text-xs tracking-[0.2em]" style={{ color: '#00BCD4' }}>UNIFIED DASHBOARD</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] text-foreground leading-tight">
            All your assets, one view.
          </h2>
        </div>

        {/* Bottom-right Body */}
        <div
          ref={bodyRef}
          className="showcase-body absolute right-6 lg:right-12 bottom-[12vh] max-w-sm text-right"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Manage your EggWallet, Hatch Social, and IncubEx positions in one dashboard. Real-time portfolio tracking across the Satoshi Hub ecosystem.
          </p>
          <a
            href="/eggwallet"
            className="inline-flex items-center gap-2 hover:underline group"
            style={{ color: '#00BCD4' }}
          >
            Open Dashboard
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
