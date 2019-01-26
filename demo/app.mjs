import express from 'express';
import i18n from 'i18n';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import ejs from 'ejs';

import {localesPath} from './paths';
import * as middlewareFactory from './src/http/middleware/factory';
import router from './src/http/routes/router';

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
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser(process.env.APP_SECRET));

app.use(
  session({
    secret: process.env.APP_SECRET,
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(flash());

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(middlewareFactory.utils().handle);
app.use(router);
app.get('*', middlewareFactory.redirectToHome().handle);
app.use(middlewareFactory.errorHandler().handle);

export default app;
