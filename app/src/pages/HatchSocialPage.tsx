import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Lock, Users, Gift, ArrowRight, Heart } from 'lucide-react';

const ACCENT = '#2EE8FF';

const FEATURES = [
  {
    icon: Share2,
    title: 'Share & Rehatch',
    tag: 'PUBLIC FEED',
    desc: 'Post your thoughts, share media, and rehatch your favorite content. Build your voice in the Web3 community.',
    bullets: ['Rich media posts', 'Rehatch & comment', 'Trending topics', 'Crypto-verified profiles'],
  },
  {
    icon: Lock,
    title: 'Private Messaging',
    tag: 'END-TO-END ENCRYPTED',
    desc: 'Talk with your friends in fully encrypted private conversations. Your messages belong only to you.',
    bullets: ['E2E encryption', 'Disappearing messages', 'Secure file sharing', 'Voice & media'],
  },
  {
    icon: Users,
    title: 'Groups & Communities',
    tag: 'GROUPS',
    desc: 'Create or join groups for fun, creative projects, work, and everything in between. Invite friends and grow.',
    bullets: ['Public & private groups', 'Invite by link or wallet', 'Pinned announcements', 'Role management'],
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    tag: 'HATCH REWARDS',
    desc: 'Get rewarded in HATCH tokens for participation, engagement and community building. The more you contribute, the more you earn.',
    bullets: ['Daily engagement rewards', 'Content amplification bonus', 'Group creator earnings', 'Direct wallet payouts'],
  },
];

const MOCK_POSTS = [
  { user: '@satoshi_fan', text: 'Just hatched my first legendary #EggNFT! 🥚⚡ #HatchSocial', likes: 241, time: '3m' },
  { user: '@cryptobuild', text: 'HATCH rewards hit my wallet again 💚 This network keeps giving', likes: 89, time: '12m' },
  { user: '@web3_daily', text: 'Rehatch if you believe in decentralized social 🔁', likes: 512, time: '28m' },
];

gsap.registerPlugin(ScrollTrigger);

const HatchSocialPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.social-mock-post',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: feedRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(
        '.social-feature-card',
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
          <div className="social-mesh absolute inset-0" />
          <div className="social-pulse social-pulse-1 absolute" />
          <div className="social-pulse social-pulse-2 absolute" />
          <div className="social-pulse social-pulse-3 absolute" />
          <div className="social-orb absolute" />
        </div>
        <div className="social-hero-content relative z-10 w-full px-6 lg:px-16 py-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] inline-block" style={{ background: ACCENT }} />
              <span className="font-mono text-xs tracking-[0.3em]" style={{ color: ACCENT }}>SATOSHI HUB · PILLAR 02</span>
            </div>
            <h1 className="font-display font-bold text-[clamp(52px,8vw,100px)] leading-[0.88] tracking-tight text-foreground mb-6">
              Hatch<br />
              <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT}66` }}>Social</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-md">
              A social network owned by its users. Post, connect, earn—with crypto at the core.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-6 py-3 font-semibold rounded-sm flex items-center gap-2 group transition-all"
                style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 4px 20px ${ACCENT}4D` }}
              >
                Join Hatch Social <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-foreground hover:text-[#2EE8FF] transition-colors text-sm font-medium">Learn more →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE FEED ── */}
      <section ref={feedRef} className="relative py-24 px-6 lg:px-16 bg-dark-light">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>LIVE FEED</span>
            <h2 className="font-display font-bold text-[clamp(26px,3.5vw,44px)] tracking-tight mb-5">
              Your community,<br />your conversation.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
              Real-time posts, comments and rehatches from the most passionate Web3 community.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_POSTS.map((post) => (
              <div key={post.user} className="social-mock-post glass-card rounded-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-medium" style={{ color: ACCENT }}>{post.user}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{post.time} ago</span>
                </div>
                <p className="text-sm text-foreground mb-3">{post.text}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Heart size={12} style={{ color: ACCENT }} /> {post.likes}
                  </span>
                  <span className="text-xs cursor-pointer" style={{ color: ACCENT }}>Rehatch ↻</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featuresRef} className="relative py-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: ACCENT }}>CORE FEATURES</span>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,50px)] tracking-tight">
              Built for the Web3<br />generation.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="social-feature-card glass-card rounded-sm p-8 hover:-translate-y-1 transition-transform duration-300">
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

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative py-28 px-6 lg:px-16 overflow-hidden bg-dark-light">
        <div className="absolute inset-0 pointer-events-none">
          <div className="social-cta-glow absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] tracking-tight mb-5">
            Be part of the<br />
            <span style={{ color: ACCENT, textShadow: `0 0 30px ${ACCENT}55` }}>social revolution.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Join millions of users already posting, messaging and earning on Hatch Social.
          </p>
          <button
            className="px-8 py-3.5 font-semibold rounded-sm flex items-center gap-2 mx-auto group transition-all"
            style={{ background: ACCENT, color: '#0B0C10', boxShadow: `0 4px 20px ${ACCENT}4D` }}
          >
            Join Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default HatchSocialPage;
