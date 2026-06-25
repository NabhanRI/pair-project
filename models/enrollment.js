'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {

    static associate(models) {
      // Menghubungkan Junction Table ke User
      Enrollment.belongsTo(models.User, { foreignKey: 'UserId' });

      // Menghubungkan Junction Table ke Course
      Enrollment.belongsTo(models.Course, { foreignKey: 'CourseId' });
    }
  }
  Enrollment.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};