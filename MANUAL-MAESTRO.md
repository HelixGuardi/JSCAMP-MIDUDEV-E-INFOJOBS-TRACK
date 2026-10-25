# Manual maestro

## 1. Qué es este manual y cómo usarlo

Esto es tu puerta de entrada al campamento, no la suma de los capítulos. En `manual/` hay **7 archivos** (`02`–`08`); no existe un `01`. Cada patrón de esos capítulos trae **Cuándo usarlo**, **Código** y **Gotcha**: el detalle vive allí. Entra por el Quick Start del stack que vas a montar, o por la tabla de la sección 3 si ya sabes el problema y buscas qué patrón copiar. El mapa de carpetas de los módulos está en [INVENTARIO.md](INVENTARIO.md).

## 2. Quick Start por stack

### SPA React desde cero

Fuente: [manual/02-react.md](manual/02-react.md). CDN (`modulo-04-cdn-react`) es solo el primer JSX; no tiene patrón propio.

1. Vite con template React y `@vitejs/plugin-react`. Entry `main.jsx` → `App`. → «Estructura Vite + React».
2. Carpetas `components/`, `pages/`, `hooks/`, `styles/`. CSS global en `index.css`. CSS Modules solo en el componente. → «Estructura Vite + React», «CSS Modules».
3. Router. Para aprender: `useRouter` + `Link`/`Route` (`pushState` y evento `popstate` a mano). Para producto: `BrowserRouter`, `Routes`/`Route`, `path="*"`, params con `useParams`. En m05 quitas `StrictMode` del entry. → «Router casero», «React Router 7».
4. Estado. Props en el flujo de una página (búsqueda). Zustand cuando Header, cards y rutas protegidas comparten auth o favoritos. Context + `use()` quedó escrito y **no está montado**. → «Prop drilling vs contexto», «Zustand», «Context API + `use()`».
5. Primer fetch: `loading` / datos / `error`, `try/catch/finally`, `LoadingSpinner` + `ErrorMsg`. → «Fetching con loading/error».
6. Primer form: controlado (`value` + `onChange`) o `FormData` en el submit. Búsqueda con debounce (estado local del input y estado que dispara el fetch). → «useContactForm, useSearchForm», «Debounce en búsqueda». `useSearchForm.jsx` está vacío: no lo uses.
7. Paginación: la API habla `limit`/`offset`; tú conviertes página → offset y reseteas a 1 al cambiar filtros. → «Pagination», «useFilters».
8. Deploy: `vite build` → `dist/`, `vite preview` en local. El host del curso (Vercel) necesita fallback a `index.html` para que `/jobs/:id` no 404 al refrescar. → checklist del capítulo.

### Backend Express desde cero

Fuente: [manual/03-backend.md](manual/03-backend.md). Node nativo (`node:http`, CLI, `fs`) es la parte A de ese capítulo; este arranque es Express.

1. `package.json` con `"type": "module"`. Dependencias `express` y `cors` si el front vive en otro origin. Puerto en `config.js` (`DEFAULTS.PORT` es `8888`) o en env. → «ESM vs CommonJS», «Estructura `app.js` + `config.js`».
2. Carpetas `routes/`, `controllers/`, `models/`, `middlewares/`. `app.js` y `config.js` en la raíz (los apuntes dibujan `src/`; tu código de m06 no). → «Estructura `app.js` + `config.js`».
3. Middlewares, en este orden: CORS (factory) → `express.json()` → logger que llama a `next()`. → «Middlewares base».
4. Primer recurso: `Router` → `JobController` estático → `JobModel`. Montar con `app.use("/jobs", jobsRouter)`. El router solo cablea. → «Router montado en `app.js`», «Controller», «Model».
5. CRUD de verdad en m06: GET lista, GET `:id` (404), POST 201. PUT y PATCH están declarados y el handler está vacío. DELETE responde 403 y no borra. No copies eso como CRUD cerrado. → «CRUD y códigos HTTP».
6. `GET /health` → `{ status: "ok", uptime }`, fuera del router de jobs. El health de m11 es otro contrato (`ok`, `service`, `timestamp`). → «Health check `/health`».
7. `export default app`. Listen: el if de m06 (`NODE_ENV !== "production"`) **abre el puerto en los tests**. El que encaja es el de m07: `if (!process.env.NODE_ENV)`. Mejor aún, y solo existe en m11: `server.js` hace `listen`, los tests llaman `createApp()`. → «`app.listen` condicionado a `NODE_ENV`», «`createApp()` inyectable».
8. Deploy de esta API no está en m06 ni en m07. Lo que ya tienes para una plataforma: `PORT` por env, `/health`, origins CORS reales. El `push` a `jobs.json` no sobrevive a un reinicio.

### Backend Express + SQLite

