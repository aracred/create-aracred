const Clui = require('clui')
const { useFetchRepo } = require('../utils')

const ARACRED_TEMPLATE_URL = 'https://github.com/aracred/aracred-template.git'

const Spinner = Clui.Spinner

module.exports = function getAracredTemplate() {
  const status = new Spinner('Fetching Aracred template from Github...')
  status.start()

  return new Promise((resolve, reject) => {
    const repoStream = useFetchRepo(ARACRED_TEMPLATE_URL)
    repoStream.on('exit', (code) => {
      status.stop()
      if (!code) {
        resolve('Fetched Aracred template successfully!')
      }
      reject(
        'Could not fetch Aracred template. You may not have git installed.',
      )
    })
  })
}
