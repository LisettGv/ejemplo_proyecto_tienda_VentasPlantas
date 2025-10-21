// Datos de 6 productos simples
const PRODUCTS = [
  { id: 1, name: 'Suculenta Echeveria', price: 3990, img: 'assets/Suculenta Echeveria.jpg', category: 'Suculentas', ribbon: 'Nuevo'},
  { id: 2, name: 'Cactus Nopalito', price: 2990, img: 'assets/Cactus Nopalito.jpg', category: 'Cactus'},
  { id: 3, name: 'Helecho Boston', price: 5990, img: 'assets/Helecho Boston.png', category: 'Interior', ribbon: 'Oferta'},
  { id: 4, name: 'Aloe Vera', price: 4990, img: 'assets/Aloe Vera.jpg', category: 'Medicinal'},
  { id: 5, name: 'Pothos Dorado', price: 6990, img: 'assets/Pothos Dorado.jpg', category: 'Interior', variant: 'compact'},
  { id: 6, name: 'Lavanda', price: 7990, img: 'assets/Lavanda.jpg', category: 'Aromáticas'},
];

function renderProducts(){
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h4>${p.name}</h4>
      <div class="price">${CLP.format(p.price)}</div>
      <button class="btn" data-id="${p.id}">Agregar al carrito</button>
    `;
    grid.appendChild(card);
  });

  // Listeners "Agregar"
  grid.querySelectorAll('button.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      addToCart(id);
    });
  });
}

function addToCart(productId, qty = 1){
  const product = PRODUCTS.find(p => p.id === productId);
  if(!product) return;

  const cart = getCart();
  const idx = cart.findIndex(it => it.id === productId);
  if(idx >= 0){
    cart[idx].qty += qty;
  }else{
    cart.push({ id: product.id, name: product.name, price: product.price, qty });
  }
  setCart(cart);
  updateCartBadge();
  renderCart();
}


function removeFromCart(productId){
  let cart = getCart();
  cart = cart.filter(it => it.id !== productId);
  setCart(cart);
  updateCartBadge();
  renderCart();
}

function clearCart(){
  setCart([]);
  updateCartBadge();
  renderCart();
}

function renderCart(){
  const wrap = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const emptyEl = document.getElementById('cart-empty');

  const cart = getCart();
  wrap.innerHTML = '';

  if(cart.length === 0){
    emptyEl.style.display = 'block';
    totalEl.textContent = CLP.format(0);
    return;
  }else{
    emptyEl.style.display = 'none';
  }

  let total = 0;
  cart.forEach(it => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    total += it.price * it.qty;
    row.innerHTML = `
      <span>${it.name} × ${it.qty}</span>
      <span>${CLP.format(it.price * it.qty)} <button aria-label="Quitar" style="margin-left:8px" data-remove="${it.id}">✕</button></span>
    `;
    wrap.appendChild(row);
  });
  totalEl.textContent = CLP.format(total);

  // quitar
  wrap.querySelectorAll('button[data-remove]').forEach(b => {
    b.addEventListener('click', () => removeFromCart(Number(b.dataset.remove)));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  //renderProducts(); // <- DESACTIVADO: ahora React renderiza la grilla
  renderCart();

  document.getElementById('clear-cart').addEventListener('click', clearCart);
});
