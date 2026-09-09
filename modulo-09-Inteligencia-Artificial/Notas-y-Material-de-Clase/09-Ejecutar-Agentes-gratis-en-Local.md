# 🧠 Ejecutar Agentes gratis en local

En esta clase damos un paso ****muy práctico****: aprender a ejecutar ****agentes de código**** sin pagar suscripciones, sin enviar datos a la nube y ****ejecutándolo todo en tu propia máquina****.

La clave está en combinar ****modelos locales****, herramientas open source y un poco de configuración inicial.

## 🚀 ¿Por qué ejecutar agentes en local?

Ejecutar agentes de IA en local tiene ventajas muy claras:

-   ****Coste cero**** - no dependes de tokens ni suscripciones
-   ****Privacidad total**** - el código y los prompts no salen de tu ordenador
-   ****Control absoluto**** sobre modelos, versiones y rendimiento
-   Ideal para ****experimentos, aprendizaje y proyectos personales****

Eso sí, no todo el mundo puede hacerlo: dependerá de tu hardware.

## 🧩 Ollama: modelos locales en tu máquina

La base de todo es ****Ollama****, una herramienta que permite descargar y ejecutar modelos de lenguaje ****100% en local****.

Con Ollama puedes:

-   Instalar modelos con un solo comando
-   Ejecutarlos directamente desde terminal o desde otras herramientas
-   Elegir modelos según tu RAM y GPU disponibles

Ejemplo de uso típico:

-   Instalación de Ollama
-   Descarga de un modelo como ****GLM 4.7 Flash****
-   Ejecución directa del modelo desde local

Este tipo de modelos funcionan especialmente bien en equipos con ****32 GB o más de RAM****, como Mac Mini o Mac Studio.

## ⚙️ Cloud Code con modelos locales

Una vez tienes el modelo instalado en Ollama, puedes usarlo para ejecutar ****Cloud Code**** sin depender de la nube.

El flujo es sencillo:

1.  Instalas el modelo en Ollama
2.  Lanzas Cloud Code indicando ese modelo
3.  El agente se ejecuta usando tu GPU o CPU local

Esto permite trabajar con agentes de código reales, pero sin pagar nada.

## 🔁 Open Code: alternativa open source

Si no quieres usar Cloud Code, existe una alternativa muy potente:

### 🧪 Open Code

Open Code es una herramienta ****open source**** que permite trabajar con agentes de código y múltiples modelos:

-   Interfaz más visual y cuidada
-   Soporte para modelos locales y remotos
-   Instalación con un solo comando
-   Compatible con Ollama

Además, incluye acceso a modelos ****gratuitos**** (con límites razonables), ideales para pruebas y aprendizaje.

## 🔗 Conectar cuentas externas

Open Code también permite conectar cuentas externas si lo deseas:

-   Anthropic
-   GitHub Copilot
-   OpenAI
-   Google

Esto te da acceso a modelos como:

-   Claude Opus
-   GPT-5.2 Codex
-   Modelos Gemini

Y lo mejor: ****puedes mezclar modelos locales y en la nube**** según lo que necesites.

## 🖥️ Requisitos y limitaciones

Antes de lanzarte, ten en cuenta:

-   Los modelos locales ****consumen mucha GPU****
-   Mientras ejecutas agentes, el rendimiento del sistema puede bajar
-   No todos los modelos funcionan bien en cualquier máquina
-   Es normal que algunos procesos “peten” si vas justo de recursos

Cada ordenador es un mundo. Lo importante es ****probar y ajustar****.

## 🎯 Resumen rápido

Sí, ****se pueden ejecutar agentes gratis****. No es magia, no es trivial, pero es totalmente posible.

Con:

-   Ollama
-   Modelos locales bien elegidos
-   Open Code o Cloud Code

Puedes montar un entorno de agentes potente, privado y sin coste.

> 💡 ****Tip****: empieza con modelos pequeños y ve subiendo. La mejor forma de aprender cómo rinde tu máquina es probar… y cuando explote, aprender por qué.