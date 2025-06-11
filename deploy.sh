#!/bin/bash

# === CONFIGURACIÓN ===
REPO_NAME="Venta-vestidos-y-maquillaje"
GITHUB_USER="Jhorley666"
BASE_HREF="/$REPO_NAME/"

# === 1. Construir el proyecto con baseHref y HashLocationStrategy ===
ng build \
  --configuration=production \
  --output-path docs \
  --base-href $BASE_HREF

# === 2. Mover contenido desde /docs/browser si existe ===
if [ -d "docs/browser" ]; then
  echo "Moviendo archivos desde /docs/browser..."
  mv docs/browser/* docs/
  rm -rf docs/browser
fi

# === 3. Crear .nojekyll para evitar problemas con rutas ===
touch docs/.nojekyll

# === 4. (Opcional) Agregar cambios al repositorio Git ===
echo "Guardando cambios..."
git add .
git commit -m "Build para GitHub Pages"
git push origin master

# === 5. Mensaje final ===
echo ""
echo "✅ ¡Despliegue completado!"
echo "Tu app estará disponible en:"
echo "https://$GITHUB_USER.github.io/$REPO_NAME/#/home" 