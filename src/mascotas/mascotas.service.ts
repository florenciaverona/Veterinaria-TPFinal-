import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Mascota } from './mascotasModel';
import { TratamientosService } from 'src/tratamientos/tratamientos.service';
import { TurnosService } from 'src/turnos/turnos.service';

@Injectable()
export class MascotasService {
    private mascotas: Mascota[] = [  {
    id: "m1",
    nombre: "Julia",
    especie: "perro",
    raza: "Labrador",
    edad: 3,
    duenoId: "c1",
    historial: []
  },
  {
    id: "m2",
    nombre: "Tomy",
    especie: "gato",
    raza: "Siames",
    edad: 2,
    duenoId: "c2",
    historial: []
  },
  {
    id: "m3",
    nombre: "Tomy",
    especie: "gato",
    raza: "Siames",
    edad: 2,
    duenoId: "c2",
    historial: []
  },
 {
    id: "m4",
    nombre: "Toto",
    especie: "carpincho",
    raza: "agua dulce",
    edad: 2,
    duenoId: "c2",
    historial: []
  }];
  constructor(
  @Inject(forwardRef(() => TurnosService))
  private readonly turnosService: TurnosService,

  private readonly tratamientosService: TratamientosService
) {}


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
getHistorial(mascotaId: string) {
  const turnos = this.turnosService.getByMascota(mascotaId);
  const tratamientos = this.tratamientosService.getByMascota(mascotaId);

  return { mascotaId, turnos, tratamientos };
}


}

