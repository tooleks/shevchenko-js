import path from "path";
import express from "express";
import i18n from "i18n";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import {errorHandler, redirectToHome, utils} from "./src/http/middleware";
import {contactMeController, homeController} from "./src/http";

const app = express();

const port = process.env.HTTP_PORT || 8080;

i18n.configure({
    locales: ["uk", "en"],
    fallbacks: {
        ru: "uk",
        by: "uk",
    },
    directory: path.join(__dirname, "locales"),
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

app.use(utils.handle);
app.get("/", homeController.index);
app.post("/contact-me", contactMeController.send);
app.get("*", redirectToHome.handle);
app.use(errorHandler.handle);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
