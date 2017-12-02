import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, 'src/backend/server.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "server.bundle.js",
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            Controllers: path.resolve(__dirname, 'src/backend/controllers'),
            Models: path.resolve(__dirname, 'src/backend/models'),
            Routes: path.resolve(__dirname, 'src/backend/routes'),
            Helpers: path.resolve(__dirname, 'src/backend/helpers')
        }
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true,
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, "src/backend"),
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    },
    devtool: 'source-map',
};

export default config;