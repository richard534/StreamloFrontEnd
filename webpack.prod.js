const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  devtool: "source-map",
  plugins: [new CompressionPlugin()]
});
