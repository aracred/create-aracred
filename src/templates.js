/*
 * these template funcions take some input that was saved in the config store, and returns some
 * stringified data ready for writing.
 * TODO: create a function for each template file that needs editing
 */

var addressbook = require('../templates/config/addressbook.json')

module.exports = {
  dao: addresses => {
    const dao = []
    dao[0] = addresses
    dao[0].mints = []
    dao[0].burns = []
    return JSON.stringify(dao, null, 2)
  },
  addressbook: users => {
    book = []
    users.map(user => {
      member = {}
      member.name = user.username
      member.createdAt = 1585730646045
      member.address = user.address
      book.push(member)
    })
    return JSON.stringify(book, null, 2)
  },
}
