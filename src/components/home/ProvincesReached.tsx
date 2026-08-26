'use client';

import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import ThailandSvgMap from './ThailandSvgMap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface TimelineDataPoint {
    id: number;
    label: string;
    provinces: string[];
}

interface ProvincesReachedProps {
    timelineData?: TimelineDataPoint[];
}

const DEFAULT_TIMELINE_DATA: TimelineDataPoint[] = [
    { id: 2021, label: '2021', provinces: ['Bangkok'] },
    { id: 2022, label: '2022', provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket'] },
    { id: 2023, label: '2023', provinces: ['Bangkok', 'Samut Prakan', 'Nonthaburi', 'Chiang Mai', 'Phuket', 'Chon Buri', 'Nakhon Ratchasima', 'Songkhla', 'Khon Kaen'] },
];

const ProvincesReached = ({ timelineData = DEFAULT_TIMELINE_DATA }: ProvincesReachedProps) => {
    const { ref, isVisible } = useScrollReveal();
    const dataToUse = timelineData && timelineData.length > 0 ? timelineData : DEFAULT_TIMELINE_DATA;
    
    // Default selected id is the maximum id in the data (most recent)
    const [selectedId, setSelectedId] = useState<number>(() => {
        return Math.max(...dataToUse.map(d => d.id));
    });

    const activeData = dataToUse.find(d => d.id === selectedId) || dataToUse[0];

    return (
        <section
            ref={ref}
            className="relative py-24 border-t border-white/5 overflow-hidden"
            style={{ background: 'linear-gradient(to bottom right, #0F172A, #172554, #0F172A)' }}
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <Container className="relative z-10">
                <div className={`text-center mb-20 max-w-4xl mx-auto reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="heading-1 mb-6 text-4xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
                        PROVINCES REACHED
                    </h2>
                    <p className="paragraph text-lg leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Track our journey as we expand across Thailand, planting churches and reaching new communities year by year.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Map */}
                    <div className={`flex-1 w-full max-w-md mx-auto reveal-on-scroll scale-in delay-200 ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative aspect-[3/4] w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
                            {/* Inner glow for the map container */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <ThailandSvgMap 
                                highlightedProvinces={activeData.provinces}
                                isInteractive={false}
                            />
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className={`flex-1 w-full max-w-lg mx-auto reveal-on-scroll fade-left delay-400 ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative pl-14 space-y-8 py-4">
                            {/* Vertical Line with Gradient */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full -translate-x-1/2" />
                            
                            {dataToUse.map((data) => {
                                const isActive = selectedId === data.id;
                                const isPast = data.id < selectedId;
                                
                                return (
                                    <div 
                                        key={data.id}
                                        className="relative cursor-pointer group outline-none"
                                        onClick={() => setSelectedId(data.id)}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-500 z-20"
                                             style={{
                                                 width: isActive ? '1.5rem' : isPast ? '1rem' : '0.75rem',
                                                 height: isActive ? '1.5rem' : isPast ? '1rem' : '0.75rem',
                                                 backgroundColor: isActive ? '#ffffff' : isPast ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                                                 border: isActive ? '4px solid #3b82f6' : isPast ? '2px solid transparent' : '2px solid rgba(255,255,255,0.1)',
                                                 transform: isActive ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%)',
                                                 boxShadow: isActive ? '0 0 15px rgba(59,130,246,0.5)' : 'none'
                                             }}
                                        />
                                        
                                        {/* Content Box */}
                                        <div className={`transition-all duration-300 rounded-2xl p-6 ${isActive ? 'scale-[1.02] origin-left translate-x-2' : 'hover:translate-x-1'}`}
                                             style={{
                                                 backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                                                 backdropFilter: isActive ? 'blur(12px)' : 'none',
                                                 border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
                                                 boxShadow: isActive ? '0 8px 30px rgba(0,0,0,0.1)' : 'none',
                                                 opacity: isActive ? 1 : 0.6
                                             }}
                                        >
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className={`font-black transition-all duration-300 ${isActive ? 'text-4xl tracking-tight' : 'text-2xl font-bold'}`}
                                                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)', lineHeight: 1 }}>
                                                    {data.label}
                                                </h3>
                                                {isActive && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest rounded-full inline-flex items-center justify-center"
                                                          style={{ 
                                                              color: '#ffffff', 
                                                              backgroundColor: 'rgba(255,255,255,0.15)', 
                                                              border: '1px solid rgba(255,255,255,0.2)',
                                                              padding: '4px 10px 2px 10px', // Nudge text downward inside the pill
                                                              transform: 'translateY(2px)' // Nudge the whole pill down slightly to align with text center
                                                          }}>
                                                        Active View
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 transition-all duration-300">
                                                <div className="h-0.5 rounded-full transition-all duration-300" 
                                                     style={{ width: isActive ? '3rem' : '1.5rem', backgroundColor: isActive ? '#60a5fa' : 'rgba(255,255,255,0.2)' }} />
                                                <p className="text-lg font-medium tracking-wide" style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
                                                    {data.provinces.length} <span className="font-light">Provinces Reached</span>
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
