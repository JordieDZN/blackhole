const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const settings = require('./settings.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('./util/eventHandler.js')(client);

fs.readdir('./commands', (err, files) => {

  if(err) console.error(err);

  console.log(`Loading a total of ${files.length} commands.`);

  files.forEach(f => {

    const command = require(`./commands/${f}`);

    client.commands.set(command.help.name, command);
    command.conf.aliases.forEach(alias => {

      client.aliases.set(alias, command.help.name);

    });

  });

});

client.login(settings.token);
