const execa = require('execa');
const Listr = require('listr');
const create = require('./templates')
//console.log(create.createAracred())

const userName = require('os').userInfo().username;

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

tasks.run().catch(err => {
  console.error(err);
});



