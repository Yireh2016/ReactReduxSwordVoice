var webpack = require("webpack");
const path = require("path");

//plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var nodeExternals = require("webpack-node-externals");

// const dotenv = require('dotenv');
var isProduction = process.env.NODE_ENV === "production";
var productionPluginDefine = isProduction
  ? [
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify("production") }
      })
    ]
  : [];

var clientLoaders = isProduction
  ? productionPluginDefine.concat([
      new webpack.optimize.OccurrenceOrderPlugin()
    ])
  : [];

module.exports = [
  /////////////////
  ////////SERVER WEBPACK
  ////////////////////
  {
    entry: ["@babel/polyfill", "./src/app.server/server.index.js"],
    output: {
      path: path.join(__dirname, "server"),
      filename: "server.js",
      libraryTarget: "commonjs2",
      publicPath: "/"
    },
    target: "node",
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: clientLoaders.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: !isProduction ? "[name].css" : "[name].[hash].css",
        chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css"
      })
    ]),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: { emitFile: false }
            }
          ]
        }
      ]
    }
  },

  /////////////////
  ////////CLIENT WEBPACK
  ////////////////////
  {
    entry: "./src/app.client/client.index.js",
    output: {
      path: path.join(__dirname, "dist/assets"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devtool: "eval",
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: clientLoaders.concat([
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: !isProduction ? "[name].css" : "[name].[hash].css",
        chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css"
      })
    ]),
    // externals: nodeExternals(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  },
  /////////////////
  ////////CMS  WEBPACK
  ////////////////////
  {
    entry: "./src/app.cms/cms.index.js",
    output: {
      path: path.join(__dirname, "dist/assets/cms"),
      publicPath: "/cms/",
      filename: "[name].bundleCMS.js",
      chunkFilename: "[name].bundleCMS.js"
    },
    devtool: "eval",
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: clientLoaders.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]),
    // externals: nodeExternals(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  }
];
