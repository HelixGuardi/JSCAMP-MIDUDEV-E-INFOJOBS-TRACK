# 🔍 Filtrar resultados en SQL

Hasta ahora ya sabemos crear tablas e insertar datos.

Pero hay una pregunta clave:

****¿Cómo recuperamos exactamente lo que necesitamos sin traernos toda la base de datos?****

Porque sí, puedes hacer un `SELECT *`… pero casi nunca deberías hacerlo.

En esta clase vamos a ver cómo consultar datos correctamente y, sobre todo, cómo ****filtrarlos de forma eficiente****.

## 🧠 SELECT - Consultar datos

La consulta más básica en SQL es `SELECT`.

Sirve para recuperar información de una tabla.

Por ejemplo:

```
SELECT * FROM jobs;
```

Esto significa:

-   Dame todas las columnas
-   De todas las filas
-   De la tabla `jobs`

Es la consulta más típica… pero también la más peligrosa si abusas de ella.

## ⚠️ Por qué `SELECT *` suele ser mala idea

Aunque es útil para empezar, en aplicaciones reales suele ser un problema:

-   Traes más datos de los que necesitas
-   Afecta al rendimiento
-   Puede ser más caro en sistemas reales

Lo normal es ****pedir solo lo que necesitas****.

## 🎯 Seleccionar columnas concretas

En lugar de usar `*`, puedes indicar exactamente qué columnas quieres:

```
SELECT title, company FROM jobs;
```

Ahora:

-   Solo recuperas el título
-   Y la empresa

Mucho más eficiente y claro.

## 🏷️ Alias - Cambiar nombres de columnas

A veces quieres que los nombres sean más legibles o adaptados a tu app.

Puedes usar alias:

```
SELECT  title AS titulo,  company AS empresaFROM jobs;
```

Así puedes cambiar cómo se muestran los resultados sin modificar la base de datos.

## 🔢 LIMIT - Limitar resultados

También puedes limitar el número de resultados:

```
SELECT * FROM jobs LIMIT 1;
```

Esto es muy útil para:

-   Pruebas
-   Paginación
-   Evitar cargar demasiados datos

## 🎯 WHERE - Filtrar resultados

Aquí es donde empieza lo interesante.

`WHERE` permite filtrar filas según condiciones.

Por ejemplo:

```
SELECT * FROM jobsWHERE modality = 'remote';
```

Esto devuelve solo los trabajos en remoto.

También puedes filtrar por otras columnas:

```
SELECT * FROM jobsWHERE level = 'junior';
```

## 🔗 AND - Cumplir múltiples condiciones

Puedes combinar condiciones con `AND`:

```
SELECT * FROM jobsWHERE level = 'junior'AND location = 'Barcelona';
```

Esto devuelve solo los trabajos que cumplen ambas condiciones.

## 🔀 OR - Cumplir una u otra condición

También puedes usar `OR`:

```
SELECT * FROM jobsWHERE modality = 'remote'OR location = 'Tenerife';
```

Aquí basta con que se cumpla una de las condiciones.

Perfecto para búsquedas más flexibles.

## 🔎 LIKE - Búsqueda parcial de texto

Hasta ahora hemos hecho comparaciones exactas.

Pero muchas veces queremos buscar texto parcialmente.

Para eso usamos `LIKE`.

```
SELECT * FROM jobsWHERE title LIKE '%developer%';
```

Esto devuelve todos los trabajos cuyo título contiene la palabra “developer”.

## 🪄 El comodín %

El símbolo `%` es clave:

-   `%texto%` → contiene
-   `texto%` → empieza por
-   `%texto` → termina en

Por ejemplo:

```
SELECT * FROM jobsWHERE title LIKE 'F%';
```

Devuelve todos los títulos que empiezan por “F”.

## 🧠 Qué debes llevarte de esta clase

Con lo que has visto ya puedes hacer consultas mucho más útiles:

-   `SELECT` para recuperar datos
-   Elegir columnas específicas
-   Usar alias para mejorar legibilidad
-   Limitar resultados con `LIMIT`
-   Filtrar con `WHERE`
-   Combinar condiciones con `AND` y `OR`
-   Buscar texto con `LIKE`

Y lo más importante:

> No se trata de traer todos los datos, sino de traer ****solo los necesarios****.

## 🚀 A partir de aquí

Ahora ya puedes:

-   Consultar datos de forma eficiente
-   Filtrar exactamente lo que necesitas
-   Empezar a construir queries más complejas

En la siguiente clase lo normal será ordenar resultados, agrupar datos o hacer consultas más avanzadas.

Y si quieres practicar filtros a fondo, en aprendesql.dev tienes [filtrado con WHERE](https://aprendesql.dev/filtrando-datos) y [búsquedas avanzadas con BETWEEN, IN y LIKE](https://aprendesql.dev/busquedas-avanzadas).

> 💡 ****Tip****: si una query te devuelve demasiados datos, probablemente no es un problema de la base de datos… es que te falta un `WHERE`.