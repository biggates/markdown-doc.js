var path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractMarkdown = new ExtractTextPlugin('doc/[name].md');

module.exports = {
    devtool: 'inline-source-map',
    watch: true,
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js|jsx$/i,
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            use: 'babel-loader'
        }, {
            test: /\.css$/i,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.md$/i,
            use: 'raw-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name][hash].[ext]',
                    outputPath: './assets/',
                    publicPath: '/'
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/assets/index.html'
        }),
        new ExtractTextPlugin({
            filename: "style/[name].[contenthash].css",
            allChunks: true
        }),
        extractMarkdown,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                if(module.resource && (/\.md$/).test(module.resource)) {
                    return false;
                }
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ],
    devServer: {
        open: true,
        compress: false,
        stats: 'minimal'
    }
}
