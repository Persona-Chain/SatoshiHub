import { ArrowDown, ArrowRight } from 'lucide-react';
import { useNodeClock } from '../hooks/use-node-clock';
import { formatCountdown, getIncubatingNode } from '../lib/nodes';

interface HeroSectionProps { className?: string }

const TIME_LABELS = ['DAYS', 'HRS', 'MIN', 'SEC'] as const;

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const now = useNodeClock();
  const incubatingNode = getIncubatingNode(now);
  const countdown = incubatingNode?.revealAt
    ? formatCountdown(incubatingNode.revealAt, now).split(' : ').map((part) => part.slice(0, -1))
    : [];

  const scrollToActiveNode = () => {
    if (!incubatingNode) return;
    document.getElementById(`node-${String(incubatingNode.number).padStart(2, '0')}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className={`hero-section section-pinned relative min-h-screen overflow-hidden bg-transparent ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.34)_100%)]" />

      <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2 whitespace-nowrap font-display text-lg font-bold tracking-[0.3em] text-white md:text-2xl">
        SATOSHI <span className="text-[#f7931a]">HUB</span>
      </div>

      <div className="absolute bottom-[7vh] left-1/2 z-20 flex w-[min(92vw,760px)] -translate-x-1/2 flex-col items-center text-center">
        {incubatingNode?.revealAt ? (
          <>
            <button
              type="button"
              onClick={scrollToActiveNode}
              className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f7931a] transition-colors hover:text-white md:text-xs"
            >
              {incubatingNode.label} <span className="text-white/60">//</span> <span className="text-white">INCUBATION IN PROGRESS</span>
              <ArrowRight size={13} />
            </button>
            <div className="grid w-full grid-cols-4 gap-2" aria-label="Main incubation countdown">
              {countdown.map((value, index) => (
                <div key={TIME_LABELS[index]} className="relative">
                  <div className="font-mono text-[clamp(28px,6vw,68px)] font-bold leading-none tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
                    {value}{index < countdown.length - 1 && <span className="absolute -right-2 text-[#f7931a] md:-right-3">:</span>}
                  </div>
                  <div className="mt-3 font-mono text-[8px] tracking-[0.3em] text-white/65 md:text-[10px]">{TIME_LABELS[index]}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <span className="font-mono text-sm tracking-[0.2em] text-[#f7931a]">ALL NODES REVEALED</span>
        )}
        <button type="button" onClick={() => document.getElementById('nodes')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 flex flex-col items-center gap-1 font-mono text-[9px] tracking-[0.25em] text-white/70 hover:text-white">
          SCROLL
          <ArrowDown size={17} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
