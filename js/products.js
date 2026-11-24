// Mahsulotlar va kategoriyalar ro'yxati.
// Yangi mahsulot qo'shish uchun PRODUCTS massiviga yangi obyekt qo'shing.
// image maydoniga rasm yo'lini yozsangiz (masalan "assets/img/top.jpg"), emoji o'rniga rasm chiqadi.

const CATEGORIES = [
  { id: "futbol",   name: "Futbol",     icon: "⚽" },
  { id: "fitnes",   name: "Fitnes",     icon: "🏋️" },
  { id: "boks",     name: "Boks",       icon: "🥊" },
  { id: "velosport",name: "Velosport",  icon: "🚴" },
  { id: "suzish",   name: "Suzish",     icon: "🏊" },
  { id: "tennis",   name: "Tennis",     icon: "🎾" },
];

const PRODUCTS = [
  { id: 1,  name: "Futbol to'pi Pro Match (5-o'lcham)", category: "futbol",    price: 289000,  oldPrice: 350000, rating: 4.8, icon: "⚽", badge: "Hit" },
  { id: 2,  name: "Butsalar Speed X (sun'iy maydon)",   category: "futbol",    price: 549000,  rating: 4.7, icon: "👟" },
  { id: 3,  name: "Darvozabon qo'lqoplari Grip",         category: "futbol",    price: 199000,  rating: 4.5, icon: "🧤" },
  { id: 4,  name: "Futbol formasi (futbolka + shorti)",  category: "futbol",    price: 179000,  oldPrice: 220000, rating: 4.6, icon: "👕" },
  { id: 5,  name: "Gantel to'plami 2×10 kg",             category: "fitnes",   price: 459000,  rating: 4.9, icon: "🏋️", badge: "Yangi" },
  { id: 6,  name: "Yoga gilamchasi 6 mm",                category: "fitnes",   price: 129000,  rating: 4.7, icon: "🧘" },
  { id: 7,  name: "Rezina espander to'plami (5 dona)",   category: "fitnes",   price: 99000,   oldPrice: 140000, rating: 4.4, icon: "💪" },
  { id: 8,  name: "Yugurish yo'lakchasi Home Run",       category: "fitnes",   price: 4890000, rating: 4.8, icon: "🏃" },
  { id: 9,  name: "Boks qo'lqoplari 12 oz",              category: "boks",     price: 319000,  rating: 4.8, icon: "🥊", badge: "Hit" },
  { id: 10, name: "Boks qopi 30 kg",                     category: "boks",     price: 890000,  rating: 4.6, icon: "🎯" },
  { id: 11, name: "Bint (qo'l o'rami) 4.5 m",            category: "boks",     price: 49000,   rating: 4.5, icon: "🩹" },
  { id: 12, name: "Tog' velosipedi Trail 27.5\"",        category: "velosport",price: 3490000, oldPrice: 3990000, rating: 4.9, icon: "🚵" },
  { id: 13, name: "Velosiped dubulg'asi Aero",           category: "velosport",price: 259000,  rating: 4.7, icon: "⛑️" },
  { id: 14, name: "Velosiped chirog'i (oldi + orqa)",    category: "velosport",price: 89000,   rating: 4.3, icon: "🔦" },
  { id: 15, name: "Suzish ko'zoynagi Anti-Fog",          category: "suzish",   price: 79000,   rating: 4.6, icon: "🥽" },
  { id: 16, name: "Silikon suzish qalpog'i",             category: "suzish",   price: 45000,   rating: 4.4, icon: "🧢" },
  { id: 17, name: "Tennis raketkasi Carbon 300",         category: "tennis",   price: 990000,  rating: 4.8, icon: "🎾", badge: "Yangi" },
  { id: 18, name: "Tennis to'plari (3 dona)",            category: "tennis",   price: 69000,   rating: 4.5, icon: "🟡" },
];
