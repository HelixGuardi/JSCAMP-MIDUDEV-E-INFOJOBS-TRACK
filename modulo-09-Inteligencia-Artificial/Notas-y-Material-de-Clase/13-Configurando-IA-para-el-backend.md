# ⚙️ Configurando IA para el backend

En esta clase vamos a dar el siguiente paso importante: ****preparar nuestro backend para trabajar con inteligencia artificial****.

Aquí es donde empieza la parte interesante de verdad. Vamos a estructurar el proyecto y dejar todo listo para empezar a integrar modelos de IA.

## 🧱 Estructura del proyecto

Para trabajar de forma ordenada, utilizamos una arquitectura basada en ****workspaces****.

Esto nos permite tener:

-   Un ****frontend****
-   Un ****backend****

Todo dentro del mismo repositorio, pero bien separado.

Ejemplo de configuración en `package.json`:

```
{  "workspaces": [    "frontend",    "backend"  ]}
```

Esto facilita mucho el desarrollo porque:

-   Compartes dependencias si lo necesitas
-   Mantienes cada parte aislada
-   Puedes escalar mejor el proyecto

## 📜 Scripts para desarrollo

También configuramos scripts para ejecutar cada parte del proyecto de forma independiente.

```
"scripts": {  "dev:backend": "npm run watch --workspace=backend",  "dev:frontend": "npm run dev --workspace=frontend"}
```

Con esto conseguimos:

-   Ejecutar el backend en modo desarrollo
-   Ejecutar el frontend en paralelo
-   Tener un flujo de trabajo mucho más cómodo

👉 Esto es clave cuando empiezas a trabajar con IA, porque normalmente:

-   El backend se encarga de la lógica y llamadas a modelos
-   El frontend solo consume esa API

## 🧠 ¿Por qué necesitamos un backend para IA?

Aunque hoy en día hay modelos que funcionan en el navegador, en muchos casos el backend es necesario para:

-   🔐 Proteger claves de API
-   ⚡ Gestionar llamadas a modelos (OpenAI, etc.)
-   📦 Procesar datos antes de enviarlos al frontend
-   🔄 Controlar el flujo de la aplicación

El backend actúa como intermediario entre tu app y la IA.

## 🛠️ Preparando el backend

Dentro de la carpeta `backend`, normalmente tendrás:

-   Un servidor con Node.js
-   Rutas o endpoints
-   Lógica para interactuar con la IA

Por ejemplo:

```
backend/├── src/├── package.json├── .env
```

Aquí es donde más adelante:

-   Configuraremos la API de IA
-   Definiremos endpoints
-   Añadiremos lógica personalizada

## 🔄 Flujo completo

El flujo típico de una app con IA será:

1.  El usuario interactúa con el frontend
2.  El frontend hace una petición al backend
3.  El backend llama al modelo de IA
4.  El backend procesa la respuesta
5.  Devuelve el resultado al frontend

Simple en concepto, pero muy potente.

## ⚠️ Cosas importantes

-   Mantén separadas las responsabilidades (frontend vs backend)
-   Nunca expongas claves de API en el cliente
-   Usa scripts para automatizar el desarrollo
-   Organiza bien el proyecto desde el inicio

Esto te evitará muchos problemas más adelante.

## 🔜 Qué veremos en la siguiente clase

En la siguiente clase empezaremos a conectar todo esto con IA real:

-   Integración con APIs de modelos
-   Primer endpoint con IA
-   Uso de prompts
-   Primeros resultados reales

Aquí es donde tu backend empieza a “pensar”.

> 💡 ****Consejo****: Dedica tiempo a dejar bien montada la estructura del proyecto. Es aburrido ahora, pero te ahorra dolores de cabeza cuando la app crece.