import type { Metadata } from "next";
import { Montserrat, Marck_Script } from "next/font/google"; 
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import GlobalPlayerWrapper from "@/components/GlobalPlayerWrapper";

// 🇺🇦 Наш базовий сучасний шрифт
const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-montserrat",
  display: "swap"
});

// 🇺🇦 Наш новий розкішний рукописний шрифт!
const marckScript = Marck_Script({ 
  weight: "400", // У каліграфічних шрифтів зазвичай лише одна товщина
  subsets: ["latin", "cyrillic"], 
  variable: "--font-marck",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Booka - Слухай найкращі аудіокниги",
  description: "Найкращі романтичні аудіокниги",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 🇺🇦 Передаємо обидві змінні
    <html lang="uk" className={`${montserrat.variable} ${marckScript.variable}`}>
      <body className="font-sans antialiased text-slate-800 bg-[#F8F9FF]">
        <PlayerProvider>
          {children}
          <GlobalPlayerWrapper />
        </PlayerProvider>
      </body>
    </html>
  );
}