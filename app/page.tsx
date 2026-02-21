"use client"; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import BentoGrid2 from '../components/BentoGrid2';
import Collaboration from '../components/Collaboration'; // 🚀 Імпортуємо новий розділ
import Footer from '../components/Footer';
import { usePlayer } from '../context/PlayerContext';

interface Genre {
  id: number;
  name: string;
  image_url: string;
  books_count: number;
}

export default function Home() {
  const { playBook } = usePlayer();
  const [genres, setGenres] = useState<Genre[]>([]);

  const formatImageUrl = (raw: string | null) => {
    if (!raw) return null;
    let s = raw.trim();
    if (s.startsWith('http')) return s;
    s = s.replace(/^\/+/, '');
    if (!s.startsWith('storage/')) s = 'storage/' + s;
    return `https://app.booka.top/${s}`;
  };

  useEffect(() => {
    fetch('/api/genres')
      .then(res => res.json())
      .then(data => {
        setGenres(data.filter((g: Genre) => g.books_count > 0).slice(0, 6));
      })
      .catch(err => console.error("Помилка жанрів:", err));
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FF] text-slate-800 font-sans pb-40 relative">
      <Header />
      <Hero />
      
      {/* 1. БЕНТО 2: КНИГИ ДОДАТКУ */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24"> 
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-5xl md:text-5xl font-normal text-[#000066c7] font-serif mb-6">
            Сучасні жіночі романи, історії кохання та щастя
          </h2>
          <p className="text-[#634b06e8] text-base md:text-lg max-w-2xl mx-auto">
            Встановлюйте додаток Booka Radio, щоб мати доступ до повної бібліотеки та слухати нові релізи разом із нами
          </p>
        </div>
        <BentoGrid2 setActiveBook={playBook} />
      </div>

      {/* 2. НОВИЙ РОЗДІЛ: ЖАНРИ (можна додати пізніше або використати GenresGrid) */}
      
      {/* 3. БЕНТО 1: YOUTUBE */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-5xl md:text-5xl font-normal text-[#000066c7] font-serif mb-6">
            Наш канал Booka Radio на YouTube
          </h2>
          <p className="text-[#634b06e8] max-w-3xl mx-auto">
            Приєднуйтесь до найбільшої спільноти шанувальників жіночої аудіокниги в Україні. 
            Найпопулярніший YouTube-канал з сучасними романами, підкастами та ексклюзивними оглядами українською мовою.
          </p>
        </div>
        <BentoGrid setActiveBook={playBook} />
      </div>

      {/* 4. РОЗДІЛ: СПІВПРАЦЯ (SEO ОПТИМІЗОВАНИЙ) */}
      <div className="mt-24 md:mt-32">
        <Collaboration />
      </div>

      {/* 5. ФУТЕР */}
      <div className="mt-32 md:mt-40">
        <Footer />
      </div>
    </main>
  );
}