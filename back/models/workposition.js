'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkPosition extends Model {
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
      this.hasMany(models.Company, {
        foreignKey: 'idPosition',
        as: 'parameterDetails'
      },
      );
    }
  }
  WorkPosition.init({
    description: DataTypes.STRING,
    idCompany: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkPosition',
    tableName:'workPositions'
  });
  return WorkPosition;
};