'use client';

import React, { useState } from 'react';
import { Church, Megaphone, UserRound } from 'lucide-react';
import { THAILAND_SVG_DATA } from '@/data/thailandPaths';
import { THAILAND_DUMMY_DATA } from '@/data/thailandDummyData';
import { DistrictStats } from '@/data/dummyProvinceData';

interface ThailandSvgMapProps {
    onProvinceSelect?: (name: string) => void;
    onHover?: (name: string | null, mousePos?: { x: number; y: number }) => void;
    activeProvince?: string | null;
    activeStep?: number;
    customProvincesData?: DistrictStats[];
}

const ThailandSvgMap: React.FC<ThailandSvgMapProps> = ({ 
    onProvinceSelect, 
    onHover,
    activeProvince, 
    activeStep = 2,
    customProvincesData
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

    const hoveredProvince = THAILAND_SVG_DATA.find(d => d.id === hoveredId);
    const activeProvinceData = THAILAND_SVG_DATA.find(d => d.name === activeProvince);
    const displayProvince = hoveredProvince || activeProvinceData;
    
    // Use custom data if provided, otherwise fallback to timeline data
    const provinceStats = customProvincesData
        ? customProvincesData.find(d => d.name === displayProvince?.name)
        : THAILAND_DUMMY_DATA[activeStep]?.districts.find(d => d.name === displayProvince?.name);

    return (
        <div 
            className="relative w-full h-full rounded-3xl group flex items-center justify-center p-0 select-none bg-transparent"
            onMouseMove={handleMouseMove}
        >
            <svg 
                viewBox="0 0 560 1025"
                className="w-full h-full max-h-[800px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Province Paths */}
                {THAILAND_SVG_DATA.map((province) => {
                    const isHovered = hoveredId === province.id;
                    const isSelected = activeProvince === province.name;
                    
                    return (
                        <path
                            key={province.id}
                            d={province.path}
                            className={`transition-all duration-300 cursor-pointer stroke-[0.3] stroke-black/20 origin-center
                                ${isSelected || isHovered
                                    ? 'fill-white z-20 shadow-2xl scale-[1.02]' 
                                    : 'fill-[#3D3D3D]'
                                }`}
                            onMouseEnter={() => {
                                setHoveredId(province.id);
                                onHover?.(province.name, mousePos);
                            }}
                            onMouseLeave={() => {
                                setHoveredId(null);
                                onHover?.(null);
                            }}
                            onClick={() => {
                                onProvinceSelect?.(province.name);
                                setStickyPos(mousePos);
                            }}
                        />
                    );
                })}
            </svg>

            {/* Hint / Instruction */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.25em]">
                    Hover to explore provinces
                </span>
            </div>

            {/* Premium Hover Card */}
            {displayProvince && (
                <div 
                    className={`absolute z-50 pointer-events-none transition-all duration-300 ${!hoveredId && activeProvince ? 'opacity-100 scale-100' : (hoveredId ? 'opacity-100 duration-75' : 'opacity-0 scale-95')}`}
                    style={{
                        left: `${(hoveredId ? mousePos.x : stickyPos.x) + 20}px`,
                        top: `${(hoveredId ? mousePos.y : stickyPos.y) - 20}px`,
                    }}
                >
                    <div className="bg-white rounded-2xl p-4 shadow-2xl border border-black/5 animate-in fade-in zoom-in-95 duration-200 min-w-[180px]">
                        <h4 className="text-lg font-black text-black mb-2 tracking-tighter uppercase whitespace-nowrap">
                            {displayProvince?.name}
                        </h4>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Church size={18} className="text-black/20" />
                                <span className="text-xl font-black text-black leading-none">{provinceStats?.churches || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Megaphone size={18} className="text-black/20" />
                                <span className="text-xl font-black text-black leading-none">{provinceStats?.joined || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <UserRound size={18} className="text-black/20" />
                                <span className="text-xl font-black text-black leading-none">{provinceStats?.baptized || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThailandSvgMap;
