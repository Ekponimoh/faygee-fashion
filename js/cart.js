'use strict';

/* -------------------------
  PRODUCTS DATA
  (replace image paths with yours)
--------------------------*/
const products = [
  { id:1, name:"Adire Two-Piece Set - Forest Green", image:"image/bag.jpg", price:"₦9,999", categories:["women","two-piece sets","new"], badges:["new","available"], details:["S-XL","Unisex","Soft cotton"] },
  { id:2, name:"Adire Two-Piece Set - Royal Purple", image:"image/bag.jpg", price:"₦11,890", categories:["women","two-piece sets"], badges:["out"], details:["M-L","Women","Hand-dyed cotton"] },
  { id:3, name:"Adire Two-Piece Set - Pattern", image:"image/best-sellers.jpg", price:"₦9,999", categories:["unisex","two-piece ankara","new"], badges:["pre"], details:["S-XL","Unisex","100% Cotton"] },
  { id:4, name:"Tailored Men’s Long Jacket", image:"image/best-sellers.jpg", price:"₦24,500", categories:["men","senaloe"], badges:["available"], details:["M-L","Men","Tailored fit"] },
  { id:5, name:"Classic Leather Handbag", image:"image/man-suit.jpg", price:"₦22,900", categories:["accessories","bags"], badges:["available"], details:["One Size","Bag","Leather"] },
  { id:6, name:"Natural Wave Human Hair Wig", image:"image/model-3.jpg", price:"₦45,000", categories:["wigs","women"], badges:["available"], details:["20 inch","Human hair","Heat-resistant"] },
  { id:7, name:"Unisex Minimal Tee", image:"image/new-arrivals.jpg", price:"₦3,800", categories:["unisex","casual-wear"], badges:["available"], details:["S-XXL","Unisex","Soft cotton"] },
  { id:8, name:"Premium Suit Trousers", image:"image/pillows.jpg", price:"₦18,200", categories:["men"], badges:["available"], details:["M-L","Men","Tailored"] },
  { id:9, name:"Limited Edition Scarf", image:"image/model-2.jpg", price:"₦7,500", categories:["accessories","new"], badges:["new"], details:["One Size","Silk","Limited"] },
  { id:10, name:"Elegant Day Dress", image:"image/model-1.jpg", price:"₦16,400", categories:["women","dresses"], badges:["available"], details:["S-M","Women","Lightweight"] },
  { id:11, name:"Adire Two-Piece Set - Forest Green", image:"image/bag.jpg", price:"₦9,999", categories:["women","two-piece sets","new"], badges:["new","available"], details:["S-XL","Unisex","Soft cotton"] },
  { id:12, name:"Adire Two-Piece Set - Royal Purple", image:"image/bag.jpg", price:"₦11,890", categories:["women","two-piece sets"], badges:["out"], details:["M-L","Women","Hand-dyed cotton"] },
  { id:13, name:"Adire Two-Piece Set - Pattern", image:"image/best-sellers.jpg", price:"₦9,999", categories:["unisex","two-piece ankara","new"], badges:["pre"], details:["S-XL","Unisex","100% Cotton"] },
  { id:14, name:"Tailored Men’s Long Jacket", image:"image/best-sellers.jpg", price:"₦24,500", categories:["men","senaloe"], badges:["available"], details:["M-L","Men","Tailored fit"] },
  { id:15, name:"Adire Two-Piece Set - Forest Green", image:"image/bag.jpg", price:"₦9,999", categories:["women","two-piece sets","new"], badges:["new","available"], details:["S-XL","Unisex","Soft cotton"] },
  { id:16, name:"Adire Two-Piece Set - Royal Purple", image:"image/bag.jpg", price:"₦11,890", categories:["women","two-piece sets"], badges:["out"], details:["M-L","Women","Hand-dyed cotton"] },
  { id:17, name:"Adire Two-Piece Set - Pattern", image:"image/best-sellers.jpg", price:"₦9,999", categories:["unisex","two-piece ankara","new"], badges:["pre"], details:["S-XL","Unisex","100% Cotton"] },
  { id:18, name:"Tailored Men’s Long Jacket", image:"image/best-sellers.jpg", price:"₦24,500", categories:["men","senaloe"], badges:["available"], details:["M-L","Men","Tailored fit"] },
  { id:19, name:"Adire Two-Piece Set - Pattern", image:"image/best-sellers.jpg", price:"₦9,999", categories:["unisex","two-piece ankara","new"], badges:["pre"], details:["S-XL","Unisex","100% Cotton"] },
  { id:20, name:"Tailored Men’s Long Jacket", image:"image/best-sellers.jpg", price:"₦24,500", categories:["men","senaloe"], badges:["available"], details:["M-L","Men","Tailored fit"] }
];

