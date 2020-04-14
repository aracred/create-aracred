const { addressbook, dao } = require('./templates')
var Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)

const input = {
  daoAddress: 'asgfwersvdc',
  tokenManager: 'cwersfdc',
  votingAddress: 'sefdvcwesrdfx',
  environment: 'mainnet',
}
console.log(addressbook(config.get('identities')))
