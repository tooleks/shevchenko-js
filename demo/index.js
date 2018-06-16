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
    fallbacks: {
        ru: "uk",
        by: "uk",
    },
    directory: __dirname + "/locales",
    queryParameter: "lang",
    syncFiles: true,
});

app.use(i18n.init);

app.use(express.static("public"));
app.use(express.static("public/meta"));
app.use("/js/shevchenko.min.js", express.static("node_modules/shevchenko/dist/bundle/shevchenko.min.js"));

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

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(middleware);

app.get("/", (req, res) => {
    res.render("home.ejs", {flashes: req.flash("flashes")});
});

app.post("/contact-me", async (req, res) => {
    const from = `${req.body.name} <${req.body.email}>`;
    const to = process.env.APP_EMAIL;
    const subject = `${process.env.APP_NAME} - ${req.__("contact-me")}`;
    const text = req.body.message;

    try {
        await mailer.send({from, to, subject, text});
        req.flash("flashes", {type: "success", message: req.__("contact-me-form-success-alert")});
    } catch (e) {
        req.flash("flashes", {type: "danger", message: req.__("contact-me-form-fail-alert")});
    }

    res.redirect(req.generateUrl("/"));
});

app.get("*", (req, res) => {
    res.redirect(req.generateUrl("/"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
