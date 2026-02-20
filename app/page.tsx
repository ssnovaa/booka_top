"use client"; 

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import GenreSwitcher from '../components/GenreSwitcher'; // Додали імпорт
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
  const { playBook } = usePlayer();

  return (
    <main className="min-h-screen bg-[#F8F9FF] text-slate-800 font-sans pb-40 relative">
      <Header />
      <Hero />
      
      {/* ПЕРЕМИКАЧ ЖАНРІВ */}
      <GenreSwitcher />
      
      {/* СІТКА КНИГ */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Популярне зараз</h2>
        <BentoGrid setActiveBook={playBook} />
      </div>
      
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}