const execa = require('execa');
const Listr = require('listr');
const create = require('./templates')
const fs = require('fs');
//console.log(create.createAracred())
const packageJson = require('../package.json')
const Configstore = require('configstore')
const config = new Configstore(packageJson.name)
const userName = require('os').userInfo().username;

const { getStore, createAracred } = require('./templates')

const tasks = new Listr([
  {
    title: 'Create AraCred',
    task: () => {
      return new Listr([
        {
          title: 'Creating AraCred Files',
          task: async () => Promise.resolve(create.createAracred())
        }
      ]);
    }
  },
  {
    title: 'Initialise Git',
    task: (ctx, task) => execa.command(`git init -q /home/${userName}/aracred/`)
      .catch((err) => {
        console.log('Error initialising git')
        console.log(err)
      })
  }
]);
/*
tasks.run().catch(err => {
  console.error(err);
});
*/

console.log(getStore())





