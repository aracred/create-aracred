const inquirer = require('inquirer')
const { validateAddress } = require('../web3-utils')

module.exports = async function getDaoParams(configStore) {
  // Ask for the DAO Address
  const { channelName } = await inquirer.prompt({
    name: 'channelName',
    type: 'input',
    message: `What's your Discord Server name? Write it as one word (for example: AraCred):`,
    validate: function (channelName) {
      if (!channelName) {
        return `The Discord Server name should not be empty.`
      }
      return true
    },
  })

  const { channelId } = await inquirer.prompt({
    name: 'channelId',
    type: 'input',
    message: `What's your Discord Server ID? `,
    validate: function (channelId) {
      if (!channelId) {
        return `The Discord Server name should not be empty.`
      }
      return true
    },
  })

  const { canProceed } = await inquirer.prompt({
    name: 'canProceed',
    type: 'list',
    message: `Are these settings right?\nServer Name: ${channelName}\nServer ID: ${channelId}`,
    choices: ['Yes', 'No'],
  })

  if (canProceed === 'No') {
    getDaoParams(configStore)
    return
  }

  configStore.set('CHANNEL_NAME', channelName.split(' ').join(''))
  configStore.set('CHANNEL_ID', channelId.split(' ').join(''))
}
