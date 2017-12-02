import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
// We use require because the lib doesn't have typings
// var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config: webpack.Configuration = {
    entry: [
        "react-hot-loader/patch",
        "./src/frontend/config/index.tsx"
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            Config: path.resolve(__dirname, 'src/frontend/config'),
            Containers: path.resolve(__dirname, 'src/frontend/containers'),
            Logic: path.resolve(__dirname, 'src/frontend/logic'),
            Presentational: path.resolve(__dirname, 'src/frontend/presentational')
        }
    },

    plugins: [
        new ExtractTextPlugin('home.css', {
            allChunks: true
        }),
        // new FaviconsWebpackPlugin('./src/frontend/presentational/assets/logo.svg'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'La Nube',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, './src/frontend/config/index.ejs')
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    "react-hot-loader/webpack",
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, "src/frontend"),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
              test: /\.(jpg|png|svg)$/,
              loader: 'file-loader',
              options: {
                name: '[path][name].[hash].[ext]',
              },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    },

    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "http:localhost:8080"}
    }

};

export default config;
