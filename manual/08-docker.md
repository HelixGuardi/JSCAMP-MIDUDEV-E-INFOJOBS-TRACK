# 08 — Patrones de Docker

Fuente: `modulo-12-docker` (carpetas `00-por-que` … `07-vercel`).  
Sin `.empty`, sin `node_modules`, sin lockfiles. Código literal de tus archivos. Si un comando solo está en un README o en un comentario, se marca. Si no está, no se inventa.

Huecos (no invento):

- `06-compose` **no tiene** `compose.yaml`. El único `compose.yaml` del módulo está en `02b-node-web`. El bloque de Postgres de ese yaml está **comentado**.
- `05-ia` **no tiene** `compose.yaml`. El README manda `docker compose` y el puerto de host `5002`. El código escucha en `5000`.
- `04-volumes` **no tiene** instrucción `VOLUME`, ni `docker run -v`, ni compose. El contador vive en un fichero dentro del contenedor.
- No hay en el módulo `docker ps`, `docker logs` ni `docker exec`.
- El único `docker run -p` anotado es el de `Dockerfile.vercel` (Go, puertos 8080:80). No hay un `docker run -p` para las apps Node.
- Nada en el repo dice que un ejemplo "funcionó". Los comandos de `05-ia/README.md` y de `02b-node-web/README.Docker.md` son apuntes / plantilla.

Versiones de imagen que sí están escritas (no son la misma):

| Carpeta | Imagen |
|---|---|
| `00-por-que` | `node:22-alpine` |
| `01-hola-docker` | `alpine` (sin Node) |
| `02-node-web` | `node:26-alpine` |
| `02b-node-web` | `node:${NODE_VERSION}-alpine` con `ARG NODE_VERSION=26` |
| `03-multi-stage`, `04-volumes`, `06-compose` | `node:22-alpine` |
| `05-ia` | `python:3.12-slim` |
| `07-vercel` | `golang:1.24-alpine` y luego `alpine:3.20` |

---

## Parte A — Dockerfile mínimos (00–04)

### `FROM` para fijar el Node (`00-por-que`)

**Cuándo usarlo:** cuando el programa depende de una versión concreta de Node y quieres que el contenedor traiga esa, no la de tu máquina.

**Código:**

```dockerfile
# modulo-12-docker/00-por-que/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY app.js .

CMD ["node", "app.js"]
```

```js
// modulo-12-docker/00-por-que/app.js
// 🐳 "En mi máquina funciona"
// Mini app que usa funciones MODERNAS de JavaScript.
// Funciona en Node 18+, pero PETA en Node 16 (y anteriores).

console.log(`👉 Ejecutando con Node ${process.version}\n`)

const pedido = {
  id: 1,
  cliente: 'midudev',
  productos: ['Docker', 'Café'],
}

// 1) structuredClone: es un global que NO existe antes de Node 17
const copia = structuredClone(pedido)
copia.cliente = 'otra persona'

console.log('Original:', pedido.cliente) // midudev
console.log('Copia:   ', copia.cliente) // otra persona

// 2) Array.prototype.findLast: llegó en Node 18
const numeros = [1, 2, 3, 4, 5]
const ultimoPar = numeros.findLast((n) => n % 2 === 0)
console.log('Último número par:', ultimoPar) // 4

console.log('\n✅ ¡Todo funcionó! Tu versión de Node soporta estas funciones.')
```

**Gotcha / nota:** `FROM` es la imagen base: aquí mete Alpine **y** Node 22. El `app.js` no abre puerto; solo hace `console.log` y sale. No hay `EXPOSE` ni `docker run` anotado en esta carpeta. `01` es más corto todavía: este es el mínimo **con tu código y con Node**, no el Dockerfile más corto del módulo.

---

### Hola sin aplicación (`01-hola-docker`)

**Cuándo usarlo:** para comprobar que Docker ejecuta una imagen, antes de copiar código.

**Código:**

