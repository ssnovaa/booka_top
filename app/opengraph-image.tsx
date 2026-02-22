// app/opengraph-image.tsx

import { ImageResponse } from 'next/og';

export const alt = 'Booka — Сучасні аудіокниги українською';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000033, #000066)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Декоративні рожеві сфери для атмосфери */}
        <div style={{
          position: 'absolute',
          top: -150,
          left: -150,
          width: 500,
          height: 500,
          background: '#FF007A',
          borderRadius: '100%',
          opacity: 0.15,
          filter: 'blur(120px)',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          background: '#FF007A',
          borderRadius: '100%',
          opacity: 0.1,
          filter: 'blur(100px)',
        }} />

        {/* Логотип */}
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: 'white',
          marginBottom: '20px',
          letterSpacing: '-2px',
        }}>
          BOOKA
        </div>

        {/* Головний заголовок (наше семантичне ядро) */}
        <h1 style={{
          fontSize: '84px',
          color: 'white',
          textAlign: 'center',
          margin: '0 0 30px 0',
          lineHeight: 1,
          fontWeight: 'bold',
          maxWidth: '900px',
          fontStyle: 'italic',
        }}>
          Сучасні аудіокниги про кохання та пригоди
        </h1>

        {/* Опис */}
        <p style={{
          fontSize: '32px',
          color: '#94a3b8',
          textAlign: 'center',
          margin: '0 0 60px 0',
          maxWidth: '800px',
        }}>
          Романтичне фентезі, любовні романи та жіночі історії в професійній озвучці українською
        </p>

        {/* Бейджі платформ */}
        <div style={{
          display: 'flex',
          gap: '20px',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '16px 32px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: '10px' }}>📱</span> Google Play
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '16px 32px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: '10px' }}>📺</span> YouTube
          </div>
          <div style={{
            background: '#FF007A',
            padding: '16px 40px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(255,0,122,0.3)',
            display: 'flex',
            alignItems: 'center',
          }}>
            Слухати безкоштовно
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}