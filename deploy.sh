#!/bin/bash

# === CONFIGURACIÓN ===
REPO_NAME="Venta-vestidos-y-maquillaje"
GITHUB_USER="Jhorley666"
BASE_HREF="/$REPO_NAME/"

# === 1. Limpiar carpeta docs ===
echo "Limpiando carpeta docs..."
rm -rf docs/
mkdir -p docs

# === 2. Construir el proyecto con baseHref y HashLocationStrategy ===
ng build \
  --configuration=production \
  --output-path docs \
  --base-href $BASE_HREF

# === 3. Mover contenido desde /docs/browser si existe ===
if [ -d "docs/browser" ]; then
  echo "Moviendo archivos desde /docs/browser..."
  mv docs/browser/* docs/
  rm -rf docs/browser
fi

# === 4. Crear .nojekyll para evitar problemas con rutas ===
touch docs/.nojekyll

# === 5. Confirmar base href en index.html ===
INDEX_PATH="docs/index.html"
if grep -q "C:/" "$INDEX_PATH"; then
  echo "⚠️ ADVERTENCIA: Ruta local encontrada en index.html. Corrigiendo..."

  # Reemplaza cualquier href="..." dentro de <base> por href="/Venta-vestidos-y-maquillaje/"
  sed -i 's|<base href="[^"]*"|<base href="'"$BASE_HREF"'"|g' "$INDEX_PATH"
fi

# === 6. (Opcional) Agregar cambios al repositorio Git ===
echo "Guardando cambios..."
#git add .
#git commit -m "Build para GitHub Pages"
#git push origin master


# === 7. Mensaje final ===
echo ""
echo "✅ ¡Despliegue completado!"
echo "Tu app estará disponible en:"
echo "https://$GITHUB_USER.github.io/$REPO_NAME/#/home" 