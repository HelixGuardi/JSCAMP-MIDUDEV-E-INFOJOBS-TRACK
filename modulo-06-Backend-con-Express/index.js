import express from "express";
import jobs from "./jobs.json" with { type: "json" };

const PORT = process.env.PORT || 8888;
const app = express();

app.use((request, response, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${request.method} ${request.url}`);
  next();
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/health", (request, response) => {
  response.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/get-jobs", async (req, res) => {
  const { text, title, level, limit, technology, offset } = req.query;

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

  console.log({ limit, technology });
  return res.json(filteredJobs);
});

app.get("/get-single-job/:id", (req, res) => {
  const { id } = req.params;

  const idNumber = Number(id);

  return res.json({
    job: { id: idNumber, title: `Job with id ${id}` },
  });
});

// Opcional --> /acd o /abcd
app.get("/a{b}cd", (req, res) => {
  return res.send("abcd o acd");
});

// Comodin --> puede ser lo que tu quieras. Suele ser muy interesantes para rutas más largas que tu no sabes como terminan
app.get("/bb*bb", (req, res) => {
  return res.send("ab*cd");
});
// Por ejemplo:
app.get("/file/*filename", (req, res) => {
  return res.send("file/*");
});

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send("Terminando en fly");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});

/* DIFERENCIAS ENTRE USAR EXPRESS Y NO USARLO */
/* 
La idea no es demonizar el servidor nativo, sino entender qué problemas de escalabilidad y mantenimiento aparecen cuando el código empieza a crecer.

Servidor sin Express (Node.js nativo)
Cuando usamos el módulo node:http, tenemos que encargarnos manualmente de casi todo el ciclo de vida de la petición:

Comprobar el método HTTP (GET, POST, etc.).
Parsear la URL para obtener el pathname.
Gestionar cabeceras (Content-Type, etc.).
Enviar la respuesta y cerrarla manualmente con res.end().
Repetir este patrón para cada ruta nueva.
Ejemplo de servidor nativo:
import http from 'node:http'

const server = http.createServer((req, res) => {
  const { url, method } = req

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>¡Hola Mundo desde lo nativo!</h1>')
    return
  }

  res.writeHead(404)
  res.end('No encontrado')
})

server.listen(1234)
Copiar
Este código funciona, pero tiene varios inconvenientes:

Se vuelve repetitivo: Cada ruta requiere validaciones similares.
Es más difícil de leer: La lógica de negocio se mezcla con la lógica de red.
Escala mal: A medida que añades 10, 20 o 50 rutas, los condicionales se vuelven inmanejables.
Servidor usando Express
Con Express, el mismo comportamiento se escribe de forma mucho más declarativa y limpia:

import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.send('<h1>¡Hola Mundo con Express!</h1>')
})

app.use((req, res) => {
  res.status(404).send('No encontrado')
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})
Copiar
¿Qué ha cambiado aquí?
Enrutamiento semántico: Usamos app.get(), app.post(), etc., lo que hace que el código sea autodocumentado.
Abstracción de cabeceras: res.send() detecta automáticamente el contenido y añade los headers necesarios por ti.
Sin parsing manual: No hemos tenido que importar url ni parsear nada manualmente.
Ciclo de respuesta automático: No hace falta llamar a res.end().
Las 3 diferencias clave
1. Legibilidad y Mantenibilidad
Con Express, al leer el código es evidente qué rutas existen y qué hace cada una. En el servidor nativo, esa información suele estar dispersa dentro de un gran bloque de condicionales.

2. Eliminación de código repetitivo (Boilerplate)
Express elimina la necesidad de escribir una y otra vez el código para manejar streams, parsear el cuerpo de la petición o configurar códigos de estado.

3. Facilidad para escalar
Añadir una nueva funcionalidad o un nuevo endpoint en Express es tan sencillo como añadir una línea más. En un servidor nativo, esto suele implicar refactorizar el flujo de control de la aplicación.

¿Node.js nativo o Express?
Node.js nativo es excelente para entender los fundamentos de cómo funciona la web por debajo. Sin embargo, Express existe para ahorrar tiempo y reducir la complejidad accidental. Express no hace “magia”, simplemente usa http por debajo de una forma optimizada para nosotros.

Para terminar…
✅ Comparamos el enfoque imperativo (nativo) vs el declarativo (Express).
✅ Entendimos por qué res.send() es más potente que res.end().
✅ Vimos cómo Express simplifica la estructura de nuestro proyecto.
✅ Aprendimos que Express nos permite centrarnos en la lógica de nuestra aplicación en lugar de en los detalles del protocolo HTTP.
En las próximas clases seguiremos profundizando en cómo Express maneja datos más complejos y cómo estructurar nuestra API profesionalmente.
*/
