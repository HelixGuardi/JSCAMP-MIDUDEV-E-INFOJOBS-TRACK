# 05 — Patrones de testing (API + E2E + monorepo CI conceptual)

Fuente: `modulo-07-Testing` (`node:test` + Playwright + Stagehand) y `modulo-11-ci-cd` (Vitest + Testing Library + SuperTest + pnpm).  
Sin workflows `.github`: CI/CD = scripts + secuencia lógica.  
Sin teoría de pirámide. Código literal de tus archivos.

Huecos (no invento tests):
- `app.test.js` (m07) cubre GET list, GET filtro, POST 201. **No hay** GET by id, 404 ni POST 400.
- Playwright: **no hay** `getByLabel`, **no hay** `toHaveURL`, **no hay** `webServer` activo, **no hay** filtro → detalle.
- Stagehand: hay `act` + `extract`. **No hay** `observe`.
- Frontend m11: **no hay** `userEvent`.
- `modulo-07-Testing/package.json` sigue con `"test": "echo \"Error: no test specified\" && exit 1"`. El runner de API es `node:test` al ejecutar el archivo.

---

## Parte A — Tests de API con `node:test` (m07)

### Estructura de un test file (`describe` / `test` / `before` / `after`)

**Cuándo usarlo:** un archivo por app HTTP; hooks de ciclo de vida alrededor de los casos.

**Código:**

```js
// modulo-07-Testing/app.test.js
import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

describe("GET /jobs", () => {
  test("debe responder con 200 y un array de trabajos", async () => {
    // ...
  });
});
```

**Gotcha / nota:** importas `test`, no `it`. Un solo `describe` agrupa GET list, filtro y POST: el título del suite miente un poco.

---

### Levantar el server en `before` y cerrarlo en `after`

**Cuándo usarlo:** cuando testeas por HTTP real (`fetch` a `localhost`) y necesitas un puerto fijo distinto del de desarrollo.

**Código:**

```js
// modulo-07-Testing/app.test.js
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});
```

**Gotcha / nota:** Dev Express usa `8888` (`config.js` `DEFAULTS.PORT`). Los tests usan `3456` para no chocar. Si el puerto está ocupado, `server.on("error", reject)` tira el hook. Si no cierras en `after`, el proceso de `node:test` se queda colgado. Mejor aún: no abrir puerto (m11 + SuperTest).

---

### `fetch` local + `node:assert` (`strictEqual`, `ok`)

**Cuándo usarlo:** asserts nativos contra status y forma de JSON, sin Vitest ni SuperTest.

**Código:**

```js
// modulo-07-Testing/app.test.js
const response = await fetch(`${BASE_URL}/jobs`);
assert.strictEqual(response.status, 200);

const json = await response.json();
assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
```

**Gotcha / nota:** usas `assert.strictEqual` y `assert.ok`. **No aparece** `assert.deepEqual` / `assert.equal` en este archivo. El mensaje del `ok` es la pista cuando falla.

---

### Lo que sí testeas de cada endpoint (y lo que no)

**Cuándo usarlo:** mínimo viable de listado + filtro + alta. Completa 404/400 en otro archivo o con SuperTest (m11).

**Código — GET list + filtro:**

```js
// modulo-07-Testing/app.test.js
test("debe filtrar trabajos por tecnología", async () => {
  const tech = "react";
  const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
  assert.strictEqual(response.status, 200);

  const json = await response.json();
  assert.ok(
    json.data.every((job) => job.data.technology.includes(tech)),
    `Todos los trabajos deben incluir la tecnologia ${tech}`,
  );
});
```

**Código — POST 201 (el body que envías):**

```js
// modulo-07-Testing/app.test.js
const response = await fetch(`${BASE_URL}/jobs`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newJob),
});

assert.strictEqual(response.status, 201, "El status debe ser 201 Created");
```

**Código — GET by id / 404 en el controller (sin test en m07):**

