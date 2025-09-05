// ==========================
//  Config
// ==========================
const DATA_URL = '/assets/products.json?v=' + Date.now(); // cache busting
const WHATSAPP = '5491111111111'; // poné tu número cuando quieras

// Estado global mínimo
let DB = { categories: [], products: [] };
let currentCategory = 'Todos';
let currentSubcategory = null;

// Helpers DOM
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// ==========================
//  Inicio
// ==========================
fetch(DATA_URL)
  .then(r => r.json())
  .then(data => {
    DB.categories = data.categories || [];
    DB.products   = data.products   || [];
    buildSidebar();     // <- arma la barra desde JSON
    // acá podrías llamar a renderProducts() si ya tenés la grilla
  })
  .catch(err => console.error('Error cargando JSON:', err));

// ==========================
//  Sidebar desde products.json
// ==========================
function buildSidebar() {
  const sidebar = document.querySelector('.sidebar .menu') || document.querySelector('.menu');
  if (!sidebar) return;

  // limpiar por si el HTML dejó algo
  sidebar.innerHTML = '';

  DB.categories.forEach(cat => {
    const li  = document.createElement('li');
    const hasSubs = Array.isArray(cat.subcategories) && cat.subcategories.length > 0;

    if (hasSubs) {
      // Categoría con subcategorías
      const btn = document.createElement('button');
      btn.className = 'dropdown-btn';
      btn.innerHTML = `${cat.name} <span class="arrow">▸</span>`;
      btn.addEventListener('click', () => {
        li.classList.toggle('open');
      });

      const ul = document.createElement('ul');
      ul.className = 'dropdown-list';

      cat.subcategories.forEach(sc => {
        const it = document.createElement('li');
        it.innerHTML = `<button class="subcat">${sc}</button>`;
        it.querySelector('button').addEventListener('click', () => {
          currentCategory    = cat.name;
          currentSubcategory = sc;
          // renderProducts(); // si tenés grilla
        });
        ul.appendChild(it);
      });

      li.appendChild(btn);
      li.appendChild(ul);
    } else {
      // Categoría sin subcategorías (botón plano)
      const btn = document.createElement('button');
      btn.className = 'cat';
      btn.textContent = cat.name;
      btn.addEventListener('click', () => {
        currentCategory    = cat.name;
        currentSubcategory = null;
        // renderProducts();
      });
      li.appendChild(btn);
    }

    sidebar.appendChild(li);
  });
}

// ==========================
//  (Opcional) Grilla de productos
// ==========================
// Acá dejé hooks preparados. Si todavía no cargás productos desde JSON,
// los podés agregar después. Mantengo la firma por si ya la usabas.
function renderProducts() {
  // Ejemplo mínimo (comentar si no usás aún):
  // const grid = $('.grid');
  // if (!grid) return;
  // grid.innerHTML = '';
  // // filtrado simple
  // const list = DB.products.filter(p => {
  //   const okCat  = (currentCategory === 'Todos') || (p.category === currentCategory);
  //   const okSub  = !currentSubcategory || (p.subcategory === currentSubcategory);
  //   return okCat && okSub;
  // });
  // list.forEach(p => {
  //   const card = document.createElement('div');
  //   card.className = 'card';
  //   card.innerHTML = `<h4>${p.name}</h4>`;
  //   grid.appendChild(card);
  // });
}
