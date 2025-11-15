import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './clientesModel';

@Injectable()
export class ClientesService {
    private clientes: Cliente[] = [ {
    id: "c1",
    nombre: "Juan Pérez",
    telefono: "1122334455",
    direccion: "Calle Falsa 123",
    email: "juan@mail.com",
    deuda: 0
  },
  {
    id: "c2",
    nombre: "María López",
    telefono: "221334455",
    direccion: "Av. Siempre Viva 742",
    email: "maria@mail.com",
    deuda: 2000
  }];

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