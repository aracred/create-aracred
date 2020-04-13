import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'

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

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template.toLowerCase(),
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

  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
