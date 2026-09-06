import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NODES, getNodeStatus } from '../lib/nodes';
import { useNodeClock } from '../hooks/use-node-clock';

interface FeatureSectionProps { className?: string }

const nodeAnchor = (number: number) => `node-${String(number).padStart(2, '0')}`;

const NODE_ONE_STAGES = [
  { label: 'Growth', image: '/growth.png' },
  { label: 'Evolution', image: '/evolution.png' },
  { label: 'Transformation', image: '/transformation.png' },
] as const;

const NODE_TWO_STAGES = [
  { label: 'Envision', image: '/envision.png' },
  { label: 'Develop', image: '/develop.png' },
  { label: 'Launch', image: '/launch.png' },
] as const;

const NODE_THREE_STAGES = [
  { label: 'Community', image: '/community.png' },
  { label: 'Governance', image: '/governance.png' },
  { label: 'Collaboration', image: '/collaboration.png' },
] as const;

const NODE_FOUR_STAGES = [
  { label: 'Digital Personas', image: '/digital_persona.png' },
  { label: 'Connected Worlds', image: '/connected_world.png' },
  { label: 'Interoperability', image: '/interoperability.png' },
] as const;

const NODE_FIVE_STAGES = [
  { label: 'Trade', image: '/trade.png' },
  { label: 'Swap', image: '/swap.png' },
  { label: 'Liquidity', image: '/liquidity.png' },
] as const;

const NODE_SIX_STAGES = [
  { label: 'Reward', image: '/reward.png' },
  { label: 'Engage', image: '/engage.png' },
  { label: 'Earn', image: '/earn.png' },
] as const;

const NODE_SEVEN_STAGES = [
  { label: 'Build', image: '/build.png' },
  { label: 'Showcase', image: '/showcase.png' },
  { label: 'Emerge', image: '/emerge.png' },
] as const;

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
          if (node.number === 1) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-one node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-12 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-one-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Wallet <span className="text-[#aefe18]">·</span> Identity <span className="text-[#aefe18]">·</span> Growth
                  </p>

                  <div className="node-one-divider mt-7" aria-hidden="true"><span>◇</span></div>

                  <p className="mt-4 max-w-xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    Your digital assets are only the beginning.<br />
                    Build your identity. Enter the growth cycle.<br />
                    Transform. Evolve. Become something more.
                  </p>

                  <div className="node-stage-grid mt-5 grid w-full max-w-[38rem] grid-cols-3 items-stretch">
                    {NODE_ONE_STAGES.map((stage) => (
                      <div key={stage.label} className="node-one-stage flex min-w-0 items-center justify-center px-2 md:px-5">
                        <img src={stage.image} alt={stage.label} className="w-full max-w-[10.5rem] mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-4 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 2) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-two node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-two-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Create <span className="text-[#aefe18]">·</span> Build <span className="text-[#aefe18]">·</span> Market
                  </p>

                  <p className="mt-6 max-w-xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    Turn ideas into something real.<br />
                    Create the vision. Build the experience.<br />
                    Shape the strategy. Bring it to market.
                  </p>

                  <div className="node-stage-grid mt-6 grid w-full max-w-[44rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_TWO_STAGES.map((stage) => (
                      <div key={stage.label} className="node-two-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 3) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-three node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-three-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Create <span className="text-[#aefe18]">·</span> Own <span className="text-[#aefe18]">·</span> Unite
                  </p>

                  <p className="mt-6 max-w-2xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    Turn communities into living ecosystems.<br />
                    Create together. Share ownership.<br />
                    Align through governance. Unite around a common mission.
                  </p>

                  <div className="node-stage-grid mt-6 grid w-full max-w-[44rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_THREE_STAGES.map((stage) => (
                      <div key={stage.label} className="node-three-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 4) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-four node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-four-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    One Persona <span className="text-[#aefe18]">·</span> Any World<span className="text-[#aefe18]">.</span>
                  </p>

                  <div className="node-one-divider mt-7" aria-hidden="true"><span>◇</span></div>

                  <p className="mt-4 max-w-xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    Built for the open metaverse.
                  </p>

                  <div className="node-stage-grid mt-7 grid w-full max-w-[44rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_FOUR_STAGES.map((stage) => (
                      <div key={stage.label} className="node-four-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 5) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-five node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-five-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Trade <span className="text-[#aefe18]">·</span> Swap <span className="text-[#aefe18]">·</span> Liquidity
                  </p>

                  <p className="mt-7 max-w-2xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    The exchange layer for the new digital economy.<br />
                    Seamless. Decentralized. Built for growth.
                  </p>

                  <div className="node-stage-grid mt-7 grid w-full max-w-[47rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_FIVE_STAGES.map((stage) => (
                      <div key={stage.label} className="node-five-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 6) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-six node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-six-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Reward <span className="text-[#aefe18]">·</span> Engage <span className="text-[#aefe18]">·</span> Earn
                  </p>

                  <p className="mt-7 max-w-2xl text-[clamp(0.88rem,1.45vw,1.12rem)] leading-relaxed text-white drop-shadow-[0_2px_7px_black]">
                    The engagement layer that rewards<br />
                    your actions and advances the ecosystem.
                  </p>

                  <div className="node-stage-grid mt-7 grid w-full max-w-[47rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_SIX_STAGES.map((stage) => (
                      <div key={stage.label} className="node-six-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[34rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
          if (node.number === 7) {
            return (
              <article
                key={node.label}
                id={nodeAnchor(node.number)}
                data-node={node.number}
                className={`node-seven node-status-${status} relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-[calc(var(--app-chrome-height)+2rem)] md:px-16`}
              >
                <div className="node-seven-shade absolute inset-0" />

                <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[#aefe18] drop-shadow-[0_5px_24px_rgba(0,0,0,0.8)]">
                    {revealed ? node.name : node.label}
                  </h2>
                  {revealed && <>
                  <p className="mt-6 font-mono text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.34em] text-white drop-shadow-[0_2px_8px_black]">
                    Build <span className="text-[#aefe18]">·</span> Showcase <span className="text-[#aefe18]">·</span> Emerge
                  </p>

                  <div className="node-one-divider mt-7" aria-hidden="true"><span>◇</span></div>

                  <p className="mt-5 font-mono text-[clamp(0.72rem,1.4vw,1rem)] font-medium uppercase tracking-[0.22em] text-white drop-shadow-[0_2px_7px_black]">
                    From <span className="text-[#aefe18]">Application</span> to <span className="text-[#aefe18]">Node</span>.
                  </p>

                  <div className="node-stage-grid mt-7 grid w-full max-w-[52rem] grid-cols-3 items-center gap-2 md:gap-5">
                    {NODE_SEVEN_STAGES.map((stage) => (
                      <div key={stage.label} className="node-seven-stage flex min-w-0 items-center justify-center">
                        <img src={stage.image} alt={stage.label} className="w-full mix-blend-screen" />
                      </div>
                    ))}
                  </div>
                  </>}

                  <div className="node-one-status mt-5 flex w-full max-w-[38rem] items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.48em] text-[#f7a21a] md:text-sm">
                    <span className="h-px flex-1" />
                    <strong className="font-medium">{incubating ? 'Incubating' : revealed ? 'Revealed' : 'Forming'}</strong>
                    <span className="h-px flex-1" />
                  </div>
                </div>
              </article>
            );
          }
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

      <nav aria-label="Node section navigation and release progress" className="node-navigation hidden md:flex fixed right-5 lg:right-9 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-2">
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
