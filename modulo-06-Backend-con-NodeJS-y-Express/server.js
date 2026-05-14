import { createServer } from "node:http";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

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

  return sendJson(res, 404, { message: "Not Found" });
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});
