# 04 — Patrones SQL (SQLite + Express + TypeScript)

Fuente: apuntes `modulo-10-SQL/C1-C12` y `C13-C16`, más `backend/src/`.  
Contexto extra: `Conectar una API backend con una base de datos SQL.md`, `Persistir la información en SQLite.md`, `Hacer que la API lea desde la base de datos.md`.  
Comparación: `modulo-06-Backend-con-Express/models/job.js` (JSON en RAM).

Sin teoría de “qué es una BD relacional”. Solo cómo lo escribiste y cuándo copiarlo.  
**No invento SQL.** Si un keyword no aparece en tus archivos, lo digo.

---

## Parte A — SQL puro (C1–C16)

### Crear tabla con PRIMARY KEY, NOT NULL, CHECK

**Cuándo usarlo:** al definir el esquema de `jobs` (y luego de `companies`) antes de insertar. La BD es el último bastión: no basta con validar en el backend.

**Código:**

```sql
-- modulo-10-SQL/C1-C12/Restricciones y validaciones en SQL.md
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  modality TEXT NOT NULL CHECK (modality IN ('remote', 'office', 'hybrid'))
);
```

```sql
-- modulo-10-SQL/C13-C16/Relaciones entre tablas en SQL.md
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  modality TEXT NOT NULL,
  level TEXT NOT NULL,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

```sql
-- modulo-10-SQL/C1-C12/Las 3 primeras consultas SQL.md
DROP TABLE IF EXISTS jobs;
```

**Gotcha / nota:** en SQLite los tipos que usaste son `TEXT`, `INTEGER`, `REAL`, `BLOB`. `AUTOINCREMENT` en el `id` evita asignarlo a mano; tus apuntes avisan de no exponer IDs incrementales en público (son predecibles).  
`UNIQUE` como keyword **no aparece** en ningún `CREATE TABLE` de C1–C16: la unicidad la pone `PRIMARY KEY`. El error que viste al duplicar `id` es `UNIQUE constraint failed: jobs.id`.  
`DEFAULT` **no tiene bloque SQL** en tus `.md`. En C1 solo lo mencionas: omitir columna opcional → `NULL` o default; fechas como texto con `CURRENT_TIMESTAMP`; booleanos `INTEGER` 1/0. No copies un `DEFAULT` inventado: no está en el repo.  
Si el `CHECK` falla:

```sql
-- modulo-10-SQL/C1-C12/Restricciones y validaciones en SQL.md
INSERT INTO jobs (id, title, modality)
VALUES (1, 'Frontend Developer', 'asdasdasd');
```

la inserción se rechaza. En el backend el `CHECK` de `modality` usa `'onsite'`, no `'office'` (ver Parte B): no mezcles ambos vocabularios.

---

### INSERT simple y múltiple

**Cuándo usarlo:** simple para una fila (o para demostrar un rechazo de `CHECK` / PK). Múltiple para seed o lotes: un `INSERT INTO`, un `VALUES`, varias tuplas, un solo `;`.

**Código:**

```sql
-- simple (rechazo de CHECK) — C1-C12/Restricciones y validaciones en SQL.md
INSERT INTO jobs (id, title, modality)
VALUES (1, 'Frontend Developer', 'asdasdasd');
```

```sql
-- simple (persistencia / PK ya existente) — Persistir la información en SQLite.md
INSERT INTO jobs (id, title)
VALUES (1, 'Frontend Developer');
```

```sql
-- múltiple — C1-C12/Insertar mas de un elemento a la vez.md
INSERT INTO jobs (title, company, location, description, modality, seniority)
VALUES
  ('Frontend Developer', 'midu.dev', 'Barcelona', 'Crear interfaces increíbles', 'remote', 'junior'),
  ('Backend Developer', 'Feralp SL', 'Tenerife', 'Crear SVGs muy bonitos', 'remote', 'junior'),
  ('Full Stack Developer', 'Vercel', 'Argentina', 'Mejorar Next.js', 'remote', 'junior');
