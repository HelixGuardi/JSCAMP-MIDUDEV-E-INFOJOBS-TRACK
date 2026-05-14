/* El módulo nativo node:http */
/* 
    Node.js trae de serie todo lo necesario para montar un servidor. No necesitas instalar nada externo para empezar, ya que Node:

      - Tiene módulos nativos para comunicaciones.
      - Tiene acceso directo a la red.
      - Puede levantar servidores HTTP de forma eficiente.

      Para empezar, usaremos el módulo node:http, que es la base de prácticamente todos los frameworks web en el ecosistema de Node.js.
  */
import { createServer } from "node:http";

/* 
  Un servidor HTTP en Node.js se basa en un ciclo de petición (Request) y respuesta (Response).
  Para crear uno, utilizamos el método createServer. Este método recibe una función (callback) que se ejecutará cada vez que el servidor reciba una petición.

  La función que pasamos a createServer recibe dos objetos fundamentales:
    - req (Request): Contiene toda la información de la petición que hace el cliente (la URL, el método HTTP, las cabeceras, etc.).
    - res (Response): Es el objeto que usamos para enviarle la respuesta al cliente.
*/

/* 
Para simplificar la acción de enviar un JSON, y no tener que estar escribiendo siempre:
  if (req.url === "/users") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(JSON.stringify([{ id: 1, name: "Helix_Guardi" }]));
  }

Haremos:
*/

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Hola desde Node!🦖");
  }

  if (req.url === "/users") {
    return sendJson(res, 200, [
      { id: 1, name: "Helix_Guardi" },
      { id: 2, name: "Victor Hugo Guardiola" },
    ]);
  }

  // la ruta /health se utiliza para comprobar la API y asegurar de que va todo bien
  if (req.url === "/health") {
    return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
  }

  //Al envés de devolver el 404 así:
  /* res.statusCode = 404;
  return res.end("Not Found"); */

  //Lo haremos utilizando la misma función de sendJson:
  return sendJson(res, 404, { message: "Not Found" });
});

/* 
  Una vez definido el servidor, tenemos que decirle que “escuche” en un puerto específico de nuestra máquina para poder recibir tráfico.

  const port = 0;
  server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
  });

  Con el puerto en 0 y utilizando el address, se asigna el primer puerto que se encuentre disponible.

  Sin embargo, lo correcto es utilizar una variable de entorno.
*/

process.loadEnvFile(); // read automatically .env y poner en el process.env todas las variables de entorno
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});

/* 
Un error común al empezar es olvidar finalizar la respuesta. Si el servidor recibe la petición pero nunca llama a res.end(), 
el navegador se quedará cargando indefinidamente (en estado pending) esperando a que el servidor cierre la conexión.
*/

/* 
Si intentas enviar caracteres especiales (como acentos o emojis) y no configuras correctamente el servidor, el navegador podría mostrarlos mal. 
Esto sucede porque el navegador no sabe qué tipo de contenido está recibiendo ni qué codificación usa. Podemos solucionar esto enviando una cabecera HTTP:

  const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('¡Hola Mundo! 🚀 Aquí tienes un servidor con tildes.')
})

*/

/* 
Por defecto, cuando haces un cambio en tu archivo de Node.js, tienes que:
  - Parar el proceso actual (Ctrl + C).
  - Volver a ejecutar node servidor.js.
Esto es muy tedioso. Afortunadamente, las versiones recientes de Node.js (v18.11+) incluyen un modo watch nativo.

Para usarlo, simplemente añade el flag --watch:
  --> node --watch servidor.js
Ahora, cada vez que guardes el archivo, Node.js reiniciará el servidor automáticamente. ¡Mucho más productivo!
*/
