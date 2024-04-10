'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registerRequest extends Model {
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
    }
  }
  registerRequest.init({
    idCompany: DataTypes.INTEGER,
    newFirstName: DataTypes.STRING,
    newLastName: DataTypes.STRING,
    newEmail: DataTypes.STRING,
    newPassword: DataTypes.STRING,
    newHiredHours: DataTypes.INTEGER,
    newSalary: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    processor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegisterRequest',
    tableName:'registerRequests'
  });
  return registerRequest;
};