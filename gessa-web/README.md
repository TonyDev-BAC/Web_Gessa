# GESSA — Sitio web

Sitio de alto impacto visual para GESSA (Grupo Empresarial de Supermercados), construido con React + Vite + Tailwind CSS v4 y animaciones con Framer Motion.

## Contenido

- Hero con animación de fondo y presentación del grupo
- Sección de marcas: Peri, Super Compro, Saretto y Saretto Selecto
- Sección Nosotros: misión, visión y valores
- Contacto con mapa embebido
- Navegación y footer con espacios ya preparados para "Bolsa de empleo" y "Portal corporativo" (deshabilitados, listos para conectar cuando existan)

## Cómo correrlo localmente

```bash
npm install
npm run dev       # entorno de desarrollo, http://localhost:5173
npm run build     # genera la carpeta dist/ lista para producción
npm run preview   # sirve la build de producción localmente
```

## Personalización pendiente

- **Logos**: en `src/components/Logos.jsx` hay recreaciones tipográficas de los logos de Gessa, Peri, Super Compro y Saretto/Saretto Selecto a partir de las imágenes de marca compartidas. Cuando tengan los archivos SVG/PNG oficiales, reemplacen esos componentes por `<img>` con el asset real (colocar en `public/logos/` y actualizar las referencias en `Navbar.jsx`, `Footer.jsx` y `Hero.jsx`).
- **Fotografía**: el sitio actualmente no usa fotos de producto/tiendas; agregar imágenes reales en `Hero.jsx` y `Brands.jsx` elevará aún más el impacto visual.
- **Datos de contacto**: teléfono y correo en `src/components/Contact.jsx` son provisionales — actualizar con los datos reales.
- **Copy legal**: se ajustó el texto de "Quiénes somos" para ya no afirmar que GESSA es "100% costarricense". Revisar `src/components/About.jsx` y `Hero.jsx` para validar el mensaje final con el equipo legal/comunicaciones.
- **Colores de marca**: la paleta está centralizada en `src/index.css` (bloque `@theme`) — ajustar ahí los tonos exactos de Pantone/HEX oficiales de cada marca.

## Integraciones futuras

El sitio quedó estructurado para crecer sin fricción:
- Rutas nuevas se pueden agregar fácilmente (ya está `react-router-dom` instalado) para "Bolsa de empleo" y "Portal corporativo".
- Los enlaces de navegación a estas secciones ya existen en `Navbar.jsx` y `Footer.jsx`, actualmente apuntando a `#futuro`; solo hay que activarlos cuando las plataformas estén listas.
