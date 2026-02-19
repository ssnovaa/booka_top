"use client"; 

import React, { useState } from 'react';

// Импортируем все наши компоненты-кубики
import Header from '../components/Header';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import Player from '../components/Player';

// Импортируем тип книги для TypeScript
import { Audiobook } from '../data/audiobooks';

export default function Home() {
  // Наша единственная переменная состояния: какая книга сейчас выбрана
  const [activeBook, setActiveBook] = useState<Audiobook | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FF] to-[#f3e8ff] text-slate-800 font-sans pb-40 relative">
      
      {/* 1. Верхнее меню */}
      <Header />

      {/* 2. Главный баннер с девушкой */}
      <Hero />

      {/* 3. Центральная сложная сетка (передаем функцию переключения книги) */}
      <BentoGrid setActiveBook={setActiveBook} />

      {/* 4. Темный подвал сайта */}
      <Footer />

      {/* 5. Выезжающий аудиоплеер (передаем текущую книгу и функцию закрытия) */}
      <Player activeBook={activeBook} setActiveBook={setActiveBook} />

    </main>
  );
}