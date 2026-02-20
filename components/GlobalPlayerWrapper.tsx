"use client";
import { usePlayer } from "@/context/PlayerContext";
import Player from "./Player";

export default function GlobalPlayerWrapper() {
  // Додаємо closePlayer у деструктуризацію хука
  const { 
    activeBook, 
    isPlaying, 
    isPlayerVisible, 
    togglePlay, 
    currentTime, 
    duration, 
    handleSeek, 
    closePlayer 
  } = usePlayer();
  
  // Якщо плеєр не має бути видимим — нічого не малюємо
  if (!isPlayerVisible) return null;

  return (
    <Player 
      activeBook={activeBook} 
      // Тепер замість простого приховування ми викликаємо повну зупинку
      setActiveBook={closePlayer} 
      isPlaying={isPlaying} 
      togglePlay={togglePlay} 
      currentTime={currentTime} 
      duration={duration} 
      onSeek={handleSeek} 
    />
  );
}