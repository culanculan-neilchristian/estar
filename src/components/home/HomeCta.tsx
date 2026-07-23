import React from 'react';
import Link from 'next/link';
import ctaImg from '@/assets/images/cta-banner.jpg';

export default function HomeCta() {
  return (
    <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ctaImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Ready to keep <br className="hidden md:block" /> making a difference?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          Together, we can reach the rest. Help us map, equip, and send the Church to the very edge of the harvest field.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/donate" className="rounded-[4px] bg-white text-[#091f3a] hover:bg-gray-100 px-8 py-3 text-sm font-semibold transition-colors text-center inline-block">
            Give Now
          </Link>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>

        <Link href="#impact" className="text-sm font-semibold text-white/80 underline underline-offset-4 hover:text-white transition-colors">
          Already gave? See your personal impact
        </Link>
      </div>
    </section>
  );
}