```dockerfile
# modulo-12-docker/01-hola-docker/Dockerfile
FROM alpine

CMD ["echo", "Hola Docker"]
```

**Gotcha / nota:** no hay `app.js`, ni `COPY`, ni `WORKDIR`. `CMD` en forma exec (`["echo", "Hola Docker"]`) es el proceso único. La carpeta solo contiene este archivo.

---

### Node en imagen: `WORKDIR`, `COPY`, `EXPOSE`, `USER`, `CMD` (`02-node-web`)

**Cuándo usarlo:** una API Node con dependencias, escuchando en un puerto, sin correr como root.

**Código:**

```dockerfile
# modulo-12-docker/02-node-web/Dockerfile
FROM node:26-alpine

WORKDIR /app

# copiamos el archivo server.js y el package.json juntos
COPY package*.json .

# instalamos las dependencias
RUN npm install

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
```

```js
// modulo-12-docker/02-node-web/server.js
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000
const SALUDO = process.env.SALUDO || '¡Hola desde Node.js dentro de Docker! 🐳'

app.get('/', (req, res) => {
  console.log('[GET] /')

  res.json({
    mensaje: SALUDO,
    hostname: process.env.HOSTNAME, // el id del contenedor
    timestamp: new Date().toISOString(),
  })
})

// Endpoint de salud, útil para HEALTHCHECK y orquestadores
app.get('/health', (req, res) => {
  console.log('[GET] /health')
  res.status(200).json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
```

```json
// modulo-12-docker/02-node-web/package.json
{
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

**Gotcha / nota:** el orden es el que importa. `COPY package*.json` + `RUN npm install` van **antes** de `COPY . .`, y `USER node` va **después** del `npm install` (el install corre como root; el `CMD` corre como `node`). `EXPOSE 3000` coincide con `process.env.PORT || 3000`. El comentario de `/health` habla de `HEALTHCHECK`; **ningún** Dockerfile del módulo tiene instrucción `HEALTHCHECK`. El `CMD` llama a `node server.js`, no al script `start`. `02b` (más abajo) sí usa `CMD npm start`. Esta imagen es `node:26-alpine`; `00`, `03`, `04` y `06` usan `node:22-alpine`.

---

### Qué excluye `.dockerignore` (`02-node-web`)

**Cuándo usarlo:** en el mismo directorio que el `Dockerfile`, para que `COPY . .` no meta basura local en la imagen.

**Código:**

```dockerignore
# modulo-12-docker/02-node-web/.dockerignore
node_modules
.git
.gitignore
.env
.env.*
*.md
.DS_Store
.vscode
.idea
.eslintcache
.cache
.parcel-cache
.turbo
.nyc_output
.eslintcache
.cache
.parcel-cache
.turbo
.nyc_output
```

**Gotcha / nota:** `node_modules` fuera del contexto obliga a que el `RUN npm install` de la imagen sea el que instala. Si no estuviera, el `COPY . .` pisaría lo instalado en la imagen con la carpeta de tu máquina. `.env` y `.env.*` no entran en la imagen: `PORT` y `SALUDO` hay que pasarlos al arrancar, y en esta carpeta no hay ningún comando que los pase. Las cinco últimas líneas repiten a las cinco anteriores. Este ignore **no** excluye el `Dockerfile`. `03-multi-stage` no tiene `.dockerignore`.

---

### Dos `FROM`: build y runtime (`03-multi-stage`)

**Cuándo usarlo:** cuando compilas (aquí, esbuild) y la imagen que arranca no debe llevar el compilador ni el fuente.

**Código:**

```dockerfile
# modulo-12-docker/03-multi-stage/Dockerfile
# etapa 1: Builder (fase de compilación)
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

# etapa 2: Runtime (fase de ejecución)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

```json
// modulo-12-docker/03-multi-stage/package.json
"scripts": {
  "build": "esbuild src/server.js --bundle --platform=node --format=esm --outfile=dist/server.js",
  "start": "node dist/server.js"
},
"dependencies": {
  "canvas-confetti": "1.9.3"
},
"devDependencies": {
  "esbuild": "0.24.0"
}
```

