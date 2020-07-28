## template-react-egg
本项目由react-app-rewrited 重新修改create-react-app webpack配置， egg.js作为后端服务
#### 快速开始
```bash
$ yarn install
```
#### webpack-dev-server
```bash
$ yarn start
$ open http://localhost:8001/
```

#### egg服务
```bash
$ yarn run egg-server
$ open http://localhost:7001/
```

#### 发布
```bash
$ yarn run build
$ yarn run egg-start
$ yarn run egg-stop
```
### 项目结构
``` shell
|-- template-react-egg
    |-- .babelrc
    |-- .editorconfig
    |-- .gitignore
    |-- README.md
    |-- config-overrides.js //自定义webpack配置
    |-- package.json
    |-- yarn.lock
    |-- app
    |   |-- router.js
    |   |-- controller
    |   |   |-- home.js
    |   |   |-- test.js
    |   |   |-- web
    |   |       |-- index.js
    |   |-- middleware
    |   |   |-- uppercase.js
    |   |-- public
    |       |-- readme.md
    |-- config
    |   |-- config.default.js
    |   |-- config.prod.js
    |   |-- plugin.js
    |-- dist //前端打包文件
    |-- env
    |   |-- .env.deployment
    |-- logs
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |   |-- robots.txt
    |   |-- template.html
    |-- src //前端页面
        |-- index.js
        |-- assets
        |   |-- images
        |       |-- logo.svg
        |-- static
            |-- app
            |   |-- App.css
            |   |-- App.js
            |   |-- index.css
            |   |-- index.jsx
            |   |-- lib
            |   |   |-- request.js //axios 拦截器封装
            |   |-- components
            |   |   |-- withAuth.jsx
            |   |-- service
            |   |   |-- demo.js
            |   |-- routes
            |   |   |-- index.js
            |   |-- utils
            |   |   |-- App.test.js
            |   |   |-- serviceWorker.js
            |   |   |-- setupTests.js
            |   |-- view
            |       |-- demo
            |       |   |-- list
            |       |       |-- app.jsx
            |       |-- error
            |       |   |-- 404.jsx
            |       |-- home
            |           |-- app.jsx
            |-- login
                |-- index.jsx

```
#### 技术栈
- [create-react-app](https://github.com/facebook/create-react-app)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [egg.js](https://github.com/eggjs/egg)