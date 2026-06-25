'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint('Enrollments', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_enrollments_userid',
      references: { 
        table: 'Users', 
        field: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('Enrollments', {
      fields: ['CourseId'],
      type: 'foreign key',
      name: 'fk_enrollments_courseid',
      references: { 
        table: 'Courses', 
        field: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Enrollments', 'fk_enrollments_userid');
    await queryInterface.removeConstraint('Enrollments', 'fk_enrollments_courseid');
  }
};
