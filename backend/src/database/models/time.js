'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Time extends Model {
    static associate(models) {
      Time.belongsToMany(models.Usuario, {
        through: models.UsuarioTime,
        foreignKey: 'time_id',
      });
      Time.belongsToMany(models.PedidoSoftware, {
        through: models.TimePedidoSoftware,
        foreignKey: 'time_id',
        as: 'PedidoSoftware',
      });
    }
  }
  Time.init(
    {
      nome: DataTypes.STRING(45),
      aceitando_membros: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Time',
      tableName: 'times',
    },
  );
  return Time;
};
