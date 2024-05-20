'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParameterDetail extends Model {
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
      this.belongsTo(models.WorkPosition, {
        foreignKey: 'idPosition',
        as: 'position'
      },
      );
      this.belongsTo(models.WorkArea, {
        foreignKey: 'idArea',
        as: 'area'
      },
      );
      this.belongsTo(models.WorkParameter, {
        foreignKey: 'idParameter',
        as: 'parameter'
      },
      );
    }
  }
  ParameterDetail.init({
    idCompany: DataTypes.INTEGER,
    idParameter: DataTypes.INTEGER,
    idPosition: DataTypes.INTEGER,
    idArea: DataTypes.INTEGER,
    expectedValuation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ParameterDetail',
    tableName:'parameterDetails'
  });
  return ParameterDetail;
};