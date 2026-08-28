import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <section id="nodes" className={`ecosystem-section overflow-hidden relative bg-transparent ${className}`}>
      <div className="relative z-10 w-full">
        {NODES.map((node) => {
          const status = getNodeStatus(node, now);
          const revealed = status === 'revealed';
          const incubating = status === 'incubating';
          const panel = (
            <div className="relative z-10 inline-flex min-w-[min(90vw,48rem)] flex-col items-center border-y border-white/20 bg-black/35 px-8 py-7 text-center shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-[3px]">
              <span className="font-display text-[clamp(38px,8vw,92px)] font-bold uppercase leading-none tracking-[-0.035em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]" style={{ color: revealed || incubating ? node.accent : undefined }}>
                {revealed ? node.name.toUpperCase() : node.label}
              </span>
              {revealed ? (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 md:text-sm">{node.descriptor}</p>
              ) : (
                <p className={`mt-4 font-mono text-[10px] tracking-[0.34em] md:text-sm ${incubating ? 'text-[#f7931a]' : 'text-white/60'}`}>
                  {incubating ? 'INCUBATING' : 'FORMING'}
                </p>
              )}
            </div>
          );

          return (
            <article
              key={node.label}
              id={nodeAnchor(node.number)}
              data-node={node.number}
              className="relative min-h-screen flex items-end justify-center overflow-hidden px-6 pb-[13vh] pt-28 scroll-mt-20"
            >
              <div className={`node-incubator-visual node-incubator-visual-${node.number}`} aria-hidden="true">
                <span className="node-orbit node-orbit-outer" />
                <span className="node-orbit node-orbit-middle" />
                <span className="node-orbit node-orbit-inner" />
                <span className="node-orbit-core" />
              </div>
              {revealed && node.path ? <Link to={node.path}>{panel}</Link> : panel}
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