```js
// modulo-07-Testing/controllers/jobs.js
static async getId(req, res) {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
}
```

**Gotcha / nota:** POST 201 no comprueba el JSON creado (solo status + `console.log`). El filtro asume `job.data.technology` en cada ítem; si el shape cambia, el `every` explota. 404/GET id/POST inválido **no están en `app.test.js`**. El 404/400/201 completo lo escribiste en m11 (`test/app.test.js`).

---

### `if (!process.env.NODE_ENV) app.listen(...)` — no abrir puerto al importar

**Cuándo usarlo:** `app.test.js` hace `import app from "./app.js"` y luego `app.listen(3456)`. El módulo no puede auto-listen si ya hay `NODE_ENV`.

**Código — m06 (al revés):**

```js
// modulo-06-Backend-con-Express/app.js
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
```

**Código — m07 (el que encaja con tests):**

```js
// modulo-07-Testing/app.js
if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
```

**Gotcha / nota:** m06 **sí arranca** con `NODE_ENV=test` (test ≠ `"production"`): dos `listen` (8888 al importar + 3456 en `before`) → `EADDRINUSE` o dos procesos. m07 solo escucha si `NODE_ENV` está vacío. Corre los tests **con** `NODE_ENV` definido. Patrón más limpio: `server.js` hace `listen`, tests importan `createApp()` (m11).

---

### Validación Zod en middleware: forma del 400 (sin test de body inválido en m07)

**Cuándo usarlo:** el POST pasa por `validateCreate` antes del controller. Un body que falle Zod debe ser 400, no 201.

**Código:**

```js
// modulo-07-Testing/routes/jobs.js
function validateCreate(req, res, next) {
  const result = validateJob(req.body);
  if (result.success) {
    req.body = result.data;
    return next();
  }

  return res
    .status(400)
    .json({ error: "Invalid request", details: result.error.errors });
}

jobsRouter.post("/", validateCreate, JobController.create);
```

```js
// modulo-07-Testing/schemas/jobs.js
const jobSchema = z.object({
  titulo: z
    .string({
      error: "El título es obligatorio",
    })
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder los 100 caracteres"),
  empresa: z.string(),
  ubicación: z.string(),
  descripcion: z.string().optional(),
  data: z.object({
    technology: z.array(z.string()),
    modalidad: z.string(),
    nivel: z.string(),
  }),
});

export function validateJob(input) {
  return jobSchema.safeParse(input);
}
```

**Gotcha / nota:** **no hay test** que mande un body malo y lea `{ error, details }`. El schema pide `ubicación` (tilde) y el POST de `app.test.js` manda `ubicacion` (sin tilde) — Zod 4 suele strippear keys extra; el 201 no demuestra que `ubicación` se persistió. `validateUpdate` no llama `next()` si el parse va bien: el PATCH queda a medias. Copia el patrón de 400 de m11 (`title: "no"` → 400) cuando añadas el test.

---

## Parte B — E2E con Playwright (m07)

### `playwright.config.js`: `projects`, `trace`; `baseURL` y `webServer` comentados

**Cuándo usarlo:** carpeta `e2e/` aparte, Chromium desktop, HTML reporter.

**Código:**

```js
// modulo-07-Testing/e2e/playwright.config.js
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    // baseURL: 'http://localhost:3000',
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
```

**Gotcha / nota:** el spec hace `page.goto("http://localhost:5173")` a pelo: el frontend tiene que estar ya en marcha. `webServer` y `baseURL` están comentados. `headless: false` abre ventana (incómodo en CI). En CI: 2 retries, 1 worker, `forbidOnly`.

---

### Localizadores: rol/ARIA primero, CSS al final

**Cuándo usarlo:** clicks y relleno como usuario; CSS solo para listas sin rol decente.

**Código:**

