# 03 — Patrones Backend (Node nativo + Express MVC)

Fuente: `modulo-06-Backend-con-NodeJS-y-Express` (HTTP nativo) → `modulo-06-Backend-con-Express` (API DevJobs MVC).  
Factory `createApp()`: no está en m06; aparece en `modulo-11-ci-cd`. El `NODE_ENV` “para no arrancar en tests” se corrige en `modulo-07-Testing/app.js`.

Sin teoría de qué es Node/Express. Solo cómo lo montaste y cuándo copiarlo.

---

## Parte A — Node nativo

### ESM vs CommonJS

**Cuándo usarlo:** ESM (`import`/`export`) es tu default cuando `"type": "module"` está en `package.json`. CommonJS (`require`/`module.exports`) solo si el archivo o el paquete aún es CJS.

**Código:**

```json
// modulo-06-Backend-con-NodeJS-y-Express/package.json
{
  "main": "index.js",
  "type": "module"
}
```

```js
// modulo-06-Backend-con-NodeJS-y-Express/math.js
export const sum = (a, b) => a + b;
```

```js
// modulo-06-Backend-con-NodeJS-y-Express/index.js
import { sum } from "./math.js";

const result = sum(2, 3);
console.log(`The sum of 2 and 3 is: ${result}`);
```

```js
// modulo-06-Backend-con-NodeJS-y-Express/commonjs.js
const { sum } = require(".math");

const result = sum(2, 3);
console.log(`The sum of 2 and 3 is: ${result}`);

/* en math.js */
const sum = (a, b) => a + b;
module.exports = { sum };
```

**Gotcha / nota:** con `"type": "module"`, `require` en `commonjs.js` no corre. Además el path está mal: `require(".math")` (falta `/`). `math.js` real exporta ESM, no `module.exports`. No mezcles ambos en el mismo archivo/proyecto sin decidir el tipo.

---

### Servidor HTTP nativo (`node:http`)

**Cuándo usarlo:** para entender req/res, status, headers y `res.end()` antes de Express. Un callback por petición; tú ruteas a mano.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/notes-of-server.js
import { createServer } from "node:http";

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
  const { method, url } = req;

  if (method !== "GET") {
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }

  if (url === "/") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Hola desde Node!🦖");
  }

  if (url === "/users") {
    return sendJson(res, 200, [
      { id: 1, name: "Helix_Guardi" },
      { id: 2, name: "Victor Hugo Guardiola" },
    ]);
  }

  if (url === "/health") {
    return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
  }

  return sendJson(res, 404, { message: "Not Found" });
});
```

**Gotcha / nota:** si no llamas `res.end()`, el cliente se queda en pending. `charset=utf-8` en `Content-Type` o se rompen tildes/emojis. Recarga: `node --watch servidor.js`. Extrae `sendJson` en cuanto copies el mismo `setHeader` + `JSON.stringify` dos veces.

---

### `node:fs/promises` + permisos de Node

**Cuándo usarlo:** leer/escribir archivos sin callbacks; `mkdir` + `writeFile` para generar output. `process.permission.has` si ejecutas con el modelo de permisos de Node.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/manage-files.js
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

let content = "";

if (process.permission.has("fs.read", "archivo.txt")) {
  content = await readFile("archivo.txt", "utf-8");
  console.log(content);
} else {
  console.log("No tienes permiso para leer el archivo.");
}

if (process.permission.has("fs.write", "output/files/documents")) {
  const outputDir = join("output", "files", "documents");
  await mkdir(outputDir, { recursive: true });

  const uppercaseContent = content.toUpperCase();
  const outputFilePath = join(outputDir, "archivo-uppercase.txt");

  console.log("La extensión es: ", extname(outputFilePath));
  console.log("El nombre del archivo es: ", basename(outputFilePath));

  await writeFile(outputFilePath, uppercaseContent);
}
```

