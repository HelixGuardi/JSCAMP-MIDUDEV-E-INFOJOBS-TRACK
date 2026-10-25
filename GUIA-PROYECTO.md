# Guía de proyecto fullstack

## Índice

1. [Cómo usar esta guía](#cómo-usar-esta-guía)
2. [Glosario de conceptos](#glosario-de-conceptos)
3. [Stack recomendado](#stack-recomendado)
4. [Fase 0 — Antes de escribir código](#fase-0--antes-de-escribir-código)
5. [Fase 1 — Setup del proyecto](#fase-1--setup-del-proyecto)
6. [Fase 2 — Arquitectura](#fase-2--arquitectura)
7. [Fase 3 — Primer endpoint y primer componente](#fase-3--primer-endpoint-y-primer-componente)
8. [Fase 3.5 — CRUD en memoria](#fase-35--crud-en-memoria)
9. [Fase 4 — Base de datos](#fase-4--base-de-datos)
10. [Fase 5 — Validación y errores](#fase-5--validación-y-errores)
11. [Fase 6 — Autenticación básica](#fase-6--autenticación-básica)
12. [Fase 7 — Testing](#fase-7--testing)
13. [Fase 8 — IA (opcional)](#fase-8--ia-opcional)
14. [Fase 9 — Docker](#fase-9--docker)
15. [Fase 10 — CI/CD y deploy](#fase-10--cicd-y-deploy)
16. [Fase 11 — Post-deploy](#fase-11--post-deploy)
17. [Apéndice A — Comandos por categoría](#apéndice-a--comandos-por-categoría)
18. [Apéndice B — Gotchas por síntoma](#apéndice-b--gotchas-por-síntoma)
19. [Apéndice C — Checklist de inicio de proyecto](#apéndice-c--checklist-de-inicio-de-proyecto)
20. [Apéndice D — Qué NO hacer en tu primer proyecto](#apéndice-d--qué-no-hacer-en-tu-primer-proyecto)

---

## Cómo usar esta guía

1. Es el mapa para arrancar un fullstack (pantalla, API, datos, tests, deploy) y para mirar qué es un término sin abrir otro archivo.
2. No es el relato de un producto del campamento: ecommerce, blog, dashboard o tareas usan los mismos pasos.
3. Primera vez, sigue las fases en orden. Después entra por el índice a la fase, o por el glosario si solo buscas un nombre.
4. El detalle de un patrón (código largo y el fallo concreto) está en `manual/`; aquí queda la decisión y el paso.
5. Cuando un patrón te falle en un proyecto real, añade una fila al glosario o al apéndice B y apunta el capítulo. No reescribas una fase entera por un caso.

---

## Glosario de conceptos

| Concepto | Qué es | Para qué sirve | Cuándo aparece |
| --- | --- | --- | --- |
| Repositorio | Carpeta con historial Git del proyecto. | Guardar el código y poder volver a un punto anterior. | Fase 0, y en cada cambio. |
| Commit | Conjunto de cambios con un mensaje. | Dejar un punto estable y decir por qué se hizo. | Desde el primer archivo, en trozos pequeños. |
| Rama | Línea de commits paralela a la principal. | Probar una función sin publicar lo que ya funciona. | Fase 0; una rama por cambio. |
| .gitignore | Lista de rutas que Git no guarda. | Dejar fuera `node_modules`, `.env`, `dist/` y el archivo de la BD. | Fase 0, antes del primer commit. |
| README | Texto de arranque en la raíz del repo. | Decir qué es el proyecto, cómo se instala y cómo se levanta. | Fase 0; se toca cuando cambian los comandos. |
| Monorepo | Un repo con varios paquetes (front y back). | Un install y scripts que lanzan un solo paquete. | Fase 0–1, si pantalla y API viven juntos. |
| Variable de entorno | Valor fuera del código (`PORT`, claves, URL del API). | Cambiar puerto y secretos sin editar el fuente. | Fase 1 en local; Fase 8 y 10 en producción. |
| ESM | Sistema de módulos `import` / `export`. | Partir servidor y cliente en archivos. | Fase 1. En el API, `"type": "module"` en `package.json`. |
| SPA | Aplicación de una sola carga: la vista cambia en el cliente. | Listado, ficha y formulario sin recargar el documento entero. | Fase 1–2. |
| Componente | Función que pinta un trozo de interfaz con sus datos. | Reutilizar tarjeta, formulario, cabecera, aviso de error. | Fase 2–3. |
| Props | Argumentos que un componente padre pasa a un hijo. | Configurar la pieza sin store global. | Fase 2, en cada pantalla. |
| Estado | Dato de la UI que, al cambiar, vuelve a pintar. | Texto del input, página actual, carga y error. | Fase 3 y 5. |
| Hook | Función `use*` que agrupa estado o un efecto. | Sacar el fetch, el filtro o el formulario fuera de la página. | Fase 2–5. |
| CSS Modules | Hoja de estilos cuyo nombre de clase es local al archivo. | Que dos pantallas no pisen la misma clase. | Fase 2, al dar estilo a un componente. |
| React Router | Librería que sincroniza la URL con la vista. | Rutas con parámetro, redirección y página no encontrada. | Fase 2. Un router a mano (`pushState`) solo enseña el mecanismo (bootcamp: módulo 4). |
| Lazy loading | Cargar el código de una ruta en el momento de visitarla. | Que el primer pantallazo no baje pantallas que nadie abre. | Fase 2, si una página pesa. |
| Prop drilling | Pasar un dato por componentes que no lo usan. | Aviso de que el dato lo necesitan sitios lejanos entre sí. | Fase 2. Si duele al añadir una pantalla, pasa a store. |
| Context | Valor disponible árbol abajo sin ir en cada props. | Un dato poco cambiante (tema, sesión simple). | Fase 6. Quedó escrito y la UI del curso no lo monta (bootcamp: módulo 5). |
| Zustand | Store pequeño fuera del árbol de componentes. | Compartir sesión o una lista marcada entre cabecera, tarjetas y rutas. | Fase 2 o 6, cuando más de una pantalla escribe lo mismo. |
| HTTP | Protocolo de petición y respuesta del navegador al servidor (verbo + URL + status). | Acordar cómo el front pide y cómo el API contesta. | Fase 3, en la primera llamada. |
| JSON | Formato de texto para intercambiar datos entre front y API ({ "clave": "valor" }). | Cuerpo de la petición y de la respuesta. | Fase 3, en el primer endpoint. |
| Fetch | Llamada HTTP desde el navegador a tu API. | Leer el listado y enviar altas o cambios. | Fase 3 en adelante. |
| Async/await | Sintaxis para esperar una operación (fetch, query) sin bloquear el hilo. | Leer el resultado del API o de la BD en orden, sin anidar callbacks. | Fase 3 en el fetch; Fase 4 en la query. |
| Debounce | Esperar a que paren las pulsaciones antes de actuar. | No pedir al API en cada tecla de un buscador. | Fase 5, en búsquedas. |
| Paginación | Pedir un tramo (`limit`, `offset`) en vez de todo. | Listados largos. La página es de la UI; el API recibe offset. | Fase 3–4. |
| localStorage | Almacén del navegador que sigue tras cerrar la pestaña. | Recordar filtros o una preferencia de presentación. | Fase 2. No guardes secretos ni sesión de verdad. |
| CORS | Comprobación del navegador: qué origen puede llamar a tu API. | Abrir el front (otro puerto) y rechazar el resto. | Fase 1–3. El header `Origin` no lleva path (bootcamp: módulo 6). |
| Middleware | Función que ve la petición antes del handler y llama a `next()`. | CORS, parsear JSON, log, validar, limitar. | Fase 2, 5 y 8. Orden base: CORS, luego `express.json()`, luego el log. |
| Router (Express) | Tabla verbo + camino → controller, con un prefijo. | Un archivo por recurso. Dentro, las rutas van sin el prefijo. | Fase 2–3. |
| Controller | Capa HTTP: lee request, llama al modelo, elige status y JSON. | Que la ruta no toque datos y el modelo no conozca HTTP. | Fase 2–4. |
| Model | Único código que lee y escribe los datos. | Pasar de memoria a SQL sin rehacer rutas ni controllers. | Fase 2 en memoria; Fase 4 en SQL. |
| MVC | Reparto: modelo (datos), vista (el JSON), controller (HTTP), routes (el mapa). | Un archivo no mezcla red, reglas y persistencia. | Fase 2, en cuanto hay un segundo recurso. |
| Endpoint | Verbo + URL con una entrada y una salida pactadas. | Front y tests saben qué mandar y qué status esperar. | Fase 3. El primero es `GET /health`. |
| Health check | Ruta corta que responde si el proceso está vivo. | Comprobar el arranque y el deploy sin tocar datos. | Fase 3; el hosting la usa en la Fase 10. |
| Código HTTP | Número del resultado (200, 201, 400, 404, 429, 500). | El cliente separa éxito, cuerpo inválido, no existe y fallo tuyo. | Fase 3 y 5. |
| Zod | Esquema que acepta o rechaza un objeto en runtime. | Cortar el body antes del modelo y alinear enums con la BD. | Fase 5, dentro de un middleware. `.partial()` si el cambio es parcial. |
| createApp | Función que monta Express y lo devuelve sin ponerse a escuchar. | Tests HTTP sin puerto y con datos de ese test. | Fase 1 al separar `server.js`; Fase 7 al testear (bootcamp: módulo 11). |
| SQLite | Motor de SQL en un archivo, dentro del mismo proceso. | Persistir el MVP sin un servidor de base de datos. | Fase 4. |
| Postgres | Servidor de SQL aparte del proceso de la API. | Varios procesos, o un disco que no es el de tu API. | Decisión en Fase 4; servicio en Fase 9. |
| Prepared statement | Consulta con huecos `?` y los valores en otro argumento. | El modelo es el único que habla SQL, sin pegar texto del usuario. | Fase 4. |
| Clave foránea | Columna que debe existir como clave en otra tabla. | Impedir un hijo sin padre. En SQLite no actúa hasta activarla. | Fase 4, al crear tablas que se relacionan (bootcamp: módulo 10). |
| WAL | Modo de diario (`journal_mode = WAL`) de SQLite. | Leer mientras otra operación escribe. | Fase 4, al abrir la conexión. |
| Transacción | Bloque de sentencias que se confirman o se deshacen juntas. | Un alta de varias tablas, o un seed, sin dejar filas a medias. | Fase 4. |
| Seed | Script que crea el esquema y mete filas iniciales. | Datos el primer día, y poder lanzarlo otra vez. | Fase 4. Va aparte del proceso que escucha. |
| JOIN | Consulta que une filas de dos tablas por una clave. | Devolver el recurso con lo relacionado en un viaje. | Fase 4. Un inner join no devuelve filas huérfanas. |
| CHECK | Condición que la columna debe cumplir al guardar. | La BD rechaza un valor fuera de la lista. | Fase 4. El enum de Zod usa los mismos literales. |
| DTO | Tipo de lo que entra al crear o actualizar, no de la fila entera. | No aceptar `id` ni campos que solo calcula el servidor. | Fase 4–5. Se arma con `Omit` y `Partial`. |
| interface | Contrato con nombre de un objeto. | Describir la entidad (producto, post, tarea). | Si eliges TypeScript: Fase 1 el `tsconfig`, Fase 4 la entidad. |
| type | Alias para uniones, utilidades y combinaciones. | Derivar el DTO de crear o de actualizar sin copiar campos. | Fase 4–5, al lado de la interface. |
| Narrowing | Un `if` que deja el tipo más concreto. | Usar una unión (`string \| número`) sin forzar el tipo. | Al tipar helpers que reciben más de una forma. |
| unknown | Valor que existe y cuyo tipo aún no has comprobado. | Ocupar el lugar de `any`: hay que estrechar antes de leer campos. | Fase 4, en parámetros SQL y filas leídas. |
| Sesión | Hecho de que este cliente ya se identificó. | Abrir pantallas y endpoints que no son públicos. | Fase 6. |
| Cookie | Par clave-valor que el navegador guarda y reenvía al mismo sitio en cada petición. | Llevar la sesión sin dejarla en `localStorage`. | Fase 6, si el API es quien inicia la sesión. |
| Ruta protegida | Vista que manda al login cuando no hay sesión. | Que ficha privada, perfil o checkout no se abran en frío. | Fase 6. |
| Test de utilidad | Prueba de una función pura, sin pantalla ni HTTP. | Fijar una regla: filtrar, paginar, validar un texto. | Fase 7. Es lo primero que se escribe en el MVP. |
| Test de componente | Pintar un componente y mirar rol, texto o estado. | Ver vacío, cargando y error en la pantalla principal. | Fase 7. |
| Test de API | Petición HTTP contra la app, sin navegador. | Contrato de status: 200, 201, 400, 404. | Fase 7. Empieza por `/health`. |
| Rate limit | Tope de peticiones por IP en una ventana de tiempo. | Frenar la ruta que gasta cuota o CPU. | Fase 8, y solo en esa ruta. |
| Streaming | La respuesta sale a trozos, sin esperar al cierre. | Enseñar el texto de un modelo mientras llega. | Fase 8, si no te basta un JSON final. |
| Token (LLM) | Trozo con el que el modelo cuenta texto y precio. | Acortar el prompt y saber qué vas a gastar. | Fase 8, al redactar lo que envías al modelo. |
| API key | Secreto que autoriza tu proceso ante el proveedor. | Firmar la llamada al modelo. Vive solo en el backend. | Fase 8. No la prefijes con `VITE_`. |
| Dockerfile | Receta que construye la imagen del proceso. | El mismo runtime en tu máquina y en el servidor. | Fase 9, cuando el destino pide imagen. |
| Multi-stage | Varios `FROM`: uno compila y el último solo ejecuta. | No subir compilador ni fuente si el build deja un `dist` empaquetado. | Fase 9, solo si hay bundle (bootcamp: módulo 12). |
| .dockerignore | Lista de lo que no entra al construir la imagen. | Fuera `node_modules`, `.env` y `.git` de cada `COPY`. | Fase 9, el mismo día que el Dockerfile. |
| Volumen | Carpeta del host visible dentro del contenedor. | Que un archivo (BD o datos) siga vivo al recrear el contenedor. | Fase 9, si el proceso escribe en disco. |
| Compose | Fichero que arranca varios contenedores juntos. | API más base, llamando al otro por el nombre del servicio. | Fase 9, cuando el código usa un host distinto de `localhost`. |
| Bundle | Archivo único que agrupa varios módulos del front, generado por el build (Vite). | Servir el cliente en producción sin el árbol de fuentes. | Fase 10, al hacer el build del front. |
| Build | Paso que produce lo que corre en producción. | Front: carpeta estática. Back: chequeo de sintaxis, o `dist` si compilas. | Fase 10. Un preview local no es el deploy. |
| Fallback de SPA | El servidor que sirve los estáticos responde `index.html` en rutas del cliente. | Refrescar `/items/12` no devuelve 404 del servidor. | Fase 10, al publicar el front. |
| Lint | Herramienta que revisa el código buscando errores y estilo antes de ejecutarlo. | Parar el fallo estático antes de arrancar o de publicar. | Fase 10, en el CI, antes de test y build. |
| CI | En cada push: instalar, lint, test y build. | Ver el fallo antes de publicar. | Fase 10. |
| Deploy | Publicar el build en un servidor accesible por usuarios. | Que alguien fuera de tu máquina abra la app. | Fase 10, cuando lint, test y build ya pasan. |
| CD | Publicar el resultado que ya pasó el CI. | Front estático y proceso del API, con sus variables. | Fase 10. |

> **⚠️ Cuidado:** `Token (LLM)` cuenta texto del modelo. La sesión de la Fase 6 es otra cosa: no las mezcles en el mismo nombre ni en el mismo almacén.

---

## Stack recomendado

| Capa | Herramienta | Por qué esta | Alternativas |
| --- | --- | --- | --- |
| Paquetes | pnpm y workspaces si front y back van en el mismo repo | Un lockfile y un filtro para lint, test o build de un solo paquete. | npm en cada carpeta, si viven en repos separados. |
| Frontend | Vite + React | Recarga al guardar, un entry (`main` → `App`) y build a estáticos. | HTML, CSS y JS sin bundler; JSX por CDN solo para el primer contacto. |
| Rutas | React Router | Parámetro en la URL, redirección y ruta comodín de 404. | Router propio con `pushState`: vale para entenderlo, no para el producto. |
| Estado | Props; Zustand si varias pantallas escriben lo mismo | El listado de una página no necesita store. Sesión y marcados, sí. | Context para un valor que casi no cambia. |
| Backend | Node + Express, ESM | Middlewares, un router por recurso y JSON de salida. | `node:http` mientras sea un ejercicio de una sola respuesta. |
| Validación | Zod en middleware | El 400 sale antes del modelo y el enum coincide con el `CHECK`. | `if` sueltos: se separan del esquema en cuanto añades un campo. |
| Lenguaje del API | TypeScript con `tsx` en desarrollo | El editor ve params, body y DTO. Quien valida en runtime sigue siendo Zod. | JavaScript si el MVP es un recurso y no quieres `tsconfig`. |
| Base de datos | SQLite con `better-sqlite3` | Un archivo, la misma conexión para toda la API, consultas con `?`. | Lista en memoria (se pierde al reiniciar). Postgres si la BD es otro servicio. |
| Testing | Vitest + Testing Library en UI; SuperTest sobre `createApp()` en API | Componente en jsdom y HTTP sin puerto ni navegador. | `node:test` + `fetch` (abre un puerto). Playwright cuando quieras un recorrido de la UI. |
| IA (opcional) | Endpoint tuyo + respuesta en stream | El navegador no habla con el proveedor. La clave se queda en el servidor. | JSON de una vez, si no necesitas pintar el texto mientras llega. |
| Contenedores | Una etapa Node, `USER node`, `.dockerignore` | Misma imagen cuando el destino la pide. | Multi-stage solo con bundle. Compose solo con otro servicio. Nada de esto en el MVP de un proceso. |
| CI | Scripts `lint`, `test`, `build` | Esa secuencia es el job, en local y en el remoto. | Lanzarlos a mano: se olvida el que falla. |
| Deploy | `vite build` en el front; proceso Node con `PORT` y `/health` en el API | Estáticos por un lado, API por otro, variable de entorno para la URL. | `vite preview` solo mira el build en tu máquina. |

> **✅ Hacer:** Una opción por fila. No dejes a la vez el router a mano y React Router, ni un `listen` al importar el módulo y un `createApp()`.

> **⚠️ Cuidado:** SQLite va bien con un solo proceso y un disco que conserva el archivo. Si el hosting borra el disco o levanta varias copias, ese archivo no es tu base: pasa a Postgres.

---

## Fase 0 — Antes de escribir código

🎯 Objetivo: dejar escritos el MVP, el repo y las carpetas antes de instalar nada.

1. Cierra estas tres decisiones. Si una fila no vale, cambiando el sustantivo, para una tienda, un blog y un gestor de tareas, recorta.

| Decisión | Qué dejas fijado | Test |
| --- | --- | --- |
| Tipo | Una sola app: catálogo, blog, tablero o tareas. | El esqueleto (listado, ficha, un cambio) sirve en las otras. |
| MVP | Una frase: quién entra y qué termina. | No cabe en una frase: sobra alcance. |
| Features | Como máximo tres. | La cuarta se anota en el README y no se construye. |

| Tipo | Frase de MVP | Tres features, y nada más |
| --- | --- | --- |
| Catálogo | Alguien encuentra un producto y abre su ficha. | Listado, ficha, filtro por texto. |
| Blog | Alguien lee una entrada publicada. | Listado, ficha, sin comentarios. |
| Tareas | Alguien apunta un pendiente y lo marca. | Listar, crear, marcar. |

2. Crea el repo en GitHub vacío: sin README, sin `.gitignore` y sin licencia. Esos archivos los escribes tú.
3. En la carpeta local, escribe el ignore y el README, y haz el primer commit.

```gitignore
node_modules/
dist/
.env
*.db*
```

```md
# nombre-del-proyecto
Frase del MVP.
## Arranque
Front: `npm run dev` en `frontend`. API: `npm run dev` en `backend`.
```

```bash
git init -b main
git add .
git commit -m "Inicializa el repo con README e ignore"
```

4. Enlaza el remoto (la URL que te dio GitHub) y sube la rama.

```bash
git remote add origin URL_DEL_REPO
git push -u origin main
```

5. Deja solo el primer corte de carpetas. Vacías.

```text
.
├── frontend/     # SPA. Se llena en la Fase 1.
├── backend/      # API. Se llena en la Fase 1.
├── .gitignore
└── README.md
```

> **⚠️ Cuidado:** `git add .` antes de tener el `.gitignore` mete `node_modules` o un `.env` en el historial. El commit siguiente no los saca.

> **✅ Hacer:** Para aquí si no puedes decir las tres features en voz alta. Carpetas `routes/`, store o base de datos son de las fases 2 y 4.

✅ Al terminar esta fase, deberías tener:

- [ ] La frase del MVP y como máximo tres features, escritas en el README.
- [ ] El mismo trío, con otros nombres, valdría para una tienda, un blog o tareas.
- [ ] El repo en GitHub con un commit, y el remoto en `main`.
- [ ] `.gitignore` con `node_modules/`, `dist/`, `.env` y `*.db*`.
- [ ] `frontend/` y `backend/` vacías. Ningún `package.json` todavía.

---

## Fase 1 — Setup del proyecto

🎯 Objetivo: el front arranca con Vite y el API escucha `PORT`, cada uno con su script `dev`.

1. Elige una fila. No montes las dos.

| Opción | Cuándo | 📁 Árbol | Cómo arrancas |
| --- | --- | --- | --- |
| Carpetas separadas | Dos remotos, o el API aún no existe. | `frontend/` y `backend/`, cada uno con su `package.json`. | `npm run dev` dentro de cada carpeta. |
| Monorepo | Un solo repo y un lockfile. | Raíz con el yaml de abajo; los paquetes siguen siendo esas dos carpetas. | Desde la raíz, un script por paquete. |

`pnpm --filter <nombre>` usa el `"name"` del `package.json` del sub-paquete, no el nombre de la carpeta. Si el template de Vite pone `"name": "vite-project"`, cámbialo a `"frontend"` para que el filtro funcione.

```yaml
packages:
  - "frontend"
  - "backend"
```

```json
"dev:frontend": "pnpm --filter frontend dev",
"dev:backend": "pnpm --filter backend dev"
```

2. Front. La carpeta `frontend/` tiene que estar vacía. El template deja `dev`, `build` y `preview`.

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```

3. Back. `npm init -y` no pone `"type": "module"`: lo añades tú. El `dev` que rearranca al guardar es `node --watch`.

```bash
cd backend
npm init -y
npm install express@5 cors
```

```json
"type": "module",
"scripts": { "dev": "node --watch src/server.js" }
```

4. Primera variable: `PORT` en `backend/.env`. La lee `server.js`, no un módulo importado.

```text
backend/
├── .env              # PORT=3000
├── src/app.js        # createApp(). No llama a listen.
└── src/server.js     # carga el .env y escucha.
```

```
PORT=3000
```

`node --watch` requiere Node 18.11+. `process.loadEnvFile()` requiere Node 20.12+. Si tu Node es anterior, actualiza o usa `node --env-file=.env src/server.js` en el script `dev`.

```js
import express from "express";
export function createApp() {
  return express();
}
```

```js
import { createApp } from "./app.js";
process.loadEnvFile();
const port = Number(process.env.PORT ?? 3000);
createApp().listen(port);
```

5. Dos procesos. No hay un script único que levante los dos: una terminal para el front y otra para el API.

> **⚠️ Cuidado:** El `import` se ejecuta antes que el cuerpo del archivo. `loadEnvFile()` en la línea 2 no llega a tiempo si `app.js` (o un `config.js`) lee `process.env` al cargarse. Lee `PORT` en `server.js`, después de cargar el `.env`. No instales `dotenv`: esta API es de Node (bootcamp: módulo 9).

> **✅ Hacer:** `listen` vive en `server.js`. `createApp` solo devuelve la app, para poder importarla sin abrir puerto (bootcamp: módulo 11).

✅ Al terminar esta fase, deberías tener:

- [ ] `npm run dev` en `frontend` abre Vite e imprime una URL (por defecto `5173`).
- [ ] `npm run dev` en `backend` escucha el `PORT` del `.env` y lo suelta al parar el proceso.
- [ ] `backend/package.json` tiene `"type": "module"` y el script `dev`.
- [ ] `src/app.js` exporta `createApp` y no contiene `listen`.
- [ ] `.env` no sale en `git status`.

---

## Fase 2 — Arquitectura

🎯 Objetivo: saber la carpeta de cada archivo antes de crear el primer recurso.

**MVC:** la ruta solo enchufa verbo y camino, el controller pone el status y el JSON, y el modelo es el único que toca los datos.

| Momento | ✅ Crea | ❌ Todavía no |
| --- | --- | --- |
| Una pantalla | `pages/` y los componentes de esa pantalla. | Store, contexto, router de más. |
| Dos pantallas escriben el mismo dato | `store/` (Zustand). | Un contexto "por si acaso". |
| El API tiene un recurso | `routes/`, `controllers/`, `models/` en memoria. | SQL, validación de body, sesión. |
| Ese recurso tiene que sobrevivir a un reinicio | `db/` y el modelo pasa a SQL. | Antes de que el front pinte un GET. |

### SPA React

📁 Estructura típica

```text
frontend/src/
├── main.jsx        # createRoot y, si hay rutas de producto, el router
├── App.jsx         # layout
├── pages/          # una pantalla por archivo
├── components/     # pieza que recibe props
├── hooks/          # fetch, filtro, formulario
├── styles/         # CSS global. El de un componente, en su CSS Module
└── store/          # solo si cabecera y otra pantalla escriben lo mismo
```

1. Props mientras el dato nace y muere en la misma pantalla.
2. Router de producto cuando la ficha tiene URL (`/items/:id`), con una ruta comodín de 404.
3. El router a mano (`pushState`) no convive con el de la librería: te quedas con uno.

> **⚠️ Cuidado:** Montar las dos formas de enrutar deja una URL que cambia y una vista que no. En producto el router envuelve `App` en el entry (bootcamp: módulo 5).

🔗 En el bootcamp: módulo 4 (Vite, páginas, hooks) y módulo 5 (rutas y store).

### API REST Express

📁 Estructura típica

```text
backend/src/
├── app.js            # createApp: middlewares y rutas. Sin listen.
├── server.js         # .env y listen
├── config.js         # puerto, limit y offset por defecto
├── routes/           # un Router por recurso, sin el prefijo dentro
├── controllers/      # lee la request, llama al modelo, status y JSON
├── models/           # datos. En esta fase, memoria.
└── middlewares/      # CORS y, más adelante, la validación
```

1. CORS, con el origen exacto del front (`http://localhost:5173`).
2. `express.json()`.
3. Un log que llama a `next()`.
4. Las rutas. `/health` va en la app, no dentro del router del recurso.

> **⚠️ Cuidado:** El header `Origin` no trae camino. `http://localhost:5173/ficha` en la lista no coincide con nada, y el navegador bloquea la llamada (bootcamp: módulo 6).

🔗 En el bootcamp: módulo 6.

### API + BD

📁 Estructura típica

```text
backend/src/
├── db/database.js    # una conexión para toda la API
├── db/seed.js        # crea tablas y filas. La app no lo importa al arrancar.
├── models/           # el único archivo con SQL
├── schemas/          # el esquema del body. Mismos literales que la tabla.
└── controllers/      # los mismos métodos que cuando el modelo era memoria
```

1. No crees `db/` hasta que un GET en memoria ya se pinte en el front.
2. Al pasar a SQL cambias el modelo. La ruta y el controller siguen igual.
3. Si tipas el API, la extensión del fuente cambia a `.ts` y el import relativo lleva `.js`. Hasta entonces, `.js` basta.

> **✅ Hacer:** Un recurso, una carpeta de ruta. El segundo recurso copia el trío ruta / controller / modelo, no alarga `app.js`.

> **⚠️ Cuidado:** Un `push` a un array o a un JSON importado no escribe el disco: al reiniciar, el alta desaparece. Eso se resuelve en la Fase 4, no añadiendo otro archivo de rutas (bootcamp: módulo 6).

🔗 En el bootcamp: módulo 10.

✅ Al terminar esta fase, deberías tener:

- [ ] El árbol del front en el repo, sin `store/` si solo hay una pantalla.
- [ ] El árbol del API con `server.js` separado de `app.js`.
- [ ] Una línea en el README que diga quién toca los datos (el modelo).
- [ ] La lista de CORS con esquema, host y puerto, sin path.
- [ ] Ningún archivo de base de datos todavía.

---

## Fase 3 — Primer endpoint y primer componente

🎯 Objetivo: leer en la pantalla el JSON de `GET /health` que pidió el front.

1. Monta middlewares y el health dentro de `createApp`. Fuera de cualquier router de recurso. Un solo contrato: `{ status, uptime }`.

```js
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
```

```js
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
return app;
```

2. Quien escucha sigue siendo `server.js`.

```js
const app = createApp();
const port = Number(process.env.PORT ?? 3000);
app.listen(port);
```

3. Comprueba el API sin navegador. Tiene que imprimir el JSON.

```bash
curl http://localhost:3000/health
```

4. En el front, la URL del API es una variable con prefijo `VITE_`. Reinicia `npm run dev` al crearla.

```
VITE_API_URL=http://localhost:3000
```

5. Copia este archivo en `src/components/HealthStatus.jsx`.

```jsx
import { useEffect, useState } from "react";

export function HealthStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHealth() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        if (!response.ok) throw new Error(String(response.status));
        setData(await response.json());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadHealth();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  return <p>{data.status}</p>;
}
```

6. Renderiza ese componente desde `App`. Abre la URL de Vite: tiene que decir `ok`.

| Si pasa esto | Causa | 🔧 Qué hacer |
| --- | --- | --- |
| `curl` va bien y el navegador no | El origen de CORS no es el del front, o lleva un path. | `http://localhost:5173`, con protocolo y sin camino. `curl` no envía `Origin`. |
| Un POST llega con el body vacío | No está `express.json()` antes de la ruta. | Muévelo dentro de `createApp`, por encima de las rutas. Este GET no lo necesita; el siguiente alta, sí. |
| El puerto queda ocupado al arrancar o al importar | Hay un `listen` en el módulo de la app. | Sácalo. Solo `server.js` escucha. |

> **⚠️ Cuidado:** `if (NODE_ENV !== "production") listen` también abre el puerto cuando el entorno es `test`. No lo uses. Otro health del curso responde `{ ok, service, timestamp }`: no mezcles los dos JSON (bootcamp: módulo 6 y módulo 11).

> **✅ Hacer:** `finally` apaga `loading` también en el error. Si no, un fallo se queda en "Cargando…" para siempre (bootcamp: módulo 4).

✅ Al terminar esta fase, deberías tener:

- [ ] `curl` a `/health` devuelve `status: "ok"` y un `uptime` numérico.
- [ ] La SPA muestra `ok`, no un fallo de CORS ni un "Cargando…" quieto.
- [ ] Parar el `dev` del API libera el puerto. Un segundo arranque no choca.
- [ ] `express.json()` está montado antes de las rutas.
- [ ] El componente distingue carga, error y dato. El error se lee en pantalla.

---

## Fase 3.5 — CRUD en memoria

🎯 Objetivo: tener un recurso `/items` de punta a punta, en un array, antes de tocar SQL.

1. `backend/src/models/item.js`. El array muere al reiniciar: es el contrato de esta fase.

```js
import { randomUUID } from "node:crypto";

const items = [];

export const ItemModel = {
  getAll() {
    return items;
  },
  getById(id) {
    return items.find((item) => item.id === id);
  },
  create({ title, status }) {
    const item = { id: randomUUID(), title, status };
    items.push(item);
    return item;
  },
};
```

2. `backend/src/controllers/item.js`. 404 si no está. 201 al crear. Aquí no hay SQL.

```js
import { ItemModel } from "../models/item.js";

export const ItemController = {
  getAll(_req, res) {
    res.json(ItemModel.getAll());
  },
  getById(req, res) {
    const item = ItemModel.getById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  },
  create(req, res) {
    const item = ItemModel.create(req.body);
    res.status(201).json(item);
  },
};
```

3. `backend/src/routes/items.js`. Dentro del router las rutas van sin el prefijo.

```js
import { Router } from "express";
import { ItemController } from "../controllers/item.js";

export const itemsRouter = Router();

itemsRouter.get("/", ItemController.getAll);
itemsRouter.get("/:id", ItemController.getById);
itemsRouter.post("/", ItemController.create);
```

4. En `createApp`, después de `express.json()` y de `/health`.

```js
import { itemsRouter } from "./routes/items.js";

app.use("/items", itemsRouter);
```

5. `frontend/src/components/ItemList.jsx`. El mismo trío que `HealthStatus`. Píntalo desde `App`.

```jsx
import { useEffect, useState } from "react";

export function ItemList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/items`);
        if (!response.ok) throw new Error(String(response.status));
        setData(await response.json());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  if (data.length === 0) return <p>No hay resultados</p>;
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

6. Con el API recién arrancado, en este orden.

```bash
curl http://localhost:3000/items
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d "{\"title\":\"Uno\",\"status\":\"open\"}"
curl http://localhost:3000/items/no-existe
```

> **⚠️ Cuidado:** Sin `express.json()` el `POST` crea `{ id, title: undefined }`. El array no es una base: al cerrar el proceso el `POST` desaparece. No lo arregles guardando un JSON a mano. Eso es la Fase 4 (bootcamp: módulo 6).

> **✅ Hacer:** El primer `GET /items` tiene que ser `[]`. Lánzalo antes del `POST`.

🔗 En el bootcamp: módulo 6.

✅ Al terminar esta fase, deberías tener:

- [ ] `GET /items` con el proceso recién arrancado devuelve `[]`.
- [ ] `POST /items` con `title` y `status` devuelve 201 y el recurso, con un `id`.
- [ ] `GET /items/no-existe` devuelve 404.
- [ ] La SPA lista los títulos, o dice "No hay resultados" si el array está vacío.
- [ ] Rutas, controller y modelo están en archivos distintos. `app.js` solo monta `/items`.

---

## Fase 4 — Base de datos

🎯 Objetivo: el mismo GET sigue respondiendo igual, y el alta sigue ahí después de reiniciar el proceso.

1. Elige una fila. En el MVP cabe una.

| | SQLite | Postgres |
| --- | --- | --- |
| Elige si | Un solo proceso y el disco conserva el archivo. | La base es otro servicio, hay varias copias del API, o el hosting borra el disco. |
| Qué instalas | `better-sqlite3` en el API. | Nada en esta fase. El servicio va en la Fase 9. |
| Dónde vive | Un archivo (`app.db`) al lado del proceso. | Un host con nombre, no `localhost` del contenedor. |

2. Conexión única, en `backend/src/db/database.js`. Los dos `pragma` van en esa misma apertura.

```js
import Database from "better-sqlite3";
export const db = new Database("app.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
```

| Pragma | Por qué |
| --- | --- |
| `journal_mode = WAL` | Una lectura no se queda esperando a que termine la escritura. |
| `foreign_keys = ON` | Sin esto, SQLite no cumple el `REFERENCES`: puedes guardar un hijo sin padre. |

3. Las tablas no las crea el servidor al arrancar. Van en `backend/src/db/seed.js`, con `CREATE TABLE IF NOT EXISTS`.

```sql
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'done'))
);
```

```sql
CREATE TABLE IF NOT EXISTS item_tags (
  item_id TEXT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  tag TEXT NOT NULL
);
```

4. Siembra con `?`, `INSERT OR IGNORE` y una transacción. Los ids fijos del seed son una serie; los de un alta nueva, otra (`randomUUID`). No los mezcles en la misma prueba.

```js
const insert = db.prepare(
  "INSERT OR IGNORE INTO items (id, title, status) VALUES (?, ?, ?)",
);
```

```js
const insertTag = db.prepare(
  "INSERT INTO item_tags (item_id, tag) VALUES (?, ?)",
);
```

```js
const runSeed = db.transaction(() => {
  insert.run("1", "Primer ítem", "open");
  insertTag.run("1", "demo");
});
runSeed();
```

5. Lánzalo con el directorio de trabajo en `backend/`. Arrancar `server.js` no ejecuta este archivo.

```bash
cd backend
npm install better-sqlite3
node src/db/seed.js
```

6. El modelo es el único que habla SQL. `.all()` lista, `.get()` una fila, `.run()` escribe. El valor va en el segundo argumento, nunca dentro del string.

```js
export function getById(id) {
  return db.prepare("SELECT * FROM items WHERE id = ?").get(id);
}
```

```js
const sql = "INSERT INTO items (id, title, status) VALUES (?, ?, ?)";
export const insertItem = (row) => db.prepare(sql).run(row.id, row.title, row.status);
```

7. Migra el controller sin cambiar el contrato: mismos métodos, mismos status. Borra el array en memoria. Si un método sigue leyendo ese array, el GET de la lista y el GET por id no ven los mismos datos.

```js
const item = ItemModel.getById(req.params.id);
if (!item) return res.status(404).json({ error: "Not found" });
res.json(item);
```

8. Cambia la firma al quitar el array del módulo. Deja dentro el CORS, `express.json()` y `/health`. `items` no lo lee el modelo SQL: el clon es para los tests. Si `structuredClone(initialItems)` se queda fuera de esta función, `initialItems` no existe.

```js
export function createApp({ initialItems = [] } = {}) {
  const items = structuredClone(initialItems);
  const app = express();
  app.use("/items", itemsRouter);
  return app;
}
```

9. Reinicia el API, pide el id `1`, crea otro, reinicia otra vez. El `1` y el nuevo tienen que seguir ahí.

> **⚠️ Cuidado:** `app.db` es relativo al directorio desde el que lanzas el proceso. Desde la raíz del repo aparece otro archivo, y el API no lo ve. `IF NOT EXISTS` no cambia una tabla vieja: si añades una columna, borra el `.db` y vuelve a sembrar. `INSERT OR IGNORE` no actualiza la fila si cambias el texto del seed. Por eso el ignore de la Fase 0 es `*.db*` (bootcamp: módulo 10).

> **✅ Hacer:** Filtros después, cuando el listado sin `WHERE` ya funcione. Cada condición es `columna = ?` y el valor entra en la lista de parámetros. Una condición vacía rompe el `WHERE`.

🔗 En el bootcamp: módulo 10.

✅ Al terminar esta fase, deberías tener:

- [ ] `GET` del id sembrado responde 200 tras cerrar y volver a abrir el API.
- [ ] Un `POST` sigue en el archivo después del reinicio. No queda un array en el modelo.
- [ ] `foreign_keys` y `WAL` se ejecutan al abrir `database.js`.
- [ ] `app.db`, `app.db-wal` y `app.db-shm` no salen en `git status`.
- [ ] El controller no contiene un `SELECT` ni un `INSERT`.

---

## Fase 5 — Validación y errores

🎯 Objetivo: un body malo no llega al modelo, y cada pantalla repite el mismo trío carga / error / dato.

1. Instala Zod en el API. El esquema vive en `schemas/`, el middleware en `middlewares/`, y la ruta lo enchufa antes del controller.

```bash
npm install zod@3
```

Fijado en Zod 3 para que `result.error.errors` funcione en los ejemplos. Zod 4 cambió la API a `.issues`.

```js
export const itemSchema = z.object({
  title: z.string().min(3),
  status: z.enum(["open", "done"]),
});
```

2. Un alta usa el esquema entero. Un cambio parcial usa `.partial()`. Si el parse va bien, sustituyes `req.body` y llamas a `next()`. Si no, 400 y no sigues.

```js
const result = itemSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: "Invalid request", details: result.error.errors });
}
```

```js
req.body = result.data;
return next();
```

```js
router.post("/", validateItem, controller.create);
router.patch("/:id", validatePartialItem, controller.update);
```

3. Códigos. El controller elige uno y no valida otra vez.

| Status | Cuándo | Body |
| --- | --- | --- |
| 200 | Lectura que sí existe. | El recurso. |
| 201 | Alta creada. | El recurso creado. |
| 400 | El body no pasa el esquema. | `{ error, details }`. |
| 404 | El id no está. | `{ error: "Not found" }`. |
| 401 | No hay sesión, cuando esa ruta ya esté cerrada. | `{ error: "Unauthorized" }`. |
| 500 | Un fallo que no esperabas. | `{ error: "Internal error" }`. Sin el stack. |

4. El 500 es un middleware de cuatro argumentos, debajo de las rutas.

```js
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal error" });
});
```

5. En el front no hay un segundo patrón. El de `HealthStatus` se repite en cada fetch.

| Paso | Qué haces | Qué no haces |
| --- | --- | --- |
| Empiezas | `loading` true, `error` null. | Pintar datos viejos como si fueran los nuevos. |
| `!response.ok` | Lanzas con el status. 400 enseña `error`. 404, "no existe". | Tratar el 404 como lista vacía. |
| JSON bueno | `setData`. | Leer el body dos veces. |
| `finally` | `loading` false, también si hubo error. | Dejar "Cargando…" colgado. |
| Pintar | Primero loading, luego error, luego el dato. | Poner el dato antes que el error: el fallo queda tapado. |

> **⚠️ Cuidado:** Si el `safeParse` va bien y no llamas a `next()`, la petición se queda colgada y el controller no corre. El literal del `z.enum` y el del `CHECK` tienen que ser el mismo: si no, Zod deja pasar el body y el `INSERT` revienta. La clave del JSON y la del esquema también: `ubicacion` no rellena `ubicación` (bootcamp: módulo 7 y módulo 10).

> **✅ Hacer:** Zod 3 y Zod 4 no se mezclan en el mismo API. El middleware de esta guía lee `result.error.errors`. No declares un `DELETE` que siempre responde 403: o borras y devuelves 204, o la ruta no existe.

🔗 En el bootcamp: módulo 7 (el 400) y módulo 10 (el esquema alineado con la tabla).

✅ Al terminar esta fase, deberías tener:

- [ ] Un `POST` con `title` de una letra responde 400 y no inserta fila.
- [ ] Un `POST` válido responde 201 y el modelo recibe el body ya parseado.
- [ ] Un id que no está responde 404.
- [ ] La pantalla del recurso enseña carga, el texto del error, o el dato. Nunca se queda en carga tras un fallo.
- [ ] El `enum` del esquema y el `CHECK` de la tabla usan las mismas palabras.

---

## Fase 6 — Autenticación básica

🎯 Objetivo: la pantalla privada no se abre sin sesión, y el API no finge que un booleano en memoria es una cuenta.

1. Decide antes de escribir el login.

| Tu tercera feature | Qué montas | Qué dejas público |
| --- | --- | --- |
| No es "entrar" | Nada de esta fase. Anótalo en el README. | Todo el API. |
| Esconder una pantalla | Store + ruta protegida en el front. | El API. Escríbelo en el README: la ruta solo tapa la UI. |
| El alta o la ficha no pueden ser anónimas | La ruta del front y un middleware 401 en el back. | El `GET /health` y el listado, si de verdad son públicos. |

2. Front, solo si la fila anterior pide UI. `zustand` y `react-router`. El import del router es `react-router`, no otro paquete.

```bash
npm install zustand react-router
```

```js
import { create } from "zustand";
export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
}));
```

```jsx
export function ProtectedRoute({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}
```

```jsx
<Route path="/cuenta" element={
  <ProtectedRoute><AccountPage /></ProtectedRoute>
} />
```

3. Back, solo si la primera tabla pide cerrar el verbo. El middleware va delante del controller. 401 si no hay usuario; si lo hay, `next()`.

```js
export function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  return next();
}
```

```js
router.post("/", requireUser, controller.create);
```

4. Cookie o token. Uno. Los dos a la vez no.

| | Cookie | Token |
| --- | --- | --- |
| Cuándo | El navegador debe reenviar la sesión él solo al mismo sitio. | El cliente la manda en un header porque front y API son orígenes distintos. |
| Dónde no | En un sitio que cualquier script de la página pueda leer, si ahí va la sesión. | En `localStorage`. |
| Qué falta en el curso | Nadie emite cookie ni token. No inventes el alta de usuarios en este MVP. | |

5. Qué no entra en el primer proyecto:

- ❌ Un login que acepta cualquier clave y solo hace `setLoggedIn(true)`.
- ❌ Tratar esa store como sesión: al refrescar desaparece y el API no se entera.
- ❌ Contraseña, cookie de sesión o token en `localStorage`.
- ❌ Registro con hash, OAuth, roles, recuperar clave, email o un segundo factor.
- ❌ Un carrito, un favorito o un borrador guardados en memoria y presentados como cuenta.
- ❌ Montar `requireUser` vacío, sin nada que rellene `req.user`: todas las altas responderían 401.

> **⚠️ Cuidado:** La ruta protegida del front no cierra el API. Quien conozca la URL puede hacer el `POST` igual. Si el dato es público, no añadas el middleware "para ir haciendo" (bootcamp: módulo 5).

> **✅ Hacer:** `replace` en el `Navigate` para que "atrás" no te deje en un bucle entre el login y la pantalla cerrada. El `GET /health` no pasa por `requireUser`.

🔗 En el bootcamp: módulo 5.

✅ Al terminar esta fase, deberías tener:

- [ ] El README dice si el API es público o qué verbos exigen sesión.
- [ ] Si hay pantalla privada, abrirla sin sesión lleva al login y "atrás" no rebota.
- [ ] Si hay verbo cerrado, sin usuario responde 401 y con la sesión llega al controller.
- [ ] `/health` sigue en 200 sin sesión.
- [ ] No hay clave ni token en `localStorage`, ni un login que acepte cualquier contraseña.

---

## Fase 7 — Testing

🎯 Objetivo: un fallo en la regla, en la pantalla principal o en el contrato HTTP se ve con `npm test`, sin abrir el navegador a mano.

1. Tres niveles. En el MVP escribes uno de cada, del camino que no puedes romper. El resto espera.

| Nivel | Herramienta | Primer test del MVP | ❌ Todavía no |
| --- | --- | --- | --- |
| Utilidad | Vitest | Una función pura: contar, filtrar o rechazar un texto corto. | El componente que la usa. |
| Componente | Vitest + Testing Library + jsdom | La pantalla principal pinta su vacío o su título. | Un recorrido de varias páginas. |
| API | SuperTest contra `createApp()` | `GET /health` 200, un 404, un 201 y un 400. | Levantar un puerto o el servidor de desarrollo. |

2. Instala en el paquete que corresponda. El script `test` tiene que lanzar el runner. El `echo` que sale de `npm init` termina en error aunque no haya tests.

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```bash
npm install -D vitest supertest
```

```json
"test": "vitest run"
```

3. En el `vite.config.js` del front, el entorno y el setup. En `src/test/setup.js`, una sola línea.

```js
test: {
  environment: "jsdom",
  setupFiles: "./src/test/setup.js",
},
```

```js
import "@testing-library/jest-dom/vitest";
```

4. Utilidad. Sin DOM y sin HTTP.

```js
const stats = countByStatus([{ status: "done" }, { status: "open" }]);
expect(stats).toEqual({ done: 1, open: 1 });
```

5. Componente. Busca por texto o por rol, no por clase CSS. Este ejemplo recibe `items` por props: no es el `ItemList` de la Fase 3.5, que pide al API.

```jsx
render(<ItemList items={[]} />);
expect(screen.getByText("No hay resultados")).toBeInTheDocument();
```

6. API. Cada test que escribe crea su app y le pasa `initialItems`. El `structuredClone` está dentro de la factory de la Fase 4.

```js
const app = createApp({
  initialItems: [{ id: "1", title: "Uno", status: "open" }],
});
```

```js
const res = await request(createApp()).get("/health");
expect(res.status).toBe(200);
expect(res.body.status).toBe("ok");
```

```js
const missing = await request(createApp()).get("/items/no-existe");
expect(missing.status).toBe(404);
```

```js
const app = createApp({ initialItems: [] });
const created = await request(app).post("/items").send({ title: "Nuevo ítem", status: "open" });
expect(created.status).toBe(201);
```

```js
const bad = await request(createApp()).post("/items").send({ title: "no" });
expect(bad.status).toBe(400);
```

7. Orden la primera semana: la función pura, después `/health`, después el 400, después el vacío de la pantalla. Playwright queda para cuando ese camino ya es estable y el servidor de la UI lo arranca el propio test.

> **⚠️ Cuidado:** Un `const app = createApp()` compartido se ensucia: el `POST` del primer test aparece en el siguiente. `request(app)` no debe abrir puerto; si el `listen` sigue dentro de `createApp`, el test choca con el `dev`. El 201 no demuestra que guardaste el campo si el JSON manda otra clave que el esquema (bootcamp: módulo 7 y módulo 11).

> **✅ Hacer:** El health que afirmas es `{ status: "ok" }`, el de la Fase 3. No afirmes otro JSON. `vi.restoreAllMocks()` si espías el reloj en la utilidad.

🔗 En el bootcamp: módulo 11. El script que solo hace `echo` y sale con error es el hueco del módulo 7: no lo copies.

✅ Al terminar esta fase, deberías tener:

- [ ] `npm test` en el front y en el back termina en 0. No imprime "no test specified".
- [ ] Hay un test de función pura, uno del vacío o del título, y los cuatro de status: 200, 404, 201, 400.
- [ ] Los tests del API importan `createApp` y no `server.js`.
- [ ] Un test que inserta no cambia el resultado del test de al lado.
- [ ] No hay un E2E en esta pasada.

---

## Fase 8 — IA (opcional)

🎯 Objetivo: un texto generado sale de tu API, con la clave fuera del navegador, solo si ese texto no está ya en tus datos.

1. Decide antes de instalar nada.

| Situación | Qué haces |
| --- | --- |
| El texto ya está en la base o lo escribe el usuario. | No añadas un modelo. |
| Quieres un resumen, una clasificación o un borrador a partir de un recurso tuyo. | Endpoint en el API. El navegador solo llama a ese endpoint. |
| El navegador hablaría directo con el proveedor. | No. La clave quedaría en el bundle. |

2. Clave en `backend/.env`. El front solo conoce `VITE_API_URL`. Un solo id de modelo, leído en el handler, no en un archivo que se importa antes de cargar el `.env`.

```
OPENAI_API_KEY=tu_clave
MODEL_AI=el-id-que-usa-esta-ruta
```

3. Ruta propia. Si el recurso no existe, 404 y no llamas al modelo. La respuesta en vivo no es un JSON final.

```bash
npm install ai express-rate-limit
```

```js
import { streamText } from "ai";
const result = streamText({ model: process.env.MODEL_AI, prompt });
return result.pipeTextStreamToResponse(res);
```

4. El límite va solo en ese router. 5 peticiones por IP y minuto. Detrás de un proxy, la IP real no es la del proxy.

```js
aiRouter.use(rateLimit({ windowMs: 60 * 1000, limit: 5 }));
```

```js
app.set("trust proxy", 1);
```

5. En la UI, un botón. No lo pidas al montar la página. Lee el cuerpo a trozos y concatena.

```jsx
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  setText((prev) => prev + decoder.decode(value, { stream: true }));
}
```

| Qué pintas | Cuándo |
| --- | --- |
| El botón | Todavía no hay texto. `""` es falsy: no lo trates como resumen. |
| El error | Antes que el texto. Si va después, un fallo a mitad tapa el mensaje. |
| El 429 | Un texto distinto del resto de `!response.ok`. |
| El texto | Solo cuando ya llegó algún trozo y no hay error. |

> **⚠️ Cuidado:** Cada refresh vuelve a llamar al modelo y gasta cupo. Si el fallo ocurre cuando el stream ya empezó, ya no puedes cambiar el status a 500. `loadEnvFile()` en un `import` de arriba no llega a tiempo (bootcamp: módulo 9).

> **✅ Hacer:** El `finally` apaga `loading` al terminar el bucle, no al primer trozo.

🔗 En el bootcamp: módulo 9.

✅ Al terminar esta fase, deberías tener:

- [ ] Una frase en el README que diga por qué hay IA, o la fase entera tachada.
- [ ] La clave no aparece en el código del front ni en una variable `VITE_`.
- [ ] Un id que no existe responde 404 y no llama al modelo.
- [ ] La sexta llamada en un minuto responde 429, y la UI lo dice.
- [ ] El error se lee en pantalla aunque el texto haya empezado a llegar.

---

## Fase 9 — Docker

🎯 Objetivo: imagen del API, sin secretos y sin root, solo cuando el destino la pide o hay un segundo servicio.

1. Cuándo no, y cuándo sí.

| Tu caso | Qué haces |
| --- | --- |
| Un proceso, SQLite, y el MVP corre en tu máquina. | No uses Docker. El archivo de la base se queda en el disco del host. |
| El destino exige imagen, y el API no escribe en disco. | Una etapa. `USER node` después del `npm ci`. |
| El `build` empaqueta a un `dist` y la imagen final no debe llevar el compilador. | Multi-stage. La etapa final copia `dist`, no `node_modules`. |
| El código llama a otro servicio por su nombre (`db`). | Compose. Sin el yaml, ese nombre no existe y el API responde 500. |

2. `.dockerignore` junto al Dockerfile, antes del primer `COPY`.

```
node_modules
.env
.env.*
.git
```

3. Una etapa. `npm ci` exige `package-lock.json`. El `CMD` es el `server.js` de este proyecto, no el de un ejemplo que lo tiene en la raíz.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
```

```dockerfile
COPY . .
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]
```

4. Sin `compose.yaml`, arranca con `docker run -p 3000:3000 myapp`. Con un segundo servicio (por ejemplo `db`), usa `docker compose up --build` y publica el puerto desde el yaml.

```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
docker compose up --build
```

5. Compose solo con el segundo servicio. El puerto publicado y el `EXPOSE` son el mismo número (`3000:3000`). La URL de la base usa el nombre del servicio, y el nombre de la base es el que crea ese servicio.

> **⚠️ Cuidado:** Sin `.dockerignore`, el `COPY . .` mete tu `node_modules` y, si existe, el `.env`. `USER node` antes del `npm ci` instala como un usuario que no es root y el build falla. Un fichero escrito dentro del contenedor vuelve a cero si no hay volumen (bootcamp: módulo 12).

> **✅ Hacer:** Si el proceso escribe `app.db`, no lo metas en esta fase. `USER node` no puede crear ese archivo salvo que el directorio sea suyo, y sin volumen el archivo muere con el contenedor.

🔗 En el bootcamp: módulo 12.

✅ Al terminar esta fase, deberías tener:

- [ ] Una frase que diga por qué hay imagen, o la fase tachada porque el MVP es un proceso con SQLite.
- [ ] `.dockerignore` con `node_modules` y `.env`, y el build no se lleva el `.env`.
- [ ] El proceso de la imagen no es root. `EXPOSE` y `PORT` son 3000.
- [ ] `docker compose up --build` responde en `http://localhost:3000/health` si elegiste Compose.
- [ ] Ningún `curl` del README apunta a un puerto que el yaml no publica.

---

## Fase 10 — CI/CD y deploy

🎯 Objetivo: cada push ejecuta lint, test y build, y el front y el API publicados usan el mismo contrato que en local.

1. El job, en este orden. En el material no hay archivo de workflow: cuando lo añadas, el job es esta tabla.

| Paso | Comando | Qué produce |
| --- | --- | --- |
| Instalar | `pnpm install` en la raíz del monorepo. | El lockfile, no un `npm install` suelto mezclado. |
| Lint | `pnpm lint` | El estilo, antes de los tests. |
| Test | `pnpm test` | `vitest run` en front y back. |
| Build | `pnpm build` | Front: `dist/`. Back sin compilador: `node --check` de los entry. |

2. Front. `vite build` deja estáticos. El host tiene que devolver `index.html` en las rutas del cliente. `VITE_API_URL` se hornea en el build: si en ese momento vale `localhost`, el bundle publicado llama a tu máquina.

3. API. El proceso escucha `PORT` en `server.js`. Los tests siguen importando `createApp`, no ese archivo. El host pega a `GET /health` y espera `{ status: "ok" }`.

4. Variables en el panel del host, no en el repo.

| Variable | Dónde | Valor |
| --- | --- | --- |
| `PORT` | Proceso del API. | El que asigne el host. |
| Origen de CORS | El API. | `https://tu-front`, con protocolo y sin path. |
| `VITE_API_URL` | Build del front. | La URL pública del API. No es un secreto. |
| Clave del modelo | Solo el API. | La de la Fase 8. Nunca con prefijo `VITE_`. |

> **⚠️ Cuidado:** `if (NODE_ENV !== "production") listen` abre el puerto cuando el entorno del CI es `test`. No lo uses para "apagar el puerto en producción". Dos JSON de `/health` hacen que el check del host dé fallo con el API sano (bootcamp: módulo 11).

> **✅ Hacer:** El primer deploy es el mismo `GET /health` y el mismo listado. No subas la feature que se quedó fuera del MVP en el mismo día.

🔗 En el bootcamp: módulo 11. El fallback del front está en el checklist de React del módulo 4.

✅ Al terminar esta fase, deberías tener:

- [ ] En local, `pnpm lint`, `pnpm test` y `pnpm build` terminan en 0 antes del push.
- [ ] El sitio publicado abre el listado, y refrescar `/items/1` no da 404 del host.
- [ ] `GET /health` público responde `{ status: "ok" }`.
- [ ] El bundle del front no contiene la clave del modelo.
- [ ] El CORS de producción es el origen real, no `localhost`.

---

## Fase 11 — Post-deploy

🎯 Objetivo: saber si lo publicado responde como en local, y elegir un solo cambio para la siguiente vuelta.

1. El mismo día, en este orden.

- [ ] `GET /health` desde fuera de tu máquina responde 200 y un `uptime` que sube.
- [ ] El listado carga desde el origen publicado, sin error de CORS en la consola.
- [ ] Refrescar una ficha no pide el HTML al API.
- [ ] Un alta sigue ahí después de reiniciar el proceso. Si no, el disco no es el que crees.
- [ ] Busca la clave del modelo en el JS publicado. No tiene que estar.

2. Qué mirar. El log de cada request es método y URL. No mide dinero ni tokens.

| Señal | Dónde | Para qué |
| --- | --- | --- |
| 200 y `uptime` | `/health` | El proceso sigue vivo. |
| Método + URL | La consola del API. | Ver qué ruta se usa de verdad. |
| 429 | La ruta de IA, si existe. | El límite corta, y la UI lo distingue. |
| 5xx | El log del error. | Fallo de base o del modelo, no un 400 del cliente. |

3. Cómo iterar.

1. Anota un fallo visto en producción, o una feature que se quedó fuera de las tres.
2. Elige una. La otra espera.
3. Añade el test del contrato que ese cambio toca: 400, 404 o 201.
4. Vuelve a pasar lint, test y build. Despliega esa sola.

> **⚠️ Cuidado:** Un log de método y URL no te dice el gasto del modelo ni si el `POST` se guardó. Para el gasto, mira el 429 y la cuota del proveedor. Para el guardado, reinicia y vuelve a leer el id (bootcamp: módulo 9).

> **✅ Hacer:** Si el health falla y el listado también, arregla el proceso antes de abrir una feature nueva.

🔗 En el bootcamp: módulo 9 (el log y el health) y módulo 11 (el orden lint, test, build).

✅ Al terminar esta fase, deberías tener:

- [ ] Los cinco checks del día del deploy, marcados.
- [ ] Una nota con la señal que vas a mirar la próxima semana.
- [ ] Un solo cambio anotado para la siguiente vuelta, no un rediseño.
- [ ] El test de ese cambio, escrito antes de desplegarlo otra vez.

---

## Apéndice A — Comandos por categoría

### Git

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `git init -b main` | Crea el repo local en la rama principal. | Fase 0, antes del primer archivo versionado. |
| `git add .` | Prepara lo que no está en el ignore. | Fase 0, después de escribir `.gitignore`. |
| `git commit -m "…"` | Guarda el snapshot con un mensaje. | Fase 0, y luego un cambio por commit. |
| `git remote add origin URL` | Apunta el local al repo de GitHub. | Fase 0, una sola vez. |
| `git push -u origin main` | Sube `main` y deja el seguimiento. | Fase 0, al publicar el primer commit. |

### npm / pnpm

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `npm create vite@latest . -- --template react` | Genera la SPA en la carpeta actual. | Fase 1, dentro de `frontend/`. |
| `npm install` | Instala lo que ya declara el `package.json`. | Fase 1, tras el template. |
| `npm install express@5 cors` | Añade el servidor y el middleware de origen. | Fase 1, dentro de `backend/`. |
| `npm install better-sqlite3` | Instala el driver de SQLite. | Fase 4, dentro de `backend/`. |
| `npm install zod@3` | Instala el validador de body, en Zod 3. | Fase 5, dentro de `backend/`. |
| `npm install zustand react-router` | Instala la store y el router. | Fase 6, dentro de `frontend/`, solo si hay pantalla privada. |
| `npm install ai express-rate-limit` | Instala el SDK de stream y el límite. | Fase 8, dentro de `backend/`, solo si hay IA. |
| `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` | Prepara el test de componente. | Fase 7, dentro de `frontend/`. |
| `npm install -D vitest supertest` | Prepara el test HTTP sin puerto. | Fase 7, dentro de `backend/`. |
| `pnpm install` | Instala el monorepo desde el lockfile. | Fase 10, en la raíz, como primer paso del job. |
| `pnpm --filter frontend dev` | Arranca un paquete por su `"name"`. | Fase 1, desde la raíz. El nombre no es el de la carpeta. |

### Dev

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `npm run dev` | Arranca Vite, o `node --watch` en el API. | Fase 1 en adelante. Un proceso por terminal. |
| `curl http://localhost:3000/health` | Pide el health sin navegador ni CORS. | Fase 3, antes de enchufar el componente. |
| `curl http://localhost:3000/items` | Pide el listado. Con el proceso recién arrancado es `[]`. | Fase 3.5, antes del primer `POST`. |

### Build

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `npm run build` | Front: `vite build` a `dist/`. | Fase 10, en `frontend/`. |
| `pnpm build` | El build de cada paquete desde la raíz. | Fase 10, después de lint y test. |
| `vite preview` | Sirve el `dist/` en local. | Después del build. No es el deploy. |

### Tests

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `npm test` | Lanza `vitest run` en ese paquete. | Fase 7, al cerrar una de las tres capas. |
| `pnpm test` | Lanza el test de cada paquete. | Fase 10, en el job, después del lint. |
| `pnpm lint` | Lanza el lint de cada paquete. | Fase 10, antes de los tests. |

### Docker

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `docker build -t myapp .` | Construye la imagen del directorio actual. | Fase 9, con `.dockerignore` ya escrito. |
| `docker compose up --build` | Construye y publica el puerto del `compose.yaml`. | Fase 9, si hay segundo servicio o quieres el `up` anotado. |

### SQL

| Comando | Qué hace | Cuándo |
| --- | --- | --- |
| `node src/db/seed.js` | Crea tablas y filas en `app.db`. | Fase 4, con el cwd en `backend/`, antes del primer GET. |

---

## Apéndice B — Gotchas por síntoma

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| La página de la URL no se usa, o un `page` inválido se queda en `NaN`. | El ternario de `Number.isNaN` está al revés: el número válido cae en 1 y el `NaN` se devuelve. | Invierte la condición. Número válido se usa; `NaN` pasa a 1. [manual/02-react.md](manual/02-react.md) |
| `require` no carga el módulo. | Falta la barra del path, o el `package.json` es `"type": "module"`. | `import` y una ruta `./relativa`. No mezcles `require`. [manual/03-backend.md](manual/03-backend.md) |
| `EADDRINUSE` al testear o al arrancar dos veces. | Hay un `listen` si `NODE_ENV` no es `"production"`. `"test"` también entra. | `listen` solo en `server.js`. Los tests importan `createApp`. [manual/03-backend.md](manual/03-backend.md) |
| Un 201 desaparece al reiniciar, y el GET de la lista no lo ve. | `push` a un JSON importado, o solo un método lee SQL y el resto sigue en un array. | Todos los métodos del modelo hablan con la base. [manual/04-sql.md](manual/04-sql.md) |
| Un filtro por query revienta el SQL o no filtra. | El `WHERE` concatena condiciones vacías y los `?` no coinciden con los valores. | Cada filtro es `columna = ?` y el valor va en la lista. [manual/04-sql.md](manual/04-sql.md) |
| El compilador acepta una fila que no tiene la forma de tu entidad. | `const rows: any` apaga el chequeo. | Tipa la fila. Los parámetros del `prepare` van como `unknown[]`. [manual/06-typescript.md](manual/06-typescript.md) |
| Un test deja datos al siguiente, o hace falta un puerto para pegarle a la app. | El array es un singleton del módulo y no hay factory. | `createApp({ initialItems })` con `structuredClone`, y SuperTest sin `listen`. [manual/05-testing.md](manual/05-testing.md) |
| Importar el hook del formulario no pinta nada. | El archivo está vacío o comentado. El flujo vive en otro hook. | No rellenes ese archivo para "arreglarlo". Usa el hook que ya pide los datos. [manual/02-react.md](manual/02-react.md) |
| La imagen se lleva tu `node_modules` o un `.env`. | `COPY . .` y no hay `.dockerignore`. | Escríbelo antes del build. Mínimo `node_modules` y `.env`. [manual/08-docker.md](manual/08-docker.md) |
| El API en Compose responde 500 al hablar con la base. | El código usa un host o un nombre de base que ningún yaml crea. | Un compose para esa app, con la misma URL que el código. [manual/08-docker.md](manual/08-docker.md) |
| `npm test` imprime "no test specified" y sale con error. | El script sigue siendo el `echo` de `npm init`. | Cámbialo a `vitest run`. [manual/05-testing.md](manual/05-testing.md) |
| Un filtro no encuentra filas que sí existen. | El modelo lee una clave que el JSON no tiene. | Usa la clave real del recurso. [manual/03-backend.md](manual/03-backend.md) |
| El `total` del listado baja al cambiar de página. | Se cuenta después del corte. Es el tamaño de la página. | Cuenta el filtrado antes de aplicar `limit` y `offset`. [manual/03-backend.md](manual/03-backend.md) |
| `curl` va bien y el navegador no. | El origen de CORS no lleva protocolo, o lleva un path. | `http://localhost:5173`, sin camino. El `Origin` no trae path. [manual/03-backend.md](manual/03-backend.md) |
| Un PATCH con body válido no llega al controller. | El `safeParse` va bien y el middleware no llama a `next()`. | `next()` si vale. 400 y `return` si no. [manual/05-testing.md](manual/05-testing.md) |
| Un E2E se pone verde sin comprobar el resultado del click. | Falta `await` y `expect`. El servidor de la UI no lo arranca el test. | Afirma el estado final. Arranca el front desde la config. [manual/05-testing.md](manual/05-testing.md) |
| Un 201 no demuestra que se guardó el campo. | La clave del body y la del esquema no son la misma cadena. | Afirma el campo leído de la respuesta, no solo el status. [manual/05-testing.md](manual/05-testing.md) |
| A mitad del texto generado se ve un corte y no el error. El 429 dice lo mismo que un 500. | `""` es falsy, y el texto se pinta antes que el error. Todo `!response.ok` comparte mensaje. | Pinta el error primero. El 429 tiene su propio texto. [manual/07-ia.md](manual/07-ia.md) |
| Un `curl` del README no tiene proceso detrás. | El puerto publicado no es el `EXPOSE`, o no hay compose. | Publica el puerto en el que el proceso hace `listen`. [manual/08-docker.md](manual/08-docker.md) |
| Un dato escrito en disco vuelve a cero al recrear el contenedor. | El fichero está dentro del contenedor y no hay volumen. | Monta un volumen, o no uses contenedor para ese archivo. [manual/08-docker.md](manual/08-docker.md) |

---

## Apéndice C — Checklist de inicio de proyecto

### Fase 0

- [ ] Frase de MVP y como máximo tres features, en el README.
- [ ] El mismo trío serviría, con otros nombres, para una tienda, un blog o tareas.
- [ ] Repo en GitHub, rama `main`, primer commit.
- [ ] `.gitignore` con `node_modules/`, `dist/`, `.env` y `*.db*`.
- [ ] `frontend/` y `backend/` vacías.

### Fase 1

- [ ] `npm run dev` del front abre Vite.
- [ ] `npm run dev` del API escucha el `PORT` del `.env`.
- [ ] `"type": "module"` y el script `dev` en el `package.json` del API.
- [ ] `createApp` no llama a `listen`.
- [ ] `.env` no sale en `git status`.

### Fase 2

- [ ] Árbol del front sin `store/` si solo hay una pantalla.
- [ ] `server.js` separado de `app.js`.
- [ ] El README dice que el modelo es quien toca los datos.
- [ ] CORS con esquema, host y puerto, sin path.
- [ ] Todavía no hay archivo de base de datos.

### Fase 3

- [ ] `curl` a `/health` devuelve `status: "ok"` y un `uptime`.
- [ ] La SPA muestra `ok`.
- [ ] Parar el API libera el puerto.
- [ ] `express.json()` está antes de las rutas.
- [ ] El componente distingue carga, error y dato.

### Fase 3.5

- [ ] `GET /items` recién arrancado devuelve `[]`.
- [ ] `POST /items` devuelve 201 y un `id`.
- [ ] `GET /items/no-existe` devuelve 404.
- [ ] La SPA lista títulos, o "No hay resultados".
- [ ] Ruta, controller y modelo en archivos distintos.

### Fase 4

- [ ] El id sembrado sigue tras reiniciar.
- [ ] Un `POST` nuevo también. No queda un array en el modelo.
- [ ] `WAL` y `foreign_keys = ON` al abrir la conexión.
- [ ] `app.db`, `app.db-wal` y `app.db-shm` fuera de git.
- [ ] El controller no tiene `SELECT` ni `INSERT`.

### Fase 5

- [ ] Un `title` de una letra responde 400 y no inserta.
- [ ] Un `POST` válido responde 201.
- [ ] Un id ausente responde 404.
- [ ] La pantalla no se queda en "Cargando…" tras un fallo.
- [ ] El `enum` y el `CHECK` usan las mismas palabras. Zod está en la versión 3.

### Fase 6

- [ ] El README dice si el API es público.
- [ ] La pantalla privada, si existe, manda al login.
- [ ] El verbo cerrado, si existe, responde 401 sin usuario.
- [ ] `/health` sigue en 200 sin sesión.
- [ ] No hay clave ni token en `localStorage`.

### Fase 7

- [ ] `npm test` en front y back termina en 0.
- [ ] Hay test de función, de pantalla, y de 200, 404, 201 y 400.
- [ ] Los tests importan `createApp`, no `server.js`.
- [ ] Un `POST` de test no ensucia al siguiente.
- [ ] No hay E2E en esta pasada.

### Fase 8

- [ ] Hay una frase de por qué hay IA, o la fase está tachada.
- [ ] La clave no está en el front.
- [ ] Un id ausente responde 404 sin llamar al modelo.
- [ ] La sexta llamada en un minuto es 429, y la UI lo dice.
- [ ] El error se ve aunque el texto haya empezado.

### Fase 9

- [ ] Hay una frase de por qué hay imagen, o la fase está tachada.
- [ ] `.dockerignore` excluye `node_modules` y `.env`.
- [ ] El proceso de la imagen no es root. `EXPOSE` y `PORT` coinciden.
- [ ] Si hay Compose, `/health` responde en el puerto publicado.
- [ ] Ningún `curl` apunta a un puerto que el yaml no publica.

### Fase 10

- [ ] `pnpm lint`, `pnpm test` y `pnpm build` terminan en 0.
- [ ] Refrescar `/items/1` en el sitio publicado no da 404 del host.
- [ ] `GET /health` público responde `{ status: "ok" }`.
- [ ] El bundle no contiene la clave del modelo.
- [ ] El CORS de producción es el origen real.

### Fase 11

- [ ] Health, listado, ficha, alta tras reinicio, y búsqueda de la clave en el JS.
- [ ] Una señal elegida para la semana que viene.
- [ ] Un solo cambio anotado.
- [ ] El test de esa change, antes de volver a desplegar.

---

## Apéndice D — Qué NO hacer en tu primer proyecto

- ❌ No guardes la clave del modelo en el front ni en una variable `VITE_`.
- ❌ No llames al proveedor desde el navegador.
- ❌ No pongas el límite de peticiones en todo el API: solo en la ruta que gasta cupo.
- ❌ No uses Docker en un MVP de un proceso con SQLite.
- ❌ No hagas `COPY . .` sin `.dockerignore`.
- ❌ No pongas `USER node` antes del `npm ci`.
- ❌ No documentes un `curl` a un puerto que no está publicado.
- ❌ No dejes el script `test` en el `echo` de `npm init`.
- ❌ No abras `listen` al importar la app, ni con `NODE_ENV !== "production"`.
- ❌ No calcules el `total` después de cortar la página.
- ❌ No metas paths en la lista de CORS.
- ❌ No des por guardado un campo si la clave del JSON y la del esquema no coinciden.
- ❌ No copies un `WHERE` armado con condiciones vacías.
- ❌ No dejes métodos del modelo en memoria cuando el listado ya lee SQL.
- ❌ No aceptes cualquier contraseña como si fuera una sesión.
- ❌ No mezcles dos contratos de `/health`.
- ❌ No despliegues el front sin devolver `index.html` en las rutas del cliente.
- ❌ No esperes que un fichero escrito dentro del contenedor sobreviva sin volumen.
- ❌ No rellenes un hook vacío si el flujo ya vive en otro archivo.
- ❌ No arranques OAuth, roles ni recuperación de clave en el primer deploy.

Fuente: JSCAMP · manual/0X-*.md · 2026-10-25 · v1.

