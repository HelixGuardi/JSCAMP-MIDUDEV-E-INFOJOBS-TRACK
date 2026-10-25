# 06 — Patrones de TypeScript (ejercicios + API)

Fuente: `modulo-08-Typescript` (ejercicios) y `modulo-10-SQL/backend` (API Express).  
Sin teoría de “qué es TS”. Código literal de tus archivos.

Huecos (no invento):

- m08 no tiene `tsconfig`, `package.json`, React ni genéricos (la única sintaxis genérica del módulo es `Array<number>`).
- No hay `string[]` ni `Array<string>` literales. Lo que hay es `number[]` y `Array<number>`.
- Template literal **sí**: `` id: `user-${number}` ``. `instanceof` **sí**: `Date`.
- El único `tsconfig` del campamento es el de m10 (`NodeNext`). No hay `"moduleResolution": "bundler"`. Los Vite del repo siguen en JSX.
- Declarados y **no usados** por rutas/controllers: `JobInput`, `JobDataInput`, `JobContentInput`, `ValidationResult`, `ApiError`, `createValidationMiddleware`.
- `getAll` lee SQLite. `getById` / `create` / `update` / `delete` usan el array en RAM `const jobs: Job[] = []`.
- `test-sql.ts` importa `{ id }` desde `zod/v4/locales` y no lo usa. `package.json` declara `zod` `^3.22.4`. No hay `node_modules` en el backend para comprobar si ese import compila.
- El filtro dinámico de `models/job.ts` empuja strings vacíos. Eso es SQL a medias (manual 04). Aquí solo entra como contexto del `any`.

---

## Parte A — Ejercicios (m08)

### Primitivos y anotación

**Cuándo usarlo:** al fijar un primitivo que la inferencia ensancharía, o al admitir ausencia (`number | null`).

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/01-primitivos.ts
const nombre: string = "Helix";
const saludo = `Hola, ${nombre}`; // Tipo inferido como string

let isActive: boolean = true;
isActive = false;

let nulo: null = null;
let indefinido: undefined = undefined;

let age: number | null = null;
age = 30;
age = null;

const numeroGrande: bigint = 900719925474199123n;
const id: symbol = Symbol("id");

const ciudad = "Madrid"; // por ser una "const", el tipo ya es en sí el propio valor "Madrid"
let pais = "España";
pais = "Mexico"; // válido
```

**Gotcha / nota:** `const ciudad` queda en el literal `"Madrid"`. `let pais` se ensancha a `string` y por eso acepta `"Mexico"`. `null` y `undefined` van anotados solos; si un número puede faltar, la unión es `number | null`, no `?` (eso es de propiedades). `bigint` y `symbol` están en el mismo archivo, anotados a mano.

---

### Arrays (`T[]` y `Array<T>`)

**Cuándo usarlo:** lista homogénea. Si mezclas tipos, la unión va entre paréntesis en el elemento.

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/02-arrays.ts
const numeros: number[] = [1, 2, 3, 4, 5];
numeros.push(6);

const numerosAlt: Array<number> = [10, 20, 30];
numerosAlt.push(40);

const mixto: (string | number)[] = [1, "dos", 3, "cuatro"];
const arrayToFilter: (string | undefined)[] = [
  "uno",
  undefined,
  "tres",
  undefined,
];

let empty = [];
empty.push(1);
```

**Gotcha / nota:** `number[]` y `Array<number>` son la misma forma en tu archivo (no aparece `string[]`). `let empty = []` se queda en `any[]`: el `push(1)` no lo convierte en `number[]`. Tu comentario en ese archivo lo marca como el tipo a evitar.

---

### Tuplas (`[string, number]`, `readonly`, rest)

**Cuándo usarlo:** longitud fija y tipo distinto por posición (par nombre/edad, lat/lon, RGB, rango, firma estilo `useState`).

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/04-tuplas.ts
const persona: [string, number] = ["alfredo", 75];
const [personaName, personaAge] = persona;

type Coordenadas = [latitude: number, longitude: number];
const [lat, lon]: Coordenadas = [40.4168, -3.7038];

