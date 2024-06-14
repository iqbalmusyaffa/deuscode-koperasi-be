const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  kode_produk: {
    type: DataTypes.STRING,
    allowNull: false
  },
  label_sertifikasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kemasan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diskon: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false
  }
});

module.exports = Product;
