import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { MascotasService } from './mascotas/mascotas.service';
import { MascotasController } from './mascotas/mascotas.controller';
import { MedicamentosService } from './medicamentos/medicamentos.service';
import { MedicamentosController } from './medicamentos/medicamentos.controller';
import { TratamientosService } from './tratamientos/tratamientos.service';
import { TratamientosController } from './tratamientos/tratamientos.controller';
import { TurnosService } from './turnos/turnos.service';
import { TurnosController } from './turnos/turnos.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController, MascotasController, MedicamentosController, TratamientosController, TurnosController],
  providers: [AppService, ClientesService, MascotasService, MedicamentosService, TratamientosService, TurnosService],
})
export class AppModule {}
