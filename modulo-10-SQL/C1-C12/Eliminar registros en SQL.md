# 🗑️ Eliminar registros en SQL

Ya sabemos crear tablas, insertar datos y consultarlos.

Ahora toca una operación que parece sencilla… pero que puede salir muy mal si no tienes cuidado:

****eliminar datos****.

Porque sí, borrar registros en SQL es fácil.

****Demasiado fácil.****

Y precisamente por eso es una de esas operaciones que hay que entender bien desde el principio.

## 💣 DELETE - El comando más peligroso

La instrucción que se utiliza para eliminar registros es `DELETE`.

Por ejemplo:

```
DELETE FROM jobs;
```

Y aquí viene el problema:

esa consulta ****borra todos los registros de la tabla**** `jobs`.

No uno. No varios filtrados. ****Todos.****

## ⚠️ El error clásico: olvidarte del WHERE

Cuando quieres eliminar un registro concreto, normalmente necesitas acompañar el `DELETE` con una condición.

Por ejemplo:

```
DELETE FROM jobsWHERE id = 3;
```

Aquí sí estamos diciendo exactamente qué fila queremos borrar:

-   De la tabla `jobs`
-   Solo el registro cuyo `id` sea `3`

Y eso cambia absolutamente todo.

## 🧠 Regla de oro: si hay `DELETE`, piensa en `WHERE`

Hay una idea que merece quedarse grabada:

> Si escribes un `DELETE` y no has puesto `WHERE`, probablemente estás a punto de liarla.

Porque sin filtro, SQL entiende que quieres eliminar ****todo el contenido**** de la tabla.

Y sí, esto le ha pasado a muchísima gente.

## 😅 Tranquilidad: nos ha pasado a todos

Uno de los grandes clásicos del desarrollo es borrar más datos de los que querías por olvidar una condición.

Es el típico error que da respeto, y con razón.

Pero también conviene entender algo importante:

-   Es un error muy conocido
-   Le ha pasado a muchísima gente
-   Y por eso los motores modernos suelen intentar protegerte

## 🛡️ Mecanismos de seguridad en bases de datos modernas

Hoy en día, muchos motores de base de datos modernos incorporan mecanismos para evitar este tipo de errores.

En muchos casos:

-   Te muestran una advertencia
-   Bloquean ciertas operaciones peligrosas
-   O exigen desactivar un modo seguro para ejecutar borrados masivos sin filtro

Esto ocurre habitualmente en motores como:

-   PostgreSQL
-   MySQL

La idea es simple: si una operación puede arrasar con una tabla entera, lo normal es que la base de datos intente ponerte una barrera antes.

## ⚠️ SQLite puede ser más permisivo

En el caso de SQLite, esa protección puede no ser tan estricta.

Eso significa que una instrucción como esta:

```
DELETE FROM jobs;
```

puede ejecutarse directamente y borrar todos los registros sin preguntar demasiado.

Por eso, cuando trabajas con SQLite, todavía tienes que ir con más cuidado.

## 🔒 No desactives protecciones porque sí

En algunos entornos puedes encontrarte opciones de configuración para permitir operaciones peligrosas.

Sí, se puede hacer.

Pero no suele ser buena idea desactivar esas protecciones alegremente.

Si el motor te está avisando de que algo no es seguro, normalmente es porque realmente ****no lo es****.

## ✅ Buenas prácticas al borrar datos

Cuando vayas a eliminar registros, acostúmbrate a seguir estas ideas:

-   Revisa dos veces el `WHERE`
-   Asegúrate de que el filtro apunta exactamente a lo que quieres borrar
-   No ejecutes un `DELETE` con prisas
-   Desconfía especialmente de consultas que afectan muchas filas
-   Aprovecha las protecciones del motor en lugar de quitarlas

## 🧪 Un buen hábito antes de borrar

Un truco muy útil es pensar primero la consulta como si fuera un `SELECT`.

Por ejemplo, antes de hacer esto:

```
DELETE FROM jobsWHERE id = 3;
```

puedes comprobarlo con:

```
SELECT * FROM jobsWHERE id = 3;
```

Si el `SELECT` devuelve exactamente lo que quieres borrar, entonces ya tienes mucha más seguridad para ejecutar el `DELETE`.

## 🧠 Qué debes llevarte de esta clase

Lo importante de esta clase no es solo aprender la sintaxis de `DELETE`.

Es entender el riesgo que conlleva.

Quédate con estas ideas:

-   `DELETE` sirve para eliminar registros
-   Sin `WHERE`, elimina todo
-   Con `WHERE`, puedes borrar solo lo que necesitas
-   Muchos motores modernos intentan protegerte
-   SQLite puede ser más permisivo
-   Borrar datos exige más cuidado que leerlos o insertarlos

## 🚀 A partir de aquí

Ahora ya sabes una de las operaciones fundamentales del CRUD:

-   Crear
-   Leer
-   Actualizar
-   ****Eliminar****

Y también sabes por qué esta última merece un respeto especial.

En la siguiente parte lo normal será seguir profundizando en consultas más útiles, combinaciones de filtros o modificaciones de datos existentes.

Si quieres practicar `DELETE` con cuidado (y con ejercicios), tienes la [lección de eliminar registros en aprendesql.dev](https://aprendesql.dev/eliminando-registros).

> 💡 ****Tip****: antes de ejecutar un `DELETE`, pregúntate esto: “¿estoy seguro de que este `WHERE` apunta solo a lo que quiero borrar?” Si la respuesta no es un sí clarísimo, no pulses Enter todavía.