type EstadoContador = [
  value: number,
  updateFunction: (nuevoValor: number) => void,
];

type StringYMuchosNumeros = [string, ...number[]];
const [text, firstNumber, ...restOfNumbers]: StringYMuchosNumeros = [
  "texto",
  1,
  2,
  3,
  4,
  5,
];

type Config = readonly [server: string, port: number, useSSL: boolean];
const dbConfig: Config = ["localhost", 5432, true];
```

En `02-arrays.ts` también hay tuplas cortas: `[string, string, string]` y `[string, string, number]`.

**Gotcha / nota:** `latitude` / `value` / `server` son etiquetas de posición, no propiedades que leas con punto. `EstadoContador` imita la forma de `useState`; en m08 no hay React. `readonly` en la tupla `Config` cierra mutación en compilación. El rest `...number[]` obliga a que el primer elemento sea `string` y el resto números.

---

### Objetos inline y alias `type`

**Cuándo usarlo:** nombrar la forma una vez (`User`, `Company`) y reutilizarla. Objeto suelto sin alias solo si no sale del ejemplo.

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/00-types.ts
export type Company = {
  name: string;
  address: string;
  phone?: string;
};

export type User = {
  readonly name: string;
  readonly age: number;
  email?: string;
  company?: Company;
  role:
    | "CEO & Founder"
    | "Dev Senior"
    | "Dev Mid"
    | "Dev Junior"
    | "RH"
    | "Team leadership";
};
```

```ts
// modulo-08-Typescript/01-fundamentos/03-objetos.ts
import type { User, UserEntity, Dictionary, Translations } from "./00-types.ts";

const user: User = {
  name: "Helix",
  age: 23,
  email: "victorhdevtech@gmail.com",
  role: "CEO & Founder",
  company: {
    name: "dev tech company",
    address: "en el futuro, en todo el mundo",
  },
};

const anotherUser: User = {
  name: "Ana",
  age: 25,
  role: "RH",
};
```

**Gotcha / nota:** el import del ejercicio lleva extensión `.ts` (`./00-types.ts`). En m10, con NodeNext, los relativos llevan `.js` (Parte B). `role` tiene que coincidir carácter a carácter (`"CEO & Founder"`). `anotherUser` omite `email` y `company` porque son opcionales. `phone` de `Company` no lo rellenas en ningún objeto del archivo.

Index signature, mismo `00-types.ts`, para mapas cuya clave no conoces:

```ts
export type Dictionary = {
  [key: string]: string;
};
```

La usas en `03-objetos.ts` con claves `apple`, `banana`, etc. Si las claves son fijas, el alias con propiedades (`User`) es el que ya tienes; la index signature es el diccionario.

---

### `type` vs `interface`

**Cuándo usarlo:** la regla que escribiste en el propio archivo — `interface` para objetos y contratos (`extends`, `implements`); `type` para uniones, tuplas, primitivos y combinaciones.

**Código:**

```ts
// modulo-08-Typescript/03-interfaces-types/01-interfaces.ts
interface Persona {
  readonly name: string;
  readonly age: number;
}

interface User extends Persona, Identificable {
  email?: string;
  role: "admin" | "user" | "editor";
  saludar: () => string;
  login(): boolean;
}

export type UserType = {
  readonly name: string;
  readonly age: number;
  email?: string;
  role: "admin" | "user" | "editor";
};
```

En el comentario del mismo archivo dejas los casos que solo ves con `type`:

```ts
type StringOrNumber = string | number
type Coords = [number, number]
type ID = string
```

Y la clase que cumple dos contratos:

```ts
class Reproductor implements MediaPlayer, AudioPlayer {
  volumen: number = 50;

  play(): void {
    console.log("Reproduciendo...");
  }
  pause(): void {
    console.log("Pausado");
  }
  stop(): void {
    console.log("Deteniendo");
  }
}
```

**Gotcha / nota:** en la API real (m10) haces exactamente esa partición: `interface Job` para la entidad, `type CreateJobDTO = Omit<...>` porque `Omit` / `Partial` van en un alias. Métodos en interface: las dos formas que usas conviven en `User` (`saludar: () => string` y `login(): boolean`). El comentario también dice que puedes usar `type` para todo; el orden que seguiste es interface = objeto, type = el resto.

