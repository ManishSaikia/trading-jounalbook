import React from 'react';
import { AlertCircle, Target, TrendingUp, Clock } from 'lucide-react';

export default function StrategyGuide() {
  return (
    <div className="playbook-container">
      <div className="playbook-header">
        <h2 className="title">Mean Reversion to NY Open Playbook</h2>
        <p className="subtitle">Data-driven rules based on 16 months of XAUUSD 5m forward testing (79.6% baseline win rate)</p>
      </div>

      <div className="cards-grid">
        <div className="rule-card green-glow">
          <div className="card-icon"><Target size={24} color="var(--green)" /></div>
          <h3>1. The Golden Zone ($5–$10)</h3>
          <p>The optimal entry window. Once price deviates <strong>$5 to $10</strong> away from the 8:00 AM EST (18:30 IST) open, look to fade the move back to the opening price.</p>
          <div className="stat-badge">80% Historical Win Rate</div>
        </div>

        <div className="rule-card amber-glow">
          <div className="card-icon"><TrendingUp size={24} color="var(--amber)" /></div>
          <h3>2. The Caution Zone ($10–$15)</h3>
          <p>As the move stretches beyond $10, the probability of a full reversion decays. Reduce your position size by half and keep a tighter stop.</p>
          <div className="stat-badge amber">63% Historical Win Rate</div>
        </div>

        <div className="rule-card red-glow">
          <div className="card-icon"><AlertCircle size={24} color="var(--red)" /></div>
          <h3>3. The Fat Tail Abort (&gt;$15)</h3>
          <p>If the initial move extends beyond <strong>$15</strong>, it is no longer a liquidity grab—it is a directional trend day. <strong>Abort the trade immediately.</strong></p>
          <div className="stat-badge red">&lt;50% Win Rate (Coin Flip)</div>
        </div>
      </div>

      <div className="macro-section">
        <div className="macro-header">
          <Clock size={20} color="var(--gold)" />
          <h3>Macro Timing Warnings (IST)</h3>
        </div>
        <p className="macro-desc">When the pattern fails, it doesn't fail slowly. Institutional money ignites violent trend days exactly on these two time milestones. If you see a massive expansion candle at these times, <strong>DO NOT FADE IT</strong>.</p>
        
        <div className="time-blocks">
          <div className="time-block">
            <div className="time">18:00 IST</div>
            <div className="event">US Economic Data (CPI, NFP)</div>
            <div className="detail">Most frequent time for the trend to officially break $10 away.</div>
          </div>
          <div className="time-block">
            <div className="time">19:00 IST</div>
            <div className="event">NY Equities Open</div>
            <div className="detail">Most frequent time for the largest momentum injection of the session.</div>
          </div>
        </div>
      </div>

      <style>{`
        .playbook-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .playbook-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .title {
          font-family: var(--sans);
          font-size: 28px;
          color: var(--text);
          margin-bottom: 8px;
        }
        .subtitle {
          color: var(--muted);
          font-size: 14px;
        }
        
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr; }
        }
        
        .rule-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .rule-card:hover {
          transform: translateY(-4px);
        }
        .green-glow:hover { box-shadow: 0 12px 32px rgba(76,175,130,0.1); border-color: rgba(76,175,130,0.3); }
        .amber-glow:hover { box-shadow: 0 12px 32px rgba(224,154,58,0.1); border-color: rgba(224,154,58,0.3); }
        .red-glow:hover { box-shadow: 0 12px 32px rgba(224,90,90,0.1); border-color: rgba(224,90,90,0.3); }
        
        .card-icon { margin-bottom: 16px; }
        .rule-card h3 {
          font-family: var(--sans);
          font-size: 16px;
          margin-bottom: 12px;
          color: var(--text);
        }
        .rule-card p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .rule-card strong { color: var(--text); }
        
        .stat-badge {
          display: inline-block;
          background: var(--green-dim);
          color: var(--green);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .stat-badge.amber { background: var(--amber-dim); color: var(--amber); }
        .stat-badge.red { background: var(--red-dim); color: var(--red); }
        
        .macro-section {
          background: linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%);
          border: 0.5px solid var(--gold-dim);
          border-radius: var(--radius-lg);
          padding: 32px;
        }
        .macro-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .macro-header h3 {
          font-family: var(--sans);
          color: var(--gold);
          font-size: 18px;
        }
        .macro-desc {
          color: var(--text);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .time-blocks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .time-blocks { grid-template-columns: 1fr; }
        }
        .time-block {
          background: rgba(0,0,0,0.3);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
        }
        .time-block .time {
          font-family: var(--mono);
          font-size: 20px;
          color: var(--amber);
          margin-bottom: 4px;
        }
        .time-block .event {
          font-weight: 600;
          margin-bottom: 8px;
        }
        .time-block .detail {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
