'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('usuarioTime', 'UsuarioTime');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('UsuarioTime', 'usuarioTime');
  },
};
