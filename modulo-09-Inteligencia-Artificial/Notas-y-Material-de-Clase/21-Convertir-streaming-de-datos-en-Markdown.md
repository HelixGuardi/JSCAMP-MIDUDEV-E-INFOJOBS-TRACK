# 📚 Convertir streaming de datos en Markdown

En esta clase vamos a dar un paso más allá en la integración de IA en nuestras aplicaciones.

Ya no solo queremos respuestas… queremos ****procesarlas en tiempo real****.

Y aquí entra en juego algo clave: ****el streaming de datos convertido a Markdown****.

## 🚀 ¿Qué problema estamos resolviendo?

Cuando trabajamos con modelos de IA:

-   La respuesta puede ser larga
-   Puede tardar en generarse
-   Y queremos mostrarla ****poco a poco**** en la UI

El problema es que:

👉 El modelo devuelve texto plano en streaming  
👉 Pero nuestra interfaz necesita ****Markdown renderizable****

Así que necesitamos:

****Transformar el stream en contenido Markdown válido en tiempo real****

## 🧠 ¿Qué es el streaming en este contexto?

En lugar de esperar a que el modelo termine toda la respuesta:

-   Recibimos ****chunks de texto progresivamente****
-   Los enviamos al cliente mientras se generan
-   Mejoramos muchísimo la experiencia de usuario

Ejemplo mental:

```
Antes:Esperas 5 segundos → aparece todoAhora:Aparece palabra a palabra como ChatGPT
```

## 🛠️ Cómo generar el streaming desde el backend

En el backend estamos usando algo como:

```
const result = streamText({  prompt,  model: 'mistral/devstral-small-2'})
```

Esto nos devuelve un stream de texto, no un string completo.

Y lo importante:

👉 No lo convertimos a JSON  
👉 Lo enviamos directamente como stream

```
return result.pipeTextStreamToResponse(res)
```

Esto permite que el cliente reciba datos en tiempo real.

## 🔄 ¿Dónde entra Markdown?

El modelo normalmente genera contenido estructurado como:

-   Listas
-   Títulos
-   Código
-   Texto enriquecido

Ejemplo:

**`**## Título**`**`- Punto 1- Punto 2`Copiar

Pero al llegar en streaming:

-   ❌ Puede llegar cortado
-   ❌ Puede romper el formato
-   ❌ Puede no ser válido hasta que termina

## ⚠️ Problema clave: Markdown incompleto

Cuando haces streaming:

-   Puedes recibir algo como `## Títu`
-   O una lista a medias
-   O un bloque de código sin cerrar

👉 Esto rompe el renderizado si no lo gestionas bien

## 💡 Estrategia: procesar el stream progresivamente

Hay varias formas de solucionarlo, pero la idea base es:

-   Ir acumulando el texto recibido
-   Re-renderizar el Markdown continuamente
-   Tolerar estados intermedios “rotos”

En frontend normalmente:

```
let content = ''onChunk((chunk) => {  content += chunk  renderMarkdown(content)})
```

## 🧪 Mejora importante: UX suave

Para que esto se sienta bien:

-   Renderiza en cada chunk
-   Usa un parser tolerante a errores
-   Evita parpadeos o reflows bruscos

Opciones típicas:

-   `react-markdown`
-   `marked`
-   `mdx`

## 🎯 ¿Por qué es importante esto?

Porque es la base de experiencias modernas como:

-   Chatbots tipo ChatGPT
-   Documentación generada en vivo
-   Interfaces de IA en tiempo real
-   Editores inteligentes

Sin streaming:

👉 Tu app se siente lenta  
👉 Pierdes interacción  
👉 No es “wow”

Con streaming:

👉 Todo fluye  
👉 Parece magia  
👉 El usuario se engancha

## 🔥 Bonus: prompts pensados para Markdown

En el vídeo se ve cómo el prompt ya está diseñado para devolver Markdown:

```
Resume en 4-6 frases la siguiente oferta de trabajo:Incluye rol, empresa, ubicación y requisitos claveUsa un tono claro y directo en españolTítulo: ${job.titulo}Empresa: ${job.empresa}Ubicación: ${job.ubicacion}Descripción: ${job.descripcion}
```

👉 Esto es clave: forzar al modelo a devolver estructura

## ⚠️ Cosas a tener en cuenta

-   El Markdown puede llegar incompleto
-   No todos los modelos respetan bien el formato
-   El renderizado en tiempo real puede ser costoso
-   Hay que manejar errores de streaming

Y muy importante:

👉 Siempre controlar si la respuesta falla

```
catch (error) {  res.status(500).json({ error: 'Error generating summary' })}
```

## 🧩 Resumen

En esta clase has aprendido:

-   Qué es el streaming en IA
-   Cómo enviarlo desde el backend
-   Cómo procesarlo en frontend
-   Cómo renderizar Markdown en tiempo real
-   Qué problemas puedes encontrarte

## 🔜 Qué veremos en la siguiente clase

En la siguiente clase seguiremos mejorando esta experiencia:

-   Manejo avanzado del streaming
-   Mejora del renderizado
-   Interfaz más interactiva
-   Integración con inputs del usuario

Aquí es donde empiezas a construir apps de IA que realmente se sienten modernas.

> 💡 ****Consejo****: Si tu app con IA no usa streaming… estás perdiendo el 80% de la magia.

[← AnteriorUtilizar cualquier modelo - Cómo elegir y cambiar modelos de IA](https://www.jscamp.dev/inteligencia-artificial/utilizar-cualquier-modelo)