/* -------------------------
  STATE & DOM refs
--------------------------*/
const PER_PAGE = 8;
let currentFilter = 'all';
let currentPage = 1;

const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const emptyState = document.getElementById('emptyState');
const shopCategories = document.getElementById('shopCategories');

const wishlistCountEl = document.getElementById('wishlist-count');
const cartCountEl = document.getElementById('cart-count');

const siteOverlay = document.getElementById('siteOverlay');
const cartPanel = document.getElementById('cartPanel');
const wishlistPanel = document.getElementById('wishlistPanel');
const cartPanelBody = document.getElementById('cartPanelBody');
const wishlistPanelBody = document.getElementById('wishlistPanelBody');
const checkoutBtn = document.getElementById('checkoutBtn');

/* -------------------------
  localStorage helpers
--------------------------*/
const CART_KEY = 'faygee_cart_v3';       // array of objects {id, qty}
const WISH_KEY = 'faygee_wish_v3';       // array of ids

function readCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
}
function writeCart(arr){
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
}
function readWishlist(){
  try{ return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }catch(e){ return []; }
}
function writeWishlist(arr){
  localStorage.setItem(WISH_KEY, JSON.stringify(arr));
}

/* -------------------------
  RENDER PRODUCTS
--------------------------*/
function renderProducts(){
  if(!productsGrid) return;
  const filtered = products.filter(p => currentFilter === 'all' ? true : p.categories.includes(currentFilter));
  const total = filtered.length;
  const items = filtered.slice(0, currentPage * PER_PAGE);

  productsGrid.innerHTML = '';

  if(items.length === 0){
    emptyState && (emptyState.style.display = 'block');
    loadMoreBtn && (loadMoreBtn.style.display = 'none');
    return;
  } else {
    emptyState && (emptyState.style.display = 'none');
  }

  // Step 1: Set up a universal click handler for icon actions (cart, wishlist)
document.addEventListener('click', (e) => {
  if (e.target.closest('#icon-cart')) {
    openCartPanel();
  }

  if (e.target.closest('#icon-wishlist')) {
    openWishlistPanel();
  }
});



  const wishlist = readWishlist();

  items.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = prod.id;

    const badgesHTML = (prod.badges||[]).map(b=>{
      const text = b==='new'?'NEW':b==='available'?'AVAILABLE':b==='out'?'OUT OF STOCK':'PRE-ORDER';
      return `<span class="tag ${b}">${text}</span>`;
    }).join('');

    const detailsHTML = (prod.details||[]).map(d=>`<span>${escapeHtml(d)}</span>`).join('');

    card.innerHTML = `
      <div class="product-img">
        <img loading="lazy" src="${prod.image}" alt="${escapeHtml(prod.name)}" />
        ${badgesHTML}
        <button class="wish-btn" data-id="${prod.id}" aria-pressed="${wishlist.includes(prod.id)?'true':'false'}" title="Add to wishlist">
          <span class="heart">${wishlist.includes(prod.id)?'♥':'♡'}</span>
        </button>
      </div>
      <div class="product-info">
        <h3>${escapeHtml(prod.name)}</h3>
        <div class="price">${prod.price}</div>
        <div class="details">${detailsHTML}</div>
        <div class="actions">
          <button class="btn cart btn-add-cart" data-id="${prod.id}">Add to cart</button>
          <button class="btn buy btn-add-buy" data-id="${prod.id}">Buy now</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  loadMoreBtn && (loadMoreBtn.style.display = (items.length < total) ? 'inline-block' : 'none');
}

/* -------------------------
  helpers
--------------------------*/
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

/* -------------------------
  FILTERS & CATEGORIES
--------------------------*/
if(filterBtns) {
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentPage = 1;
      renderProducts();
      syncWishlistUI(); // keep UI in sync
    });
  });
}
document.querySelectorAll('.cat-link').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const f = link.dataset.filter;
    currentFilter = f || 'all';
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
    renderProducts();
    syncWishlistUI();
  });
});

/* -------------------------
  LOAD MORE
--------------------------*/
loadMoreBtn && loadMoreBtn.addEventListener('click', ()=>{
  currentPage++;
  renderProducts();
});

/* -------------------------
  CART & WISHLIST UI SYNC
--------------------------*/
function updateCartCount(){
  const cart = readCart();
  const count = cart.reduce((s, it) => s + (it.qty || 1), 0);

  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function updateWishlistCount(){
  const list = readWishlist();
  const count = list.length;

  document.querySelectorAll('#wishlist-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}


/* highlight wishlist buttons on product cards */
function highlightWishlistButtons(){
  const list = readWishlist();
  document.querySelectorAll('.wish-btn').forEach(btn=>{
    const id = parseInt(btn.dataset.id);
    if(list.includes(id)) { btn.classList.add('active'); btn.querySelector('.heart') && (btn.querySelector('.heart').textContent='♥'); btn.setAttribute('aria-pressed','true'); }
    else { btn.classList.remove('active'); btn.querySelector('.heart') && (btn.querySelector('.heart').textContent='♡'); btn.setAttribute('aria-pressed','false'); }
  });
}

/* MASTER SYNC */
function syncWishlistUI(){
  updateWishlistCount();
  highlightWishlistButtons();
  renderWishlistPanel();
}

/* -------------------------
  WISHLIST PANEL RENDER
--------------------------*/
function renderWishlistPanel(){
  if(!wishlistPanelBody) return;
  const list = readWishlist();
  wishlistPanelBody.innerHTML = '';
  if(!list.length){ wishlistPanelBody.innerHTML = `<div class="panel-empty">Your wishlist is empty.</div>`; updateWishlistCount(); return; }

  list.forEach(id=>{
    const prod = products.find(p=> p.id == id);
    if(!prod) return;
    const div = document.createElement('div');
    div.className = 'panel-item';
    div.innerHTML = `
      <img src="${prod.image}" class="panel-thumb" alt="${escapeHtml(prod.name)}" />
      <div class="panel-info">
        <h4>${escapeHtml(prod.name)}</h4>
        <p>${escapeHtml(prod.price)}</p>
      </div>
      <div style="margin-left:auto;display:flex;flex-direction:column;gap:.4rem">
        <button class="panel-move" data-id="${id}">Add to cart</button>
        <button class="panel-remove" data-id="${id}">Remove</button>
      </div>
    `;
    wishlistPanelBody.appendChild(div);
  });

  // attach listeners (delegation could be used but panels are re-rendered so direct attach is fine)
  wishlistPanelBody.querySelectorAll('.panel-remove').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = parseInt(btn.dataset.id);
      let list = readWishlist().filter(x => x !== id);
      writeWishlist(list);
      syncWishlistUI();
    });
  });
  wishlistPanelBody.querySelectorAll('.panel-move').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = parseInt(btn.dataset.id);
      addToCartById(id,1);
      // remove from wishlist
      let list = readWishlist().filter(x => x !== id);
      writeWishlist(list);
      syncWishlistUI();
      renderCartPanel();
      openCartPanel();
    });
  });
}

/* -------------------------
  CART PANEL RENDER
--------------------------*/
function renderCartPanel(){
  if(!cartPanelBody) return;
  const cart = readCart();
  cartPanelBody.innerHTML = '';
  if(!cart.length){ cartPanelBody.innerHTML = `<div class="panel-empty">Your cart is empty.</div>`; updateCartCount(); return; }

  cart.forEach(item=>{
    const prod = products.find(p => p.id == item.id);
    if(!prod) return;
    const div = document.createElement('div');
    div.className = 'panel-item';
    div.innerHTML = `
      <img src="${prod.image}" class="panel-thumb" alt="${escapeHtml(prod.name)}" />
      <div class="panel-info">
        <h4>${escapeHtml(prod.name)}</h4>
        <p>${escapeHtml(prod.price)}</p>
        <small>Qty: <span class="qty-num">${item.qty}</span></small>
      </div>
      <div style="margin-left:auto; display:flex; gap:.4rem; flex-direction:column;">
        <button class="panel-increase" data-id="${item.id}">+</button>
        <button class="panel-decrease" data-id="${item.id}">-</button>
        <button class="panel-remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartPanelBody.appendChild(div);
  });

  // attach handlers
  cartPanelBody.querySelectorAll('.panel-increase').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = parseInt(btn.dataset.id);
      let cart = readCart();
      cart = cart.map(it=> it.id==id ? { id:it.id, qty:(it.qty||1)+1 } : it);
      writeCart(cart);
      renderCartPanel();
      updateCartCount();
    });
  });
  cartPanelBody.querySelectorAll('.panel-decrease').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = parseInt(btn.dataset.id);
      let cart = readCart();
      cart = cart.map(it=> it.id==id ? { id:it.id, qty: Math.max(1,(it.qty||1)-1) } : it);
      // remove zero not needed since min 1
      writeCart(cart);
      renderCartPanel();
      updateCartCount();
    });
  });
  cartPanelBody.querySelectorAll('.panel-remove').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = parseInt(btn.dataset.id);
      let cart = readCart().filter(it=> it.id !== id);
      writeCart(cart);
      renderCartPanel();
      updateCartCount();
    });
  });
}

