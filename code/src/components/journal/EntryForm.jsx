import React, { useState, useEffect } from 'react';
import WinRateChart from './WinRateChart';

export default function EntryForm({ onAdd, trades }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [move, setMove] = useState('');
  const [zone, setZone] = useState('');
  const [catalyst, setCatalyst] = useState('no');
  const [char, setChar] = useState('smooth');
  const [rev, setRev] = useState('sharp');
  const [outcome, setOutcome] = useState('');
  const [pnl, setPnl] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Auto-suggest zone based on move size
  useEffect(() => {
    if (move === '') { setZone(''); return; }
    const m = parseFloat(move);
    if (m >= 5 && m <= 10) setZone('green');
    else if (m > 10 && m <= 15) setZone('caution');
    else if (m > 15) setZone('abort-size');
  }, [move]);

  const handleSubmit = () => {
    if (!zone) { setError('Select a zone or enter a move size.'); return; }
    if (!outcome) { setError('Select an outcome.'); return; }
    setError('');

    onAdd({
      date,
      move,
      zone,
      catalyst,
      char,
      rev,
      outcome,
      pnl: pnl !== '' ? parseFloat(pnl) : null,
      notes
    });

    setMove('');
    setPnl('');
    setNotes('');
    setOutcome('');
    setCatalyst('no');
    setChar('smooth');
    setRev('sharp');
    setZone('');
  };

  return (
    <div className="panel form-panel">
      <div className="panel-header">Log a session</div>
      <div className="panel-body">
        
        <div className="form-grid">
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Move size ($)</label>
            <input type="number" placeholder="e.g. 8.50" step="0.1" min="0" value={move} onChange={e => setMove(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>Zone</label>
          <div className="zone-indicator">
            <div className={`zone-pill ${zone === 'green' ? 'active-green' : ''}`} onClick={() => setZone('green')}>
              Green<br/>$5–$10<br/>80%
            </div>
            <div className={`zone-pill ${zone === 'caution' ? 'active-amber' : ''}`} onClick={() => setZone('caution')}>
              Caution<br/>$10–$15<br/>63%
            </div>
            <div className={`zone-pill ${zone === 'abort-size' ? 'active-red' : ''}`} onClick={() => setZone('abort-size')}>
              Abort<br/>&gt;$15<br/>&lt;50%
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Catalyst candle?</label>
            <select value={catalyst} onChange={e => setCatalyst(e.target.value)}>
              <option value="no">No catalyst</option>
              <option value="yes">Yes — aborted</option>
            </select>
          </div>
          <div className="form-group">
            <label>Move character</label>
            <select value={char} onChange={e => setChar(e.target.value)}>
              <option value="smooth">Smooth drift</option>
              <option value="choppy">Choppy thrust</option>
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Reversal type</label>
            <select value={rev} onChange={e => setRev(e.target.value)}>
              <option value="sharp">Sharp (&lt;3 candles)</option>
              <option value="grind">Grind / consolidation</option>
              <option value="none">No reversal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Outcome</label>
            <select value={outcome} onChange={e => setOutcome(e.target.value)}>
              <option value="">— select —</option>
              <option value="win">Win — reached open</option>
              <option value="loss">Loss — stopped out</option>
              <option value="be">Break-even</option>
              <option value="skipped">Skipped (rules)</option>
              <option value="aborted">Aborted (catalyst)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Paper P&L ($)</label>
          <input type="number" placeholder="e.g. 12.50 or -4.00" step="0.1" value={pnl} onChange={e => setPnl(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <input type="text" placeholder="anything notable about this session" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <button className="btn-primary" onClick={handleSubmit}>+ Add session</button>
        {error && <div className="err">{error}</div>}
      </div>
      
      <div className="chart-container">
        <div className="chart-title">Running win rate</div>
        <div className="chart-wrap">
          <WinRateChart trades={trades} />
        </div>
        <div className="chart-sub">Dashed line = 79.6% backtest target</div>
      </div>

      <style>{`
        .panel {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .panel-header {
          padding: 14px 18px;
          border-bottom: 0.5px solid var(--border);
          font-family: var(--sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text);
          background: rgba(255,255,255,0.02);
        }
        .panel-body { padding: 18px; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;}
        .form-group { margin-bottom: 14px; }
        .form-group label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        
        input, select {
          width: 100%;
          background: rgba(0,0,0,0.2);
          border: 0.5px solid var(--border-strong);
          border-radius: var(--radius);
          padding: 10px 12px;
          color: var(--text);
          font-family: var(--mono);
          font-size: 13px;
          outline: none;
          transition: all 0.2s ease;
          appearance: none;
        }
        input:focus, select:focus {
          border-color: var(--gold);
          background: rgba(201,168,76,0.05);
          box-shadow: 0 0 0 2px rgba(201,168,76,0.1);
        }
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236b6960'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          padding-right: 32px; cursor: pointer;
        }
        option {
          background-color: #141414; /* var(--surface) */
          color: #e8e6de; /* var(--text) */
        }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
        
        .zone-indicator { display: flex; gap: 8px; }
        .zone-pill {
          flex: 1; padding: 8px 4px; border-radius: var(--radius);
          text-align: center; font-size: 10px; letter-spacing: 0.04em;
          border: 0.5px solid var(--border); color: var(--muted);
          cursor: pointer; transition: all 0.2s;
          background: rgba(255,255,255,0.02);
        }
        .zone-pill:hover { background: rgba(255,255,255,0.05); }
        .zone-pill.active-green { background: var(--green-dim); border-color: var(--green); color: var(--green); font-weight:500;}
        .zone-pill.active-amber { background: var(--amber-dim); border-color: var(--amber); color: var(--amber); font-weight:500;}
        .zone-pill.active-red { background: var(--red-dim); border-color: var(--red); color: var(--red); font-weight:500;}

        .btn-primary {
          background: linear-gradient(180deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%);
          border: 0.5px solid var(--gold);
          color: var(--gold);
          font-weight: 700;
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          font-family: var(--sans);
          font-size: 14px;
          letter-spacing: 0.04em;
          border-radius: var(--radius);
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.1) 100%);
          box-shadow: 0 4px 12px rgba(201,168,76,0.15);
          transform: translateY(-1px);
        }
        .btn-primary:active { transform: translateY(1px); }
        .err { font-size: 11px; color: var(--red); margin-top: 8px; min-height: 16px; text-align: center; }

        .chart-container {
          padding: 16px 18px;
          border-top: 0.5px solid var(--border);
          background: rgba(0,0,0,0.2);
        }
        .chart-title { font-size:10px; letter-spacing:0.06em; text-transform:uppercase; color:var(--muted); margin-bottom:12px; }
        .chart-wrap { height: 80px; width: 100%; }
        .chart-sub { font-size:10px; color:var(--muted); margin-top:8px; text-align: right;}
      `}</style>
    </div>
  );
}
