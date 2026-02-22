import type { Metadata } from "next";
import { Montserrat, Marck_Script } from "next/font/google"; 
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import GlobalPlayerWrapper from "@/components/GlobalPlayerWrapper";
import { getAppBooks } from "@/lib/api";

// Шрифти
const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-montserrat",
  display: "swap"
});

const marckScript = Marck_Script({ 
  weight: "400",
  subsets: ["latin", "cyrillic"], 
  variable: "--font-marck",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Booka - Слухай найкращі аудіокниги",
  description: "Найкращі романтичні аудіокниги українською мовою",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Отримуємо актуальні дані про книги з сервера (API)
  const booksData = await getAppBooks();
  const latestBookRaw = booksData?.newestBooks?.[0];

  // 2. Формуємо об'єкт початкової книги для плеєра.
  // Поле 'cover' має збігатися з тим, що очікує ваш UI.
  const initialBook = {
    id: latestBookRaw?.id || 0,
    title: latestBookRaw?.title || "Booka Radio",
    author: latestBookRaw?.author || "Слухай українське",
    cover: latestBookRaw?.cover_url 
      ? (latestBookRaw.cover_url.startsWith('http') 
          ? latestBookRaw.cover_url 
          : `https://app.booka.top/${latestBookRaw.cover_url.replace(/^\/+/, '')}`)
      : "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000",
    audioUrl: "" // Буде дозавантажено клієнтом при натисканні Play
  };

  return (
    <html lang="uk" className={`${montserrat.variable} ${marckScript.variable}`}>
      <body className="font-sans antialiased text-slate-800 bg-[#F8F9FF]">
        {/* Передаємо початкові дані в клієнтський контекст */}
        <PlayerProvider initialBook={initialBook}>
          {children}
          <GlobalPlayerWrapper />
        </PlayerProvider>
      </body>
    </html>
  );
}