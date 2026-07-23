import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import videoThumb from '@/assets/images/video-thumb.jpg';

export default function HomeIntro() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left side: Dummy Video Placeholder */}
          <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <Image 
              src={videoThumb} 
              alt="Video Placeholder" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#2274b4] border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          {/* Right side: Text */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mb-4">
              We Map. We Equip. We Send.
            </span>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              eStar — the Evangelical Strategic Tracking and Analysis Resource — exists to help the Church see clearly where the Gospel has yet to take root.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              By combining field data with a faith-filled vision, we equip Thai believers to plant churches in unreached villages, disciple new leaders, and multiply movements of the Gospel.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
              We believe the Church can finish the Great Commission. One village at a time. One church at a time. Until all have heard.
            </p>
            <Link href="/vision" className="btn-primary">
              Explore the Vision
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
