import HomeClient from '@/components/home/HomeClient';
import { CsvDataService } from '@/services/csv-data-service';
import { DistrictStats } from '@/data/dummyProvinceData';
import { normalizeProvince, getThaiProvinceName } from '@/utils/province-utils';

import { PROVINCE_SVG_MAPS } from '@/data/provinceDistrictPaths';

const OPEN_STATUS = '\u0e40\u0e1b\u0e34\u0e14\u0e2d\u0e22\u0e39\u0e48';

export default async function Home() {
  const churches = await CsvDataService.getAllChurches();
  const dynamicProvinces = Object.keys(PROVINCE_SVG_MAPS);
  const allProvincesStats: Record<string, Record<number, any>> = {};
  for (const prov of dynamicProvinces) {
    allProvincesStats[prov] = await CsvDataService.getImpactTrackerStats(getThaiProvinceName(prov));
  }

  // Calculate Global Stats
  const openChurches = churches.filter(c => c.status?.trim() === OPEN_STATUS);
  const totalChurches = openChurches.length;
  // Cumulative Footprint (All provinces/villages ever reached)
  const totalProvincesCount = [...new Set(churches.map(c => c.province?.trim()).filter(Boolean))].length;

  const totalVillagesCount = churches.reduce((sum, c) => sum + (c.village || 0), 0);
  const totalMembers = openChurches.reduce((sum, c) => sum + (c.participate || 0), 0);

  // Impact percentage based on the 84k villages mentioned in the text
  const impactPercentage = totalVillagesCount > 0 ? (totalVillagesCount / 84000) * 100 : 0;

  const stats = {
    totalChurches,
    totalProvinces: totalProvincesCount,
    totalVillages: totalVillagesCount,
    totalMembers,
    impactPercentage,
  };

  interface ProvinceAccumulator {
    name: string;
    churches: number;
    villages: number;
    joined: number;
    baptized: number;
    id: string;
    coordinates: [number, number];
  }

  // Group stats by province for the interactive map
  const provinceStatsMap = churches.reduce((acc, church) => {
    const rawProvince = church.province?.trim();
    if (!rawProvince) return acc;
    const provinceName = normalizeProvince(rawProvince);

    if (!acc[provinceName]) {
      acc[provinceName] = {
        name: provinceName,
        churches: 0,
        villages: 0,
        joined: 0,
        baptized: 0,
        id: provinceName.toLowerCase().replace(/\s+/g, '-'),
        coordinates: [0, 0] as [number, number],
      };
    }

    if (church.status?.trim() === OPEN_STATUS) {
      acc[provinceName].churches += 1;
      acc[provinceName].joined += (church.participate || 0);
    }

    acc[provinceName].villages += (church.village || 0);

    return acc;
  }, {} as Record<string, ProvinceAccumulator>);

  // Convert map to array of objects compatible with DistrictStats interface
  const provinceStats: DistrictStats[] = Object.values(provinceStatsMap).map(p => ({
    ...p,
    villages: p.villages,
    joined: p.joined.toLocaleString(),
    baptized: '0',
  }));

  return (
    <HomeClient
      stats={stats}
      provinceStats={provinceStats}
      allProvincesStats={allProvincesStats}
    />
  );
}
