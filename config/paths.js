const path = require("path");
module.exports = {
  public: path.resolve(__dirname, "../public"),
  src: path.resolve(__dirname, "../src"),
  build: path.resolve(__dirname, "../build"),
  "@node_modules": path.resolve(__dirname, "../node_modules"),
};
