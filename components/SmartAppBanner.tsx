// app/layout.tsx
import SmartAppBanner from '@/components/SmartAppBanner';

// ... решта імпортів

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <PlayerProvider initialBook={...}>
          <SmartAppBanner /> {/* Додаємо сюди */}
          {children}
          <GlobalPlayerWrapper />
        </PlayerProvider>
      </body>
    </html>
  );
}