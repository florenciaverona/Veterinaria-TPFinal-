import { Injectable, NotFoundException } from '@nestjs/common';
import { Mascota } from './mascotasModel';
import { Cliente } from 'src/clientes/clientesModel';

@Injectable()
export class MascotasService {
    private mascotas: Mascota[] = [];


  getAll(): Mascota[] {
    return this.mascotas;
  }

  getById(id: string): Mascota {
    const mascota = this.mascotas.find(m => m.id == id);
    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    return mascota;
  }

  create(mascotas: Mascota) : Mascota {
    let newmascota = {
        "id": mascotas.id,
        "nombre": mascotas.nombre,
        "especie": mascotas.especie,
        "raza": mascotas.raza,
        "edad": mascotas.edad,
        "duenoId": mascotas.duenoId,
        "historial": [],
    }
    this.mascotas.push(newmascota);
    return newmascota;
  }

  update(id: string, data: Partial<Mascota>) {
    const index = this.mascotas.findIndex(m => m.id == id);
    if (index == -1) throw new NotFoundException('Mascota no encontrada');
    this.mascotas[index] = { ...this.mascotas[index], ...data };
    return this.mascotas[index];
  }

  delete(id: string) {
    const index = this.mascotas.findIndex(m => m.id == id);
    if (index == -1) throw new NotFoundException('Mascota no encontrada');
    this.mascotas.splice(index, 1);
    return { mensaje: 'Mascota eliminada' };
  }
}

