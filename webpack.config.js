const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const postCssPlugins = [
  'autoprefixer'
]

module.exports = (_, options) => {
  const isDev = options.mode !== 'production'

  if (!isDev) {
    postCssPlugins.push('cssnano')
  }

  const config = {
    target: isDev ? 'web' : 'browserslist',
    context: path.resolve(__dirname, 'src'),
    mode: options.mode,
    entry: {
      app: './js/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/[name].[hash].js',
      publicPath: '/'
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: postCssPlugins
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "./src/scss/global";',
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.svelte$/,
          use: [
            {
              loader: 'svelte-loader',
              options: {
                hotReload: true
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/!svelte/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.svelte'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      mainFields: ['svelte', 'browser', 'main']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/style.[hash].css'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'static', to: 'static' },
          { from: '.htaccess', to: '.' }
        ]
      }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      open: true,
      compress: true,
      overlay: true,
      noInfo: true,
      historyApiFallback: true,
      proxy: {
        '/backend/api': {
          target: 'https://nissan-kaleidoscope.slava.digital',
          secure: false,
          changeOrigin: true
        },
        '/puphpeteer': {
          target: 'https://nissan-kaleidoscope.slava.digital',
          secure: false,
          changeOrigin: true
        }
      }
    }
  }

  const pages = glob.sync('src/pages/*.html')
  pages.forEach(file => {
    const name = path.basename(file, '.html')
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(file),
        minify: false
      })
    )
  })

  return config
}
