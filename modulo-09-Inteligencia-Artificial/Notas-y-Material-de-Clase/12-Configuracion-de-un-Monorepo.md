# 📦 Configuración de un Monorepo

En esta clase vamos a ver cómo configurar un ****monorepo desde cero****, entendiendo las decisiones clave que debes tomar para organizar múltiples proyectos dentro de un mismo repositorio.

Un monorepo no es solo juntar carpetas. Es una forma de ****pensar la arquitectura**** de tus proyectos.

## 🧠 ¿Qué es un Monorepo?

Un ****monorepo**** es un único repositorio que contiene múltiples proyectos relacionados.

Por ejemplo:

-   Frontend (web)
-   Backend (API)
-   Librerías compartidas
-   Configuración común

Todo vive en el mismo repo.

## 🤔 ¿Por qué usar un Monorepo?

Ventajas principales:

-   🔁 Reutilización de código (shared packages)
-   ⚡ Desarrollo más rápido entre proyectos relacionados
-   🔍 Visibilidad total del sistema
-   🧪 Testing y cambios coordinados
-   📦 Gestión centralizada de dependencias

Pero también tiene retos si no se estructura bien.

## 🏗️ Estructura básica

Una estructura típica podría ser:

```
/apps  /web  /api/packages  /ui  /utils
```

-   ****apps**** → aplicaciones finales
-   ****packages**** → código reutilizable

Esto separa claramente lo que se ejecuta de lo que se comparte.

## ⚙️ Primeros pasos de configuración

### 1\. Crear el repositorio

Empieza con un proyecto vacío:

```
mkdir mi-monorepocd mi-monoreponpm init -y
```

### 2\. Activar workspaces

En `package.json`:

```
{  "private": true,  "workspaces": [    "apps/*",    "packages/*"  ]}
```

Esto permite gestionar múltiples proyectos desde un único root.

### 3\. Crear las carpetas

```
mkdir apps packagesmkdir apps/web apps/apimkdir packages/ui packages/utils
```

Cada carpeta tendrá su propio `package.json`.

## 🔗 Cómo se conectan los paquetes

Uno de los puntos clave del monorepo es que puedes usar paquetes internos como dependencias:

```
{  "dependencies": {    "ui": "*"  }}
```

Esto permite:

-   Compartir componentes
-   Reutilizar lógica
-   Evitar duplicación

## 🧪 ¿Cuándo tiene sentido un monorepo?

No siempre necesitas uno.

****Tiene sentido cuando:****

-   Tienes varios proyectos relacionados
-   Compartes código entre ellos
-   Necesitas coordinación frecuente
-   Estás construyendo un ecosistema (no solo una app)

****No tiene sentido si:****

-   Solo tienes un proyecto pequeño
-   No hay reutilización
-   Complica más de lo que ayuda

## ⚠️ Problemas comunes

Al empezar con monorepos, es fácil caer en errores:

-   ❌ Mala separación entre apps y packages
-   ❌ Dependencias cruzadas caóticas
-   ❌ Build lento si no se optimiza
-   ❌ Falta de tooling adecuado

Por eso, la configuración inicial es clave.

## 🛠️ Herramientas que suelen usarse

Aunque aquí vemos la base, en proyectos reales se suele usar:

-   ****Turborepo****
-   ****Nx****
-   ****pnpm workspaces****
-   ****Yarn workspaces****

Estas herramientas ayudan con:

-   Caché de builds
-   Ejecución paralela
-   Gestión eficiente de dependencias

## 🧩 Idea clave

Un monorepo no es solo una estructura de carpetas.

Es una forma de:

-   Organizar sistemas complejos
-   Escalar proyectos
-   Compartir conocimiento y código

## 🔜 Qué veremos en la siguiente clase

En la siguiente clase profundizaremos en:

-   Herramientas avanzadas para monorepos
-   Optimización de builds
-   Cómo compartir código correctamente
-   Estrategias de versionado
-   Automatización y CI

Aquí es donde el monorepo pasa de ser útil… a ser una máquina de productividad.

> 💡 ****Consejo****: Empieza simple. No necesitas Turborepo ni Nx el día 1. Entiende primero cómo funciona un monorepo básico y luego escala.