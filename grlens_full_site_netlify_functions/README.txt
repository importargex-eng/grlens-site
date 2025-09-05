# GR Lens Distribuidora — Sitio con registro y Netlify Functions (Google Sheets)

Este proyecto incluye:
- **Registro de clientes** (Nombre y apellido, Email, Zona, Óptica)
- **Carrito** con productos, suma/resta, total
- **Finalizar pedido**: genera **Nº de pedido** y abre **WhatsApp** con el detalle
- **Netlify Function** `/.netlify/functions/register` que guarda los registros en **Google Sheets**, creando una **pestaña por ZONA** automáticamente

## Cómo desplegar (IMPORTANTE: usar Import from Git, no Drag & Drop)
1. Subí esta carpeta a un repo (GitHub/GitLab/Bitbucket).
2. En Netlify: **Add new site → Import from Git** y elegí tu repo.
3. En **Site settings → Environment variables**, cargá:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`  (respetando los \n)
   - `GOOGLE_SHEET_ID`  (ID de tu planilla: lo que va entre /d/ y /edit)
4. Compartí tu Google Sheet con el email de la service account (permiso Editor).
5. Deploy. Netlify empaqueta la Function y ya podés probar el registro.

> Si intentás publicar con Drag & Drop, **las Functions no se empaquetan** y el registro no va a guardar en Google Sheets.

