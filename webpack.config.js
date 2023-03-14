const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OverwolfPlugin = require('./overwolf.webpack');

module.exports = env => ({
    resolve: {
        extensions: ['.js','.ts'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'src/modules'),
            path.resolve(__dirname, 'node_modules')
        ],
        fallback: {
            "url": false,
            "fs": require.resolve("fs-extra"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("zlibjs"),
            "http": require.resolve("stream-http"),
            "fetch": require.resolve("node-fetch"),
            "process": require.resolve("process/"),
        },
    },
    entry: {
        service: './src/service/service.ts',
        splash: './src/windows/splash.ts',
        worldmap: './src/windows/worldmap.ts',
        minimap: './src/windows/minimap.ts',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ts)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve(__dirname, 'src/'),
            path.resolve(__dirname, 'src/modules/'),
            path.resolve(__dirname, 'node_modules/')
        ],
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'js/[name].js'
    },
    plugins: [
        new CleanWebpackPlugin,
        new CopyPlugin({
            patterns: [ { from: "public", to: "./" } ],
        }),
        new HtmlWebpackPlugin({
            template: './src/service/service.html',
            filename: path.resolve(__dirname, './dist/service.html'),
            chunks: ['service']
        }),
        new HtmlWebpackPlugin({
            template: './src/modules/ow-react/template.html',
            filename: path.resolve(__dirname, './dist/splash.html'),
            chunks: ['splash']
        }),
        new HtmlWebpackPlugin({
            template: './src/modules/ow-react/template.html',
            filename: path.resolve(__dirname, './dist/minimap.html'),
            chunks: ['minimap']
        }),
        new HtmlWebpackPlugin({
            template: './src/modules/ow-react/template.html',
            filename: path.resolve(__dirname, './dist/worldmap.html'),
            chunks: ['worldmap']
        }),
        new OverwolfPlugin(env),
    ],
})
