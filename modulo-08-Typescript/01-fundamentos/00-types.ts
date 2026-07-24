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

type UserEntity = User & UserId & UserWithBirrthdate;

const entity: UserEntity = {
  id: 1234,
  name: "manolo",
  age: 30,
  role: "Team leadership",
  email: "manolol@outlook.com",
  birthdate: new Date("1996-05-15"),
};

export type Configuration = {
  readonly apiKey: string;
  readonly theme: "dark" | "light";
};

type Answer = "si" | "no" | true | false;
type Level = 1 | 2 | 3 | 4 | 5;
type Directon = "up" | "down" | "left" | "right";
