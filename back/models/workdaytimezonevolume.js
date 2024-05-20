'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkDayTimeZoneVolume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.WorkDay, {
        foreignKey: 'idWorkDay',
        as: 'workDay'
      },
      );
      this.belongsTo(models.TimeZone, {
        foreignKey: 'idTimeZone',
        as: 'timeZone'
      },
      );
    }
  }
  WorkDayTimeZoneVolume.init({
    idWorkDay: DataTypes.INTEGER,
    idTimeZone: DataTypes.INTEGER,
    volumeExpect: DataTypes.INTEGER,
    reachedVolume: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkDayTimeZoneVolume',
    tableName:'workDayTimeZoneVolumes'
  });
  return WorkDayTimeZoneVolume;
};