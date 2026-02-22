"use client";

import { usePlayer } from "@/context/PlayerContext";
import Player from "./Player";
import Link from 'next/link';

export default function GlobalPlayerWrapper() {
  const { 
    activeBook, 
    isPlaying, 
    isPlayerVisible, 
    isEnded, 
    togglePlay, 
    currentTime, 
    duration, 
    handleSeek, 
    closePlayer 
  } = usePlayer();
  
  if (!isPlayerVisible) return null;

  const handleFullClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closePlayer(); 
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:w-[420px] z-[100]">
      {isEnded ? (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          
          <button 
            onClick={handleFullClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all z-20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-24 rounded-lg overflow-hidden mb-4 shadow-xl border border-white/5 opacity-50 grayscale">
               <img src={activeBook.cover} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="mb-6">
              <span className="text-[#FF007A] font-bold text-[9px] uppercase tracking-[0.2em] mb-2 block">
                Перша глава завершена
              </span>
              <h4 className="text-white font-serif italic text-xl leading-tight px-4">
                Бажаєте дізнатися, що було далі?
              </h4>
            </div>

            <div className="grid grid-cols-1 w-full gap-3">
              <Link 
                href="https://play.google.com/store/apps/details?id=top.booka.app" 
                target="_blank"
                className="flex items-center justify-center gap-3 bg-[#FF007A] text-white py-4 rounded-2xl hover:bg-[#D40066] transition-all active:scale-95"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-4 h-4 brightness-0 invert" alt="" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Продовжити в додатку</span>
              </Link>

              <Link 
                href="https://www.youtube.com/@booka_top" 
                target="_blank"
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 fill-[#FF0000]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-widest">На YouTube канал</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Player 
          activeBook={activeBook} 
          setActiveBook={closePlayer} 
          isPlaying={isPlaying} 
          togglePlay={togglePlay} 
          currentTime={currentTime} 
          duration={duration} 
          onSeek={handleSeek} 
        />
      )}
    </div>
  );
}