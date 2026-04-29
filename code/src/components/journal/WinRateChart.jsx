import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

export default function WinRateChart({ trades }) {
  const chartData = useMemo(() => {
    const actionable = trades.filter(x => ['win', 'loss', 'be'].includes(x.outcome));
    if (actionable.length < 2) return null;

    const points = [];
    let wins = 0;
    actionable.forEach((t, i) => {
      if (t.outcome === 'win') wins++;
      points.push(Math.round((wins / (i + 1)) * 100));
    });

    return {
      labels: points.map((_, i) => i + 1),
      datasets: [
        {
          data: points,
          borderColor: '#c9a84c',
          backgroundColor: 'rgba(201,168,76,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#c9a84c',
          pointBorderColor: '#141414',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }, [trades]);

  const targetLinePlugin = {
    id: 'target',
    afterDraw(chart) {
      const { ctx, scales: { y, x } } = chart;
      const yp = y.getPixelForValue(79.6);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(76,175,130,0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x.left, yp);
      ctx.lineTo(x.right, yp);
      ctx.stroke();
      ctx.restore();
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => `Win rate: ${ctx.parsed.y}%` },
        backgroundColor: '#1a1a1a',
        titleFont: { family: 'IBM Plex Mono' },
        bodyFont: { family: 'IBM Plex Mono' },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        min: 0, max: 100,
        ticks: { color: '#6b6960', font: { size: 9, family: 'IBM Plex Mono' }, callback: v => v + '%', stepSize: 25 },
        grid: { color: 'rgba(255,255,255,0.04)' },
        border: { display: false }
      },
      x: {
        ticks: { color: '#6b6960', font: { size: 9, family: 'IBM Plex Mono' } },
        grid: { display: false },
        border: { display: false }
      }
    }
  };

  if (!chartData) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(107,105,96,0.5)', fontSize: '11px', textAlign: 'center' }}>
        Log 2+ actionable trades<br/>to see running win rate
      </div>
    );
  }

  return <Line data={chartData} options={options} plugins={[targetLinePlugin]} />;
}
