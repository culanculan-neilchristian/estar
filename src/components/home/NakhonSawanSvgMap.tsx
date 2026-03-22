'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import { NAKHON_SAWAN_SVG_DATA } from '@/data/nakhonSawanPaths';
import { NAKHON_SAWAN_DUMMY_DATA, DistrictStats } from '@/data/dummyProvinceData';

interface NakhonSawanSvgMapProps {
    onDistrictSelect?: (name: string) => void;
    activeDistrict?: string | null;
    activeStep?: number;
    customDistrictsData?: DistrictStats[];
}

const NakhonSawanSvgMap: React.FC<NakhonSawanSvgMapProps> = ({ 
    onDistrictSelect, 
    activeDistrict, 
    activeStep = 2,
    customDistrictsData
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

    const hoveredDistrict = NAKHON_SAWAN_SVG_DATA.find(d => d.id === hoveredId);
    const activeDistrictData = NAKHON_SAWAN_SVG_DATA.find(d => d.name === activeDistrict);
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
                {NAKHON_SAWAN_SVG_DATA.map((district) => {
                    const isHovered = hoveredId === district.id;
                    const isSelected = activeDistrict === district.name;
                    
                    return (
                        <path
                            key={district.id}
                            d={district.path}
                            className={`transition-all duration-300 cursor-pointer stroke-[0.5] stroke-black/20 origin-center
                                ${isSelected || isHovered
                                    ? 'fill-white z-20 shadow-2xl scale-[1.05]' 
                                    : 'fill-[#3D3D3D]'
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
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.25em]">
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
                    <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-black/5 animate-in fade-in zoom-in-95 duration-200">
                        <h4 className="text-xl font-black text-black mb-3 tracking-tighter">
                            {displayDistrict?.name}
                        </h4>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Church size={18} className="text-black/30" />
                                <span className="text-xl font-black text-black leading-none">{districtStats?.churches || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Megaphone size={18} className="text-black/30" />
                                <span className="text-xl font-black text-black leading-none">{districtStats?.joined || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserRound size={18} className="text-black/30" />
                                <span className="text-xl font-black text-black leading-none">{districtStats?.baptized || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default NakhonSawanSvgMap;

