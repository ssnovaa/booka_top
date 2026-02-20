"use client";

import React, { useState } from 'react';

const genres = [
  { id: 'all', name: 'Всі' },
  { id: 'fiction', name: 'Художня' },
  { id: 'business', name: 'Бізнес' },
  { id: 'psychology', name: 'Психологія' },
  { id: 'kids', name: 'Дітям' },
  { id: 'thriller', name: 'Трилери' },
];

export default function GenreSwitcher() {
  const [activeGenre, setActiveGenre] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-6 mb-10">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setActiveGenre(genre.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
              activeGenre === genre.id
                ? 'bg-[#FF007A] border-[#FF007A] text-white shadow-[0_5px_15px_rgba(255,0,122,0.3)]'
                : 'bg-white border-slate-200 text-slate-600 hover:border-[#FF007A] hover:text-[#FF007A]'
            }`}
          >
            {genre.name}
          </button>
        ))}
        
        {/* Кнопка "Більше" або фільтр */}
        <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:bg-slate-50 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
    </div>
  );
}