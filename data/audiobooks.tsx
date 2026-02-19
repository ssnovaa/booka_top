export const audiobooks = [
  {
    id: 1, title: "Помста під гострим соусом", author: "Аля Морейно",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2, title: "Ти! Моя друга весна", author: "Іва Ніч",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3, title: "Буду кохати", author: "Ольга Лавін",
    cover: "https://images.unsplash.com/photo-1629196914225-ebdf075fb862?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4, title: "Казка про заморського принца", author: "Тая Стрельцова",
    cover: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop"
  }
];

// Экспортируем тип книги, чтобы TypeScript знал, как она выглядит
export type Audiobook = typeof audiobooks[0];