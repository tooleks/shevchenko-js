"use strict";

var util = require("./util");
var rules = require("./rules");
var pos = require("./pos");

var assert = util.assert;
var string = util.string;
var inflector = rules.inflector;
var filter = rules.filter;
var sort = rules.sort;

/**
 * Get a male gender name.
 *
 * @type {string}
 */
shevchenko.getGenderNameMale = function () {
  return "male";
};

/**
 * Get a female gender name.
 *
 * @type {string}
 */
shevchenko.getGenderNameFemale = function () {
  return "female";
};

/**
 * Get nominative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameNominative = function () {
  return "nominative";
};

/**
 * Get a genitive case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameGenitive = function () {
  return "genitive";
};

/**
 * Get a dative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameDative = function () {
  return "dative";
};

/**
 * Get an accusative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameAccusative = function () {
  return "accusative";
};

/**
 * Get an ablative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameAblative = function () {
  return "ablative";
};

/**
 * Get a locative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameLocative = function () {
  return "locative";
};

/**
 * Get a vocative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameVocative = function () {
  return "vocative";
};

/**
 * Get an array of rules.
 *
 * @returns {Array<Object>}
 */
shevchenko.getRules = function () {
  var rules = [{ "description": "слово рілля", "examples": ["рілля"], "pos": "noun", "gender": ["male", "female"], "priority": 6, "applications": ["lastName"], "regexp": { "find": "^рілля$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -кріль", "examples": ["кріль"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "кріль$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "чоловіче ім'я лазар", "examples": ["лазар"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "^лазар$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "я" } }], "dative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "append", "value": "ю" } }] } }, { "description": "чоловіче ім'я федір", "examples": ["федір"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": ["firstName"], "regexp": { "find": "^федір$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "слово суддя", "examples": ["суддя"], "pos": "noun", "gender": ["male", "female"], "priority": 6, "applications": ["lastName"], "regexp": { "find": "^суддя$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "жіноче ім'я любов", "examples": ["любов"], "pos": "noun", "gender": ["female"], "priority": 6, "applications": ["firstName"], "regexp": { "find": "^любов$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "і" } }], "dative": [{ "0": { "type": "append", "value": "і" } }], "accusative": [], "ablative": [{ "0": { "type": "append", "value": "'ю" } }], "locative": [{ "0": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)лець", "examples": ["стрілець"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)лець$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(кіт|кріт|пліт|дріт|живіт)", "examples": ["кіт"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "(кіт|кріт|пліт|дріт|живіт)$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -грім", "examples": ["грім"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "грім$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -батіг", "examples": ["батіг"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "батіг$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "зі" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "гу" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)(тверда_приголосна)ець", "examples": ["половець"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ець$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -.міль", "examples": ["хміль"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": ".міль$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }], "vocative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(тверда_приголосна)(тверда_приголосна)ець", "examples": ["жнець"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ець$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "чоловіче ім'я ігор", "examples": ["ігор"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "^ігор$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "я" } }], "dative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "append", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -кінь", "examples": ["кінь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "кінь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "слово сіль", "examples": ["сіль"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": ["lastName"], "regexp": { "find": "^сіль$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "accusative": [], "ablative": [{ "2": { "type": "replace", "value": "лю" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -орел", "examples": ["орел"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "орел$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ові" } }, { "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -.бідь", "examples": ["лебідь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": ".бідь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -.мінь", "examples": ["кремінь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": ".мінь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -куліш", "examples": ["поле"], "pos": "noun", "gender": ["male", "female"], "priority": 5, "applications": [], "regexp": { "find": "куліш$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -сіль", "examples": ["кисіль"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "сіль$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "жіночий рід / на -ова", "examples": ["іванова"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "ова$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -віз", "examples": ["узвіз"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "віз$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -.ків", "examples": ["яків"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": ".ків$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -.(к|р)іп", "examples": ["прокіп"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": ".(к|р)іп$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -піп", "examples": ["прокіп"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "піп$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -рід", "examples": ["рід"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "рід$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ніс", "examples": ["кривоніс"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ніс$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -зір", "examples": ["дивозір"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "зір$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -віл", "examples": ["рябовіл"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "віл$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ріг", "examples": ["пиріг"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ріг$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "зі" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -хід", "examples": ["прихід"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "хід$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "жіночий рід / на -іна", "examples": ["зеленкіна"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "іна$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "чоловічі імена / на -(в|д)ір", "examples": ["дір", "вір"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "(в|д)ір$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -світ", "examples": ["світ"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "світ$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -тер", "examples": ["вітер"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "тер$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)єць", "examples": ["заєць"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)єць$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / жіночий рід / м'яка група / на -ель", "examples": ["нінель", "мішель"], "pos": "noun", "gender": ["female"], "priority": 4, "applications": ["firstName"], "regexp": { "find": "ель$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "і" } }], "dative": [{ "1": { "type": "replace", "value": "і" } }], "accusative": [], "ablative": [{ "0": { "type": "replace", "value": "лл" }, "1": { "type": "replace", "value": "ю" } }], "locative": [{ "1": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ишин", "examples": ["ковалишин"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ишин$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "жіночий рід / на -(тверда_приголосна)ька", "examples": ["ільницька", "сумська"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ька$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(их|аго|ово)", "examples": ["бряних"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "(их|аго|ово)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [], "dative": [], "accusative": [], "ablative": [], "locative": [], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -кіш", "examples": ["розкіш"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "кіш$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ен", "examples": ["семен"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "ен$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -пес", "examples": ["пес"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "пес$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -га", "examples": ["нога"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "га$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }] } }, { "description": "третя відміна / середній рід / на -(подовжена_тверда_приголосна)я", "examples": ["кохання"], "pos": "noun", "gender": ["male", "female"], "priority": 3, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)\\1+я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [], "ablative": [{ "0": { "type": "append", "value": "м" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "я" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ко", "examples": ["марко"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "ко$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "у" } }, { "0": { "type": "replace", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "ові" } }, { "0": { "type": "replace", "value": "у" } }], "vocative": [{ "0": { "type": "replace", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група/ на -ов", "examples": ["павлов"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ов$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -ьо", "examples": ["іваньо", "кузьо"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "ьо$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "м" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда, м'яка група / на -(о|ь|приголосна)", "examples": ["шевченко"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": [], "regexp": { "find": "(о|ь|(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ))$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [], "dative": [], "accusative": [], "ablative": [], "locative": [], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ок", "examples": ["сашок"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "ок$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -е(тверда_прилосона)", "examples": ["марек"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "е(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ів", "examples": ["ковалів"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ів$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "чоловічі по батькові та прізвища / на -ич", "examples": ["валерійович", "риндич"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["middleName", "lastName"], "regexp": { "find": "ич$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "жіночі по батькові / на -на", "examples": ["юріївна"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": ["middleName"], "regexp": { "find": "на$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(тверда_приголосна)я", "examples": ["гмиря"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)я", "examples": ["туя"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ї" } }], "dative": [{ "0": { "type": "replace", "value": "ї" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "єю" } }], "locative": [{ "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "є" } }] } }, { "description": "друга відміна / чоловічий, жіночий роди / м'яка група / на -(і|ь)я", "examples": ["юлія"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(і|ь)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ї" } }], "dative": [{ "0": { "type": "replace", "value": "ї" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "єю" } }], "locative": [{ "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "є" } }] } }, { "description": "друга відміна / чоловічий рід / мішана група / на -(дж|ж|ч|ш)", "examples": ["януш", "джордж"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "(дж|ж|ч|ш)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }, { "0": { "type": "append", "value": "і" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "жіночі імена / на -(тверда_приголосна)я", "examples": ["неля"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": ["firstName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / мішана група / на -а", "examples": ["мойша"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(дж|ж|ч|ш|щ)а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -к", "examples": ["кузик", "мисяк"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "к$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -х", "examples": ["кожух"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "х$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "жіночий рід / на -(тверда_приголосна)а", "examples": ["зелена"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -ле", "examples": ["поле"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ле$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "е" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -ха", "examples": ["старуха"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ха$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "с" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "с" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }, { "1": { "type": "replace", "value": "а" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -ка", "examples": ["прилука"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ка$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "ц" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ц" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }, { "1": { "type": "replace", "value": "а" } }] } }, { "description": "жіночий рід / на -(тверда_приголосна)я", "examples": ["задорожня"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ьої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ьою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий, жіночий рід / тверда група / на -йо", "examples": ["йойо"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "йо$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "append", "value": "ві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "м" } }], "locative": [{ "0": { "type": "append", "value": "ві" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -яр", "examples": ["скляр"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "яр$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "перша відміна / чоловічий, жіночий рід / тверда група / на -(тверда_приголосна)о", "examples": ["петро", "павло"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)о$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "чоловічий рід / на -ий", "examples": ["сухомлинський"], "pos": "adjective", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ий$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ого" } }], "dative": [{ "0": { "type": "replace", "value": "ому" } }], "accusative": [{ "0": { "type": "replace", "value": "ого" } }], "ablative": [{ "0": { "type": "replace", "value": "им" } }], "locative": [{ "0": { "type": "replace", "value": "ому" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -ь", "examples": ["петрунь"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "ь$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / жіночий рід / тверда група / на -(г|ґ)а", "examples": ["ольга"], "pos": "noun", "gender": ["female"], "priority": 1, "applications": [], "regexp": { "find": "(г|ґ)а$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий, жіночий роди / на -е", "examples": ["прізвище"], "pos": "noun", "gender": ["male", "female"], "priority": 1, "applications": [], "regexp": { "find": "е$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "у" } }], "accusative": [], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -й", "examples": ["валерій"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "й$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "єві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "єм" } }], "locative": [{ "0": { "type": "replace", "value": "єві" } }, { "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -а", "examples": ["анна"], "pos": "noun", "gender": ["male", "female"], "priority": 1, "applications": [], "regexp": { "find": "а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(тверда_приголосна)", "examples": ["олександр"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }];
  return rules.slice(0);
};

/**
 * Get an array of gender names.
 *
 * @returns {Array<string>}
 */
shevchenko.getGenderNames = function () {
  var genderNames = [shevchenko.getGenderNameMale(), shevchenko.getGenderNameFemale()];
  return genderNames.slice(0);
};

/**
 * Get an array of case names.
 *
 * @returns {Array<string>}
 */
shevchenko.getCaseNames = function () {
  var caseNames = [shevchenko.getCaseNameNominative(), shevchenko.getCaseNameGenitive(), shevchenko.getCaseNameDative(), shevchenko.getCaseNameAccusative(), shevchenko.getCaseNameAblative(), shevchenko.getCaseNameLocative(), shevchenko.getCaseNameVocative()];
  return caseNames.slice(0);
};

/**
 * Inflect the person's first, last and middle names in a nominative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inNominative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameNominative());
};

/**
 * Inflect the person's first, last and middle names in a genitive case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inGenitive = function (person) {
  return shevchenko(person, shevchenko.getCaseNameGenitive());
};

/**
 * Inflect the person's first, last and middle names in a dative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inDative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameDative());
};

/**
 * Inflect the person's first, last and middle names in an accusative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inAccusative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameAccusative());
};

/**
 * Inflect the person's first, last and middle names in an ablative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inAblative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameAblative());
};

/**
 * Inflect the person's first, last and middle names in a locative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inLocative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameLocative());
};

/**
 * Inflect the person's first, last and middle names in a vocative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inVocative = function (person) {
  return shevchenko(person, shevchenko.getCaseNameVocative());
};

/**
 * Inflect the person's first, last and middle names in all cases.
 *
 * @param {Object} person
 * @return {Object}
 */
shevchenko.inAll = function (person) {
  var results = {};
  shevchenko.getCaseNames().forEach(function (caseName) {
    return results[caseName] = shevchenko(person, caseName);
  });
  return results;
};

/**
 * Inflect the person's first, last and middle names.
 *
 * @example var result = shevchenko({
 *     gender: "male",  // or "female"
 *     lastName: "Шевченко",
 *     firstName: "Тарас",
 *     middleName: "Григорович"
 * }, shevchenko.getCaseNameVocative());
 *
 * @param {Object} person
 * @param {string} caseName
 * @returns {Object}
 */
function shevchenko(person, caseName) {
  assertPersonParameter(person);
  assertCaseNameParameter(caseName);

  var result = {};

  if (typeof person.lastName === "string") {
    var inflectedName = inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
    result.lastName = string.applyCaseMask(person.lastName, inflectedName || person.lastName);
  }

  if (typeof person.firstName === "string") {
    var _inflectedName = inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
    result.firstName = string.applyCaseMask(person.firstName, _inflectedName || person.firstName);
  }

  if (typeof person.middleName === "string") {
    var _inflectedName2 = inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
    result.middleName = string.applyCaseMask(person.middleName, _inflectedName2 || person.middleName);
  }

  return result;
}

/**
 * Validate the person parameter.
 *
 * @param {Object} person
 */
function assertPersonParameter(person) {
  assert.object(person, "Invalid 'person' type.");
  if (!person.hasOwnProperty("gender")) assert.throw("Missed 'person.gender' property.");
  assert.string(person.gender, "Invalid 'person.gender' type.");
  assert.inArray(shevchenko.getGenderNames(), person.gender, "Invalid 'person.gender' value.");
  if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
    assert.throw("Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.");
  }
  if (person.hasOwnProperty("lastName")) assert.string(person.lastName, "Invalid 'person.lastName' type.");
  if (person.hasOwnProperty("firstName")) assert.string(person.firstName, "Invalid 'person.firstName' type.");
  if (person.hasOwnProperty("middleName")) assert.string(person.middleName, "Invalid 'person.middleName' type.");
}

/**
 * Validate the caseName parameter.
 *
 * @param {string} caseName
 */
function assertCaseNameParameter(caseName) {
  assert.string(caseName, "Invalid 'caseName' type.");
  assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid 'caseName' value.");
}

/**
 * Inflect the person's last name.
 *
 * @param {string} gender
 * @param {string} lastName
 * @param {string} caseName
 * @return {string}
 */
function inflectLastName(gender, lastName, caseName) {
  var doubleLastName = lastName.split("-");
  if (doubleLastName.length > 1) {
    return doubleLastName.map(function (lastName) {
      return inflectLastName(gender, lastName, caseName);
    }).join("-");
  }

  var rule = shevchenko.getRules().filter(function (rule) {
    return filter.byGender(rule, gender);
  }).filter(function (rule) {
    return gender === shevchenko.getGenderNameMale() || filter.byPos(rule, pos.recognize(lastName));
  }) // #pos_limits
  .filter(function (rule) {
    return filter.byApplication(rule, "lastName");
  }).filter(function (rule) {
    return filter.byRegexp(rule, lastName);
  }).sort(function (firstRule, secondRule) {
    return sort.rulesByApplicationDesc(firstRule, secondRule, "lastName");
  }).shift();

  return inflector.inflectByRule(rule, caseName, lastName);
}

/**
 * Inflect the person's first name.
 *
 * @param {string} gender
 * @param {string} firstName
 * @param {string} caseName
 * @return {string}
 */
function inflectFirstName(gender, firstName, caseName) {
  var rule = shevchenko.getRules().filter(function (rule) {
    return filter.byGender(rule, gender);
  }).filter(function (rule) {
    return filter.byApplication(rule, "firstName");
  }).filter(function (rule) {
    return filter.byRegexp(rule, firstName);
  }).sort(function (firstRule, secondRule) {
    return sort.rulesByApplicationDesc(firstRule, secondRule, "firstName");
  }).shift();

  return inflector.inflectByRule(rule, caseName, firstName);
}

/**
 * Inflect the person's middle name.
 *
 * @param {string} gender
 * @param {string} middleName
 * @param {string} caseName
 * @return {string}
 */
function inflectMiddleName(gender, middleName, caseName) {
  var rule = shevchenko.getRules().filter(function (rule) {
    return filter.byGender(rule, gender);
  }).filter(function (rule) {
    return filter.byApplication(rule, "middleName", true);
  }).filter(function (rule) {
    return filter.byRegexp(rule, middleName);
  }).sort(function (firstRule, secondRule) {
    return sort.rulesByApplicationDesc(firstRule, secondRule, "middleName");
  }).shift();

  return inflector.inflectByRule(rule, caseName, middleName);
}

module.exports = shevchenko;