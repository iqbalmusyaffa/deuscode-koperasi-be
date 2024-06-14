export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kode_produk: {
        type: Sequelize.STRING,
      },
      label_sertifikasi: {
        type: Sequelize.STRING,
      },
      kemasan: {
        type: Sequelize.STRING,
      },
      diskon: {
        type: Sequelize.DECIMAL(4, 2),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};
