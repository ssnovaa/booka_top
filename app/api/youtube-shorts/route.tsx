// app/api/youtube-shorts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.YOUTUBE_ANONS_PLAYLIST_ID;

  if (!API_KEY || !PLAYLIST_ID) {
    console.error('🇺🇦 Помилка: Не знайдено ключі YouTube API у файлі .env.local');
    return NextResponse.json({ error: 'Відсутні ключі API' }, { status: 500 });
  }

  try {
    // 🇺🇦 Крок 1: Запитуємо останні 15 відео з плейлиста (з запасом для фільтрації)
    const plResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
      { next: { revalidate: 3600 } } 
    );

    if (!plResponse.ok) {
      throw new Error(`Помилка від YouTube: ${plResponse.status}`);
    }

    const plData = await plResponse.json();

    if (!plData.items || plData.items.length === 0) {
      return NextResponse.json([]); 
    }

    // 🇺🇦 Крок 2: 100% точна перевірка на Shorts (через HEAD-запити)
    // Ми стукаємо на URL шортса. Якщо YouTube віддає 200 - це вертикальний Short.
    // Якщо віддає 303 (Redirect) - це звичайне горизонтальне відео.
    const checkShortsPromises = plData.items.map(async (item: any) => {
      const videoId = item.snippet.resourceId.videoId;
      try {
        const checkRes = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
          method: 'HEAD',
          redirect: 'manual' // 🇺🇦 Забороняємо авто-перехід, щоб зловити код 303
        });
        
        if (checkRes.status === 200) {
          return item; // Це справжній Shorts
        }
        return null; // Це звичайне відео
      } catch (e) {
        return null;
      }
    });

    // Чекаємо, поки перевіряться всі 15 відео паралельно (це займає мілісекунди)
    const checkResults = await Promise.all(checkShortsPromises);
    
    // Відкидаємо всі звичайні відео (null)
    const trueShorts = checkResults.filter((item) => item !== null);

    // 🇺🇦 Крок 3: Беремо перші 3 підтверджені шортси і віддаємо на фронтенд
    const finalShorts = trueShorts.slice(0, 3).map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      url: `https://www.youtube.com/shorts/${item.snippet.resourceId.videoId}`
    }));

    return NextResponse.json(finalShorts);
  } catch (error) {
    console.error('🇺🇦 Помилка YouTube API:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера при отриманні відео' }, { status: 500 });
  }
}