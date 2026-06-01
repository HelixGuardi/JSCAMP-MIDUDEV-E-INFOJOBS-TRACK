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
