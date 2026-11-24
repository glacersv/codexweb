# GRID/LAB — Estudio & Aula Virtual de Arquitectura y Desarrollo Web

Plataforma interactiva de ingeniería y diseño web construida con **TypeScript estricto** y **Arquitectura CSS Modular**, diseñada para el curso de **Diseño y Desarrollo Web (Cohorte de 4 Semanas · Martes y Jueves de 8:00 a 9:30 AM)**.

---

## Arquitectura del Proyecto (Separación de Responsabilidades)

```text
c:\codexweb\
├── index.html                      # Documento HTML5 semántico (sin CSS ni JS inline)
├── package.json                    # Scripts de desarrollo, compilación y validación TypeScript
├── tsconfig.json                   # Configuración estricta de TypeScript (ES2022 + strict)
├── vite.config.ts                  # Configuración de empaquetado para GitHub Pages
├── .github/workflows/deploy.yml    # Despliegue continuo automático en GitHub Pages
├── src/
│   ├── main.ts                     # Orquestador principal, router, Command Palette (Ctrl+K) y tema
│   ├── types/
│   │   └── course.ts               # Interfaces y contratos TypeScript de los 5 módulos
│   ├── data/
│   │   └── curriculum.ts           # Datos tipados de las 8 sesiones, casos Rayos X, pinceles y rúbrica
│   ├── utils/
│   │   └── dom.ts                  # Notificaciones Sonner, portapapeles, descarga de archivos y Ctrl+K
│   ├── modules/
│   │   ├── xrayLab.ts              # Módulo 01: Rayos X (Contador de filas y columnas con guías)
│   │   ├── gridStudio.ts           # Módulo 02: Estudio CSS Grid 2D (arrastre, fusión y código en vivo)
│   │   ├── mockupBuilder.ts        # Módulo 03: Constructor Drag & Drop de Mockups y árbol DOM
│   │   ├── theorySandbox.ts        # Módulo 04: Box Model de precisión, Simulador 1D/2D y Sandbox vivo
│   │   └── syllabusEval.ts         # Módulo 05: Cronograma 4 semanas y Autocorrector CSS en vivo
│   └── styles/
│       ├── main.css                # Punto de entrada CSS (@import modular)
│       ├── tokens.css              # Design Tokens, paleta Carbon/Paper, curvas Emil Kowalski
│       ├── base.css                # Reset, tipografía tabular-nums y cuadrícula arquitectónica
│       ├── layout.css              # Topbar, indicador deslizante GPU (Sliding Pill) y Statusbar
│       ├── components.css          # Botones táctiles scale(0.97), Command Palette y Sonner Toast
│       └── labs.css                # Estilos específicos de los 5 laboratorios interactivos
└── dist/js/                        # Módulos ES compilados desde TypeScript listos para producción
```

---

## Reglas de Diseño e Ingeniería Aplicadas (Impeccable + Emil Kowalski)

1. **Física y Curvas de Animación (`tokens.css`):**
   - Uso exclusivo de curvas expresivas `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` y `--ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1)`.
   - Indicador de navegación deslizante acelerado por GPU (`transform: translate3d(...)`, `will-change: transform, width`).
   - Micro-interacción táctil `transform: scale(0.97)` en estado `:active` para todos los botones y selectores.
   - Transiciones con desenfoque óptico (`filter: blur(4px)` → `blur(0)`) al cambiar de módulo o abrir la paleta de comandos (`Ctrl+K`).
   - Soporte nativo para `@media (prefers-reduced-motion: reduce)`.
2. **Estética Técnica Suiza (Cero clichés de IA):**
   - Superficies **Carbon Obsidian (`#09090B` / `#111114`)** y **Architectural Paper (`#F5F4F0`)** con bordes *hairline* de `1px` y luz especular superior (`inset 0 1px 0`).
   - Numeración tabular (`font-variant-numeric: tabular-nums`) en todas las reglas métricas, coordenadas `F:C`, contadores y puntajes.
3. **Despliegue en GitHub Pages (`glacersv/codexweb`):**
   - Funciona tanto directamente desde la raíz (gracias a `dist/js/` precompilado) como mediante el flujo automático de GitHub Actions incluido en `.github/workflows/deploy.yml`.
