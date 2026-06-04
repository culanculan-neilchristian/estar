import { readFile } from 'fs/promises';
import { TimelineStateData, DistrictStats } from '@/data/dummyProvinceData';
import { ChurchData, ChurchDataSchema } from '@/types/church';
import { normalizeProvince } from '@/utils/province-utils';
import { CHURCH_CSV_FILE_PATH } from './church-csv-file';
import { parseChurchCsv } from './parse-church-csv';

export { type ChurchData, ChurchDataSchema };

const OPEN_STATUS = '\u0e40\u0e1b\u0e34\u0e14\u0e2d\u0e22\u0e39\u0e48';
const NAKHON_SAWAN = '\u0e19\u0e04\u0e23\u0e2a\u0e27\u0e23\u0e23\u0e04\u0e4c';
const AMPHOE_PREFIX = '\u0e2d\u0e33\u0e40\u0e20\u0e2d';

const NAKHON_SAWAN_DISTRICTS: Record<string, string> = {
  '\u0e25\u0e32\u0e14\u0e22\u0e32\u0e27': 'Lat Yao',
  '\u0e15\u0e32\u0e01\u0e1f\u0e49\u0e32': 'Tak Fa',
  '\u0e44\u0e1e\u0e28\u0e32\u0e25\u0e35': 'Phaisali',
  '\u0e1a\u0e23\u0e23\u0e1e\u0e15\u0e1e\u0e34\u0e2a\u0e31\u0e22': 'Banphot Phisai',
  '\u0e0a\u0e38\u0e21\u0e41\u0e2a\u0e07': 'Chum Saeng',
  '\u0e41\u0e21\u0e48\u0e27\u0e07\u0e01\u0e4c': 'Mae Wong',
  '\u0e40\u0e01\u0e49\u0e32\u0e40\u0e25\u0e35\u0e49\u0e22\u0e27': 'Kao Liao',
  '\u0e40\u0e21\u0e37\u0e2d\u0e07\u0e19\u0e04\u0e23\u0e2a\u0e27\u0e23\u0e23\u0e04\u0e4c': 'Mueang Nakhon Sawan',
  '\u0e42\u0e01\u0e23\u0e01\u0e1e\u0e23\u0e30': 'Krok Phra',
  '\u0e2b\u0e19\u0e2d\u0e07\u0e1a\u0e31\u0e27': 'Nong Bua',
  '\u0e41\u0e21\u0e48\u0e40\u0e1b\u0e34\u0e19': 'Mae Poen',
  '\u0e1e\u0e22\u0e38\u0e2b\u0e30\u0e04\u0e35\u0e23\u0e35': 'Phayuha Khiri',
  '\u0e17\u0e48\u0e32\u0e15\u0e30\u0e42\u0e01': 'Tha Tako',
  '\u0e15\u0e32\u0e04\u0e25\u0e35': 'Takhli',
  '\u0e0a\u0e38\u0e21\u0e15\u0e32\u0e1a\u0e07': 'Chum Ta Bong',
};

function normalizeDistrictName(name: string | undefined): string {
  return (name || '').replace(/\s+/g, '').replace(new RegExp(`^${AMPHOE_PREFIX}`), '').trim();
}

export class CsvDataService {
  private static async getLatestUploadedChurches(): Promise<ChurchData[]> {
    try {
      const [{ getPayload }, { default: configPromise }] = await Promise.all([
        import('payload'),
        import('../payload.config'),
      ]);
      const payload = await getPayload({ config: configPromise });
      const latestUpload = await payload.find({
        collection: 'data-uploads',
        sort: '-createdAt',
        limit: 1,
      });

      const doc = latestUpload.docs[0];
      const churches = (doc?.results as ChurchData[] | undefined) || [];
      console.log(`[CSV-DATA] Loaded ${churches.length} churches from latest admin upload`);
      return churches;
    } catch (error) {
      console.error('[CSV-DATA] Error reading latest admin upload:', error);
      return [];
    }
  }

