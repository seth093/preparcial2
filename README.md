# Parcial - Gestión de Usuarios y Gastos Embebidos

## Autor
Kevin Arenas - 202110673

---

# Descripción del proyecto

Este proyecto corresponde al desarrollo de una API REST construida con NestJS para la gestión de planes de viaje, usuarios y control de gastos embebidos.

La aplicación implementa una arquitectura modular utilizando NestJS y TypeORM, integrando:

- Persistencia con SQLite.
- Validación mediante DTOs.
- Consumo de API externa de países.
- Sistema de caché local para países.
- Gestión de usuarios propietarios de planes.
- Inserción incremental de gastos embebidos.
- Middleware de auditoría y telemetría.

---

# Tecnologías utilizadas

- NestJS
- TypeScript
- SQLite
- TypeORM
- Axios / HttpModule
- Class Validator
- Postman

---

# Arquitectura del sistema

La aplicación está dividida en tres módulos principales:

---

## CountriesModule

Módulo encargado de la gestión interna de países.

Responsabilidades:
- Consultar países localmente.
- Consumir la API externa RestCountries.
- Guardar resultados en caché local.
- Exponer CountriesService a otros módulos.

Este módulo no expone endpoints públicos.

---

## UsersModule

Módulo encargado de la gestión de usuarios.

Responsabilidades:
- Persistencia de usuarios.
- Validación de existencia de usuarios.
- Asociación de propietarios a planes de viaje.

Entidad User:
- id
- name
- email

---

## TravelPlansModule

Módulo principal del sistema.

Responsabilidades:
- Crear planes de viaje.
- Asociar planes a usuarios.
- Gestionar gastos embebidos.
- Consultar y eliminar planes.
- Integrarse con CountriesService y UsersService.

Endpoints implementados:

- POST /travel-plans
- POST /travel-plans/:id/expenses
- GET /travel-plans
- GET /travel-plans/:id
- DELETE /travel-plans/:id

---

# Modelo de gastos embebidos

Cada plan de viaje contiene un arreglo embebido llamado expenses.

Cada gasto contiene:
- description
- amount
- category

Ejemplo:

```json
{
  "expenses": [
    {
      "description": "Hotel",
      "amount": 500,
      "category": "Hospedaje"
    }
  ]
}
```

---

# Implementación técnica de gastos embebidos

El sistema implementa los gastos mediante un campo `simple-json` de TypeORM dentro de la entidad TravelPlan.

Cuando se agrega un gasto:
1. El servicio busca el plan existente.
2. Se obtiene el arreglo expenses.
3. Se inserta el nuevo objeto usando push().
4. Se persiste nuevamente el objeto actualizado en SQLite.

Esta estrategia permite manejar documentos embebidos sin crear tablas adicionales para gastos.

---

# Sistema de caché de países

Cuando se crea un plan:

1. TravelPlansService solicita validación del país.
2. CountriesService busca el país en SQLite.
3. Si existe:
   - reutiliza el valor local.
4. Si no existe:
   - consulta la API RestCountries,
   - guarda el país localmente,
   - y reutiliza la información en futuras solicitudes.

Esto reduce llamadas externas innecesarias y mejora el rendimiento.

---

# Middleware de auditoría

La aplicación implementa un middleware global de telemetría.

El middleware:
- extrae el header `x-user-id`,
- registra accesos en consola,
- y monitorea rutas y métodos HTTP.

Formato del log:

```bash
[User: 1] accedió a /travel-plans - POST
```

Si el header no existe:

```bash
[User: ANONYMOUS]
```

---

# Instalación y ejecución

## 1. Clonar repositorio

```bash
git clone https://github.com/seth093/preparcial2.git
```

---

## 2. Entrar al proyecto

```bash
cd preparcial2
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar la aplicación

```bash
npm run start:dev
```

La API se ejecutará en:

```bash
http://localhost:3000
```

---

# Inicialización de base de datos

El proyecto utiliza SQLite junto con TypeORM.

La base de datos `db.sqlite` se genera automáticamente al ejecutar la aplicación.

Si existen errores derivados de cambios estructurales en entidades, se recomienda eliminar:

```bash
db.sqlite
```

y volver a ejecutar:

```bash
npm run start:dev
```

---

# Pruebas en Postman

---

## Crear plan de viaje

### Endpoint

```http
POST /travel-plans
```

### URL

```bash
http://localhost:3000/travel-plans
```

### Body JSON

```json
{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-10",
  "countryCode": "COL",
  "userId": 1
}
```

---

## Agregar gasto embebido

### Endpoint

```http
POST /travel-plans/:id/expenses
```

### URL

```bash
http://localhost:3000/travel-plans/1/expenses
```

### Body JSON

```json
{
  "description": "Hotel",
  "amount": 500,
  "category": "Hospedaje"
}
```

---

## Obtener todos los planes

### Endpoint

```http
GET /travel-plans
```

### URL

```bash
http://localhost:3000/travel-plans
```

---

## Obtener un plan por ID

### Endpoint

```http
GET /travel-plans/:id
```

### Ejemplo

```bash
http://localhost:3000/travel-plans/1
```

---

## Eliminar un plan

### Endpoint

```http
DELETE /travel-plans/:id
```

### Ejemplo

```bash
http://localhost:3000/travel-plans/1
```

---

# Release requerido

El proyecto incluye un release en GitHub con la versión:

```bash
v1.0.0-parcial
```

marcando el estado final del código correspondiente a la entrega del parcial.

---

# Consideraciones finales

El proyecto fue desarrollado utilizando principios de modularidad y separación de responsabilidades propios de NestJS. La integración entre módulos se realizó mediante inyección de dependencias y middleware global, manteniendo desacoplada la lógica de negocio y facilitando la escalabilidad del sistema.