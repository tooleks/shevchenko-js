"use strict";

const assert = require("assert");
const utils = require("../src/utils");

describe("#utils.string.applyCaseMask() general", function () {
    describe("utils.string.applyCaseMask()", function () {
        it("should return a valid string mask for 'Нечуй-Левицький'", function () {
            assert(utils.string.applyCaseMask("Нечуй-Левицький", "нечуєві-левицькому") === "Нечуєві-Левицькому");
        });

        it("should return a valid string mask for 'НечуЙ-ЛевицькиЙ'", function () {
            assert(utils.string.applyCaseMask("НечуЙ-ЛевицькиЙ", "нечуєві-левицькому") === "НечуЄВІ-ЛевицькоМУ");
        });
    });
});