```js
// modulo-07-Testing/e2e/tests/example.spec.js
// 1. lo más recomendable es usar Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS como último recurso

const searchInput = page.getByRole("searchbox");
await searchInput.fill("React");

await page.getByRole("button", { name: "Buscar" }).click();

const jobCards = page.locator(".job-listing-card");
```

**Gotcha / nota:** **`getByLabel` no está en Playwright aquí**; sí en RTL (`App.test.jsx`). El listado cae a CSS `.job-listing-card`. Si el markup deja de ser `searchbox` / botón "Buscar", el test muere.

---

### Flujo real del spec: buscar → esperar card → login → aplicar

**Cuándo usarlo:** humo del listado DevJobs en `localhost:5173`. No es filtro combinado ni página de detalle.

**Código:**

```js
// modulo-07-Testing/e2e/tests/example.spec.js
test("buscar empleos y aplicar a una oferta", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("React");
  await page.getByRole("button", { name: "Buscar" }).click();

  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.first().locator("h3");
  await expect(firstJobTitle).toHaveText("Desarrollador de Software Senior");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

  page.getByRole("button", { name: "Aplicado" }).first();
});
```

**Gotcha / nota:** el título esperado es **texto fijo**, no regex (la regex está comentada). Depende del primer resultado real. Tras "Aplicar", la línea de "Aplicado" **no tiene `await` ni `expect`**: no afirma nada. No hay `toHaveURL`. No hay "abrir detalle".

---

### `expect` de Playwright que sí usas

**Cuándo usarlo:** visibilidad de la card y texto exacto del `h3`.

**Código:**

```js
// modulo-07-Testing/e2e/tests/example.spec.js
await expect(jobCards.first()).toBeVisible();
await expect(firstJobTitle).toHaveText("Desarrollador de Software Senior");
```

**Gotcha / nota:** `toBeVisible` + `toHaveText`. **`toHaveURL` no aparece.**

---

### `trace.zip` cuando falla (solo config)

**Cuándo usarlo:** en CI, al reintentar un test fallido (`retries: 2` si `process.env.CI`).

**Código:**

```js
// modulo-07-Testing/e2e/playwright.config.js
/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
trace: "on-first-retry",
```

**Gotcha / nota:** en el repo **no hay** comando, script ni apunte tuyo para abrir un `trace.zip`. Localmente `retries` es `0` → **no se genera trace** en el primer fallo. En CI, el zip vive en el output de Playwright (ignorado en `.gitignore` de e2e). El comentario del config apunta al Trace Viewer oficial; no lo documentes como flujo que hayas automatizado.

---

## Parte C — E2E con IA (Stagehand, m07)

### Qué hace `ai-e2e-test/test-ai.js`: setup, modelo, `act` / `extract`

**Cuándo usarlo:** el mismo flujo de usuario (buscar / login / aplicar / favorito) descrito en lenguaje natural, contra el front en `5173`.

**Código:**

```js
// modulo-07-Testing/ai-e2e-test/test-ai.js
process.loadEnvFile();

import { test } from "node:test";
import assert from "node:assert";
import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede buscar, aplicar y favoritar una oferta de trabajo", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "openai/gpt-5.4-mini",
    allowSystemInMessages: true,
  });

  try {
    await stagehand.init();
    const [page] = stagehand.context.pages();
    await page.goto("http://localhost:5173");

    await stagehand.act('Escribir "React" en la searchbox', { timeout: 30000 });
    await stagehand.act('Click en el botón de buscar "Buscar"');
    await stagehand.act('Click en el botón de iniciar sesión "Iniciar sesión"');
    await stagehand.act(
      'Click en el botón de aplicar "Aplicar" de la oferta "Desarrollador de Software Senior"',
    );
    await stagehand.act("Darle favorito a alguna oferta de trabajo");

    const { extraction } = await stagehand.extract(
      "Obtén el subtotal de favoritos",
    );
    assert.strictEqual(extraction, "1");
  } catch (error) {
    console.error("❌ Error en el test:", error);
    throw error;
  } finally {
    await stagehand.close();
  }
});
```

