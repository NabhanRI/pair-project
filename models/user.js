'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // One-to-One: User memiliki satu UserProfile
      User.belongsTo(models.Profile, { foreignKey: 'ProfileId' });

      // One-to-Many: User memiliki banyak Enrollment
      User.hasMany(models.Enrollment, { foreignKey: 'UserId' });

      // Many-to-Many: User (Student) bisa memiliki banyak Course melalui tabel Enrollment
      User.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: 'UserId'
      });

      // One-to-Many: User (student) bisa melakukan banyak transaction
      User.hasMany(models.Transaction, { foreignKey: 'UserId' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email wajib diisi." },
        notEmpty: { msg: "Email tidak boleh kosong." },
        isEmail: { msg: "Format email tidak valid (harus menggunakan @)." }
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Username wajib diisi." },
        notEmpty: { msg: "Username tidak boleh kosong." },
        len: {
          args: [5, 20],
          msg: "Username harus terdiri dari 5 hingga 20 karakter."
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Kata sandi wajib diisi." },
        notEmpty: { msg: "Kata sandi tidak boleh kosong." }
      }
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'student'
    },
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (instance, options) => {
        // Hash password sebelum user baru dibuat (Register), ada salt itu buat ngamanin hashnya
        const salt = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
      },
      beforeUpdate: async (user, options) => {
        // Hash password hanya JIKA passwordnya diedit (misal: fitur ganti password)
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  return User;
};