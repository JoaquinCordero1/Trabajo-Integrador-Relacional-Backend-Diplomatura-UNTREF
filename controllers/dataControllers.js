const db = require("../conexion/database");
const Contenido = require("../models/contenido");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");
const ContenidoGeneros = require("../models/contenido_generos");
const ContenidoActores = require("../models/contenido_actores");
const { Op } = require("sequelize");

//
exports.getAllData = async (req, res) => {
  try {
    const content = await Contenido.findAll({
      attributes: { exclude: ["categoria_id"] },
      include: [
        {
          model: Categoria,
          as: "Categoria",
          attributes: ["nombre"],
        },
        {
          model: Genero,
          as: "Generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "Reparto",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
    });

    if (!content.length) {
      return res.status(404).json({
        message: "No se encontraron contenidos.",
        status: 404,
      });
    }
    res.status(202).json(content);
  } catch (error) {
    console.log("Error mostrar el contenido: ", error);
    res.status(500).json({
      message: "Hubo un error al mostrar el contenido",
      status: 500,
      error: error.message,
    });
  }
};
//
exports.getContentById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    console.log("Se requiere el ID");
    return res
      .status(400)
      .json({ message: "Se requiere un id válido", status: 400 });
  }
  try {
    const findTrailer = await Contenido.findByPk(id);
    if (!findTrailer) {
      console.log("Trailer no válido");
      return res.status(404).json({
        message: "Contenido inexistente con el ID proporcionado.",
        status: 404,
      });
    }
    res.status(200).json(findTrailer);
  } catch (error) {
    console.log("Error al mostrar el trailer: ", error);
    res.status(500).json({
      message: "Hubo un error al mostrar el trailer",
      status: 500,
      error: error.message,
    });
  }
};
//
exports.getFilterData = async (req, res) => {
  const { titulo, genero, categoria } = req.query;
  const condicion = {};
  const include = [];

  if (titulo) {
    condicion.titulo = { [Op.like]: `%${titulo}%` };
  }

  if (genero) {
    include.push({
      model: Genero,
      as: "Generos",
      attributes: ["nombre"],
      through: { attributes: [] },
      where: { nombre: { [Op.like]: `%${genero}%` } },
    });
  }

  if (categoria) {
    include.push({
      model: Categoria,
      as: "Categoria",
      attributes: ["nombre"],
      where: { nombre: { [Op.like]: `%${categoria}%` } },
    });
  }

  try {
    const contenido = await Contenido.findAll({
      attributes: { exclude: ["categoria_id"] },
      where: condicion,
      include: include,
    });

    if (contenido.length === 0) {
      console.log("No se encontraron contenidos.");
      return res.status(404).json({
        message: "No se encontraron contenidos que coincidan.",
        search: `-> Título: ${titulo || "No especificado"}, Género: ${
          genero || "No especificado"
        }, Categoría: ${categoria || "No especificado"}`,
        status: 404,
      });
    }

    res.status(200).json(contenido);
  } catch (error) {
    console.log("Error al filtrar el contenido: ", error);
    res.status(500).json({
      message: "Hubo un error al filtrar el contenido",
      status: 500,
      error: error.message,
    });
  }
};
//
exports.postAddNewContent = async (req, res) => {
  const {
    titulo,
    categoria,
    resumen,
    temporadas,
    poster,
    busqueda,
    trailer,
    genero,
    reparto,
  } = req.body;

  if (!titulo || !categoria || !resumen || !genero || !reparto || !poster) {
    return res.status(400).json({
      message:
        "Todos los campos son obligatorios: titulo, categoria, resumen, genero, reparto",
      status: 400,
    });
  }

  try {
    const [categoriaObj] = await Categoria.findOrCreate({
      where: { nombre: categoria },
    });

    const nuevoContenido = await Contenido.create({
      titulo,
      categoria_id: categoriaObj.id,
      resumen,
      temporadas: temporadas === "N/A" ? null : temporadas,
      poster,
      busqueda,
      trailer,
    });

    const generos =
      typeof genero === "string"
        ? genero.split(",").map((g) => g.trim())
        : genero.map((g) => g.trim());
    const actores =
      typeof reparto === "string"
        ? reparto.split(",").map((a) => a.trim())
        : reparto.map((a) => a.trim());
    // Elimina actores existentes en caso de que ya se haya creado
    await ContenidoActores.destroy({
      where: { id_contenido: nuevoContenido.id },
    });

    // Relacionar generos
    for (const generoNombre of generos) {
      const [generoObj] = await Genero.findOrCreate({
        where: { nombre: generoNombre },
      });
      // Si no existe, lo crea. Esto ayuda a evitar duplicados en la tabla Genero

      await ContenidoGeneros.create({
        id_contenido: nuevoContenido.id,
        id_genero: generoObj.id,
      });
    }

    // Relacionar reparto
    for (const actorNombre of actores) {
      const [actorObj] = await Actor.findOrCreate({
        where: { nombre: actorNombre },
      });

      await ContenidoActores.create({
        id_contenido: nuevoContenido.id,
        id_actor: actorObj.id,
      });
    }

    res.status(201).json({
      message: "Contenido creado con éxito",
      contenido: nuevoContenido,
    });
  } catch (error) {
    console.error("Error al agregar contenido: ", error);
    res
      .status(500)
      .json({ message: "Error al agregar contenido", error: error.message });
  }
};
//
exports.putUpdateContentByID = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    categoria,
    resumen,
    temporadas,
    poster,
    busqueda,
    trailer,
    genero,
    reparto,
  } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "El ID es obligatorio.", status: 400 });
  }

  try {
    const contenido = await Contenido.findByPk(id);
    if (!contenido) {
      return res
        .status(404)
        .json({ message: "Contenido no encontrado.", status: 404 });
    }

    // Actualizar los campos
    contenido.titulo = titulo || contenido.titulo;
    contenido.categoria = categoria || contenido.categoria;
    contenido.resumen = resumen || contenido.resumen;
    contenido.temporadas =
      temporadas !== undefined
        ? temporadas === "N/A"
          ? null
          : temporadas
        : contenido.temporadas;
    contenido.poster = poster || contenido.poster;
    contenido.busqueda = busqueda || contenido.busqueda;
    contenido.trailer = trailer || contenido.trailer;

    await contenido.save();

    // Manejo del reparto
    if (reparto) {
      await ContenidoActores.destroy({ where: { id_contenido: id } });
      const actores =
        typeof reparto === "string" ? [reparto] : reparto.map((a) => a.trim());
      for (const actorNombre of actores) {
        const [actorObj] = await Actor.findOrCreate({
          where: { nombre: actorNombre },
        });
        await ContenidoActores.create({
          id_contenido: contenido.id,
          id_actor: actorObj.id,
        });
      }
    }

    res
      .status(200)
      .json({ message: "Contenido actualizado con éxito", contenido });
  } catch (error) {
    console.error("Error al actualizar contenido: ", error);
    res
      .status(500)
      .json({ message: "Error al actualizar contenido", error: error.message });
  }
};
//
exports.deleteContentByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "El ID es obligatorio.", status: 400 });
  }

  try {
    const contenido = await Contenido.findByPk(id);
    if (!contenido) {
      return res.status(404).json({ message: "Contenido no encontrado." });
    }
    // Elimina las relaciones de actores, generos y el contenido
    await ContenidoActores.destroy({ where: { id_contenido: id } });
    await ContenidoGeneros.destroy({ where: { id_contenido: id } });
    await Contenido.destroy({ where: { id } });

    res.status(200).json({ message: "Contenido eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar contenido: ", error);
    res
      .status(500)
      .json({ message: "Error al eliminar contenido", error: error.message });
  }
};
