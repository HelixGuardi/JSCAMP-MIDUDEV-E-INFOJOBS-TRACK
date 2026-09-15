# 🗄️ ¿Qué es SQL?

Antes de empezar a trabajar con bases de datos en una aplicación real, hay algo importante que entender: por qué necesitamos SQL y qué problema viene a resolver.

Hasta ahora, podemos tener una API funcionando perfectamente, responder peticiones y devolver datos. El problema aparece cuando esos datos no se persisten de verdad.

Si los estamos guardando en memoria o en un archivo temporal, en cuanto reiniciamos el servidor, todo desaparece.

Y ahí es donde entra en juego una base de datos.

## 💾 El problema de guardar datos solo en memoria

Cuando construyes una API al principio, es bastante común trabajar con datos en memoria o incluso con un archivo JSON para simular persistencia.

Eso puede servir para aprender o para hacer pruebas rápidas, pero tiene un límite muy claro:

-   Los datos no sobreviven al reinicio del servidor
-   No hay una estructura sólida para crecer
-   Gestionar información real se vuelve frágil
-   No es una solución adecuada para una aplicación seria

Si queremos que una aplicación pueda guardar, modificar y recuperar información de forma fiable, necesitamos una base de datos.

## 🧠 Qué es una base de datos

Una base de datos es, literalmente, un sitio donde guardamos datos de forma persistente.

Pero no solo sirve para guardar información. También nos permite:

-   Consultarla
-   Modificarla
-   Organizarla
-   Relacionarla
-   Mantenerla disponible aunque la aplicación se reinicie

Es decir, no se trata solo de almacenar datos, sino de poder trabajar con ellos de forma estructurada y eficiente.

## 🔤 Qué es SQL

SQL significa ****Structured Query Language****.

Es un lenguaje estándar que se utiliza para interactuar con bases de datos relacionales.

Con SQL podemos hacer operaciones como:

-   Crear datos
-   Leer datos
-   Actualizar datos
-   Eliminar datos

O dicho de otra forma, SQL es el lenguaje con el que hablamos con una base de datos para decirle qué queremos hacer con la información.

## 🔗 Qué significa que una base de datos sea relacional

Cuando hablamos de una base de datos relacional, nos referimos a una base de datos donde los datos están conectados entre sí mediante ****relaciones****.

Por ejemplo:

-   Podemos tener una tabla de empleados
-   Otra tabla distinta con otros datos asociados
-   Y una relación entre ambas mediante identificadores

Eso permite representar información del mundo real de una forma mucho más potente.

No solo guardamos datos aislados. Guardamos datos que tienen sentido entre ellos.

## 📋 Cómo se organizan los datos en SQL

En SQL, los datos se organizan usando ****tablas****.

Y esas tablas tienen dos elementos clave:

### Filas

Las filas representan los ****registros****.

Por ejemplo, una fila puede ser:

-   Un trabajo
-   Un usuario
-   Una película
-   Un videojuego

Cada fila es una unidad concreta de información.

### Columnas

Las columnas representan los ****campos**** de cada registro.

Por ejemplo:

-   Título
-   Empresa
-   Identificador
-   Categoría
-   Ubicación

Las columnas definen qué información tiene cada fila.

Dicho de forma simple:

-   Las ****filas**** son los datos
-   Las ****columnas**** describen esos datos

## 🧩 Las relaciones entre tablas

Una de las cosas más importantes de SQL y de las bases de datos relacionales es que podemos conectar tablas entre sí.

Esto suele hacerse mediante ****claves o identificadores****.

Por ejemplo:

-   Un empleado puede tener un identificador único
-   Ese identificador puede aparecer en otra tabla
-   Gracias a eso podemos relacionar ambas tablas

Así conseguimos modelar información más compleja sin duplicar datos innecesariamente.

## 🏗️ Por qué SQL sigue siendo tan importante

Aunque SQL es un lenguaje con muchísimos años de historia, sigue siendo una pieza fundamental en el desarrollo actual.

Se creó en los años 70, en IBM, y hoy en día lo utiliza prácticamente toda la industria.

Y eso lo convierte en uno de esos conocimientos que merece muchísimo la pena aprender porque:

-   Es un estándar consolidado
-   Está presente en infinidad de proyectos reales
-   Se usa en backend, análisis de datos y herramientas internas
-   Te ayuda a entender mejor cómo persisten los datos las aplicaciones

## 🔄 Qué operaciones podemos hacer con SQL

SQL se utiliza para manipular los datos que tenemos en las tablas.

Las operaciones más habituales son las clásicas de cualquier sistema de datos:

-   Crear
-   Leer
-   Actualizar
-   Eliminar

Estas cuatro operaciones son la base de casi cualquier aplicación que trabaje con información persistente.

## ⚠️ Idea clave de esta clase

La idea más importante de esta clase es esta:

> Mientras los datos vivan solo en memoria, tu aplicación no tiene persistencia real.

SQL aparece precisamente para solucionar eso, permitiéndonos trabajar con una base de datos relacional donde los datos se guardan de forma estructurada, persistente y conectada entre sí.

## 🚀 A partir de aquí

Ahora que ya tienes clara la base teórica:

-   Qué problema resuelve una base de datos
-   Qué es SQL
-   Qué significa que una base de datos sea relacional
-   Cómo se organizan los datos en tablas
-   Y cómo se relacionan entre sí

Ya estamos listos para empezar a trabajar con SQL de verdad dentro de una aplicación.

Y si quieres reforzar estos conceptos con ejercicios interactivos, en [aprendesql.dev](https://aprendesql.dev/) tienes un curso gratuito de SQL desde cero con un editor integrado en cada lección.

> 💡 ****Tip****: Si tu API funciona pero al reiniciar el servidor pierdes la información, no te falta backend… te falta persistencia.