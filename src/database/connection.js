const Sequelize = require('sequelize')

const database = 'testapi';
const username = 'root';
const password = '123456';
const host = 'localhost';
const dialect = 'mysql';

const connection = new Sequelize(database, username, password, {
    host,
    dialect
})

module.exports = connection

