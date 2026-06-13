import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Blocks, Database, Shield, Zap, Globe } from 'lucide-react';

const ACCENT = '#FF8B2E';
gsap.registerPlugin(ScrollTrigger);
const TOTAL = 10;

const FEATURES = [
  { icon: Database, tag: 'STORAGE', title: 'Decentralized Storage', desc: 'Your data lives across thousands of nodes — not on one company\'s server.' },
  { icon: Shield,   tag: 'IDENTITY', title: 'Self-Sovereign Identity', desc: 'Own your digital identity with blockchain-grade cryptographic verification.' },
  { icon: Zap,      tag: 'SPEED',    title: 'Fast Transactions',      desc: 'Sub-3-second block times power real applications at scale.' },
  { icon: Globe,    tag: 'NETWORK',  title: 'Global Node Network',    desc: '10 000+ nodes worldwide deliver 99.99% uptime and censorship resistance.' },
];

const STATS = [
  { value: '10K+',   label: 'Active Nodes' },
  { value: '2M+',    label: 'Transactions' },
  { value: '< 3s',   label: 'Block Time' },
  { value: '99.99%', label: 'Uptime' },
];

const PersonaBlockchainPage = () => {
  const heroRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featRef  = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(TOTAL);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.persona-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.persona-stat',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 78%' } }
      );
      gsap.fromTo(
        '.persona-feat-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: featRef.current, start: 'top 72%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://personablockchain.com';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = ((TOTAL - countdown) / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-dark">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="persona-grid absolute inset-0" />
          <div className="persona-orb persona-orb-1 absolute" />
          <div className="persona-orb persona-orb-2 absolute" />
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className={`persona-block persona-block-${i} absolute`}>
              <div className="persona-block-inner" />
            </div>
          ))}
        </div>

        <div className="persona-hero-content relative z-10 flex flex-col items-center text-center px-6 py-40">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] inline-block" style={{ background: ACCENT }} />
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: ACCENT }}>SATOSHI HUB · PILLAR 03</span>
            <span className="w-8 h-[2px] inline-block" style={{ background: ACCENT }} />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-sm flex items-center justify-center" style={{ background: `${ACCENT}22` }}>
              <Blocks size={28} style={{ color: ACCENT }} />
            </div>
          </div>

          <h1 className="font-display font-bold text-[clamp(44px,7vw,88px)] leading-[0.9] tracking-tight text-foreground mb-6">
            Persona<br />
            <span style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT}55` }}>Blockchain</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed">
            A next-generation Layer&nbsp;1 powering identity, dApps, and enterprise solutions.
          </p>

          {/* Countdown */}
          <p className="text-sm font-mono mb-4" style={{ color: ACCENT }}>
            Redirecting in <span className="font-bold text-base">{countdown}s</span>
          </p>
          <div className="w-64 h-1 rounded-full overflow-hidden mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%`, background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
            />
          </div>

          <a
            href="https://personablockchain.com"
            rel="noopener noreferrer"
            className="px-7 py-3.5 font-semibold rounded-sm inline-flex items-center gap-2 group transition-all"
            style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 4px 20px ${ACCENT}4D` }}
          >
            Visit Now <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-16 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="persona-stat">
              <p className="font-display font-bold text-[clamp(28px,4vw,48px)] mb-1" style={{ color: ACCENT }}>{s.value}</p>
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} className="py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>TECHNOLOGY</span>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,50px)] tracking-tight">
              Built different. Built to last.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="persona-feat-card glass-card rounded-sm p-7 flex gap-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
                  <f.icon size={22} style={{ color: ACCENT }} />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: ACCENT }}>{f.tag}</div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-16 bg-dark-light text-center">
        <h2 className="font-display font-bold text-[clamp(26px,4vw,46px)] tracking-tight mb-5">
          Explore the full ecosystem
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-9 text-sm leading-relaxed">
          Visit the official Persona Blockchain website to see the roadmap, docs, and developer resources.
        </p>
        <a
          href="https://personablockchain.com"
          rel="noopener noreferrer"
          className="px-7 py-3.5 font-semibold rounded-sm inline-flex items-center gap-2 group transition-all"
          style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 4px 20px ${ACCENT}4D` }}
        >
          personablockchain.com <ExternalLink size={15} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </section>

    </div>
  );
};

export default PersonaBlockchainPage;