**Gotcha / nota:** `process.permission` solo existe si arrancas Node con permisos; sin eso, esto peta. `recursive: true` en `mkdir` evita el error si la carpeta ya existe. El JSON API de `notes-of-server.js` / `server.js` **no** usa este modelo de permisos: vive solo aquí.

---

### `node:os` y `node:path`

**Cuándo usarlo:** `path.join` / `basename` / `extname` siempre que armes rutas (Windows vs `/`). `os.*` cuando el CLI o el servidor necesitan datos de la máquina.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/system-info.js
import os from "node:os";
import ms from "ms";

console.log("Tipo de SO: ", os.type());
console.log("Plataforma: ", os.platform());
console.log("Arquitectura: ", os.arch());
console.log("Memoria total (bytes): ", os.totalmem());
console.log("Memoria libre (bytes): ", os.freemem());
console.log("Directorio home del usuario: ", os.homedir());

console.log(
  "Tiempo de actividad del sistema (segundos): ",
  ms(os.uptime() * 1000, { long: true }),
);
```

```js
// modulo-06-Backend-con-NodeJS-y-Express/manage-files.js + cli.js
import { join, basename, extname } from "node:path";
const outputDir = join("output", "files", "documents");
const fullPath = join(dir, name);
```

**Gotcha / nota:** no concatenes strings de ruta a mano. `os.uptime()` viene en segundos; tú lo pasas a ms (`* 1000`) para la lib `ms`. `os.cpus()` es un array grande: para “cuántos núcleos” usas `.length`.

---

### `node:crypto` `randomUUID` para IDs

**Cuándo usarlo:** IDs de recursos en memoria (users/jobs/tasks) sin depender de un autoincrement de BD.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/server.js
import { randomUUID } from "node:crypto";

const newUser = {
  name: body.name,
  id: randomUUID(),
};
```

```js
// modulo-06-Backend-con-Express/models/job.js
const newJob = {
  id: crypto.randomUUID(),
  titulo,
  empresa,
  ubicacion,
  data,
};
```

**Gotcha / nota:** en Node global ya tienes `crypto.randomUUID()` (Express model); en nativo importas `node:crypto`. No mezcles `id` numérico (`1`, `2`) con UUID en el mismo array como en `users` de `server.js`: el GET by id luego se vuelve inconsistente.

---

### CLI con `process.argv`

**Cuándo usarlo:** scripts de terminal: el argumento 2 es lo que pasa el usuario (`node cli.js ./carpeta`). Default si no hay arg.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/cli.js
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const dir = process.argv[2] ?? ".";

const files = await readdir(dir);

const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);

    return {
      name,
      isDir: info.isDirectory(),
      size: formaBytes(info.size),
    };
  }),
);
```

**Gotcha / nota:** `argv[0]` = node, `argv[1]` = script, `argv[2]` = tu arg. `readdir` no da tamaño: hay que `stat` cada path. `Promise.all` para no serializar N stats. No hay flags `--files-only` en el código: solo comentarios de “qué más se podría hacer”.

---

### `process.loadEnvFile()` y variables de entorno

**Cuándo usarlo:** puerto y secretos fuera del código. Cargas `.env` al `process.env` y lees con `??` fallback.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/notes-of-server.js
process.loadEnvFile(); // read automatically .env y poner en el process.env todas las variables de entorno
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});
```

```js
// modulo-06-Backend-con-NodeJS-y-Express/server.js
process.loadEnvFile();
const port = process.env.PORT ?? 3000;
```

**Gotcha / nota:** `loadEnvFile()` es API nativa (no `dotenv`). Si pones `port = 0`, Node elige el primer puerto libre (`server.address().port`); para API real usa `PORT` en `.env`. En Express m06 **no** llamas `loadEnvFile()`: ahí es `process.env.PORT || DEFAULTS.PORT`.

---

### JSON API en memoria

**Cuándo usarlo:** prototipo REST sin BD: array en RAM, GET con `limit`/`offset`, POST que parsea body, 400/201/404.

**Código:**

