## Setup
```bash
mkdir project_name #Create project_name directory
npm init #Create package.json file in project_name directory 
npm install --save express #Install express in project_name directory
npm i express-generator --save-dev
URL: https://expressjs.com/en/starter/generator.html
express --view=hbs -hbs --git
```

### Create project_name.js file, index.js is default
```js
const express = require('express');

const app = express();
```

## Middleware
```js
app.use((req, res, next) => {
	console.log(Date.now());
	next();
});

// Index Route
app.get('/', (req, res) => {
	res.send('INDEX');
});

// About Route
app.get('/about', (req, res) => {
	res.send('ABOUT');
});

const port = 5000;

app.listen(port, () =>{
	console.log(`Server started on port ${port}`);
});
```

## Additional Node Modules and Resources
* https://expressjs.com/
* http://handlebarsjs.com/
* https://github.com/ericf/express-handlebars
* https://github.com/expressjs/method-override
* http://mongoosejs.com/
* https://github.com/Automattic/mongoose
* https://github.com/expressjs/body-parser
* https://github.com/expressjs/session
* https://github.com/jaredhanson/connect-flash
* http://www.passportjs.org/