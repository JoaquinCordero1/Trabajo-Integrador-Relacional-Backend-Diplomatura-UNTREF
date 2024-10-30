const express = require("express");
const router = express.Router();
const dataControllers = require("../controllers/dataControllers");

/**
 * @swagger
 * /contenido/:
 *   get:
 *     summary: Obtener todos los contenidos
 *     description: Retorna una lista de todos los contenidos almacenados en la base de datos, incluyendo sus categorías, géneros y reparto.
 *     responses:
 *       202:
 *         description: Contenidos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del contenido
 *                   titulo:
 *                     type: string
 *                     description: Título del contenido
 *                   resumen:
 *                     type: string
 *                     description: Resumen del contenido
 *                   temporadas:
 *                     type: integer
 *                     description: Número de temporadas (si aplica)
 *                   poster:
 *                     type: string
 *                     description: URL del póster del contenido
 *                   busqueda:
 *                     type: string
 *                     description: Palabras clave para búsqueda
 *                   trailer:
 *                     type: string
 *                     description: URL del tráiler del contenido
 *                   Categoria:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         description: Nombre de la categoría
 *                   Generos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           description: Nombre del género
 *                   Reparto:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           description: Nombre del actor
 *       404:
 *         description: No se encontraron contenidos.
 *       500:
 *         description: Error en el servidor
 */
router.get("/", dataControllers.getAllData);

/**
 * @swagger
 * /contenido/filter:
 *   get:
 *     summary: Filtra contenidos por título, género y categoría.
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: false
 *         schema:
 *           type: string
 *         description: Título del contenido a buscar.
 *       - in: query
 *         name: genero
 *         required: false
 *         schema:
 *           type: string
 *         description: Género del contenido a buscar.
 *       - in: query
 *         name: categoria
 *         required: false
 *         schema:
 *           type: string
 *         description: Categoría del contenido a buscar.
 *     responses:
 *       200:
 *         description: Lista de contenidos que coinciden con los filtros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   categoria_id:
 *                     type: integer
 *                   resumen:
 *                     type: string
 *                   temporadas:
 *                     type: integer
 *                   poster:
 *                     type: string
 *                   busqueda:
 *                     type: string
 *                   trailer:
 *                     type: string
 *       404:
 *         description: No se encontraron contenidos que coincidan con los filtros.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/filter", dataControllers.getFilterData);

/**
 * @swagger
 * /contenido/{id}:
 *   get:
 *     summary: Obtiene un contenido por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido a obtener.
 *     responses:
 *       200:
 *         description: Contenido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 categoria_id:
 *                   type: integer
 *                 resumen:
 *                   type: string
 *                 temporadas:
 *                   type: integer
 *                 poster:
 *                   type: string
 *                 busqueda:
 *                   type: string
 *                 trailer:
 *                   type: string
 *       404:
 *         description: Contenido inexistente con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", dataControllers.getContentById);

/**
 * @swagger
 * /contenido/add:
 *   post:
 *     summary: Agrega un nuevo contenido a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *               categoria:
 *                 type: string
 *                 description: Nombre de la categoría del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen o sinopsis del contenido.
 *               temporadas:
 *                 type: string
 *                 description: Número de temporadas, si es una serie (puede ser "N/A").
 *               poster:
 *                 type: string
 *                 description: URL o ruta del póster del contenido.
 *               busqueda:
 *                 type: string
 *                 description: Palabras clave para búsqueda relacionada con el contenido.
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler del contenido.
 *               genero:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de géneros del contenido.
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de actores en el contenido.
 *     responses:
 *       201:
 *         description: Contenido creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 contenido:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     titulo:
 *                       type: string
 *                     categoria_id:
 *                       type: integer
 *                     resumen:
 *                       type: string
 *                     temporadas:
 *                       type: string
 *                     poster:
 *                       type: string
 *                     busqueda:
 *                       type: string
 *                     trailer:
 *                       type: string
 *       400:
 *         description: Campos obligatorios faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/add", dataControllers.postAddNewContent);

/**
 * @swagger
 * /contenido/update/{id}:
 *   put:
 *     summary: Actualiza un contenido existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poster:
 *                 type: string
 *                 description: URL de la imagen del póster del contenido.
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               temporadas:
 *                 type: string
 *                 description: Número de temporadas, si es una serie (puede ser "N/A").
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler del contenido.
 *               categoria:
 *                 type: string
 *                 description: Nombre de la categoría a la que pertenece el contenido.
 *               genero:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de géneros asociados al contenido.
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de actores en el contenido que se actualizarán.
 *     responses:
 *       200:
 *         description: Contenido actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 contenido:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     poster:
 *                       type: string
 *                     titulo:
 *                       type: string
 *                     resumen:
 *                       type: string
 *                     temporadas:
 *                       type: string
 *                     trailer:
 *                       type: string
 *                     categoria:
 *                       type: string
 *                     genero:
 *                       type: array
 *                       items:
 *                         type: string
 *                     reparto:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: El ID es obligatorio o no válido.
 *       404:
 *         description: Contenido no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update/:id", dataControllers.putUpdateContentByID);

/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     summary: Elimina un contenido existente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: El ID es obligatorio o no válido.
 *       404:
 *         description: Contenido no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", dataControllers.deleteContentByID);

module.exports = router;
