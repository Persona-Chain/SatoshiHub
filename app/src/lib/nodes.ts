export type NodeDefinition = {
  number: number;
  label: `NODE_${string}`;
  name: string;
  descriptor: string;
  path: string | null;
  accent: string;
  incubationDays: number;
  revealAt: string | null;
};

const configuredValue = (key: string, fallback: string) => {
  const value = import.meta.env[key] as string | undefined;
  return value?.trim() || fallback;
};

const configuredDays = (nodeNumber: number, fallback: number) => {
  const value = Number(configuredValue(`VITE_NODE_${String(nodeNumber).padStart(2, '0')}_INCUBATION_DAYS`, String(fallback)));
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

const NODE_IDENTITIES: readonly Omit<NodeDefinition, 'incubationDays' | 'revealAt'>[] = [
  { number: 1, label: 'NODE_01', name: 'EggWallet', descriptor: 'Identity and Growth • Wallet', path: '/eggwallet', accent: '#B6FF2E' },
  { number: 2, label: 'NODE_02', name: 'HatchMind', descriptor: 'AI Brain', path: null, accent: '#8FFFC1' },
  { number: 3, label: 'NODE_03', name: 'Hatch Social Incubator', descriptor: 'Connect', path: '/hatch-social', accent: '#2EE8FF' },
  { number: 4, label: 'NODE_04', name: 'Persona Blockchain', descriptor: 'Blockchain', path: '/persona-blockchain', accent: '#FF8B2E' },
  { number: 5, label: 'NODE_05', name: 'Incubex', descriptor: 'Medium of Exchange', path: '/incubex', accent: '#C02EFF' },
  { number: 6, label: 'NODE_06', name: 'BountyBee', descriptor: 'Bounty Rewards', path: '/bountybee', accent: '#F7931A' },
  { number: 7, label: 'NODE_07', name: 'Satoshi’s Hub', descriptor: 'Ecosystem', path: '/', accent: '#FFFFFF' },
] as const;

const DEFAULT_DURATIONS = [60, 45, 30, 30, 30, 30, 30] as const;
const defaultCampaignStart = Date.parse('2026-08-28T00:00:00Z');
const configuredCampaignStart = Date.parse(configuredValue('VITE_CAMPAIGN_START_AT', '2026-08-28T00:00:00Z'));
const campaignStart = Number.isFinite(configuredCampaignStart) ? configuredCampaignStart : defaultCampaignStart;
let elapsedDays = 0;

export const NODES: readonly NodeDefinition[] = NODE_IDENTITIES.map((identity, index) => {
  const incubationDays = configuredDays(identity.number, DEFAULT_DURATIONS[index] ?? 30);
  elapsedDays += incubationDays;
  return {
    ...identity,
    incubationDays,
    revealAt: new Date(campaignStart + elapsedDays * 86_400_000).toISOString(),
  };
});

export type NodeStatus = 'revealed' | 'incubating' | 'forming';

export const getNodeStatus = (node: NodeDefinition, now = Date.now()): NodeStatus => {
  const sequenceThroughNode = NODES.slice(0, node.number);
  const revealed = sequenceThroughNode.every((candidate) => {
    const revealTime = candidate.revealAt ? Date.parse(candidate.revealAt) : Number.NaN;
    return Number.isFinite(revealTime) && revealTime <= now;
  });
  if (revealed) return 'revealed';

  const activeNode = NODES.find((candidate) => {
    const sequenceThroughCandidate = NODES.slice(0, candidate.number);
    return !sequenceThroughCandidate.every((entry) => {
      const revealTime = entry.revealAt ? Date.parse(entry.revealAt) : Number.NaN;
      return Number.isFinite(revealTime) && revealTime <= now;
    });
  });
  const scheduledTime = node.revealAt ? Date.parse(node.revealAt) : Number.NaN;
  return activeNode?.number === node.number && Number.isFinite(scheduledTime) ? 'incubating' : 'forming';
};

export const formatCountdown = (revealAt: string, now = Date.now()) => {
  const remaining = Math.max(0, Date.parse(revealAt) - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1_000) % 60);
  return `${String(days).padStart(2, '0')}D : ${String(hours).padStart(2, '0')}H : ${String(minutes).padStart(2, '0')}M : ${String(seconds).padStart(2, '0')}S`;
};

export const getIncubatingNode = (now = Date.now()) => NODES.find((node) => getNodeStatus(node, now) === 'incubating');

export const findNodeByPath = (pathname: string) => NODES.find((node) => node.path !== null && node.path !== '/' && pathname.startsWith(node.path));