```js
// modulo-12-docker/03-multi-stage/src/server.js
import { createServer } from 'node:http'
import confetti from 'canvas-confetti' // Dependencia de producción para probar el bundleado

const PORT = process.env.PORT || 3000

// con los comentarios aqui tal cual
createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      mensaje: 'Imagen mínima creada con multi-stage build 🐳',
      nota: 'Esta imagen final NO contiene esbuild ni el código fuente sin compilar',
      ejemploDependency: 'Hemos importado canvas-confetti con éxito en producción, pero esbuild (devDependencies) se quedó fuera.'
    })
  )
}).listen(PORT, () => {
  console.log(`🚀 Servidor (multi-stage) escuchando en el puerto ${PORT}`)
})
```

**Gotcha / nota:** de la etapa `builder` solo copias `/app/dist` → `./dist`. No copias `node_modules` ni `src`. Eso encaja porque el `build` hace `--bundle`: `canvas-confetti` queda dentro de `dist/server.js` y `esbuild` (devDependency) se queda en la etapa que se descarta. El `import confetti` no se llama; está para forzar el bundle. `npm ci` en el builder **sí** instala devDependencies (no hay `--omit=dev`). `RUN npm ci` exige `package-lock.json` (está en la carpeta). La imagen final sigue siendo `node:22-alpine`, no un Alpine vacío: quitas compilador y fuente, no el runtime de Node. No hay `.dockerignore`: un `node_modules` local entraría en el `COPY . .` del builder.

---

### Qué persiste en disco (`04-volumes`)

**Cuándo usarlo:** cuando el dato tiene que vivir en un fichero (`data/visitas.txt`) y no en una variable del proceso.

**Código:**

```dockerfile
# modulo-12-docker/04-volumes/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
```

```js
// modulo-12-docker/04-volumes/server.js
const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Intentamos leer la URL de conexión a la Base de Datos
const DB_HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'visitas.txt');

// Asegurar que exista el directorio de datos para persistencia (volúmenes / bind mounts)
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Inicializar el contador si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '0', 'utf-8');
}

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/visitar') {
    let visitas = parseInt(fs.readFileSync(DATA_FILE, 'utf-8') || '0', 10);
    visitas++;
    fs.writeFileSync(DATA_FILE, visitas.toString(), 'utf-8');
    
    return res.end(JSON.stringify({
      message: '¡Vamos! 📈',
      contador: visitas
    }));
  }

  // Ruta por defecto
  let visitasActuales = fs.readFileSync(DATA_FILE, 'utf-8') || '0';
  res.end(JSON.stringify({
    message: 'HOLA QUÉ PASA CHAVALES',
    instrucciones: 'Visita /visitar para registrar una nueva visita persistente en disco.',
    contador_actual: parseInt(visitasActuales, 10),
    db_config: `Conectando por red al host de base de datos: "${DB_HOST}"`
  }));
});

server.listen(PORT, () => {
  console.log(`Servidor de volúmenes escuchando en http://localhost:${PORT}`);
});
```

**Gotcha / nota:** lo que el código trata como persistente es el fichero `/app/data/visitas.txt` (contador en `GET /visitar`, lectura en `GET /`). Lo que no persiste es el proceso: al arrancar, si el fichero no existe, escribe `'0'`. No hay `VOLUME` en el Dockerfile, ni un `docker run -v` en la carpeta, ni `compose.yaml`. Sin un montaje anotado en el repo, un contenedor nuevo no ve el `visitas.txt` del anterior y el contador vuelve a 0. El comentario habla de volúmenes; el comando que lo demostraría no está. `DB_HOST` solo se imprime: no hay cliente de base de datos. No hay `package.json`: por eso `require` funciona (CommonJS). No hay `USER node`: el proceso puede crear `/app/data`. En `02` / `03` / `06` sí hay `USER node` y la app no escribe ficheros. No hay `--chown` en ningún `COPY` del módulo.

---

## Parte B — Compose (`02b` y `06`)

### Plantilla: un servicio, `build`, `ports` (`02b-node-web/compose.yaml`)

**Cuándo usarlo:** como base cuando quieres construir el Dockerfile del mismo directorio y publicar el puerto, en un solo `docker compose up --build`.

**Código:** lo activo del archivo (el servicio `server`). El bloque de Postgres va en el patrón siguiente; en el archivo está comentado, debajo de esto.

```yaml
# modulo-12-docker/02b-node-web/compose.yaml
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
```

El `build.context: .` usa el Dockerfile **de `02b`**, no el de `02-node-web`. El archivo trae comentarios en inglés de la plantilla de Docker; estas son las instrucciones, en el mismo orden:

```dockerfile
# modulo-12-docker/02b-node-web/Dockerfile
# syntax=docker/dockerfile:1
ARG NODE_VERSION=26
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
EXPOSE 3000
CMD npm start
```

`server.js` de `02b` es el mismo que el de `02` (`PORT` por defecto 3000, ruta `/health`). El `package.json` tiene `"start": "node server.js"`.

**Gotcha / nota:** el servicio activo **no tiene** `volumes:`. Cambiar `server.js` en el host no entra en el contenedor hasta otro build. `NODE_ENV: production` está en el compose y también como `ENV` en el Dockerfile. `CMD npm start` es forma shell y depende del script `start`; el de `02` es `CMD ["node", "server.js"]`. `npm ci --omit=dev` exige `package-lock.json` (está). La directiva `# syntax=docker/dockerfile:1` solo está en este Dockerfile: es la que acompaña al `RUN --mount`. `USER node` está antes del `COPY . .`; no hay `--chown`. El `.dockerignore` de `02b` es otra plantilla: excluye `**/node_modules`, `**/Dockerfile*`, `**/compose.y*ml`, `**/dist`, `**/.env`, `README.md`. No es el ignore corto de `02`.

