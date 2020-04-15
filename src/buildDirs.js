const fs = require('fs');
const userName = require('os').userInfo().username;

/*
 * 1. Create the directory structure
 * 2. Copy files over (non customised)
 * 3. Save output of template functions
 */
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
    console.error(err)
    process.exit(-1)
  }
}

module.exports = { mkdirs }
