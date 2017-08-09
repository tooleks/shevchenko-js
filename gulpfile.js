"use strict";

var gulp = require("gulp");
var replace = require("gulp-replace");
var minify = require("gulp-minify");
var request = require("request");
var fs = require("fs");

gulp.task("load:rules", function () {
    request("https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json")
        .pipe(fs.createWriteStream("./rules.json"));
});

gulp.task("build", function () {
    gulp.src(["./src/shevchenko.js"])
        .pipe(replace("[] /* gulp build:rules */", JSON.stringify(require("./rules"))))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("minify", function () {
    gulp.src("./dist/shevchenko.js")
        .pipe(minify({
            ext: {
                src: ".js",
                min: ".min.js"
            }
        }))
        .pipe(gulp.dest("./dist/"));
});