---

### Volumen y Postgres: solo el bloque comentado (`02b`)

**Cuándo usarlo:** como recordatorio de la forma (servicio `db`, volumen, secreto, healthcheck). No está activo.

**Código:**

```yaml
# modulo-12-docker/02b-node-web/compose.yaml
#     depends_on:
#       db:
#         condition: service_healthy
#   db:
#     image: postgres
#     restart: always
#     user: postgres
#     secrets:
#       - db-password
#     volumes:
#       - db-data:/var/lib/postgresql/data
#     environment:
#       - POSTGRES_DB=example
#       - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
#     expose:
#       - 5432
#     healthcheck:
#       test: [ "CMD", "pg_isready" ]
#       interval: 10s
#       timeout: 5s
#       retries: 5
# volumes:
#   db-data:
# secrets:
#   db-password:
#     file: db/password.txt
```

**Gotcha / nota:** el comentario del propio yaml dice que hay que crear `db/password.txt` antes de `docker-compose up`. Esa carpeta `db/` no está en `02b`. El volumen `db-data` apunta a `/var/lib/postgresql/data`: eso es lo que sobreviviría a un contenedor nuevo de Postgres, si descomentaras el bloque. No es un bind mount de tu código. La base se llama `example`, el usuario del proceso es `postgres` y la contraseña sale de un fichero secreto. Eso **no** coincide con la URL por defecto de `06-compose` (`midu:secreto@db:5432/midudb`).

---

### Comandos anotados en `README.Docker.md` (`02b`)

**Cuándo usarlo:** para arrancar esta plantilla, o para construir y subir la imagen a mano.

**Código:** el README está en inglés (plantilla). Comandos que aparecen, literales:

```bash
# modulo-12-docker/02b-node-web/README.Docker.md
docker compose up --build
```

La aplicación, según ese README, queda en `http://localhost:3000`.

```bash
# modulo-12-docker/02b-node-web/README.Docker.md
docker build -t myapp .
docker build --platform=linux/amd64 -t myapp .
docker push myregistry.com/myapp
```

