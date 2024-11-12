'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioTime.init({
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UsuarioTime',
  });
  return UsuarioTime;
};