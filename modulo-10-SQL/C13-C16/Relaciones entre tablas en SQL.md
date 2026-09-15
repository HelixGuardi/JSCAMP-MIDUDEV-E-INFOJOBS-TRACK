# 🔗 Relaciones entre tablas en SQL

Y llegamos a una de las partes más importantes de SQL:

****las relaciones entre tablas****.

De hecho, si las bases de datos SQL se llaman __relacionales__, es precisamente por esto.

Porque una tabla no suele representar algo aislado. Suele representar una parte del mundo real que ****se conecta con otras****.

Y entender eso cambia por completo cómo diseñas una base de datos.

## 🧠 Por qué las relaciones son tan importantes

Cuando modelamos datos, cada tabla suele describir una entidad concreta.

Por ejemplo:

-   Una tabla `jobs` puede representar ofertas de trabajo
-   Otra tabla `companies` puede representar empresas

Y claro, una oferta de trabajo ****pertenece**** a una empresa.

Ahí aparece la relación.

En vez de guardar toda la información de la empresa repetida dentro de cada oferta, lo que hacemos es conectar ambas tablas de forma estructurada.

## ⚠️ El problema de duplicar datos

Imagina que en la tabla `jobs` guardas directamente el nombre de la empresa como texto.

Puede parecer cómodo al principio, pero tiene un problema claro:

si esa empresa cambia de nombre, tendrías que actualizarlo en todos los sitios donde aparezca.

Por ejemplo:

-   Si `Vercel` cambia de nombre
-   Y tienes muchas ofertas suyas en la tabla `jobs`
-   Te tocaría modificar cada fila manualmente

Eso es frágil, difícil de mantener y propenso a errores.

## ✅ La idea correcta: separar entidades

La solución es modelar mejor los datos.

En vez de meter toda la información de la empresa dentro de `jobs`, creamos una tabla independiente para las empresas.

Por ejemplo, `companies` podría tener campos como:

-   `id`
-   `name`
-   `website`
-   `description`
-   `location`
-   `employees`

Así cada empresa vive en su propia tabla y se puede reutilizar desde otras partes de la base de datos.

## 🏗️ Crear una tabla para empresas

La idea del vídeo es separar claramente ambas entidades:

-   `jobs` para las ofertas
-   `companies` para la información de empresas

Eso permite que cada tabla tenga una responsabilidad clara y que la información no esté mezclada ni duplicada.

## 🧩 Cómo conectamos ambas tablas

Aquí entra el concepto clave:

****la clave foránea**** o `FOREIGN KEY`.

En lugar de guardar el nombre de la empresa dentro de `jobs`, guardamos un identificador.

Por ejemplo:

-   La tabla `companies` tiene un `id`
-   La tabla `jobs` tiene un `company_id`
-   Ese `company_id` apunta al `id` de `companies`

Así una fila de `jobs` queda relacionada con una fila concreta de `companies`.

## 🔑 FOREIGN KEY - La clave foránea

Una clave foránea sirve para indicar que una columna de una tabla referencia a otra tabla.

En este caso, la idea sería algo así:

```
CREATE TABLE jobs (  id INTEGER PRIMARY KEY AUTOINCREMENT,  title TEXT NOT NULL,  location TEXT NOT NULL,  description TEXT NOT NULL,  modality TEXT NOT NULL,  level TEXT NOT NULL,  company_id INTEGER,  FOREIGN KEY (company_id) REFERENCES companies(id));
```

Con esto estamos diciendo:

-   `company_id` existe dentro de `jobs`
-   Su valor debe apuntar a una empresa de la tabla `companies`
-   Ambas tablas quedan conectadas formalmente

## 🎯 Qué ganamos con esto

Este diseño tiene muchas ventajas.

### Evitamos duplicación

La información de una empresa se guarda una sola vez.

### Mantenemos consistencia

Si cambia algo de la empresa, se actualiza en un único sitio.

### Modelamos mejor el mundo real

