import { forwardRef, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Turno } from './turnosModel';
import { MascotasService } from 'src/mascotas/mascotas.service';

@Injectable()
export class TurnosService {
    private turnos: Turno[] = [{
    id: "turn1",
    mascotaId: "m1",
    fecha: new Date("2025-02-01"),
    motivo: "chequeo anual",
    veterinario: "Dr. López"
  },
  {
    id: "turn2",
    mascotaId: "m2",
    fecha: new Date("2025-02-15"),
    motivo: "vacunación",
    veterinario: "Dra. Sánchez"
  },
  {
    id: "turn3",
    mascotaId: "m1",
    fecha: new Date("2025-02-15"),
    motivo: "charlar sobre dieta",
    veterinario: "Dra. Sánchez"
  },
  {
    id: "turn88",
    mascotaId: "m4",
    fecha: new Date("2024-02-15"),
    motivo: "charlar sobre dieta",
    veterinario: "Dra. Sánchez"
  }];
constructor(
  @Inject(forwardRef(() => MascotasService))
  private readonly mascotasService: MascotasService,
) {}

  getAll(): Turno[] {
    return this.turnos;
  }

  getById(id: string): Turno {
    const t = this.turnos.find(x => x.id === id);
    if (!t) throw new NotFoundException('Turno no encontrado');
    return t;
  }
getByMascota(mascotaId: string): Turno[] {
  return this.turnos.filter(t => t.mascotaId === mascotaId);
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

  // Get mascotas que necesitan chequeo anual va por etapas evaluando 
getMascotasQueNecesitanChequeoAnual(): string[] {
  // Agrupar turnos por mascota/ si no existe un turno inicializa array vacio. Mete los turnos en el array 
  const turnosPorMascota = new Map<string, Turno[]>();

  this.turnos.forEach((turno) => {
    if (!turnosPorMascota.has(turno.mascotaId)) {
      turnosPorMascota.set(turno.mascotaId, []);
    }
   turnosPorMascota.get(turno.mascotaId)!.push(turno);
  });

  const resultado: any[] = [];

  const ahora = new Date();

  for (const [mascotaId, turnos] of turnosPorMascota.entries()) {

    // INFO DE LA MASCOTA
    const mascota = this.mascotasService.getById(mascotaId);

    const chequeos = turnos.filter(
      (t) => t.motivo.toLowerCase() === "chequeo anual"
    );

    // Caso 1: nunca tuvo chequeo anual
    if (chequeos.length === 0) {
      resultado.push({
        id: mascotaId,
        nombre: mascota.nombre,
        especie: mascota.especie,
        necesitaChequeo: true,
        motivo: "Nunca tuvo chequeo anual"
      });
      continue;
    }

    // Caso 2: revisar fecha del último chequeo
    const ultimoChequeo = chequeos.sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    )[0];

    const unAnioDespues = new Date(ultimoChequeo.fecha);
    unAnioDespues.setFullYear(unAnioDespues.getFullYear() + 1);

    if (ahora > unAnioDespues) {
      resultado.push({
        id: mascotaId,
        nombre: mascota.nombre,
        especie: mascota.especie,
        necesitaChequeo: true,
        motivo: "Pasó más de un año del último chequeo",
        ultimoChequeo: ultimoChequeo.fecha
      });
    }
  }

  return resultado;
}

}
