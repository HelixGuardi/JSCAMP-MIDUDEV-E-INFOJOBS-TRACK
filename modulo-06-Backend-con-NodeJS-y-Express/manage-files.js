import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const content = await readFile("archivo.txt", "utf-8"); // aqui puedo poner el path de cualquier archivo de mi sistema operativo y node.js lo puede leer
console.log(content);

const outputDir = join("output", "files", "documents");
await mkdir(outputDir, { recursive: true });

const uppercaseContent = content.toUpperCase();
const outputFilePath = join(outputDir, "archivo-uppercase.txt");

console.log("La extensión es: ", extname(outputFilePath));
console.log("El nombre del archivo es: ", basename(outputFilePath));

await writeFile(outputFilePath, uppercaseContent);
console.log("Archivo creado con contenido en mayúsculas");

/* Los módulos nativos de Node.js */
/* 
    Los módulos nativos de Node.js
    Una de las grandes ventajas de Node.js es que incluye módulos nativos que nos permiten interactuar con el sistema sin necesidad de instalar librerías externas:

    📂 Sistema de archivos (node:fs)
    📁 Carpetas (node:fs)
    🌐 Red (node:http, node:https, node:net)
    ⚙️ Procesos (node:process)
    ⌨️ Entrada y salida (node:readline)
  */

/* ---------------------------------------------- */

/* TRABAJAR CON RUTAS DE ARCHIVOS EN NODE.JS */
/* 
    Cuando trabajamos con archivos en Node.js es muy fácil cometer un error clásico: asumir que todas las rutas funcionan igual en todos los sistemas operativos.
    Y no, no es así.

    EL PROBLEMA CON LAS RUTAS SEGÚN EL SISTEMA OPERATIVO:
      Dependiendo de dónde se ejecute tu código, la forma de escribir una ruta cambia:
      🐧 Linux y macOS: Usan la barra inclinada (forward slash) /. Ejemplo: carpeta/archivo.txt.
      🪟 Windows: Usa la barra invertida (backslash) \. Ejemplo: carpeta\archivo.txt.

    LA SOLCUIÓN: el módulo 'node:path'
      Node.js incluye un módulo nativo llamado path que se encarga de gestionar estas diferencias por ti. Al usarlo, te aseguras de que:
        - No necesitas hacer comprobaciones manuales de sistema operativo (if (os === 'windows') ...).
        - No tienes que preocuparte por si falta o sobra una barra.
        - Tu código es 100% multiplataforma.

    'path.join': CONCATENAR RUTAS CORRETAMENTE:
      La función path.join permite unir diferentes segmentos de una ruta (carpetas y archivos) de forma segura.
      También puedes usar join para crear la ruta completa a un archivo y usarla directamente en operaciones de lectura o escritura

    OBTENER INFORMACIÓN DE ARCHIVOS CON 'path':
      El módulo path no solo sirve para crear rutas, también tiene utilidades muy potentes para extraer información de una ruta ya existente.
        - basename
        - extname
  */
