'use client';

import React from 'react';
import Image from 'next/image';
import { Church, Megaphone, UserRound, UserCheck } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import NakhonSawanSvgMap from './NakhonSawanSvgMap';
import CountUp from '../ui/CountUp';
import { TimelineStateData } from '@/data/dummyProvinceData';

interface DistrictResult {
    name: string;
    churches: number;
    villages: number;
    members: string;
    baptized?: string;
}

interface ResultData {
    title: string;
    churches: number;
    villages: number;
    members: string;
    baptized?: string;
    districts: DistrictResult[];
}

const EXPECTED_DATA: ResultData = {
    title: "Expected 2024 Results",
    churches: 311,
    villages: 311,
    members: "3,200",
    baptized: "2,144",
    districts: [
        { name: "Lat Yao", churches: 121, villages: 121, members: "1,250", baptized: "837" },
        { name: "Tak Fa", churches: 102, villages: 102, members: "1,050", baptized: "703" },
        { name: "Khaisali", churches: 88, villages: 88, members: "900", baptized: "603" }
    ]
};

const ACTUAL_DATA: ResultData = {
    title: "Actual 2024 Results",
    churches: 325,
    villages: 314, // Roughly based on church count
    members: "3,782",
    baptized: "2,144",
    districts: [
        { name: "Lat Yao", churches: 126, villages: 121, members: "1,489", baptized: "855" },
        { name: "Tak Fa", churches: 107, villages: 104, members: "1,268", baptized: "717" },
        { name: "Khaisali", churches: 92, villages: 89, members: "1,025", baptized: "572" }
    ]
};



