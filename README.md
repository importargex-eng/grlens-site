<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>GR Lens Distribuidora</title>
  <meta name="description" content="Mayorista de armazones para ópticas.">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    :root{
      --bg:#f7f7f8;
      --panel:#ffffff;
      --ink:#121212;
      --ink-soft:#616161;
      --line:#e6e6e8;
      --brand:#111;
      --chip:#efefef;
      --shadow:0 8px 30px rgba(0,0,0,.06);
      --radius:18px;
      --sidebar-w:280px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial,"Noto Sans",sans-serif;
      color:var(--ink);
      background:var(--bg);
    }
    a{color:inherit;text-decoration:none}
    img{max-width:100%;display:block}

    /* Header */
    .header{
      position:sticky;top:0;z-index:50;
      background:#fff; border-bottom:1px solid var(--line);
      backdrop-filter:saturate(180%) blur(6px);
    }
    .header__inner{
      max-width:1200px;margin:0 auto;
      display:flex;align-items:center;gap:18px;
      padding:10px 16px;
    }
    .brand{
      display:flex;align-items:center;gap:10px;font-weight:700;
    }
    .brand img{width:34px;height:auto;border-radius:10px}
    .nav{margin-left:auto;display:flex;gap:18px;align-items:center}
    .btn-wa{
      background:#000;color:#fff;border-radius:999px;
      padding:8px 14px;font-weight:600;border:1px solid #000;
      transition:.2s transform;
    }
    .btn-wa:hover{transform:translateY(-1px)}
    .hamburger{
      display:none;cursor:pointer;border:1px solid var(--line);
      padding:8px 12px;border-radius:12px;background:#fff;
    }

    /* Banner */
    .banner{
      width:100%;background:#ddd;overflow:hidden;border-bottom:1px solid var(--line)
    }
    .banner img{width:100%;height:350px;object-fit:cover}

    /* Layout */
    .wrap{
      max-width:1200px;margin:24px auto;display:grid;gap:24px;
      grid-template-columns: var(--sidebar-w) 1fr;
      padding:0 16px;
    }

    /* Sidebar */
    .sidebar{
      position:sticky;top:76px;align-self:start;
      background:var(--panel);border:1px solid var(--line);
      border-radius:var(--radius);box-shadow:var(--shadow);
      padding:14px;
      height:max-content;
    }
    .sidebar h3{
      font-size:14px;letter-spacing:.04em;text-transform:uppercase;
      color:var(--ink-soft);margin:4px 8px 10px;font-weight:700;
    }
    .cat-list{list-style:none;margin:0;padding:6px}
    .cat-list a{
      display:flex;align-items:center;gap:10px;
      padding:10px 12px;border-radius:12px;color:var(--ink);
      font-weight:500;border:1px solid transparent;
    }
    .cat-list a:hover{background:var(--chip)}
    .cat-list a.active{background:#111;color:#fff;border-color:#111}
    .divider{height:1px;background:var(--line);margin:10px 6px}

    /* Main */
    .main{
      min-width:0;
    }
    .section{
      background:var(--panel);border:1px solid var(--line);
      border-radius:var(--radius);box-shadow:var(--shadow);padding:16px 16px 6px;margin-bottom:24px;
    }
    .section h2{
      font-size:20px;margin:6px 4px 14px;
      display:flex;align-items:center;gap:10px
    }
    .grid{
      display:grid;gap:16px;
      grid-template-columns: repeat( auto-fill, minmax(220px,1fr) );
      padding-bottom:10px;
    }
    .card{
      background:#fff;border:1px solid var(--line);
      border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:10px;
      transition:transform .15s ease, box-shadow .15s ease;
    }
    .card:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.08)}
    .thumb{aspect-ratio:4/3;background:#f1f1f1;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#9b9b9b;font-weight:600}
    .meta{display:flex;justify-content:space-between;color:var(--ink-soft);font-size:13px}
    .price{font-weight:700}
    .btn-add{
      border:1px solid #111;background:#111;color:#fff;border-radius:12px;padding:10px 12px;font-weight:600;cursor:pointer
    }
    .btn-add:hover{filter:brightness(1.05)}
    .pill{display:inline-flex;align-items:center;gap:6px;background:var(--chip);padding:6px 10px;border-radius:999px;font-size:12px;margin-left:6px}

    /* Sticky cart/footer note */
    .note{
      max-width:1200px;margin:0 auto 40px;padding:0 16px;color:var(--ink-soft);font-size:14px
    }

    /* Responsive */
    @media (max-width: 980px){
      .wrap{grid-template-columns: 1fr}
      .sidebar{position:relative;top:0}
      .hamburger{display:inline-flex}
      .nav{display:none}
      .header__inner{gap:10px}
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <div class="header__inner">
      <button class="hamburger" id="toggleSidebar">☰ Menú</button>
      <a class="brand" href="#inicio">
        <img src="./logo.png" alt="GR Lens" />
        <span>Distribuidora de lentes GR</span>
      </a>

      <nav class="nav">
        <a href="#inicio">Inicio</a>
        <a href="#categorias">Categorías</a>
        <a href="#cuenta">Mi cuenta</a>
        <a class="btn-wa" href="https://wa.me/5491161405627?text=Hola%20GR%20Lens%20Distribuidora" target="_blank" rel="noopener">WhatsApp</a>
      </nav>
    </div>
  </header>

  <!-- Banner -->
  <div id="inicio" class="banner">
    <img src="./banner.png" alt="GR Lens Distribuidora - Banner" />
  </div>

  <!-- Layout -->
  <div class="wrap" id="categorias">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <h3>Categorías</h3>
      <ul class="cat-list">
        <li><a href="#unicity">Unicity</a></li>
        <li><a href="#vicrola">Vicrola</a></li>
        <li><a href="#steffany">Steffany</a></li>
        <div class="divider"></div>
        <li><a href="#metal-dama">Metal Dama</a></li>
        <li><a href="#metal-dama-premium">Metal Dama Premium</a></li>
        <li><a href="#metal-caballero">Metal Caballero</a></li>
        <li><a href="#metal-caballero-premium">Metal Caballero Premium</a></li>
        <div class="divider"></div>
        <li><a href="#acetato-dama">Acetato Dama</a></li>
        <li><a href="#acetato-caballero">Acetato Caballero</a></li>
        <li><a href="#acetato-economico">Acetato Económico</a></li>
        <li><a href="#acetato-premium">Acetato Premium</a></li>
        <div class="divider"></div>
        <li><a href="#tr-clip-on">TR Clip On</a></li>
        <li><a href="#acetato-clip-on">Acetato Clip On</a></li>
        <li><a href="#clip360">Clip On 360° Premium</a></li>
        <div class="divider"></div>
        <li><a href="#nylon-dama">Nylon Dama</a></li>
      </ul>
    </aside>

    <!-- Main -->
    <main class="main">

      <!-- Secciones de ejemplo con grilla (podés reemplazar por tus productos reales) -->
      <section class="section" id="unicity">
        <h2>Unicity <span class="pill">Colección</span></h2>
        <div class="grid">
          <article class="card">
            <div class="thumb">Foto</div>
            <div class="meta"><span>Modelo U1</span><span class="price">$ 25.000</span></div>
            <button class="btn-add">Agregar</button>
          </article>
          <article class="card">
            <div class="thumb">Foto</div>
            <div class="meta"><span>Modelo U2</span><span class="price">$ 27.000</span></div>
            <button class="btn-add">Agregar</button>
          </article>
        </div>
      </section>

      <section class="section" id="vicrola">
        <h2>Vicrola</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>V-Classic</span><span class="price">$ 29.000</span></div><button class="btn-add">Agregar</button></article>
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>V-Slim</span><span class="price">$ 31.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="steffany">
        <h2>Steffany</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>S-Round</span><span class="price">$ 28.000</span></div><button class="btn-add">Agregar</button></article>
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>S-Cat</span><span class="price">$ 30.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="metal-dama">
        <h2>Metal Dama</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>A1-AC</span><span class="price">$ 25.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="metal-dama-premium">
        <h2>Metal Dama Premium</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>MDP-01</span><span class="price">$ 34.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="metal-caballero">
        <h2>Metal Caballero</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>MC-11</span><span class="price">$ 27.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="metal-caballero-premium">
        <h2>Metal Caballero Premium</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>MCP-21</span><span class="price">$ 36.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="acetato-dama">
        <h2>Acetato Dama</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>AD-01</span><span class="price">$ 26.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="acetato-caballero">
        <h2>Acetato Caballero</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>AC-02</span><span class="price">$ 27.500</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="acetato-economico">
        <h2>Acetato Económico</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>AE-10</span><span class="price">$ 21.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="acetato-premium">
        <h2>Acetato Premium</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>AP-90</span><span class="price">$ 35.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="tr-clip-on">
        <h2>TR Clip On</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>TR-Clip</span><span class="price">$ 32.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="acetato-clip-on">
        <h2>Acetato Clip On</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>AC-Clip</span><span class="price">$ 33.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="clip360">
        <h2>Clip On 360° Premium</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>360-Pro</span><span class="price">$ 38.000</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

      <section class="section" id="nylon-dama">
        <h2>Nylon Dama</h2>
        <div class="grid">
          <article class="card"><div class="thumb">Foto</div><div class="meta"><span>NY-01</span><span class="price">$ 28.500</span></div><button class="btn-add">Agregar</button></article>
        </div>
      </section>

    </main>
  </div>

  <p class="note">Este sitio no procesa pagos. El pedido final se confirma por WhatsApp para coordinar CBU y entrega.</p>

  <script>
    // Mostrar/ocultar sidebar en móvil
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    if(toggleBtn){
      toggleBtn.addEventListener('click', ()=>{
        const open = sidebar.style.display !== 'none';
        sidebar.style.display = open ? 'none' : 'block';
      });
    }

    // Scroll suave y estado activo en categorías
    const links = document.querySelectorAll('.cat-list a');
    const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
    function setActive(){
      const y = window.scrollY + 130; // offset por header
      let idx = 0;
      sections.forEach((sec,i)=>{
        if(sec && sec.offsetTop <= y) idx = i;
      });
      links.forEach(l=>l.classList.remove('active'));
      if(links[idx]) links[idx].classList.add('active');
    }
    window.addEventListener('scroll', setActive, {passive:true});
    setActive();

    links.forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if(el){
          window.scrollTo({top: el.offsetTop - 68, behavior:'smooth'});
        }
      })
    });
  </script>
</body>
</html>
