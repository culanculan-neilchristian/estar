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

import { PROVINCE_DISTRICT_MAPPINGS } from '@/data/provinceDistrictMappings';

function normalizeDistrictName(name: string | undefined): string {
  return (name || '').replace(/\s+/g, '').replace(new RegExp(`^${AMPHOE_PREFIX}`), '').trim();
}

import { cache } from 'react';

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
   * Reads church data from the admin dashboard first. If the admin has no data
   * (e.g. deleted), use the local static CSV file as a fallback.
   * Wrapped in React cache() to prevent 77 redundant DB hits per page load,
   * while ensuring it instantly clears on the next page refresh.
   */
  static getAllChurches = cache(async (): Promise<ChurchData[]> => {
    try {
      // 1. Try to get the latest upload from the admin dashboard FIRST
      const uploadedChurches = await CsvDataService.getLatestUploadedChurches();
      if (uploadedChurches && uploadedChurches.length > 0) {
        return uploadedChurches;
      }
      
      // 2. If no admin upload exists (e.g. deleted), fallback to the local file
      const csvString = await readFile(CHURCH_CSV_FILE_PATH, 'utf8');
      const churches = parseChurchCsv(csvString);
      console.log(`[CSV-DATA] Admin data empty. Loaded ${churches.length} churches from fallback file ${CHURCH_CSV_FILE_PATH}`);
      return churches;
    } catch (error) {
      console.error(`[CSV-DATA] Error reading fallback file ${CHURCH_CSV_FILE_PATH}:`, error);
      return [];
    }
  });

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

    // Fallback to the original dummy data if the CSV is completely empty for Nakhon Sawan
    if (provinceChurches.length === 0 && targetEngName === 'Nakhon Sawan') {
      const { NAKHON_SAWAN_DUMMY_DATA } = await import('@/data/dummyProvinceData');
      return NAKHON_SAWAN_DUMMY_DATA;
    }

    const districtMapping = PROVINCE_DISTRICT_MAPPINGS[targetEngName] || {};

    const calculatePhaseStats = (maxYear: number | null, label: string, date: string, description: string, bulletPoints: string[]) => {
      const phaseRecords = provinceChurches.filter(c => {
        const year = parseInt(c.yearBegan || '0', 10);
        const yearMatch = maxYear === null || (year > 0 && year <= maxYear);
        return !!c.id && yearMatch;
      });

      const openRecords = phaseRecords.filter(c => c.status?.trim() === OPEN_STATUS);

      const districtStats = Object.entries(districtMapping).map(([thaiName, engName]) => {
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
          baptized: Math.floor(joinedCount * 0.67).toLocaleString(),
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
      0: calculatePhaseStats(2024, 'The Start', '2024 JANUARY',
        `Initial foundation phase in ${targetEngName}.`,
        ['Establishing core leadership teams', 'Initial survey of target villages']),
      1: calculatePhaseStats(2025, 'One Year In', '2025 DECEMBER',
        `A period of significant growth across the target districts in ${targetEngName}.`,
        ['Planted a substantial number of house churches', 'Community programs reaching new followers']),
      2: calculatePhaseStats(2026, 'Today', '2026 JULY',
        `Sustainable movement building phase in ${targetEngName}.`,
        ['Transitioning to self-multiplying phase', 'Consistent baptism and training cycles']),
    };

    const today = stats[2];
    stats[3] = {
      ...today,
      label: 'Next Year Expectations',
      date: '2027 DECEMBER',
      churches: Math.floor(today.churches * 1.2),
      villages: Math.floor(today.villages * 1.2),
      joined: Math.floor(parseInt(today.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
      baptized: Math.floor(parseInt(today.joined.replace(/,/g, ''), 10) * 1.2 * 0.67).toLocaleString(),
      description: 'Projected goal for gospel saturation.',
      bulletPoints: ['Targeting complete coverage', 'Scaling training platforms'],
      districts: today.districts.map((d: DistrictStats) => ({
        ...d,
        churches: Math.floor(d.churches * 1.2),
        villages: Math.floor(d.villages * 1.2),
        joined: Math.floor(parseInt(d.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
        baptized: Math.floor(parseInt(d.joined.replace(/,/g, ''), 10) * 1.2 * 0.67).toLocaleString(),
      })),
    };

    stats[4] = calculatePhaseStats(null, 'Complete Movement', 'PRESENT',
      `Total impact across all years in ${targetEngName}.`,
      ['Cumulative growth across the region', 'Full network of house churches']);

    return stats;
  }
}
