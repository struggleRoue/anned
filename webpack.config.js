const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/root.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "lib/lib-[hash:5].js",
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 99999,
                        encoding: false,
                    }
                }],
            },
            {
                test: /\.global\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/src',
                            hmr: true,
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    'postcss-loader',
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(__dirname, './src/main.global.less'),
                            injector: 'append'
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/lib-[hash:5].css',
        })
    ],
    devServer: {
        port: 3456,
        open: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: true
        }
    },
    performance: {
        hints: false
    }
}
