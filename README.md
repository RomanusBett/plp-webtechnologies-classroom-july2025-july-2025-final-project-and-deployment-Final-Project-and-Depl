# GreenCart — Plant e-commerce prototype

This is a small multi-page e-commerce prototype built with **HTML5**, **CSS3**, and **vanilla JavaScript**. The project is themed around plants and demonstrates CSS animations, JS functions (with parameters/returns/scope), and integration between JS and CSS (adding/removing classes to trigger animations).

## Purpose
- Assignment: create a 5-page website with planning, implementation, and deployment guidance.
- Pages: Home, Shop, Product, Cart, Contact.
- Functionality: search & filter, product detail page (via `?id=`), cart persisted in `localStorage`, contact form validation.

## File structure
green-cart/
├── index.html
├── shop.html
├── product.html
├── cart.html
├── contact.html
├── css/
│ └── styles.css
├── js/
│ ├── main.js
│ └── shop.js
└── README.md


## How to run locally
1. Clone the repo or download files.
2. Serve using a static server (recommended to support `product.html?id=...`):
   - Python 3: `python -m http.server 8000`
   - Then open `http://localhost:8000/` in your browser.

## Notes on JS & CSS
- `js/main.js` contains shared utilities and cart management functions:
  - `addToCart(productId, qty)` — demonstrates parameters & returns.
  - `getCart()` / `saveCart(cart)` — localStorage persistence.
  - `validateContactForm(obj)` — returns `{ valid, errors }`.

- `js/shop.js` contains product data and render logic:
  - `renderProducts(container, opts)` — filter/search/sort usage.
  - `renderProductPage()` — reads `?id=...` and fills DOM.

- CSS (`css/styles.css`) uses:
  - CSS variables, responsive grid, keyframe animation `grow-pop`, reveal animations for hero, simple mobile nav.

## Deployment
You can deploy on GitHub Pages, Netlify, or Vercel.

**Quick (GitHub Pages)**
1. Push this repo to GitHub.
2. In repo settings → Pages → set branch to `main` and folder `/ (root)`.
3. Save; the site will be available at `https://<your-username>.github.io/<repo>/`.

**Netlify**
- Drag & drop the project folder to Netlify Drop (or connect repo), and it will deploy a static site. Use build command: none (static).

**Vercel**
- Connect repository and deploy as a static site.

## To-do / Improvements (optional)
- Add images in `/images` and swap CSS placeholder thumbs for real photos.
- Implement real checkout with payment gateway.
- Add simple product inventory and admin area.

## License
Demo code — free to use and adapt for learning purposes.
