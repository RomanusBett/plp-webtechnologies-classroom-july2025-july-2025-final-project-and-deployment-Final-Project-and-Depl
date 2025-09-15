
const PRODUCTS = [
  { id: 'p1', name: 'Aloe Vera', price: 12.50, category: 'Succulents', description: 'Easy-care succulent, air-purifying.', color: ['#b2e6b0','#7ad29a'] },
  { id: 'p2', name: 'Jade Plant', price: 18.00, category: 'Succulents', description: 'Thick leaves and slow grower.', color: ['#c8f2d0','#63b583'] },
  { id: 'p3', name: 'Basil', price: 6.00, category: 'Herbs', description: 'Fresh kitchen herb — basil.', color: ['#fef7d3','#cdeaa7'] },
  { id: 'p4', name: 'Mint', price: 6.50, category: 'Herbs', description: 'Fragrant mint for teas & cooking.', color: ['#e7f9e7','#c6edc6'] },
  { id: 'p5', name: 'Sunflower', price: 14.00, category: 'Flowers', description: 'Bright, cheery bloom.', color: ['#ffe3b3','#ffc26b'] },
  { id: 'p6', name: 'Orchid', price: 22.00, category: 'Flowers', description: 'Elegant flowering plant', color: ['#ffd8e6','#ffb3d4'] },
];

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function formatCurrency(num) {
  return '$' + Number(num).toFixed(2);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card product-card';

  const thumb = document.createElement('div');
  thumb.className = 'product-thumb';
  thumb.style.background = `linear-gradient(135deg, ${product.color[0]}, ${product.color[1]})`;
  thumb.textContent = '🌱';

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = formatCurrency(product.price);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const viewBtn = document.createElement('a');
  viewBtn.className = 'btn small ghost';
  viewBtn.textContent = 'View';
  viewBtn.href = `product.html?id=${product.id}`;

  const addBtn = document.createElement('button');
  addBtn.className = 'btn small primary';
  addBtn.textContent = 'Add to cart';
  addBtn.addEventListener('click', function () {
    const total = window.addToCart(product.id, 1);
    thumb.classList.add('grow-effect');
    setTimeout(()=> thumb.classList.remove('grow-effect'), 700);
    addBtn.textContent = 'Added ✓';
    setTimeout(()=> addBtn.textContent = 'Add to cart', 900);
  });

  actions.appendChild(viewBtn);
  actions.appendChild(addBtn);

  card.appendChild(thumb);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(actions);

  return card;
}

function renderProducts(containerSelector, opts = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = '';
  let products = PRODUCTS.slice();

  if (opts.search) {
    const q = opts.search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (opts.category) {
    products = products.filter(p => p.category === opts.category);
  }
  if (opts.sort === 'price-asc') products.sort((a,b)=>a.price-b.price);
  if (opts.sort === 'price-desc') products.sort((a,b)=>b.price-a.price);

  products.forEach(p => container.appendChild(createProductCard(p)));
}

function renderFeatured(containerSelector, count = 4) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = '';
  const featured = PRODUCTS.slice(0,count);
  featured.forEach(p => container.appendChild(createProductCard(p)));
}

function initShop() {
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  const catSelect = document.getElementById('categorySelect');
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat; opt.textContent = cat;
    catSelect.appendChild(opt);
  });

  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  function doRender() {
    const q = searchInput.value.trim();
    const cat = catSelect.value;
    const sort = sortSelect.value;
    renderProducts('#productsGrid', { search: q, category: cat, sort });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    catSelect.value = catParam;
  }

  searchInput.addEventListener('input', () => doRender());
  catSelect.addEventListener('change', () => doRender());
  sortSelect.addEventListener('change', () => doRender());

  doRender();
}

function renderProductPage() {
  const id = new URLSearchParams(window.location.search).get('id');
  const container = document.getElementById('productContent');
  if (!container) return;
  const product = findProduct(id) || PRODUCTS[0]; 
  container.innerHTML = '';

  const left = document.createElement('div');
  left.className = 'product-visual card';
  const thumb = document.createElement('div');
  thumb.className = 'product-thumb';
  thumb.style.margin = '0 auto';
  thumb.style.background = `linear-gradient(135deg, ${product.color[0]}, ${product.color[1]})`;
  thumb.style.width = '200px';
  thumb.style.height = '200px';
  thumb.textContent = '🌱';

  left.appendChild(thumb);

  const right = document.createElement('div');
  right.className = 'product-details';
  const title = document.createElement('h2'); title.textContent = product.name;
  const cat = document.createElement('p'); cat.className='muted'; cat.textContent = product.category;
  const price = document.createElement('p'); price.className='product-price'; price.textContent = formatCurrency(product.price);
  const desc = document.createElement('p'); desc.textContent = product.description;

  const qtyLabel = document.createElement('label'); qtyLabel.textContent = 'Quantity';
  const qtyInput = document.createElement('input'); qtyInput.type='number'; qtyInput.value=1; qtyInput.min=1; qtyInput.style.width='80px'; qtyInput.style.marginLeft='8px';
  qtyLabel.appendChild(qtyInput);

  const addBtn = document.createElement('button'); addBtn.className='btn primary'; addBtn.textContent='Add to cart';
  addBtn.addEventListener('click', function () {
    const qty = Math.max(1, parseInt(qtyInput.value) || 1);
    const total = window.addToCart(product.id, qty); 
    thumb.classList.add('grow-effect');
    setTimeout(()=> thumb.classList.remove('grow-effect'), 700);
    addBtn.textContent = `Added (${total})`;
    setTimeout(()=> addBtn.textContent = 'Add to cart', 900);
  });

  right.appendChild(title);
  right.appendChild(cat);
  right.appendChild(price);
  right.appendChild(desc);
  right.appendChild(qtyLabel);
  right.appendChild(document.createElement('br'));
  right.appendChild(addBtn);

  container.appendChild(left);
  container.appendChild(right);
}

