"use client"; 

import React, { useState } from 'react';

const audiobooks = [
  {
    id: 1, title: "Помста під гострим соусом", author: "Аля Морейно",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2, title: "Ти! Моя друга весна", author: "Іва Ніч",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3, title: "Буду кохати", author: "Ольга Лавін",
    cover: "https://images.unsplash.com/photo-1629196914225-ebdf075fb862?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4, title: "Казка про заморського принца", author: "Тая Стрельцова",
    cover: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Home() {
  const [activeBook, setActiveBook] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FF] to-[#f3e8ff] text-slate-800 font-sans pb-40">
      
      {/* Навигация (Header) */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-3xl font-bold tracking-tighter text-[#FF007A]">
          Booka<span className="text-slate-800">.top</span>
        </div>
        <div className="hidden md:flex gap-6 font-medium text-slate-600">
          <a href="#" className="hover:text-[#FF007A] transition">Каталог</a>
          <a href="#" className="hover:text-[#FF007A] transition">Авторам</a>
          <a href="#" className="hover:text-[#FF007A] transition">YouTube</a>
        </div>
        <button className="bg-[#FF007A] text-white px-6 py-2.5 rounded-full font-medium shadow-[0_0_20px_rgba(255,0,122,0.3)] hover:brightness-110 transition">
          Завантажити додаток
        </button>
      </nav>

      {/* Главный экран (Hero Section) */}
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

      {/* --- НОВИЙ ЦЕНТРАЛЬНИЙ БЛОК: BENTO GRID ЯК НА МАКЕТІ --- */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        
        {/* Великий контейнер-підкладка */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[3rem] p-6 lg:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.02)]">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif ml-4">
            Новинки на YouTube
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* 1. Ліва велика картка (Featured) */}
            <div className="w-full lg:w-1/4">
              <div className="bg-gradient-to-b from-white/60 to-white/30 border border-white/80 rounded-[2.5rem] p-6 flex flex-col items-center justify-between h-full shadow-sm hover:shadow-[0_0_30px_rgba(255,0,122,0.15)] transition-all group">
                {/* М'яке світіння за книгою */}
                <div className="relative w-full aspect-[2/3] mb-6 mt-4">
                  <div className="absolute inset-0 bg-[#FF007A]/20 blur-2xl rounded-full scale-90 group-hover:scale-100 transition-transform"></div>
                  <img src={audiobooks[0].cover} alt="Обкладинка" className="relative z-10 w-full h-full object-cover rounded-2xl shadow-lg" />
                </div>
                <button onClick={() => setActiveBook(audiobooks[0])} className="w-full bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white py-3.5 rounded-2xl font-bold shadow-[0_4px_15px_rgba(255,0,122,0.3)] hover:scale-105 transition transform text-sm">
                  Слухати 1 розділ
                </button>
              </div>
            </div>

            {/* 2. Права частина сітки */}
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
              
              {/* Ряд з відео YouTube */}
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[1,2,3,4].map((item) => (
                  <div key={item} className="flex-shrink-0 w-48 bg-slate-900 rounded-2xl p-2 relative group cursor-pointer overflow-hidden shadow-md">
                    <img src={`https://images.unsplash.com/photo-[РАНДОМ]?q=80&w=300&auto=format&fit=crop`} alt="YouTube Video" className="w-full h-24 object-cover rounded-xl opacity-60 group-hover:opacity-80 transition bg-slate-800" />
                    {/* Кнопка Play по центру */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 text-white text-xs font-bold">Booka Radio</div>
                    <div className="mt-2 px-1">
                      <h4 className="text-white text-xs font-medium truncate">Назва відео номер {item}</h4>
                      <p className="text-slate-400 text-[10px]">Романтика</p>
                    </div>
                  </div>
                ))}
                
                {/* Кнопка "Дивитись більше" */}
                <button className="flex-shrink-0 bg-[#FF007A] text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_4px_15px_rgba(255,0,122,0.3)] hover:brightness-110 transition h-24 self-start mt-2">
                  Дивитись більше
                </button>
              </div>

              {/* Нижня частина: Текстовий блок + маленькі картки */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                
                {/* Колонка карток 1 */}
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

                {/* Центральний великий текстовий блок */}
                <div className="bg-white/70 border border-white/80 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">Зараз час <br/> слухати...</h3>
                    <p className="text-sm text-slate-500 mb-6">Відкрий для себе нові світи разом із найкращими сучасними романами. Твій ідеальний вечір починається тут.</p>
                  </div>
                  <button onClick={() => setActiveBook(audiobooks[0])} className="relative z-10 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition w-2/3">
                    Слухати 1 розділ
                  </button>
                  {/* Декоративний градієнт знизу як на макеті */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#8B5CF6]/30 to-transparent"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FF007A]/20 blur-3xl rounded-full"></div>
                </div>

                {/* Колонка карток 2 */}
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
      {/* --- КІНЕЦЬ BENTO GRID --- */}

      {/* --- ФУТЕР (Зберігся без змін) --- */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8 font-serif">Чому обирають Booka?</h2>
        <footer className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF007A]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 items-center border-b border-slate-700/50 pb-12 mb-8 relative z-10">
            <div className="text-center md:text-left flex flex-col items-center md:items-start lg:col-span-1">
              <p className="font-bold mb-4">Завантажити додаток Booka</p>
              <div className="bg-white p-2 rounded-xl w-28 h-28 mb-3 flex items-center justify-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://booka.top" alt="QR Code" className="w-full h-full rounded-lg" />
              </div>
              <div className="flex gap-2 text-xs text-slate-400">
                <span className="border border-slate-700 rounded-md px-2 py-1 flex items-center gap-1"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13.12 4.22c.7-.84 1.17-2.01 1.04-3.18-1.01.04-2.25.67-2.98 1.54-.65.77-1.2 1.98-1.04 3.12 1.12.09 2.28-.64 2.98-1.48"/></svg> App Store</span>
                <span className="border border-slate-700 rounded-md px-2 py-1 flex items-center gap-1"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zM21.5 12c0-.83-.67-1.5-1.5-1.5h-9v3h9c.83 0 1.5-.67 1.5-1.5zM11 5L18 12l-7 7V5z"/></svg> Google Play</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
                <svg className="w-8 h-8 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </div>
              <p className="font-bold text-sm">Професійна <br/> озвучка</p>
            </div>
            <div className="flex justify-center lg:col-span-1">
               <div className="w-full max-w-[200px] h-20 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center p-3 gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-md"></div>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <div className="w-full h-1 bg-[#FF007A] rounded-full shadow-[0_0_8px_rgba(255,0,122,0.8)] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="w-3/4 h-1 bg-slate-600 rounded-full"></div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
                <svg className="w-8 h-8 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <p className="font-bold text-sm">Унікальні <br/> історії</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border border-[#FF007A] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
                <svg className="w-8 h-8 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <p className="font-bold text-sm">Зручне <br/> прослуховування</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 relative z-10">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Про нас</a>
              <a href="#" className="hover:text-white transition">Авторам</a>
            </div>
            <div>booka.top © 2026</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">Контакти</a>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF007A] hover:text-white transition">FB</div>
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF007A] hover:text-white transition">IG</div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* --- ПЛЕЄР (Зберігся без змін) --- */}
      {activeBook && (
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
      )}

    </main>
  );
}