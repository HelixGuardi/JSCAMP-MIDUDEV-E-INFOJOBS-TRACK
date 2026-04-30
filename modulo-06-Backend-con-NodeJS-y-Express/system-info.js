import os from "node:os";
import ms from "ms";

console.log("información del sistema operativo:");

console.log("Tipo de SO: ", os.type());
console.log("Plataforma: ", os.platform());
console.log("Arquitectura: ", os.arch());
console.log("Memoria total (bytes): ", os.totalmem());
console.log("Memoria libre (bytes): ", os.freemem());
console.log("Directorio home del usuario: ", os.homedir());

console.log(
  "Tiempo de actividad del sistema (segundos): ",
  ms(os.uptime() * 1000, { long: true }),
); // como esta información la entrega en segundos, vamos a descargar una pequeña dependencia que nos ayudará a hacer esto más legible (la dependencia es "ms" de vercel)

console.log("CPUs: ", os.cpus());
console.log("Interfaces de red: ", os.networkInterfaces());

console.log("------------------------------------------------");

//Información adicional
console.log("Número de núcleos de CPU: ", os.cpus().length);
console.log("Hostname del sistema: ", os.hostname());
console.log("Versión del SO: ", os.release());

//se puede sacar mas información aún....
