# 📊 Ordenar y limitar resultados en SQL

Ya sabemos consultar datos y filtrarlos con `WHERE`.

Pero aún nos falta algo muy importante: ****controlar el orden en el que aparecen los resultados y cuántos queremos recuperar****.

Porque muchas veces no queremos todos los registros.

Queremos, por ejemplo:

-   Los primeros 10
-   Los más recientes
-   Los ordenados alfabéticamente
-   O simplemente una parte concreta de la información

Y para eso entran dos piezas fundamentales de SQL:

-   `ORDER BY`
-   `LIMIT`

## 🔠 ORDER BY - Ordenar resultados

`ORDER BY` sirve para ordenar los resultados de una consulta según una columna concreta.

Por ejemplo, si queremos recuperar títulos de trabajos ordenados alfabéticamente, podemos hacer algo así:

```
SELECT titleFROM jobsORDER BY title ASC;
```

Aquí estamos diciendo:

-   Recupera el campo `title`
-   Desde la tabla `jobs`
-   Y ordénalo de forma ascendente

Es decir, de la A a la Z.

## ⬆️ ASC - Orden ascendente

`ASC` significa ****ascending****.

Se usa cuando queremos ordenar de menor a mayor o de la A a la Z.

Por ejemplo:

-   Texto: A → Z
-   Números: 1 → 9
-   Fechas: más antiguas → más recientes

Además, en muchos casos `ASC` es el comportamiento por defecto.

Eso significa que si escribes:

```
SELECT titleFROM jobsORDER BY title;
```

normalmente SQL entenderá que quieres orden ascendente aunque no lo indiques explícitamente.

## ⬇️ DESC - Orden descendente

Si quieres justo lo contrario, usas `DESC`.

```
SELECT titleFROM jobsORDER BY title DESC;
```

En este caso el orden sería descendente.

Por ejemplo:

-   Texto: Z → A
-   Números: mayor → menor
-   Fechas: más recientes → más antiguas

Es muy útil cuando quieres ver primero los valores “más altos”, “más nuevos” o “últimos”.

## 🧩 Puedes ordenar por cualquier campo

No estás limitado a ordenar por el título.

Puedes ordenar por cualquier columna de la tabla:

-   `title`
-   `company`
-   `id`
-   `created_at`
-   `salary_min`

Lo importante es que definas claramente ****qué campo quieres usar como criterio de ordenación****.

## 🔢 LIMIT - Limitar el número de resultados

`LIMIT` sirve para restringir cuántas filas devuelve una consulta.

Por ejemplo:

```
SELECT id, companyFROM jobsLIMIT 1;
```

Esto devuelve solo un resultado.

Y aquí hay algo importante:

si no estás ordenando los datos de ninguna manera, ese resultado será simplemente el primero que la base de datos devuelva según su orden actual.

Y eso puede no ser lo que realmente quieres.

## ⚠️ Limitar sin ordenar puede darte resultados engañosos

Una consulta como esta:

```
SELECT id, companyFROM jobsLIMIT 1;
```

puede parecer correcta, pero en realidad estás diciendo:

-   Dame un solo resultado
-   El que sea primero según el orden actual

Eso no siempre es útil ni predecible.

Por eso, muchas veces `LIMIT` cobra sentido de verdad cuando lo combinas con `ORDER BY`.

## 🤝 ORDER BY + LIMIT - La combinación clave

Aquí es donde estas dos cláusulas se vuelven realmente potentes juntas.

Por ejemplo:

```
SELECT id, companyFROM jobsORDER BY id DESCLIMIT 1;
```

Esta consulta ya no dice simplemente “dame uno”.

Dice:

-   Ordena los resultados por `id` de mayor a menor
-   Y luego dame solo el primero

Es decir, en este caso estarías recuperando el registro con el ID más alto.

## 🧠 Por qué esto importa tanto

Porque muchas veces lo que quieres no es “cualquier resultado”.

Lo que quieres es:

-   El primero alfabéticamente
-   El último insertado
-   Los 5 más recientes
-   Los 10 más baratos
-   Los 3 salarios más altos

Y todo eso depende completamente del orden en que prepares los datos ****antes de limitarlos****.

## ⚙️ El orden de ejecución en SQL

Este tema merece ir con calma: en [aprendesql.dev hay una lección específica sobre el orden de ejecución en SQL](https://aprendesql.dev/orden-de-ejecucion).

Aquí hay una idea especialmente importante que suele confundir al principio:

> En SQL, una cosa es cómo escribes la consulta y otra distinta cómo se ejecuta realmente.

Por ejemplo, tú escribes algo así:

```
SELECT id, companyFROM jobsWHERE active = 1ORDER BY id DESCLIMIT 5;
```

Pero internamente SQL no lo procesa en ese orden visual.

Según lo que se explica en el vídeo, primero se evalúan partes como `FROM` y `WHERE`, y más adelante se aplican `ORDER BY` y `LIMIT`.

## 🧱 Una forma intuitiva de entenderlo

Puedes pensar en ello así:

1.  Primero se decide ****de dónde**** salen los datos
2.  Luego se decide ****qué filas cumplen las condiciones****
3.  Después se ****ordenan****
4.  Y finalmente se ****limitan****

Eso explica por qué `ORDER BY` y `LIMIT` juntos tienen tanto sentido:

-   Primero ordenas
-   Luego recortas

No al revés.

## 🤯 Por qué a veces SQL “hace cosas raras”

Muchas confusiones al empezar con SQL vienen de aquí.

Tú ves una consulta escrita en cierto orden y das por hecho que la base de datos la ejecuta exactamente así.

Pero no.

Y entender esa diferencia te ayuda muchísimo a razonar mejor las queries y a evitar errores mentales.

## 🧠 Qué debes llevarte de esta clase

Con esta clase ya dominas dos herramientas fundamentales para consultar datos mejor:

-   `ORDER BY` para ordenar resultados
-   `LIMIT` para controlar cuántos resultados quieres

Y además has visto una idea muy importante:

-   El orden en que escribes una query no siempre coincide con el orden real de ejecución

Eso parece un detalle pequeño, pero cambia mucho cómo entiendes SQL.

## 🚀 A partir de aquí

Ahora ya puedes hacer consultas bastante más útiles:

-   Ordenar por nombre, ID o cualquier otro campo
-   Recuperar solo una parte de los resultados
-   Combinar ordenación y límite de forma intencional
-   Entender mejor cómo piensa SQL al ejecutar una consulta

En la siguiente parte lo normal será seguir refinando consultas, agrupar datos o empezar a trabajar con operaciones más avanzadas.

Para practicar `ORDER BY` y `DISTINCT` con ejercicios, tienes la [lección de ordenar resultados en aprendesql.dev](https://aprendesql.dev/ordenando-resultados).

> 💡 ****Tip****: `LIMIT` sin `ORDER BY` suele significar “dame cualquiera”. `LIMIT` con `ORDER BY` significa “dame exactamente el que quiero”.