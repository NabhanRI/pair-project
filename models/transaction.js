'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-Many: Banyak Transaction bisa dilakukan oleh User(student)
      Transaction.belongsTo(models.User, { foreignKey: 'UserId' });

      // One-to-Many: Banyak Transaction mengarah ke satu Course (course yang dibeli)
      Transaction.belongsTo(models.Course, { foreignKey: 'CourseId' });
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
    invoiceNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};