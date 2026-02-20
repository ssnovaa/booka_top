"use client";

import React, { useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export default function Footer() {
  const { activeBook, isPlaying, togglePlay, currentTime, duration, handleSeek } = usePlayer();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const safeDuration = duration > 0 ? duration : 100; 
      handleSeek((clickX / rect.width) * safeDuration);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const cardiogramPath = "M 0 30 L 30 30 L 40 10 L 50 50 L 60 5 L 70 55 L 80 15 L 90 40 L 100 25 L 110 30 L 150 30";

  return (
    <section className="max-w-7xl mx-auto px-6 mb-12">
      <style>{`
        @keyframes eq-jerk { 0% { transform: scaleY(0.2); } 15% { transform: scaleY(1.3); } 30% { transform: scaleY(0.4); } 45% { transform: scaleY(1.5); } 60% { transform: scaleY(0.2); } 75% { transform: scaleY(1.2); } 90% { transform: scaleY(0.6); } 100% { transform: scaleY(0.2); } }
        .animate-eq { animation: eq-jerk 0.8s linear infinite; transform-origin: center; }
      `}</style>
      
      <footer className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Фонове сяйво для преміального вигляду */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF007A]/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        {/* Сітка: елементи однакової висоти (items-stretch), плеєр займає 2 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 items-stretch border-b border-slate-700/50 pb-12 mb-8 relative z-10">
          
          {/* 1. Блок Додатку (QR-код збільшено) */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1 justify-center">
            <p className="font-bold mb-4 text-sm text-slate-300">Завантажити додаток</p>
            <div className="bg-white p-3 rounded-2xl w-36 h-36 mb-4 flex items-center justify-center shadow-xl">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://booka.top" alt="QR Code" className="w-full h-full rounded-lg" />
            </div>
            <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase">
               <span className="bg-slate-800 px-2 py-1 rounded">App Store</span>
               <span className="bg-slate-800 px-2 py-1 rounded">Google Play</span>
            </div>
          </div>

          {/* 2. Перевага: Озвучка (Значок +50%) */}
          <div className="flex flex-col items-center text-center lg:col-span-1 justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#FF007A] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,0,122,0.3)] bg-[#FF007A]/5">
              <svg className="w-9 h-9 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <p className="font-bold text-sm leading-snug">Професійна <br/> озвучка</p>
          </div>

          {/* 3. ЦЕНТРАЛЬНИЙ ПЛЕЄР (Широкий, висота вирівняна з іншими) */}
          <div className="lg:col-span-2 flex items-center">
             <div className="relative w-full bg-[#1E192A]/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-6 flex flex-col gap-4 shadow-2xl h-full justify-center">
                <div className="flex items-center gap-6 w-full">
                  <div className="w-20 h-28 rounded-xl overflow-hidden shadow-2xl flex-shrink-0 border border-white/5">
                    <img src={activeBook.cover} alt="cover" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 h-16 relative flex items-center justify-center">
                     <svg viewBox="0 0 150 60" className={`w-full h-full text-[#FF007A] ${isPlaying ? 'animate-eq drop-shadow-[0_0_10px_rgba(255,0,122,1)]' : 'opacity-30'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
                       <path d={cardiogramPath} vectorEffect="non-scaling-stroke" strokeWidth="3" />
                     </svg>
                  </div>

                  <button onClick={togglePlay} className={`transition-all duration-300 transform hover:scale-110 ${isPlaying ? 'text-[#FF007A]' : 'text-white'}`}>
                    {isPlaying ? (
                      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                    ) : (
                      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                </div>

                <div className="w-full">
                  <div ref={progressBarRef} onClick={handleProgressClick} className="w-full h-1.5 bg-slate-700/60 rounded-full relative cursor-pointer group">
                    <div className="absolute left-0 top-0 h-full bg-[#FF007A] rounded-full shadow-[0_0_10px_rgba(255,0,122,0.8)]" style={{ width: `${progressPercent}%` }}></div>
                    <div className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform -translate-y-1/2" style={{ left: `${progressPercent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
             </div>
          </div>

          {/* 4. Перевага: Унікальні історії (Значок +50%) */}
          <div className="flex flex-col items-center text-center lg:col-span-1 justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#FF007A] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,0,122,0.3)] bg-[#FF007A]/5">
              <svg className="w-9 h-9 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <p className="font-bold text-sm leading-snug">Унікальні <br/> історії</p>
          </div>

          {/* 5. Перевага: Зручність (Значок +50%) */}
          <div className="flex flex-col items-center text-center lg:col-span-1 justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#FF007A] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,0,122,0.3)] bg-[#FF007A]/5">
              <svg className="w-9 h-9 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <p className="font-bold text-sm leading-snug">Зручне <br/> прослуховування</p>
          </div>

        </div>

        {/* Навігація та копірайт */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10 pt-4">
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition">Про нас</a>
            <a href="#" className="hover:text-white transition">Авторам</a>
            <a href="#" className="hover:text-white transition">Контакти</a>
          </div>
          <div className="font-medium">booka.top © 2026</div>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF007A] transition-colors cursor-pointer text-white text-[10px]">FB</div>
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF007A] transition-colors cursor-pointer text-white text-[10px]">IG</div>
          </div>
        </div>
      </footer>
    </section>
  );
}