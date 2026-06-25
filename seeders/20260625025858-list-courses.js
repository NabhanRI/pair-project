'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Dasar HTML: Pondasi Website',
        description: 'Pelajari struktur dasar halaman web dari nol hingga paham penggunaan tag dan semantic HTML.',
        price: 50000,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=500&auto=format&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
