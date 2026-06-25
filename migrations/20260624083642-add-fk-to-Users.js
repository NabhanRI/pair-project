'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', {
      fields: ['ProfileId'],
      type: 'foreign key',
      name: 'fk_users_profileid',
      references: { 
        table: 'Profiles',
        field: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'fk_users_profileid');
  }
};
