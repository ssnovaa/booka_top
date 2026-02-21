"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';

interface ApiBook {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  thumb_url: string;
  description: string;
  duration: number;
  genres: { id: number; name: string }[];
}

export default function CatalogPage() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playBook } = usePlayer();

  // Використовуємо локальний проксі, який ми налаштували в next.config.ts
  const API_URL = '/api';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Запит йде на localhost:3000/api/abooks, а Next.js перекидає його на app.booka.top
        const res = await fetch(`${API_URL}/abooks?sort=new`);
        
        if (!res.ok) throw new Error(`Помилка сервера: ${res.status}`);
        
        const json = await res.json();
        
        // Перевіряємо структуру, яку повертає ваш ABookController
        if (json && json.data) {
          setBooks(json.data); 
        } else {
          throw new Error('Неправильний формат даних від API');
        }
        
        setLoading(false);
      } catch (e: any) {
        console.error("Помилка завантаження", e);
        setError(e.message === "Failed to fetch" 
          ? "Помилка мережі. Переконайтеся, що ви налаштували rewrites у next.config.ts і перезапустили сервер."
          : e.message);
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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF007A]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-medium">
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#FF007A] text-white rounded-lg text-sm"
            >
              Спробувати ще раз
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="group cursor-pointer"
                onClick={async () => {
                  try {
                    // Використовуємо проксі для отримання глав
                    const chaptersRes = await fetch(`${API_URL}/abooks/${book.id}/chapters`);
                    const chapters = await chaptersRes.json();
                    
                    if (chapters && chapters.length > 0) {
                      playBook({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        cover: book.cover_url,
                        audioUrl: chapters[0].audio_url
                      });
                    }
                  } catch (err) {
                    console.error("Не вдалося завантажити глави", err);
                  }
                }}
              >
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105 mb-4 bg-slate-200">
                  <img 
                    src={book.thumb_url || book.cover_url} 
                    alt={book.title} 
                    className="w-full h-full object-cover" 
                  />
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
        )}
      </div>
    </div>
  );
}