import { NextResponse } from 'next/server';

export async function GET() {
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!CHANNEL_ID) {
    return NextResponse.json({ error: 'CHANNEL_ID не знайдено в .env' }, { status: 500 });
  }

  // Посилання на RSS-фід каналу (0 балів квоти)
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  try {
    // Кешуємо відповідь на 1 годину, щоб не смикати YouTube занадто часто
    const res = await fetch(RSS_URL, { 
      next: { revalidate: 3600 },
      cache: 'no-store' // Для тесту зараз можна вимкнути, щоб відразу побачити результат
    });
    
    const xml = await res.text();

    // Витягуємо Video ID за допомогою регулярного виразу
    const videoIdMatch = xml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    // Витягуємо заголовок (нам потрібен той, що всередині першого <entry>)
    const titleMatch = xml.match(/<entry>[\s\S]*?<title>([\s\S]*?)<\/title>/);

    if (!videoIdMatch) {
      console.error('Не вдалося знайти відео в RSS-фіді');
      return NextResponse.json([]);
    }

    const videoId = videoIdMatch[1];
    const title = titleMatch ? titleMatch[1] : "Нове відео на каналі";

    // Повертаємо дані у форматі, який очікує твій BentoGrid
    return NextResponse.json([{
      id: videoId,
      title: title,
      // Наша фірмова HD-обкладинка
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${videoId}`
    }]);

  } catch (e: any) {
    console.error('RSS Fetch Error:', e.message);
    return NextResponse.json({ error: 'Помилка RSS' }, { status: 500 });
  }
}