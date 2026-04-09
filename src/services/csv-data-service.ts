import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { z } from 'zod';

// Define a clean schema with camelCase keys for better DX
export const ChurchDataSchema = z.object({
  id: z.string(),
  submittedTime: z.string(),
  churchName: z.string(),
  yearBegan: z.string().optional(),
  type: z.string().optional(),
  village: z.string().optional(),
  province: z.string(),
  amphoe: z.string(),   // This is the District (Amphoe)
  tambon: z.string(),   // This is the Sub-district (Tambon)
  participate: z.number().default(0), // Membership/Attendance
  coordinates: z.string().optional(),
  status: z.string(),
  imageMain: z.string().optional(),
});

export type ChurchData = z.infer<typeof ChurchDataSchema>;

// Global cache to avoid re-parsing the 16MB file on every request
let cachedData: ChurchData[] | null = null;

export class CsvDataService {
  private static filePath = path.join(process.cwd(), 'src/data/estar-data.csv');

  /**
   * Parses the CSV file using streaming for memory efficiency
   * Handles duplicate columns and maps them to clean keys
   */
  static async getAllChurches(): Promise<ChurchData[]> {
    if (cachedData) return cachedData;

    console.log('🚀 Parsing 16MB CSV data...');

    const churches: ChurchData[] = [];
    const fileStream = fs.createReadStream(this.filePath);

    return new Promise((resolve, reject) => {
      let districtCount = 0;

      Papa.parse(fileStream, {
        header: true,
        skipEmptyLines: true,
        // Optimization: Transform headers to avoid duplicates and use clean names
        transformHeader: (header) => {
          const h = header.trim();
          if (h === 'Response ID') return 'id';
          if (h === 'Submitted Time') return 'submittedTime';
          if (h === 'Church name') return 'churchName';
          if (h === 'The year the church began') return 'yearBegan';
          if (h === 'Church type') return 'type';
          if (h === 'Village') return 'village';
          if (h === 'province') return 'province';
          if (h === 'Coordinates of the church') return 'coordinates';
          if (h === 'Status of the Church') return 'status';
          if (h === 'Church pictures') return 'imageMain';
          
          if (h === 'Participate') return 'participate';
          
          // Handle the duplicate 'district' columns at the end
          if (h === 'district') {
            districtCount++;
            // Mapping to Thai administrative levels for clarity
            // 1st is Amphoe (District), 2nd is Tambon (Sub-district)
            return districtCount === 1 ? 'amphoe' : 'tambon';
          }
          
          return h;
        },
        step: (results) => {
          // This runs for every row, processing it one by one (streaming)
          // We cast to Record<string, string> for type safety during extraction
          const row = results.data as Record<string, string>;
          
          // Only push if it has the minimum required data
          if (row.id && row.churchName) {
            churches.push({
              id: row.id,
              submittedTime: row.submittedTime,
              churchName: row.churchName,
              yearBegan: row.yearBegan,
              type: row.type,
              village: row.village,
              province: row.province,
              amphoe: row.amphoe,
              tambon: row.tambon,
              participate: parseInt(row.participate || '0', 10),
              coordinates: row.coordinates,
              status: row.status,
              imageMain: row.imageMain,
            });
          }
        },
        complete: () => {
          cachedData = churches;
          resolve(churches);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Helper to clear cache if you know the file has changed
   */
  static clearCache() {
    cachedData = null;
  }
}