```

**Gotcha / nota:** el orden de valores tiene que coincidir con el de columnas. Repetir `company`/`modality` no falla; repetir `id` sí (`UNIQUE constraint failed: jobs.id`). Comentarios SQL: `--`. En C1 la columna se llama `seniority`; en C13/`CHECK` usas `level` / `modality`. Al copiar, alinea nombres con la tabla real.

---

### SELECT con columnas, WHERE, ORDER BY, LIMIT/OFFSET (paginación)

**Cuándo usarlo:** listados. Pide columnas concretas, filtra, ordena, y pagina con `LIMIT` + `OFFSET`. `OFFSET = (page - 1) * pageSize`.

**Código:**

```sql
-- C1-C12/Filtrar resultados en SQL.md
SELECT * FROM jobs;
SELECT title, company FROM jobs;
SELECT title AS titulo, company AS empresa FROM jobs;
SELECT * FROM jobs LIMIT 1;
SELECT * FROM jobs WHERE modality = 'remote';
SELECT * FROM jobs WHERE level = 'junior';
SELECT * FROM jobs WHERE level = 'junior' AND location = 'Barcelona';
SELECT * FROM jobs WHERE modality = 'remote' OR location = 'Tenerife';
SELECT * FROM jobs WHERE title LIKE '%developer%';
SELECT * FROM jobs WHERE title LIKE 'F%';
```

```sql
-- C1-C12/Ordenar y limitar resultados en SQL.md
SELECT title FROM jobs ORDER BY title ASC;
SELECT title FROM jobs ORDER BY title;
SELECT title FROM jobs ORDER BY title DESC;
SELECT id, company FROM jobs LIMIT 1;
SELECT id, company FROM jobs ORDER BY id DESC LIMIT 1;
SELECT id, company FROM jobs WHERE active = 1 ORDER BY id DESC LIMIT 5;
```

```sql
-- C1-C12/Paginacion en SQL.md
SELECT * FROM jobs LIMIT 5;                 -- página 1
SELECT * FROM jobs LIMIT 5 OFFSET 5;        -- página 2
SELECT * FROM jobs LIMIT 5 OFFSET 10;       -- página 3
SELECT * FROM jobs LIMIT 5 OFFSET 15;       -- página 4
SELECT * FROM jobs ORDER BY id ASC LIMIT 5 OFFSET 5;
```

Fórmula de tus apuntes: `(page - 1) * pageSize` → página 3, size 5 → `OFFSET 10`.

**Gotcha / nota:** `SELECT *` en producción arrastra columnas de más. `LIMIT` sin `ORDER BY` es “dame cualquiera”. Paginar sin orden hace páginas inconsistentes. `%` en `LIKE`: contiene / empieza / termina. El orden de escritura (`SELECT`…`WHERE`…`ORDER BY`…`LIMIT`) no es el de ejecución (`FROM`/`WHERE` primero). En C1 aparece `WHERE active = 1` y no hay `CREATE TABLE` con `active` en esos apuntes: es ejemplo de la clase de orden, no del esquema `jobs` de restricciones.

---

### UPDATE con WHERE (y el peligro de olvidarlo)

**Cuándo usarlo:** corregir filas existentes. Varias columnas en un `SET` separado por comas.

**Código:**

```sql
-- C1-C12/Actualizar datos en SQL.md
UPDATE jobs SET modality = 'remote' WHERE id = 3;

-- PELIGRO: sin WHERE toca TODAS las filas
UPDATE jobs SET modality = 'remote';

UPDATE jobs SET modality = 'remote', level = 'senior' WHERE id = 3;

-- WHERE a un id que no existe: 0 filas, no error
UPDATE jobs SET modality = 'remote', level = 'senior' WHERE id = 5;
```

**Gotcha / nota:** escribe el `WHERE` antes del `SET` si te olvidas fácil. Después, `SELECT * FROM jobs` para comprobar. Un `UPDATE` “que no hace nada” suele ser id inexistente, no SQL mal formado.

---

### DELETE con WHERE (mismo peligro)

**Cuándo usarlo:** borrar una fila concreta. En SQLite no esperes el freno de MySQL/Postgres: `DELETE FROM jobs;` se ejecuta y vacía la tabla.

**Código:**

```sql
-- C1-C12/Eliminar registros en SQL.md
DELETE FROM jobs;              -- PELIGRO: todas las filas
DELETE FROM jobs WHERE id = 3;