**Gotcha / nota:** es plantilla, no una bitácora. No dice que lo ejecutaste ni que funcionó. `--platform=linux/amd64` el README lo liga a construir en un Mac M1 para un cloud amd64. `docker push` usa el nombre de ejemplo `myregistry.com/myapp`. No hay `docker run` en este README: el arranque anotado es `docker compose up --build`.

---

### App Node que habla con Postgres (`06-compose`) — sin `compose.yaml` en la carpeta

**Cuándo usarlo:** cuando la API tiene que resolver el host de la base por el nombre del servicio (`db`) dentro de la red de Compose.

**Estado del yaml:** **no está en el repo.** El inventario acierta: el `compose.yaml` de ejemplo vive en `02b-node-web`, no aquí. El Dockerfile de esta carpeta lo nombra igual:

```dockerfile
# modulo-12-docker/06-compose/Dockerfile
# Imagen de la app (se construye desde compose.yaml con "build: .")
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]
```

```js
// modulo-12-docker/06-compose/server.js
import express from 'express'
import pg from 'pg'

const { Pool } = pg

const app = express()
const PORT = process.env.PORT || 3000

// La URL apunta al host "db", que es el NOMBRE del servicio en compose.yaml.
// Docker Compose resuelve ese nombre por nosotros dentro de su red interna.
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://midu:secreto@db:5432/midudb',
})

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS ahora')
    res.json({
      mensaje: '¡App + PostgreSQL funcionando con Docker Compose! 🐳',
      hora_de_la_base_de_datos: rows[0].ahora,
    })
  } catch (err) {
    res.status(500).json({ error: 'No se pudo conectar a la base de datos', detalle: err.message })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 App escuchando en http://localhost:${PORT}`)
})
```

```json
// modulo-12-docker/06-compose/package.json
"dependencies": {
  "express": "^4.19.2",
  "pg": "^8.12.0"
}
```

```dockerignore
# modulo-12-docker/06-compose/.dockerignore
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
Dockerfile
.dockerignore
*.md
.DS_Store
```

**Gotcha / nota:** la conexión está en el código, no en un yaml de esta carpeta. El host `db`, el usuario `midu`, la contraseña `secreto`, el puerto `5432` y la base `midudb` salen de la URL por defecto. `DATABASE_URL` la puede sustituir, y no hay `.env` en la carpeta (el ignore excluye `.env`). `GET /` hace `SELECT NOW()`; si el host `db` no existe, responde 500 con `err.message`. No hay `depends_on` aquí. Descomentar el Postgres de `02b` no vale tal cual: esa plantilla crea la base `example`, no `midudb`, y no define el usuario `midu`. `npm ci --omit=dev` otra vez exige el lockfile (está). `EXPOSE 3000` coincide con `PORT`. Este ignore es el corto: deja fuera `node_modules`, git, `.env` y el propio Dockerfile.

---

## Parte C — IA y Docker (`05-ia`)

### Imagen Python (Flask)

**Cuándo usarlo:** un servicio Python con dependencias pinadas, escuchando en el puerto que abre Flask.

**Código:**

```dockerfile
# modulo-12-docker/05-ia/Dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]
```

```text
# modulo-12-docker/05-ia/requirements.txt
flask==3.1.1
openai==1.82.0
```

**Gotcha / nota:** mismo orden que en Node: primero el manifiesto de dependencias, luego el `RUN` de install, luego el código. `EXPOSE 5000` coincide con `app.run(..., port=5000)`. No hay `USER`. No hay `.dockerignore`. El título del README dice «Ejemplo 06» y la carpeta es `05-ia`.

---

### Cliente del Docker Model Runner (`ai/smollm2`)

**Cuándo usarlo:** cuando el contenedor llama a un modelo que corre en el host, por la API compatible con OpenAI, no cuando el modelo va dentro de esta imagen.

**Código:**

```python
# modulo-12-docker/05-ia/app.py
from flask import Flask, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

