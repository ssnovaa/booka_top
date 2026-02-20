"use client"; // Тепер це клієнтський компонент, бо ми маємо інтерактив (кліки)

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';

interface ApiBook {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  audio_url: string;
  description: string;
}

export default function CatalogPage() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { playBook } = usePlayer(); // Наш магічний ключ до плеєра

  useEffect(() => {
    // Імітація запиту до API (замініть на ваш fetch)
    const fetchBooks = async () => {
      try {
        // Приклад: const res = await fetch('https://api.your-backend.com/books');
        // const data = await res.json();
        // setBooks(data);
        setLoading(false);
      } catch (e) {
        console.error("Помилка завантаження", e);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <Link href="/" className="text-[#FF007A] font-medium hover:underline mb-2 block">
              ← На головну
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 font-serif">Каталог</h1>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="group cursor-pointer"
              onClick={() => playBook({
                id: book.id,
                title: book.title,
                author: book.author,
                cover: book.cover_url,
                audioUrl: book.audio_url
              })}
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105 mb-4">
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#FF007A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#FF007A] shadow-xl">
                      <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 truncate">{book.title}</h3>
              <p className="text-sm text-slate-500">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}