'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'times_pedidos_softwares',
      'pedido_software',
      'pedido_software_id',
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Reverte a mudança, voltando o nome da coluna para o original
    await queryInterface.renameColumn(
      'times_pedidos_softwares',
      'pedido_software_id',
      'pedido_software',
    );
  },
};
