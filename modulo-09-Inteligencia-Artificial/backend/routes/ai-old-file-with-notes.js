process.loadEnvFile();

import { Router } from "express";
/* import OpenAI from "openai"; */
import { streamText } from "ai";
import rateLimit from "express-rate-limit";

import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  limit: 5, // 5 peticiones por IP por minuto
  message: {
    error: "Demasiadas solicitudes, por favor intenta de nuevo más tarde",
  },
  legacyHeaders: false,
  standardHeaders: "draft-8", // devuelve headers estándard RateLimit-*
});

export const aiRouter = Router();
aiRouter.use(aiRateLimiter);

/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); */

aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(400).json({ error: "Job not found" });
  }

  /*  const systemPrompt = `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`; */

  const prompt = [
    `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`,
    `Resume en 4-6 frases la siguiente oferta de trabajo:`,
    `Incluye: rol, empresa, ubicación y requisitos clave`,
    `Usa un tono claro y directo en español`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`,
  ].join("\n");

  try {
    /* res.setHeader("Content-type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked"); */

    //esto se hace cuando queremos entregar la respuesta una vez esté lista:
    /* const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: CONFIG.MODEL_AI,
    }); */

    //esto se hace cuando queremos entregar la respuesta a la vez en que se genera (lo que tarda el mismo tiempo pero con la sensación de que es más rápido): streaming de datos:
    // const result = await openai.chat.completions.create({})
    const result = streamText({
      /* messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ], */
      prompt,
      model: "inclusionai/ling-3.0-flash-fin",
      /* stream: true, */
    });

    //esto lo hacemos cuando se hace "completion", es decir, esperar la respuesta hecha para poder entregarla:
    /* console.log("OpenAI response:", completion);
    const summary = completion.choices?.[0]?.message?.content?.trim(); */

    //esto lo hacemos cuando se quiere hacer "streaming", para entregar la respuesta a la vez en la que se hace:
    /* for await (const part of stream) {
      const content = part.choices[0].delta.content; // "delta" es la diferencia del contenido
      if (content) {
        res.write(content);
      }
    } */

    return result.pipeTextStreamToResponse(res);

    //si hacemos "streaming de datos" ya no tiene sentido utilizar esto:
    /* if (!summary) {
      return res.status(502).json({ error: "No summary generated" });
    } */

    //al hacer streaming de datos tampoco tiene sentido devolver un json:
    /* return res.json({ summary }); */

    /* return res.end(); */ // <-- la respuesta se completa cuando el stream termina
  } catch (_err) {
    /* return res.status(500).json({ error: "Error generatin summary" }); */
    /*
      aqui en el error, no está mal del todo pero puede darnos problemas. Imaginate que nos da un error, por lo que sea, a mitdad de la respuesta.
      El problema es que cuando tu devuelves una respuesta, las cabeceras solo las puedes enviar una vez, por lo tanto, si yo he enviado las cabeceras y
      luego intento enviar un status 500 (que lo que hace es cambiar la cabecera), se va a quejar y me va a dar un error que no gusta nada. Para solucionar
      eso, haremos:
    */
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: "Error generating summary" });
    }

    // y si ya se han empezado a enviar las cabeceras y no hay nada que hacer, simplemente cerramos la respuesta:
    return res.end();
  }
});
