export type Company = {
  name: string;
  address: string;
  phone?: string;
};

type UserId = {
  readonly id: string | number;
};

type UserWithBirrthdate = {
  birthdate: Date;
};

export type User = {
  readonly name: string;
  readonly age: number;
  email?: string;
  company?: Company;
  role:
    | "CEO & Founder"
    | "Dev Senior"
    | "Dev Mid"
    | "Dev Junior"
    | "RH"
    | "Team leadership";
};

export type UserEntity = User & UserId & UserWithBirrthdate;

export type Configuration = {
  readonly apiKey: string;
  readonly theme: "dark" | "light";
};

type Answer = "si" | "no" | true | false;
type Level = 1 | 2 | 3 | 4 | 5;
type Directon = "up" | "down" | "left" | "right";

/* Mini repaso TS: Index Signatures para objetos dinámicos */
/* 
    Cuando tienes un objeto cuyas claves no conoces de antemano (tipo diccionario). Por ejemplo, un diccionario con frutas, traducciones, etc.
    Si no sabes si las claves serán "apple", "banana", "cherry" o cualquier otra, no puedes tiparlo con propiedades fijas. Aquí entra la index signature:
  */

//ejemplo 1
export type Dictionary = {
  [key: string]: string;
};

//ejemplo 2
export type Translations = {
  [key: string]: string;
};

/* 
    Las claves son string
    Los valores son string
    Puedes añadir tantas claves como quieras sin romper el tipado

    Tiene sentido usarlo cuando los objetos son realmente dinamicos,
    mapas de traducciones, cualquier estructura donde "las key van cambiando"
  */
