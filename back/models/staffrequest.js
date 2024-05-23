'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StaffRequest extends Model {
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
        foreignKey: 'idUser',
        as: 'user'
      },
      );
    }
  }
  StaffRequest.init({
    idUser: DataTypes.INTEGER,
    idCompany: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    type: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StaffRequest',
    tableName: 'staffRequests',

  });
  return StaffRequest;
};