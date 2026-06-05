import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { type ChartPoint, type Period } from '../hooks/useJupLendData';

interface Props {
  data: ChartPoint[];
  period: Period;
  onPeriodChange: (p: Period) => void;
}

const PERIODS: { key: Period; label: string }[] = [
  { key: '7d', label: '7D' },
  { key: '1m', label: '1M' },
  { key: '1y', label: '1Y' },
];

export default function YieldChart({ data, period, onPeriodChange }: Props) {
  return (
    <div className="chart-wrap">
      <div className="chart-header">
        <span className="chart-title">Yield History</span>
        <div className="period-buttons">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              className={`period-btn ${period === p.key ? 'active' : ''}`}
              onClick={() => onPeriodChange(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6ee7b7" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v.toFixed(1)}%`}
          />
          <Tooltip
            contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#6ee7b7' }}
            formatter={(v) => [`${Number(v).toFixed(4)}%`, 'Yield']}
          />
          <Area
            type="monotone"
            dataKey="yield"
            stroke="#6ee7b7"
            strokeWidth={2}
            fill="url(#yieldGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
