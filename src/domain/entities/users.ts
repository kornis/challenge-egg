import { v4 as uuid } from "uuid";
export class User {
  nombre: string;
  apellido: string;
  dni: number;
  credentials: string;
  isChild: boolean;
  children: string[];
  constructor(nombre: string, apellido: string, dni: number, credentials: string, isChild: boolean) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.credentials = credentials;
    this.isChild = isChild;
    if (!this.isChild) {
      this.children = [];
    }
  }

  addChildren(childid: string) {
    this.children.push(childid);
  }
}
