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

/* 
JavaScript es tipado débil
  Esto no es "JavaScript es malo", es "JavaScript toma decisiones por ti". Y a veces, esas decisiones son... creativas.
  La razón principal: hace conversiones implícitas (type coercion)

  TIPADO DÉBIL vs TIPADO FUERTE
    - tipado débil: el lenguaje intenta "arreglar" tipos por su cuenta para que la operación siga adelante
    - tipado fuerte: el lenguaje es más estricto y no te deja mezclar tipos a la ligera.

  En JavaScript, muchas veces, en vez de fallar, convierte.

  Entonces, ¿TypeScript "endurece" JavaScript?
    No.
    TS no cambia el comportamiento de JavaScript en runtime. Si en JavaScript ``` "21" * 2 ``` funciona, seguirá funcionando.
    Lo que hace TS es avisarte antes:
      - El editor te marca el problema
      - El compilador te lo canta
      - Tú lo arreglas antes de que llegue a producción
    TS no evita la conversión en JavaScript, pero te ayuda a no depender de ella.

    ¿Por qué esto importa en una API?
    En backend (Express, Node.js), muchísimas cosas vienen como string:
      - req.query
      - req.params
      - Datos de formularios

    Si asumes números sin validar, te puedes comer:
      - Cálculos raros
      - Comparaciones inconsiestentes
      - Bugs que aparecen "solo a veces"
*/