const ResultCard = ({ data, isVisible, provinceName }: { data: ResultData; isVisible: boolean; provinceName: string }) => {
    const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(null);

    // Map the ResultData to DistrictStats format for the SVG map component
    const mapStats = data.districts.map(d => ({
        id: d.name.toLowerCase().replace(/\s+/g, '-'),
        name: d.name,
        churches: d.churches,
        villages: d.villages,
        joined: d.members,
        baptized: d.baptized || "0",
        coordinates: [0, 0] as [number, number]
    }));

    return (
        <div className="flex-1 min-w-[320px] bg-white border border-[#023862]/10 rounded-[32px] p-8 transition-all duration-500 hover:border-[#023862]/20 shadow-lg shadow-[#023862]/5 group">
            <h3 className="text-2xl font-bold text-[#023862] text-center mb-12 tracking-tight">{data.title}</h3>
            
            {/* Map Container */}
            <div className="relative aspect-[4/3] w-full mb-3 px-4">
                <div className="absolute inset-0 transition-opacity duration-700">
                    <NakhonSawanSvgMap 
                        activeDistrict={selectedDistrict}
                        onDistrictSelect={(name) => setSelectedDistrict(name === selectedDistrict ? null : name)}
                        customDistrictsData={mapStats}
                        activeProvince={provinceName}
                    />
                </div>
            </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#023862]/10 items-start">
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white border-2 border-[#2E7AB8] rounded-full flex items-center justify-center mb-3">
                    <Church className="w-6 h-6 text-[#2E7AB8]" />
                </div>
                <span className="text-2xl font-semibold text-[#023862]">
                    {isVisible ? <CountUp end={data.churches} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-semibold text-[#023862]/70 uppercase tracking-widest mt-1 text-center whitespace-nowrap">CHURCHES PLANTED</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white border-2 border-[#2E7AB8] rounded-full flex items-center justify-center mb-3">
                    <Megaphone className="w-6 h-6 text-[#2E7AB8]" />
                </div>
                <span className="text-2xl font-semibold text-[#023862]">
                    {isVisible ? <CountUp end={data.villages} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-semibold text-[#023862]/70 uppercase tracking-widest mt-1 text-center whitespace-nowrap">VILLAGES REACHED</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white border-2 border-[#2E7AB8] rounded-full flex items-center justify-center mb-3">
                    <UserCheck className="w-6 h-6 text-[#2E7AB8]" />
                </div>
                <span className="text-2xl font-semibold text-[#023862]">
                    {isVisible ? <CountUp end={Math.max(0, parseFloat(data.members.replace(/,/g, '')) - 20)} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-semibold text-[#023862]/70 uppercase tracking-widest mt-1 text-center whitespace-nowrap">RESPONDERS</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white border-2 border-[#2E7AB8] rounded-full flex items-center justify-center mb-3">
                    <UserRound className="w-6 h-6 text-[#2E7AB8]" />
                </div>
                <span className="text-2xl font-semibold text-[#023862]">
                    {isVisible ? <CountUp end={parseFloat(data.members.replace(/,/g, ''))} duration={1500} /> : '0'}
                </span>
                <span className="text-[9px] font-semibold text-[#023862]/70 uppercase tracking-widest mt-1 text-center whitespace-nowrap">BAPTIZED PEOPLE</span>
            </div>
            </div>
        </div>
    );
};

interface ExpectationsRealityProps {
    actualData2024?: TimelineStateData;
    provinceName?: string;
}

const ExpectationsReality = ({ actualData2024, provinceName = 'Nakhon Sawan' }: ExpectationsRealityProps) => {
    const { ref, isVisible } = useScrollReveal();

    // Map the dynamic TimelineStateData to the ResultData format
    const dynamicActual: ResultData = actualData2024 ? {
        title: "Actual 2024 Results",
        churches: actualData2024.churches,
        villages: actualData2024.villages,
        members: actualData2024.joined,
        baptized: actualData2024.baptized,
        districts: actualData2024.districts.map(d => ({
            name: d.name,
            churches: d.churches,
            villages: d.villages,
            members: d.joined,
            baptized: d.baptized
        }))
    } : ACTUAL_DATA;

    // Dynamically project dynamicExpected results based on actual goals
    const dynamicExpected: ResultData = actualData2024 ? {
        title: "Expected 2024 Results",
        churches: Math.round(actualData2024.churches * 0.95),
        villages: Math.round(actualData2024.villages * 0.95),
        members: Math.round(parseInt(actualData2024.joined.replace(/,/g, ''), 10) * 0.9).toLocaleString(),
        baptized: Math.round(parseInt(actualData2024.baptized.replace(/,/g, ''), 10) * 0.9).toLocaleString(),
        districts: actualData2024.districts.map(d => ({
            name: d.name,
            churches: Math.round(d.churches * 0.95),
            villages: Math.round(d.villages * 0.95),
            members: Math.round(parseInt(d.joined.replace(/,/g, ''), 10) * 0.9).toLocaleString(),
            baptized: Math.round(parseInt(d.baptized.replace(/,/g, ''), 10) * 0.9).toLocaleString()
        }))
    } : EXPECTED_DATA;

    return (
        <section
            ref={ref}
            className="relative py-20 border-t border-white/10 overflow-hidden bg-[#3584C7]"
        >
            <div className="absolute inset-x-0 top-0 pointer-events-none" aria-hidden>
                <Image
                    src="/baptist-banner.jpg"
                    alt=""
                    width={1920}
                    height={964}
                    unoptimized
                    priority
                    className="!h-auto w-full"
                    style={{ height: 'auto' }}
                />
            </div>
            <Container className="relative z-10">
                <div className={`text-center mb-10 max-w-4xl mx-auto reveal-on-scroll fade-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="heading-1 mb-6 text-white text-3xl font-bold tracking-tight">Expectations & Reality</h2>
                    <p className="paragraph text-white text-lg leading-relaxed">
                        {provinceName === 'Nakhon Sawan' ? (
                            `What began as a bold vision to reach 311 house churches and 3 district churches across the province of Nakhon Sawan has quickly grown beyond anything we projected. By 2024 year end, God opened doors wider than expected—allowing us to reach ${dynamicActual.churches} house churches, welcoming ${dynamicActual.members} members.`
                        ) : (
                            `What began as a bold vision to reach the province of ${provinceName} has quickly grown beyond anything we projected. By 2024 year end, God opened doors wider than expected—allowing us to reach ${dynamicActual.churches} house churches, welcoming ${dynamicActual.members} members.`
                        )}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className={`flex-1 reveal-on-scroll scale-in delay-200 ${isVisible ? 'is-visible' : ''}`}>
                        <ResultCard data={dynamicExpected} isVisible={isVisible} provinceName={provinceName} />
                    </div>
                    <div className={`flex-1 reveal-on-scroll scale-in delay-400 ${isVisible ? 'is-visible' : ''}`}>
                        <ResultCard data={dynamicActual} isVisible={isVisible} provinceName={provinceName} />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ExpectationsReality;
