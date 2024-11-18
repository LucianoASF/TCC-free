'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a constraint existente
    await queryInterface.removeConstraint(
      'usuariotimes',
      'usuariotimes_ibfk_2',
    );

    // Adicionar a nova constraint com onDelete: CASCADE
    await queryInterface.addConstraint('usuariotimes', {
      fields: ['time_id'],
      type: 'foreign key',
      name: 'usuariotimes_ibfk_2', // Certifique-se de usar o mesmo nome ou um novo
      references: {
        table: 'times',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a nova constraint
    await queryInterface.removeConstraint(
      'usuariotimes',
      'usuariotimes_ibfk_2',
    );

    // Adicionar a constraint antiga (sem CASCADE, se necessário)
    await queryInterface.addConstraint('usuariotimes', {
      fields: ['time_id'],
      type: 'foreign key',
      name: 'usuariotimes_ibfk_2',
      references: {
        table: 'times',
        field: 'id',
      },
    });
  },
};
