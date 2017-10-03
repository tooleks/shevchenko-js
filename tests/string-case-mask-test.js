"use strict";

const assert = require("assert");
const util = require("../src/util");

describe("#util.string.applyCaseMask() general", function () {
    describe("util.string.applyCaseMask()", function () {
        it("should return a valid string mask for 'Нечуй-Левицький'", function () {
            assert(util.string.applyCaseMask("Нечуй-Левицький", "нечуєві-левицькому") === "Нечуєві-Левицькому");
        });

        it("should return a valid string mask for 'НечуЙ-ЛевицькиЙ'", function () {
            assert(util.string.applyCaseMask("НечуЙ-ЛевицькиЙ", "нечуєві-левицькому") === "НечуЄВІ-ЛевицькоМУ");
        });
    });
});