Fuente: [manual/04-sql.md](manual/04-sql.md). El controller no debería cambiar de contrato; en tu repo la migración del modelo está a medias.

1. En el backend TS: `better-sqlite3`, `@types/better-sqlite3`, `tsx`, `typescript`. Si el install nativo falla, toca rebuild de bindings. → «Conexión a SQLite».
2. Un módulo `db/database.ts`: `new Database('jobs.db')`, `journal_mode = WAL`, `foreign_keys = ON`. La ruta del `.db` es relativa al cwd. → «Conexión a SQLite».
3. Tablas con `CREATE TABLE IF NOT EXISTS` en `seed.ts` (PK, `NOT NULL`, `CHECK`, `FOREIGN KEY ... ON DELETE CASCADE`). `app.ts` **no** crea el esquema al arrancar. `CHECK` de modality en el backend: `'onsite'`. En los apuntes C1 aparece `'office'`. No mezcles los dos. → «Crear tablas al arrancar», «Crear tabla con PRIMARY KEY».
4. Seed a mano con `tsx src/db/seed.ts`: `INSERT OR IGNORE` + `db.transaction`. No hay script npm. `job_content` se crea y no se seedea. IDs del seed (`'1'`, `'2'`, `'3'`) y `crypto.randomUUID()` de `create()` son dos series distintas. → «Seed».
5. Modelo: `db.prepare` con `?`, `.all()` / `.get()` / `.run()`. Mapea la fila al shape `{ data: { technology, modality, level } }`. Hoy **solo `getAll` lee SQLite**. `getById`, `create`, `update` y `delete` siguen en `const jobs: Job[] = []`. → «Modelo con prepared statements», «Cómo sustituye el modelo JSON-en-RAM».
6. Zod en el middleware (`validateJob` / `.partial()`), enums iguales al `CHECK`, y `req.body = result.data` antes del controller. → «Validación con Zod».
7. Rutas y controller: mismos métodos de `JobModel`, mismos status. `tsx watch src/app.ts`. Imports relativos con extensión `.js`. → «Ejecución con `tsx`», checklist del capítulo.
8. No copies el filtro dinámico de `models/job.ts` (condiciones vacías). `LIMIT ? OFFSET ?` no está escrito en este backend.

### Añadir IA a un proyecto existente

Fuente: [manual/07-ia.md](manual/07-ia.md). Monorepo npm `frontend` + `backend`. La clave no sale del servidor.

1. Clave en `backend/.env`. `process.loadEnvFile()` en el proceso que llama al modelo. El front solo `VITE_API_URL`. Un `import` que lea `process.env` al cargarse gana a `loadEnvFile()`: `config.js` lee `MODEL_AI` antes. → «API key con `process.loadEnvFile()`».
2. Endpoint tuyo. El browser no habla con el proveedor. Aquí `GET /ai/summary/:id`: el servidor busca la oferta y arma el prompt. 404 si no hay job. → «Contrato `GET /ai/summary/:id`».
3. SDK según la forma de la respuesta. Stream (lo que corre): `streamText` + `pipeTextStreamToResponse`. JSON (comentado, dependencia `openai` sigue instalada): `chat.completions.create` y `res.json({ summary })`. El id vivo es el string de `streamText` (`inclusionai/ling-3.0-flash-sante-free`), no `CONFIG.MODEL_AI`. → «Vercel AI SDK», «OpenAI SDK directo», «Modelo».
4. Rate limit en esa ruta, no en `/jobs`: `express-rate-limit`, 5 por IP por minuto, y `trust proxy` si hay proxy. El `Map` de `examples/rate-limit.js` es otro proceso (30/min en `GET /api`) y no protege `/ai`. → «Rate limit con `express-rate-limit`», «Rate limit casero».
5. UI: botón que llama a `generateSummary`. Estados `summary` / `loading` / `error`. El `""` inicial es falsy: hasta el primer chunk sigues en el botón. Si pintas `summary` antes que `error`, un fallo a mitad esconde el mensaje. → «`useAISummary`», «Consumir el stream», «Dónde se ve en la ficha».
6. Markdown del stream con `Streamdown`. El cuerpo estático de la oferta sigue en `snarkdown` + `dangerouslySetInnerHTML`. → «Markdown en vivo».
7. Arranque: dos procesos, `npm run dev:backend` y `npm run dev:frontend` desde la raíz. No hay un script que levante los dos. Puerto del API: `8888`.

### Dockerizar un backend Node

Fuente: [manual/08-docker.md](manual/08-docker.md). Hay varios Dockerfiles; no son la misma receta.

