# 🔗 JOIN en SQL

Llegamos a uno de los conceptos que más respeto suelen dar al empezar con bases de datos relacionales: los ****JOIN****.

Y es normal.

Porque al principio pueden parecer confusos, pero en realidad son uno de los mayores superpoderes de SQL.

Gracias a los `JOIN` puedes ****cruzar datos entre varias tablas**** y recuperar información relacionada sin tener que duplicarla en todas partes.

## 🧠 Qué problema resuelve un JOIN

Imagina que tienes una tabla `jobs` con ofertas de trabajo.

En esa tabla guardas cosas como:

-   El título del puesto
-   La localización
-   El `company_id`

Pero el nombre real de la empresa no está ahí.

Está en otra tabla, por ejemplo `companies`.

Eso significa que si quieres mostrar algo como:

-   Título del trabajo
-   Nombre de la empresa
-   Localización

necesitas combinar información de ambas tablas.

Y ahí es exactamente donde entra `JOIN`.

## 🏗️ La idea básica de un JOIN

Un `JOIN` sirve para unir dos tablas usando una relación entre columnas.

Por ejemplo, si cada trabajo tiene un `company_id` y cada empresa tiene su `id`, puedes relacionarlas así:

```
SELECT title, name, locationFROM jobsJOIN companies ON jobs.company_id = companies.id;
```

Lo que estamos diciendo es:

-   Sácame datos de `jobs`
-   Únelos con `companies`
-   Hazlo cuando `jobs.company_id` coincida con `companies.id`

Así SQL puede cruzar la información correctamente y construir un resultado combinado.

## 🎯 El punto clave: la condición ON

La parte más importante del `JOIN` no es solo poner la palabra `JOIN`.

Lo realmente importante es la condición `ON`.

Porque esa condición define cómo se relacionan las tablas.

Si la escribes mal, el resultado también estará mal.

Por ejemplo, esto sería incorrecto:

```
SELECT title, name, locationFROM jobs jJOIN companies c ON j.company_id = j.id;
```

¿Por qué está mal?

Porque estás comparando dos columnas de la misma tabla `jobs`, en lugar de relacionar `jobs` con `companies`.

Lo correcto sería:

```
SELECT title, name, locationFROM jobs jJOIN companies c ON j.company_id = c.id;
```

Ahora sí estamos cruzando la tabla `jobs` con la tabla `companies`.

## 😵 Qué pasa cuando haces mal el cruce

En el vídeo se ve un error muy típico: una condición `ON` incorrecta que genera más resultados de los esperados.

Eso pasa porque, si relacionas mal las columnas, SQL empieza a combinar filas que no debería combinar.

El resultado puede ser un cruce extraño con más filas de las que tienen sentido.

Por ejemplo, si tienes:

-   3 trabajos
-   4 compañías

y haces mal la relación, puedes acabar con un resultado inflado que parece una mezcla rara de datos.

Cuando eso ocurre, muchas veces el problema no está en el `SELECT`, sino en el `ON`.

## 🏷️ Por qué los alias son tan útiles

Cuando trabajas con varias tablas, usar alias hace todo mucho más claro.

Por ejemplo:

```
SELECT j.title, c.name, j.locationFROM jobs jJOIN companies c ON j.company_id = c.id;
```

Aquí:

-   `j` representa `jobs`
-   `c` representa `companies`

Esto tiene varias ventajas:

-   Escribes menos
-   La consulta se entiende mejor
-   Evitas confusiones
-   Puedes indicar exactamente de qué tabla sale cada campo

Especialmente cuando varias tablas tienen columnas con nombres parecidos, los alias ayudan muchísimo.

## ⚠️ Columnas ambiguas: cuando SQL no sabe cuál quieres

Un problema muy común ocurre cuando ambas tablas tienen una columna con el mismo nombre.

Por ejemplo, `id`.

Si haces algo así:

```
SELECT idFROM jobs jJOIN companies c ON j.company_id = c.id;
```

SQL puede devolverte un error de columna ambigua.

¿Por qué?

Porque no sabe si quieres:

-   `jobs.id`
-   o `companies.id`

En ese caso tienes que ser explícito:

```
SELECT j.idFROM jobs jJOIN companies c ON j.company_id = c.id;
```

Ahora ya no hay duda.

## 🤔 Y si no hay ambigüedad, ¿hace falta indicar la tabla?

No siempre.

Si solo una de las tablas tiene una columna llamada `name`, puedes poner simplemente:

```
SELECT name
```

y SQL sabrá a qué columna te refieres.

Pero aunque no sea estrictamente necesario, muchas veces merece la pena ser explícito igualmente:

```
SELECT c.name
```

Porque cuando la consulta crece, esa claridad visual ayuda muchísimo a evitar errores.

## ✍️ Una forma más clara de escribir el JOIN

Una consulta bastante limpia podría quedar así:

```
SELECT  j.title,  c.name AS company_name,  j.location,  c.zip_code AS company_zip_codeFROM jobs jJOIN companies c ON j.company_id = c.id;
```

Aquí estamos haciendo varias cosas útiles:

-   Indicamos claramente de qué tabla sale cada campo
-   Renombramos `name` como `company_name`
-   Renombramos `zip_code` como `company_zip_code`

Esto hace que el resultado final sea mucho más fácil de entender.

## 🏷️ Renombrar columnas con AS

Cuando cruzas tablas, muchas veces los nombres originales ya no son tan claros.

Por ejemplo, `zip_code` tiene sentido dentro de `companies`, pero en el resultado final quizá es mejor dejar claro que pertenece a la empresa.

Para eso usamos `AS`:

```
SELECT c.zip_code AS company_zip_codeFROM jobs jJOIN companies c ON j.company_id = c.id;
```

Así el nombre de la columna en el resultado será más descriptivo.

Y esto ayuda mucho cuando luego usas esos datos desde una API, un backend o una interfaz.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   `JOIN` sirve para cruzar datos entre varias tablas
-   La relación se define con la cláusula `ON`
-   Si la condición `ON` está mal, el resultado también lo estará
-   Los alias hacen que las consultas sean más legibles
-   Cuando una columna existe en varias tablas, debes indicar de cuál la quieres
-   `AS` permite renombrar columnas para que el resultado sea más claro
-   Los `JOIN` son una parte fundamental del poder de SQL relacional

## 🚀 Aquí empieza la magia de las bases de datos relacionales

Hasta ahora hemos trabajado con una sola tabla.

Pero cuando empiezas a usar `JOIN`, ya entras de verdad en el corazón de las bases de datos relacionales.

Porque ahí es donde dejas de ver tablas aisladas y empiezas a trabajar con relaciones entre entidades.

Y eso cambia completamente lo que eres capaz de construir.

Los `JOIN` se entienden mucho mejor practicando: en aprendesql.dev tienes [introducción a JOINs](https://aprendesql.dev/uniendo-tablas) y [JOINs externos (LEFT, RIGHT y FULL)](https://aprendesql.dev/joins-externos).

> 💡 ****Tip****: Cuando un `JOIN` te devuelva más filas de las esperadas, revisa primero la condición `ON`. Muchas veces el problema no está en los datos, sino en cómo los estás relacionando.