Una empresa puede tener muchas ofertas, pero sus datos siguen estando centralizados.

### Preparamos la base para consultas más potentes

Después podremos combinar ambas tablas y recuperar información relacionada de forma mucho más flexible.

## 🔢 Cómo se ve la relación en la práctica

Imagina esta tabla `companies`:

-   Empresa 1 → Midu SL
-   Empresa 2 → Feralp Initiative
-   Empresa 3 → Capcom

Y luego en `jobs`:

-   Oferta A → `company_id = 1`
-   Oferta B → `company_id = 2`
-   Oferta C → `company_id = 3`

Eso significa que cada oferta no guarda el nombre de la empresa como texto, sino una referencia a su identificador real.

## 🗑️ Qué pasa si borramos una empresa

Aquí aparece otra pregunta importante:

****si borras un registro en una tabla relacionada, ¿qué debería pasar con la otra?****

Por ejemplo:

-   Si eliminas una empresa
-   ¿también deberían desaparecer sus ofertas?
-   ¿o deberían quedarse con el campo vacío?
-   ¿o deberías impedir el borrado?

No siempre hay una única respuesta correcta.

Depende del caso de uso.

En el vídeo se comenta justo esto: hay distintas estrategias posibles según el dominio del problema.

## 🧠 Estrategias posibles al borrar registros relacionados

Según el tipo de dato y la lógica del producto, podrías querer cosas distintas:

-   ****Borrado en cascada****: si desaparece la empresa, desaparecen también sus ofertas
-   ****Dejar el valor vacío o nulo****: si la relación ya no existe, el registro sigue vivo pero sin empresa asociada
-   ****Restringir el borrado****: no dejar borrar la empresa mientras existan registros relacionados

No hay una regla universal.

Hay que decidirlo según el significado real de los datos.

## 🔍 Por qué esto es tan potente

La gracia de las relaciones no es solo ordenar mejor la información.

La gracia real es que luego puedes hacer consultas mucho más útiles.

Por ejemplo:

-   Recuperar una oferta de trabajo
-   Y al mismo tiempo obtener datos de su empresa
-   Sin repetir información en cada fila

Eso convierte una base de datos en algo mucho más expresivo y mantenible.

## 🌍 Pensar en entidades, no solo en tablas

Una muy buena forma de diseñar bases de datos es dejar de pensar solo en columnas sueltas y empezar a pensar en entidades del mundo real.

Por ejemplo:

-   Oferta de trabajo
-   Empresa
-   Usuario
-   Pedido
-   Producto

Y después preguntarte:

****¿cómo se relacionan entre sí?****

Ahí es donde SQL brilla de verdad.

## 🧠 Qué debes llevarte de esta clase

La idea principal de esta clase es esta:

> Una base de datos relacional tiene valor precisamente porque sus tablas se conectan entre sí.

Quédate con estos conceptos:

-   Las tablas representan entidades
-   Las relaciones evitan duplicación de datos
-   `FOREIGN KEY` conecta una tabla con otra
-   `company_id` puede apuntar al `id` de `companies`
-   Las relaciones permiten mantener consistencia y hacer consultas más potentes
-   Al borrar datos relacionados, hay que decidir bien la estrategia

## 🚀 A partir de aquí

Ahora ya no solo estás creando tablas aisladas.

Ahora estás empezando a modelar un sistema real.

Y eso es exactamente lo que hace que SQL sea tan potente:

-   No solo guarda datos
-   También representa cómo esos datos se conectan entre sí

En la siguiente parte lo normal será aprovechar estas relaciones para hacer consultas combinadas entre varias tablas y recuperar información mucho más rica.

Si quieres profundizar en claves foráneas con ejercicios, tienes la [lección de claves foráneas en aprendesql.dev](https://aprendesql.dev/claves-foraneas).

> 💡 ****Tip****: si ves que estás repitiendo una y otra vez la misma información en muchas filas, probablemente no necesitas copiarla más. Probablemente necesitas una relación entre tablas.