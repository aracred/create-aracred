const fs = require('fs');
const userName = require('os').userInfo().username;

/*
 * these template funcions take some input that was saved in the config store, and returns some
 * stringified data ready for writing.
 * TODO: create a function for each template file that needs editing
 */
const daoTemplate = addresses => {
  const dao = []
  dao[0] = addresses
  dao[0].mints = []
  dao[0].burns = []
  return JSON.stringify(dao, null, 2)
}

const addressbookTemplate = users => {
  book = []
  users.map(user => {
    member = {}
    member.name = user.username
    member.createdAt = 1585730646045
    member.address = user.address
    book.push(member)
  })
  return JSON.stringify(book, null, 2)
}

const projectTemplate = (discord, identities, repos) => {
  const project = [
    {
      type: 'sourcecred/project',
      version: '0.4.0',
    },
    {
      id: '@AraCred',
      discord: {
        reactionWeights: {
          '👍': 1,
          '🔥': 1,
          '❤️': 1,
          '💯': 1,
          '🙏': 1,
        },
      },
    },
  ]
  const ids = identities.map(id => {
    const { username, aliases } = id
    return { username: username, aliases: aliases }
  })
  project[1].discord.guildId = discord
  project[1].repoIds = repos
  project[1].identities = ids
  return JSON.stringify(project, null, 2)
}

const weightsTemplate = () => {
  const weights = [
    {
      type: 'sourcecred/weights',
      version: '0.2.0',
    },
    {
      edgeWeights: {},
      nodeWeights: {
        'N\u0000sourcecred\u0000github\u0000COMMENT\u0000': 0.5,
        'N\u0000sourcecred\u0000github\u0000COMMIT\u0000': 1,
        'N\u0000sourcecred\u0000github\u0000ISSUE\u0000': 1,
        'N\u0000sourcecred\u0000github\u0000PULL\u0000': 16,
        'N\u0000sourcecred\u0000github\u0000REPO\u0000': 4,
        'N\u0000sourcecred\u0000github\u0000REVIEW\u0000': 4,
        'N\u0000sourcecred\u0000discourse\u0000like\u0000': 4,
        'N\u0000sourcecred\u0000discourse\u0000post\u0000': 0,
        'N\u0000sourcecred\u0000discourse\u0000topic\u0000': 0,
        'N\u0000sourcecred\u0000discourse\u0000user\u0000': 0,
        'N\u0000sourcecred\u0000discord\u0000REACTION\u0000629411717704712192\u0000': 4,
        'N\u0000sourcecred\u0000discord\u0000REACTION\u0000629412800346849302\u0000': 4,
        'N\u0000sourcecred\u0000discord\u0000REACTION\u0000635151982298136587\u0000': 3,
        'N\u0000sourcecred\u0000github': 2,
      },
    },
  ]
  return weights
}

const writeTemplate = (path, content) => {
  fs.writeFile(path, content, err => {
    if (err) {
      console.log(`Error writing file ${path}`, err)
    } else {
      console.log(`Sucessfully written to ${path}`)
    }
  })
}

const mkdirs = () => {
  const rootDir = `/home/${userName}/aracred`
  try {
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir)
      console.log(`created /home/${userName}/aracred`)

      fs.mkdirSync(rootDir + '/.github')
      console.log(`created /home/${userName}/aracred/.github`)

      fs.mkdirSync(rootDir + '/.github/workflows')
      console.log(`created /home/${userName}/aracred/.github/workflows`)

      fs.mkdirSync(rootDir + '/config')
      console.log(`created /home/${userName}/aracred/config`)

      fs.mkdirSync(rootDir + '/src')
      console.log(`created /home/${userName}/aracred/src`)
    } else {
      console.log(`/home/${userName}/aracred already exists! delete it and run again`)
    }
  } catch (err) {
    console.log(`error in mkdir templates.js`)
    console.error(err)
    process.exit(-1)
  }
}

module.exports = { daoTemplate, addressbookTemplate, projectTemplate, weightsTemplate, writeTemplate, mkdirs }
