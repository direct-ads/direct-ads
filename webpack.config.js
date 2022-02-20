const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
