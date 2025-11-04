# API Veterinaria – Backend con NestJS

Este proyecto implementa una **API RESTful** para gestionar una veterinaria.  
Permite administrar **clientes, mascotas, medicamentos, tratamientos y turnos** mediante controladores y servicios modulares de **NestJS**.

---

Cada **Controller** define las rutas HTTP que conectan las solicitudes del cliente con la lógica de negocio contenida en los **Services**.

Rutas principales:
| Módulo | Ruta base |
|:-------|:-----------|
| Clientes | `/clientes` |
| Mascotas | `/mascotas` |
| Medicamentos | `/medicamentos` |
| Tratamientos | `/tratamientos` |
| Turnos | `/turnos` |

---

## 🧍‍♀️ ClientesController (`clientes.controller.ts`)

**Ruta base:** `/clientes`

### Funciones
- **`GET /clientes` → `getAll()`**  
  Devuelve todos los clientes registrados.

- **`GET /clientes/:id` → `getById()`**  
  Devuelve la información de un cliente específico.

- **`POST /clientes` → `create()`**  
  Crea un nuevo cliente con los datos del cuerpo del request.

- **`PUT /clientes/:id` → `update()`**  
  Actualiza los datos de un cliente existente.

- **`DELETE /clientes/:id` → `delete()`**  
  Elimina un cliente del sistema.

**En resumen:** Permite registrar, consultar, actualizar y eliminar clientes.

---

## MascotasController (`mascotas.controller.ts`)

**Ruta base:** `/mascotas`

### Funciones
- **`GET /mascotas` → `getAll()`**  
  Lista todas las mascotas registradas.

- **`GET /mascotas/:id` → `getById()`**  
  Devuelve los datos de una mascota específica.

- **`POST /mascotas` → `create()`**  
  Crea una nueva mascota asociada a un cliente.

- **`PUT /mascotas/:id` → `update()`**  
  Actualiza la información de una mascota.

- **`DELETE /mascotas/:id` → `delete()`**  
  Elimina una mascota del sistema.

- **`GET /mascotas/:id/historial` → `getHistorial()`**  
  Retorna el historial médico o de tratamientos de la mascota.

**En resumen:** Administra mascotas y su historial clínico.

---

## MedicamentosController (`medicamentos.controller.ts`)

**Ruta base:** `/medicamentos`

### Funciones
- **`GET /medicamentos` → `getAll()`**  
  Devuelve todos los medicamentos disponibles.

- **`GET /medicamentos/:id` → `getById()`**  
  Obtiene los detalles de un medicamento específico.

- **`POST /medicamentos` → `create()`**  
  Registra un nuevo medicamento.

- **`PUT /medicamentos/:id` → `update()`**  
  Modifica los datos de un medicamento existente.

- **`DELETE /medicamentos/:id` → `delete()`**  
  Elimina un medicamento por su ID.

**En resumen:** Maneja el inventario de medicamentos (creación, edición, eliminación y consulta).

---

## TratamientosController (`tratamientos.controller.ts`)

**Ruta base:** `/tratamientos`

### Funciones
- **`GET /tratamientos` → `getAll()`**  
  Muestra todos los tratamientos registrados.

- **`GET /tratamientos/:id` → `getById()`**  
  Devuelve los detalles de un tratamiento específico.

- **`POST /tratamientos` → `create()`**  
  Registra un nuevo tratamiento para una mascota.

- **`PUT /tratamientos/:id` → `update()`**  
  Actualiza la información de un tratamiento.

- **`DELETE /tratamientos/:id` → `delete()`**  
  Elimina un tratamiento del sistema.

**En resumen:** Administra los tratamientos veterinarios de las mascotas.

---

## TurnosController (`turnos.controller.ts`)

**Ruta base:** `/turnos`

### Funciones
- **`GET /turnos` → `getAll()`**  
  Lista todos los turnos programados.

- **`GET /turnos/chequeo-anual` → `getChequeosAnuales()`**  
Devuelve todos los turnos cuyo motivo sea **"chequeo anual"**.  
Si no existen turnos con ese motivo, responde con un mensaje de error indicando que no hay registros disponibles.


- **`GET /turnos/:id` → `getById()`**  
  Muestra la información de un turno específico.

- **`POST /turnos` → `create()`**  
  Crea un nuevo turno.  
  Valida que la fecha del turno **no sea anterior a la actual**.

- **`PUT /turnos/:id` → `update()`**  
  Permite modificar los datos de un turno (fecha, motivo, etc.).

- **`DELETE /turnos/:id` → `delete()`**  
  Elimina un turno por su ID.

  

**En resumen:** Gestiona el agendamiento, actualización y cancelación de turnos veterinarios.

---

## Cómo Probar la API en Postman

### Paso 1: Iniciar el servidor NestJS
Ejecutá el proyecto con:
```bash
npm run start