/* -------------------------
  CART / WISHLIST OPERATIONS
--------------------------*/
function addToCartById(id, qty=1){
  let cart = readCart();
  const idx = cart.findIndex(it=> it.id === id);
  if(idx === -1) cart.push({ id, qty: qty });
  else cart[idx].qty = (cart[idx].qty||1) + qty;
  writeCart(cart);
  updateCartCount();
}

/* -------------------------
  PANEL OPEN / CLOSE
--------------------------*/
function openCartPanel(){ cartPanel && cartPanel.classList.add('open'); siteOverlay && siteOverlay.classList.add('open'); renderCartPanel(); }
function openWishlistPanel(){ wishlistPanel && wishlistPanel.classList.add('open'); siteOverlay && siteOverlay.classList.add('open'); renderWishlistPanel(); }
function closePanels(){ cartPanel && cartPanel.classList.remove('open'); wishlistPanel && wishlistPanel.classList.remove('open'); siteOverlay && siteOverlay.classList.remove('open'); }

siteOverlay && siteOverlay.addEventListener('click', closePanels);
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closePanels));

document.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('#icon-cart');
  const wishlistBtn = e.target.closest('#icon-wishlist');

  if (cartBtn) {
    e.preventDefault();
    openCartPanel();
  }

  if (wishlistBtn) {
    e.preventDefault();
    openWishlistPanel();
  }
});

