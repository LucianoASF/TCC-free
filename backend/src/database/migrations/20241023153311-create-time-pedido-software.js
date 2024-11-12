'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('times_pedidos_softwares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      time_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'times', key: 'id' },
        onDelete: 'CASCADE',
      },
      pedido_software: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'pedidos_softwares', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('times_pedidos_softwares');
  },
};
