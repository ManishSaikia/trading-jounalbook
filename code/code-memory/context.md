# Project Context & Memory

This document serves as the permanent memory and context for the Gold NY Open Mean Reversion project. It outlines the technical architecture, completed milestones, and the core trading logic integrated into the app.

## 1. Project Objective
We transitioned the static `SampleCode.html` into a modern, fully-fledged **React Web Application**. The goal was to build a premium "Forward Test Journal" to log trades based on the XAUUSD 5-minute NY Open Mean Reversion strategy.

## 2. Technical Stack
*   **Framework:** React 18 built with Vite (`vite@latest`).
*   **Styling:** Vanilla CSS (`src/styles/global.css` & `variables.css`), utilizing dark mode aesthetics, glassmorphism (`backdrop-filter: blur()`), and custom color tokens (Gold, Emerald Green, Amber, Crimson Red).
*   **State & Storage:** React Context / custom hooks. We built a `useJournal.js` hook that syncs all application state directly to the browser's `localStorage` (key: `gold_fwd_journal_v2`).
*   **Libraries used:**
    *   `chart.js` and `react-chartjs-2` for the dynamic running win rate graph.
    *   `lucide-react` for premium SVG icons.

## 3. Core Features Built
1.  **Stats Dashboard (`StatsGrid.jsx`):** Dynamically calculates and displays:
    *   Total sessions logged.
    *   Running win rate (color-coded red/amber/green based on thresholds).
    *   Average move size at entry.
    *   Number of macro catalyst aborts.
    *   Total paper P&L and average P&L per trade.
    *   Percentage of sharp reversals vs slow grinding reversals.
2.  **Trade Logging Form (`EntryForm.jsx`):**
    *   Inputs for Date, Move Size, Zone, Catalyst, Character, Reversal Type, Outcome, P&L, and Notes.
    *   Includes a visual "Zone Indicator" that automatically suggests the trade zone based on the entered move size ($5-$10 = Green, $10-$15 = Caution, >$15 = Abort).
    *   Features a dark mode dropdown fix to ensure `<select>` `<option>` elements are legible.
    *   Embeds a miniaturized `WinRateChart` directly below the form.
3.  **Data Table (`TradeTable.jsx`):**
    *   A clean, responsive table rendering the chronological history of logged trades.
    *   Color-coded "Tags" to make scanning outcomes (Win/Loss/Aborted) and characteristics (Smooth/Choppy) instant.
    *   Allows deleting individual records.
4.  **Strategy Playbook (`StrategyGuide.jsx`):**
    *   A dedicated visual tab outlining the quantitative edges we discovered during our Python backtesting.
    *   Explains the $5-$10 optimal zone vs the "Fat Tail" risk.
    *   Warns against fading macro momentum injections that happen precisely at 18:00 IST (Economic Data) and 19:00 IST (NY Equities Open).
5.  **Layout (`Header.jsx` & `App.jsx`):**
    *   Provides tab navigation between the "Journal" view and the "Playbook" view.
    *   Handles CSV Export functionality and "Clear All" features.

## 4. Trading Strategy Insights Encoded
The UI logic (like the Zone auto-selector and the Playbook) specifically caters to the findings from our 16-month data backtest:
*   **The Baseline Edge:** Mean reverting XAUUSD to its 08:00 AM EST (18:30 IST) open price yields an ~80% win rate when the initial move is between $5 and $10.
*   **The Fat Tail Risk:** If a move exceeds $15, the win rate drops below 50%. The UI categorizes this as an explicit **Abort** zone.
*   **Reversal Mechanics:** 75% of successful reversions are sharp (<3 candles at the peak), favoring limit orders or aggressive market entries.

## 5. Folder Structure
```text
code/
├── code-memory/             # Contains this context file and initial plans
│   ├── plan.md
│   └── context.md
├── src/
│   ├── components/
│   │   ├── journal/         # Core journaling UI modules
│   │   ├── layout/          # Navigation and structural modules
│   │   └── strategy/        # Educational playbook modules
│   ├── hooks/
│   │   └── useJournal.js    # LocalStorage manager
│   ├── styles/
│   │   ├── variables.css    # Design tokens
│   │   └── global.css       # App-wide styles
│   ├── App.jsx              # Main view orchestrator
│   └── main.jsx             # React DOM entry
```

*This file can be updated periodically as new features are added or as the trading strategy evolves over time.*
