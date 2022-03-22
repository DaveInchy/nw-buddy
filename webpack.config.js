const
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyPlugin = require("copy-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    OverwolfPlugin = require('./overwolf.webpack');

module.exports = env => ({
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        fallback: {
            "url": require.resolve("url"),
            "fs": require.resolve("fs"),
            "crypto": require.resolve("crypto-browserify"),
            // "http": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
        }
    },
    entry: {
        background: './src/background/background.ts',
        overlay: './src/overlay/overlay.ts',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/

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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
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
            template: './src/background/background.html',
            filename: path.resolve(__dirname, './dist/background.html'),
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            template: './src/overlay/overlay.html',
            filename: path.resolve(__dirname, './dist/overlay.html'),
            chunks: ['overlay']
        }),
        new OverwolfPlugin(env),
    ]
})
