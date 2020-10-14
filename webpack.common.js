const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirStyles = path.join(__dirname, 'styles');
const dirAssets = path.join(__dirname, 'assets');

/**
 * Webpack Configuration
 */
module.exports = env => {
    // Is the current build a development build
    const IS_DEV = !!env.dev;

    return {
        entry: {
            bundle: path.join(dirApp, 'index')
        },
        resolve: {
            modules: [
                dirNode,
                dirApp,
                dirStyles,
                dirAssets
            ]
        },
        plugins: [
            new webpack.DefinePlugin({ IS_DEV }),

            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'app', 'template.ejs'),
                filename: IS_DEV ? 'index.html' : '../index.html',
                title: 'Christoph von Gellhorn',
                inject: false,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            }),

            new MiniCssExtractPlugin({
                filename: 'styles.[hash].css'
            })
        ],
        module: {
            rules: [
                // STYLES
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },

                // CSS / SASS
                {
                    test: /\.scss/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },

                // IMAGES
                {
                    test: /\.(jpe?g|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // Fonts
                {
                    test: /\.woff2*(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=application/font-woff'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=application/octet-stream'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'file-loader'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=10000&minetype=image/svg+xml'
                }
            ]
        }
    };
};
