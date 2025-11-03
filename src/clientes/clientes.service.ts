import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Cliente } from './clientesModel';

@Injectable()
export class ClientesService {
    private clientes: Cliente[] = [];

  getAll(): Cliente[] {
    return this.clientes;
  }

  getById(id: string): Cliente {
    const cliente = this.clientes.find(c => c.id == id);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  create(cliente: Cliente) {
    let nuevoCliente = {
    "id": cliente.id,
      "nombre": cliente.nombre,
    "telefono": cliente.telefono,
    "direccion": cliente.direccion,
    "email": cliente.email,
    "deuda": cliente.deuda   
    } 
    this.clientes.push(nuevoCliente);
    return nuevoCliente;
  }
 

  update(id: string, data: Partial<Cliente>) {
    const index = this.clientes.findIndex(c => c.id == id);
    if (index == -1) throw new NotFoundException('Cliente no encontrado');
    this.clientes[index] = { ...this.clientes[index], ...data };
    return this.clientes[index];
  }

  delete(id: string) {
    const index = this.clientes.findIndex(c => c.id == id);
    if (index == -1) throw new NotFoundException('Cliente no encontrado');
    this.clientes.splice(index, 1);
    return { mensaje: 'Cliente eliminado' };
  }
}