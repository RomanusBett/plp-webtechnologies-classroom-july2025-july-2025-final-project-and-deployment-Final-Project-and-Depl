const STORAGE_KEY = 'greenCartCart';

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function initMobileMenu() {
  const toggle = qs('#mobileMenuToggle');
  const nav = qs('#mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

function getCart() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Cart parse error', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCountUI();
    return true;
  } catch (e) {
    console.error('Failed to save cart', e);
    return false;
  }
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
  return cart.reduce((s, it) => s + it.qty, 0); 
}

function updateCartItem(productId, qty) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return false;
  if (qty <= 0) {
    cart.splice(idx,1);
  } else {
    cart[idx].qty = qty;
  }
  saveCart(cart);
  return cart.some(i => i.id === productId);
}


function clearCart() {
  saveCart([]);
}

function updateCartCountUI() {
  const el = qs('#cartCount');
  if (!el) return;
  const cart = getCart();
  const total = cart.reduce((s,i) => s + i.qty, 0);
  el.textContent = total;
}

function validateContactForm({ name, email, message }) {
  const errors = [];
  if (!name || name.length < 2) errors.push('Name too short');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email');
  if (!message || message.length < 10) errors.push('Message too short');
  return { valid: errors.length === 0, errors };
}

function initNewsletterForms() {
  qsa('#newsletterForm').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('#newsletterMsg') || form.querySelector('.muted');
      if (!input || !msg) return;
      if (!/^\S+@\S+\.\S+$/.test(input.value)) {
        msg.textContent = 'Please enter a valid email';
        msg.style.color = '#b00020';
        return;
      }
      msg.textContent = 'Subscribed (demo)!';
      msg.style.color = '#2a7a2a';
      form.reset();
      setTimeout(()=> { msg.textContent=''; }, 3000);
    });
  });
}

function initSite() {
  initMobileMenu();
  updateCartCountUI();
  initNewsletterForms();
  const y = new Date().getFullYear(); qs('#year') && (qs('#year').textContent = y);
}

window.addToCart = addToCart;
window.getCart = getCart;
window.updateCartItem = updateCartItem;
window.clearCart = clearCart;
window.updateCartCountUI = updateCartCountUI;
window.validateContactForm = validateContactForm;

document.addEventListener('DOMContentLoaded', initSite);
