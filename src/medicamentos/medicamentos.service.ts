import { Injectable, NotFoundException } from '@nestjs/common';
import { Medicamento } from './medicamentosModel';

@Injectable()
export class MedicamentosService {

  private medicamentos: Medicamento[] = [  {
    id: "med1",
    nombre: "Baytril",
    dosis: "5mg",
    stock: 20,
    fechaVencimiento: new Date("2026-01-01")
  },
  {
    id: "med2",
    nombre: "Ivermectina",
    dosis: "10mg",
    stock: 35,
    fechaVencimiento: new Date("2026-05-10")
  }];  

  getAll(): Medicamento[] {
    return this.medicamentos;
  }

  getById(id: string): Medicamento {
    const med = this.medicamentos.find(m => m.id == id);
    if (!med) throw new NotFoundException('Medicamento no encontrado');
    return med;
  }

  create(medicamento: Medicamento): Medicamento {
    const newMedicamento: Medicamento = {
      id: medicamento.id,
      nombre: medicamento.nombre,
      dosis: medicamento.dosis,
      stock: medicamento.stock,
      fechaVencimiento: medicamento.fechaVencimiento
    };

    this.medicamentos.push(newMedicamento);
    return newMedicamento;
  }

  update(id: string, data: Partial<Medicamento>) {
    const index = this.medicamentos.findIndex(m => m.id == id);
    if (index === -1) throw new NotFoundException('Medicamento no encontrado');

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
