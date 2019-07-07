//standard setup for a discord bot
//init all of the packages, files, client, etc.

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const settings = require('./settings.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('./util/eventHandler.js')(client);

//add all commands to the comnmands collection

fs.readdir('./commands', (err, files) => {

  if(err) console.error(err);

  var checker = files.length == 1;

  if(checker) console.log(`Loading a total of 1 command.`);
  else console.log(`Loading a total of ${files.length} commands.`);

  files.forEach(f => {

    const command = require(`./commands/${f}`);

    console.log(`Loading command, ${command.help.name}.`);
    client.commands.set(command.help.name, command);

    command.conf.aliases.forEach(alias => {

      client.aliases.set(alias, command.help.name);

    });

  });

});

//start the bot using the token from the settings file

client.login(settings.token);
