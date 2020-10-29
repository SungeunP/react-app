const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development', // Mode
  entry: './src/index.js', // Start point
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: { // Output result displayed path
    path: path.resolve(__dirname, './dist'), // <current_path> + './dist'
    filename: 'bundle.js' // Result file name
  },
  devtool: 'eval-cheap-source-map', // Error tool
  devServer: {
    port: 3000,
    overlay: true,
    hot: true, // Hot-module-replace
    writeToDisk: true
  },
  module: {
    rules: [
      { // Babel-loader
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/', // Exclude node_modules/..
        loader: 'babel-loader',
      },
      { // Style-loader, CSS-loader
        // Style-loader - Put css into html 'style' tag
        // MiniCssExtractPlugin.loader - Make CSS codes to file and minimize
        // CSS-loder - Call .css files
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      { // File-loader
        test: /\.(jpeg|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]' // Set format of file name
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    })
  ]
}