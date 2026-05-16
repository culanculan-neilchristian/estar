# Hero Section - Logic & Data Flow

This document outlines how the data in the "Hero" section (the top portion of the landing page with the Thailand map) is managed and calculated.

## Overview
The `Hero` component displays high-level, global statistics for the entire movement across Thailand, along with an interactive national map.

## 1. Global Statistics (The Top Numbers)
The numbers displayed at the top of the Hero section represent the cumulative impact across all data found in the uploaded CSV.

*   **Source:** Calculated in `src/app/(frontend)/page.tsx` and passed into `Hero.tsx` via the `stats` prop.
*   **Data Pipeline:**
    1. The latest CSV is fetched via `CsvDataService.getAllChurches()`.
    2. The raw data is reduced into global totals.
*   **Calculations:**
    *   **Total Churches:** The count of all records where the `status` is explicitly set to `"เปิดอยู่"` (Open).
    *   **Total Provinces:** The number of unique, normalized province names found in the dataset.
    *   **Villages Reached:** The sum of the `village` column across all records.
    *   **Impact Percentage:** Calculated mathematically as `(totalVillages / 84000) * 100`.
    *   **Baptized Members:** The sum of the `participate` column across all *open* churches.

## 2. Interactive Map Data (ThailandSvgMap)
When you hover over or click a province on the Thailand map, a tooltip displays specific statistics for that province.

*   **Source:** Calculated in `src/app/(frontend)/page.tsx` and passed via the `provinceStats` prop.
*   **Data Pipeline:**
    1. The `churches` array is processed using a `reduce` function.
    2. Every record's province name is cleaned and standardized using the `normalizeProvince` utility from `src/utils/province-utils.ts`. This ensures that spelling variations (e.g., "นครสวรรค์" vs "เมืองนครสวรรค์") are correctly grouped together under their English equivalent (e.g., "Nakhon Sawan").
    3. The stats (churches, villages, members) are summed up per province. Only records with the status `"เปิดอยู่"` contribute to the church and member counts.

## Code Map
If you need to adjust these calculations, look here:

1.  **`src/app/(frontend)/page.tsx`**
    *   *Line ~14-32:* The global `stats` calculations (Total Churches, Provinces, Villages, Impact %).
    *   *Line ~44-72:* The `provinceStatsMap` grouping logic where individual province totals are calculated for the map tooltips.
2.  **`src/utils/province-utils.ts`**
    *   This file handles mapping the raw Thai CSV text to the standardized English names required by the SVG map paths.
3.  **`src/components/home/Hero.tsx`**
    *   The UI component that receives the data and renders the layout.
