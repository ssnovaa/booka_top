// app/catalog/[id]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBook, getCatalogBooks } from '@/lib/api';
import PlayButton from '@/components/PlayButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBook(id);

  // Якщо книги з таким ID не існує — показуємо 404
  if (!book) {
    notFound();
  }

  const formatImageUrl = (raw: string | null) => {
    if (!raw) return '';
    let s = raw.trim();
    if (s.startsWith('http')) return s;
    s = s.replace(/^\/+/, '');
    if (!s.startsWith('storage/')) s = 'storage/' + s;
    return `https://app.booka.top/${s}`;
  };

  const coverUrl = formatImageUrl(book.cover_url);

  // ЛОГІКА СХОЖИХ КНИГ
  const currentGenreId = book.genres?.[0]?.id;
  const similarBooksData = await getCatalogBooks({ 
    genre: currentGenreId?.toString() 
  });

  const similarBooks = similarBooksData?.data
    ?.filter((b: any) => b.id !== book.id)
    .slice(0, 5) || [];

  return (
    <main className="min-h-screen bg-[#F8F9FF]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Хлібні крихти для навігації */}
        <nav className="flex items-center gap-2 text-[10px] font-bold text-[#FF007A] uppercase tracking-widest mb-10">
          <Link href="/" className="hover:opacity-70 transition-opacity">Головна</Link>
          <span className="text-slate-300">/</span>
          <Link href="/catalog" className="hover:opacity-70 transition-opacity">Каталог</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 truncate max-w-[200px]">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ЛІВА ЧАСТИНА: ОБКЛАДИНКА */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] sticky top-32">
              <Image 
                src={coverUrl} 
                alt={book.title} 
                fill 
                priority
                unoptimized
                className="object-cover" 
              />
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА: ДЕТАЛІ */}
          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            <header>
              <h1 className="text-4xl md:text-6xl font-normal text-[#000066c7] font-serif leading-tight mb-6">
                {book.title}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-xl md:text-2xl text-slate-500 font-serif italic">
                  {book.author}
                </p>
                <div className="h-6 w-px bg-slate-200"></div>
                <span className="text-xs font-bold text-[#FF007A] uppercase tracking-widest">
                  Аудіокнига
                </span>
              </div>
            </header>

            {/* Кнопка Play та основні статси */}
            <div className="flex flex-wrap gap-6 items-center py-8 border-y border-slate-100">
              <PlayButton book={book} coverUrl={coverUrl} />
              
              <div className="flex items-center gap-8 ml-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Жанри</span>
                  <div className="flex gap-2">
                    {book.genres?.map((g: any) => (
                      <span key={g.id} className="text-[11px] font-bold text-[#000066c7]">
                        #{g.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col border-l border-slate-100 pl-8">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Мова</span>
                  <span className="text-[11px] font-bold text-[#000066c7]">Українська</span>
                </div>
              </div>
            </div>

            {/* Опис книги */}
            <article className="max-w-3xl">
              <h3 className="text-[#000066c7] font-serif text-2xl mb-6">Про що ця історія</h3>
              <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-line font-sans">
                {book.description || "Ми вже готуємо опис для цієї чудової книги. Незабаром він з'явиться тут."}
              </div>
            </article>

            {/* Заклик до дії / Додаток */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-[#000066c7] font-bold text-lg mb-1 font-serif">Сподобалась книга?</h4>
                <p className="text-slate-500 text-sm">Слухайте у нашому додатку.</p>
              </div>
              <Link href="/" className="px-8 py-4 bg-[#000066c7] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#000088] transition-colors">
                Завантажити додаток
              </Link>
            </div>
          </div>
        </div>

        {/* СЕКЦІЯ СХОЖИХ КНИГ */}
        {similarBooks.length > 0 && (
          <section className="mt-32 pt-20 border-t border-slate-200">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[#FF007A] font-bold text-[10px] uppercase tracking-widest mb-2 block">
                  Можливо, вас зацікавить
                </span>
                <h2 className="text-3xl font-normal text-[#000066c7] font-serif">
                  Схожі історії
                </h2>
              </div>
              <Link href="/catalog" className="text-xs font-bold text-slate-400 hover:text-[#FF007A] transition-colors uppercase tracking-widest">
                Всі книги →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {similarBooks.map((sBook: any) => (
                <Link href={`/catalog/${sBook.id}`} key={sBook.id} className="group">
                  <div className="relative aspect-[2/3] rounded-[1.8rem] overflow-hidden bg-white shadow-sm mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <Image 
                      src={formatImageUrl(sBook.cover_url)} 
                      alt={sBook.title} 
                      fill unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <h4 className="font-bold text-[#000066c7] text-xs line-clamp-1">{sBook.title}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">{sBook.author}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}