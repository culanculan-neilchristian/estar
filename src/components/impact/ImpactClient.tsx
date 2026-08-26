'use client';

import React, { useState } from 'react';
import Hero from '@/components/home/Hero';
import ImpactTracker from '@/components/home/ImpactTracker';
import ExpectationsReality from '@/components/home/ExpectationsReality';
import ProvincesReached from '@/components/home/ProvincesReached';
import TransformedLives from '@/components/home/TransformedLives';
import ExponentialResults from '@/components/home/ExponentialResults';
import { TimelineStateData } from '@/data/dummyProvinceData';

import { TimelineDataPoint } from '@/components/home/ProvincesReached';

interface ImpactClientProps {
  stats: {
    totalChurches: number;
    totalProvinces: number;
    totalVillages: number;
    totalMembers: number;
    totalBaptized?: number;
    impactPercentage: number;
  };
  provinceStats: any[];
  allProvincesStats: Record<string, Record<number, TimelineStateData>>;
  timelineData?: TimelineDataPoint[];
}

export default function ImpactClient({ stats, provinceStats, allProvincesStats, timelineData }: ImpactClientProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>('Nakhon Sawan');

  // Lookup the timeline stats for the active province (default to Nakhon Sawan if not found)
  const activeStats = allProvincesStats[selectedProvince] || allProvincesStats['Nakhon Sawan'];

  return (
    <main className="flex flex-col w-full bg-white">
      <Hero 
        stats={stats} 
        provinceStats={provinceStats} 
        activeProvince={selectedProvince}
        onProvinceSelect={(name) => {
          // Switch the active province only if we have compiled tracker data for it
          if (allProvincesStats[name]) {
            setSelectedProvince(name);
          }
        }}
      />
      <ImpactTracker data={activeStats} provinceName={selectedProvince} />
      <ExpectationsReality actualData2024={activeStats[1]} provinceName={selectedProvince} />
      <ProvincesReached timelineData={timelineData} />
      <TransformedLives />
      <ExponentialResults data={activeStats[4]} provinceName={selectedProvince} />
    </main>
  );
}
