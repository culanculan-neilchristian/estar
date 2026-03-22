import React from 'react';
import { Church, Megaphone, UserRound, Percent } from 'lucide-react';
import CountUp from '../ui/CountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ImpactContent = () => {
    const { ref, isVisible } = useScrollReveal(0.1);
    const stats = [
        {
            icon: Church,
            value: "361",
            label: "CHURCHES PLANTED"
        },
        {
            icon: Megaphone,
            value: "4,923",
            label: "JOINED MEMBERS"
        },
        {
            icon: UserRound,
            value: "3,291",
            label: "BAPTIZED MEMBERS"
        },
        {
            icon: Percent,
            value: "3.7%",
            label: "THAILAND IMPACTED"
        }
    ];

    return (
        <div className="flex flex-col items-start w-full">
            <h2 className="heading-2 mb-4">Your Impact So Far</h2>
            
            <p className="paragraph mb-10">
                In just over a year, your support has led to measurable, Spirit-led transformation across Thailand. The
                numbers below represent real churches, real people, and real change — sparked by your generosity and
                prayer.
            </p>

            <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-2xl">
                {stats.map((stat, idx) => {
                    const numberValue = parseFloat(stat.value.replace(/,/g, ''));
                    const isPercentage = stat.value.includes('%');
                    const decimals = isPercentage ? 1 : 0;
                    const suffix = isPercentage ? '%' : '';

                    return (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-white/5">
                                <stat.icon className="w-7 h-7 text-black" />
                            </div>
                            <span className="text-2xl font-bold text-white mb-1 tracking-tight">
                                {isVisible ? (
                                    <CountUp 
                                        end={numberValue} 
                                        decimals={decimals} 
                                        suffix={suffix} 
                                        duration={1500}
                                    />
                                ) : (
                                    <span>0{suffix}</span>
                                )}
                            </span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImpactContent;
