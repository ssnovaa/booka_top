"use client";

import React from 'react';
import { Audiobook, audiobooks } from '../data/audiobooks';
import Image from 'next/image';

interface BentoGridProps {
  setActiveBook: (book: Audiobook) => void;
}

// --- МОКОВІ ДАНІ ---

const popularBookOfMonth = audiobooks[0];

const youtubeRow = [
  { id: 'v1', title: 'Booka Radio: Lo-fi для читання', thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600&auto=format&fit=crop' },
  { id: 'v2', title: 'Огляд: Психологія впливу', thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop' },
  { id: 'v3', title: 'Інтерв’ю з авторами', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop' },
];

const shorts = [
  { id: 'sh1', title: 'Топ трилери 🔥', thumbnail: 'https://images.unsplash.com/photo-1521302340133-cf7b2972320d?q=80&w=600&fit=crop' },
  { id: 'sh2', title: 'Як читати швидше', thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&fit=crop' },
  { id: 'sh3', title: 'Анонс: Новий реліз', thumbnail: audiobooks[2].cover },
];

export default function BentoGrid({ setActiveBook }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
      
      {/* 1. ГОЛОВНИЙ АКЦЕНТ (ВЕРТИКАЛЬНА ОБКЛАДИНКА) - зліва */}
      <div 
        onClick={() => setActiveBook(popularBookOfMonth)}
        className="md:col-span-3 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl"
      >
        <div className="relative w-full h-full aspect-[2/3] md:aspect-auto">
          <Image 
            src={popularBookOfMonth.cover} 
            alt={popularBookOfMonth.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white mb-2">{popularBookOfMonth.title}</h3>
          <p className="text-slate-300 text-sm">{popularBookOfMonth.author}</p>
          <button className="mt-4 w-full py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold text-sm hover:bg-white/30 transition-all">
            Слухати
          </button>
        </div>
      </div>

      {/* 2. РЯД YOUTUBE (3 ВІДЕО + КНОПКА "БІЛЬШЕ") - справа зверху */}
      <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
        {youtubeRow.map((video) => (
          <div key={video.id} className="relative group cursor-pointer">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-200">
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
            <h4 className="mt-3 text-xs font-bold text-slate-800 line-clamp-2 px-1">{video.title}</h4>
          </div>
        ))}
        
        {/* Кнопка "Дивитись більше" - як окрема картка в ряду */}
        <button className="relative aspect-video rounded-3xl bg-[#FF007A]/5 border-2 border-dashed border-[#FF007A]/20 flex flex-col items-center justify-center gap-2 group hover:bg-[#FF007A]/10 transition-all">
          <div className="w-10 h-10 rounded-full bg-[#FF007A] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </div>
          <span className="text-xs font-bold text-[#FF007A]">Дивитись більше</span>
        </button>
      </div>

      {/* 3. РЯД SHORTS ТА АНОНСІВ (ВЕРТИКАЛЬНІ) - справа знизу */}
      <div className="md:col-span-9 grid grid-cols-3 md:grid-cols-4 gap-4">
        {shorts.map((short) => (
          <div key={short.id} className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer shadow-md">
            <Image src={short.thumbnail} alt={short.title} fill className="object-cover group-hover:scale-105 transition-transform opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-[10px] md:text-xs font-bold text-white leading-tight">{short.title}</h4>
            </div>
            <div className="absolute top-3 right-3 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M10 9.5l4.5 2.5-4.5 2.5v-5z"/></svg>
            </div>
          </div>
        ))}

        {/* Центральний текстовий блок (як на макеті "Зараз слухають") */}
        <div className="hidden md:flex bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[2.5rem] p-6 flex-col justify-between text-white shadow-xl relative overflow-hidden">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
           <h3 className="text-xl font-bold leading-tight relative z-10">Зараз <br/> слухають</h3>
           <div className="flex items-center gap-2 relative z-10">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-indigo-500 bg-slate-300" />)}
              </div>
              <span className="text-[10px] font-medium">+1.2k</span>
           </div>
        </div>
      </div>

    </div>
  );
}