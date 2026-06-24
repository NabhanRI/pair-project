'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Enrollments', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });

    await queryInterface.addConstraint('Enrollments', 'CourseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Courses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Enrollments', 'UserId')
    await queryInterface.removeConstraint('Enrollments', 'CourseId')
  }
};
