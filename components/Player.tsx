import React from 'react';
import { Audiobook } from '../data/audiobooks';

interface PlayerProps {
  activeBook: Audiobook | null;
  setActiveBook: (book: Audiobook | null) => void;
}

export default function Player({ activeBook, setActiveBook }: PlayerProps) {
  // Если книга не выбрана - вообще не рисуем плеер
  if (!activeBook) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pb-6 sm:pb-8 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_-10px_40px_rgba(255,0,122,0.15)] p-3 sm:p-4 flex items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
          <img src={activeBook.cover} alt="cover" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">{activeBook.title}</h4>
          <p className="text-xs text-[#FF007A] truncate">{activeBook.author}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="text-slate-400 hover:text-[#FF007A] transition hidden sm:block">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full text-white shadow-lg hover:scale-105 transition transform">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button className="text-slate-400 hover:text-[#FF007A] transition hidden sm:block">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
          </button>
        </div>
        <div className="hidden lg:flex flex-1 items-center px-4">
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full"></div>
            </div>
            <span className="text-xs text-slate-400 ml-3">04:12 / 15:30</span>
        </div>
        <button onClick={() => setActiveBook(null)} className="ml-2 p-2 text-slate-400 hover:text-slate-800 transition rounded-full hover:bg-slate-100">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    </div>
  );
}