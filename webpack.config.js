const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 9001,
        contentBase: path.resolve(__dirname, './build'),
        hot: true,
        open: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        writeToDisk: filePath => {
            return /(index.html$)|(bundle.js$)|(style.css$)/.test(filePath)
        }
    },
    module: {
        rules: [
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.less$/, use: [CssWebpackPlugin.loader, 'css-loader', 'less-loader']},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new CssWebpackPlugin({
            filename: 'style.css'
        })
    ]
};