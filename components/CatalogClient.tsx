"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CatalogClient({ initialBooks, genres, currentParams }: any) {
  const router = useRouter();
  
  // Локальний стан для списку книг (щоб додавати нові до старих)
  const [books, setBooks] = useState(initialBooks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialBooks.length >= 20);
  const [searchValue, setSearchValue] = useState(currentParams.q || '');

  // Якщо змінилися фільтри (жанр або пошук), скидаємо все до початкового стану
  useEffect(() => {
    setBooks(initialBooks);
    setPage(1);
    setHasMore(initialBooks.length >= 20);
  }, [initialBooks]);

  const formatImageUrl = (raw: string | null) => {
    if (!raw) return '';
    let s = raw.trim();
    if (s.startsWith('http')) return s;
    s = s.replace(/^\/+/, '');
    if (!s.startsWith('storage/')) s = 'storage/' + s;
    return `https://app.booka.top/${s}`;
  };

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    
    const nextPage = page + 1;
    const query = new URLSearchParams();
    if (currentParams.genre) query.set('genre', currentParams.genre);
    if (currentParams.q) query.set('search', currentParams.q);
    query.set('page', nextPage.toString());
    query.set('per_page', '20');
    query.set('sort', 'new');

    try {
      const res = await fetch(`/api/abooks?${query.toString()}`);
      const json = await res.json();
      const newBooks = json.data || [];

      if (newBooks.length > 0) {
        setBooks([...books, ...newBooks]); // Додаємо нові книги до наявних
        setPage(nextPage);
        if (newBooks.length < 20) setHasMore(false); // Якщо прийшло менше 20, значить книги закінчилися
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Помилка підвантаження:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-12">
      {/* ПАНЕЛЬ ФІЛЬТРІВ (без змін) */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100">
        <form onSubmit={(e) => { e.preventDefault(); updateParams('q', searchValue); }} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Пошук книги або автора..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#FF007A]/20 transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => updateParams('genre', null)}
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!currentParams.genre ? 'bg-[#000066c7] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            Всі
          </button>
          {genres.filter((g: any) => g.books_count > 0).map((genre: any) => (
            <button
              key={genre.id}
              onClick={() => updateParams('genre', genre.id.toString())}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${currentParams.genre == genre.id ? 'bg-[#000066c7] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* СІТКА КНИГ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <AnimatePresence>
          {books.map((book: any, index: number) => (
            <Link href={`/catalog/${book.id}`} key={`${book.id}-${index}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 10) * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-[1.8rem] overflow-hidden bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)] mb-4 transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                  <Image 
                    src={formatImageUrl(book.cover_url)} 
                    alt={book.title} 
                    fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <h3 className="font-bold text-[#000066c7] text-sm line-clamp-1">{book.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">{book.author}</p>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>

      {/* КНОПКА "ПОКАЗАТИ БІЛЬШЕ" */}
      {hasMore && (
        <div className="flex justify-center pt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="group relative px-12 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] text-[#000066c7] hover:border-[#FF007A] hover:text-[#FF007A] transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-[#FF007A]/30 border-t-[#FF007A] rounded-full animate-spin"></div>
                Завантаження...
              </div>
            ) : (
              "Показати більше"
            )}
          </button>
        </div>
      )}

      {!hasMore && books.length > 0 && (
        <p className="text-center text-slate-300 text-xs uppercase tracking-widest pt-10">
          Це всі книги, які ми знайшли для вас ✨
        </p>
      )}
    </div>
  );
}