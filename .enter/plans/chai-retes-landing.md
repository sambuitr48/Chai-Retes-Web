# Landing page Chai-Retes (punk, Armenia Quindío)

## Contexto
El proyecto es una plantilla Vite + React + TS + Tailwind + shadcn recién creada (aún con el hero genérico "Enter" en `src/pages/Index.tsx` y el tema de color default de shadcn). El usuario pidió una landing de una sola página con identidad punk cruda para la banda Chai-Retes, con logo e imágenes de marca ya provistos (6 PNG). No requiere backend (formulario simulado, sin auth/DB), por lo que Enter Cloud no se activa.

Decisiones ya confirmadas con el usuario:
- Fotos (galería) e Integrantes: placeholders gráficos con textura/ícono (nada de fotos de stock ni IA generada).
- Formulario de contacto: envío simulado, muestra un toast de confirmación (sin mailto, sin backend).
- Logos: en Header y Hero (ambos con fondo oscuro `#0B0B0B`) se usan las versiones "fondos oscuros" (trazo blanco): `Logo-color-fondos oscuros@2x.png` (solo ícono) y `Logo-nombre-color-fondos oscuros@2x.png` (ícono + wordmark). La versión trazo negro (`Logo-color@2x.png`, `Logo-nombre-color@2x.png`) no se usa en esta landing porque no hay ningún bloque de fondo claro. `Logo-inverso`/`Logo-negativo` se usan como detalle decorativo en el footer/favicon.

No se toca el sistema de i18n existente (`i18n.config.json`, `public/locales/*`): el sitio es monolingüe en español, se escribe el copy directo en los componentes sin `useTranslation`.

## Diseño: Sistema de tokens (index.css + tailwind.config.ts)
Reemplazar la paleta shadcn default por el tema Chai-Retes como único tema (sin light/dark toggle, el sitio siempre es oscuro):

