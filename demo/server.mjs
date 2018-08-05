import path from "path";
import express from "express";
import i18n from "i18n";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import ejs from "ejs";

import dc from "./src/dc";
import registerRoutes from "./src/http/routes";

const app = express();

const port = process.env.HTTP_PORT || 8080;

i18n.configure({
    locales: ["uk", "en"],
    fallbacks: {
        ru: "uk",
        by: "uk",
    },
    directory: path.resolve("locales"),
    queryParameter: "lang",
    syncFiles: true,
});

app.use(i18n.init);

app.use(express.static("public"));
app.use(express.static("public/meta"));
app.use("/js/shevchenko.umd.min.js", express.static("node_modules/shevchenko/dist/shevchenko.umd.min.js"));

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

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// Register utility middleware.
app.use(dc.middleware.utils.handle);
// Register the application routes.
registerRoutes(app, dc);
// Redirect not registered routes to the home page.
app.get("*", dc.middleware.redirectToHome.handle);
// Register HTTP error handler.
app.use(dc.middleware.errorHandler.handle);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
