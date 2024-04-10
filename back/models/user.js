'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
      this.hasMany(models.Report, {
        foreignKey: 'idReporter',
        as: 'notifiedReports'
      },
      );
      this.hasMany(models.Report, {
        foreignKey: 'idProcessor',
        as: 'reportsProcessed'
      },
      );
      this.hasMany(models.Assignment, {
        foreignKey: 'idUser',
        as: 'assignments'
      },
      );
      this.hasMany(models.Report, {
        foreignKey: 'idProcessor',
        as: 'registerRequestsProcessed'
      },
      );
      this.hasMany(models.UnregisterRequest, {
        foreignKey: 'idProcessor',
        as: 'unregisterRequestsProcessed'
      },
      );
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    access: DataTypes.NUMBER,
    hiredHours: DataTypes.NUMBER,
    idCompany: DataTypes.NUMBER,
    salary: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};