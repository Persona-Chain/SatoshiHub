import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Droplets, ArrowRightLeft, Shield, ArrowRight, BarChart3, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#C02EFF';

const FEATURES = [
  {
    icon: ArrowRightLeft, tag: 'SPOT TRADING', title: 'Instant Swaps',
    desc: 'Buy and sell with tight spreads and competitive maker/taker fees.',
    bullets: ['0.1% maker fee', '0.2% taker fee', 'Multi-path routing', '10+ pairs'],
  },
  {
    icon: Droplets, tag: 'LIQUIDITY', title: 'Liquidity Pools',
    desc: 'Deposit assets, earn a share of every trade that flows through the pool.',
    bullets: ['Up to 24% APR', 'Auto-compound', 'Dual rewards', 'No lockup'],
  },
  {
    icon: BarChart3, tag: 'CHARTS', title: 'Pro Charts',
    desc: 'TradingView-grade charts with 50+ indicators and drawing tools.',
    bullets: ['50+ indicators', 'Order flow', 'Multi-timeframe', 'Alert system'],
  },
  {
    icon: Zap, tag: 'EXECUTION', title: 'Ultra-Fast Engine',
    desc: 'Sub-10ms order matching built for high-frequency strategies.',
    bullets: ['< 10ms latency', 'Limit & stop', 'Batch orders', 'MEV protection'],
  },
];

const STATS = [
  { value: '$2.4B+', label: '24h Volume' },
  { value: '150+',   label: 'Trading Pairs' },
  { value: '50K+',   label: 'Active Traders' },
  { value: '< 10ms', label: 'Execution Time' },
];

const PAIRS = [
  { pair: 'HATCH/MNEE', price: '0.01',    change: '+5.2%', up: true },
  { pair: 'BSV/MNEE',   price: '15.20',   change: '-1.8%', up: false },
  { pair: 'BTC/MNEE',   price: '67,420',  change: '+2.1%', up: true },
  { pair: 'BCH/MNEE',   price: '385.50',  change: '+0.8%', up: true },
];

const IncubExPage = () => {
  const heroRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const marketsRef  = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.incubex-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.incubex-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(
        '.incubex-feat-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 72%' } }
      );
      gsap.fromTo(
        '.incubex-pair-row',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: marketsRef.current, start: 'top 76%' } }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="incubex-chart-grid absolute inset-0" />
          <div className="incubex-orb incubex-orb-1 absolute" />
          <div className="incubex-orb incubex-orb-2 absolute" />
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className={`incubex-candle incubex-candle-${i} absolute`} />
          ))}
        </div>
        <div className="incubex-hero-content relative z-10 w-full px-6 lg:px-16 py-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] inline-block" style={{ background: ACCENT }} />
              <span className="font-mono text-xs tracking-[0.3em]" style={{ color: ACCENT }}>SATOSHI HUB · PILLAR 04</span>
            </div>
            <h1 className="font-display font-bold text-[clamp(52px,8vw,100px)] leading-[0.88] tracking-tight text-foreground mb-6">
              Incub<br />
              <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT}66` }}>Ex</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-md">
              The decentralized exchange built for serious traders. Deep liquidity, pro charts, lightning execution.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-6 py-3 font-semibold rounded-sm flex items-center gap-2 group transition-all"
                style={{ background: ACCENT, color: '#fff', boxShadow: `0 4px 20px ${ACCENT}4D` }}
              >
                Start Trading <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-foreground hover:text-[#C02EFF] transition-colors text-sm font-medium">View Markets →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section ref={statsRef} className="py-14 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="incubex-stat">
              <p className="font-display font-bold text-[clamp(24px,3.5vw,44px)] mb-1" style={{ color: ACCENT }}>{s.value}</p>
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featuresRef} className="py-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>CORE FEATURES</span>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,50px)] tracking-tight">
              Professional tools.<br />Decentralized roots.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="incubex-feat-card glass-card rounded-sm p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
                    <feat.icon size={24} style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: ACCENT }}>{feat.tag}</div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{feat.desc}</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {feat.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section ref={marketsRef} className="py-24 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>MARKETS</span>
            <h2 className="font-display font-bold text-[clamp(26px,3.5vw,44px)] tracking-tight mb-5">
              Deep liquidity<br />on every pair.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Smart order routing across multiple sources ensures best execution every time.
            </p>
            <div className="flex items-center gap-3">
              <Shield size={16} style={{ color: ACCENT }} />
              <span className="text-xs text-muted-foreground font-mono">MEV-protected execution</span>
            </div>
          </div>
          <div className="glass-card rounded-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-muted-foreground tracking-widest">TRENDING PAIRS</span>
              <TrendingUp size={16} style={{ color: ACCENT }} />
            </div>
            <div className="flex flex-col gap-3">
              {PAIRS.map((p) => (
                <div key={p.pair} className="incubex-pair-row flex items-center justify-between px-4 py-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <span className="font-mono text-sm text-foreground">{p.pair}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">${p.price}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: p.up ? '#B6FF2E' : '#FF4444' }}>{p.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative py-28 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="incubex-cta-glow absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] tracking-tight mb-5">
            Ready to trade<br />
            <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT}55` }}>like a pro?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Join 50 000+ traders already using IncubEx's next-gen DEX infrastructure.
          </p>
          <button
            className="px-8 py-3.5 font-semibold rounded-sm flex items-center gap-2 mx-auto group transition-all"
            style={{ background: ACCENT, color: '#fff', boxShadow: `0 4px 20px ${ACCENT}4D` }}
          >
            Launch App <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default IncubExPage;
