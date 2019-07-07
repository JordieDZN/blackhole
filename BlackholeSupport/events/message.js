const settings = require("../settings.json");
let prefix = `b!!`;
let languageFile = require('../languages/es.json');

module.exports = (Discord, message, sql) => {

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let client = message.client;
  let crossBox = client.guilds.get("361313224001585155").emojis.get("428798155035770881");

  /*sql.query(`SELECT * FROM globalusers where userId = '${message.author.id}'`, function(err, results, fields) {

    if(results.length == 0) {

      let permlevel = 0;
      let bhUser = client.guilds.get("361313224001585155").members.get(message.author.id);

      if(bhUser) {

        console.log(bhUser.highestRole.id)

        if(bhUser.highestRole.id == "458806099995262986") {

          permlevel = 4;

        }

        if(bhUser.highestRole.id == "417447034551795723") {

          permlevel = 3;

        }

        if(bhUser.highestRole.id == "417446120990703618") {

          permlevel = 2;

        }

        if(bhUser.highestRole.id == "383362758252429312" || bhUser.highestRole.id == "417436911800418306") {

          permLevel = 1;

        }

      }

    }

  });*/

  const argsTemp = message.content.split(' ');

  if(message.mentions.members.first() && argsTemp[0] == message.mentions.members.first() && message.mentions.members.first().id == client.user.id && message.channel.id != "425076843419533323") {

    message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.messageEventSupportInfo.replace('{a}', message.guild.channels.get("425076843419533323"))}`);

  }

  if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {

    const command = message.content.split(' ')[0].slice(prefix.length);
    const args = message.content.substring(prefix.length).split(' ');
    let cmd;

    if(client.commands.has(command)) {

      cmd = client.commands.get(command);

    } else if (client.aliases.has(command)) {

      cmd = client.commands.get(client.aliases.get(command));

    }

    if(cmd) {

      if(message.channel.id == "425076843419533323" && command != "terminate") {

        message.channel.send(`${crossBox} | **${message.author.username}**, ${languageFile.cmdCannotBeUsedHere}`).then(msg => {

          msg.delete(15000);

        });

        message.delete(15000);

        return;

      }

      if(!cmd.conf.enabled) {

        message.channel.send(`${crossBox} | **${message.author.username}**, ${languageFile.cmdDisabled}`);
        return;

      }

      cmd.run(client, message, args, sql, Discord, languageFile, prefix, crossBox);
      return;

    }

  } else if(message.channel.id == "425076843419533323") {

    if(message.content.toLowerCase() == "0") {

      message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.option0}`).then(msg => {

        msg.delete(15000);

      });

    } else if(message.content.toLowerCase() == "1") {

      message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.option1}`).then(msg => {

        msg.delete(15000);

      });

    } else if(message.content.toLowerCase() == "2") {

      message.member.addRole('425074050994405376');

      message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.option2.replace('{a}', message.guild.channels.get("424875126375317505"))}`).then(msg => {

        msg.delete(15000);

      });

    } else if(message.content.toLowerCase() == "3") {

      message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.option3}`).then(msg => {

        msg.delete(15000);

      });

    } else if(message.content.toLowerCase() == "4") {

      message.member.addRole('425074082187444235');

      message.channel.send(`:information_source: | **${message.author.username}**, ${languageFile.option4.replace('{a}', message.guild.channels.get("424876354031583232"))}`).then(msg => {

        msg.delete(15000);

      });

    }

    message.delete(15000);

  }

}
