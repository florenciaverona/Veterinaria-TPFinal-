import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Tratamiento } from './tratamientosModel';

@Injectable()
export class TratamientosService {
    private tratamientos: Tratamiento[] = [];
  

  getAll(): Tratamiento[] {
    return this.tratamientos;
  }

  getById(id: string): Tratamiento {
    const t = this.tratamientos.filter(x => x.id == id);
    if (!t) throw new NotFoundException('Tratamiento no encontrado');
    return t[0];
  }

  create(t: Tratamiento) : Tratamiento {
    let newtratamiento = {
      "id": t.id,
      "mascotaId": t.mascotaId,
      "descripcion": t.descripcion,
      "fecha": t.fecha,
      "veterinario": t.veterinario
    }
    this.tratamientos.push(newtratamiento);
    return newtratamiento;
  }

  update(id: string, data: Partial<Tratamiento>) {
    const index = this.tratamientos.findIndex(x => x.id == id);
    if (index === -1) throw new NotFoundException('Tratamiento no encontrado');
    this.tratamientos[index] = { ...this.tratamientos[index], ...data };
    return this.tratamientos[index];
  }

  delete(id: string) {
    const index = this.tratamientos.findIndex(x => x.id == id);
    if (index == -1) throw new NotFoundException('Tratamiento no encontrado');
    this.tratamientos.splice(index, 1);
    return { mensaje: 'Tratamiento eliminado' };
  }
}


//hacen referencia al id de mascota 