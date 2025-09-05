// ====== Config ======
const DATA_URL = '/assets/products.json?v=' + Date.now(); //
const WHATSAPP = '5491128967189'; //


let DB = { categories: [], products: [] };
let currentCategory = 'Todos';
let currentSubcategory = null;

// Helpers DOM
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// =================== Init ===================
fetch(DATA_URL)
  .then(r => {
    console.log('[fetch] leyendo JSON desde:', DATA_URL, 'status:', r.status);
    return r.json();
  })
  .then(data => {
    DB.categories = data.categories || [];
    DB.products   = data.products   || [];
    console.log('[OK] categorías:', DB.categories);
    console.log('[OK] productos:  ', DB.products);

    buildSidebar();
    renderProducts(); // si no tenés grilla, no pasa nada
  })
  .catch(err => {
    console.error('[ERROR] cargando JSON:', err);
  });

// =================== Sidebar ===================
function buildSidebar() {
  // tratamos de encontrar la lista del sidebar; usa lo que exista en tu HTML
  const sidebar = document.querySelector('.sidebar .menu') ||
                  document.querySelector('.menu') ||
                  document.querySelector('#sidebar') ||
                  document.querySelector('.sidebar');

  if (!sidebar) {
    console.warn('[sidebar] No encontré contenedor de menú (.sidebar .menu / .menu / #sidebar /.sidebar)');
    return;
  }

  sidebar.innerHTML = '';
  
  // “Todos”
  const liAll = document.createElement('li');
  liAll.innerHTML = `<button class="dropdown-btn">Todos</button>`;
  liAll.querySelector('button').addEventListener('click', () => {
    currentCategory = 'Todos';
    currentSubcategory = null;
    renderProducts();
  });
  sidebar.appendChild(liAll);

  // Mapa de subcategorías preferidas desde products.json
  const CATS_PREF = new Map((DB.categories || []).map(c => [c.name, c.subcategories || []]));

  DB.categories.forEach(cat => {
    const subs = CATS_PREF.get(cat.name) || [];

    const li = document.createElement('li');

    // botón principal de la categoría
    const btn = document.createElement('button');
    btn.className = 'dropdown-btn';
    btn.innerHTML = `${cat.name} <span class="arrow">▾</span>`;
    btn.addEventListener('click', () => {
      // si no hay subcategorías, filtra por categoría directamente
      if (!subs.length) {
        currentCategory = cat.name;
        currentSubcategory = null;
        renderProducts();
        return;
      }
      li.classList.toggle('open'); // abre/cierra el ul de subcats
    });
    li.appendChild(btn);

    if (subs.length) {
      // lista de subcategorías
      const ul = document.createElement('ul');
      ul.className = 'dropdown-list';

      subs.forEach(sc => {
        const it = document.createElement('li');
        it.innerHTML = `<button class="subcat">${sc}</button>`;
        it.querySelector('button').addEventListener('click', () => {
          currentCategory = cat.name;
          currentSubcategory = sc;
          renderProducts();
        });
        ul.appendChild(it);
      });

      li.appendChild(ul);
    }

    sidebar.appendChild(li);
  });
}

// =================== Productos (opcional) ===================
// Si no tenés un contenedor, podés agregar en tu HTML:
// <div id="grid"></div>
function renderProducts() {
  const grid = document.querySelector('#grid') ||
               document.querySelector('.grid') ||
               document.querySelector('[data-grid]');

  // Si no hay grid no hacemos nada (pero sidebar funciona igual)
  if (!grid) {
    console.log('[render] No hay contenedor de grilla, solo sidebar funcionando.');
    return;
  }

  let items = [...DB.products];

  if (currentCategory && currentCategory !== 'Todos') {
    items = items.filter(p => p.category === currentCategory);
  }
  if (currentSubcategory) {
    items = items.filter(p => p.subcategory === currentSubcategory);
  }

  grid.innerHTML = items.map(p => `
    <article class="card">
      <div class="thumb">${p.image ? `<img src="assets/${p.image}" alt="${p.name}">` : ''}</div>
      <h4>${p.name}</h4>
      <small>${p.category}${p.subcategory ? ' · ' + p.subcategory : ''}</small>
      ${p.price != null ? `<strong>$ ${p.price}</strong>` : ''}
    </article>
  `).join('') || `<p style="opacity:.7">Sin resultados.</p>`;
}
