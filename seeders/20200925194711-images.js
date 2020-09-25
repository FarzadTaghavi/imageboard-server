"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "images",
      [
        {
          title: "cat1",
          url: "cat-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "cat2",
          url: "cat-image2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "cat3",
          url: "cat-image3.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "cat4",
          url: "cat-image4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("images", null, {});
  },
};
