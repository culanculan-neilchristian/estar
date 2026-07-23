import React from 'react';
import Link from 'next/link';

export default function HomeRoadmap() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title text-center mb-16">
          Where We're Headed<br className="hidden md:block" />
          — and How Close We Are
        </h2>

        {/* Roadmap Circles */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-20 relative">
          
          {/* Phase 1 */}
          <div className="w-64 h-64 rounded-3xl bg-[#2274b4] flex flex-col items-center justify-center text-white text-center p-6 shadow-xl relative z-10">
            <h4 className="font-bold text-xl mb-1">Phase 1</h4>
            <span className="text-[10px] font-bold tracking-[0.2em] mb-4">2020 — 2026</span>
            <ul className="text-xs text-left list-disc pl-4 space-y-1">
              <li>Central Thailand</li>
              <li>Focus on 7 key provinces</li>
              <li>Goal: 10,000 churches planted</li>
              <li>Every province with trained outreach teams</li>
              <li>Full infrastructure setup</li>
            </ul>
          </div>

          <svg className="w-8 h-8 text-[#2274b4] hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          <svg className="w-8 h-8 text-[#2274b4] md:hidden rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>

          {/* Phase 2 */}
          <div className="w-64 h-64 rounded-3xl bg-[#2274b4] flex flex-col items-center justify-center text-white text-center p-6 shadow-xl relative z-10">
            <h4 className="font-bold text-xl mb-1">Phase 2</h4>
            <span className="text-[10px] font-bold tracking-[0.2em] mb-4">2026 — 2031</span>
            <ul className="text-xs text-left list-disc pl-4 space-y-1">
              <li>Northeast & Central Expansion</li>
              <li>Focus on 28 additional provinces</li>
              <li>Goal: 50% of Thailand's villages reached</li>
              <li>Data validation system fully operational</li>
              <li>Evangelism active in every region</li>
            </ul>
          </div>

          <svg className="w-8 h-8 text-[#2274b4] hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          <svg className="w-8 h-8 text-[#2274b4] md:hidden rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>

          {/* Phase 3 (Says Phase 1 in PDF, maybe a typo, assuming Phase 3) */}
          <div className="w-64 h-64 rounded-3xl bg-[#1e2a4a] flex flex-col items-center justify-center text-white text-center p-6 shadow-xl relative z-10">
            <h4 className="font-bold text-xl mb-1">Phase 3</h4>
            <span className="text-[10px] font-bold tracking-[0.2em] mb-4">2032 — 2037</span>
            <ul className="text-xs text-left list-disc pl-4 space-y-1">
              <li>National Saturation</li>
              <li>Remaining 42 provinces</li>
              <li>Goal: 100% of villages engaged with the Gospel</li>
              <li>0 unreached provinces</li>
              <li>Thailand becomes a sending nation</li>
            </ul>
          </div>

        </div>

        {/* Text and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1 flex flex-col">
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              We're pursuing the complete evangelization of Thailand — every village, every district, every province. This three-phase roadmap outlines the bold, data-informed strategy God has placed before us to reach 100% of Thailand's unreached villages by 2035.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              And it's not just theory. It's already happening. With over 8,500 churches planted and thousands of local leaders mobilized, the momentum is real. You can help finish the task.
            </p>
          </div>
          
          <div className="lg:col-span-2">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="p-4 font-bold text-[#091f3a] border-r border-gray-300 w-1/2">What We're Aiming For</th>
                    <th className="p-4 font-bold text-[#091f3a] w-1/2">Where We Are Today</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base text-gray-700 text-center">
                  <tr className="border-b border-gray-300">
                    <td className="p-4 border-r border-gray-300">100% of Thailand's villages reached by 2035</td>
                    <td className="p-4">6% reached so far</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 border-r border-gray-300">10,000 churches planted by end of Phase 1 (2025)</td>
                    <td className="p-4">8,524 planted as of June 2025</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 border-r border-gray-300">400+ new villages reached monthly (Phase 2 projection)</td>
                    <td className="p-4">Avg. 345/month currently</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 border-r border-gray-300">National Christian presence in every province</td>
                    <td className="p-4">13 provinces remain under 10% reached</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-gray-300">1 million+ souls reached by end of Phase 3</td>
                    <td className="p-4">496,423 reached to date</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="#impact" className="btn-primary">
            See how you're helping
          </Link>
          <Link href="/donate" className="btn-secondary">
            Donate Today
          </Link>
        </div>

      </div>
    </section>
  );
}
