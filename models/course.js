'use strict';
const {
  Model
} = require('sequelize');
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
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};