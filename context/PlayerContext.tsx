"use client";

import React, { createContext, useContext, useState, useRef } from 'react';

export interface Audiobook {
  id: number;
  title: string;
  author: string;
  cover: string;
  audioUrl?: string;
}

interface PlayerContextType {
  activeBook: Audiobook;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  isEnded: boolean;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  playBook: (book: Audiobook) => void;
  setPlayerVisible: (visible: boolean) => void;
  handleSeek: (time: number) => void;
  closePlayer: () => void; // Додано в інтерфейс
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children, initialBook }: { children: React.ReactNode; initialBook: Audiobook }) {
  const [activeBook, setActiveBook] = useState<Audiobook>(initialBook);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ФУНКЦІЯ ЗАКРИТТЯ (яку ми забули)
  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setIsEnded(false); // Скидаємо стан фрагмента при закритті
  };

  const handlePlayStatus = (status: boolean) => {
    setIsPlaying(status);
    if (status) {
      setIsPlayerVisible(true);
      setIsEnded(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isEnded) setIsEnded(false);

    if (!activeBook.audioUrl) {
      try {
        const res = await fetch(`/api/abooks/${activeBook.id}/chapters`);
        const chapters = await res.json();
        if (chapters && chapters.length > 0) {
          const url = chapters[0].audio_url;
          setActiveBook(prev => ({ ...prev, audioUrl: url }));
          setTimeout(() => { audioRef.current?.play().catch(console.error); }, 100);
          return;
        }
      } catch (err) {
        console.error("Помилка завантаження аудіо:", err);
        return;
      }
    }

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(console.error);
  };

  const playBook = (book: Audiobook) => {
    setIsEnded(false);
    if (activeBook.id === book.id && activeBook.audioUrl) {
      togglePlay();
      return;
    }
    setActiveBook(book);
    setIsPlayerVisible(true);
    setCurrentTime(0);
    setIsPlaying(false);
    if (book.audioUrl) {
      setTimeout(() => { audioRef.current?.play().catch(console.error); }, 50);
    } else {
      togglePlay();
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current && isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      if (isEnded) setIsEnded(false);
    }
  };

  return (
    <PlayerContext.Provider value={{ 
      activeBook, isPlaying, isPlayerVisible, isEnded, currentTime, duration, 
      togglePlay, playBook, handleSeek, closePlayer, // Додано в value
      setPlayerVisible: setIsPlayerVisible 
    }}>
      {children}
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
        onEnded={() => {
          setIsPlaying(false);
          setIsEnded(true);
        }}
      />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};