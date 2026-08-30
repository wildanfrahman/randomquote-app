"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "quotes",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        quote: {
          type: Sequelize.STRING,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quotes");
  },
};
