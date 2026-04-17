import Hero from '@/components/home/Hero';
import ImpactTracker from '@/components/home/ImpactTracker';
import ExpectationsReality from '@/components/home/ExpectationsReality';
import TransformedLives from '@/components/home/TransformedLives';
import ExponentialResults from '@/components/home/ExponentialResults';
import { CsvDataService } from '@/services/csv-data-service';
import { DistrictStats } from '@/data/dummyProvinceData';
import { PROVINCE_MAPPING } from '@/data/provinceMapping';

export default async function Home() {
  const churches = await CsvDataService.getAllChurches();
  const nakhonSawanStats = await CsvDataService.getImpactTrackerStats("นครสวรรค์");
  
  // Calculate Global Stats
  const openChurches = churches.filter(c => c.status?.trim() === 'เปิดอยู่');
  const totalChurches = openChurches.length;
  // Cumulative Footprint (All provinces/villages ever reached)
  const totalProvincesCount = [...new Set(churches.map(c => c.province?.trim()).filter(Boolean))].length;
  
  const uniqueVillagesCumulative = new Set(
    churches.map(c => `${c.province?.trim()}|${c.amphoe?.trim()}|${c.tambon?.trim()}|${c.village?.trim() || 'unnamed'}`)
  );
  const totalVillagesCount = uniqueVillagesCumulative.size;
  const totalMembers = openChurches.reduce((sum, c) => sum + (c.participate || 0), 0);
  
  // Impact percentage based on the 84k villages mentioned in the text
  const impactPercentage = totalVillagesCount > 0 ? (totalVillagesCount / 84000) * 100 : 0;

  const stats = {
    totalChurches,
    totalProvinces: totalProvincesCount,
    totalVillages: totalVillagesCount,
    totalMembers,
    impactPercentage
  };

  interface ProvinceAccumulator {
    name: string;
    churches: number;
    villages: Set<string>;
    joined: number;
    baptized: number;
    id: string;
    coordinates: [number, number];
  }

  // Group stats by province for the interactive map
  const provinceStatsMap = churches.reduce((acc, church) => {
    const rawProvince = church.province?.trim();
    if (!rawProvince) return acc;

    // Map Thai province name to English name used in SVG data
    const provinceName = PROVINCE_MAPPING[rawProvince] || rawProvince;
    
    if (!acc[provinceName]) {
      acc[provinceName] = {
        name: provinceName,
        churches: 0,
        villages: new Set<string>(),
        joined: 0, 
        baptized: 0,
        id: provinceName.toLowerCase().replace(/\s+/g, '-'),
        coordinates: [0, 0] as [number, number]
      };
    }

    if (church.status?.trim() === 'เปิดอยู่') {
      acc[provinceName].churches += 1;
      acc[provinceName].joined += (church.participate || 0);
    }

    // Villages reached are cumulative (including surveyed/closed)
    const villageKey = `${church.province?.trim()}|${church.amphoe?.trim()}|${church.tambon?.trim()}|${church.village?.trim() || 'unnamed'}`;
    acc[provinceName].villages.add(villageKey);
    
    return acc;
  }, {} as Record<string, ProvinceAccumulator>);

  // Convert map to array of objects compatible with DistrictStats interface
  const provinceStats: DistrictStats[] = Object.values(provinceStatsMap).map(p => ({
    ...p,
    villages: p.villages.size,
    joined: p.joined.toLocaleString(), // Formatting for display
    baptized: "0"
  }));

  return (
    <main className="flex flex-col w-full">
      <Hero stats={stats} provinceStats={provinceStats} />
      <ImpactTracker data={nakhonSawanStats} />
      <ExpectationsReality actualData2024={nakhonSawanStats[1]} />
      <TransformedLives />
      <ExponentialResults data={nakhonSawanStats[4]} />
    </main>
  );
}
