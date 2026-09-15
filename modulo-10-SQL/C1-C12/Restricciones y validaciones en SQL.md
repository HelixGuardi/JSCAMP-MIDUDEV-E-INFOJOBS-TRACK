# 🛡️ Restricciones y validaciones en SQL

Cuando trabajas con bases de datos no todo vale.

Hay operaciones que pueden ser más limitadas de lo que esperas, especialmente en motores como SQLite, y además hay una idea fundamental que conviene tener clara desde el principio:

****la base de datos también debe proteger la calidad de los datos****.

No basta con validar solo en el backend.

La base de datos tiene que actuar como última línea de defensa.

## 🧱 No siempre puedes modificar una tabla como quieres

Una de las cosas que muestra esta clase es que cambiar la estructura de una tabla no siempre es tan directo.

Por ejemplo, durante mucho tiempo en SQLite ni siquiera se podía eliminar una columna con `DROP COLUMN`.

Hoy ya se puede en versiones modernas, pero fue una limitación real durante bastante tiempo.

Por ejemplo, algo como esto ahora sí puede funcionar:

```
ALTER TABLE job_offersDROP COLUMN website;
```

Pero no siempre ha sido así.

Y eso viene bien para recordar algo importante:

****No todos los motores SQL ofrecen las mismas capacidades estructurales en todo momento.****

## ⚠️ Algunas operaciones siguen siendo incómodas

Aunque ciertas mejoras han llegado con el tiempo, sigue habiendo cambios estructurales que no son tan cómodos de hacer en SQLite.

Entre ellos:

-   Cambiar el tipo de una columna existente
-   Añadir ciertas restricciones a columnas ya creadas
-   Modificar esquemas complejos sin rehacer parte de la tabla

En muchos casos, la solución real pasa por hacer este proceso:

1.  Crear una tabla nueva con la estructura correcta
2.  Copiar los datos desde la tabla anterior
3.  Eliminar la tabla vieja
4.  Renombrar la nueva tabla

No es especialmente elegante, pero es una estrategia muy habitual cuando el motor no permite el cambio directo.

## 💾 Antes de tocar una tabla: copia de seguridad

Aquí hay una recomendación que no tiene nada de opcional:

****haz copias de seguridad antes de modificar la estructura de una tabla.****

Porque una cosa es jugar en un playground y otra muy distinta tocar una base de datos con información real.

Si cambias columnas, eliminas datos o rehaces tablas sin respaldo, puedes romper cosas importantes o perder información que luego no podrás recuperar.

Así que esta regla merece quedarse grabada:

> Antes de tocar el esquema de una tabla, haz backup.

## ✅ Validar en backend está bien, pero no es suficiente

Uno de los puntos más interesantes de esta clase es la defensa de las validaciones en base de datos.

Sí, claro que tiene sentido validar en el backend.

Y de hecho debes hacerlo.

Pero incluso así, la base de datos no debería aceptar cualquier cosa.

Porque si por error, descuido o una mala integración acaba llegando un dato inválido, la base de datos debería ser capaz de rechazarlo.

Por eso tiene sentido pensar en la base de datos como:

-   Una capa de almacenamiento
-   Pero también una capa de protección

## 🧠 La base de datos es el último bastión

La idea clave aquí es esta:

> La base de datos es el último bastión de defensa de tus datos.

Eso no significa meter todas las reglas de negocio del universo dentro del esquema.

Pero sí significa que ciertas validaciones críticas deberían existir ahí también.

Especialmente las que garantizan que los datos tengan una forma y unos valores mínimos coherentes.

Por ejemplo:

-   Que un campo obligatorio no sea `NULL`
-   Que una clave primaria sea única
-   Que un valor pertenezca a un conjunto permitido
-   Que un número esté dentro de un rango razonable

## 🎛️ Usar CHECK para restringir valores permitidos

En la clase se plantea un caso muy claro: el campo `modality`.

Si en tu aplicación solo existen tres modalidades válidas:

-   `remote`
-   `office`
-   `hybrid`

entonces no tiene sentido permitir que alguien inserte cualquier texto aleatorio.

Para eso puedes usar una restricción `CHECK`.

Por ejemplo:

```
CREATE TABLE jobs (  id INTEGER PRIMARY KEY,  title TEXT NOT NULL,  modality TEXT NOT NULL CHECK (modality IN ('remote', 'office', 'hybrid')));
```

Con esto, la base de datos ya no aceptará cualquier valor para `modality`.

Solo aceptará esos tres.

## 🚫 Qué pasa si intentas insertar un valor inválido

Si después intentas hacer algo como esto:

```
INSERT INTO jobs (id, title, modality)VALUES (1, 'Frontend Developer', 'asdasdasd');
```

la base de datos rechazará la inserción.

Y eso es exactamente lo que queremos.

Porque significa que no se está colando basura en una columna que debería seguir unas reglas concretas.

Lo mismo ocurriría si intentases meter otro valor cualquiera que no esté dentro del conjunto permitido.

## 🔍 CHECK sirve para mucho más que listas cerradas

Aunque en el ejemplo se usa para restringir textos concretos, `CHECK` puede servir para bastantes más cosas.

Por ejemplo:

-   Asegurar que un número esté entre dos valores
-   Verificar que un campo cumpla una condición lógica
-   Evitar edades negativas
-   Impedir salarios fuera de rango
-   Controlar formatos simples o reglas básicas

No sustituye toda la lógica de validación del backend, pero sí permite blindar reglas importantes directamente en la tabla.

## ⚖️ No hace falta meter todas las validaciones del mundo

También hay un matiz importante aquí: no se trata de convertir la base de datos en un monstruo lleno de reglas imposibles de mantener.

No todas las validaciones tienen que vivir ahí.

Pero las más importantes, las que garantizan coherencia y evitan errores graves, sí suelen merecer estar presentes.

Una buena forma de pensarlo es esta:

-   El frontend ayuda al usuario
-   El backend valida la lógica
-   La base de datos protege la integridad final

Las tres capas pueden colaborar.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   En SQLite, modificar tablas puede tener limitaciones
-   Algunas operaciones estructurales obligan a recrear tablas
-   Antes de cambiar el esquema, conviene hacer copias de seguridad
-   Validar solo en el backend no siempre es suficiente
-   La base de datos debe actuar como última línea de defensa
-   `CHECK` permite restringir los valores permitidos en una columna
-   Las restricciones ayudan a mantener datos coherentes y útiles

## 🚀 Datos válidos o problemas futuros

Cuando una base de datos empieza a llenarse de valores inconsistentes, todo se vuelve más difícil:

-   Las consultas fallan más
-   La lógica se complica
-   Las migraciones se vuelven peligrosas
-   El producto empieza a comportarse de forma rara

Por eso las restricciones no son una molestia.

Son una forma de protegerte a ti mismo en el futuro.

Para reforzar cómo se definen tablas con restricciones desde el principio, revisa la [lección de crear tablas en aprendesql.dev](https://aprendesql.dev/creando-tablas).

> 💡 ****Tip****: Si hay un campo que solo admite unos pocos valores válidos, plantéate muy seriamente usar `CHECK` desde el momento en que diseñas la tabla. Te puede ahorrar muchos dolores de cabeza.