'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoSoftware extends Model {
    static associate(models) {
      PedidoSoftware.belongsTo(models.Usuario, {
        foreignKey: 'cliente_id',
      });
      PedidoSoftware.belongsToMany(models.Usuario, {
        through: models.UsuarioPedidoSoftware,
        foreignKey: 'pedido_software_id',
        as: 'candidatos',
      });
      PedidoSoftware.belongsToMany(models.Time, {
        through: models.TimePedidoSoftware,
        foreignKey: 'pedido_software_id',
        as: 'times',
      });
    }
  }
  PedidoSoftware.init(
    {
      titulo: {
        type: DataTypes.STRING(60),
        validate: {
          len: {
            args: [5, 60],
            msg: 'O título deve ter entre 5 e 60 caracteres',
          },
        },
      },
      descricao: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'PedidoSoftware',
      tableName: 'pedidos_softwares',
    },
  );
  return PedidoSoftware;
};
