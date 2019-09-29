1. npm install antd --save
2. npm install babel-plugin-import --save-dev 
3. npm install react-app-rewired --save-dev
4. npm install customize-cra --save-dev 
5. 修改package.json文件
 ```
 /* package.json */
"scripts": {
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
}
```
6. 然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。
```
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
 fixBabelImports('import', {        
 libraryName: 'antd',        
 libraryDirectory: 'es',       
 style: 'css'
    })
)
```
