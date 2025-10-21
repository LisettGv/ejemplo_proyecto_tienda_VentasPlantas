// Utilidades compartidas: carrito (contador) y helpers

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

function readLS(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){
    return fallback;
  }
}
function writeLS(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

function getCart(){ return readLS('cart', []); }
function setCart(c){ writeLS('cart', c); }

function getUsers(){ return readLS('users', []); }
function setUsers(u){ writeLS('users', u); }

function getCurrentUser(){ return readLS('currentUser', null); }
function setCurrentUser(u){ writeLS('currentUser', u); }

function cartCount(){
  const c = getCart();
  return c.reduce((acc, it) => acc + (it.qty||0), 0);
}

function updateCartBadge(){
  const el = document.querySelector('#cart-count');
  if(el){ el.textContent = cartCount(); }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Resalta el enlace activo del menú
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav]').forEach(a => {
    if(a.getAttribute('href') === here) a.classList.add('active');
  });
});
