import React from 'react';
import Link from 'next/link';
import heroImg from '@/assets/images/home-hero-banner.jpg';

export default function HomeHero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start text-left mt-24 md:mt-32">
        <span className="text-[12px] font-bold text-white tracking-[0.2em] uppercase mb-4">
          eStar Foundation
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
          Mapping the Gospel.<br />
          Empowering the Church.
        </h1>
        
        <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl leading-relaxed">
          We equip local leaders across Thailand with the tools, training, and insight they need to plant churches in unreached villages, share the Gospel faithfully, and disciple new believers — until every village in Thailand has heard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="#impact" 
            className="rounded-[4px] bg-white text-[#091f3a] hover:bg-gray-100 px-6 py-3 text-sm font-semibold transition-colors text-center inline-block"
          >
            See the Impact
          </Link>
          <Link 
            href="/donate" 
            className="btn-primary"
          >
            Donate Today
          </Link>
        </div>
      </div>
    </section>
  );
}
