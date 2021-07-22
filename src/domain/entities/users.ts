import { v4 as uuid } from "uuid";
export class User {
  _id: string = uuid();
  nombre: string;
  apellido: string;
  dni: number;
  credentials: string;
  constructor(nombre: string, apellido: string, dni: number, credentials: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.credentials = credentials;
  }
}

export class Child {
  nombre: string;
  apellido: string;
  dni: number;
  fatherId: string;
  constructor(nombre: string, apellido: string, dni: number, fatherId: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fatherId = fatherId;
  }
}
