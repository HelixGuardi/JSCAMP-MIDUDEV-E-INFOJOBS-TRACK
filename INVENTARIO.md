# Inventario JSCAMP (índice de temas)

Fuente: archivos fuente, apuntes y config relevante. Sin `node_modules`, lockfiles, `.db`, artefactos de build/test.

Hilo común: **DevJobs** (listado de ofertas) evoluciona módulo a módulo.

---

## `modulo-02-y-03-HTML-CSS-JS`

Maqueta **DevJobs** en HTML/CSS/JS vainilla, sin bundler.

**Tecnologías / conceptos:** HTML semántico, CSS, `fetch` + JSON, DOM, filtros combinados (`data-*` + `Set`), paginación, Web Components + Shadow DOM, `customElements`, ESM en el navegador.

**Archivos clave:** `index.html`, `empleos.html`, `styles.css`, `main.js`, `fetch-data.js`, `filters.js`, `devjobs-avatar-elements.js`, `custom-select-dropdown.js`, `data.json`.

**Profundidad:** básico → intermedio (Web Components).

---

## `modulo-04-cdn-react`

Primer **React** sin Vite: CDN (`esm.sh`) + Babel standalone.

**Tecnologías / conceptos:** JSX en `<script type="text/babel">`, componente `JobCard`, `useState`, props vs HTML vainilla.

**Archivos clave:** `react.html` (el resto replica el módulo 02-03).

**Profundidad:** básico.

---

## `modulo-04-vite-react`

SPA **DevJobs** con Vite + React 19, **sin React Router**.

**Tecnologías / conceptos:** Vite, componentes, CSS Modules, custom hooks, router casero (`history.pushState` + `popstate`), `localStorage`, debounce, paginación, estado de red (`online`/`offline`), formularios.

**Archivos clave:** `src/App.jsx`, `src/main.jsx`, `src/hooks/useRouter.jsx`, `src/hooks/useFilters.jsx`, `src/hooks/useNetworkStatus.jsx`, `src/components/Route.jsx`, `src/components/Link.jsx`, `src/pages/{Home,Search,Contact,404}.jsx`, `vite.config.js`.

**Profundidad:** intermedio.

---

## `modulo-05-EstadoGlobal-y-ReactRouter`

SPA completa: rutas reales, auth de juguete, favoritos.

**Tecnologías / conceptos:** `react-router` v7 (`Routes`, `useParams`, `Navigate`, `lazy` + `Suspense`), Zustand vs Context API (`use()`), rutas protegidas, Markdown → HTML (`snarkdown` + `dangerouslySetInnerHTML`), prop drilling vs contexto.

**Archivos clave:** `src/App.jsx`, `src/components/ProtectedRoute.jsx`, `src/store/authStore.js`, `src/store/favoritesStore.js`, `src/context/AuthContext.jsx`, `src/context/FavContext.jsx`, `src/pages/{Login,Register,ProfilePage,Detail}.jsx`.

**Profundidad:** intermedio.

---

## `modulo-06-Backend-con-NodeJS-y-Express`

Núcleo de **Node.js** (HTTP nativo, no Express).

**Tecnologías / conceptos:** ESM vs CommonJS, `node:http`, `node:fs/promises`, `node:os`, `node:path`, `node:crypto` (`randomUUID`), CLI (`process.argv`), `process.loadEnvFile()`, modelo de permisos de Node, JSON API en memoria.

**Archivos clave:** `server.js`, `index.js`, `math.js`, `commonjs.js`, `cli.js`, `manage-files.js`, `system-info.js`, `notes-of-server.js`.

**Profundidad:** básico → intermedio.

---

## `modulo-06-Backend-con-Express`

API REST de empleos con **Express 5** y MVC. Persistencia en JSON.

**Tecnologías / conceptos:** Express, CORS, `express.json()`, logging middleware, Router, CRUD, query params (filtros/paginación), health check, `app.listen` condicionado a `NODE_ENV`.

