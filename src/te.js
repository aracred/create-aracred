const { addressbookTemplate, daoTemplate, projectTemplate, writeTemplate, mkdirs } = require('./templates')

var Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const userName = require('os').userInfo().username;
const path = `/home/${userName}/aracred/`



// console.log(addressbook(config.get('identities')))

// console.log(project(config.get('guildId'), config.get('identities'), config.get('repos')),)
mkdirs()
writeTemplate(`${path}config/addressbook.json`, addressbookTemplate(config.get('identities')))


