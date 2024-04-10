'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkParameter extends Model {
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
      this.belongsTo(models.TimeZone, {
        foreignKey: 'idTimeZone',
        as: 'timeZone'
      },
      );
      this.hasMany(models.ParameterDetail, {
        foreignKey: 'idParameter',
        as: 'details'
      },
      );
    }
    
  }
  WorkParameter.init({
    idCompany: DataTypes.INTEGER,
    idTimeZone: DataTypes.INTEGER,
    expectedVolume: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkParameter',
    tableName:'workParameters'
  });
  return WorkParameter;
};