1. `.dockerignore` junto al Dockerfile: como mínimo `node_modules`, `.env`, `.git`. El corto que ya usas está en `06-compose`. `03-multi-stage` **no tiene** ignore. → «Qué excluye `.dockerignore`», checklist §1.
2. Imagen. Sin paso de build: una etapa (`02-node-web` con `npm install`, o `06-compose` con `npm ci --omit=dev`). Multi-stage (`03-multi-stage`) solo si el `build` empaqueta (`esbuild --bundle`): la etapa final copia `dist` y no `node_modules`. Si tu app importa paquetes sin bundle, ese Dockerfile se queda corto. → «Dos `FROM`», «Node en imagen».
3. `USER node` **después** del `RUN npm …` (el install sigue siendo root). No lo copies a un proceso que escribe en disco (`04-volumes` crea `/app/data` y no pone `USER`): en el módulo no hay `--chown`. → checklist §3.
4. `EXPOSE` = el `PORT` del proceso. En las apps Node del módulo, ambos son `3000`. → checklist §4.
5. Build anotado (plantilla `02b`, no una corrida verificada): `docker build -t myapp .`. Si el archivo no se llama `Dockerfile`, el único ejemplo es Go: `docker build -f Dockerfile.vercel -t web-vercel .`. No hay un `docker run -p` anotado para Node. → «Comandos anotados en `README.Docker.md`», checklist §5 y §6.
6. Compose si el código llama a otro servicio por nombre. La plantilla que sí tiene yaml es `02b` (`docker compose up --build`, puerto `3000:3000`), sin base de datos activa. `06-compose/server.js` asume el host `db` y **no hay `compose.yaml` en esa carpeta**. El Postgres de `02b` está comentado y crea la base `example`, no `midudb`. → «App Node que habla con Postgres», «Volumen y Postgres».

## 3. Cuándo uso cada patrón

30 filas. El código está en el capítulo, no aquí. `node:http` y el trío `loading` / `error` / `finally` están en el Quick Start y en sus capítulos; no ocupan fila.

### Fundamentos

Van dentro de [manual/02-react.md](manual/02-react.md) (el origen vainilla) y [manual/03-backend.md](manual/03-backend.md) (Node antes de Express). No hay capítulo `01`.

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| Filtros con `Set` + `data-*` | Listado estático en el DOM: ocultas `.job-listing-card`. En React el filtro pasa a query params. | [manual/02-react.md](manual/02-react.md) → «useFilters» (bloque vainilla) |
| `process.loadEnvFile()` | Puerto y secretos en `.env` sin paquete `dotenv`. | [manual/03-backend.md](manual/03-backend.md) → «`process.loadEnvFile()`» |

### React

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| Entry Vite (`createRoot`, plugin React) | Cualquier SPA nueva del curso. | [manual/02-react.md](manual/02-react.md) → «Estructura Vite + React» |
| Router casero (`pushState` + `popstate`) | SPA pequeña o para ver qué hace el router. `pushState` solo no re-renderiza. | [manual/02-react.md](manual/02-react.md) → «Router casero» |
| React Router 7 | Rutas con `:jobId`, redirect, catch-all. Hace falta `BrowserRouter` en el entry. | [manual/02-react.md](manual/02-react.md) → «React Router 7» |
| `useFilters` + debounce + offset | Listado con texto, filtros, página y URL. `limit`/`offset` en la query; página solo en la UI. | [manual/02-react.md](manual/02-react.md) → «useFilters», «Debounce», «Pagination» |
| Zustand (`authStore`, `favoritesStore`) | Auth y favoritos los leen Header, cards, detalle y la ruta protegida. Context está escrito y no montado. | [manual/02-react.md](manual/02-react.md) → «Zustand», «ProtectedRoute + Navigate» |

### Backend

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| MVC: `app.js` + routes / controllers / models | Más de un recurso, o el `index` único ya mezcla red y datos (`old-index.js`). | [manual/03-backend.md](manual/03-backend.md) → «Estructura `app.js` + `config.js`» |
| CORS → `express.json()` → log | Front en otro origin y cualquier POST/PUT/PATCH. Sin `json()`, `req.body` llega vacío. | [manual/03-backend.md](manual/03-backend.md) → «Middlewares base» |
| Router montado en `app.js` | Un `Router` por recurso. `app.use("/jobs", jobsRouter)`; dentro, las rutas van sin el prefijo. | [manual/03-backend.md](manual/03-backend.md) → «Router montado en `app.js`» |
| Controller HTTP in/out; el model toca los datos | Status y `res.json` en el controller. `filter` / `find` / `push` solo en el model. | [manual/03-backend.md](manual/03-backend.md) → «Controller», «Model» |
| `/health` + listen según `NODE_ENV` | Liveness fuera del recurso. Para tests, el if bueno es el de m07 (`!process.env.NODE_ENV`) o, en m11, `createApp()` sin `listen`. | [manual/03-backend.md](manual/03-backend.md) → «Health check», «`app.listen`» |

