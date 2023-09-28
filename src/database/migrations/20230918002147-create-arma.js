'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('arma', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome_arma: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            marca: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            modelo: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            numero_de_serie: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('arma');
    }
};
