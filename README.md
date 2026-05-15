# Preparcial 2 - API REST para Planificación de Viajes

## Autor
Kevin Arenas - seth093

---

# Descripción del proyecto

Este proyecto corresponde al desarrollo de una API REST modular construida con NestJS para la gestión de planes de viaje. La aplicación implementa un sistema de integración con una API externa de países utilizando un mecanismo de caché local en base de datos, evitando llamadas repetidas al servicio externo.

La arquitectura fue desarrollada siguiendo una separación modular entre la lógica de países y la lógica de planes de viaje, garantizando encapsulamiento y reutilización de servicios internos.

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

# Arquitectura del proyecto

El sistema está dividido en dos módulos principales:

## CountriesModule

Este módulo se encarga exclusivamente de la gestión interna de países.

Responsabilidades:
- Buscar países en la base de datos local.
- Consumir la API externa RestCountries cuando el país no existe localmente.
- Almacenar países en caché para futuras consultas.
- Exponer únicamente el servicio interno CountriesService.

Este módulo no expone endpoints HTTP públicos.

---

## TravelPlansModule

Este módulo representa la interfaz pública del sistema.

Responsabilidades:
- Crear planes de viaje.
- Consultar planes existentes.
- Eliminar planes.
- Comunicarse con CountriesService para validar la existencia de países antes de guardar un plan.

Endpoints implementados:
- POST /travel-plans
- GET /travel-plans
- GET /travel-plans/:id
- DELETE /travel-plans/:id

---

# Flujo de caché de países

Cuando el usuario crea un plan de viaje:

1. El TravelPlansService solicita al CountriesService la validación del país.
2. CountriesService busca el país localmente en SQLite.
3. Si el país existe:
   - Se reutiliza la información local.
   - No se realiza ninguna llamada externa.
4. Si el país no existe:
   - Se consulta la API RestCountries.
   - La información obtenida se almacena localmente.
   - El país queda cacheado para futuras solicitudes.

Este mecanismo reduce llamadas innecesarias a servicios externos y mejora el rendimiento de la aplicación.

---

# Instalación y ejecución

## 1. Clonar el repositorio

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

## 4. Ejecutar el proyecto

```bash
npm run start:dev
```

La aplicación se ejecutará en:

```bash
http://localhost:3000
```

---

# Base de datos

El proyecto utiliza SQLite como motor de persistencia.

La base de datos se genera automáticamente mediante TypeORM utilizando la opción synchronize.

Antes de presentar el parcial se recomienda eliminar el archivo:

```bash
db.sqlite
```

para evitar inconsistencias derivadas de cambios en el dominio.

---

# Ejemplos de pruebas en Postman

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
  "countryCode": "COL"
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

# Consideraciones finales

El proyecto fue desarrollado siguiendo principios de modularidad y encapsulamiento propios de NestJS. La integración entre módulos se realizó mediante inyección de dependencias, manteniendo desacoplada la lógica de negocio y permitiendo la reutilización del servicio de países sin exponer rutas HTTP públicas.