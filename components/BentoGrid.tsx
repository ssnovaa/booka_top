"use client";

import React from 'react';
import { Audiobook, audiobooks } from '../data/audiobooks';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Імпортуємо motion

interface BentoGridProps {
  setActiveBook: (book: Audiobook) => void;
}

// Варіанти анімації для контейнера (керує черговістю)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Затримка 0.1с між кожним елементом
    },
  },
};

// Варіанти анімації для кожної окремої картки
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function BentoGrid({ setActiveBook }: BentoGridProps) {
  // Дані залишаємо ті ж самі
  const popularBookOfMonth = audiobooks[0];
  const youtubeRow = [
    { id: 'v1', title: 'Booka Radio: Lo-fi для читання', thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600&auto=format&fit=crop' },
    { id: 'v2', title: 'Огляд: Психологія впливу', thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop' },
    { id: 'v3', title: 'Інтерв’ю з авторами', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop' },
  ];
  const shorts = [
    { id: 'sh1', title: 'Топ трилери 🔥', thumbnail: 'https://images.unsplash.com/photo-1521302340133-cf7b2972320d?q=80&w=600&fit=crop' },
    { id: 'sh2', title: 'Як читати швидше', thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&fit=crop' },
    { id: 'sh3', title: 'Анонс: Новий реліз', thumbnail: audiobooks[2].cover },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Анімація спрацює, коли користувач дійшов до сітки скролом
      viewport={{ once: true, margin: "-100px" }} // Спрацює один раз
      className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto"
    >
      
      {/* 1. ГОЛОВНИЙ АКЦЕНТ */}
      <motion.div 
        variants={itemVariants}
        onClick={() => setActiveBook(popularBookOfMonth)}
        className="md:col-span-3 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl h-full"
      >
        <div className="relative w-full h-full aspect-[2/3] md:aspect-auto min-h-[400px]">
          <Image src={popularBookOfMonth.cover} alt={popularBookOfMonth.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white mb-2">{popularBookOfMonth.title}</h3>
          <p className="text-slate-300 text-sm">{popularBookOfMonth.author}</p>
        </div>
      </motion.div>

      {/* 2. РЯД YOUTUBE */}
      <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
        {youtubeRow.map((video) => (
          <motion.div key={video.id} variants={itemVariants} className="relative group cursor-pointer">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-200">
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
            <h4 className="mt-3 text-xs font-bold text-slate-800 line-clamp-2">{video.title}</h4>
          </motion.div>
        ))}
        
        <motion.button variants={itemVariants} className="relative aspect-video rounded-3xl bg-[#FF007A]/5 border-2 border-dashed border-[#FF007A]/20 flex flex-col items-center justify-center gap-2 group hover:bg-[#FF007A]/10 transition-all">
          <div className="w-10 h-10 rounded-full bg-[#FF007A] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </div>
          <span className="text-xs font-bold text-[#FF007A]">Більше</span>
        </motion.button>
      </div>

      {/* 3. РЯД SHORTS ТА ТЕКСТОВИЙ БЛОК */}
      <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
        {shorts.map((short) => (
          <motion.div key={short.id} variants={itemVariants} className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer shadow-md">
            <Image src={short.thumbnail} alt={short.title} fill className="object-cover group-hover:scale-105 transition-transform opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-[10px] md:text-xs leading-tight">{short.title}</div>
            <div className="absolute top-3 right-3 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M10 9.5l4.5 2.5-4.5 2.5v-5z"/></svg>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[2.5rem] p-6 flex flex-col justify-between text-white shadow-xl relative overflow-hidden">
           <h3 className="text-xl font-bold leading-tight relative z-10">Зараз <br/> слухають</h3>
           <div className="flex items-center gap-2 relative z-10">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-indigo-500 bg-slate-400" />)}
              </div>
              <span className="text-[10px] font-medium">+1.2k</span>
           </div>
           <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        </motion.div>
      </div>

    </motion.div>
  );
}