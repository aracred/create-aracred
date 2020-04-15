var chalk = require('chalk')

module.exports = {
  sourcePrompt: [
    {
      type: 'checkbox',
      name: 'source',
      message: 'Placeholder GitHub',
      choices: ['github', 'discord', 'discourse'],
    },
  ],
  daoPrompt: [
    {
      name: 'dao',
      type: 'input',
      message: 'Enter your ' + chalk.white.bold('DAO') + ' address:',
    },
    {
      name: 'voting',
      type: 'input',
      message: 'Enter your ' + chalk.white.bold('Voting') + ' address:',
    },
    {
      name: 'tokenManager',
      type: 'input',
      message: 'Enter your ' + chalk.white.bold('Token Manager') + ' address:',
    },
    {
      name: 'network',
      type: 'checkbox',
      message: 'Which network is the DAO on:',
      choices: ['mainnet', 'rinkeby'],
    },
  ],
  discordPrompt: {
    type: 'input',
    name: 'guildId',
    message: 'what is your discord Guild ID?',
  },
  discoursePrompt: {
    type: 'input',
    name: 'discourseUrl',
    message: "What's your Discourse URL",
  },
  usernamePrompt: {
    type: 'input',
    name: 'username',
    message: 'UserName',
  },
  githubAliasPrompt: {
    type: 'input',
    name: 'github',
    message: 'github username',
  },
  discordAliasPrompt: {
    type: 'input',
    name: 'discord',
    message: 'discord id',
  },
  discourseAliasPrompt: {
    type: 'input',
    name: 'discourse',
    message: 'discourse username',
  },

  addressPrompt: {
    type: 'input',
    name: 'address',
    message: 'public key',
  },
}
