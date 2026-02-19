import React from 'react';
import { audiobooks, Audiobook } from '../data/audiobooks';

interface BentoGridProps {
  setActiveBook: (book: Audiobook) => void;
}

export default function BentoGrid({ setActiveBook }: BentoGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[3rem] p-6 lg:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.02)]">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif ml-4">Новинки на YouTube</h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-gradient-to-b from-white/60 to-white/30 border border-white/80 rounded-[2.5rem] p-6 flex flex-col items-center justify-between h-full shadow-sm hover:shadow-[0_0_30px_rgba(255,0,122,0.15)] transition-all group">
              <div className="relative w-full aspect-[2/3] mb-6 mt-4">
                <div className="absolute inset-0 bg-[#FF007A]/20 blur-2xl rounded-full scale-90 group-hover:scale-100 transition-transform"></div>
                <img src={audiobooks[0].cover} alt="Обкладинка" className="relative z-10 w-full h-full object-cover rounded-2xl shadow-lg" />
              </div>
              <button onClick={() => setActiveBook(audiobooks[0])} className="w-full bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white py-3.5 rounded-2xl font-bold shadow-[0_4px_15px_rgba(255,0,122,0.3)] hover:scale-105 transition transform text-sm">
                Слухати 1 розділ
              </button>
            </div>
          </div>
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1,2,3,4].map((item) => (
                <div key={item} className="flex-shrink-0 w-48 bg-slate-900 rounded-2xl p-2 relative group cursor-pointer overflow-hidden shadow-md">
                  <img src={`https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop`} alt="YouTube Video" className="w-full h-24 object-cover rounded-xl opacity-60 group-hover:opacity-80 transition bg-slate-800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition"><svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                  </div>
                  <div className="absolute top-4 left-4 text-white text-xs font-bold">Booka Radio</div>
                  <div className="mt-2 px-1"><h4 className="text-white text-xs font-medium truncate">Назва відео номер {item}</h4><p className="text-slate-400 text-[10px]">Романтика</p></div>
                </div>
              ))}
              <button className="flex-shrink-0 bg-[#FF007A] text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_4px_15px_rgba(255,0,122,0.3)] hover:brightness-110 transition h-24 self-start mt-2">Дивитись більше</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              <div className="flex flex-col gap-6">
                <div className="bg-white/60 border border-white/80 rounded-3xl p-4 flex gap-4 items-center shadow-sm">
                  <img src={audiobooks[1].cover} className="w-16 h-24 object-cover rounded-xl shadow-sm" alt="cover"/>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">{audiobooks[1].title}</h4>
                    <p className="text-xs text-[#FF007A] mb-2">{audiobooks[1].author}</p>
                    <button onClick={() => setActiveBook(audiobooks[1])} className="bg-[#FF007A] text-white text-[10px] px-4 py-1.5 rounded-full font-bold">Слухати 1 розділ</button>
                  </div>
                </div>
                <div className="bg-white/60 border border-white/80 rounded-3xl p-4 flex gap-4 items-center shadow-sm">
                  <img src={audiobooks[2].cover} className="w-16 h-24 object-cover rounded-xl shadow-sm" alt="cover"/>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">{audiobooks[2].title}</h4>
                    <p className="text-xs text-[#FF007A] mb-2">{audiobooks[2].author}</p>
                    <button onClick={() => setActiveBook(audiobooks[2])} className="bg-white border border-[#FF007A] text-[#FF007A] text-[10px] px-4 py-1.5 rounded-full font-bold">Слухати 1 розділ</button>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 border border-white/80 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="relative z-10"><h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">Зараз час <br/> слухати...</h3><p className="text-sm text-slate-500 mb-6">Відкрий для себе нові світи разом із найкращими сучасними романами. Твій ідеальний вечір починається тут.</p></div>
                <button onClick={() => setActiveBook(audiobooks[0])} className="relative z-10 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition w-2/3">Слухати 1 розділ</button>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#8B5CF6]/30 to-transparent"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FF007A]/20 blur-3xl rounded-full"></div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-white/60 border border-white/80 rounded-3xl p-4 flex flex-col items-center text-center shadow-sm h-full justify-center">
                  <img src={audiobooks[3].cover} className="w-20 h-28 object-cover rounded-xl shadow-sm mb-3" alt="cover"/>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">{audiobooks[3].title}</h4>
                  <p className="text-xs text-[#FF007A] mb-3">{audiobooks[3].author}</p>
                  <button onClick={() => setActiveBook(audiobooks[3])} className="w-full bg-[#8B5CF6] text-white text-[10px] py-2 rounded-xl font-bold shadow-md">Слухати 1 розділ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}