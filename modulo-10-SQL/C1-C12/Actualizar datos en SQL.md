# ✏️ Actualizar datos en SQL

Una vez que ya has creado la tabla, insertado datos y aprendido a consultarlos, llega un momento muy habitual: ****te das cuenta de que un dato está mal y necesitas corregirlo****.

Ahí es donde entra en juego `UPDATE`.

Con `UPDATE` puedes modificar registros que ya existen en la base de datos sin tener que borrarlos y volverlos a crear.

## 🧠 La estructura básica de `UPDATE`

La idea general es muy sencilla:

```
UPDATE jobsSET modality = 'remote'WHERE id = 3;
```

Lo que estás diciendo aquí es:

-   Quiero actualizar la tabla `jobs`
-   Quiero cambiar el valor de `modality`
-   Quiero hacerlo solo en el registro cuya `id` sea `3`

Esa última parte es la clave.

Porque `UPDATE` sin `WHERE` puede convertirse en una pequeña catástrofe.

## ⚠️ Mucho cuidado con olvidarte del WHERE

Este es, probablemente, uno de los errores más importantes que debes evitar al trabajar con SQL.

Si escribes algo así:

```
UPDATE jobsSET modality = 'remote';
```

sin cláusula `WHERE`, se actualizarán ****todas las filas**** de la tabla.

Todas.

No una. No la que tú querías. ****Todas.****

Esto ocurre porque SQL interpreta que no has especificado ninguna condición, así que aplica el cambio a todos los registros existentes.

Por eso hay que interiorizar esta idea desde el principio:

> Si usas `UPDATE`, revisa siempre dos veces que el `WHERE` esté bien.

En el vídeo se insiste mucho en esto, y con razón. Porque es un error muy fácil de cometer y puede liarla bastante.

## 🎯 Actualizar un único registro

Cuando sí usas `WHERE`, puedes apuntar exactamente al registro que quieres modificar.

Por ejemplo, si detectas que una oferta con una `id` concreta no era híbrida sino remota, puedes hacer algo así:

```
UPDATE jobsSET modality = 'remote'WHERE id = 3;
```

Y entonces solo se modifica una fila.

Eso es justo lo que normalmente quieres cuando haces una corrección puntual.

## 🧪 Cómo comprobar si lo has hecho bien

Después de ejecutar un `UPDATE`, lo ideal es consultar la tabla para comprobar el resultado.

Por ejemplo:

```
SELECT * FROM jobs;
```

Así puedes verificar si:

-   Solo se ha modificado la fila correcta
-   El valor nuevo es el esperado
-   No has tocado registros de más por accidente

Es una buena costumbre, especialmente cuando estás aprendiendo o haciendo cambios delicados.

## 🔁 Actualizar varios campos a la vez

Otra idea importante de esta clase es que no hace falta hacer varios `UPDATE` para cambiar varios campos del mismo registro.

Puedes hacerlo todo en una sola sentencia separando los cambios con comas.

Por ejemplo:

```
UPDATE jobsSET modality = 'remote',    level = 'senior'WHERE id = 3;
```

Esto actualiza dos columnas a la vez en el mismo registro.

Es mucho más limpio, más claro y más eficiente que lanzar varias sentencias separadas.

## ❌ Un error muy común: apuntar a una id que no existe

En el vídeo también aparece una situación interesante: ejecutar una consulta aparentemente correcta, pero que no cambia nada.

¿Por qué?

Porque la condición del `WHERE` estaba apuntando a una `id` que en realidad no existía.

Por ejemplo:

```
UPDATE jobsSET modality = 'remote',    level = 'senior'WHERE id = 5;
```

Si no existe ningún registro con `id = 5`, entonces no se actualiza nada.

Y eso puede confundirte, porque la consulta parece correcta, pero el problema está en que no hay ninguna fila que cumpla la condición.

Por eso, cuando un `UPDATE` “no funciona”, conviene revisar:

-   Si la columna existe
-   Si el valor que estás asignando tiene sentido
-   Y sobre todo, si el `WHERE` apunta realmente a una fila existente

## ↩️ Deshacer cambios en un playground

En el vídeo también se menciona algo útil del entorno de aprendizaje: el botón de deshacer del [playground de aprendesql.dev](https://aprendesql.dev/playground).

Eso permite volver al estado anterior cuando has metido la pata haciendo un `UPDATE` masivo o una modificación equivocada.

En un entorno real no siempre tendrás ese salvavidas tan cómodo, así que mejor acostumbrarse desde ya a ser cuidadoso con las sentencias de actualización.

Especialmente con `UPDATE` y `DELETE`.

## 📌 Ideas clave de esta clase

Quédate con esto:

-   `UPDATE` sirve para modificar datos existentes
-   `SET` indica qué columnas quieres cambiar
-   `WHERE` indica qué filas deben verse afectadas
-   Si omites `WHERE`, cambiarás ****todas**** las filas de la tabla
-   Puedes actualizar varios campos a la vez separándolos con comas
-   Si el `WHERE` no encuentra ninguna fila, no se actualiza nada
-   Antes de ejecutar un `UPDATE`, conviene revisar la condición con cuidado

## 🚀 Actualizar bien también es saber no liarla

Aprender SQL no es solo saber consultar o insertar datos.

También es saber modificar información con seguridad.

Porque en bases de datos reales, un `UPDATE` mal lanzado puede cambiar muchísimo más de lo que pretendías.

Y aquí hay una regla de oro que merece la pena recordar:

> Antes de ejecutar un `UPDATE`, asegúrate de que el `WHERE` apunta exactamente a lo que quieres tocar.

Para practicar `UPDATE` con ejercicios y feedback inmediato, tienes la [lección de modificar datos en aprendesql.dev](https://aprendesql.dev/modificando-datos).

> 💡 ****Tip****: Una práctica muy buena es escribir primero el `WHERE` mentalmente antes incluso del `SET`. Así reduces mucho la probabilidad de olvidarte de la condición.