### SQL

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| `better-sqlite3` + WAL + `foreign_keys = ON` | Una conexión para toda la API, archivo `jobs.db`. Sin el pragma, el `REFERENCES` no se cumple. | [manual/04-sql.md](manual/04-sql.md) → «Conexión a SQLite» |
| Seed `INSERT OR IGNORE` + `db.transaction` | Poblar sin morir por PK al repetir el script. No actualiza filas si cambias el texto del seed. | [manual/04-sql.md](manual/04-sql.md) → «Seed» |
| Prepared statements (`.all` / `.get` / `.run`, `?`) | El modelo es el único que habla SQL. Valores aparte del string. | [manual/04-sql.md](manual/04-sql.md) → «Modelo con prepared statements» |
| Zod en middleware, enums = `CHECK` | Antes del controller. `.partial()` en el PATCH. `'onsite'` en código, `'office'` en el apunte C1. | [manual/04-sql.md](manual/04-sql.md) → «Validación con Zod» |

### Testing

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| `node:test` + `fetch` a un puerto fijo | API HTTP real (m07). `before` escucha en `3456`, `after` cierra. El script `npm test` de ese módulo no lanza esto. | [manual/05-testing.md](manual/05-testing.md) → «Estructura de un test file», «Levantar el server» |
| SuperTest sobre `createApp()` | HTTP sin puerto (m11). `createApp({ initialTasks })` + `structuredClone` cuando el test escribe. | [manual/05-testing.md](manual/05-testing.md) → «Test de API con SuperTest», «`createApp({ initialTasks })`» |
| Vitest + RTL + `jest-dom/vitest` | Componente en el mismo Vite. Hace falta `environment: "jsdom"` y el `setup.js`. | [manual/05-testing.md](manual/05-testing.md) → «Config mínima Vitest», «Test de componente con RTL» |
| Playwright por rol/ARIA | Humo E2E del listado. CSS (`.job-listing-card`) al final. El spec asume el front ya en `5173`. | [manual/05-testing.md](manual/05-testing.md) → «Localizadores», «Flujo real del spec» |

### TypeScript

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| `tsconfig` NodeNext + imports `.js` | API ESM que compilas a `dist/` y arrancas con `node`. El fuente es `.ts`; el import relativo lleva `.js`. | [manual/06-typescript.md](manual/06-typescript.md) → «`tsconfig.json`», «Imports con extensión `.js`» |
| `interface` para la entidad; `type` para `Omit` / `Partial` / uniones | `Job` es interface. `CreateJobDTO` y `UpdateJobDTO` salen de `Omit` y `Partial`. | [manual/06-typescript.md](manual/06-typescript.md) → «`type` vs `interface`», «`Omit` y `Partial`» |
| `Request<Params, ResBody, ReqBody, Query>` | El editor conoce `req.query` (`JobFilters`) o `req.params.id`. El GET no pasa por Zod: el tipo puede mentir en runtime. | [manual/06-typescript.md](manual/06-typescript.md) → «Controller Express» |

### IA

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| Endpoint propio + `streamText` | Quieres ver el texto mientras llega. JSON completo: el cliente `openai` está comentado. | [manual/07-ia.md](manual/07-ia.md) → «Contrato `GET /ai/summary/:id`», «Vercel AI SDK» |
| `express-rate-limit` solo en `/ai` | La ruta que gasta cuota (5/min por IP). El limitador de `examples/` no cubre esta ruta. | [manual/07-ia.md](manual/07-ia.md) → «Rate limit con `express-rate-limit`» |
| `Streamdown` para el stream; `snarkdown` para la oferta fija | El resumen llega a trozos. El HTML de la oferta sigue inyectado. | [manual/07-ia.md](manual/07-ia.md) → «Markdown en vivo» |

### Docker

| Patrón | Cuándo | Capítulo |
| --- | --- | --- |
| `.dockerignore` (`node_modules`, `.env`) | Siempre que haya `COPY . .`. Sin él, el contexto mete basura local y puede pisar el `npm install` de la imagen. | [manual/08-docker.md](manual/08-docker.md) → «Qué excluye `.dockerignore`» |
| Una etapa, o multi-stage si hay bundle | Sin build: `02-node-web` o `06-compose`. Con `esbuild --bundle`: `03-multi-stage` (solo viaja `dist`). | [manual/08-docker.md](manual/08-docker.md) → «Dos `FROM`», «Node en imagen» |
| `USER node` + `EXPOSE` = `PORT` | API que no escribe en disco. `USER` después del `npm install`. | [manual/08-docker.md](manual/08-docker.md) → checklist §3 y §4 |
| Compose cuando el código llama a un host por nombre | `db` en `06-compose/server.js`. El yaml de esa carpeta no está. Plantilla con archivo: `02b`. | [manual/08-docker.md](manual/08-docker.md) → «App Node que habla con Postgres», «Plantilla: un servicio» |

