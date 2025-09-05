/* ========= Config ========= */
const DATA_URL = '/assets/products.json?v=' + Date.now(); // cache busting
const CURRENCY = 'ARS';

let DB = { categories: [], products: [] };
let currentBrand = 'Todos';
let currentSubcat = null;
let cart = JSON.parse(localStorage.getItem('gr_cart') || '[]');

/* ========= Helpers ========= */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

const formatPrice = v => new Intl.NumberFormat('es-AR', { style:'currency', currency:CURRENCY }).format(v);
const toast = (msg) => {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2200);
};
const saveCart = () => localStorage.setItem('gr_cart', JSON.stringify(cart));
const cartCount = () => cart.reduce((a,i)=>a+i.qty,0);
const cartTotal = () => cart.reduce((a,i)=>a+i.qty*i.price,0);

/* ========= Init ========= */
fetch(DATA_URL)
  .then(r => r.json())
  .then(data => {
    DB.categories = data.categories || [];
    DB.products   = data.products   || [];
    buildSidebar();
    buildBrandChips();
    renderGrid();
    updateCartUI();
  })
  .catch(err => {
    console.error('Error cargando JSON', err);
    toast('No se pudo cargar los datos');
  });

/* ========= Sidebar (derecha) ========= */
function buildSidebar(){
  const menu = $('#catsMenu');
  menu.innerHTML = '';

  DB.categories.forEach(cat => {
    const li = document.createElement('li');
    const hasSubs = Array.isArray(cat.subcategories) && cat.subcategories.length;

    if (hasSubs){
      const btn = document.createElement('button');
      btn.className = 'cat';
      btn.innerHTML = `${cat.name} <span class="arrow">▾</span>`;
      btn.addEventListener('click', () => li.classList.toggle('open'));
      li.appendChild(btn);

      const ul = document.createElement('ul');
      ul.className = 'submenu';

      cat.subcategories.forEach(sc => {
        const it = document.createElement('button');
        it.className = 'subcat';
        it.textContent = sc;
        it.addEventListener('click', () => {
          currentBrand = cat.name;
          currentSubcat = sc;
          highlightActiveChip();
          renderGrid();
        });
        const liSub = document.createElement('li'); liSub.appendChild(it);
        ul.appendChild(liSub);
      });

      li.appendChild(ul);
    } else {
      const btn = document.createElement('button');
      btn.className = 'cat';
      btn.textContent = cat.name;
      btn.addEventListener('click', () => {
        currentBrand = cat.name; currentSubcat = null;
        highlightActiveChip(); renderGrid();
      });
      li.appendChild(btn);
    }

    menu.appendChild(li);
  });
}

/* ========= Chips de marcas arriba ========= */
function buildBrandChips(){
  const container = $('#brandChips');
  const brands = ['Todos', ...DB.categories.slice(0,3).map(c => c.name)]; // las 3 marcas con subcats
  container.innerHTML = '';
  brands.forEach(b => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = b;
    chip.addEventListener('click', () => {
      currentBrand = b; currentSubcat = null; highlightActiveChip(); renderGrid();
    });
    container.appendChild(chip);
  });
  highlightActiveChip();
}

function highlightActiveChip(){
  $$('#brandChips .chip').forEach(ch => ch.classList.toggle('active', ch.textContent === currentBrand));
}

/* ========= Render Grid ========= */
$('#searchInput').addEventListener('input', renderGrid);
$('#orderSelect').addEventListener('change', renderGrid);

function renderGrid(){
  const q = $('#searchInput').value.trim().toLowerCase();
  let list = DB.products.slice();

  // filtro por marca/subcat
  if (currentBrand !== 'Todos'){
    // si es una de las 3 marcas, filtra por brand y, si hay subcat, también
    const is3 = ['Vicrola','Steffany','Unicity'].includes(currentBrand);
    if (is3){
      list = list.filter(p => p.brand === currentBrand);
      if (currentSubcat) list = list.filter(p => (p.subcategory||'') === currentSubcat);
    } else {
      // categoría plana: brand guarda el nombre de la cat
      list = list.filter(p => p.brand === currentBrand);
    }
  }

  // búsqueda
  if (q) list = list.filter(p => `${p.name} ${p.brand} ${p.subcategory||''}`.toLowerCase().includes(q));

  // orden
  const order = $('#orderSelect').value;
  if (order === 'price_asc') list.sort((a,b)=>a.price-b.price);
  if (order === 'price_desc') list.sort((a,b)=>b.price-a.price);
  if (order === 'newest') list.sort((a,b)=>String(b.id).localeCompare(String(a.id))); // heurística

  const grid = $('#grid');
  grid.innerHTML = list.map(p => cardHTML(p)).join('') || `<p class="muted">Sin resultados.</p>`;
  // bind add-to-cart
  $$('.add-btn', grid).forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const prod = DB.products.find(x=>x.id===id);
      addToCart(prod);
    });
  });
}

