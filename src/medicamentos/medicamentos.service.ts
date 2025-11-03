import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Medicamento } from './medicamentosModel';

@Injectable()
export class MedicamentosService {
    private medicamentos: Medicamento[] = [];

  getAll(): Medicamento[] {
    return this.medicamentos;
  }

  getById(id: string): Medicamento {
    const med = this.medicamentos.find(m => m.id == id);
    if (!med) throw new NotFoundException('Medicamento no encontrado');
    return med;
  }

  create(medicamentos : Medicamento) : Medicamento {
    let newmedicamento = {
        "id": medicamentos.id,
        "nombre": medicamentos.nombre,
        "dosis": medicamentos.dosis,
        "stock": medicamentos.stock,
        "fechaVencimiento": medicamentos.fechaVencimiento
    }
    this.medicamentos.push(newmedicamento);
    return newmedicamento
  }

  update(id: string, data: Partial<Medicamento>) {
    const index = this.medicamentos.findIndex(m => m.id == id);
    if (index == -1) throw new NotFoundException('Medicamento no encontrado');
    this.medicamentos[index] = { ...this.medicamentos[index], ...data };
    return this.medicamentos[index];
  }

  delete(id: string) {
    const index = this.medicamentos.findIndex(m => m.id == id);
    if (index == -1) throw new NotFoundException('Medicamento no encontrado');
    this.medicamentos.splice(index, 1);
    return { mensaje: 'Medicamento eliminado' };
  }
}
