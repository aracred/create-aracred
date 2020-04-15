const { addressbook, dao, project } = require('./templates')
var Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)

// console.log(addressbook(config.get('identities')))

console.log(
  project(config.get('guildId'), config.get('identities'), config.get('repos')),
)