---

### Uniones y literales

**Cuándo usarlo:** un campo solo puede ser uno de unos cuantos valores (`role`, `theme`, nivel, dirección, sí/no).

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/00-types.ts
type Answer = "si" | "no" | true | false;
type Level = 1 | 2 | 3 | 4 | 5;
type Directon = "up" | "down" | "left" | "right";

export type Configuration = {
  readonly apiKey: string;
  readonly theme: "dark" | "light";
};
```

El `role` de `User` es la misma idea con seis strings. En la API, la unión vive en `JobData` (`"remote" | "onsite" | "hybrid"` y `"junior" | "mid" | "senior"`).

**Gotcha / nota:** `Answer` mezcla strings y booleanos en la misma unión. `Level` es el literal numérico `1 | 2 | 3 | 4 | 5`, no el `number` abierto. El alias está escrito `Directon` (sin la `i`). Un string cualquiera no entra en `theme`: solo `"dark"` o `"light"`.

---

### Opcionales `?` y `readonly`

**Cuándo usarlo:** `?` si la propiedad puede no estar; `readonly` si no debe reasignarse después de crear el objeto.

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/00-types.ts
type UserId = {
  readonly id: string | number;
};

export type User = {
  readonly name: string;
  readonly age: number;
  email?: string;
  company?: Company;
  role: /* unión */;
};
```

```ts
// modulo-08-Typescript/03-interfaces-types/01-interfaces.ts
interface Persona {
  readonly name: string;
  readonly age: number;
}
```

En m10, `content?: JobContent` y los filtros `tech?` / `modality?` / `level?` son el mismo `?`.

**Gotcha / nota:** `email?: string` significa “puede faltar”. `age: number | null` (en primitivos) significa “está y vale null”. No son lo mismo en tus archivos. `readonly` lo pones en `name`, `age`, `id`, `apiKey` y `theme`; es comprobación del compilador. La tupla `Config` usa `readonly` en la tupla entera, no en cada elemento.

---

### Intersección `&`

**Cuándo usarlo:** juntar varios alias en una entidad que debe cumplir todos a la vez.

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/00-types.ts
type UserWithBirrthdate = {
  birthdate: Date;
};

export type UserEntity = User & UserId & UserWithBirrthdate;
```

```ts
// modulo-08-Typescript/01-fundamentos/03-objetos.ts
const entity: UserEntity = {
  id: 1234,
  name: "manolo",
  age: 30,
  role: "Team leadership",
  email: "manolol@outlook.com",
  birthdate: new Date("1996-05-15"),
};
```

**Gotcha / nota:** `UserEntity` exige lo de `User` más `id` más `birthdate`. El alias está escrito `UserWithBirrthdate`. En interfaces el equivalente que usas es `extends` (`User extends Persona, Identificable`), no `&`.

---

### Template literal types

**Cuándo usarlo:** un id con forma fija de texto, no un `string` libre.

**Código:**

```ts
// modulo-08-Typescript/03-interfaces-types/01-interfaces.ts
interface Identificable {
  id: `user-${number}`;
}

const user: User = {
  id: `user-12345`,
  name: "midudev",
  age: 30,
  email: "miduga@email.com",
  role: "admin",
  saludar: () => "Hola!",
  login() {
    return true;
  },
};
```

**Gotcha / nota:** es el único template literal type del módulo. El valor es un template string (`` `user-12345` ``), alineado con `` `user-${number}` ``. No aparece en m10: allí `Job.id` es `string` y el id real sale de `crypto.randomUUID()`.

---

### `any` / `unknown` / `never` / `void`

**Cuándo usarlo:**

- `any`: tu apunte lo reserva a una migración o a una librería de terceros sin tipos.
- `unknown`: entra cualquier valor y no lo usas hasta estrechar (`typeof`, `in`).
- `void`: la función no devuelve nada útil (`return` vacío / `return undefined`).
- `never`: no termina (`while (true)`, `throw`) o rama imposible cuando la unión ya está cubierta.

**Código:**

```ts
// modulo-08-Typescript/01-fundamentos/05-any-unknown-never-voids.ts
let cualquierCosa: any = "hola";
cualquierCosa = 42;
cualquierCosa = true;
cualquierCosa.saludar();
const theResult = cualquierCosa + 8;

