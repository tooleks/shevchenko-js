'use strict';

const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const ejs = require('ejs');

const { localesPath } = require('./paths');
const middlewareFactory = require('./src/http/middleware/factory');
const router = require('./src/http/routes/router');

const app = express();

i18n.configure({
  locales: ['uk', 'en'],
  fallbacks: {
    ru: 'uk',
    by: 'uk',
  },
  directory: localesPath,
  queryParameter: 'lang',
  syncFiles: true,
});

app.use(i18n.init);

app.use(express.static('public'));
app.use(express.static('public/meta'));
app.use('/js/shevchenko.umd.min.js', express.static('node_modules/shevchenko/dist/shevchenko.umd.min.js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.APP_SECRET));

app.use(
  session({
    secret: process.env.APP_SECRET,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(flash());

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(middlewareFactory.utils());
app.use(router);
app.get('*', middlewareFactory.redirectToHome());
app.use(middlewareFactory.errorHandler());

module.exports = app;
