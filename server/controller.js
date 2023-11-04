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
      .catch((err) => console.log(`error seeding DB`, err));
  },

  getCountries: (req, res) => {
    sequelize
      .query(`SELECT * FROM countries`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(`error getting Countries, `, err));
  },

  createCity: (req, res) => {
    const { countryId, name, rating } = req.body;
    console.log("countryId: " + countryId);
    sequelize
      .query(
        `INSERT INTO cities (country_id, name, rating) 
      VALUES
      (${countryId}, '${name}', ${rating});`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(`error creating city, `, err));
  },
};
