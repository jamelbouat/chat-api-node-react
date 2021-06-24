import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [ 'react-hot-loader/babel' ]
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new DotenvWebpackPlugin(),
        new NodePolyfillPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true
    },
};

export default config;
