const inquirer = require('inquirer')
const { validateAddress } = require('../web3-utils')

module.exports = async function getDaoParams(configStore) {
  // Ask for the DAO Address
  const { daoAddress } = await inquirer.prompt({
    name: 'daoAddress',
    type: 'input',
    message: `Address of the DAO to be used:`,
    validate: function (address) {
      if (!validateAddress(address)) {
        return `The address provided (${address}) is not a valid Ethereum Address.`
      }
      return true
    },
  })

  const { tokenManagerAddress } = await inquirer.prompt({
    name: 'tokenManagerAddress',
    type: 'input',
    message: `Address of the Token Manager app instance:`,
    validate: function (address) {
      if (!validateAddress(address)) {
        return `The address provided (${address}) is not a valid Ethereum Address.`
      }
      return true
    },
  })

  const { VotingAppAddress } = await inquirer.prompt({
    name: 'VotingAppAddress',
    type: 'input',
    message: `Address of the Voting app instance:`,
    validate: function (address) {
      if (!validateAddress(address)) {
        return `The address provided (${address}) is not a valid Ethereum Address.`
      }
      return true
    },
  })

  const { network } = await inquirer.prompt({
    name: 'network',
    type: 'list',
    message: `On which network is your address deployed on?`,
    choices: ['mainnet', 'rinkeby'],
  })

  const { canProceed } = await inquirer.prompt({
    name: 'canProceed',
    type: 'list',
    message: `Are these settings right?\nDao Address: ${daoAddress}\nToken Manager: ${tokenManagerAddress}\nVoting App: ${VotingAppAddress}\nNetwork: ${network}`,
    choices: ['Yes', 'No'],
  })

  if (canProceed === 'No') {
    getDaoParams(configStore)
    return
  }

  configStore.set('TOKEN_MANAGER_ADDRESS', tokenManagerAddress)
  configStore.set('DAO_ADDRESS', daoAddress)
  configStore.set('VOTING_ADDRESS', VotingAppAddress)
  configStore.set('DAO_NETWORK', network)
}
