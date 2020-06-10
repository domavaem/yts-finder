const path = require("path");

module.exports = {
  name: "yts-finder",
  mode: "development", // development/production
  devtool: "eval", // eval/hidden-source-map
  entry: {
    app: ["./client"],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
          compact: true,
        },
      },
    ],
  },
};
