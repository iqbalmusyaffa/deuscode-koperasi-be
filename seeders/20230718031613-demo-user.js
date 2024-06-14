const bcrypt = require("bcrypt");
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash("password", 10);

      await queryInterface.bulkInsert("Users", [
        {
          name: "Admin",
          email: "admin@mail.com",
          username: "admin_user", // Example username
          role: "admin", // Example role
          isActive: true, // Example isActive status
          activationToken: null, // Example activationToken (null for now)
          status: "active", // Example status
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      console.log("Admin user seeded successfully.");

    } catch (error) {
      console.error("Failed to seed admin user:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("Users", null, {});

      console.log("Users table truncated successfully.");

    } catch (error) {
      console.error("Failed to truncate Users table:", error);
      throw error;
    }
  },
};