-- hábito: el mismo filtro como SELECT primero
SELECT * FROM jobs WHERE id = 3;
```

**Gotcha / nota:** si el `SELECT` con ese `WHERE` no es exactamente lo que quieres borrar, no ejecutes el `DELETE`.

---

### ALTER TABLE (añadir columna, renombrar)

**Cuándo usarlo:** el esquema ya tiene datos y no puedes `DROP` + recrear. Evoluciona la tabla sin perder filas.

**Código:**

```sql
-- C1-C12/Modificar tablas con ALTER TABLE.md
ALTER TABLE jobs ADD COLUMN website TEXT;
ALTER TABLE jobs RENAME TO job_offers;
ALTER TABLE job_offers RENAME COLUMN title TO job_title;
```

En versiones modernas de SQLite también viste:

```sql
-- C1-C12/Restricciones y validaciones en SQL.md
ALTER TABLE job_offers DROP COLUMN website;
```

**Gotcha / nota:** filas viejas quedan `NULL` en la columna nueva (el tipo sigue siendo `TEXT`). Renombrar tabla rompe backend/queries que esperaban `jobs`. Cambiar tipo o añadir ciertas restricciones en SQLite a menudo implica: tabla nueva → copiar → borrar vieja → rename. Backup antes de tocar esquema. `DROP COLUMN` no siempre existió en SQLite.

---

### Claves foráneas (FOREIGN KEY, ON DELETE)

**Cuándo usarlo:** una oferta pertenece a una empresa (`company_id` → `companies.id`), o tecnologías/contenido cuelgan de un job. Evitas copiar el nombre de la empresa en cada fila.

**Código:**

```sql
-- C13-C16/Relaciones entre tablas en SQL.md
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  modality TEXT NOT NULL,
  level TEXT NOT NULL,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

`ON DELETE` **no está en el SQL de C13**. Ahí solo listas estrategias (cascade / null / restrict). El SQL concreto de cascada está en el seed (Parte B):

```sql
-- modulo-10-SQL/backend/src/db/seed.ts
FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
```

**Gotcha / nota:** en SQLite las FK no se aplican hasta `PRAGMA foreign_keys = ON` (lo haces en `database.ts`). Sin eso, el `REFERENCES` es decoración.

---

### JOIN (INNER y LEFT) con ejemplo concreto

**Cuándo usarlo:** el título está en `jobs` y el nombre de empresa en `companies`; cruzas por `jobs.company_id = companies.id`. Alias (`j`, `c`) y `AS` para no liar columnas `id`/`name`.

**Código (INNER — en tus apuntes es `JOIN`, el inner por defecto):**

```sql
-- C13-C16/JOIN en SQL.md
SELECT title, name, location
FROM jobs
JOIN companies ON jobs.company_id = companies.id;

SELECT title, name, location
FROM jobs j
JOIN companies c ON j.company_id = c.id;

SELECT j.title, c.name, j.location
FROM jobs j
JOIN companies c ON j.company_id = c.id;

SELECT j.id
FROM jobs j
JOIN companies c ON j.company_id = c.id;

SELECT
  j.title,
  c.name AS company_name,
  j.location,
  c.zip_code AS company_zip_code
FROM jobs j
JOIN companies c ON j.company_id = c.id;
```

**INCORRECTO (no copiar):**

```sql
-- C13-C16/JOIN en SQL.md — ON mal: compara dos columnas de jobs
SELECT title, name, location
FROM jobs j
JOIN companies c ON j.company_id = j.id;
```

**LEFT JOIN:** no hay sentencia `LEFT JOIN` en C13. Lo nombras en `Hacer que la API lea desde la base de datos.md` como la query del vídeo. El código real de `models/job.ts` usa `JOIN` (inner) con `job_technologies`, no `LEFT JOIN` ni `companies`.

