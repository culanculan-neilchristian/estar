# Thailand Map & Nakhon Sawan Data Mapping

This document explains the current data source and how the same CSV data is used by the Hero Thailand map and the Nakhon Sawan sections.

## 1. Data Source

The application now uses one CSV file as the source of truth:

- **File Path**: `uploads/data/Studio 2 - Studio 2.csv (1).csv`
- **Shared Constant**: `src/services/church-csv-file.ts`
- **Reader**: `CsvDataService.getAllChurches()` in `src/services/csv-data-service.ts`
- **Parser**: `parseChurchCsv()` in `src/services/parse-church-csv.ts`

The service does not choose between database records and fallback records. Frontend pages and API routes read from this one file only.

When a CSV is uploaded through Payload CMS, `src/collections/DataUploads.ts` writes the uploaded file back to this same path, so the next render/build reads the replacement file.

## 2. Important CSV Columns

| UI Data Point | CSV Column | Notes |
| :--- | :--- | :--- |
| Province | `province`, fallback `Provincial region` | Used for Hero province totals and Nakhon Sawan filtering. |
| District / Amphoe | `district` | Used for Nakhon Sawan district grouping. |
| Church group name | `District Church` | This is not the district; it contains church names such as `คริสตจักรไทท่าตะโก`. |
| Sub-district | `sub district` | Stored as `tambon`. |
| Open church status | `Status of the Church` | Open records equal `เปิดอยู่`. |
| Village count | `Village` | Summed for village totals. |
| Members / joined | `Participate` | Summed for joined totals. |
| Start year | `The year the church began` | Used for timeline phases. |

## 3. Hero Thailand Map

The Hero map receives `provinceStats` from `src/app/(frontend)/page.tsx`.

For each province:

- `churches`: number of open records where `Status of the Church` is `เปิดอยู่`
- `villages`: sum of `Village`
- `joined`: sum of `Participate` for open records

The screenshot Nakhon Sawan tooltip is expected from the current CSV:

```json
{
  "churches": 1687,
  "villages": 12235,
  "joined": "6,934"
}
```

## 4. Nakhon Sawan Tracking

`CsvDataService.getImpactTrackerStats("นครสวรรค์")` filters the same CSV data to Nakhon Sawan and builds timeline phases.

Current totals from the one CSV:

```json
{
  "total": 10697,
  "nakhonSawan": 2151,
  "open": 1687,
  "villages": 12235,
  "joined": 6934
}
```

Nakhon Sawan district grouping uses the `district` column after removing spaces and the `อำเภอ` prefix.

## 5. Deployment Note

`/uploads` is ignored by git. On a server, the file must physically exist at:

`uploads/data/Studio 2 - Studio 2.csv (1).csv`

If that file is missing on the server, the app cannot read the large CSV data.
