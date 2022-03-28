const Sequelize = require('sequelize');

const connection = new Sequelize("apigames", "root", "020896130597",{
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;