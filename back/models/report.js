'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'idReporter',
        as: 'reporter'
      },
      
      );
      this.belongsTo(models.User, {
        foreignKey: 'idProcessor',
        as: 'processor'
      },
      
      );

    }
  }
  Report.init({
    type: DataTypes.ENUM,
    resume: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    idReporter: DataTypes.INTEGER,
    idProcessor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
    tableName:'reports'
  });
  return Report;
};