```js
// modulo-06-Backend-con-NodeJS-y-Express/server.js
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

const users = [ /* ... objetos en memoria ... */ ];

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const [pathname, queryString] = url.split("?");
  const searchParams = new URLSearchParams(queryString);

  if (method === "GET") {
    if (pathname === "/users") {
      if (
        Number.isNaN(Number(searchParams.get("limit") || 0)) ||
        Number.isNaN(Number(searchParams.get("offset") || 0))
      ) {
        return sendJson(res, 400, {
          error: "Limit and offset must be numbers",
        });
      }

      const limit = Number(searchParams.get("limit")) || users.length;
      const offset = Number(searchParams.get("offset")) || 0;
      const paginatedUsers = users.slice(offset, offset + limit);
      return sendJson(res, 200, paginatedUsers);
    }
  }

  if (method === "POST") {
    if (pathname === "/users") {
      const body = await json(req);
      if (!body || !body.name) {
        return sendJson(res, 400, { error: "Name is required!" });
      }
      users.push({ name: body.name, id: randomUUID() });
      return sendJson(res, 201, { message: "Usuario creado" });
    }
  }

  return sendJson(res, 404, { message: "Not Found" });
});
```

**Gotcha / nota:** `url.split("?")` es frágil (no hay URL absoluta); Express te lo da en `req.query`. Body: `node:stream/consumers` `json(req)`, no un `JSON.parse` a mano del stream. POST 201 aquí no devuelve el usuario creado, solo `{ message }`. Datos se pierden al reiniciar. `notes-of-server.js` es la versión anterior (solo GET, compara `url` entero, 405 si no es GET).

---

## Parte B — Express + MVC

### Estructura `app.js` + `config.js` + routes / controllers / models / middlewares

**Cuándo usarlo:** en cuanto tengas más de un recurso o el `index.js` único se vuelva spaghetti (`old-index.js`).

**Código:**

En m06 Express (sin carpeta `src/`; los apuntes MVC sí dibujan `src/`):

```text
modulo-06-Backend-con-Express/
├── app.js
├── config.js
├── jobs.json
├── routes/jobs.js
├── controllers/jobs.js
├── models/job.js
└── middlewares/cors.js
```

```js
// modulo-06-Backend-con-Express/config.js
export const DEFAULTS = {
  LIMIT_PAGINATION: 20,
  LIMIT_OFFSET: 0,
  PORT: 8888,
};
```

**Gotcha / nota:** `MVC-apuntes.md` habla de `src/index.js`; tu código real es `app.js` en la raíz. `old-index.js` es el “antes”: rutas + filtros + listen en un solo archivo. `JobModel.getAll` default `limit = 10` **no** usa `DEFAULTS.LIMIT_PAGINATION` (20): dos defaults distintos.

---

### Middlewares base: JSON, CORS custom, logging

**Cuándo usarlo:** `express.json()` antes de cualquier POST/PUT/PATCH. CORS si el frontend vive en otro origin. Logging al inicio para ver método + URL.

**Código:**

```js
// modulo-06-Backend-con-Express/app.js
app.use(corsMiddleware());
app.use(express.json());

app.use((request, response, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${request.method} ${request.url}`);
  next();
});
```

```js
// modulo-06-Backend-con-Express/middlewares/cors.js
import cors from "cors";

const ACCEPTED_ORIGINS = [
  "localhost:5173",
  "http://localhost:5173",
  "https://localhost:5173",
  "https://localhost:5173/search",
  "https://localhost:5173/jobs",
  "http://localhost:3000",
  "http://localhost:8888",
  "https://midu.dev",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Origen no permitido"));
    },
  });
};
```

**Gotcha / nota:** `!origin` deja pasar curl/Postman (no envían Origin). La lista mezcla host sin protocolo, URLs con path (`/search`) y `https://localhost`: el header `Origin` **no** lleva path; esas entradas no matchean. Factory `({ acceptedOrigins } = {})` sirve para tests. Orden: CORS → json → log → rutas.

