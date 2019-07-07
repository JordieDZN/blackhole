module.exports = (client) => {

  var userCount = 0;
  client.guilds.forEach(guild => {
    guild.members.forEach(member => {
      if(!member.user.bot) userCount++;
    });
  });
  if(userCount == 1) client.user.setActivity("designed by jordie | " + userCount + " user.");
  else client.user.setActivity("designed by jordie | " + userCount + " users.");

}
