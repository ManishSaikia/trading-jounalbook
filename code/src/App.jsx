import React, { useState } from 'react';
import { useJournal } from './hooks/useJournal';
import Header from './components/layout/Header';
import StatsGrid from './components/journal/StatsGrid';
import EntryForm from './components/journal/EntryForm';
import TradeTable from './components/journal/TradeTable';
import StrategyGuide from './components/strategy/StrategyGuide';

export default function App() {
  const { trades, addTrade, deleteTrade, clearAll, exportCSV } = useJournal();
  const [activeTab, setActiveTab] = useState('journal'); // 'journal' or 'strategy'

  return (
    <>
      <Header 
        onExport={exportCSV} 
        onClear={clearAll} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <main style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'journal' ? (
          <div className="animate-fade-in">
            <StatsGrid trades={trades} />
            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '16px', alignItems: 'start' }}>
              <EntryForm onAdd={addTrade} trades={trades} />
              <TradeTable trades={trades} onDelete={deleteTrade} onExport={exportCSV} onClear={clearAll} />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <StrategyGuide />
          </div>
        )}
      </main>
      
      <style>{`
        @media (max-width: 900px) {
          main > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