**Gotcha / nota:** `process.loadEnvFile()` va **antes** de los import (API key). `env: "LOCAL"` (no Browserbase cloud). **`observe` no aparece.** El assert es un string `"1"`, no un número. `finally` cierra el browser aunque falle. Ejecución anotada: `node test-ai.js` (el `package.json` de `ai-e2e-test` no tiene script de test real).

---

### Cuándo tiene sentido IA en E2E y cuándo no (según tus comentarios)

**Cuándo usarlo:** flujo largo cuyo selector te da pereza o cambia de markup; validar con `extract` un dato visible (subtotal de favoritos).

**Código (comentario del propio archivo):**

```js
// modulo-07-Testing/ai-e2e-test/test-ai.js
/* También se pueden utilizar "Agentes", pero es algo más bestia y sale caro,
   así que ni lo testearé aqui porque no podré hacer nada con un plano gratis
   limitado del Modelo de la AI */
```

**Gotcha / nota:** Playwright del mismo flujo es determinista y gratis. Stagehand gasta tokens (`usage` en el log del archivo). No lo pongas como gate de CI sin presupuesto. Agentes: lo dejaste fuera a propósito. Sigue necesitando el front en `5173` y el `.env`.

---

## Parte D — Vitest + Testing Library + SuperTest (m11)

### Config mínima Vitest en `vite.config.js`

**Cuándo usarlo:** tests de React en el mismo Vite del frontend.

**Código:**

```js
// modulo-11-ci-cd/projects/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});
```

**Gotcha / nota:** `environment: "jsdom"` es para DOM. El backend también usa `vitest run` **sin** este `vite.config` (Node por defecto). `globals: true` + ESLint `globals.vitest` en `**/*.test.js`.

---

### `setup.js` con jest-dom para Vitest

**Cuándo usarlo:** matchers tipo `toBeInTheDocument()` en RTL.

**Código:**

```js
// modulo-11-ci-cd/projects/frontend/src/test/setup.js
import "@testing-library/jest-dom/vitest";
```

**Gotcha / nota:** el import es `/vitest`, no el entry clásico de Jest. Sin este archivo, `toBeInTheDocument` no existe.

---

### Test de componente con RTL (`render`, `screen`)

**Cuándo usarlo:** smoke de que el planificador monta títulos, label y una tarea seed.

**Código:**

```jsx
// modulo-11-ci-cd/projects/frontend/src/App.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the task planner", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /plan del día/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nueva tarea/i })).toBeInTheDocument();
    expect(screen.getByText(/preparar ejemplos de github actions/i)).toBeInTheDocument();
    expect(screen.getByText("GET /api/tasks")).toBeInTheDocument();
  });
});
```

El markup que hace pasar `getByLabelText`:

```jsx
// modulo-11-ci-cd/projects/frontend/src/App.jsx
<label htmlFor="task-title">Nueva tarea</label>
<input id="task-title" ... />
```

**Gotcha / nota:** **`userEvent` no aparece** — el test no escribe ni hace submit. `getByLabelText` funciona por el `htmlFor`/`id`, no por wrapping. Si cambias el copy del `h1` o del seed `task-2`, peta.

---

### Test de utilidad pura (`tasks.js` → `tasks.test.js`)

**Cuándo usarlo:** primero esto: funciones sin DOM ni HTTP.

**Código — frontend:**

```js
// modulo-11-ci-cd/projects/frontend/src/tasks.test.js
it("calculates task progress", () => {
  const stats = getTaskStats([
    { completed: true },
    { completed: false },
    { completed: false },
  ]);

  expect(stats).toEqual({
    total: 3,
    completed: 1,
    pending: 2,
    progress: 33,
  });
});

it("toggles a task without mutating the list", () => {
  const tasks = [{ id: "task-1", title: "Comprar pan", completed: false }];
  const updatedTasks = toggleTask(tasks, "task-1");

  expect(updatedTasks[0].completed).toBe(true);
  expect(tasks[0].completed).toBe(false);
});
```

