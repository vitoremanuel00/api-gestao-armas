//migration arma emprestada 20230920132227-create-arma-emprestada

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('arma_emprestada', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'user', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            armaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'arma', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            data_emprestimo: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            data_devolucao: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('emprestada', 'devolvida'),
                allowNull: false,
                defaultValue: 'emprestada',
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('arma_emprestada');
    },
};
