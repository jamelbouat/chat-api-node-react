import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx']
        }),
    ]
};

export default config;
