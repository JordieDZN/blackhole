module.exports = (guildid, sql) => {
  sql.query(`INSERT INTO guilds (guildId, defaultRole, defaultChannel, welcomeChannel, modLoggingChannel, levelsEnabled, warnings, kicks, bans, purges, mutes, sponsored, actionLog, language, prefix) VALUES ('${guildid}', 'disable', '', 'disable', 'disable', 1, 'multiple', 1, 1, 1, 1, 0, 'disable', 'en', 'b!')`, function(err, results, fields) {
    if(err) {
      throw err;
      return;
    }
  });
}
