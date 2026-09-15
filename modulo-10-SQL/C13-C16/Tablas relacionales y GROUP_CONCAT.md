# 🔗 Tablas relacionales y GROUP\_CONCAT

Ya hemos visto cómo relacionar una tabla de trabajos con una tabla de empresas.

Pero hay un caso todavía más interesante y muy común en bases de datos reales:

****cuando un registro puede estar relacionado con varios valores al mismo tiempo.****

Por ejemplo:

-   Un trabajo puede usar varias tecnologías
-   Y una tecnología puede aparecer en varios trabajos

Ahí ya no estamos ante una relación simple.

Estamos ante una relación ****muchos a muchos****.

## 🧠 El problema de guardar listas en una sola columna

Una solución rápida y tentadora sería guardar las tecnologías en una única columna separadas por comas.

Algo así como:

-   `React, TypeScript, CSS`

Pero eso tiene varios problemas:

-   Es más difícil de consultar
-   Es más difícil de filtrar
-   Es más difícil de mantener
-   Y rompe la idea de tener datos bien estructurados

Por eso, en bases de datos relacionales, lo correcto suele ser crear una tabla intermedia que represente esa asociación.

## 🏗️ La tabla intermedia: `job_technologies`

En el vídeo se crea una tabla llamada `job_technologies`.

Su objetivo es representar la relación entre:

-   Un trabajo
-   Y una tecnología

En lugar de meter la lista de tecnologías dentro de `jobs`, se crea una fila por cada relación.

Por ejemplo:

-   Trabajo 1 → React
-   Trabajo 1 → TypeScript
-   Trabajo 1 → CSS
-   Trabajo 2 → Node.js
-   Trabajo 2 → React

Eso permite modelar la relación correctamente.

## 🔑 Clave primaria compuesta

Aquí aparece una idea muy importante:

****la clave primaria no siempre tiene que ser una sola columna****.

En esta tabla intermedia, el identificador único puede formarse con dos columnas a la vez:

-   `job_id`
-   `technology`

¿Por qué tiene sentido?

Porque esa combinación solo debería existir una vez.

Es decir:

-   Un mismo trabajo no debería tener asociada dos veces la misma tecnología

Por eso `job_id + technology` puede funcionar perfectamente como identificador único de la relación.

## 🧩 Clave foránea hacia `jobs`

Además, `job_id` actúa como clave foránea.

Eso significa que:

-   `job_id` en `job_technologies`
-   referencia al `id` de la tabla `jobs`

Con eso mantenemos la relación entre ambas tablas y evitamos asociaciones inválidas.

## 🧱 Una forma de imaginar esta tabla

La tabla `job_technologies` podría pensarse así:

-   `job_id = 1`, `technology = React`
-   `job_id = 1`, `technology = TypeScript`
-   `job_id = 1`, `technology = CSS`
-   `job_id = 2`, `technology = Node.js`
-   `job_id = 2`, `technology = React`

Esto no significa que haya cinco trabajos.

Significa que hay ****cinco relaciones**** entre trabajos y tecnologías.

Y esa diferencia es clave.

## 🔍 Qué pasa cuando hacemos un JOIN

Cuando cruzamos la tabla `jobs` con `job_technologies`, el resultado no devuelve una fila por trabajo.

Devuelve una fila por relación.

Por eso, si un trabajo tiene tres tecnologías, aparecerá tres veces en el resultado del cruce.

Y si otro tiene dos, aparecerá dos veces.

En total, si tienes:

-   Un trabajo con 3 tecnologías
-   Otro con 2 tecnologías

El resultado tendrá 5 filas.

## 🤯 Por qué esto puede parecer raro al principio

Al empezar, esto puede chocar bastante.

Tú piensas: “solo tengo dos trabajos”.

Pero SQL te devuelve más filas.

Y no es un error.

Lo que pasa es que ya no estás viendo entidades individuales, sino ****combinaciones**** entre entidades relacionadas.

