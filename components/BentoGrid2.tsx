"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  description: string;
}

interface BentoGrid2Props {
  initialData?: {
    popularBooks: Book[];
    newestBooks: Book[];
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BentoGrid2({ initialData }: BentoGrid2Props) {
  const { playBook } = usePlayer();

  const popularBooks = initialData?.popularBooks || [];
  const newestBooks = initialData?.newestBooks || [];

  const formatImageUrl = (raw: string | null) => {
    if (!raw) return null;
    let s = raw.trim();
    if (s.startsWith('http')) return s;
    s = s.replace(/^\/+/, '');
    if (!s.startsWith('storage/')) s = 'storage/' + s;
    return `https://app.booka.top/${s}`;
  };

  const handlePlayBook = async (book: Book) => {
    try {
      const res = await fetch(`/api/abooks/${book.id}/chapters`);
      const chapters = await res.json();
      if (chapters?.length > 0) {
        playBook({
          id: book.id,
          title: book.title,
          author: book.author,
          cover: formatImageUrl(book.cover_url),
          audioUrl: chapters[0].audio_url
        });
      }
    } catch (err) { console.error("Помилка відтворення:", err); }
  };

  if (popularBooks.length === 0 && newestBooks.length === 0) return null;

  const mainBook = popularBooks[0] || newestBooks[0];
  const newestBook = newestBooks.find(b => b?.id !== mainBook?.id) || newestBooks[1];
  const trendingBooks = popularBooks.filter(b => b?.id !== mainBook?.id && b?.id !== newestBook?.id).slice(0, 3);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto px-6"
    >
      {/* 1. ГОЛОВНА КНИГА */}
      <motion.div 
        variants={itemVariants}
        onClick={() => handlePlayBook(mainBook)}
        className="md:col-span-4 md:row-span-2 group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
          <Image 
            src={formatImageUrl(mainBook.cover_url) || ''} 
            alt={mainBook.title} 
            fill unoptimized 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000066c7]/90 via-[#000066c7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Топ вибір</p>
            <h3 className="text-2xl font-bold leading-tight">{mainBook.title}</h3>
          </div>
        </div>
      </motion.div>

      {/* 2. НОВИНКА */}
      {newestBook && (
        <motion.div 
          variants={itemVariants}
          onClick={() => handlePlayBook(newestBook)}
          className="md:col-span-8 relative group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 flex items-center gap-10 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] group-hover:-translate-y-1"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop" 
              alt="background"
              fill
              className="object-cover opacity-50 blur-[2px] transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="w-36 h-48 relative flex-shrink-0 shadow-[0_15px_35px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden z-10">
            <Image 
              src={formatImageUrl(newestBook.cover_url) || ''} 
              alt={newestBook.title} 
              fill unoptimized className="object-cover" 
            />
          </div>

          <div className="flex-1 relative z-10">
             <span className="inline-block px-3 py-1 bg-[#FF007A]/10 text-[#FF007A] text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
               Свіжий реліз
             </span>
             <h4 className="text-3xl font-normal text-[#000066c7] leading-tight mb-2 font-serif">{newestBook.title}</h4>
             <p className="text-slate-500 text-sm mb-6 italic">{newestBook.author}</p>
             <div className="flex items-center gap-3 text-[#000066c7] font-bold text-sm">
                <div className="w-10 h-10 rounded-full bg-[#000066c7] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                Слухати безкоштовно
             </div>
          </div>
        </motion.div>
      )}

      {/* 3. ТОП-3 */}
      <div className="md:col-span-8 grid grid-cols-3 gap-8">
        {trendingBooks.map((book) => (
          <motion.div 
            key={book.id}
            variants={itemVariants}
            onClick={() => handlePlayBook(book)}
            className="group cursor-pointer text-center"
          >
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)] mb-4 transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
              <Image 
                src={formatImageUrl(book.cover_url) || ''} 
                alt={book.title} 
                fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <h5 className="font-bold text-[#000066c7] text-sm line-clamp-1">{book.title}</h5>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">{book.author}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}