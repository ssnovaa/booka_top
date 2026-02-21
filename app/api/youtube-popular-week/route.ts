import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) return NextResponse.json([]);

  // 1. Отримуємо ID плейлиста завантажень
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, 'UU');
  
  // Вираховуємо дату (1 місяць тому)
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    // 2. Отримуємо останні 50 відео (1 бал квоти)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`;
    const playlistRes = await fetch(playlistUrl, { next: { revalidate: 3600 } });
    const playlistData = await playlistRes.json();

    if (playlistData.error || !playlistData.items) {
      return NextResponse.json([]);
    }

    // 3. Фільтруємо відео, які вийшли за останні 30 днів
    const recentVideos = playlistData.items.filter((item: any) => {
      const publishedAt = new Date(item.snippet.publishedAt);
      return publishedAt > oneMonthAgo;
    });

    if (recentVideos.length === 0) return NextResponse.json([]);

    // 4. Отримуємо статистику переглядів для цих відео (ще 1 бал квоти)
    const videoIds = recentVideos.map((v: any) => v.snippet.resourceId.videoId).join(',');
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`;
    const statsRes = await fetch(statsUrl);
    const statsData = await statsRes.json();

    // 5. Формуємо результат та сортуємо за переглядами
    const result = statsData.items
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        views: parseInt(video.statistics.viewCount) || 0,
        thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${video.id}`
      }))
      .sort((a: any, b: any) => b.views - a.views); // Найпопулярніші зверху

    return NextResponse.json(result);

  } catch (e) {
    console.error('Помилка при отриманні популярних за місяць:', e);
    return NextResponse.json([]);
  }
}