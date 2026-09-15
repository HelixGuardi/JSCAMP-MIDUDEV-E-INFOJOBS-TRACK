# 🗃️ Cómo funciona SQL

Para entender SQL de verdad, hay una idea clave que debes tener clara desde el principio: ****SQL no funciona como JavaScript ni como la mayoría de lenguajes que usamos a diario****.

Cuando escribes SQL, no le dices al sistema paso a paso cómo tiene que hacer algo.

Le dices ****qué resultado quieres obtener****.

Y esa diferencia cambia completamente la forma de pensar.

## 🧠 SQL es un lenguaje declarativo

Una de las características más importantes de SQL es que es un ****lenguaje declarativo****.

Eso significa que tú describes lo que quieres conseguir, pero ****no indicas el procedimiento exacto**** para lograrlo.

Por ejemplo, una consulta típica en SQL podría ser algo como esto:

```
SELECT * FROM jobs WHERE modality = 'remote';
```

Lo que estamos diciendo aquí es algo muy directo:

-   Quiero todos los datos
-   De la tabla `jobs`
-   Donde la modalidad sea `remote`

No estamos indicando cómo recorrer los datos, ni cómo filtrarlos internamente, ni qué algoritmo debe usar el motor de base de datos.

Simplemente estamos expresando el resultado que queremos obtener.

Y ahí está una de las grandes fortalezas de SQL.

## ⚖️ La diferencia entre SQL y JavaScript

Para entender mejor esto, viene bien compararlo con JavaScript.

En JavaScript, si quisiéramos hacer algo parecido, seguramente usaríamos un método como `filter`:

```
jobs.filter(job => job.modality === 'remote')
```

Esto sigue siendo bastante expresivo, pero ya estamos diciendo qué método usar para conseguir el resultado.

Y si nos fuésemos a un estilo todavía más imperativo, podríamos recorrer los datos manualmente con un bucle, comprobando elemento por elemento si cumple la condición.

Ahí ya no solo decimos qué queremos, sino también cómo recorrer la colección, cómo comprobar cada elemento y cuándo devolver un resultado.

SQL evita toda esa parte.

Tú declaras el objetivo y el motor de base de datos se encarga del resto.

## 🎯 Por qué esto es tan importante

Esta naturaleza declarativa es una de las razones por las que SQL ha tenido tantísimo éxito.

Porque permite trabajar con datos de forma muy potente sin tener que pensar constantemente en los detalles internos de ejecución.

Eso no significa que el rendimiento no importe o que no haya optimizaciones posibles.

Pero sí significa que, como desarrollador, puedes empezar desde una capa mucho más cercana a la intención:

> “Quiero estos datos con estas condiciones”.

Y eso hace que SQL sea especialmente útil cuando trabajas con tablas, relaciones y consultas complejas.

## 🏗️ Antes de consultar datos, tiene que existir la tabla

En el vídeo se usa como ejemplo una consulta sobre una tabla llamada `jobs`, pero también se deja claro un detalle importante:

****si la tabla no existe, la consulta no va a funcionar.****

Es decir, antes de poder hacer algo como:

```
SELECT * FROM jobs WHERE modality = 'remote';
```

tiene que existir realmente una tabla llamada `jobs` en la base de datos.

Esto parece obvio, pero es una buena forma de entender que SQL trabaja sobre una estructura previa de datos.

-   Primero definimos las tablas.
-   Luego almacenamos información.
-   Y después hacemos consultas sobre ellas.

## 🌍 SQL es un lenguaje universal, pero hay muchos motores

Otra idea importante de esta clase es que SQL no es una única base de datos.

SQL es el lenguaje, pero existen muchos ****motores de base de datos**** que lo implementan. Si quieres profundizar en las diferencias entre ellos, en [aprendesql.dev tienes una lección sobre motores de bases de datos](https://aprendesql.dev/motores-de-bases-de-datos).

Entre los más conocidos están:

-   SQLite
-   PostgreSQL
-   MySQL
-   MariaDB
-   SQL Server
-   Oracle Database

Todos ellos usan SQL, aunque cada uno tenga sus matices, extensiones o pequeñas diferencias.

La buena noticia es que la base del lenguaje es común.

Así que lo que aprendas aquí te servirá en prácticamente cualquier sistema relacional.

## 📦 SQLite como punto de partida

La clase propone empezar con SQLite, y tiene bastante sentido.

SQLite es una base de datos:

-   Muy ligera
-   Muy rápida
-   Muy portable
-   Sin necesidad de servidor
-   Guardada normalmente en un único archivo

Eso la hace ideal para aprender, experimentar y empezar a trabajar con SQL sin complicarte la vida con configuraciones complejas.

Además, es una tecnología extremadamente utilizada.

Está presente en aplicaciones, dispositivos, sistemas embebidos y herramientas de todo tipo.

Probablemente la has usado más veces de las que imaginas, incluso sin saberlo.

## 🐘 PostgreSQL, MySQL y MariaDB

Después de SQLite, otro motor muy importante es ****PostgreSQL****, una de las bases de datos de código abierto más usadas en la actualidad.

También aparece ****MySQL****, que durante muchos años fue una de las opciones más populares.

Tras su adquisición por Oracle, parte de su comunidad impulsó ****MariaDB****, una alternativa abierta basada en MySQL que ha recogido gran parte de ese legado.

Lo importante no es memorizar todos los motores desde ya.

Lo importante es entender que:

-   SQL es la base común
-   Los motores cambian algunos detalles
-   El conocimiento principal es transferible

## 🔁 Lo que aprendas aquí te servirá casi en cualquier sitio

Esta es una de las mejores noticias para cualquiera que empieza con SQL:

****no estás aprendiendo algo encerrado en una única herramienta.****

Estás aprendiendo una forma universal de trabajar con datos relacionales.

Luego cambiar de SQLite a PostgreSQL, o de PostgreSQL a MySQL, no suele implicar empezar desde cero.

Sí hay diferencias. Sí hay particularidades. Pero la base conceptual sigue siendo la misma.

## ⚠️ Ideas clave de esta clase

Quédate con esto:

-   SQL es un lenguaje declarativo
-   En SQL describes qué quieres, no cómo hacerlo
-   Consultar datos suele empezar con `SELECT`
-   Las consultas se realizan sobre tablas que ya existen
-   Hay muchos motores SQL, pero comparten una base común
-   SQLite es una excelente puerta de entrada para empezar
-   Lo que aprendas en SQL te servirá en casi cualquier base de datos relacional

## 🚀 A partir de aquí, toca practicar

Entender esta diferencia entre lo declarativo y lo imperativo es fundamental para avanzar con buen pie.

Porque aprender SQL no es solo aprender sintaxis.

Es aprender a pensar en datos de otra manera.

Y cuanto antes interiorices esa mentalidad, más fácil te resultará trabajar con consultas, filtros, relaciones y estructuras más avanzadas.

Para practicar esa forma de pensar, empieza por las [consultas básicas con SELECT en aprendesql.dev](https://aprendesql.dev/consultas-select-basicas).

> 💡 ****Tip****: Cuando escribas SQL, intenta pensar menos en “cómo recorrer los datos” y más en “qué resultado necesito”. Ese cambio de mentalidad es justo la clave.