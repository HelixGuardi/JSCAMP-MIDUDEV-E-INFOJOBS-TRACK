import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(express.json());

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

// CRUD: Create, Read, Update, Delete

// Idempotente: porque el sistema queda igual si llamas varias veces
app.get("/jobs", async (req, res) => {
  const {
    text,
    title,
    level,
    limit = DEFAULTS.LIMIT_PAGINATION,
    technology,
    offset = DEFAULTS.LIMIT_OFFSET,
  } = req.query;

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

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(
    offsetNumber,
    offsetNumber + limitNumber,
  );

  return res.json(paginatedJobs);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
});

// NO es Idempotente
app.post("/jobs", (req, res) => {
  const { titulo, empresa, ubicacion, data } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    data,
  };

  jobs.push(newJob); // lo haremos en una base de datos con un INSERT

  return res.status(201).json(newJob);
});

// Reemplazar un recurso completo
app.put("/jobs/:id", (req, res) => {});

// Actualizar parcialmente un recurso
app.patch("/jobs/:id", (req, res) => {});

app.delete("/jobs/:id", (req, res) => {
  return res
    .status(403)
    .json({ error: "No tienes permisos para eliminar todos los trabajos" });
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