## 4. Gotchas que ya me mordieron

- **La página pedida en la URL no se usa; un `page` inválido se queda en `NaN`.** → En el init de `currentPage` (m04) la condición está al revés: `Number.isNaN(page) ? page : 1`. Un número válido cae en `1`; un `NaN` se devuelve tal cual. → [manual/02-react.md](manual/02-react.md) → «useFilters». → **Sigue** en m04. Ningún módulo posterior lo corrige.

- **`require(".math")` no carga el módulo.** → Falta la `/` del path. Encima el `package.json` es `"type": "module"` (ese `require` no corre) y `math.js` exporta ESM, no `module.exports`. → [manual/03-backend.md](manual/03-backend.md) → «ESM vs CommonJS». → **Sigue** en `commonjs.js`. Es un ejercicio roto, no un patrón.

- **Importar `app.js` con `NODE_ENV=test` abre el puerto de desarrollo y el test choca (`EADDRINUSE` o dos `listen`).** → m06 escucha si el valor **no** es `"production"`. `"test"` pasa el if y abre `8888`; el `before` de m07 abre `3456`. → [manual/03-backend.md](manual/03-backend.md) → «`app.listen`»; [manual/05-testing.md](manual/05-testing.md) → «`if (!process.env.NODE_ENV)`». → **Arreglado en m07** con `if (!process.env.NODE_ENV)`. En m11 el `listen` está en `server.js` y los tests no lo importan. **m06 sigue con el if malo.**

- **Un POST 201 desaparece al reiniciar, y en m10 el GET de la lista no ve ese POST.** → `import jobs from "../jobs.json" with { type: "json" }` más `jobs.push` no escribe el archivo. En m10, `create` / `update` / `delete` / `getById` empujan `const jobs: Job[] = []`; solo `getAll` lee SQLite. → [manual/03-backend.md](manual/03-backend.md) → «Model»; [manual/04-sql.md](manual/04-sql.md) → «Cómo sustituye el modelo JSON-en-RAM». → **Sigue.** m07 corrige el filtro de tecnología, no la persistencia.

- **`GET /jobs?tech=…&modality=…` revienta el SQL o no filtra.** → `conditions.push(\`\`)` mete strings vacíos. Con filtros, el `WHERE` queda hueco (`WHERE  AND  AND`) y los `?` no coinciden con los params. → [manual/04-sql.md](manual/04-sql.md) → «Query con filtros dinámicos». → **Sigue.** El apunte del módulo dice que la lógica no se terminó. No lo copies.

- **El compilador acepta una fila SQLite que no tiene la forma de `Job`.** → `const rows: any = db.prepare(...).all(...)` apaga el chequeo: `row.technologies.split` y `row.modality` pasan aunque la fila no sea eso. → [manual/06-typescript.md](manual/06-typescript.md) → «El agujero: `const rows: any`»; también [manual/04-sql.md](manual/04-sql.md) → «Tipado del modelo». → **Sigue.** `@types/better-sqlite3` está instalado; el `any` no hace falta. `params: unknown[]` en la misma función es la anotación que sí encaja.

- **Un test de DevJobs deja basura al siguiente, y hace falta abrir un puerto para pegarle a la app.** → No hay factory. El array `jobs` es un singleton del módulo. `createApp()` **no está** en m06 ni en m07. → [manual/03-backend.md](manual/03-backend.md) → «`createApp()`»; [manual/05-testing.md](manual/05-testing.md) → «SuperTest sobre `createApp()`». → **Hecho solo en m11** (`projects/backend`, tasks en RAM, `structuredClone`). DevJobs no lo tiene.

- **Importar `useSearchForm` no te da un formulario.** → El archivo está comentado entero. → [manual/02-react.md](manual/02-react.md) → «useContactForm, useSearchForm». → **Sigue vacío.** La búsqueda real está en `useFilters` + `SearchFormSection`. No rellenes ese hook para “arreglarlo”: el flujo ya vive en el otro.

- **El build de `03-multi-stage` puede meter tu `node_modules` (y un `.env` si lo hubiera) en la etapa builder.** → Esa carpeta no tiene `.dockerignore` y el Dockerfile hace `COPY . .`. → [manual/08-docker.md](manual/08-docker.md) → «Dos `FROM`», «Qué excluye `.dockerignore`». → **Sigue.** El ignore sí está en `02-node-web`, `02b-node-web` y `06-compose`.

