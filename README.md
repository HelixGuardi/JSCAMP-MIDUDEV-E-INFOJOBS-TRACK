<!--

README.md - JSCAMP Personal Learning Journey

Autor: [HelixGuardi]

Bootcamp: JSCAMP de InfoJobs impartido por @midudev

-->

## 🧠 Mi JSCAMP · Bootcamp JavaScript con Midudev

<div align="center">

<img src="https://img.shields.io/badge/status-en%20curso-brightgreen" alt="Estado: en curso">

<img src="https://img.shields.io/badge/commits-cronol%C3%B3gicos-orange" alt="Commits cronológicos">

<img src="https://img.shields.io/badge/con%20💙-midudev-ff69b4" alt="Con 💙 midudev">

</div>

Bienvenido a mi repositorio personal del bootcamp **JSCAMP de InfoJobs**, impartido por [midudev](https://midu.dev).

Aquí guardo **todo mi aprendizaje paso a paso**: código de clase, ejercicios, anotaciones y el proyecto principal `DevJobs`. Encima de eso hay una documentación de estudio para reutilizar los patrones sin reabrir cada módulo.

> 🎯 **Objetivo:** mantener una cronología clara con commits nombrados por cada clase, y dejar un portfolio real de mi evolución en JavaScript, React, Node, TypeScript, SQL, testing, IA y Docker.

---

## 📌 ¿Qué encontrarás aquí?

A diferencia del [repositorio oficial del bootcamp](https://github.com/midudev/jscamp), el mío está organizado **por módulos aislados**. Cada carpeta conserva el código en el estado de esa etapa. No hay un `package.json` único en la raíz: cada módulo que es una app se instala y se arranca por su cuenta.

```text
JSCAMP-INFOJOBS-MIDUDEV/
├─ modulo-02-y-03-HTML-CSS-JS/
├─ modulo-04-cdn-react/
├─ modulo-04-vite-react/
├─ modulo-05-EstadoGlobal-y-ReactRouter/
├─ modulo-06-Backend-con-NodeJS-y-Express/
├─ modulo-06-Backend-con-Express/
├─ modulo-07-Testing/
├─ modulo-08-Typescript/
├─ modulo-09-Inteligencia-Artificial/
├─ modulo-10-SQL/
├─ modulo-11-ci-cd/
├─ modulo-12-docker/
├─ manual/                  # patrones, con código y gotchas
├─ MANUAL-MAESTRO.md        # puerta de entrada al manual
├─ INVENTARIO.md            # índice de cada carpeta
└─ GUIA-PROYECTO.md         # cómo montar un fullstack nuevo
```

| Carpeta | Qué hay |
| --- | --- |
| `modulo-02-y-03-HTML-CSS-JS` | Maqueta **DevJobs** en HTML, CSS y JS. Filtros, paginación y Web Components. Sin bundler. |
| `modulo-04-cdn-react` | El mismo front con el primer JSX: React por CDN y Babel, sin Vite. |
| `modulo-04-vite-react` | SPA con Vite y React 19. Hooks, CSS Modules y un router a mano (`pushState`). |
| `modulo-05-EstadoGlobal-y-ReactRouter` | React Router 7, Zustand, rutas protegidas y favoritos. Context escrito y sin montar. |
| `modulo-06-Backend-con-NodeJS-y-Express` | Node nativo: `node:http`, ficheros, CLI y permisos. No es la app DevJobs. |
| `modulo-06-Backend-con-Express` | API REST de empleos con Express 5 y MVC. Los datos viven en un JSON en memoria. |
| `modulo-07-Testing` | Esa API más Zod, `node:test`, Playwright y un E2E con Stagehand. |
| `modulo-08-Typescript` | Ejercicios de tipos. No hay app ni `tsconfig` aquí. |
| `modulo-09-Inteligencia-Artificial` | Monorepo npm: el front pide un resumen de la oferta y el backend lo hace en streaming. |
| `modulo-10-SQL` | Apuntes de SQL y la API en TypeScript con SQLite (`better-sqlite3`). |
| `modulo-11-ci-cd` | Monorepo pnpm (front + back) con lint, test y build. No hay workflow en `.github`. |
| `modulo-12-docker` | Laboratorio por carpetas: Dockerfile, multi-stage, volúmenes, Compose y un modelo local. |

El detalle de archivos y profundidad está en [INVENTARIO.md](INVENTARIO.md).

---

## 📚 Documentación de estudio

Tres capas. Entra por la que encaje con lo que buscas.

| Archivo | Cuándo abrirlo |
| --- | --- |
| [MANUAL-MAESTRO.md](MANUAL-MAESTRO.md) | Quieres un quick start (SPA, Express, SQLite, IA, Docker), la tabla de patrones o un gotcha que ya salió en clase. |
| [INVENTARIO.md](INVENTARIO.md) | Quieres saber qué tecnologías y archivos hay en un módulo antes de entrar en la carpeta. |
| [GUIA-PROYECTO.md](GUIA-PROYECTO.md) | Vas a montar un fullstack nuevo (pantalla, API, datos, tests, deploy) y quieres las fases en orden. |
| [manual/](manual/) | Quieres el patrón concreto: cuándo usarlo, el código y el fallo. |

Capítulos del manual. No hay un `01`: HTML, JS vainilla y Node previo a Express están dentro de los dos primeros.

| Capítulo | Cubre |
| --- | --- |
| [manual/02-react.md](manual/02-react.md) | Vite, router casero y React Router, filtros, Zustand, Context. |
| [manual/03-backend.md](manual/03-backend.md) | Node nativo y la API Express MVC de empleos. |
| [manual/04-sql.md](manual/04-sql.md) | SQL de los apuntes y el backend TypeScript con SQLite. |
| [manual/05-testing.md](manual/05-testing.md) | `node:test`, Playwright, Vitest, Testing Library y SuperTest. |
| [manual/06-typescript.md](manual/06-typescript.md) | Ejercicios de tipos y los tipos de la API del módulo 10. |
| [manual/07-ia.md](manual/07-ia.md) | Monorepo, resumen en stream y rate limit. |
| [manual/08-docker.md](manual/08-docker.md) | Dockerfiles, `.dockerignore`, multi-stage, volúmenes y Compose. |

---

## 📅 Cronología de commits

Mi regla personal: **un commit por cada clase o avance significativo**, con este formato:

```text
Módulo XX - Clase Y: descripción breve del cambio
```

El historial de GitHub muestra qué se trabajó en cada sesión, en orden.

---

## 🚀 Proyecto estrella: DevJobs

El proyecto práctico del bootcamp es **DevJobs**, una aplicación de búsqueda y publicación de empleos para desarrolladores.

Diseño original en [Stitch](https://stitch.withgoogle.com/projects/7508115667617706440).

La app crece así. Las carpetas que no son DevJobs (Node nativo, ejercicios de TypeScript, el monorepo de CI y el laboratorio de Docker) quedan fuera de esta lista.

- **02–03.** HTML, CSS y JS vainilla: maqueta con filtros, paginación y Web Components.
- **04 (CDN).** Primer componente React (`JobCard`) dentro de la misma maqueta.
- **04 (Vite).** SPA: componentes, hooks, paginación y un router propio.
- **05.** Rutas reales, login de práctica, favoritos y ficha en Markdown.
- **06 (Express).** API REST con MVC. Persistencia en JSON, en memoria.
- **07.** Validación con Zod y tests de esa API.
- **09.** Resumen de una oferta generado por un modelo, en streaming, con la clave solo en el backend.
- **10.** La misma API en TypeScript, leyendo SQLite. Parte del CRUD sigue en memoria: está anotado en el manual como pendiente.

---

## 🛠️ Tecnologías que estoy (re)aprendiendo

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

### Testing y herramientas

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

El módulo de CI deja scripts `lint`, `test` y `build` en un monorepo pnpm. El workflow de GitHub Actions todavía no está en el repo.

---

## 🔧 Cómo usar este repo

```bash
git clone https://github.com/HelixGuardi/JSCAMP-MIDUDEV-E-INFOJOBS-TRACK.git
cd JSCAMP-MIDUDEV-E-INFOJOBS-TRACK
```

No es un proyecto ejecutable unificado: es un **archivo histórico**. Entra en el módulo que te interese e instala ahí (`npm install` o, en el 11, `pnpm install`). Para estudiar un patrón, empieza por [MANUAL-MAESTRO.md](MANUAL-MAESTRO.md) en lugar de recorrer las carpetas en orden.

---

## 📚 Fuente original del bootcamp

Todo el contenido, los videos y las clases pertenecen a **midudev** y **InfoJobs**.
Puedes acceder a la plataforma oficial en [JSCAMP.dev](https://jscamp.dev/) (registro gratuito).

- Instructor: [@midudev](https://github.com/midudev)
- Repositorio oficial: [midudev/jscamp](https://github.com/midudev/jscamp)

Mi versión es solo una **bitácora personal de estudio**, sin ánimo de suplantar el material original. Respeto los derechos de autor y recomiendo encarecidamente seguir el bootcamp desde las fuentes oficiales.

## 🧑‍💻 Sobre mí

[![GitHub](https://img.shields.io/badge/GitHub-HelixGuardi-181717?logo=github)](https://github.com/HelixGuardi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-victorhugo--dev-0A66C2?logo=linkedin)](https://www.linkedin.com/in/victorhugo-dev/)

Soy un Desarrollador Web Full-stack y este bootcamp es parte de mi actualización en tecnologías modernas.
Acepto sugerencias, consejos y buenas vibras 🫡.

## ⭐️ ¿Te ha parecido útil esta forma de documentar tu aprendizaje?

Si eres estudiante de JSCAMP y crees que esta estructura puede ayudarte, ¡dame una estrella aquí arriba o contáctame!
Y si eres reclutador, esto es una muestra de mi **constancia, organización y pasión por el código limpio**.

<div align="center"> <i>“La mejor manera de aprender es construir, romper y documentar”</i> — yo mismo, justo ahora 😄 </div>