**Archivos clave:** `app.js`, `config.js`, `routes/jobs.js`, `controllers/jobs.js`, `models/job.js`, `middlewares/cors.js`, `MVC-apuntes.md`, `old-index.js` (antes de extraer MVC).

**Profundidad:** intermedio.

---

## `modulo-07-Testing`

Misma API + validación runtime y tres capas de test.

**Tecnologías / conceptos:** Zod (`safeParse`, `.partial()`), `node:test` + `node:assert` (API HTTP), Playwright (E2E por roles/ARIA), Stagehand + modelo (E2E con IA).

**Archivos clave:** `app.test.js`, `schemas/jobs.js`, `e2e/tests/example.spec.js`, `e2e/playwright.config.js`, `ai-e2e-test/test-ai.js`. Backend MVC heredado de `modulo-06-Backend-con-Express`.

**Profundidad:** intermedio (Stagehand: avanzado introductorio).

---

## `modulo-08-Typescript`

Ejercicios de **tipado**, no app DevJobs.

**Tecnologías / conceptos:** primitivos, arrays, tuplas, `type` vs `interface` (fusión), uniones, `readonly`, opcionales, intersección, template literal types, narrowing (`typeof`, truthiness, in), `any` / `unknown` / `never` / `void`.

**Archivos clave:** `01-fundamentos/{00-types,01-primitivos,02-arrays,03-objetos,04-tuplas,05-any-unknown-never-voids}.ts`, `02-funciones/{01-basicos,02-type-narrowing}.ts`, `03-interfaces-types/01-interfaces.ts`, `example.ts`.

**Profundidad:** básico → intermedio. No hay genéricos avanzados ni TS en React aquí.

---

## `modulo-09-Inteligencia-Artificial`

Monorepo npm (`frontend` + `backend`) + apuntes de IA para developers.

**Tecnologías / conceptos:** LLMs/tokens, agentes, MCP, skills, NotebookLM, Claude Code, workspaces, Vercel AI SDK (`streamText`, `pipeTextStreamToResponse`), OpenAI SDK, rate limit (`express-rate-limit` y uno casero en `examples`), streaming en el cliente (`ReadableStream` + `useAISummary`), Markdown en vivo (`streamdown` / `snarkdown`).

**Archivos clave:** `package.json` (workspaces), `backend/routes/ai.js`, `backend/app.js`, `frontend/src/hooks/useAISummary.jsx`, `frontend/src/pages/Detail.jsx`, `examples/app.js`, `examples/rate-limit.js`, `Notas-y-Material-de-Clase/01`–`21`, `OBSERVACION-RELEVANTE.txt`.

**Profundidad:** intermedio (integración streaming); apuntes conceptuales de MCP/agentes.

---

## `modulo-10-SQL`

SQL relacional + API Express **en TypeScript** con SQLite.

**Tecnologías / conceptos:** SELECT/INSERT/UPDATE/DELETE, WHERE, ORDER BY/LIMIT, paginación, ALTER, CHECK, FK, JOIN, `GROUP_CONCAT`, transacciones, driver `better-sqlite3`, WAL, prepared statements, seed, Zod + TS, `tsx`.

**Archivos clave:** `C1-C12/*.md`, `C13-C16/*.md`, `Conectar una API backend con una base de datos SQL.md`, `Persistir la información en SQLite.md`, `Hacer que la API lea desde la base de datos.md`, `backend/src/app.ts`, `backend/src/db/{database,seed}.ts`, `backend/src/models/job.ts`, `backend/src/schemas/job.ts`, `backend/src/test-sql.ts`.

**Profundidad:** intermedio. El filtro dinámico en `models/job.ts` está incompleto (condiciones vacías).

---

## `modulo-11-ci-cd`

Monorepo **pnpm** (`projects/frontend` + `projects/backend`) listo para pipeline. **No hay workflows `.github` en el módulo.**

