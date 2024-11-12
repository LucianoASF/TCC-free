'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimePedidoSoftware extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TimePedidoSoftware.init(
    {},
    {
      sequelize,
      modelName: 'TimePedidoSoftware',
      tableName: 'times_pedidos_softwares',
    },
  );
  return TimePedidoSoftware;
};
