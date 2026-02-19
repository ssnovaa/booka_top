import React from 'react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-6 pb-12">
      <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-full md:w-1/2 relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden bg-slate-100">
          <img src="https://images.unsplash.com/photo-1516280440503-a2f55979bc37?q=80&w=800&auto=format&fit=crop" alt="Дівчина слухає аудіокнигу" className="w-full h-full object-cover" />
          <div className="absolute top-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/50 flex items-center justify-center shadow-[0_0_25px_rgba(255,0,122,0.5)] animate-bounce" style={{ animationDuration: '3s' }}>
            <svg className="w-7 h-7 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 pb-8 md:pb-0 md:pr-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
            Booka. Твої улюблені історії <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] to-[#8B5CF6]">у твоєму ритмі</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="w-full sm:w-auto bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white px-8 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,122,0.35)] hover:scale-105 transition transform text-lg">
              Завантажити додаток
            </button>
            <button className="w-full sm:w-auto bg-white text-slate-800 px-8 py-4 rounded-full font-bold shadow-md border border-slate-100 hover:shadow-lg transition flex items-center justify-center gap-3 group text-lg">
              Дивитись на YouTube
              <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {["Романи", "Психологія", "Детективи", "Для дітей", "Фантастика", "Підбірки"].map((cat, i) => (
          <button key={i} className="px-6 py-2 rounded-full font-medium bg-white/50 border border-[#FF007A]/20 text-slate-700 hover:bg-white hover:text-[#FF007A] hover:border-[#FF007A]/50 hover:shadow-[0_0_15px_rgba(255,0,122,0.15)] transition">
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}