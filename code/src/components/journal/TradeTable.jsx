import React from 'react';
import { Trash2 } from 'lucide-react';

export default function TradeTable({ trades, onDelete }) {
  const zoneTag = (z) => {
    if (z === 'green') return <span className="tag tag-green">$5–$10</span>;
    if (z === 'caution') return <span className="tag tag-amber">$10–$15</span>;
    if (z === 'abort-size') return <span className="tag tag-red">&gt;$15</span>;
    return <span className="tag tag-gray">—</span>;
  };

  const outcomeTag = (o) => {
    const map = {
      win: ['tag-green', 'Win'],
      loss: ['tag-red', 'Loss'],
      be: ['tag-gray', 'B/E'],
      skipped: ['tag-gray', 'Skipped'],
      aborted: ['tag-amber', 'Aborted']
    };
    const [cls, label] = map[o] || ['tag-gray', '—'];
    return <span className={`tag ${cls}`}>{label}</span>;
  };

  const pnlHtml = (v) => {
    if (v === null || v === '' || v === undefined) return <span style={{ color: 'var(--muted)' }}>—</span>;
    const n = parseFloat(v);
    const cls = n >= 0 ? 'text-green' : 'text-red';
    const str = (n >= 0 ? '+$' : '-$') + Math.abs(n).toFixed(2);
    return <span className={cls} style={{ fontWeight: 500 }}>{str}</span>;
  };

  return (
    <div className="panel table-panel">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Sessions</span>
        <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 400 }}>
          {trades.length} session{trades.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Move</th>
              <th>Zone</th>
              <th>Catalyst</th>
              <th>Character</th>
              <th>Reversal</th>
              <th>Outcome</th>
              <th>P&L</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="10">No sessions logged yet.<br />Add your first session using the form.</td>
              </tr>
            ) : (
              trades.slice().reverse().map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--muted)' }}>{t.date || '—'}</td>
                  <td style={{ fontWeight: 500 }}>{t.move ? '$' + parseFloat(t.move).toFixed(2) : '—'}</td>
                  <td>{zoneTag(t.zone)}</td>
                  <td>{t.catalyst === 'yes' ? <span className="tag tag-red">Yes</span> : <span className="tag tag-gray">No</span>}</td>
                  <td>{t.char === 'smooth' ? <span className="tag tag-green">Smooth</span> : <span className="tag tag-amber">Choppy</span>}</td>
                  <td>{t.rev === 'sharp' ? <span className="tag tag-green">Sharp</span> : t.rev === 'grind' ? <span className="tag tag-amber">Grind</span> : <span className="tag tag-gray">None</span>}</td>
                  <td>{outcomeTag(t.outcome)}</td>
                  <td>{pnlHtml(t.pnl)}</td>
                  <td className="notes-cell" title={t.notes || ''}>{t.notes || ''}</td>
                  <td>
                    <button className="del-btn" onClick={() => onDelete(t.id)} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-panel {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
        }
        .table-wrap { overflow-x: auto; flex: 1; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th {
          text-align: left;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 12px 16px;
          border-bottom: 0.5px solid var(--border-strong);
          white-space: nowrap;
          background: rgba(0,0,0,0.2);
        }
        td { padding: 12px 16px; border-bottom: 0.5px solid var(--border); vertical-align: middle; white-space: nowrap; }
        tr:last-child td { border-bottom: none; }
        tbody tr { transition: background 0.15s; }
        tbody tr:hover { background: rgba(255,255,255,0.03); }

        .empty-row td { text-align: center; color: var(--muted); padding: 60px 20px; white-space: normal; font-size: 13px; line-height: 1.5; }

        .tag {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: 0.5px solid transparent;
        }
        .tag-green { background: var(--green-dim); color: var(--green); border-color: rgba(76,175,130,0.25); }
        .tag-amber { background: var(--amber-dim); color: var(--amber); border-color: rgba(224,154,58,0.25); }
        .tag-red { background: var(--red-dim); color: var(--red); border-color: rgba(224,90,90,0.25); }
        .tag-gray { background: rgba(255,255,255,0.04); color: var(--muted); border-color: var(--border); }

        .text-green { color: var(--green); }
        .text-red { color: var(--red); }

        .notes-cell { max-width: 140px; overflow: hidden; text-overflow: ellipsis; color: var(--muted); font-size: 11px; }

        .del-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .del-btn:hover { color: var(--red); background: var(--red-dim); }
      `}</style>
    </div>
  );
}