**Código — backend (el más simple de API helpers):**

```js
// modulo-11-ci-cd/projects/backend/test/tasks.test.js
it("rejects short titles", () => {
  expect(normalizeTaskInput({ title: "ok" })).toEqual({
    ok: false,
    error: "title must contain at least 3 characters",
  });
});
```

**Gotcha / nota:** `createTask` usa `Date.now()` → en frontend mockeas con `vi.spyOn(Date, "now")` y **`vi.restoreAllMocks()`**. `toggleTask` no muta: si mañana haces `task.completed = !task.completed` in-place, este test es el que te caza.

---

### Test de API con SuperTest sobre `createApp()` (sin `listen`)

**Cuándo usarlo:** HTTP in-process: no puerto, no `fetch`, no `before`/`after`.

**Código:**

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
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

it("returns health information", async () => {
  const response = await request(app).get("/health").expect(200);
  expect(response.body).toMatchObject({
    ok: true,
    service: "task-api",
  });
});

it("returns 404 for unknown tasks", async () => {
  const response = await request(app).get("/api/tasks/unknown").expect(404);
  expect(response.body).toEqual({ error: "Task not found" });
});

it("creates tasks", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "Leer documentación", priority: "low" })
    .expect(201);
  expect(response.body.task).toMatchObject({
    title: "Leer documentación",
    priority: "low",
    completed: false,
  });
});

it("validates task title", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "no" })
    .expect(400);
  expect(response.body.error).toBe("title must contain at least 3 characters");
});
```

**Gotcha / nota:** `request(app)` no llama `listen`. El `app` compartido al inicio **sí se contamina**: el POST 201 hace `tasks.push` y el PATCH muta `task-1`. Por eso stats/delete crean otra app (siguiente patrón). Health de m11 es `{ ok, service, timestamp }`, no el `{ status, uptime }` de DevJobs.

---

### `createApp({ initialTasks })` + `structuredClone`

**Cuándo usarlo:** cada test que escribe (delete, stats) necesita su propia memoria.

**Código:**

```js
// modulo-11-ci-cd/projects/backend/src/app.js
export function createApp({ initialTasks = seedTasks } = {}) {
  const app = express();
  const tasks = structuredClone(initialTasks);
  // ...
  return app;
}
```

```js
// modulo-11-ci-cd/projects/backend/test/app.test.js
it("deletes tasks", async () => {
  const isolatedApp = createApp({
    initialTasks: [{ id: "task-1", title: "Comprar pan", priority: "low", completed: false }],
  });

  await request(isolatedApp).delete("/api/tasks/task-1").expect(204);
  const response = await request(isolatedApp).get("/api/tasks").expect(200);
  expect(response.body.tasks).toEqual([]);
});
```

**Gotcha / nota:** `structuredClone` copia el seed: mutar `tasks` dentro de una app no toca `seedTasks` ni otra instancia. Si reutilizaras el mismo `app` del top-level, el delete vaciaría la lista de los tests siguientes. El `const app = createApp()` global **no** usa este aislamiento; solo stats y delete.

---

### Scripts `lint` / `test` / `build` y `pnpm --filter`

**Cuándo usarlo:** un comando en la raíz del monorepo que delega al package `@jscamp-ci/frontend` o `@jscamp-ci/backend`.

**Código:**

```yaml
# modulo-11-ci-cd/pnpm-workspace.yaml
packages:
  - "projects/*"