let valorDesconocido: unknown = "hola";
if (typeof valorDesconocido === "number") {
  const resultadoSeguro = valorDesconocido + 10;
  console.log(resultadoSeguro);
} else if (typeof valorDesconocido === "string") {
  console.log(valorDesconocido.toUpperCase());
}

function parseJSON(jsonString: string): unknown {
  return JSON.parse(jsonString);
}

const datos = parseJSON('{"nombre": "midudev", "edad": 30}');
if (typeof datos === "object" && datos !== null && "nombre" in datos) {
  console.log((datos as { nombre: string }).nombre);
}

function saludar(): void {
  console.log("Hola!");
}

function logError(errorMessage: string): void {
  if (errorMessage.length === 0) {
    return undefined;
  }
  console.log("Error:", errorMessage);
}

function bucleInifinito(): never {
  while (true) {
    //...
  }
}

function throwError(message: string): never {
  throw new Error(message);
}

function revisarValor(x: number | string) {
  if (typeof x === "number") {
    console.log("Es un número:", x);
  } else if (typeof x === "string") {
    console.log("Es una cadena:", x);
  } else {
    console.log(x); // NUNCA DEBERÍA ENTRAR AQUI
    throwError("Tipo no soportado");
  }
}
```

**Gotcha / nota:** `any` se contagia: `.saludar()` y `theResult` siguen en `any`. Tras `in`, el `nombre` no queda tipado y fuerzas con `as { nombre: string }`. `void` acepta `return undefined`. En el `else` de `revisarValor`, `x` ya es `never` porque la unión `number | string` está cubierta. El nombre de la función infinita está escrito `bucleInifinito`.

---

### Funciones: parámetros, retorno, opcionales y defecto

**Cuándo usarlo:** anota los parámetros siempre que el valor entre desde fuera. Anota el retorno en funciones que son un contrato (`: number`, `: string`). El tipo de función reutilizable va en un alias.

**Código:**

```ts
// modulo-08-Typescript/02-funciones/01-basicos.ts
function sumar(a: number, b: number): number {
  return a + b;
}

const multiplicar = (a: number, b: number): number => {
  return a * b;
};

const dividir = (a: number, b: number): number => a / b;

function saludarInicial(nombre: string, apellido?: string): string {
  if (apellido) {
    return `Hola, ${nombre} ${apellido}`;
  }
  return `Hola, ${nombre}`;
}

function crearUsuario(nombre: string, rol: string = "admin") {
  return {
    nombre,
    rol,
  };
}

function sumarNumeros(...numeros: number[]): number {
  return numeros.reduce((acc, curr) => acc + curr, 0);
}

type OperacionMatematica = (a: number, b: number) => number;

const division: OperacionMatematica = (a, b) => a / b;
const resta: OperacionMatematica = (a, b) => a - b;
```

El resumen que dejaste en el archivo: tipar parámetros porque la inferencia no siempre alcanza; el retorno va como `): Tipo`; `?` es `Tipo | undefined`; el valor por defecto no se combina con `?`; el rest es un array.

**Gotcha / nota:** `crearUsuario` no anota el retorno: se infiere `{ nombre: string; rol: string }`. En `division` / `resta` los parámetros `a` y `b` se infieren del alias `OperacionMatematica`. `if (apellido)` trata `""` como ausente. `sumarNumeros(1, 2)` y la llamada de cinco argumentos caben en `...numeros: number[]`.

---

### Type narrowing: `typeof`, truthiness, `in`, `instanceof`

**Cuándo usarlo:** el parámetro es una unión y dentro de la función necesitas el método de una de las ramas.

**Código:**

```ts
// modulo-08-Typescript/02-funciones/02-type-narrowing.ts
function procesar(valor: number | string) {
  if (typeof valor === "number") {
    console.log("El valor es un número:", valor.toFixed(2));
  } else {
    console.log("El valor es una cadena:", valor.toUpperCase());
  }
}

