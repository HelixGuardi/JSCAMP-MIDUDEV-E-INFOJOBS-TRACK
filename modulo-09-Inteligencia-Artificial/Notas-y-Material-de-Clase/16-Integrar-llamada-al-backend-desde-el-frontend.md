# 🔌 Integrar llamada al backend desde el frontend

En esta clase damos un paso clave: dejar de trabajar con datos estáticos y empezar a conectar nuestra aplicación con un ****backend real****.

Aquí es donde tu app empieza a cobrar vida de verdad.

Hasta ahora probablemente estabas simulando datos. Pero en esta clase vamos a:

-   Hacer peticiones reales
-   Enviar datos al backend
-   Recibir respuestas dinámicas
-   Integrarlo todo en el frontend

## 🚀 ¿Por qué es importante?

Porque sin backend, tu aplicación está limitada.

Con esta integración puedes:

-   Persistir datos
-   Procesar lógica compleja
-   Usar inteligencia artificial
-   Conectar con bases de datos
-   Crear aplicaciones reales

Es literalmente el puente entre una demo… y un producto.

## 🌐 Cómo funciona una llamada al backend

El flujo básico es:

1.  El frontend hace una petición HTTP
2.  El backend recibe la petición
3.  Procesa la lógica (o llama a una API externa)
4.  Devuelve una respuesta
5.  El frontend la renderiza

Por ejemplo:

```
fetch('/api/endpoint', {  method: 'POST',  body: JSON.stringify({ data: 'Hola mundo' })})  .then(res => res.json())  .then(data => {    console.log(data)  })
```

## 🧠 Qué estamos haciendo realmente

Cuando haces una llamada al backend estás:

-   Enviando información desde el cliente
-   Delegando trabajo al servidor
-   Recibiendo un resultado procesado

Esto es clave cuando trabajas con IA, porque:

-   No quieres exponer claves API en el frontend
-   Necesitas procesar prompts en el servidor
-   Puedes controlar mejor la lógica

## 🛠️ Integración paso a paso

### 1\. Crear endpoint en el backend

Normalmente tendrás algo como:

```
app.post('/api/chat', async (req, res) => {  const { message } = req.body  const response = await someAI(message)  res.json({ response })})
```

### 2\. Llamar desde el frontend

```
const sendMessage = async () => {  const res = await fetch('/api/chat', {    method: 'POST',    headers: {      'Content-Type': 'application/json'    },    body: JSON.stringify({      message: inputValue    })  })  const data = await res.json()  setResponse(data.response)}
```

### 3\. Mostrar resultado

Renderizas la respuesta en pantalla:

```
<p>{response}</p>
```

Y listo: ya tienes comunicación completa.

## ⚡ Buenas prácticas

-   Maneja errores (try/catch)
-   Indica loading mientras esperas respuesta
-   Valida los datos antes de enviarlos
-   No expongas lógica sensible en el frontend
-   Centraliza las llamadas en funciones reutilizables

## ⚠️ Problemas comunes

-   ❌ No parsear JSON correctamente
-   ❌ Olvidar headers
-   ❌ Problemas de CORS
-   ❌ No controlar estados de carga
-   ❌ Backend no responde o tarda demasiado

Todo esto es parte del día a día real.

## 🔥 Lo importante de esta clase

Este paso es crítico porque:

-   Pasas de frontend estático a app dinámica
-   Empiezas a trabajar como fullstack
-   Preparas el terreno para integrar IA de verdad

Aquí es donde todo empieza a tener sentido.

## 🔜 Qué veremos en la siguiente clase

Ahora que ya sabemos conectar frontend y backend, el siguiente paso será mejorar esta comunicación:

-   Manejar streaming de respuestas
-   Optimizar la experiencia de usuario
-   Trabajar con respuestas en tiempo real
-   Integrar mejor la IA en la UI

Aquí es donde la experiencia pasa de “correcta” a “wow”.

> 💡 ****Consejo****: Si tu app todavía usa datos mock, este es el momento de eliminarlos. Conecta ya tu backend. Es el salto más importante que puedes dar.