const NODE_ENV = process.env.NODE_ENV;
const dotenv = require("dotenv");

const webpack = require("webpack");
const fs = require("fs");
const path = require("path"),
  join = path.join, // joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path.
  resolve = path.resolve; // resolves a sequence of paths or path segments into an absolute path.

const root = resolve(__dirname);
const src = join(root, "src");
const modules = join(root, "node_modules");
const dest = join(root, "dist");

var config = {
  entry: [
    path.resolve(root, src, "main") // resolves to streamloFrontEnd/src/main, entry can use either string, array or object
  ],
  output: {
    path: dest,
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(src)
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()],
  resolve: {
    root: [resolve(src)]
  },
  module: {
    loaders: [
      { test: /\.js$/, include: src, loaders: ["babel"] },
      { test: /\.(jpg|png|svg)$/, include: src, loader: "file" },
      { test: /(\.css)$/, loaders: ["style-loader", "css-loader"] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
};

// ENV variables dependency injection
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, "config", `${NODE_ENV}.config.js`),
  silent: true
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv);

const defines = Object.keys(envVariables).reduce(
  (memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  },
  {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  }
);

config.plugins = [new webpack.DefinePlugin(defines)].concat(config.plugins);
// END ENV variables dependency injection

export default config;
