[build]
  publish = "grlens_full_site_netlify_functions"
  command = ""

[functions]
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