- **`GET /` de `06-compose` responde 500: no conecta a la base.** → `server.js` usa por defecto `postgres://midu:secreto@db:5432/midudb`. En esa carpeta no hay `compose.yaml`, así que el host `db` no existe. → [manual/08-docker.md](manual/08-docker.md) → «App Node que habla con Postgres». → **Sigue.** El único `compose.yaml` está en `02b-node-web`, con Postgres **comentado** y base `example`, no `midudb`. Descomentar uno no arranca el otro.

- **`npm test` en `modulo-07-Testing` termina en error «no test specified» y exit 1.** → El `package.json` tiene `"test": "echo \"Error: no test specified\" && exit 1"`. `node:test` solo corre si lanzas el archivo. → [manual/05-testing.md](manual/05-testing.md) → huecos del capítulo y checklist. → **Sigue en m07.** En m11 el script sí es `vitest run`. El mismo `echo` está en la raíz y en el `backend` de m09 ([manual/07-ia.md](manual/07-ia.md) → «Workspaces»).

- **`?technology=react` en m06 no encuentra ofertas (o no filtra por el campo real).** → El model mira `job.tecnologias`. El JSON trae `data.technology` (array). → [manual/03-backend.md](manual/03-backend.md) → «Model». → **Arreglado en** `modulo-07-Testing/models/job.js` con `job.data.technology.includes(technology)`. m06 sigue igual.

- **El `total` del listado baja al cambiar de página.** → El controller pone `total: jobs.length` **después** del `slice`. Es el tamaño de la página, no el total filtrado. → [manual/03-backend.md](manual/03-backend.md) → «Controller». → **Sigue.**

- **El front en `http://localhost:5173` a veces no pasa el CORS, aunque “está en la lista”.** → `ACCEPTED_ORIGINS` mezcla host sin protocolo (`localhost:5173`) y URLs con path (`/search`, `/jobs`). El header `Origin` no lleva path. → [manual/03-backend.md](manual/03-backend.md) → «Middlewares base». → **Sigue.** `!origin` deja pasar curl y Postman.

- **Un PATCH con body válido no llega al controller.** → `validateUpdate` no llama a `next()` cuando el `safeParse` va bien. → [manual/05-testing.md](manual/05-testing.md) → «Validación Zod en middleware». → **Sigue.** No hay test de ese camino.

- **El E2E puede ponerse verde sin comprobar «Aplicado».** → Tras el click en «Aplicar», `page.getByRole("button", { name: "Aplicado" })` no tiene `await` ni `expect`. El título esperado es un string fijo. `webServer` y `baseURL` están comentados: hay que tener el front ya en `5173`. → [manual/05-testing.md](manual/05-testing.md) → «Flujo real del spec». → **Sigue.**

- **El POST de `app.test.js` no demuestra que se guardó la ubicación.** → El schema Zod pide `ubicación` (con tilde). El body del test manda `ubicacion`. → [manual/05-testing.md](manual/05-testing.md) → «Validación Zod en middleware». → **Sigue.** El test solo mira el status 201.

- **A mitad del resumen se ve texto cortado y no el mensaje de error; el 429 tampoco se distingue.** → `setSummary("")` es falsy, así que el bloque de markdown no sale hasta el primer chunk. En `Detail`, `if (summary)` va antes que `error`. Cualquier `!response.ok` (incluido el rate limit) cae en el mismo `"Error fetching summary"`. → [manual/07-ia.md](manual/07-ia.md) → «Consumir el stream», «Rate limit con `express-rate-limit`». → **Sigue.**

- **`curl` a `localhost:5002/ask` no tiene detrás un compose que publique ese puerto.** → El README de `05-ia` pide `docker compose` y el host `5002`. No hay `compose.yaml`. El proceso escucha en `5000` (`EXPOSE 5000`). → [manual/08-docker.md](manual/08-docker.md) → «README de `05-ia`». → **Sigue.** Es apunte, no una corrida verificada. El título del README dice «Ejemplo 06» y la carpeta es `05-ia`.

- **El contador de visitas vuelve a 0 en un contenedor nuevo.** → `04-volumes` escribe `/app/data/visitas.txt` dentro del contenedor. No hay `VOLUME`, ni `docker run -v`, ni compose. → [manual/08-docker.md](manual/08-docker.md) → «Qué persiste en disco». → **Sigue.** El comentario habla de volúmenes; el comando no está.

## 5. Pendientes / no copiar

