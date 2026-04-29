# Graph Report - .  (2026-04-26)

## Corpus Check
- Corpus is ~7,036 words - fits in a single context window. You may not need a graph.

## Summary
- 46 nodes · 19 edges · 16 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.83)
- Token cost: 100 input · 100 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]

## God Nodes (most connected - your core abstractions)
1. `App()` - 3 edges
2. `useJournal()` - 3 edges
3. `EntryForm()` - 2 edges
4. `StatsGrid()` - 2 edges
5. `TradeTable()` - 2 edges
6. `WinRateChart()` - 2 edges
7. `Header()` - 2 edges
8. `StrategyGuide()` - 2 edges
9. `Project Objective` - 1 edges
10. `Technical Stack` - 1 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useJournal()`  [INFERRED]
  C:\Users\msaik\Desktop\Backtesting\code\src\App.jsx → C:\Users\msaik\Desktop\Backtesting\code\src\hooks\useJournal.js
- `Architecture & Folder Structure` --conceptually_related_to--> `Technical Stack`  [INFERRED]
  code-memory/plan.md → code-memory/context.md

## Communities

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (2): App(), useJournal()

### Community 1 - "Community 1"
Cohesion: 0.67
Nodes (1): EntryForm()

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (1): StatsGrid()

### Community 3 - "Community 3"
Cohesion: 0.67
Nodes (1): TradeTable()

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (1): WinRateChart()

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (1): Header()

### Community 6 - "Community 6"
Cohesion: 0.67
Nodes (1): StrategyGuide()

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (2): Technical Stack, Architecture & Folder Structure

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (2): Project Objective, Trading Strategy Insights

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (1): React + Vite Template

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): Key Features

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (1): Favicon

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): Icons

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (1): Hero Image

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (1): React Logo

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (1): Vite Logo

## Knowledge Gaps
- **11 isolated node(s):** `React + Vite Template`, `Project Objective`, `Technical Stack`, `Trading Strategy Insights`, `Architecture & Folder Structure` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 0`** (6 nodes): `App()`, `App.jsx`, `useJournal.js`, `App.jsx`, `useJournal.js`, `useJournal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1`** (3 nodes): `EntryForm.jsx`, `EntryForm()`, `EntryForm.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2`** (3 nodes): `StatsGrid.jsx`, `StatsGrid.jsx`, `StatsGrid()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (3 nodes): `TradeTable.jsx`, `TradeTable.jsx`, `TradeTable()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (3 nodes): `WinRateChart.jsx`, `WinRateChart.jsx`, `WinRateChart()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (3 nodes): `Header.jsx`, `Header()`, `Header.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (3 nodes): `StrategyGuide.jsx`, `StrategyGuide.jsx`, `StrategyGuide()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `Technical Stack`, `Architecture & Folder Structure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `Project Objective`, `Trading Strategy Insights`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `React + Vite Template`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `Key Features`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `Favicon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `Icons`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `Hero Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `React Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `Vite Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `React + Vite Template`, `Project Objective`, `Technical Stack` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._