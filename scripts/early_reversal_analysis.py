"""
Analyze how early the mean reversion extreme (peak move away from NY Open) can occur.
Specifically: Can the reversal happen within 5-10 minutes of the NY session opening?

NY Session: 13:00 - 17:00 UTC (8:00 AM - 12:00 PM EST)
"""
import pandas as pd
import numpy as np

# Load data
df = pd.read_csv(r'c:\Users\msaik\Desktop\Backtesting\data\XAUUSD_5m.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'], utc=True)
df['date'] = df['timestamp'].dt.date
df['hour_utc'] = df['timestamp'].dt.hour
df['minute_utc'] = df['timestamp'].dt.minute

# NY Session: 13:00 - 17:00 UTC
ny_session = df[(df['hour_utc'] >= 13) & (df['hour_utc'] < 17)].copy()

# Get unique trading days
trading_days = ny_session['date'].unique()

print(f"Total trading days with NY session data: {len(trading_days)}")
print("=" * 80)

# For each day, find the NY open price (13:00 UTC candle open) and then find
# when the extreme (max distance from open) occurs
results = []

for day in trading_days:
    day_data = ny_session[ny_session['date'] == day].sort_values('timestamp')
    if len(day_data) < 2:
        continue
    
    ny_open_price = day_data.iloc[0]['open']
    ny_open_time = day_data.iloc[0]['timestamp']
    
    # Track running extreme for each candle
    max_high = day_data['high'].values[0]
    min_low = day_data['low'].values[0]
    extreme_time = ny_open_time
    max_distance = 0
    extreme_direction = None
    
    for _, row in day_data.iterrows():
        dist_high = abs(row['high'] - ny_open_price)
        dist_low = abs(row['low'] - ny_open_price)
        
        if dist_high > max_distance:
            max_distance = dist_high
            extreme_time = row['timestamp']
            extreme_direction = 'up' if row['high'] > ny_open_price else 'down'
        
        if dist_low > max_distance:
            max_distance = dist_low
            extreme_time = row['timestamp']
            extreme_direction = 'down' if row['low'] < ny_open_price else 'up'
    
    # Time from NY open to extreme
    minutes_to_extreme = (extreme_time - ny_open_time).total_seconds() / 60
    
    # Check if price reverted back to NY open after the extreme
    extreme_idx = day_data[day_data['timestamp'] == extreme_time].index[0]
    post_extreme = day_data[day_data.index > extreme_idx]
    reverted = False
    reversion_time = None
    
    for _, row in post_extreme.iterrows():
        if row['low'] <= ny_open_price <= row['high']:
            reverted = True
            reversion_time = row['timestamp']
            break
    
    if max_distance >= 5:  # Only count moves >= $5 (matching the mean reversion criteria)
        results.append({
            'date': day,
            'ny_open_price': ny_open_price,
            'max_distance': max_distance,
            'minutes_to_extreme': minutes_to_extreme,
            'extreme_time_utc': extreme_time,
            'direction': extreme_direction,
            'reverted': reverted,
            'reversion_time': reversion_time
        })

results_df = pd.DataFrame(results)
print(f"\nDays with $5+ move from NY open: {len(results_df)}")
print(f"Days where price reverted back to NY open: {results_df['reverted'].sum()}")
print(f"Win rate: {results_df['reverted'].mean()*100:.1f}%")

print("\n" + "=" * 80)
print("EARLY REVERSAL ANALYSIS: How early can the extreme peak form?")
print("=" * 80)

# Distribution of time-to-extreme
bins = [0, 5, 10, 15, 20, 30, 45, 60, 90, 120, 180, 240]
labels = ['0-5m', '5-10m', '10-15m', '15-20m', '20-30m', '30-45m', '45-60m', '60-90m', '90-120m', '120-180m', '180-240m']
results_df['time_bucket'] = pd.cut(results_df['minutes_to_extreme'], bins=bins, labels=labels, right=True)

print("\nDistribution of Time-to-Extreme (when the peak move occurs):")
print("-" * 60)
bucket_counts = results_df['time_bucket'].value_counts().sort_index()
for bucket, count in bucket_counts.items():
    pct = count / len(results_df) * 100
    bucket_data = results_df[results_df['time_bucket'] == bucket]
    revert_rate = bucket_data['reverted'].mean() * 100 if len(bucket_data) > 0 else 0
    print(f"  {bucket:>10s}: {count:3d} days ({pct:5.1f}%) | Reversion Win Rate: {revert_rate:.1f}%")

print("\n" + "=" * 80)
print("EARLY EXTREMES (Peak formed within first 10 minutes)")
print("=" * 80)

early_extremes = results_df[results_df['minutes_to_extreme'] <= 10].sort_values('minutes_to_extreme')
print(f"\nTotal days with extreme within 10 min: {len(early_extremes)}")
if len(early_extremes) > 0:
    print(f"Reversion rate for early extremes: {early_extremes['reverted'].mean()*100:.1f}%")
    print(f"Average move size: ${early_extremes['max_distance'].mean():.2f}")
    print(f"Median move size: ${early_extremes['max_distance'].median():.2f}")
    
    print("\nDetailed Early Extreme Days:")
    print("-" * 90)
    for _, row in early_extremes.iterrows():
        revert_str = "[WIN] Reverted" if row['reverted'] else "[LOSS] Trended"
        print(f"  {row['date']} | Extreme at {row['minutes_to_extreme']:5.0f}m | "
              f"Move: ${row['max_distance']:7.2f} {row['direction']:>4s} | {revert_str}")

