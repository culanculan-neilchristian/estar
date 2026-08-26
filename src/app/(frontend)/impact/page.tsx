import ImpactClient from '@/components/impact/ImpactClient';
import { BigQueryDataService } from '@/services/bigquery-data-service';
import { DistrictStats } from '@/data/dummyProvinceData';
import { normalizeProvince, getThaiProvinceName } from '@/utils/province-utils';
import { PROVINCE_SVG_MAPS } from '@/data/provinceDistrictPaths';

const OPEN_STATUS = '\u0e40\u0e1b\u0e34\u0e14\u0e2d\u0e22\u0e39\u0e48';

export const dynamic = 'force-dynamic';

export default async function ImpactPage() {
  const churches = await BigQueryDataService.getAllChurches();
  const dynamicProvinces = Object.keys(PROVINCE_SVG_MAPS);
  const allProvincesStats: Record<string, Record<number, any>> = {};
  for (const prov of dynamicProvinces) {
    allProvincesStats[prov] = await BigQueryDataService.getImpactTrackerStats(getThaiProvinceName(prov));
  }

  // Calculate Global Stats
  const globalBelievers = await BigQueryDataService.getGlobalBelieverStats();
  const provinceBelievers = await BigQueryDataService.getProvinceBelieverStats();

  const openChurches = churches.filter(c => c.status?.trim() === OPEN_STATUS);
  const totalChurches = openChurches.length;
  // Cumulative Footprint (All provinces/villages ever reached)
  const totalProvincesCount = [...new Set(churches.map(c => c.province?.trim()).filter(Boolean))].length;

  const totalVillagesCount = churches.reduce((sum, c) => sum + (c.village || 0), 0);
  const totalResponders = globalBelievers.joined;
  const totalBaptized = globalBelievers.baptized;

  // Impact percentage based on the 84k villages mentioned in the text
  const impactPercentage = totalVillagesCount > 0 ? (totalVillagesCount / 84000) * 100 : 0;

  const stats = {
    totalChurches,
    totalProvinces: totalProvincesCount,
    totalVillages: totalVillagesCount,
    totalMembers: totalResponders,
    totalResponders,
    totalBaptized,
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
    }

    acc[provinceName].villages += (church.village || 0);

    return acc;
  }, {} as Record<string, ProvinceAccumulator>);

  // Convert map to array of objects compatible with DistrictStats interface
  const provinceStats: DistrictStats[] = Object.values(provinceStatsMap).map(p => {
    const pBelievers = provinceBelievers[p.name] || { joined: 0, baptized: 0 };
    return {
      ...p,
      villages: p.villages,
      joined: pBelievers.joined.toLocaleString(),
      baptized: pBelievers.baptized.toLocaleString(),
    };
  });

  // Calculate dynamic timeline data for ProvincesReached
  const provinceFirstYear: Record<string, number> = {};
  for (const c of openChurches) {
    const rawProv = c.province?.trim();
    if (!rawProv) continue;
    const provName = normalizeProvince(rawProv);
    const year = parseInt(c.yearBegan || '9999', 10);
    if (year > 2000 && year < 2100) {
      if (!provinceFirstYear[provName] || year < provinceFirstYear[provName]) {
        provinceFirstYear[provName] = year;
      }
    }
  }
  
  const currentYear = new Date().getFullYear();
  const timelineData = [];
  
  // We want exactly 6 items. So the last 5 years are individual, and everything before is grouped.
  const individualYearsCount = 5;
  const cutoffYear = currentYear - individualYearsCount; // e.g., 2026 - 5 = 2021

  // 1. Grouped Node: "Up to {cutoffYear}"
  const reachedUpToCutoff = Object.entries(provinceFirstYear)
    .filter(([_, firstYear]) => firstYear <= cutoffYear)
    .map(([name]) => name);
    
  if (reachedUpToCutoff.length > 0) {
    timelineData.push({
      id: cutoffYear,
      label: `Up to ${cutoffYear}`,
      provinces: reachedUpToCutoff
    });
  }
  
  // 2. Individual Nodes for the last 5 years
  for (let year = cutoffYear + 1; year <= currentYear; year++) {
    const reachedSoFar = Object.entries(provinceFirstYear)
      .filter(([_, firstYear]) => firstYear <= year)
      .map(([name]) => name);
      
    if (reachedSoFar.length > 0) {
      timelineData.push({
        id: year,
        label: year.toString(),
        provinces: reachedSoFar
      });
    }
  }
  
  if (timelineData.length === 0) {
    timelineData.push({ id: currentYear, label: currentYear.toString(), provinces: [] });
  }

  return (
    <ImpactClient
      stats={stats}
      provinceStats={provinceStats}
      allProvincesStats={allProvincesStats}
      timelineData={timelineData}
    />
  );
}