---

### Router montado en `app.js`

**Cuándo usarlo:** un `Router` por recurso; `app.use("/jobs", jobsRouter)` para no repetir el prefijo.

**Código:**

```js
// modulo-06-Backend-con-Express/routes/jobs.js
import { Router } from "express";
import { JobController } from "../controllers/jobs.js";

export const jobsRouter = Router();

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getId);
jobsRouter.post("/", JobController.create);
jobsRouter.put("/:id", JobController.update);
jobsRouter.patch("/:id", JobController.partialUpdate);
jobsRouter.delete("/:id", JobController.delete);
```

```js
// modulo-06-Backend-con-Express/app.js
app.use("/jobs", jobsRouter);
```

**Gotcha / nota:** `GET /` del router es `GET /jobs`. `GET /:id` debajo de `/` para no tragarse otras rutas. El router **solo** cablea HTTP → método de clase; cero lógica.

---

### Controller: HTTP in, HTTP out, sin datos

**Cuándo usarlo:** extrae `params` / `query` / `body`, llama al model, pone status y `res.json`. Nada de `filter`/`find`/`push` aquí.

**Código:**

```js
// modulo-06-Backend-con-Express/controllers/jobs.js
export class JobController {
  static async getAll(req, res) {
    const {
      text,
      title,
      level,
      limit = DEFAULTS.LIMIT_PAGINATION,
      technology,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

    const jobs = await JobModel.getAll({
      text, title, level, limit, technology, offset,
    });

    return res.json({
      data: jobs,
      total: jobs.length,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  static async getId(req, res) {
    const { id } = req.params;
    const job = await JobModel.getById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body;
    const newJob = await JobModel.create({ titulo, empresa, ubicacion, data });
    return res.status(201).json(newJob);
  }
}
```

**Gotcha / nota:** `total: jobs.length` es el tamaño **ya paginado**, no el total filtrado. `title` y `level` se extraen y se pasan al model, pero el model **no los usa**. Métodos `static async` para no instanciar la clase.

---

### Model: acceso a datos (JSON)

**Cuándo usarlo:** único sitio que conoce `jobs.json` / el array. Si mañana hay SQL, solo cambias este archivo.

**Código:**

```js
// modulo-06-Backend-con-Express/models/job.js
import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm),
      );
    }

    if (technology) {
      filteredJobs = filteredJobs.filter((job) =>
        job.tecnologias.includes(technology),
      );
    }

    const paginatedJobs = filteredJobs.slice(
      Number(offset),
      Number(offset) + Number(limit),
    );
    return paginatedJobs;
  }

  static async getById(id) {
    return jobs.find((job) => job.id === id);
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = { id: crypto.randomUUID(), titulo, empresa, ubicacion, data };
    jobs.push(newJob); // lo haremos en una base de datos con un INSERT
    return newJob;
  }
}
```

**Gotcha / nota:** `import ... with { type: "json" }` (syntax assertion). `jobs.push` **no escribe** `jobs.json`: se pierde al reiniciar. El JSON real usa `data.technology` (array), no `job.tecnologias`. En m06 el filtro `technology` está mal; en `modulo-07-Testing/models/job.js` lo corriges a `job.data.technology.includes(technology)`. `title`/`level` ignorados.

---

### CRUD y códigos HTTP (lo que hay de verdad)

**Cuándo usarlo:** tabla mental de verbos + status. GET idempotente; POST crea (201); PUT reemplaza; PATCH parcial; DELETE 204 o 403 si no dejas borrar.

**Código:**

```js
// modulo-06-Backend-con-Express/old-index.js (comentarios de semántica)
// Idempotente: porque el sistema queda igual si llamas varias veces
app.get("/jobs", async (req, res) => { /* ... */ });

// NO es Idempotente
app.post("/jobs", (req, res) => {});

// Reemplazar un recurso completo
app.put("/jobs/:id", (req, res) => {});

// Actualizar parcialmente un recurso
app.patch("/jobs/:id", (req, res) => {});
```

