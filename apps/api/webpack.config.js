/** @type {import('webpack').Configuration} */
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "../../../your-chat2"),
    publicPath: "/",
    filename: "api.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "src/prisma/schema.prisma"), to: "" },
        // {
        //   from: path.join(
        //     __dirname,
        //     "../../node_modules/.prisma/client/query_engine-windows.dll.node",
        //   ),
        //   to: "",
        // },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  target: "node",
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
}
