var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('MongoDB is connected...'));
require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({extended: false})); // get information from html forms

app.set('view engine', 'ejs');

app.use(session({resave: false, saveUninitialized: true, secret: 'secretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log('Server running on ' + port);