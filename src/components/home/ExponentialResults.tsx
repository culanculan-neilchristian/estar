'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import CountUp from '../ui/CountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';
import { TimelineStateData } from '@/data/dummyProvinceData';

interface ExponentialResultsProps {
    data?: TimelineStateData;
    provinceName?: string;
}

const ExponentialResults = ({ data, provinceName = 'Nakhon Sawan' }: ExponentialResultsProps) => {
    const { ref, isVisible } = useScrollReveal();
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const timelineData = data;
    const districts = timelineData?.districts || [];

    const totals = [
        { icon: Church, value: timelineData?.churches.toString() || "0", label: "CHURCHES" },
        { icon: Megaphone, value: timelineData?.villages.toString() || "0", label: "VILLAGES" },
        { icon: UserRound, value: timelineData?.joined || "0", label: "MEMBERS" }
    ];

    return (
        <section ref={ref} className="bg-white py-24 border-t border-[#023862]/10 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left: Interactive Map Visualization */}
                    <div className="w-full lg:w-[50%]">
                        <div className={`relative aspect-[4/3] w-full reveal-on-scroll scale-in [&_.map-hint_span]:!text-[#023862]/40 [&_.map-hint_.rounded-full]:!bg-[#023862]/40 ${isVisible ? 'is-visible' : ''}`}>
                            <div className="absolute inset-0">
                                <NakhonSawanSvgMap 
                                    activeStep={2}
                                    activeDistrict={selectedDistrict}
                                    onDistrictSelect={(name) => setSelectedDistrict(name === selectedDistrict ? null : name)}
                                    customDistrictsData={districts}
                                    activeProvince={provinceName}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content & Stats */}
                    <div className="w-full lg:w-[50%]">
                        <div className="max-w-xl">
                            <h2 className={`heading-1 mb-8 text-[#023862] leading-[1.1] reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>Exponential Results Beyond</h2>
                            <div className="space-y-6 mb-12">
                                <p className={`paragraph text-lg text-[#023862]/70 reveal-on-scroll fade-up delay-100 ${isVisible ? 'is-visible' : ''}`}>
                                    {provinceName === 'Nakhon Sawan' ? (
                                        "What was funded to spark the planting of 311 churches has ignited a movement far bigger than the sum of its parts."
                                    ) : (
                                        `What was funded to spark the planting of churches in ${provinceName} has ignited a movement far bigger than the sum of its parts.`
                                    )}
                                    {" "}As these new communities multiply, mentor one another, and spread through natural relationships, the impact has accelerated well beyond our projections.
                                </p>
                                <p className={`paragraph font-bold text-[#023862] italic reveal-on-scroll fade-up delay-200 ${isVisible ? 'is-visible' : ''}`}>
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
                                        <div className="w-16 h-16 bg-[#4592C8] rounded-full flex items-center justify-center mb-4 text-white shadow-lg shadow-[#4592C8]/25">
                                            <stat.icon size={28} />
                                        </div>
                                        <span className="text-2xl font-semibold text-[#023862]">
                                            {isVisible ? (
                                                <CountUp end={parseFloat(stat.value.replace(/,/g, ''))} duration={1500} />
                                            ) : (
                                                "0"
                                            )}
                                        </span>
                                        <span className="text-[9px] font-semibold text-[#023862]/70 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
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
