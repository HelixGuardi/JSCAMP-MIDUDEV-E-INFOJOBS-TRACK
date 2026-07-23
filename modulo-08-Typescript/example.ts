function double(n: number) {
  return n * 2;
}

const input = "2";
let parsedInput: number;

if (typeof input === "string") {
  parsedInput = Number(input);
} else if (typeof input === "number") {
  parsedInput = input;
} else {
  parsedInput = 0;
}

const result = double(parsedInput); // 4

console.log(result);

/* 
TypeScript solo existe antes de ejecutar
  TS opera en tiempo de compilación:
  - Analiza tu código
  - Comprueba tipos
  - Te muestra errores y warnings
  - Genera JavaScript

Y aquí está el truco: cuando se ejecuta tu aplicación, lo que corre es JavaScript. Los tipos, en la mayoría de casos, desaparecen.

El compilador te avisa antes de lo que esté mal, pero una vez arrancas tu app:
  - No hay un "policía de tipos" vigilando
  - No existe validación automática
  - Si entra un dato raro, tu código puede romperse o comportarse de forma inesperada
Por eso la lección es: TS no sustituye validar datos.

Si los datos vienen de fuera (usuario, API, DB, archivo, etc.), tienes que comprobarlos en tiempo de ejecución. Ejemplo simple:
  
  function parseInput(input: unknow):number {
    if (typeof input === "number") return input
    if (typeof input === "string") {
      const n = Number(input)
      return Number.isNaN(n) ? 0 : n
    }
    
    return 0
  }
  
Eso sí protege tu app cuando está corriendo, porque no depende del sistema de tipos, depende de comprobaciones reales.
*/
