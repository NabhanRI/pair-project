'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert Profiles dulu (karena Users butuh ProfileId)
    const insertedProfiles = await queryInterface.bulkInsert(
      "Profiles",
      [
        {
          fullName: "Nabhan Rifai",
          bio: "Saya adalah Super Admin di aplikasi ini.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Alysa Yasmin",
          bio: "Saya siap belajar coding dari nol.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true } // Menangkap hasil insert (termasuk ID)
    );

    // Cari ID berdasarkan nama dari data yang baru saja di-insert
    const adminProfile = insertedProfiles.find(
      (p) => p.fullName === "Nabhan Rifai"
    );
    const siswaProfile = insertedProfiles.find(
      (p) => p.fullName === "Alysa Yasmin"
    );

    // 2. Baru insert Usert (Karena ada FK si ProfileId)
    await queryInterface.bulkInsert('Users', [
      {
        email: 'nabhan@gmail.com',
        username: 'nabhan',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        ProfileId: adminProfile.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'Ayaya@gmail.com',
        username: 'Ayasmin',
        password: await bcrypt.hash('password123', 10),
        role: 'student',
        ProfileId: siswaProfile.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Urutan delete nya harus kebalikan dari up (hapus anak dulu, baru bapaknya)
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Profiles", null, {});
  }
};
