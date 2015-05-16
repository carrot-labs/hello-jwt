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
 * JWT config
 */
var secret = 'topsecret';

app.post('/auth', function(req, res) {
  if(!(req.body.username === 'gui' && req.body.password === '123')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    firstName: 'Guilherme',
    lastName: 'Coelho',
    email: 'guilhermervcoelho@gmail.com',
    id: 123
  };

  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
});

/**
 * Routes config
 */

app.get('/api/users', function(req, res) {
  var users = [{
    name: 'Sam',
    age: 20,
    salary: 4000
  }, {
    name: 'Gui',
    age: 19,
    salary: 3000
  }, {
    name: 'Murilex',
    age: 20,
    salary: 789
  }, {
    name: 'Lidi',
    age: 29,
    salary: 3000
  }];

  res.json(users);
});

app.get('*', function(req, res) {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

/**
 * Start the server
 */
app.listen(app.get('port'));
