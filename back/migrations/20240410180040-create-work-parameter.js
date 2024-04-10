'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workParameters', {
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
      idTimeZone: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'timeZones'
          },
          key: 'id'
        },
        onDelete:'SET NULL'
      },
      expectedVolume: {
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
    await queryInterface.dropTable('workParameters');
  }
};