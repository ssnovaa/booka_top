"use client";

import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export default function PlayButton({ book, coverUrl }: any) {
  const { playBook } = usePlayer();
  const [isConnecting, setIsConnecting] = useState(false);

  const handlePlay = async () => {
    try {
      setIsConnecting(true);
      // Завантажуємо розділи книги
      const res = await fetch(`/api/abooks/${book.id}/chapters`);
      const chapters = await res.json();
      
      if (chapters && chapters.length > 0) {
        playBook({
          id: book.id,
          title: book.title,
          author: book.author,
          cover: coverUrl,
          audioUrl: chapters[0].audio_url
        });
      }
    } catch (err) {
      console.error("Не вдалося запустити аудіо", err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button 
      onClick={handlePlay}
      disabled={isConnecting}
      className={`
        relative group overflow-hidden
        bg-[#FF007A] text-white 
        px-10 py-5 rounded-[1.5rem] 
        font-bold text-sm uppercase tracking-[0.15em] 
        flex items-center gap-4 
        shadow-[0_20px_40px_rgba(255,0,122,0.25)] 
        hover:shadow-[0_25px_50px_rgba(255,0,122,0.35)] 
        hover:-translate-y-1 transition-all duration-300
        active:scale-95 disabled:opacity-70
      `}
    >
      {isConnecting ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#FF007A] transition-colors">
          <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      )}
      <span>{isConnecting ? 'Завантаження...' : 'Слухати книгу'}</span>
    </button>
  );
}