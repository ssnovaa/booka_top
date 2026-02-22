// app/catalog/[id]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'; // Додано для SEO
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBook, getCatalogBooks } from '@/lib/api';
import PlayButton from '@/components/PlayButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

/** * КРОК 2: ГЕНЕРАЦІЯ ДИНАМІЧНИХ МЕТА-ТЕГІВ (SEO)
 * Використовуємо семантичне ядро для залучення цільового трафіку
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) return { title: 'Книга не знайдена | Booka' };

  const title = `Слухати аудіокнигу «${book.title}» — ${book.author} (фрагмент) | Booka`;
  const description = `Слухайте онлайн першу главу сучасної української книги «${book.title}» від ${book.author}. Професійна озвучка, любовні романи та фентезі. Повна версія та офлайн-режим доступні у додатку Booka.`;

  // Форматування URL обкладинки для соцмереж
  const coverUrl = book.cover_url?.startsWith('http') 
    ? book.cover_url 
    : `https://app.booka.top/${book.cover_url?.replace(/^\/+/, '')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [coverUrl],
      type: 'book',
      siteName: 'Booka.top',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverUrl],
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBook(id);

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

  /**
   * СТРУКТУРОВАНІ ДАНІ (JSON-LD)
   * Допомагає Google та AI розуміти сутність сторінки
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Audiobook",
    "name": book.title,
    "author": { "@type": "Person", "name": book.author },
    "description": book.description,
    "image": coverUrl,
    "accessibilityFeature": "audioDescription",
    "readBy": { "@type": "Person", "name": "Професійний диктор" },
    "publisher": { "@type": "Organization", "name": "Booka" },
    "potentialAction": {
      "@type": "ListenAction",
      "target": [
        {
          "@type": "EntryPoint",
          "urlTemplate": "https://play.google.com/store/apps/details?id=top.booka.app",
          "actionPlatform": ["http://schema.org/AndroidPlatform"]
        }
      ]
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FF]">
      {/* Вставляємо JSON-LD для пошукових роботів */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-[#FF007A] uppercase tracking-widest mb-10">
          <Link href="/" className="hover:opacity-70 transition-opacity">Головна</Link>
          <span className="text-slate-300">/</span>
          <Link href="/catalog" className="hover:opacity-70 transition-opacity">Каталог</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 truncate max-w-[200px]">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] sticky top-32">
              <Image src={coverUrl} alt={book.title} fill priority unoptimized className="object-cover" />
              <div className="absolute top-6 left-6 bg-[#FF007A] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl z-10">
                Ознайомчий фрагмент
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            <header>
              <h1 className="text-4xl md:text-6xl font-normal text-[#000066c7] font-serif leading-tight mb-6 italic">
                {book.title}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-xl md:text-2xl text-slate-500 font-serif italic">{book.author}</p>
                <div className="h-6 w-px bg-slate-200"></div>
                <span className="text-xs font-bold text-[#FF007A] uppercase tracking-widest">Глава 1</span>
              </div>
            </header>

            <div className="flex flex-wrap gap-6 items-center py-8 border-y border-slate-100">
              <PlayButton book={book} coverUrl={coverUrl} />
              <p className="text-xs text-slate-400 max-w-[220px] leading-relaxed">
                Послухайте першу главу безкоштовно та продовжуйте у додатку.
              </p>
            </div>

            <article className="max-w-3xl">
              <h3 className="text-[#000066c7] font-serif text-2xl mb-6">Про що ця історія</h3>
              <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-line font-sans">
                {book.description || "Ми вже готуємо опис для цієї чудової книги. Незабаром він з'явиться тут."}
              </div>
            </article>

            <div className="bg-[#000066] p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF007A] opacity-10 blur-[80px] -mr-32 -mt-32"></div>
              <div className="relative z-10 flex flex-col items-center text-center gap-8">
                <div className="space-y-3">
                  <h4 className="text-3xl md:text-4xl font-bold font-serif italic leading-tight">Сподобався початок?</h4>
                  <p className="text-blue-100/70 max-w-xl mx-auto text-lg">
                    Продовжуйте прослуховування повної версії у нашому безкоштовному додатку або на YouTube каналі.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="https://play.google.com/store/apps/details?id=top.booka.app" target="_blank" className="transition-transform hover:scale-105 active:scale-95">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-14" />
                  </Link>
                  <Link href="https://www.youtube.com/@booka_top" target="_blank" className="bg-[#FF0000] px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-[#cc0000] transition-all shadow-lg shadow-red-900/20">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Слухати на YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarBooks.length > 0 && (
          <section className="mt-32 pt-20 border-t border-slate-200">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[#FF007A] font-bold text-[10px] uppercase tracking-widest mb-2 block">Можливо, вас зацікавить</span>
                <h2 className="text-3xl font-normal text-[#000066c7] font-serif italic">Інші фрагменти</h2>
              </div>
              <Link href="/catalog" className="text-xs font-bold text-slate-400 hover:text-[#FF007A] transition-colors uppercase tracking-widest">Всі книги →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {similarBooks.map((sBook: any) => (
                <Link href={`/catalog/${sBook.id}`} key={sBook.id} className="group">
                  <div className="relative aspect-[2/3] rounded-[1.8rem] overflow-hidden bg-white shadow-sm mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <Image src={formatImageUrl(sBook.cover_url)} alt={sBook.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h4 className="font-bold text-[#000066c7] text-xs line-clamp-1 italic">{sBook.title}</h4>
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