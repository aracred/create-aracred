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
