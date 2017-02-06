const path      = require('path');
const Generator = require('yeoman-generator');
const chalk     = require('chalk');
const yosay     = require('yosay');

module.exports = class GeneratorReactReduxRollup extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: "What's your application name?",
        default: path.basename(process.cwd())
      }
    ];

    return this.prompt(prompts).then(props => this.props = props);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { appName: this.props.appName }
    );

    this.writeDotfiles();
    this.writeProjectBoilerplate();
    this.writeBuildSystem();
  }

  install() {
    this.installDependencies({ bower: false });
  }

  end() {
    yosay(chalk.green('All done! Run `gulp:build` to build the application.'));
  }

  writeDotfiles() {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
  }

  writeProjectBoilerplate() {
    this.fs.copy(
      this.templatePath('app/index.js'),
      this.destinationPath('app/index.js')
    );

    this.fs.copy(
      this.templatePath('app/store.js'),
      this.destinationPath('app/store.js')
    );

    this.fs.copy(
      this.templatePath('app/App.js'),
      this.destinationPath('app/components/App.js')
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.props.appName }
    );

    // create Redux directories
    this.fs.copy(
      this.templatePath('.gitkeep'),
      this.destinationPath('app/actions/.gitkeep')
    );

    this.fs.copy(
      this.templatePath('.gitkeep'),
      this.destinationPath('app/constants/.gitkeep')
    );

    this.fs.copy(
      this.templatePath('.gitkeep'),
      this.destinationPath('app/containers/.gitkeep')
    );

    this.fs.copy(
      this.templatePath('.gitkeep'),
      this.destinationPath('app/reducers/.gitkeep')
    );
  }

  writeBuildSystem() {
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  }
};
