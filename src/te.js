const {
  addressbookTemplate,
  daoTemplate,
  projectTemplate,
  weightsTemplate,
  writeTemplate,
  mkdirs } = require('./templates')

var Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const userName = require('os').userInfo().username;
const path = `/home/${userName}/aracred/`

const addressbook = addressbookTemplate(config.get('identities'))
const dao = daoTemplate(config.get('identities'))
const project = projectTemplate(config.get('discordId'), config.get('identities'), config.get('repos'))
const weights = weightsTemplate()

// --------------------------------
mkdirs()
writeTemplate(`${path}config/addressbook.json`, addressbook)
writeTemplate(`${path}config/dao.json`, dao)
writeTemplate(`${path}config/project.json`, project)
writeTemplate(`${path}config/weights.json`, weights)



