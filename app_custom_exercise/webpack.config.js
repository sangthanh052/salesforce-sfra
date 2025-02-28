var path = require('path');
var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
var sgmfScripts = require('sgmf-scripts');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [{
    mode: 'development',
    name: 'js',
    entry: sgmfScripts.createJsPath(),
    output: {
        path: path.resolve('./cartridges/app_custom_exercise/cartridge/static/'),
        filename: '[name].js'
    }
}, {
    mode: 'none',
    name: 'scss',
    entry: sgmfScripts.createScssPath(),
    output: {
        path: path.resolve('./cartridges/app_custom_exercise/cartridge/static'),
        filename: '[name].css'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')()
                        ]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(process.cwd(), '../storefront-reference-architecture/node_modules/')
                        ]
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
}];
