const path = require('path'); // handles & transforms file paths.
const merge = require('webpack-merge'); // merges stuff, not sure really.
const webpack = require('webpack'); // webpack runs this whole thing.
const HtmlwebpackPlugin = require('html-webpack-plugin'); // helps serve webpack bundle.
const WebpackErrorNotificationPlugin = require('webpack-error-notification');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
        extensions: ['', '.js'], // app consists of these files
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js', // is bundled into the build folder as bundle
    },
    plugins: [
        new HtmlwebpackPlugin({
            // deploys html file every time built.
            template: './utils/index.html',
            title: 'Star Hero',
            hash: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackErrorNotificationPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json',
            },
            {
                // handles next gen javascript
                test: /\.js?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app,
            },
            {
                loader: 'script',
                test: /(pixi|phaser).js/,
            },
        ],
    },
    watch: true,
    stats: {
        // Nice colored output
        colors: true,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
};

if (TARGET === 'start' || !TARGET) {
    // creates dev environment
    module.exports = merge(common, {
        devtool: '#cheap-module-inline-eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
        ],
    });
}
