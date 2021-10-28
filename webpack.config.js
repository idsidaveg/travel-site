const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

// create our own plugin for webpack - this handles copying images after everything else is completed
class RunAfterCompile{
    apply(compiler){
        compiler.hooks.done.tap('Copy images', function(){
            fse.copySync('./app/assets/images', './docs/assets/images');
        });
    };
}

let cssConfig = {
    test: /\.css$/i,
    use: [
        'css-loader?url=false', {
            loader: 'postcss-loader',
            options: {postcssOptions: {plugins: postCSSPlugins}}
        }
    ]
};

// this added for multiple html files
let pages =
    fse.readdirSync('./app').filter(function(file) {
        return file.endsWith('.html')
    }).map(function(page){
        return new HtmlWebpackPlugin({
            filename: page,
            template: `./app/${page}`
        });
    });


// any code that can be shared between the current tasks will live here
let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    resolve: {
        alias: {

        },
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            cssConfig
        ]
    }
};

// anything specific to dev will be here
if (currentTask == 'dev'){
    cssConfig.use.unshift('style-loader');
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    };
    config.devServer = {
        watchFiles: ['./app/**/*.html'],
        static: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    };
    config.mode = 'development';
}

// anything specific to build will be here
if (currentTask == 'build'){
    /* rules added to make sure code has backward compatibility */
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    });

    // changes made to handle unique names for files by including the 'chunkhash'
    // chunkhash is the hash value of the file for comparison against what user has downloaded
    // if different an update to the file will be downloaded automatically for the user
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    config.output = {
        filename: "[name].[chunkhash].js",
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production';
    config.optimization = {
        splitChunks: {chunks: 'all'},
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()]
    };
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
        );
}

module.exports = config;