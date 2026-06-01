import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(data));
}

const users = [
  {
    id: 1,
    name: "Helix_Guardi",
  },
  {
    id: 2,
    name: "Victor Hugo Guardiola",
  },
  {
    name: "MiduDev",
    id: "01e23d0b-39c3-4aa8-91da-4ef5626a66bf",
  },
  {
    name: "VayaMateo26",
    id: "67d59c9b-2c9a-437c-b09a-e92abb2704d2",
  },
  {
    name: "ElverGalarga",
    id: "16835690-d29a-4d09-8cc7-4737f79d258b",
  },
  {
    name: "pheralb",
    id: "ff115f15-ca43-4761-8182-507df653ed8f",
  },
];

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

    if (pathname === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
    }
  }

  if (method === "POST") {
    if (pathname === "/users") {
      const body = await json(req);

      if (!body || !body.name) {
        return sendJson(res, 400, { error: "Name is required!" });
      }

      const newUser = {
        name: body.name,
        id: randomUUID(),
      };

      users.push(newUser);

      return sendJson(res, 201, { message: "Usuario creado" });
    }
  }

  return sendJson(res, 404, { message: "Not Found" });
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});

/* INTRODUCCIÓN A EXPRESS: Qué es y para qué sirve */
/* 
Hasta ahora hemos estado trabajando con Node.js puro, sin ningún tipo de dependencias externas. Hemos creado pequeños programas de línea de comandos, utilidades para manejar archivos, obtener información del sistema y también un servidor HTTP completamente nativo usando el módulo node:http.

Ese servidor funcionaba correctamente: devolvía JSON, permitía hacer peticiones GET y POST, e incluso añadimos cosas como limit y offset. Todo estaba hecho con JavaScript puro y sin librerías externas.

Y eso está muy bien.

El problema del servidor nativo
El problema aparece cuando la API empieza a crecer.

Aunque el servidor nativo funciona, el código empieza a volverse:

Más difícil de entender.
Más repetitivo.
Más costoso de mantener.
Tenemos muchos if para comprobar el método HTTP, el pathname, gestionar manualmente las cabeceras, parsear la URL, manejar streams para leer el body y transformar los datos.

Todo esto hace que tengamos que escribir mucho más código del necesario para resolver problemas comunes.

Por qué introducir Express ahora
Hasta este punto, usar http nativo ha sido excelente para entender las bases de cómo funciona un servidor en Node.js. Pero cuando una API crece, esta aproximación empieza a ser un poco rollo.

Por eso, en este momento del curso, hacemos una introducción a Express.

Qué es Express
Express es un framework web minimalista y flexible para Node.js.

Y sí, es un framework. No es una opinión: ellos mismos lo definen así.

Es minimalista porque:

No te impone una estructura de carpetas.
No te obliga a seguir una arquitectura concreta.
Te da utilidades y tú decides cómo organizar tu proyecto.
Es flexible porque puedes hacer las cosas prácticamente como quieras.

Qué nos permite hacer Express
Express nos permite:

Definir rutas de forma mucho más expresiva.
Manejar peticiones y respuestas con más métodos y utilidades.
Usar middlewares para reutilizar lógica.
Gestionar errores de forma centralizada.
Crear APIs y aplicaciones web de forma más sencilla.
En resumen, nos da una capa de abstracción sobre el módulo http que nos ahorra muchísimo trabajo manual.

Por qué usar un framework
El servidor nativo no es malo, al contrario: funciona y es muy potente. Pero cuando el código crece, la complejidad también lo hace.

Express existe para resolver justo ese problema:

Reducir código repetido.
Mejorar la legibilidad.
Hacer que el código sea más fácil de mantener.
Y por eso es el framework más utilizado en el ecosistema Node.js.

Qué haremos a partir de ahora
A partir de este punto del curso empezaremos a usar Express para construir nuestras APIs. Aprovecharemos sus utilidades, su sistema de rutas y su forma de trabajar para dejar atrás gran parte del código manual que teníamos con http nativo.

Esto es solo la introducción. A partir de aquí empezamos a sacarle partido de verdad.
*/
