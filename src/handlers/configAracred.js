const Clui = require('clui')
const { readFile, writeFile } = require('fs')

const Spinner = Clui.Spinner

const DAO_CONFIG_PATH = './aracred-template/config/dao.json'
const PROJECT_CONFIG_PATH = './aracred-template/config/project.json'

const noop = () => undefined

module.exports = function getBotTemplate({
  daoAddress,
  tokenManagerAddress,
  votingAddress,
  environment,
  channelName,
  channelId,
}) {
  const status = new Spinner('Configuring fetched Aracred instance 🛠 ')
  status.start()

  readFile(DAO_CONFIG_PATH, 'utf8', (err, data) => {
    if (err) {
      status.stop()
      console.log('Something went wrong', err)
    }
    const parsedDaoFile = JSON.parse(data)
    parsedDaoFile[0].daoAddress = daoAddress
    parsedDaoFile[0].tokenManagerAddress = tokenManagerAddress
    parsedDaoFile[0].votingAddress = votingAddress
    parsedDaoFile[0].environment = environment
    writeFile(DAO_CONFIG_PATH, JSON.stringify(parsedDaoFile, null, 2), noop)
  })

  readFile(PROJECT_CONFIG_PATH, 'utf8', (err, data) => {
    if (err) {
      status.stop()
      console.log('Something went wrong:', err)
    }
    const parsedProjectFile = JSON.parse(data)
    parsedProjectFile[1].id = `@${channelName}`
    parsedProjectFile[1].discord.guildId = channelId
    writeFile(
      PROJECT_CONFIG_PATH,
      JSON.stringify(parsedProjectFile, null, 2),
      noop,
    )
  })
  status.stop()
}
