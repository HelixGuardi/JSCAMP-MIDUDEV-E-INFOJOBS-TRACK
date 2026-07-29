// ================================
// INTERFACES EN TYPESCRIPT
// ================================

// Las interfaces definen la "forma" de un objeto
// Son contratos que especifican qué propiedades y métodos debe tener
// en otras palabaras: Las interfaces son otra forma de definir tipos,
// pero con una idea central muy clara: definir un contrato. Es decir,
// la forma que debe tener un objeto, incluyendo propiedades y métodos,
// para que el resto del código pueda confiar en ello sin miedo.

interface Persona {
  readonly name: string;
  readonly age: number;
}

interface Identificable {
  id: `user-${number}`;
}

//Una interface define la estructura que debe cumplir un objeto:
//interface
interface User extends Persona, Identificable {
  email?: string;
  role: "admin" | "user" | "editor";
  saludar: () => string;
  login(): boolean;
}

interface Admin extends User {
  adminLevel: number;
  accessAllAreas: boolean;
  rootAdmin(): void;
}

//--------------
//las interfaces, si las declaras más de una vez: se fusionan
interface Hero {
  nombre: string;
}

interface Hero {
  poder: string;
}

//al haberse funcionado, "hero" tiene que tener "nombre" y "poder"
const hero: Hero = {
  nombre: "Superman",
  poder: "Volar",
};

// si tu declaras, la misma interfaz, multiples veces, en el mismo fichero, resulta que se fusionan automaticamente.
//--------------

const user: User = {
  id: `user-12345`,
  name: "midudev",
  age: 30,
  email: "miduga@email.com",
  role: "admin",
  saludar: () => "Hola!",
  login() {
    return true;
  },
};

//type
export type UserType = {
  readonly name: string;
  readonly age: number;
  email?: string;
  role: "admin" | "user" | "editor";
};

// INTERFACE vs TYPE: Diferencias clave
/* 
  Aunque se solapan en un montón de casos, hay diferencias prácticas:
  Cosas que "Type" puede hacer y "interface" no:
    - Union types: cuando algo puede ser "A o B" (por ejemplo, User | null), esto es terreno de type
    - Tuplas y ciertos tipos más "técnicos" también encajan mejor con type.
    - Definir un tipo como primitivo directamente (string, number, etc) no es el punto fuerte de una interface - las interfaces
      están más pensadas para objetos
    
    Esto solo puede hacerse con type
      - type StringOrNumber = string | number
      - type Coords = [number, number]
      - type ID = string

  Cosas donde "interface" se siente más natural:
    - Modelar objetos complejos
    - Extender contratos (herencia de forma clara)
    - Trabajar con clases usando "implements" para obligar a cumplir un contrato

  Regla práctica recomendada (para no vivir en el caos)
    Una estrategia simple que funciona muy bien:
    - Usa "interfaces" para objetos
    - Usa "type para todo lo demás" (unions, tuplas, utilidades, combinaciones, raras, etc.)

  ¿Puedes usar "type" para todo? Sí. ¿Te va a explotar el proyecto? No. ¿Pero te quedará más ordenado si sigues una regla? También.

  
  Métodos en interfaces: dos estilos válidos
    Cuando defines métodos, TypeScript permite más de una sintaxis:
      interface User {
        // Estile 1: como propiedad de tipo función
        greet: (greeting: string) => string

        // Estilo 2: como declaración de método
        greet(greeting: string): string
      }
*/

//Para las funciones, también puedes tipar una función
interface Calculadora {
  (a: number, b: number): number;
}

const calcular: Calculadora = (x, y) => x + y;

// ================================
// INTERFACES PARA CLASES
// ================================

interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

interface AudioPlayer {
  volumen: number;
}

class Reproductor implements MediaPlayer, AudioPlayer {
  volumen: number = 50;

  play(): void {
    console.log("Reproduciendo...");
  }
  pause(): void {
    console.log("Pausado");
  }
  stop(): void {
    console.log("Deteniendo");
  }
}
