# 📚 Cargar ruta al backend - Conectando IA con tu servidor

En esta clase damos un paso clave: ****llevar la inteligencia artificial al backend****.

Hasta ahora hemos visto conceptos, pero aquí empezamos a construir algo real: 👉 una ****ruta en el servidor**** que usa IA para procesar información.

Esto es lo que convierte un experimento en un ****producto de verdad****.

## 🚀 ¿Qué vamos a hacer?

Vamos a crear una ruta en nuestro backend que:

-   Recibe un identificador
-   Busca información (por ejemplo, una oferta de trabajo)
-   Usa IA para procesarla
-   Devuelve un resultado ya transformado (por ejemplo, un resumen)

En otras palabras: 👉 ****convertimos datos en información útil usando IA****

## 🧱 Estructura del backend

Estamos trabajando con una estructura típica de Node.js:

-   `routes/` → donde definimos las rutas
-   `controllers/` → lógica de negocio
-   `models/` → acceso a datos
-   `middlewares/` → lógica intermedia

En este caso, creamos una ruta específica para IA:

```
export const aiRouter = Router()
```

Esto nos permite separar responsabilidades y mantener el código limpio.

## 🔌 Configurando OpenAI

Inicializamos el cliente de OpenAI usando una API Key:

```
const openai = new OpenAI({  apiKey: process.env.OPENAI_API_KEY})
```

⚠️ ****Importante****:

-   Nunca hardcodear la API key
-   Usar variables de entorno

## 🧠 Creando la ruta

Definimos una ruta que recibe un `id`:

```
aiRouter.get('/summary/:id', async (req, res) => {
```

### Paso a paso:

Obtenemos el parámetro:

```
const { id } = req.params
```

Buscamos el dato en la base de datos:

```
const job = await JobModel.getById(id)
```

Validamos:

```
if (!job) {  return res.status(404).json({ error: 'Job not found' })}
```

👉 Aquí ya estamos trabajando como en una API real.

## ✍️ Preparando el prompt

Aquí viene la magia.

Creamos un system prompt que define el comportamiento de la IA:

```
const systemPrompt = `Eres un asistente que resume ofertas de trabajo...`
```

Y luego un prompt dinámico con los datos:

```
const prompt = `Resume en 4-6 frases la siguiente oferta de trabajo:Incluye: rol, empresa, ubicación y requisitos claveUsa un tono claro y directo en españolTítulo: ${job.title}Empresa: ${job.company}Ubicación: ${job.location}`
```

💡 ****Clave****:

-   El system prompt define la personalidad
-   El prompt define la tarea concreta

## ⚡ ¿Qué estamos consiguiendo?

Con esto:

-   Convertimos datos estructurados → en texto útil
-   Automatizamos tareas repetitivas
-   Creamos valor real con IA

Esto ya no es un juguete. 👉 Es la base de cualquier producto con IA.

## 🧪 Ejemplo de uso

Una petición a:

```
GET /summary/123
```

Podría devolver algo como:

```
{  "summary": "Empresa X busca un desarrollador..."}
```

Es decir: 👉 un backend que ya piensa por ti

## 🧠 Conceptos clave de la clase

-   Crear rutas con Express
-   Separar lógica en módulos
-   Usar OpenAI desde backend
-   Diseñar prompts efectivos
-   Transformar datos en valor

## ⚠️ Cosas importantes a tener en cuenta

-   La calidad depende del prompt
-   Siempre valida los datos antes de enviarlos
-   Controla errores en producción
-   No abuses de llamadas a la API (coste)

## 🔜 Qué veremos en la siguiente clase

En la siguiente clase iremos más allá:

-   Enviar datos desde el frontend
-   Conectar cliente y servidor
-   Mejorar prompts dinámicos
-   Introducir streaming de respuestas

Aquí empieza lo bueno: 👉 construir aplicaciones completas con IA.

> 💡 ****Consejo****: Si puedes automatizar algo con IA… hazlo en el backend. Es donde realmente escala.