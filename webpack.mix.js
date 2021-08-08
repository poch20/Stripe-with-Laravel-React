const mix = require('laravel-mix')
const webpack = require('webpack')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || `http://localhost:8000/`
const PATH_ALIAS = path.join(__dirname, '.', './resources/js/')
const PATH_RESOLVE = path.resolve(
  __dirname,
  '.',
  './resources/views/welcome.blade.php'
)
const PATH_IMAGE = path.join('public/storage/', '.', './products-table')
mix.webpackConfig({
  resolve: {
    extensions: ['.css', '.tsx', '.ts', '.js'],

    alias: {
      //'vue': 'node_modules/@vue/runtime-dom',
      '@': path.join(__dirname, '.', './resources/ts/'),
      '@css': path.join(__dirname, '.', './resources/css/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,

        /* Hindi na kailangan kasi nga No need because Laravel already took care of this
         exclude: /node_modules/,
         use: [
           {
             loader: 'babel-loader'
           }
         ]*/
      },

      //Test for CSS loaders
      /* No need also because Laravel already took care of this

       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader'],
       },
       //Test for Asset files such as image types
       {
         test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
         type: 'asset/resource'
       },
       //Test for Asset files such as svg's types
       {
         test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
         type: 'asset/inline'
       } */
    ],
  } /*module property*/,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      PATH_JOIN: JSON.stringify(PATH_ALIAS),
      PATH_RESOLVE: JSON.stringify(PATH_RESOLVE),
      PATH_IMAGE: JSON.stringify(PATH_IMAGE),
    }),
  ],
})

mix
  .js('resources/ts/Index.tsx', 'public/js')
  .postCss('resources/css/app.css', 'public/css', [
    //
  ])
