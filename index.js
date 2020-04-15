const chalk = require('chalk')
const clear = require('clear')
const Configstore = require('configstore')
const packageJson = require('./package.json')
const inquirer = require('inquirer')
const { getStore, runTasks } = require('./src/templates')

// Create a Configstore instance
const config = new Configstore(packageJson.name)
const repos = []
const identities = []

// ------------------------------- Prompts ----------------------------- //
// ////////////////////////////////////////////////////////////////////////

const reposPrompt = [
  {
    type: 'input',
    name: 'repo',
    message: 'name of the repo?',
  },
  {
    type: 'confirm',
    name: 'more',
    message: 'add another repo?',
    choices: ['yes', 'no'],
  },
]
const sourcePrompt = [
  {
    type: 'checkbox',
    name: 'source',
    message:
      chalk.blackBright('Run') +
      chalk.whiteBright(' AraCred ') +
      chalk.blackBright('against?'),
    choices: ['github', 'discord', 'discourse'],
  },
]

const daoPrompt = [
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
    type: 'list',
    message: 'Which network is the DAO on:',
    choices: ['mainnet', 'rinkeby'],
  },
]

const discordPrompt = {
  type: 'input',
  name: 'guildId',
  message: 'what is your discord Guild ID?',
}

const discoursePrompt = {
  type: 'input',
  name: 'discourseUrl',
  message: "What's your Discourse URL",
}

const usernamePrompt = {
  type: 'input',
  name: 'username',
  message: 'UserName',
}

const githubAliasPrompt = {
  type: 'input',
  name: 'github',
  message: 'github username',
}

const discordAliasPrompt = {
  type: 'input',
  name: 'discord',
  message: 'discord id',
}

const discourseAliasPrompt = {
  type: 'input',
  name: 'discourse',
  message: 'discourse username',
}

const addressPrompt = {
  type: 'input',
  name: 'address',
  message: 'public key',
}

const moreUsersPrompt = {
  type: 'confirm',
  name: 'more',
  message: 'add another user?',
  choices: ['yes', 'no'],
}

// --------------------------------------------------------------------- //

// ------------------------------ Logic Flow --------------------------- //
// ////////////////////////////////////////////////////////////////////////

function main() {
  config.clear()
  sources()
}

function sources() {
  inquirer.prompt(sourcePrompt).then(answers => {
    config.set(
      'source.github',
      answers.source.includes('github') ? true : false,
    )
    config.set(
      'source.discord',
      answers.source.includes('discord') ? true : false,
    )
    config.set(
      'source.discourse',
      answers.source.includes('discourse') ? true : false,
    )

    if (config.get('source.github') === true) {
      clear()
      github()
    } else if (config.get('source.discord') === true) {
      clear()
      discord()
    } else if (config.get('source.discourse') === true) {
      clear()
      discourse()
    } else {
      console.log('must choose at least one source')
    }
  })
}

function github() {
  inquirer.prompt(reposPrompt).then(answers => {
    repos.push(answers.repo)
    if (answers.more === false) {
      config.set('repos', repos)
      clear()
      next()
    } else {
      clear()
      github()
    }
  })
}

function makeUserPrompt() {
  const prompt = []
  prompt.push(usernamePrompt)
  if (config.get('source.github') === true) {
    prompt.push(githubAliasPrompt)
  }
  if (config.get('source.discord') === true) {
    prompt.push(discordAliasPrompt)
  }
  if (config.get('source.discourse') === true) {
    prompt.push(discourseAliasPrompt)
  }
  prompt.push(addressPrompt)
  prompt.push(moreUsersPrompt)
  return prompt
}

const next = () => {
  if (config.get('source.discord') === true) {
    discord()
  } else if (config.get('source.discourse') === true) {
    discourse()
  } else {
    dao()
  }
}

function discord() {
  inquirer.prompt(discordPrompt).then(answer => {
    config.set('guildId', answer.guildId)
    clear()
    next()
  })

  const next = () => {
    if (config.get('source.discourse') === true) {
      discourse()
    } else {
      dao()
    }
  }
}

function discourse() {
  inquirer.prompt(discoursePrompt).then(answer => {
    config.set('discourseUrl', answer.discourseUrl)
    clear()
    dao()
  })
}

function dao() {
  inquirer.prompt(daoPrompt).then(answers => {
    const dao = {
      daoAddress: answers.dao,
      tokenManager: answers.tokenManager,
      votingAddress: answers.voting,
      environment: answers.network[0],
    }
    config.set('dao', dao)

    //console.log(config.all)
    clear()
    orgName()
  })
}

function orgName() {
  inquirer
    .prompt({
      type: 'input',
      name: 'org',
      message: 'name of' + chalk.green('AraCred Repo'),
    })
    .then(answer => {
      config.set('organisation', answer.org)
      clear()
      confirm()
    })
}

function confirm() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'users',
      message: 'Add users?',
    })
    .then(answer => {
      answer.users === true ? addUsers() : console.log('done!')
    })
}
function addUsers() {
  clear()
  const prompt = makeUserPrompt()
  inquirer.prompt(prompt).then(answers => {
    const user = {}
    const aliases = []
    if (config.get('source.github') === true) {
      aliases.push('github/' + answers.github)
    }
    if (config.get('source.discord') === true) {
      aliases.push('discord/' + answers.discord)
    }
    if (config.get('source.discourse') === true) {
      aliases.push('discourse/' + answers.discourse)
    }

    user.username = answers.username
    user.address = answers.address
    user.aliases = aliases
    identities.push(user)
    if (answers.more === false) {
      config.set('identities', identities)
      confirmSettings()
    } else {
      config.set('identities', identities)
      addUsers()
    }
  })
}

function confirmSettings() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'settings',
      message: getStore(),
    })
    .then(answer => {
      answer.settings === true ? runTasks() : console.log('Rerun create-aracred')
    })
}


// ---------------------------------------------------------------------- //

main()
