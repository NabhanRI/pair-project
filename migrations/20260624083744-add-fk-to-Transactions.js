'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint('Transactions', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_transactions_userid',
      references: { 
        table: 'Users', 
        field: 'id' 
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });

    await queryInterface.addConstraint('Transactions', {
      fields: ['CourseId'],
      type: 'foreign key',
      name: 'fk_transactions_courseid',
      references: { 
        table: 'Courses', 
        field: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_userid');
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_courseid');
  }
};
