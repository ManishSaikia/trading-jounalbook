import { useState, useEffect } from 'react';

const STORE_KEY = 'gold_fwd_journal_v2';

export function useJournal() {
  const [trades, setTrades] = useState(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(trades));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  }, [trades]);

  const addTrade = (tradeData) => {
    setTrades(prev => [...prev, { ...tradeData, id: Date.now().toString() }]);
  };

  const deleteTrade = (id) => {
    if (!window.confirm('Delete this session?')) return;
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (!trades.length) return;
    if (!window.confirm(`Delete all ${trades.length} sessions? This cannot be undone.`)) return;
    setTrades([]);
  };

  const exportCSV = () => {
    if (!trades.length) { alert('No sessions to export.'); return; }
    const headers = ['Date', 'Move($)', 'Zone', 'Catalyst', 'Character', 'Reversal', 'Outcome', 'PnL($)', 'Notes'];
    const rows = trades.map(t => [
      t.date, t.move || '', t.zone, t.catalyst, t.char, t.rev, t.outcome,
      t.pnl !== null && t.pnl !== undefined ? t.pnl : '', t.notes || ''
    ].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'gold_forward_test_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
  };

  return { trades, addTrade, deleteTrade, clearAll, exportCSV };
}
