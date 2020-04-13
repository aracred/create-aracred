# LOG

## initial commit

after linking, run `create-project --flags`

## parse args

```md
[template]: We'll support different templates out of the box. If this is not passed we'll prompt the user to select a template
--git: This will run git init to instantiate a new git project
--install: This will automatically install all the dependencies for the project
--yes: This will skip all prompts and go for default options
```

run `create-project` with any of the args

## handle input

prompts for missing input

## logic: copy package.json

Now that we are able to determine the respective options through prompts and command-line arguments, let's write the actual logic that will create our projects. Our CLI will write into an existing directory similar to npm init and it will copy all files from a templates directory in our project. We'll allow the target directory to be also modified via the options in case you want to re-use the same logic inside another project.

To test our progress, create a new directory somewhere like ~/test-dir on your system and run inside it the command using one of your templates. For example:

`create-project typescript --git`

## login: initialise git _interactive broken_

**_Logic is broken in interactive workflow_**
Now there are two more steps we want our CLI to do. We want to optionally initialize git and install our dependencies. For this we'll use three more dependencies:

```md
- execa: which allows us to easily run external commands like git
- pkg-install: to trigger either yarn install or npm install depending on what the user uses
- listr which: let's us specify a list of tasks and gives the user a neat progress overview
```

This will run git init whenever --git is passed or the user chooses git in the prompt and it will run npm install or yarn whenever the user passes --install, otherwise it will skip the task with a message informing the user to pass --install if they want automatic install.

Give it a try by deleting your existing test folder first and creating a new one. Then run:

`create-project typescript --git --install`

## make consumable

If you want to make your code consumable as an actual module so that others can reuse your logic in their code, we'll have to add an index.js file to our src/ directory that exposes the content from main.js:

```js
require = require('esm')(module)
require('../src/cli').cli(process.argv)
```

add a files key in your package.json to specify which files should be published.

```json
 },
 "files": [
   "bin/",
   "src/",
   "templates/"
 ]
}
```

check what will be published `npm pack --dry-run`

publish `npm publish`
