"use client"; // Говорим Next.js, что тут есть интерактив (клики, стейт)

import React, { useState } from 'react';

// Наша база данных
const audiobooks = [
  {
    id: 1,
    title: "Помста під гострим соусом",
    author: "Аля Морейно",
    description: "Сучасний любовний роман. Історія про те, як випадкова зустріч може змінити всі плани на життя...",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    youtubeUrl: "https://youtu.be/1L7WHffK6e4",
    isNew: true
  },
  {
    id: 2,
    title: "Ти! Моя друга весна",
    author: "Іва Ніч",
    description: "Він - її бос. Вона - його проблема. Чи зможуть вони знайти спільну мову, коли між ними іскрить?",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    youtubeUrl: "https://youtu.be/mrKjtT4mDxY",
    isNew: false
  },
  {
    id: 3,
    title: "Буду кохати",
    author: "Ольга Лавін",
    description: "Короткий любовний роман про несподівані почуття та вибір, який доводиться робити серцем.",
    cover: "https://images.unsplash.com/photo-1629196914225-ebdf075fb862?q=80&w=600&auto=format&fit=crop",
    youtubeUrl: "https://youtu.be/ADQDnvjmdvA",
    isNew: true
  },
  {
    id: 4,
    title: "Казка про заморського принца",
    author: "Тая Стрельцова",
    description: "Чи існують принци у сучасному світі? Головна героїня дізнається це на власному досвіді.",
    cover: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop",
    youtubeUrl: "https://youtu.be/QxSO_3zSG5s",
    isNew: false
  }
];

export default function Home() {
  // Создаем "память" для плеера: какая книга сейчас играет? (изначально - никакая, null)
  const [activeBook, setActiveBook] = useState<typeof audiobooks[0] | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FF] to-[#f3e8ff] text-slate-800 font-sans pb-32">
      
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
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
          Твої улюблені історії <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] to-[#8B5CF6]">
            у твоєму ритмі
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Найбільша бібліотека сучасних аудіокниг для жінок українською мовою. 
          Слухай перші розділи безкоштовно просто зараз.
        </p>
        
        {/* Умные фильтры */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="px-6 py-2.5 rounded-full font-medium bg-white/80 backdrop-blur-md border border-white shadow-sm text-[#FF007A] hover:shadow-[0_0_15px_rgba(255,0,122,0.15)] transition">
            🔥 Хіти тижня
          </button>
          <button className="px-6 py-2.5 rounded-full font-medium bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white/80 transition">
            Сучасні романи
          </button>
          <button className="px-6 py-2.5 rounded-full font-medium bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white/80 transition">
            Драми
          </button>
        </div>
      </section>

      {/* Сетка каталога */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 font-serif">
          Гарячі новинки на <span className="text-[#FF007A]">Booka Radio</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {audiobooks.map((book) => (
            <article key={book.id} className="group relative bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl p-4 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,0,122,0.12)] hover:-translate-y-1">
              
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img src={book.cover} alt={book.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                {book.isNew && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Новинка
                  </div>
                )}
              </div>
              
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1 line-clamp-1" title={book.title}>
                {book.title}
              </h3>
              <p className="text-sm text-[#FF007A] font-medium mb-1">{book.author}</p>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{book.description}</p>
              
              <div className="flex gap-2">
                {/* При клике на кнопку, записываем эту книгу в activeBook */}
                <button 
                  onClick={() => setActiveBook(book)}
                  className="flex-1 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-[0_0_15px_rgba(255,0,122,0.4)] hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  1 розділ
                </button>
                
                <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 bg-white/80 border border-fuchsia-100 rounded-xl hover:bg-[#FF007A]/10 transition text-red-500 hover:text-red-600">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>
              
            </article>
          ))}

        </div>
      </section>

      {/* --- FLOATING AUDIO PLAYER (Стеклянный плеер снизу) --- */}
      {/* Рендерится только если activeBook не пустой */}
      {activeBook && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pb-6 sm:pb-8 animate-slide-up">
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_-10px_40px_rgba(255,0,122,0.15)] p-3 sm:p-4 flex items-center gap-4">
            
            {/* Мини-обложка */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
              <img src={activeBook.cover} alt="cover" className="w-full h-full object-cover" />
            </div>
            
            {/* Инфо о книге */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">{activeBook.title}</h4>
              <p className="text-xs text-[#FF007A] truncate">{activeBook.author}</p>
            </div>
            
            {/* Кнопки управления плеером */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="text-slate-400 hover:text-[#FF007A] transition hidden sm:block">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
              </button>
              
              <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full text-white shadow-lg hover:scale-105 transition transform">
                {/* Иконка паузы (имитация, что играет) */}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              </button>
              
              <button className="text-slate-400 hover:text-[#FF007A] transition hidden sm:block">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
              </button>
            </div>
            
            {/* Фейковый прогресс-бар (волна) */}
            <div className="hidden lg:flex flex-1 items-center px-4">
               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                 <div className="w-1/3 h-full bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full"></div>
               </div>
               <span className="text-xs text-slate-400 ml-3">04:12 / 15:30</span>
            </div>

            {/* Кнопка закрыть */}
            <button 
              onClick={() => setActiveBook(null)}
              className="ml-2 p-2 text-slate-400 hover:text-slate-800 transition rounded-full hover:bg-slate-100"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>

          </div>
        </div>
      )}

    </main>
  );
}