const cardHTML = (p) => `
  <article class="card">
    <div class="muted">${p.brand}${p.subcategory?` · ${p.subcategory}`:''}</div>
    <h4>${p.name}</h4>
    <div class="price">${formatPrice(p.price)}</div>
    <button class="btn primary add-btn" data-id="${p.id}">Agregar</button>
  </article>
`;

/* ========= Carrito ========= */
$('#cartBtn').addEventListener('click', ()=> $('#cartDrawer').classList.add('open'));
$('#closeCart').addEventListener('click', ()=> $('#cartDrawer').classList.remove('open'));

function addToCart(p){
  const found = cart.find(i=>i.id===p.id);
  if (found) found.qty += 1; else cart.push({id:p.id, name:p.name, price:p.price, qty:1});
  saveCart(); updateCartUI(); toast('Producto agregado');
}

function updateCartUI(){
  $('#cartCount').textContent = cartCount();
  $('#cartSubtotal').textContent = formatPrice(cartTotal());

  const wrap = $('#cartItems');
  if (!cart.length){ wrap.innerHTML = `<p class="muted">Aún no hay productos en el carrito.</p>`; return; }
  wrap.innerHTML = cart.map(i => `
    <div class="line">
      <div>
        <strong>${i.name}</strong>
        <div class="muted">${formatPrice(i.price)} × ${i.qty}</div>
      </div>
      <div>
        <button class="icon" data-act="minus" data-id="${i.id}">−</button>
        <button class="icon" data-act="plus"  data-id="${i.id}">＋</button>
        <button class="icon" data-act="rm"    data-id="${i.id}">🗑</button>
      </div>
    </div>
  `).join('');

  // acciones
  $$('#cartItems .icon').forEach(b=>{
    b.addEventListener('click', ()=>{
      const id = b.dataset.id;
      const it = cart.find(x=>x.id===id);
      if (!it) return;
      if (b.dataset.act==='minus'){ it.qty = Math.max(0, it.qty-1); if (!it.qty) cart = cart.filter(x=>x.id!==id); }
      if (b.dataset.act==='plus'){ it.qty += 1; }
      if (b.dataset.act==='rm'){ cart = cart.filter(x=>x.id!==id); }
      saveCart(); updateCartUI();
    });
  });
}

$('#checkoutBtn').addEventListener('click', ()=>{
  if (!cart.length) return toast('Tu carrito está vacío');
  const orderId = 'GR' + Date.now().toString().slice(-7);
  const total = cartTotal();
  cart = []; saveCart(); updateCartUI(); $('#cartDrawer').classList.remove('open');
  alert(`✅ Pedido finalizado con éxito\n\nN.º de pedido: ${orderId}\nTotal: ${formatPrice(total)}`);
});

/* ========= Registro → Google Sheets ========= */
const dlg = $('#registerDialog');
$('#registerBtn').addEventListener('click', ()=> dlg.showModal());
$('#cancelRegister, #closeRegister').forEach?.call
  ? null
  : undefined;
$('#cancelRegister').addEventListener('click', ()=> dlg.close());
$('#closeRegister').addEventListener('click', ()=> dlg.close());

$('#registerForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = {
    name: fd.get('name').trim(),
    email: fd.get('email').trim(),
    zone: fd.get('zone').trim(),
    optica: fd.get('optica').trim()
  };
  try{
    const url = (window.GS_WEBAPP_URL||'').trim();
    if (!url){ toast('Configura la URL del WebApp (Google Sheets)'); return; }
    const r = await fetch(url, { method:'POST', mode:'cors', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const json = await r.json().catch(()=>({}));
    if (r.ok && json.ok){ toast('Registro guardado'); dlg.close(); e.currentTarget.reset(); }
    else { throw new Error(json?.message||'Error desconocido'); }
  }catch(err){
    console.error(err); toast('No se pudo guardar el registro');
  }
});

