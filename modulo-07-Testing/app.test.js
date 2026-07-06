import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

// Antes de todos los tesets, se ejectua UNA vez, para levantar el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

// Después de todos los tesets, se ejecuta UNA vez, para cerrar el servidor
after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe("GET /jobs", () => {
  // GET job array (200)
  test("debe responder con 200 y un array de trabajos", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });

  // GET filtered jobs (200)
  test("debe filtrar trabajos por tecnología", async () => {
    const tech = "react";
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
    assert.strictEqual(response.status, 200);

    const json = await response.json();
    console.log(json);
    assert.ok(
      json.data.every((job) => job.data.technology.includes(tech)),
      `Todos los trabajos deben incluir la tecnologia ${tech}`,
    );
  });

  // POST new job (201)
  test("debe crear una nueva oferta de trabajo", async () => {
    const newJob = {
      titulo: "Testing de creación de nuevo empleo TITULO",
      empresa: "Bruno Testing API",
      ubicacion: "Remoto",
      descripcion:
        "Esta seria la descripcion de la oferta de trabajo que va tal como: Buscamos un ingeniero de software con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación",
      data: {
        technology: ["react", "node", "javascript"],
        modalidad: "remoto",
        nivel: "junior",
      },
      content: {
        description:
          "Tech Solutions Inc. está buscando un Ingeniero de Software Senior altamente motivado y experimentado para unirse a nuestro equipo remoto. El candidato ideal tendrá una sólida formación en desarrollo de software, con experiencia en el diseño, desarrollo e implementación de soluciones de software escalables y de alto rendimiento. Como Ingeniero de Software Senior, usted será responsable de liderar proyectos de desarrollo, mentorizar a ingenieros junior y colaborar con equipos multifuncionales para entregar productos de software de alta calidad.",
        responsibilities:
          "- Diseñar, desarrollar y mantener aplicaciones web utilizando tecnologías modernas. Colaborar con equipos de producto y diseño para definir y entregar nuevas características. Escribir código limpio, eficiente y bien documentado.",
        requirements: "- Licenciatura en Informática o campo relacionado.",
        about:
          "Tech Solutions Inc. es una empresa de tecnología innovadora que se centra en la creación de soluciones de software de vanguardia para diversas industrias. Estamos comprometidos con el fomento de un entorno de trabajo colaborativo e inclusivo donde cada empleado pueda prosperar y crecer profesionalmente. Ofrecemos salarios competitivos, beneficios integrales y oportunidades de desarrollo profesional continuo.",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    assert.strictEqual(response.status, 201, "El status debe ser 201 Created");

    const json = await response.json();
    console.log(json);
  });
});
