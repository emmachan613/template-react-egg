/* config-overrides.js */
// module.exports = function override(config, env) {
//   //do stuff with the webpack config...
//   return config;
// }
const path = require('path')
const { 
  override, 
  fixBabelImports, 
  addLessLoader, 
  addDecoratorsLegacy, 
  addWebpackAlias,
  overrideDevServer,
  watchAll
} = require('customize-cra');
// 关闭map文件输出
// method 1
process.env.GENERATE_SOURCEMAP = "false";
// method 2
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

const addWatchFilesToDisk = () => config => {
  console.log('config---before----', config)
  config = Object.assign(config, {
    writeToDisk: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    hot: false,
    open: false,
    quiet: false,
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
      },
    },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\//, to: '/login.html' },
    //     // { from: /^\/login$/, to: '/public/login.html' }
    //   ]
    // },
  })
  console.log('after---before----', config.historyApiFallback)
  // const useconfig = {
  //   test:  false
  // }
  return {
    ...config,
    // ...useconfig
  }

  return config
}

/* use multipe entry */
const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
      entry: 'src/login/index.js',
      template: 'public/index.html',
      outPath: 'login.html'
    }
  ]);

/* change output path */
const publicPathPlugin = () => (config, env) => {
  // console.log('before----config; publicPathPlugin--', config, env)
  config.output = {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist3"),
    publicPath: '/',
    chunkFilename: "js/[name].[hash:8].js",
  }
  // console.log('after----config; publicPathPlugin--', config, env)

  return config
}

const overrideConfig = {
  webpack: override(
    //多页面入口
    multipleEntry.addMultiEntry,
    //按需加载
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'true',
    }),
    //添加less-loader
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }),
    //关闭map文件输出
    rewiredMap(),
    //添加别名
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "app/static"),
    }),
    //支持装饰器
    addDecoratorsLegacy(),
    //打包路径
    // publicPathPlugin(),
    
  ),
  devServer: overrideDevServer(
    //dev模式把打包文件添加到硬盘
    addWatchFilesToDisk(),
    //dev server plugin
    watchAll(),
    (config) => {
      return {
        ...config,
        historyApiFallback: {
          rewrites: [
            { from: /^\//, to: '/login.html' },
            // { from: /^\/login$/, to: '/public/login.html' }
          ]
        },
      }
    }
  ),
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) { // 目前已知build appBuild才生效
    // ...add your paths config
    return paths;
    // const userPaths = {
    //   appIndexJs: path.resolve(__dirname, 'app/static/index.js'),
    //   appSrc: path.resolve(__dirname, 'app/static'),
    //   appBuild: path.resolve(__dirname, 'dist1')
    // }
    // return {
    //   ...paths,
    //   ...userPaths
    // }
  },
}

module.exports = overrideConfig