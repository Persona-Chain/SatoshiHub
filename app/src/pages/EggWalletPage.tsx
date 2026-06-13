import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wallet, ShoppingCart, Gamepad2, Pickaxe, ArrowRight, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Wallet,
    title: 'Multi-Chain Wallet',
    tag: 'WALLET',
    desc: 'One secure vault for all your assets. Manage Hatch Coin, BSV, BTC, BCH, MNEE and your NFT collection from a single, human-friendly dashboard.',
    bullets: ['Hatch Coin (HATCH)', 'Bitcoin BSV & BTC', 'Bitcoin Cash (BCH)', 'MNEE + NFT Wallet'],
  },
  {
    icon: ShoppingCart,
    title: 'NFT Marketplace',
    tag: 'MARKETPLACE',
    desc: 'Buy and sell NFTs using any supported coin. Browse a marketplace of digital collectibles, game assets, and art with instant on-chain settlement.',
    bullets: ['Pay with any supported coin', 'Verified creator badges', 'Royalty-enabled smart sales', 'Cross-chain listings'],
  },
  {
    icon: Gamepad2,
    title: 'Egg Evolution',
    tag: '3D NFT GAMING',
    desc: 'Hatch, evolve and customize your 3D cyborg egg NFT. Equip weapons, armory, body clothes and spheres to power up your one-of-a-kind character.',
    bullets: ['3D NFT technology', 'Weapons & armory slots', 'Body clothes & spheres', 'Power rankings on-chain'],
  },
  {
    icon: Pickaxe,
    title: 'Hatch Coin Mining',
    tag: 'CLOUD MINING',
    desc: 'Mine HATCH by renting hashing power. No expensive hardware—earn passive income while supporting the Hatch Coin network.',
    bullets: ['Rent hashing power', 'Real-time earnings dashboard', 'Instant HATCH payouts', 'Scalable pool tiers'],
  },
];

const COINS = ['BTC', 'BSV', 'BCH', 'HATCH', 'MNEE', 'NFT'];

gsap.registerPlugin(ScrollTrigger);

const EggWalletPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.egg-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.egg-feature-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 72%' } }
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
          <div className="egg-honeycomb absolute inset-0" />
          <div className="egg-orb egg-orb-main absolute" />
          <div className="egg-orb egg-orb-sec absolute" />
          {COINS.map((coin, i) => (
            <div key={coin} className={`egg-floating-coin egg-coin-${i + 1} absolute`}>{coin}</div>
          ))}
        </div>

        <div className="egg-hero-content relative z-10 w-full px-6 lg:px-16 py-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-neon inline-block" />
              <span className="font-mono text-xs tracking-[0.3em] text-neon">SATOSHI HUB · PILLAR 01</span>
            </div>
            <h1 className="font-display font-bold text-[clamp(52px,8vw,100px)] leading-[0.88] tracking-tight text-foreground mb-6">
              Egg<br /><span className="neon-text">Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-md">
              Your multi-chain vault. Hold, trade, evolve and mine—all in one secure, human-friendly wallet.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary flex items-center gap-2 group">
                Get EggWallet <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline text-sm py-2.5 px-5">View Demo</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-10">
              {COINS.map((coin) => (
                <span key={coin} className="font-mono text-[11px] tracking-widest px-3 py-1.5 bg-neon/5 border border-neon/20 text-neon rounded-sm">
                  {coin}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featuresRef} className="relative py-28 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-neon mb-3 block">WHAT'S INSIDE</span>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,50px)] tracking-tight">
              Everything you need,<br />nothing you don't.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="egg-feature-card glass-card rounded-sm p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-sm bg-neon/10 flex items-center justify-center shrink-0">
                    <feat.icon size={24} className="text-neon" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-neon mb-1">{feat.tag}</div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{feat.desc}</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {feat.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
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

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative py-28 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="egg-cta-glow absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-sm bg-neon/15 flex items-center justify-center">
              <Shield size={32} className="text-neon" />
            </div>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] tracking-tight mb-5">
            Secured by design.<br /><span className="neon-text">Yours by default.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Non-custodial, multi-chain, always in your control. EggWallet keeps your keys and your peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary flex items-center gap-2 group">
              Launch EggWallet <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline text-sm py-2.5 px-5">View Demo</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EggWalletPage;
