# ➕ Insertar más de un elemento a la vez

Ya sabemos insertar datos en una tabla. Pero claro, hacer inserciones de una en una no siempre es lo más práctico.

Muy a menudo vas a querer añadir ****varios registros de golpe**** con una sola sentencia SQL.

Y la buena noticia es que hacerlo es muy fácil.

## 🧠 Insertar varios registros en una sola consulta

Cuando ya tienes una sentencia `INSERT`, no hace falta repetirla entera cada vez que quieras añadir otro elemento.

En lugar de cerrar la sentencia con punto y coma después del primer valor, puedes seguir añadiendo más grupos separados por comas.

La idea general es esta:

```
INSERT INTO jobs (title, company, location, description, modality, seniority)VALUES  ('Frontend Developer', 'midu.dev', 'Barcelona', 'Crear interfaces increíbles', 'remote', 'junior'),  ('Backend Developer', 'Feralp SL', 'Tenerife', 'Crear SVGs muy bonitos', 'remote', 'junior'),  ('Full Stack Developer', 'Vercel', 'Argentina', 'Mejorar Next.js', 'remote', 'junior');
```

Fíjate en la estructura:

-   Usamos una sola vez `INSERT INTO`
-   Escribimos una sola vez `VALUES`
-   Y después añadimos múltiples registros entre paréntesis
-   Cada registro se separa con una coma
-   Solo al final cerramos con punto y coma

Esto permite insertar varios elementos de una vez de forma mucho más cómoda y eficiente.

## ⚡ Qué ocurre al ejecutar la consulta

Cuando ejecutas una sentencia así, SQL añade todos los registros en bloque.

Es decir, no necesitas lanzar una consulta por cada fila.

Con una sola sentencia puedes guardar varios elementos de una vez, lo que resulta especialmente útil cuando:

-   Estás cargando datos iniciales
-   Quieres poblar una tabla de ejemplo
-   Necesitas insertar lotes pequeños de datos
-   Quieres ahorrar tiempo escribiendo consultas repetidas

## 🔁 Se pueden repetir datos… hasta cierto punto

En el vídeo se ve algo importante: algunos registros pueden repetirse sin problema.

Por ejemplo, puedes insertar dos ofertas con valores parecidos o incluso idénticos en algunos campos, y SQL no se va a quejar necesariamente.

¿Por qué?

Porque no todos los campos tienen restricciones de unicidad.

Si una tabla no te obliga a que un valor sea único, puedes repetirlo.

Por ejemplo, podría repetirse:

-   El nombre de la empresa
-   La modalidad
-   La localización
-   El seniority
-   Incluso una descripción

Eso, por sí solo, no genera error.

## 🚫 Cuándo sí aparece un error: la clave primaria

El problema llega cuando intentas insertar un valor que debe ser único, como una clave primaria.

En el ejemplo del vídeo, al intentar insertar un registro con una `id` que ya existía, aparece un error de este estilo:

```
UNIQUE constraint failed: jobs.id
```

Esto ocurre porque la columna `id` está definida como `primary key`.

Y una clave primaria tiene una regla fundamental:

> No puede repetirse nunca dentro de la tabla.

Tiene toda la lógica del mundo, porque la clave primaria sirve para identificar de forma única cada fila.

Si dos filas tuvieran la misma `id`, la base de datos no podría distinguirlas correctamente.

## 🔐 Qué significa que una id sea única

Cuando defines un campo como clave primaria, estás diciendo que ese valor:

-   Identifica de forma única cada registro
-   No puede ser `NULL`
-   No puede repetirse

Por eso, si intentas insertar una fila con una `id` que ya existe, SQL lo bloquea automáticamente.

Esto no es una molestia del sistema.

Es una protección fundamental para mantener la integridad de los datos.

## 💬 Cómo se escriben comentarios en SQL

Al final del vídeo también aparece un detalle útil: cómo escribir comentarios en SQL.

La forma más habitual para comentarios de una sola línea es esta:

_`_-- Esto es un comentario_`_Copiar

Sirve para anotar partes del script, separar secciones o dejar aclaraciones mientras trabajas.

Por ejemplo:

_`_-- Crear tabla_`_`CREATE TABLE jobs (...);`_`_-- Insertar datos_`_`INSERT INTO jobs (...);`_`_-- Consultar datos_`_`SELECT * FROM jobs;`Copiar

Esto ayuda mucho a que tus scripts sean más legibles, sobre todo cuando empiezan a crecer.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   Puedes insertar varios registros con una sola sentencia `INSERT`
-   Cada grupo de valores se separa con comas
-   Solo se usa un punto y coma al final
-   Repetir datos no siempre da error
-   Lo que no puede repetirse es una clave primaria
-   Si duplicas una `id`, SQL lanzará un error de unicidad
-   Los comentarios en SQL se escriben con `--`

## 🚀 Lo siguiente: consultar los datos

Una vez que ya sabes crear registros e insertar varios elementos a la vez, el siguiente paso natural es consultar esos datos.

Porque guardar información está bien.

Pero el verdadero poder de SQL empieza cuando puedes recuperarla exactamente como la necesitas.

Para afianzar `INSERT INTO` con ejercicios interactivos, pásate por la [lección de insertar registros en aprendesql.dev](https://aprendesql.dev/insertando-registros).

> 💡 ****Tip****: Si vas a insertar muchos datos manualmente, revisa bien si estás incluyendo una `id` repetida. Es uno de los errores más comunes cuando empiezas con SQL.