# Configuramos el cliente OpenAI apuntando al API de Docker Model Runner
# En local se usa localhost:12434, pero de contenedor a Host se usa la DNS especial de Docker
client = OpenAI(
    base_url=os.environ.get("LLM_URL", "http://model-runner.docker.internal/v1/"),
    api_key="no-es-necesaria"
)

@app.route("/")
def home():
    return jsonify({
        "service": "Microservicio de IA con Docker Model Runner",
        "model": "smollm2"
    })

@app.route("/ask")
def ask():
    question = request.args.get("q", "What is a Docker container?")
    try:
        response = client.chat.completions.create(
            model="ai/smollm2",
            messages=[{"role": "user", "content": question}],
            max_tokens=100
        )
        return jsonify({
            "question": question,
            "answer": response.choices[0].message.content,
            "tokens": response.usage.total_tokens
        })
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Asegúrate de haber corrido `docker model pull ai/smollm2` en tu Host antes de llamar este endpoint."
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

**Gotcha / nota:** el modelo **no** se instala en el Dockerfile. El nombre `ai/smollm2` está en `chat.completions.create`. La URL por defecto es `http://model-runner.docker.internal/v1/`; `LLM_URL` la cambia. El comentario distingue `localhost:12434` (en el host) de esa DNS (desde el contenedor). `api_key` es el literal `"no-es-necesaria"`. `host="0.0.0.0"` está en el `app.run`. Si la llamada falla, el JSON de error te recuerda el `docker model pull`.

---

### README de `05-ia`: apunte, no una corrida verificada

**Cuándo usarlo:** como lista de comandos que escribiste para el Model Runner. No como prueba de que el flujo está cerrado en el repo.

**Código:**

```bash
# modulo-12-docker/05-ia/README.md
docker model pull ai/smollm2
```

```bash
# modulo-12-docker/05-ia/README.md
docker compose up -d --build
```

```bash
# modulo-12-docker/05-ia/README.md
curl "http://localhost:5002/ask?q=What+is+a+container+in+one+sentence"
```

```bash
# modulo-12-docker/05-ia/README.md
docker compose down
```

El README dice que hace falta Docker Desktop (versión de 2026 en adelante) con la CLI `docker model`, y que el host `5002` se mapea al `5000` del contenedor, que a su vez llama a `http://model-runner.docker.internal/v1/`.

**Gotcha / nota:** marca **solo apunte**. No hay salida de terminal, ni un "funcionó", ni el `compose.yaml` que publicaría `5002:5000`. El Dockerfile solo hace `EXPOSE 5000`. El `curl` a `localhost:5002` no tiene, en esta carpeta, el mapeo que lo haría cierto. El `docker model pull ai/smollm2` sí coincide con el modelo del `app.py` y con el mensaje de error del `except`.

---

## Parte D — Vercel / Go (`07-vercel`)

### `Dockerfile.vercel`: qué cambia respecto a un `Dockerfile`

**Cuándo usarlo:** cuando quien construye la imagen espera el nombre `Dockerfile.vercel` en la raíz, no un archivo llamado `Dockerfile`.

**Código:**

```dockerfile
# modulo-12-docker/07-vercel/Dockerfile.vercel
# Ejemplo 06 — Despliegue a producción en Vercel
#
# Vercel detecta este archivo "Dockerfile.vercel" en la raíz del proyecto,
# construye la imagen, la almacena, la despliega y la autoescala sobre Fluid compute.
# Más info: https://vercel.com/blog/dockerfile-on-vercel
#
# Probar en local:
#   docker build -f Dockerfile.vercel -t web-vercel .
#   docker run --rm -p 8080:80 -e PORT=80 web-vercel
#   # abre http://localhost:8080
#
# Desplegar:
#   npm i -g vercel && vercel login
#   vercel           # preview
#   vercel --prod    # producción

FROM golang:1.24-alpine AS builder
WORKDIR /src
COPY . .
RUN go build -o /server main.go

FROM alpine:3.20 AS runner
COPY --from=builder /server /server
CMD ["/server"]
```

