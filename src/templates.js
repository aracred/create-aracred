/*
 * these template funcions take some input that was saved in the config store, and returns some
 * stringified data ready for writing.
 * TODO: create a function for each template file that needs editing
 */

var addressbook = require('../templates/config/addressbook.json')

module.exports = {
  addressbook: async addresses => {
    const dao = []
    dao[0] = addresses
    dao[0].mints = []
    dao[0].burns = []
    return JSON.stringify(dao)
  },
}
