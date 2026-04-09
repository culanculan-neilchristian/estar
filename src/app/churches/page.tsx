import React from 'react';
import { Church, MapPin, Info, Search } from 'lucide-react';
import Container from '@/components/layout/Container';
import { CsvDataService } from '@/services/csv-data-service';

export const metadata = {
  title: 'Churches in Thailand | eStar Foundation',
  description: 'Explore our database of churches across Thailand, mapping the spread of the Gospel.',
};

export default async function ChurchesPage() {
  const churches = await CsvDataService.getAllChurches();
  
  // High-level stats for the header
  const totalChurches = churches.length;
  const provinces = [...new Set(churches.map(c => c.province))].length;

  // Initial display data (first 40)
  const initialDisplay = churches.slice(0, 40);

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <Container>
        {/* Header Section */}
        <div className="mb-16 space-y-6">
          <div className="space-y-4">
            <span className="eyebrow">DATABASE</span>
            <h1 className="heading-1">Church Directory</h1>
            <p className="paragraph max-w-2xl text-white/70">
              Accessing real-time data on the spread of the Gospel in Thailand. 
              Our database tracks {totalChurches.toLocaleString()} church locations across {provinces} provinces.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <Church className="w-6 h-6 text-white/40 mb-3" />
              <div className="text-2xl font-black">{totalChurches.toLocaleString()}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Churches</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <MapPin className="w-6 h-6 text-white/40 mb-3" />
              <div className="text-2xl font-black">{provinces}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Provinces Covered</div>
            </div>
            {/* Add more stats if needed */}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialDisplay.map((church) => (
            <div 
              key={church.id}
              className="group bg-[#747474]/5 border border-white/5 hover:border-white/20 p-6 rounded-[32px] transition-all duration-500 hover:bg-[#747474]/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <Church className="w-6 h-6 text-black" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  church.status === 'เปิดอยู่' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {church.status}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight line-clamp-1">{church.churchName}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{church.province}, {church.amphoe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Info className="w-4 h-4" />
                    <span>{church.tambon} • {church.yearBegan || 'Unknown Year'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  ID: {church.id}
                </div>
                <button className="text-xs font-bold uppercase tracking-widest hover:text-white text-white/60 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Note */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm italic">
            Showing first {initialDisplay.length} of {totalChurches.toLocaleString()} churches.
            Use the search and filter tools for more results.
          </p>
        </div>
      </Container>
    </div>
  );
}
