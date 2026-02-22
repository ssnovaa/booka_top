// ssnovaa/booka_top/booka_top-c20a98c8c593a515d3f63566d77b6f55c7269335/lib/api.tsx

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://app.booka.top/api';

async function fetcher(url: string, revalidate = 86400) {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Помилка запиту до ${url}:`, error);
    return null;
  }
}

async function isVideoShort(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: 'HEAD',
      redirect: 'manual',
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function getYoutubeData() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const SHORTS_PLAYLIST_ID = process.env.YOUTUBE_ANONS_PLAYLIST_ID;

  if (!API_KEY || !CHANNEL_ID || !SHORTS_PLAYLIST_ID) return null;

  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, 'UU');

  try {
    // 1. Беремо останні 50 відео (щоб точно знайти достатньо "довгих" роликів)
    const uploadsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const uploadsData = await uploadsRes.json();
    const uploadsItems = uploadsData.items || [];

    // 2. Фільтруємо шортси з основного каналу паралельно
    const uploadsWithTypes = await Promise.all(
      uploadsItems.map(async (item: any) => {
        const vId = item.snippet.resourceId.videoId;
        const isShort = await isVideoShort(vId);
        return { 
          id: vId, 
          title: item.snippet.title, 
          isShort,
          thumbnail: `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${vId}`
        };
      })
    );

    const regularVideosOnly = uploadsWithTypes.filter(v => !v.isShort);
    
    // Головне відео - найновіше
    const latestRegularVideo = regularVideosOnly[0] || null;

    // 3. Шортси ТІЛЬКИ з плейлиста "Анонс"
    const shortsPlaylistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${SHORTS_PLAYLIST_ID}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const shortsData = await shortsPlaylistRes.json();
    const verifiedShorts = [];
    for (const item of (shortsData.items || [])) {
      const vId = item.snippet.resourceId.videoId;
      if (await isShortVideo(vId)) {
        verifiedShorts.push({
          id: vId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url,
          url: `https://www.youtube.com/shorts/${vId}`
        });
      }
      if (verifiedShorts.length === 3) break;
    }

    // 4. Популярні відео (отримуємо статистику для ВСІХ знайдених довгих відео)
    const regularIds = regularVideosOnly.map(v => v.id).join(',');
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${regularIds}&key=${API_KEY}`
    );
    const statsData = await statsRes.json();
    const statsMap = new Map(statsData.items.map((s: any) => [s.id, parseInt(s.statistics.viewCount) || 0]));

    const populars = regularVideosOnly
      .map(v => ({ ...v, views: statsMap.get(v.id) || 0 }))
      .sort((a, b) => b.views - a.views);

    // Відео для правої плитки "Зараз слухають" (найпопулярніше, але не те саме що останнє)
    const popularWeekVideo = populars.find(v => v.id !== latestRegularVideo?.id) || populars[0] || null;

    // Решта популярних для нижнього ряду (виключаємо ті, що вже зверху)
    const remainingPopular = populars.filter(v => 
      v.id !== latestRegularVideo?.id && 
      v.id !== popularWeekVideo?.id
    );

    return {
      latestYoutubeVideo: latestRegularVideo,
      youtubeShorts: verifiedShorts,
      popularVideos: remainingPopular.slice(0, 6), // Передаємо з запасом
      popularWeekVideo: popularWeekVideo
    };

  } catch (e) {
    console.error("YouTube Logic Error:", e);
    return null;
  }
}

// Допоміжна назва для функції (щоб не було конфліктів)
async function isShortVideo(videoId: string) {
  return isVideoShort(videoId);
}

// Решта функцій бекенду
export async function getAppBooks() {
  const [popular, newest] = await Promise.all([
    fetcher(`${API_BASE}/abooks?sort=popular&per_page=10`),
    fetcher(`${API_BASE}/abooks?sort=new&per_page=5`)
  ]);
  return { popularBooks: popular?.data || [], newestBooks: newest?.data || [] };
}

export async function getGenres() {
  return fetcher(`${API_BASE}/genres`);
}

export async function getBook(id: string) {
  return fetcher(`${API_BASE}/abooks/${id}`);
}