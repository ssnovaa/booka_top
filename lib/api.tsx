// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.booka.top/api';

export async function getBook(id: string) {
  const res = await fetch(`${API_BASE}/abooks/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}