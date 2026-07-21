// @ts-check
import { test, expect } from "@playwright/test";

// Esto seria cual seria la prioridad a la hora de intentar buscar elementos en la pagina:
// 1. lo más recomendable es usar Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS como último recurso

test("buscar empleos y aplicar a una oferta", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("React");

  await page.getByRole("button", { name: "Buscar" }).click();

  const jobCards = page.locator(".job-listing-card");

  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.first().locator("h3");
  //await expect(firstJobTitle).toHaveText(/React Developer/i) PUEDE SER CON REGEX
  await expect(firstJobTitle).toHaveText("Desarrollador de Software Senior"); // PUEDE SER CON CADENA DE TEXTO SI SABES EXACTAMENTE LO QUE SE TIENE QUE PONER

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

  page.getByRole("button", { name: "Aplicado" }).first();
});

/* ¿QUÉ ES UN TESTE E2E Y CÓMO MONTARLO CON Playwright? */
/* 
    Los tests E2E (end-to-end) son los que te aseguran que tu app funciona de punta a punta, como lo haría un usuario real.
    
    Antes de E2E: validaciones donde toca
      --> En frontend: son recomendables porque mejoran la experiencia - el usuario sabe antes qué está mal sin esperar al servidor
      --> En backend: son obligatorios - es donde garantizas que lo que entra es válido antes de guardarlo o procesarlo.

      Y si solo pudieras validar en un sitio: en backend, siempre.

      ¿Qué es un test E2E?
        Un test E2E simula el comportamiento de un usuario para comprobar el flujo completo:
          - que una página carga,
          - que al hacer clic ocurre lo esperado,
          - que una API responde,
          - que se renderiza el contenido correcto,
          - etc.
        Es decir, prueba el sistema “de extremo a extremo”.
      
      Herramienta: Playwright
      Para esto vamos a usar Playwright, una herramienta open source de Microsoft para automatizar navegadores.
      Lo interesante es que te permite:
        ejecutar tests E2E,
        controlar un navegador,
        incluso hacer scraping si lo necesitas.
      Y aunque existe en varios lenguajes, en Node.js es donde suele brillar más.
  */
