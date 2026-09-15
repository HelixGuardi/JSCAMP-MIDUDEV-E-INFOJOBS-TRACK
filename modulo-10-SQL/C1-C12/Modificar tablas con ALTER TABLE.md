# 🛠️ Modificar tablas con ALTER TABLE

Hasta ahora hemos creado tablas, insertado datos, consultado resultados y eliminado registros.

Pero llega un momento inevitable en cualquier proyecto real:

****te das cuenta de que la tabla que diseñaste ya no encaja del todo con lo que necesitas.****

Y ahí aparece una pregunta muy importante:

****¿Tengo que borrar la tabla y volver a crearla desde cero?****

La respuesta es no.

Para eso existe `ALTER TABLE`.

## 🧠 Qué hace `ALTER TABLE`

`ALTER TABLE` sirve para modificar la estructura de una tabla que ya existe.

Eso es especialmente útil cuando:

-   Quieres añadir una nueva columna
-   Necesitas renombrar una tabla
-   Quieres cambiar el nombre de una columna
-   No quieres perder los datos que ya tienes guardados

Es decir, te permite evolucionar la base de datos sin empezar de cero.

## 🌍 Por qué esto es tan común en la vida real

En ejemplos pequeños parece que definir una tabla una vez es suficiente.

Pero en producción las cosas cambian constantemente.

Los datos evolucionan. Los requisitos cambian. Y tu modelo inicial casi nunca se queda intacto para siempre.

De hecho, en bases de datos reales es bastante habitual encontrarte con situaciones como estas:

-   Campos que ya no se usan
-   Columnas marcadas como obsoletas
-   Nuevos campos que sustituyen a otros más antiguos
-   Migraciones para adaptar estructuras existentes

Y cuando una tabla ya tiene miles o millones de registros, borrarla y recrearla no suele ser una opción razonable.

## ➕ Añadir una columna nueva

Uno de los casos más habituales con `ALTER TABLE` es añadir una columna.

Por ejemplo, si de repente quieres guardar la web de una oferta de trabajo, puedes extender la tabla sin tener que rehacerla.

La idea sería algo así:

```
ALTER TABLE jobsADD COLUMN website TEXT;
```

Con esto:

-   La tabla sigue existiendo
-   Los datos anteriores se conservan
-   Y simplemente aparece una nueva columna `website`

## 🕳️ Qué pasa con los datos anteriores

Cuando añades una nueva columna a una tabla que ya tenía registros, esos registros anteriores ****no tienen valor para ese nuevo campo****.

Por eso normalmente aparecerán con valor `NULL`.

Eso no significa que el tipo de la columna sea `NULL`.

Significa que:

-   La columna existe
-   Tiene su tipo, por ejemplo `TEXT`
-   Pero los registros antiguos no tenían ningún dato ahí todavía

Es una diferencia pequeña, pero importante.

## 🏷️ Renombrar una tabla

Otro caso bastante común es cambiar el nombre de una tabla.

Por ejemplo, podrías querer pasar de `jobs` a un nombre más descriptivo como `job_offers`.

La idea sería esta:

```
ALTER TABLE jobsRENAME TO job_offers;
```

Y en cuanto ejecutas la sentencia, la tabla pasa a tener el nuevo nombre.

## ⚠️ Renombrar tablas puede romper cosas

Aunque renombrar una tabla es útil, también puede ser delicado.

¿Por qué?

Porque si tu aplicación, tus consultas o tu backend estaban esperando una tabla con el nombre anterior, cambiarlo puede romper muchas cosas a la vez.

Así que sí, se puede hacer. Pero hay que hacerlo con bastante cuidado.

## ✏️ Renombrar una columna

También puedes cambiar el nombre de una columna concreta.

Por ejemplo, imagina que quieres que `title` pase a llamarse `job_title` porque ahora te parece más claro.

La idea sería algo así:

```
ALTER TABLE job_offersRENAME COLUMN title TO job_title;
```

Con eso mantienes los datos, pero mejoras el nombre de la columna para que la estructura sea más clara o más coherente con tu modelo.

## 🤔 Por qué sigue siendo `ALTER TABLE`

Puede chocar un poco que para cambiar una columna uses `ALTER TABLE` y no algo como `ALTER COLUMN`.

Pero tiene sentido si lo piensas así:

-   La operación afecta a una columna
-   Pero la estructura que realmente estás modificando es la tabla

Por eso la instrucción sigue partiendo de `ALTER TABLE`.

## 🧱 Lo importante no es solo la sintaxis

La sintaxis se aprende rápido.

Lo realmente importante es entender la mentalidad detrás de esto:

> Las bases de datos no son algo estático. Evolucionan con tu producto.

Y cuanto antes entiendas eso, antes empiezas a diseñar mejor:

-   Cambios graduales
-   Migraciones cuidadas
-   Compatibilidad con datos anteriores
-   Menos destrucción innecesaria

## ⚠️ Producción no es un playground

Cuando estás aprendiendo, borrar y volver a crear tablas puede parecer cómodo.

Pero en un entorno real eso puede ser carísimo.

Porque no estás trabajando con tres registros de prueba.

Estás trabajando con datos reales, usuarios reales y sistemas que dependen de esa estructura.

Por eso `ALTER TABLE` es una herramienta tan importante: te permite evolucionar sin arrasar.

## 🧠 Qué debes llevarte de esta clase

Con `ALTER TABLE` puedes hacer cambios fundamentales sobre una tabla existente, como:

-   Añadir nuevas columnas
-   Renombrar tablas
-   Renombrar columnas

Y lo más importante:

-   Sin borrar la tabla
-   Sin perder los datos existentes
-   Sin reconstruirlo todo desde cero

## 🚀 A partir de aquí

Ahora ya entiendes que trabajar con SQL no es solo crear estructuras desde cero.

También es saber ****adaptarlas cuando el proyecto cambia****.

Y eso es exactamente lo que pasa en cualquier aplicación real.

En la siguiente parte lo normal será seguir profundizando en operaciones más avanzadas o empezar a conectar todo esto con una aplicación real desde backend.

Si quieres practicar cambios de esquema con ejercicios, tienes la [lección de modificar tablas en aprendesql.dev](https://aprendesql.dev/modificando-tablas).

> 💡 ****Tip****: si sientes la tentación de borrar una tabla y crearla de nuevo solo para añadir una columna, probablemente no necesitas destruir nada. Lo que necesitas es `ALTER TABLE`.