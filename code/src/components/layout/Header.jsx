import React from 'react';
import { Download, Trash2, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Header({ onExport, onClear, activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">XAUUSD · NY Open Mean Reversion</h1>
        <span className="header-sub">Forward Test Journal</span>
      </div>
      
      <div className="header-tabs">
        <button 
          className={`tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          <LayoutDashboard size={14} /> Journal
        </button>
        <button 
          className={`tab-btn ${activeTab === 'strategy' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategy')}
        >
          <BookOpen size={14} /> Playbook
        </button>
      </div>

      <div className="header-right">
        {activeTab === 'journal' && (
          <>
            <button className="btn-outline" onClick={onExport}>
              <Download size={14} style={{ marginRight: '6px' }}/> Export CSV
            </button>
            <button className="btn-danger" onClick={onClear}>
              <Trash2 size={14} style={{ marginRight: '6px' }}/> Clear all
            </button>
          </>
        )}
      </div>

      <style>{`
        .header {
          border-bottom: 0.5px solid var(--border);
          padding: 20px 32px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 10;
        }
        .header-left { display: flex; align-items: baseline; gap: 16px; flex: 1; }
        .header-title {
          font-family: var(--sans);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--gold);
        }
        .header-sub {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .header-tabs {
          display: flex;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        .tab-btn:hover { color: var(--text); background: var(--surface2); }
        .tab-btn.active { color: var(--gold); background: var(--gold-dim); }
        
        .header-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .btn-outline {
          background: transparent;
          border: 0.5px solid var(--border-strong);
          border-radius: var(--radius);
          color: var(--text);
          font-size: 12px;
          padding: 8px 14px;
          display: inline-flex;
          align-items: center;
          transition: all 0.15s;
        }
        .btn-outline:hover { background: var(--surface2); border-color: var(--text); }
        .btn-danger {
          background: transparent;
          border: 0.5px solid var(--red-dim);
          border-radius: var(--radius);
          color: var(--red);
          font-size: 12px;
          padding: 8px 14px;
          display: inline-flex;
          align-items: center;
          transition: all 0.15s;
        }
        .btn-danger:hover { background: var(--red-dim); }
      `}</style>
    </header>
  );
}
