'use strict';
const {
  Model
} = require('sequelize');

const { formatRupiah } = require('../helpers/formatRupiah');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // One-to-Many: Course memiliki banyak Enrollment
      Course.hasMany(models.Enrollment, { foreignKey: 'CourseId' });

      // Many-to-Many: Course bisa memiliki banyak User (Student) melalui tabel Enrollment
      Course.belongsToMany(models.User, {
        through: models.Enrollment,
        foreignKey: 'CourseId'
      });

      // One-to-Many: Course dibeli banyak melalui transaction
      Course.hasMany(models.Transaction, { foreignKey: 'CourseId' });
    }

    get formatRupiah() {
      return formatRupiah(this.price)
    }

    static getCourseDetail(courseId, UserModel) {
      return Course.findByPk(courseId, {
        include: {
          model: UserModel
        }
      });
    }
    
  }

  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title wajib diisi." },
        notEmpty: { msg: "Title tidak boleh kosong." },
        len: {
          args: [10, 100],
          msg: "Title minimal harus 10 karakter."
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Deskripsi wajib diisi." },
        notEmpty: { msg: "Deskripsi tidak boleh kosong." },
        len: {
          args: [10, 100],
          msg: "Deskripsi minimal harus 10 karakter."
        }
      }
    },

    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price wajib diisi." },
        notEmpty: { msg: "Price tidak boleh kosong." },
        min: {
          args: 10000,
          msg: "Price minimal harus 10.000."
        }
      }
    },

    rating: { 
      type: DataTypes.FLOAT, 
      defaultValue: 4.8
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title wajib diisi." },
        notEmpty: { msg: "Title tidak boleh kosong." },

      }
    },

  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};