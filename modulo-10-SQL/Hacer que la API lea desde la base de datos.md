# 🗄️ Hacer que la API lea desde la base de datos

Hasta ahora ya hemos aprendido a trabajar con SQL y también hemos visto cómo conectar un backend con SQLite.

Pero todavía nos faltaba el paso más importante para llevarlo al mundo real:

****hacer que nuestra API deje de usar datos escritos a mano y empiece a leer directamente desde la base de datos****.

Y aquí es donde todo empieza a encajar de verdad.

## 🌍 Pasar de datos mockeados a datos reales

Al principio de un proyecto es bastante habitual tener los datos escritos manualmente dentro del modelo o en archivos temporales.

Eso sirve para avanzar rápido, pero tiene un problema muy claro:

-   no hay persistencia real
-   no hay una única fuente de verdad
-   y el backend no está aprovechando la base de datos

La idea de esta clase es cambiar eso.

En lugar de devolver datos hardcodeados, vamos a hacer que la API consulte SQLite de verdad.

## 🧠 El punto clave: cambiar solo el modelo

Aquí aparece una ventaja muy potente de tener una arquitectura ordenada.

Gracias a separar bien responsabilidades, en el vídeo se aprovecha el patrón modelo-vista-controlador para hacer algo muy interesante:

> Cambiar solo el modelo para que toda la API empiece a tirar de base de datos.

Eso significa que no hace falta rehacer toda la aplicación.

Si el contrato de datos se mantiene, puedes cambiar la fuente de datos por debajo sin tocar demasiadas piezas.

## 🏗️ Crear la conexión centralizada a la base de datos

Para empezar, se crea un archivo específico para centralizar la conexión con SQLite.

La idea es tener un módulo que:

-   importe `Database`
-   cree la base de datos
-   configure ciertos ajustes útiles
-   y exporte una instancia reutilizable para el resto del proyecto

Eso evita repetir la conexión en muchos sitios y deja mucho más claro dónde vive el acceso a datos.

## ⚙️ Configuración útil con PRAGMA

En el vídeo se activan dos configuraciones importantes de SQLite usando `PRAGMA`.

### `journal_mode = WAL`

Se activa el modo ****WAL**** (__Write-Ahead Logging__).

¿Por qué es interesante?

Porque mejora el comportamiento cuando hay concurrencia.

Sin esto, una escritura puede bloquear demasiado la base de datos.

Con WAL:

-   las escrituras van a un archivo separado
-   las lecturas pueden seguir funcionando
-   y eso encaja mucho mejor con una API real

Es un cambio pequeño, pero muy útil.

### `foreign_keys = ON`

También se activan las claves foráneas.

Esto es importante porque en SQLite las relaciones pueden existir a nivel de diseño, pero ciertas validaciones y restricciones de integridad no se aplican como esperas si no activas esta opción explícitamente.

Así que es una de esas configuraciones que conviene dejar preparadas desde el principio.

## 🌱 Crear un script de semilla

Después de preparar la conexión, se crea un archivo de ****seed**** para inicializar la base de datos.

La idea de este script es:

-   crear las tablas necesarias
-   insertar trabajos
-   insertar relaciones de tecnologías
-   dejar la base de datos lista con contenido inicial

Es decir, montar una base mínima para que la API ya pueda trabajar con datos reales desde el primer momento.

## 🧱 Qué contiene esa inicialización

En el vídeo se mencionan varias tablas dentro del seed:

-   `jobs`
-   `job_technologies`
-   `job_content`

Y además se insertan datos de ejemplo y relaciones entre ellos.

No hay nada conceptualmente nuevo respecto a lo que ya habíamos visto en SQL.

La diferencia es que ahora todo eso se empaqueta en un script que prepara la base de datos del proyecto de una forma reproducible.

## ▶️ Ejecutar el seed

Una vez listo el script, se ejecuta desde TypeScript para generar la base de datos y dejarla inicializada.

Y ahí aparece ya un archivo real de SQLite con la información persistida.

Eso marca un antes y un después, porque a partir de ese momento la API ya puede consultar una fuente de datos real.

## ❌ Lo que había antes no tenía sentido

Antes del cambio, la API seguía devolviendo datos definidos manualmente en el modelo.

Eso significa que aunque la base de datos ya existiese, la aplicación todavía no la estaba usando de verdad.

Y ahí está justamente el objetivo de esta clase:

****reemplazar esa lógica manual por consultas SQL reales****.

## 🔌 Importar la base de datos en el modelo

El siguiente paso es hacer que el modelo importe la conexión a la base de datos.

A partir de ahí, en vez de devolver arrays escritos a mano, el modelo empieza a ejecutar queries.

Esto es especialmente interesante porque demuestra que el modelo puede convertirse en la capa donde realmente vive el acceso a datos.