**Gotcha / nota:** `ON` mal infla filas (producto raro). `SELECT id` tras JOIN → columna ambigua. Inner JOIN con tecnologías **oculta jobs sin ninguna tecnología**. Si quisieras esos jobs, el apunte dice LEFT JOIN; el modelo actual no lo hace.

---

### GROUP BY + GROUP_CONCAT con ejemplo concreto

**Cuándo usarlo:** many-to-many job ↔ tecnologías vía tabla intermedia `job_technologies` (`PRIMARY KEY (job_id, technology)`). El JOIN suelto da una fila por relación; agrupas por job y concatenas techs.

**Código:** en C13 **no hay** la query SQL completa, solo el diseño. La query literal está en el modelo:

```sql
-- modulo-10-SQL/backend/src/models/job.ts
SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
FROM jobs j
JOIN job_technologies jt ON j.id = jt.job_id
-- ... filtros ...
GROUP BY j.id
```

Tabla intermedia (Parte B, mismo patrón que C13 describe):

```sql
-- modulo-10-SQL/backend/src/db/seed.ts
CREATE TABLE IF NOT EXISTS job_technologies (
  job_id TEXT NOT NULL,
  technology TEXT NOT NULL,
  PRIMARY KEY (job_id, technology),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
```

**Gotcha / nota:** `GROUP_CONCAT` sin `GROUP BY` junta **todas** las techs de todos los jobs en una fila. Tras agrupar, `technologies` es string (`React,TypeScript,CSS`); en TS haces `.split(",")` para el array de la API. C13 sugiere una tabla `technologies` + `technology_id`; no la implementaste.

---

### Transacciones (BEGIN / COMMIT / ROLLBACK)

**Cuándo usarlo:** una acción lógica toca varias tablas (empresa + oferta + techs). Todo o nada: si una sentencia falla, no dejes la empresa insertada y el job a medias.

**Código:**

```sql
-- C13-C16/Transacciones en SQL.md
BEGIN TRANSACTION;
INSERT INTO companies (id, name) VALUES (10, 'Google');
INSERT INTO jobs (title, company_id) VALUES ('Frontend Developer', 10);
INSERT INTO job_technologies (job_id, technology) VALUES (10, 'CSS');
COMMIT;
```

**Gotcha / nota:** si algo falla, `ROLLBACK`. El playground de aprendesql.dev puede **no** comportarse como SQLite real (el rollback automático de la demo no se ve igual). En Node usas `db.transaction(() => { ... })` en `seed.ts` (Parte B), no `BEGIN` a mano.

---

## Parte B — SQLite en Node/TS (`backend/src`)

### Conexión a SQLite (`db/database.ts`): better-sqlite3, WAL, ruta del archivo

**Cuándo usarlo:** un único módulo de conexión para toda la API. Archivo `jobs.db` (persistente), no `:memory:`.

**Código:**

```ts
// modulo-10-SQL/backend/src/db/database.ts
import Database from 'better-sqlite3'

const db = new Database('jobs.db')

db.pragma('journal_mode = WAL') // Mejora el rendimiento en concurrencia
db.pragma('foreign_keys = ON') // Habilita claves foráneas

export { db }
```

Instalación (`package.json`): `better-sqlite3`, `@types/better-sqlite3`, `tsx`, `typescript`. Driver nativo: puede pedir rebuild/bindings. No interpoles valores en SQL.

**Gotcha / nota:** `jobs.db` es binario; no lo leas como texto. WAL + lecturas concurrentes; sin `foreign_keys = ON` las FK no se hacen cumplir. La ruta es relativa al cwd desde el que lanzas `tsx` (si arrancas desde otra carpeta, el `.db` aparece en otro sitio). `test-sql.ts` abre **otra** instancia `new Database("jobs.db")` aparte de este singleton.

---

### Crear tablas al arrancar (schema inline / `CREATE TABLE IF NOT EXISTS`)

