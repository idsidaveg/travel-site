const path = require('path');
const postCSSPlugins = [
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]
module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    resolve: {
        alias: {

        },
        extensions: ['.ts', '.js'],
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader?url=false','css-loader', {
                        loader: 'postcss-loader',
                        options: {postcssOptions: {plugins: postCSSPlugins}}
                    }
                ]
            }
        ]
    }
}