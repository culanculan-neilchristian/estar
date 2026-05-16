# Impact Tracker - Logic & Data Flow

This document outlines how the data in the "Impact Tracker" section (the timeline and Nakhon Sawan map) is managed and calculated.

## Overview
The `ImpactTracker` component displays a step-by-step timeline of church planting growth within a specific province (currently Nakhon Sawan), alongside an interactive map of the province's districts.

## 1. Timeline Data (The Phases)
The timeline data groups the CSV records into chronological phases based on the year the churches began.

*   **Source:** Calculated in `src/services/csv-data-service.ts` and passed down from `src/app/(frontend)/page.tsx` via the `data` prop.
*   **Data Pipeline:**
    1. `page.tsx` calls `CsvDataService.getImpactTrackerStats(getThaiProvinceName("Nakhon Sawan"))`.
    2. The service fetches all CSV records and filters them down to **only** those matching the normalized province name.
    3. The records are then filtered into "phases" based on the `yearBegan` column:
        *   **Phase 0 (The Start):** Up to 2023.
        *   **Phase 1 (One Year In):** Up to 2024.
        *   **Phase 2 (Today):** Up to 2025.
        *   **Phase 3 (Next Year):** A programmatic 20% growth projection applied to Phase 2.
        *   **Phase 4 (Complete Movement):** All records regardless of year.
*   **Fallback:** If the CSV is empty or the parsing fails, the component falls back to using `NAKHON_SAWAN_DUMMY_DATA` located in `src/data/dummyProvinceData.ts`.

## 2. Interactive Map & Summary Stats
The map displays the districts of Nakhon Sawan. 

*   **Logic Rules:**
    *   **Map Tooltips:** When you click or hover over a district on the map, a floating tooltip appears showing the specific church, village, and member counts for **that specific district** during the currently selected timeline phase.
    *   **Global Summary (The Big Numbers):** The large statistic numbers displayed directly below the map represent the **total sum for the entire province** during the selected timeline phase. Clicking a district on the map *does not* change these global summary numbers.
*   **District Normalization:** In `CsvDataService.ts`, the raw `district` (amphoe) strings from the CSV are stripped of whitespace and prefixes like "อำเภอ" to match them cleanly against the expected English district names in the SVG map.

## Code Map
If you need to trace or modify this logic, follow this path:

1.  **`src/services/csv-data-service.ts`**
    *   *Line ~47:* `calculateImpactTrackerStats()` is the engine that does all the heavy lifting. This is where you adjust the years for the timeline phases, update descriptions, or modify the 20% projection formula.
2.  **`src/components/home/ImpactTracker.tsx`**
    *   The UI component. It controls the `activeStep` state and ensures the large numbers below the map always reflect the province-wide totals (`currentState`), not the individual district selections.
3.  **`src/data/dummyProvinceData.ts`**
    *   Contains the hardcoded fallback data (`NAKHON_SAWAN_DUMMY_DATA`) used if the live CSV data is unavailable.