```js
// modulo-06-Backend-con-Express/controllers/jobs.js
static async update(req, res) {}
static async partialUpdate(req, res) {}
static async delete(req, res) {
  return res
    .status(403)
    .json({ error: "No tienes permisos para eliminar todos los trabajos" });
}
```

Implementado de verdad en m06:

| Método | Ruta | Status que usas |
| --- | --- | --- |
| GET | `/jobs` | 200 + `{ data, total, limit, offset }` |
| GET | `/jobs/:id` | 200 o **404** |
| POST | `/jobs` | **201** + job |
| PUT / PATCH | `/jobs/:id` | **vacío** (handler sin cuerpo) |
| DELETE | `/jobs/:id` | **403** (no borra) |
| GET | `/health` | 200 `{ status, uptime }` |

En nativo (`server.js`): GET 200, query inválida **400**, POST **201**, resto **404**. En notes: método ≠ GET → **405**.

**Gotcha / nota:** las rutas PUT/PATCH/DELETE **existen**, pero update no está hecho. No copies esto como CRUD completo. El 403 de delete habla de “todos los trabajos” aunque la ruta es `/:id`. POST no valida body (a diferencia del nativo `Name is required`).

---

### Query params: filtros + paginación `limit`/`offset`

**Cuándo usarlo:** listados (`GET /jobs?text=&technology=&limit=&offset=`). Defaults en `config.js`; slice después de filtrar.

**Código:**

```js
// controllers: extrae query
const { text, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

// models: filtra y pagina
filteredJobs = filteredJobs.filter(/* text / technology */);
filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);
```

Nativo equivalente:

```js
const limit = Number(searchParams.get("limit")) || users.length;
const offset = Number(searchParams.get("offset")) || 0;
users.slice(offset, offset + limit);
```

**Gotcha / nota:** query params llegan como **string**. `Number("abc")` es `NaN`; el nativo lo valida, Express no. `offset + limit` en `slice` es exclusivo en el end. Sin `limit`, nativo = todo el array; Express controller = 20, model default = 10 si alguien llama al model directo.

---

### Health check `/health`

**Cuándo usarlo:** liveness para ti, Bruno, tests y (más adelante) orquestador. No toca datos.

**Código:**

```js
// modulo-06-Backend-con-Express/app.js
app.get("/health", (request, response) => {
  response.json({
    status: "ok",
    uptime: process.uptime(),
  });
});
```

**Gotcha / nota:** mismo shape que el nativo. No lo pongas detrás de `/jobs`. En CI (`modulo-11`) el health es `{ ok, service, timestamp }` — otro contrato; no lo mezcles con DevJobs.

---

### `app.listen` condicionado a `NODE_ENV`

**Cuándo usarlo:** el módulo de la app debe poder `import`arse en tests sin abrir puerto. El listen va al final, detrás de un if.

**Código:**

```js
// modulo-06-Backend-con-Express/app.js
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
```

```js
// modulo-07-Testing/app.js  ← el que sí encaja con tests
if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}
```

```js
// modulo-07-Testing/app.test.js
import app from "./app.js";
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});
```

**Gotcha / nota:** m06 **sí arranca** en tests (`NODE_ENV=test` no es `"production"`). Por eso m07 cambia a “solo listen si no hay `NODE_ENV`”. Exportar `app` es el primer paso; el if de m06 está al revés de lo que crees. Puerto Express: `8888` (`DEFAULTS`), nativo: `3000`.

---

### MVC según `MVC-apuntes.md` (esencia)

- **Model:** datos. No sabe HTTP. Aquí: `JobModel` + `jobs.json`.
- **View:** en REST es el JSON (`res.json`).
- **Controller:** lee request, llama model, decide status.
- **Routes:** mapa URL+verbo → controller (`express.Router()`).
- **Por qué:** el archivo único (`old-index.js`) mezcla red + negocio + persistencia y no escala a `users`/`products`.
- **Conectar:** `app.use("/jobs", jobsRouter)` y `app.js` se queda en middlewares + health + listen.

