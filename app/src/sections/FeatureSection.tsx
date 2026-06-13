import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Wallet, MessageCircle, Blocks, TrendingUp, ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'eggwallet',
    path: '/eggwallet',
    tag: 'GAMING · IDENTITY · GROWTH',
    name: 'EggWallet',
    desc: 'Multi-chain wallet for digital identity powered by the growth of your digital persona',
    icon: Wallet,
    accent: '#B6FF2E',
    comingSoon: true,
  },
  {
    id: 'hatch-social',
    path: '/hatch-social',
    tag: 'SOCIAL · WEB3',
    name: 'Hatch Social',
    desc: 'Post, rehatch, message privately, join groups and earn HATCH rewards for your engagement.',
    icon: MessageCircle,
    accent: '#2EE8FF',
    comingSoon: true,
  },
  {
    id: 'persona',
    path: '/persona-blockchain',
    tag: 'BLOCKCHAIN · IDENTITY',
    name: 'Persona',
    desc: 'Own your on-chain identity. Decentralized storage and global verification, all on-chain.',
    icon: Blocks,
    accent: '#FF8B2E',
    externalUrl: 'https://personablockchain.com',
  },
  {
    id: 'incubex',
    path: '/incubex',
    tag: 'DEX · TRADING',
    name: 'IncubEx',
    desc: 'Decentralized exchange with spot trading, liquidity pools and lightning-fast execution.',
    icon: TrendingUp,
    accent: '#C02EFF',
    comingSoon: true,
  },
  {
    id: 'bountybee',
    path: '/bountybee',
    tag: 'WORK · TASKS · BITCOIN SV',
    name: 'BountyBee',
    desc: 'A Bitcoin-powered micro-freelancing marketplace with escrow, reputation, and instant BSV payments.',
    icon: BriefcaseBusiness,
    accent: '#F7931A',
  },
];

interface FeatureSectionProps {
  className?: string;
}

const FeatureSection = ({ className = '' }: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      const cards = cardsRef.current?.querySelectorAll('.project-card') ?? [];
      scrollTl.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'none', stagger: 0.06 },
        0.05
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: -30, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cards,
        { y: 0, opacity: 1 },
        { y: -50, opacity: 0, ease: 'power2.in', stagger: 0.04 },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`ecosystem-section section-pinned bg-dark overflow-hidden ${className}`}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="feat-hex-grid absolute inset-0" />
        <div className="feat-orb feat-orb-tl absolute" />
        <div className="feat-orb feat-orb-br absolute" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 lg:px-12 py-16">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10">
          <span className="font-mono text-xs tracking-[0.3em] text-neon uppercase mb-3 block">
            The Ecosystem
          </span>
          <h2 className="font-display font-bold text-[clamp(30px,5vw,58px)] tracking-tight leading-tight">
            Five Connected Projects.{' '}
            <span className="neon-text">One Connected System.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Wallets, social, blockchain identity, decentralized trading, and Bitcoin-powered work in one ecosystem.
          </p>
        </div>

        {/* Ecosystem Project Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="project-card group glass-card rounded-sm p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {p.comingSoon && (
                <div
                  className="absolute right-3 top-3 z-20 rounded-full border px-2.5 py-1 text-[10px] font-mono tracking-[0.12em] uppercase flex items-center gap-1.5"
                  style={{
                    color: p.accent,
                    borderColor: `${p.accent}66`,
                    background: `${p.accent}14`,
                    boxShadow: `0 0 20px ${p.accent}30`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: p.accent }}
                  />
                  Coming Soon
                </div>
              )}

              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: `${p.accent}18` }}
                >
                  <p.icon size={22} style={{ color: p.accent }} />
                </div>
                <ArrowUpRight
                  size={15}
                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
                  style={{ color: p.accent }}
                />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: p.accent }}>
                  {p.tag}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
              </div>

              {p.comingSoon ? (
                <div
                  className="mt-auto text-xs font-medium flex items-center justify-between rounded-sm border px-3 py-2"
                  style={{
                    color: p.accent,
                    borderColor: `${p.accent}55`,
                    background: `${p.accent}0D`,
                  }}
                >
                  <span>Launch in progress</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase">Coming Soon</span>
                </div>
              ) : p.externalUrl ? (
                <a
                  href={p.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-xs font-medium inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity w-fit hover:underline"
                  style={{ color: p.accent }}
                >
                  Explore <ArrowUpRight size={11} />
                </a>
              ) : (
                <Link
                  to={p.path}
                  className="mt-auto text-xs font-medium inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity w-fit hover:underline"
                  style={{ color: p.accent }}
                >
                  Explore <ArrowUpRight size={11} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