```

```json
// modulo-11-ci-cd/package.json
{
  "scripts": {
    "lint:frontend": "pnpm --filter @jscamp-ci/frontend lint",
    "lint:backend": "pnpm --filter @jscamp-ci/backend lint",
    "lint": "pnpm -r lint",
    "test:frontend": "pnpm --filter @jscamp-ci/frontend test",
    "test:backend": "pnpm --filter @jscamp-ci/backend test",
    "test": "pnpm -r test",
    "build:frontend": "pnpm --filter @jscamp-ci/frontend build",
    "build:backend": "pnpm --filter @jscamp-ci/backend build",
    "build": "pnpm -r build"
  }
}
```

```json
// modulo-11-ci-cd/projects/frontend/package.json
"lint": "eslint .",
"test": "vitest run",
"build": "vite build"
```

```json
// modulo-11-ci-cd/projects/backend/package.json
"lint": "eslint .",
"test": "vitest run",
"build": "node --check src/tasks.js && node --check src/app.js && node --check src/server.js"
```

**Gotcha / nota:** `--filter @jscamp-ci/frontend` usa el **name** del package, no la carpeta. `-r` recorre todos los workspaces. `test` es `vitest run` (un shot, CI-friendly); `test:watch` es local. El “build” del backend **no empaqueta**: es `node --check` (sintaxis). Frontend sí hace `vite build`.

---

## Parte E — CI/CD conceptual (sin YAML)

**Esto no está implementado en el repo; es la secuencia lógica a partir de los scripts existentes.** No hay workflows en `.github` dentro de `modulo-11-ci-cd`.

Orden que un pipeline real ejecutaría desde la raíz de `modulo-11-ci-cd`:

1. **install** — `pnpm install` (workspaces `projects/*`). No hay script `install` en el `package.json` raíz; es el paso de plataforma.
2. **lint** — `pnpm lint` → `pnpm -r lint` → `eslint .` en frontend y backend.
3. **test** — `pnpm test` → `pnpm -r test` → `vitest run` en ambos packages. (O `pnpm test:frontend` / `pnpm test:backend` por separado.)
4. **build** — `pnpm build` → `vite build` (front) + `node --check` de `tasks.js` / `app.js` / `server.js` (back).

Opcional local, no es gate: `pnpm start:backend` / `pnpm dev:frontend`.

m07 no entra en esta orquestación: su `package.json` no tiene script de test útil; Playwright/Stagehand viven en subcarpetas con el front a mano en `5173`.

---

## Checklist para añadir tests a un backend Express nuevo

- **Runner:** `node:test` ya viene en Node (m07). En el monorepo m11: Vitest + SuperTest (`"test": "vitest run"`).
- **Separar listen de la app:** `server.js` llama `listen`; tests usan `createApp()` (m11). Si no: `if (!process.env.NODE_ENV) app.listen(...)` (m07). **No** copies el `!== "production"` de m06.
- **`NODE_ENV`:** definido al importar en tests para no abrir `8888`/`3000` dos veces.
- **Primer test GET `/health`:** SuperTest `request(app).get("/health").expect(200)` (m11) o `fetch` + `assert.strictEqual(status, 200)` (m07; ahí no testeaste `/health`, pero el endpoint existe en `app.js`).
- **Primer test 404:** `GET /api/tasks/unknown` → `{ error: "Task not found" }` (m11). En DevJobs sería `GET /jobs/:id` inexistente — el controller ya lo hace; el test no está escrito.
- **Primer test POST 201:** body JSON + `Content-Type` + status 201 (m07 `fetch` / m11 `.send(...).expect(201)`).
- **Primer test POST 400:** body corto/inválido; en m11 `"title": "no"` → `title must contain at least 3 characters`. En m07 Zod `{ error: "Invalid request", details }` — escríbelo, hoy no está.
- **Script `test` en `package.json`:** m11 sí (`vitest run`). m07 no: cámbialo (p.ej. `node --test app.test.js`) antes de CI.
- **Ejecutar en CI:** `install` → `lint` → `test` → `build` con `pnpm -r` / `--filter`. **No hay YAML en este repo**; cuando lo añadas, esos cuatro comandos son el job.

