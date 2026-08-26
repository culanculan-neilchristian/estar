import { BigQuery } from '@google-cloud/bigquery';
import { cache } from 'react';
import type { ChurchData } from '@/types/church';
import { TimelineStateData, DistrictStats } from '@/data/dummyProvinceData';
import { normalizeProvince } from '@/utils/province-utils';
import { PROVINCE_DISTRICT_MAPPINGS } from '@/data/provinceDistrictMappings';

const OPEN_STATUS = '\u0e40\u0e1b\u0e34\u0e14\u0e2d\u0e22\u0e39\u0e48'; // เปิดอยู่
const NAKHON_SAWAN = '\u0e19\u0e04\u0e23\u0e2a\u0e27\u0e23\u0e23\u0e04\u0e4c'; // นครสวรรค์
const AMPHOE_PREFIX = '\u0e2d\u0e33\u0e40\u0e20\u0e2d'; // อำเภอ

function normalizeDistrictName(name: string | undefined): string {
  return (name || '').replace(/\s+/g, '').replace(new RegExp(`^${AMPHOE_PREFIX}`), '').trim();
}

function parseNumber(value: any): number {
  if (typeof value === 'number') return value;
  const parsed = parseInt(String(value || '0'), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export class BigQueryDataService {
  private static bq = new BigQuery(
    process.env.GOOGLE_CREDENTIALS_JSON 
      ? { credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON) } 
      : undefined
  );
  private static dataset = 'kaptrack.aft3';

  static getGlobalBelieverStats = cache(async () => {
    try {
      const query = `
        SELECT 
          COUNT(1) as totalJoined,
          COUNT(Q9) as totalBaptized
        FROM \`${this.dataset}.new_believers\`
      `;
      const [rows] = await this.bq.query(query);
      return {
        joined: parseInt(rows[0]?.totalJoined || 0, 10),
        baptized: parseInt(rows[0]?.totalBaptized || 0, 10),
      };
    } catch (error) {
      console.error('[BigQuery] Error fetching global believer stats:', error);
      return { joined: 0, baptized: 0 };
    }
  });

  static getProvinceBelieverStats = cache(async () => {
    try {
      const query = `
        SELECT 
          Q12 as province,
          COUNT(1) as joined,
          COUNT(Q9) as baptized
        FROM \`${this.dataset}.new_believers\`
        GROUP BY Q12
      `;
      const [rows] = await this.bq.query(query);
      const result: Record<string, { joined: number; baptized: number }> = {};
      for (const row of rows) {
        if (row.province) {
          const engName = normalizeProvince(row.province.trim());
          // Merge if multiple Thai variants map to the same English name
          if (!result[engName]) {
            result[engName] = { joined: 0, baptized: 0 };
          }
          result[engName].joined += parseInt(row.joined || 0, 10);
          result[engName].baptized += parseInt(row.baptized || 0, 10);
        }
      }
      return result;
    } catch (error) {
      console.error('[BigQuery] Error fetching province believer stats:', error);
      return {};
    }
  });

  static getDistrictBelieverStats = cache(async () => {
    try {
      // Fetch all districts to avoid n+1 queries
      const query = `
        SELECT 
          Q13 as district,
          COUNT(1) as joined,
          COUNT(Q9) as baptized
        FROM \`${this.dataset}.new_believers\`
        GROUP BY Q13
      `;
      const [rows] = await this.bq.query(query);
      const result: Record<string, { joined: number; baptized: number }> = {};
      for (const row of rows) {
        if (row.district) {
          result[row.district.trim()] = {
            joined: parseInt(row.joined || 0, 10),
            baptized: parseInt(row.baptized || 0, 10),
          };
        }
      }
      return result;
    } catch (error) {
      console.error('[BigQuery] Error fetching district believer stats:', error);
      return {};
    }
  });

  static getAllChurches = cache(async (): Promise<ChurchData[]> => {
    try {
      const query = `SELECT * FROM \`${this.dataset}.churches\``;
      const [rows] = await this.bq.query(query);

      return rows
        .filter((row: any) => !!row['Response ID'] && !!row['\u0e0a\u0e37\u0e48\u0e2d\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'])
        .map((row: any) => ({
          id: String(row['Response ID']),
          submittedTime: row['Submitted Time']?.value ? new Date(row['Submitted Time'].value).toISOString() : '',
          churchName: row['\u0e0a\u0e37\u0e48\u0e2d\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'], // ชื่อคริสตจักร
          yearBegan: row['\u0e1b\u0e35\u0e17\u0e35\u0e48\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23\u0e40\u0e23\u0e34\u0e48\u0e21\u0e15\u0e49\u0e19'] ? String(row['\u0e1b\u0e35\u0e17\u0e35\u0e48\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23\u0e40\u0e23\u0e34\u0e48\u0e21\u0e15\u0e49\u0e19']) : undefined, // ปีที่คริสตจักรเริ่มต้น
          type: row['\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'] || undefined, // ประเภทคริสตจักร
          village: parseNumber(row['\u0e2b\u0e21\u0e39\u0e48\u0e17\u0e35\u0e48']), // หมู่ที่
          province: row['\u0e08\u0e31\u0e07\u0e2b\u0e27\u0e31\u0e14'] || row['\u0e20\u0e32\u0e04\u0e08\u0e31\u0e07\u0e2b\u0e27\u0e31\u0e14'] || '', // จังหวัด || ภาคจังหวัด
          amphoe: row['\u0e2d\u0e33\u0e40\u0e20\u0e2d'] || '', // อำเภอ
          tambon: row['\u0e15\u0e33\u0e1a\u0e25'] || '', // ตำบล
          participate: parseNumber(row['\u0e40\u0e02\u0e49\u0e32\u0e23\u0e48\u0e27\u0e21']), // เข้าร่วม
          coordinates: row['\u0e1e\u0e34\u0e01\u0e31\u0e14\u0e02\u0e2d\u0e07\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'] || undefined, // พิกัดของคริสตจักร
          status: row['\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e02\u0e2d\u0e07\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'] || '', // สถานะของคริสตจักร
          imageMain: row['\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e04\u0e23\u0e34\u0e2a\u0e15\u0e08\u0e31\u0e01\u0e23'] || undefined, // รูปภาพคริสตจักร
        }));
    } catch (error) {
      console.error('[BigQuery] Error fetching churches:', error);
      return [];
    }
  });

  static getImpactTrackerStats(provinceThaiName: string = NAKHON_SAWAN) {
    return this.calculateImpactTrackerStats(provinceThaiName);
  }

  private static async calculateImpactTrackerStats(provinceThaiName: string = NAKHON_SAWAN): Promise<Record<number, TimelineStateData>> {
    const churches = await this.getAllChurches();
    const districtBelievers = await this.getDistrictBelieverStats();

    const targetEngName = normalizeProvince(provinceThaiName);
    const provinceChurches = churches.filter(c => normalizeProvince(c.province) === targetEngName);

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
        
        // For 'Today' and 'Complete Movement' phases (maxYear null or >= 2026), show the real joined/baptized stats from the believers database for this district.
        // Otherwise, keep them 0 or proportional. For simplicity, if we are doing historical phases, we can just use the church participate numbers or 0.
        // But since this is a real-time dashboard, showing the current total for the district is best.
        
        // Let's use the new_believers data for the district
        let joinedCount = 0;
        let baptizedCount = 0;
        
        if (maxYear === null || maxYear >= 2026) {
           const believers = districtBelievers[thaiName] || { joined: 0, baptized: 0 };
           joinedCount = believers.joined;
           baptizedCount = believers.baptized;
        } else {
           // For historical phases, we fallback to the old method to simulate growth, or just use 0.
           joinedCount = distOpenRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
           baptizedCount = Math.floor(joinedCount * 0.67);
        }
        
        const totalVillagesInDistrict = distPhaseRecords.reduce((sum, c) => sum + (c.village || 0), 0);

        return {
          id: engName.toLowerCase().replace(/\s+/g, '-'),
          name: engName,
          churches: distOpenRecords.length,
          villages: totalVillagesInDistrict,
          joined: joinedCount.toLocaleString(),
          baptized: baptizedCount.toLocaleString(),
          coordinates: [0, 0] as [number, number],
        };
      });

      // Calculate total joined and baptized for this phase
      let totalJoined = 0;
      let totalBaptized = 0;
      
      if (maxYear === null || maxYear >= 2026) {
          totalJoined = districtStats.reduce((sum, d) => sum + parseInt(d.joined.replace(/,/g, '')), 0);
          totalBaptized = districtStats.reduce((sum, d) => sum + parseInt(d.baptized.replace(/,/g, '')), 0);
      } else {
          totalJoined = openRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
          totalBaptized = Math.floor(totalJoined * 0.67);
      }
      
      const totalVillages = phaseRecords.reduce((sum, c) => sum + (c.village || 0), 0);

      return {
        label,
        date,
        churches: openRecords.length,
        villages: totalVillages,
        joined: totalJoined.toLocaleString(),
        baptized: totalBaptized.toLocaleString(),
        description,
        bulletPoints,
        districts: districtStats,
      };
    };

    const stats: Record<number, TimelineStateData> = {
      0: calculatePhaseStats(2023, 'The Start', '2024 JANUARY',
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
