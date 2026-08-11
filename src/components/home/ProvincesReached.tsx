'use client';

import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import ThailandSvgMap from './ThailandSvgMap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TIMELINE_DATA = [
    { year: 2021, provinces: ['Bangkok'] },
    { year: 2022, provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket'] },
    { year: 2023, provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket', 'Chon Buri', 'Nakhon Ratchasima', 'Songkhla', 'Khon Kaen'] },
    { year: 2024, provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket', 'Chon Buri', 'Nakhon Ratchasima', 'Songkhla', 'Khon Kaen', 'Udon Thani', 'Surat Thani', 'Phra Nakhon Si Ayutthaya', 'Ubon Ratchathani', 'Chiang Rai', 'Rayong', 'Nakhon Sawan'] },
    { year: 2025, provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket', 'Chon Buri', 'Nakhon Ratchasima', 'Songkhla', 'Khon Kaen', 'Udon Thani', 'Surat Thani', 'Phra Nakhon Si Ayutthaya', 'Ubon Ratchathani', 'Chiang Rai', 'Rayong', 'Nakhon Sawan', 'Buri Ram', 'Surin', 'Si Sa Ket', 'Chaiyaphum', 'Chanthaburi', 'Trat', 'Prachin Buri', 'Nakhon Nayok', 'Sa Kaeo', 'Lop Buri', 'Nakhon Si Thammarat'] },
    { year: 2026, provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket', 'Chon Buri', 'Nakhon Ratchasima', 'Songkhla', 'Khon Kaen', 'Udon Thani', 'Surat Thani', 'Phra Nakhon Si Ayutthaya', 'Ubon Ratchathani', 'Chiang Rai', 'Rayong', 'Nakhon Sawan', 'Buri Ram', 'Surin', 'Si Sa Ket', 'Chaiyaphum', 'Chanthaburi', 'Trat', 'Prachin Buri', 'Nakhon Nayok', 'Sa Kaeo', 'Lop Buri', 'Nakhon Si Thammarat', 'Nong Bua Lam Phu', 'Bueng Kan', 'Amnat Charoen', 'Yasothon', 'Chai Nat', 'Saraburi', 'Ang Thong', 'Sing Buri', 'Phitsanulok', 'Kamphaeng Phet', 'Tak', 'Krabi', 'Trang'] },
];

const ProvincesReached = () => {
    const { ref, isVisible } = useScrollReveal();
    const [selectedYear, setSelectedYear] = useState<number>(2021);

    const activeData = TIMELINE_DATA.find(d => d.year === selectedYear) || TIMELINE_DATA[0];

    return (
        <section
            ref={ref}
            className="relative py-20 border-t border-white/10 overflow-hidden bg-[#3584C7]"
        >
            <Container className="relative z-10">
                <div className={`text-center mb-16 max-w-4xl mx-auto reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="heading-1 mb-6 text-white text-3xl font-bold tracking-tight">PROVINCES REACHED</h2>
                    <p className="paragraph text-white text-lg leading-relaxed">
                        Track our journey as we expand across Thailand, reaching new provinces each year.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left: Map */}
                    <div className={`flex-1 w-full max-w-md mx-auto reveal-on-scroll scale-in delay-200 ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative aspect-[3/4] w-full bg-white/5 rounded-[32px] p-6 border border-white/10">
                            <ThailandSvgMap 
                                highlightedProvinces={activeData.provinces}
                                isInteractive={false}
                            />
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className={`flex-1 w-full max-w-lg mx-auto reveal-on-scroll fade-left delay-400 ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative pl-12 space-y-6 py-4">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-white/10 rounded-full -translate-x-1/2" />
                            
                            {TIMELINE_DATA.map((data) => {
                                const isActive = selectedYear === data.year;
                                const isPast = data.year < selectedYear;
                                
                                return (
                                    <div 
                                        key={data.year}
                                        className="relative cursor-pointer group outline-none"
                                        onClick={() => setSelectedYear(data.year)}
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-500 shadow-xl
                                            ${isActive 
                                                ? 'w-6 h-6 bg-white border-4 border-[#3584C7] scale-110 ring-4 ring-white/30 z-20' 
                                                : isPast
                                                    ? 'w-4 h-4 bg-white/80 border-2 border-[#3584C7] z-10'
                                                    : 'w-3 h-3 bg-white/30 border-2 border-white/10 group-hover:bg-white/60 group-hover:scale-125 z-0'
                                            }`} 
                                        />
                                        
                                        {/* Content Box */}
                                        <div className={`transition-all duration-500 rounded-[24px] p-6
                                            ${isActive 
                                                ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl scale-[1.02] origin-left translate-x-2' 
                                                : 'bg-transparent border border-transparent hover:bg-white/5 opacity-60 hover:opacity-100 hover:translate-x-1'
                                            }`}
                                        >
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <h3 className={`font-bold transition-all duration-500 ${isActive ? 'text-5xl text-white tracking-tight' : 'text-3xl text-white/80'}`}>
                                                    {data.year}
                                                </h3>
                                                {isActive && (
                                                    <span className="text-xs font-bold text-white/80 uppercase tracking-[0.2em] animate-fade-in bg-white/10 py-1 px-3 rounded-full">
                                                        Active Map
                                                    </span>
                                                )}
                                            </div>
                                            <div className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'text-white' : 'text-white/60'}`}>
                                                <div className={`h-[2px] rounded-full transition-all duration-500 ${isActive ? 'w-12 bg-white/50' : 'w-6 bg-white/20'}`} />
                                                <p className={`text-lg font-medium tracking-wide`}>
                                                    {data.provinces.length} Provinces Reached
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProvincesReached;
