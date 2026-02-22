import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/catalog',
        '/catalog/', // Дозволяємо індексувати всі сторінки книг
      ],
      disallow: [
        '/api/',      // Ховаємо внутрішні запити до бази
        '/_next/',    // Ховаємо системні файли Next.js
        '/static/',   // Якщо є окрема папка зі статикою, яку не треба індексувати
      ],
    },
    sitemap: 'https://booka.top/sitemap.xml', // Вказуємо шлях до нашої мапи сайту
  };
}