**Cuándo usarlo:** la primera ejecución (y las siguientes) no deben petar porque la tabla ya existe.

**Código:** el schema **no** corre en `app.ts`. Vive en `seed.ts` (script aparte) y un mini-schema en `test-sql.ts`.

```ts
// modulo-10-SQL/backend/src/db/seed.ts
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    modality TEXT NOT NULL CHECK(modality IN ('remote', 'onsite', 'hybrid')),
    level TEXT NOT NULL CHECK(level IN ('junior', 'mid', 'senior'))
  );
  // ... job_technologies, job_content ...
`)
```

```ts
// modulo-10-SQL/backend/src/test-sql.ts
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    modality TEXT NOT NULL
  )
`);
```

**Gotcha / nota:** `app.ts` no importa `seed.ts`. Arrancar el server **no** crea tablas. Tienes que ejecutar el seed a mano. `IF NOT EXISTS` no altera un esquema viejo: si cambias columnas, el `.db` anterior se queda con la definición antigua. `id` aquí es `TEXT` (luego UUID), no `INTEGER AUTOINCREMENT` de C1.

---

### Seed (`db/seed.ts`) con INSERT OR IGNORE y transacción

**Cuándo usarlo:** poblar `jobs.db` de forma idempotente. Reejecutar el seed no debe morir por PK duplicada.

**Código:**

```ts
// modulo-10-SQL/backend/src/db/seed.ts
const insertJob = db.prepare(`
  INSERT OR IGNORE INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const insertTech = db.prepare(`
  INSERT OR IGNORE INTO job_technologies (job_id, technology) VALUES (?, ?)
`)

const seed = db.transaction(() => {
  insertJob.run('1', 'Senior Frontend Developer', 'Tech Corp', 'Madrid, Spain',
    'Looking for a senior frontend developer', 'hybrid', 'senior')
  insertTech.run('1', 'React')
  insertTech.run('1', 'TypeScript')
  insertTech.run('1', 'CSS')
  // ... jobs 2 y 3 ...
})

seed()
```

**Gotcha / nota:** `INSERT OR IGNORE` traga duplicados en silencio: no actualiza filas si cambiaste el seed. `job_content` se crea y **no se seedea**. Transacción de better-sqlite3 = el `BEGIN/COMMIT` de C16. IDs `'1'|'2'|'3'` de seed vs `crypto.randomUUID()` en `create()`: dos mundos de identificadores.

---

### Modelo con prepared statements (`models/job.ts`): `.all()`, `.get()`, `.run()`

**Cuándo usarlo:** el modelo es la única capa que habla SQL. Placeholders `?`, valores aparte. `.all` listas, `.get` una fila, `.run` writes (`result.changes`).

**Código que sí pega a SQLite** (`getAll`):

```ts
// modulo-10-SQL/backend/src/models/job.ts
const rows: any = db.prepare(query).all(...params);

return rows.map((row) => ({
  id: row.id,
  title: row.title,
  company: row.company,
  location: row.location,
  description: row.description,
  data: {
    technology: row.technologies.split(","),
    modality: row.modality,
    level: row.level,
  },
}));
```

**Código de prueba (CRUD completo con prepare):**

```ts
// modulo-10-SQL/backend/src/test-sql.ts
const insert = db.prepare(
  "INSERT INTO jobs (id, title, company, modality) VALUES (?, ?, ?, ?)",
);
insert.run("10", "Frontend Developer", "TechCorp", "remote");

const allJobs = db.prepare("SELECT * FROM jobs").all();
const remoteJobs = db.prepare("SELECT * FROM jobs WHERE modality = ?").all("remote");
const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get("1");
db.prepare("UPDATE jobs SET modality = ? WHERE id = ?").run("onsite", "1");
const result = db.prepare("DELETE FROM jobs WHERE id = ?").run("2");
console.log("Filas eliminadas:", result.changes);
```

Desde el apunte de conexión:

```sql
INSERT INTO jobs (id, title, company, modality) VALUES (?, ?, ?, ?);
```

**Gotcha / nota:** **no interpoles** template strings con input de usuario (SQL injection). `getById` / `create` / `update` / `delete` del modelo **siguen el array en RAM** `const jobs: Job[] = []` — no usan `db`. Solo `getAll` lee SQLite. El comentario `// Base de datos en memoria` del modelo está desactualizado a medias: migración incompleta.

