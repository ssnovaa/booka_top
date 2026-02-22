"use client";

import React, { createContext, useContext, useState, useRef } from 'react';

export interface Audiobook {
  id: number;
  title: string;
  author: string;
  cover: string; // Використовуємо 'cover' для відповідності UI
  audioUrl?: string;
}

interface PlayerContextType {
  activeBook: Audiobook;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  playBook: (book: Audiobook) => void;
  setPlayerVisible: (visible: boolean) => void;
  handleSeek: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children, initialBook }: { children: React.ReactNode; initialBook: Audiobook }) {
  const [activeBook, setActiveBook] = useState<Audiobook>(initialBook);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayStatus = (status: boolean) => {
    setIsPlaying(status);
    if (status) setIsPlayerVisible(true);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    // Якщо натиснули Play, а посилання на файл ще немає (початковий стан з сервера)
    if (!activeBook.audioUrl) {
      try {
        const res = await fetch(`/api/abooks/${activeBook.id}/chapters`);
        const chapters = await res.json();
        if (chapters && chapters.length > 0) {
          const url = chapters[0].audio_url;
          setActiveBook(prev => ({ ...prev, audioUrl: url }));
          
          // Чекаємо мікрозавдання, щоб React оновив src у тегу <audio>
          setTimeout(() => {
            audioRef.current?.play().catch(console.error);
          }, 100);
          return;
        }
      } catch (err) {
        console.error("Помилка завантаження аудіо:", err);
        return;
      }
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const playBook = (book: Audiobook) => {
    // Якщо це та сама книга, просто перемикаємо Play/Pause
    if (activeBook.id === book.id && activeBook.audioUrl) {
      togglePlay();
      return;
    }

    setActiveBook(book);
    setIsPlayerVisible(true);
    setCurrentTime(0);
    setIsPlaying(false);

    // Якщо дані прийшли вже з audioUrl (наприклад, з каталогу)
    if (book.audioUrl) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 50);
    } else {
      // Інакше запускаємо логіку дозавантаження через togglePlay
      togglePlay();
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current && isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider value={{ 
      activeBook, isPlaying, isPlayerVisible, currentTime, duration, 
      togglePlay, playBook, handleSeek, 
      setPlayerVisible: setIsPlayerVisible 
    }}>
      {children}
      
      {/* КЛЮЧОВИЙ ФІКС: 
          Передаємо undefined, якщо audioUrl порожній, щоб уникнути помилки консолі.
          key змушує React перестворити елемент при зміні файлу.
      */}
      <audio 
        key={activeBook.audioUrl || 'no-audio'}
        ref={audioRef} 
        src={activeBook.audioUrl || undefined} 
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => handlePlayStatus(true)}
        onPause={() => handlePlayStatus(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};