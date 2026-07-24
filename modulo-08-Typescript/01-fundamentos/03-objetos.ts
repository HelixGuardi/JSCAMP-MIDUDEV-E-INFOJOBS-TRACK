import type { User, UserEntity, Dictionary, Translations } from "./00-types.ts";

/* type User = {
  name: string;
  age: number;
}; */

const user: User = {
  name: "Helix",
  age: 23,
  email: "victorhdevtech@gmail.com",
  role: "CEO & Founder",
  company: {
    name: "dev tech company",
    address: "en el futuro, en todo el mundo",
  },
};

const otroUser: User = {
  name: "Pepe",
  age: 40,
  email: "pepe@gmail.com",
  role: "Dev Senior",
};

const anotherUser: User = {
  name: "Ana",
  age: 25,
  role: "RH",
};

const entity: UserEntity = {
  id: 1234,
  name: "manolo",
  age: 30,
  role: "Team leadership",
  email: "manolol@outlook.com",
  birthdate: new Date("1996-05-15"),
};

const dictionary: Dictionary = {
  apple: "A fruit that is usually red, green, or yellow.",
  banana: "A long yellow fruit.",
  cherry: "A small red fruit.",
  date: "A sweet fruit from the date palm.",
};

const translations: Translations = {
  hello: "Hola",
  goodbye: "Adiós",
};
