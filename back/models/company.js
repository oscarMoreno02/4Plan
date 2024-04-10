'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'idCompany',
        as: 'employees'
      },
      );
    }
    static associate(models) {
      this.hasMany(models.WorkArea, {
        foreignKey: 'idCompany',
        as: 'workAreas'
      },
      );
    }
    static associate(models) {
      this.hasMany(models.WorkPosition, {
        foreignKey: 'idCompany',
        as: 'workPositions'
      },
      );
    }
    
    static associate(models) {
      this.hasMany(models.TimeZone, {
        foreignKey: 'idCompany',
        as: 'timeZones'
      },
      );
    }
    static associate(models) {
      this.hasMany(models.WorkParameter, {
        foreignKey: 'idCompany',
        as: 'workParameters'
      },
      );
    }
  }
  Company.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    sector: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    contact: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Company',
    tableName:'companies'
  });
  return Company;
};