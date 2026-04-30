import { mkdir, readFile, writeFile } from "node:fs/promises";

const content = await readFile("./archivo.txt", "utf-8"); // aqui puedo poner el path de cualquier archivo de mi sistema operativo y node.js lo puede leer
console.log(content);

const outputDir = "output/files/documents";
await mkdir(outputDir, { recursive: true });

const uppercaseContent = content.toUpperCase();
await writeFile(`./${outputDir}/archivo-uppercase.txt`, uppercaseContent);
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
