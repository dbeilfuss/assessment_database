const { sequelize } = require("../database/database");
const { seedData } = require("../database/seed");

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(seedData)
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log(`error seeding DB ${seedData}`, err));
  },

  getCountries: (req, res) => {
    sequelize
      .query(`SELECT * FROM countries`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(`error getting Countries, `, err));
  },
};
