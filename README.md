# SportMax — Sport anjomlari onlayn do'koni

Futbol, fitnes, boks, velosport, suzish va tennis anjomlari uchun zamonaviy, moslashuvchan (responsive) veb-sayt. Sof HTML, CSS va JavaScript — hech qanday kutubxona yoki build talab qilinmaydi.

## Imkoniyatlar

- 📦 Mahsulotlar katalogi (18 ta namuna mahsulot, 6 kategoriya)
- 🔍 Qidiruv, kategoriya bo'yicha filtr va saralash (narx, reyting)
- 🛒 Savatcha — miqdorni o'zgartirish, jami summa, brauzerda saqlanadi (localStorage)
- 📝 Buyurtma berish formasi (ism, telefon, manzil, to'lov turi)
- 📱 Mobil qurilmalarga to'liq moslashgan, burger-menyu
- ✉️ Obuna (newsletter) bloki

## Loyiha tuzilmasi

```
sport-anjomlari/
├── index.html        # Asosiy sahifa
├── css/style.css     # Dizayn
├── js/products.js    # Mahsulotlar va kategoriyalar ro'yxati
├── js/main.js        # Sayt mantig'i (filtr, savatcha, buyurtma)
├── assets/           # Favicon va rasmlar
└── README.md
```

## Ishga tushirish

`index.html` faylini brauzerda oching — boshqa hech narsa kerak emas.

## GitHub'ga yuklash

```bash
cd sport-anjomlari
git init
git add .
git commit -m "SportMax sayti"
git branch -M main
git remote add origin https://github.com/FOYDALANUVCHI_NOMI/sport-anjomlari.git
git push -u origin main
```

> Avval GitHub'da `sport-anjomlari` nomli bo'sh repozitoriy yarating (README qo'shmasdan).

## GitHub Pages orqali bepul joylash

1. Repozitoriyda **Settings → Pages** bo'limiga kiring.
2. **Source**: `Deploy from a branch`, **Branch**: `main`, papka: `/ (root)` → **Save**.
3. 1–2 daqiqadan so'ng sayt shu manzilda ochiladi:
   `https://FOYDALANUVCHI_NOMI.github.io/sport-anjomlari/`

## Moslashtirish

- **Mahsulot qo'shish / o'zgartirish:** `js/products.js` faylidagi `PRODUCTS` massivini tahrirlang.
- **Haqiqiy rasm qo'yish:** rasmni `assets/img/` papkasiga joylang va mahsulotga `image: "assets/img/nomi.jpg"` maydonini qo'shing.
- **Ranglar:** `css/style.css` boshidagi `:root` o'zgaruvchilari (`--accent`, `--accent-2` va h.k.).
- **Aloqa ma'lumotlari:** `index.html` dagi footer qismi.
- **Buyurtmalarni qabul qilish:** `js/main.js` dagi `orderForm` submit qismiga Telegram bot, Formspree yoki o'z serveringizga so'rov yuborish kodini qo'shing.

## Litsenziya

MIT
