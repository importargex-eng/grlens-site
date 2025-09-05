// ====== Config ======
const DATA_URL = 'assets/products.json?v=' + Date.now();

      // ruta al JSON
const WHATSAPP = '5491128967189';            // <— tu número con código país, sin +

// ====== Estado ======
let DB = { categories: [], products: [] };
let currentCategory = 'Todos';
let currentSubcategory = null;
let searchText = '';

// ====== Helpers ======
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

function formatPrice(n) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

// ====== Carga inicial ======
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  buildSidebar();
  drawProducts();
  setupSearch();
});

// ====== Fetch JSON ======
console.log('Cargando JSON desde:', DATA_URL);
fetch(DATA_URL)
  .then(r => {
    console.log('Status fetch:', r.status);
    return r.json();
  })
  .then(data => {
    console.log('Categorias cargadas:', data.categories);
    console.log('Productos cargados:', data.products);
    // ... tu código que asigna DB = data ...
  })
  .catch(err => console.error('Error cargando JSON', err));

// ===== Inicio =====
document.addEventListener('DOMContentLoaded', init);

function init() {
  fetch(DATA_URL)
    .then(r => {
      console.log('Cargando JSON desde:', DATA_URL, 'status:', r.status);
      return r.json();
    })
    .then(data => {
      DB.categories = data.categories || [];
      DB.products   = data.products   || [];

      console.log('Categorias cargadas:', DB.categories);
      console.log('Productos cargados:', DB.products);

      buildSidebar();
      renderProducts(); // si aún no tenés esta función, dejá un stub
    })
    .catch(err => console.error('Error cargando JSON:', err));
}

// ====== Sidebar con subcategorías ======
function buildSidebar() {
  const sidebar = document.querySelector('.sidebar .menu') || document.querySelector('.menu');
  if (!sidebar) return;

  sidebar.innerHTML = '';

  DB.categories.forEach(cat => {
    const li = document.createElement('li');
        
// ---- Subcategorías preferidas definidas en products.json -> categories[].subcategories
const CATS_PREF = new Map(
  (DB.categories || []).map(c => [c.name, c.subcategories || []])
);

  DB.categories.forEach(cat => {
  // usar la función para obtener subcategorías
  const subs = CATS_PREF.get(cat.name) || [];

  if (subs.length) {
    // item desplegable
    const li = document.createElement('li');

    const btn = document.createElement('button');
    btn.className = 'dropdown-btn';
    btn.innerHTML = `${cat.name} <span class="arrow">▾</span>`;
    btn.addEventListener('click', () => {
      li.classList.toggle('open');
    });

    const ul = document.createElement('ul');
    ul.className = 'dropdown-list';

    subs.forEach(sc => {
      const it = document.createElement('li');
      it.innerHTML = `<button class="subcat">${sc}</button>`;
      it.querySelector('button').addEventListener('click', () => {
        currentCategory = cat.name;
        currentSubcategory = sc;
        renderProducts(); // o tu función de render
      });
      ul.appendChild(it);
    });

    li.appendChild(btn);
    li.appendChild(ul);
    sidebar.appendChild(li);
  } else {
    // categoría sin subcategorías
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.textContent = cat.name;
    b.addEventListener('click', () => {
      currentCategory = cat.name;
      currentSubcategory = null;
      renderProducts();
    });
    li.appendChild(b);
    sidebar.appendChild(li);
  }
});


      const btn = document.createElement('button');
      btn.className = 'dropdown-btn';
      btn.innerHTML = `${cat.name} <span class="arrow">▼</span>`;
      btn.addEventListener('click', () => {
        li.classList.toggle('open');
      });
      // al hacer click en el texto principal: filtra por categoría completa
      btn.addEventListener('dblclick', () => {
        currentCategory = cat.name;
        currentSubcategory = null;
        activateSidebar(cat.name);
        drawProducts();
      });

      const ul = document.createElement('ul');
      ul.className = 'submenu';

      cat.subcategories.forEach(sub => {
        const sli = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = sub;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          currentCategory = cat.name;
          currentSubcategory = sub;
          activateSidebar(cat.name, sub);
          drawProducts();
        });
        sli.appendChild(a);
        ul.appendChild(sli);
      });

      li.appendChild(btn);
      li.appendChild(ul);
      sidebar.appendChild(li);

    } else {
      // item normal
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = cat.name;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategory = cat.name;
        currentSubcategory = null;
        activateSidebar(cat.name);
        drawProducts();
      });
      li.appendChild(a);
      sidebar.appendChild(li);
    }
  });

  // activar "Todos" al cargar
  activateSidebar('Todos');
}

// marca activa en sidebar
function activateSidebar(catName, subName=null) {
  // limpia
  $$('.menu a, .menu .dropdown-btn').forEach(el => el.classList.remove('active'));
  $$('.menu li').forEach(li => li.classList.remove('open'));

  // busca y marca
  const allButtons = $$('.menu .dropdown-btn');
  const allLinks = $$('.menu a');

  // si es sub
  if (subName) {
    // abrir el padre
    const btn = allButtons.find(b => b.textContent.trim().startsWith(catName));
    if (btn) btn.parentElement.classList.add('open');

    // activar la sub
    const sub = allLinks.find(a => a.textContent.trim() === subName);
    if (sub) sub.classList.add('active');
  } else {
    // categoría
    // si existe como normal
    const normal = allLinks.find(a => a.textContent.trim() === catName);
    if (normal) normal.classList.add('active');

    // si existe como desplegable
    const btn = allButtons.find(b => b.textContent.trim().startsWith(catName));
    if (btn) btn.classList.add('active');
  }
}

// ====== Render de productos ======
function drawProducts() {
  const grid = document.querySelector('#productos-grid') || document.querySelector('.productos-grid');
  if (!grid) return;

  let list = DB.products.slice();

  // filtro categoría
  if (currentCategory && currentCategory !== 'Todos') {
    list = list.filter(p => p.category === currentCategory);
  }
  // subcategoría
  if (currentSubcategory) {
    list = list.filter(p => (p.subcategory || '') === currentSubcategory);
  }
  // búsqueda
  if (searchText.trim()) {
    const q = searchText.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.brand||'').toLowerCase().includes(q) ||
      (p.material||'').toLowerCase().includes(q)
    );
  }

  grid.innerHTML = '';

  if (!list.length) {
    grid.innerHTML = `<div class="empty">No hay productos para mostrar.</div>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="thumb">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/img/placeholder.jpg'"/>
        ${p.tags?.includes('premium') ? '<span class="badge">Premium</span>' : ''}
      </div>
      <div class="info">
        <h4>${p.name}</h4>
        <p class="muted">${p.brand || ''} · ${p.material || ''}</p>
        <div class="meta">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="stock">Stock: ${p.stock ?? '-'}</span>
        </div>
        <div class="actions">
          <button class="btn-add" data-id="${p.id}">Agregar</button>
          <a class="btn-wa" target="_blank"
             href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
               `Hola! Quiero el producto ${p.name} (${p.id}) - ${formatPrice(p.price)}`
             )}">WhatsApp</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // listeners Agregar (si querés carrito, acá guardás en localStorage)
  $$('.btn-add', grid).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      toast('Agregado al pedido');
      // TODO: implementar carrito si querés
    });
  });
}

// ====== Búsqueda ======
function setupSearch() {
  const input = document.querySelector('#buscar-input') || document.querySelector('input[type="search"]');
  if (!input) return;
  input.addEventListener('input', () => {
    searchText = input.value || '';
    drawProducts();
  });
}

// ====== Toast simple ======
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1500);
}

