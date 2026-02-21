"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Импортируем Image

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'Тарифи', href: '#' },
    { name: 'Про нас', href: '#' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-[100] px-6 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
{/* Логотип з твоїм фото та SEO-текстом */}
<Link href="/" className="flex items-center gap-3 group relative z-[110]">
  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
    <Image 
      src="https://yt3.googleusercontent.com/fvtoS2tvJQK3ayPzx7jRLoGDgHaTBj3SeYqwrEr-IJCJdqqlzhFWAmXoGU60w0Hr3MMhngAwimQ=s176-c-k-c0x00ffffff-no-rj"
      alt="Booka Radio Logo"
      fill
      className="object-cover"
    />
  </div>
  
  <div className="flex flex-col leading-tight">
    {/* Назва бренду твоїм глибоким синім кольором */}
    <span className="text-xl font-bold text-[#000066c7] tracking-tight">
      Booka Radio
    </span>
    {/* SEO-дескриптор: ідеально для пошукових роботів та ІІ */}
    <span className="text-[9px] md:text-[10px] font-medium text-slate-500 uppercase tracking-widest">
      сучасні жіночі аудіокниги українською
    </span>
  </div>
</Link>

        {/* Навігація та інше залишаються без змін... */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-slate-600 hover:text-[#FF007A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Иконки... */}
        <div className="hidden md:flex items-center gap-5 text-slate-500">
           {/* Твои кнопки поиска и профиля */}
        </div>
      </div>
    </header>
  );
}