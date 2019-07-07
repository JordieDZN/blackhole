//init packages, sql connection and method for initalising events

const triggerEvent = (event) => require(`../events/${event}`);

const Discord = require('discord.js');
const mySql = require('mysql');
const settings = require('../settings.json');

const sql = mySql.createConnection({
  host: settings.sqlHost,
  user: settings.sqlUser,
  password: settings.sqlPassword,
  database: settings.sqlDatabase
});

sql.connect(function(err) {

  if(err) {
    console.error(err);
    return;
  }

  console.log("Database successfully connected.");

});

//trigger events

module.exports = client => {

  client.on('ready', () => triggerEvent('ready')(client));
  client.on('message', (message) => triggerEvent('message')(Discord, message, sql))

}
