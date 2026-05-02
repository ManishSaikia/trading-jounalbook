# XAUUSD NY Open — Mean Reversion Trading Journal

> A personal backtesting research project and forward-test journal for a data-driven Gold (XAUUSD) mean reversion strategy, built around the New York session open.

---

## Disclaimer

This repository documents personal trading research for educational and journaling purposes. Nothing here constitutes financial advice. Past statistical patterns do not guarantee future results. Always manage risk appropriately.

## What This Is

This repository is a personal trading research project — not a commercial product and not deployed anywhere. It documents a strategy discovered through 16 months of backtesting on 5-minute XAUUSD data, validated by statistical analysis, and now being tracked in real-time via a forward-test journal.

If you found this repo and want to use the backtested data, replicate the strategy, or adapt the journal for your own trading — feel free. Everything here is open for personal use.

---

## The Strategy at a Glance

**Instrument:** XAUUSD (Gold Spot)  
**Timeframe:** 5-minute chart  
**Session:** NY Open — 8:00 AM to 12:00 PM EST (18:30–22:30 IST)  
**Backtesting Period:** December 31, 2024 → April 24, 2026 (338 valid trading days)

The core observation: when Gold moves significantly away from the 8:00 AM NY open price, there is a statistically high probability (~80%) it will reverse and touch the open price again before noon. This repository contains all the research, data, scripts, and a live forward-test journal built around this pattern.

---

## Repository Structure

```
trading-jounalbook/
├── code/               # Journal UI — HTML/CSS/JS forward-test tracker
├── data/               # Raw and processed XAUUSD 5-min OHLC data
├── scripts/            # Python backtesting and analysis scripts
├── Memory.md           # Full backtesting insights log (the research brain)
├── Improvents.txt      # Known issues and planned improvements
├── mean_reversion_example.png  # Chart example of the pattern
└── package.json        # Dependencies (gh-pages)
```

---

## Backtested Insights

All findings below are derived from 338 valid NY session trading days (Dec 2024 – Apr 2026) on the 5-minute XAUUSD chart.

### Market Overview

| Metric | Value |
|---|---|
| Starting price (Dec 31, 2024) | $2,625.91 |
| Ending price (Apr 24, 2026) | $4,707.86 |
| Total growth | +$2,081.96 (+79.29%) |
| Max drawdown | -26.33% |
| Avg 5-min candle range (NY session) | $6.23 |
| Max single 5-min candle | $211.37 |

---

### Pattern 1 — Mean Reversion to NY Open (79.59% Win Rate)

**The Setup:** Price moves at least $5 away from the 8:00 AM NY open price, then fully reverses to touch the open price again before 12:00 PM EST.

**Occurrences:** 269 out of 338 days.

**Detailed breakdown:**

- Average move before reversal begins: **$12.32**
- **75.09% of reversals are sharp** — price spends fewer than 15 minutes (under 3 candles) near the peak before reversing violently. Only 25% grind/consolidate.
- Peak extreme most commonly forms between **18:00–18:45 IST**
- Full reversion to open most commonly completes between **18:35–19:00 IST**

#### Win Rate Decay by Initial Move Size

This is the single most important risk filter for this strategy:

| Initial Move from Open | Win Rate |
|---|---|
| ≥ $5 | **80%** |
| ≥ $10 | **63%** |
| ≥ $15 | **50% (coin flip — do not trade)** |
| ≥ $20 | **43% (betting against the trend)** |

**Hard rule: Do not fade any move larger than $15 from the NY open.**

#### Winning Days vs Failing Days — Move Distribution

| | Winning Days (269) | Failing / Trend Days (69) |
|---|---|---|
| Median move | $8.68 | $30.84 |
| 75th percentile | $14.34 | $46.70+ |

The separation is ~3.5x. These are not the same market doing slightly different things — they are two completely different regimes.

#### Macro Failure Timing Profile

When the pattern fails (i.e., a genuine trend day), the move ignites violently and precisely on institutional time milestones:

- The $10 breakaway level is crossed most frequently at **18:00 IST (8:30 AM EST — US economic data: CPI, NFP, PPI)** or **18:30 IST (9:00 AM EST)**
- The largest expansion candle of the entire session clusters at **18:00 IST** (US data drop) and **19:00 IST (9:30 AM EST — NYSE open)**

**The live trading filter:** If you see a violent, massive 5-minute expansion candle forming exactly at 18:00 IST or 19:00 IST that pushes price $10+ from the open, do not fade it. That is institutional money repricing a catalyst. Stand aside.

Conversely, if price drifts $8–$12 away smoothly with no catalyst-driven expansion candle, the odds of a full reversion are very high.

---

#### Timing — When Does the Session Extreme Form?

The initial 5–10 minute move is almost never the session extreme — it is a displacement/liquidity sweep. The true peak forms much later:

| Time After NY Open | Occurrence | Reversion Win Rate |
|---|---|---|
| 0–5 min | 0 days | — |
| 5–10 min | 1 day | 0.0% |
| 10–15 min | 3 days | 100.0% |
| 30–45 min | 17 days | **94.1%** ← golden window |
| 45–60 min | 20 days | 70.0% |
| 60–90 min | 47 days | 66.0% |
| 90–120 min | 41 days | 31.7% |
| 120–180 min | 77 days | 19.5% |
| 180–240 min | 125 days | 0.8% |

