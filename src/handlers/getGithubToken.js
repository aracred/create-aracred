const inquirer = require('inquirer')

module.exports = async function getGithubToken(configStore) {
  return inquirer.prompt({
    name: 'getGithubToken',
    type: 'input',
    message:
      'Want the Aracred CLI to deploy these templates to Github for you? Add an oauth token with full repo access, or press enter to skip: ',
    validate: function (token) {
      if (token.length) {
        configStore.set('GITHUB_ACCESS_TOKEN', token)
      }
      return true
    },
  })
}
