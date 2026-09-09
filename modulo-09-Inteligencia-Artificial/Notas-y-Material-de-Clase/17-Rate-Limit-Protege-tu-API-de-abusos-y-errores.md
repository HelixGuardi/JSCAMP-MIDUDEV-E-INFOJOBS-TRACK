# 🚦 Rate Limit - Protege tu API de abusos y errores

En esta clase vamos a hablar de un concepto fundamental cuando trabajas con APIs, especialmente con ****modelos de Inteligencia Artificial****:

👉 El ****Rate Limit****

Si no entiendes esto bien, te vas a encontrar con errores raros, bloqueos inesperados y facturas que no te van a gustar nada.

## 🤔 ¿Qué es el Rate Limit?

El ****rate limit**** es una restricción que pone una API para limitar cuántas peticiones puedes hacer en un periodo de tiempo.

Por ejemplo:

-   10 requests por segundo
-   100 requests por minuto
-   10.000 requests por día

Esto lo hacen las APIs para:

-   Evitar abusos
-   Proteger sus servidores
-   Controlar costes
-   Garantizar estabilidad para todos los usuarios

## ⚠️ El error típico: Rate Limit Exceeded

Cuando superas ese límite, la API te devuelve un error.

Normalmente algo como:

-   `429 Too Many Requests`

Esto significa:

👉 “Te has pasado. Espera un poco antes de seguir.”

Y aquí es donde mucha gente se rompe la cabeza.

## 💥 ¿Por qué es especialmente importante en IA?

Cuando trabajas con APIs como OpenAI o similares:

-   Cada request cuesta dinero
-   Los modelos tienen límites estrictos
-   Puedes hacer muchas peticiones sin darte cuenta (loops, bugs, etc.)

Un mal control del rate limit puede provocar:

-   Errores en producción
-   UX horrible
-   Costes innecesarios
-   Bloqueo temporal de tu API key

## 🧠 Cómo gestionar correctamente el Rate Limit

Hay varias estrategias clave:

### 1\. 🕐 Retries con delay

Si falla una petición por rate limit:

-   Esperas un poco
-   Lo vuelves a intentar

Ejemplo mental:

```
Falla → esperar 1s → reintentar
```

### 2\. 📈 Backoff exponencial

En lugar de esperar siempre lo mismo:

-   1 intento → esperar 1s
-   2 intento → esperar 2s
-   3 intento → esperar 4s

Así reduces presión sobre la API.

### 3\. 🧱 Cola de peticiones (queue)

En vez de disparar todo a la vez:

-   Metes las peticiones en una cola
-   Las ejecutas poco a poco

Esto es clave en apps reales.

### 4\. 🚫 Evitar peticiones innecesarias

Parece obvio, pero no lo es:

-   Evita loops infinitos
-   Cachea respuestas
-   No hagas requests duplicadas

Cada request cuenta.

## 🛠️ Ejemplo mental típico

Imagina que tienes un chat con IA:

-   Usuario escribe rápido
-   Tu app manda 10 requests seguidas

👉 Boom. Rate limit.

Solución:

-   Debounce en frontend
-   Cola en backend
-   Control de frecuencia

## 🧪 Buenas prácticas

-   Controla errores 429 siempre
-   Añade logs para detectar abusos
-   Usa cache cuando puedas
-   Limita acciones del usuario si hace falta
-   Monitoriza uso de la API

## ⚠️ Cosas importantes a tener en cuenta

-   No todas las APIs tienen los mismos límites
-   Los límites pueden cambiar según el plan
-   A veces el rate limit es por usuario, otras global
-   No es un bug, es una protección

## 🎯 Resumen

El rate limit no es un problema.

👉 Es una señal de que estás haciendo demasiadas peticiones.

Si lo gestionas bien:

-   Tu app será más estable
-   Evitarás errores
-   Reducirás costes
-   Escalarás mejor

## 🔜 Qué veremos en la siguiente clase

Ahora que entiendes el rate limit, en la siguiente clase empezaremos a construir algo más real:

-   Conectar con APIs de IA
-   Crear un backend en Node.js
-   Manejar errores correctamente
-   Implementar streaming de respuestas
-   Y empezar a construir aplicaciones reales con IA

Aquí es donde empieza lo interesante de verdad 🚀

> 💡 ****Consejo****: Si alguna vez ves un error 429, no entres en pánico. No es que esté roto… es que estás yendo demasiado rápido.