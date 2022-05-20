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
        }
    },
    entry: {
        service: './src/background/service.ts',
        welcome: './src/resources/window/welcome.ts',
        minimap: './src/resources/window/minimap.ts',
        worldmap: './src/resources/window/worldmap.ts',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ],
            },
            {
                test: /\.css$/,
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
                test: /\.js$/,
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
                    },
                ]
            },
            {
                test: /\.(tsx|jsx)$/,
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
                    },
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true },
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
        extensions: ['.ts', '.js', '.tsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
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
            template: './src/background/service.html',
            filename: path.resolve(__dirname, './dist/service.html'),
            chunks: ['service']
        }),
        new HtmlWebpackPlugin({
            template: './src/welcome/index.html',
            filename: path.resolve(__dirname, './dist/welcome.html'),
            chunks: ['welcome']
        }),
        new HtmlWebpackPlugin({
            template: './src/minimap/index.html',
            filename: path.resolve(__dirname, './dist/minimap.html'),
            chunks: ['minimap']
        }),
        new HtmlWebpackPlugin({
            template: './src/resources/pages/worldmap.html',
            filename: path.resolve(__dirname, './dist/worldmap.html'),
            chunks: ['worldmap']
        }),
        new OverwolfPlugin(env),
    ],
})
