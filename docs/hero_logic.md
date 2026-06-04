# Hero Section - Logic & Data Flow

The Hero section displays national summary numbers and the interactive Thailand map.

## Source

The Hero section uses the same single CSV file as the rest of the app:

`uploads/data/Studio 2 - Studio 2.csv (1).csv`

The flow is:

1. `CsvDataService.getAllChurches()` reads the CSV file.
2. `parseChurchCsv()` maps the CSV columns into `ChurchData`.
3. `src/app/(frontend)/page.tsx` calculates global stats and province stats.
4. `Hero.tsx` passes province stats to `ThailandSvgMap`.

## Top Hero Numbers

Calculated in `src/app/(frontend)/page.tsx`:

- **Total Churches**: count of records where `Status of the Church` is `เปิดอยู่`
- **Total Provinces**: unique province values
- **Villages Reached**: sum of `Village`
- **Total Members**: sum of `Participate` for open records
- **Impact Percentage**: `(totalVillages / 84000) * 100`

## Province Tooltip Numbers

When hovering a province, `ThailandSvgMap` shows the matching `provinceStats` entry.

For each province:

- Church icon = open church count
- Megaphone icon = village total
- User icon = joined/member total

For Nakhon Sawan, the current CSV produces:

```json
{
  "churches": 1687,
  "villages": 12235,
  "joined": "6,934"
}
```

These are the same values shown in the screenshot.
