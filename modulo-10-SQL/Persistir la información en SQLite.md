# 💾 Persistir la información en SQLite

Hasta ahora todo funcionaba bien, pero había un detalle importante: los datos estaban viviendo ****solo en memoria****.

Eso significa que cada vez que ejecutabas el script, empezabas prácticamente desde cero.

Y claro, eso está bien para hacer pruebas rápidas, pero en cuanto quieres que la información sobreviva entre ejecuciones, necesitas ****persistirla en un archivo****.

## 🧠 De memoria a archivo

Cuando trabajas con SQLite en memoria, todo es temporal.

Mientras el proceso está vivo, puedes crear tablas, insertar datos y consultarlos.

Pero en cuanto vuelves a ejecutar o reinicias, esos cambios desaparecen.

La solución es muy simple: en lugar de usar una base de datos en memoria, le dices a SQLite que guarde la información en un archivo.

Por ejemplo, usando algo como:

```
const db = new Database('jobs.db')
```

Con eso, SQLite crea un archivo físico llamado `jobs.db` y empieza a guardar ahí toda la información.

## 📁 Qué cambia al usar un archivo

En el momento en que apuntas SQLite a un archivo, los datos ya no se pierden al volver a ejecutar el código.

Eso significa que:

-   Las tablas siguen existiendo
-   Los registros insertados permanecen
-   Los cambios se conservan entre ejecuciones

Y esa es justo la gracia de persistir la información.

Ahora sí estás trabajando con una base de datos que guarda estado real.

## ⚠️ El primer problema al volver a ejecutar: la tabla ya existe

Aquí aparece una consecuencia lógica de la persistencia.

Si tu script hace esto:

```
CREATE TABLE jobs (...);
```

la primera vez funcionará bien.

Pero la segunda vez, como la tabla ya existe dentro de `jobs.db`, SQLite te devolverá un error.

Tiene sentido.

Ya no estás en memoria vacía cada vez. Ahora estás reutilizando una base de datos existente.

Por eso necesitas cambiar la sentencia para que solo cree la tabla si todavía no existe.

## 🛠️ Usar IF NOT EXISTS

La forma habitual de resolverlo es esta:

```
CREATE TABLE IF NOT EXISTS jobs (...);
```

Con `IF NOT EXISTS`, le estás diciendo a SQLite:

-   Si la tabla no existe, créala
-   Si ya existe, no hagas nada y sigue

Eso evita que el script falle al volver a ejecutarse.

Y es una práctica muy común cuando tienes scripts de inicialización.

## 🚫 El segundo problema: IDs repetidas

Una vez resuelto el problema de la tabla, aparece otro nuevo.

Si vuelves a ejecutar el script y haces otra vez los mismos `INSERT`, puedes intentar meter registros con claves primarias que ya existen.

Por ejemplo, si ya insertaste un registro con `id = 1`, volver a hacer este insert provocará un error:

```
INSERT INTO jobs (id, title)VALUES (1, 'Frontend Developer');
```

¿Por qué?

Porque esa `id` ya estaba guardada en el archivo y la clave primaria no puede repetirse.

Así que, al persistir datos, ya no puedes pensar en cada ejecución como una base vacía.

Ahora el estado anterior importa.

## 🔁 Persistir significa convivir con el estado anterior

Este es uno de los cambios mentales importantes al salir del modo memoria.

Cuando persistes en archivo:

-   Lo que hiciste antes sigue ahí
-   La siguiente ejecución parte del estado anterior
-   Tus scripts deben tener en cuenta que la base ya contiene información

Por eso empiezan a aparecer decisiones como:

-   Crear tablas solo si no existen
-   Evitar inserts duplicados
-   Generar IDs nuevas
-   Comprobar si un dato ya estaba guardado
-   Diseñar scripts idempotentes cuando tenga sentido

## ✅ Cómo comprobar que realmente se está guardando

En el vídeo se ve claramente: al cambiar IDs e insertar nuevos registros, esos datos siguen apareciendo después.

Por ejemplo, insertas unos registros, vuelves a ejecutar, consultas la tabla y los registros siguen ahí.

Eso demuestra que la información ya no está viviendo solo en memoria, sino que se está escribiendo en el archivo `jobs.db`.

Ese archivo es el que contiene el estado persistente de la base de datos.

## 📦 Qué significa que el archivo sea binario

Otro detalle que se comenta es que el archivo `jobs.db` no se puede leer fácilmente como si fuera un `.txt`.

Eso es completamente normal.

Una base de datos SQLite es un archivo binario, no un archivo de texto plano.

Así que aunque lo veas en el sistema de archivos, no lo vas a abrir para leerlo cómodamente a ojo.

La forma correcta de interactuar con él es a través de SQLite, con consultas SQL o herramientas compatibles.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   Una base de datos en memoria pierde los cambios al volver a ejecutar
-   SQLite puede persistir datos en un archivo como `jobs.db`
-   Al usar un archivo, las tablas y registros permanecen entre ejecuciones
-   Si vuelves a ejecutar `CREATE TABLE`, puede fallar porque la tabla ya existe
-   `CREATE TABLE IF NOT EXISTS` evita ese problema
-   Si repites inserts con la misma clave primaria, aparecerán errores de unicidad
-   Persistir datos implica trabajar sobre un estado que ya existía antes

## 🚀 Aquí empieza la sensación de “base de datos real”

Persistir la información cambia bastante el juego.

Hasta ahora podías pensar en las consultas como pruebas aisladas.

Pero en cuanto guardas la información en un archivo, ya empiezas a trabajar con algo mucho más parecido a una base de datos real:

-   Tiene estado
-   Conserva cambios
-   Arrastra decisiones anteriores
-   Te obliga a pensar en qué pasa cuando ejecutas el sistema más de una vez

Y eso es exactamente el paso natural antes de meterte de lleno con el backend.

Para seguir con SQLite desde Node.js, tienes la [guía de SQLite con Node en aprendesql.dev](https://aprendesql.dev/sqlite-con-node).

> 💡 ****Tip****: Cuando pases de una base en memoria a una persistente, revisa siempre tus scripts iniciales. Muchas veces funcionan perfecto la primera vez… y fallan justo en la segunda.