function imprimirMensaje(mensaje: string | null | undefined) {
  if (mensaje) {
    console.log(mensaje.toUpperCase());
  }
}

function moverAnimal(animal: Animal) {
  if ("nadar" in animal) {
    animal.nadar();
  } else if ("volar" in animal) {
    animal.volar();
  } else {
    animal.ladrar();
  }
}

function formatDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toUTCString();
  }
  return new Date(value).toUTCString();
}
```

`Animal` es `Pez | Pajaro | Perro`, cada uno con un método distinto (`nadar` / `volar` / `ladrar`).

**Gotcha / nota:** `if (mensaje)` descarta `null`, `undefined` y también `""`. El `else` de `moverAnimal` asume perro porque ya no quedan otras formas en la unión. `instanceof` solo lo usas con `Date`. En `example.ts` haces otro `typeof`, pero `const input = "2"`: la rama `number` no puede ejecutarse con ese valor. El mismo `example.ts` lo dice en apunte: los tipos desaparecen al ejecutar; dato de fuera (usuario, API, DB, archivo) se comprueba con código de verdad. El ejemplo del comentario escribe `unknow` (sin la `n`); el que sí compilas es `unknown` en `05-any-unknown-never-voids.ts`.

---

### Fusión de interfaces (declaration merging)

**Cuándo usarlo:** amplías el mismo contrato `interface` declarándolo otra vez con el mismo nombre. En tu archivo, las dos declaraciones están en el mismo fichero.

**Código:**

```ts
// modulo-08-Typescript/03-interfaces-types/01-interfaces.ts
interface Hero {
  nombre: string;
}

interface Hero {
  poder: string;
}

const hero: Hero = {
  nombre: "Superman",
  poder: "Volar",
};
```

**Gotcha / nota:** tu comentario: si declaras la misma interfaz varias veces, se fusionan, y `hero` necesita `nombre` y `poder`. No hay un ejemplo de fusión entre ficheros. Los `type` alias de m08 (`User`, `UserType`) no los redeclaras: la fusión que practicaste es de `interface`.

---

## Parte B — Aplicación real (m10 backend)

### `tsconfig.json` con NodeNext + `strict`

**Cuándo usarlo:** API Node en ESM (`"type": "module"`) que compilas con `tsc` a `dist/` y arrancas con `node dist/app.js`.

**Código:**

```json
// modulo-10-SQL/backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

```json
// modulo-10-SQL/backend/package.json
"type": "module"
```

**Gotcha / nota:** `module` y `moduleResolution` van los dos en `NodeNext`, alineados con `"type": "module"` y con imports relativos en `.js`. `outDir` + `rootDir` hacen que `src/app.ts` salga en `dist/app.js` (`start:prod`). `strict` es el que hace útil el resto: sin él, el `any` de las filas ni se nota. `include` es solo `src`; `exclude` saca `node_modules` y `dist`. `declaration` / `sourceMap` también están activos. m08 no tiene este archivo: allí el apunte de `example.ts` es ejecutar con `node` el `.ts` del ejercicio. No hay un segundo tsconfig para bundler en el repo.

---

### Imports con extensión `.js` en archivos `.ts`

**Cuándo usarlo:** cada import relativo del backend, porque el archivo que Node carga es el `.js` emitido (o el que resuelve NodeNext).

**Código:**

```ts
// modulo-10-SQL/backend/src/app.ts
import express, { type Express, type Request, type Response } from "express"
import { jobsRouter } from "./routes/jobs.js"
import { corsMiddleware } from "./middlewares/cors.js"
```

```ts
// modulo-10-SQL/backend/src/models/job.ts
import { db } from "../db/database.js";
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types.js";
```

```ts
// modulo-10-SQL/backend/src/db/database.ts
import Database from 'better-sqlite3'
```

**Gotcha / nota:** el fuente se llama `job.ts` y el import dice `job.js`. Los paquetes (`express`, `zod`, `better-sqlite3`, `node:crypto`) van sin extensión. `import type` lo usas para `Request`, `Job`, `ZodSchema`: eso no es runtime. `db`, `JobModel`, `z` y `Router` son valores y van en import normal. En m08 el import de tipos es `from "./00-types.ts"` porque ese ejercicio no está bajo este `tsconfig`.

