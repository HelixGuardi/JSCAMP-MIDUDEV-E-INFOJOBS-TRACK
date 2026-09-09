# 🔑 Crear tu API Key de OpenAI paso a paso

En esta clase vamos a dar el primer paso para empezar a trabajar con inteligencia artificial en tus aplicaciones: ****crear tu API Key de OpenAI****.

Sin esto, no puedes hacer prácticamente nada con la API.

Es como el “login” de tu aplicación frente a OpenAI.

## 🚀 ¿Qué es una API Key?

Una ****API Key**** es una clave secreta que:

-   Identifica tu aplicación
-   Permite hacer peticiones a OpenAI
-   Controla el uso y facturación
-   Debe mantenerse ****privada siempre****

Piensa en ella como una contraseña que da acceso a la API.

## 🛠️ Cómo crear tu API Key

El proceso es bastante sencillo:

1.  Ve a la plataforma de OpenAI
2.  Accede a tu cuenta
3.  Dirígete a la sección de ****API Keys****
4.  Haz clic en ****Create new secret key****
5.  Copia la clave generada

⚠️ ****Importante****: Solo podrás verla una vez. Si la pierdes, tendrás que generar otra.

## 🔒 Buenas prácticas de seguridad

Esto es clave. Literalmente.

Nunca hagas esto:

-   ❌ Subir la API Key a GitHub
-   ❌ Ponerla directamente en el código frontend
-   ❌ Compartirla en público

Haz siempre esto:

-   ✅ Guardarla en variables de entorno
-   ✅ Usarla solo en backend
-   ✅ Rotarla si crees que ha sido expuesta

Ejemplo en Node.js:

```
OPENAI_API_KEY=tu_api_key_aqui
```

Y luego:

```
process.env.OPENAI_API_KEY
```

## 💸 Facturación y límites

Para usar la API necesitas:

-   Tener una cuenta activa
-   Añadir un método de pago (en muchos casos)
-   Controlar tu consumo

Puedes configurar:

-   Límites de gasto
-   Alertas
-   Uso por proyecto

Esto es importante para evitar sustos.

## 🧠 ¿Qué puedes hacer con esta API Key?

Una vez tienes la clave, puedes:

-   Generar texto con modelos de IA
-   Crear asistentes conversacionales
-   Analizar datos
-   Generar código
-   Integrar IA en tus apps

Es la puerta de entrada a todo el ecosistema.

## ⚠️ Errores comunes

Al empezar, es muy típico:

-   Usar la API Key en el frontend → ❌ inseguro
-   Olvidar configurar variables de entorno → errores
-   No revisar límites de uso → facturas inesperadas

Evita estos errores desde el principio.

## 🔜 Qué veremos en la siguiente clase

Ahora que ya tienes tu API Key:

-   Haremos nuestra primera petición a OpenAI
-   Crearemos una pequeña API en Node.js
-   Veremos cómo enviar prompts
-   Y cómo recibir respuestas

Aquí empieza lo divertido.

> 💡 ****Consejo****: Trata tu API Key como si fuera la contraseña de tu banco. Si alguien la usa, el coste es tuyo.