import { Metadata } from 'next';
import { getBook } from '@/lib/api';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

// 1. СЕРВЕРНОЕ SEO (для Google)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.id);
  if (!book) return { title: 'Книга не знайдена' };

  return {
    title: `${book.title} — Слухати 1 розділ аудіокниги онлайн | Booka`,
    description: `Слухайте першу главу книги "${book.title}" у професійній озвучці від ${book.author}. Повна версія в додатку Booka.`,
    openGraph: {
      images: [book.cover_url],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const book = await getBook(params.id);
  if (!book) notFound();

  // 2. SEMANTIC SEO (JSON-LD для ИИ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Audiobook",
    "name": book.title,
    "author": { "@type": "Person", "name": book.author },
    "readBy": { "@type": "Person", "name": book.reader }, // Поле из вашего контроллера
    "description": book.description,
    "image": book.cover_url,
    "duration": `PT${book.duration}M`, // Длительность в минутах
    "publisher": { "@type": "Organization", "name": "Booka" }
  };

  return (
    <main className="min-h-screen pt-32 px-6">
      {/* Скрипт разметки для ИИ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Обложка */}
          <div className="w-full md:w-1/3">
            <img 
              src={book.cover_url} 
              alt={book.title} 
              className="rounded-[2rem] shadow-2xl border border-white/10" 
            />
          </div>

          {/* Информация */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-slate-400 mb-6">{book.author}</p>
            <div className="flex gap-2 mb-8">
              {book.genres.map((g: any) => (
                <span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="text-slate-300 leading-relaxed mb-10">{book.description}</p>
            
            {/* Кнопка запуска будет вызывать setActiveBook из контекста */}
            <button className="px-10 py-4 bg-[#FF007A] rounded-full font-bold shadow-lg shadow-pink-500/20">
              Слухати фрагмент
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}