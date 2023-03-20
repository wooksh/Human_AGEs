const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cwd = process.cwd()

const app = express();

/* Express application base config */
app.set('views', path.join(cwd, 'views/pages'));
app.set('view engine', 'pug');
//app.set('env', false); // Switch it to production
app.set('x-powered-by', false);
app.set('strict routing', false);

app.locals.basedir = path.join(cwd, 'views');
app.use(express.static(path.join(cwd, 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.css') || path.endsWith('.js')) {
		res.setHeader('Cache-Control', ['public', 'max-age=31536000', 'immutable']);
		res.setHeader('Last-Modified', '');
		res.setHeader('ETag', '');
		res.setHeader('Cookies', '');
      } else {
		res.setHeader('Cache-Control', ['public', 'max-age=0', 'must-revalidate']);

	  }
	},
	etag: true,
    lastModified: true,
	redirect: false,
	dotfiles: 'ignore',
	index: false
}));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ 
	extended: true, limit: "50mb", parameterLimit: 50000 
})); // Enable nested objects in requests

//app.use(cookieParser()); // I should disable it I think
app.use(cors({
    optionsSuccessStatus: 200, // Fix for non-standard devices
    methods: ['GET', 'POST'],
    origin: true, // Can be array; Configure to DNS domains
}));

const { httpMethodsWhitelist, verifyHeader, verifyCredentials } = require('./middleware');

//app.use(verifyCredentials);
app.use(httpMethodsWhitelist);
app.use(verifyHeader);

const routes = require('../routes/index');
app.use('/', routes);

module.exports = app;