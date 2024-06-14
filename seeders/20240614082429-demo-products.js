module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        kode_produk: 'PROD001',
        label_sertifikasi: 'Label 1',
        kemasan: 'Kemasan 1',
        diskon: 10.00
      },
      {
        kode_produk: 'PROD002',
        label_sertifikasi: 'Label 2',
        kemasan: 'Kemasan 2',
        diskon: 20.00
      },
      {
        kode_produk: 'PROD003',
        label_sertifikasi: 'Label 3',
        kemasan: 'Kemasan 3',
        diskon: 30.00
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};