const path = require("path");
const slsw = require("serverless-webpack");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const stageName = slsw.lib.options.stage || "development";
const envFile = path.join(__dirname, "env", `.env.${stageName}`);

module.exports = {
  externals: !slsw.lib.webpack.isLocal ? [nodeExternals()] : [],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new Dotenv({
      path: envFile
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  }
};
