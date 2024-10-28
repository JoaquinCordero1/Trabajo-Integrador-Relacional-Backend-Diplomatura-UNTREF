// Model for Contenido
const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Actor = require("./actor");
const Genero = require("./genero");
const Categoria = require("./categoria");
const ContenidoActores = require("./contenido_actores");
const ContenidoGeneros = require("./contenido_generos");

const Contenido = sequelize.define(
  "Contenido",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    categoria_id: { type: DataTypes.INTEGER, allowNull: false },
    resumen: { type: DataTypes.TEXT },
    temporadas: { type: DataTypes.INTEGER },
    poster: { type: DataTypes.STRING },
    busqueda: { type: DataTypes.TEXT },
    trailer: { type: DataTypes.STRING },
  },
  {
    tableName: "contenido",
    timestamps: false,
  }
);

// En el modelo Contenido
Contenido.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });
Categoria.hasMany(Contenido, { foreignKey: 'categoria_id', as: 'Contenidos' });

Contenido.belongsToMany(Actor, {
  through: { model: ContenidoActores, attributes: [] }, 
  foreignKey: "id_contenido",
  as: 'Reparto' 
});
Actor.belongsToMany(Contenido, {
  through: { model: ContenidoActores, attributes: [] }, 
  foreignKey: "id_actor",
  as: 'Contenidos' 
});

Contenido.belongsToMany(Genero, {
  through: { model: ContenidoGeneros, attributes: [] },
  foreignKey: "id_contenido",
  as: 'Generos' 
});
Genero.belongsToMany(Contenido, {
  through: { model: ContenidoGeneros, attributes: [] }, 
  foreignKey: "id_genero",
  as: 'Contenidos' 
});


module.exports = Contenido;
