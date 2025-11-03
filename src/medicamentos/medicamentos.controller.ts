import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { Medicamento } from './medicamentosModel';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly service: MedicamentosService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() m: Medicamento) {
    return this.service.create(m);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Medicamento>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}