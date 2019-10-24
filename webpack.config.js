var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/content.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "content.bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "bin"),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      path: path.join(__dirname, "bin"),
      title: "Content Script Test",
      template: "./src/index.html",
      filename: "index.html"
    })
  ]
};
