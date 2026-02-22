// ssnovaa/booka_top/booka_top-c20a98c8c593a515d3f63566d77b6f55c7269335/app/catalog/page.tsx

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogClient from '@/components/CatalogClient'; // Новий клієнтський компонент
import { getCatalogBooks, getGenres } from '@/lib/api';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // Завантажуємо дані паралельно
  const [booksData, genresData] = await Promise.all([
    getCatalogBooks({
      genre: params.genre,
      search: params.q,
      author: params.author
    }),
    getGenres()
  ]);

  const books = booksData?.data || [];
  const genres = genresData || [];

  return (
    <main className="min-h-screen bg-[#F8F9FF]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF007A] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:opacity-70">Головна</Link>
            <span>/</span>
            <span className="text-slate-400">Каталог</span>
          </div>
          <h1 className="text-5xl font-normal text-[#000066c7] font-serif mb-4 leading-tight">
            Бібліотека аудіокниг
          </h1>
          <p className="text-[#634b06e8] max-w-2xl">
            Знайдіть свою ідеальну історію серед сотень сучасних романів та подкастів українською мовою.
          </p>
        </header>

        {/* CatalogClient керуватиме пошуком, фільтрами та відображенням сітки */}
        <CatalogClient 
          initialBooks={books} 
          genres={genres} 
          currentParams={params}
        />
      </div>

      <Footer />
    </main>
  );
}