//migration user 20230713193339-user.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            matricula:{
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true,
            },
            nome:{
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