**Tecnologías / conceptos:** pnpm workspaces/filters, ESLint, Vitest, Testing Library + jsdom, SuperTest, `node --check` como “build”, factory `createApp` inyectable.

**Archivos clave:** `package.json`, `pnpm-workspace.yaml`, `projects/backend/src/{app,server,tasks}.js`, `projects/backend/test/{app,tasks}.test.js`, `projects/frontend/src/{App.jsx,tasks.js,App.test.jsx,tasks.test.js}`, `projects/frontend/vite.config.js`.

**Profundidad:** intermedio en tests; CI/CD de plataforma (Actions) aún no materializado en YAML.

---

## `modulo-12-docker`

Laboratorio de contenedores, por carpetas numeradas.

**Tecnologías / conceptos:** imagen mínima Alpine, Node Alpine, `.dockerignore`, `USER node`, multi-stage (Node y Go), volúmenes/persistencia en disco, Flask + Docker Model Runner (`ai/smollm2`), Compose (servicio + Postgres en `06-compose/server.js`), `Dockerfile.vercel`.

**Archivos clave:** `00-por-que/Dockerfile`, `01-hola-docker/Dockerfile`, `02-node-web/Dockerfile` + `server.js`, `02b-node-web/compose.yaml`, `03-multi-stage/Dockerfile`, `04-volumes/{Dockerfile,server.js}`, `05-ia/{Dockerfile,app.py,README.md}`, `06-compose/{Dockerfile,server.js}`, `07-vercel/{Dockerfile.vercel,main.go}`.

**Profundidad:** básico → intermedio. Compose de Postgres en `06-compose` está en código de app; el `compose.yaml` de ejemplo vive en `02b-node-web`.

---

# Categorías transversales

### Fundamentos Web
HTML/CSS, DOM, `fetch`, filtros, paginación, Web Components, ESM, `localStorage`, eventos `online`/`offline`.

### React
CDN+JSX → Vite → custom hooks → router casero → React Router 7 → lazy/Suspense → Context/`use()` → Zustand → CSS Modules → formularios.

### Backend
`node:http` → Express MVC → CORS/JSON → CRUD/filtros → Zod → TS + SQLite → factory de app para tests.

### Testing
`node:test`, Playwright E2E, Stagehand, Vitest + RTL, SuperTest, `node --check`.

### TypeScript
Tipos/interfaces, narrowing, `any`/`unknown`/`never`/`void`; aplicación real en `modulo-10-SQL/backend`.

### IA
Tokens/LLMs, agentes/MCP/skills, streaming de resumen de oferta, rate limit, modelos locales (Docker Model Runner).

### SQL
CRUD, constraints, relaciones/JOIN, transacciones, SQLite embebido, seed; Postgres solo como destino Compose.

### CI/CD
Scripts `lint`/`test`/`build` en monorepo pnpm. GitHub Actions: citado en README/tareas demo, **sin YAML de workflow**.

### Docker
Dockerfile, ignore, multi-stage, volúmenes, Compose, modelo local, imagen Go para Vercel.

---

**Patrones que se repiten (para extraer después):** listado+filtros de jobs, MVC `routes/controllers/models`, CORS, paginación offset/limit, validación Zod, auth/favoritos de cliente, streaming de texto, monorepo frontend/backend.

## Notas de corrección (antes de construir el manual)

- `modulo-04-cdn-react`: no tendrá sección propia en el manual. Se menciona como "primer contacto con JSX" dentro de la sección React.
- `modulo-11-ci-cd`: el manual lo tratará como "CI/CD conceptual + scripts de lint/test/build", NO como pipeline implementado. No hay workflows `.github` reales.
- `modulo-10-SQL`: el filtro dinámico en `models/job.ts` está incompleto (condiciones vacías). Se documenta como "gotcha / pendiente", no como patrón a copiar.