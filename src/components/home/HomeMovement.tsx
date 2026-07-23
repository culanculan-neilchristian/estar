'use client';

import React from 'react';
import Link from 'next/link';
import thailandMap from '@/assets/images/thai-map1.png';

interface StatsProps {
  stats: {
    totalChurches: number;
    totalProvinces: number;
    totalVillages: number;
    totalMembers: number;
    impactPercentage: number;
  };
  provinceStats: any[];
}

export default function HomeMovement({ stats, provinceStats }: StatsProps) {
  return (
    <section className="w-full py-20 bg-white" id="impact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Stats and Copy */}
        <div className="flex flex-col">
          <h2 className="section-title text-left !text-[#2274b4]">
            The Movement <br/> Across Thailand
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Since 2017, eStar has been helping Thai churches plant new congregations in unreached villages across the country — using data, strategy, and Spirit-led obedience to guide the Church where it's needed most. Every shaded province represents lives transformed, churches planted, and ground taken for the Gospel.
          </p>

          <div className="flex flex-wrap gap-10 mb-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#2274b4]/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-[#2274b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <span className="text-2xl font-bold text-[#2274b4]">{stats.totalChurches.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Churches Planted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#2274b4]/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-[#2274b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <span className="text-2xl font-bold text-[#2274b4]">{stats.totalMembers.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Souls Saved</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#2274b4]/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-[#2274b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span className="text-2xl font-bold text-[#2274b4]">{stats.totalVillages.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Villages Reached</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#impact" className="btn-primary">
              Want to see your impact?
            </Link>
            <Link href="/map" className="rounded-[4px] bg-[#1e2a4a] hover:bg-[#151f38] px-6 py-3 text-sm font-semibold text-white transition-colors text-center inline-block">
              Explore the Map
            </Link>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <img src={thailandMap.src} alt="Movement across Thailand map" className="w-full h-full object-contain" />
        </div>

      </div>
    </section>
  );
}