| Pendiente | Dónde está | Qué falta | Capítulo |
| --- | --- | --- | --- |
| Filtro SQL dinámico | `modulo-10-SQL/backend/src/models/job.ts` | Condiciones `AND col = ?` de verdad. Hoy `push(\`\`)`. El controller ya lee `tech` / `modality` / `level`. | [manual/04-sql.md](manual/04-sql.md) |
| CRUD que no es SQL | El mismo `models/job.ts` | `getById`, `create`, `update`, `delete` siguen en el array en RAM. `getAll` sí lee SQLite. | [manual/04-sql.md](manual/04-sql.md) |
| Paginación en el backend TS | `JobController.getAll`, `JobFilters` | No hay `LIMIT ?` ni `OFFSET ?` ni `ORDER BY`. En m06 la paginación es `slice` en memoria. | [manual/04-sql.md](manual/04-sql.md) |
| Esquema al arrancar | `app.ts` no importa `seed.ts` | Hay que lanzar `tsx src/db/seed.ts` a mano. No hay script npm. `job_content` se crea y no se rellena. | [manual/04-sql.md](manual/04-sql.md) |
| `rows: any` y tipos sueltos | `models/job.ts`, `types.ts`, `schemas/job.ts`, `middlewares/validation.ts` | No hay tipo de fila. `JobInput`, `ApiError`, `ValidationResult` y `createValidationMiddleware` están declarados y las rutas no los usan. El modelo lee `CreateJobDTO`, no el `z.infer`. | [manual/06-typescript.md](manual/06-typescript.md) |
| GET sin validar la query | `controllers/job.ts` | `?modality=banana` cabe en runtime. El tipo dice `"remote" \| "onsite" \| "hybrid"`. | [manual/06-typescript.md](manual/06-typescript.md) |
| `test-sql.ts` no es un test | `modulo-10-SQL/backend/src/test-sql.ts` | Abre el mismo `jobs.db` de la API. Los ids de los comentarios (`'1'`, `'2'`) no son los de los `run` (`"10"`, `"11"`). Importa `{ id }` desde `zod/v4/locales` y no lo usa; el `package.json` declara Zod 3. | [manual/04-sql.md](manual/04-sql.md) |
| CRUD Express a medias | `modulo-06-Backend-con-Express/controllers/jobs.js` | PUT y PATCH vacíos. DELETE siempre 403. `title` y `level` se leen y el model no los usa. Dos defaults de `limit`: 20 en `config.js`, 10 en el model. | [manual/03-backend.md](manual/03-backend.md) |
| `createApp` en DevJobs | m06 y m07 | La factory y el `server.js` separado solo están en `modulo-11-ci-cd`. | [manual/03-backend.md](manual/03-backend.md), [manual/05-testing.md](manual/05-testing.md) |
| Script `test` de m07 | `modulo-07-Testing/package.json` | Sigue el `echo` + `exit 1`. Falta algo tipo `node --test app.test.js`. | [manual/05-testing.md](manual/05-testing.md) |
| Huecos de `app.test.js` | `modulo-07-Testing/app.test.js` | No hay GET by id, ni 404, ni POST 400. El 404/400/201 completo está en los tests de tasks de m11, otro dominio. | [manual/05-testing.md](manual/05-testing.md) |
| CI de plataforma | `modulo-11-ci-cd` | No hay workflows en `.github`. Lo que existe es `pnpm lint` / `test` / `build`. El “build” del backend es `node --check`, no un artefacto. | [manual/05-testing.md](manual/05-testing.md) |
| E2E y RTL a medias | Playwright m07; `App.test.jsx` m11 | No hay `toHaveURL`, ni `getByLabel` en Playwright, ni `userEvent`. Stagehand tiene `act` y `extract`; no hay `observe`. Agentes de Stagehand los dejaste fuera a propósito. | [manual/05-testing.md](manual/05-testing.md) |
| `useSearchForm.jsx` | `modulo-04-vite-react/src/hooks/useSearchForm.jsx` | Vacío en runtime. No lo copies. | [manual/02-react.md](manual/02-react.md) |
| Init de `currentPage` | `useFilters` de m04 | Ternario de `Number.isNaN` invertido. Sin fix. | [manual/02-react.md](manual/02-react.md) |
| Auth y favoritos de producto | `authStore.js`, `favoritesStore.js`; Context en m05 | Login de juguete (cualquier credencial). Favoritos solo en memoria. `AuthProvider` / `FavoritesProvider` no se montan: la UI usa Zustand. | [manual/02-react.md](manual/02-react.md) |
| Tres ids de modelo | `routes/ai.js`, `config.js`, `ai-old-file-with-notes.js` | La ruta viva no usa `CONFIG.MODEL_AI` (`gpt-5.2`). El SDK `openai` está en dependencias y el código que lo llama está comentado. No hay timeout ni `AbortSignal`. | [manual/07-ia.md](manual/07-ia.md) |
| Rate limit de ejemplo | `modulo-09-…/examples/rate-limit.js` | No envuelve `/ai`. Memoria de un solo proceso, 30/min, en `GET /api`. | [manual/07-ia.md](manual/07-ia.md) |
| Deploy | m09 y `modulo-12-docker/07-vercel` | No hay `vercel.json` ni log de un deploy. `Dockerfile.vercel` y sus comandos son comentarios. El health y el `if` de `listen` sí están. | [manual/07-ia.md](manual/07-ia.md), [manual/08-docker.md](manual/08-docker.md) |
| `.dockerignore` en multi-stage | `modulo-12-docker/03-multi-stage` | No existe el archivo. | [manual/08-docker.md](manual/08-docker.md) |
| Compose de la app con Postgres | `modulo-12-docker/06-compose` | No hay `compose.yaml`. La URL por defecto no coincide con el Postgres comentado de `02b`. | [manual/08-docker.md](manual/08-docker.md) |
| Compose del Model Runner | `modulo-12-docker/05-ia` | El README manda `docker compose` y el puerto de host `5002`. El yaml no está. El modelo no va dentro de la imagen: hay que `docker model pull ai/smollm2` en el host. | [manual/08-docker.md](manual/08-docker.md) |
| Volumen de visitas | `modulo-12-docker/04-volumes` | Sin `VOLUME` y sin `-v`. El fichero muere con el contenedor. | [manual/08-docker.md](manual/08-docker.md) |
| `docker run -p` de las apps Node | módulo 12 | No está anotado. El único `docker run -p` es el de Go (`8080:80`) en un comentario. Para Node, lo anotado es `docker compose up --build` en `02b`. | [manual/08-docker.md](manual/08-docker.md) |
| Ejercicios TS como plantilla | `modulo-08-Typescript` | No hay `tsconfig`, ni `package.json`, ni React, ni genéricos (salvo `Array<number>`). La plantilla real es el `tsconfig` de m10. | [manual/06-typescript.md](manual/06-typescript.md) |
| `commonjs.js` | `modulo-06-Backend-con-NodeJS-y-Express` | `require(".math")` en un proyecto ESM. No lo copies. | [manual/03-backend.md](manual/03-backend.md) |
| Health de m11 en DevJobs | `modulo-11-ci-cd` vs m06/m07/m09 | `{ ok, service, timestamp }` y `{ status, uptime }` son contratos distintos. | [manual/03-backend.md](manual/03-backend.md), [manual/05-testing.md](manual/05-testing.md) |
| SQL que no está en tus `.md` | Apuntes C1–C16 | No hay `UNIQUE` en un `CREATE TABLE` (la unicidad la da la PK). No hay bloque `DEFAULT`. No hay `LEFT JOIN` escrito: el modelo usa `JOIN` y esconde jobs sin tecnologías. `ON DELETE` de los apuntes C13 es una lista, no un `CREATE`; el `ON DELETE CASCADE` real está en `seed.ts`. | [manual/04-sql.md](manual/04-sql.md) |