**Gotcha / nota:** el nombre no es `Dockerfile`. El build anotado lleva `-f Dockerfile.vercel`. No hay `EXPOSE`, ni `USER`, ni `ENV PORT` en la imagen. El `docker run` del comentario publica `8080:80` y pasa `-e PORT=80`. Es multi-stage, como `03`, con otro recorte: la etapa final es `alpine:3.20` y solo copia el binario `/server`, no un runtime de Go ni de Node. El comentario de cabecera también dice «Ejemplo 06» (la carpeta es `07-vercel`). `.gitignore` de esta carpeta solo ignora `.vercel`. Estos comandos están en comentarios del Dockerfile: apunte de uso, no un log de que el deploy se hizo.

---

### Servidor Go mínimo (`main.go`)

**Cuándo usarlo:** un binario que lee `PORT` y responde en `/`. No es un stub: el `main` registra la ruta y llama a `ListenAndServe`.

**Código:**

```go
// modulo-12-docker/07-vercel/main.go
package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello from a container on Vercel 👋")
	})

	http.ListenAndServe(":"+port, nil)
}
```

**Gotcha / nota:** si no hay `PORT`, escucha en `80`. Eso encaja con el `-e PORT=80` y el `-p 8080:80` del comentario. No hay `go.mod` en la carpeta. No hay `package.json`. La respuesta es texto plano, una sola ruta.

---

### Cuándo un Dockerfile propio en Vercel

En este módulo el caso es este: app **Go**, archivo con el nombre que el comentario dice que Vercel detecta (`Dockerfile.vercel`), imagen final con solo el binario. No hay `package.json` ni framework Node del que copiar un arranque.

No hay en la carpeta un segundo ejemplo "deja que la plataforma genere el Dockerfile", ni una nota que compare los dos caminos. No invento esa comparación. Lo que sí queda escrito: para probar en local hace falta `-f`, porque el archivo no se llama `Dockerfile`.

---

## Checklist para dockerizar un backend Node desde cero

Cada ítem sale de un archivo de este módulo. Si el comando no está anotado, se dice y no se rellena.

### 1. `.dockerignore` mínimo

El corto que ya usas en una app Node con dependencias es el de `06-compose`:

```dockerignore
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
Dockerfile
.dockerignore
*.md
.DS_Store
```

`node_modules` y `.env` son los que rompen el build o filtran secretos. El de `02-node-web` cubre lo mismo y además caches de editores, pero repite cinco líneas. El de `02b` es la plantilla larga (también excluye `Dockerfile*` y `compose.y*ml`). `03` no tiene ignore: no lo copies como está.

### 2. Dockerfile multi-stage (build → runtime)

El de Node es `03-multi-stage`: etapa `builder` (`npm ci` + `npm run build`) y etapa `runner` (`COPY --from=builder /app/dist ./dist`, `USER node`, `CMD ["node", "dist/server.js"]`).

Solo cuadra si el `build` empaqueta las dependencias (`esbuild --bundle` en ese `package.json`). Esa imagen final no copia `node_modules`. Si tu app hace `import` de paquetes sin bundle, este Dockerfile se queda corto: en el módulo no hay un multi-stage Node que copie `node_modules` de producción.

Para una app sin paso de build, el módulo usa una sola etapa: `06-compose` (`npm ci --omit=dev`, `USER node`, `CMD ["node", "server.js"]`) o `02-node-web` (`npm install`, luego `USER node`).

### 3. Usuario no root (`USER node`)

Está en `02-node-web`, `02b-node-web`, `03-multi-stage` y `06-compose`. Va después del `RUN npm …` para que la instalación siga siendo de root.

No está en `04-volumes`, que es el único servidor que **escribe** en disco (`/app/data`). No mezcles `USER node` de `02` con la escritura de `04` sin mirar permisos: en el módulo no hay `--chown` en los `COPY`.

