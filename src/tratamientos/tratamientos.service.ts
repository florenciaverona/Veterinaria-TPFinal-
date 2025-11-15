import { Injectable, NotFoundException } from '@nestjs/common';
import { Tratamiento } from './tratamientosModel';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';

@Injectable()
export class TratamientosService {
    private tratamientos: Tratamiento[] = [{
    id: "t1",
    mascotaId: "m1",
    descripcion: "Infección en la piel",
    fecha: new Date("2025-01-05"),
    medicamento: ["med1"]
  },
  {
    id: "t2",
    mascotaId: "m1",
    descripcion: "Desparasitación",
    fecha: new Date("2025-03-01"),
    medicamento: ["med2"]
  },
  {
    id: "t3",
    mascotaId: "m2",
    descripcion: "Control general",
    fecha: new Date("2025-02-10"),
    medicamento: []
  }];
    constructor(private readonly medicamentosService: MedicamentosService) {}
  

  getAll(): Tratamiento[] {
    return this.tratamientos;
  }
  getByMascota(mascotaId: string): Tratamiento[] {
  return this.tratamientos.filter(t => t.mascotaId == mascotaId);
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
      "medicamento": t.medicamento ?? [] 
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
  agregarMedicamento(tratamientoId: string, medicamentoId: string): Tratamiento {
  const tratamiento = this.tratamientos.find(t => t.id === tratamientoId);

  if (!tratamiento)
    throw new NotFoundException('Tratamiento no encontrado');

  if (!this.medicamentosService.getById(medicamentoId))
    throw new NotFoundException('Medicamento no encontrado');

  // Si no tiene array inicializado
  if (!tratamiento.medicamento) {
    tratamiento.medicamento = [];
  }

  tratamiento.medicamento.push(medicamentoId);

  return tratamiento;
}

}


//hacen referencia al id de mascota 