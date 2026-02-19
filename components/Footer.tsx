import React, { useRef } from 'react';
import { Audiobook } from '../data/audiobooks';

interface FooterProps {
  displayBook: Audiobook;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function Footer({ displayBook, isPlaying, togglePlay, currentTime, duration, onSeek }: FooterProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const safeDuration = duration > 0 ? duration : 100; 
      onSeek((clickX / rect.width) * safeDuration);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const cardiogramPath = "M 0 30 L 30 30 L 40 10 L 50 50 L 60 5 L 70 55 L 80 15 L 90 40 L 100 25 L 110 30 L 150 30";

  return (
    <section className="max-w-7xl mx-auto px-6">
      <style>{`
        @keyframes eq-jerk { 0% { transform: scaleY(0.2); } 15% { transform: scaleY(1.3); } 30% { transform: scaleY(0.4); } 45% { transform: scaleY(1.5); } 60% { transform: scaleY(0.2); } 75% { transform: scaleY(1.2); } 90% { transform: scaleY(0.6); } 100% { transform: scaleY(0.2); } }
        .animate-eq { animation: eq-jerk 0.8s linear infinite; transform-origin: center; }
      `}</style>

      <h2 className="text-3xl font-bold text-center text-slate-900 mb-8 font-serif">Чому обирають Booka?</h2>
      
      <footer className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF007A]/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6 items-center border-b border-slate-700/50 pb-12 mb-8 relative z-10">
          
          <div className="text-center md:text-left flex flex-col items-center md:items-start lg:col-span-1">
            <p className="font-bold mb-4 text-sm">Завантажити додаток</p>
            <div className="bg-white p-2 rounded-xl w-24 h-24 mb-3 flex items-center justify-center">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://booka.top" alt="QR Code" className="w-full h-full rounded-lg" />
            </div>
            <div className="flex gap-2 text-[10px] text-slate-400">
              <span className="border border-slate-700 rounded-md px-2 py-1 flex items-center gap-1"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13.12 4.22c.7-.84 1.17-2.01 1.04-3.18-1.01.04-2.25.67-2.98 1.54-.65.77-1.2 1.98-1.04 3.12 1.12.09 2.28-.64 2.98-1.48"/></svg> App Store</span>
              <span className="border border-slate-700 rounded-md px-2 py-1 flex items-center gap-1"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zM21.5 12c0-.83-.67-1.5-1.5-1.5h-9v3h9c.83 0 1.5-.67 1.5-1.5zM11 5L18 12l-7 7V5z"/></svg> Google Play</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:col-span-1">
            <div className="w-14 h-14 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
              <svg className="w-6 h-6 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </div>
            <p className="font-bold text-xs">Професійна <br/> озвучка</p>
          </div>

          {/* ПЛЕЄР: ЗМЕНШЕНИЙ НА 10% */}
          <div className="flex justify-center lg:col-span-2">
             <div className="relative w-full max-w-[380px] bg-[#1E192A]/60 backdrop-blur-2xl rounded-[1.25rem] border border-white/10 p-4 flex flex-col gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                
                {/* ВЕРХНЯ ЧАСТИНА: Висота зменшена з h-24 до h-20 */}
                <div className="flex items-center gap-4 h-20 w-full">
                  
                  {/* Обкладинка: w-14 h-20 замість w-16 h-24 */}
                  <div className="w-14 h-20 rounded-lg overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] flex-shrink-0 relative z-10 border border-white/5">
                    <img src={displayBook.cover} alt="cover" className="w-full h-full object-cover" />
                  </div>

                  {/* Еквалайзер */}
                  <div className="flex-1 h-full relative flex items-center justify-center z-0 ml-3">
                     <svg viewBox="0 0 150 60" className={`w-full h-full text-[#FF007A] ${isPlaying ? 'animate-eq drop-shadow-[0_0_8px_rgba(255,0,122,1)]' : 'drop-shadow-[0_0_4px_rgba(255,0,122,0.5)]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
                       <path d={cardiogramPath} vectorEffect="non-scaling-stroke" strokeWidth="2.5" />
                     </svg>
                  </div>

                  {/* КНОПКА PLAY (трохи зменшена) */}
                  <div className="flex items-center flex-shrink-0 z-10 pl-1">
                    <button onClick={togglePlay} className={`transition-all duration-300 focus:outline-none flex items-center justify-center ${isPlaying ? 'text-[#FF007A] drop-shadow-[0_0_10px_rgba(255,0,122,0.8)] scale-110' : 'text-slate-300 hover:text-white'}`}>
                      {isPlaying ? (
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                      ) : (
                        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* НИЖНЯ ЧАСТИНА: СИКБАР */}
                <div className="flex items-center w-full mt-1.5">
                  <div 
                    ref={progressBarRef} 
                    onClick={handleProgressClick} 
                    className="flex-1 py-2 cursor-pointer group flex items-center relative z-20"
                  >
                    <div className="w-full h-1 bg-slate-700/60 rounded-full relative pointer-events-none">
                      <div 
                        className="absolute left-0 top-0 h-full bg-[#FF007A] rounded-full drop-shadow-[0_0_8px_rgba(255,0,122,0.9)] transition-all ease-linear"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                      {/* Крапка: w-3 h-3 замість w-3.5 h-3.5 */}
                      <div 
                        className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1),0_0_12px_rgba(255,0,122,1)]"
                        style={{ left: `${progressPercent}%`, transform: 'translate(-50%, -50%)' }}
                      ></div>
                    </div>
                  </div>
                </div>

             </div>
          </div>

          <div className="flex flex-col items-center text-center lg:col-span-1">
            <div className="w-14 h-14 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
              <svg className="w-6 h-6 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <p className="font-bold text-xs">Унікальні <br/> історії</p>
          </div>

          <div className="flex flex-col items-center text-center lg:col-span-1">
            <div className="w-14 h-14 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
              <svg className="w-6 h-6 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <p className="font-bold text-xs">Зручне <br/> прослуховування</p>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 relative z-10 border-t border-slate-700/50 pt-8 mt-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Про нас</a>
            <a href="#" className="hover:text-white transition">Авторам</a>
          </div>
          <div>booka.top © 2026</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">Контакти</a>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF007A] hover:text-white transition">FB</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF007A] hover:text-white transition">IG</div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}