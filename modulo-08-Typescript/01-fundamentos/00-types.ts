export type User = {
  readonly name: string;
  readonly age: number;
  email?: string;
};

export type Configuration = {
  readonly apiKey: string;
  readonly theme: "dark" | "light";
};
