//define settings file
const settings = require('../settings.json');

//default settings, will usually change from database
//fallback for any errors when searching the database
let prefix = `b!`;
let language = require('../languages/en.json');

module.exports = (Discord, message, sql) => {

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let client = message.client;
  let crossBox = client.guilds.get("361313224001585155").emojis.get("428798155035770881");
  let randomXpGain = Math.floor(Math.random() * 10) + 15;

  sql.query(`SELECT * FROM globalusers where userId = '${message.author.id}'`, function(err, results, fields) {

    if(results.length == 0) {

      let permlevel = 0;
      let bhUser = client.guilds.get("361313224001585155").members.get(message.author.id);

      if(bhUser) {

        //developer
        if(bhUser.highestRole.id == "458806099995262986") {

          permlevel = 4;

        }

        //support team
        if(bhUser.highestRole.id == "417447034551795723") {

          permlevel = 3;

        }

        //super donator
        if(bhUser.highestRole.id == "417446120990703618") {

          permlevel = 2;

        }

        //donator/translator
        if(bhUser.highestRole.id == "383362758252429312" || bhUser.highestRole.id == "417436911800418306") {

          permlevel = 1;

        }

      }

      sql.query(`INSERT INTO globalusers (userId, permissionLevel) VALUES ('${message.author.id}', ${permlevel})`, function(err, results, fields) {

        if(err) {

          throw err;
          return;

        }

      });

    }

  });

  sql.query(`SELECT * FROM guilds WHERE guildId = '${message.guild.id}'`, function(err, results, fields) {

    if(results.length == 0) {

      require("../util/newguild.js")(message.guild.id, sql);
      return;

    }

		if(results[0].levelsEnabled == 1) {

			sql.query(`SELECT * FROM rankedusers WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, function(err, results1, fields) {

				if (results1.length == 0) {

					sql.query(`INSERT INTO rankedusers (guildId, userId, xp, level, lastxp, userTag) VALUES ('${message.guild.id}', '${message.author.id}', ${randomXpGain}, 0, ${Date.now()}, '${message.author.username}')`, function(err, results, fields) {

            if(err) {

              throw err;
              return;

            }

          });

				} else {

          var lastXp = results1[0].lastxp;
					var xp = results1[0].xp;
					var level = results1[0].level;
          let formula = 5 * (level**2) + 50 * level + 100;

					sql.query(`UPDATE rankedusers SET userTag = '${message.author.username}' WHERE userId = '${message.author.id}'`, function(err, results, fields) {

            if(err) {
              throw err;
              return;
            }

          });

					if (Date.now() - lastXp >= 60000) {

            xp = xp + randomXpGain;
						lastXp = Date.now();

						sql.query(`UPDATE rankedusers SET xp = '${xp}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, function(err, results, fields) {

              if(err) {
                throw err;
                return;
              }

            });

						sql.query(`UPDATE rankedusers SET lastxp = '${lastXp}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, function(err, results, fields) {

              if(err) {
                throw err;
                return;
              }

            });

						if (xp >= formula) {

							level = level + 1;
              xp = xp - formula;

							sql.query(`UPDATE rankedusers SET xp = ${xp}, level = ${level} WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, function(err, results, fields) {

                if(err) {

                  throw err;
                  return;

                }

              });

							message.channel.send(`:tada: | **${message.author.username}** has leveled up to **level ${level}**.`);

						}

					}

				}

			});

		}

  });

  const argsTemp = message.content.split(' ');
  if(message.mentions.members.first() && argsTemp[0] == message.mentions.members.first() && message.mentions.members.first().id == client.user.id) {

    message.channel.send(`:information_source: | **${message.author.username}**, my prefix on this server is \`${prefix}\``)

  }

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const command = message.content.split(' ')[0].slice(prefix.length);
  const args = message.content.substring(prefix.length).split(' ');
  let cmd;

  if(client.commands.has(command)) {

    cmd = client.commands.get(command);

  } else if (client.aliases.has(command)) {

    cmd = client.commands.get(client.aliases.get(command));

  }

  if(cmd) {

    if(!cmd.conf.enabled) {

      message.channel.send(`${crossBox} | **${message.author.username}**, this command has been internally disabled.`);
      return;

    }

    if(cmd.conf.guildOnly.length == 0) {

      cmd.run(client, message, args, sql, Discord, randomXpGain, language, prefix, crossBox);

    } else {

      for(i = 0; i < cmd.conf.guildOnly.length; i++) {

        if(cmd.conf.guildOnly[i] == message.guild.id) {

          cmd.run(client, message, args, sql, Discord, randomXpGain, language, prefix, crossBox);
          return;

        }

      }

      message.channel.send(`${crossBox} | **${message.author.username}**, this command is restricted to certain guilds.`);

    }

  }

}
