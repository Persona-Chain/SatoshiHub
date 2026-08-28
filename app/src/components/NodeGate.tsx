import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { findNodeByPath, getNodeStatus } from '../lib/nodes';
import { useNodeClock } from '../hooks/use-node-clock';

const NodeGate = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const now = useNodeClock();
  const node = findNodeByPath(pathname);
  return node && getNodeStatus(node, now) !== 'revealed' ? <Navigate to="/#nodes" replace /> : children;
};

export default NodeGate;
