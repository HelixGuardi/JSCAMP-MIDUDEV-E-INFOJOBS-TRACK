// ================================
// TUPLAS EN TYPESCRIPT
// ================================

/* 
  En TypeScript, una tupla es un tipo especial de array que permite almacenar un número fijo de elementos con tipos específicos en cada posición.
  A diferencia de los arrays tradicionales, que son homogéneos, las tuplas permiten almacenar una colección heterogénea de valores donde el
  orden y la longitud son estrictos.
*/

const persona: [string, number] = ["alfredo", 75];
const [personaName, personaAge] = persona;
// ^  [name: string, age: number]  ^

// 1. Coordenadas
type Coordenadas = [latitude: number, longitude: number];
const [lat, lon]: Coordenadas = [40.4168, -3.7038];

// 2. Colores RGB
type RGB = [number, number, number];
const rojo: RGB = [255, 0, 0];
const verde: RGB = [0, 255, 0];
const azul: RGB = [0, 0, 255];

// 3. Rangos de valores
type Rango = [min: number, max: number];
const rangoEdad: Rango = [18, 65];

// 4. Tipo useState de React
type EstadoContador = [
  value: number,
  updateFunction: (nuevoValor: number) => void,
];

// Tuplas con REST elements
type StringYMuchosNumeros = [string, ...number[]];
const [text, firstNumber, ...restOfNumbers]: StringYMuchosNumeros = [
  "texto",
  1,
  2,
  3,
  4,
  5,
];

type Config = readonly [server: string, port: number, useSSL: boolean];
const dbConfig: Config = ["localhost", 5432, true];
