'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parameterDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCompany: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'companies'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      idParameter: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workParameters'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      idPosition: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workPositions'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      idArea: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workAreas'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      expectedValuation: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('parameterDetails');
  }
};