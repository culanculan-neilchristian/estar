'use client';

import React, { useState } from 'react';
import HomeHero from '@/components/home/HomeHero';
import HomeIntro from '@/components/home/HomeIntro';
import HomeDonationImpact from '@/components/home/HomeDonationImpact';
import HomeMovement from '@/components/home/HomeMovement';
import HomeStories from '@/components/home/HomeStories';
import HomeRoadmap from '@/components/home/HomeRoadmap';
import HomeCta from '@/components/home/HomeCta';
import { TimelineStateData } from '@/data/dummyProvinceData';

interface HomeClientProps {
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
}

export default function HomeClient({ stats, provinceStats, allProvincesStats }: HomeClientProps) {
  // We keep the state in case we want to re-integrate province specific stats later
  const [selectedProvince, setSelectedProvince] = useState<string>('Nakhon Sawan');

  return (
    <main className="flex flex-col w-full bg-white">
      <HomeHero />
      <HomeIntro />
      <HomeDonationImpact />
      <HomeMovement stats={stats} provinceStats={provinceStats} />
      <HomeStories />
      <HomeRoadmap />
      <HomeCta />
    </main>
  );
}
