'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('arma_emprestada', 'observacoes', {
      type: Sequelize.STRING,
      allowNull: true, // Pode ser nulo, dependendo dos requisitos.
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('arma_emprestada', 'observacoes');
  },
};

