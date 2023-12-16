const { Sequelize, Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('PROYECTOUPC', 'prueba', 'tMeque+2023+', {
    host: 'srv435312.hstgr.cloud',
    dialect: "mysql",
  });


class Facultads extends Model {} // Cambiado de Sequelize.Model a Model directamente
Facultads.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Facultads',
        createdAt:false,
        updatedAt:false
    }
);
module.exports =  Facultads
  

