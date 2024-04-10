'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkArea extends Model {
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
    }
  }
  WorkArea.init({
    description: DataTypes.STRING,
    idCompany: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkArea',
    tableName:'workAreas'
  });
  return WorkArea;
};