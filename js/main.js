(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const fmt = (n) => n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";

  // ---------- Holat ----------
  const state = { category: "all", query: "", sort: "default", cart: loadCart() };

  function loadCart() {
    try { return JSON.parse(localStorage.getItem("sportmax-cart")) || {}; }
    catch { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem("sportmax-cart", JSON.stringify(state.cart)); } catch {}
  }

  // ---------- Kategoriyalar ----------
  function renderCategories() {
    $("#categories").innerHTML = CATEGORIES.map((c) => {
      const count = PRODUCTS.filter((p) => p.category === c.id).length;
      return `<button class="category" data-cat="${c.id}">
        <span class="category__icon">${c.icon}</span>
        <span class="category__name">${c.name}</span>
        <span class="category__count">${count} ta mahsulot</span>
      </button>`;
    }).join("");

    $("#filters").innerHTML =
      `<button class="chip active" data-cat="all">Barchasi</button>` +
      CATEGORIES.map((c) => `<button class="chip" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join("");
  }

  function setCategory(cat) {
    state.category = cat;
    document.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b.dataset.cat === cat));
    renderProducts();
  }

  // ---------- Mahsulotlar ----------
  function getFiltered() {
    let list = PRODUCTS.filter((p) =>
      (state.category === "all" || p.category === state.category) &&
      p.name.toLowerCase().includes(state.query.toLowerCase())
    );
    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }

  function renderProducts() {
    const list = getFiltered();
    $("#empty").hidden = list.length > 0;
    $("#products").innerHTML = list.map((p) => {
      const cat = CATEGORIES.find((c) => c.id === p.category);
      const media = p.image
        ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
        : `<span>${p.icon}</span>`;
      const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      return `<article class="product">
        <div class="product__media">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          ${discount ? `<span class="badge badge--sale">-${discount}%</span>` : ""}
          ${media}
        </div>
        <div class="product__body">
          <span class="product__cat">${cat ? cat.name : ""}</span>
          <h3 class="product__name">${p.name}</h3>
          <div class="product__rating">★ ${p.rating.toFixed(1)}</div>
          <div class="product__bottom">
            <div class="product__price">
              ${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s>` : ""}
              <strong>${fmt(p.price)}</strong>
            </div>
            <button class="add-btn" data-add="${p.id}" aria-label="Savatchaga qo'shish">+</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  // ---------- Savatcha ----------
  function addToCart(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    saveCart(); renderCart();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`"${p.name}" savatchaga qo'shildi`);
  }
  function changeQty(id, delta) {
    state.cart[id] = (state.cart[id] || 0) + delta;
    if (state.cart[id] <= 0) delete state.cart[id];
    saveCart(); renderCart();
  }
  function cartTotal() {
    return Object.entries(state.cart).reduce((sum, [id, q]) => {
      const p = PRODUCTS.find((x) => x.id === +id);
      return p ? sum + p.price * q : sum;
    }, 0);
  }

  function renderCart() {
    const entries = Object.entries(state.cart);
    const count = entries.reduce((s, [, q]) => s + q, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").classList.toggle("show", count > 0);

    $("#cartItems").innerHTML = entries.length
      ? entries.map(([id, q]) => {
          const p = PRODUCTS.find((x) => x.id === +id);
          if (!p) return "";
          return `<div class="cart-item">
            <div class="cart-item__icon">${p.icon}</div>
            <div class="cart-item__info">
              <p>${p.name}</p>
              <strong>${fmt(p.price * q)}</strong>
            </div>
            <div class="qty">
              <button data-dec="${p.id}">−</button><span>${q}</span><button data-inc="${p.id}">+</button>
            </div>
          </div>`;
        }).join("")
      : `<p class="cart__empty">Savatcha bo'sh 🛒</p>`;

    $("#cartTotal").textContent = fmt(cartTotal());
    $("#checkoutBtn").disabled = entries.length === 0;
  }

  function openCart() { $("#cart").classList.add("open"); $("#overlay").classList.add("show"); }
  function closeCart() { $("#cart").classList.remove("open"); $("#overlay").classList.remove("show"); }

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // ---------- Hodisalar ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-cat]");
    if (!t) return;
    if (t.dataset.add) addToCart(+t.dataset.add);
    if (t.dataset.inc) changeQty(+t.dataset.inc, 1);
    if (t.dataset.dec) changeQty(+t.dataset.dec, -1);
    if (t.dataset.cat) {
      setCategory(t.dataset.cat);
      if (t.classList.contains("category")) $("#katalog").scrollIntoView({ behavior: "smooth" });
    }
  });

  $("#search").addEventListener("input", (e) => { state.query = e.target.value; renderProducts(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);

  $("#checkoutBtn").addEventListener("click", () => {
    $("#orderTotal").textContent = fmt(cartTotal());
    closeCart();
    $("#modal").classList.add("show");
  });
  $("#modalClose").addEventListener("click", () => $("#modal").classList.remove("show"));
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") e.currentTarget.classList.remove("show"); });

  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = new FormData(e.target).get("name");
    // Bu yerda buyurtmani serverga, Telegram botga yoki Google Sheets'ga yuborish mumkin.
    state.cart = {}; saveCart(); renderCart();
    e.target.reset();
    $("#modal").classList.remove("show");
    toast(`Rahmat, ${name}! Buyurtmangiz qabul qilindi. Tez orada bog'lanamiz.`);
  });

  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault(); e.target.reset();
    toast("Obuna bo'lganingiz uchun rahmat! 🎉");
  });

  // Mobil menyu
  $("#burger").addEventListener("click", () => {
    $("#nav").classList.toggle("open");
    $("#burger").classList.toggle("open");
  });
  document.querySelectorAll("#nav a").forEach((a) =>
    a.addEventListener("click", () => { $("#nav").classList.remove("open"); $("#burger").classList.remove("open"); })
  );

  // Scrollda header soyasi
  window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", window.scrollY > 10));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeCart(); $("#modal").classList.remove("show"); }
  });

  $("#year").textContent = new Date().getFullYear();

  // ---------- Ishga tushirish ----------
  renderCategories();
  renderProducts();
  renderCart();
})();
