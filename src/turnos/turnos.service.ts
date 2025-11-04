import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Turno } from './turnosModel';

@Injectable()
export class TurnosService {
    private turnos: Turno[] = [];

  getAll(): Turno[] {
    return this.turnos;
  }

  getById(id: string): Turno {
    const t = this.turnos.find(x => x.id === id);
    if (!t) throw new NotFoundException('Turno no encontrado');
    return t;
  }

create(t: Turno): Turno {
  const fechaTurno = new Date(t.fecha);

  // Validar que la fecha no sea anterior a hoy
  if (fechaTurno < new Date()) {
    throw new BadRequestException('No se pueden agendar turnos en fechas pasadas');
  }
  const newTurno = {
    id: t.id,
    mascotaId: t.mascotaId,
    fecha: fechaTurno,
    motivo: t.motivo,
    veterinario: t.veterinario
  };
  this.turnos.push(newTurno);
  return newTurno;
}


  update(id: string, data: Partial<Turno>) {
    const index = this.turnos.findIndex(x => x.id == id);
    if (index == -1) throw new NotFoundException('Turno no encontrado');
    this.turnos[index] = { ...this.turnos[index], ...data };
    return this.turnos[index];
  }

  delete(id: string) {
    const index = this.turnos.findIndex(x => x.id == id);
    if (index == -1) throw new NotFoundException('Turno no encontrado');
    this.turnos.splice(index, 1);
    return { mensaje: 'Turno eliminado' };
  }
  getChequeosAnuales(): Turno[] {
  // Filtra los turnos cuyo motivo sea "chequeo anual"
  const chequeos = this.turnos.filter(
    (turno) => turno.motivo.toLowerCase() == 'chequeo anual'
  );

  // Si no hay resultados, lanza una excepción
  if (chequeos.length === 0) {
    throw new NotFoundException('No hay turnos de chequeo anual registrados');
  }

  return chequeos;
}

}
//hacen referencia al id de mascota