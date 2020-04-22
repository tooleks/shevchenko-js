const path = require('path');
const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const ejs = require('ejs');
const middleware = require('./http/middleware/factory');
const router = require('./http/routes');

const app = express();

app.use(express.static('public'));
app.use(express.static('public/meta'));
app.use('/js/shevchenko.bundle.min.js', express.static(path.join(__dirname, '../dist/shevchenko.bundle.min.js')));

i18n.configure({
  locales: ['uk', 'en'],
  fallbacks: {
    ru: 'uk',
    by: 'uk',
  },
  directory: path.join(__dirname, '../locales'),
  queryParameter: 'lang',
  syncFiles: true,
});

app.use(i18n.init);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.APP_SECRET));

app.use(session({
  secret: process.env.APP_SECRET,
  cookie: { maxAge: 60 * 1000 },
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

app.set('views', path.join(__dirname, '../views'))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(middleware.configureRequest());
app.use(router);
app.get('*', middleware.redirectToHome());
app.use(middleware.errorHandler());

module.exports = app;
