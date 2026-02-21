"use client";

import React, { useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export default function Player() {
  const { 
    activeBook, 
    isPlaying, 
    isPlayerVisible, 
    togglePlay, 
    currentTime, 
    duration, 
    handleSeek, 
    setPlayerVisible 
  } = usePlayer();

  // Створюємо окремі рефи для десктопної та мобільної ліній
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  if (!activeBook || !isPlayerVisible) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Універсальна функція перемотування
  const onSeekInternal = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const safeDuration = duration > 0 ? duration : 100;
      handleSeek((clickX / rect.width) * safeDuration);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 🇺🇦 Нова функція: Зупиняємо аудіо і ховаємо плеєр
  const handleClose = () => {
    if (isPlaying) {
      togglePlay(); // Ставимо на паузу, якщо зараз грає
    }
    setPlayerVisible(false); // Ховаємо віконце
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 pb-8 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden relative">
        
        {/* --- МОБІЛЬНИЙ СИКБАР (ТЕПЕР ПРАЦЮЄ!) --- */}
        <div 
          ref={mobileBarRef}
          onClick={(e) => onSeekInternal(e, mobileBarRef)}
          className="absolute top-0 left-0 right-0 h-4 flex items-start cursor-pointer lg:hidden z-30 group/mobile"
        >
          {/* Фонова лінія */}
          <div className="w-full h-1 bg-slate-100 relative group-hover/mobile:h-1.5 transition-all">
            {/* Лінія прогресу */}
            <div 
              className="h-full bg-[#FF007A] transition-all duration-150 ease-linear" 
              style={{ width: `${progressPercent}%` }} 
            />
            {/* Крапка, яка з'являється при натисканні або наведенні (опційно) */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FF007A] rounded-full shadow-md scale-0 group-active/mobile:scale-100 transition-transform"
              style={{ left: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 mt-1 lg:mt-0">
          
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
            <img src={activeBook.cover} alt="cover" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate leading-tight">
              {activeBook.title}
            </h4>
            <p className="text-[10px] sm:text-xs text-[#FF007A] font-medium truncate uppercase tracking-wider">
              {activeBook.author}
            </p>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-4">
            <button className="text-slate-400 hover:text-[#FF007A] transition hidden md:block">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
            </button>

            <button 
              onClick={togglePlay} 
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-900 text-white rounded-full shadow-lg hover:bg-[#FF007A] active:scale-90 transition transform"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>

            <button className="text-slate-400 hover:text-[#FF007A] transition hidden md:block">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
            </button>
          </div>
          
          {/* --- ДЕКСКТОПНИЙ СИКБАР --- */}
          <div className="hidden lg:flex flex-1 items-center px-4 gap-3">
              <div 
                ref={desktopBarRef} 
                onClick={(e) => onSeekInternal(e, desktopBarRef)} 
                className="flex-1 py-3 cursor-pointer group flex items-center relative z-20"
              >
                <div className="w-full h-1.5 bg-slate-200 rounded-full relative pointer-events-none group-hover:h-2 transition-all">
                  <div 
                    className="absolute left-0 top-0 h-full bg-slate-900 rounded-full transition-all duration-150 ease-linear" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                  <div 
                    className="absolute top-1/2 w-3 h-3 bg-white border-2 border-slate-900 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" 
                    style={{ left: `${progressPercent}%`, transform: 'translate(-50%, -50%)' }} 
                  />
                </div>
              </div>
              <span className="text-[10px] text-slate-500 min-w-[75px] text-right font-mono font-bold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
          </div>
          
          {/* 🇺🇦 Оновлена кнопка Закрити */}
          <button 
            onClick={handleClose} 
            className="ml-1 p-2 text-slate-400 hover:text-slate-900 transition rounded-full hover:bg-slate-100"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}