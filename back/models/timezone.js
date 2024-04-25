'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeZone extends Model {
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
      this.hasMany(models.WorkParameter, {
        foreignKey: 'idTimeZone',
        as: 'workParameters'
      },
      );
      this.hasMany(models.DayTimeZone, {
        foreignKey: 'idTimeZone',
        as: 'days'
      },
      );
    }
  }
  TimeZone.init({
    idCompany: DataTypes.INTEGER,
    start: DataTypes.TIME,
    end: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'TimeZone',
    tableName:'timeZones'
  });
  return TimeZone;
};