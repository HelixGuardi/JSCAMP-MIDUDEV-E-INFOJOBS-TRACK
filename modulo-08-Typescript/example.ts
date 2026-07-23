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

/* 
¿Por qué aprender TypeScript?
  Encontrar problemas antes de ejecutar, mejorar la experiencia en el editor y reducir sustos en producción.
  Al final, TypeScript no es solo "tipar por tipar" - es una herramienta para trabajar más seguro y más rápido.

1) Detectar errores antes de ejecutar
Con TypeScript puedes pillar errores en tiempo de desarrollo:

Fallos que en JavaScript verías “cuando explota” al ejecutar.
Errores que el editor te señala al momento.
Menos bugs silenciosos que pasan a producción sin avisar.
La gracia es que el feedback llega antes, cuando corregir cuesta menos.

2) Mejor autocompletado y experiencia de desarrollo
Cuando tu código tiene tipos, el editor entiende mejor lo que está pasando:

Autocompletado más preciso.
Ayudas de parámetros y retornos.
Navegación por el código más cómoda.
Esto se nota especialmente cuando el proyecto crece o cuando vuelves a un módulo semanas después.

3) Código autodocumentado (contratos claros)
TypeScript hace que los “contratos” del código queden explícitos:

Qué acepta una función.
Qué devuelve.
Qué forma tienen los objetos y estructuras.
Resultado: menos tiempo leyendo código para adivinar intenciones y más tiempo construyendo.

4) Refactoring más seguro
Una de las mejores razones para usar TS: refactors con menos miedo.

Cambiar nombres.
Mover funciones.
Modificar estructuras de datos.
TypeScript te obliga a revisar los usos y te avisa de lo que se rompe. Menos “lo cambio y rezo”.

Extra: TypeScript está en todas partes (y en IA cada vez más)
Más allá de lo técnico, hay un motivo muy práctico: TypeScript se ha convertido en uno de los lenguajes más relevantes del ecosistema, y está ganando muchísimo terreno en proyectos modernos.

Y algo interesante: en flujos de IA generativa y trabajo con agentes, TypeScript se está volviendo muy común (aunque Python siga siendo el rey en IA). Cada vez más tooling, SDKs y frameworks están apostando por TS para estos casos.

Ejemplo real
Hay frameworks y SDKs de agentes que están construidos directamente en TypeScript y están viendo muy buena adopción, justo por cómo encaja TS en estos flujos.

Resumen
Si te quedas con 4 puntos, que sean estos:

Detectar errores en tiempo de desarrollo
Mejor autocompletado y experiencia de editor
Código autodocumentado con contratos claros
Refactoring más seguro sin miedo a romper
*/
