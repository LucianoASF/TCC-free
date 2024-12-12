'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pedidos_softwares', 'finalizado_cliente', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn(
      'pedidos_softwares',
      'finalizado_desenvolvedor',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'pedidos_softwares',
      'finalizado_cliente',
    );
    await queryInterface.removeColumn(
      'pedidos_softwares',
      'finalizado_desenvolvedor',
    );
  },
};
