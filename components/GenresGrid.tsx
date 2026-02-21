"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GenresGrid() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Используем настроенный ранее прокси /api/
        const res = await fetch('/api/genres');
        if (!res.ok) throw new Error('Ошибка при загрузке жанров');
        const data = await res.json();
        
        // Фильтруем жанры, где есть книги (согласно логике в твоем контроллере)
        setGenres(data.filter((g: Genre) => g.books_count > 0));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div className="text-center py-10 opacity-50">Загрузка категорий...</div>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-[#FF007A] font-bold text-[10px] uppercase tracking-widest mb-2 block">
            Навігатор історій
          </span>
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Оберіть свій жанр</h2>
        </div>
        <Link href="/catalog" className="text-sm font-bold text-slate-400 hover:text-[#FF007A] transition-colors uppercase tracking-widest">
          Всі жанри →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map((genre) => (
          <Link 
            key={genre.id} 
            href={`/catalog?genre=${genre.id}`}
            className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 transition-all hover:shadow-xl hover:shadow-purple-500/10"
          >
            {/* Изображение жанра */}
            {genre.image_url && (
              <Image 
                src={genre.image_url} 
                alt={genre.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            )}
            
            {/* Слой затемнения */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Текст */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end items-center text-center">
              <h3 className="text-white font-bold text-sm mb-1">{genre.name}</h3>
              <span className="text-[9px] text-white/60 font-bold uppercase tracking-tighter">
                {genre.books_count} книг
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}