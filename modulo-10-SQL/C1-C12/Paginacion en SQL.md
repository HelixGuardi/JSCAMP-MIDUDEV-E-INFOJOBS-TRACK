# 📄 Paginación en SQL

Cuando una tabla tiene pocos registros, consultar los datos completos no suele ser un problema.

Pero en cuanto empiezas a tener muchos resultados, enseñar todo de golpe deja de tener sentido.

Ahí aparece una técnica fundamental que vas a ver en prácticamente cualquier aplicación real: ****la paginación****.

## 🧠 Qué es la paginación

Paginar significa dividir los resultados en bloques pequeños.

En lugar de devolver todos los registros de una tabla de una sola vez, devolvemos solo una parte.

Por ejemplo:

-   5 resultados por página
-   10 resultados por página
-   20 resultados por página

Esto hace que sea más fácil:

-   Mostrar datos en pantalla
-   Navegar entre resultados
-   Reducir la cantidad de información que se carga de golpe
-   Construir interfaces más cómodas para el usuario

## ✂️ Limitar resultados con `LIMIT`

La forma más sencilla de empezar a paginar en SQL es usando `LIMIT`.

Por ejemplo:

```
SELECT * FROM jobsLIMIT 5;
```

Esto significa:

-   Selecciona todos los campos de la tabla `jobs`
-   Pero tráeme solo 5 resultados

Ese sería el equivalente a la primera página si has decidido que cada página tenga 5 elementos.

## ⏭️ Ir a la siguiente página con `OFFSET`

Ahora bien, si ya has mostrado los primeros 5 resultados, ¿cómo obtienes los siguientes 5?

Ahí entra `OFFSET`.

```
SELECT * FROM jobsLIMIT 5OFFSET 5;
```

Lo que hace esta consulta es:

-   Limitar el resultado a 5 filas
-   Saltarse antes las 5 primeras

Es decir, no devuelve los registros del 1 al 5, sino los siguientes.

Eso sería la segunda página.

## 🔢 Cómo avanzar página a página

La lógica se vuelve muy clara cuando ves varios ejemplos seguidos.

### Primera página

```
SELECT * FROM jobsLIMIT 5;
```

### Segunda página

```
SELECT * FROM jobsLIMIT 5OFFSET 5;
```

### Tercera página

```
SELECT * FROM jobsLIMIT 5OFFSET 10;
```

### Cuarta página

```
SELECT * FROM jobsLIMIT 5OFFSET 15;
```

La regla es sencilla:

`OFFSET` indica cuántos resultados quieres saltarte antes de empezar a devolver filas.

Y normalmente se calcula así:

```
(page - 1) * pageSize
```

Por ejemplo, si estás en la página 3 y muestras 5 resultados por página:

```
(3 - 1) * 5 = 10
```

Así que usarías `OFFSET 10`.

## 🏗️ Por qué esta técnica es tan común

Esta forma de paginar con `LIMIT` y `OFFSET` es una de las más habituales que existen.

De hecho, aparece en una cantidad enorme de aplicaciones, paneles, listados, buscadores y tablas.

Es una solución muy directa y muy fácil de entender.

Por eso es tan común cuando estás empezando con SQL y también en muchísimos proyectos reales.

## 🔄 Otra forma de paginar: cursores

En el vídeo también se menciona que existe otra forma de hacer paginación: la ****paginación por cursores****.

Eso ya es un enfoque algo más avanzado.

No entraremos aquí en detalle, pero es importante que te suene porque se usa bastante en sistemas grandes o cuando la paginación con `OFFSET` deja de ser la mejor opción.

Aun así, para la mayoría de casos iniciales y para entender bien la idea, `LIMIT` + `OFFSET` es la base perfecta.

## ⚠️ Un detalle importante: el orden importa

Aunque en esta clase se explica la base de la paginación, conviene tener en mente algo muy importante:

****si paginas resultados, normalmente deberías acompañarlo de un**** **`**ORDER BY**`******.****

Por ejemplo:

```
SELECT * FROM jobsORDER BY id ASCLIMIT 5OFFSET 5;
```

¿Por qué?

Porque si no defines un orden, la base de datos puede devolver los registros en un orden no garantizado, y eso puede hacer que la paginación sea inconsistente.

Así que, en la práctica real, paginar suele ir muy de la mano de ordenar.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   La paginación sirve para dividir resultados en bloques
-   `LIMIT` restringe cuántas filas quieres devolver
-   `OFFSET` indica cuántas filas quieres saltarte
-   `LIMIT 5` puede representar una primera página de 5 elementos
-   `OFFSET 5` te lleva al siguiente bloque de resultados
-   Esta es una de las técnicas más comunes para paginar en SQL
-   Existe otra opción más avanzada llamada paginación por cursores

## 🚀 Una técnica pequeña, pero importantísima

La paginación parece un detalle, pero en realidad es una de esas piezas que aparecen en casi cualquier producto real:

-   Listados de usuarios
-   Resultados de búsqueda
-   Catálogos
-   Dashboards
-   Paneles de administración
-   APIs

Y por eso merece la pena entenderla bien desde el principio.

Porque aunque la sintaxis sea corta, la idea que hay detrás la vas a usar muchísimo.

Puedes probar `LIMIT` y `OFFSET` a mano en el [playground de aprendesql.dev](https://aprendesql.dev/playground) hasta que te salga natural.

> 💡 ****Tip****: Cuando hagas paginación en proyectos reales, acostúmbrate a usar `ORDER BY` junto con `LIMIT` y `OFFSET`. Paginar sin un orden definido puede darte resultados raros.