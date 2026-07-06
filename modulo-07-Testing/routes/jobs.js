import { Router } from "express";
import { JobController } from "../controllers/jobs.js";

export const jobsRouter = Router();

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getId);
jobsRouter.post("/", JobController.create);
jobsRouter.put("/:id", JobController.update);
jobsRouter.patch("/:id", JobController.partialUpdate);
jobsRouter.delete("/:id", JobController.delete);

// GET: sirve para recuperar o leer
// POST: sirve para crear nuevos recursos en el servidor
// PUT: Sirve para actualizar o reemplazar completamente
// PATCH: sirve para actualizar parcialmente
// DELETE: sirve para elimianr un recurso específico

// La IDEMPOTENCIA es una propiedad de ciertas operaciones que garantiza que ejecutarlas múltiples veces produce el mismo resultado final que ejecutarlas una sola vez. El estado del servidor no cambia adicionalmente después de la primera ejecución exitosa, independientemente de cuántas veces se repita la solicitud idéntica.d
