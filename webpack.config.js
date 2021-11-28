const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
  mode: 'production',
  target: ['web', 'es5'],
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  dynamicImport: true,
                  syntax: 'ecmascript',
                },
                transform: {
                  react: {
                    useBuiltins: true,
                  },
                },
                minify: {
                  mangle: true,
                  compress: {
                    unused: true,
                  },
                },
              },
              minify: true,
            },
          },
          {
            loader: require.resolve('esbuild-loader'),
            options: {
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname, 'src/Clock.vue'),
    output: {
      path: path.resolve(__dirname, './lib'),
      publicPath: '/lib/',
      filename: 'vue-clock.umd.js',
      library: 'vue-clock',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  }),
  merge(config, {
    entry: path.resolve(__dirname, 'src/plugin.js'),
    output: {
      path: path.resolve(__dirname, './lib'),
      publicPath: '/lib/',
      filename: 'vue-clock.min.js',
      libraryTarget: 'window',
      library: 'VueClock',
    },
  }),
];
