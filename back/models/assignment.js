'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
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
      this.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'assignedTo'
      },
      );
      this.belongsTo(models.WorkDay, {
        foreignKey: 'idWorkDay',
        as: 'workDay'
      },
      );
      this.belongsTo(models.WorkPosition, {
        foreignKey: 'idPosition',
        as: 'position'
      },
      );
    }
  }
  Assignment.init({
    idCompany: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    idPosition: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    valuation: DataTypes.INTEGER,
    idWorkDay:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Assignment',
    tableName: 'assignments'
  });
  return Assignment;
};