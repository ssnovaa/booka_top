"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audiobook, audiobooks } from '../data/audiobooks';

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

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [activeBook, setActiveBook] = useState<Audiobook>(audiobooks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Синхронизация состояния Play/Pause, если оно меняется через браузер или горячие клавиши
  const handlePlayStatus = (status: boolean) => {
    setIsPlaying(status);
    if (status) setIsPlayerVisible(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const playBook = (book: Audiobook) => {
    // Если это та же книга, просто переключаем паузу
    if (activeBook.audioUrl === book.audioUrl) {
      togglePlay();
      return;
    }

    setActiveBook(book);
    setIsPlayerVisible(true);
    setCurrentTime(0);
    setIsPlaying(false); // Сбрасываем статус перед загрузкой новой

    // Ждем, пока React обновит DOM и src у аудио
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    }, 50);
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
      
      {/* КЛЮЧЕВОЙ МОМЕНТ: key={activeBook.audioUrl} 
          Заставляет React пересоздавать аудио при смене трека, 
          что чинит баг с "залипшим" прогрессом.
      */}
      <audio 
        key={activeBook.audioUrl}
        ref={audioRef} 
        src={activeBook.audioUrl} 
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