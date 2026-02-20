import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import GlobalPlayerWrapper from "@/components/GlobalPlayerWrapper";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Booka - Слухай найкращі аудіокниги",
  description: "Платформа для прослуховування аудіокниг",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <PlayerProvider>
          {children}
          {/* Создадим обертку для плеера, чтобы он брал данные из контекста */}
          <GlobalPlayerWrapper />
        </PlayerProvider>
      </body>
    </html>
  );
}