//ArmaEmpretadaModel
const { Model, DataTypes } = require("sequelize");

class ArmaEmprestadaModel extends Model {
    static init(database) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            armaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            data_emprestimo: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            data_devolucao: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("emprestada", "devolvida"),
                allowNull: false,
                defaultValue: "emprestada",
            },
            observacoes: {
                type: DataTypes.STRING,
                allowNull: true,
              },
        },

            {
                tableName: 'arma_emprestada',
                modelName: 'ArmaEmprestadaModel',
                timestamps: false,
                sequelize: database
            });
    }
}
ArmaEmprestadaModel.associate = (models) => {
    // Associação de ArmaEmprestadaModel com User (um-para-um)
    ArmaEmprestadaModel.belongsTo(models.UserModel, { foreignKey: 'userId', as: 'usuario'});//, as: 'usuario'

    // Associação de ArmaEmprestadaModel com Arma (um-para-um)
    ArmaEmprestadaModel.belongsTo(models.ArmaModel, { foreignKey: 'armaId', as: 'arma'});//, as: 'arma'
  };


module.exports = { ArmaEmprestadaModel };
