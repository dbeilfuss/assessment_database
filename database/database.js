require("dotenv").config({ path: "../.env" });

const { SUPABASE_URI } = process.env;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(SUPABASE_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
console.log(SUPABASE_URI);

module.exports = {
  sequelize,
};
