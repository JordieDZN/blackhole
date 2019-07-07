//init settings

const settings = require('../settings.json');

module.exports = (client) => {

  require("../functions/update.js")(client);

  console.log(`${settings.botName} [${settings.botVersion}] has successfully started.`)

}
