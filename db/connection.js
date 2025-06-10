// D:/his-internacion/db/connection.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.MYSQLHOST && process.env.MYSQLUSER && process.env.MYSQLDATABASE) {

  console.log('Usando configuración de base de datos de producción (Railway)...');
  sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      dialect: 'mysql',

      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        acquire: 60000,
        idle: 10000
      }
    }
  );
} else {
  console.log('Usando configuración de base de datos local...');
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  );
}

module.exports = sequelize;
