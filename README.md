# Proyecto Integrador: CRUD con Node.js y MySQL

En este proyecto, desarrollé una plataforma de streaming usando Node.js y MySQL. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos relacional, utilizando el archivo trailerflix.json como referencia para diseñar el modelo de datos.

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Endpoints](#endpoints)
  - [Obtener todos los contenidos](#obtener-todos-los-contenidos)
  - [Agregar un nuevo contenido](#agregar-un-nuevo-contenido)
  - [Actualizar un contenido](#actualizar-un-contenido)
  - [Eliminar un contenido](#eliminar-un-contenido)
  - [Filtrar contenidos](#filtrar-por-contenido)
- [Manejo de Errores](#manejo-de-errores)
- [Instalación](#instalación)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

| Tecnología     | Descripción                                  | Enlace                                          |
| -------------- | -------------------------------------------- | ----------------------------------------------- |
| **Node.js**    | 🟢 Entorno de ejecución de JavaScript        | [Documentación oficial](https://nodejs.org/)    |
| **Express.js** | 🚀 Framework para construir aplicaciones web | [Documentación oficial](https://expressjs.com/) |
| **Sequelize**  | 💾 ORM para gestionar la base de datos       | [Documentación oficial](https://sequelize.org/) |
| **MySQL**      | 🗄️ Sistema de gestión de bases de datos      | [Documentación oficial](https://www.mysql.com/) |

## Endpoints

A continuación se detallan los endpoints disponibles en la API:

### Obtener todos los contenidos

- **Método**: `GET`
- **Ruta**: `/contenido`
- **Descripción**: Devuelve todos los contenidos de la base de datos.

### Agregar un nuevo contenido

- **Método**: `POST`
- **Ruta**: `/contenido/add`
- **Descripción**: Agrega una nueva película o serie a la base de datos.
- **Cuerpo de la solicitud**:
  ```json
  {
    "titulo": "El Misterio de la Isla Perdida",
    "categoria": "Película",
    "resumen": "Un grupo de exploradores se aventura en una isla misteriosa en busca de un tesoro perdido.",
    "temporadas": "N/A",
    "poster": "./posters/misterio_isla.jpg",
    "busqueda": "misterio, aventura, tesoro, isla",
    "trailer": "https://www.youtube.com/embed/12345",
    "genero": "Aventura",
    "reparto": "John Doe, Jane Smith, Michael Johnson"
  }
  ```

### Actualizar un contenido

- **Método**: `PUT`
- **Ruta**: `/contenido/update/:id`
- **Descripción**: Actualiza información de un contenido existente.
- **Cuerpo de la solicitud**:
  ```json
  {
    "temporadas": 2,
    "trailer": "https://youtube.com/trailer",
    "reparto": "Nuevo Actor, Otro Actor"
  }
  ```

### Filtrar por contenido

- **Método**: `GET`
- **Ruta**: `/contenido/filter`
- **Descripción**: Filtra los contenidos por título, género o categoría.
- **Parámetros de consulta**:
  <br>`título: Título del contenido (opcional).`
  <br>`genero: Género del contenido (opcional).`
  <br>`categoria: Categoría del contenido (opcional).`
- **Ejemplo de solicitud**:
  ```sql
    GET /contenido/filter?titulo=acción&genero=aventura&categoria=Película
  ```

### Eliminar un contenido

- **Método**: `DELETE`
- **Ruta**: `/contenido/:id`
- **Descripción**: Eliminar un contenido.

## Manejo de Errores

La API maneja errores de manera efectiva para proporcionar información clara sobre los problemas que pueden surgir. A continuación se describen los tipos de errores y sus respuestas:

- **Errores de Validación**: Si los datos enviados en la solicitud no son válidos o faltan campos obligatorios, se devuelve un código de estado `400 Bad Request` junto con un mensaje que detalla los campos faltantes.

  **Ejemplo**:

```json
{
  "message": "Todos los campos son obligatorios: titulo, categoria, resumen, genero, reparto"
}
```

## Contenido No Encontrado

- Cuando se intenta acceder a un contenido que no existe en la base de datos, la API devuelve un mensaje claro junto con un código de estado `404 Not Found`. Esto indica que el recurso solicitado no se pudo encontrar.

  **Respuesta de Error**:

```json
{
  "message": "Contenido no encontrado"
}
```

## Errores Internos del Servidor

Si se produce un error inesperado durante la ejecución de la API, se devuelve un código de estado `500 Internal Server Error`. Esto indica que hubo un problema en el servidor que impidió procesar la solicitud.

### Respuesta de Error

```json
{
  "message": "Error en el servidor",
  "error": "Descripción del error"
}
```

## Rutas No Existentes

Cuando se intenta acceder a una ruta que no está definida en la API, se devuelve un código de estado `404 Not Found`. Esto indica que el recurso solicitado no existe.

### Respuesta de Error

La API devuelve una respuesta en formato JSON que incluye un mensaje indicando que la ruta no fue encontrada.

```json
{
  "message": "Ruta no encontrada",
  "error": "Not Found",
  "status": 404
}
```
