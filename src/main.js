import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'

const access = promisify(fs.access)
const copy = promisify(ncp)

/*
This code will export a new function called createProject that will first check if the specified 
template is indeed an available template, by checking the read access (fs.constants.R_OK) 
using fs.access and then copy the files into the target directory using ncp. Additionally we'll 
log some colored output saying DONE Project ready when we successfully copied the files.
*/
async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}
/*
This will run git init whenever --git is passed or the user chooses git in the prompt and it 
will run npm install or yarn whenever the user passes --install, otherwise it will skip the 
task with a message informing the user to pass --install if they want automatic install.
*/
async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
  return
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template,
  )
  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }

  console.log('Copy project files')
  await copyTemplateFiles(options)

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined,
    },
  ])

  await tasks.run()

  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
