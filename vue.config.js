// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'vant': 'vant'
  },
  // cdn的css链接
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css',
  ],
  // cdn的js链接
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js'
  ]
}
module.exports = {

  devServer: {
    open: false, // 是否打开浏览器;
    hotOnly: true, // 是否热更新;

    proxy: {
      '/api': { // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
        target: 'http://admintest.happymmall.com/manage/', // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: true, // 是否启用  websockets;
        pathRewrite: { // 去掉 路径中的  /api  的这一截
          '^/api': ''
        }
      },
    },
  },

  lintOnSave: true,
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }

}
// 11.8MB
// 2.36 MB
// 1.32MB
//1.31MB