"use client"; 

import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import Player from '../components/Player';
import { Audiobook, audiobooks } from '../data/audiobooks';

export default function Home() {
  const [activeBook, setActiveBook] = useState<Audiobook | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const displayBook = activeBook || audiobooks[0];

  // 1. ЖЕЛЕЗОБЕТОННІ НАТИВНІ СЛУХАЧІ АУДІО
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => setIsPlaying(false);

    // Вішаємо нативні події напряму на браузерний елемент
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDuration);
    audio.addEventListener('durationchange', handleDuration);
    audio.addEventListener('canplay', handleDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDuration);
      audio.removeEventListener('durationchange', handleDuration);
      audio.removeEventListener('canplay', handleDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [displayBook]); // Оновлюємо, якщо змінилася книга

  // 2. АВТОПЛЕЙ ПРИ ВИБОРІ НОВОЇ КНИГИ
  useEffect(() => {
    if (activeBook && audioRef.current) {
      setCurrentTime(0);
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, [activeBook]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(console.error);
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current && isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FF] to-[#f3e8ff] text-slate-800 font-sans pb-40 relative">
      
      {/* Тепер аудіо-тег максимально чистий */}
      <audio ref={audioRef} src={displayBook.audioUrl} preload="metadata" />

      <Header />
      <Hero />
      <BentoGrid setActiveBook={setActiveBook} />
      
      <Footer displayBook={displayBook} isPlaying={isPlaying} togglePlay={togglePlay} currentTime={currentTime} duration={duration} onSeek={handleSeek} />
      <Player activeBook={activeBook} setActiveBook={setActiveBook} isPlaying={isPlaying} togglePlay={togglePlay} currentTime={currentTime} duration={duration} onSeek={handleSeek} />
      
    </main>
  );
}