'use client';

import { useState } from 'react';
import { type TokenData, type Period, generateMockHistory } from '../hooks/useJupLendData';
import YieldChart from './YieldChart';

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtUsd(n: number) {
  if (n >= 1_000_000_000) return `$${fmt(n / 1_000_000_000, 2)}B`;
  if (n >= 1_000_000) return `$${fmt(n / 1_000_000, 2)}M`;
  if (n >= 1_000) return `$${fmt(n / 1_000, 2)}K`;
  return `$${fmt(n, 2)}`;
}

interface Props {
  token: TokenData;
}

export default function TokenCard({ token }: Props) {
  const [period, setPeriod] = useState<Period>('1y');
  const chartData = generateMockHistory(token.apy, period);

  return (
    <div className="token-card">
      <div className="token-header">
        <span className="token-symbol">{token.symbol}</span>
        <span className="token-mint" title={token.mint}>
          {token.mint.slice(0, 4)}…{token.mint.slice(-4)}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Supply APY</span>
          <span className="stat-value apy">{fmt(token.apy)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Borrow Rate</span>
          <span className="stat-value borrow">{fmt(token.borrowRate)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Utilization</span>
          <span className="stat-value util">{fmt(token.utilization)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">TVL</span>
          <span className="stat-value tvl">{fmtUsd(token.tvlUsd)}</span>
        </div>
      </div>

      <div className="util-bar-wrap">
        <div className="util-bar" style={{ width: `${Math.min(token.utilization, 100)}%` }} />
      </div>

      <YieldChart data={chartData} period={period} onPeriodChange={setPeriod} />
    </div>
  );
}