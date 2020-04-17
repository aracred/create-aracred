const chalk = require('chalk')
const Configstore = require('configstore')
const {
  configureAracred,
  getBotTemplate,
  getDaoParams,
  getDiscordParams,
  getRepoTemplate,
} = require('./handlers/handlers')
const { useFiglet } = require('./utils')

// Init the config store and clear it
const configStore = new Configstore('create-aracred')
configStore.clear()

async function main() {
  useFiglet('Aracred')
  await getDaoParams(configStore)
  await getDiscordParams(configStore)
  await getRepoTemplate()
  await getBotTemplate()

  const {
    TOKEN_MANAGER_ADDRESS: daoAddress,
    DAO_ADDRESS: tokenManagerAddress,
    VOTING_ADDRESS: votingAddress,
    DAO_NETWORK: environment,
    CHANNEL_NAME: channelName,
    CHANNEL_ID: channelId,
  } = configStore.all

  configureAracred({
    daoAddress,
    tokenManagerAddress,
    votingAddress,
    environment,
    channelName,
    channelId,
  })

  console.log(chalk.blue('All done!'))
}

main()
  .then(() => console.log(configStore.all))
  .catch((err) => console.log(err))
