import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { Turno } from './turnosModel';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly service: TurnosService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
  @Get('chequeo-anual')
  getMascotasQueNecesitanChequeoAnual() {
    return this.service.getMascotasQueNecesitanChequeoAnual();
  }
  @Get('mascota/:mascotaId')
  getByMascota(@Param('mascotaId') mascotaId: string) {
    return this.service.getByMascota(mascotaId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() turno: Turno) {
    return this.service.create(turno);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Turno>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