---

### Validación con Zod antes de tocar la BD (`schemas/job.ts`)

**Cuándo usarlo:** en el middleware, **antes** del controller/modelo. El body validado sustituye a `req.body`. PATCH usa `.partial()`.

**Código:**

```ts
// modulo-10-SQL/backend/src/schemas/job.ts
export const jobDataSchema = z.object({
  technology: z.array(z.string()),
  modality: z.enum(["remote", "onsite", "hybrid"]),
  level: z.enum(["junior", "mid", "senior"])
})

export const jobSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string"
  }).min(3, "Title must be at least 3 characters"),
  company: z.string({ required_error: "Company is required" }),
  location: z.string({ required_error: "Location is required" }),
  description: z.string({ required_error: "Description is required" }),
  data: jobDataSchema,
  content: jobContentSchema.optional()
})

export function validateJob(input: unknown) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input: unknown) {
  return jobSchema.partial().safeParse(input)
}
```

```ts
// modulo-10-SQL/backend/src/middlewares/validation.ts
export const validateCreateJob: AsyncMiddleware = (req, res, next) => {
  const result = validateJob(req.body)
  if (!result.success) {
    res.status(400).json({
      message: "Validation error",
      errors: result.error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message
      }))
    })
    return
  }
  req.body = result.data
  next()
}
```

```ts
// modulo-10-SQL/backend/src/routes/jobs.ts
jobsRouter.post("/", validateCreateJob, JobController.create)
jobsRouter.patch("/:id", validateUpdateJob, JobController.update)
```

**Gotcha / nota:** Zod y `CHECK` deben usar los mismos enums (`onsite` vs `office` de C1). El controller no vuelve a validar: asume middleware. Factory `createValidationMiddleware(schema)` existe para reutilizar.

---

### Tipado del modelo con TypeScript (tipos de fila)

**Cuándo usarlo:** contrato de API en `types.ts`; Zod infiere el input; el controller tipa `Request`.

**Código:**

```ts
// modulo-10-SQL/backend/src/types.ts
export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  data: JobData
  content?: JobContent
}

export type CreateJobDTO = Omit<Job, "id">
export type UpdateJobDTO = Partial<CreateJobDTO>

export interface JobFilters {
  tech?: string
  modality?: JobData["modality"]
  level?: JobData["level"]
}
```

```ts
// modulo-10-SQL/backend/src/schemas/job.ts
export type JobInput = z.infer<typeof jobSchema>
```

```ts
// modulo-10-SQL/backend/src/controllers/job.ts
static async getAll(
  req: Request<{}, {}, {}, JobFilters>,
  res: Response
): Promise<void> {
  const { tech, modality, level } = req.query
  const jobs = await JobModel.getAll({ tech, modality, level })
  res.json(jobs)
}
```

**Gotcha / nota:** **no hay `as Job`**. Las filas salen como `const rows: any`. El mapeo a mano reconstruye `{ data: { technology, modality, level } }` porque SQLite no devuelve el JSON de la API. `any` aquí es el agujero de tipos: si `technologies` es `null` (no debería con INNER JOIN), `.split` peta. Este patrón es de ejercicio a medias; en un proyecto real tiparías la fila (`JobRow`) y no usarías `any`.

---

### Query con filtros dinámicos — pendiente / no copiar

**Cuándo usarlo (la idea):** query params `?tech=React&modality=remote&level=senior`. Acumulas `AND` y params `?` por separado. **No copies el código actual.**

**Código (roto, condiciones vacías):**

