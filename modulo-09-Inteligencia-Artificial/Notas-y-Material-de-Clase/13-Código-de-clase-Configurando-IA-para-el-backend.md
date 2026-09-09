# ⚙️ Código de clase (configurando IA para el backend)

A seguir el código de clase:

import { Router } from "express";
import OpenAI from "openai";
import { JobModel } from "../models/job";


export const aiRouter = Router();


const openai = new OpenAI({
  apiKey: process.env.OPENAI\_API\_KEY,
});


aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);


  if (!job) {
    return res.status(400).json({ error: "Job not found" });
  }


  const systemPrompt = \`Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.\`


  const prompt = \[
    \`Resume en 4-6 frases la siguiente oferta de trabajo:\`,
    \`Incluye: rol, empresa, ubicación y requisitos clave\`,
    \`Usa un tono claro y directo en español\`,
    \`Titulo: ${job.titulo}\`,
    \`Empresa: ${job.empresa}\`,
    \`Ubicación: ${job.ubicacion}\`,
    \`Descripción: ${job.descripcion}\`,
  \].join("\\n");


  try {
    const completion = await openai.chat.completions.create({
      messages: \[
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          conten: prompt
        }
      \]
    })


    console.log('OpenAI response:', completion)
    const summary = completion.choices?.\[0\]?.message?.content?.trim()


    if(!summary) {
      return res.status(502).json({ error: 'No summary generated' })
    }


    return res.json({ summary })


  } catch () {
    return res.status(500).json({ error: 'Error generatin summary' })
  }
});

Importante recordar que antes de empezar a escribir código, hemos instalado en la consola, en la carpeta de backend la dependencia de \`openai\` que se realiza con: npm install openai