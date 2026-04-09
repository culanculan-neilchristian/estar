import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { z } from 'zod';
import { TimelineStateData, DistrictStats } from '@/data/dummyProvinceData';

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

  /**
   * Aggregates stats for the ImpactTracker component (Nakhon Sawan specific)
   * Groups records into 4 phases: The Start (<2024), One Year In (2024), Today (2025), Next Year (Projection)
   */
  static async getImpactTrackerStats(provinceThaiName: string = 'นครสวรรค์'): Promise<Record<number, TimelineStateData>> {
    const churches = await this.getAllChurches();
    const provinceChurches = churches.filter(c => c.province.trim() === provinceThaiName);

    // Comprehensive District mapping for Nakhon Sawan
    const DISTRICT_MAP: Record<string, string> = {
      'ลาดยาว': 'Lat Yao',
      'ตากฟ้า': 'Tak Fa',
      'ไพศาลี': 'Khaisali',
      'บรรพตพิสัย': 'Ban Phot Phisai',
      'ชุมแสง': 'Chum Saeng',
      'แม่วงก์': 'Mae Wong',
      'เก้าเลี้ยว': 'Kao Liao',
      'เมืองนครสวรรค์': 'Mueang Nakhon Sawan',
      'โกรกพระ': 'Krok Phra',
      'หนองบัว': 'Nong Bua',
      'แม่เปิน': 'Mae Poen',
      'พยุหะคีรี': 'Phayuha Khiri',
      'ท่าตะโก': 'Tha Tako',
      'ตาคลี': 'Takhli',
      'ชุมตาบง': 'Chum Ta Bong',
    };

    const calculatePhaseStats = (maxYear: number | null, label: string, date: string, description: string, bulletPoints: string[]) => {
      // Filter records: open status, within year (if year provided), and ignore invalid/empty IDs
      const records = provinceChurches.filter(c => {
        const year = parseInt(c.yearBegan || '0', 10);
        const yearMatch = maxYear === null || (year > 0 && year <= maxYear);
        return c.id && yearMatch && c.status === 'เปิดอยู่';
      });

      const districtStats = Object.entries(DISTRICT_MAP).map(([thaiName, engName]) => {
        const distRecords = records.filter(c => {
          const normalizedCsv = c.amphoe.replace(/\s+/g, '').replace('อำเภอ', '');
          return normalizedCsv === thaiName;
        });
        
        const joinedCount = distRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
        return {
          id: engName.toLowerCase().replace(/\s+/g, '-'),
          name: engName,
          churches: distRecords.length,
          joined: joinedCount.toLocaleString(),
          baptized: "0",
          coordinates: [0, 0] as [number, number]
        };
      });

      const totalJoined = records.reduce((sum, c) => sum + (c.participate || 0), 0);

      return {
        label,
        date,
        churches: records.length,
        joined: totalJoined.toLocaleString(),
        baptized: Math.floor(totalJoined * 0.67).toLocaleString(),
        description,
        bulletPoints,
        districts: districtStats
      };
    };

    const stats: Record<number, TimelineStateData> = {
      0: calculatePhaseStats(2023, 'The Start', '2024 JANUARY', 
        "Initial foundation phase in Nakhon Sawan.",
        ["Establishing core leadership teams", "Initial survey of target villages"]),
      1: calculatePhaseStats(2024, 'One Year In', '2024 DECEMBER', 
        "A period of significant growth across the target districts.", 
        ["Planted a substantial number of house churches", "Community programs reaching new followers"]),
      2: calculatePhaseStats(2025, 'Today', '2025 JULY', 
        "Sustainable movement building phase.",
        ["Transitioning to self-multiplying phase", "Consistent baptism and training cycles"]),
    };

    // Phase 3: Projection (Next Year) - Apply 20% growth to Phase 2
    const today = stats[2];
    stats[3] = {
      ...today,
      label: 'Next Year Expectations',
      date: '2026 DECEMBER',
      churches: Math.floor(today.churches * 1.2),
      joined: Math.floor(parseInt(today.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
      baptized: "0",
      description: "Projected goal for gospel saturation.",
      bulletPoints: ["Targeting complete coverage", "Scaling training platforms"],
      districts: today.districts.map((d: DistrictStats) => ({
        ...d,
        churches: Math.floor(d.churches * 1.2),
        joined: Math.floor(parseInt(d.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
        baptized: "0",
      }))
    };

    // Phase 4: Full Total (No year filter)
    stats[4] = calculatePhaseStats(null, 'Complete Movement', 'PRESENT',
      "Total impact across all years in Nakhon Sawan.",
      ["Cumulative growth across the region", "Full network of house churches"]);

    return stats;
  }
}
