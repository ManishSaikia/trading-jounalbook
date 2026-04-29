# Implementation Plan: Gold NY Open Forward Test Journal

## 1. Technology Stack
*   **Framework:** React 18 via Vite (`npm create vite@latest . -- --template react`)
*   **Styling:** Vanilla CSS (CSS Modules for component scoping) utilizing modern design aesthetics (glassmorphism, vibrant dark mode colors, dynamic hover animations).
*   **Data Persistence:** Browser `localStorage` via a custom React hook (`useJournal`).
*   **Charting:** `chart.js` & `react-chartjs-2` for the running win rate graph.

## 2. Architecture & Folder Structure
```text
code/
├── src/
│   ├── assets/              # Icons, SVGs (like the decision framework)
│   ├── components/
│   │   ├── layout/          # Header, Sidebar/Navigation
│   │   ├── journal/         # EntryForm, TradeTable, StatsGrid, WinRateChart
│   │   ├── strategy/        # StrategyGuide (New feature)
│   │   └── ui/              # Reusable UI elements (Buttons, Badges, Modals)
│   ├── hooks/
│   │   └── useJournal.js    # LocalStorage sync and data manipulation logic
│   ├── styles/
│   │   ├── variables.css    # Design tokens (colors, fonts, radii)
│   │   └── global.css       # Base styles and animations
│   ├── App.jsx              # Main application router/state provider
│   └── main.jsx             # Entry point
```

## 3. Key Features & Implementation Details

### A. Data Management (Local Storage)
*   **`useJournal.js` hook:** Will initialize state from `localStorage('gold_fwd_journal_v2')`.
*   Every `addTrade`, `deleteTrade`, or `clearAll` action will update React state and simultaneously serialize to local storage.
*   Data structure will mirror the existing model but add unique IDs for stable rendering and deletion.

### B. Core Journal Modules
*   **Stats Dashboard:** Real-time calculation of Win Rate, Total PnL, Sessions logged, and pattern statistics (like % of sharp reversals).
*   **Entry Form:** A sleek, glassmorphic panel with dynamic inputs. The "Zone" selector will visually update (Green/Amber/Red) based on the entered Move Size to provide instant feedback.
*   **Trade Table:** A responsive data grid with sorting capabilities, color-coded outcome badges (Win = Green, Loss = Red, Aborted = Amber), and an "Export CSV" function.

### C. New Feature: Interactive Strategy Guide
*   A dedicated tab or slide-out panel that visually explains the **Mean Reversion to NY Open** strategy.
*   It will include:
    *   **The Rules:** Clear breakdown of the Green Zone ($5-$10) vs the Abort Zone (>$15).
    *   **Macro Warnings:** Explaining the danger of 18:00 / 19:00 IST momentum injections.
    *   **The Flowchart:** Embedding the `gold_live_trading_decision_framework.svg` so the user can easily reference the decision tree while logging trades.

## 4. Design & Aesthetics (Premium UI)
*   **Color Palette:** Deep, rich blacks (`#0d0d0d`) and charcoals for the background. Accents using a luxurious Gold (`#c9a84c`), striking Emerald Green (`#1D9E75`) for wins, and Crimson Red (`#E24B4A`) for losses.
*   **Typography:** Modern sans-serif (e.g., `Inter` or `Syne`) for headings, and a crisp monospaced font (e.g., `IBM Plex Mono`) for financial figures and tabular data.
*   **Micro-interactions:** 
    *   Smooth fade-ins when logging a new trade.
    *   Hover states on table rows with subtle transform/scale effects on buttons.
    *   Glassmorphism (backdrop-blur) on the entry form panel to make it feel floating and modern.

## 5. Development Steps
1.  Initialize Vite React project in the `code` directory.
2.  Set up global CSS variables and typography.
3.  Implement the `useJournal` hook for local storage.
4.  Build the layout shell (Header + Navigation).
5.  Develop the `StatsGrid` and `WinRateChart` components.
6.  Build the `EntryForm` and wire it to the state.
7.  Create the `TradeTable`.
8.  Implement the `StrategyGuide` feature.
9.  Final polish, animations, and responsive mobile testing.