Key timing stats:
- **Median time to session extreme:** 150 minutes (2.5 hours into the session)
- **25th percentile:** 85 minutes
- **75th percentile:** 205 minutes
- **Optimal watch window:** 30–90 minutes after the open (18:30–19:30 IST / 8:30–9:30 AM EST)
- **After 2 hours with no extreme:** probability of reversion drops below 32% — likely a trend day

#### How Fast Does the Reversal Complete Once It Starts?

- Fastest full reversion (extreme → open): **5 minutes**
- 23.7% of reversals complete within **15 minutes** of the extreme
- 8.2% complete within **10 minutes**
- Median reversal speed: **40 minutes**
- Mean reversal speed: **49 minutes**

On 75% of days the reversal is sharp — entry must be aggressive (limit at the extreme or immediate market entry on the first reversal candle). Waiting for heavy confirmation means missing the move.

---

### Pattern 2 — London/NY Overlap Breakout Continuation (77.22% Win Rate)

**The Setup:** The first hour of NY session (8:00–9:00 AM EST) sets an Initial Balance range. If price breaks out of this range after 9:00 AM, it continues at least $5 in the breakout direction.

**Occurrences:** 261 out of 338 days.

**Actionable use:** Don't fade the 9 AM breakout. If price breaks the 8–9 AM high or low, target a $5 continuation scalp in the direction of the break.

---

### Pattern 3 — 10 AM Silver Bullet Trend (66.57% Win Rate)

**The Setup:** Between 10:00–11:00 AM EST, price trends strongly enough that the 11:00 AM price is at least $5 away from the 10:00 AM price.

**Occurrences:** 225 out of 338 days.

**Actionable use:** The 10 AM hour is extremely directional. If you identify the correct side of momentum at 10 AM, a $5+ move within the hour is the base expectation — not the exception.

---

### Pattern 4 — 10 AM Session Extremes (40.83%)

**The Setup:** The absolute high or low of the entire NY session forms between 9:45–10:30 AM EST.

**Occurrences:** 138 out of 338 days.

**Note:** While under the 60% threshold, the fact that 40%+ of all session extremes form in this narrow 45-minute window makes it a significant timing reference for stop placement and trade management.

---

### Classic Judas Swing

The Judas Swing setup (sweeping Asian/London session extremes before reversing to close in the opposite direction) occurred on **88 separate days** across the backtesting period. The most common reversal time for this pattern is exactly **20:00 IST (8:00 PM IST / 9:30 AM EST)**.

---

## Three-Zone Decision Framework

Every session is classified into one of three zones based on the initial move size from the NY open:

| Zone | Move Size | Win Rate | Action |
|---|---|---|---|
| 🟢 Green | $5 – $10 | ~80% | Full size entry — core setup |
| 🟡 Caution | $10 – $15 | ~63% | Half size, tighter stop |
| 🔴 Abort | $15+ | <50% | No fade — stand aside |

A fourth filter overlays all three zones: **if a violent expansion candle prints at exactly 18:00 IST or 19:00 IST**, classify the day as a macro trend day regardless of move size and do not enter any mean reversion trade.

---

## The Forward Test Journal

The `code/` folder contains a standalone HTML journal for tracking live forward-test sessions. It runs entirely in the browser with no server required — just open `gold_journal.html` locally.

**Features:**
- Log each session: date, move size, zone, catalyst candle presence, move character, reversal type, outcome, P&L, and notes
- Live stats dashboard: win rate, average move size, catalyst aborts, total and average paper P&L, sharp reversal %
- Running win rate chart vs the 79.6% backtest target line
- Export to CSV for external analysis
- All data stored in `localStorage` — persists between browser sessions

**How to use:**
1. Clone or download the repository
2. Open `code/gold_journal.html` in any browser
3. Log each NY session after you observe or paper trade it
4. After 2–4 weeks, compare your live win rate to the backtest benchmarks

---

## Scripts

The `scripts/` folder contains the Python analysis scripts used to derive the backtested statistics documented in `Memory.md`. These operate on the raw OHLC data in `data/`.

Requirements: Python 3.x with standard data analysis libraries (pandas, numpy).

---

## Using This Data

If you want to use the backtested findings or the journal for your own trading:

- The strategy is built on XAUUSD (Gold spot), 5-minute timeframe, NY session only
- All time references use EST (UTC-5) and IST (UTC+5:30) — adjust for your local timezone
- The backtest covers Dec 2024 – Apr 2026, a period of unusually high Gold volatility (+79% price appreciation). Test whether the statistical relationships hold in lower-volatility periods before applying real capital
- This is personal research, not financial advice. Forward test thoroughly before considering any live application

---

## Roadmap / Known Improvements

Tracked in `Improvents.txt`:

- Notes field should show a clean tooltip/dialogue on hover instead of truncating
- Add a "number of trades taken" field to the session log form

---
