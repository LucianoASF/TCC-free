'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioPedidoSoftware extends Model {
    static associate(models) {}
  }
  UsuarioPedidoSoftware.init(
    {
      aceito: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UsuarioPedidoSoftware',
      tableName: 'usuarios_pedidos_softwares',
    },
  );
  return UsuarioPedidoSoftware;
};
