'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dayTimeZone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TimeZone, {
        foreignKey: 'idTimeZone',
        as: 'timeZone'
      },
      );    }
  }
  dayTimeZone.init({
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    idTimeZone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DayTimeZone',
    tableName: 'dayTimeZones',

  });
  return dayTimeZone;
};