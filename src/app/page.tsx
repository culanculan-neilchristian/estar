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
  
  // Calculate Global Stats
  const totalChurches = churches.length;
  const totalProvincesCount = [...new Set(churches.map(c => c.province))].length;
  const totalMembers = churches.reduce((sum, c) => sum + (c.participate || 0), 0);
  
  // Impact percentage based on the 84k villages mentioned in the text
  const impactPercentage = (totalChurches / 84000) * 100;

  const stats = {
    totalChurches,
    totalProvinces: totalProvincesCount,
    totalMembers,
    impactPercentage
  };

  interface ProvinceAccumulator {
    name: string;
    churches: number;
    joined: number;
    baptized: number;
    id: string;
    coordinates: [number, number];
  }

  // Group stats by province for the interactive map
  const provinceStatsMap = churches.reduce((acc, church) => {
    const rawProvince = church.province.trim();
    // Map Thai province name to English name used in SVG data
    const provinceName = PROVINCE_MAPPING[rawProvince] || rawProvince;
    
    if (!acc[provinceName]) {
      acc[provinceName] = {
        name: provinceName,
        churches: 0,
        joined: 0, // Numeric for accumulation, will convert to string at the end
        baptized: 0,
        id: provinceName.toLowerCase().replace(/\s+/g, '-'),
        coordinates: [0, 0] as [number, number]
      };
    }
    acc[provinceName].churches += 1;
    acc[provinceName].joined += (church.participate || 0);
    return acc;
  }, {} as Record<string, ProvinceAccumulator>);

  // Convert map to array of objects compatible with DistrictStats interface
  const provinceStats: DistrictStats[] = Object.values(provinceStatsMap).map(p => ({
    ...p,
    joined: p.joined.toLocaleString(), // Formatting for display
    baptized: "0" // Placeholder for now
  }));

  return (
    <main className="flex flex-col w-full">
      <Hero stats={stats} provinceStats={provinceStats} />
      <ImpactTracker />
      <ExpectationsReality />
      <TransformedLives />
      <ExponentialResults />
    </main>
  );
}
