var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
    }
    initPackage(){
        const pkgJson = {
            devDependencies: {
              eslint: '^3.15.0'
            },
            dependencies: {
              react: '^16.2.0'
            }
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall();
    }
    //异步
    async stepOne() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
          );
        // // prompt 输入
        // const answers = await this.prompt([
        //     {
        //       type: "input",
        //       name: "name",
        //       message: "Your project name",
        //       default: this.appname // Default to current folder name
        //     },
        //     {
        //       type: "confirm",
        //       name: "cool",
        //       message: "Would you like to enable the Cool feature?"
        //     }
        // ]);

        // this.log("app name", answers.name);
        // this.log("cool feature", answers.cool);
    }
    
};