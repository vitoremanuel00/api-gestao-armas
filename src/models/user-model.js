const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(database) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
              },
              email: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
              },
              password: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
              matricula: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,

              },
              nome: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            },

        {
            tableName: 'user',
            modelName: 'UserModel',
            timestamps: false,
            sequelize: database
        });

        UserModel.associate = (models) => {
        // Um user pode emprestar uma arma por vez
        UserModel.hasOne(models.ArmaEmprestadaModel, { foreignKey: 'userId' });
        };

    }
}

module.exports = { UserModel };
