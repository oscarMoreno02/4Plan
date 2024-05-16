'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workDayTimeZoneVolumes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idWorkDay: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'workDays'
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
      volumeExpect: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      reachedVolume: {
        type: Sequelize.INTEGER,
        defaultValue:0
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
    await queryInterface.dropTable('workDayTimeZoneVolumes');
  }
};