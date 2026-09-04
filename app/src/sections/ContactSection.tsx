import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const discordUrl = 'https://discord.gg/mwEA3BaXk3';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Newsletter entrance
      gsap.fromTo(
        newsletterRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setEmail('');
      setSubscriptionStatus('success');
    } catch {
      setSubscriptionStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`contact-section relative bg-black/65 backdrop-blur-[2px] min-h-screen py-24 ${className}`}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-contact" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B6FF2E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contact)" />
        </svg>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
            {/* Headline */}
            <div ref={headlineRef}>
              <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] text-foreground leading-tight mb-6">
                Let's build the{' '}
                <span className="text-neon">future</span> together.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Questions? Partnerships? Support? We're here to help you navigate the world of Web3.
              </p>
            </div>

            {/* Contact Card */}
            <div ref={cardRef} className="lg:mt-12">
              <div className="glass-card rounded-sm p-8 lg:p-10">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:Contact@SatoshisHub.com"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-sm hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center">
                      <Mail size={18} className="text-neon" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Email us</p>
                      <p className="text-foreground group-hover:text-neon transition-colors">
                        Contact@SatoshisHub.com
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-neon group-hover:translate-x-1 transition-all" />
                  </a>
                  
                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-sm hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center">
                      <MessageCircle size={18} className="text-neon" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Community</p>
                      <p className="text-foreground group-hover:text-neon transition-colors">
                        Join our Discord
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-neon group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Contact Support
                  <Send size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div ref={newsletterRef} className="border-t border-white/10 pt-16">
            <div className="max-w-xl mx-auto text-center">
              <span className="font-mono text-xs tracking-[0.2em] text-neon mb-4 block">
                NEWSLETTER
              </span>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-4">
                Get the weekly hub brief
              </h3>
              <p className="text-muted-foreground mb-8">
                Stay updated with the latest news, features, and insights from the Satoshi Hub ecosystem.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon transition-colors"
                  required
                  disabled={subscriptionStatus === 'submitting'}
                />
                <button type="submit" className="btn-primary whitespace-nowrap" disabled={subscriptionStatus === 'submitting'}>
                  {subscriptionStatus === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
              <p className="mt-4 min-h-5 text-sm" role="status" aria-live="polite">
                {subscriptionStatus === 'success' && (
                  <span className="text-neon">You're subscribed. Welcome to the Hub.</span>
                )}
                {subscriptionStatus === 'error' && (
                  <span className="text-red-400">We couldn't save your email. Please try again.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
