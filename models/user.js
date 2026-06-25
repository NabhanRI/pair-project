'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};