---

### Tipos de dominio (`types.ts`)

**Cuándo usarlo:** la forma de la oferta que devuelve la API, separada del schema Zod y de la fila SQL.

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

export interface JobData {
  technology: string[]
  modality: "remote" | "onsite" | "hybrid"
  level: "junior" | "mid" | "senior"
}

export interface JobContent {
  description: string
  responsibilities: string
  requirements: string
  about: string
}

export interface JobFilters {
  tech?: string
  modality?: JobData["modality"]
  level?: JobData["level"]
}

export interface ApiError {
  message: string
  errors?: unknown[]
}
```

**Gotcha / nota:** `JobData["modality"]` y `JobData["level"]` reutilizan la unión; si cambias el enum en `JobData`, el filtro sigue. `content?` puede faltar (el `map` de `getAll` no lo rellena). `ApiError` no lo importa ningún controller: los `404` y `400` arman el JSON inline. `errors?: unknown[]` es el mismo criterio que `unknown` en m08 para un error cuya forma no fijas del todo.

---

### `Omit` y `Partial` en los DTOs

**Cuándo usarlo:** crear = la entidad sin `id`; actualizar = ese DTO con todo opcional.

**Código:**

```ts
// modulo-10-SQL/backend/src/types.ts
export type CreateJobDTO = Omit<Job, "id">

export type UpdateJobDTO = Partial<CreateJobDTO>
```

```ts
// modulo-10-SQL/backend/src/models/job.ts
static async create(input: CreateJobDTO): Promise<Job> {
  const newJob: Job = {
    id: crypto.randomUUID(),
    ...input,
  };
  jobs.push(newJob);
  return newJob;
}

static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
  const index = jobs.findIndex((job) => job.id === id);
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...input,
    data: input.data
      ? { ...jobs[index].data, ...input.data }
      : jobs[index].data,
  };

  return jobs[index];
}
```

**Gotcha / nota:** `CreateJobDTO` y `UpdateJobDTO` son `type` porque salen de `Omit` / `Partial`. `Partial` hace opcionales las claves de arriba (`title?`, `data?`, …). `data`, si viene, sigue siendo `JobData` entero, no un `JobData` con campos sueltos. Por eso el `update` mezcla `data` a mano con spread. El `id` lo pones tú con `randomUUID()`; no entra en el DTO. Estos métodos escriben en el array `jobs` en RAM, no en `db`.

---

### `z.infer<typeof schema>`

**Cuándo usarlo:** el schema Zod es el contrato de entrada y no quieres repetir la forma a mano. En tu archivo lo exportas; el modelo no lo importa.

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
  company: z.string({
    required_error: "Company is required"
  }),
  location: z.string({
    required_error: "Location is required"
  }),
  description: z.string({
    required_error: "Description is required"
  }),
  data: jobDataSchema,
  content: jobContentSchema.optional()
})

export type JobInput = z.infer<typeof jobSchema>
export type JobDataInput = z.infer<typeof jobDataSchema>
export type JobContentInput = z.infer<typeof jobContentSchema>

export function validateJob(input: unknown) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input: unknown) {
  return jobSchema.partial().safeParse(input)
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: z.ZodError }
```

El middleware que sí se usa:

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

`validateUpdateJob` es igual con `validatePartialJob`. Rutas: `POST /` lleva `validateCreateJob`, `PATCH /:id` lleva `validateUpdateJob`. GET no lleva schema.

**Gotcha / nota:** el comentario del schema dice que inferir evita duplicar, y aun así `types.ts` repite `Job` / `JobData` / `JobContent`. El modelo importa `CreateJobDTO`, no `JobInput`. Hoy las dos formas coinciden (sin `id` en el schema; `content` opcional; los mismos enums), pero el `.min(3)` y los `required_error` solo viven en Zod: `JobInput["title"]` sale de `z.infer` como string. `validateJob` recibe `unknown` (el patrón de m08) y devuelve el resultado de `safeParse`; `ValidationResult<T>` está escrito al lado y ninguna función lo usa como retorno. `jobSchema.partial()` es el paralelo de `Partial<CreateJobDTO>` para el PATCH. `createValidationMiddleware<T>` está en el mismo middleware y las rutas no lo llaman: usan las dos constantes.

