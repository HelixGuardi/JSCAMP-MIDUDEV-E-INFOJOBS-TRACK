# Aplicando el patrón MVC en nuestra API

En esta clase damos un paso de gigante en la organización del código. Hasta ahora, tener toda la lógica de la API en un solo archivo `index.js` nos ha servido para aprender, pero en un entorno profesional eso se traduce en un código inmanejable y difícil de testear.

La solución definitiva es aplicar el patrón **MVC (Modelo-Vista-Controlador)**.

---

# ¿Qué es el patrón MVC?

El MVC es un patrón de arquitectura que separa la aplicación en tres componentes con responsabilidades muy claras:

### Model (Modelo)

Se encarga de la lógica de datos, la comunicación con la base de datos o el sistema de archivos. No sabe nada de HTTP.

### View (Vista)

Es la representación de los datos. En una API REST, la "vista" es el objeto JSON que devolvemos al cliente.

### Controller (Controlador)

Es el intermediario. Recibe la petición del cliente, llama al modelo para obtener los datos y decide qué respuesta enviar.

---

# El problema del archivo único ("Spaghetti Code")

Cuando todo vive en un solo archivo:

- Las rutas están mezcladas con la lógica de negocio.
- El archivo crece exponencialmente con cada nuevo endpoint.
- Es imposible reutilizar lógica en diferentes partes de la app.

---

# Nueva estructura profesional

Para implementar MVC, organizamos nuestro proyecto en carpetas especializadas dentro de `src/`:

```text
src/
├── controllers/  # Lógica de los endpoints
├── routes/       # Definición de rutas
├── models/       # Gestión de datos
└── index.js      # Punto de entrada y configuración
```

---

# 1. Controllers: La lógica de la API

El controlador extrae los datos de la request (`params`, `query`, `body`) y gestiona la respuesta.

```js
// controllers/jobs.js
export const getJobs = (req, res) => {
  // Aquí llamaríamos al modelo para obtener los datos
  return res.json(jobs);
};

export const getJobById = (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === Number(id));

  if (!job) return res.status(404).json({ message: "No encontrado" });
  return res.json(job);
};
```

---

# 2. Routes: El mapa de navegación

Las rutas se encargan únicamente de asociar una URL y un método HTTP con su controlador correspondiente usando `express.Router()`.

```js
// routes/jobs.js
import { Router } from "express";
import { getJobs, getJobById } from "../controllers/jobs.js";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;
```

---

# 3. Model: La fuente de la verdad

El modelo es el único que sabe de dónde vienen los datos. Si mañana cambiamos de un array en memoria a una base de datos SQL, solo tendremos que modificar este archivo.

```js
// models/jobs.js
export const jobs = [
  { id: 1, title: "Frontend Developer" },
  { id: 2, title: "Backend Developer" },
];
```

---

# Conectando todo en el punto de entrada

Ahora, nuestro archivo principal `index.js` queda extremadamente limpio y fácil de leer:

```js
import express from "express";
import jobsRouter from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT ?? 1234;

app.use(express.json());

// Delegamos todas las rutas de /jobs al router correspondiente
app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
```

---

# Ventajas de usar MVC

### Mantenibilidad

Es fácil localizar dónde está un bug o dónde añadir una nueva funcionalidad.

### Escalabilidad

Podemos añadir decenas de recursos (`users`, `products`, `orders`) siguiendo el mismo patrón sin ensuciar el código existente.

### Separación de responsabilidades

El que maneja la ruta no tiene por qué saber cómo se guardan los datos.

---

# Lo que hemos aprendido

✅ Qué es el patrón MVC y cómo se adapta a una API REST.

✅ Cómo usar `express.Router()` para modularizar nuestra aplicación.

✅ La importancia de separar la lógica de negocio (**Controllers**) de la lógica de datos (**Models**).

✅ Cómo mantener un archivo principal limpio y organizado.

---

Con esta base arquitectónica, tu API ya tiene un nivel profesional y está lista para enfrentarse a retos más complejos en los siguientes módulos.
