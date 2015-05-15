/**
 * Module dependencies
 */
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');
var express        = require('express');
var http           = require('http');
var jwt            = require('jsonwebtoken');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var path           = require('path');

/**
 * Application prototype
 */
var app = express();

/**
 * Application config
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middleware config
 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

/**
 * Define the public folder
 */
var publicFolder = path.join(__dirname, '../browser');
app.use(express.static(publicFolder));

/**
 * Environment configuration
 */
var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  app.use(errorHandler());
}

/**
 * Routes config
 */

app.get(/^.*$/, function(req, res) {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

/**
 * Start the server
 */
app.listen(app.get('port'));
