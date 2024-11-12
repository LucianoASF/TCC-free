'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.PedidoSoftware, {
        foreignKey: 'cliente_id',
      });
      Usuario.hasMany(models.UsuarioPedidoSoftware, {
        foreignKey: 'desenvolvedor_id',
      });
      Usuario.belongsToMany(models.Time, {
        through: models.UsuarioTime,
        foreignKey: 'desenvolvedor_id',
      });
    }
    toJSON() {
      const attributes = { ...this.get() };
      delete attributes.senha; // Remove a senha
      return attributes;
    }
  }
  Usuario.init(
    {
      nome: {
        type: DataTypes.STRING(80),
        validate: {
          len: {
            args: [5, 80],
            msg: 'O nome deve ter entre 5 e 80 caractreres',
          },
        },
      },
      email: {
        type: DataTypes.STRING(80),
        validate: {
          isEmail: {
            args: true,
            msg: 'Formato de email inválido',
          },
          len: {
            args: [5, 80],
            msg: 'O email deve ter entre 5 e 80 caractreres',
          },
        },
      },
      senha: {
        type: DataTypes.STRING(60),
        validate: {
          len: {
            args: [5, 60],
            msg: 'A senha deve ter entre 5 e 60 caracteres',
          },
        },
      },
      role: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
    },
  );
  return Usuario;
};
