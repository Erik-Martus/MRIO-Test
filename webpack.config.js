const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    mode: env.production ? "production" : "development",
    optimization: {
      usedExports: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(ts|tsx)?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      // Add hook support for react-hot-loader
      alias: { "react-dom": "@hot-loader/react-dom" },
    },
    output: {
      path: path.resolve(__dirname, "./dist/"),
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        hash: true,
        filename: "../dist/index.html",
      }),
    ],
  };
};
