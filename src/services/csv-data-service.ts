import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import configPromise from '@/payload.config';
import { TimelineStateData, DistrictStats } from '@/data/dummyProvinceData';
import { ChurchData, ChurchDataSchema } from '@/types/church';
import { normalizeProvince, getThaiProvinceName } from '@/utils/province-utils';

export { type ChurchData, ChurchDataSchema };

export class CsvDataService {

  /**
   * Raw fetcher for churches. 
   * Note: Not cached with unstable_cache because the 11MB JSON exceeds Next.js's 2MB cache limit.
   */
  static async getAllChurches(): Promise<ChurchData[]> {
    try {
      const payload = await getPayload({ config: configPromise });
      const latestUpload = await payload.find({
        collection: 'data-uploads',
        sort: '-createdAt',
        limit: 1,
      });

      if (!latestUpload.docs.length) return [];
      
      const doc = latestUpload.docs[0];
      return (doc.results as ChurchData[]) || [];
    } catch (error) {
      console.error('❌ Error in getAllChurches:', error);
      return [];
    }
  }


  /**
   * Cached version of getImpactTrackerStats
   */
  static getImpactTrackerStats = (provinceThaiName: string = 'นครสวรรค์') => 
    unstable_cache(
      async () => this.calculateImpactTrackerStats(provinceThaiName),
      ['impact-stats', provinceThaiName],
      { tags: ['csv-data'] }
    )();

  /**
   * Aggregates stats for the ImpactTracker component (Nakhon Sawan specific)
   */
  private static async calculateImpactTrackerStats(provinceThaiName: string = 'นครสวรรค์'): Promise<Record<number, TimelineStateData>> {
    const churches = await this.getAllChurches();
    
    // Normalize target name to English for comparison
    const targetEngName = normalizeProvince(provinceThaiName);
    
    const provinceChurches = churches.filter(c => normalizeProvince(c.province) === targetEngName);

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
      // Phase records include all entries within the year range (cumulative footprint)
      const phaseRecords = provinceChurches.filter(c => {
        const year = parseInt(c.yearBegan || '0', 10);
        const yearMatch = maxYear === null || (year > 0 && year <= maxYear);
        return !!c.id && yearMatch;
      });

      // Open records are used for active church and member counts
      const openRecords = phaseRecords.filter(c => c.status?.trim() === 'เปิดอยู่');

      const districtStats = Object.entries(DISTRICT_MAP).map(([thaiName, engName]) => {
        const distPhaseRecords = phaseRecords.filter(c => {
          const normalizedCsv = c.amphoe.replace(/\s+/g, '').replace('อำเภอ', '');
          return normalizedCsv === thaiName;
        });
        
        const distOpenRecords = distPhaseRecords.filter(c => c.status?.trim() === 'เปิดอยู่');
        const joinedCount = distOpenRecords.reduce((sum, c) => sum + (c.participate || 0), 0);
        const totalVillagesInDistrict = distPhaseRecords.reduce((sum, c) => sum + (c.village || 0), 0);

        return {
          id: engName.toLowerCase().replace(/\s+/g, '-'),
          name: engName,
          churches: distOpenRecords.length,
          villages: totalVillagesInDistrict,
          joined: joinedCount.toLocaleString(),
          baptized: "0",
          coordinates: [0, 0] as [number, number]
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
      villages: Math.floor(today.villages * 1.2),
      joined: Math.floor(parseInt(today.joined.replace(/,/g, ''), 10) * 1.2).toLocaleString(),
      baptized: "0",
      description: "Projected goal for gospel saturation.",
      bulletPoints: ["Targeting complete coverage", "Scaling training platforms"],
      districts: today.districts.map((d: DistrictStats) => ({
        ...d,
        churches: Math.floor(d.churches * 1.2),
        villages: Math.floor(d.villages * 1.2),
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