---

### Controller Express (`Request<{}, {}, {}, JobFilters>`)

**Cuándo usarlo:** cuando lees `req.query` o `req.params` y quieres que el editor conozca `tech` / `id`. El comentario del archivo fija el orden: `Request<Params, ResBody, ReqBody, Query>`.

**Código:**

```ts
// modulo-10-SQL/backend/src/controllers/job.ts
import type { Request, Response } from "express"
import type { JobFilters } from "../types.js"

export class JobController {
  static async getAll(
    req: Request<{}, {}, {}, JobFilters>,
    res: Response
  ): Promise<void> {
    const { tech, modality, level } = req.query
    const jobs = await JobModel.getAll({ tech, modality, level })
    res.json(jobs)
  }

  static async getById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    const { id } = req.params
    const job = await JobModel.getById(id)

    if (!job) {
      res.status(404).json({ message: "Job not found" })
      return
    }

    res.json(job)
  }

  static async create(
    req: Request,
    res: Response
  ): Promise<void> {
    const newJob = await JobModel.create(req.body)
    res.status(201).json(newJob)
  }
}
```

`update` tipa `Request<{ id: string }>` y pasa `req.body` a `JobModel.update`. `delete` igual y, si borra, `res.status(204).send()`.

**Gotcha / nota:** `getAll` sustituye la query por `JobFilters`. No hay middleware Zod en el GET: `?modality=banana` cabe en runtime y el tipo dice `"remote" | "onsite" | "hybrid"`. `create` y el body de `update` usan `Request` sin genérico de body. El middleware asigna `req.body = result.data`, pero esa asignación no cambia la firma del controller. El `return` después del `404` corta la función: el retorno anotado es `Promise<void>`. `Router()` en `routes/jobs.ts` no lleva anotación; se infiere.

---

### El agujero: `const rows: any = db.prepare(...).all(...)`

**Cuándo usarlo:** en este repo es el sitio donde el tipado se apaga a propósito. No es un patrón a copiar. El de al lado, `params: unknown[]`, sí.

**Código:**

```ts
// modulo-10-SQL/backend/src/models/job.ts
const conditions: string[] = [];
const params: unknown[] = [];

if (filters?.tech) {
  conditions.push(``);
  params.push(filters.tech);
}

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

La firma dice `Promise<Job[]>`. `@types/better-sqlite3` está en `devDependencies`. El apunte de m08 reserva `any` a migraciones y librerías sin tipos.

**Dónde falla:** `row` hereda `any`. `row.technologies.split`, `row.modality` y `row.level` no se comprueban contra `string` ni contra las uniones de `JobData`. Como el origen es `any`, esos campos encajan en el `Job` del retorno aunque la fila no tenga esa forma. `GROUP_CONCAT(...) AS technologies` puede no ser el string que el `.split` asume; con `any` el compilador no lo ve. Las `conditions.push(``)` vacías son otro agujero (SQL), en la misma función.

**Cómo cerrarlo con patrones que ya tienes (sin código nuevo):**

- Tratar la fila como dato de fuera: `unknown`, igual que `parseJSON(...): unknown` y `validateJob(input: unknown)`.
- Estrechar con `typeof` / `in` antes de leer campos (m08, narrowing y el `if` de `parseJSON`).
- Si la frontera se valida en runtime, el patrón es `safeParse` + `z.infer` (el de `jobSchema`), que en este backend solo aplicaste al body HTTP, no al resultado de `.all()`.
- El retorno `Promise<Job[]>` ya está anotado. Lo que lo deja pasar es el `any` del origen, no la falta de tipo en `getAll`.

---

### Scripts `typecheck`, `build`, `dev` (`tsx`)

**Cuándo usarlo:** desarrollo con recarga, comprobar tipos sin emitir, y generar `dist/` para Node.

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

DevDependencies que acompañan: `typescript`, `tsx`, `@types/node`, `@types/express`, `@types/better-sqlite3`.

**Gotcha / nota:** `dev` y `start` ejecutan el `.ts` con `tsx` (no pasan por `dist/`). `build` es `tsc` con el `tsconfig` de arriba. `start:prod` corre el JavaScript emitido. `typecheck` es el mismo `tsc` sin escribir `dist`. m11 no llama a este script: su backend “build” es `node --check` sobre `.js`. No hay workflow en el repo que lance `typecheck`.

---

## Checklist para montar un proyecto TypeScript desde cero

Basado en el único proyecto TS del repo (`modulo-10-SQL/backend`) y en lo que los ejercicios marcan como obligatorio. m08 no trae plantilla de proyecto.

1. **`package.json` con `"type": "module"`** si vas a seguir este backend (ESM + NodeNext). Dependencias de tipos en dev: `typescript`, `tsx`, y los `@types/*` de lo que importes (`@types/node`, `@types/express`, `@types/better-sqlite3` si usas ese driver).

2. **`tsconfig` base.** Copia el de m10 si el destino es Node: `module` y `moduleResolution` en `NodeNext`, `strict: true`, `rootDir: ./src`, `outDir: ./dist`, `include: ["src/**/*"]`. Target del archivo: `ES2022`. No hay tsconfig `"bundler"` en el campamento; los front Vite de aquí no están en TS. Si el proyecto no es esta API Node, no inventes un segundo modo: este es el que ya arranca con `node dist/app.js`.

