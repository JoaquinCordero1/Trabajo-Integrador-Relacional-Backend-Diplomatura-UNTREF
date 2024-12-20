const express = require("express");
const app = express();
const sequelize = require("./conexion/database");
const Contenido = require("./models/contenido");
const Categoria = require("./models/categoria");
const Genero = require("./models/genero");
const Actor = require("./models/actor");
const ContenidoActores = require("./models/contenido_actores");
const ContenidoGeneros = require("./models/contenido_generos");
const { swaggerUi, swaggerDocs } = require("./config/swagger");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    await Categoria.sync();
    await Genero.sync();
    await Actor.sync();
    await Contenido.sync();
    await ContenidoActores.sync();
    await ContenidoGeneros.sync();
    next();
  } catch (error) {
    console.log("Error en el servidor", error);
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

const contenidoRoutes = require("./routes/contenidoRoutes");

app.get("/", (req, res) => {
  res.json("¡Bienvenido a mi API multimedia!");
});

app.use("/contenido", contenidoRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada.",
    error: "Not Found",
    status: 404,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
