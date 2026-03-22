'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import CountUp from '../ui/CountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';

const ExponentialResults = () => {
    const { ref, isVisible } = useScrollReveal();
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const districts = [
        { id: "latyao", name: "Lat Yao", churches: 142, joined: "1,882", baptized: "1,357", coordinates: [0, 0] as [number, number] },
        { id: "takfa", name: "Tak Fa", churches: 119, joined: "1,633", baptized: "1,074", coordinates: [0, 0] as [number, number] },
        { id: "khaisali", name: "Khaisali", churches: 100, joined: "1,408", baptized: "860", coordinates: [0, 0] as [number, number] }
    ];

    const totals = [
        { icon: Church, value: "361", label: "CHURCHES" },
        { icon: Megaphone, value: "4,923", label: "MEMBERS" },
        { icon: UserRound, value: "3,291", label: "BELIEVERS" }
    ];

    return (
        <section ref={ref} className="bg-black py-24 border-t border-white/5 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left: Interactive Map Visualization */}
                    <div className="w-full lg:w-[50%]">
                        <div className={`relative aspect-[4/3] w-full reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}>
                            <div className="absolute inset-0">
                                <NakhonSawanSvgMap 
                                    activeStep={2}
                                    activeDistrict={selectedDistrict}
                                    onDistrictSelect={(name) => setSelectedDistrict(name === selectedDistrict ? null : name)}
                                    customDistrictsData={districts}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content & Stats */}
                    <div className="w-full lg:w-[50%]">
                        <div className="max-w-xl">
                            <h2 className={`heading-1 mb-8 text-white leading-[1.1] reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>Exponential Results Beyond</h2>
                            <div className="space-y-6 mb-12">
                                <p className={`paragraph text-lg reveal-on-scroll fade-up delay-100 ${isVisible ? 'is-visible' : ''}`}>
                                    What was funded to spark the planting of 311 churches has ignited a movement 
                                    far bigger than the sum of its parts. As these new communities multiply, 
                                    mentor one another, and spread through natural relationships, the impact 
                                    has accelerated well beyond our projections.
                                </p>
                                <p className={`paragraph font-bold text-white italic reveal-on-scroll fade-up delay-200 ${isVisible ? 'is-visible' : ''}`}>
                                    Your investment didn&apos;t just plant churches—it planted a multiplying movement.
                                </p>
                            </div>

                            {/* Totals Grid */}
                            <div className="grid grid-cols-3 gap-8">
                                {totals.map((stat, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex flex-col items-center reveal-on-scroll scale-in ${isVisible ? 'is-visible' : ''}`}
                                        style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-black shadow-xl">
                                            <stat.icon size={28} />
                                        </div>
                                        <span className="text-2xl font-black text-white">
                                            {isVisible ? (
                                                <CountUp end={parseFloat(stat.value.replace(/,/g, ''))} duration={1500} />
                                            ) : (
                                                "0"
                                            )}
                                        </span>
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ExponentialResults;
