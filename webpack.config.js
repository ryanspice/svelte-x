const webpack = require("./node_modules/webpack");
const {merge} = require("./node_modules/webpack-merge");

const path = require("path");
const name = require("./package.json").short_name;
/**
 * webpack.config.js
 * entry config, merges all others
 * @param env
 * @returns {Array}
 */
const MiniCssExtractPlugin = require("./node_modules/mini-css-extract-plugin");
module.exports = async (env) => {
  env = env
    ? env
    : {
        legacy: false,
        production: false,
      };

  const { scss } = require("svelte-preprocess");
  const entry = {};
  entry[name] = path.resolve(__dirname, "src/index.js");
//  entry["css"] = path.resolve(__dirname, "src/index.scss");

  // override env for parallel-webpack implementation TODO: better this
  process.argv.forEach((e) => {
    const x = e.split("=")[0].replace("--", "").replace("env.", "");
    const y = e.split("=")[1];
    e.indexOf("=") > 0 ? (env[x] = y) : null;
  });
  const build = (
    await require("./node_modules/ecmascript-toolkit/config/webpack.master.js")(
      env
    )
  )[0];
  const config = {
    entry: entry,
    externals: {
      redux: "Redux",
    },
    resolveLoader: {
      modules: [
        "node_modules",
        "./node_modules/ecmascript-toolkit/node_modules",
      ],
    },
    resolve: {
      //enforceExtension: false,
      alias: {
        svelte: path.resolve("node_modules", "svelte"),
      },
      extensions: [".mjs", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.(svelte)$/,
          exclude: /node_modules\/(?!svelte)/,
        },
        {
          test: /\.svelte$/,
          use: {
            loader: "svelte-loader",
            options: {
              emitCss: false,
              hotReload: false,
              css: (css) => {
                css.write("public/bundle.css");
              },
              preprocess: require("svelte-preprocess")([
                scss({ defaults: { style: "scss" } }),
              ]),
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/docker$/ }),
      //new webpack.IgnorePlugin({ resourceRegExp: /^\.\/lib$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/node_modules/ }),
      //new webpack.IgnorePlugin({ resourceRegExp: /^\.\/dist$/ }),
      new webpack.ProvidePlugin({
        log: path.resolve(__dirname, "./node_modules/loglevel/lib/loglevel.js"),
        env: [path.resolve("./.env"), "default"],
        pkg: [path.resolve(__dirname, "./package.json")],
        lang: [path.resolve(__dirname, "./src/lang/en.json")],
        runtime: [
          path.resolve(__dirname, "./src/utils/runtime/index.js"),
          "default",
        ],
      }),
    ],
    output: {
      library: name,
      //libraryTarget: `window`,
      chunkFilename: `[name].js`,
      filename: `[name].js`,
      path: path.resolve("./dist"),
    },
    devServer: {
      port: 4200,
      https: true,
      //inline: true,
      //hot: true,
      disableHostCheck: true,
      historyApiFallback: true,
      // proxy: {
      //   "/api/**": {
      //     target: "https://app.tracercanada.ca/api/",
      //     secure: false,
      //     changeOrigin: true,
      //     withCredentials: true,
      //     logLevel: "debug",
      //     headers: {
      //       "X-Forwarded-For": "8.0.8.0",
      //       Cookie: "myToken=jx42NAQSFRwXJjyQLoax_sw7h1SdYGXog-gZL9bjFU7",
      //     },
      //   },
      // },
    },
  };
  // config.resolve.alias[`@smui`] = [
  //   path.resolve(__dirname, "./node_modules/@smui"),
  // ];
  //build.entry = undefined;
  build.devServer = undefined;
  const builds = merge(build, config);
  //console.log(builds);
  return builds;
};
