module.exports = {
  transpileDependencies: [
    'vuex-module-decorators',
    'babel-plugin-module-resolver',
    'minimatch',
    'vue-skycons',
    'keycloak-js'
  ],
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      open: true
    },
    module: {
      rules: [
        {
          test: /config.*config\.js$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'config.js'
              }
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
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
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      })
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/styles/_colors.scss";
        @import "@/styles/_fonts.scss";
        `
      }
    }
  }
}
