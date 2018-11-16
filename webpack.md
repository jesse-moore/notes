# Webpack
## References
* https://webpack.js.org/guides/
* https://webpack.js.org/concepts/
* https://www.npmjs.com/package/webpack
## Installation
```bash
npm install -g webpack
```
## Initialization
> package.json
```js
{
  "name": "empty-project-",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "clean": "rm dist/bundle.js",
    "build-dev": "webpack -d --mode development",
    "build-prod": "webpack -p --mode production"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"
  }
}
```

> webpack.config.js
```js
const webpack = require('webpack');
const path = require('path');
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
module.exports = config;
```
# Loaders
## Style Loading
### Dependencies
* [css-loader](https://github.com/webpack-contrib/css-loader) - Collects all referenced css files and bundles them into a string.
* [style-loader](https://github.com/webpack-contrib/css-loader) - Injects the bundled string into the bundled index file inside of a `<style>` tag.
### Use

# Plugins
## [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
* [Extensions](https://survivejs.com/webpack/developing/getting-started/#htmlwebpackplugin-extensions)
## [webpack-merge](https://github.com/survivejs/webpack-merge)

# webpack-dev-server
## References
* https://www.npmjs.com/package/webpack-dev-server
* https://webpack.js.org/configuration/dev-server/
* https://survivejs.com/webpack/developing/webpack-dev-server/

## Installation
`npm install webpack-dev-server --save-dev`
## Usage
[webpack-dev-server CLI](https://webpack.js.org/api/cli/)

Define a package.json script
```js
"scripts": {
  "start:dev": "webpack-dev-server"
}
```
Start the dev server on localhost:8080 with this command:

`npm run start:dev`
      