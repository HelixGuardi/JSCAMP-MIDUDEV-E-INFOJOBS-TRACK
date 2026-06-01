import express from "express";

const PORT = process.env.PORT || 1234;
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
