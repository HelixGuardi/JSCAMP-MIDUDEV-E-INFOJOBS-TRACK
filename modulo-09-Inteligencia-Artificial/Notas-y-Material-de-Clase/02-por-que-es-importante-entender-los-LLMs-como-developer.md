# 🧠 Por qué es importante entender los LLMs como developer

En esta clase damos un paso más allá de ****usar ChatGPT para que nos dé respuestas****. Como desarrolladores, necesitamos entender ****qué está pasando realmente por debajo****, cuáles son sus límites y cómo usar estos modelos de forma segura y efectiva en productos reales.

La IA no es magia. Y entender eso marca la diferencia entre usarla bien… o meterla en producción y cruzar los dedos.

## 🤖 Qué es realmente un LLM

Un ****Large Language Model (LLM)**** no razona ni entiende el mundo como una persona. Lo que hace es:

-   ****Predecir el siguiente token**** en función del contexto
-   Trabajar de forma ****probabilística****
-   Depender completamente de la información que le pasamos

Esto explica problemas comunes como:

-   Alucinaciones
-   Falta de razonamiento real
-   Respuestas incorrectas pero bien redactadas
-   Dependencia extrema del contexto

## 🧩 El contexto lo es todo

Uno de los conceptos más importantes que debes conocer es la ****Context Window****.

La ventana de contexto define:

-   Cuánta información puede “recordar” el modelo
-   El límite de tokens que puedes enviar en una conversación
-   Por qué no puedes pasarle datos infinitos

Cada modelo tiene límites distintos: 32k, 64k, 190k tokens…

👉 ****La calidad del contexto determina la calidad de la respuesta**** Basura entra, basura sale.

## 🧠 Tokens y límites reales

Los tokens no son palabras exactas, sino fragmentos de texto. Eso significa que:

-   El contexto es finito
-   Hay que priorizar la información importante
-   Enviar historiales enormes puede empeorar la respuesta

Como developers, debemos pensar el prompt como:

> “Qué parámetros le estoy pasando a esta función”

## 🛠️ OpenAI Playground y modelos

Desde la plataforma de OpenAI puedes:

-   Probar distintos modelos
-   Comparar versiones
-   Ver límites de contexto
-   Trabajar con texto, imágenes, audio y asistentes

Normalmente, el modelo marcado como `latest` suele ser el más recomendable para empezar.

## ⚙️ System Prompt o System Message

Aquí entra uno de los conceptos ****más importantes de todo el módulo****.

El ****System Prompt**** define:

-   Cómo debe comportarse el modelo
-   Qué puede y qué no puede responder
-   El tono, estilo y restricciones globales

Es el “contrato” que gobierna toda la conversación.

Ejemplos de uso:

-   Limitar el dominio de respuestas
-   Forzar un comportamiento concreto
-   Proteger tu aplicación de usos indebidos

## 🔐 Seguridad y Prompt Injection

Cuando expones un LLM en una app real, aparecen ataques comunes como:

-   Intentar ignorar el system prompt
-   Pedir que se sobreescriban instrucciones
-   Usar ingeniería social para saltarse restricciones

Aunque los modelos han mejorado mucho, ****ninguno es 100% seguro****.

Por eso:

-   Nunca confíes solo en el modelo
-   Añade validaciones externas
-   Limita claramente el contexto permitido
-   Diseña prompts defensivos

## 🎯 Por qué esto importa de verdad

Entender estos conceptos te permite:

-   Construir chatbots más seguros
-   Evitar fugas de información
-   Controlar el comportamiento del modelo
-   Diseñar mejores experiencias de usuario
-   Usar IA en producción con criterio

La IA es una herramienta brutal, pero ****mal usada puede ser un problema serio****.

> 💡 ****Tip****: Trata a un LLM como una función probabilística con memoria limitada, no como una mente inteligente. Ese cambio mental te hará escribir mejores prompts y mejores aplicaciones.