const paths = require('../paths');
const {merge} = require('webpack-merge');
const common = require('./common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
    mode: 'production',
    target :'browserslist',
    entry: {
        index: {
            import: `${paths.src}/index.js`,
            dependOn: ['react', 'helpers']
        },
        react: ['react', 'react-dom', 'prop-types'],
        helpers: ['immer', 'nanoid']
    },
    devtool: false,
    output: {
        filename: 'js/[name].[hash:8].bundle.js',
        publicPath: '/',
        assetModuleFilename: 'media/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource'
                // type: 'asset'
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),

    ],
    optimization: {
        runtimeChunk: 'single'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});