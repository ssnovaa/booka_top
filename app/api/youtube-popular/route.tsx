import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) return NextResponse.json([]);

  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, 'UU');
  
  // Вираховуємо дату: 3 місяці тому
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    // 1. Отримуємо останні 50 відео (1 бал)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`;
    const playlistRes = await fetch(playlistUrl, { next: { revalidate: 86400 } }); // Кеш на добу
    const playlistData = await playlistRes.json();

    if (playlistData.error || !playlistData.items) return NextResponse.json([]);

    // 2. Фільтруємо за датою (останні 3 місяці)
    const recentVideos = playlistData.items.filter((item: any) => {
      const publishedAt = new Date(item.snippet.publishedAt);
      return publishedAt > threeMonthsAgo;
    });

    if (recentVideos.length === 0) return NextResponse.json([]);

    // 3. Отримуємо статистику (views) для цих відео (1 бал)
    const videoIds = recentVideos.map((v: any) => v.snippet.resourceId.videoId).join(',');
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`;
    const statsRes = await fetch(statsUrl);
    const statsData = await statsRes.json();

    // 4. Сортуємо за переглядами та повертаємо результат
    const result = statsData.items
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        views: parseInt(video.statistics.viewCount) || 0,
        thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${video.id}`
      }))
      .sort((a: any, b: any) => b.views - a.views);

    return NextResponse.json(result);

  } catch (e) {
    return NextResponse.json([]);
  }
}