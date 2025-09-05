[build]
  # Carpeta donde está tu index.html y demás archivos públicos
  publish = "grlens_full_site_netlify_functions"
  command = ""

[functions]
  # Carpeta donde están tus funciones (por ejemplo registrar cliente)
  directory = "grlens_full_site_netlify_functions/netlify/funciones"

[dev]
  framework = "#custom"
  command = "npm run start"
  targetPort = 3000
  port = 8888
  publish = "grlens_full_site_netlify_functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
