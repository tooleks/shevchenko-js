"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const i18n = require("i18n");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const mailer = require("./app/services/mailer");
const middleware = require("./app/http/middleware");

const port = process.env.HTTP_PORT || 8080;

i18n.configure({
    locales: ["uk", "en"],
    defaultLocale: "uk",
    directory: __dirname + "/locales",
    queryParameter: "lang",
    syncFiles: true,
});

app.use(i18n.init);

app.use(express.static("public"));
app.use(express.static("public/meta"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser(process.env.APP_SECRET));

app.use(session({
    secret: process.env.APP_SECRET,
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(middleware.currentUrlProvider);
app.use(middleware.shareUrlProvider);
app.use(middleware.languageSwitcherProvider);

app.get("/", (req, res) => {
    res.render("home.ejs", {flashes: req.flash("flashes")});
});

app.post("/contact-me", async (req, res) => {
    try {
        await mailer.send({
            from: `${req.body.name} <${req.body.email}>`,
            to: process.env.APP_EMAIL,
            subject: `${process.env.APP_NAME} - ${i18n.__("contact-me")}`,
            html: req.body.message,
        });
        req.flash("flashes", {type: "success", message: i18n.__("contact-me-form-success-alert")});
    } catch (e) {
        req.flash("flashes", {type: "danger", message: i18n.__("contact-me-form-fail-alert")});
    }

    res.redirect("/");
});

app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
