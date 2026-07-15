'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import CountUp from '../ui/CountUp';
import { NAKHON_SAWAN_DUMMY_DATA } from '@/data/dummyProvinceData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';

import { TimelineStateData } from '@/data/dummyProvinceData';

interface ImpactTrackerProps {
    data?: Record<number, TimelineStateData>;
    provinceName?: string;
}

const ImpactTracker = ({ data, provinceName = 'Nakhon Sawan' }: ImpactTrackerProps) => {
    const { ref, isVisible } = useScrollReveal();
    const [activeStep, setActiveStep] = useState(2); // Default to "Today"
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);

    const timelineData = data || NAKHON_SAWAN_DUMMY_DATA;
    const currentState = timelineData[activeStep];
    
    // Find selected district data or provide fallback to province totals if none selected
    const selectedDistrict = currentState.districts.find(d => d.name === selectedDistrictName) || null;

    const displayData = {
        name: `${provinceName} Province`,
        churches: selectedDistrict ? selectedDistrict.churches : currentState.churches,
        villages: selectedDistrict ? selectedDistrict.villages : currentState.villages,
        joined: selectedDistrict ? selectedDistrict.joined : currentState.joined,
        isAggregated: !selectedDistrict
    };

    return (
        <section ref={ref} className="bg-white py-24 border-t border-[#023862]/10 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left: Timeline */}
                    <div className="w-full lg:w-[40%] text-[#023862]">
                        <div className={`mb-12 reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                            <h2 className="text-5xl font-semibold mb-6 text-[#023862] tracking-tighter">{provinceName}</h2>
                            <p className="paragraph max-w-2xl text-[#023862]/70 leading-relaxed italic">
                                &quot;{currentState.description}&quot;
                            </p>
                        </div>

                        <div className="relative pl-8 border-l border-[#7EB8E0] space-y-12">
                            {Object.entries(timelineData).map(([key, step], idx) => (
                                <div 
                                    key={key} 
                                    className={`relative transition-all duration-500 cursor-pointer reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''} ${idx === activeStep ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
                                    style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                                    onClick={() => {
                                        setActiveStep(idx);
                                        setSelectedDistrictName(null);
                                    }}
                                >
                                    <div className={`absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full border-2 z-10 transition-all duration-500
                                        ${idx === activeStep ? 'bg-[#023862] border-[#023862] scale-150 shadow-[0_0_12px_rgba(2,56,98,0.35)]' : 'bg-white border-[#023862]'}`} 
                                    />
                                    
                                    <h3 className="text-xl font-bold text-[#023862] mb-1 tracking-tight">{step.label}</h3>
                                    <p className="text-xs font-semibold text-[#023862]/50 mb-4 uppercase tracking-widest">{step.date}</p>
                                    
                                    {idx === activeStep && (
                                        <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-3 mt-4">
                                            {step.bulletPoints.map((point, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="w-1 h-1 bg-[#023862]/40 mt-2 shrink-0" />
                                                    <p className="text-sm font-medium text-[#023862]/70 leading-relaxed text-left max-w-md">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Interactive SVG Map */}
                    <div className="w-full lg:w-[60%] flex flex-col justify-center gap-12">
                        <div className={`relative w-full aspect-[4/3] group reveal-on-scroll scale-in delay-300 [&_.map-hint_span]:!text-[#023862]/40 [&_.map-hint_.rounded-full]:!bg-[#023862]/40 ${isVisible ? 'is-visible' : ''}`}>
                            <NakhonSawanSvgMap 
                                activeStep={activeStep}
                                activeDistrict={selectedDistrictName}
                                onDistrictSelect={(name) => setSelectedDistrictName(name === selectedDistrictName ? null : name)}
                                customDistrictsData={currentState.districts}
                                activeProvince={provinceName}
                            />
                        </div>

                        {/* Summary Stats Overview (Updates based on selection) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                            {[
                                { icon: Church, label: "CHURCHES PLANTED", value: displayData.churches },
                                { icon: Megaphone, label: "VILLAGES REACHED", value: displayData.villages },
                                { icon: UserRound, label: "BAPTIZED MEMBERS", value: displayData.joined }
                            ].map((stat, i) => (
                                <div key={i} className={`flex flex-col items-center text-center group cursor-default reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${500 + (i * 100)}ms` }}>
                                    <div className="w-24 h-24 rounded-full bg-[#4592C8] flex items-center justify-center mb-6 transition-all duration-500 shadow-lg shadow-[#4592C8]/25 group-hover:scale-105">
                                        <stat.icon className="w-12 h-12 text-white transition-transform duration-500 group-hover:rotate-12" />
                                    </div>
                                    <span className="text-3xl font-semibold text-[#023862] mb-2 tracking-tighter">
                                        {isVisible ? (
                                            <CountUp end={parseFloat(stat.value.toString().replace(/,/g, ''))} duration={1500} />
                                        ) : (
                                            "0"
                                        )}
                                    </span>
                                    <span className="text-[10px] font-semibold text-[#023862]/70 uppercase tracking-[0.2em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ImpactTracker;