- `--background: 0 0% 4%` (#0B0B0B)
- `--foreground: 0 0% 100%` (#FFFFFF)
- `--card: 0 0% 8%` (superficie ligeramente más clara para cards, ~#141414)
- `--primary: 4 78% 48%` (#DA261B, rojo de marca) con `--primary-foreground: 0 0% 100%`
- `--secondary` / `--muted`: grises oscuros derivados de background para separar bloques
- `--accent: 46 78% 80%` (#F4E1A4, crema) con `--accent-foreground: 0 0% 4%` (texto oscuro sobre crema para contraste AA)
- `--border`, `--input`: gris oscuro sutil (~0 0% 20%)
- `--destructive`: se mantiene rojo shadcn estándar (usado solo para errores de validación, distinto uso del primary de marca)

Tailwind config:
- Agregar `fontFamily.display` (Anton, para H1/H2/titulares stencil, mayúsculas) y `fontFamily.sans` (Work Sans, cuerpo) vía `extend.fontFamily`.
- Agregar utilidades de espaciado si hace falta (base 8px ya cubierta por escala default de Tailwind).
- No se agrega modo claro: eliminar/ignorar el bloque `.dark` (dejar de usarlo, ya que el tema oscuro es el único).

index.html:
- Añadir `<link>` de Google Fonts para Anton y Work Sans (pesos 400/600/700).
- Actualizar `<title>` y `<meta name="description">` a "Chai-Retes — Punk desde Armenia, Quindío".

## Textura y bordes irregulares (implementación CSS/SVG, sin imágenes pesadas)
En `src/index.css`, agregar utilidades reutilizables:
- `.bg-noise`: textura de grano vía SVG `feTurbulence` inline en `background-image` (data URI, <5kb) aplicada solo a fondos de sección (`::before` con opacity baja ~0.05, `mix-blend-mode: overlay`, `pointer-events-none`), nunca detrás de texto largo (el pseudo-elemento va detrás del contenido con z-index).
- `.torn-edge-bottom` / `.torn-edge-top`: separador entre secciones usando `clip-path: polygon(...)` con un patrón irregular tipo "rasgado", como utilidad reusable para todas las secciones (mismo patrón zig-zag, distinto en top/bottom para variar).

Estas utilidades se centralizan en `index.css` para que cada sección solo agregue una clase, manteniendo el grid/spacing consistente (contenedor `container mx-auto px-4 md:px-8`, secciones con `py-16 md:py-24`).

## Estructura de componentes
Nueva carpeta `src/components/chai-retes/`:
- `Navbar.tsx`: sticky, fondo oscuro + `.bg-noise`, logo `Logo-nombre-color-fondos oscuros@2x.png` (h-8/h-10) a la izquierda, links de anclas (Inicio, Historia, Escúchanos, Fotos, Eventos, Integrantes, Contacto) a la derecha con `scroll-smooth`, `Sheet` (ya existe `sheet.tsx`) para menú hamburguesa en mobile.
- `Hero.tsx`: fondo `#0B0B0B` + `.bg-noise`, logo `Logo-color-fondos oscuros@2x.png` grande centrado, `Logo-nombre-color-fondos oscuros@2x.png` como wordmark debajo (o texto stencil "CHAI-RETES" en `font-display` si se prefiere texto real accesible + logo como imagen decorativa), tagline "Punk desde Armenia, Quindío", dos `Button` (variant `default`=rojo para "Escúchanos", variant nuevo `outline-hero` en crema/blanco para "Próximos shows"), ambos con scroll a ancla. Rayos rojos decorativos con leve animación (`animate-pulse` sutil o rotación lenta vía keyframe custom, `prefers-reduced-motion` respetado).
- `Historia.tsx`: texto exacto provisto por el usuario + mini-timeline horizontal con 3 hitos placeholder ("Primer show", "Primer tema propio", "El cover que rompimos") como array de datos al inicio del archivo.
- `Musica.tsx` ("Escúchanos"): 3 `Card` con placeholder de embed (Spotify/YouTube/Bandcamp), cada una recibe una prop `embedUrl?: string` — si no hay URL, muestra un estado placeholder estilizado (ícono + "Próximamente") en vez de un iframe roto.
- `Fotos.tsx`: grid/masonry (CSS columns o grid con `auto-rows`) de 8-12 placeholders tipo "polaroid rasgada": cards con `.torn-edge` en los bordes, ligera rotación aleatoria por card (variar con `nth-child` o array de ángulos fijos para SSR-safety), ícono central (lucide) sobre fondo texturizado en vez de foto real. Click abre `Dialog` (lightbox) mostrando el placeholder ampliado.
- `Eventos.tsx`: array `events` (fecha, ciudad, venue, hora, link) al inicio del componente; se renderiza como `Card` por evento con botón "Más info / Boletas" (`asChild` + `<a>` externo, placeholder `href="#"`).
- `Integrantes.tsx`: array `members` (4 placeholders: nombre/apodo, instrumento, frase) al inicio; cada card usa un placeholder gráfico (ícono + iniciales sobre fondo texturizado) en vez de foto, frase tipo declaración en cursiva/quote.
- `Contacto.tsx`: íconos de redes (lucide `Instagram`, `Youtube`, `Music2` para Spotify placeholder) con links `href="#"`, + formulario (`Input` nombre/email, `Textarea` mensaje) controlado con `useState`, `onSubmit` hace `preventDefault` y dispara `toast` (`useToast` ya existe en el proyecto) de confirmación simulando envío — sin llamada real a backend.
- `Footer.tsx`: logo `Logo-negativo@2x.png` o `Logo-inverso@2x.png` pequeño, año actual, "Armenia, Quindío, Colombia", mismos íconos de redes, créditos.
- `TornDivider.tsx` (opcional, si se prefiere componente en vez de solo clase CSS) para reutilizar el borde irregular entre secciones.

`src/pages/Index.tsx`: se reemplaza completamente — quita el hero genérico basado en `useTranslation` y monta `<Navbar/><Hero id="inicio"/><Historia id="historia"/><Musica id="musica"/><Fotos id="fotos"/><Eventos id="eventos"/><Integrantes id="integrantes"/><Contacto id="contacto"/><Footer/>` dentro de un contenedor con `scroll-smooth` (en `html` vía CSS) y `bg-background`.

## Componentes shadcn a ajustar
- `button.tsx`: agregar variantes de marca en `buttonVariants` (ej. `hero` = fondo `primary` rojo con hover más oscuro, y `heroOutline` = borde crema/blanco transparente con texto blanco, hover relleno crema con texto oscuro) — evitando el problema de "outline con texto blanco invisible" mencionado en las guías.
- `card.tsx`: no se modifica el primitive; se compone con clases utilitarias por sección (fondo `card`, textura, bordes) para no romper otros usos futuros.

## Accesibilidad y performance
- Contraste mínimo AA: texto blanco sobre `#0B0B0B`/`#141414` (cumple), texto oscuro (`accent-foreground`) sobre crema `#F4E1A4` (cumple), rojo `#DA261B` solo para acentos/CTA con texto blanco (verificar contraste del botón rojo, AA para texto grande cumple).
- Sin autoplay de audio/video; los bloques de música son solo placeholders estáticos.
- Textura vía CSS/SVG inline, sin imágenes JPG de fondo pesadas.
- `scroll-behavior: smooth` con fallback respetando `prefers-reduced-motion: reduce` (desactivar animaciones decorativas de rayos y smooth-scroll en ese caso).
- Mobile-first: nav con `Sheet`, grid de fotos e integrantes en 1 columna en mobile, 2-3 en desktop.

## Archivos a crear/modificar
- Modificar: `src/index.css`, `tailwind.config.ts`, `index.html`, `src/pages/Index.tsx`, `src/components/ui/button.tsx`
- Crear: `src/components/chai-retes/Navbar.tsx`, `Hero.tsx`, `Historia.tsx`, `Musica.tsx`, `Fotos.tsx`, `Eventos.tsx`, `Integrantes.tsx`, `Contacto.tsx`, `Footer.tsx`

## Implementation checklist
- [passed] Reemplazar tokens de color en `src/index.css` (`:root`) por la paleta Chai-Retes (background, foreground, primary rojo, accent crema, card, border) y quitar dependencia del bloque `.dark`
- [passed] Agregar utilidades `.bg-noise` (SVG turbulence data-URI) y `.torn-edge-top`/`.torn-edge-bottom` (clip-path) en `index.css`
- [passed] Agregar `fontFamily.display` (Anton) y `fontFamily.sans` (Work Sans) en `tailwind.config.ts`
- [passed] Añadir links de Google Fonts (Anton, Work Sans) y actualizar `title`/`description` en `index.html`
- [passed] Agregar variantes `hero` y `heroOutline` en `buttonVariants` (`src/components/ui/button.tsx`) con contraste correcto en ambos estados
- [passed] Crear `Navbar.tsx` con logo dark-bg, anclas con scroll suave, `Sheet` para mobile, sticky con `.bg-noise`
- [passed] Crear `Hero.tsx` con logo dark-bg (ícono + wordmark), tagline, dos CTA (`hero`/`heroOutline`), rayos decorativos con animación sutil respetando `prefers-reduced-motion`
- [passed] Crear `Historia.tsx` con el copy exacto provisto y mini-timeline (array de 3 hitos editable)
- [passed] Crear `Musica.tsx` con 3 cards de embed (`embedUrl?` prop) y estado placeholder cuando no hay URL
- [passed] Crear `Fotos.tsx` con grid de 8-12 placeholders "polaroid rasgada" (rotación fija por índice), `Dialog` como lightbox
- [passed] Crear `Eventos.tsx` con array `events` editable y cards con botón "Más info / Boletas"
- [passed] Crear `Integrantes.tsx` con array `members` (4 placeholders) y frase tipo declaración
- [passed] Crear `Contacto.tsx` con íconos de redes, formulario controlado, `onSubmit` simulado con `toast` de confirmación (usando `useToast` existente)
- [passed] Crear `Footer.tsx` con logo `Logo-inverso`/`Logo-negativo`, año dinámico, ubicación, redes, créditos
- [passed] Reescribir `src/pages/Index.tsx` para componer todas las secciones en orden con IDs de ancla correctos
- [passed] Verificar que ninguna sección use el logo de trazo negro (`Logo-nombre-color@2x`, `Logo-color@2x`) ya que todo el sitio es de fondo oscuro

## Verification checklist
- [passed] Navegación por anclas: cada link del navbar hace scroll suave a su sección correspondiente (Inicio, Historia, Escúchanos, Fotos, Eventos, Integrantes, Contacto)
- [passed] Header y Hero muestran el logo con trazo blanco legible sobre fondo `#0B0B0B` (no se ve invisible ni recortado)
- [manual-required] Formulario de contacto: enviar con campos completos muestra el toast de confirmación y limpia el formulario; enviar vacío respeta `required` de los inputs sin crashear
- [manual-required] Galería de Fotos: click en un placeholder abre el lightbox (`Dialog`) y se puede cerrar
- [manual-required] Responsive: en viewport mobile (< 768px) el menú colapsa a `Sheet`, el grid de fotos/integrantes pasa a 1 columna, no hay overflow horizontal
- [passed] Contraste de texto: blanco sobre fondo oscuro y texto oscuro sobre crema cumplen AA (verificar visualmente con `website_screenshot`)
- [passed] Sin errores en consola (`get_console_logs`) tras cargar la página completa
- [passed] Build/lint del proyecto pasa sin errores tras los cambios
