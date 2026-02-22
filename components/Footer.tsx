"use client";

import React, { useRef, useEffect, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';

interface Genre {
  id: number;
  name: string;
  books_count: number;
}

export default function Footer() {
  // Додаємо isEnded з контексту
  const { activeBook, isPlaying, togglePlay, currentTime, duration, handleSeek, isEnded } = usePlayer();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetch('/api/genres')
      .then(res => res.json())
      .then(data => {
        setGenres(data.filter((g: Genre) => g.books_count > 0));
      })
      .catch(err => console.error("Ошибка загрузки тегов для футера:", err));
  }, []);

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
      handleSeek((clickX / rect.width) * (duration || 100));
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const cardiogramPath = "M 0 30 L 30 30 L 40 10 L 50 50 L 60 5 L 70 55 L 80 15 L 90 40 L 100 25 L 110 30 L 150 30";

  return (
    <section className="max-w-7xl mx-auto px-6 mb-12">
      <style>{`
        @keyframes eq-jerk { 0% { transform: scaleY(0.2); } 15% { transform: scaleY(1.3); } 30% { transform: scaleY(0.4); } 45% { transform: scaleY(1.5); } 60% { transform: scaleY(0.2); } 75% { transform: scaleY(1.2); } 90% { transform: scaleY(0.6); } 100% { transform: scaleY(0.2); } }
        .animate-eq { animation: eq-jerk 0.8s linear infinite; transform-origin: center; }
        @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(255, 0, 122, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(255, 0, 122, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 0, 122, 0); } }
        .animate-pulse-cta { animation: pulse-red 2s infinite; }
      `}</style>
      
      <footer className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF007A]/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 items-stretch border-b border-slate-700/50 pb-12 mb-8 relative z-10">
          
          {/* QR CODE - тепер веде на Google Play */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1 justify-center">
            <Link href="https://play.google.com/store/apps/details?id=top.booka.app" target="_blank" className="bg-white p-3 rounded-2xl w-32 h-32 mb-4 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=top.booka.app" alt="App QR" className="w-full h-full rounded-lg" />
            </Link>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">Встановити додаток</p>
          </div>

          <div className="hidden lg:flex flex-col items-center text-center lg:col-span-1 justify-center opacity-60">
             <div className="text-[#FF007A] mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             </div>
             <p className="text-[10px] font-bold leading-tight uppercase tracking-tighter">Сотні повних <br/> історій</p>
          </div>

          {/* ПЛЕЄР - Центральна частина лійки */}
          <div className="lg:col-span-3 flex items-center">
             <div className={`relative w-full transition-all duration-500 rounded-[2.2rem] border p-5 flex flex-col gap-4 shadow-2xl h-full justify-center ${isEnded ? 'bg-[#FF007A]/10 border-[#FF007A]/50 animate-pulse-cta' : 'bg-[#1E192A]/60 backdrop-blur-2xl border-white/10'}`}>
                
                {isEnded && (
                  <div className="absolute inset-x-0 -top-4 flex justify-center">
                    <span className="bg-[#FF007A] text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">Фрагмент завершено</span>
                  </div>
                )}

                <div className="flex items-center gap-5 w-full">
                  <div className="w-16 h-20 rounded-lg overflow-hidden shadow-2xl flex-shrink-0 border border-white/5 relative">
                    <img src={activeBook.cover} alt="cover" className={`w-full h-full object-cover ${isEnded ? 'grayscale opacity-50' : ''}`} />
                    {isEnded && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 font-bold text-[8px] text-center px-1">КІНЕЦЬ ГЛАВИ</div>}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    {isEnded ? (
                      <div className="space-y-1">
                        <p className="text-[#FF007A] font-bold text-[13px] italic">Хочете дослухати?</p>
                        <p className="text-slate-300 text-[10px] line-clamp-1">Повна версія чекає в додатку</p>
                      </div>
                    ) : (
                      <div className="h-12 relative flex items-center justify-center">
                        <svg viewBox="0 0 150 60" className={`w-full h-full text-[#FF007A] ${isPlaying ? 'animate-eq drop-shadow-[0_0_10px_rgba(255,0,122,1)]' : 'opacity-30'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
                          <path d={cardiogramPath} vectorEffect="non-scaling-stroke" strokeWidth="3" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {isEnded ? (
                      <Link 
                        href="https://play.google.com/store/apps/details?id=top.booka.app" 
                        target="_blank"
                        className="bg-[#FF007A] hover:bg-[#D40066] text-white px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95"
                      >
                        Слухати далі →
                      </Link>
                    ) : (
                      <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform group">
                        {isPlaying ? (
                          <svg className="w-5 h-5 fill-[#FF007A]" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                        ) : (
                          <svg className="w-5 h-5 fill-current group-hover:text-[#FF007A]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isEnded && (
                  <div className="w-full">
                    <div ref={progressBarRef} onClick={handleProgressClick} className="w-full h-1 bg-slate-700/60 rounded-full relative cursor-pointer group">
                      <div className="absolute left-0 top-0 h-full bg-[#FF007A] rounded-full shadow-[0_0_8px_rgba(255,0,122,0.6)] transition-all" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-500 mt-2 font-mono">
                      <span>{formatTime(currentTime)}</span>
                      <span className="text-[#FF007A]/60">ГЛАВА 1</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* КНОПКИ ПЕРЕХОДУ (Завжди видимі) */}
          <div className="lg:col-span-1 flex flex-col justify-center gap-3">
            <Link 
              href="https://play.google.com/store/apps/details?id=top.booka.app" 
              target="_blank"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-5 h-5" alt="Play Store" />
              <div className="text-left">
                <p className="text-[7px] text-slate-400 uppercase leading-none mb-1">Завантажити</p>
                <p className="text-[9px] font-bold group-hover:text-[#FF007A] transition-colors leading-none">Google Play</p>
              </div>
            </Link>
            <Link 
              href="https://www.youtube.com/@booka_top" 
              target="_blank"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
            >
              <svg className="w-5 h-5 fill-[#FF0000]" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <div className="text-left">
                <p className="text-[7px] text-slate-400 uppercase leading-none mb-1">Підписатися</p>
                <p className="text-[9px] font-bold group-hover:text-white transition-colors leading-none">YouTube</p>
              </div>
            </Link>
          </div>
        </div>

        {/* НАВІГАТОР ІСТОРІЙ */}
        <div className="relative z-10 mb-10 opacity-80">
          <p className="text-[#FF007A] font-bold text-[10px] uppercase tracking-[0.2em] mb-4 text-center md:text-left">
            Спробуйте інші жанри
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {genres.map((genre) => (
              <Link 
                key={genre.id} 
                href={`/catalog?genre=${genre.id}`}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Нижня панель */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] pt-8 relative z-10 border-t border-slate-800/50">
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#FF007A] transition">Про проект</Link>
            <Link href="#" className="hover:text-[#FF007A] transition">Авторам</Link>
            <Link href="#" className="hover:text-[#FF007A] transition">Підтримка</Link>
          </div>
          <div className="font-medium tracking-normal text-slate-600 italic">Booka — твій світ аудіоісторій.</div>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF007A] transition-all cursor-pointer text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF007A] transition-all cursor-pointer text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </div>
          </div>
        </div>
      </footer>
    </section>
  );
}