"use strict";

const fs = require("fs");
const gulp = require("gulp");
const request = require("request");

gulp.task("update:rules", () => {
    request("https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json").pipe(
        fs.createWriteStream("./rules/rules.json"),
    );
});
