const path = require('path')
// const production = process.env.NODE_ENV === 'production'
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  outputDir: 'Library',
  publicPath: '/Library',
  // linkOnSave: false,
  transpileDependencies: ['view-design'],
  productionSourceMap: process.env.VUE_APP_BUILD !== 'production',
  pages: {
    index: {
      entry: path.resolve(__dirname, './src/main.js'),
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      title: '忘川书屋'
    }
  },
  pluginOptions: {
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['E:\\Vue代码\\library-sys\\src\\less\\common.less']
    }
  }
  // configureWebpack: config => {
  //   // config.entry.app = ['@babel/polyfill', './src/main.js']
  //   if (production) {
  //     config.plugins.push(
  //       new CompressionWebpackPlugin({
  //         // 正在匹配需要压缩的文件后缀
  //         test: /\.(js|css|woff|ttf|eot|woff2|json|html|png|svg|jpg|gif|ico)$/,
  //         // 大于10kb的会压缩
  //         threshold: 10240
  //       })
  //     )
  //     // test环境不去掉debugger，方便调试
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false
  //   }
  //   if (process.env.VUE_APP_BUILD === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
  //   }
  // }
}