/* -------------------------
  FORM-BOOKING PANEL OPEN / CLOSE
--------------------------*/

function closePanels() {
  document.querySelectorAll('.slide-panel').forEach(panel => {
    panel.classList.remove('open');
  });
  siteOverlay?.classList.remove('open');
}

siteOverlay?.addEventListener('click', closePanels);

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) {
    closePanels();
  }
});

document.getElementById('icon-cart')?.addEventListener('click', openCartPanel);
document.getElementById('icon-wishlist')?.addEventListener('click', openWishlistPanel);



/* -------------------------
  DELEGATED PRODUCT BUTTON EVENTS
  (works for dynamically rendered cards)
--------------------------*/
document.addEventListener('click', (e)=>{
  const cartBtn = e.target.closest('.btn-add-cart');
  const buyBtn = e.target.closest('.btn-add-buy');
  const wishBtn = e.target.closest('.wish-btn');

  if(cartBtn){
    const id = parseInt(cartBtn.dataset.id);
    addToCartById(id, 1);
    renderCartPanel();
    updateCartCount();
    // visual feedback
    cartBtn.textContent = 'Added';
    setTimeout(()=> cartBtn.textContent = 'Add to cart', 700);
    return;
  }

  if(buyBtn){
    const id = parseInt(buyBtn.dataset.id);
    addToCartById(id,1);
    // you can redirect to checkout page here or open cart
    openCartPanel();
    return;
  }

  if(wishBtn){
    const id = parseInt(wishBtn.dataset.id);
    // toggle in wishlist (store ids)
    let list = readWishlist();
    if(list.includes(id)) list = list.filter(x=> x !== id);
    else list.push(id);
    writeWishlist(list);
    syncWishlistUI();
    return;
  }
});

/* -------------------------
  CHECKOUT (simple demo handler)
--------------------------*/
checkoutBtn && checkoutBtn.addEventListener('click', ()=>{
  const cart = readCart();
  if(!cart.length){ alert('Your cart is empty'); return; }
  // Replace this with your real checkout flow
  alert('Proceed to checkout (demo). Items: ' + cart.length);
});

/* -------------------------
  INIT
--------------------------*/
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'all';
}

function setCategoryInURL(category) {
  const url = new URL(window.location);
  if (category === 'all') {
    url.searchParams.delete('category');
  } else {
    url.searchParams.set('category', category);
  }
  window.history.replaceState({}, '', url);
}

function syncFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    currentPage = 1;

    setCategoryInURL(currentFilter);   // 🔑 keeps dropdown + URL in sync
    renderProducts();
    syncFilterButtons();
    syncWishlistUI();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  currentFilter = getCategoryFromURL();
  currentPage = 1;

  renderProducts();
  syncFilterButtons();
  updateCartCount();
  updateWishlistCount();
  highlightWishlistButtons();
});


const bespokeBookingPanel = document.getElementById('bespokeBookingPanel');
const measurementPanel = document.getElementById('measurementPanel');

document.getElementById('openBespokeBooking')?.addEventListener('click', () => {
  bespokeBookingPanel.classList.add('open');
  siteOverlay.classList.add('open');
});

document.getElementById('openMeasurementForm')?.addEventListener('click', () => {
  measurementPanel.classList.add('open');
  siteOverlay.classList.add('open');
});


