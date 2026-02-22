// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getCatalogBooks } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://booka.top';

  // Отримуємо всі книги з каталогу (наприклад, перші 100 для індексації)
  const booksData = await getCatalogBooks({ page: 1 });
  const books = booksData?.data || [];

  const bookEntries = books.map((book: any) => ({
    url: `${baseUrl}/catalog/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...bookEntries,
  ];
}