import React from 'react';

export default function Header() {
  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="text-3xl font-bold tracking-tighter text-[#FF007A]">
        Booka<span className="text-slate-800">.top</span>
      </div>
      <div className="hidden md:flex gap-6 font-medium text-slate-600">
        <a href="#" className="hover:text-[#FF007A] transition">Каталог</a>
        <a href="#" className="hover:text-[#FF007A] transition">Авторам</a>
        <a href="#" className="hover:text-[#FF007A] transition">YouTube</a>
      </div>
      <button className="bg-[#FF007A] text-white px-6 py-2.5 rounded-full font-medium shadow-[0_0_20px_rgba(255,0,122,0.3)] hover:brightness-110 transition">
        Завантажити додаток
      </button>
    </nav>
  );
}