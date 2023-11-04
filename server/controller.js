const { sequelize } = require("../database/database");
const { seedData } = require("../database/seed");

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(seedData)
      .then(() => {
        //   So, imagine my disappointment, after creating a detailed database structure for the pet adoption agency, to discover that we aren't even doing a pet adoption agency in this assignment!  Not.. happy.. :-D
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

  getCities: (req, res) => {
    sequelize
      .query(
        `SELECT ci.city_name, co.name, ci.rating, ci.city_id
      FROM cities ci
      JOIN countries co on ci.country_id = co.country_id`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(`error getting cities, `, err));
  },

  deleteCity: (req, res) => {
    const { id } = req.params;
    console.log("cityId: " + id);
    sequelize
      .query(
        `DELETE
        FROM cities
        WHERE city_id = '${id}'`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(`error deleting city, `, err));
  },
};
