'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Menjadikan email di tabel Users bersifat unik
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'custom_unique_email_users' // Nama constraint bebas
    });

    // 2. Menjadikan title di tabel Users bersifat unik
    await queryInterface.addConstraint('Courses', {
      fields: ['title'],
      type: 'unique',
      name: 'custom_unique_title_courses'// Nama constraint bebas
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'custom_unique_email_users');
    await queryInterface.removeConstraint('Courses', 'custom_unique_title_courses');
  }
};
