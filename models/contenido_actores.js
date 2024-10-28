const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');
const Contenido = require('./contenido');
const Actor = require('./actor');

const ContenidoActores = sequelize.define('ContenidoActores', {
    id_contenido: { 
        type: DataTypes.INTEGER, 
        references: { model: Contenido, key: 'id' }, 
        primaryKey: true 
    },
    id_actor: { 
        type: DataTypes.INTEGER, 
        references: { model: Actor, key: 'id' }, 
        primaryKey: true 
    }
}, {
    tableName: 'contenido_actores',
    timestamps: false
});

module.exports = ContenidoActores;
