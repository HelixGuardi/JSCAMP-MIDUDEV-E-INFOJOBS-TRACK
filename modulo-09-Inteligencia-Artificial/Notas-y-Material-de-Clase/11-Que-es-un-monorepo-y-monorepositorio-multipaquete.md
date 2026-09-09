# 📦 ¿Qué es un monorepo? Monorepositorio multipaquete

En esta clase vamos a subir de nivel.

Hasta ahora hemos visto herramientas de IA, pero como desarrolladores, lo importante no es solo usarlas… sino ****integrarlas en nuestros proyectos****.

Y para eso necesitamos entender cómo estructurar bien nuestro código.

Aquí entra un concepto clave: ****el monorepo****.

## 🚀 De usar herramientas a ser AI Engineer

La inteligencia artificial no va solo de herramientas.

Un ****AI Engineer**** es alguien que:

-   Entiende los conceptos de IA
-   Sabe cómo integrarlos en sus aplicaciones
-   Trabaja tanto en frontend como en backend
-   Construye productos reales con IA

Y justo eso es lo que vamos a empezar a hacer.

Pero antes, necesitamos una base sólida: ****la organización del código****.

## 📁 ¿Qué es un monorepo?

Un ****monorepo**** (monorepositorio) es:

> Un único repositorio que contiene múltiples proyectos o partes de una aplicación.

En lugar de tener:

-   Un repo para el backend
-   Otro para el frontend
-   Otro para librerías compartidas

👉 Tienes ****todo en un solo repositorio****

## 📦 ¿Qué es un monorepo multipaquete?

Aquí es donde se pone interesante.

Un ****monorepo multipaquete**** significa que:

-   Tienes un solo repositorio
-   Dentro tienes múltiples proyectos
-   Cada uno tiene su propio `package.json`

👉 Es decir, ****cada proyecto es un paquete independiente****

Por ejemplo:

```
/repo  /frontend    package.json  /backend    package.json  /shared    package.json
```

Esto es exactamente lo que estamos haciendo en esta clase:

-   Carpeta `backend` → lógica del servidor
-   Carpeta `frontend` → interfaz de usuario

Todo dentro del mismo repositorio.

## 🧠 ¿Por qué es importante?

Porque mejora muchísimo la experiencia de desarrollo.

En lugar de tener muchos repositorios separados:

-   No tienes que sincronizar cambios entre repos
-   Puedes compartir código fácilmente
-   Todo está en el mismo contexto
-   Es más fácil refactorizar

👉 Es una forma mucho más eficiente de trabajar en proyectos grandes

## ⚖️ Estrategias posibles

Existen varias formas de organizar proyectos:

### 1\. Monorepo + multipaquete

-   Un repositorio
-   Muchos paquetes  
    👉 (La que estamos usando)

### 2\. Monorepo + monopaquete

-   Un repositorio
-   Un solo proyecto

### 3\. Multirepo + monopaquete

-   Muchos repositorios
-   Cada uno con un solo paquete

Cada estrategia tiene sus casos, pero en proyectos modernos…

👉 ****el monorepo multipaquete es muy común****

## 🏗️ Ejemplo real: React

El repositorio de React es un monorepo multipaquete.

Dentro tiene:

-   `react`
-   `react-dom`
-   `react-devtools`
-   `react-native-renderer`
-   y muchos más

Todo vive en el mismo repositorio.

👉 Esto permite trabajar en todos los paquetes a la vez sin tener que coordinar múltiples repos.

## 🏢 Ejemplo extremo: Google

Google lleva este concepto al extremo.

-   Un único repositorio interno
-   Miles de millones de líneas de código
-   Millones de archivos
-   Decenas de millones de commits

Todo está en el mismo repositorio.

Sí, todo.

👉 Esto demuestra que el enfoque escala incluso a niveles gigantes.

## 🛠️ ¿Qué hemos hecho en el proyecto?

Para aplicar este concepto:

-   Hemos creado una carpeta `backend`
-   Hemos creado una carpeta `frontend`
-   Hemos movido el código existente a estas carpetas

Nada más.

Pero con esto ya tenemos:

👉 Un ****monorepo multipaquete listo para escalar****

## 💡 Ventajas clave

-   Mejor organización
-   Código compartido fácilmente
-   Refactors más simples
-   Menos fricción entre equipos
-   Todo el proyecto en un solo sitio

## ⚠️ Posibles desventajas

-   Puede crecer mucho
-   Requiere buenas herramientas (pnpm workspaces, turborepo, etc.)
-   Necesita disciplina en la estructura

## 🔜 Qué veremos en la siguiente clase

Ahora que tenemos la base del proyecto:

-   Empezaremos a integrar ****OpenAI****
-   Veremos cómo usar un ****gateway****
-   Aprenderemos a usar modelos gratuitos
-   Empezaremos a construir funcionalidades reales con IA

Aquí es donde empieza lo bueno 🚀

> 💡 ****Consejo****: Si estás empezando un proyecto con frontend y backend, prueba a hacerlo en monorepo desde el principio. Luego es mucho más difícil migrar.