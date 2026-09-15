# 🔄 Transacciones en SQL

Llegamos al último gran concepto de esta parte de SQL antes de meternos con el backend: ****las transacciones****.

Y aunque al principio puedan sonar como algo más avanzado, en realidad resuelven un problema muy concreto y muy común:

****qué pasa cuando una operación depende de varias consultas y una de ellas falla a mitad del proceso****.

Porque en una base de datos, dejar algo a medias suele ser una muy mala idea.

## 🧠 Qué es una transacción

Una transacción es una forma de ****agrupar varias operaciones**** para que se comporten como una sola unidad.

La idea es muy sencilla:

-   O se ejecutan todas correctamente
-   O no se ejecuta ninguna

No queremos estados intermedios. No queremos datos a medias. No queremos inconsistencias.

Queremos que la base de datos mantenga su integridad incluso cuando algo falla.

## 🎯 El problema que resuelven las transacciones

Imagina que quieres crear una nueva oferta de empleo.

Pero esa operación no consiste en una única consulta.

Podrías necesitar:

-   Insertar la empresa
-   Insertar la oferta de trabajo
-   Insertar la relación con tecnologías asociadas

Es decir, en realidad estás haciendo varias operaciones relacionadas entre sí.

Y ahí aparece el problema:

> ¿Qué ocurre si una de ellas falla después de que las anteriores ya se hayan ejecutado?

Por ejemplo:

1.  Se inserta la empresa correctamente
2.  Falla la inserción de la oferta
3.  O falla la inserción de la relación con tecnologías

Entonces te quedas con datos parciales en la base de datos.

Y eso puede generar errores, duplicados, reintentos problemáticos o relaciones rotas.

## 😬 Un caso típico: datos a medias

En el vídeo se plantea justo esta situación.

Se inserta una empresa, por ejemplo `Google`, y luego se intenta insertar también una oferta de trabajo relacionada con esa empresa y otras asociaciones.

Pero una de las sentencias falla por un error de sintaxis o por una validación.

¿Resultado?

La empresa sí se ha guardado. El resto no.

Eso significa que la operación completa no terminó bien, pero la base de datos sí ha cambiado parcialmente.

Y eso es peligroso.

Porque si el usuario reintenta la acción, ahora el sistema puede encontrarse con que esa empresa ya existe, o que parte de la información está duplicada, o que hay relaciones incompletas.

## 🛡️ Qué garantizan las transacciones

Aquí es donde una transacción marca la diferencia.

Con una transacción, le dices a la base de datos algo así:

> “Voy a hacer varias operaciones. Si todas salen bien, las confirmas. Si alguna falla, lo deshaces todo.”

Eso permite proteger una de las cosas más importantes en SQL:

****la integridad de los datos****.

Es decir, que los datos queden en un estado coherente y consistente, no en una mezcla rara de cosas a medio hacer.

## 🏗️ La estructura básica de una transacción

La idea general de una transacción suele expresarse así:

```
BEGIN TRANSACTION;INSERT INTO companies (id, name)VALUES (10, 'Google');INSERT INTO jobs (title, company_id)VALUES ('Frontend Developer', 10);INSERT INTO job_technologies (job_id, technology)VALUES (10, 'CSS');COMMIT;
```

Aquí lo que estamos diciendo es:

-   Empieza una transacción
-   Ejecuta estas operaciones
-   Si todo va bien, confirma los cambios con `COMMIT`

Pero si alguna de esas sentencias falla, lo correcto sería hacer un `ROLLBACK`, es decir, deshacer todo lo que se había hecho dentro de esa transacción.

## ❌ Si algo falla, no queremos dejar nada a medias

Esa es la regla más importante de todas:

****si una operación de la transacción falla, no queremos conservar las anteriores como si nada.****

Porque si no, la base de datos queda en un estado intermedio.

Y eso suele ser peor que no haber hecho nada.

Por eso las transacciones siguen esta filosofía:

-   Todo
-   O nada

## 🧩 Por qué son especialmente importantes con inserts, updates y deletes

Las transacciones se vuelven especialmente importantes cuando haces operaciones que modifican datos.

Por ejemplo:

-   `INSERT`
-   `UPDATE`
-   `DELETE`

Porque estas sentencias alteran el estado de la base de datos.

Y cuando varias de ellas forman parte de una única acción lógica del usuario, tiene sentido que se ejecuten como un bloque indivisible.

## 🧪 El detalle del playground

En el vídeo también se comenta algo importante: en el [playground de aprendesql.dev](https://aprendesql.dev/playground) donde se está haciendo la demo, el comportamiento de la transacción puede no reflejar exactamente lo que ocurriría en una base de datos real.

Eso puede pasar porque el entorno está montado en navegador o porque la ejecución de las sentencias no se está gestionando igual que en un sistema SQL real.

Así que, aunque en la demo concreta pueda no verse el rollback automático como esperarías, la idea correcta sigue siendo esta:

> En una base de datos SQL real, las transacciones son la forma estándar de asegurar que varias operaciones se ejecuten todas o ninguna.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   Una transacción agrupa varias operaciones en una sola unidad lógica
-   Su objetivo es que todo se ejecute correctamente o no se aplique nada
-   Son fundamentales para mantener la integridad de los datos
-   Evitan dejar información a medias cuando una consulta falla
-   Son especialmente útiles cuando varias inserciones o modificaciones dependen entre sí
-   Lo normal es usar `BEGIN`, ejecutar operaciones y terminar con `COMMIT`
-   Si algo falla, debe hacerse `ROLLBACK`

## 🚀 El paso previo perfecto antes del backend

Este concepto conecta directamente con lo que viene después.

Porque en cuanto empieces a trabajar con backend, vas a encontrarte con muchas operaciones que afectan a varias tablas y que no deberían quedar a medio camino.

Y ahí las transacciones dejan de ser teoría para convertirse en una herramienta imprescindible.

Para reforzar `BEGIN`, `COMMIT` y `ROLLBACK` con ejercicios, tienes la [lección de transacciones en aprendesql.dev](https://aprendesql.dev/transacciones).

> 💡 ****Tip****: Cada vez que una acción del usuario implique modificar varias tablas relacionadas, pregúntate esto: “¿Tiene sentido que esto se haga todo o nada?”. Si la respuesta es sí, probablemente necesitas una transacción.