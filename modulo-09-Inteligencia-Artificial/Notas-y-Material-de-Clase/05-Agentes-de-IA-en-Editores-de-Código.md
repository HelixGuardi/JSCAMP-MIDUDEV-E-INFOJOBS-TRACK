# 🤖 Agentes de IA en Editores de Código

En esta clase damos un paso clave en el uso práctico de la ****Inteligencia Artificial para desarrolladores****: pasamos de usar modelos de lenguaje de forma reactiva a trabajar con ****agentes de IA autónomos**** dentro de nuestros editores de código.

Aquí es donde la IA deja de ser solo un chatbot y empieza a ****actuar sobre tu proyecto****.

## 🧠 LLM vs Agente: la diferencia clave

Un ****LLM por sí solo**** es reactivo:

-   Le envías un mensaje
-   Te devuelve una respuesta
-   Y ahí termina todo

Un ****agente****, en cambio:

-   Usa un LLM como cerebro
-   Tiene ****herramientas (tools)****
-   Funciona en ****bucle****
-   Decide, observa y repite hasta completar una tarea

Dicho de forma simple:

> El LLM piensa. El agente actúa.

## 🔁 Cómo funciona un agente de IA

Un agente combina tres piezas fundamentales:

-   ****Modelo (LLM)**** Decide qué hacer en cada paso.
-   ****Herramientas (tools)**** Leer archivos, editar código, ejecutar comandos, interactuar con la terminal.
-   ****Bucle de ejecución**** No se detiene hasta que la tarea está completada.

Gracias a esto, un agente puede:

-   Crear una API completa
-   Ejecutar el servidor
-   Detectar errores
-   Corregirlos
-   Y solo entonces darte la respuesta final

Todo de forma autónoma

## 🧑‍💻 Agentes en editores de código

Los agentes no dependen de un editor concreto. Lo que aprendes aquí se puede aplicar en:

-   Visual Studio Code
-   Cursor
-   Cloud Code
-   Otros editores compatibles

La experiencia es muy similar:

-   Agentes para preguntar
-   Agentes para planificar
-   Agentes para editar
-   Agentes personalizados según tus necesidades

## 🧩 Tipos de agentes

Algunos ejemplos prácticos que hemos visto:

### 🔹 Agente de planificación

Antes de escribir código:

-   Analiza el proyecto
-   Decide los pasos necesarios
-   Puede crear subagentes especializados
-   Genera un plan editable antes de implementar

Ideal para tareas grandes o complejas.

### 🔹 Agentes especializados

Puedes crear tus propios agentes para:

-   Seguridad
-   Rendimiento
-   Revisión de APIs
-   Convenciones internas de tu empresa

Incluso puedes definir:

-   Cuándo se activan
-   Qué tipo de problemas detectan
-   Cómo deben responder

## 💸 Costes y contexto: lo que debes tener en cuenta

Cada archivo que un agente lee:

-   Se añade al contexto
-   Aumenta el coste

Por eso:

-   Planificar puede ser caro
-   Pero ahorra tiempo y errores en tareas grandes
-   Una buena estrategia es planificar con un modelo potente y ejecutar con uno más barato

## 🎯 Buenas prácticas al usar agentes

-   Planifica antes de implementar
-   Revisa el plan generado por el agente
-   Ajusta lo que no encaje
-   No hagas “vibe coding” sin control
-   Usa agentes como asistentes, no como sustitutos del criterio técnico

## 🔮 Hacia dónde vamos

Los agentes de IA representan un cambio importante en cómo programamos:

-   Menos tareas repetitivas
-   Más foco en decisiones de alto nivel
-   Automatización real dentro del editor

La IA no escribe código por ti. Te da ****más brazos**** para ejecutar lo que tú decides.

En la siguiente clase empezaremos a ****crear y afinar agentes propios**** para integrarlos en proyectos reales.

> 💡 ****Tip****: Para tareas grandes o críticas, planifica primero. Un buen plan revisado por ti vale más que mil líneas de código generadas a ciegas.