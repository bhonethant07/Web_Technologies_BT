const { defineConfig } = require("cypress");
const webpack = require("webpack");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                },
              },
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: "asset/resource",
            },
          ],
        },
        plugins: [
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("test"),
          }),
        ],
      },
    },
  },
});
