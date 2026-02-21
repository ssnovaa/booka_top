"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Collaboration() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-2" id="collaboration">
      
      {/* --- ЦЕНТРОВАНИЙ ЗАГОЛОВОК У СТИЛІ БЕНТО --- */}
      <div className="mb-12 text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#FF007A] text-[10px] font-bold uppercase tracking-[0.4em] block mb-3"
        >
          Екосистема для авторів
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif text-[#000066c7] leading-tight max-w-2xl"
        >
          Співпраця та аудіопродакшн
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[#F3F1F7] shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
      >
        {/* 🌸 ДЕКОРАТИВНИЙ ФОН (Hero Style) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop" 
            alt=""
            fill
            className="object-cover opacity-15 scale-110 blur-[3px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3F1F7]/95 via-[#F3F1F7]/40 to-white/20" />
        </div>

        <div className="relative z-10 px-8 py-14 md:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* ЛІВА ЧАСТИНА: Текст */}
            <div className="lg:col-span-7">
              <motion.div variants={itemVariants}>
                <span className="inline-block text-[#FF007A] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 px-4 py-2 border border-[#FF007A]/20 rounded-full bg-white/60 backdrop-blur-sm">
                  Partnership & Production
                </span>
                <h3 className="text-4xl md:text-6xl font-serif text-[#000066c7] leading-[1.05] mb-8 tracking-tight">
                  Ваша книга <br /> 
                  <span className="text-[#FF007A] italic opacity-90">
                    заслуговує на голос
                  </span>
                </h3>
                <p className="text-slate-600 text-lg font-light leading-relaxed max-w-xl mb-12">
                  Студія Booka — це екосистема для авторів та видавництв. Ми не просто озвучуємо текст, ми створюємо аудіо-враження, які залишаються з читачем назавжди.
                </p>
                
                <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start">
                  <Link 
                    href="https://t.me/your_telegram_handle" 
                    target="_blank"
                    className="px-10 py-4 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white rounded-full font-semibold shadow-[0_10px_25px_-5px_rgba(255,0,122,0.3)] hover:brightness-110 transition-all active:scale-95 text-sm uppercase tracking-wider"
                  >
                    Обговорити проєкт
                  </Link>

                  <div className="flex -space-x-3 items-center">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="author" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <span className="pl-6 text-[#000066c7]/50 text-[10px] font-bold uppercase tracking-widest font-sans">100+ авторів</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ПРАВА ЧАСТИНА: Bento-картки */}
            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  title: "Для незалежних авторів",
                  desc: "Програма **безкоштовного озвучення** (Revenue Share). Ми інвестуємо в продакшн, ви отримуєте пасивний дохід.",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253",
                  tag: "Партнерство"
                },
                {
                  title: "Агенціям та видавництвам",
                  desc: "Комерційний продакшн «під ключ». **Багатоголосе озвучення**, саунд-дизайн та дистрибуція великих каталогів.",
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                  tag: "B2B Сервіс"
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, x: 5 }}
                  className="p-8 rounded-[2.2rem] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white transition-all cursor-default"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#F3F1F7] rounded-2xl text-[#FF007A]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={card.icon} />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold text-[#000066c7]/30 uppercase tracking-[0.2em]">
                      {card.tag}
                    </span>
                  </div>
                  <h4 className="text-[#000066c7] font-serif text-2xl mb-3 leading-snug">{card.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">
                    {card.desc.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} className="text-[#000066c7] font-medium">{text}</strong> : text)}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* НИЖНЯ ПАНЕЛЬ СТАТИСТИКИ */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-[#000066c7]/5 flex flex-wrap justify-between items-center gap-8"
          >
            <div className="flex flex-col">
              <span className="text-[#000066c7] font-serif text-2xl tracking-tighter italic opacity-70">Booka Radio Production</span>
              <span className="text-[9px] font-bold text-[#FF007A] uppercase tracking-[0.3em] mt-1">the voice of stories</span>
            </div>
            
            <div className="flex gap-12">
               <div className="text-center">
                 <div className="text-[#000066c7] font-serif text-3xl">24/7</div>
                 <div className="text-[#000066c7]/30 text-[9px] uppercase tracking-widest mt-1 font-sans font-bold">Підтримка</div>
               </div>
               <div className="text-center">
                 <div className="text-[#000066c7] font-serif text-3xl">4.9</div>
                 <div className="text-[#000066c7]/30 text-[9px] uppercase tracking-widest mt-1 font-sans font-bold">Рейтинг</div>
               </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}