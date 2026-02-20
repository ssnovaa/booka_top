/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
	  {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com', // Домен твоего логотипа
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Для обкладинок YouTube відео
        port: '',
        pathname: '/**',
      },
      // Якщо ви використовуєте свої посилання на обкладинки, 
      // додайте їхні домени сюди за таким же принципом
    ],
  },
};

module.exports = nextConfig;