## 6. Índice a los capítulos

Pediste 8 capítulos. En `manual/` hay 7. Fundamentos (HTML/JS vainilla y HTTP nativo) no tienen archivo: están citados dentro de `02` y `03`.

| Capítulo | Cubre | Tamaño aproximado |
| --- | --- | --- |
| *(no existe `manual/01-…`)* | Fundamentos web y Node previo a Express. Filtros `Set` + `data-*` en el 02. `node:http`, `fs`, CLI, `.env` nativo en la parte A del 03. | — |
| [manual/02-react.md](manual/02-react.md) | SPA DevJobs: Vite, componentes, router casero y React Router 7, hooks de filtros/red/forms, Zustand, Context sin montar, lazy, Markdown. | 19 patrones |
| [manual/03-backend.md](manual/03-backend.md) | Node nativo y API Express MVC de jobs (JSON en RAM). Factory `createApp` explicada aquí y escrita en m11. | 19 patrones |
| [manual/04-sql.md](manual/04-sql.md) | SQL de los apuntes C1–C16 y el backend TS con SQLite. Incluye el filtro dinámico marcado como no copiar. | 21 patrones |
| [manual/05-testing.md](manual/05-testing.md) | `node:test`, Zod en la ruta, Playwright, Stagehand, Vitest, RTL, SuperTest, scripts pnpm. CI sin YAML. | 20 patrones |
| [manual/06-typescript.md](manual/06-typescript.md) | Ejercicios de m08 y los tipos de la API de m10 (`tsconfig`, DTOs, `Request`, el `any` de las filas). | 21 patrones |
| [manual/07-ia.md](manual/07-ia.md) | Monorepo, resumen en stream, rate limit, UI con `Streamdown`. Varias secciones son solo apunte (MCP, skills, coste, Ollama). | 23 secciones (unas 16 con código de producto; el resto apunte) |
| [manual/08-docker.md](manual/08-docker.md) | Dockerfiles `00`–`07`, ignore, multi-stage, volúmenes, Compose, Model Runner, imagen Go. | 16 patrones, más un checklist de 9 pasos |
