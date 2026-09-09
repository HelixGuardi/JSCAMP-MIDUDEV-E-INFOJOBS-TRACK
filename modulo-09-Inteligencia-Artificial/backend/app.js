import express from "express";
import { jobsRouter } from "./routes/jobs.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { DEFAULTS } from "./config.js";
import { aiRouter } from "./routes/ai.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.set("trust proxy", 1); // Si estás detrás de un proxy, como Nginx, Heroku, Cloudflare, Vercel... esto es importante para que el rate limiter funcione correctamente con la IP del cliente real.

app.use(corsMiddleware());
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

app.use("/jobs", jobsRouter);
app.use("/ai", aiRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
