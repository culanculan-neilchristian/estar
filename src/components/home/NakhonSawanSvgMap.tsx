'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound, UserCheck } from 'lucide-react';
import { PROVINCE_SVG_MAPS } from '@/data/provinceDistrictPaths';
import { NAKHON_SAWAN_DUMMY_DATA, DistrictStats } from '@/data/dummyProvinceData';

interface NakhonSawanSvgMapProps {
    onDistrictSelect?: (name: string) => void;
    activeDistrict?: string | null;
    activeStep?: number;
    customDistrictsData?: DistrictStats[];
    activeProvince?: string;
}

const NakhonSawanSvgMap: React.FC<NakhonSawanSvgMapProps> = ({ 
    onDistrictSelect, 
    activeDistrict, 
    activeStep = 2,
    customDistrictsData,
    activeProvince = 'Nakhon Sawan'
}) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [stickyPos, setStickyPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    const svgData = PROVINCE_SVG_MAPS[activeProvince];
    
    if (!svgData) {
        return (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#023862]/5 rounded-3xl p-8 border-2 border-dashed border-[#023862]/20">
                <p className="text-[#023862] text-xl font-bold mb-2 uppercase tracking-wide">Not prepared for this demo</p>
                <p className="text-[#023862]/60 text-center text-sm max-w-xs leading-relaxed">Detailed district mapping for {activeProvince} is not available in the current prototype.</p>
            </div>
        );
    }

    const hoveredDistrict = svgData.find(d => d.id === hoveredId);
    const activeDistrictData = svgData.find(d => d.name === activeDistrict);
    const displayDistrict = hoveredDistrict || activeDistrictData;
    
    // Use custom data if provided, otherwise fallback to timeline data
    const districtStats = customDistrictsData 
        ? customDistrictsData.find(d => d.name === displayDistrict?.name)
        : NAKHON_SAWAN_DUMMY_DATA[activeStep]?.districts.find(d => d.name === displayDistrict?.name);

    return (
        <div 
            className="relative w-full h-full rounded-3xl group flex items-center justify-center p-0 select-none"
            onMouseMove={handleMouseMove}
        >
            <svg 
                viewBox="0 0 500 450"
                className="w-full h-full max-h-[700px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* District Paths */}
                {svgData.map((district) => {
                    const isHovered = hoveredId === district.id;
                    const isSelected = activeDistrict === district.name;
                    
                    return (
                        <path
                            key={district.id}
                            d={district.path}
                            className={`transition-all duration-300 cursor-pointer stroke-[0.5] stroke-white origin-center
                                ${isSelected || isHovered
                                    ? 'fill-[#056AB1] z-20 shadow-2xl scale-[1.05]' 
                                    : 'fill-[#8FB9DC]'
                                }`}
                             onMouseEnter={() => setHoveredId(district.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => {
                                onDistrictSelect?.(district.name);
                                setStickyPos(mousePos);
                            }}
                        />
                    );
                })}
            </svg>

            {/* Hint / Instruction */}
            <div className="map-hint absolute bottom-6 left-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#023862]/40 animate-pulse" />
                <span className="text-[8px] font-semibold text-[#023862]/40 uppercase tracking-[0.25em]">
                    Click any region to explore growth
                </span>
            </div>

            {/* Premium Hover Card (Matches Screenshot Style) */}
            {displayDistrict && (
                <div 
                    className={`absolute z-50 pointer-events-none transition-all duration-300 ${!hoveredId && activeDistrict ? 'opacity-100 scale-100' : (hoveredId ? 'opacity-100 duration-75' : 'opacity-0 scale-95')}`}
                    style={{
                        left: `${(hoveredId ? mousePos.x : stickyPos.x) + 20}px`,
                        top: `${(hoveredId ? mousePos.y : stickyPos.y) - 20}px`,
                    }}
                >
                    <div className="district-tooltip bg-[#4492C8] rounded-[32px] p-6 shadow-2xl border border-black/5 animate-in fade-in zoom-in-95 duration-200 text-white">
                        <h4 className="text-xl font-semibold text-white mb-3 tracking-tighter">
                            {displayDistrict?.name}
                        </h4>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Church size={18} className="text-white" />
                                <span className="text-xl font-semibold text-white leading-none">{districtStats?.churches || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Megaphone size={18} className="text-white" />
                                <span className="text-xl font-semibold text-white leading-none">{districtStats?.villages || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserCheck size={18} className="text-white" />
                                <span className="text-xl font-semibold text-white leading-none">{districtStats?.joined || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserRound size={18} className="text-white" />
                                <span className="text-xl font-semibold text-white leading-none">{districtStats?.baptized || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default NakhonSawanSvgMap;

