'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assignments', {
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
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        onDelete:'SET NULL'
      },
      idWorkDay: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workDays'
          },
          key: 'id'
        },
        onDelete:'SET NULL'
      },
      idArea: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workAreas'
          },
          key: 'id'
        },
        onDelete:'SET NULL'
      },
      idPosition: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workPositions'
          },
          key: 'id'
        },
        onDelete:'SET NULL'
      },
      start: {
        type: Sequelize.TIME
      },
      end: {
        type: Sequelize.TIME
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue:null
      },
      type: {
        type: Sequelize.INTEGER,
      },
      valuation: {
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue:null
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
    await queryInterface.dropTable('assignments');
  }
};