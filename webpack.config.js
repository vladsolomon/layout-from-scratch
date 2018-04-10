const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './app/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader", options: {
                            paths: [
                                path.resolve(__dirname)
                            ]
                        }
                    }, {
                        loader: "less-loader", options: {
                            paths: [
                                path.resolve(__dirname)
                            ]
                        }
                    }],
                    fallback: "style-loader"
                })
            },{
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        extractLess
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        }
    }
};