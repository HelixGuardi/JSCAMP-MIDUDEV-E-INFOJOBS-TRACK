# 🧱 Las 3 primeras consultas SQL

Ahora que ya sabemos qué es SQL y por qué necesitamos una base de datos, toca empezar con lo importante: escribir nuestras primeras consultas reales.

Y la buena noticia es que con muy poco ya puedes cubrir una parte enorme del trabajo diario.

En esta clase vamos a ver las tres consultas SQL más habituales para empezar:

-   Crear una tabla
-   Eliminar una tabla
-   Insertar datos

Puede parecer poco, pero con esto ya empiezas a construir una base de datos funcional de verdad.

## 🏗️ 1. CREATE TABLE - Crear una tabla

La primera consulta imprescindible en SQL es `CREATE TABLE`.

Sirve para definir la estructura de una tabla, es decir:

-   Qué columnas va a tener
-   Qué tipo de dato tiene cada una
-   Qué restricciones o reglas debe cumplir cada campo

Por ejemplo, si queremos guardar ofertas de trabajo, podemos crear una tabla `jobs` con columnas como:

-   `id`
-   `title`
-   `company`
-   `location`
-   `description`
-   `modality`
-   `level`

Cada columna necesita una definición clara.

## 🧠 Qué definimos al crear una columna

Cuando declaramos una columna en SQL, normalmente indicamos tres cosas:

### 1\. El nombre

Es el identificador del campo.

Por ejemplo:

-   `id`
-   `title`
-   `company`

### 2\. El tipo de dato

Le dice a la base de datos qué clase de valor puede almacenar.

En SQLite, los tipos principales son muy pocos:

-   `TEXT`
-   `INTEGER`
-   `REAL`
-   `BLOB`

Eso hace que SQLite sea muy simple y muy cómodo para empezar.

## 📦 Tipos de datos básicos en SQLite

### TEXT

Sirve para cadenas de texto.

Por ejemplo:

-   Títulos
-   Nombres de empresa
-   Ubicaciones
-   Descripciones

### INTEGER

Sirve para números enteros.

También puede usarse para representar booleanos en SQLite.

Por ejemplo:

-   `true` se guarda como `1`
-   `false` se guarda como `0`

### REAL

Sirve para números decimales.

Muy útil para casos como:

-   `salary_min`
-   `salary_max`

### BLOB

Sirve para datos binarios.

Por ejemplo:

-   Archivos
-   Imágenes
-   Otros datos no textuales

Aunque se puede usar, no suele ser la opción más recomendable para guardar archivos grandes en una base de datos.

## ✅ Restricciones y atributos importantes

Además del tipo, también podemos indicar cómo debe comportarse una columna.

### PRIMARY KEY

Marca una columna como clave primaria.

Eso significa que:

-   Identifica de forma única cada fila
-   No puede repetirse
-   Es el identificador principal del registro

Un buen ejemplo mental es el DNI o el pasaporte: no puede haber dos personas con el mismo.

### AUTOINCREMENT

Hace que el valor se genere automáticamente al insertar nuevos registros.

Esto es útil para el `id`, porque así no tenemos que asignarlo manualmente cada vez.

### NOT NULL

Indica que el campo es obligatorio.

Si una columna tiene `NOT NULL`, no podremos insertar un registro sin darle valor.

Por ejemplo, tiene sentido usarlo en campos como:

-   `title`
-   `company`
-   `location`
-   `description`

## 🧾 Ejemplo mental de una tabla jobs

Una tabla `jobs` podría tener esta intención:

-   Un `id` entero
-   Que sea clave primaria
-   Que se autoincremente
-   Campos de texto obligatorios para describir la oferta
-   Algunos campos opcionales, como salario mínimo o máximo

Eso ya nos permite modelar bastante bien una oferta de empleo real.

## ⚠️ SQLite vs otros motores de base de datos

Aunque aquí usamos SQLite por simplicidad, es importante entender que los tipos de datos pueden cambiar según el motor de base de datos.

Por ejemplo, en PostgreSQL podrías encontrarte tipos como:

-   `VARCHAR`
-   `UUID`
-   `TIMESTAMP`
-   `JSON`

Es decir, la idea general de SQL se mantiene, pero algunos detalles dependen del motor que uses.

Por eso conviene entender bien los fundamentos antes de cambiar a bases de datos más complejas.

## 🗑️ 2. DROP TABLE - Eliminar una tabla

La segunda consulta clave es `DROP TABLE`.

Sirve para eliminar una tabla por completo.

Esto es útil cuando te has equivocado creando la estructura o cuando quieres empezar desde cero.

Por ejemplo, si creaste mal la tabla `jobs`, puedes borrarla y volver a crearla correctamente.

### 🛡️ DROP TABLE IF EXISTS

Una práctica muy útil al principio es usar:

