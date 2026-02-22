// app/catalog/[id]/opengraph-image.tsx

import { ImageResponse } from 'next/og';
import { getBook } from '@/lib/api';

// Конфігурація зображення
export const alt = 'Аудіокнига на Booka';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) return new ImageResponse(<div>Книга не знайдена</div>);

  const formatImageUrl = (raw: string | null) => {
    if (!raw) return '';
    let s = raw.trim();
    if (s.startsWith('http')) return s;
    s = s.replace(/^\/+/, '');
    return `https://app.booka.top/storage/${s.replace('storage/', '')}`;
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000033, #000066)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Фоновий декоративний елемент */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          background: '#FF007A',
          borderRadius: '100%',
          opacity: 0.1,
          filter: 'blur(100px)',
        }} />

        {/* Ліва частина: Обкладинка */}
        <div style={{ display: 'flex', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
          <img
            src={formatImageUrl(book.cover_url)}
            alt={book.title}
            style={{
              width: '350px',
              height: '525px',
              borderRadius: '30px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Права частина: Текст та Заклик */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '60px',
          flex: 1,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <span style={{
              background: '#FF007A',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Аудіокнига • Фрагмент
            </span>
          </div>

          <h1 style={{
            fontSize: '64px',
            color: 'white',
            margin: '0 0 10px 0',
            lineHeight: 1.1,
            fontWeight: 'bold',
          }}>
            {book.title}
          </h1>
          
          <p style={{
            fontSize: '32px',
            color: '#94a3b8',
            margin: '0 0 40px 0',
          }}>
            {book.author}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px 30px',
            borderRadius: '24px',
            width: 'fit-content'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px'
            }}>
              <div style={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid #FF007A',
                marginLeft: '4px'
              }} />
            </div>
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
              Слухати на Booka.top
            </span>
          </div>
        </div>

        {/* Логотип бренду в кутку */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '60px',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          opacity: 0.5
        }}>
          Booka
        </div>
      </div>
    ),
    { ...size }
  );
}