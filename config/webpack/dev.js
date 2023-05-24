const paths = require("../paths");

const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./common");

module.exports = merge(common, {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-source-map",

  devServer: {
    compress: true,
    static: paths.build,
    hot: true,
    historyApiFallback: true,
    // open: true,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
