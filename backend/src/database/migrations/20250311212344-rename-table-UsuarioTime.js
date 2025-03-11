'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('usuarioTimes', 'UsuarioTimes');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('UsuarioTimes', 'usuarioTimes');
  },
};