## 🧵 GROUP\_CONCAT - Agrupar valores en un solo texto

Aquí entra una función muy útil: `GROUP_CONCAT`.

Su objetivo es concatenar varios valores en una sola cadena de texto.

En este caso, sirve para convertir algo como esto:

-   Trabajo 1 → React
-   Trabajo 1 → TypeScript
-   Trabajo 1 → CSS

en algo más legible como:

-   Trabajo 1 → `React, TypeScript, CSS`

Eso hace que el resultado sea mucho más fácil de leer cuando quieres mostrar asociaciones agrupadas.

## ⚠️ El error típico: agrupar todo junto

Hay un detalle importante.

Si usas `GROUP_CONCAT` sin agrupar correctamente, puedes acabar concatenando ****todas las tecnologías de todos los trabajos en una sola fila****.

Y claro, eso no es lo que quieres.

Lo que quieres realmente es:

-   agrupar por cada trabajo
-   y concatenar solo las tecnologías de ese trabajo

Ese es justo el punto clave que se corrige en el vídeo.

## 🧠 `GROUP BY` - Decir cómo se agrupan los resultados

Para que `GROUP_CONCAT` funcione como queremos, necesitamos `GROUP BY`.

Por ejemplo, la idea sería:

-   cruzar `jobs` con `job_technologies`
-   agrupar por el identificador del trabajo
-   concatenar las tecnologías de cada grupo

Así conseguimos una fila por trabajo, con su lista completa de tecnologías.

## ✅ El resultado “bonito”

Cuando agrupas bien, el resultado ya tiene mucho más sentido.

Por ejemplo:

-   `Frontend Developer` → `React, TypeScript, CSS`
-   `Backend Developer` → `Node.js, React`

Ahora sí estamos viendo una representación clara de la relación entre trabajos y tecnologías, pero de forma resumida y legible.

## 🧠 Qué estás aprendiendo realmente aquí

Aunque la sintaxis importa, lo más valioso de esta clase es el cambio mental:

-   No todo cabe bien en una sola tabla
-   No todo debe guardarse como texto separado por comas
-   Las relaciones complejas se modelan con tablas intermedias
-   Y luego SQL te da herramientas para reconstruir esa información de forma útil

Eso es diseño de bases de datos de verdad.

## 🛠️ También podrías ir un paso más allá

En el vídeo se comenta que incluso la tecnología podría separarse todavía más.

Es decir:

-   en vez de guardar `technology` como texto
-   podrías tener una tabla `technologies`
-   y usar un `technology_id`

Eso haría el modelo aún más normalizado.

No se desarrolla en profundidad porque el tiempo no daba para más, pero es una evolución natural del diseño.

## 🧠 Qué debes llevarte de esta clase

Quédate con estas ideas:

-   Una relación muchos a muchos necesita una tabla intermedia
-   `job_technologies` representa asociaciones, no entidades completas
-   Una clave primaria puede estar formada por varias columnas
-   Un `JOIN` devuelve una fila por relación
-   `GROUP_CONCAT` sirve para juntar varios valores en un solo texto
-   `GROUP BY` es lo que permite agrupar correctamente esos valores por entidad

## 🚀 A partir de aquí

Ahora ya no solo sabes relacionar tablas simples.

También sabes modelar relaciones más complejas y presentar esos datos de forma mucho más útil.

Y eso es una habilidad muy importante porque en aplicaciones reales este tipo de relaciones aparecen constantemente:

-   posts y tags
-   productos y categorías
-   usuarios y roles
-   películas y géneros
-   trabajos y tecnologías

Para practicar la parte de agrupación que acompaña a `GROUP_CONCAT`, tienes [GROUP BY y HAVING](https://aprendesql.dev/agrupando-datos) y [funciones de agregación](https://aprendesql.dev/funciones-de-agregacion) en aprendesql.dev.

> 💡 ****Tip****: si estás guardando listas separadas por comas dentro de una columna, muchas veces no necesitas una columna más grande. Necesitas una tabla intermedia.