3. **Imports relativos con `.js`** en los `.ts` (`./routes/jobs.js`, `../types.js`). Paquetes npm sin extensión. Tipos puros con `import type`.

4. **Scripts.** `"dev": "tsx watch src/app.ts"`, `"build": "tsc"`, `"start:prod": "node dist/app.js"`, `"typecheck": "tsc --noEmit"`.

5. **Typecheck en CI.** El comando ya está: `npm run typecheck` en `modulo-10-SQL/backend`. No está enchufado a `modulo-11-ci-cd` (allí el build es `vite build` y `node --check`, y no hay YAML). Cuando exista pipeline para este package, ese script es el gate de tipos, aparte de lint y test.

6. **Primeras 3 anotaciones que valen la pena** (las que en tus archivos cambian el contrato; el resto se infiere):
   - Parámetros de entrada: `sumar(a: number, b: number)` y, en la API, `create(input: CreateJobDTO)`, `getById(id: string): Promise<Job | undefined>`.
   - Uniones del dominio: `modality` y `level` en `JobData`, reutilizadas con `JobData["modality"]` en `JobFilters`.
   - La frontera: `validateJob(input: unknown)` y los genéricos `Request<{}, {}, {}, JobFilters>` / `Request<{ id: string }>`.

7. **Deja inferir** cuando el valor o el alias ya fijan el tipo: `const saludo = \`Hola, ${nombre}\``, `const ciudad = "Madrid"`, el retorno de `crearUsuario`, los `(a, b)` de una variable `OperacionMatematica`, `const jobsRouter = Router()`. Anotar `const app: Express = express()` no añade nada que `express()` no infiera ya en tu `app.ts`.

8. **Zod como fuente de tipos** cuando el contrato es el body que entra por HTTP: escribes el schema, exportas `z.infer<typeof jobSchema>`, validas con `safeParse` sobre `unknown`. Úsalo como la fuente única. Hoy conviven `JobInput` (inferido, sin usar) y `CreateJobDTO` (a mano, el que lee el modelo). El `.min(3)` no pasa al tipo inferido: sigue siendo comprobación de runtime. Las filas de SQLite no pasan por ese schema; el `any` de `rows` es el hueco.

9. **`any`.** En tu apunte, solo en una migración o en una librería sin tipos. Este backend tiene `@types/better-sqlite3`, así que `const rows: any` no entra en esa excepción: contagía el `map` y el `Promise<Job[]>` deja de comprobar la fila. En ese sitio el patrón del repo es `unknown` + narrowing, o `safeParse` si validas la fila como validas `req.body`. `params: unknown[]` en la misma función es la anotación que sí encaja con lo que escribiste en m08.
