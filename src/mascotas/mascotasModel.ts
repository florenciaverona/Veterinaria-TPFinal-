export class Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza?: string;
  edad: number;
  duenoId: string; // referencia al Cliente
  historial: string[];
}