```ts
// modulo-10-SQL/backend/src/models/job.ts — PENDIENTE / NO COPIAR
const conditions: string[] = [];
const params: unknown[] = [];

if (filters?.tech) {
  conditions.push(``);
  params.push(filters.tech);
}

if (filters?.modality) {
  conditions.push(``);
  params.push(filters.modality);
}

if (filters?.level) {
  conditions.push(``);
  params.push(filters.level);
}

if (conditions.length > 0) {
  query += "WHERE " + conditions.join(" AND ");
}
```

**Gotcha / nota:** `conditions.push(\`\`)` mete strings vacíos. Si hay filtros, sales un `WHERE  AND  AND ` inválido (o `WHERE` hueco). Los `params` se pasan igual → desalineación con `?`. **No hay `WHERE 1=1`** en el repo; esa sería una forma de ir acumulando `AND col = ?` sin pelearte con el primer `WHERE`. El apunte `Hacer que la API lea...` dice explícitamente que la lógica de filtros **no se terminó**. El controller ya extrae `tech`/`modality`/`level`; el agujero es solo el SQL del modelo. Falta espacio antes de `WHERE` (`query += "WHERE "` pega contra el JOIN). `GROUP BY` va después, correcto en intención.

---

### Paginación `LIMIT ? OFFSET ?` desde TypeScript

**Cuándo usarlo:** listados grandes. En SQL ya lo tienes (Parte A). **En este backend TS no está implementado.**

No hay `LIMIT ?` ni `OFFSET ?` en `backend/src`. `JobFilters` no trae `limit`/`offset`. `JobController.getAll` no los lee.

El precedente en RAM (m06):

```js
// modulo-06-Backend-con-Express/models/job.js
const paginatedJobs = filteredJobs.slice(
  offsetNumber,
  offsetNumber + limitNumber,
);
```

Cuando lo pases a SQLite, el SQL de tus apuntes es `LIMIT 5 OFFSET 10` + `ORDER BY`. Los placeholders irían como en `test-sql.ts` (`?`), no interpolados. Hasta que lo escribas, no copies un `LIMIT ? OFFSET ?` que no existe aquí.

---

### Scripts de prueba (`test-sql.ts`): qué probaste y cómo

**Cuándo usarlo:** antes de enchufar Express, un script suelto: abrir db → crear tabla → insert/select/update/delete → `db.close()`.

**Código:** ver bloque `.prepare` más arriba. Flujo que ejercitaste:

1. `CREATE TABLE IF NOT EXISTS`
2. dos `insert.run` (ids `"10"`, `"11"`)
3. `.all()` todos
4. `.all("remote")` filtro
5. `.get("1")` uno por id
6. `UPDATE ... WHERE id = ?`
7. `DELETE ...` y `result.changes`
8. `db.close()`

**Gotcha / nota:**

```ts
import { id } from "zod/v4/locales"; // no se usa; ruido
```

Comentario: “Base de datos en memoria” — **falso**: `new Database("jobs.db")` persiste. Insertas `"10"`/`"11"` y haces `.get("1")` y `DELETE ... "2"`: los comentarios (`id: '1'`, `id: '2'`) no coinciden con los valores. Si `jobs.db` ya tiene el seed, este script **escribe en la misma base** de la API (ids 10/11, update/delete). No es un test aislado tipo `node:test`; es un playground.

---

### Ejecución con `tsx` y `tsconfig.json`

**Cuándo usarlo:** ESM + TypeScript sin `tsc` en cada prueba. `"type": "module"` + `module`/`moduleResolution`: `NodeNext`. Imports con extensión `.js` aunque el archivo sea `.ts`.

**Código:**

```json
// modulo-10-SQL/backend/package.json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "start": "tsx src/app.ts",
    "build": "tsc",
    "start:prod": "node dist/app.js",
    "typecheck": "tsc --noEmit"
  }
}
```

