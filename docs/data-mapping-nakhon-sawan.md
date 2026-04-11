# Thailand Map & Nakhon Sawan Data Mapping Documentation

This document explains how data is retrieved from the CSV source, processed, and displayed on both the whole Thailand map (Hero section) and the detailed Nakhon Sawan trackers.

## 1. Data Source
The primary source of truth for all data in this application is:
- **File Path**: `src\data\estar-data.csv`
- **Total Records**: ~10,700 rows
- **Key Columns**:
  - `province`: Primary filtering (e.g., `นครสวรรค์`).
  - `district` (1st): Mapped to `amphoe` (District level).
  - `district` (2nd): Mapped to `tambon` (Sub-district level).
  - `Church name`: Identifying specific churches.
  - `Participate`: Membership/attendance count.
  - `Status of the Church`: Filter for `เปิดอยู่` (Open).
  - `The year the church began`: Used for timeline tracking.

---

## 2. Whole Thailand Map (Hero Section)
The interactive map on the Hero section provides a national overview by aggregating data for every province.

### Data Flow
1. **Extraction**: `CsvDataService.getAllChurches()` loads all records from the CSV into memory.
2. **Aggregation**: In `src\app\page.tsx`, records are grouped by province:
   ```typescript
   const provinceStatsMap = churches.reduce((acc, church) => {
     const rawProvince = church.province.trim();
     const provinceName = PROVINCE_MAPPING[rawProvince] || rawProvince;
     // Sums total churches and membership (participate) per province
     return acc;
   }, {});
   ```
3. **Translation**: Thai province names (CSV) are mapped to English IDs (SVG Map) using `src\data\provinceMapping.ts`.
4. **Interactive Display**:
   - Aggregated stats are passed to `ThailandSvgMap`.
   - On hover, the map matches the SVG path's name to the `provinceStats` array to display **Total Churches** and **Total Members** for that province.

---

## 3. Nakhon Sawan Detailed Tracking
For the Nakhon Sawan section, the application provides deeper district-level insights.

### Service Logic
`CsvDataService.getImpactTrackerStats("นครสวรรค์")` handles this:
1. **Filtering**: Focuses only on open churches within Nakhon Sawan.
2. **District Mapping**: Uses an internal `DISTRICT_MAP` to translate Thai names (e.g., `ลาดยาว`) to UI component IDs (e.g., `Lat Yao`).
3. **Timeline Phases**: Processes data into 5 specific phases (Start, Year 1, Today, Projection, Total) to show growth over time.

---

## 4. District vs. Province Distinction
The application manages two distinct levels of mapping:
- **Province Level**: Used for the national map. Nakhon Sawan is treated as one of 77 provinces.
- **District Level (City)**: Used when zooming into a specific province (like Nakhon Sawan). The "City" center specifically refers to the `เมืองนครสวรรค์` (Mueang Nakhon Sawan) district in the CSV.

---

## 5. Summary of Key Files
- [estar-data.csv](file:///c:/RepoOutside/estar/src/data/estar-data.csv): Raw data.
- [csv-data-service.ts](file:///c:/RepoOutside/estar/src/services/csv-data-service.ts): Core processing logic.
- [provinceMapping.ts](file:///c:/RepoOutside/estar/src/data/provinceMapping.ts): Name translation layer.
- [page.tsx](file:///c:/RepoOutside/estar/src/app/page.tsx): Main data orchestration.
- [ThailandSvgMap.tsx](file:///c:/RepoOutside/estar/src/components/home/ThailandSvgMap.tsx): National map visualization.
- [NakhonSawanSvgMap.tsx](file:///c:/RepoOutside/estar/src/components/home/NakhonSawanSvgMap.tsx): Province-specific visualization.

---

## 6. Detailed Column Mapping
Below is the exact mapping between the CSV columns and the data points used in the application:

| UI Data Point | CSV Column Name | Notes |
| :--- | :--- | :--- |
| **Province Name** | `province` | Used to filter Nakhon Sawan (`นครสวรรค์`). |
| **District (Amphoe)** | `district` (1st occurrence) | The first of the two columns named `district`. |
| **Sub-district (Tambon)** | `district` (2nd occurrence) | The second of the two columns named `district`. |
| **Total Churches** | (Row Count) | Filtered by `Status of the Church` = `เปิดอยู่`. |
| **Total Members** | `Participate` | Summed across rows. |
| **Baptisms** | (Calculated) | Currently calculated as 67% of `Participate` in some views. |
| **Church Name** | `Church name` | Displayed in detailed lists. |
| **Start Year** | `The year the church began` | Used for timeline and growth charts. |
| **Coordinates** | `Coordinates of the church` | Used for future map plotting. |
| **Main Image** | `Church pictures` | The URL for church atmosphere/location photos. |
| **Village Name** | `Village` | Used for location identification. |

---

## 7. Formatting Note
The CSV uses Thai characters for geographical names. The application uses `PROVINCE_MAPPING` and `DISTRICT_MAP` to translate these to English IDs for SVG path selection and UI routing.
