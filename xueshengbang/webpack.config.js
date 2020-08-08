const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin({ filename: './css/main.css' }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // { test:/\.less$/ ,use:['style-loader','css-loader','less-loader'] },
            //{ test:/\.sass$/ ,use:['style-loader','css-loader','sass-loader'] },
            { test: /\.(jpg|png|gif|bpm|jpeg)$/, use: 'url-loader?limit=194926&name=[hash:8]-[name].[ext]' },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?name=fonts/[name].[md5:hash:hex:6].[ext]"
            },
            //url-loader?limit=7632用来传参,指定图片大小是否转码base64
            //url-loader?limit=7632&name=[hash:8]-[name].[ext] 指定打包后文件名和原文件名相同（不推荐）
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' },
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js",
        }
    }
}