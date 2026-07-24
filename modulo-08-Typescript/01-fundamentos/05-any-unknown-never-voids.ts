// ================================
// ANY, UNKNOWN, NEVER y VOID
// ================================

// ================================
// ANY - El tipo que desactiva TypeScript
// ================================

// "Evita 'any' siempre que puedas. Si lo usas, estás renunciando a todo lo que TypeScript te ofrece."

let cualquierCosa: any = "hola";
cualquierCosa = 42;
cualquierCosa = true;
cualquierCosa.saludar(); // (ratón por encima de .saludar()) = any | se infiere "any"
const theResult = cualquierCosa + 8;
// hay que EVITARLO, pero existen dos veces en las que puede tener sentido utilizar "any":
// 1. en migraciones
// 2. en librerías de terceros sin tipos (aunque también deberiamos de evitarlo al maximo)

// ================================
// UNKNOWN - La alternativa segura a any
// ================================

let valorDesconocido: unknown = "hola";
valorDesconocido = 42;
valorDesconocido = true;
valorDesconocido = { nombre: "test" };
// el valor desconocido (unknow) es una alternativa segura a "any"
// puedes acceptar cualquier valor pero no te deja utilizarlo de cualquier manera
// Si no sabes el tipo, usa unknown y comprueba. Nunca "any"

// type narrowing (para poder utilizar "unknown", lo que te obliga a verificar, antes, el tipo, para asegurarte de que puedes utilizarlo como pretendes)
if (typeof valorDesconocido === "number") {
  const resultadoSeguro = valorDesconocido + 10;
  console.log(resultadoSeguro);
} else if (typeof valorDesconocido === "string") {
  console.log(valorDesconocido.toUpperCase());
}

// ejemplo practico --> para parsear un JSON (tu no sabes lo que va a salir)
function parseJSON(jsonString: string): unknown {
  return JSON.parse(jsonString);
}

const datos = parseJSON('{"nombre": "midudev", "edad": 30}');
if (typeof datos === "object" && datos !== null && "nombre" in datos) {
  console.log((datos as { nombre: string }).nombre); //"as" es para forzar/hacer entender/hacer sobrescribir a TS su entendimiento sobre las cosas
}

// ================================
// VOID - Funciones que no retornan nada
// ================================

function saludar(): void {
  console.log("Hola!");
}

function logError(errorMessage: string): void {
  if (errorMessage.length === 0) {
    return undefined; // es un return vacio, es valido devolver undefined
  }

  console.log("Error:", errorMessage);
}

const resultado: void = saludar(); //no tiene mucho sentido hacer esto, pero está aqui el ejemplo "visual"

// ================================
// NEVER - El tipo imposible
// ================================

// Never representa un valor que no va a ocurrir nunca
function bucleInifinito(): never {
  while (true) {
    //...
  }
}

function throwError(message: string): never {
  throw new Error(message);
}

function revisarValor(x: number | string) {
  if (typeof x === "number") {
    console.log("Es un número:", x);
  } else if (typeof x === "string") {
    console.log("Es una cadena:", x);
  } else {
    console.log(x); // NUNCA DEBERÍA ENTRAR AQUI
    //Aquí, x es de tipo 'never'
    throwError("Tipo no soportado");
  }

  // en tiempo de ejecución, puede que se escape algo, y, aunque parece que este ultimo "else" no tiene sentido, aqui, podemos evitar utilizar "x"
  // de una forma incorrecta, controlando mejor este tipo de casos, ya que TS se ejecuta en tiempo de compilación.
}

// ================================
// COMPARATIVA
// ================================

/*
┌──────────┬────────────────────────────────────────────────────────┐
│ Tipo     │ Descripción                                            │
├──────────┼────────────────────────────────────────────────────────┤
│ any      │ Acepta todo, permite todo. EVITAR.                     │
│ unknown  │ Acepta todo, pero requiere verificación. PREFERIBLE.   │
│ void     │ Para funciones que no retornan valor útil.             │
│ never    │ Para casos imposibles o funciones que no terminan.     │
└──────────┴────────────────────────────────────────────────────────┘
*/
