const { Sequelize, Model, DataTypes } = require("sequelize");

const  Facultads=require("./modelosfacultad")

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('PROYECTOUPC', 'prueba', 'tMeque+2023+', {
    host: 'srv435312.hstgr.cloud',
    dialect: "mysql",
  });


class Carreras extends Sequelize.Model {}
Carreras.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    facultadId: {
      type: DataTypes.INTEGER,
      references: {
        model: Facultads,
        key: 'id',
      },
    },
  },

  {
    sequelize,
    modelName: 'Carreras',
    createdAt:false,
    updatedAt:false
  }
);

  module.exports=Carreras