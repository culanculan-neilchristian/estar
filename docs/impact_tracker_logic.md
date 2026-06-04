# Impact Tracker - Logic & Data Flow

The Impact Tracker shows timeline stats for Nakhon Sawan using the same one CSV file as the Hero map.

## Source

`src/services/csv-data-service.ts` reads:

`uploads/data/Studio 2 - Studio 2.csv (1).csv`

There is no separate Nakhon Sawan file and no separate database source for display data.

## Timeline Phases

`CsvDataService.getImpactTrackerStats("นครสวรรค์")` filters the CSV to Nakhon Sawan and groups records by year:

- Phase 0: up to 2023
- Phase 1: up to 2024
- Phase 2: up to 2025
- Phase 3: 20% projection from Phase 2
- Phase 4: all years

Open church and joined/member counts use only rows where `Status of the Church` equals `เปิดอยู่`.

## District Mapping

District stats use the `district` column, not `District Church`.

`District Church` contains church group names like `คริสตจักรไทท่าตะโก`, so it must not be used as Amphoe/district data.

Before matching districts, the app removes spaces and the `อำเภอ` prefix.

## Current Nakhon Sawan Totals

From the current one CSV:

```json
{
  "nakhonSawan": 2151,
  "open": 1687,
  "villages": 12235,
  "joined": 6934
}
```