function initCartPage() {
  const section = document.getElementById('cartSection');
  const totals = document.getElementById('cartTotals');
  if (!section || !totals) return;

  function refresh() {
    const cart = window.getCart(); 
    section.innerHTML = '';
    if (cart.length === 0) {
      section.innerHTML = '<p>Your cart is empty. <a href="shop.html">Shop plants</a></p>';
      totals.innerHTML = '';
      window.updateCartCountUI();
      return;
    }

    let subtotal = 0;
    cart.forEach(item => {
      const prod = findProduct(item.id);
      const card = document.createElement('div');
      card.className = 'cart-item';

      const thumb = document.createElement('div');
      thumb.className = 'product-thumb';
      thumb.style.width='72px'; thumb.style.height='72px';
      thumb.style.background = `linear-gradient(135deg, ${prod.color[0]}, ${prod.color[1]})`;
      thumb.textContent = '🌱';

      const meta = document.createElement('div');
      meta.style.flex='1';
      meta.innerHTML = `<div class="product-name">${prod.name}</div><div class="muted">${prod.category}</div>`;

      const price = document.createElement('div');
      price.className = 'product-price';
      price.textContent = formatCurrency(prod.price * item.qty);

      const qtyControls = document.createElement('div');
      qtyControls.className = 'qty-controls';
      const minus = document.createElement('button'); minus.textContent='−';
      const qty = document.createElement('span'); qty.textContent = item.qty; qty.style.margin='0 8px';
      const plus = document.createElement('button'); plus.textContent='+';
      const remove = document.createElement('button'); remove.textContent='Remove'; remove.className='btn small ghost';
      minus.addEventListener('click', ()=> {
        const newQty = Math.max(0, item.qty - 1);
        window.updateCartItem(item.id, newQty);
        refresh();
      });
      plus.addEventListener('click', ()=> {
        const newQty = item.qty + 1;
        window.updateCartItem(item.id, newQty);
        refresh();
      });
      remove.addEventListener('click', ()=> {
        window.updateCartItem(item.id, 0);
        refresh();
      });

      qtyControls.appendChild(minus);
      qtyControls.appendChild(qty);
      qtyControls.appendChild(plus);
      qtyControls.appendChild(remove);

      card.appendChild(thumb);
      card.appendChild(meta);
      card.appendChild(qtyControls);
      card.appendChild(price);

      section.appendChild(card);

      subtotal += prod.price * item.qty;
    });

    totals.innerHTML = `
      <div class="card">
        <h3>Cart totals</h3>
        <p>Subtotal: <strong>${formatCurrency(subtotal)}</strong></p>
        <p>Shipping: <em>Free (demo)</em></p>
        <p>Tax (8%): <strong>${formatCurrency(subtotal * 0.08)}</strong></p>
        <p>Total: <strong>${formatCurrency(subtotal * 1.08)}</strong></p>
        <div style="margin-top:10px">
          <button id="checkoutBtn" class="btn primary">Proceed to checkout</button>
          <button id="clearCartBtn" class="btn ghost">Clear cart</button>
        </div>
      </div>
    `;

    document.getElementById('clearCartBtn').addEventListener('click', ()=> {
      window.clearCart();
      refresh();
    });
    document.getElementById('checkoutBtn').addEventListener('click', ()=> {
      alert('Checkout demo — this site does not process payments.');
    });

    window.updateCartCountUI();
  }

  refresh();
}

window.PRODUCTS = PRODUCTS;
window.findProduct = findProduct;
window.formatCurrency = formatCurrency;
window.renderProducts = renderProducts;
window.renderFeatured = renderFeatured;
window.initShop = initShop;
window.renderProductPage = renderProductPage;
window.initCartPage = initCartPage;
