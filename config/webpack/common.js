const paths = require("../paths");

const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Dotenv = require("dotenv-webpack");

const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-runtime",
];

if (process.env.NODE_ENV === "development") {
  plugins.push("react-refresh/babel");
}

const babelLoader = {
  loader: "babel-loader",
  options: {
    presets: [
      // "react-app",
      "@babel/preset-env",
      "@babel/preset-react",
    ],
    plugins: plugins,
  },
};

module.exports = {
  entry: `${paths.src}/index.js`,
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
    // publicPath: 'https://itguild.info',
    asyncChunks: true,
    clean: true,
    crossOriginLoading: "anonymous",
    module: true,
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true,
    },
  },
  resolve: {
    alias: {
      "@": `${paths.src}/modules`,
      assets: `${paths.src}/assets`,
      "@components": `${paths.src}/components`,
      "@pages": `${paths.src}/pages`,
      "@redux": `${paths.src}/redux`,
      "@store": `${paths.src}/store`,
      "@api": `${paths.src}/api`,
      "@hooks": `${paths.src}/hooks`,
    },
    // extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    extensions: [".jsx", "..."],
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  module: {
    rules: [
      // JavaScript, React
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader,
      },
      // TypeScript
      {
        test: /.tsx?$/i,
        exclude: /node_modules/,
        use: [babelLoader, "ts-loader"],
      },
      // CSS, SASS
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "sass-loader",
        ],
      },
      // MD
      {
        test: /\.md$/i,
        use: ["html-loader", "markdown-loader"],
      },
      // static files
      {
        test: /\.(jpe?g|png|gif|webp|svg|eot|ttf|woff2|woff?)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}`,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),

    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      // filename: 'index.html',
    }),

    new webpack.ProvidePlugin({
      React: "react",
    }),

    new Dotenv({
      path: ".env",
    }),
  ],
};
