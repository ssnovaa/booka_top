"use client";

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-24 lg:pt-28 pb-10 px-6">
      <div className="max-w-7xl mx-auto bg-[#F3F1F7] rounded-[2rem] overflow-hidden relative min-h-[440px] flex items-center">
        
{/* 🌸 ДЕКОРАТИВНИЙ ФОН (з високою прозорістю та легким розмиттям) */}
<div className="absolute inset-0 z-0 pointer-events-none">
  <Image 
    src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop" 
    alt=""
    fill
    className="object-cover opacity-50 scale-110 blur-[2px]" // Додав легкий блюр для читабельності
  />
  <div className="absolute inset-0 bg-gradient-to-r from-[#F3F1F7]/60 via-[#F3F1F7]/40 to-transparent" />
</div>

        <div className="flex flex-col lg:flex-row w-full h-full items-center relative z-10">
          
          {/* КАРТИНКА ЗЛІВА */}
          <div className="flex-1 relative h-[300px] lg:h-[440px] w-full">
            <div 
              className="relative w-full h-full"
              style={{
                maskImage: 'linear-gradient(to right, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 75%, transparent 100%)'
              }}
            >
              <Image 
                src="/hero-optimized.webp" 
                alt="Booka girl" 
                fill
                priority
                className="object-cover object-center scale-105"
              />
            </div>
          </div>

          {/* ТЕКСТ СПРАВА */}
          <div className="flex-1 p-8 lg:p-20 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20">
            <h1 className="text-5xl md:text-5xl font-normal text-[#000066c7] font-serif mb-6 leading-tight">
              Booka. Твої улюблені історії <br className="hidden lg:block" /> у твоєму ритмі
            </h1>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white rounded-full font-semibold shadow-md hover:brightness-110 transition-all active:scale-95 text-sm">
                Завантажити додаток
              </button>
              
              <button className="px-7 py-3.5 bg-white text-slate-700 rounded-full font-semibold border border-white shadow-sm flex items-center gap-3 hover:bg-white/80 transition-all active:scale-95 text-sm">
                Дивитись на YouTube
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}