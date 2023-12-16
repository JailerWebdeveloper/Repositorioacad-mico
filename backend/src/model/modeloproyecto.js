const {  Model, DataTypes } = require("sequelize");
const sequelize = require("../app/conexion");


//const Integrantes = require("./modelointegrantes");
const Usuario = require("../model/modelosusuario");


class Proyecto extends Model {}

Proyecto.init(
    {
        id_proyecto: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        titulo: {
            type: DataTypes.STRING,
        },
        descripción: {
            type: DataTypes.TEXT,
        },
        fecha_publicado:{
            type: DataTypes.STRING
        },
        fecha_radicado:{
            type: DataTypes.DATE
        },
        Comunidad:{
            type: DataTypes.STRING
        },
        facultadId:{
            type: DataTypes.INTEGER,
           
        },
        carreraId:{
            type: DataTypes.INTEGER,
            
        },
        cedulaUsuario: { // Nueva columna
            type: DataTypes.BIGINT,
            references: {
                model: Usuario,
                key: 'cedula'
            }
        },
        Autor:{
            type: DataTypes.STRING
        },
        Url:{
            type: DataTypes.STRING
        },
        colaboradores:{
            type: DataTypes.STRING
        }
        
    },
    {
        sequelize,
        modelName: 'Proyecto',
        createdAt: false,
        updatedAt: false
    }
);


module.exports = Proyecto;