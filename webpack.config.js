var webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists

//plugins
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var nodeExternals = require("webpack-node-externals");

module.exports = (env) => {
  console.log("webpack env", env);
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + "." + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  console.log("webpack fileEnv", fileEnv);

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  const optionsRobotTxt = {
    policy: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/cms"],
        crawlDelay: 2,
      },
      {
        userAgent: "Twitterbot",
        Disallow: "*",
        allow: "/blog/post/",
        crawlDelay: 2,
      },
      {
        userAgent: "Facebot",
        Disallow: "*",
        allow: "/blog/post/",
        crawlDelay: 2,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/cms",
        crawlDelay: 10,
      },
    ],
    sitemap: "http://swordvoice.com/sitemap.xml",
    host: "http://swordvoice.com",
  };

  var isProduction = process.env.NODE_ENV === "production";
  var productionPluginDefine = [
    new webpack.DefinePlugin(envKeys),
    new RobotstxtPlugin(optionsRobotTxt),
  ];

  var clientLoaders = isProduction
    ? productionPluginDefine.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
      ])
    : productionPluginDefine;

  return [
    /////////////////
    ////////SERVER WEBPACK
    ////////////////////
    {
      entry: ["@babel/polyfill", "./src/app.server/server.index.js"],
      output: {
        path: path.join(__dirname, "server"),
        filename: "server.js",
        libraryTarget: "commonjs2",
        publicPath: "/",
      },
      target: "node",
      node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
      },
      externals: nodeExternals(),
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      plugins: clientLoaders.concat([
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: !isProduction ? "[name].css" : "[name].[hash].css",
          chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css",
        }),
      ]),
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader",
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === "development",
                },
              },
              "css-loader",
            ],
          },
          {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [
              {
                loader: "file-loader",
                options: { emitFile: false },
              },
            ],
          },
        ],
      },
    },

    /////////////////
    ////////CLIENT WEBPACK
    ////////////////////
    {
      entry: ["./src/app.client/client.index.js"],
      output: {
        path: path.join(__dirname, "dist/assets"),
        publicPath: "/",
        filename: "bundle.js",
      },
      devtool: "eval",
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      plugins: clientLoaders.concat([
        new LoadablePlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: !isProduction ? "[name].css" : "[name].[hash].css",
          chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css",
        }),
      ]),
      // externals: nodeExternals(),
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === "development",
                },
              },
              "css-loader",
            ],
          },
          {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },
    /////////////////
    ////////CMS  WEBPACK
    ////////////////////
    {
      entry: ["./src/app.cms/cms.index.js"],
      output: {
        path: path.join(__dirname, "dist/assets/cms"),
        publicPath: "/cms/",
        filename: "[name].bundleCMS.js",
        chunkFilename: "[name].bundleCMS.js",
      },
      devtool: "eval",
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      plugins: clientLoaders.concat([
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css",
        }),
      ]),
      // externals: nodeExternals(),
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === "development",
                },
              },
              "css-loader",
            ],
          },
          {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },
  ];
};
