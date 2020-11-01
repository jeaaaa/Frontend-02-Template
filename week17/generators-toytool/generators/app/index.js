var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
    }
    async initPackage(){
		// prompt 输入
        const answers = await this.prompt([
            {
              type: "input",
              name: "name",
              message: "Your project name",
              default: this.appname // Default to current folder name
            },
            // {
            //   type: "confirm",
            //   name: "cool",
            //   message: "Would you like to enable the Cool feature?"
            // }
        ]);
        const pkgJson = {
            "name": answers.appname,
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "mocha --require @babel/register",
                "build": "webpack",
                "coverage": "nyc mocha --require @babel/register"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
            },
            "dependencies": {
            }
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
		this.npmInstall(["vue"], { "save-dev" : false });
        this.npmInstall(["webpack@4.0.0", 
            "webpack-cli",
			"vue-loader", 
			"vue-style-loader",
			"css-loader",
			"vue-template-compiler",
			"copy-webpack-plugin",
            "html-webpack-plugin",
            "babel-loader",
            "@babel/core",
            "@babel/preset-env",
            "@babel/register",
            "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul",
            "mocha",
            "nyc"
		], { "save-dev" : true });

		
		this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue')
		);
		this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
		);
		this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
		);
		this.fs.copyTpl(
            this.templatePath('index.html'),
			this.destinationPath('src/index.html'),
			{title: answers.appname}
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        );
        this.fs.copyTpl(
            this.templatePath('test.js'),
            this.destinationPath('test/test.js')
		);
	}
	

    //异步
    // async stepOne() {
    //     this.fs.copyTpl(
    //         this.templatePath('index.html'),
    //         this.destinationPath('public/index.html'),
    //         { title: 'Templating with Yeoman' }
    //       );


    //     // this.log("app name", answers.name);
    //     // this.log("cool feature", answers.cool);
    // }
    
};