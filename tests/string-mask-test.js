"use strict";

const assert = require("assert");
const util = require("../src/util");

describe("#util.string.applyCaseMask() general", function () {
    describe("util.string.applyCaseMask()", function () {
        it("should return a valid string mask for \"Нечуй-Левицький\"", function () {
            assert(util.string.applyCaseMask("Нечуй-Левицький", "нечуєві-левицькому") === "Нечуєві-Левицькому");
            assert(util.string.applyCaseMask("Анна-Марія", "анною-марією") === "Анною-Марією");
        });

        it("should return a valid string mask for \"Анна-Марія\"", function () {
            assert(util.string.applyCaseMask("Анна-Марія", "анною-марією") === "Анною-Марією");
        });
    });
});
