"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F9FF] flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full text-center space-y-12">
          
          {/* Анімована ілюстрація 404 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <h1 className="text-[12rem] md:text-[18rem] font-black text-[#000066c7]/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl md:text-6xl">📖</div>
            </div>
          </motion.div>

          {/* Текстовий блок */}
          <div className="space-y-4 relative z-10 -mt-10 md:-mt-20">
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#000066c7]">
              Цей сюжет повернув не туди...
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Сторінку не знайдено, але ваші улюблені герої та сотні захоплюючих історій чекають на вас у нашому додатку.
            </p>
          </div>

          {/* Головні кнопки переходу (Conversion Cluster) */}
          <div className="flex flex-col items-center gap-8 pt-6">
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="https://play.google.com/store/apps/details?id=top.booka.app" 
                target="_blank"
                className="transition-transform hover:scale-105 active:scale-95 shadow-2xl rounded-2xl overflow-hidden"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Скачати в Google Play" 
                  className="h-16" 
                />
              </Link>
              
              <Link 
                href="https://www.youtube.com/@booka_top" 
                target="_blank"
                className="bg-[#FF0000] px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs text-white flex items-center gap-4 hover:bg-[#cc0000] transition-all shadow-xl shadow-red-900/20 active:scale-95"
              >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Слухати на YouTube
              </Link>
            </div>

            {/* Запасний варіант — повернутися в каталог */}
            <Link 
              href="/catalog" 
              className="text-[#FF007A] font-bold text-xs uppercase tracking-[0.3em] hover:opacity-70 transition-opacity border-b-2 border-[#FF007A]/20 pb-1"
            >
              Повернутися до каталогу фрагментів
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}