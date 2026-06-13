import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Bitcoin,
  CheckCircle2,
  Clock3,
  Globe2,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import BountyBeeLogo from '../components/BountyBeeLogo';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#F7931A';

const FEATURES = [
  {
    icon: Bitcoin,
    tag: 'BSV PAYMENTS',
    title: 'Instant Bitcoin Payments',
    desc: 'Get paid through the Bitcoin SV network without traditional payment delays or intermediaries.',
  },
  {
    icon: ShieldCheck,
    tag: 'PROTECTED WORK',
    title: 'Secure Escrow',
    desc: 'Funds are secured for each task and released when submitted work is reviewed and approved.',
  },
  {
    icon: Clock3,
    tag: 'MICRO-TASKS',
    title: 'Fast Turnaround',
    desc: 'Find focused work designed to be completed in hours rather than stretched across weeks.',
  },
  {
    icon: Globe2,
    tag: 'BORDERLESS',
    title: 'Global Marketplace',
    desc: 'Connect employers and independent talent worldwide through open Bitcoin-funded opportunities.',
  },
  {
    icon: Zap,
    tag: '5% PLATFORM FEE',
    title: 'Keep More',
    desc: 'A transparent 5% platform fee leaves freelancers with more of the value they create.',
  },
  {
    icon: Star,
    tag: 'REPUTATION',
    title: 'Verified Track Record',
    desc: 'Build reputation with completed work, reviews, and reliable delivery to unlock better opportunities.',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Browse Tasks',
    desc: 'Explore Bitcoin-funded work across development, design, writing, research, and more.',
  },
  {
    number: '02',
    title: 'Apply & Deliver',
    desc: 'Choose work that matches your skills, complete it, and submit the result for review.',
  },
  {
    number: '03',
    title: 'Get Paid in BSV',
    desc: 'Once approved, the secured reward is released to your BountyBee wallet.',
  },
];

const BountyBeePage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bountybee-hero-content > *',
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );
      gsap.fromTo(
        '.bountybee-feature-card',
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 72%' },
        }
      );
      gsap.fromTo(
        '.bountybee-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 76%' },
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToMarketplace = () => {
    document.getElementById('bountybee-how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-dark">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bountybee-grid absolute inset-0" />
          <div className="bountybee-orb bountybee-orb-main absolute" />
          <div className="bountybee-orb bountybee-orb-secondary absolute" />
          <div className="bountybee-honeycomb absolute inset-0" />
        </div>

        <div className="bountybee-hero-content relative z-10 w-full px-6 lg:px-16 py-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-7">
              <BountyBeeLogo className="h-12 w-12" iconClassName="h-8 w-8" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.26em] block mb-1" style={{ color: ACCENT }}>
                  SATOSHI HUB · PROJECT 05
                </span>
                <span className="text-sm text-muted-foreground">Bitcoin-powered work marketplace</span>
              </div>
            </div>

            <h1 className="font-display font-bold text-[clamp(50px,8vw,100px)] leading-[0.88] tracking-tight text-foreground mb-7">
              Bounty<span style={{ color: ACCENT, textShadow: `0 0 34px ${ACCENT}55` }}>Bee</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Complete focused tasks, build your reputation, and get paid in Bitcoin SV. A faster, fairer marketplace for digital work.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToMarketplace}
                className="px-6 py-3.5 font-semibold rounded-sm flex items-center gap-2 group transition-all"
                style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 5px 24px ${ACCENT}45` }}
              >
                Explore BountyBee
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 border rounded-sm text-sm font-semibold transition-colors hover:bg-white/5"
                style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
              >
                See Features
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-10">
              {['BITCOIN SV', 'ESCROW', 'MICRO-TASKS', '5% FEE', 'REPUTATION'].map((label) => (
                <span
                  key={label}
                  className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-sm border"
                  style={{ color: ACCENT, borderColor: `${ACCENT}3D`, background: `${ACCENT}0D` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="relative py-28 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>
              BUILT FOR THE BITCOIN ECONOMY
            </span>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,50px)] tracking-tight">
              Real work. Protected payments.<br />Borderless opportunity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="bountybee-feature-card glass-card rounded-sm p-7">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                  style={{ background: `${ACCENT}18` }}
                >
                  <feature.icon size={23} style={{ color: ACCENT }} />
                </div>
                <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: ACCENT }}>
                  {feature.tag}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bountybee-how-it-works" ref={stepsRef} className="relative py-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>
              HOW IT WORKS
            </span>
            <h2 className="font-display font-bold text-[clamp(30px,4vw,52px)] tracking-tight mb-5">
              Three steps from skill to sats.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              BountyBee keeps the workflow simple while escrow and on-chain payments handle the trust layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((step) => (
              <article key={step.number} className="bountybee-step relative glass-card rounded-sm p-7 overflow-hidden">
                <span
                  className="absolute -right-2 -top-5 font-display font-bold text-[88px] leading-none"
                  style={{ color: `${ACCENT}12` }}
                >
                  {step.number}
                </span>
                <span className="font-mono text-xs tracking-widest" style={{ color: ACCENT }}>{step.number}</span>
                <h3 className="font-display font-bold text-xl mt-8 mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-28 px-6 lg:px-16 overflow-hidden bg-dark-light">
        <div className="bountybee-cta-glow absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-7">
            <BountyBeeLogo className="h-16 w-16" iconClassName="h-10 w-10" />
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] tracking-tight mb-5">
            Turn useful work into<br />
            <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT}55` }}>Bitcoin earnings.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            BountyBee connects practical tasks with global talent and settles approved work through Bitcoin SV.
          </p>
          <button
            onClick={scrollToMarketplace}
            className="px-8 py-3.5 font-semibold rounded-sm inline-flex items-center gap-2 group transition-all"
            style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 5px 24px ${ACCENT}45` }}
          >
            Discover How It Works
            <CheckCircle2 size={17} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default BountyBeePage;
