const chalk = require('chalk')
const figlet = require('figlet')
const { spawn } = require('child_process')

// Wrapper function around spawn to only return an instance
// of the process that emmits events
function useFetchRepo(repoUrl) {
  return spawn('git', ['clone', repoUrl])
}
// Wrapper function around figlet to avoid writing callbacks.
// Mainly meant to make it fail silently.
function useFiglet(message) {
  console.log(
    chalk.blue(figlet.textSync(message, { horizontalLayout: 'full' })),
  )
}

module.exports = { useFetchRepo, useFiglet }
