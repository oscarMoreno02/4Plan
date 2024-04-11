
'use strict';

const { userFactory } = require('../factories/userFactory');

const { userStaffFactory } = require('../factories/userStaffFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user = await userFactory();
    await queryInterface.bulkInsert('users', user, {});
    const staff=await userStaffFactory()
    await queryInterface.bulkInsert('users', staff, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
