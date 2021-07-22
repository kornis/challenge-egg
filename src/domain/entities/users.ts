import { ObjectId } from "mongodb";
export class User {
  nombre: string;
  apellido: string;
  dni: number;
  hijos: ObjectId[];
  constructor(nombre: string, apellido: string, dni: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }

  agregarHijo(id_hijo: string) {
    this.hijos.push(new ObjectId(id_hijo));
  }
}

export class Child {
  nombre: string;
  apellido: string;
  dni: number;
  constructor(nombre: string, apellido: string, dni: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}
