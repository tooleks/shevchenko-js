"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const Mailgun = require("mailgun-js");

const mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const port = process.env.HTTP_PORT || 8080;

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

app.get("/", (req, res) => {
    res.render("home.ejs", {flashes: req.flash("flashes")});
});

app.post("/contact-me", (req, res) => {
    if (req.body.name && req.body.email && req.body.message) {
        mailgun.messages().send({
            from: `${req.body.name} <${req.body.email}>`,
            to: process.env.APP_EMAIL,
            subject: `${process.env.APP_NAME} - Написати автору`,
            html: req.body.message,
        }, (err, body) => {
            if (err) {
                req.flash("flashes", {
                    type: "danger",
                    message: "Виникла помилка при відправці вашого повідомлення. Спробуйте ще раз згодом.",
                });
            } else {
                req.flash("flashes", {
                    type: "success",
                    message: "Ваше повідомлення було успішно відправлене.",
                });
            }
            res.redirect("/");
        });
    }
});

app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