  /**
   * Reads church data from the source CSV file. If the server cannot read
   * the file, use the latest parsed admin upload to avoid serving zero data.
   */
  static async getAllChurches(): Promise<ChurchData[]> {
    try {
      const csvString = await readFile(CHURCH_CSV_FILE_PATH, 'utf8');
      const churches = parseChurchCsv(csvString);
      console.log(`[CSV-DATA] Loaded ${churches.length} churches from ${CHURCH_CSV_FILE_PATH}`);
      return churches;
    } catch (error) {
      console.error(`[CSV-DATA] Error reading ${CHURCH_CSV_FILE_PATH}:`, error);
      return this.getLatestUploadedChurches();
    }
  }

  static getImpactTrackerStats(provinceThaiName: string = NAKHON_SAWAN) {
    return this.calculateImpactTrackerStats(provinceThaiName);
  }

  /**
   * Aggregates stats for the ImpactTracker component.
   */
  private static async calculateImpactTrackerStats(provinceThaiName: string = NAKHON_SAWAN): Promise<Record<number, TimelineStateData>> {
    const churches = await this.getAllChurches();

    const targetEngName = normalizeProvince(provinceThaiName);
    const provinceChurches = churches.filter(c => normalizeProvince(c.province) === targetEngName);

    const calculatePhaseStats = (maxYear: number | null, label: string, date: string, description: string, bulletPoints: string[]) => {
      const phaseRecords = provinceChurches.filter(c => {
        const year = parseInt(c.yearBegan || '0', 10);
        const yearMatch = maxYear === null || (year > 0 && year <= maxYear);
        return !!c.id && yearMatch;
      });

      const openRecords = phaseRecords.filter(c => c.status?.trim() === OPEN_STATUS);

      const districtStats = Object.entries(NAKHON_SAWAN_DISTRICTS).map(([thaiName, engName]) => {
        const distPhaseRecords = phaseRecords.filter(c => normalizeDistrictName(c.amphoe) === thaiName);
        const distOpenRecords = distPhaseRecords.filter(c => c.status?.trim() === OPEN_STATUS);
        const joinedCount = distOpenRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
        const totalVillagesInDistrict = distPhaseRecords.reduce((sum, c) => sum + (c.village || 0), 0);

        return {
          id: engName.toLowerCase().replace(/\s+/g, '-'),
          name: engName,
          churches: distOpenRecords.length,
          villages: totalVillagesInDistrict,
          joined: joinedCount.toLocaleString(),
          baptized: '0',
          coordinates: [0, 0] as [number, number],
        };
      });

      const totalJoined = openRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
      const totalVillages = phaseRecords.reduce((sum, c) => sum + (c.village || 0), 0);

      return {
        label,
        date,
        churches: openRecords.length,
        villages: totalVillages,
        joined: totalJoined.toLocaleString(),
        baptized: Math.floor(totalJoined * 0.67).toLocaleString(),
        description,
        bulletPoints,
        districts: districtStats,
      };
    };

    const stats: Record<number, TimelineStateData> = {
      0: calculatePhaseStats(2023, 'The Start', '2024 JANUARY',
        'Initial foundation phase in Nakhon Sawan.',
        ['Establishing core leadership teams', 'Initial survey of target villages']),
      1: calculatePhaseStats(2024, 'One Year In', '2024 DECEMBER',
        'A period of significant growth across the target districts.',
        ['Planted a substantial number of house churches', 'Community programs reaching new followers']),
      2: calculatePhaseStats(2025, 'Today', '2025 JULY',
        'Sustainable movement building phase.',
        ['Transitioning to self-multiplying phase', 'Consistent baptism and training cycles']),
    };

    const today = stats[2];
    stats[3] = {
      ...today,
      label: 'Next Year Expectations',
      date: '2026 DECEMBER',
      churches: Math.floor(today.churches * 1.2),
      villages: Math.floor(today.villages * 1.2),
      joined: Math.floor(parseInt(today.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
      baptized: '0',
      description: 'Projected goal for gospel saturation.',
      bulletPoints: ['Targeting complete coverage', 'Scaling training platforms'],
      districts: today.districts.map((d: DistrictStats) => ({
        ...d,
        churches: Math.floor(d.churches * 1.2),
        villages: Math.floor(d.villages * 1.2),
        joined: Math.floor(parseInt(d.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
        baptized: '0',
      })),
    };

    stats[4] = calculatePhaseStats(null, 'Complete Movement', 'PRESENT',
      'Total impact across all years in Nakhon Sawan.',
      ['Cumulative growth across the region', 'Full network of house churches']);

    return stats;
  }
}
