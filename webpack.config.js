var webpack = require("webpack");
const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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

// const env = dotenv.config().parsed;

// // reduce it to a nice object, the same as before
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

// var clientLoaders = isProduction
//   ? productionPluginDefine.concat([
//     new webpack.DefinePlugin(envKeys),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false },
//       sourceMap: false
//     })
//   ])
//   : [new webpack.DefinePlugin(envKeys)];

var clientLoaders = isProduction
  ? productionPluginDefine.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: false
      })
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
    plugins: clientLoaders.concat([
      new ExtractTextPlugin("index.css", {
        allChunks: true
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
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
          // use: ExtractTextPlugin.extract({
          //   fallback: "style-loader",
          //   use: "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
          // })
          // use: [
          //   // { loader: 'style-loader' },
          //   // {
          //   //   loader: 'css-loader'
          //   // },

          //   // ]
          //   // use: ExtractTextPlugin.extract({
          //   //   fallback: "isomorphic-style-loader",
          //   //   use: "css-loader"
          //   // })
          //   // },
          //   // {
          //   //   test: /\.css$/,
          //   //   use: ExtractTextPlugin.extract({
          //   //     fallback: "style-loader",
          //   //     use: "css-loader"
          //   //   })
          // ]
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
      path: path.join(__dirname, "dist/assets/"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devtool: "eval",
    plugins: clientLoaders.concat([
      new ExtractTextPlugin("index.css", {
        allChunks: true
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
          // use: ExtractTextPlugin.extract({
          //   fallback: "style-loader",
          //   use: "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
          // })
          // use: [
          //   // { loader: 'style-loader' },
          //   {
          //     loader: 'css-loader',
          //     options: {
          //       fallback: 'style-loader',
          //       sourceMap: true,
          //       modules: true,
          //       localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
          //     }
          //   },

          // ]
          use: ExtractTextPlugin.extract({
            fallback: "isomorphic-style-loader",
            use: "css-loader"
          })
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
