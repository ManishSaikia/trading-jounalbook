"""
Download XAUUSD 5-minute historical data (Jan 1 2025 - Apr 26 2026) from Dukascopy.
Saves the data as a CSV file for backtesting.
"""

from datetime import datetime
import dukascopy_python
from dukascopy_python.instruments import INSTRUMENT_FX_METALS_XAU_USD

# -- Configuration ------------------------------------------------------------
INSTRUMENT = INSTRUMENT_FX_METALS_XAU_USD
INTERVAL = dukascopy_python.INTERVAL_MIN_5
OFFER_SIDE = dukascopy_python.OFFER_SIDE_BID

START_DATE = datetime(2025, 1, 1)
END_DATE = datetime(2026, 4, 26)

OUTPUT_FILE = "XAUUSD_5m.csv"

# -- Download ------------------------------------------------------------------
print(f"Downloading XAUUSD 5-min data from {START_DATE.date()} to {END_DATE.date()}...")
print("This may take a few minutes depending on your internet speed.\n")

df = dukascopy_python.fetch(
    instrument=INSTRUMENT,
    interval=INTERVAL,
    offer_side=OFFER_SIDE,
    start=START_DATE,
    end=END_DATE,
)

# -- Preview & Save ------------------------------------------------------------
print(f"\n{'='*60}")
print(f"Downloaded {len(df):,} candles")
print(f"Date range: {df.index[0]}  -->  {df.index[-1]}")
print(f"{'='*60}\n")
print("First 5 rows:")
print(df.head())
print(f"\nLast 5 rows:")
print(df.tail())

# Save to CSV
df.to_csv(OUTPUT_FILE)
print(f"\nData saved to {OUTPUT_FILE}")
print(f"   File size: {__import__('os').path.getsize(OUTPUT_FILE) / (1024*1024):.2f} MB")
