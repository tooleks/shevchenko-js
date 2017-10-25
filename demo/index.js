"use strict";

require("dotenv").config();

const share = require("./app/social/share-links-provider");
process.env.APP_SHARE_LINK_FACEBOOK = share.facebook();
process.env.APP_SHARE_LINK_TWITTER = share.twitter();
process.env.APP_SHARE_LINK_GOOGLE_PLUS = share.googlePlus();
process.env.APP_SHARE_LINK_LINKED_IN = share.linkedIn();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const mailer = require("./app/mailer");

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

app.post("/contact-me", async (req, res) => {
    if (req.body.name && req.body.email && req.body.message) {
        try {
            const data = await mailer.send({
                from: `${req.body.name} <${req.body.email}>`,
                to: process.env.APP_EMAIL,
                subject: `${process.env.APP_NAME} - Написати автору`,
                html: req.body.message,
            });
            req.flash("flashes", {type: "success", message: "Ваше повідомлення було успішно відправлене."});
        } catch (e) {
            req.flash("flashes", {type: "danger", message: "Виникла помилка при відправці вашого повідомлення."});
        }
        res.redirect("/");
    } else {
        res.redirect("/");
    }
});

app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
