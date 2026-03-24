const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.ts',
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader' // fibers is not needed here anymore
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.m?js$/, // Match both `.js` and `.mjs` files
        exclude: /node_modules\/(?!(keycloak-js|vue-skycons)\/).*/, // Exclude node_modules except keycloak-js and vue-skycons
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 9000
  }
}
