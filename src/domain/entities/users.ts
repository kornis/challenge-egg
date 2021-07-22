import { IChild } from "../interfaces";

export class User {
  nombre: string;
  apellido: string;
  dni: number;
  hijos: IChild[];
  constructor(nombre: string, apellido: string, dni: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }

  agregarHijo(nuevoHijo: IChild) {
    this.hijos.push(nuevoHijo);
  }
}
