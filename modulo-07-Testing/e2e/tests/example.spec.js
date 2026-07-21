// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
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
