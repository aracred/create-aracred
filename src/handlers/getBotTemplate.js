const Clui = require('clui')
const { useFetchRepo } = require('../utils')

const ARACRED_BOT_URL = 'https://github.com/aracred/bot.git'

const Spinner = Clui.Spinner

module.exports = function getBotTemplate() {
  const status = new Spinner('Fetching Bot template from Github...')
  status.start()

  return new Promise((resolve, reject) => {
    const repoStream = useFetchRepo(ARACRED_BOT_URL)
    repoStream.on('exit', (code) => {
      status.stop()
      if (!code) {
        resolve('Fetched Aracred bot successfully!')
      }
      reject(
        'Could not fetch Aracred bot template. You may not have git installed or there may be problems with your connection.',
      )
    })
  })
}
