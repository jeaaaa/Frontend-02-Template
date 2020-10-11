var path = require('path');

module.exports = {
    entry: "./main.js",
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        //修改React.createElement为createElement，使之与react脱离
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma: "createElement"}]]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000
    },
    mode: "development"
}