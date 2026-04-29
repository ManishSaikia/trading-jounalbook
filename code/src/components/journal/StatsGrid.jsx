import React, { useMemo } from 'react';

export default function StatsGrid({ trades }) {
  const stats = useMemo(() => {
    const t = trades;
    const actionable = t.filter(x => ['win', 'loss', 'be'].includes(x.outcome));
    const wins = t.filter(x => x.outcome === 'win');
    const wr = actionable.length ? Math.round((wins.length / actionable.length) * 100) : null;
    
    const moves = t.filter(x => x.move).map(x => parseFloat(x.move));
    const avgMove = moves.length ? (moves.reduce((a,b)=>a+b,0)/moves.length).toFixed(2) : null;
    
    const aborts = t.filter(x => x.catalyst === 'yes' || x.outcome === 'aborted');
    
    const pnls = t.filter(x => x.pnl !== null && x.pnl !== '' && x.pnl !== undefined).map(x => parseFloat(x.pnl));
    const totalPnl = pnls.reduce((a,b)=>a+b,0);
    const avgPnl = pnls.length ? (totalPnl / pnls.length).toFixed(2) : null;
    
    const sharpTrades = t.filter(x => ['win','loss','be'].includes(x.outcome) && x.rev === 'sharp');
    const sharpPct = actionable.length ? Math.round((sharpTrades.length / actionable.length) * 100) : null;

    return {
      total: t.length,
      actionable: actionable.length,
      wins: wins.length,
      wr,
      avgMove,
      aborts: aborts.length,
      totalPnl,
      avgPnl,
      sharpPct
    };
  }, [trades]);

  const wrColor = stats.wr >= 70 ? 'green' : stats.wr >= 55 ? 'amber' : 'red';
  const pnlColor = stats.totalPnl >= 0 ? 'green' : 'red';

  return (
    <div className="stats-grid">
      <div className="stat-card gold-bar">
        <div className="stat-label">Sessions logged</div>
        <div className="stat-val" style={{ color: 'var(--gold)' }}>{stats.total}</div>
        <div className="stat-sub">forward test</div>
      </div>
      
      <div className={`stat-card ${stats.wr !== null ? wrColor + '-bar' : 'green-bar'}`}>
        <div className="stat-label">Win rate</div>
        <div className={`stat-val ${stats.wr !== null ? 'text-' + wrColor : ''}`}>
          {stats.wr !== null ? `${stats.wr}%` : '—'}
        </div>
        <div className="stat-sub">
          {stats.actionable ? `${stats.wins}W / ${stats.actionable - stats.wins}L of ${stats.actionable} trades` : 'backtest: 79.6%'}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Avg move at entry</div>
        <div className="stat-val">{stats.avgMove ? `$${stats.avgMove}` : '—'}</div>
        <div className="stat-sub">target: $5–$10</div>
      </div>

      <div className="stat-card amber-bar">
        <div className="stat-label">Catalyst aborts</div>
        <div className="stat-val text-amber">{stats.aborts}</div>
        <div className="stat-sub">{stats.aborts ? `saved from ${stats.aborts} trend day(s)` : '18:00 / 19:00 IST'}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total paper P&L</div>
        <div className={`stat-val ${stats.totalPnl !== 0 ? 'text-' + pnlColor : ''}`}>
          {stats.totalPnl ? (stats.totalPnl >= 0 ? `+$${Math.abs(stats.totalPnl).toFixed(2)}` : `-$${Math.abs(stats.totalPnl).toFixed(2)}`) : '—'}
        </div>
        <div className="stat-sub">
          {stats.avgPnl ? `avg ${stats.avgPnl >= 0 ? '+' : '-'}$${Math.abs(stats.avgPnl)} / trade` : 'avg per trade'}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Sharp reversals</div>
        <div className="stat-val">{stats.sharpPct !== null ? `${stats.sharpPct}%` : '—'}</div>
        <div className="stat-sub">backtest: 75.1%</div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: var(--surface);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--border-strong);
        }
        .stat-card.gold-bar::before { background: var(--gold); opacity: 0.5; }
        .stat-card.green-bar::before { background: var(--green); opacity: 0.5; }
        .stat-card.red-bar::before { background: var(--red); opacity: 0.5; }
        .stat-card.amber-bar::before { background: var(--amber); opacity: 0.5; }
        
        .stat-label { font-size: 10px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
        .stat-val { font-family: var(--sans); font-size: 26px; font-weight: 700; line-height: 1; color: var(--text); }
        .stat-sub { font-size: 10px; color: var(--muted); margin-top: 6px; }
        
        .text-green { color: var(--green); }
        .text-red { color: var(--red); }
        .text-amber { color: var(--amber); }
      `}</style>
    </div>
  );
}
