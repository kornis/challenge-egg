export interface IChild {
  id: string;
  nombre: string;
  apellido: string;
  dni: number;
  fatherId: string;
  credentials: string;
  canCreateUsers: false;
}
