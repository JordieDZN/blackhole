const settings = require("../settings.json");
exports.run = (client, message, args, sql, Discord, randomXpGain, language, prefix, crossBox) => {
  if (!args[1]) {

    message.channel.send(`:information_source: | **${message.author.username}**, for a full list of commands, visit <http://blackholebot.com/commands>.`);

  } else {
    let command = args[1].replace(prefix, '');
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      let cmdaliases = "";
      command.conf.aliases.forEach(alias => {
        cmdaliases += alias + ", ";
      });
      cmdaliases = cmdaliases.slice(0, -2);
      if(command.conf.aliases.length == 0) message.channel.send(`:information_source: | **${message.author.username}**, the command **${command.help.name}** has the description **${command.help.description}** It has **no** aliases. To use it type **${prefix}${command.help.usage}**`);
      else if(command.conf.aliases.length == 1) message.channel.send(`:information_source: | **${message.author.username}**, the command **${command.help.name}** has the description **${command.help.description}** It has the alias **${cmdaliases}**. To use it type **${prefix}${command.help.usage}**`);
      else message.channel.send(`:information_source: | **${message.author.username}**, the command **${command.help.name}** has the description **${command.help.description}** It has the aliases **${cmdaliases}**. To use it type **${prefix}${command.help.usage}**`);
    } else {

      message.channel.send(`${crossBox} | **${message.author.username}**, command not found.`);
      return;

    }

  }

}

exports.conf = {
  sponsorOnly: false,
  permissionLevel: 0,
  enabled: true,
  aliases: ["commands"],
  guildOnly: [],
  showInHelp: true
}

exports.help = {
  name: 'help',
  description: 'View all of the commands.',
  usage: 'help [command]'
}
