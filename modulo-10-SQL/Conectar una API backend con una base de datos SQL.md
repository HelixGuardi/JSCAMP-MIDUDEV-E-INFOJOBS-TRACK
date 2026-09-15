# 🔌 Conectar una API backend con una base de datos SQL

Hasta ahora hemos trabajado SQL de forma bastante aislada:

-   creando tablas
-   insertando datos
-   haciendo consultas
-   filtrando resultados
-   relacionando tablas

Pero llega el momento importante de verdad:

****llevar todo esto a una aplicación real****.

Porque en el mundo real no solemos escribir consultas sueltas por escribirlas.

Lo que hacemos es conectar nuestro backend con una base de datos para que la API pueda ****guardar, consultar y modificar información de verdad****.

## 🌍 Del playground al mundo real

Hasta ahora podías experimentar en el [playground de aprendesql.dev](https://aprendesql.dev/playground). En esta clase damos el paso desde una API de backend hacia una base de datos SQLite.

La idea es simple:

-   tenemos una API
-   queremos persistir los datos
-   y para eso necesitamos conectarnos desde Node.js a SQLite

Y aquí aparece algo importante:

Node.js no se conecta a SQLite de forma nativa. Necesitamos un ****driver****.

## 📦 Necesitamos un driver para SQLite

Para trabajar con SQLite desde un backend en Node.js hace falta instalar una dependencia.

En el vídeo se utiliza **`**better-sqlite3**`**, que se presenta como una de las opciones más sencillas para empezar.

Además, como el ejemplo está hecho con TypeScript, también se instalan los tipos para que el editor y el compilador entiendan bien la librería.

La idea aquí no es solo “hacer que funcione”, sino que el proyecto esté bien preparado para trabajar con TypeScript sin errores innecesarios.

## 🧪 Un archivo de prueba para empezar

Para probar la conexión, en el vídeo se crea un archivo de ejemplo en TypeScript donde se monta una pequeña prueba con SQLite.

La base de datos, al principio, se guarda ****en memoria****.

Eso significa que:

-   sirve perfectamente para hacer pruebas rápidas
-   no deja archivos persistentes
-   pero se pierde al cerrar el proceso

No es la solución final, pero sí una forma muy útil de empezar a entender la integración.

## 🧠 Qué hace realmente este primer script

El flujo que se monta en el archivo de prueba es bastante reconocible porque reutiliza casi todo lo que ya hemos aprendido antes:

-   importar la librería
-   abrir la conexión
-   crear una tabla
-   insertar datos
-   consultar información
-   filtrar resultados
-   actualizar y eliminar si hace falta
-   cerrar la conexión al final

Es decir, la novedad no está tanto en SQL en sí, sino en ****cómo ejecutamos esas consultas desde código backend****.

## 🛡️ La parte más importante: consultas parametrizadas

Aquí aparece una de las ideas más importantes de toda la clase:

****cómo insertar datos de forma segura****.

En el vídeo se muestra una sintaxis con interrogantes (`?`) dentro de la consulta SQL.

Algo así:

```
INSERT INTO jobs (id, title, company, modality)VALUES (?, ?, ?, ?);
```

Y luego esos valores se pasan aparte desde el código.

Esto es importantísimo porque evita construir la consulta metiendo los valores directamente como texto.

## ❌ Lo que no debes hacer nunca

La advertencia del vídeo es muy clara:

****no interpolar valores directamente dentro de la consulta con template strings o concatenación de texto****.

¿Por qué?

Porque si haces algo así, abres la puerta a uno de los ataques más clásicos en aplicaciones web:

****SQL Injection****.

## 💣 Qué es SQL Injection

La idea de un SQL Injection es que alguien consigue colarte texto malicioso dentro de una consulta.

Si tú construyes la query pegando valores directamente, un atacante podría manipular esa cadena para romper la consulta original y ejecutar otra distinta.

En el vídeo se explica con un ejemplo muy gráfico: alguien podría cerrar el valor esperado, inyectar una operación peligrosa como borrar una tabla y comentar el resto de la sentencia para que el daño quede hecho.

La conclusión es muy simple:

> Nunca construyas queries metiendo texto arbitrario directamente si el driver te ofrece una forma segura de parametrizarlas.

## ✅ La forma correcta: `prepare` + parámetros

La forma segura que se enseña en el vídeo consiste en:

1.  preparar la consulta
2.  usar placeholders `?`
3.  pasar los valores aparte al ejecutarla

Eso permite que el driver trate esos datos como valores, no como parte del código SQL.

Y esa diferencia lo cambia todo.

## 🧩 Cómo se ejecutan las operaciones desde código

En el ejemplo se ve también cómo trabajar con distintas operaciones según el tipo de consulta:

-   preparar una sentencia
-   ejecutarla con `run` si modifica datos
-   recuperar resultados concretos
-   pasar parámetros para filtros
-   reutilizar la consulta preparada

La idea general es que la base de datos deja de ser algo abstracto y pasa a formar parte del flujo normal de la aplicación backend.

## 🔍 Ya no solo escribes SQL, ahora lo integras

Este paso es importante porque cambia la perspectiva.

Hasta ahora podíamos pensar en SQL como “algo que escribo en un editor”.

Pero aquí empiezas a verlo como realmente se usa en una app:

-   una petición llega al backend
-   el backend consulta la base de datos
-   recupera o modifica datos
-   y devuelve una respuesta

Ahí es donde SQL se convierte en parte viva de tu aplicación.

## 🔒 Cerrar la conexión también importa

Otro detalle importante que se menciona es que, al terminar, hay que acordarse de ****cerrar la conexión con la base de datos****.

Es uno de esos detalles pequeños que mucha gente olvida al empezar, pero forma parte de trabajar correctamente con recursos del sistema.

## ⚙️ Ejecutarlo con TypeScript

Como el ejemplo está escrito en TypeScript, se ejecuta utilizando `tsx`, que permite correr archivos TypeScript directamente sin tener que montar una compilación manual previa en cada prueba.

Eso hace que la experiencia de desarrollo sea bastante más cómoda cuando estás haciendo pruebas rápidas o pequeños scripts.

## 🧱 El detalle técnico con `better-sqlite3`

En el vídeo aparece un problema práctico interesante: la librería necesita ciertos ****bindings/binarios nativos**** y eso puede requerir procesos de build o rebuild durante la instalación.

Aquí entra un punto importante:

-   algunas dependencias ejecutan scripts al instalarse
-   eso puede ser necesario para que funcionen
-   pero también puede ser un vector de ataque

## 🚨 Por qué tener scripts desactivados puede ser buena idea

Se explica también que tener desactivados ciertos scripts de instalación puede ser una medida de seguridad razonable.

¿Por qué?

Porque hay ataques que aprovechan `postinstall` u otros scripts en dependencias para ejecutar código malicioso en tu máquina o en tu proyecto.

Así que aquí no solo estás aprendiendo SQL.

También estás tocando una parte muy real del desarrollo moderno:

****la seguridad en la cadena de dependencias****.

## 🧠 Qué debes llevarte de esta clase

La idea más importante de esta clase es que SQL no vive aislado.

Vive dentro de tu backend.

Y para conectarlo bien necesitas entender varias cosas a la vez:

-   cómo abrir una conexión a SQLite
-   cómo usar un driver como `better-sqlite3`
-   cómo ejecutar consultas desde código
-   cómo preparar sentencias seguras
-   por qué evitar la interpolación directa
-   cómo prevenir SQL Injection
-   y por qué algunas dependencias requieren procesos de build controlados

## 🚀 A partir de aquí

Con esta clase ya estás mucho más cerca de un caso real de backend:

-   una API conectada a base de datos
-   consultas ejecutadas desde TypeScript
-   inserciones seguras
-   filtros con parámetros
-   y una mentalidad más profesional respecto a seguridad

A partir de aquí, lo normal es seguir integrando estas consultas dentro de endpoints reales para que tu API deje de trabajar con datos en memoria y empiece a persistir información de verdad.

Si quieres un recorrido específico de SQLite con Node, en aprendesql.dev tienes la lección de [SQLite con Node](https://aprendesql.dev/sqlite-con-node).

> 💡 ****Tip****: si una query necesita valores dinámicos, no construyas la sentencia “a mano”. Usa parámetros. No solo es más limpio: también puede salvarte de un SQL Injection muy feo.