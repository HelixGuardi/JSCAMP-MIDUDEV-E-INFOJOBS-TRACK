# 🤖 ¿Qué es la Inteligencia Artificial?

Antes de empezar a usar IA en nuestras aplicaciones, hay algo fundamental: ****entender de qué estamos hablando realmente cuando decimos “IA”****.

Porque hoy en día la Inteligencia Artificial está en todas partes, pero no siempre se explica bien qué hay debajo del capó. En esta primera clase vamos a sentar las bases para que dejes de usar IA como una caja negra y empieces a usarla con criterio.

## 🧠 Cuando hoy decimos IA, en realidad decimos LLM

Actualmente, cuando hablamos de Inteligencia Artificial en desarrollo de software, ****casi siempre estamos hablando de LLM****.

Los ****LLM (Large Language Models)**** son modelos de lenguaje de gran tamaño entrenados para trabajar con texto, código e instrucciones.

Modelos como GPT, Claude, DeepSeek, GLM o LLaMA entran en esta categoría.

Aunque los llamemos “inteligentes”, es importante tener clara una cosa desde el principio:

> Los LLM ****no piensan ni entienden como un humano****. Simulan ese comportamiento calculando probabilidades.

## 🔢 Cómo funciona realmente un LLM

Un LLM puede entenderse como una ****función gigantesca****:

-   Le pasas un ****contexto****
-   Devuelve el ****siguiente token más probable****

Y repite este proceso ****token a token**** hasta construir una respuesta completa.

Es una simplificación, pero es clave entenderlo así: no hay pensamiento, hay ****predicción estadística**** extremadamente bien afinada.

Eso sí, lo hacen tan bien que el resultado parece inteligente. Y ahí está la magia… y también el riesgo de malinterpretarlo.

## 🏗️ Las 3 fases de entrenamiento de un modelo

Todos los grandes modelos de lenguaje pasan, de forma simplificada, por ****tres fases fundamentales****.

### 1\. Preentrenamiento

Es la fase más costosa y pesada.

Aquí el modelo se entrena con ****cantidades masivas de datos****:

-   Texto de internet
-   Libros
-   Wikipedia
-   Documentación
-   Código (GitHub, por ejemplo)

El objetivo es aprender:

-   Patrones del lenguaje
-   Gramática
-   Estructura
-   Código
-   Razonamiento básico

Todo a base de ****predecir la siguiente palabra millones y millones de veces****.

Aquí es donde literalmente ****arden las GPUs****.

### 2\. Fine-tuning (ajuste fino)

Después del preentrenamiento, el modelo sabe mucho… pero ****no sabe conversar bien****.

En esta fase se ajusta el modelo para:

-   Seguir instrucciones
-   Mantener conversaciones coherentes
-   Responder en formato pregunta-respuesta
-   Actuar como un asistente útil

Aquí es donde el modelo empieza a parecer “usable” para humanos.

### 3\. Aprendizaje por refuerzo con feedback

La última fase consiste en refinar el comportamiento del modelo.

Tradicionalmente se hace con ****feedback humano****, aunque cada vez más se usan otros modelos de IA dentro de este proceso.

El objetivo es:

-   Mejorar la utilidad de las respuestas
-   Evitar contenido dañino
-   Ajustar tono y estructura
-   Comparar respuestas y elegir las mejores

Esta fase no hace al modelo más sabio, pero sí ****más educado y más útil****.

## 🎛️ Qué son los parámetros y por qué importan

Seguro que has visto modelos descritos como:

-   7B
-   20B
-   30B
-   120B

Ese número indica la ****cantidad de parámetros**** del modelo.

Una forma intuitiva de verlo:

-   Un modelo es como una máquina llena de ****diales****
-   Cada dial es un parámetro
-   Durante el entrenamiento, esos diales se ajustan millones de veces

Cuantos más parámetros:

-   Más capacidad tiene el modelo
-   Más caro es entrenarlo
-   Más recursos necesita para ejecutarse

Pero más grande ****no siempre significa mejor****: modelos más pequeños pueden ser más rápidos, más baratos y sorprendentemente efectivos dependiendo del caso de uso.

## ⚠️ Ideas clave para no caer en trampas mentales

Antes de seguir con el módulo, quédate con estas ideas:

-   Los LLM no razonan como humanos
-   Funcionan por probabilidad, no por conocimiento real
-   No “saben” si algo es verdad, solo si es probable
-   El contexto lo es todo
-   Entender cómo funcionan te hace mejor desarrollador, no peor usuario

## 🚀 A partir de aquí, sí: a programar

Esta base teórica es imprescindible para todo lo que viene después:

-   Integrar IA en aplicaciones reales
-   Usar APIs de modelos de lenguaje
-   Diseñar prompts con sentido
-   Optimizar costes y rendimiento
-   Evitar errores conceptuales muy comunes

En la siguiente clase empezaremos a ****usar IA de verdad****, pero ahora ya sabes qué estás usando y por qué funciona como funciona.

> 💡 ****Tip****: Si alguna vez dudas de una respuesta de la IA, recuerda esto: no te está diciendo lo que sabe, te está diciendo lo que ****parece más probable****.