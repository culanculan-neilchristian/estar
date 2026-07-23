'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import whatIfBanner from '@/assets/images/what-if-banner.jpg';
import starBanner from '@/assets/images/star-banner.jpg';
import mapContainer from '@/assets/images/thai-map1.png';

export default function HomeDonationImpact() {
  const [amount, setAmount] = useState<number>(1000);

  // Dummy calculation logic based on $1000 = 1 village church
  const churchesPlanted = Math.floor(amount / 1000);
  const peopleReached = churchesPlanted * 40; // rough estimate
  const villagesReached = churchesPlanted;

  return (
    <>
    <section className="relative w-full py-20 text-white overflow-hidden bg-[#091f3a]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay opacity-50"
        style={{ backgroundImage: `url(${whatIfBanner.src})` }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Copy and Slider */}
        <div className="flex flex-col lg:col-span-1">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            What if you <br className="hidden md:block"/> donate today?
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-10 max-w-md">
            Every $1,000 helps plant one village church in an unreached part of Thailand — led by local believers, trained and equipped to disciple their neighbors. Your gift could bring the Gospel to a place where it has never been heard, and never before reached.
          </p>
          <p className="text-white/80 text-base leading-relaxed mb-10 max-w-md">
            Use the slider to explore how your generosity today could shape the next 5 years of Gospel advance.
          </p>

          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              <span>How much are you giving?</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">$</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-transparent text-3xl md:text-4xl font-bold outline-none border-b border-white/20 pb-1 w-full"
              />
            </div>
            <input 
              type="range" 
              min="1000" 
              max="1000000" 
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2274b4]"
            />
          </div>
        </div>

        {/* Middle Side: Map */}
        <div className="flex items-center justify-center lg:col-span-1 order-first lg:order-none mb-10 lg:mb-0">
           <img src={mapContainer.src} alt="Map of Thailand" className="w-full h-auto max-h-[550px] object-contain drop-shadow-xl" />
        </div>

        {/* Right Side: Stats */}
        <div className="flex flex-col items-center lg:col-span-1">
          
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold mb-1">5 Years From Now</h3>
            <p className="text-sm text-white/60">Estimated Impact of Your Donation</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 text-[#2274b4]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <span className="text-3xl font-bold">{churchesPlanted.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Churches Planted</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 text-[#2274b4]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <span className="text-3xl font-bold">{peopleReached.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">People Reached</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 text-[#2274b4]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span className="text-3xl font-bold">{villagesReached.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Villages Reached</span>
            </div>
          </div>
        </div>

      </div>
    </section>
    
    <div className="w-full bg-white">
      <img src={starBanner.src} alt="Star decorative divider" className="w-full h-auto object-cover max-h-[300px]" />
    </div>
    </>
  );
}
