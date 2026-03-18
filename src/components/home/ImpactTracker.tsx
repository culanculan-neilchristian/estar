'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import { NAKHON_SAWAN_DUMMY_DATA } from '@/data/dummyProvinceData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';

const ImpactTracker = () => {
    const { ref, isVisible } = useScrollReveal();
    const [activeStep, setActiveStep] = useState(2); // Default to "Today"
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);

    const currentState = NAKHON_SAWAN_DUMMY_DATA[activeStep];
    
    // Find selected district data or provide fallback to province totals if none selected
    const selectedDistrict = currentState.districts.find(d => d.name === selectedDistrictName) || null;

    const displayData = selectedDistrict ? {
        name: selectedDistrict.name,
        churches: selectedDistrict.churches,
        joined: selectedDistrict.joined,
        baptized: selectedDistrict.baptized,
        isAggregated: false
    } : {
        name: "Nakhon Sawan Province",
        churches: currentState.churches,
        joined: currentState.joined,
        baptized: currentState.baptized,
        isAggregated: true
    };

    return (
        <section ref={ref} className="bg-black py-24 border-t border-white/5 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left: Timeline */}
                    <div className="w-full lg:w-5/12">
                        <div className={`mb-12 reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                            <h2 className="text-5xl font-black mb-6 text-white tracking-tighter">Nakhon Sawan</h2>
                            <p className="paragraph max-w-2xl text-white/50 leading-relaxed italic">
                                &quot;{currentState.description}&quot;
                            </p>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 space-y-12">
                            {Object.entries(NAKHON_SAWAN_DUMMY_DATA).map(([key, step], idx) => (
                                <div 
                                    key={key} 
                                    className={`relative transition-all duration-500 cursor-pointer reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''} ${idx === activeStep ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
                                    style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                                    onClick={() => {
                                        setActiveStep(idx);
                                        setSelectedDistrictName(null);
                                    }}
                                >
                                    <div className={`absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full border-2 bg-black z-10 transition-all duration-500
                                        ${idx === activeStep ? 'border-white scale-150 shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'border-white/30'}`} 
                                    />
                                    
                                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{step.label}</h3>
                                    <p className="text-xs font-semibold text-white/30 mb-4 uppercase tracking-widest">{step.date}</p>
                                    
                                    {idx === activeStep && (
                                        <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-3 mt-4">
                                            {step.bulletPoints.map((point, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="w-1 h-1 bg-white/40 mt-2 shrink-0" />
                                                    <p className="text-sm font-medium text-white/60 leading-relaxed text-left max-w-md">
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
                    <div className="w-full lg:w-7/12 flex flex-col justify-center gap-12">
                        <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 group reveal-on-scroll scale-in delay-300 ${isVisible ? 'is-visible' : ''}`}>
                            <NakhonSawanSvgMap 
                                activeStep={activeStep}
                                activeDistrict={selectedDistrictName}
                                onDistrictSelect={(name) => setSelectedDistrictName(name === selectedDistrictName ? null : name)}
                            />
                        </div>

                        {/* Summary Stats Overview (Updates based on selection) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                            {[
                                { icon: Church, label: "CHURCHES PLANTED", value: displayData.churches },
                                { icon: Megaphone, label: "JOINED MEMBERS", value: displayData.joined },
                                { icon: UserRound, label: "BAPTIZED MEMBERS", value: displayData.baptized }
                            ].map((stat, i) => (
                                <div key={i} className={`flex flex-col items-center text-center group cursor-default reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${500 + (i * 100)}ms` }}>
                                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 transition-all duration-500 shadow-xl group-hover:scale-105">
                                        <stat.icon className="w-12 h-12 text-black transition-transform duration-500 group-hover:rotate-12" />
                                    </div>
                                    <span className="text-3xl font-black text-white mb-2 tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{stat.label}</span>
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
