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
  "name": "App Name",
  "version": "1.0.0",
  "description": "Description",
  "main": "app.js",
  "scripts": {
    "start": "webpack-dev-server --entry ./src/js/app.js --output-filename ./dist/bundle.js",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.2.1"
  },
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^6.4.1",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.0",
    "style-loader": "^0.16.1"
  }
};
```

> webpack.config.js
```js
const webpack = require('webpack');
const config = {
  entry: './src/js/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
module.exports = config;
```
# webpack-dev-server
## References
* https://www.npmjs.com/package/webpack-dev-server
* https://webpack.js.org/configuration/dev-server/

## Installation
`npm install webpack-dev-server --save-dev`
## Usage
[webpack-dev-server CLI](https://github.com/webpack/docs/wiki/cli)

Define a package.json script
```js
"scripts": {
  "start:dev": "webpack-dev-server"
}
```
Start the dev server on localhost:8080 with this command:

`npm run start:dev`