Los snippets de los apuntes (`getJobs` función suelta, `export default router`, `index.js`) **no coinciden** 1:1 con tu código (clases `JobController`/`JobModel`, named export `jobsRouter`, `app.js`). Sigue el código, no el diagrama `src/`.

---

## Parte C — Factory para tests

### `createApp()` inyectable + `app.js` vs `server.js`

**Cuándo usarlo:** cuando SuperTest/Vitest necesitan una app **sin** `listen`, y cada test puede meter su propio estado (`initialTasks`) para no compartir RAM.

**Código:** `createApp` **no existe** en m06 ni m07. Está en CI/CD:

```js
// modulo-11-ci-cd/projects/backend/src/app.js
export function createApp({ initialTasks = seedTasks } = {}) {
  const app = express();
  const tasks = structuredClone(initialTasks);

  app.use(express.json());
  // ...rutas que cierran sobre `tasks`...
  return app;
}
```

```js
// modulo-11-ci-cd/projects/backend/src/server.js
import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const app = createApp();

app.listen(port, () => {
  console.log(`CI/CD demo API running at http://localhost:${port}`);
});
```

```js
// modulo-11-ci-cd/projects/backend/test/app.test.js
const app = createApp();
const isolatedApp = createApp({
  initialTasks: [
    { id: "task-1", title: "Comprar pan", priority: "low", completed: true },
  ],
});
await request(isolatedApp).delete("/api/tasks/task-1").expect(204);
```

**Gotcha / nota:**

- `app.js` = factory (middlewares + rutas). `server.js` = proceso que escucha. Tests importan `createApp`, nunca `server.js`.
- `structuredClone(initialTasks)` evita que un test mute el seed.
- En DevJobs m06/m07 el array `jobs` es **módulo singleton**: un POST en un test ensucia el siguiente. La factory es el arreglo; m06 solo `export default app` + if de listen.
- SuperTest pega al `app` sin puerto; m07 Testing aún levanta `app.listen` en `before` porque no hay factory.

---

## Checklist para montar un backend Express desde cero

1. **Init npm** — `package.json` con `"type": "module"`, deps `express` (y `cors` si hay frontend en otro origin). Puerto en env o `config.js`.
2. **Carpetas** — `routes/`, `controllers/`, `models/`, `middlewares/`. `app.js` + `config.js` en raíz (o `src/` si lo unificas). JSON/BD fuera de los controllers.
3. **`app.js` + `config.js`** — `express()`, `DEFAULTS` (PORT, LIMIT, OFFSET). `export default app` (o `createApp()`).
4. **Primer recurso** — `Router` → `Controller` estático → `Model` que lee datos. Montar `app.use("/jobs", jobsRouter)`.
5. **Middlewares** — orden: CORS factory → `express.json()` → logger con `next()`. Sin `json()`, el POST llega con `body` vacío.
6. **CRUD** — GET list, GET by id (404), POST 201. PUT/PATCH/DELETE: no dejes handlers vacíos como en m06; o no declares la ruta.
7. **Query params** — filtros en el **model**; `limit`/`offset` con `Number()` y `slice`. `total` = longitud **antes** de paginar (hoy lo tienes mal).
8. **`/health`** — `{ status: "ok", uptime }` fuera del router de recurso.
9. **`NODE_ENV`** — no hagas `listen` al importar. Patrón que te funcionó en tests: `if (!process.env.NODE_ENV) app.listen(...)`. Mejor: `server.js` llama `listen`; tests usan `createApp()`.
10. **Deploy** — **no está en estos módulos.** Lo mínimo que ya tienes para una plataforma: `PORT` por env, `/health`, CORS con origins reales (no paths). Persistencia JSON en RAM no sirve en deploy: el propio model dice “lo haremos con un INSERT”.
