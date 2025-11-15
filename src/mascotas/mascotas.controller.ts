import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { Mascota } from './mascotasModel';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly service: MascotasService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get(':id/historial')
getHistorial(@Param('id') id: string) {
  return this.service.getHistorial(id);
}
  @Post('registrar')
  create(@Body() mascota: Mascota) {
    return this.service.create(mascota);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Mascota>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}