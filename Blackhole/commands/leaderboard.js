exports.run = (client, message, args, sql, Discord, randomXpGain, language, prefix, crossBox) => {

  let leaderboardText = "";

  sql.query(`SELECT * FROM guilds WHERE guildId='${message.guild.id}'`, function(err, results, fields) {

    if(results[0].levelsEnabled == 0) {

      message.channel.send(`${crossBox} | **${message.author.username}**, this server does not have levels enabled.`);
      return;

    }

    sql.query(`SELECT * FROM rankedusers WHERE guildId = '${message.guild.id}' ORDER BY level DESC, xp DESC`, function(err, results1, fields) {

      let resultsLength = 10;

      if(results1.length < 10) {

        resultsLength = results1.length;

      }

      let page = 1;
      let totalPages = Math.ceil(results1.length / 10);

      if(args.length > 2) {

        message.channel.send(`${crossBox} | **${message.author.username}**, incorrect usage.`);
        return;

      }

      if(args.length == 2) {

        if(!isInt(args[1])) {

          message.channel.send(`${crossBox} | **${message.author.username}**, argument must be a page number.`);
          return;

        }

        page = parseInt(args[1]);

        if(page > totalPages) {

          message.channel.send(`${crossBox} | **${message.author.username}**, this page number is out of index.`);
          return;

        }

      }

      let start = ((page - 1) * 10);
      let finish = start + 10;

      if(finish > results1.length) {
        resultsLength = (results1.length - ((page - 1) * 10));
        finish = results1.length;
      }

      for(i = start; i < finish; i++) {

        leaderboardText += `\n\n${lbEmoji(i + 1)} **${results1[i].userTag} - Level:** ${results1[i].level}`;

      }

      let embed = new Discord.RichEmbed();
      embed.setDescription(leaderboardText);
      embed.setColor(0x5cd400);
      embed.setFooter(`Showing ${resultsLength} of ${results1.length} results on page ${page}.`);
      message.channel.send({embed});

    });

  });

}

exports.conf = {
  enabled: true,
  guildOnly: [],
  showInHelp: true,
  aliases: ["lb", "levels"]
}

exports.help = {
  name: 'leaderboard',
  description: 'View the leaderboard, ranking the members of this server based on their level.',
  usage: 'leaderboard [page]'
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function lbEmoji(value) {
  if(value == 1) return ":crown:";
  if(value == 2) return ":trophy:";
  if(value == 3) return ":medal:";
  if(value == 4) return ":four:";
  if(value == 5) return ":five:";
  if(value == 6) return ":six:";
  if(value == 7) return ":seven:";
  if(value == 8) return ":eight:";
  if(value == 9) return ":nine:";
  if(value == 10) return ":keycap_ten:";
  return ":arrow_forward:";
}
