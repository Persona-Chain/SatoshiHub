import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageCircle, Heart } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

interface SocialSectionProps {
  className?: string;
}

const SocialSection = ({ className = '' }: SocialSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const chatCardsRef = useRef<HTMLDivElement>(null);

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

      // Chat cards stagger entrance
      const chatCards = chatCardsRef.current?.querySelectorAll('.chat-card') || [];
      scrollTl.fromTo(
        chatCards[0],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(
        chatCards[1],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );
      scrollTl.fromTo(
        chatCards[2],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
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
        chatCards,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
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
          background: 'radial-gradient(circle at 18% 26%, rgba(46,232,255,0.16), transparent 38%), radial-gradient(circle at 82% 74%, rgba(46,232,255,0.18), transparent 40%), linear-gradient(140deg, #0b0c10 8%, #101a1e 48%, #0b0c10 88%)'
        }} />
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'linear-gradient(rgba(46,232,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,232,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Neon Frame */}
      <div
        ref={frameRef}
        className="showcase-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[640px] aspect-square"
      >
        <div className="w-full h-full rounded-sm border border-[#2EE8FF66] bg-[#0f1216d1] shadow-[0_0_40px_rgba(46,232,255,0.22)]">
          {/* Chat Cards inside frame */}
          <div
            ref={chatCardsRef}
            className="absolute inset-4 lg:inset-8 flex flex-col justify-center gap-3"
          >
            <div className="chat-card glass-card rounded-sm p-4 max-w-[80%] border border-[#2EE8FF3A]">
              <p className="text-sm text-foreground">Live now: Egg evolution season 2 just dropped.</p>
              <span className="text-xs text-muted-foreground mt-1 block">@mintqueen · 2m</span>
            </div>
            <div className="chat-card glass-card rounded-sm p-4 max-w-[80%] ml-auto bg-[#2EE8FF14] border border-[#2EE8FF52]">
              <p className="text-sm text-foreground">Rehatched. Group buying starts in 5 mins.</p>
              <span className="text-xs text-muted-foreground mt-1 block">@satfan · now</span>
            </div>
            <div className="chat-card glass-card rounded-sm p-4 max-w-[80%] border border-[#2EE8FF3A]">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">Private alpha room is open.</p>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#2EE8FF]">
                  <Heart size={12} /> 129
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">@hatchnews · 1m</span>
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
            <MessageCircle size={20} className="text-neon" />
            <span className="font-mono text-xs tracking-[0.2em] text-[#2EE8FF]">HATCH SOCIAL</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,48px)] text-foreground leading-tight">
            Crypto-native social, reimagined.
          </h2>
        </div>

        {/* Bottom-right Body */}
        <div
          ref={bodyRef}
          className="showcase-body absolute right-6 lg:right-12 bottom-[12vh] max-w-sm text-right"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Post, message, and build groups with wallet-first identity. Earn rewards for activity while keeping private chats encrypted.
          </p>
          <div
            className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium"
            style={{
              color: '#2EE8FF',
              borderColor: 'rgba(46,232,255,0.38)',
              background: 'rgba(46,232,255,0.1)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EE8FF] animate-pulse" />
            Hatch Social Coming Soon
            <ArrowUpRight size={16} className="opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