print("\n" + "=" * 80)
print("EARLY EXTREMES (Peak formed within first 15 minutes)")  
print("=" * 80)

early_15 = results_df[results_df['minutes_to_extreme'] <= 15].sort_values('minutes_to_extreme')
print(f"\nTotal days with extreme within 15 min: {len(early_15)}")
if len(early_15) > 0:
    print(f"Reversion rate for early extremes: {early_15['reverted'].mean()*100:.1f}%")
    print(f"Average move size: ${early_15['max_distance'].mean():.2f}")

print("\n" + "=" * 80)
print("STATISTICAL SUMMARY")
print("=" * 80)
print(f"\nMedian time to extreme:  {results_df['minutes_to_extreme'].median():.0f} minutes")
print(f"Mean time to extreme:   {results_df['minutes_to_extreme'].mean():.0f} minutes")
print(f"25th percentile:        {results_df['minutes_to_extreme'].quantile(0.25):.0f} minutes")
print(f"75th percentile:        {results_df['minutes_to_extreme'].quantile(0.75):.0f} minutes")
print(f"Min time to extreme:    {results_df['minutes_to_extreme'].min():.0f} minutes")
print(f"Max time to extreme:    {results_df['minutes_to_extreme'].max():.0f} minutes")

# Now check: for cases where the extreme happens EARLY, 
# does the overall session extreme end up being LATER (i.e., the early extreme is NOT the real extreme)?
print("\n" + "=" * 80)
print("KEY INSIGHT: Early moves as 'fake' extremes vs session extremes")
print("=" * 80)

# For each day, check if the FIRST significant move ($5+) happens early
# but the TRUE session extreme happens later
for day in trading_days:
    day_data = ny_session[ny_session['date'] == day].sort_values('timestamp')
    if len(day_data) < 2:
        continue

early_move_results = []
for day in trading_days:
    day_data = ny_session[ny_session['date'] == day].sort_values('timestamp')
    if len(day_data) < 2:
        continue
    
    ny_open_price = day_data.iloc[0]['open']
    ny_open_time = day_data.iloc[0]['timestamp']
    
    # Check if within first 10 minutes, price moves $5+ away from open
    early_candles = day_data[day_data['timestamp'] <= ny_open_time + pd.Timedelta(minutes=10)]
    
    early_max_dist = 0
    for _, row in early_candles.iterrows():
        d = max(abs(row['high'] - ny_open_price), abs(row['low'] - ny_open_price))
        early_max_dist = max(early_max_dist, d)
    
    if early_max_dist >= 5:
        early_move_results.append({
            'date': day,
            'early_move': early_max_dist
        })

print(f"\nDays where price moved $5+ within first 10 min of NY open: {len(early_move_results)}")
if len(early_move_results) > 0:
    print("These are days with VERY aggressive early moves.")
    for r in early_move_results:
        print(f"  {r['date']}: Early move ${r['early_move']:.2f}")

# Reversion timing analysis: For days that DID revert, how quickly after the extreme?
print("\n" + "=" * 80)
print("REVERSION SPEED: How fast does the reversal happen after the extreme?")
print("=" * 80)

reverted_days = results_df[results_df['reverted'] == True].copy()
reverted_days['reversion_minutes'] = reverted_days.apply(
    lambda row: (row['reversion_time'] - row['extreme_time_utc']).total_seconds() / 60 if row['reversion_time'] else None, 
    axis=1
)

if len(reverted_days) > 0:
    print(f"\nFor {len(reverted_days)} days that reverted:")
    print(f"  Median time from extreme to reversion: {reverted_days['reversion_minutes'].median():.0f} minutes")
    print(f"  Mean time from extreme to reversion:   {reverted_days['reversion_minutes'].mean():.0f} minutes")
    print(f"  Fastest reversion:                     {reverted_days['reversion_minutes'].min():.0f} minutes")
    
    fast_reverts = reverted_days[reverted_days['reversion_minutes'] <= 15]
    print(f"\n  Reversions within 15 min of extreme:   {len(fast_reverts)} ({len(fast_reverts)/len(reverted_days)*100:.1f}%)")
    
    fast_reverts_10 = reverted_days[reverted_days['reversion_minutes'] <= 10]
    print(f"  Reversions within 10 min of extreme:   {len(fast_reverts_10)} ({len(fast_reverts_10)/len(reverted_days)*100:.1f}%)")
    
    fast_reverts_5 = reverted_days[reverted_days['reversion_minutes'] <= 5]
    print(f"  Reversions within 5 min of extreme:    {len(fast_reverts_5)} ({len(fast_reverts_5)/len(reverted_days)*100:.1f}%)")
