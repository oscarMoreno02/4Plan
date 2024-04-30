'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkDay extends Model {
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
      this.hasMany(models.Assignment, {
        foreignKey: 'idWorkDay',
        as: 'dayAssignments'
      },
      );
    }
    
  }
  WorkDay.init({
    date:DataTypes.DATEONLY,
    expectVolume: DataTypes.NUMBER,
    reachedVolume: DataTypes.NUMBER,
    published:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'WorkDay',
    tableName:'workDays'
  });
  return WorkDay;
};