```
DROP TABLE IF EXISTS jobs;
```

Esto le dice a SQL:

-   Elimina la tabla si existe
-   Si no existe, no falles

Esto es especialmente útil cuando estás construyendo un archivo de inicialización que:

-   Borra tablas anteriores
-   Las vuelve a crear
-   Inserta datos iniciales

Así puedes ejecutar el script varias veces sin problemas.

### 🔄 Un patrón muy común al empezar

Cuando estás aprendiendo o montando una base desde cero, es muy común seguir este flujo:

1.  Borras la tabla si existe
2.  La vuelves a crear
3.  Insertas los datos iniciales

Eso te permite rehacer todo rápidamente mientras iteras sobre la estructura.

## ✍️ 3. INSERT INTO - Insertar datos

Una vez que la tabla existe, toca llenarla.

Para eso usamos `INSERT INTO`.

Esta consulta sirve para añadir nuevos registros a una tabla.

Y aquí hay dos partes importantes:

-   La lista de columnas que quieres rellenar
-   La lista de valores, en el mismo orden

Por ejemplo, si insertas una oferta de trabajo, puedes indicar:

-   Título
-   Empresa
-   Ubicación
-   Descripción
-   Modalidad
-   Nivel

Y luego sus valores correspondientes.

### 🧩 El orden importa

Cuando usas `INSERT INTO`, el orden de los valores debe coincidir con el orden de las columnas.

Si no coinciden, los datos se insertarán mal o directamente fallará la consulta.

Por eso suele ser buena idea escribir explícitamente qué columnas vas a rellenar.

### 🪄 Campos opcionales y valores por defecto

Si una columna no es obligatoria, puedes omitirla al insertar.

En ese caso:

-   Si tiene valor por defecto, se usará ese valor
-   Si no tiene valor por defecto, quedará en `NULL`

Esto es muy útil para campos como:

-   `salary_min`
-   `salary_max`

También para columnas booleanas o fechas donde quieres que la base de datos ponga un valor automáticamente.

### ⏱️ Valores por defecto útiles

Hay columnas que pueden beneficiarse mucho de un valor por defecto.

Por ejemplo:

****Booleanos****

En SQLite puedes usar un `INTEGER` con valor por defecto `true` o `false`.

Internamente se acabará guardando como `1` o `0`.

****Fechas****

Aunque SQLite no tiene un tipo fecha como tal, puedes guardar fechas como texto y usar un valor por defecto como `CURRENT_TIMESTAMP`.

Así, cada vez que insertes un registro, la base de datos añadirá automáticamente la fecha actual.

## 🔢 Sobre los IDs autoincrementales

Cuando defines un `id` con `AUTOINCREMENT`, no hace falta incluirlo al insertar datos.

La base de datos generará automáticamente el siguiente identificador.

Eso es muy cómodo y suele ser útil a nivel interno.

Pero hay una advertencia importante.

### ⚠️ Ojo con exponer IDs incrementales públicamente

Aunque los IDs incrementales son prácticos dentro de la base de datos, no suele ser buena idea exponerlos públicamente.

¿Por qué?

Porque son predecibles.

Y cuando algo es predecible, puede convertirse en una puerta para intentar acceder a recursos que no deberían ser accesibles.

Por eso, en muchas aplicaciones reales:

-   El `id` interno existe
-   Pero hacia fuera se usan identificadores menos predecibles, como UUIDs

## 🧠 Qué debes llevarte de esta clase

Con estas tres consultas ya puedes hacer muchísimo:

-   `CREATE TABLE` para definir estructura
-   `DROP TABLE` para reiniciar desde cero
-   `INSERT INTO` para empezar a guardar datos reales

Y además has visto conceptos muy importantes:

-   Tipos de datos
-   Clave primaria
-   Campos obligatorios y opcionales
-   Valores por defecto
-   Autoincremento
-   Riesgos de usar IDs públicos predecibles

## 🚀 A partir de aquí

Con esto ya no estamos solo hablando de SQL de forma teórica.

Ahora ya puedes:

-   Diseñar una tabla real
-   Borrarla y rehacerla cuando haga falta
-   Insertar datos correctamente
-   Entender cómo se modela información en una base de datos

En la siguiente parte lo normal será empezar a consultar esos datos, filtrarlos y trabajar con ellos de verdad.

Si quieres practicar esto con ejercicios, en aprendesql.dev tienes lecciones de [crear tablas](https://aprendesql.dev/creando-tablas), [insertar registros](https://aprendesql.dev/insertando-registros) y [eliminar tablas](https://aprendesql.dev/eliminando-tablas).

> 💡 ****Tip****: si al empezar estás iterando mucho sobre la estructura, usar `DROP TABLE IF EXISTS` antes de `CREATE TABLE` te puede ahorrar bastantes dolores de cabeza.