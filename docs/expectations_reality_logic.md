# Expectations vs. Reality - Logic & Data Flow

This document outlines how the data in the "Expectations & Reality" section of the landing page is managed, where it originates, and how you can track or update it over time.

## Overview
The `ExpectationsReality` component displays a side-by-side comparison of two maps and statistic blocks:
1. **Expected 2024 Results** (Static Goals)
2. **Actual 2024 Results** (Dynamic Real-world Data)

---

## 1. Expected Data (The Goal)
The **Expected** side represents the initial vision or projection for the Nakhon Sawan province. 

*   **Source:** Hardcoded directly within `src/components/home/ExpectationsReality.tsx`.
*   **Variable Name:** `EXPECTED_DATA`
*   **How it works:** It uses static numbers (e.g., 311 churches, 3,200 members) and defines exact static counts for the 3 key districts (Lat Yao, Tak Fa, Khaisali).
*   **How to update:** If the organization's historical goals change or you need to add another district to the "expected" baseline, you must manually edit the `EXPECTED_DATA` constant in `ExpectationsReality.tsx`.

## 2. Actual Data (The Reality)
The **Actual** side represents the real, live data collected from the field. It dynamically updates whenever a new CSV is uploaded via the Payload CMS.

*   **Source:** `src/app/(frontend)/page.tsx` passes it down via the `actualData2024` prop.
*   **Data Pipeline:** 
    1. The CSV is parsed into the database (`DataUploads.ts`).
    2. `CsvDataService.ts` (`calculateImpactTrackerStats()`) aggregates this data into timeline "phases". 
    3. The data for "Phase 1" (which represents the 2024 footprint) is passed into the component.
*   **Variable Name:** `dynamicActual` (inside `ExpectationsReality.tsx`)
*   **Fallback:** If for any reason the CSV data fails to load or is empty, the component safely falls back to a hardcoded `ACTUAL_DATA` object defined in the same file to prevent the UI from breaking.

## Code Map
If you ever need to trace or modify this logic, follow this path:

1.  **`src/components/home/ExpectationsReality.tsx`** 
    *   *Line ~20:* `EXPECTED_DATA` (Edit this to change the goals).
    *   *Line ~32:* `ACTUAL_DATA` (Edit this to change the fallback/dummy data).
    *   *Line ~115:* `dynamicActual` (This is where the dynamic prop is mapped to the UI).

2.  **`src/app/(frontend)/page.tsx`**
    *   *Line ~86:* `<ExpectationsReality actualData2024={nakhonSawanStats[1]} />` (Passes the "Phase 1 / 2024" stats into the component).

3.  **`src/services/csv-data-service.ts`**
    *   *Line ~122:* The specific logic that filters the CSV rows to calculate what the "Actual" footprint was at the end of 2024.
