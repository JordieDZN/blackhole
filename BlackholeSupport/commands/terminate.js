exports.run = (client, message, args, sql, Discord, languageFile, prefix, crossBox) => {

  var role;

  //reporting bugs
  if(message.channel.id == "424875126375317505") {

    role = message.guild.roles.get("425074050994405376");

  }

  //seeking further assistance
  if(message.channel.id == "424876354031583232") {

    role = message.guild.roles.get("425074082187444235");

  }

  if(role == null) {

    message.channel.send(`${crossBox} | **${message.author.username}**, ${languageFile.cmdCannotBeUsedHere}`);
    return;

  }

  if(args.length != 2) {

    message.channel.send(`${crossBox} | **${message.author.username}**, ${languageFile.cmdIncorrectUsage}`).then(msg => {

      msg.delete(15000);
      message.delete(15000);

    });

    return;

  }

  if(args[1] == message.mentions.members.first()) {

    message.mentions.members.first().removeRole(role);

    message.channel.send(`:white_check_mark: | **${message.author.username}**, ${languageFile.terminateCmdYouHaveTerminated.replace('{a}', message.mentions.members.first().user.username).replace('{b}', role.name)}`).then(msg => {

      msg.delete(15000);
      message.delete(15000);

    });

  }

}

exports.help = {
  name: 'terminate',
  description: `End someone's session in reporting a bug or seeking further assistance.`,
  usage: 'terminate <mention>'
}

exports.conf = {
  enabled: true,
  showInHelp: true,
  aliases: [],
  permissionLevel: 3
}
