const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const Dotenv = require("dotenv-webpack");

module.exports = {
  // Here the application starts executing
  // and webpack starts bundling
  entry: "./src/main.js",

  // options related to how webpack emits results
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    // this prevents file path issues between operating systems and allows relative paths
    path: path.resolve(__dirname, "dist"),

    // the url to the output directory resolved relative to the HTML page
    publicPath: "/",

    // the filename template for entry chunks
    filename: "bundle.js"
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },

  // Instructs webpack to target a specific environment.
  target: "web",

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[path][name].[hash].[ext]"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "svg-inline-loader",
          options: {
            limit: 10000
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(["dist"]),
    new Dotenv()
  ]
};