### 4. `EXPOSE` coherente con `PORT`

En las apps Node del módulo, `EXPOSE 3000` y `const PORT = process.env.PORT || 3000` van juntos (`02`, `02b`, `03`, `04`, `06`).

Contraejemplo dentro del mismo módulo, para no copiarlo en Node: `07` no tiene `EXPOSE` y el Go cae a `80`; `05` hace `EXPOSE 5000` pero el README habla del host `5002`.

### 5. `docker build`

Anotado en `02b-node-web/README.Docker.md`:

```bash
docker build -t myapp .
```

Variante del mismo README, si el cloud es otra arquitectura:

```bash
docker build --platform=linux/amd64 -t myapp .
```

No está escrito `docker build -t nombre:tag .`. El tag del apunte es `myapp` (sin `:tag`). Si el archivo no se llama `Dockerfile`, el único ejemplo es el de Go: `docker build -f Dockerfile.vercel -t web-vercel .`.

### 6. `docker run -p host:container`

No hay un `docker run -p` para Node. El único anotado está en el comentario de `07-vercel/Dockerfile.vercel`:

```bash
docker run --rm -p 8080:80 -e PORT=80 web-vercel
```

Para el Node de `02b`, lo que sí está anotado es el puerto del compose (`3000:3000`) y el arranque `docker compose up --build`, con la URL `http://localhost:3000` en el README. No reescribo eso como un `docker run -p 3000:3000`.

### 7. `compose.yaml` para desarrollo, con volumen y base de datos

Plantilla activa (sin volumen y sin base): `02b-node-web/compose.yaml`, servicio `server`, `build.context: .`, `ports: 3000:3000`.

Volumen + Postgres: **solo el bloque comentado** de ese mismo archivo (`db-data:/var/lib/postgresql/data`, secreto `db/password.txt`, `POSTGRES_DB=example`). No hay un compose de desarrollo que monte tu código fuente.

La app que de verdad abre Postgres es `06-compose/server.js`, y su `compose.yaml` **no está**. La URL por defecto (`postgres://midu:secreto@db:5432/midudb`) no coincide con el Postgres comentado de `02b`. No descomentes uno y esperes que el otro arranque.

### 8. Cuándo pasar a Compose y cuándo no

Sin Compose en el repo: `00`, `01`, `02`, `03`, `04` (un proceso, un Dockerfile) y `07` (build con `-f` y `docker run`).

Con Compose anotado y archivo presente: `02b`, un solo servicio, para no escribir el `docker build` y el puerto por separado (`docker compose up --build`).

Con Compose **nombrado en código pero sin yaml**: `06` (el host `db` solo tiene sentido si Compose crea ese servicio) y `05` (el README manda `docker compose` y el puerto `5002`; el archivo no está).

Pasa a Compose cuando hay un segundo proceso al que tu código llama por nombre (`db` en `06`) o cuando quieres el `up --build` de la plantilla `02b`. No hace falta para el echo de `01`, el script de `00`, ni el binario de `07`.

### 9. Verificación

En el módulo **no** anotaste `docker ps`, `docker logs` ni `docker exec -it … sh`. No los añado como si fueran apuntes tuyos.

Lo que sí puedes comprobar con lo escrito:

- `02b`: el README dice que tras `docker compose up --build` la app está en `http://localhost:3000`. El `server.js` responde JSON en `/` y `{ status: 'ok' }` en `/health`. No hay un `curl` anotado para ese puerto.
- `05`: el `curl` a `localhost:5002/ask` está en el README y queda como apunte, porque no existe el compose que mapea ese puerto.
- `04`: la prueba de que el dato sigue vivo sería un segundo contenedor viendo el mismo `visitas.txt`. Ese `docker run` con volumen no está en la carpeta. Sin él, el código vuelve a escribir `'0'` si el fichero no existe.
- `06`: si la base no está, `GET /` responde 500 (`No se pudo conectar a la base de datos`). `/health` no mira la base: responde `{ status: 'ok' }` igual.
