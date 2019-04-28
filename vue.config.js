const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js插件
module.exports = {
  //开发服务器配置
  devServer: {
    clientLogLevel: 'warning',
    // publicPath: '/', //publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作
    // historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代，默认是false
    compress: false,
    host: '192.168.9.211', //host、port 和 https 可能会被命令行参数覆写
    hot: true,
    port: 8088,// 端口号
    open: true, //配置自动启动浏览器
    overlay: {
      warnings: true,
      errors: true
    }, //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    quiet: false, // 启用 devServer.quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    watchOptions: { //与监视文件相关的控制选项
      poll: false,
    },
    noInfo: true //告诉 dev-server 隐藏 webpack bundle 信息之类的消息。devServer.noInfo 默认禁用
  },
  runtimeCompiler: true,//是否使用包含运行时编译器的 Vue 构建版本,设置为 true 后你就可以在 Vue 组件中使用 template 选项了
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
  outputDir: 'dist',//默认是dist
  assetsDir: 'static',//默认是''
  productionSourceMap: true, //在production环境使用SourceMap
  //配置CSS
  css: {
    sourceMap:process.env.NODE_ENV === 'development'?true:false,//开发环境为 CSS 开启 source map
    loaderOptions: { //向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',//在生产构建时禁用 eslint-loader
  configureWebpack: (config) => {
    //入口文件
    config.entry.app = ['babel-polyfill', './src/main.js'];
    //删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console:true,
            drop_debugger:true
          },
          output:{
            // 去掉注释内容
            comments: false,
          }
        },
        sourceMap: false,
        parallel: true,
      })
    ];
    //只有打包生产环境才需要将console删除
    if(process.env.VUE_APP_TITLE === 'production'){
      config.plugins = [...config.plugins, ...plugins];
    }
    //rules
    // config.module.rules = [...config.module.rules,{
    //   test: /\.js$/,
    //   use: {
    //     loader: "babel-loader",
    //     options: {
    //       plugins: [
    //         "dynamic-import-webpack"
    //       ]
    //     }
    //   }
    // }];
    //webpack解析配置
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },
  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    //为了补删除换行而加的配置
    const vueRule = config.module.rule("vue")
    vueRule
      .use("vue-loader")
        .loader("vue-loader")
        .tap(options => {
          // modify the options...
          options.compilerOptions.preserveWhitespace = true;
          return options;
        });
        

  }
}
