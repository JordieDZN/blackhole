const settings = require("../settings.json");

exports.run = (client, message, args, sql, Discord, randomXpGain, language, prefix, crossBox) => {

  sql.query(`SELECT * FROM guilds WHERE guildId = '${message.guild.id}'`, function(err, results, fields) {

    if(results[0].levelsEnabled == 0) {

      message.channel.send(`${crossBox} | **${message.author.username}**, this server does not have levels enabled.`);
      return;

    }

    if(args.length > 2) {

      message.channel.send(`${crossBox} | **${message.author.username}**, incorrect usage.`);
      return;

    }

    let target = message.member;

    if(args.length == 2) {

      if(message.mentions.members.first()) {

        target = message.mentions.members.first();

      } else {

        target = message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args[1].toLowerCase()));

        if(!target) {

          message.channel.send(`${crossBox} | **${message.author.username}**, I could not find a member by this name.`);
          return;

        }

      }

    }

    let personal = false;

    if(target == message.member) personal = true;

    let ranked = false;
    let level = 0;
    let xp = 0;
    let totalXp = 0;
    let rank = 0;
    let leaderboardPosition = "";
    let reqXp = 100;

    sql.query(`SELECT * FROM rankedusers WHERE guildId='${message.guild.id}' AND userId='${target.id}'`, function(err, results1, fields) {

      if(err) {

        console.error(err);

      }

      if(results1) {

        ranked = true;
        level = results1[0].level;
        xp = results1[0].xp;
        reqXp = 5 * (level**2) + 50 * level + 100;

        if(personal) {

          if (Date.now() - results1[0].lastxp > 60000) xp = xp + randomXpGain;

          if(xp >= reqXp) {

            level += 1;
            xp =- reqXp;
            formula = 5 * (level**2) + 50 * level + 100;

          }

        }

        if(level == 0) {

          totalXp = xp;

        } else {

          for(i = 0; i < level; i++) {

            let newFormula = 5 * (i**2) + 50 * i + 100;
            totalXp += newFormula;

          }

          totalXp += xp;

        }

        sql.query(`SELECT * FROM rankedusers WHERE guildId = '${message.guild.id}' ORDER by level DESC, xp DESC`, function(err, results2, fields) {

          for(i = 0; i < results2.length; i++) {

            if(results2[i].userId == message.author.id) rank = i + 1;

          }

          leaderboardPosition = `${rank}/${results2.length}`;

          if(ranked == false) {

            let embed = new Discord.RichEmbed();
            embed.setColor(0x3b88c3);
            embed.addField(`Rank:`, `This user is not ranked yet.`, true);
            embed.addField(`Level:`, `0`, true);
            embed.addField(`XP:`, `0/${reqXp} (0 total)`, true);
            embed.setAuthor(target.user.username, target.user.displayAvatarURL);
            embed.setFooter(`Level information of ${target.user.username}#${target.user.discriminator}`);
            message.channel.send({embed});

          }

          if(ranked == true) {

            let embed = new Discord.RichEmbed();
            embed.setColor(0x3b88c3);
            embed.addField(`Rank:`, `${leaderboardPosition}`, true);
            embed.addField(`Level:`, `${level}`, true);
            embed.addField(`XP:`, `${xp}/${reqXp} (${totalXp} total)`, true);
            embed.setAuthor(target.user.username, target.user.displayAvatarURL);
            embed.setFooter(`Level information of ${target.user.username}#${target.user.discriminator}`);
            message.channel.send({embed});

          }

        });

      }

    });

  });

}

exports.conf = {
  enabled: true,
  guildOnly: [],
  showInHelp: true,
  aliases: ["level", "xp"],
  sponsorOnly: false,
  permissionLevel: 0
}

exports.help = {
  name: 'rank',
  description: 'Find out info about your, or someone else\'s level, leaderboard position and your xp.',
  usage: 'rank [mention]'
}
