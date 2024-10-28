const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');
const Contenido = require('./contenido');
const Genero = require('./genero');

const ContenidoGeneros = sequelize.define('ContenidoGeneros', {
    id_contenido: { 
        type: DataTypes.INTEGER, 
        references: { model: Contenido, key: 'id' }, 
        primaryKey: true 
    },
    id_genero: { 
        type: DataTypes.INTEGER, 
        references: { model: Genero, key: 'id' }, 
        primaryKey: true 
    }
}, {
    tableName: 'contenido_generos',
    timestamps: false
});

module.exports = ContenidoGeneros;
