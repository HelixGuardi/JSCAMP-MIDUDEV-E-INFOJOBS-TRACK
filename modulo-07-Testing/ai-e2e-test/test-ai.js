process.loadEnvFile(); // carga las variables de entorno del .env

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede buscar, aplicar y favoritar una oferta de trabajo", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "openai/gpt-5.4-mini",
    allowSystemInMessages: true,
  });

  try {
    await stagehand.init();

    const [page] = stagehand.context.pages();

    await page.goto("http://localhost:5173");

    await stagehand.act('Escribir "React" en la searchbox', { timeout: 30000 });

    await stagehand.act('Click en el botón de buscar "Buscar"');
    await stagehand.act('Click en el botón de iniciar sesión "Iniciar sesión"');
    await stagehand.act(
      'Click en el botón de aplicar "Aplicar" de la oferta "Desarrollador de Software Senior"',
    );
    await stagehand.act("Darle favorito a alguna oferta de trabajo");

    //Extraer la información
    const { extraction } = await stagehand.extract(
      "Obtén el subtotal de favoritos",
    );
    console.log("Subtotal extraído: ", extraction);

    assert.strictEqual(extraction, "1");
  } catch (error) {
    console.error("❌ Error en el test:", error);
    throw error;
  } finally {
    await stagehand.close();
  }
});

/*
 * Test de flujo completo de usuario:
 * 1. Buscar "React"
 * 2. Inicia Sesión
 * 3. Aplicar a oferta "Desarrollador de Software Senior"
 * 4. Dar favorito
 * 5. Extraer subtotal de favoritos (debe ser 1)
 *
 * Ejemplo de ejecución:
 * $ node test-ai.js
 * Subtotal extraído: 1
 * ✔ test passed
 
  Subtotal extraído:  1
  ✔ Un usuario puede buscar, aplicar y favoritar una oferta de trabajo (18191.7839ms)
  [2026-07-23 15:20:11.967 +0100] INFO: response
      category: "aisdk"
      response: {
        "object": {
          "progress": "Se extrajo el subtotal de favoritos: 1.",
          "completed": true
        },
        "usage": {
          "inputTokens": 218,
          "outputTokens": 25,
          "totalTokens": 243,
          "reasoningTokens": 0,
          "cachedInputTokens": 0
        },
        "finishReason": "stop"
      }
  [2026-07-23 15:20:11.967 +0100] INFO: Extraction completed successfully
      category: "extraction"
      prompt_tokens: "1886"
      completion_tokens: "38"
      inference_time_ms: "2241"
      result: "{\"extraction\":\"1\"}"
  ℹ tests 1
  ℹ suites 0
  ℹ pass 1
  ℹ fail 0
  ℹ cancelled 0
  ℹ skipped 0
  ℹ todo 0
  ℹ duration_ms 18258.9616
 */

/* También se pueden utilizar "Agentes", pero es algo más bestia y sale caro, así que ni lo testearé aqui porque no podré hacer nada con un plano gratis limitado del Modelo de la AI
    Aunque, a futuro, cuando tenga más tiempo y experiencia con AI, me dedicaré en conseguir operar buenos modelos de AI de forma gratis y eficiente para testeos y trabajo.
  */
