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
} = require('customize-cra');
// 关闭map文件输出
// method 1
process.env.GENERATE_SOURCEMAP = "false";
// method 2
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

const removeManifest = () => config => {
  config.plugins = config.plugins.filter(
    p => p.constructor.name !== "ManifestPlugin"
  );
  return config;
};

/* rewrite devServer config */
const rewriteDevServerConfig = () => config => {
  config = Object.assign(config, {
    writeToDisk: true, //把打包文件添加到硬盘
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    hot: true,
    open: false,
    quiet: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:7001',
    //   },
    // },
    historyApiFallback: { // multiple page
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/login$/, to: '/login.html' },
        { from: /./, to: path.resolve(__dirname, './public/404.html') },
      ]
    },
  })
  return config
}

/* use multipe entry */
const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
      entry: 'src/static/login/index.jsx',
      template: 'public/index.html',
      outPath: 'login.html'
    },
    {
      entry: 'src/static/app/index.jsx',
      template: 'public/template.html',
      outPath: 'index.html'
    }
  ]);

/* change output path */
const publicPathPlugin = () => (config, env) => {
  config.output = {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist1"),
    publicPath: '/',
    chunkFilename: "js/[name].[hash:8].js",
  }

  return config
}

//部分代码省略
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const rewriteCleabPlugin = () => config => {
  config.plugins = (config.plugins || []).concat([
    new CleanWebpackPlugin({
      dry: false, // 模拟删除
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")]
    })
  ])
  return config
}

const overrideConfig = {
  webpack: override(
    rewriteCleabPlugin(),
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
    //删除manifest
    removeManifest(),
    //添加别名
    addWebpackAlias({
      ["@app"]: path.resolve(__dirname, "src/static/app"),
      ["@login"]: path.resolve(__dirname, "src/static/login"),
    }),
    //支持装饰器
    addDecoratorsLegacy(),
    //打包路径
    // publicPathPlugin(),
  ),
  
  devServer: overrideDevServer(
    rewriteDevServerConfig(),
  ),
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) { // 目前已知build appBuild才生效
    // ...add your paths config
    console.log("paths=======",paths)
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