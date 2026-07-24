import type { User } from "./00-types.ts";

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
