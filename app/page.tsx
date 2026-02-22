// app/page.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import BentoGrid2 from '../components/BentoGrid2';
import Collaboration from '../components/Collaboration';
import Footer from '../components/Footer';

// Імпортуємо наші серверні функції для отримання даних
import { getYoutubeData, getAppBooks, getGenres } from '../lib/api';

export default async function Home() {
  // 🚀 ШАГ 1: Паралельне отримання всіх даних на сервері
  // Next.js закешує ці запити згідно з налаштуваннями revalidate у lib/api.tsx
  const [youtubeData, appBooksData, genresData] = await Promise.all([
    getYoutubeData(),
    getAppBooks(),
    getGenres()
  ]);

  // Фільтруємо жанри (якщо вони знадобляться для відображення)
  const activeGenres = Array.isArray(genresData) 
    ? genresData.filter((g: any) => g.books_count > 0).slice(0, 6)
    : [];

  return (
    <main className="min-h-screen bg-[#F8F9FF] text-slate-800 font-sans pb-40 relative">
      <Header />
      <Hero />
      
      {/* 1. БЕНТО 2: КНИГИ ДОДАТКУ */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24"> 
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-5xl md:text-5xl font-normal text-[#000066c7] font-serif mb-6 leading-tight">
            Сучасні жіночі романи, історії кохання та щастя
          </h2>
          <p className="text-[#634b06e8] text-base md:text-lg max-w-2xl mx-auto">
            Встановлюйте додаток Booka Radio, щоб мати доступ до повної бібліотеки та слухати нові релізи разом із нами
          </p>
        </div>
        {/* Передаємо завантажені на сервері книги */}
        <BentoGrid2 initialData={appBooksData} />
      </div>

      {/* 2. БЕНТО 1: YOUTUBE */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-5xl md:text-5xl font-normal text-[#000066c7] font-serif mb-6 leading-tight">
            Наш канал Booka Radio на YouTube
          </h2>
          <p className="text-[#634b06e8] max-w-3xl mx-auto">
            Приєднуйтесь до найбільшої спільноти шанувальників жіночої аудіокниги в Україні. 
            Найпопулярніший YouTube-канал з сучасними романами, підкастами та ексклюзивними оглядами українською мовою.
          </p>
        </div>
        {/* Передаємо завантажені дані YouTube */}
        <BentoGrid initialData={youtubeData} />
      </div>

      {/* 3. РОЗДІЛ: СПІВПРАЦЯ */}
      <div className="mt-24 md:mt-32">
        <Collaboration />
      </div>

      {/* 4. ФУТЕР */}
      <div className="mt-32 md:mt-40">
        <Footer />
      </div>
    </main>
  );
}