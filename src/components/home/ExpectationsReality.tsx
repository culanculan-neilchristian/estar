'use client';

import React from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';
import CountUp from '../ui/CountUp';

interface DistrictResult {
    name: string;
    churches: number;
    members: string;
    believers: string;
    top: string;
    left: string;
}

interface ResultData {
    title: string;
    churches: number;
    members: string;
    believers: string;
    districts: DistrictResult[];
}

const EXPECTED_DATA: ResultData = {
    title: "Expected 2024 Results",
    churches: 311,
    members: "3,200",
    believers: "1,700",
    districts: [
        { name: "Lat Yao", churches: 121, members: "1,250", believers: "700", top: "45%", left: "12%" },
        { name: "Tak Fa", churches: 102, members: "1,050", believers: "550", top: "58%", left: "42%" },
        { name: "Khaisali", churches: 88, members: "900", believers: "450", top: "54%", left: "78%" }
    ]
};

const ACTUAL_DATA: ResultData = {
    title: "Actual 2024 Results",
    churches: 325,
    members: "3,782",
    believers: "2,144",
    districts: [
        { name: "Lat Yao", churches: 126, members: "1,489", believers: "855", top: "45%", left: "12%" },
        { name: "Tak Fa", churches: 107, members: "1,268", believers: "717", top: "58%", left: "42%" },
        { name: "Khaisali", churches: 92, members: "1,025", believers: "572", top: "54%", left: "78%" }
    ]
};



const ResultCard = ({ data, isVisible }: { data: ResultData; isVisible: boolean }) => {
    // Map the ResultData to DistrictStats format for the SVG map component
    const mapStats = data.districts.map(d => ({
        id: d.name.toLowerCase().replace(/\s+/g, '-'),
        name: d.name,
        churches: d.churches,
        joined: d.members,
        baptized: d.believers,
        coordinates: [0, 0] as [number, number]
    }));

    return (
        <div className="flex-1 min-w-[320px] bg-black border border-white/10 rounded-[32px] p-8 md:p-12 transition-all duration-500 hover:border-white/20 group">
            <h3 className="text-2xl font-bold text-white text-center mb-12 tracking-tight">{data.title}</h3>
            
            {/* Map Container */}
            <div className="relative aspect-[4/3] w-full mb-16 px-4">
                <div className="absolute inset-0 transition-opacity duration-700">
                    <NakhonSawanSvgMap 
                        customDistrictsData={mapStats}
                    />
                </div>
            </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                    <Church className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-black text-white">
                    {isVisible ? <CountUp end={data.churches} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">CHURCHES</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mb-3">
                    <Megaphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white">
                    {isVisible ? <CountUp end={parseFloat(data.members.replace(/,/g, ''))} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">MEMBERS</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mb-3">
                    <UserRound className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white">
                    {isVisible ? <CountUp end={parseFloat(data.believers.replace(/,/g, ''))} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">BELIEVERS</span>
            </div>
            </div>
        </div>
    );
};

const ExpectationsReality = () => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section ref={ref} className="bg-black py-24 border-t border-white/5">
            <Container>
                <div className={`text-center mb-20 max-w-4xl mx-auto reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="heading-1 mb-6 text-white text-3xl font-bold tracking-tight">Expectations & Reality</h2>
                    <p className="paragraph text-white/60 text-lg leading-relaxed">
                        What began as a bold vision to reach 311 house churches and 3 district churches across the province 
                        of Nakhon Sawan has quickly grown beyond anything we projected. By year&apos;s end, God opened doors 
                        wider than expected—allowing us to reach 325 house churches, welcoming 3,782 members, 
                        and witnessing 2,144 baptisms.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className={`flex-1 reveal-on-scroll scale-in delay-200 ${isVisible ? 'is-visible' : ''}`}>
                        <ResultCard data={EXPECTED_DATA} isVisible={isVisible} />
                    </div>
                    <div className={`flex-1 reveal-on-scroll scale-in delay-400 ${isVisible ? 'is-visible' : ''}`}>
                        <ResultCard data={ACTUAL_DATA} isVisible={isVisible} />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ExpectationsReality;
