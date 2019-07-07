//init settings

const settings = require('../settings.json');

module.exports = (client) => {

  require("../util/update.js")(client);

  console.log(`${settings.botName} [${settings.version}] has successfully started.`)

}
