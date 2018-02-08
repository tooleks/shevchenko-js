"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var rules = require("./rules");
var pos = require("./pos");

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
 * @return {Array<object>}
 */
shevchenko.getRules = function () {
    var rules = [{ "description": "слово рілля", "examples": ["рілля"], "pos": "noun", "gender": ["male", "female"], "priority": 6, "applications": ["lastName"], "regexp": { "find": "^рілля$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -сокіл", "examples": ["сокіл"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "сокіл$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "жіноче ім'я любов", "examples": ["любов"], "pos": "noun", "gender": ["female"], "priority": 6, "applications": ["firstName"], "regexp": { "find": "^любов$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "і" } }], "dative": [{ "0": { "type": "append", "value": "і" } }], "accusative": [], "ablative": [{ "0": { "type": "append", "value": "'ю" } }], "locative": [{ "0": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "чоловічі імена федір, сидір", "examples": ["федір", "сидір"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": ["firstName"], "regexp": { "find": "^(федір|сидір)$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "слово суддя", "examples": ["суддя"], "pos": "noun", "gender": ["male", "female"], "priority": 6, "applications": ["lastName"], "regexp": { "find": "^суддя$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -кріль", "examples": ["кріль"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "кріль$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)лець", "examples": ["стрілець"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)лець$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ь" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(к|п|кр|пл|др|жив)іт", "examples": ["кіт", "кріт"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "(к|п|кр|пл|др|жив)іт$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -грім", "examples": ["грім"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "грім$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(дзвін|хрін)", "examples": ["дзвін"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "(дзвін|хрін)$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -батіг", "examples": ["батіг"], "pos": "noun", "gender": ["male"], "priority": 6, "applications": [], "regexp": { "find": "батіг$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "зі" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "гу" } }] } }, { "description": "слово сіль", "examples": ["сіль"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": ["lastName"], "regexp": { "find": "^сіль$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "accusative": [], "ablative": [{ "2": { "type": "replace", "value": "лю" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -куліш", "examples": ["куліш"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "куліш$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(тверда_приголосна)(тверда_приголосна)е(ц|н)ь", "examples": ["жнець"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)е(ц|н)ь$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -кінь", "examples": ["кінь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "кінь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "чоловічі імена ігор, лазар", "examples": ["ігор", "лазар"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "^(ігор|лазар)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "я" } }], "dative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "ю" } }, { "0": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "append", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -сіль", "examples": ["кисіль"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "сіль$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(рід|плід)", "examples": ["рід", "плід"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(рід|плід)$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -.бідь", "examples": ["лебідь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": ".бідь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(з|яв)ір", "examples": ["дивозір", "явір"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(з|яв)ір$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -.мінь", "examples": ["кремінь"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": ".мінь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "е" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -орел", "examples": ["орел"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "орел$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ові" } }, { "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "л" }, "1": { "type": "replace", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -якір", "examples": ["якір"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "якір$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ю" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ю" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)(тверда_приголосна)е(ц|н)ь", "examples": ["половець"], "pos": "noun", "gender": ["male"], "priority": 5, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)е(ц|н)ь$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(голосна)єць", "examples": ["заєць"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "(а|о|у|е|и|і)єць$", "modify": "(.{1})(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "й" }, "2": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -світ", "examples": ["світ"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "світ$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -тер", "examples": ["вітер"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "тер$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -віз", "examples": ["узвіз"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "віз$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -.ків", "examples": ["яків"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": ".ків$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -.(к|р)іп", "examples": ["прокіп"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": ".(к|р)іп$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -піп", "examples": ["прокіп"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "піп$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(аго|ово)", "examples": ["живаго"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "(аго|ово)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [], "dative": [], "accusative": [], "ablative": [], "locative": [], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ишин", "examples": ["ковалишин"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ишин$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ніс", "examples": ["кривоніс"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ніс$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "чоловічі імена / на -(в|д)ір", "examples": ["дір", "вір"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "(в|д)ір$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -віл", "examples": ["рябовіл"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "віл$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ріг", "examples": ["пиріг"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "ріг$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "replace", "value": "зі" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -хід", "examples": ["прихід"], "pos": "noun", "gender": ["male"], "priority": 4, "applications": [], "regexp": { "find": "хід$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "і" } }, { "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "жіночий рід / на -(тверда_приголосна)ька", "examples": ["ільницька", "сумська"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ька$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "друга відміна / жіночий рід / м'яка група / на -ель", "examples": ["нінель", "мішель"], "pos": "noun", "gender": ["female"], "priority": 4, "applications": ["firstName"], "regexp": { "find": "ель$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "і" } }], "dative": [{ "1": { "type": "replace", "value": "і" } }], "accusative": [], "ablative": [{ "0": { "type": "replace", "value": "лл" }, "1": { "type": "replace", "value": "ю" } }], "locative": [{ "1": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "жіночий рід / на -ова", "examples": ["іванова"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "ова$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "жіночий рід / на -іна", "examples": ["зеленкіна"], "pos": "adjective", "gender": ["female"], "priority": 4, "applications": ["lastName"], "regexp": { "find": "іна$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -е(в|н)", "examples": ["семен", "лев"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "е(в|н)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "чоловічий рід / на -кій (помилкова транслітерація)", "examples": ["дідківській"], "pos": "adjective", "gender": ["male"], "priority": 3, "applications": ["lastName"], "regexp": { "find": "кій$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ого" } }], "dative": [{ "0": { "type": "replace", "value": "ому" } }], "accusative": [{ "0": { "type": "replace", "value": "ого" } }], "ablative": [{ "0": { "type": "replace", "value": "им" } }], "locative": [{ "0": { "type": "replace", "value": "ому" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -га", "examples": ["нога"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "га$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -кіш", "examples": ["розкіш"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "кіш$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "о" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -ьо", "examples": ["іваньо", "кузьо"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "ьо$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "м" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }], "vocative": [] } }, { "description": "множина / на -их", "examples": ["седих"], "pos": "adjective", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "их$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [], "dative": [], "accusative": [], "ablative": [], "locative": [], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -пес", "examples": ["пес"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "пес$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ко", "examples": ["марко"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "ко$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "у" } }, { "0": { "type": "replace", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "ові" } }, { "0": { "type": "replace", "value": "у" } }], "vocative": [{ "0": { "type": "replace", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -ий", "examples": ["батий"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "ий$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "єм" } }], "locative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -йо", "examples": ["йойо"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "йо$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "append", "value": "ві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "append", "value": "м" } }], "locative": [{ "0": { "type": "append", "value": "ві" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -бо", "examples": ["голембо"], "pos": "noun", "gender": ["male"], "priority": 3, "applications": [], "regexp": { "find": "бо$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -яр", "examples": ["скляр"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "яр$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "жіночі по батькові / на -на", "examples": ["юріївна"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": ["middleName"], "regexp": { "find": "на$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "чоловічі по батькові та прізвища / на -ич", "examples": ["валерійович", "риндич"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["middleName", "lastName"], "regexp": { "find": "ич$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / жіночий рід / тверда, м'яка група / на -(о|ь|тверда_приголосна)", "examples": ["шевченко"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": [], "regexp": { "find": "(о|ь|(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ))$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [], "dative": [], "accusative": [], "ablative": [], "locative": [], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ок", "examples": ["сашок"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "ок$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }, { "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "" }, "1": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -е(тверда_прилосона)", "examples": ["марек"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "е(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "чоловічий рід / на -ой, -ий", "examples": ["толстой", "сухомлинський"], "pos": "adjective", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "(ой|ий)$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ого" } }], "dative": [{ "0": { "type": "replace", "value": "ому" } }], "accusative": [{ "0": { "type": "replace", "value": "ого" } }], "ablative": [{ "0": { "type": "replace", "value": "им" } }], "locative": [{ "0": { "type": "replace", "value": "ому" } }], "vocative": [] } }, { "description": "жіночий рід / на -(тверда_приголосна)я", "examples": ["задорожня"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ьої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ьою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "жіночі імена / на -(тверда_приголосна)я", "examples": ["неля"], "pos": "noun", "gender": ["female"], "priority": 2, "applications": ["firstName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -(тверда_приголосна)я", "examples": ["гмиря"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "чоловічі імена / на -ня", "examples": ["женя"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["firstName"], "regexp": { "find": "ня$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / мішана група / на -(дж|ж|ч|ш)", "examples": ["януш", "джордж"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "(дж|ж|ч|ш)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "еві" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ем" } }], "locative": [{ "0": { "type": "append", "value": "еві" } }, { "0": { "type": "append", "value": "і" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група/ на -ов", "examples": ["павлов"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ов$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / мішана група / на -а", "examples": ["мойша"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "(дж|ж|ч|ш|щ)а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "і" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ею" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -к", "examples": ["кузик", "мисяк"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "к$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -х", "examples": ["кожух"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "х$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }], "vocative": [{ "0": { "type": "append", "value": "у" } }] } }, { "description": "чоловічий рід / на -ій", "examples": ["заболотній"], "pos": "adjective", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ій$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ього" } }], "dative": [{ "0": { "type": "replace", "value": "ьому" } }], "accusative": [{ "0": { "type": "replace", "value": "ього" } }], "ablative": [{ "0": { "type": "replace", "value": "ім" } }], "locative": [{ "0": { "type": "replace", "value": "ьому" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -ле", "examples": ["поле"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ле$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "е" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -ів", "examples": ["ковалів"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ів$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "им" } }], "locative": [{ "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -ха", "examples": ["старуха"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ха$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "с" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "с" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }, { "1": { "type": "replace", "value": "а" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -ка", "examples": ["прилука"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "ка$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "ц" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ц" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }, { "1": { "type": "replace", "value": "а" } }] } }, { "description": "жіночий рід / на -(тверда_приголосна)а", "examples": ["зелена"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "перша відміна / чоловічий рід / тверда група / на -(тверда_приголосна)о", "examples": ["петро", "павло"], "pos": "noun", "gender": ["male"], "priority": 2, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)о$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "а" } }], "dative": [{ "0": { "type": "replace", "value": "у" } }], "accusative": [{ "0": { "type": "replace", "value": "а" } }], "ablative": [{ "0": { "type": "replace", "value": "ом" } }], "locative": [{ "0": { "type": "replace", "value": "ові" } }], "vocative": [{ "0": { "type": "replace", "value": "е" } }] } }, { "description": "жіночий рід / на -яя", "examples": ["заболотняя"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "яя$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ьої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "ьою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "жіночий рід / на -ая", "examples": ["толстая"], "pos": "adjective", "gender": ["female"], "priority": 2, "applications": ["lastName"], "regexp": { "find": "ая$", "modify": "(.{2})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ої" } }], "dative": [{ "0": { "type": "replace", "value": "ій" } }], "accusative": [{ "0": { "type": "replace", "value": "ую" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "ій" } }], "vocative": [] } }, { "description": "друга відміна / чоловічий, жіночий роди / м'яка група / на -(голосна|ь|й)я", "examples": ["юлія", "майя"], "pos": "noun", "gender": ["male", "female"], "priority": 2, "applications": [], "regexp": { "find": "((а|о|у|е|и|і)|ь|й)я$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "ї" } }], "dative": [{ "0": { "type": "replace", "value": "ї" } }], "accusative": [{ "0": { "type": "replace", "value": "ю" } }], "ablative": [{ "0": { "type": "replace", "value": "єю" } }], "locative": [{ "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "є" } }] } }, { "description": "перша відміна / жіночий рід / тверда група / на -(г|ґ)а", "examples": ["ольга"], "pos": "noun", "gender": ["female"], "priority": 1, "applications": [], "regexp": { "find": "(г|ґ)а$", "modify": "(.{1})(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "1": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "accusative": [{ "1": { "type": "replace", "value": "у" } }], "ablative": [{ "1": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "з" }, "1": { "type": "replace", "value": "і" } }], "vocative": [{ "1": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -ь", "examples": ["петрунь"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "ь$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "ем" } }], "locative": [{ "0": { "type": "replace", "value": "еві" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "друга відміна / чоловічий рід / м'яка група / на -й", "examples": ["валерій"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "й$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "я" } }], "dative": [{ "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "єві" } }], "accusative": [{ "0": { "type": "replace", "value": "я" } }], "ablative": [{ "0": { "type": "replace", "value": "єм" } }], "locative": [{ "0": { "type": "replace", "value": "єві" } }, { "0": { "type": "replace", "value": "ю" } }, { "0": { "type": "replace", "value": "ї" } }], "vocative": [{ "0": { "type": "replace", "value": "ю" } }] } }, { "description": "перша відміна / чоловічий, жіночий роди / тверда група / на -а", "examples": ["анна"], "pos": "noun", "gender": ["male", "female"], "priority": 1, "applications": [], "regexp": { "find": "а$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "replace", "value": "и" } }], "dative": [{ "0": { "type": "replace", "value": "і" } }], "accusative": [{ "0": { "type": "replace", "value": "у" } }], "ablative": [{ "0": { "type": "replace", "value": "ою" } }], "locative": [{ "0": { "type": "replace", "value": "і" } }], "vocative": [{ "0": { "type": "replace", "value": "о" } }] } }, { "description": "друга відміна / чоловічий рід / тверда група / на -(тверда_приголосна)", "examples": ["олександр"], "pos": "noun", "gender": ["male"], "priority": 1, "applications": [], "regexp": { "find": "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$", "modify": "(.{1})$" }, "cases": { "nominative": [], "genitive": [{ "0": { "type": "append", "value": "а" } }], "dative": [{ "0": { "type": "append", "value": "у" } }, { "0": { "type": "append", "value": "ові" } }], "accusative": [{ "0": { "type": "append", "value": "а" } }], "ablative": [{ "0": { "type": "append", "value": "ом" } }], "locative": [{ "0": { "type": "append", "value": "ові" } }, { "0": { "type": "append", "value": "у" } }], "vocative": [{ "0": { "type": "append", "value": "е" } }] } }];
    return rules.slice(0);
};

/**
 * Get an array of gender names.
 *
 * @return {Array<string>}
 */
shevchenko.getGenderNames = function () {
    var genderNames = [shevchenko.getGenderNameMale(), shevchenko.getGenderNameFemale()];
    return genderNames.slice(0);
};

/**
 * Get an array of case names.
 *
 * @return {Array<string>}
 */
shevchenko.getCaseNames = function () {
    var caseNames = [shevchenko.getCaseNameNominative(), shevchenko.getCaseNameGenitive(), shevchenko.getCaseNameDative(), shevchenko.getCaseNameAccusative(), shevchenko.getCaseNameAblative(), shevchenko.getCaseNameLocative(), shevchenko.getCaseNameVocative()];
    return caseNames.slice(0);
};

/**
 * Inflect the person's first, last and middle names in a nominative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inNominative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameNominative());
};

/**
 * Inflect the person's first, last and middle names in a genitive case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inGenitive = function (person) {
    return shevchenko(person, shevchenko.getCaseNameGenitive());
};

/**
 * Inflect the person's first, last and middle names in a dative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inDative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameDative());
};

/**
 * Inflect the person's first, last and middle names in an accusative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAccusative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameAccusative());
};

/**
 * Inflect the person's first, last and middle names in an ablative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAblative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameAblative());
};

/**
 * Inflect the person's first, last and middle names in a locative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inLocative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameLocative());
};

/**
 * Inflect the person's first, last and middle names in a vocative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inVocative = function (person) {
    return shevchenko(person, shevchenko.getCaseNameVocative());
};

/**
 * Inflect the person's first, last and middle names in all cases.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAll = function (person) {
    return shevchenko.getCaseNames().reduce(function (results, caseName) {
        results[caseName] = shevchenko(person, caseName);
        return results;
    }, {});
};

/**
 * Inflect the person's first, last and middle names.
 *
 * @param {object} person
 * @param {string} caseName
 * @return {object}
 */
function shevchenko(person, caseName) {
    validateInput({ person: person, caseName: caseName });

    var result = {};

    if (person.hasOwnProperty("lastName")) {
        result.lastName = getInflectionFunctions()["lastName"](person.lastName, person.gender, caseName);
    }

    if (person.hasOwnProperty("firstName")) {
        result.firstName = getInflectionFunctions()["firstName"](person.firstName, person.gender, caseName);
    }

    if (person.hasOwnProperty("middleName")) {
        result.middleName = getInflectionFunctions()["middleName"](person.middleName, person.gender, caseName);
    }

    return result;
}

/**
 * Validate the library input data.
 *
 * @param {object} input
 * @return {void}
 */
function validateInput(input) {
    if (_typeof(input.person) !== "object") {
        throw new Error("Invalid 'person' type.");
    }

    if (!input.person.hasOwnProperty("gender")) {
        throw new Error("Missed 'person.gender' property.");
    }

    if (typeof input.person.gender !== "string") {
        throw new Error("Invalid 'person.gender' type.");
    }

    if (shevchenko.getGenderNames().indexOf(input.person.gender) === -1) {
        throw new Error("Invalid 'person.gender' value.");
    }

    if (!input.person.hasOwnProperty("firstName") && !input.person.hasOwnProperty("middleName") && !input.person.hasOwnProperty("lastName")) {
        throw new Error("Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.");
    }

    if (input.person.hasOwnProperty("lastName") && typeof input.person.lastName !== "string") {
        throw new Error("Invalid 'person.lastName' type.");
    }

    if (input.person.hasOwnProperty("firstName") && typeof input.person.firstName !== "string") {
        throw new Error("Invalid 'person.firstName' type.");
    }

    if (input.person.hasOwnProperty("middleName") && typeof input.person.middleName !== "string") {
        throw new Error("Invalid 'person.middleName' type.");
    }

    if (typeof input.caseName !== "string") {
        throw new Error("Invalid 'caseName' type.");
    }

    if (shevchenko.getCaseNames().indexOf(input.caseName) === -1) {
        throw new Error("Invalid 'caseName' value.");
    }
}

/**
 * Get inflection functions for anthroponyms.
 *
 * @return {object}
 */
function getInflectionFunctions() {
    return {
        /**
         * Inflect the person's last name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        lastName: function lastName(name, gender, caseName) {
            return mapNameParts(name, function (name, index, length) {
                // If the first (on practice, not the last) short part of the compound last name has only one vowel,
                // it is not perceived as an independent surname and returned "as is".
                var isLastSegment = index === length - 1;
                var vowels = name.toLowerCase().match(/(а|о|у|е|и|і|я|ю|є|ї)/g);
                var hasOneVowel = vowels && vowels.length === 1;
                if (!isLastSegment && hasOneVowel) {
                    return name;
                }

                // Get the most suitable inflection rule.
                var rule = shevchenko.getRules().filter(function (rule) {
                    return rules.filter.byGender(rule, gender) && rules.filter.byApplication(rule, "lastName") && rules.filter.byRegexp(rule, name) && rules.filter.byPos(rule, pos.recognize(gender, name));
                }).sort(function (firstRule, secondRule) {
                    return rules.sort.rulesByApplication(firstRule, secondRule, "lastName");
                }).shift();

                // If no inflection rule found, return last name "as is".
                if (typeof rule === "undefined") {
                    return name;
                }

                // Inflect last name by inflection rule.
                return rules.inflector.inflectByRule(rule, caseName, name);
            });
        },
        /**
         * Inflect the person's first name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        firstName: function firstName(name, gender, caseName) {
            return mapNameParts(name, function (name) {
                // Get the most suitable inflection rule.
                var rule = shevchenko.getRules().filter(function (rule) {
                    return rules.filter.byGender(rule, gender) && rules.filter.byApplication(rule, "firstName") && rules.filter.byRegexp(rule, name);
                }).sort(function (firstRule, secondRule) {
                    return rules.sort.rulesByApplication(firstRule, secondRule, "firstName");
                }).shift();

                // If no inflection rule found, return first name "as is".
                if (typeof rule === "undefined") {
                    return name;
                }

                // Inflect first name by inflection rule.
                return rules.inflector.inflectByRule(rule, caseName, name);
            });
        },
        /**
         * Inflect the person's middle name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        middleName: function middleName(name, gender, caseName) {
            return mapNameParts(name, function (name) {
                // Get the most suitable inflection rule.
                var rule = shevchenko.getRules().filter(function (rule) {
                    return rules.filter.byGender(rule, gender) && rules.filter.byApplication(rule, "middleName", true) && rules.filter.byRegexp(rule, name);
                }).sort(function (firstRule, secondRule) {
                    return rules.sort.rulesByApplication(firstRule, secondRule, "middleName");
                }).shift();

                // If no inflection rule found, return middle name "as is".
                if (typeof rule === "undefined") {
                    return name;
                }

                // Inflect middle name by inflection rule.
                return rules.inflector.inflectByRule(rule, caseName, name);
            });
        }
    };
}

/**
 * Create a new compound name with the results of calling a provided function on every part in the compound name.
 *
 * For example, the compound last name "Нечуй-Левицький" includes two parts "Нечуй" and "Левицький" divided by a delimiter "-".
 *
 * @param {string} name
 * @param {function} callback
 * @param {string} delimiter
 * @return {string}
 */
function mapNameParts(name, callback) {
    var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "-";

    var parts = name.split(delimiter);
    return parts.map(function (part, index) {
        return callback(part, index, parts.length);
    }).join(delimiter);
}

module.exports = shevchenko;