```json
// modulo-10-SQL/backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

```ts
// ejemplo de import ESM/NodeNext — models/job.ts
import { db } from "../db/database.js";
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types.js";
```

**Gotcha / nota:** no hay script npm para `seed.ts` ni `test-sql.ts`; se lanzan con `tsx src/db/seed.ts` / `tsx src/test-sql.ts` (mismo patrón que el apunte: `tsx` sin compile previo). `start:prod` exige `tsc` antes (`dist/app.js`).

---

## Parte C — Conexión backend ↔ SQL

### Cómo sustituye el modelo JSON-en-RAM por SQLite sin tocar controllers ni rutas

**Cuándo usarlo:** ya tienes MVC. El contrato `JobModel.getAll / getById / create / update / delete` se mantiene; cambias **solo el modelo** (y añades db/seed). Controller sigue: query → `JobModel.*` → `res.json`.

**Antes (m06): el modelo importa JSON y filtra en memoria.**

```js
// modulo-06-Backend-con-Express/models/job.js
import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {
    let filteredJobs = jobs;
    // ... filter() por texto/tecnología ...
    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);
    return paginatedJobs;
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = { id: crypto.randomUUID(), titulo, empresa, ubicacion, data };
    jobs.push(newJob); // lo haremos en una base de datos con un INSERT
    return newJob;
  }
}
```

**Ahora (m10): el controller no cambió de forma.**

```ts
// modulo-10-SQL/backend/src/controllers/job.ts
const { tech, modality, level } = req.query
const jobs = await JobModel.getAll({ tech, modality, level })
res.json(jobs)
```

```ts
// modulo-10-SQL/backend/src/app.ts
app.use("/jobs", jobsRouter)
```

El modelo importa `db` en vez de `jobs.json`. `getAll` ejecuta SQL + mapea filas al shape `{ data: { technology, modality, level } }` que la API ya devolvía.

**Gotcha / nota:** la sustitución **no está completa**. Sigue `const jobs: Job[] = []` y create/update/delete/getById trabajan ese array vacío: POST “funciona” en RAM y se pierde al reiniciar; GET lista SQLite y no ve ese POST. Paginación y filtros de m06 (`slice`, `text`, `technology`) no se tradujeron a SQL. Campos m06 `titulo`/`empresa` vs m10 `title`/`company`. Mapear fila SQL → DTO de API es parte del trabajo, no un extra: “conectar no es solo traer datos”. El apunte sugiere que el mapeo quizá no debería vivir todo en el modelo.

---

## Checklist para conectar un backend Express a SQLite desde cero

1. **Instalar better-sqlite3** (+ `@types/better-sqlite3` si es TS) y poder rebuild nativo si falla el install.
2. **Abrir db con WAL:** `new Database('jobs.db')`, `journal_mode = WAL`, `foreign_keys = ON`. Un módulo exporta `db`.
3. **Crear tabla:** `CREATE TABLE IF NOT EXISTS` (jobs + tablas relacionadas) con PK, `NOT NULL`, `CHECK`, `FOREIGN KEY ... ON DELETE CASCADE`.
4. **Seed:** prepared `INSERT OR IGNORE` + `db.transaction(() => { ... })()`. Ejecutar con `tsx` **antes** de fiarte del GET.
5. **Model con prepared statements:** `db.prepare(...).all/.get/.run` y placeholders `?`. Mapea filas al contrato de la API. Sustituye el `import jobs.json` / array en RAM **en todos** los métodos, no solo en `getAll`.
6. **Validación Zod** en middleware (`safeParse` / `.partial()`) **antes** del controller; enums alineados con `CHECK`.
7. **Controller y rutas sin cambios de contrato:** mismo `JobModel`, mismos status 201/404/204.
8. **Probar con tsx:** `"dev": "tsx watch src/app.ts"`, `tsconfig` `NodeNext`, imports `.js`.
9. **Script de test** (`test-sql.ts`) para CRUD SQL aislado; no uses ids de comentario distintos a los `run()`. Cierra con `db.close()` en scripts sueltos.
10. **No copies** el filtro dinámico de `models/job.ts` (condiciones vacías). Completa los `AND col = ?` o usa `WHERE 1=1` bien hecho. Añade `ORDER BY` + `LIMIT ? OFFSET ?` si paginas (hoy no está en TS).

**Listo.** Siguiente: Testing (m07 + m11).
