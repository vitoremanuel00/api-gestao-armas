const { Model, DataTypes } = require("sequelize");

class ArmaModel extends Model {
    static init(database) {
        super.init({
            nome_arma: {
                type: DataTypes.TEXT,
                allowNull: false
              },
            marca: {
                type: DataTypes.TEXT,
                allowNull: false
              },
            modelo:  {
                type: DataTypes.TEXT,
                allowNull: false
              },
            numero_de_serie:  {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
              },
        }, {
            sequelize: database,
            tableName: 'arma',
            modelName: 'ArmaModel',
            timestamps: false
        });
    }
}
ArmaModel.associate = (models) => {
    // Associação de ArmaModel com ArmaEmprestada (um-para-um)
    ArmaModel.hasOne(models.ArmaEmprestadaModel, { foreignKey: 'armaId' });
    //reativar essa linha se o alias feito apos implementar o put das armas emprestadas bugar o codigo
};

module.exports = { ArmaModel };
