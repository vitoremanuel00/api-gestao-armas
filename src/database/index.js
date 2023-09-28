const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { ArmaModel } = require('../models/arma-model');
const { UserModel } = require('../models/user-model');
const { ArmaEmprestadaModel } = require('../models/arma-emprestada-model');

const database = new Sequelize(configDatabase);

// Inicialize os modelos
ArmaModel.init(database);
UserModel.init(database);
ArmaEmprestadaModel.init(database);

// Chame as associações para cada modelo
ArmaModel.associate(database.models);
UserModel.associate(database.models);
ArmaEmprestadaModel.associate(database.models);

module.exports = database;
