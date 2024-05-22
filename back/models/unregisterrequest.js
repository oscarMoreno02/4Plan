'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unregisterRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: 'idCompany',
        as: 'company'
      },
      );
      this.belongsTo(models.User, {
        foreignKey: 'idProcessor',
        as: 'processor'
      },
      );
      this.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user'
      },
      );
    }
  }
  unregisterRequest.init({
    idCompany: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    idProcessor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UnregisterRequest',
    tableName:'unregisterRequests'
  });
  return unregisterRequest;
};