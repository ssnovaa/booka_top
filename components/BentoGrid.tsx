"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface BentoGridProps {
  initialData?: {
    latestYoutubeVideo: YouTubeVideo | null;
    youtubeShorts: YouTubeVideo[];
    popularVideos: YouTubeVideo[];
    popularWeekVideo: YouTubeVideo | null;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const fallbackPopular = [
  { id: 'v1', title: 'Огляд: Сучасна жіноча проза', thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000', url: '#' },
  { id: 'v2', title: 'Хіт тижня: Психологія стосунків', thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000', url: '#' },
  { id: 'v3', title: 'Як ми озвучуємо книги', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000', url: '#' },
];

const fallbackShorts = [
  { id: 's1', title: 'Естетика читання', thumbnail: 'https://images.unsplash.com/photo-1521302340133-cf7b2972320d?q=80&w=600', url: '#' },
  { id: 's2', title: 'Новий реліз!', thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600', url: '#' },
];

export default function BentoGrid({ initialData }: BentoGridProps) {
  // Використовуємо дані з сервера або фолбеки
  const latestVideo = initialData?.latestYoutubeVideo || fallbackPopular[0];
  const popularWeek = initialData?.popularWeekVideo || fallbackPopular[1];
  const youtubeShorts = initialData?.youtubeShorts || [];
  const popularVideos = initialData?.popularVideos || [];

  // Логіка фільтрації дублікатів
  const displayRegularVideos = popularVideos
    .filter(v => v.id !== latestVideo.id && v.id !== popularWeek.id)
    .slice(0, 3);

  const finalRegularVideos = displayRegularVideos.length > 0 ? displayRegularVideos : fallbackPopular;
  const finalShorts = youtubeShorts.length >= 3 ? youtubeShorts.slice(0, 3) : fallbackShorts;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto max-w-7xl mx-auto px-6 py-10"
    >
      {/* 📺 РЯД 1: ПЛИТКА 1 (LATEST) */}
      <motion.a 
        href={latestVideo.url} target="_blank" variants={itemVariants}
        className="md:col-span-6 relative group cursor-pointer overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      >
        <div className="relative aspect-video w-full">
          <Image src={latestVideo.thumbnail} alt="" fill unoptimized={true} className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000066c7]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8 text-white">
             <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1 block">Останній реліз</span>
             <h3 className="text-xl md:text-2xl font-normal text-white font-serif leading-tight line-clamp-2">{latestVideo.title}</h3>
          </div>
        </div>
      </motion.a>

      {/* 📺 РЯД 1: ПЛИТКА 2 (POPULAR WEEK) */}
      <motion.a 
        href={popularWeek.url} target="_blank" variants={itemVariants}
        className="md:col-span-6 relative group cursor-pointer overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      >
        <div className="relative aspect-video w-full">
          <Image src={popularWeek.thumbnail} alt="" fill unoptimized={true} className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000066c7]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8 text-white">
             <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1 block font-sans">Зараз слухають</span>
             <h3 className="text-xl md:text-2xl font-normal font-serif leading-tight line-clamp-2">{popularWeek.title}</h3>
          </div>
        </div>
      </motion.a>

      {/* 📱 РЯД 2: SHORTS */}
      {finalShorts.map((short) => (
        <motion.a 
          key={short.id} href={short.url} target="_blank" variants={itemVariants}
          className="md:col-span-3 relative aspect-[9/16] rounded-[1.8rem] overflow-hidden group shadow-md hover:-translate-y-2 transition-all duration-500"
        >
          <Image src={short.thumbnail} alt="" fill unoptimized={true} className="object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white text-[10px] font-bold leading-tight line-clamp-2 uppercase tracking-tight">
            {short.title}
          </div>
        </motion.a>
      ))}

      <motion.a 
        href="https://youtube.com/@booka_top" target="_blank" variants={itemVariants}
        className="md:col-span-3 aspect-[9/16] rounded-[1.8rem] bg-white border-2 border-dashed border-[#FF007A]/10 flex flex-col items-center justify-center gap-4 group hover:bg-[#FF007A]/5 transition-all cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.02)]"
      >
        <div className="w-14 h-14 rounded-full bg-[#FF007A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
           <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        </div>
        <div className="text-center px-2">
           <span className="text-[10px] font-bold text-[#FF007A] uppercase tracking-[0.2em] block mb-1">Дивитись все</span>
           <span className="text-[9px] font-serif italic text-[#000066c7]">на YouTube</span>
        </div>
      </motion.a>

      {/* 🎞️ РЯД 3: ПОПУЛЯРНІ ВІДЕО */}
      {finalRegularVideos.map((video) => (
        <motion.a 
          key={video.id} href={video.url} target="_blank" variants={itemVariants}
          className="md:col-span-4 group cursor-pointer block"
        >
          <div className="relative aspect-video rounded-[1.8rem] overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <Image src={video.thumbnail} alt="" fill unoptimized={true} className="object-cover group-hover:scale-105" />
          </div>
          <div className="mt-4 px-2">
            <span className="text-[8px] font-bold text-[#FF007A] uppercase tracking-wider block mb-1">Популярне</span>
            <h4 className="text-[10px] font-bold text-[#000066c7] line-clamp-1 uppercase tracking-tight font-sans leading-none">
              {video.title}
            </h4>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}