## 🔍 Reutilizar la query que ya habíamos aprendido

En el vídeo se reutiliza la misma lógica de consulta que ya se había montado antes en el playground:

-   `SELECT`
-   `LEFT JOIN`
-   `GROUP BY`
-   y agregación de tecnologías

Es decir, no hay una “versión mágica” distinta por estar en backend.

Es la misma SQL de antes, ahora integrada dentro de la aplicación.

## 🧩 `LEFT JOIN` para recuperar tecnologías relacionadas

La consulta cruza la tabla `jobs` con `job_technologies` para poder traer también las tecnologías asociadas a cada trabajo.

Y como ya se había explicado antes, esto permite recuperar en una sola operación tanto la oferta como su relación con otras entidades.

Además, se utiliza agrupación para que el resultado no salga repetido por cada relación individual.

## 🧪 Preparar filtros dinámicos

En el vídeo también se deja preparada la estructura para soportar filtros dinámicos como:

-   tecnología
-   modalidad
-   nivel

Aunque no se termina toda la lógica completa, sí se plantea la idea de construir condiciones y parámetros por separado para luego componer la consulta SQL final.

Esto es muy interesante porque ya apunta a una API más realista, donde no solo lees todos los datos, sino que puedes filtrarlos según lo que llegue en la petición.

## 🛡️ Parámetros y consultas preparadas

Igual que en la clase anterior, se mantiene la idea de preparar la consulta y pasar parámetros aparte.

Eso permite:

-   construir queries más seguras
-   evitar inyección SQL
-   y mantener una forma consistente de trabajar con el driver

Los interrogantes `?` en la query son los huecos donde luego se inyectan los valores seguros al ejecutar la sentencia.

## 🧱 Primero recuperar filas, luego mapear

Una vez ejecutada la query, el backend obtiene unas filas desde SQLite.

Y aquí aparece otro problema importante:

****la estructura que devuelve la base de datos no siempre coincide exactamente con la estructura que espera tu API****.

Por eso no basta con consultar.

También hay que ****mapear****.

## 🔄 Mapear la respuesta al formato de la API

En el vídeo se detecta justo esto:

-   la consulta funciona
-   los datos sí vienen desde la base de datos
-   pero el formato no coincide exactamente con el que la aplicación devolvía antes

Por ejemplo, algunos campos tienen que reorganizarse dentro de `data`, y las tecnologías no deberían venir como una cadena plana, sino como un array.

Aquí está una de las lecciones más importantes de la clase:

> Conectar la base de datos no es solo traer datos. También es transformarlos al contrato que tu aplicación necesita.

## 🧠 Dónde debería hacerse ese mapeo

En el vídeo se comenta una reflexión muy útil:

quizá el modelo no debería encargarse de todo.

Porque una cosa es recuperar los datos y otra distinta es transformarlos en el DTO final que espera la API.

Eso abre una decisión de arquitectura interesante:

-   mapear dentro del modelo
-   mapear en el controlador
-   o tener una capa intermedia específica para transformación

No hay una única respuesta obligatoria, pero sí una idea clara: ****recuperar y transformar no siempre son la misma responsabilidad****.

## ✅ La señal de que ya funciona

Para comprobar que todo está bien conectado, en el vídeo se modifica el contenido de la base de datos con valores llamativos y se verifica que la API devuelve esos cambios.

Eso confirma que ya no está usando el array hardcodeado anterior.

Ahora sí está leyendo desde SQLite de verdad.

## 🧠 Qué debes llevarte de esta clase

Esta clase marca un punto muy importante porque une varias piezas que hasta ahora estaban separadas:

-   una base de datos SQLite real
-   un script de semilla para inicializarla
-   una conexión reutilizable
-   una API backend
-   una query con joins y agrupación
-   y un mapeo final para devolver el formato correcto

La idea clave es esta:

> Una API profesional no debería depender de datos escritos a mano si ya tiene una base de datos detrás.

## 🚀 A partir de aquí

Ahora sí estás mucho más cerca de una aplicación real:

-   la base de datos está inicializada
-   el backend consulta datos persistidos
-   la respuesta se adapta al formato que espera la API
-   y ya tienes la base para añadir filtros, más endpoints y operaciones completas de lectura y escritura

A partir de aquí, lo normal es seguir refinando ese acceso a datos, añadir consultas más completas o empezar a soportar creación, actualización y borrado contra la base de datos real.

Y si quieres seguir practicando SQL más allá del bootcamp, [aprendesql.dev](https://aprendesql.dev/) sigue ahí con lecciones, ejercicios y el [playground](https://aprendesql.dev/playground).

> 💡 ****Tip****: si tu API ya tiene base de datos pero sigue devolviendo arrays escritos a mano, no tienes persistencia integrada. Tienes decoración.