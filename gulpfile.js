"use strict";

const fs = require("fs");
const gulp = require("gulp");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const browserify = require("gulp-browserify");
const minify = require("gulp-minify");
const request = require("request");
const macro = require("./macro");

gulp.task("update:rules", () => {
    request("https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json")
        .pipe(fs.createWriteStream("./rules.json"));
});

gulp.task("clear:module", () => {
    return gulp.src("./dist/module/", {read: false})
        .pipe(clean());
});

gulp.task("clear:bundle", () => {
    return gulp.src("./dist/bundle/", {read: false})
        .pipe(clean());
});

gulp.task("build:module", () => {
    const task = gulp.src("./src/**/*.js");
    for (let macroName in macro) {
        if (macro.hasOwnProperty(macroName)) {
            task.pipe(replace(macroName, macro[macroName]));
        }
    }
    return task
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(gulp.dest("./dist/module/"));
});

gulp.task("build:bundle", () => {
    return gulp.src("./dist/module/shevchenko.js")
        .pipe(browserify({
            insertGlobals: true,
            standalone: "shevchenko",
        }))
        .pipe(minify({
            ext: {min: ".min.js"},
            noSource: true,
        }))
        .pipe(gulp.dest("./dist/bundle/"));
});
