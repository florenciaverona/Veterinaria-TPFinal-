import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { Tratamiento } from './tratamientosModel';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly service: TratamientosService) {}

  @Get()
  getAll() {
    return this.service.getAll();
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
  create(@Body() t: Tratamiento) {
    return this.service.create(t);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Tratamiento>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
