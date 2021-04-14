const path = require('path')
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
      title: '文亭'
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
}
