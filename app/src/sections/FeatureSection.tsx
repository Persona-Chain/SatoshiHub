import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LockKeyhole, Radio } from 'lucide-react';
import { NODES, getNodeStatus } from '../lib/nodes';
import { useNodeClock } from '../hooks/use-node-clock';

interface FeatureSectionProps { className?: string }

const nodeAnchor = (number: number) => `node-${String(number).padStart(2, '0')}`;

const FeatureSection = ({ className = '' }: FeatureSectionProps) => {
  const now = useNodeClock();
  const [visibleNode, setVisibleNode] = useState(1);
  const completedCount = NODES.filter((node) => getNodeStatus(node, now) === 'revealed').length;

  useEffect(() => {
    const sections = NODES.map((node) => document.getElementById(nodeAnchor(node.number))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setVisibleNode(Number(mostVisible.target.getAttribute('data-node')));
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: [0.15, 0.35, 0.55, 0.75] },
    );
    sections.forEach((section) => observer.observe(section as Element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nodes" className={`ecosystem-section bg-dark overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="feat-hex-grid absolute inset-0" />
        <div className="feat-orb feat-orb-tl absolute" />
        <div className="feat-orb feat-orb-br absolute" />
      </div>

      <div className="relative z-10 px-6 lg:px-12 pt-24 pb-8 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-neon uppercase mb-3 block">Incubation sequence</span>
        <h2 className="font-display font-bold text-[clamp(30px,5vw,58px)] tracking-tight leading-tight">
          Seven nodes. <span className="neon-text">One reveal at a time.</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">Each application remains encrypted until its incubation cycle completes.</p>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 pb-24">
        {NODES.map((node) => {
          const status = getNodeStatus(node, now);
          const revealed = status === 'revealed';
          const incubating = status === 'incubating';
          const panel = (
            <div className={`glass-card w-full max-w-4xl min-h-[22rem] md:min-h-[28rem] rounded-sm p-8 md:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${incubating ? 'ring-1 ring-neon/50 shadow-neon' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm tracking-[0.25em]" style={{ color: node.accent }}>{revealed ? node.name.toUpperCase() : node.label}</span>
                {incubating ? <Radio size={20} className="text-neon animate-pulse" /> : revealed ? <ArrowUpRight size={20} style={{ color: node.accent }} /> : <LockKeyhole size={20} className="text-muted-foreground" />}
              </div>
              <div>
                {revealed ? (
                  <p className="font-display text-[clamp(24px,4vw,44px)] text-foreground">{node.descriptor}</p>
                ) : (
                  <p className="font-mono text-[clamp(18px,3vw,30px)] tracking-[0.22em] uppercase" style={{ color: incubating ? node.accent : undefined }}>
                    {incubating ? 'INCUBATING' : 'FORMING'}
                  </p>
                )}
              </div>
            </div>
          );

          return (
            <article
              key={node.label}
              id={nodeAnchor(node.number)}
              data-node={node.number}
              className="min-h-[75vh] flex items-center justify-center py-16 scroll-mt-20"
            >
              {revealed && node.path ? <Link to={node.path} className="w-full max-w-4xl">{panel}</Link> : panel}
            </article>
          );
        })}
      </div>

      <nav aria-label="Node section navigation and release progress" className="hidden md:flex fixed right-5 lg:right-9 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-2">
        <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-px bg-white/15" aria-hidden="true">
          <div className="w-full bg-white transition-[height] duration-700" style={{ height: `${(completedCount / NODES.length) * 100}%` }} />
        </div>
        {NODES.map((node) => {
          const viewing = visibleNode === node.number;
          return (
            <button
              key={node.label}
              type="button"
              onClick={() => document.getElementById(nodeAnchor(node.number))?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="relative z-10 h-10 w-10 flex items-center justify-center group"
              aria-label={`View ${node.label}`}
              aria-current={viewing ? 'true' : undefined}
            >
              <span className={`absolute h-7 w-7 rounded-full border transition-all duration-300 ${viewing ? 'border-white bg-dark scale-110' : 'border-transparent bg-dark/80'}`} />
              <span className={`relative font-mono text-[9px] transition-colors ${viewing ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}>{String(node.number).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
};

export default FeatureSection;
