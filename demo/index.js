require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.HTTP_PORT || 8080;

app.use(express.static("public"));
app.use(express.static("public/meta"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.render("home.ejs", {
        env: process.env,
        message: "Hello there!"
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
