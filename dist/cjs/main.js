/* shevchenko v1.2.0, Copyright (c) 2020 Oleksandr Tolochko <tooleks@gmail.com>, License: MIT */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var synaptic = _interopDefault(require('synaptic'));

var NeuralNetworkParameters = {
    InputLayerSize: 360,
    HiddenLayerSize: 20,
    OutputLayerSize: 1,
};

var WordEncoder = /** @class */ (function () {
    function WordEncoder(size) {
        if (size === void 0) { size = NeuralNetworkParameters.InputLayerSize; }
        this.size = size;
    }
    /**
     * Encodes a word for use in the neural network.
     */
    WordEncoder.prototype.encode = function (input) {
        return input
            .toLowerCase()
            .split('')
            .map(function (char) { return char.charCodeAt(0).toString(2); })
            .join('')
            .padStart(this.size, '0')
            .split('')
            .map(function (digit) { return Number.parseInt(digit, 2); });
    };
    return WordEncoder;
}());

var PartOfSpeech;
(function (PartOfSpeech) {
    PartOfSpeech["Noun"] = "noun";
    PartOfSpeech["Adjective"] = "adjective";
})(PartOfSpeech || (PartOfSpeech = {}));
var PartOfSpeech$1 = PartOfSpeech;

var DIGIT_NOUN = 0;
var DIGIT_ADJECTIVE = 1;
var PartOfSpeechEncoder = /** @class */ (function () {
    function PartOfSpeechEncoder() {
    }
    /**
     * Encodes a part of speech for use in the neural network.
     */
    PartOfSpeechEncoder.prototype.encode = function (input) {
        switch (input) {
            case PartOfSpeech$1.Noun:
                return [DIGIT_NOUN];
            case PartOfSpeech$1.Adjective:
                return [DIGIT_ADJECTIVE];
            default:
                throw new TypeError('Invalid input.');
        }
    };
    return PartOfSpeechEncoder;
}());

var PartOfSpeechDecoder = /** @class */ (function () {
    function PartOfSpeechDecoder() {
    }
    /**
     * Decodes an output of a neural network.
     * Returns a part of speech.
     */
    PartOfSpeechDecoder.prototype.decode = function (input) {
        if (input.length !== 1) {
            throw new TypeError('Invalid input.');
        }
        var digit = input[0];
        if (Math.round(digit) === DIGIT_NOUN) {
            return PartOfSpeech$1.Noun;
        }
        if (Math.round(digit) === DIGIT_ADJECTIVE) {
            return PartOfSpeech$1.Adjective;
        }
        throw new TypeError('Invalid input.');
    };
    return PartOfSpeechDecoder;
}());

var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork() {
        this.network = new synaptic.Architect.Perceptron(NeuralNetworkParameters.InputLayerSize, NeuralNetworkParameters.HiddenLayerSize, NeuralNetworkParameters.OutputLayerSize);
    }
    /**
     * Creates a neural network from JSON.
     */
    NeuralNetwork.fromJSON = function (structure) {
        var instance = new this();
        instance.network = synaptic.Network.fromJSON(structure);
        return instance;
    };
    /**
     * Returns a JSON representation of the neural network.
     */
    NeuralNetwork.prototype.toJSON = function () {
        return this.network.toJSON();
    };
    /**
     * Serializes the neural network to JSON string.
     */
    NeuralNetwork.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    /**
     * Trains the neural network using a given training data.
     */
    NeuralNetwork.prototype.train = function (trainingData, trainingOptions) {
        var trainingSet = Object.entries(trainingData).map(function (_a) {
            var word = _a[0], partOfSpeech = _a[1];
            return {
                input: new WordEncoder().encode(word),
                output: new PartOfSpeechEncoder().encode(partOfSpeech),
            };
        });
        new synaptic.Trainer(this.network).train(trainingSet, trainingOptions);
        return this;
    };
    /**
     * Activates the neural network for a given word.
     * Returns a part of speech of a given word.
     */
    NeuralNetwork.prototype.activate = function (word) {
        var input = new WordEncoder().encode(word);
        var output = this.network.activate(input);
        return new PartOfSpeechDecoder().decode(output);
    };
    return NeuralNetwork;
}());

var internal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NeuralNetwork: NeuralNetwork
});

var GrammaticalCase;
(function (GrammaticalCase) {
    GrammaticalCase["Nominative"] = "nominative";
    GrammaticalCase["Genitive"] = "genitive";
    GrammaticalCase["Dative"] = "dative";
    GrammaticalCase["Accusative"] = "accusative";
    GrammaticalCase["Ablative"] = "ablative";
    GrammaticalCase["Locative"] = "locative";
    GrammaticalCase["Vocative"] = "vocative";
})(GrammaticalCase || (GrammaticalCase = {}));
var GrammaticalCase$1 = GrammaticalCase;

var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var Gender$1 = Gender;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Counts a number of groups in a given regular expression.
 */
function countGroups(src) {
    var pattern = new RegExp(src.toString() + "|");
    var matches = pattern.exec('');
    if (matches == null) {
        return 0;
    }
    return matches.length - 1;
}

/**
 * Copies letter cases from source to destination string.
 * Returns destination string after modification.
 */
function copyLetterCase(src, dest) {
    var result = '';
    var srcLetterCases = [];
    var srcChars = src.split('');
    for (var pos = 0; pos < srcChars.length; pos += 1) {
        var srcChar = srcChars[pos];
        if (isLowerCase(srcChar)) {
            srcLetterCases.push('lowercase');
        }
        else if (isUpperCase(srcChar)) {
            srcLetterCases.push('uppercase');
        }
        else {
            srcLetterCases.push('special');
        }
    }
    var destChars = dest.split('');
    for (var pos = 0; pos < destChars.length; pos += 1) {
        var destChar = destChars[pos];
        var srcLetterCase = srcLetterCases[pos] || srcLetterCases[srcLetterCases.length - 1];
        if (srcLetterCase === 'lowercase') {
            result += destChar.toLowerCase();
        }
        else if (srcLetterCase === 'uppercase') {
            result += destChar.toUpperCase();
        }
        else {
            result += destChar.toString();
        }
    }
    return result;
}
/**
 * Detects if a character is in the upper case at the specified index.
 */
function isUpperCase(src, pos) {
    if (pos === void 0) { pos = 0; }
    return src.charAt(pos) === src.charAt(pos).toUpperCase();
}
/**
 * Detects if a character is in the lower case at the specified index.
 */
function isLowerCase(src, pos) {
    if (pos === void 0) { pos = 0; }
    return src.charAt(pos) === src.charAt(pos).toLowerCase();
}

var InflectorCommandType;
(function (InflectorCommandType) {
    InflectorCommandType["Replace"] = "replace";
    InflectorCommandType["Append"] = "append";
})(InflectorCommandType || (InflectorCommandType = {}));
var InflectorCommandType$1 = InflectorCommandType;

var AppendCommandRunner = /** @class */ (function () {
    function AppendCommandRunner(command) {
        this.command = command;
    }
    /**
     * Appends the command value to a given value.
     * Returns a new value.
     */
    AppendCommandRunner.prototype.exec = function (value) {
        return value + this.command.value;
    };
    return AppendCommandRunner;
}());

var ReplaceCommandRunner = /** @class */ (function () {
    function ReplaceCommandRunner(command) {
        this.command = command;
    }
    /**
     * Replaces a given value with the command value.
     * Returns a new value.
     */
    ReplaceCommandRunner.prototype.exec = function (value) {
        return this.command.value;
    };
    return ReplaceCommandRunner;
}());

var CommandRunnerFactory = /** @class */ (function () {
    function CommandRunnerFactory() {
    }
    /**
     * Creates a new command runner for a given command.
     */
    CommandRunnerFactory.prototype.make = function (command) {
        switch (command.type) {
            case InflectorCommandType$1.Append: {
                return new AppendCommandRunner(command);
            }
            case InflectorCommandType$1.Replace: {
                return new ReplaceCommandRunner(command);
            }
            default: {
                throw new TypeError('Invalid command type.');
            }
        }
    };
    return CommandRunnerFactory;
}());

var RuleInflector = /** @class */ (function () {
    function RuleInflector(rule) {
        this.rule = rule;
        this.commandRunnerFactory = new CommandRunnerFactory();
    }
    /**
     * Inflects a given word in a given grammatical case using the rule.
     */
    RuleInflector.prototype.inflect = function (word, grammaticalCase) {
        var _this = this;
        var commands = this.rule.grammaticalCases[grammaticalCase][0];
        if (commands) {
            var searchValue = new RegExp(this.rule.pattern.modify, 'gi');
            var inflectedWord = word.replace(searchValue, function (match) {
                var groups = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    groups[_i - 1] = arguments[_i];
                }
                var replacer = '';
                var groupCount = countGroups(_this.rule.pattern.modify);
                for (var groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
                    var value = groups[groupIndex];
                    var command = commands[groupIndex];
                    if (command != null) {
                        value = _this.commandRunnerFactory.make(command).exec(value);
                    }
                    replacer += value;
                }
                return replacer;
            });
            return copyLetterCase(word, inflectedWord);
        }
        return word;
    };
    return RuleInflector;
}());

var NameInflector = /** @class */ (function () {
    function NameInflector() {
    }
    /**
     * Inflects a given name in a given grammatical case.
     */
    NameInflector.prototype.inflect = function (name, gender, grammaticalCase) {
        var _this = this;
        var words = name.split('-');
        return words
            .map(function (word, wordIndex) { return _this.inflectName(word, gender, grammaticalCase, wordIndex === words.length - 1); })
            .join('-');
    };
    return NameInflector;
}());

var FirstNameInflector = /** @class */ (function (_super) {
    __extends(FirstNameInflector, _super);
    function FirstNameInflector(rules) {
        var _this = _super.call(this) || this;
        _this.rules = rules;
        return _this;
    }
    /**
     * @inheritdoc
     */
    FirstNameInflector.prototype.inflectName = function (firstName, gender, grammaticalCase) {
        var rule = this.rules
            .filter(function (rule) { return rule.gender.includes(gender); })
            .filter(function (rule) { return rule.usage.length === 0 || rule.usage.includes('firstName'); })
            .filter(function (rule) { return new RegExp(rule.pattern.find, 'gi').test(firstName); })
            .sort(function (firstRule, secondRule) {
            if (firstRule.usage.length === 0 && secondRule.usage.length > 0 && secondRule.usage.includes('firstName')) {
                return 1;
            }
            return 0;
        })[0];
        if (rule == null) {
            return firstName;
        }
        return new RuleInflector(rule).inflect(firstName, grammaticalCase);
    };
    return FirstNameInflector;
}(NameInflector));

var MiddleNameInflector = /** @class */ (function (_super) {
    __extends(MiddleNameInflector, _super);
    function MiddleNameInflector(rules) {
        var _this = _super.call(this) || this;
        _this.rules = rules;
        return _this;
    }
    /**
     * @inheritdoc
     */
    MiddleNameInflector.prototype.inflectName = function (middleName, gender, grammaticalCase) {
        var rule = this.rules
            .filter(function (rule) { return rule.gender.includes(gender); })
            .filter(function (rule) { return rule.usage.includes('middleName'); })
            .filter(function (rule) { return new RegExp(rule.pattern.find, 'gi').test(middleName); })[0];
        if (rule == null) {
            return middleName;
        }
        return new RuleInflector(rule).inflect(middleName, grammaticalCase);
    };
    return MiddleNameInflector;
}(NameInflector));

var PATTERN_VOWELS = /[аоуеиіяюєї]/gi;
/**
 * Counts vowel sounds in a given word.
 * Returns a number of vowels.
 */
function countVowels(word) {
    var matches = word.match(PATTERN_VOWELS);
    if (matches == null) {
        return 0;
    }
    return matches.length;
}

var LastNameInflector = /** @class */ (function (_super) {
    __extends(LastNameInflector, _super);
    function LastNameInflector(rules, partOfSpeechRecognizer) {
        var _this = _super.call(this) || this;
        _this.rules = rules;
        _this.partOfSpeechRecognizer = partOfSpeechRecognizer;
        return _this;
    }
    /**
     * @inheritdoc
     */
    // tslint:disable-next-line max-line-length
    LastNameInflector.prototype.inflectName = function (lastName, gender, grammaticalCase, isLastWord) {
        var _this = this;
        if (!isLastWord && countVowels(lastName) === 1) {
            return lastName;
        }
        var rule = this.rules
            .filter(function (rule) { return rule.gender.includes(gender); })
            .filter(function (rule) { return rule.usage.length === 0 || rule.usage.includes('lastName'); })
            .filter(function (rule) { return new RegExp(rule.pattern.find, 'gi').test(lastName); })
            .filter(function (rule) {
            var partOfSpeech = _this.partOfSpeechRecognizer.recognize(lastName, gender);
            return rule.partOfSpeech === partOfSpeech || partOfSpeech == null;
        })
            .sort(function (firstRule, secondRule) {
            if (firstRule.usage.length === 0 && secondRule.usage.length > 0 && secondRule.usage.includes('lastName')) {
                return 1;
            }
            return 0;
        })[0];
        if (rule == null) {
            return lastName;
        }
        return new RuleInflector(rule).inflect(lastName, grammaticalCase);
    };
    return LastNameInflector;
}(NameInflector));

var AnthroponymInflector = /** @class */ (function () {
    // tslint:disable-next-line max-line-length
    function AnthroponymInflector(firstNameInflector, middleNameInflector, lastNameInflector) {
        this.firstNameInflector = firstNameInflector;
        this.middleNameInflector = middleNameInflector;
        this.lastNameInflector = lastNameInflector;
    }
    /**
     * Inflects a given anthroponym in a given grammatical case.
     */
    AnthroponymInflector.prototype.inflect = function (anthroponym, grammaticalCase) {
        var result = { gender: anthroponym.gender };
        if (anthroponym.firstName != null) {
            result.firstName = this.firstNameInflector.inflect(anthroponym.firstName, anthroponym.gender, grammaticalCase);
        }
        if (anthroponym.middleName != null) {
            result.middleName = this.middleNameInflector.inflect(anthroponym.middleName, anthroponym.gender, grammaticalCase);
        }
        if (anthroponym.lastName != null) {
            result.lastName = this.lastNameInflector.inflect(anthroponym.lastName, anthroponym.gender, grammaticalCase);
        }
        return result;
    };
    return AnthroponymInflector;
}());

var PartOfSpeechRecognizer = /** @class */ (function () {
    function PartOfSpeechRecognizer(rules) {
        this.rules = rules;
    }
    /**
     * Recognizes the part of speech of a given word.
     * Returns part of speech of a given word.
     * Returns null if part of speech was not recognized.
     */
    PartOfSpeechRecognizer.prototype.recognize = function (word, gender) {
        var rule = this.rules.find(function (rule) { return rule.condition(word, gender); });
        if (rule == null) {
            return null;
        }
        return rule.apply(word);
    };
    return PartOfSpeechRecognizer;
}());

var RecognizerRule = /** @class */ (function () {
    function RecognizerRule(condition, neuralNetwork, cache) {
        this.condition = condition;
        this.neuralNetwork = neuralNetwork;
        this.cache = cache;
    }
    /**
     * Applies the part of speech recognizer rule to a given word.
     * Returns a part of speech of a given word.
     * Returns null if a part of speech was not recognized.
     */
    RecognizerRule.prototype.apply = function (word) {
        if (this.cache[word] != null) {
            return this.cache[word];
        }
        return this.neuralNetwork.activate(word);
    };
    return RecognizerRule;
}());

var inflectorRules = [
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -(голосна)лець",
		examples: [
			"стрілець"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "(а|о|у|е|и|і)лець$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ь"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -грім",
		examples: [
			"грім"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "грім$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "чоловічі імена федір, сидір",
		examples: [
			"федір",
			"сидір"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
			"firstName"
		],
		pattern: {
			find: "^(федір|сидір)$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "слово суддя",
		examples: [
			"суддя"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 6,
		usage: [
			"lastName"
		],
		pattern: {
			find: "^суддя$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "слово рілля",
		examples: [
			"рілля"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 6,
		usage: [
			"lastName"
		],
		pattern: {
			find: "^рілля$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіноче ім'я любов",
		examples: [
			"любов"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 6,
		usage: [
			"firstName"
		],
		pattern: {
			find: "^любов$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "і"
					}
				}
			],
			accusative: [
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "'ю"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(к|п|кр|пл|др|жив)іт",
		examples: [
			"кіт",
			"кріт"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "(к|п|кр|пл|др|жив)іт$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(дзвін|хрін)",
		examples: [
			"дзвін"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "(дзвін|хрін)$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -батіг",
		examples: [
			"батіг"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "батіг$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "replace",
						value: "зі"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "replace",
						value: "гу"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -сокіл",
		examples: [
			"сокіл"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "сокіл$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -кріль",
		examples: [
			"кріль"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 6,
		usage: [
		],
		pattern: {
			find: "кріль$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -.бідь",
		examples: [
			"лебідь"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: ".бідь$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -куліш",
		examples: [
			"куліш"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "куліш$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(рід|плід)",
		examples: [
			"рід",
			"плід"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "(рід|плід)$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "слово сіль",
		examples: [
			"сіль"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
			"lastName"
		],
		pattern: {
			find: "^сіль$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
			],
			ablative: [
				{
					"2": {
						type: "replace",
						value: "лю"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(з|яв)ір",
		examples: [
			"дивозір",
			"явір"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "(з|яв)ір$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -(голосна)(тверда приголосна)е(ц|н)ь",
		examples: [
			"половець"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "(а|о|у|е|и|і)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)е(ц|н)ь$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -орел",
		examples: [
			"орел"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "орел$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "л"
					},
					"1": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -якір",
		examples: [
			"якір"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "якір$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "еві"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ю"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -(тверда приголосна)(тверда приголосна)е(ц|н)ь",
		examples: [
			"жнець"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)е(ц|н)ь$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -.мінь",
		examples: [
			"кремінь"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: ".мінь$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "чоловічі імена ігор, лазар",
		examples: [
			"ігор",
			"лазар"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "^(ігор|лазар)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "ю"
					}
				},
				{
					"0": {
						type: "append",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ю"
					}
				},
				{
					"0": {
						type: "append",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -сіль",
		examples: [
			"кисіль"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "сіль$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -кінь",
		examples: [
			"кінь"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 5,
		usage: [
		],
		pattern: {
			find: "кінь$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -ова",
		examples: [
			"іванова"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 4,
		usage: [
			"lastName"
		],
		pattern: {
			find: "ова$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -віл",
		examples: [
			"рябовіл"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "віл$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -(тверда приголосна)ька",
		examples: [
			"ільницька",
			"сумська"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 4,
		usage: [
			"lastName"
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ька$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -хід",
		examples: [
			"прихід"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "хід$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -іна",
		examples: [
			"зеленкіна"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 4,
		usage: [
			"lastName"
		],
		pattern: {
			find: "іна$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -віз",
		examples: [
			"узвіз"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "віз$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -.ків",
		examples: [
			"яків"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: ".ків$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -.(к|р)іп",
		examples: [
			"прокіп"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: ".(к|р)іп$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "чоловічі імена / на -(в|д)ір",
		examples: [
			"дір",
			"вір"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "(в|д)ір$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -піп",
		examples: [
			"прокіп"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "піп$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий рід / тверда група / на -світ",
		examples: [
			"світ"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "світ$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / жіночий рід / м'яка група / на -ель",
		examples: [
			"нінель",
			"мішель"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 4,
		usage: [
			"firstName"
		],
		pattern: {
			find: "ель$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "лл"
					},
					"1": {
						type: "replace",
						value: "ю"
					}
				}
			],
			locative: [
				{
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -(голосна)єць",
		examples: [
			"заєць"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "(а|о|у|е|и|і)єць$",
			modify: "(.{1})(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "й"
					},
					"2": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ніс",
		examples: [
			"кривоніс"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "ніс$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -тер",
		examples: [
			"вітер"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "тер$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ишин",
		examples: [
			"ковалишин"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "ишин$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "им"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(аго|ово)",
		examples: [
			"живаго"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "(аго|ово)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
			],
			dative: [
			],
			accusative: [
			],
			ablative: [
			],
			locative: [
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ріг",
		examples: [
			"пиріг"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 4,
		usage: [
		],
		pattern: {
			find: "ріг$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "replace",
						value: "зі"
					}
				},
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -кіш",
		examples: [
			"розкіш"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "кіш$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -е(в|н)",
		examples: [
			"семен",
			"лев"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "е(в|н)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -га",
		examples: [
			"нога"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "га$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"1": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "з"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"1": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"1": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "з"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"1": {
						type: "replace",
						value: "о"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -пес",
		examples: [
			"пес"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "пес$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ко",
		examples: [
			"марко"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "ко$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ові"
					}
				},
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -ьо",
		examples: [
			"іваньо",
			"кузьо"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "ьо$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "м"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "множина / на -их",
		examples: [
			"седих"
		],
		partOfSpeech: "adjective",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "их$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
			],
			dative: [
			],
			accusative: [
			],
			ablative: [
			],
			locative: [
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -ий",
		examples: [
			"батий"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "ий$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "єм"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий рід / тверда група / на -йо",
		examples: [
			"йойо"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "йо$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "ві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "м"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ві"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "перша відміна / чоловічий рід / тверда група / на -бо",
		examples: [
			"голембо"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
		],
		pattern: {
			find: "бо$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "чоловічий рід / на -кій (помилкова транслітерація)",
		examples: [
			"дідківській"
		],
		partOfSpeech: "adjective",
		gender: [
			"male"
		],
		priority: 3,
		usage: [
			"lastName"
		],
		pattern: {
			find: "кій$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ого"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ому"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ого"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "им"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ому"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -яр",
		examples: [
			"скляр"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "яр$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "еві"
					}
				},
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "чоловічі по батькові та прізвища / на -ич",
		examples: [
			"валерійович",
			"риндич"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"middleName",
			"lastName"
		],
		pattern: {
			find: "ич$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "жіночі по батькові / на -на",
		examples: [
			"юріївна"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"middleName"
		],
		pattern: {
			find: "на$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / жіночий рід / тверда, м'яка група / на -(о|ь|тверда приголосна)",
		examples: [
			"шевченко"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "(о|ь|(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ))$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
			],
			dative: [
			],
			accusative: [
			],
			ablative: [
			],
			locative: [
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ок",
		examples: [
			"сашок"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "ок$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: ""
					},
					"1": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -е(тверда_прилосона)",
		examples: [
			"марек"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "е(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "жіночі імена / на -(тверда приголосна)я",
		examples: [
			"неля"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"firstName"
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "чоловічі імена / на -ня",
		examples: [
			"женя"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"firstName"
		],
		pattern: {
			find: "ня$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "чоловічий рід / на -ой, -ий",
		examples: [
			"толстой",
			"сухомлинський"
		],
		partOfSpeech: "adjective",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "(ой|ий)$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ого"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ому"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ого"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "им"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ому"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -(тверда приголосна)я",
		examples: [
			"гмиря"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий, жіночий роди / м'яка група / на -(голосна|ь|й)я",
		examples: [
			"юлія",
			"майя"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "((а|о|у|е|и|і)|ь|й)я$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "єю"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "є"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / мішана група / на -(дж|ж|ч|ш)",
		examples: [
			"януш",
			"джордж"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "(дж|ж|ч|ш)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "еві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "еві"
					}
				},
				{
					"0": {
						type: "append",
						value: "і"
					}
				},
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -(тверда приголосна)а",
		examples: [
			"зелена"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)а$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "жіночий рід / на -(тверда приголосна)я",
		examples: [
			"задорожня"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ьої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ьою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -к",
		examples: [
			"кузик",
			"мисяк"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "к$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -х",
		examples: [
			"кожух"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "х$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий, жіночий роди / мішана група / на -а",
		examples: [
			"мойша"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "(дж|ж|ч|ш|щ)а$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ею"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -ая",
		examples: [
			"толстая"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "ая$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ую"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група/ на -ов",
		examples: [
			"павлов"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "ов$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "им"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий, жіночий роди / тверда група / на -ха",
		examples: [
			"старуха"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "ха$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"1": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "с"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"1": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"1": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "с"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"1": {
						type: "replace",
						value: "о"
					}
				},
				{
					"1": {
						type: "replace",
						value: "а"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий, жіночий роди / тверда група / на -ка",
		examples: [
			"прилука"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "ка$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"1": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ц"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"1": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"1": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ц"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"1": {
						type: "replace",
						value: "о"
					}
				},
				{
					"1": {
						type: "replace",
						value: "а"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий рід / тверда група / на -ле",
		examples: [
			"поле"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "ле$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "е"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "перша відміна / чоловічий рід / тверда група / на -(тверда приголосна)о",
		examples: [
			"петро",
			"павло"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)о$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ові"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -ів",
		examples: [
			"ковалів"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "ів$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "им"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіночий рід / на -яя",
		examples: [
			"заболотняя"
		],
		partOfSpeech: "adjective",
		gender: [
			"female"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "яя$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ьої"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ьою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ій"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "чоловічий рід / на -ій",
		examples: [
			"заболотній"
		],
		partOfSpeech: "adjective",
		gender: [
			"male"
		],
		priority: 2,
		usage: [
			"lastName"
		],
		pattern: {
			find: "ій$",
			modify: "(.{2})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ього"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ьому"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ього"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ім"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ьому"
					}
				}
			],
			vocative: [
			]
		}
	},
	{
		description: "перша відміна / жіночий рід / тверда група / на -(г|ґ)а",
		examples: [
			"ольга"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 1,
		usage: [
		],
		pattern: {
			find: "(г|ґ)а$",
			modify: "(.{1})(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"1": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "з"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"1": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"1": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "з"
					},
					"1": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"1": {
						type: "replace",
						value: "о"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -ь",
		examples: [
			"петрунь"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 1,
		usage: [
		],
		pattern: {
			find: "ь$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ем"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "еві"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / м'яка група / на -й",
		examples: [
			"валерій"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 1,
		usage: [
		],
		pattern: {
			find: "й$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "єві"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "я"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "єм"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "єві"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				},
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			]
		}
	},
	{
		description: "перша відміна / чоловічий, жіночий роди / тверда група / на -а",
		examples: [
			"анна"
		],
		partOfSpeech: "noun",
		gender: [
			"male",
			"female"
		],
		priority: 1,
		usage: [
		],
		pattern: {
			find: "а$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "и"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "у"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "ою"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "і"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "о"
					}
				}
			]
		}
	},
	{
		description: "друга відміна / чоловічий рід / тверда група / на -(тверда приголосна)",
		examples: [
			"олександр"
		],
		partOfSpeech: "noun",
		gender: [
			"male"
		],
		priority: 1,
		usage: [
		],
		pattern: {
			find: "(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "append",
						value: "у"
					}
				},
				{
					"0": {
						type: "append",
						value: "ові"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "append",
						value: "а"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "append",
						value: "ом"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "append",
						value: "ові"
					}
				},
				{
					"0": {
						type: "append",
						value: "у"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "append",
						value: "е"
					}
				}
			]
		}
	},
	{
		description: "жіночі імена / на -('|`)я",
		examples: [
			"дар'я",
			"мар'я"
		],
		partOfSpeech: "noun",
		gender: [
			"female"
		],
		priority: 1,
		usage: [
			"firstName"
		],
		pattern: {
			find: "('|`)я$",
			modify: "(.{1})$"
		},
		grammaticalCases: {
			nominative: [
			],
			genitive: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			dative: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			accusative: [
				{
					"0": {
						type: "replace",
						value: "ю"
					}
				}
			],
			ablative: [
				{
					"0": {
						type: "replace",
						value: "єю"
					}
				}
			],
			locative: [
				{
					"0": {
						type: "replace",
						value: "ї"
					}
				}
			],
			vocative: [
				{
					"0": {
						type: "replace",
						value: "є"
					}
				}
			]
		}
	}
];

var neurons = [
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 19.521961535102548,
		old: 40.143916766029655,
		activation: 0.9999999966755497,
		bias: 3.8089766418549,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -58.619668856222674,
		old: -37.940080334069755,
		activation: 3.48177966697421e-26,
		bias: -3.8898521018550047,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 28.546910504499017,
		old: 28.110476198843486,
		activation: 0.9999999999995999,
		bias: -0.7857727980444015,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 54.66654868244319,
		old: 21.49227356559069,
		activation: 1,
		bias: 2.284143547398274,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 21.008950178577788,
		old: 11.640255680912327,
		activation: 0.9999999992485002,
		bias: 0.5998534546877539,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 16.959966440258345,
		old: 58.166074353997686,
		activation: 0.9999999569096379,
		bias: 6.211008784967544,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 24.24224223411486,
		old: 55.76900785428953,
		activation: 0.9999999999703701,
		bias: 4.408853278988778,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -54.96438025240072,
		old: -20.582246008170685,
		activation: 1.3467064964729217e-24,
		bias: -5.9671279606848,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 29.76365505417939,
		old: 9.287776704656604,
		activation: 0.9999999999998814,
		bias: 6.791884915386151,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 14.395764666375165,
		old: 18.889273510309973,
		activation: 0.9999994402442036,
		bias: 0.19608797810506126,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 27.22803566260432,
		old: 0.1630935804152518,
		activation: 0.9999999999985036,
		bias: 1.5270544798128167,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -37.71019294461313,
		old: -5.15461138684179,
		activation: 4.1944139841926083e-17,
		bias: -4.834816964305742,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 30.009525437318672,
		old: -1.5877338521832067,
		activation: 0.9999999999999074,
		bias: 3.0014423347622214,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -47.80367261087402,
		old: -16.91797468202867,
		activation: 1.7343181551403133e-21,
		bias: -3.054926571397818,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 21.810828655446866,
		old: 40.23058256868797,
		activation: 0.9999999996629632,
		bias: 6.626003134323663,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 22.078473474186247,
		old: 15.815164523124036,
		activation: 0.9999999997421063,
		bias: 1.9609791578035252,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 21.786398220951117,
		old: 16.346014981705906,
		activation: 0.9999999996546278,
		bias: 0.8737995228988451,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 26.63605260190445,
		old: 61.74485339218941,
		activation: 0.9999999999972953,
		bias: 2.549046705008796,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 13.797596663578055,
		old: 37.54912471805484,
		activation: 0.9999989819257258,
		bias: 0.11802322111894593,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -51.94593531108504,
		old: -24.367895527522318,
		activation: 2.755287596162115e-23,
		bias: -5.046597047926739,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -3.121892033330961,
		old: -11.432571915499985,
		activation: 0.04221320827060934,
		bias: -2.1791090011896954,
		layer: "output",
		squash: "LOGISTIC"
	}
];
var connections = [
	{
		from: 0,
		to: 360,
		weight: 0.0474956256406594,
		gater: null
	},
	{
		from: 0,
		to: 361,
		weight: -0.017966297409632223,
		gater: null
	},
	{
		from: 0,
		to: 362,
		weight: 0.03443119476891893,
		gater: null
	},
	{
		from: 0,
		to: 363,
		weight: -0.04540710488760609,
		gater: null
	},
	{
		from: 0,
		to: 364,
		weight: -0.0815580249627383,
		gater: null
	},
	{
		from: 0,
		to: 365,
		weight: 0.0016249938070487663,
		gater: null
	},
	{
		from: 0,
		to: 366,
		weight: -0.03423068169796965,
		gater: null
	},
	{
		from: 0,
		to: 367,
		weight: 0.07073164106135174,
		gater: null
	},
	{
		from: 0,
		to: 368,
		weight: 0.00839383734529267,
		gater: null
	},
	{
		from: 0,
		to: 369,
		weight: 0.08819698722291344,
		gater: null
	},
	{
		from: 0,
		to: 370,
		weight: -0.052693049519862804,
		gater: null
	},
	{
		from: 0,
		to: 371,
		weight: 0.04053059008896617,
		gater: null
	},
	{
		from: 0,
		to: 372,
		weight: 0.06668859421029505,
		gater: null
	},
	{
		from: 0,
		to: 373,
		weight: 0.024672686215920336,
		gater: null
	},
	{
		from: 0,
		to: 374,
		weight: -0.032275045608310474,
		gater: null
	},
	{
		from: 0,
		to: 375,
		weight: 0.048749494176626884,
		gater: null
	},
	{
		from: 0,
		to: 376,
		weight: 0.0369865071934396,
		gater: null
	},
	{
		from: 0,
		to: 377,
		weight: -0.09869953792357139,
		gater: null
	},
	{
		from: 0,
		to: 378,
		weight: -0.06140957109499454,
		gater: null
	},
	{
		from: 0,
		to: 379,
		weight: 0.0467575773372054,
		gater: null
	},
	{
		from: 1,
		to: 360,
		weight: -0.06412477882981138,
		gater: null
	},
	{
		from: 1,
		to: 361,
		weight: 0.08454979668115903,
		gater: null
	},
	{
		from: 1,
		to: 362,
		weight: -0.07877257769578697,
		gater: null
	},
	{
		from: 1,
		to: 363,
		weight: -0.007471931723781286,
		gater: null
	},
	{
		from: 1,
		to: 364,
		weight: -0.005164268666381228,
		gater: null
	},
	{
		from: 1,
		to: 365,
		weight: 0.021862205130508405,
		gater: null
	},
	{
		from: 1,
		to: 366,
		weight: 0.08593294370921709,
		gater: null
	},
	{
		from: 1,
		to: 367,
		weight: -0.06018371311848694,
		gater: null
	},
	{
		from: 1,
		to: 368,
		weight: -0.0833756666513525,
		gater: null
	},
	{
		from: 1,
		to: 369,
		weight: -0.05968116898069984,
		gater: null
	},
	{
		from: 1,
		to: 370,
		weight: 0.061714475317606626,
		gater: null
	},
	{
		from: 1,
		to: 371,
		weight: 0.04131825269504588,
		gater: null
	},
	{
		from: 1,
		to: 372,
		weight: 0.03939863896731813,
		gater: null
	},
	{
		from: 1,
		to: 373,
		weight: 0.09102482756985744,
		gater: null
	},
	{
		from: 1,
		to: 374,
		weight: -0.08560130098183105,
		gater: null
	},
	{
		from: 1,
		to: 375,
		weight: -0.09121639851300514,
		gater: null
	},
	{
		from: 1,
		to: 376,
		weight: 0.007753930899876055,
		gater: null
	},
	{
		from: 1,
		to: 377,
		weight: 0.09868985649802747,
		gater: null
	},
	{
		from: 1,
		to: 378,
		weight: -0.07643152067774982,
		gater: null
	},
	{
		from: 1,
		to: 379,
		weight: 0.02886656509993485,
		gater: null
	},
	{
		from: 2,
		to: 360,
		weight: -0.0523853409775565,
		gater: null
	},
	{
		from: 2,
		to: 361,
		weight: -0.05011883014418044,
		gater: null
	},
	{
		from: 2,
		to: 362,
		weight: 0.06294506092504415,
		gater: null
	},
	{
		from: 2,
		to: 363,
		weight: -0.040312879642991684,
		gater: null
	},
	{
		from: 2,
		to: 364,
		weight: 0.015273084508043017,
		gater: null
	},
	{
		from: 2,
		to: 365,
		weight: -0.04321978126225963,
		gater: null
	},
	{
		from: 2,
		to: 366,
		weight: -0.028353029170358826,
		gater: null
	},
	{
		from: 2,
		to: 367,
		weight: -0.0012393156196411625,
		gater: null
	},
	{
		from: 2,
		to: 368,
		weight: -0.028957014345475637,
		gater: null
	},
	{
		from: 2,
		to: 369,
		weight: -0.03121491651218236,
		gater: null
	},
	{
		from: 2,
		to: 370,
		weight: 0.010529221444678522,
		gater: null
	},
	{
		from: 2,
		to: 371,
		weight: 0.09244807316656245,
		gater: null
	},
	{
		from: 2,
		to: 372,
		weight: -0.09321784100534165,
		gater: null
	},
	{
		from: 2,
		to: 373,
		weight: -0.0224363698165079,
		gater: null
	},
	{
		from: 2,
		to: 374,
		weight: 0.03549875322865498,
		gater: null
	},
	{
		from: 2,
		to: 375,
		weight: -0.028197337700420322,
		gater: null
	},
	{
		from: 2,
		to: 376,
		weight: -0.013957911929943959,
		gater: null
	},
	{
		from: 2,
		to: 377,
		weight: -0.07540416753224766,
		gater: null
	},
	{
		from: 2,
		to: 378,
		weight: 0.03460762038913717,
		gater: null
	},
	{
		from: 2,
		to: 379,
		weight: 0.0974197467474241,
		gater: null
	},
	{
		from: 3,
		to: 360,
		weight: 0.04959386500620103,
		gater: null
	},
	{
		from: 3,
		to: 361,
		weight: 0.09111161976380175,
		gater: null
	},
	{
		from: 3,
		to: 362,
		weight: 0.0940594725795326,
		gater: null
	},
	{
		from: 3,
		to: 363,
		weight: -0.030604229569617045,
		gater: null
	},
	{
		from: 3,
		to: 364,
		weight: -0.007208154301863917,
		gater: null
	},
	{
		from: 3,
		to: 365,
		weight: -0.07328975411839012,
		gater: null
	},
	{
		from: 3,
		to: 366,
		weight: 0.03696799290659861,
		gater: null
	},
	{
		from: 3,
		to: 367,
		weight: -0.07759354536675356,
		gater: null
	},
	{
		from: 3,
		to: 368,
		weight: 0.004350689429358082,
		gater: null
	},
	{
		from: 3,
		to: 369,
		weight: -0.09424043927934891,
		gater: null
	},
	{
		from: 3,
		to: 370,
		weight: -0.07764354985306565,
		gater: null
	},
	{
		from: 3,
		to: 371,
		weight: -0.06817905672036578,
		gater: null
	},
	{
		from: 3,
		to: 372,
		weight: 0.0937997794668605,
		gater: null
	},
	{
		from: 3,
		to: 373,
		weight: -0.06358832445282828,
		gater: null
	},
	{
		from: 3,
		to: 374,
		weight: 0.0783696335211923,
		gater: null
	},
	{
		from: 3,
		to: 375,
		weight: -0.017154522140614595,
		gater: null
	},
	{
		from: 3,
		to: 376,
		weight: -0.018223526362333334,
		gater: null
	},
	{
		from: 3,
		to: 377,
		weight: 0.05403738705943703,
		gater: null
	},
	{
		from: 3,
		to: 378,
		weight: 0.027275210960690188,
		gater: null
	},
	{
		from: 3,
		to: 379,
		weight: 0.051473137224961496,
		gater: null
	},
	{
		from: 4,
		to: 360,
		weight: 0.04613851139107297,
		gater: null
	},
	{
		from: 4,
		to: 361,
		weight: 0.03458201450167281,
		gater: null
	},
	{
		from: 4,
		to: 362,
		weight: -0.0670240590371575,
		gater: null
	},
	{
		from: 4,
		to: 363,
		weight: -0.08229333567882256,
		gater: null
	},
	{
		from: 4,
		to: 364,
		weight: 0.03710475506826719,
		gater: null
	},
	{
		from: 4,
		to: 365,
		weight: -0.0059764060525216295,
		gater: null
	},
	{
		from: 4,
		to: 366,
		weight: -0.05962237281579688,
		gater: null
	},
	{
		from: 4,
		to: 367,
		weight: 0.04881649046917319,
		gater: null
	},
	{
		from: 4,
		to: 368,
		weight: -0.04177454109382506,
		gater: null
	},
	{
		from: 4,
		to: 369,
		weight: -0.03585793333556171,
		gater: null
	},
	{
		from: 4,
		to: 370,
		weight: 0.09688107785597727,
		gater: null
	},
	{
		from: 4,
		to: 371,
		weight: 0.08264507629526699,
		gater: null
	},
	{
		from: 4,
		to: 372,
		weight: 0.08387663372211537,
		gater: null
	},
	{
		from: 4,
		to: 373,
		weight: 0.01843761389577528,
		gater: null
	},
	{
		from: 4,
		to: 374,
		weight: 0.07167279920783806,
		gater: null
	},
	{
		from: 4,
		to: 375,
		weight: 0.06075295069954048,
		gater: null
	},
	{
		from: 4,
		to: 376,
		weight: 0.08572421106366399,
		gater: null
	},
	{
		from: 4,
		to: 377,
		weight: -0.005779388232804689,
		gater: null
	},
	{
		from: 4,
		to: 378,
		weight: 0.09309483904552915,
		gater: null
	},
	{
		from: 4,
		to: 379,
		weight: 0.09087637572000876,
		gater: null
	},
	{
		from: 5,
		to: 360,
		weight: 0.04423847780041973,
		gater: null
	},
	{
		from: 5,
		to: 361,
		weight: 0.0850887860395427,
		gater: null
	},
	{
		from: 5,
		to: 362,
		weight: -0.06573955895126576,
		gater: null
	},
	{
		from: 5,
		to: 363,
		weight: -0.02340526177587128,
		gater: null
	},
	{
		from: 5,
		to: 364,
		weight: -0.03705759822167347,
		gater: null
	},
	{
		from: 5,
		to: 365,
		weight: 0.0530639963243508,
		gater: null
	},
	{
		from: 5,
		to: 366,
		weight: -0.0841561350245582,
		gater: null
	},
	{
		from: 5,
		to: 367,
		weight: 0.035035768680239165,
		gater: null
	},
	{
		from: 5,
		to: 368,
		weight: 0.03584892890131264,
		gater: null
	},
	{
		from: 5,
		to: 369,
		weight: 0.0650764899330476,
		gater: null
	},
	{
		from: 5,
		to: 370,
		weight: 0.013492363327307674,
		gater: null
	},
	{
		from: 5,
		to: 371,
		weight: 0.07180344873610403,
		gater: null
	},
	{
		from: 5,
		to: 372,
		weight: -0.04279906735728765,
		gater: null
	},
	{
		from: 5,
		to: 373,
		weight: -0.07724923628685515,
		gater: null
	},
	{
		from: 5,
		to: 374,
		weight: 0.0294506063771674,
		gater: null
	},
	{
		from: 5,
		to: 375,
		weight: -0.08079460384466085,
		gater: null
	},
	{
		from: 5,
		to: 376,
		weight: -0.03968797539984595,
		gater: null
	},
	{
		from: 5,
		to: 377,
		weight: 0.0056782799240979315,
		gater: null
	},
	{
		from: 5,
		to: 378,
		weight: 0.03907765080581793,
		gater: null
	},
	{
		from: 5,
		to: 379,
		weight: -0.07208635701471362,
		gater: null
	},
	{
		from: 6,
		to: 360,
		weight: -0.02173242407307363,
		gater: null
	},
	{
		from: 6,
		to: 361,
		weight: 0.06911142266839981,
		gater: null
	},
	{
		from: 6,
		to: 362,
		weight: -0.0051131479803263186,
		gater: null
	},
	{
		from: 6,
		to: 363,
		weight: 0.0336875211177492,
		gater: null
	},
	{
		from: 6,
		to: 364,
		weight: 0.005378591539964006,
		gater: null
	},
	{
		from: 6,
		to: 365,
		weight: -0.05401595515282338,
		gater: null
	},
	{
		from: 6,
		to: 366,
		weight: 0.0713130674988951,
		gater: null
	},
	{
		from: 6,
		to: 367,
		weight: -0.07484701898843023,
		gater: null
	},
	{
		from: 6,
		to: 368,
		weight: -0.08971065992733895,
		gater: null
	},
	{
		from: 6,
		to: 369,
		weight: -0.008335554178277735,
		gater: null
	},
	{
		from: 6,
		to: 370,
		weight: 0.003114155218237477,
		gater: null
	},
	{
		from: 6,
		to: 371,
		weight: -0.0008605822452204814,
		gater: null
	},
	{
		from: 6,
		to: 372,
		weight: -0.04510741898310209,
		gater: null
	},
	{
		from: 6,
		to: 373,
		weight: 0.007237237585081949,
		gater: null
	},
	{
		from: 6,
		to: 374,
		weight: -0.07843672691797648,
		gater: null
	},
	{
		from: 6,
		to: 375,
		weight: -0.05554489089738346,
		gater: null
	},
	{
		from: 6,
		to: 376,
		weight: 0.08962365004385917,
		gater: null
	},
	{
		from: 6,
		to: 377,
		weight: -0.006860263183243648,
		gater: null
	},
	{
		from: 6,
		to: 378,
		weight: 0.061679704781517825,
		gater: null
	},
	{
		from: 6,
		to: 379,
		weight: -0.0856552181373175,
		gater: null
	},
	{
		from: 7,
		to: 360,
		weight: 0.02955695121611765,
		gater: null
	},
	{
		from: 7,
		to: 361,
		weight: -0.03606224609004119,
		gater: null
	},
	{
		from: 7,
		to: 362,
		weight: 0.029188108813281266,
		gater: null
	},
	{
		from: 7,
		to: 363,
		weight: 0.09632368779683756,
		gater: null
	},
	{
		from: 7,
		to: 364,
		weight: -0.025259304513095687,
		gater: null
	},
	{
		from: 7,
		to: 365,
		weight: 0.04304942275222062,
		gater: null
	},
	{
		from: 7,
		to: 366,
		weight: 0.02090056573742935,
		gater: null
	},
	{
		from: 7,
		to: 367,
		weight: -0.054670521076701784,
		gater: null
	},
	{
		from: 7,
		to: 368,
		weight: -0.015795524481616627,
		gater: null
	},
	{
		from: 7,
		to: 369,
		weight: -0.02537331166654644,
		gater: null
	},
	{
		from: 7,
		to: 370,
		weight: 0.014281406745731001,
		gater: null
	},
	{
		from: 7,
		to: 371,
		weight: -0.024176306766765965,
		gater: null
	},
	{
		from: 7,
		to: 372,
		weight: -0.012781152002160304,
		gater: null
	},
	{
		from: 7,
		to: 373,
		weight: -0.0596943329054342,
		gater: null
	},
	{
		from: 7,
		to: 374,
		weight: 0.04696494564501266,
		gater: null
	},
	{
		from: 7,
		to: 375,
		weight: 0.09847372885104724,
		gater: null
	},
	{
		from: 7,
		to: 376,
		weight: -0.08556971154056155,
		gater: null
	},
	{
		from: 7,
		to: 377,
		weight: -0.05348908558289929,
		gater: null
	},
	{
		from: 7,
		to: 378,
		weight: 0.02844260881864552,
		gater: null
	},
	{
		from: 7,
		to: 379,
		weight: -0.06727227848836087,
		gater: null
	},
	{
		from: 8,
		to: 360,
		weight: -0.06361022983048104,
		gater: null
	},
	{
		from: 8,
		to: 361,
		weight: -0.015201500596141754,
		gater: null
	},
	{
		from: 8,
		to: 362,
		weight: 0.016859181812219945,
		gater: null
	},
	{
		from: 8,
		to: 363,
		weight: -0.09170245286045611,
		gater: null
	},
	{
		from: 8,
		to: 364,
		weight: 0.03534158968834883,
		gater: null
	},
	{
		from: 8,
		to: 365,
		weight: 0.029258942823248812,
		gater: null
	},
	{
		from: 8,
		to: 366,
		weight: 0.09359731687493014,
		gater: null
	},
	{
		from: 8,
		to: 367,
		weight: 0.03779228659365649,
		gater: null
	},
	{
		from: 8,
		to: 368,
		weight: -0.017840130494963274,
		gater: null
	},
	{
		from: 8,
		to: 369,
		weight: 0.02898928981606813,
		gater: null
	},
	{
		from: 8,
		to: 370,
		weight: -0.07539015079203111,
		gater: null
	},
	{
		from: 8,
		to: 371,
		weight: -0.08655839779618275,
		gater: null
	},
	{
		from: 8,
		to: 372,
		weight: -0.09186920860758119,
		gater: null
	},
	{
		from: 8,
		to: 373,
		weight: 0.08241812972188192,
		gater: null
	},
	{
		from: 8,
		to: 374,
		weight: 0.054222010728882,
		gater: null
	},
	{
		from: 8,
		to: 375,
		weight: -0.04225734572888476,
		gater: null
	},
	{
		from: 8,
		to: 376,
		weight: -0.029630044205366704,
		gater: null
	},
	{
		from: 8,
		to: 377,
		weight: -0.026232908322409418,
		gater: null
	},
	{
		from: 8,
		to: 378,
		weight: -0.07668788090365886,
		gater: null
	},
	{
		from: 8,
		to: 379,
		weight: -0.018430343804469063,
		gater: null
	},
	{
		from: 9,
		to: 360,
		weight: -0.064865585579477,
		gater: null
	},
	{
		from: 9,
		to: 361,
		weight: -0.09602894245388499,
		gater: null
	},
	{
		from: 9,
		to: 362,
		weight: 0.03603661238577427,
		gater: null
	},
	{
		from: 9,
		to: 363,
		weight: -0.012138206655369382,
		gater: null
	},
	{
		from: 9,
		to: 364,
		weight: -0.03728793739092642,
		gater: null
	},
	{
		from: 9,
		to: 365,
		weight: 0.04130273185827599,
		gater: null
	},
	{
		from: 9,
		to: 366,
		weight: 0.07353419276678283,
		gater: null
	},
	{
		from: 9,
		to: 367,
		weight: -0.013598710880961207,
		gater: null
	},
	{
		from: 9,
		to: 368,
		weight: -0.044678991436747674,
		gater: null
	},
	{
		from: 9,
		to: 369,
		weight: 0.06116140418448168,
		gater: null
	},
	{
		from: 9,
		to: 370,
		weight: 0.01441045056982096,
		gater: null
	},
	{
		from: 9,
		to: 371,
		weight: 0.09758221580665985,
		gater: null
	},
	{
		from: 9,
		to: 372,
		weight: 0.06499504224633154,
		gater: null
	},
	{
		from: 9,
		to: 373,
		weight: 0.019725399868390975,
		gater: null
	},
	{
		from: 9,
		to: 374,
		weight: -0.0952234451196298,
		gater: null
	},
	{
		from: 9,
		to: 375,
		weight: 0.0582459622344417,
		gater: null
	},
	{
		from: 9,
		to: 376,
		weight: 0.013884238794578563,
		gater: null
	},
	{
		from: 9,
		to: 377,
		weight: -0.05424121866704273,
		gater: null
	},
	{
		from: 9,
		to: 378,
		weight: 0.016603615059672144,
		gater: null
	},
	{
		from: 9,
		to: 379,
		weight: 0.011155741902713914,
		gater: null
	},
	{
		from: 10,
		to: 360,
		weight: -0.05385237342102603,
		gater: null
	},
	{
		from: 10,
		to: 361,
		weight: 0.08029340038347224,
		gater: null
	},
	{
		from: 10,
		to: 362,
		weight: -0.0007561122541194926,
		gater: null
	},
	{
		from: 10,
		to: 363,
		weight: -0.07583252279130628,
		gater: null
	},
	{
		from: 10,
		to: 364,
		weight: -0.07251478451367893,
		gater: null
	},
	{
		from: 10,
		to: 365,
		weight: -0.06635456430906302,
		gater: null
	},
	{
		from: 10,
		to: 366,
		weight: -0.013635536181169,
		gater: null
	},
	{
		from: 10,
		to: 367,
		weight: -0.03614664542415423,
		gater: null
	},
	{
		from: 10,
		to: 368,
		weight: -0.05069886831346744,
		gater: null
	},
	{
		from: 10,
		to: 369,
		weight: 0.034502452147633283,
		gater: null
	},
	{
		from: 10,
		to: 370,
		weight: 0.08260165417171036,
		gater: null
	},
	{
		from: 10,
		to: 371,
		weight: -0.05511915750593302,
		gater: null
	},
	{
		from: 10,
		to: 372,
		weight: 0.07085031074383127,
		gater: null
	},
	{
		from: 10,
		to: 373,
		weight: 0.014044471521732535,
		gater: null
	},
	{
		from: 10,
		to: 374,
		weight: -0.08311181939981074,
		gater: null
	},
	{
		from: 10,
		to: 375,
		weight: 0.09984747100316813,
		gater: null
	},
	{
		from: 10,
		to: 376,
		weight: -0.010203612438471982,
		gater: null
	},
	{
		from: 10,
		to: 377,
		weight: -0.02746562540425783,
		gater: null
	},
	{
		from: 10,
		to: 378,
		weight: -0.07146584385966187,
		gater: null
	},
	{
		from: 10,
		to: 379,
		weight: -0.05853103555531254,
		gater: null
	},
	{
		from: 11,
		to: 360,
		weight: -0.09954160262338824,
		gater: null
	},
	{
		from: 11,
		to: 361,
		weight: 0.039025976745103774,
		gater: null
	},
	{
		from: 11,
		to: 362,
		weight: -0.05440823911343347,
		gater: null
	},
	{
		from: 11,
		to: 363,
		weight: -0.07797912555426026,
		gater: null
	},
	{
		from: 11,
		to: 364,
		weight: -0.02516225576356805,
		gater: null
	},
	{
		from: 11,
		to: 365,
		weight: 0.05871275634729908,
		gater: null
	},
	{
		from: 11,
		to: 366,
		weight: -0.04278654691371693,
		gater: null
	},
	{
		from: 11,
		to: 367,
		weight: 0.09015859607956442,
		gater: null
	},
	{
		from: 11,
		to: 368,
		weight: -0.08048628193854963,
		gater: null
	},
	{
		from: 11,
		to: 369,
		weight: 0.005275330313193077,
		gater: null
	},
	{
		from: 11,
		to: 370,
		weight: 0.044340197986746765,
		gater: null
	},
	{
		from: 11,
		to: 371,
		weight: -0.08846827198541792,
		gater: null
	},
	{
		from: 11,
		to: 372,
		weight: -0.01561934760303832,
		gater: null
	},
	{
		from: 11,
		to: 373,
		weight: 0.016109233154124908,
		gater: null
	},
	{
		from: 11,
		to: 374,
		weight: 0.049753982241937944,
		gater: null
	},
	{
		from: 11,
		to: 375,
		weight: -0.08240931974987974,
		gater: null
	},
	{
		from: 11,
		to: 376,
		weight: -0.09218883016831647,
		gater: null
	},
	{
		from: 11,
		to: 377,
		weight: -0.07383344622022392,
		gater: null
	},
	{
		from: 11,
		to: 378,
		weight: 0.0888756723938895,
		gater: null
	},
	{
		from: 11,
		to: 379,
		weight: 0.016420079106060165,
		gater: null
	},
	{
		from: 12,
		to: 360,
		weight: -0.02120382096713866,
		gater: null
	},
	{
		from: 12,
		to: 361,
		weight: 0.02991697413921962,
		gater: null
	},
	{
		from: 12,
		to: 362,
		weight: -0.05422778226366907,
		gater: null
	},
	{
		from: 12,
		to: 363,
		weight: 0.024720285950363283,
		gater: null
	},
	{
		from: 12,
		to: 364,
		weight: 0.057182940903149876,
		gater: null
	},
	{
		from: 12,
		to: 365,
		weight: 0.02844420599628808,
		gater: null
	},
	{
		from: 12,
		to: 366,
		weight: 0.01661429988836946,
		gater: null
	},
	{
		from: 12,
		to: 367,
		weight: 0.03577795823036728,
		gater: null
	},
	{
		from: 12,
		to: 368,
		weight: 0.03577958133145426,
		gater: null
	},
	{
		from: 12,
		to: 369,
		weight: -0.07796039876582475,
		gater: null
	},
	{
		from: 12,
		to: 370,
		weight: -0.07368568669376341,
		gater: null
	},
	{
		from: 12,
		to: 371,
		weight: -0.08056761867292264,
		gater: null
	},
	{
		from: 12,
		to: 372,
		weight: 0.06306565330783648,
		gater: null
	},
	{
		from: 12,
		to: 373,
		weight: -0.0971716862454982,
		gater: null
	},
	{
		from: 12,
		to: 374,
		weight: 0.004653136061076202,
		gater: null
	},
	{
		from: 12,
		to: 375,
		weight: 0.06932238712136171,
		gater: null
	},
	{
		from: 12,
		to: 376,
		weight: -0.09130089919551532,
		gater: null
	},
	{
		from: 12,
		to: 377,
		weight: -0.05246532033925009,
		gater: null
	},
	{
		from: 12,
		to: 378,
		weight: 0.03010459010272823,
		gater: null
	},
	{
		from: 12,
		to: 379,
		weight: -0.0172681332789463,
		gater: null
	},
	{
		from: 13,
		to: 360,
		weight: 0.02060456207261044,
		gater: null
	},
	{
		from: 13,
		to: 361,
		weight: 0.07904664842708839,
		gater: null
	},
	{
		from: 13,
		to: 362,
		weight: -0.08764582298011421,
		gater: null
	},
	{
		from: 13,
		to: 363,
		weight: 0.08940973770367355,
		gater: null
	},
	{
		from: 13,
		to: 364,
		weight: 0.08660428651877691,
		gater: null
	},
	{
		from: 13,
		to: 365,
		weight: 0.07070474417137415,
		gater: null
	},
	{
		from: 13,
		to: 366,
		weight: 0.06447534402312863,
		gater: null
	},
	{
		from: 13,
		to: 367,
		weight: 0.0991355207939201,
		gater: null
	},
	{
		from: 13,
		to: 368,
		weight: -0.07081901967404898,
		gater: null
	},
	{
		from: 13,
		to: 369,
		weight: -0.0834695118543814,
		gater: null
	},
	{
		from: 13,
		to: 370,
		weight: 0.03959656332753697,
		gater: null
	},
	{
		from: 13,
		to: 371,
		weight: 0.04826984053668221,
		gater: null
	},
	{
		from: 13,
		to: 372,
		weight: 0.08094917803881527,
		gater: null
	},
	{
		from: 13,
		to: 373,
		weight: 0.011401018471472388,
		gater: null
	},
	{
		from: 13,
		to: 374,
		weight: 0.03924448383199089,
		gater: null
	},
	{
		from: 13,
		to: 375,
		weight: 0.09327139270375953,
		gater: null
	},
	{
		from: 13,
		to: 376,
		weight: -0.06762192572892967,
		gater: null
	},
	{
		from: 13,
		to: 377,
		weight: 0.03525629895049914,
		gater: null
	},
	{
		from: 13,
		to: 378,
		weight: 0.08388088747172784,
		gater: null
	},
	{
		from: 13,
		to: 379,
		weight: -0.05747024770254097,
		gater: null
	},
	{
		from: 14,
		to: 360,
		weight: -0.07746427462909443,
		gater: null
	},
	{
		from: 14,
		to: 361,
		weight: -0.016269290504514047,
		gater: null
	},
	{
		from: 14,
		to: 362,
		weight: -0.04839360842316603,
		gater: null
	},
	{
		from: 14,
		to: 363,
		weight: -0.05518164380076836,
		gater: null
	},
	{
		from: 14,
		to: 364,
		weight: 0.08629056639781682,
		gater: null
	},
	{
		from: 14,
		to: 365,
		weight: 0.042067575273768254,
		gater: null
	},
	{
		from: 14,
		to: 366,
		weight: -0.011758933659861762,
		gater: null
	},
	{
		from: 14,
		to: 367,
		weight: -0.030463444735934916,
		gater: null
	},
	{
		from: 14,
		to: 368,
		weight: -0.059617107379667945,
		gater: null
	},
	{
		from: 14,
		to: 369,
		weight: 0.09206297697610571,
		gater: null
	},
	{
		from: 14,
		to: 370,
		weight: 0.06837491876279497,
		gater: null
	},
	{
		from: 14,
		to: 371,
		weight: -0.07748605634110138,
		gater: null
	},
	{
		from: 14,
		to: 372,
		weight: 0.04735914449058837,
		gater: null
	},
	{
		from: 14,
		to: 373,
		weight: 0.0004337699948337992,
		gater: null
	},
	{
		from: 14,
		to: 374,
		weight: -0.0021499328317158284,
		gater: null
	},
	{
		from: 14,
		to: 375,
		weight: -0.024491176106439874,
		gater: null
	},
	{
		from: 14,
		to: 376,
		weight: -0.009276230713137504,
		gater: null
	},
	{
		from: 14,
		to: 377,
		weight: 0.08727598517321616,
		gater: null
	},
	{
		from: 14,
		to: 378,
		weight: -0.04952268006877323,
		gater: null
	},
	{
		from: 14,
		to: 379,
		weight: -0.0623260823836386,
		gater: null
	},
	{
		from: 15,
		to: 360,
		weight: -0.02687415000605249,
		gater: null
	},
	{
		from: 15,
		to: 361,
		weight: -0.048606783831258674,
		gater: null
	},
	{
		from: 15,
		to: 362,
		weight: -0.014823949415376833,
		gater: null
	},
	{
		from: 15,
		to: 363,
		weight: 0.040881307586044136,
		gater: null
	},
	{
		from: 15,
		to: 364,
		weight: 0.07568101625002896,
		gater: null
	},
	{
		from: 15,
		to: 365,
		weight: 0.050712316745099933,
		gater: null
	},
	{
		from: 15,
		to: 366,
		weight: 0.08118624816494746,
		gater: null
	},
	{
		from: 15,
		to: 367,
		weight: 0.04473942462519892,
		gater: null
	},
	{
		from: 15,
		to: 368,
		weight: 0.07978706550902204,
		gater: null
	},
	{
		from: 15,
		to: 369,
		weight: 0.06513184570421329,
		gater: null
	},
	{
		from: 15,
		to: 370,
		weight: -0.09292709531917742,
		gater: null
	},
	{
		from: 15,
		to: 371,
		weight: -0.09643234473106865,
		gater: null
	},
	{
		from: 15,
		to: 372,
		weight: 0.09427180193898252,
		gater: null
	},
	{
		from: 15,
		to: 373,
		weight: 0.021029121315560534,
		gater: null
	},
	{
		from: 15,
		to: 374,
		weight: 0.07561379076373181,
		gater: null
	},
	{
		from: 15,
		to: 375,
		weight: 0.056170451640999514,
		gater: null
	},
	{
		from: 15,
		to: 376,
		weight: -0.08029193176912847,
		gater: null
	},
	{
		from: 15,
		to: 377,
		weight: -0.06308327035138817,
		gater: null
	},
	{
		from: 15,
		to: 378,
		weight: 0.0317014529213519,
		gater: null
	},
	{
		from: 15,
		to: 379,
		weight: 0.004956699147048618,
		gater: null
	},
	{
		from: 16,
		to: 360,
		weight: 0.04981899604645279,
		gater: null
	},
	{
		from: 16,
		to: 361,
		weight: 0.06445464156813735,
		gater: null
	},
	{
		from: 16,
		to: 362,
		weight: -0.07675361674974296,
		gater: null
	},
	{
		from: 16,
		to: 363,
		weight: 0.038043985110662426,
		gater: null
	},
	{
		from: 16,
		to: 364,
		weight: -0.0782036160738477,
		gater: null
	},
	{
		from: 16,
		to: 365,
		weight: 0.054005657718411954,
		gater: null
	},
	{
		from: 16,
		to: 366,
		weight: 0.09831265595851243,
		gater: null
	},
	{
		from: 16,
		to: 367,
		weight: -0.08551533057643149,
		gater: null
	},
	{
		from: 16,
		to: 368,
		weight: 0.045480933384918376,
		gater: null
	},
	{
		from: 16,
		to: 369,
		weight: -0.08447967427781644,
		gater: null
	},
	{
		from: 16,
		to: 370,
		weight: -0.06837844702195156,
		gater: null
	},
	{
		from: 16,
		to: 371,
		weight: 0.005282266843523245,
		gater: null
	},
	{
		from: 16,
		to: 372,
		weight: 0.07051927122310706,
		gater: null
	},
	{
		from: 16,
		to: 373,
		weight: -0.07054774567161677,
		gater: null
	},
	{
		from: 16,
		to: 374,
		weight: 0.0810954010021788,
		gater: null
	},
	{
		from: 16,
		to: 375,
		weight: -0.015955652604749918,
		gater: null
	},
	{
		from: 16,
		to: 376,
		weight: 0.009577318144320793,
		gater: null
	},
	{
		from: 16,
		to: 377,
		weight: -0.09885571356206371,
		gater: null
	},
	{
		from: 16,
		to: 378,
		weight: 0.07413519836557544,
		gater: null
	},
	{
		from: 16,
		to: 379,
		weight: -0.033966720657738134,
		gater: null
	},
	{
		from: 17,
		to: 360,
		weight: 0.04090361340168927,
		gater: null
	},
	{
		from: 17,
		to: 361,
		weight: -0.09741849636714464,
		gater: null
	},
	{
		from: 17,
		to: 362,
		weight: -0.014745405706383607,
		gater: null
	},
	{
		from: 17,
		to: 363,
		weight: 0.08121198737909638,
		gater: null
	},
	{
		from: 17,
		to: 364,
		weight: -0.0647335099073795,
		gater: null
	},
	{
		from: 17,
		to: 365,
		weight: -0.057781312583950986,
		gater: null
	},
	{
		from: 17,
		to: 366,
		weight: -0.09629152467783562,
		gater: null
	},
	{
		from: 17,
		to: 367,
		weight: 0.0886196826425647,
		gater: null
	},
	{
		from: 17,
		to: 368,
		weight: -0.010664594367743835,
		gater: null
	},
	{
		from: 17,
		to: 369,
		weight: -0.03039708639763164,
		gater: null
	},
	{
		from: 17,
		to: 370,
		weight: 0.014082632396368935,
		gater: null
	},
	{
		from: 17,
		to: 371,
		weight: 0.05949357955533602,
		gater: null
	},
	{
		from: 17,
		to: 372,
		weight: -0.09831998805953207,
		gater: null
	},
	{
		from: 17,
		to: 373,
		weight: 0.04423173686809029,
		gater: null
	},
	{
		from: 17,
		to: 374,
		weight: 0.02261646130416843,
		gater: null
	},
	{
		from: 17,
		to: 375,
		weight: 0.09831974886133032,
		gater: null
	},
	{
		from: 17,
		to: 376,
		weight: 0.057936444177120155,
		gater: null
	},
	{
		from: 17,
		to: 377,
		weight: 0.07797299192698501,
		gater: null
	},
	{
		from: 17,
		to: 378,
		weight: 0.05318631103667784,
		gater: null
	},
	{
		from: 17,
		to: 379,
		weight: 0.0650968565517005,
		gater: null
	},
	{
		from: 18,
		to: 360,
		weight: 0.05548390864936978,
		gater: null
	},
	{
		from: 18,
		to: 361,
		weight: 0.026942717080367995,
		gater: null
	},
	{
		from: 18,
		to: 362,
		weight: -0.08518419909081239,
		gater: null
	},
	{
		from: 18,
		to: 363,
		weight: 0.08483564702847596,
		gater: null
	},
	{
		from: 18,
		to: 364,
		weight: 0.06606918572616402,
		gater: null
	},
	{
		from: 18,
		to: 365,
		weight: -0.03465560457664539,
		gater: null
	},
	{
		from: 18,
		to: 366,
		weight: -0.07794333628546016,
		gater: null
	},
	{
		from: 18,
		to: 367,
		weight: 0.031767943330080456,
		gater: null
	},
	{
		from: 18,
		to: 368,
		weight: -0.023388619318506484,
		gater: null
	},
	{
		from: 18,
		to: 369,
		weight: -0.022524818356428528,
		gater: null
	},
	{
		from: 18,
		to: 370,
		weight: 0.027492252166563258,
		gater: null
	},
	{
		from: 18,
		to: 371,
		weight: -0.04408323745801806,
		gater: null
	},
	{
		from: 18,
		to: 372,
		weight: -0.035759048211968736,
		gater: null
	},
	{
		from: 18,
		to: 373,
		weight: -0.0786220771469513,
		gater: null
	},
	{
		from: 18,
		to: 374,
		weight: -0.09332038794636476,
		gater: null
	},
	{
		from: 18,
		to: 375,
		weight: -0.08382707516831873,
		gater: null
	},
	{
		from: 18,
		to: 376,
		weight: -0.0474110707910691,
		gater: null
	},
	{
		from: 18,
		to: 377,
		weight: 0.07353101564706446,
		gater: null
	},
	{
		from: 18,
		to: 378,
		weight: 0.08675093869157419,
		gater: null
	},
	{
		from: 18,
		to: 379,
		weight: -0.07686023811830962,
		gater: null
	},
	{
		from: 19,
		to: 360,
		weight: -0.08623634904398143,
		gater: null
	},
	{
		from: 19,
		to: 361,
		weight: 0.03387053670238527,
		gater: null
	},
	{
		from: 19,
		to: 362,
		weight: -0.0692202967749759,
		gater: null
	},
	{
		from: 19,
		to: 363,
		weight: 0.09904919862738085,
		gater: null
	},
	{
		from: 19,
		to: 364,
		weight: 0.006813986584482595,
		gater: null
	},
	{
		from: 19,
		to: 365,
		weight: 0.05139736435918496,
		gater: null
	},
	{
		from: 19,
		to: 366,
		weight: -0.08867159651250454,
		gater: null
	},
	{
		from: 19,
		to: 367,
		weight: -0.03818600150054059,
		gater: null
	},
	{
		from: 19,
		to: 368,
		weight: -0.025147763314519053,
		gater: null
	},
	{
		from: 19,
		to: 369,
		weight: -0.052024434852089074,
		gater: null
	},
	{
		from: 19,
		to: 370,
		weight: 0.021952932602453054,
		gater: null
	},
	{
		from: 19,
		to: 371,
		weight: -0.009774263449899984,
		gater: null
	},
	{
		from: 19,
		to: 372,
		weight: -0.06783378574739549,
		gater: null
	},
	{
		from: 19,
		to: 373,
		weight: 0.005872296346847647,
		gater: null
	},
	{
		from: 19,
		to: 374,
		weight: -0.04925291189376391,
		gater: null
	},
	{
		from: 19,
		to: 375,
		weight: -0.0969113772240847,
		gater: null
	},
	{
		from: 19,
		to: 376,
		weight: -0.06864284024226111,
		gater: null
	},
	{
		from: 19,
		to: 377,
		weight: -0.03788059867083318,
		gater: null
	},
	{
		from: 19,
		to: 378,
		weight: 0.05937109896316978,
		gater: null
	},
	{
		from: 19,
		to: 379,
		weight: -0.022190125633342467,
		gater: null
	},
	{
		from: 20,
		to: 360,
		weight: -0.01669619842832204,
		gater: null
	},
	{
		from: 20,
		to: 361,
		weight: 0.03788598802852711,
		gater: null
	},
	{
		from: 20,
		to: 362,
		weight: -0.02797026576109167,
		gater: null
	},
	{
		from: 20,
		to: 363,
		weight: -0.01815184275681836,
		gater: null
	},
	{
		from: 20,
		to: 364,
		weight: -0.07512442870900565,
		gater: null
	},
	{
		from: 20,
		to: 365,
		weight: -0.05895403636665604,
		gater: null
	},
	{
		from: 20,
		to: 366,
		weight: -0.008668968280720432,
		gater: null
	},
	{
		from: 20,
		to: 367,
		weight: -0.07909755465434715,
		gater: null
	},
	{
		from: 20,
		to: 368,
		weight: -0.017298335290750755,
		gater: null
	},
	{
		from: 20,
		to: 369,
		weight: -0.07021041305620371,
		gater: null
	},
	{
		from: 20,
		to: 370,
		weight: 0.045903944691646714,
		gater: null
	},
	{
		from: 20,
		to: 371,
		weight: -0.03234031831456985,
		gater: null
	},
	{
		from: 20,
		to: 372,
		weight: -0.08760974826550375,
		gater: null
	},
	{
		from: 20,
		to: 373,
		weight: -0.07244068404629003,
		gater: null
	},
	{
		from: 20,
		to: 374,
		weight: 0.056375629685634726,
		gater: null
	},
	{
		from: 20,
		to: 375,
		weight: -0.020565277494914852,
		gater: null
	},
	{
		from: 20,
		to: 376,
		weight: -0.058594075655461667,
		gater: null
	},
	{
		from: 20,
		to: 377,
		weight: 0.047795845632319256,
		gater: null
	},
	{
		from: 20,
		to: 378,
		weight: 0.05004776214575926,
		gater: null
	},
	{
		from: 20,
		to: 379,
		weight: 0.08109792684840073,
		gater: null
	},
	{
		from: 21,
		to: 360,
		weight: 0.021899043342531538,
		gater: null
	},
	{
		from: 21,
		to: 361,
		weight: -0.06930592515394358,
		gater: null
	},
	{
		from: 21,
		to: 362,
		weight: 0.08929633546162391,
		gater: null
	},
	{
		from: 21,
		to: 363,
		weight: -0.04308170092381891,
		gater: null
	},
	{
		from: 21,
		to: 364,
		weight: -0.03315684775947099,
		gater: null
	},
	{
		from: 21,
		to: 365,
		weight: -0.00015761813326195528,
		gater: null
	},
	{
		from: 21,
		to: 366,
		weight: 0.06386972030768417,
		gater: null
	},
	{
		from: 21,
		to: 367,
		weight: -0.09755247409367224,
		gater: null
	},
	{
		from: 21,
		to: 368,
		weight: 0.05014625621269478,
		gater: null
	},
	{
		from: 21,
		to: 369,
		weight: -0.04629424901967534,
		gater: null
	},
	{
		from: 21,
		to: 370,
		weight: 0.01325573640465931,
		gater: null
	},
	{
		from: 21,
		to: 371,
		weight: -0.04183497430804222,
		gater: null
	},
	{
		from: 21,
		to: 372,
		weight: 0.06989879954691808,
		gater: null
	},
	{
		from: 21,
		to: 373,
		weight: -0.07493856709457686,
		gater: null
	},
	{
		from: 21,
		to: 374,
		weight: 0.0029548106514014627,
		gater: null
	},
	{
		from: 21,
		to: 375,
		weight: -0.031438730694426376,
		gater: null
	},
	{
		from: 21,
		to: 376,
		weight: 0.0391894962416027,
		gater: null
	},
	{
		from: 21,
		to: 377,
		weight: -0.026887251018688302,
		gater: null
	},
	{
		from: 21,
		to: 378,
		weight: 0.07572171824984442,
		gater: null
	},
	{
		from: 21,
		to: 379,
		weight: 0.001470994912980042,
		gater: null
	},
	{
		from: 22,
		to: 360,
		weight: -0.01896006560955525,
		gater: null
	},
	{
		from: 22,
		to: 361,
		weight: 0.09684090462955508,
		gater: null
	},
	{
		from: 22,
		to: 362,
		weight: 0.006863403150242725,
		gater: null
	},
	{
		from: 22,
		to: 363,
		weight: 0.06412183708123473,
		gater: null
	},
	{
		from: 22,
		to: 364,
		weight: 0.025221474126228494,
		gater: null
	},
	{
		from: 22,
		to: 365,
		weight: -0.08771260360459139,
		gater: null
	},
	{
		from: 22,
		to: 366,
		weight: -0.05476903670027258,
		gater: null
	},
	{
		from: 22,
		to: 367,
		weight: -0.09706343083553559,
		gater: null
	},
	{
		from: 22,
		to: 368,
		weight: 0.03497206886557508,
		gater: null
	},
	{
		from: 22,
		to: 369,
		weight: -0.005330167496542609,
		gater: null
	},
	{
		from: 22,
		to: 370,
		weight: -0.05796920153910992,
		gater: null
	},
	{
		from: 22,
		to: 371,
		weight: -0.025933482634913796,
		gater: null
	},
	{
		from: 22,
		to: 372,
		weight: 0.07806800100524072,
		gater: null
	},
	{
		from: 22,
		to: 373,
		weight: 0.053007358320604964,
		gater: null
	},
	{
		from: 22,
		to: 374,
		weight: 0.03600613415744175,
		gater: null
	},
	{
		from: 22,
		to: 375,
		weight: 0.09879747812861947,
		gater: null
	},
	{
		from: 22,
		to: 376,
		weight: 0.0293412616066267,
		gater: null
	},
	{
		from: 22,
		to: 377,
		weight: 0.015689655994312712,
		gater: null
	},
	{
		from: 22,
		to: 378,
		weight: -0.007191577802751953,
		gater: null
	},
	{
		from: 22,
		to: 379,
		weight: 0.01330393345352987,
		gater: null
	},
	{
		from: 23,
		to: 360,
		weight: 0.07825379037232691,
		gater: null
	},
	{
		from: 23,
		to: 361,
		weight: -0.004188112161934446,
		gater: null
	},
	{
		from: 23,
		to: 362,
		weight: 0.09566945069976468,
		gater: null
	},
	{
		from: 23,
		to: 363,
		weight: 0.04045373948105935,
		gater: null
	},
	{
		from: 23,
		to: 364,
		weight: 0.028093886208133384,
		gater: null
	},
	{
		from: 23,
		to: 365,
		weight: -0.08204450392434631,
		gater: null
	},
	{
		from: 23,
		to: 366,
		weight: 0.08605163899921872,
		gater: null
	},
	{
		from: 23,
		to: 367,
		weight: -0.03896874096089689,
		gater: null
	},
	{
		from: 23,
		to: 368,
		weight: -0.06357903911202864,
		gater: null
	},
	{
		from: 23,
		to: 369,
		weight: 0.001968720398971155,
		gater: null
	},
	{
		from: 23,
		to: 370,
		weight: 0.06953874746215338,
		gater: null
	},
	{
		from: 23,
		to: 371,
		weight: -0.0631048627134347,
		gater: null
	},
	{
		from: 23,
		to: 372,
		weight: -0.01634418851711597,
		gater: null
	},
	{
		from: 23,
		to: 373,
		weight: -0.03884499229814851,
		gater: null
	},
	{
		from: 23,
		to: 374,
		weight: -0.07996636984869326,
		gater: null
	},
	{
		from: 23,
		to: 375,
		weight: -0.010673942019904417,
		gater: null
	},
	{
		from: 23,
		to: 376,
		weight: 0.08952600024829951,
		gater: null
	},
	{
		from: 23,
		to: 377,
		weight: -0.01012585218202093,
		gater: null
	},
	{
		from: 23,
		to: 378,
		weight: -0.08556531416151736,
		gater: null
	},
	{
		from: 23,
		to: 379,
		weight: -0.06242943812820881,
		gater: null
	},
	{
		from: 24,
		to: 360,
		weight: -0.05164843458269624,
		gater: null
	},
	{
		from: 24,
		to: 361,
		weight: 0.05092886330700025,
		gater: null
	},
	{
		from: 24,
		to: 362,
		weight: 0.04301492731462142,
		gater: null
	},
	{
		from: 24,
		to: 363,
		weight: 0.0374945455369072,
		gater: null
	},
	{
		from: 24,
		to: 364,
		weight: 0.05546847132825383,
		gater: null
	},
	{
		from: 24,
		to: 365,
		weight: 0.02699197617406121,
		gater: null
	},
	{
		from: 24,
		to: 366,
		weight: 0.0227721634417775,
		gater: null
	},
	{
		from: 24,
		to: 367,
		weight: 0.07124959306533443,
		gater: null
	},
	{
		from: 24,
		to: 368,
		weight: 0.05196895445764996,
		gater: null
	},
	{
		from: 24,
		to: 369,
		weight: 0.09396842558838014,
		gater: null
	},
	{
		from: 24,
		to: 370,
		weight: 0.011770026978858233,
		gater: null
	},
	{
		from: 24,
		to: 371,
		weight: 0.016860365403936983,
		gater: null
	},
	{
		from: 24,
		to: 372,
		weight: -0.04843184342088472,
		gater: null
	},
	{
		from: 24,
		to: 373,
		weight: -0.07349854493110866,
		gater: null
	},
	{
		from: 24,
		to: 374,
		weight: -0.07789934299080517,
		gater: null
	},
	{
		from: 24,
		to: 375,
		weight: -0.07100426976193992,
		gater: null
	},
	{
		from: 24,
		to: 376,
		weight: 0.05375075976596194,
		gater: null
	},
	{
		from: 24,
		to: 377,
		weight: 0.06539300025769165,
		gater: null
	},
	{
		from: 24,
		to: 378,
		weight: 0.030463042043897465,
		gater: null
	},
	{
		from: 24,
		to: 379,
		weight: -0.002541234187883795,
		gater: null
	},
	{
		from: 25,
		to: 360,
		weight: -0.08322580414597153,
		gater: null
	},
	{
		from: 25,
		to: 361,
		weight: -0.0889686950620725,
		gater: null
	},
	{
		from: 25,
		to: 362,
		weight: 0.038085847727700045,
		gater: null
	},
	{
		from: 25,
		to: 363,
		weight: -0.07684096950615818,
		gater: null
	},
	{
		from: 25,
		to: 364,
		weight: 0.000639454327149333,
		gater: null
	},
	{
		from: 25,
		to: 365,
		weight: 0.0554721253997999,
		gater: null
	},
	{
		from: 25,
		to: 366,
		weight: 0.07518834090892437,
		gater: null
	},
	{
		from: 25,
		to: 367,
		weight: -0.021965802209085616,
		gater: null
	},
	{
		from: 25,
		to: 368,
		weight: -0.025407340843953824,
		gater: null
	},
	{
		from: 25,
		to: 369,
		weight: -0.09093980959702233,
		gater: null
	},
	{
		from: 25,
		to: 370,
		weight: -0.05482858831820128,
		gater: null
	},
	{
		from: 25,
		to: 371,
		weight: -0.09533401208209034,
		gater: null
	},
	{
		from: 25,
		to: 372,
		weight: 0.06012532688286609,
		gater: null
	},
	{
		from: 25,
		to: 373,
		weight: 0.02350039929481773,
		gater: null
	},
	{
		from: 25,
		to: 374,
		weight: 0.005083601405829891,
		gater: null
	},
	{
		from: 25,
		to: 375,
		weight: -0.0571795062974112,
		gater: null
	},
	{
		from: 25,
		to: 376,
		weight: -0.0900322502965652,
		gater: null
	},
	{
		from: 25,
		to: 377,
		weight: -0.035531937387699,
		gater: null
	},
	{
		from: 25,
		to: 378,
		weight: -0.04215591914125843,
		gater: null
	},
	{
		from: 25,
		to: 379,
		weight: 0.016889170155823585,
		gater: null
	},
	{
		from: 26,
		to: 360,
		weight: -0.07456941735734697,
		gater: null
	},
	{
		from: 26,
		to: 361,
		weight: -0.034713316487644225,
		gater: null
	},
	{
		from: 26,
		to: 362,
		weight: 0.03088978606519968,
		gater: null
	},
	{
		from: 26,
		to: 363,
		weight: -0.06530349007897063,
		gater: null
	},
	{
		from: 26,
		to: 364,
		weight: -0.030350015995392887,
		gater: null
	},
	{
		from: 26,
		to: 365,
		weight: 0.017374858617008687,
		gater: null
	},
	{
		from: 26,
		to: 366,
		weight: 0.0284658276823683,
		gater: null
	},
	{
		from: 26,
		to: 367,
		weight: -0.061848494366707654,
		gater: null
	},
	{
		from: 26,
		to: 368,
		weight: -0.0776906120052876,
		gater: null
	},
	{
		from: 26,
		to: 369,
		weight: -0.08056616540353896,
		gater: null
	},
	{
		from: 26,
		to: 370,
		weight: 0.00854336165389298,
		gater: null
	},
	{
		from: 26,
		to: 371,
		weight: 0.06686743845160623,
		gater: null
	},
	{
		from: 26,
		to: 372,
		weight: 0.034179964680956576,
		gater: null
	},
	{
		from: 26,
		to: 373,
		weight: -0.08721513403355496,
		gater: null
	},
	{
		from: 26,
		to: 374,
		weight: 0.01941499436098662,
		gater: null
	},
	{
		from: 26,
		to: 375,
		weight: -0.05516153734394078,
		gater: null
	},
	{
		from: 26,
		to: 376,
		weight: -0.029966718853954175,
		gater: null
	},
	{
		from: 26,
		to: 377,
		weight: -0.09768538145268346,
		gater: null
	},
	{
		from: 26,
		to: 378,
		weight: -0.0422940885569032,
		gater: null
	},
	{
		from: 26,
		to: 379,
		weight: -0.05868312282452917,
		gater: null
	},
	{
		from: 27,
		to: 360,
		weight: -0.09923599999134183,
		gater: null
	},
	{
		from: 27,
		to: 361,
		weight: -0.07667828375448763,
		gater: null
	},
	{
		from: 27,
		to: 362,
		weight: -0.06312372786144023,
		gater: null
	},
	{
		from: 27,
		to: 363,
		weight: 0.005119167532590604,
		gater: null
	},
	{
		from: 27,
		to: 364,
		weight: 0.04512251868847922,
		gater: null
	},
	{
		from: 27,
		to: 365,
		weight: -0.013460246274577245,
		gater: null
	},
	{
		from: 27,
		to: 366,
		weight: -0.01615168604661074,
		gater: null
	},
	{
		from: 27,
		to: 367,
		weight: 0.09662530415745466,
		gater: null
	},
	{
		from: 27,
		to: 368,
		weight: -0.005438633973735868,
		gater: null
	},
	{
		from: 27,
		to: 369,
		weight: 0.03415370083434022,
		gater: null
	},
	{
		from: 27,
		to: 370,
		weight: -0.03705074925988465,
		gater: null
	},
	{
		from: 27,
		to: 371,
		weight: 0.00431634476866391,
		gater: null
	},
	{
		from: 27,
		to: 372,
		weight: -0.07782296945567686,
		gater: null
	},
	{
		from: 27,
		to: 373,
		weight: -0.058118602763264526,
		gater: null
	},
	{
		from: 27,
		to: 374,
		weight: 0.02827626224624008,
		gater: null
	},
	{
		from: 27,
		to: 375,
		weight: -0.09160634669339128,
		gater: null
	},
	{
		from: 27,
		to: 376,
		weight: 0.06379481413825147,
		gater: null
	},
	{
		from: 27,
		to: 377,
		weight: 0.0521088610877575,
		gater: null
	},
	{
		from: 27,
		to: 378,
		weight: -0.09667904519923405,
		gater: null
	},
	{
		from: 27,
		to: 379,
		weight: -0.021391586498499177,
		gater: null
	},
	{
		from: 28,
		to: 360,
		weight: 0.06634581837661249,
		gater: null
	},
	{
		from: 28,
		to: 361,
		weight: 0.02496045075819056,
		gater: null
	},
	{
		from: 28,
		to: 362,
		weight: 0.07639019262465271,
		gater: null
	},
	{
		from: 28,
		to: 363,
		weight: 0.06851264036793916,
		gater: null
	},
	{
		from: 28,
		to: 364,
		weight: -0.03896003712813863,
		gater: null
	},
	{
		from: 28,
		to: 365,
		weight: -0.05302262911366205,
		gater: null
	},
	{
		from: 28,
		to: 366,
		weight: 0.03971368686231003,
		gater: null
	},
	{
		from: 28,
		to: 367,
		weight: 0.035601622596201754,
		gater: null
	},
	{
		from: 28,
		to: 368,
		weight: 0.03613912349794601,
		gater: null
	},
	{
		from: 28,
		to: 369,
		weight: 0.05752906141111522,
		gater: null
	},
	{
		from: 28,
		to: 370,
		weight: -0.004356905465823721,
		gater: null
	},
	{
		from: 28,
		to: 371,
		weight: -0.026884944231937394,
		gater: null
	},
	{
		from: 28,
		to: 372,
		weight: -0.021911036706175002,
		gater: null
	},
	{
		from: 28,
		to: 373,
		weight: 0.09535894876877668,
		gater: null
	},
	{
		from: 28,
		to: 374,
		weight: 0.06971611199388969,
		gater: null
	},
	{
		from: 28,
		to: 375,
		weight: 0.04996182602022178,
		gater: null
	},
	{
		from: 28,
		to: 376,
		weight: 0.053511372341165625,
		gater: null
	},
	{
		from: 28,
		to: 377,
		weight: -0.047405475397707036,
		gater: null
	},
	{
		from: 28,
		to: 378,
		weight: 0.06819999592096723,
		gater: null
	},
	{
		from: 28,
		to: 379,
		weight: -0.020385967681091577,
		gater: null
	},
	{
		from: 29,
		to: 360,
		weight: -0.07980333527748043,
		gater: null
	},
	{
		from: 29,
		to: 361,
		weight: -0.06005221603666149,
		gater: null
	},
	{
		from: 29,
		to: 362,
		weight: 0.03490205508083566,
		gater: null
	},
	{
		from: 29,
		to: 363,
		weight: -0.09546655504857059,
		gater: null
	},
	{
		from: 29,
		to: 364,
		weight: 0.059254444647302645,
		gater: null
	},
	{
		from: 29,
		to: 365,
		weight: 0.05516023591321986,
		gater: null
	},
	{
		from: 29,
		to: 366,
		weight: -0.03894218947563051,
		gater: null
	},
	{
		from: 29,
		to: 367,
		weight: -0.03928735836148825,
		gater: null
	},
	{
		from: 29,
		to: 368,
		weight: -0.023199018902800045,
		gater: null
	},
	{
		from: 29,
		to: 369,
		weight: -0.03431571129004217,
		gater: null
	},
	{
		from: 29,
		to: 370,
		weight: -0.05237536969560557,
		gater: null
	},
	{
		from: 29,
		to: 371,
		weight: -0.01921967302834164,
		gater: null
	},
	{
		from: 29,
		to: 372,
		weight: 0.06279954094404619,
		gater: null
	},
	{
		from: 29,
		to: 373,
		weight: -0.09273263459222912,
		gater: null
	},
	{
		from: 29,
		to: 374,
		weight: -0.02001772344910724,
		gater: null
	},
	{
		from: 29,
		to: 375,
		weight: -0.08047376661445878,
		gater: null
	},
	{
		from: 29,
		to: 376,
		weight: -0.09173499101291115,
		gater: null
	},
	{
		from: 29,
		to: 377,
		weight: -0.06301537081798,
		gater: null
	},
	{
		from: 29,
		to: 378,
		weight: -0.040786519626356516,
		gater: null
	},
	{
		from: 29,
		to: 379,
		weight: 0.0609480187204805,
		gater: null
	},
	{
		from: 30,
		to: 360,
		weight: -0.08904311578428788,
		gater: null
	},
	{
		from: 30,
		to: 361,
		weight: 0.09215087099755342,
		gater: null
	},
	{
		from: 30,
		to: 362,
		weight: -0.012840048571410898,
		gater: null
	},
	{
		from: 30,
		to: 363,
		weight: 0.0990052342966444,
		gater: null
	},
	{
		from: 30,
		to: 364,
		weight: -0.05516547321393861,
		gater: null
	},
	{
		from: 30,
		to: 365,
		weight: -0.06395194610606944,
		gater: null
	},
	{
		from: 30,
		to: 366,
		weight: -0.06138300505398458,
		gater: null
	},
	{
		from: 30,
		to: 367,
		weight: 0.060768084775939285,
		gater: null
	},
	{
		from: 30,
		to: 368,
		weight: 0.010748304127590022,
		gater: null
	},
	{
		from: 30,
		to: 369,
		weight: -0.05390988323481008,
		gater: null
	},
	{
		from: 30,
		to: 370,
		weight: 0.007187815898108199,
		gater: null
	},
	{
		from: 30,
		to: 371,
		weight: -0.0867472597545457,
		gater: null
	},
	{
		from: 30,
		to: 372,
		weight: -0.04824615691449106,
		gater: null
	},
	{
		from: 30,
		to: 373,
		weight: -0.07226183351768999,
		gater: null
	},
	{
		from: 30,
		to: 374,
		weight: 0.006203285269766476,
		gater: null
	},
	{
		from: 30,
		to: 375,
		weight: -0.02677473801804986,
		gater: null
	},
	{
		from: 30,
		to: 376,
		weight: -0.08625389994967035,
		gater: null
	},
	{
		from: 30,
		to: 377,
		weight: 0.06078338673564093,
		gater: null
	},
	{
		from: 30,
		to: 378,
		weight: 0.09744015326266672,
		gater: null
	},
	{
		from: 30,
		to: 379,
		weight: 0.09972293807041507,
		gater: null
	},
	{
		from: 31,
		to: 360,
		weight: 0.05326259710475703,
		gater: null
	},
	{
		from: 31,
		to: 361,
		weight: 0.06915882563718687,
		gater: null
	},
	{
		from: 31,
		to: 362,
		weight: 0.057631953042850265,
		gater: null
	},
	{
		from: 31,
		to: 363,
		weight: 0.0660777298988536,
		gater: null
	},
	{
		from: 31,
		to: 364,
		weight: -0.015633169241186226,
		gater: null
	},
	{
		from: 31,
		to: 365,
		weight: 0.08058084062244544,
		gater: null
	},
	{
		from: 31,
		to: 366,
		weight: 0.09831892193301989,
		gater: null
	},
	{
		from: 31,
		to: 367,
		weight: 0.056615431642225156,
		gater: null
	},
	{
		from: 31,
		to: 368,
		weight: -0.08347328698135344,
		gater: null
	},
	{
		from: 31,
		to: 369,
		weight: 0.0757356985557188,
		gater: null
	},
	{
		from: 31,
		to: 370,
		weight: 0.0798610365442361,
		gater: null
	},
	{
		from: 31,
		to: 371,
		weight: -0.085837085171497,
		gater: null
	},
	{
		from: 31,
		to: 372,
		weight: 0.05909115362914527,
		gater: null
	},
	{
		from: 31,
		to: 373,
		weight: -0.07348867748514279,
		gater: null
	},
	{
		from: 31,
		to: 374,
		weight: -0.08281031235530252,
		gater: null
	},
	{
		from: 31,
		to: 375,
		weight: 0.077315141033267,
		gater: null
	},
	{
		from: 31,
		to: 376,
		weight: -0.07170230417669426,
		gater: null
	},
	{
		from: 31,
		to: 377,
		weight: -0.004601031338380232,
		gater: null
	},
	{
		from: 31,
		to: 378,
		weight: 0.023654670213497736,
		gater: null
	},
	{
		from: 31,
		to: 379,
		weight: -0.09787802993208078,
		gater: null
	},
	{
		from: 32,
		to: 360,
		weight: 0.06602319587940839,
		gater: null
	},
	{
		from: 32,
		to: 361,
		weight: 0.08612943004811552,
		gater: null
	},
	{
		from: 32,
		to: 362,
		weight: -0.003534898616114293,
		gater: null
	},
	{
		from: 32,
		to: 363,
		weight: -0.023446794395481557,
		gater: null
	},
	{
		from: 32,
		to: 364,
		weight: 0.015655346044280233,
		gater: null
	},
	{
		from: 32,
		to: 365,
		weight: -0.06599978316158253,
		gater: null
	},
	{
		from: 32,
		to: 366,
		weight: -0.06314078019339453,
		gater: null
	},
	{
		from: 32,
		to: 367,
		weight: 0.05636311249798115,
		gater: null
	},
	{
		from: 32,
		to: 368,
		weight: 0.09252980213929315,
		gater: null
	},
	{
		from: 32,
		to: 369,
		weight: 0.020655438410778257,
		gater: null
	},
	{
		from: 32,
		to: 370,
		weight: 0.02115333606786289,
		gater: null
	},
	{
		from: 32,
		to: 371,
		weight: -0.09875049564778667,
		gater: null
	},
	{
		from: 32,
		to: 372,
		weight: -0.08159469832777999,
		gater: null
	},
	{
		from: 32,
		to: 373,
		weight: 0.04775500662683982,
		gater: null
	},
	{
		from: 32,
		to: 374,
		weight: 0.007208325661076348,
		gater: null
	},
	{
		from: 32,
		to: 375,
		weight: -0.02396758423894059,
		gater: null
	},
	{
		from: 32,
		to: 376,
		weight: 0.064280986647344,
		gater: null
	},
	{
		from: 32,
		to: 377,
		weight: 0.07294350964278551,
		gater: null
	},
	{
		from: 32,
		to: 378,
		weight: 0.08703527665234351,
		gater: null
	},
	{
		from: 32,
		to: 379,
		weight: -0.09254128854270785,
		gater: null
	},
	{
		from: 33,
		to: 360,
		weight: 0.01964040994831455,
		gater: null
	},
	{
		from: 33,
		to: 361,
		weight: -0.0878311516140705,
		gater: null
	},
	{
		from: 33,
		to: 362,
		weight: -0.08925668287925625,
		gater: null
	},
	{
		from: 33,
		to: 363,
		weight: 0.06504986642496968,
		gater: null
	},
	{
		from: 33,
		to: 364,
		weight: 0.014619784251989731,
		gater: null
	},
	{
		from: 33,
		to: 365,
		weight: -0.09574188823578456,
		gater: null
	},
	{
		from: 33,
		to: 366,
		weight: -0.08641389945215955,
		gater: null
	},
	{
		from: 33,
		to: 367,
		weight: 0.06361816691291669,
		gater: null
	},
	{
		from: 33,
		to: 368,
		weight: -0.06942457652836148,
		gater: null
	},
	{
		from: 33,
		to: 369,
		weight: 0.05259898743142463,
		gater: null
	},
	{
		from: 33,
		to: 370,
		weight: -0.031142670752511314,
		gater: null
	},
	{
		from: 33,
		to: 371,
		weight: 0.018026516811059518,
		gater: null
	},
	{
		from: 33,
		to: 372,
		weight: -0.04229936706450226,
		gater: null
	},
	{
		from: 33,
		to: 373,
		weight: -0.09640985343464462,
		gater: null
	},
	{
		from: 33,
		to: 374,
		weight: 0.08097606327244586,
		gater: null
	},
	{
		from: 33,
		to: 375,
		weight: -0.000322612961479285,
		gater: null
	},
	{
		from: 33,
		to: 376,
		weight: -0.08942657615981792,
		gater: null
	},
	{
		from: 33,
		to: 377,
		weight: -0.050908513263996015,
		gater: null
	},
	{
		from: 33,
		to: 378,
		weight: -0.061155868133755224,
		gater: null
	},
	{
		from: 33,
		to: 379,
		weight: -0.07348464023042461,
		gater: null
	},
	{
		from: 34,
		to: 360,
		weight: 0.08559169758800719,
		gater: null
	},
	{
		from: 34,
		to: 361,
		weight: 0.061707928534026346,
		gater: null
	},
	{
		from: 34,
		to: 362,
		weight: 0.024409908554140353,
		gater: null
	},
	{
		from: 34,
		to: 363,
		weight: 0.07844254774488699,
		gater: null
	},
	{
		from: 34,
		to: 364,
		weight: -0.008379755567097955,
		gater: null
	},
	{
		from: 34,
		to: 365,
		weight: 0.02042353260786811,
		gater: null
	},
	{
		from: 34,
		to: 366,
		weight: 0.04482625981568383,
		gater: null
	},
	{
		from: 34,
		to: 367,
		weight: 0.0812760186797172,
		gater: null
	},
	{
		from: 34,
		to: 368,
		weight: -0.06763947351387883,
		gater: null
	},
	{
		from: 34,
		to: 369,
		weight: 0.09764694215137723,
		gater: null
	},
	{
		from: 34,
		to: 370,
		weight: -0.03487237693266701,
		gater: null
	},
	{
		from: 34,
		to: 371,
		weight: -0.005114677307653179,
		gater: null
	},
	{
		from: 34,
		to: 372,
		weight: -0.09856001788333067,
		gater: null
	},
	{
		from: 34,
		to: 373,
		weight: -0.019835064234457175,
		gater: null
	},
	{
		from: 34,
		to: 374,
		weight: -0.016914916059408286,
		gater: null
	},
	{
		from: 34,
		to: 375,
		weight: -0.0651530585118377,
		gater: null
	},
	{
		from: 34,
		to: 376,
		weight: -0.03189652684097202,
		gater: null
	},
	{
		from: 34,
		to: 377,
		weight: 0.007064123842594985,
		gater: null
	},
	{
		from: 34,
		to: 378,
		weight: -0.037866905083945614,
		gater: null
	},
	{
		from: 34,
		to: 379,
		weight: 0.0013889493118725282,
		gater: null
	},
	{
		from: 35,
		to: 360,
		weight: -0.08092887111012699,
		gater: null
	},
	{
		from: 35,
		to: 361,
		weight: 0.07037266853545465,
		gater: null
	},
	{
		from: 35,
		to: 362,
		weight: 0.06866429038532598,
		gater: null
	},
	{
		from: 35,
		to: 363,
		weight: -0.057863850481344375,
		gater: null
	},
	{
		from: 35,
		to: 364,
		weight: -0.0366055261058814,
		gater: null
	},
	{
		from: 35,
		to: 365,
		weight: -0.0358264274552941,
		gater: null
	},
	{
		from: 35,
		to: 366,
		weight: -0.08295598985657074,
		gater: null
	},
	{
		from: 35,
		to: 367,
		weight: 0.029956937850522947,
		gater: null
	},
	{
		from: 35,
		to: 368,
		weight: 0.042668018520641615,
		gater: null
	},
	{
		from: 35,
		to: 369,
		weight: -0.06682137624343328,
		gater: null
	},
	{
		from: 35,
		to: 370,
		weight: -0.04724834391100559,
		gater: null
	},
	{
		from: 35,
		to: 371,
		weight: 0.06679179140247268,
		gater: null
	},
	{
		from: 35,
		to: 372,
		weight: 0.04898458038623263,
		gater: null
	},
	{
		from: 35,
		to: 373,
		weight: -0.08838353421522648,
		gater: null
	},
	{
		from: 35,
		to: 374,
		weight: -0.08392452631653358,
		gater: null
	},
	{
		from: 35,
		to: 375,
		weight: 0.033034214505393816,
		gater: null
	},
	{
		from: 35,
		to: 376,
		weight: -0.0746529947118067,
		gater: null
	},
	{
		from: 35,
		to: 377,
		weight: 0.07720096888872183,
		gater: null
	},
	{
		from: 35,
		to: 378,
		weight: -0.0017879672310554956,
		gater: null
	},
	{
		from: 35,
		to: 379,
		weight: -0.020666855992403615,
		gater: null
	},
	{
		from: 36,
		to: 360,
		weight: -0.06084835034275509,
		gater: null
	},
	{
		from: 36,
		to: 361,
		weight: -0.08224433101622385,
		gater: null
	},
	{
		from: 36,
		to: 362,
		weight: -0.03532901606900536,
		gater: null
	},
	{
		from: 36,
		to: 363,
		weight: -0.056090521544975715,
		gater: null
	},
	{
		from: 36,
		to: 364,
		weight: -0.05303472898433914,
		gater: null
	},
	{
		from: 36,
		to: 365,
		weight: 0.098585964537935,
		gater: null
	},
	{
		from: 36,
		to: 366,
		weight: 0.09260615825378382,
		gater: null
	},
	{
		from: 36,
		to: 367,
		weight: 0.09475934500780103,
		gater: null
	},
	{
		from: 36,
		to: 368,
		weight: -0.03354528748920581,
		gater: null
	},
	{
		from: 36,
		to: 369,
		weight: 0.09421783937278058,
		gater: null
	},
	{
		from: 36,
		to: 370,
		weight: -0.032276721183234255,
		gater: null
	},
	{
		from: 36,
		to: 371,
		weight: 0.0436195692904969,
		gater: null
	},
	{
		from: 36,
		to: 372,
		weight: 0.011424235954384715,
		gater: null
	},
	{
		from: 36,
		to: 373,
		weight: -0.03796752866420272,
		gater: null
	},
	{
		from: 36,
		to: 374,
		weight: -0.07068447213087864,
		gater: null
	},
	{
		from: 36,
		to: 375,
		weight: 0.03493797730552908,
		gater: null
	},
	{
		from: 36,
		to: 376,
		weight: 0.0435459461963697,
		gater: null
	},
	{
		from: 36,
		to: 377,
		weight: -0.023380456202642202,
		gater: null
	},
	{
		from: 36,
		to: 378,
		weight: -0.098836376188001,
		gater: null
	},
	{
		from: 36,
		to: 379,
		weight: 0.07436718338102666,
		gater: null
	},
	{
		from: 37,
		to: 360,
		weight: -0.07655288560862666,
		gater: null
	},
	{
		from: 37,
		to: 361,
		weight: -0.08365367806978932,
		gater: null
	},
	{
		from: 37,
		to: 362,
		weight: -0.044468669551405916,
		gater: null
	},
	{
		from: 37,
		to: 363,
		weight: 0.05651479847193036,
		gater: null
	},
	{
		from: 37,
		to: 364,
		weight: -0.012684462958600304,
		gater: null
	},
	{
		from: 37,
		to: 365,
		weight: -0.04625793988829927,
		gater: null
	},
	{
		from: 37,
		to: 366,
		weight: 0.05900576005132807,
		gater: null
	},
	{
		from: 37,
		to: 367,
		weight: 0.09174803350218178,
		gater: null
	},
	{
		from: 37,
		to: 368,
		weight: 0.08546302392402505,
		gater: null
	},
	{
		from: 37,
		to: 369,
		weight: 0.0027232480386456953,
		gater: null
	},
	{
		from: 37,
		to: 370,
		weight: -0.01676314260747222,
		gater: null
	},
	{
		from: 37,
		to: 371,
		weight: 0.09654845934327669,
		gater: null
	},
	{
		from: 37,
		to: 372,
		weight: 0.054381079178097785,
		gater: null
	},
	{
		from: 37,
		to: 373,
		weight: 0.0032436543502329107,
		gater: null
	},
	{
		from: 37,
		to: 374,
		weight: 0.09434973625939369,
		gater: null
	},
	{
		from: 37,
		to: 375,
		weight: -0.06577653318179749,
		gater: null
	},
	{
		from: 37,
		to: 376,
		weight: 0.09266170889588543,
		gater: null
	},
	{
		from: 37,
		to: 377,
		weight: 0.06406598202392552,
		gater: null
	},
	{
		from: 37,
		to: 378,
		weight: 0.05484034868017812,
		gater: null
	},
	{
		from: 37,
		to: 379,
		weight: -0.008607685978791357,
		gater: null
	},
	{
		from: 38,
		to: 360,
		weight: 0.062067267239221374,
		gater: null
	},
	{
		from: 38,
		to: 361,
		weight: 0.01077164824541424,
		gater: null
	},
	{
		from: 38,
		to: 362,
		weight: -0.08559168985864965,
		gater: null
	},
	{
		from: 38,
		to: 363,
		weight: -0.09549568908852374,
		gater: null
	},
	{
		from: 38,
		to: 364,
		weight: 0.09912755340226048,
		gater: null
	},
	{
		from: 38,
		to: 365,
		weight: 0.09345614999247373,
		gater: null
	},
	{
		from: 38,
		to: 366,
		weight: -0.03543370422232495,
		gater: null
	},
	{
		from: 38,
		to: 367,
		weight: 0.007421426627820707,
		gater: null
	},
	{
		from: 38,
		to: 368,
		weight: 0.074698359169173,
		gater: null
	},
	{
		from: 38,
		to: 369,
		weight: -0.06126413653606826,
		gater: null
	},
	{
		from: 38,
		to: 370,
		weight: -0.017509270458954118,
		gater: null
	},
	{
		from: 38,
		to: 371,
		weight: -0.08344618954312139,
		gater: null
	},
	{
		from: 38,
		to: 372,
		weight: -0.051159426918776424,
		gater: null
	},
	{
		from: 38,
		to: 373,
		weight: 0.08222717613249816,
		gater: null
	},
	{
		from: 38,
		to: 374,
		weight: 0.010659369767274246,
		gater: null
	},
	{
		from: 38,
		to: 375,
		weight: -0.08001874727844482,
		gater: null
	},
	{
		from: 38,
		to: 376,
		weight: 0.0584085407250281,
		gater: null
	},
	{
		from: 38,
		to: 377,
		weight: 0.029277800528674153,
		gater: null
	},
	{
		from: 38,
		to: 378,
		weight: 0.04937229272169169,
		gater: null
	},
	{
		from: 38,
		to: 379,
		weight: -0.05481944393392135,
		gater: null
	},
	{
		from: 39,
		to: 360,
		weight: 0.00393223846370469,
		gater: null
	},
	{
		from: 39,
		to: 361,
		weight: -0.013445333047398783,
		gater: null
	},
	{
		from: 39,
		to: 362,
		weight: 0.022679291880749727,
		gater: null
	},
	{
		from: 39,
		to: 363,
		weight: 0.07144243941963244,
		gater: null
	},
	{
		from: 39,
		to: 364,
		weight: 0.06273062999921783,
		gater: null
	},
	{
		from: 39,
		to: 365,
		weight: 0.05768091104257375,
		gater: null
	},
	{
		from: 39,
		to: 366,
		weight: 0.00873800616201477,
		gater: null
	},
	{
		from: 39,
		to: 367,
		weight: -0.032730117103110024,
		gater: null
	},
	{
		from: 39,
		to: 368,
		weight: -0.034400307818116094,
		gater: null
	},
	{
		from: 39,
		to: 369,
		weight: 0.09216127442501373,
		gater: null
	},
	{
		from: 39,
		to: 370,
		weight: 0.08829921652256267,
		gater: null
	},
	{
		from: 39,
		to: 371,
		weight: 0.006510722281557205,
		gater: null
	},
	{
		from: 39,
		to: 372,
		weight: 0.09560155018104624,
		gater: null
	},
	{
		from: 39,
		to: 373,
		weight: -0.0025208217625354717,
		gater: null
	},
	{
		from: 39,
		to: 374,
		weight: 0.09379543242339944,
		gater: null
	},
	{
		from: 39,
		to: 375,
		weight: -0.061837163966401355,
		gater: null
	},
	{
		from: 39,
		to: 376,
		weight: 0.0789679450596352,
		gater: null
	},
	{
		from: 39,
		to: 377,
		weight: 0.013218665158225826,
		gater: null
	},
	{
		from: 39,
		to: 378,
		weight: 0.08057898699851199,
		gater: null
	},
	{
		from: 39,
		to: 379,
		weight: 0.02015762884684942,
		gater: null
	},
	{
		from: 40,
		to: 360,
		weight: 0.05292217618982922,
		gater: null
	},
	{
		from: 40,
		to: 361,
		weight: 0.04426589708610701,
		gater: null
	},
	{
		from: 40,
		to: 362,
		weight: -0.02829902093619152,
		gater: null
	},
	{
		from: 40,
		to: 363,
		weight: -0.07958184530355,
		gater: null
	},
	{
		from: 40,
		to: 364,
		weight: -0.0015927248369557445,
		gater: null
	},
	{
		from: 40,
		to: 365,
		weight: 0.012180301161325374,
		gater: null
	},
	{
		from: 40,
		to: 366,
		weight: 0.07049541704446524,
		gater: null
	},
	{
		from: 40,
		to: 367,
		weight: -0.07070224611769796,
		gater: null
	},
	{
		from: 40,
		to: 368,
		weight: -0.036683654811488164,
		gater: null
	},
	{
		from: 40,
		to: 369,
		weight: 0.06999600412054524,
		gater: null
	},
	{
		from: 40,
		to: 370,
		weight: -0.09645134245811193,
		gater: null
	},
	{
		from: 40,
		to: 371,
		weight: 0.027337398313995787,
		gater: null
	},
	{
		from: 40,
		to: 372,
		weight: 0.007029864883561082,
		gater: null
	},
	{
		from: 40,
		to: 373,
		weight: -0.023124826623959732,
		gater: null
	},
	{
		from: 40,
		to: 374,
		weight: 0.017482238352206372,
		gater: null
	},
	{
		from: 40,
		to: 375,
		weight: 0.06743518406954893,
		gater: null
	},
	{
		from: 40,
		to: 376,
		weight: 0.0000675861259471916,
		gater: null
	},
	{
		from: 40,
		to: 377,
		weight: -0.06001058865474747,
		gater: null
	},
	{
		from: 40,
		to: 378,
		weight: -0.08287817538642438,
		gater: null
	},
	{
		from: 40,
		to: 379,
		weight: -0.029616578978483826,
		gater: null
	},
	{
		from: 41,
		to: 360,
		weight: 0.018871648038302297,
		gater: null
	},
	{
		from: 41,
		to: 361,
		weight: -0.04929695134578931,
		gater: null
	},
	{
		from: 41,
		to: 362,
		weight: -0.030263916720421905,
		gater: null
	},
	{
		from: 41,
		to: 363,
		weight: 0.03190754544660318,
		gater: null
	},
	{
		from: 41,
		to: 364,
		weight: -0.045165753511079654,
		gater: null
	},
	{
		from: 41,
		to: 365,
		weight: 0.019691943999775724,
		gater: null
	},
	{
		from: 41,
		to: 366,
		weight: -0.00812587413964283,
		gater: null
	},
	{
		from: 41,
		to: 367,
		weight: 0.04557233181199233,
		gater: null
	},
	{
		from: 41,
		to: 368,
		weight: -0.04574687425176203,
		gater: null
	},
	{
		from: 41,
		to: 369,
		weight: -0.045664885862532506,
		gater: null
	},
	{
		from: 41,
		to: 370,
		weight: 0.05710136418090658,
		gater: null
	},
	{
		from: 41,
		to: 371,
		weight: -0.08487349871515769,
		gater: null
	},
	{
		from: 41,
		to: 372,
		weight: -0.07650544590628941,
		gater: null
	},
	{
		from: 41,
		to: 373,
		weight: 0.08319289336599586,
		gater: null
	},
	{
		from: 41,
		to: 374,
		weight: -0.027396236447979616,
		gater: null
	},
	{
		from: 41,
		to: 375,
		weight: -0.013759136427930058,
		gater: null
	},
	{
		from: 41,
		to: 376,
		weight: -0.025831883053674884,
		gater: null
	},
	{
		from: 41,
		to: 377,
		weight: 0.07074222199049726,
		gater: null
	},
	{
		from: 41,
		to: 378,
		weight: -0.04459512684347766,
		gater: null
	},
	{
		from: 41,
		to: 379,
		weight: 0.09374693713430388,
		gater: null
	},
	{
		from: 42,
		to: 360,
		weight: -0.03578318020312894,
		gater: null
	},
	{
		from: 42,
		to: 361,
		weight: -0.06497109457305927,
		gater: null
	},
	{
		from: 42,
		to: 362,
		weight: -0.09645885009673193,
		gater: null
	},
	{
		from: 42,
		to: 363,
		weight: -0.04878653192511404,
		gater: null
	},
	{
		from: 42,
		to: 364,
		weight: 0.06522167732431991,
		gater: null
	},
	{
		from: 42,
		to: 365,
		weight: 0.014694762274141529,
		gater: null
	},
	{
		from: 42,
		to: 366,
		weight: -0.04336000516391408,
		gater: null
	},
	{
		from: 42,
		to: 367,
		weight: -0.011416031376700664,
		gater: null
	},
	{
		from: 42,
		to: 368,
		weight: 0.09553595283701863,
		gater: null
	},
	{
		from: 42,
		to: 369,
		weight: 0.0874109126760918,
		gater: null
	},
	{
		from: 42,
		to: 370,
		weight: 0.01436277745144783,
		gater: null
	},
	{
		from: 42,
		to: 371,
		weight: -0.04814094602071779,
		gater: null
	},
	{
		from: 42,
		to: 372,
		weight: -0.0018273427129937847,
		gater: null
	},
	{
		from: 42,
		to: 373,
		weight: -0.064081022939247,
		gater: null
	},
	{
		from: 42,
		to: 374,
		weight: 0.06645952782521744,
		gater: null
	},
	{
		from: 42,
		to: 375,
		weight: -0.01023517107749114,
		gater: null
	},
	{
		from: 42,
		to: 376,
		weight: -0.048850211083892384,
		gater: null
	},
	{
		from: 42,
		to: 377,
		weight: -0.046999464552455184,
		gater: null
	},
	{
		from: 42,
		to: 378,
		weight: -0.08190704779643161,
		gater: null
	},
	{
		from: 42,
		to: 379,
		weight: 0.05307254636248665,
		gater: null
	},
	{
		from: 43,
		to: 360,
		weight: 0.03791434810296743,
		gater: null
	},
	{
		from: 43,
		to: 361,
		weight: -0.07007664965884884,
		gater: null
	},
	{
		from: 43,
		to: 362,
		weight: 0.03454003816363013,
		gater: null
	},
	{
		from: 43,
		to: 363,
		weight: -0.028741226030427974,
		gater: null
	},
	{
		from: 43,
		to: 364,
		weight: -0.01457899191300864,
		gater: null
	},
	{
		from: 43,
		to: 365,
		weight: -0.06470510561877446,
		gater: null
	},
	{
		from: 43,
		to: 366,
		weight: -0.0894042534409262,
		gater: null
	},
	{
		from: 43,
		to: 367,
		weight: 0.037411029932221396,
		gater: null
	},
	{
		from: 43,
		to: 368,
		weight: -0.08677433847337133,
		gater: null
	},
	{
		from: 43,
		to: 369,
		weight: 0.030468409724021678,
		gater: null
	},
	{
		from: 43,
		to: 370,
		weight: 0.02073366646246924,
		gater: null
	},
	{
		from: 43,
		to: 371,
		weight: 0.09368138391590317,
		gater: null
	},
	{
		from: 43,
		to: 372,
		weight: 0.005197976147057928,
		gater: null
	},
	{
		from: 43,
		to: 373,
		weight: -0.08196910501092498,
		gater: null
	},
	{
		from: 43,
		to: 374,
		weight: -0.09705761719114765,
		gater: null
	},
	{
		from: 43,
		to: 375,
		weight: 0.06255495870052905,
		gater: null
	},
	{
		from: 43,
		to: 376,
		weight: 0.09108898843115579,
		gater: null
	},
	{
		from: 43,
		to: 377,
		weight: 0.08419397379801116,
		gater: null
	},
	{
		from: 43,
		to: 378,
		weight: 0.0384167963299063,
		gater: null
	},
	{
		from: 43,
		to: 379,
		weight: -0.007892711472794162,
		gater: null
	},
	{
		from: 44,
		to: 360,
		weight: -0.04292513121873087,
		gater: null
	},
	{
		from: 44,
		to: 361,
		weight: 0.08012008846248544,
		gater: null
	},
	{
		from: 44,
		to: 362,
		weight: -0.054714903034729326,
		gater: null
	},
	{
		from: 44,
		to: 363,
		weight: 0.09033128294991669,
		gater: null
	},
	{
		from: 44,
		to: 364,
		weight: -0.033194527991022627,
		gater: null
	},
	{
		from: 44,
		to: 365,
		weight: 0.04430135091383733,
		gater: null
	},
	{
		from: 44,
		to: 366,
		weight: -0.022162533307759705,
		gater: null
	},
	{
		from: 44,
		to: 367,
		weight: 0.06710232705303315,
		gater: null
	},
	{
		from: 44,
		to: 368,
		weight: -0.0850548952098078,
		gater: null
	},
	{
		from: 44,
		to: 369,
		weight: -0.005061476916280269,
		gater: null
	},
	{
		from: 44,
		to: 370,
		weight: 0.08710373687483575,
		gater: null
	},
	{
		from: 44,
		to: 371,
		weight: 0.04545949333298133,
		gater: null
	},
	{
		from: 44,
		to: 372,
		weight: 0.09083625934191089,
		gater: null
	},
	{
		from: 44,
		to: 373,
		weight: 0.09090481412181273,
		gater: null
	},
	{
		from: 44,
		to: 374,
		weight: 0.08768298775483704,
		gater: null
	},
	{
		from: 44,
		to: 375,
		weight: 0.040713078646606726,
		gater: null
	},
	{
		from: 44,
		to: 376,
		weight: 0.033092426447287465,
		gater: null
	},
	{
		from: 44,
		to: 377,
		weight: -0.05513727038919574,
		gater: null
	},
	{
		from: 44,
		to: 378,
		weight: 0.027716430785540286,
		gater: null
	},
	{
		from: 44,
		to: 379,
		weight: -0.08985951814938918,
		gater: null
	},
	{
		from: 45,
		to: 360,
		weight: 0.0492518102220941,
		gater: null
	},
	{
		from: 45,
		to: 361,
		weight: 0.01775651188462106,
		gater: null
	},
	{
		from: 45,
		to: 362,
		weight: 0.09693677764644995,
		gater: null
	},
	{
		from: 45,
		to: 363,
		weight: 0.06510967197418258,
		gater: null
	},
	{
		from: 45,
		to: 364,
		weight: 0.08489754567246854,
		gater: null
	},
	{
		from: 45,
		to: 365,
		weight: -0.05675506802464323,
		gater: null
	},
	{
		from: 45,
		to: 366,
		weight: -0.05504054842705002,
		gater: null
	},
	{
		from: 45,
		to: 367,
		weight: 0.03481440102887415,
		gater: null
	},
	{
		from: 45,
		to: 368,
		weight: 0.03513000673107031,
		gater: null
	},
	{
		from: 45,
		to: 369,
		weight: 0.0484099806411217,
		gater: null
	},
	{
		from: 45,
		to: 370,
		weight: 0.06654593286577817,
		gater: null
	},
	{
		from: 45,
		to: 371,
		weight: -0.007731947260554817,
		gater: null
	},
	{
		from: 45,
		to: 372,
		weight: 0.07881237947879277,
		gater: null
	},
	{
		from: 45,
		to: 373,
		weight: 0.0015443076015242002,
		gater: null
	},
	{
		from: 45,
		to: 374,
		weight: 0.08172160780584067,
		gater: null
	},
	{
		from: 45,
		to: 375,
		weight: -0.060212998586925394,
		gater: null
	},
	{
		from: 45,
		to: 376,
		weight: 0.020228175436105597,
		gater: null
	},
	{
		from: 45,
		to: 377,
		weight: -0.0037173011799667144,
		gater: null
	},
	{
		from: 45,
		to: 378,
		weight: -0.07103966139198424,
		gater: null
	},
	{
		from: 45,
		to: 379,
		weight: -0.005950885779378551,
		gater: null
	},
	{
		from: 46,
		to: 360,
		weight: -0.09348520754800377,
		gater: null
	},
	{
		from: 46,
		to: 361,
		weight: 0.04984439268125582,
		gater: null
	},
	{
		from: 46,
		to: 362,
		weight: 0.04970785473318928,
		gater: null
	},
	{
		from: 46,
		to: 363,
		weight: -0.02894670575418594,
		gater: null
	},
	{
		from: 46,
		to: 364,
		weight: -0.014013509381694739,
		gater: null
	},
	{
		from: 46,
		to: 365,
		weight: -0.061332246619439174,
		gater: null
	},
	{
		from: 46,
		to: 366,
		weight: -0.0357530959462435,
		gater: null
	},
	{
		from: 46,
		to: 367,
		weight: 0.051788649212399646,
		gater: null
	},
	{
		from: 46,
		to: 368,
		weight: -0.05670915280163933,
		gater: null
	},
	{
		from: 46,
		to: 369,
		weight: 0.053764157407512725,
		gater: null
	},
	{
		from: 46,
		to: 370,
		weight: -0.032191931072562865,
		gater: null
	},
	{
		from: 46,
		to: 371,
		weight: 0.06521933699906968,
		gater: null
	},
	{
		from: 46,
		to: 372,
		weight: 0.015010074525135322,
		gater: null
	},
	{
		from: 46,
		to: 373,
		weight: 0.06248180999916486,
		gater: null
	},
	{
		from: 46,
		to: 374,
		weight: -0.03223111550673506,
		gater: null
	},
	{
		from: 46,
		to: 375,
		weight: -0.06151583974837416,
		gater: null
	},
	{
		from: 46,
		to: 376,
		weight: 0.0647602062139335,
		gater: null
	},
	{
		from: 46,
		to: 377,
		weight: -0.060817442685958456,
		gater: null
	},
	{
		from: 46,
		to: 378,
		weight: -0.09332767171505188,
		gater: null
	},
	{
		from: 46,
		to: 379,
		weight: -0.08550892512158081,
		gater: null
	},
	{
		from: 47,
		to: 360,
		weight: -0.054834134426261685,
		gater: null
	},
	{
		from: 47,
		to: 361,
		weight: 0.022587811452073447,
		gater: null
	},
	{
		from: 47,
		to: 362,
		weight: 0.03309920384687079,
		gater: null
	},
	{
		from: 47,
		to: 363,
		weight: -0.01946179161833128,
		gater: null
	},
	{
		from: 47,
		to: 364,
		weight: 0.019086882828534074,
		gater: null
	},
	{
		from: 47,
		to: 365,
		weight: -0.04172508464576979,
		gater: null
	},
	{
		from: 47,
		to: 366,
		weight: 0.0031314893332606564,
		gater: null
	},
	{
		from: 47,
		to: 367,
		weight: -0.029958919034247217,
		gater: null
	},
	{
		from: 47,
		to: 368,
		weight: -0.05072930121124211,
		gater: null
	},
	{
		from: 47,
		to: 369,
		weight: -0.056390173862873066,
		gater: null
	},
	{
		from: 47,
		to: 370,
		weight: -0.09765293528921722,
		gater: null
	},
	{
		from: 47,
		to: 371,
		weight: -0.03658014650709522,
		gater: null
	},
	{
		from: 47,
		to: 372,
		weight: -0.035064745325419505,
		gater: null
	},
	{
		from: 47,
		to: 373,
		weight: 0.003546368958875501,
		gater: null
	},
	{
		from: 47,
		to: 374,
		weight: -0.04819832001700535,
		gater: null
	},
	{
		from: 47,
		to: 375,
		weight: -0.05898376612567855,
		gater: null
	},
	{
		from: 47,
		to: 376,
		weight: 0.08522432055004389,
		gater: null
	},
	{
		from: 47,
		to: 377,
		weight: -0.03881484551860806,
		gater: null
	},
	{
		from: 47,
		to: 378,
		weight: 0.05830508293151754,
		gater: null
	},
	{
		from: 47,
		to: 379,
		weight: -0.08759335148420684,
		gater: null
	},
	{
		from: 48,
		to: 360,
		weight: -0.09742071013979343,
		gater: null
	},
	{
		from: 48,
		to: 361,
		weight: 0.05763826808281289,
		gater: null
	},
	{
		from: 48,
		to: 362,
		weight: 0.06474044159273956,
		gater: null
	},
	{
		from: 48,
		to: 363,
		weight: -0.0653797354644178,
		gater: null
	},
	{
		from: 48,
		to: 364,
		weight: 0.09579213572672682,
		gater: null
	},
	{
		from: 48,
		to: 365,
		weight: -0.0018242760366011385,
		gater: null
	},
	{
		from: 48,
		to: 366,
		weight: 0.012771295701325333,
		gater: null
	},
	{
		from: 48,
		to: 367,
		weight: -0.06079363540384906,
		gater: null
	},
	{
		from: 48,
		to: 368,
		weight: 0.0875753775258919,
		gater: null
	},
	{
		from: 48,
		to: 369,
		weight: 0.07676830007027366,
		gater: null
	},
	{
		from: 48,
		to: 370,
		weight: 0.07415471224433459,
		gater: null
	},
	{
		from: 48,
		to: 371,
		weight: -0.01863893048148446,
		gater: null
	},
	{
		from: 48,
		to: 372,
		weight: -0.0163200587119062,
		gater: null
	},
	{
		from: 48,
		to: 373,
		weight: 0.06425337963644911,
		gater: null
	},
	{
		from: 48,
		to: 374,
		weight: -0.03362186020616113,
		gater: null
	},
	{
		from: 48,
		to: 375,
		weight: 0.022143545922554658,
		gater: null
	},
	{
		from: 48,
		to: 376,
		weight: 0.04108973491107623,
		gater: null
	},
	{
		from: 48,
		to: 377,
		weight: 0.05543658051404107,
		gater: null
	},
	{
		from: 48,
		to: 378,
		weight: 0.022343455732089484,
		gater: null
	},
	{
		from: 48,
		to: 379,
		weight: 0.0970794826024966,
		gater: null
	},
	{
		from: 49,
		to: 360,
		weight: -0.0667339051234499,
		gater: null
	},
	{
		from: 49,
		to: 361,
		weight: -0.05516581455301202,
		gater: null
	},
	{
		from: 49,
		to: 362,
		weight: -0.09170837437553647,
		gater: null
	},
	{
		from: 49,
		to: 363,
		weight: 0.09716412048261605,
		gater: null
	},
	{
		from: 49,
		to: 364,
		weight: 0.032185533514454884,
		gater: null
	},
	{
		from: 49,
		to: 365,
		weight: 0.09872070125674667,
		gater: null
	},
	{
		from: 49,
		to: 366,
		weight: -0.06121520766704558,
		gater: null
	},
	{
		from: 49,
		to: 367,
		weight: -0.060247325945374325,
		gater: null
	},
	{
		from: 49,
		to: 368,
		weight: 0.07214435077923062,
		gater: null
	},
	{
		from: 49,
		to: 369,
		weight: 0.06589026626498681,
		gater: null
	},
	{
		from: 49,
		to: 370,
		weight: -0.04403020878274533,
		gater: null
	},
	{
		from: 49,
		to: 371,
		weight: -0.005144840106652546,
		gater: null
	},
	{
		from: 49,
		to: 372,
		weight: -0.018608052292110294,
		gater: null
	},
	{
		from: 49,
		to: 373,
		weight: -0.015223253521450403,
		gater: null
	},
	{
		from: 49,
		to: 374,
		weight: -0.02435074782940072,
		gater: null
	},
	{
		from: 49,
		to: 375,
		weight: 0.09965115101324637,
		gater: null
	},
	{
		from: 49,
		to: 376,
		weight: 0.001581528782399394,
		gater: null
	},
	{
		from: 49,
		to: 377,
		weight: -0.03236858490792187,
		gater: null
	},
	{
		from: 49,
		to: 378,
		weight: 0.06610331525950991,
		gater: null
	},
	{
		from: 49,
		to: 379,
		weight: 0.02113733040006123,
		gater: null
	},
	{
		from: 50,
		to: 360,
		weight: -0.005766389860285548,
		gater: null
	},
	{
		from: 50,
		to: 361,
		weight: -0.0014572771164203802,
		gater: null
	},
	{
		from: 50,
		to: 362,
		weight: -0.032073459711927876,
		gater: null
	},
	{
		from: 50,
		to: 363,
		weight: 0.05788313890745808,
		gater: null
	},
	{
		from: 50,
		to: 364,
		weight: 0.051188018026205845,
		gater: null
	},
	{
		from: 50,
		to: 365,
		weight: 0.001851211864069266,
		gater: null
	},
	{
		from: 50,
		to: 366,
		weight: 0.03912260731376277,
		gater: null
	},
	{
		from: 50,
		to: 367,
		weight: 0.02581270803089969,
		gater: null
	},
	{
		from: 50,
		to: 368,
		weight: 0.01920534611476503,
		gater: null
	},
	{
		from: 50,
		to: 369,
		weight: 0.017101421473116704,
		gater: null
	},
	{
		from: 50,
		to: 370,
		weight: 0.0994193784591357,
		gater: null
	},
	{
		from: 50,
		to: 371,
		weight: 0.06770113948803277,
		gater: null
	},
	{
		from: 50,
		to: 372,
		weight: -0.07955030806000121,
		gater: null
	},
	{
		from: 50,
		to: 373,
		weight: -0.06442534486456641,
		gater: null
	},
	{
		from: 50,
		to: 374,
		weight: 0.021536337695080968,
		gater: null
	},
	{
		from: 50,
		to: 375,
		weight: -0.07388518887113699,
		gater: null
	},
	{
		from: 50,
		to: 376,
		weight: -0.09772251815383247,
		gater: null
	},
	{
		from: 50,
		to: 377,
		weight: 0.09304556597774125,
		gater: null
	},
	{
		from: 50,
		to: 378,
		weight: 0.06255450422484637,
		gater: null
	},
	{
		from: 50,
		to: 379,
		weight: 0.023908799357298033,
		gater: null
	},
	{
		from: 51,
		to: 360,
		weight: -0.08297248522106578,
		gater: null
	},
	{
		from: 51,
		to: 361,
		weight: -0.03552310209349696,
		gater: null
	},
	{
		from: 51,
		to: 362,
		weight: -0.038766143674931725,
		gater: null
	},
	{
		from: 51,
		to: 363,
		weight: 0.06303288566605744,
		gater: null
	},
	{
		from: 51,
		to: 364,
		weight: 0.04088709167445695,
		gater: null
	},
	{
		from: 51,
		to: 365,
		weight: 0.04855126977388252,
		gater: null
	},
	{
		from: 51,
		to: 366,
		weight: 0.03169012994827397,
		gater: null
	},
	{
		from: 51,
		to: 367,
		weight: -0.07837734376903974,
		gater: null
	},
	{
		from: 51,
		to: 368,
		weight: -0.0623047053395204,
		gater: null
	},
	{
		from: 51,
		to: 369,
		weight: -0.07884316210567142,
		gater: null
	},
	{
		from: 51,
		to: 370,
		weight: 0.08171873152970424,
		gater: null
	},
	{
		from: 51,
		to: 371,
		weight: -0.06079092887762343,
		gater: null
	},
	{
		from: 51,
		to: 372,
		weight: 0.08463916090879353,
		gater: null
	},
	{
		from: 51,
		to: 373,
		weight: 0.013686231529435974,
		gater: null
	},
	{
		from: 51,
		to: 374,
		weight: 0.07186303941437147,
		gater: null
	},
	{
		from: 51,
		to: 375,
		weight: 0.04933749525005582,
		gater: null
	},
	{
		from: 51,
		to: 376,
		weight: 0.04515219145998767,
		gater: null
	},
	{
		from: 51,
		to: 377,
		weight: 0.07816663149615613,
		gater: null
	},
	{
		from: 51,
		to: 378,
		weight: 0.01292931655677125,
		gater: null
	},
	{
		from: 51,
		to: 379,
		weight: 0.047450657399839724,
		gater: null
	},
	{
		from: 52,
		to: 360,
		weight: 0.0059224165038630205,
		gater: null
	},
	{
		from: 52,
		to: 361,
		weight: 0.009612351828040655,
		gater: null
	},
	{
		from: 52,
		to: 362,
		weight: -0.03502131214208441,
		gater: null
	},
	{
		from: 52,
		to: 363,
		weight: -0.03897000578789598,
		gater: null
	},
	{
		from: 52,
		to: 364,
		weight: -0.008902014943946754,
		gater: null
	},
	{
		from: 52,
		to: 365,
		weight: -0.04636709778267143,
		gater: null
	},
	{
		from: 52,
		to: 366,
		weight: -0.0965882101648929,
		gater: null
	},
	{
		from: 52,
		to: 367,
		weight: -0.08687556222119333,
		gater: null
	},
	{
		from: 52,
		to: 368,
		weight: 0.07140177033025732,
		gater: null
	},
	{
		from: 52,
		to: 369,
		weight: -0.00016935562007339144,
		gater: null
	},
	{
		from: 52,
		to: 370,
		weight: 0.08985108629299396,
		gater: null
	},
	{
		from: 52,
		to: 371,
		weight: -0.019778178280424538,
		gater: null
	},
	{
		from: 52,
		to: 372,
		weight: -0.018175673867293088,
		gater: null
	},
	{
		from: 52,
		to: 373,
		weight: 0.010479129922467315,
		gater: null
	},
	{
		from: 52,
		to: 374,
		weight: -0.09163648814200781,
		gater: null
	},
	{
		from: 52,
		to: 375,
		weight: 0.06360064960343403,
		gater: null
	},
	{
		from: 52,
		to: 376,
		weight: -0.03405850960530321,
		gater: null
	},
	{
		from: 52,
		to: 377,
		weight: -0.05305002055671886,
		gater: null
	},
	{
		from: 52,
		to: 378,
		weight: 0.0664901987760882,
		gater: null
	},
	{
		from: 52,
		to: 379,
		weight: 0.060100166857916026,
		gater: null
	},
	{
		from: 53,
		to: 360,
		weight: -0.07165978753439561,
		gater: null
	},
	{
		from: 53,
		to: 361,
		weight: 0.03166595785181889,
		gater: null
	},
	{
		from: 53,
		to: 362,
		weight: 0.07440210854720805,
		gater: null
	},
	{
		from: 53,
		to: 363,
		weight: 0.055872695197056704,
		gater: null
	},
	{
		from: 53,
		to: 364,
		weight: -0.034475361706143334,
		gater: null
	},
	{
		from: 53,
		to: 365,
		weight: -0.041207605744746134,
		gater: null
	},
	{
		from: 53,
		to: 366,
		weight: -0.04203516693191705,
		gater: null
	},
	{
		from: 53,
		to: 367,
		weight: 0.08512789974617405,
		gater: null
	},
	{
		from: 53,
		to: 368,
		weight: 0.0007541923118441901,
		gater: null
	},
	{
		from: 53,
		to: 369,
		weight: 0.05486745395974149,
		gater: null
	},
	{
		from: 53,
		to: 370,
		weight: -0.05878047818724297,
		gater: null
	},
	{
		from: 53,
		to: 371,
		weight: 0.07360713951451456,
		gater: null
	},
	{
		from: 53,
		to: 372,
		weight: -0.08509146206245051,
		gater: null
	},
	{
		from: 53,
		to: 373,
		weight: -0.0993269183576925,
		gater: null
	},
	{
		from: 53,
		to: 374,
		weight: 0.014345201457770781,
		gater: null
	},
	{
		from: 53,
		to: 375,
		weight: -0.019456379980429483,
		gater: null
	},
	{
		from: 53,
		to: 376,
		weight: -0.0515585529523555,
		gater: null
	},
	{
		from: 53,
		to: 377,
		weight: -0.059076805794297686,
		gater: null
	},
	{
		from: 53,
		to: 378,
		weight: 0.021397956780821487,
		gater: null
	},
	{
		from: 53,
		to: 379,
		weight: -0.005662331939314133,
		gater: null
	},
	{
		from: 54,
		to: 360,
		weight: 0.06501464754553021,
		gater: null
	},
	{
		from: 54,
		to: 361,
		weight: 0.04185423326682822,
		gater: null
	},
	{
		from: 54,
		to: 362,
		weight: 0.0449619534967248,
		gater: null
	},
	{
		from: 54,
		to: 363,
		weight: -0.08859733896300433,
		gater: null
	},
	{
		from: 54,
		to: 364,
		weight: -0.058379748394348896,
		gater: null
	},
	{
		from: 54,
		to: 365,
		weight: -0.025051823463972722,
		gater: null
	},
	{
		from: 54,
		to: 366,
		weight: 0.03678797999290956,
		gater: null
	},
	{
		from: 54,
		to: 367,
		weight: -0.08385541839930713,
		gater: null
	},
	{
		from: 54,
		to: 368,
		weight: 0.03233254532757801,
		gater: null
	},
	{
		from: 54,
		to: 369,
		weight: 0.063065820612446,
		gater: null
	},
	{
		from: 54,
		to: 370,
		weight: 0.04415923490260937,
		gater: null
	},
	{
		from: 54,
		to: 371,
		weight: -0.010428177291053317,
		gater: null
	},
	{
		from: 54,
		to: 372,
		weight: 0.05900526236034606,
		gater: null
	},
	{
		from: 54,
		to: 373,
		weight: -0.07781813713689628,
		gater: null
	},
	{
		from: 54,
		to: 374,
		weight: 0.01832230507674662,
		gater: null
	},
	{
		from: 54,
		to: 375,
		weight: 0.0910640351997612,
		gater: null
	},
	{
		from: 54,
		to: 376,
		weight: -0.09443268144688854,
		gater: null
	},
	{
		from: 54,
		to: 377,
		weight: -0.09311647481980367,
		gater: null
	},
	{
		from: 54,
		to: 378,
		weight: -0.03863881032747943,
		gater: null
	},
	{
		from: 54,
		to: 379,
		weight: -0.06722114110594232,
		gater: null
	},
	{
		from: 55,
		to: 360,
		weight: -0.09152829132737672,
		gater: null
	},
	{
		from: 55,
		to: 361,
		weight: 0.0937701955050585,
		gater: null
	},
	{
		from: 55,
		to: 362,
		weight: -0.028838671397093438,
		gater: null
	},
	{
		from: 55,
		to: 363,
		weight: -0.051098683780527177,
		gater: null
	},
	{
		from: 55,
		to: 364,
		weight: -0.09301321840460548,
		gater: null
	},
	{
		from: 55,
		to: 365,
		weight: 0.0650285250737189,
		gater: null
	},
	{
		from: 55,
		to: 366,
		weight: -0.058357556310870654,
		gater: null
	},
	{
		from: 55,
		to: 367,
		weight: 0.025664344472033113,
		gater: null
	},
	{
		from: 55,
		to: 368,
		weight: -0.09262918173736351,
		gater: null
	},
	{
		from: 55,
		to: 369,
		weight: -0.028166626332898168,
		gater: null
	},
	{
		from: 55,
		to: 370,
		weight: -0.007821126658596758,
		gater: null
	},
	{
		from: 55,
		to: 371,
		weight: 0.09408407476598613,
		gater: null
	},
	{
		from: 55,
		to: 372,
		weight: 0.0834040566285908,
		gater: null
	},
	{
		from: 55,
		to: 373,
		weight: 0.06066659456296372,
		gater: null
	},
	{
		from: 55,
		to: 374,
		weight: 0.08517093629323758,
		gater: null
	},
	{
		from: 55,
		to: 375,
		weight: -0.044261524390796586,
		gater: null
	},
	{
		from: 55,
		to: 376,
		weight: 0.09547949797001656,
		gater: null
	},
	{
		from: 55,
		to: 377,
		weight: -0.05580819701679079,
		gater: null
	},
	{
		from: 55,
		to: 378,
		weight: 0.005869538377845582,
		gater: null
	},
	{
		from: 55,
		to: 379,
		weight: 0.05359045464772608,
		gater: null
	},
	{
		from: 56,
		to: 360,
		weight: 0.0891340220196288,
		gater: null
	},
	{
		from: 56,
		to: 361,
		weight: 0.09596765787049227,
		gater: null
	},
	{
		from: 56,
		to: 362,
		weight: -0.015133939357971832,
		gater: null
	},
	{
		from: 56,
		to: 363,
		weight: 0.08772464925795051,
		gater: null
	},
	{
		from: 56,
		to: 364,
		weight: -0.009293367253008264,
		gater: null
	},
	{
		from: 56,
		to: 365,
		weight: -0.05622057523682736,
		gater: null
	},
	{
		from: 56,
		to: 366,
		weight: 0.0029858532872664156,
		gater: null
	},
	{
		from: 56,
		to: 367,
		weight: -0.04331702975023144,
		gater: null
	},
	{
		from: 56,
		to: 368,
		weight: -0.09050185007216466,
		gater: null
	},
	{
		from: 56,
		to: 369,
		weight: -0.007831398714395282,
		gater: null
	},
	{
		from: 56,
		to: 370,
		weight: -0.05889808582412557,
		gater: null
	},
	{
		from: 56,
		to: 371,
		weight: 0.03431405044886965,
		gater: null
	},
	{
		from: 56,
		to: 372,
		weight: -0.08311495615746134,
		gater: null
	},
	{
		from: 56,
		to: 373,
		weight: -0.08062076125615324,
		gater: null
	},
	{
		from: 56,
		to: 374,
		weight: -0.08640997330668898,
		gater: null
	},
	{
		from: 56,
		to: 375,
		weight: 0.05942761432387264,
		gater: null
	},
	{
		from: 56,
		to: 376,
		weight: 0.052431068288423394,
		gater: null
	},
	{
		from: 56,
		to: 377,
		weight: 0.029389616097643456,
		gater: null
	},
	{
		from: 56,
		to: 378,
		weight: 0.09370555652977272,
		gater: null
	},
	{
		from: 56,
		to: 379,
		weight: -0.03824091054824241,
		gater: null
	},
	{
		from: 57,
		to: 360,
		weight: 0.03137825277943854,
		gater: null
	},
	{
		from: 57,
		to: 361,
		weight: 0.07142535478234291,
		gater: null
	},
	{
		from: 57,
		to: 362,
		weight: -0.030893061076095046,
		gater: null
	},
	{
		from: 57,
		to: 363,
		weight: 0.014696600450332387,
		gater: null
	},
	{
		from: 57,
		to: 364,
		weight: -0.03131785024837988,
		gater: null
	},
	{
		from: 57,
		to: 365,
		weight: -0.048235449703277804,
		gater: null
	},
	{
		from: 57,
		to: 366,
		weight: 0.09332573222542404,
		gater: null
	},
	{
		from: 57,
		to: 367,
		weight: 0.08130292738627531,
		gater: null
	},
	{
		from: 57,
		to: 368,
		weight: -0.09994363339683715,
		gater: null
	},
	{
		from: 57,
		to: 369,
		weight: 0.056247217483385764,
		gater: null
	},
	{
		from: 57,
		to: 370,
		weight: -0.08850312747387355,
		gater: null
	},
	{
		from: 57,
		to: 371,
		weight: 0.06256419635098484,
		gater: null
	},
	{
		from: 57,
		to: 372,
		weight: -0.08427964936060191,
		gater: null
	},
	{
		from: 57,
		to: 373,
		weight: -0.08339181461443408,
		gater: null
	},
	{
		from: 57,
		to: 374,
		weight: 0.09679393729233601,
		gater: null
	},
	{
		from: 57,
		to: 375,
		weight: -0.06915209851667298,
		gater: null
	},
	{
		from: 57,
		to: 376,
		weight: -0.08242135199188008,
		gater: null
	},
	{
		from: 57,
		to: 377,
		weight: -0.013935006123218893,
		gater: null
	},
	{
		from: 57,
		to: 378,
		weight: 0.026503725431384906,
		gater: null
	},
	{
		from: 57,
		to: 379,
		weight: 0.08745934308277548,
		gater: null
	},
	{
		from: 58,
		to: 360,
		weight: -0.02721038936442191,
		gater: null
	},
	{
		from: 58,
		to: 361,
		weight: -0.034500316369626166,
		gater: null
	},
	{
		from: 58,
		to: 362,
		weight: 0.07797944098368115,
		gater: null
	},
	{
		from: 58,
		to: 363,
		weight: 0.08240524099473853,
		gater: null
	},
	{
		from: 58,
		to: 364,
		weight: -0.016196861833460877,
		gater: null
	},
	{
		from: 58,
		to: 365,
		weight: -0.0068442595532589995,
		gater: null
	},
	{
		from: 58,
		to: 366,
		weight: -0.0940497405072835,
		gater: null
	},
	{
		from: 58,
		to: 367,
		weight: -0.09146856134041799,
		gater: null
	},
	{
		from: 58,
		to: 368,
		weight: -0.030718878839092814,
		gater: null
	},
	{
		from: 58,
		to: 369,
		weight: -0.029405536683135655,
		gater: null
	},
	{
		from: 58,
		to: 370,
		weight: 0.05554454914211321,
		gater: null
	},
	{
		from: 58,
		to: 371,
		weight: 0.09605249070023786,
		gater: null
	},
	{
		from: 58,
		to: 372,
		weight: 0.0008574922138735452,
		gater: null
	},
	{
		from: 58,
		to: 373,
		weight: 0.028122994345433888,
		gater: null
	},
	{
		from: 58,
		to: 374,
		weight: -0.06936793367365204,
		gater: null
	},
	{
		from: 58,
		to: 375,
		weight: -0.09297832184239647,
		gater: null
	},
	{
		from: 58,
		to: 376,
		weight: -0.038301094013908576,
		gater: null
	},
	{
		from: 58,
		to: 377,
		weight: 0.06318425165178071,
		gater: null
	},
	{
		from: 58,
		to: 378,
		weight: -0.06309963616944186,
		gater: null
	},
	{
		from: 58,
		to: 379,
		weight: 0.03758060458042373,
		gater: null
	},
	{
		from: 59,
		to: 360,
		weight: -0.03899409027221448,
		gater: null
	},
	{
		from: 59,
		to: 361,
		weight: 0.013667384741930855,
		gater: null
	},
	{
		from: 59,
		to: 362,
		weight: 0.03195017949739426,
		gater: null
	},
	{
		from: 59,
		to: 363,
		weight: 0.05065567904742327,
		gater: null
	},
	{
		from: 59,
		to: 364,
		weight: -0.03894295781923325,
		gater: null
	},
	{
		from: 59,
		to: 365,
		weight: -0.07575892460674649,
		gater: null
	},
	{
		from: 59,
		to: 366,
		weight: 0.07653121125096268,
		gater: null
	},
	{
		from: 59,
		to: 367,
		weight: 0.013661916607052405,
		gater: null
	},
	{
		from: 59,
		to: 368,
		weight: 0.011602374619457748,
		gater: null
	},
	{
		from: 59,
		to: 369,
		weight: 0.08898472864398863,
		gater: null
	},
	{
		from: 59,
		to: 370,
		weight: -0.0777155695098719,
		gater: null
	},
	{
		from: 59,
		to: 371,
		weight: 0.028985376160035214,
		gater: null
	},
	{
		from: 59,
		to: 372,
		weight: -0.01724993269571433,
		gater: null
	},
	{
		from: 59,
		to: 373,
		weight: 0.010330007592058127,
		gater: null
	},
	{
		from: 59,
		to: 374,
		weight: -0.03485338273569179,
		gater: null
	},
	{
		from: 59,
		to: 375,
		weight: -0.008232311653527141,
		gater: null
	},
	{
		from: 59,
		to: 376,
		weight: -0.04948845189874134,
		gater: null
	},
	{
		from: 59,
		to: 377,
		weight: 0.03955103397647641,
		gater: null
	},
	{
		from: 59,
		to: 378,
		weight: 0.059061059936890065,
		gater: null
	},
	{
		from: 59,
		to: 379,
		weight: -0.07488629772779604,
		gater: null
	},
	{
		from: 60,
		to: 360,
		weight: -0.005833336706075401,
		gater: null
	},
	{
		from: 60,
		to: 361,
		weight: -0.03278136326521559,
		gater: null
	},
	{
		from: 60,
		to: 362,
		weight: -0.09603855408751505,
		gater: null
	},
	{
		from: 60,
		to: 363,
		weight: 0.014849451054378265,
		gater: null
	},
	{
		from: 60,
		to: 364,
		weight: -0.09853633750933827,
		gater: null
	},
	{
		from: 60,
		to: 365,
		weight: -0.06970371468051445,
		gater: null
	},
	{
		from: 60,
		to: 366,
		weight: -0.0837681334102654,
		gater: null
	},
	{
		from: 60,
		to: 367,
		weight: 0.09269166052144584,
		gater: null
	},
	{
		from: 60,
		to: 368,
		weight: -0.0001284215146346579,
		gater: null
	},
	{
		from: 60,
		to: 369,
		weight: 0.04067668548920164,
		gater: null
	},
	{
		from: 60,
		to: 370,
		weight: 0.09600126084849894,
		gater: null
	},
	{
		from: 60,
		to: 371,
		weight: -0.00186157883838671,
		gater: null
	},
	{
		from: 60,
		to: 372,
		weight: 0.00623118903520363,
		gater: null
	},
	{
		from: 60,
		to: 373,
		weight: 0.0576918903142952,
		gater: null
	},
	{
		from: 60,
		to: 374,
		weight: -0.09643786427245643,
		gater: null
	},
	{
		from: 60,
		to: 375,
		weight: -0.055877542791149364,
		gater: null
	},
	{
		from: 60,
		to: 376,
		weight: -0.00018422169254214693,
		gater: null
	},
	{
		from: 60,
		to: 377,
		weight: 0.0937554666491868,
		gater: null
	},
	{
		from: 60,
		to: 378,
		weight: -0.03871146940803336,
		gater: null
	},
	{
		from: 60,
		to: 379,
		weight: 0.02044211053668317,
		gater: null
	},
	{
		from: 61,
		to: 360,
		weight: 0.06131809896559984,
		gater: null
	},
	{
		from: 61,
		to: 361,
		weight: -0.04327864562279596,
		gater: null
	},
	{
		from: 61,
		to: 362,
		weight: -0.012219382152452635,
		gater: null
	},
	{
		from: 61,
		to: 363,
		weight: -0.04925747097173159,
		gater: null
	},
	{
		from: 61,
		to: 364,
		weight: -0.00009999708855437661,
		gater: null
	},
	{
		from: 61,
		to: 365,
		weight: -0.03979883361958843,
		gater: null
	},
	{
		from: 61,
		to: 366,
		weight: 0.07638886137050727,
		gater: null
	},
	{
		from: 61,
		to: 367,
		weight: -0.06140572714872153,
		gater: null
	},
	{
		from: 61,
		to: 368,
		weight: -0.05740456698149519,
		gater: null
	},
	{
		from: 61,
		to: 369,
		weight: -0.08517382088336688,
		gater: null
	},
	{
		from: 61,
		to: 370,
		weight: -0.0830115607864927,
		gater: null
	},
	{
		from: 61,
		to: 371,
		weight: -0.04153342866036378,
		gater: null
	},
	{
		from: 61,
		to: 372,
		weight: 0.05650630757118055,
		gater: null
	},
	{
		from: 61,
		to: 373,
		weight: 0.012228299482964111,
		gater: null
	},
	{
		from: 61,
		to: 374,
		weight: -0.010532368479411233,
		gater: null
	},
	{
		from: 61,
		to: 375,
		weight: 0.035679193732956804,
		gater: null
	},
	{
		from: 61,
		to: 376,
		weight: -0.018211025997063368,
		gater: null
	},
	{
		from: 61,
		to: 377,
		weight: -0.07269126386382237,
		gater: null
	},
	{
		from: 61,
		to: 378,
		weight: 0.05994637152482429,
		gater: null
	},
	{
		from: 61,
		to: 379,
		weight: 0.030286502577025975,
		gater: null
	},
	{
		from: 62,
		to: 360,
		weight: -0.0014665002658304643,
		gater: null
	},
	{
		from: 62,
		to: 361,
		weight: -0.0586652129443376,
		gater: null
	},
	{
		from: 62,
		to: 362,
		weight: -0.09375003128876465,
		gater: null
	},
	{
		from: 62,
		to: 363,
		weight: -0.06288053112697752,
		gater: null
	},
	{
		from: 62,
		to: 364,
		weight: 0.08872842937796685,
		gater: null
	},
	{
		from: 62,
		to: 365,
		weight: -0.054881823912916294,
		gater: null
	},
	{
		from: 62,
		to: 366,
		weight: -0.03357024356739839,
		gater: null
	},
	{
		from: 62,
		to: 367,
		weight: 0.024473226864277595,
		gater: null
	},
	{
		from: 62,
		to: 368,
		weight: 0.00007750476156731523,
		gater: null
	},
	{
		from: 62,
		to: 369,
		weight: 0.02205253340316768,
		gater: null
	},
	{
		from: 62,
		to: 370,
		weight: 0.08155900669521876,
		gater: null
	},
	{
		from: 62,
		to: 371,
		weight: -0.05060861306828488,
		gater: null
	},
	{
		from: 62,
		to: 372,
		weight: -0.05829083580063617,
		gater: null
	},
	{
		from: 62,
		to: 373,
		weight: 0.05043551454889772,
		gater: null
	},
	{
		from: 62,
		to: 374,
		weight: 0.02171542496423831,
		gater: null
	},
	{
		from: 62,
		to: 375,
		weight: 0.08338388633074151,
		gater: null
	},
	{
		from: 62,
		to: 376,
		weight: 0.021855087173905607,
		gater: null
	},
	{
		from: 62,
		to: 377,
		weight: -0.09653152479193441,
		gater: null
	},
	{
		from: 62,
		to: 378,
		weight: -0.0574408753913819,
		gater: null
	},
	{
		from: 62,
		to: 379,
		weight: 0.05719225045418805,
		gater: null
	},
	{
		from: 63,
		to: 360,
		weight: 0.09154429175072898,
		gater: null
	},
	{
		from: 63,
		to: 361,
		weight: -0.028205900475856055,
		gater: null
	},
	{
		from: 63,
		to: 362,
		weight: -0.08730967458458734,
		gater: null
	},
	{
		from: 63,
		to: 363,
		weight: 0.04587633795684884,
		gater: null
	},
	{
		from: 63,
		to: 364,
		weight: 0.0793716727749921,
		gater: null
	},
	{
		from: 63,
		to: 365,
		weight: -0.07118091684175742,
		gater: null
	},
	{
		from: 63,
		to: 366,
		weight: 0.031261191060978355,
		gater: null
	},
	{
		from: 63,
		to: 367,
		weight: 0.05041459203506604,
		gater: null
	},
	{
		from: 63,
		to: 368,
		weight: -0.013900859986117092,
		gater: null
	},
	{
		from: 63,
		to: 369,
		weight: -0.044659318530184504,
		gater: null
	},
	{
		from: 63,
		to: 370,
		weight: 0.03512051847236966,
		gater: null
	},
	{
		from: 63,
		to: 371,
		weight: 0.05102290232082882,
		gater: null
	},
	{
		from: 63,
		to: 372,
		weight: 0.09597533000735733,
		gater: null
	},
	{
		from: 63,
		to: 373,
		weight: 0.07496081298880597,
		gater: null
	},
	{
		from: 63,
		to: 374,
		weight: -0.0344242019180359,
		gater: null
	},
	{
		from: 63,
		to: 375,
		weight: 0.07815092706519927,
		gater: null
	},
	{
		from: 63,
		to: 376,
		weight: 0.022648787180271232,
		gater: null
	},
	{
		from: 63,
		to: 377,
		weight: 0.009626431732402546,
		gater: null
	},
	{
		from: 63,
		to: 378,
		weight: -0.08514831367898888,
		gater: null
	},
	{
		from: 63,
		to: 379,
		weight: 0.0016687370452387051,
		gater: null
	},
	{
		from: 64,
		to: 360,
		weight: 0.011030647259842971,
		gater: null
	},
	{
		from: 64,
		to: 361,
		weight: 0.08036093555122759,
		gater: null
	},
	{
		from: 64,
		to: 362,
		weight: -0.01636884596986099,
		gater: null
	},
	{
		from: 64,
		to: 363,
		weight: -0.05168253753018566,
		gater: null
	},
	{
		from: 64,
		to: 364,
		weight: 0.04320779175767245,
		gater: null
	},
	{
		from: 64,
		to: 365,
		weight: 0.04893437119570826,
		gater: null
	},
	{
		from: 64,
		to: 366,
		weight: -0.04723233577687607,
		gater: null
	},
	{
		from: 64,
		to: 367,
		weight: -0.0640511351386059,
		gater: null
	},
	{
		from: 64,
		to: 368,
		weight: -0.021962654377763832,
		gater: null
	},
	{
		from: 64,
		to: 369,
		weight: -0.060442018709974926,
		gater: null
	},
	{
		from: 64,
		to: 370,
		weight: 0.09655311552788035,
		gater: null
	},
	{
		from: 64,
		to: 371,
		weight: 0.07315361317142091,
		gater: null
	},
	{
		from: 64,
		to: 372,
		weight: 0.0714971071258339,
		gater: null
	},
	{
		from: 64,
		to: 373,
		weight: -0.0005665608028996988,
		gater: null
	},
	{
		from: 64,
		to: 374,
		weight: 0.04362672447109625,
		gater: null
	},
	{
		from: 64,
		to: 375,
		weight: 0.022426287175596388,
		gater: null
	},
	{
		from: 64,
		to: 376,
		weight: 0.08726792269062639,
		gater: null
	},
	{
		from: 64,
		to: 377,
		weight: 0.012557762540156767,
		gater: null
	},
	{
		from: 64,
		to: 378,
		weight: 0.0768692906028002,
		gater: null
	},
	{
		from: 64,
		to: 379,
		weight: 0.043793256905323125,
		gater: null
	},
	{
		from: 65,
		to: 360,
		weight: 0.07019825038078015,
		gater: null
	},
	{
		from: 65,
		to: 361,
		weight: 0.0017317264426899709,
		gater: null
	},
	{
		from: 65,
		to: 362,
		weight: 0.09336473168944842,
		gater: null
	},
	{
		from: 65,
		to: 363,
		weight: 0.08117865237284269,
		gater: null
	},
	{
		from: 65,
		to: 364,
		weight: 0.003996717114353648,
		gater: null
	},
	{
		from: 65,
		to: 365,
		weight: -0.062447179831355594,
		gater: null
	},
	{
		from: 65,
		to: 366,
		weight: -0.023701747242466237,
		gater: null
	},
	{
		from: 65,
		to: 367,
		weight: 0.05698066743939498,
		gater: null
	},
	{
		from: 65,
		to: 368,
		weight: 0.014358241244970399,
		gater: null
	},
	{
		from: 65,
		to: 369,
		weight: -0.039158356405601905,
		gater: null
	},
	{
		from: 65,
		to: 370,
		weight: 0.09473908559982527,
		gater: null
	},
	{
		from: 65,
		to: 371,
		weight: -0.06164554345652458,
		gater: null
	},
	{
		from: 65,
		to: 372,
		weight: -0.030081037083583964,
		gater: null
	},
	{
		from: 65,
		to: 373,
		weight: 0.07424899883737873,
		gater: null
	},
	{
		from: 65,
		to: 374,
		weight: -0.03376770134220379,
		gater: null
	},
	{
		from: 65,
		to: 375,
		weight: 0.03457423100998622,
		gater: null
	},
	{
		from: 65,
		to: 376,
		weight: -0.0888059427555036,
		gater: null
	},
	{
		from: 65,
		to: 377,
		weight: 0.011212138763055893,
		gater: null
	},
	{
		from: 65,
		to: 378,
		weight: -0.054971059187495945,
		gater: null
	},
	{
		from: 65,
		to: 379,
		weight: -0.03064850109676405,
		gater: null
	},
	{
		from: 66,
		to: 360,
		weight: 0.08557126067623635,
		gater: null
	},
	{
		from: 66,
		to: 361,
		weight: 0.06038698366308423,
		gater: null
	},
	{
		from: 66,
		to: 362,
		weight: -0.09272496416298655,
		gater: null
	},
	{
		from: 66,
		to: 363,
		weight: 0.0036117714587750316,
		gater: null
	},
	{
		from: 66,
		to: 364,
		weight: -0.01526269720834357,
		gater: null
	},
	{
		from: 66,
		to: 365,
		weight: -0.013871632802908707,
		gater: null
	},
	{
		from: 66,
		to: 366,
		weight: 0.08554429950939033,
		gater: null
	},
	{
		from: 66,
		to: 367,
		weight: 0.03435286794894207,
		gater: null
	},
	{
		from: 66,
		to: 368,
		weight: 0.008408881594804768,
		gater: null
	},
	{
		from: 66,
		to: 369,
		weight: -0.03590375349702982,
		gater: null
	},
	{
		from: 66,
		to: 370,
		weight: 0.08448127802732608,
		gater: null
	},
	{
		from: 66,
		to: 371,
		weight: 0.08251849263479644,
		gater: null
	},
	{
		from: 66,
		to: 372,
		weight: -0.0012124184706774344,
		gater: null
	},
	{
		from: 66,
		to: 373,
		weight: 0.016037225785650033,
		gater: null
	},
	{
		from: 66,
		to: 374,
		weight: -0.0769598712342468,
		gater: null
	},
	{
		from: 66,
		to: 375,
		weight: 0.0831474277017629,
		gater: null
	},
	{
		from: 66,
		to: 376,
		weight: 0.0014998610092165077,
		gater: null
	},
	{
		from: 66,
		to: 377,
		weight: 0.018637299618822295,
		gater: null
	},
	{
		from: 66,
		to: 378,
		weight: 0.05781125577403762,
		gater: null
	},
	{
		from: 66,
		to: 379,
		weight: -0.0086192905853677,
		gater: null
	},
	{
		from: 67,
		to: 360,
		weight: 0.03222124600320289,
		gater: null
	},
	{
		from: 67,
		to: 361,
		weight: -0.08874679006608091,
		gater: null
	},
	{
		from: 67,
		to: 362,
		weight: -0.014656353990959575,
		gater: null
	},
	{
		from: 67,
		to: 363,
		weight: -0.025916337601243775,
		gater: null
	},
	{
		from: 67,
		to: 364,
		weight: -0.027339760208444017,
		gater: null
	},
	{
		from: 67,
		to: 365,
		weight: 0.000562227255798714,
		gater: null
	},
	{
		from: 67,
		to: 366,
		weight: 0.02821804298683256,
		gater: null
	},
	{
		from: 67,
		to: 367,
		weight: 0.060555267983315286,
		gater: null
	},
	{
		from: 67,
		to: 368,
		weight: -0.05726972087791898,
		gater: null
	},
	{
		from: 67,
		to: 369,
		weight: 0.0886693602866345,
		gater: null
	},
	{
		from: 67,
		to: 370,
		weight: -0.06083022268168956,
		gater: null
	},
	{
		from: 67,
		to: 371,
		weight: -0.037012867593773896,
		gater: null
	},
	{
		from: 67,
		to: 372,
		weight: 0.09182280969699294,
		gater: null
	},
	{
		from: 67,
		to: 373,
		weight: -0.04696365859667631,
		gater: null
	},
	{
		from: 67,
		to: 374,
		weight: 0.06403638102323633,
		gater: null
	},
	{
		from: 67,
		to: 375,
		weight: 0.060295246495140925,
		gater: null
	},
	{
		from: 67,
		to: 376,
		weight: 0.014094936988973794,
		gater: null
	},
	{
		from: 67,
		to: 377,
		weight: 0.050175617892267516,
		gater: null
	},
	{
		from: 67,
		to: 378,
		weight: -0.06252677529635192,
		gater: null
	},
	{
		from: 67,
		to: 379,
		weight: 0.08568547999396309,
		gater: null
	},
	{
		from: 68,
		to: 360,
		weight: 0.04894967080224394,
		gater: null
	},
	{
		from: 68,
		to: 361,
		weight: 0.0281799472517707,
		gater: null
	},
	{
		from: 68,
		to: 362,
		weight: 0.04491410705509988,
		gater: null
	},
	{
		from: 68,
		to: 363,
		weight: 0.045262924747349415,
		gater: null
	},
	{
		from: 68,
		to: 364,
		weight: -0.055895728173671125,
		gater: null
	},
	{
		from: 68,
		to: 365,
		weight: -0.033624855721225796,
		gater: null
	},
	{
		from: 68,
		to: 366,
		weight: 0.03300212774801761,
		gater: null
	},
	{
		from: 68,
		to: 367,
		weight: -0.0654723208084842,
		gater: null
	},
	{
		from: 68,
		to: 368,
		weight: 0.005849885629148718,
		gater: null
	},
	{
		from: 68,
		to: 369,
		weight: 0.05977043042349117,
		gater: null
	},
	{
		from: 68,
		to: 370,
		weight: -0.010332052517189896,
		gater: null
	},
	{
		from: 68,
		to: 371,
		weight: 0.05485813916354254,
		gater: null
	},
	{
		from: 68,
		to: 372,
		weight: -0.003867568400467508,
		gater: null
	},
	{
		from: 68,
		to: 373,
		weight: 0.030376054240150496,
		gater: null
	},
	{
		from: 68,
		to: 374,
		weight: -0.02274751202784628,
		gater: null
	},
	{
		from: 68,
		to: 375,
		weight: -0.04373874267166307,
		gater: null
	},
	{
		from: 68,
		to: 376,
		weight: 0.08439142750264625,
		gater: null
	},
	{
		from: 68,
		to: 377,
		weight: 0.044791576938638084,
		gater: null
	},
	{
		from: 68,
		to: 378,
		weight: 0.09153409822003478,
		gater: null
	},
	{
		from: 68,
		to: 379,
		weight: -0.010709694880303072,
		gater: null
	},
	{
		from: 69,
		to: 360,
		weight: -0.008762788486121442,
		gater: null
	},
	{
		from: 69,
		to: 361,
		weight: -0.07421377030075593,
		gater: null
	},
	{
		from: 69,
		to: 362,
		weight: 0.06870268817741071,
		gater: null
	},
	{
		from: 69,
		to: 363,
		weight: 0.06385228266903417,
		gater: null
	},
	{
		from: 69,
		to: 364,
		weight: -0.09589016274493029,
		gater: null
	},
	{
		from: 69,
		to: 365,
		weight: -0.041612312754417374,
		gater: null
	},
	{
		from: 69,
		to: 366,
		weight: -0.004912703217118342,
		gater: null
	},
	{
		from: 69,
		to: 367,
		weight: -0.06643514635666556,
		gater: null
	},
	{
		from: 69,
		to: 368,
		weight: 0.06235501429781029,
		gater: null
	},
	{
		from: 69,
		to: 369,
		weight: -0.0725884796531378,
		gater: null
	},
	{
		from: 69,
		to: 370,
		weight: -0.02360944300434195,
		gater: null
	},
	{
		from: 69,
		to: 371,
		weight: -0.019288436694051336,
		gater: null
	},
	{
		from: 69,
		to: 372,
		weight: -0.013969287044613837,
		gater: null
	},
	{
		from: 69,
		to: 373,
		weight: -0.014629353188359673,
		gater: null
	},
	{
		from: 69,
		to: 374,
		weight: -0.09383290222003429,
		gater: null
	},
	{
		from: 69,
		to: 375,
		weight: -0.055502138043417304,
		gater: null
	},
	{
		from: 69,
		to: 376,
		weight: -0.08305020306963523,
		gater: null
	},
	{
		from: 69,
		to: 377,
		weight: -0.06351369755868017,
		gater: null
	},
	{
		from: 69,
		to: 378,
		weight: 0.030152167500562044,
		gater: null
	},
	{
		from: 69,
		to: 379,
		weight: 0.012703062998605533,
		gater: null
	},
	{
		from: 70,
		to: 360,
		weight: 0.05784895696345069,
		gater: null
	},
	{
		from: 70,
		to: 361,
		weight: -0.047811030788032796,
		gater: null
	},
	{
		from: 70,
		to: 362,
		weight: 0.011671207026027822,
		gater: null
	},
	{
		from: 70,
		to: 363,
		weight: 0.02205090096298598,
		gater: null
	},
	{
		from: 70,
		to: 364,
		weight: -0.03338657064649789,
		gater: null
	},
	{
		from: 70,
		to: 365,
		weight: 0.0583070716455949,
		gater: null
	},
	{
		from: 70,
		to: 366,
		weight: 0.031187032131705872,
		gater: null
	},
	{
		from: 70,
		to: 367,
		weight: -0.0016087740539662276,
		gater: null
	},
	{
		from: 70,
		to: 368,
		weight: -0.08847430442938858,
		gater: null
	},
	{
		from: 70,
		to: 369,
		weight: 0.0040638907060086965,
		gater: null
	},
	{
		from: 70,
		to: 370,
		weight: -0.001629353842763595,
		gater: null
	},
	{
		from: 70,
		to: 371,
		weight: 0.01575242013682851,
		gater: null
	},
	{
		from: 70,
		to: 372,
		weight: -0.06168158161313389,
		gater: null
	},
	{
		from: 70,
		to: 373,
		weight: 0.06362155108347567,
		gater: null
	},
	{
		from: 70,
		to: 374,
		weight: -0.020381788439400153,
		gater: null
	},
	{
		from: 70,
		to: 375,
		weight: -0.008968118062563729,
		gater: null
	},
	{
		from: 70,
		to: 376,
		weight: -0.0404866039320515,
		gater: null
	},
	{
		from: 70,
		to: 377,
		weight: -0.08816081320142032,
		gater: null
	},
	{
		from: 70,
		to: 378,
		weight: -0.012237539473814563,
		gater: null
	},
	{
		from: 70,
		to: 379,
		weight: 0.09064174419929127,
		gater: null
	},
	{
		from: 71,
		to: 360,
		weight: -0.05175706737476298,
		gater: null
	},
	{
		from: 71,
		to: 361,
		weight: -0.08535941329702093,
		gater: null
	},
	{
		from: 71,
		to: 362,
		weight: 0.027818156624104695,
		gater: null
	},
	{
		from: 71,
		to: 363,
		weight: 0.07954869814998117,
		gater: null
	},
	{
		from: 71,
		to: 364,
		weight: -0.07239702004694243,
		gater: null
	},
	{
		from: 71,
		to: 365,
		weight: -0.0040388762899038755,
		gater: null
	},
	{
		from: 71,
		to: 366,
		weight: -0.07716118664263344,
		gater: null
	},
	{
		from: 71,
		to: 367,
		weight: -0.09510041795166053,
		gater: null
	},
	{
		from: 71,
		to: 368,
		weight: 0.015462500964168638,
		gater: null
	},
	{
		from: 71,
		to: 369,
		weight: -0.09201942661867571,
		gater: null
	},
	{
		from: 71,
		to: 370,
		weight: -0.02183837491119278,
		gater: null
	},
	{
		from: 71,
		to: 371,
		weight: -0.008421633678683801,
		gater: null
	},
	{
		from: 71,
		to: 372,
		weight: 0.09445078474074081,
		gater: null
	},
	{
		from: 71,
		to: 373,
		weight: 0.055522243346326855,
		gater: null
	},
	{
		from: 71,
		to: 374,
		weight: -0.08005914625640737,
		gater: null
	},
	{
		from: 71,
		to: 375,
		weight: 0.08635869217415162,
		gater: null
	},
	{
		from: 71,
		to: 376,
		weight: 0.01473649179688001,
		gater: null
	},
	{
		from: 71,
		to: 377,
		weight: 0.0851689184141704,
		gater: null
	},
	{
		from: 71,
		to: 378,
		weight: 0.08355832838242341,
		gater: null
	},
	{
		from: 71,
		to: 379,
		weight: 0.03415623180417496,
		gater: null
	},
	{
		from: 72,
		to: 360,
		weight: 0.09578688751005995,
		gater: null
	},
	{
		from: 72,
		to: 361,
		weight: 0.004957599342866104,
		gater: null
	},
	{
		from: 72,
		to: 362,
		weight: 0.01816325044710565,
		gater: null
	},
	{
		from: 72,
		to: 363,
		weight: 0.04095285315116831,
		gater: null
	},
	{
		from: 72,
		to: 364,
		weight: -0.004832432228997791,
		gater: null
	},
	{
		from: 72,
		to: 365,
		weight: 0.06863360046316061,
		gater: null
	},
	{
		from: 72,
		to: 366,
		weight: -0.07370727574907297,
		gater: null
	},
	{
		from: 72,
		to: 367,
		weight: 0.025640772406970103,
		gater: null
	},
	{
		from: 72,
		to: 368,
		weight: -0.032502951169381025,
		gater: null
	},
	{
		from: 72,
		to: 369,
		weight: -0.006646615527971897,
		gater: null
	},
	{
		from: 72,
		to: 370,
		weight: 0.033645398280146566,
		gater: null
	},
	{
		from: 72,
		to: 371,
		weight: -0.025516728230086147,
		gater: null
	},
	{
		from: 72,
		to: 372,
		weight: 0.09604042113310682,
		gater: null
	},
	{
		from: 72,
		to: 373,
		weight: 0.0369562168081512,
		gater: null
	},
	{
		from: 72,
		to: 374,
		weight: 0.07667966310433375,
		gater: null
	},
	{
		from: 72,
		to: 375,
		weight: 0.018453940856348175,
		gater: null
	},
	{
		from: 72,
		to: 376,
		weight: -0.09790967202030419,
		gater: null
	},
	{
		from: 72,
		to: 377,
		weight: 0.004548022563669818,
		gater: null
	},
	{
		from: 72,
		to: 378,
		weight: -0.019957419979057936,
		gater: null
	},
	{
		from: 72,
		to: 379,
		weight: -0.04472729144123782,
		gater: null
	},
	{
		from: 73,
		to: 360,
		weight: -0.06814758053782861,
		gater: null
	},
	{
		from: 73,
		to: 361,
		weight: -0.017362509930577863,
		gater: null
	},
	{
		from: 73,
		to: 362,
		weight: -0.004427317504234821,
		gater: null
	},
	{
		from: 73,
		to: 363,
		weight: 0.08867488186602418,
		gater: null
	},
	{
		from: 73,
		to: 364,
		weight: 0.06450883434290611,
		gater: null
	},
	{
		from: 73,
		to: 365,
		weight: -0.01029613741571836,
		gater: null
	},
	{
		from: 73,
		to: 366,
		weight: 0.06328694439580854,
		gater: null
	},
	{
		from: 73,
		to: 367,
		weight: 0.0696676378209494,
		gater: null
	},
	{
		from: 73,
		to: 368,
		weight: 0.006107008518534671,
		gater: null
	},
	{
		from: 73,
		to: 369,
		weight: -0.08722914205241313,
		gater: null
	},
	{
		from: 73,
		to: 370,
		weight: -0.03728682521017994,
		gater: null
	},
	{
		from: 73,
		to: 371,
		weight: -0.0503310680953204,
		gater: null
	},
	{
		from: 73,
		to: 372,
		weight: 0.09227421252942544,
		gater: null
	},
	{
		from: 73,
		to: 373,
		weight: -0.009265106339021043,
		gater: null
	},
	{
		from: 73,
		to: 374,
		weight: -0.09624225095400703,
		gater: null
	},
	{
		from: 73,
		to: 375,
		weight: 0.014529752911539046,
		gater: null
	},
	{
		from: 73,
		to: 376,
		weight: 0.08687895469438653,
		gater: null
	},
	{
		from: 73,
		to: 377,
		weight: 0.08429539919390089,
		gater: null
	},
	{
		from: 73,
		to: 378,
		weight: 0.06194775259016261,
		gater: null
	},
	{
		from: 73,
		to: 379,
		weight: -0.0018623958010842434,
		gater: null
	},
	{
		from: 74,
		to: 360,
		weight: -0.058575033231483255,
		gater: null
	},
	{
		from: 74,
		to: 361,
		weight: -0.013457459866540095,
		gater: null
	},
	{
		from: 74,
		to: 362,
		weight: 0.04710730340381089,
		gater: null
	},
	{
		from: 74,
		to: 363,
		weight: -0.03422045639996743,
		gater: null
	},
	{
		from: 74,
		to: 364,
		weight: -0.04418783980547754,
		gater: null
	},
	{
		from: 74,
		to: 365,
		weight: 0.028034205350396302,
		gater: null
	},
	{
		from: 74,
		to: 366,
		weight: -0.05376804207440902,
		gater: null
	},
	{
		from: 74,
		to: 367,
		weight: 0.07498801244412295,
		gater: null
	},
	{
		from: 74,
		to: 368,
		weight: -0.09336958291335572,
		gater: null
	},
	{
		from: 74,
		to: 369,
		weight: -0.010778292103936285,
		gater: null
	},
	{
		from: 74,
		to: 370,
		weight: -0.08685232225122204,
		gater: null
	},
	{
		from: 74,
		to: 371,
		weight: 0.07848617358803453,
		gater: null
	},
	{
		from: 74,
		to: 372,
		weight: -0.09623069616343122,
		gater: null
	},
	{
		from: 74,
		to: 373,
		weight: -0.052271798733449164,
		gater: null
	},
	{
		from: 74,
		to: 374,
		weight: 0.08684129146046887,
		gater: null
	},
	{
		from: 74,
		to: 375,
		weight: 0.014967443850713871,
		gater: null
	},
	{
		from: 74,
		to: 376,
		weight: -0.08067988093848442,
		gater: null
	},
	{
		from: 74,
		to: 377,
		weight: 0.09350148597774985,
		gater: null
	},
	{
		from: 74,
		to: 378,
		weight: -0.06993544925395367,
		gater: null
	},
	{
		from: 74,
		to: 379,
		weight: -0.09578767787928788,
		gater: null
	},
	{
		from: 75,
		to: 360,
		weight: -0.02036499935306843,
		gater: null
	},
	{
		from: 75,
		to: 361,
		weight: 0.007896129522900225,
		gater: null
	},
	{
		from: 75,
		to: 362,
		weight: -0.030681391097031344,
		gater: null
	},
	{
		from: 75,
		to: 363,
		weight: 0.03792071082719234,
		gater: null
	},
	{
		from: 75,
		to: 364,
		weight: -0.011379996165020015,
		gater: null
	},
	{
		from: 75,
		to: 365,
		weight: -0.03203176432685391,
		gater: null
	},
	{
		from: 75,
		to: 366,
		weight: 0.08703155941351312,
		gater: null
	},
	{
		from: 75,
		to: 367,
		weight: 0.030261708986801306,
		gater: null
	},
	{
		from: 75,
		to: 368,
		weight: -0.012555975181830853,
		gater: null
	},
	{
		from: 75,
		to: 369,
		weight: 0.04942803189818906,
		gater: null
	},
	{
		from: 75,
		to: 370,
		weight: 0.025512413551381424,
		gater: null
	},
	{
		from: 75,
		to: 371,
		weight: 0.0495058742537034,
		gater: null
	},
	{
		from: 75,
		to: 372,
		weight: -0.014293916461426859,
		gater: null
	},
	{
		from: 75,
		to: 373,
		weight: -0.007536570085182118,
		gater: null
	},
	{
		from: 75,
		to: 374,
		weight: 0.08597424416067931,
		gater: null
	},
	{
		from: 75,
		to: 375,
		weight: -0.08712316332110298,
		gater: null
	},
	{
		from: 75,
		to: 376,
		weight: -0.0810449592961215,
		gater: null
	},
	{
		from: 75,
		to: 377,
		weight: -0.0828236115682469,
		gater: null
	},
	{
		from: 75,
		to: 378,
		weight: -0.06313328575903099,
		gater: null
	},
	{
		from: 75,
		to: 379,
		weight: -0.047329039959918266,
		gater: null
	},
	{
		from: 76,
		to: 360,
		weight: 0.04634909107774257,
		gater: null
	},
	{
		from: 76,
		to: 361,
		weight: -0.09642964773128204,
		gater: null
	},
	{
		from: 76,
		to: 362,
		weight: 0.08780172854648094,
		gater: null
	},
	{
		from: 76,
		to: 363,
		weight: 0.07865128650923436,
		gater: null
	},
	{
		from: 76,
		to: 364,
		weight: -0.03335887495527659,
		gater: null
	},
	{
		from: 76,
		to: 365,
		weight: -0.008423495467299966,
		gater: null
	},
	{
		from: 76,
		to: 366,
		weight: -0.046286800195851324,
		gater: null
	},
	{
		from: 76,
		to: 367,
		weight: -0.03726562231769637,
		gater: null
	},
	{
		from: 76,
		to: 368,
		weight: -0.03221341161979155,
		gater: null
	},
	{
		from: 76,
		to: 369,
		weight: 0.05439169991963674,
		gater: null
	},
	{
		from: 76,
		to: 370,
		weight: -0.07763056318830573,
		gater: null
	},
	{
		from: 76,
		to: 371,
		weight: 0.08377885065682289,
		gater: null
	},
	{
		from: 76,
		to: 372,
		weight: 0.08954352834259591,
		gater: null
	},
	{
		from: 76,
		to: 373,
		weight: -0.012771019782134463,
		gater: null
	},
	{
		from: 76,
		to: 374,
		weight: -0.04429816630530108,
		gater: null
	},
	{
		from: 76,
		to: 375,
		weight: -0.049621092634237175,
		gater: null
	},
	{
		from: 76,
		to: 376,
		weight: -0.04062262358330746,
		gater: null
	},
	{
		from: 76,
		to: 377,
		weight: 0.03716599125129849,
		gater: null
	},
	{
		from: 76,
		to: 378,
		weight: 0.07912031410015308,
		gater: null
	},
	{
		from: 76,
		to: 379,
		weight: 0.008744869877487418,
		gater: null
	},
	{
		from: 77,
		to: 360,
		weight: -0.07647374687180718,
		gater: null
	},
	{
		from: 77,
		to: 361,
		weight: 0.07476626127778907,
		gater: null
	},
	{
		from: 77,
		to: 362,
		weight: 0.06278515347098865,
		gater: null
	},
	{
		from: 77,
		to: 363,
		weight: -0.04930600927438658,
		gater: null
	},
	{
		from: 77,
		to: 364,
		weight: -0.041603263445251316,
		gater: null
	},
	{
		from: 77,
		to: 365,
		weight: 0.03604024903004141,
		gater: null
	},
	{
		from: 77,
		to: 366,
		weight: -0.009149914182984276,
		gater: null
	},
	{
		from: 77,
		to: 367,
		weight: -0.015503493048766609,
		gater: null
	},
	{
		from: 77,
		to: 368,
		weight: 0.004420916179045567,
		gater: null
	},
	{
		from: 77,
		to: 369,
		weight: 0.08679697881720169,
		gater: null
	},
	{
		from: 77,
		to: 370,
		weight: 0.055595869779434065,
		gater: null
	},
	{
		from: 77,
		to: 371,
		weight: -0.010886648497880014,
		gater: null
	},
	{
		from: 77,
		to: 372,
		weight: -0.054256401282778026,
		gater: null
	},
	{
		from: 77,
		to: 373,
		weight: -0.03572093142645154,
		gater: null
	},
	{
		from: 77,
		to: 374,
		weight: 0.05415958643068999,
		gater: null
	},
	{
		from: 77,
		to: 375,
		weight: -0.09196421253763871,
		gater: null
	},
	{
		from: 77,
		to: 376,
		weight: 0.01592663689530878,
		gater: null
	},
	{
		from: 77,
		to: 377,
		weight: -0.01181159201145339,
		gater: null
	},
	{
		from: 77,
		to: 378,
		weight: 0.06678922223374159,
		gater: null
	},
	{
		from: 77,
		to: 379,
		weight: 0.01826013778263054,
		gater: null
	},
	{
		from: 78,
		to: 360,
		weight: 0.09055989199738229,
		gater: null
	},
	{
		from: 78,
		to: 361,
		weight: 0.04002760681122952,
		gater: null
	},
	{
		from: 78,
		to: 362,
		weight: 0.083331306845669,
		gater: null
	},
	{
		from: 78,
		to: 363,
		weight: -0.020954589125221593,
		gater: null
	},
	{
		from: 78,
		to: 364,
		weight: -0.06592594800739554,
		gater: null
	},
	{
		from: 78,
		to: 365,
		weight: 0.0070856272025117545,
		gater: null
	},
	{
		from: 78,
		to: 366,
		weight: 0.006585852777717477,
		gater: null
	},
	{
		from: 78,
		to: 367,
		weight: 0.0023307925825695602,
		gater: null
	},
	{
		from: 78,
		to: 368,
		weight: -0.03914671374508645,
		gater: null
	},
	{
		from: 78,
		to: 369,
		weight: 0.05508534943158158,
		gater: null
	},
	{
		from: 78,
		to: 370,
		weight: 0.07105339842098077,
		gater: null
	},
	{
		from: 78,
		to: 371,
		weight: 0.07437351252263044,
		gater: null
	},
	{
		from: 78,
		to: 372,
		weight: -0.02683958126525532,
		gater: null
	},
	{
		from: 78,
		to: 373,
		weight: 0.044717138872996054,
		gater: null
	},
	{
		from: 78,
		to: 374,
		weight: -0.015716840784108135,
		gater: null
	},
	{
		from: 78,
		to: 375,
		weight: -0.025067909040426578,
		gater: null
	},
	{
		from: 78,
		to: 376,
		weight: -0.015474622429319893,
		gater: null
	},
	{
		from: 78,
		to: 377,
		weight: 0.045364464579049774,
		gater: null
	},
	{
		from: 78,
		to: 378,
		weight: -0.0186798555180427,
		gater: null
	},
	{
		from: 78,
		to: 379,
		weight: -0.06494795475112958,
		gater: null
	},
	{
		from: 79,
		to: 360,
		weight: -0.01901892094383513,
		gater: null
	},
	{
		from: 79,
		to: 361,
		weight: -0.047541213826934305,
		gater: null
	},
	{
		from: 79,
		to: 362,
		weight: 0.07323873004729126,
		gater: null
	},
	{
		from: 79,
		to: 363,
		weight: 0.009200192625281683,
		gater: null
	},
	{
		from: 79,
		to: 364,
		weight: -0.0011438895110275349,
		gater: null
	},
	{
		from: 79,
		to: 365,
		weight: -0.07522237787805888,
		gater: null
	},
	{
		from: 79,
		to: 366,
		weight: -0.05720314651694447,
		gater: null
	},
	{
		from: 79,
		to: 367,
		weight: -0.05380170693190958,
		gater: null
	},
	{
		from: 79,
		to: 368,
		weight: 0.021198208708731417,
		gater: null
	},
	{
		from: 79,
		to: 369,
		weight: -0.007309590060726998,
		gater: null
	},
	{
		from: 79,
		to: 370,
		weight: -0.02112373040776369,
		gater: null
	},
	{
		from: 79,
		to: 371,
		weight: 0.0937630189206907,
		gater: null
	},
	{
		from: 79,
		to: 372,
		weight: 0.051093738100100566,
		gater: null
	},
	{
		from: 79,
		to: 373,
		weight: -0.03266562377460387,
		gater: null
	},
	{
		from: 79,
		to: 374,
		weight: -0.05009861846398938,
		gater: null
	},
	{
		from: 79,
		to: 375,
		weight: 0.09013140062087951,
		gater: null
	},
	{
		from: 79,
		to: 376,
		weight: -0.09224880583827627,
		gater: null
	},
	{
		from: 79,
		to: 377,
		weight: -0.09344890247111488,
		gater: null
	},
	{
		from: 79,
		to: 378,
		weight: 0.043069105946889286,
		gater: null
	},
	{
		from: 79,
		to: 379,
		weight: 0.08205538336843157,
		gater: null
	},
	{
		from: 80,
		to: 360,
		weight: 0.02953022579275988,
		gater: null
	},
	{
		from: 80,
		to: 361,
		weight: -0.04150315657569688,
		gater: null
	},
	{
		from: 80,
		to: 362,
		weight: -0.05166860031927905,
		gater: null
	},
	{
		from: 80,
		to: 363,
		weight: -0.08622849301500156,
		gater: null
	},
	{
		from: 80,
		to: 364,
		weight: 0.08990002260473334,
		gater: null
	},
	{
		from: 80,
		to: 365,
		weight: -0.06515723278850336,
		gater: null
	},
	{
		from: 80,
		to: 366,
		weight: 0.05166939484058927,
		gater: null
	},
	{
		from: 80,
		to: 367,
		weight: 0.06649556763432521,
		gater: null
	},
	{
		from: 80,
		to: 368,
		weight: -0.04327852222207001,
		gater: null
	},
	{
		from: 80,
		to: 369,
		weight: -0.08142775554613807,
		gater: null
	},
	{
		from: 80,
		to: 370,
		weight: 0.06746585445678219,
		gater: null
	},
	{
		from: 80,
		to: 371,
		weight: 0.056605483095129444,
		gater: null
	},
	{
		from: 80,
		to: 372,
		weight: -0.06751319544954587,
		gater: null
	},
	{
		from: 80,
		to: 373,
		weight: -0.0013817518469904783,
		gater: null
	},
	{
		from: 80,
		to: 374,
		weight: 0.08324101902027833,
		gater: null
	},
	{
		from: 80,
		to: 375,
		weight: 0.030930570083675557,
		gater: null
	},
	{
		from: 80,
		to: 376,
		weight: -0.0029576240192981523,
		gater: null
	},
	{
		from: 80,
		to: 377,
		weight: -0.04897771609986528,
		gater: null
	},
	{
		from: 80,
		to: 378,
		weight: 0.03274728311388725,
		gater: null
	},
	{
		from: 80,
		to: 379,
		weight: -0.007019292193205254,
		gater: null
	},
	{
		from: 81,
		to: 360,
		weight: -0.03209446909774326,
		gater: null
	},
	{
		from: 81,
		to: 361,
		weight: 0.07041754646704157,
		gater: null
	},
	{
		from: 81,
		to: 362,
		weight: -0.0929540118559554,
		gater: null
	},
	{
		from: 81,
		to: 363,
		weight: -0.04647333457054206,
		gater: null
	},
	{
		from: 81,
		to: 364,
		weight: 0.08830151081599391,
		gater: null
	},
	{
		from: 81,
		to: 365,
		weight: -0.05688255796073194,
		gater: null
	},
	{
		from: 81,
		to: 366,
		weight: 0.07837253724750456,
		gater: null
	},
	{
		from: 81,
		to: 367,
		weight: 0.01746650528343134,
		gater: null
	},
	{
		from: 81,
		to: 368,
		weight: -0.009505408986005298,
		gater: null
	},
	{
		from: 81,
		to: 369,
		weight: -0.04083630117664332,
		gater: null
	},
	{
		from: 81,
		to: 370,
		weight: -0.002201690505141185,
		gater: null
	},
	{
		from: 81,
		to: 371,
		weight: 0.059491863487809354,
		gater: null
	},
	{
		from: 81,
		to: 372,
		weight: -0.025516165612157013,
		gater: null
	},
	{
		from: 81,
		to: 373,
		weight: 0.07355593940007901,
		gater: null
	},
	{
		from: 81,
		to: 374,
		weight: -0.025558665443815756,
		gater: null
	},
	{
		from: 81,
		to: 375,
		weight: 0.0926204572880974,
		gater: null
	},
	{
		from: 81,
		to: 376,
		weight: -0.050287761560507654,
		gater: null
	},
	{
		from: 81,
		to: 377,
		weight: 0.07122587895685006,
		gater: null
	},
	{
		from: 81,
		to: 378,
		weight: 0.07290183843414785,
		gater: null
	},
	{
		from: 81,
		to: 379,
		weight: 0.01886277555918711,
		gater: null
	},
	{
		from: 82,
		to: 360,
		weight: -0.012503964013443933,
		gater: null
	},
	{
		from: 82,
		to: 361,
		weight: 0.06199135597809366,
		gater: null
	},
	{
		from: 82,
		to: 362,
		weight: 0.021883398307332505,
		gater: null
	},
	{
		from: 82,
		to: 363,
		weight: 0.06815350580509236,
		gater: null
	},
	{
		from: 82,
		to: 364,
		weight: 0.0512250553041759,
		gater: null
	},
	{
		from: 82,
		to: 365,
		weight: 0.029791325703409838,
		gater: null
	},
	{
		from: 82,
		to: 366,
		weight: -0.07963041509336595,
		gater: null
	},
	{
		from: 82,
		to: 367,
		weight: -0.06915431779477227,
		gater: null
	},
	{
		from: 82,
		to: 368,
		weight: 0.08168470574405082,
		gater: null
	},
	{
		from: 82,
		to: 369,
		weight: 0.01836547374648037,
		gater: null
	},
	{
		from: 82,
		to: 370,
		weight: -0.07938846885145222,
		gater: null
	},
	{
		from: 82,
		to: 371,
		weight: -0.03298390270357268,
		gater: null
	},
	{
		from: 82,
		to: 372,
		weight: -0.0699782600103252,
		gater: null
	},
	{
		from: 82,
		to: 373,
		weight: 0.029275896680273583,
		gater: null
	},
	{
		from: 82,
		to: 374,
		weight: -0.055077343965800954,
		gater: null
	},
	{
		from: 82,
		to: 375,
		weight: -0.06531001516683484,
		gater: null
	},
	{
		from: 82,
		to: 376,
		weight: 0.09894715670436169,
		gater: null
	},
	{
		from: 82,
		to: 377,
		weight: 0.08906082757624573,
		gater: null
	},
	{
		from: 82,
		to: 378,
		weight: -0.04259374955836153,
		gater: null
	},
	{
		from: 82,
		to: 379,
		weight: -0.0931001257665502,
		gater: null
	},
	{
		from: 83,
		to: 360,
		weight: -0.03874937193690853,
		gater: null
	},
	{
		from: 83,
		to: 361,
		weight: 0.010283143094214825,
		gater: null
	},
	{
		from: 83,
		to: 362,
		weight: -0.06802118064581691,
		gater: null
	},
	{
		from: 83,
		to: 363,
		weight: 0.04510633602202266,
		gater: null
	},
	{
		from: 83,
		to: 364,
		weight: -0.023040277860762265,
		gater: null
	},
	{
		from: 83,
		to: 365,
		weight: -0.0006359160289641369,
		gater: null
	},
	{
		from: 83,
		to: 366,
		weight: 0.09498199065139665,
		gater: null
	},
	{
		from: 83,
		to: 367,
		weight: 0.055519504857554275,
		gater: null
	},
	{
		from: 83,
		to: 368,
		weight: 0.010899633012881133,
		gater: null
	},
	{
		from: 83,
		to: 369,
		weight: 0.029061390024732514,
		gater: null
	},
	{
		from: 83,
		to: 370,
		weight: 0.0713133274522329,
		gater: null
	},
	{
		from: 83,
		to: 371,
		weight: -0.015435964105400934,
		gater: null
	},
	{
		from: 83,
		to: 372,
		weight: -0.08550473457023884,
		gater: null
	},
	{
		from: 83,
		to: 373,
		weight: -0.0337337185617721,
		gater: null
	},
	{
		from: 83,
		to: 374,
		weight: 0.06416262849113799,
		gater: null
	},
	{
		from: 83,
		to: 375,
		weight: 0.08140832060689004,
		gater: null
	},
	{
		from: 83,
		to: 376,
		weight: -0.04630505296931871,
		gater: null
	},
	{
		from: 83,
		to: 377,
		weight: -0.02720484740302949,
		gater: null
	},
	{
		from: 83,
		to: 378,
		weight: 0.022728144208618378,
		gater: null
	},
	{
		from: 83,
		to: 379,
		weight: -0.019806883202095144,
		gater: null
	},
	{
		from: 84,
		to: 360,
		weight: -0.048722017352002926,
		gater: null
	},
	{
		from: 84,
		to: 361,
		weight: 0.07177295669370412,
		gater: null
	},
	{
		from: 84,
		to: 362,
		weight: 0.08998847555895373,
		gater: null
	},
	{
		from: 84,
		to: 363,
		weight: 0.01904729631769078,
		gater: null
	},
	{
		from: 84,
		to: 364,
		weight: -0.03915072912181139,
		gater: null
	},
	{
		from: 84,
		to: 365,
		weight: -0.09304527493742976,
		gater: null
	},
	{
		from: 84,
		to: 366,
		weight: 0.0876018991909136,
		gater: null
	},
	{
		from: 84,
		to: 367,
		weight: 0.03897560417206161,
		gater: null
	},
	{
		from: 84,
		to: 368,
		weight: 0.03569326283507546,
		gater: null
	},
	{
		from: 84,
		to: 369,
		weight: 0.0996818071383399,
		gater: null
	},
	{
		from: 84,
		to: 370,
		weight: -0.0030390059768611033,
		gater: null
	},
	{
		from: 84,
		to: 371,
		weight: -0.03197702941620757,
		gater: null
	},
	{
		from: 84,
		to: 372,
		weight: -0.08724305986602077,
		gater: null
	},
	{
		from: 84,
		to: 373,
		weight: -0.01522934967770806,
		gater: null
	},
	{
		from: 84,
		to: 374,
		weight: -0.06313648098746927,
		gater: null
	},
	{
		from: 84,
		to: 375,
		weight: 0.05979120600749269,
		gater: null
	},
	{
		from: 84,
		to: 376,
		weight: -0.07669841278015053,
		gater: null
	},
	{
		from: 84,
		to: 377,
		weight: -0.05669596464555285,
		gater: null
	},
	{
		from: 84,
		to: 378,
		weight: 0.038851796946123895,
		gater: null
	},
	{
		from: 84,
		to: 379,
		weight: -0.09807451760566638,
		gater: null
	},
	{
		from: 85,
		to: 360,
		weight: -0.06854850892920644,
		gater: null
	},
	{
		from: 85,
		to: 361,
		weight: -0.0748459524064694,
		gater: null
	},
	{
		from: 85,
		to: 362,
		weight: 0.009719293014793212,
		gater: null
	},
	{
		from: 85,
		to: 363,
		weight: -0.09538311057063847,
		gater: null
	},
	{
		from: 85,
		to: 364,
		weight: -0.09333935900130662,
		gater: null
	},
	{
		from: 85,
		to: 365,
		weight: -0.07258718294023013,
		gater: null
	},
	{
		from: 85,
		to: 366,
		weight: 0.07544844693207758,
		gater: null
	},
	{
		from: 85,
		to: 367,
		weight: -0.03187366351698184,
		gater: null
	},
	{
		from: 85,
		to: 368,
		weight: 0.09522420155195249,
		gater: null
	},
	{
		from: 85,
		to: 369,
		weight: 0.07810541951187508,
		gater: null
	},
	{
		from: 85,
		to: 370,
		weight: 0.0697465432578897,
		gater: null
	},
	{
		from: 85,
		to: 371,
		weight: 0.028918107163589474,
		gater: null
	},
	{
		from: 85,
		to: 372,
		weight: 0.004709379965264132,
		gater: null
	},
	{
		from: 85,
		to: 373,
		weight: 0.05019843276950439,
		gater: null
	},
	{
		from: 85,
		to: 374,
		weight: -0.06845733927087401,
		gater: null
	},
	{
		from: 85,
		to: 375,
		weight: 0.02001627268175414,
		gater: null
	},
	{
		from: 85,
		to: 376,
		weight: 0.022149949290475937,
		gater: null
	},
	{
		from: 85,
		to: 377,
		weight: 0.08726429568939326,
		gater: null
	},
	{
		from: 85,
		to: 378,
		weight: 0.009601966120488734,
		gater: null
	},
	{
		from: 85,
		to: 379,
		weight: -0.021337505369828813,
		gater: null
	},
	{
		from: 86,
		to: 360,
		weight: 0.09614937578872246,
		gater: null
	},
	{
		from: 86,
		to: 361,
		weight: -0.042847220487661236,
		gater: null
	},
	{
		from: 86,
		to: 362,
		weight: -0.06186341318785926,
		gater: null
	},
	{
		from: 86,
		to: 363,
		weight: -0.07909082910319026,
		gater: null
	},
	{
		from: 86,
		to: 364,
		weight: -0.09732681264919912,
		gater: null
	},
	{
		from: 86,
		to: 365,
		weight: -0.06394982975476204,
		gater: null
	},
	{
		from: 86,
		to: 366,
		weight: -0.027718730092178803,
		gater: null
	},
	{
		from: 86,
		to: 367,
		weight: 0.01612184683726592,
		gater: null
	},
	{
		from: 86,
		to: 368,
		weight: 0.058042698320858094,
		gater: null
	},
	{
		from: 86,
		to: 369,
		weight: 0.014101203404403823,
		gater: null
	},
	{
		from: 86,
		to: 370,
		weight: 0.07167644619437885,
		gater: null
	},
	{
		from: 86,
		to: 371,
		weight: -0.09745679539898644,
		gater: null
	},
	{
		from: 86,
		to: 372,
		weight: 0.07730601504164542,
		gater: null
	},
	{
		from: 86,
		to: 373,
		weight: 0.05029815106768207,
		gater: null
	},
	{
		from: 86,
		to: 374,
		weight: 0.043156842388974714,
		gater: null
	},
	{
		from: 86,
		to: 375,
		weight: 0.05824987172553597,
		gater: null
	},
	{
		from: 86,
		to: 376,
		weight: -0.03032536402892934,
		gater: null
	},
	{
		from: 86,
		to: 377,
		weight: -0.09609497833417634,
		gater: null
	},
	{
		from: 86,
		to: 378,
		weight: 0.007757601348387405,
		gater: null
	},
	{
		from: 86,
		to: 379,
		weight: -0.014812613248381762,
		gater: null
	},
	{
		from: 87,
		to: 360,
		weight: 0.01869040188690621,
		gater: null
	},
	{
		from: 87,
		to: 361,
		weight: 0.0010132663901296218,
		gater: null
	},
	{
		from: 87,
		to: 362,
		weight: 0.02483213627197038,
		gater: null
	},
	{
		from: 87,
		to: 363,
		weight: -0.09114778481861166,
		gater: null
	},
	{
		from: 87,
		to: 364,
		weight: 0.02392329465565464,
		gater: null
	},
	{
		from: 87,
		to: 365,
		weight: 0.07942693747840607,
		gater: null
	},
	{
		from: 87,
		to: 366,
		weight: 0.05599194790340642,
		gater: null
	},
	{
		from: 87,
		to: 367,
		weight: 0.039500312224657635,
		gater: null
	},
	{
		from: 87,
		to: 368,
		weight: -0.06534737993140811,
		gater: null
	},
	{
		from: 87,
		to: 369,
		weight: -0.09765462104113337,
		gater: null
	},
	{
		from: 87,
		to: 370,
		weight: -0.07047101700961594,
		gater: null
	},
	{
		from: 87,
		to: 371,
		weight: 0.06727172689839997,
		gater: null
	},
	{
		from: 87,
		to: 372,
		weight: 0.040841249313408184,
		gater: null
	},
	{
		from: 87,
		to: 373,
		weight: 0.02879138329148484,
		gater: null
	},
	{
		from: 87,
		to: 374,
		weight: 0.08660755103069526,
		gater: null
	},
	{
		from: 87,
		to: 375,
		weight: -0.05195322014660175,
		gater: null
	},
	{
		from: 87,
		to: 376,
		weight: 0.05751341557576958,
		gater: null
	},
	{
		from: 87,
		to: 377,
		weight: 0.022766466152608883,
		gater: null
	},
	{
		from: 87,
		to: 378,
		weight: -0.04614998060000124,
		gater: null
	},
	{
		from: 87,
		to: 379,
		weight: 0.006639334331456095,
		gater: null
	},
	{
		from: 88,
		to: 360,
		weight: -0.011173994603718013,
		gater: null
	},
	{
		from: 88,
		to: 361,
		weight: -0.09257393162159167,
		gater: null
	},
	{
		from: 88,
		to: 362,
		weight: 0.024672746521181482,
		gater: null
	},
	{
		from: 88,
		to: 363,
		weight: 0.02219829624164049,
		gater: null
	},
	{
		from: 88,
		to: 364,
		weight: -0.05790307602465621,
		gater: null
	},
	{
		from: 88,
		to: 365,
		weight: -0.05235745624548907,
		gater: null
	},
	{
		from: 88,
		to: 366,
		weight: 0.05164464159948476,
		gater: null
	},
	{
		from: 88,
		to: 367,
		weight: 0.07957406337619585,
		gater: null
	},
	{
		from: 88,
		to: 368,
		weight: -0.05185479771801234,
		gater: null
	},
	{
		from: 88,
		to: 369,
		weight: 0.008537168414922386,
		gater: null
	},
	{
		from: 88,
		to: 370,
		weight: 0.032725944475471724,
		gater: null
	},
	{
		from: 88,
		to: 371,
		weight: 0.06765595001219782,
		gater: null
	},
	{
		from: 88,
		to: 372,
		weight: 0.044471487807454885,
		gater: null
	},
	{
		from: 88,
		to: 373,
		weight: -0.004190365045572131,
		gater: null
	},
	{
		from: 88,
		to: 374,
		weight: -0.08970394834618141,
		gater: null
	},
	{
		from: 88,
		to: 375,
		weight: -0.06291272217324648,
		gater: null
	},
	{
		from: 88,
		to: 376,
		weight: -0.005009480352902745,
		gater: null
	},
	{
		from: 88,
		to: 377,
		weight: -0.07415861556884087,
		gater: null
	},
	{
		from: 88,
		to: 378,
		weight: -0.031795303620510085,
		gater: null
	},
	{
		from: 88,
		to: 379,
		weight: 0.0829369704618495,
		gater: null
	},
	{
		from: 89,
		to: 360,
		weight: -0.09615071907044821,
		gater: null
	},
	{
		from: 89,
		to: 361,
		weight: 0.021623337269876503,
		gater: null
	},
	{
		from: 89,
		to: 362,
		weight: 0.00456688246080654,
		gater: null
	},
	{
		from: 89,
		to: 363,
		weight: 0.05694506513323869,
		gater: null
	},
	{
		from: 89,
		to: 364,
		weight: 0.012090520105231345,
		gater: null
	},
	{
		from: 89,
		to: 365,
		weight: -0.09745021663407938,
		gater: null
	},
	{
		from: 89,
		to: 366,
		weight: -0.02422475655718359,
		gater: null
	},
	{
		from: 89,
		to: 367,
		weight: -0.029531239649592242,
		gater: null
	},
	{
		from: 89,
		to: 368,
		weight: -0.07907372390831778,
		gater: null
	},
	{
		from: 89,
		to: 369,
		weight: -0.060084226267956224,
		gater: null
	},
	{
		from: 89,
		to: 370,
		weight: 0.03167398978674302,
		gater: null
	},
	{
		from: 89,
		to: 371,
		weight: 0.07461533970119866,
		gater: null
	},
	{
		from: 89,
		to: 372,
		weight: -0.021293990815299188,
		gater: null
	},
	{
		from: 89,
		to: 373,
		weight: -0.09427241090607469,
		gater: null
	},
	{
		from: 89,
		to: 374,
		weight: -0.07021602285025859,
		gater: null
	},
	{
		from: 89,
		to: 375,
		weight: -0.09157569632488692,
		gater: null
	},
	{
		from: 89,
		to: 376,
		weight: 0.012367041048314986,
		gater: null
	},
	{
		from: 89,
		to: 377,
		weight: -0.011276818837812203,
		gater: null
	},
	{
		from: 89,
		to: 378,
		weight: -0.07263739674753529,
		gater: null
	},
	{
		from: 89,
		to: 379,
		weight: 0.005015947796154482,
		gater: null
	},
	{
		from: 90,
		to: 360,
		weight: -0.008563778234553204,
		gater: null
	},
	{
		from: 90,
		to: 361,
		weight: -0.016044199295152065,
		gater: null
	},
	{
		from: 90,
		to: 362,
		weight: 0.0926235912360269,
		gater: null
	},
	{
		from: 90,
		to: 363,
		weight: -0.008910967288064328,
		gater: null
	},
	{
		from: 90,
		to: 364,
		weight: -0.00396096666236985,
		gater: null
	},
	{
		from: 90,
		to: 365,
		weight: 0.07343817132772382,
		gater: null
	},
	{
		from: 90,
		to: 366,
		weight: -0.08921629091417081,
		gater: null
	},
	{
		from: 90,
		to: 367,
		weight: 0.00588151559123809,
		gater: null
	},
	{
		from: 90,
		to: 368,
		weight: -0.04719740706890483,
		gater: null
	},
	{
		from: 90,
		to: 369,
		weight: -0.005794197367247428,
		gater: null
	},
	{
		from: 90,
		to: 370,
		weight: 0.09094482068359216,
		gater: null
	},
	{
		from: 90,
		to: 371,
		weight: -0.03953578356344454,
		gater: null
	},
	{
		from: 90,
		to: 372,
		weight: 0.0742330901785748,
		gater: null
	},
	{
		from: 90,
		to: 373,
		weight: 0.058077937912020705,
		gater: null
	},
	{
		from: 90,
		to: 374,
		weight: -0.08615350122197905,
		gater: null
	},
	{
		from: 90,
		to: 375,
		weight: -0.01729356953709664,
		gater: null
	},
	{
		from: 90,
		to: 376,
		weight: -0.015539244870731966,
		gater: null
	},
	{
		from: 90,
		to: 377,
		weight: 0.04635699330948709,
		gater: null
	},
	{
		from: 90,
		to: 378,
		weight: 0.002141482821126181,
		gater: null
	},
	{
		from: 90,
		to: 379,
		weight: -0.09544377933484852,
		gater: null
	},
	{
		from: 91,
		to: 360,
		weight: 0.039992733608094966,
		gater: null
	},
	{
		from: 91,
		to: 361,
		weight: 0.005309029533207749,
		gater: null
	},
	{
		from: 91,
		to: 362,
		weight: 0.09414899080290101,
		gater: null
	},
	{
		from: 91,
		to: 363,
		weight: -0.09368854541718785,
		gater: null
	},
	{
		from: 91,
		to: 364,
		weight: 0.0960961854649785,
		gater: null
	},
	{
		from: 91,
		to: 365,
		weight: 0.04731205154961149,
		gater: null
	},
	{
		from: 91,
		to: 366,
		weight: 0.06295826566501833,
		gater: null
	},
	{
		from: 91,
		to: 367,
		weight: 0.031818355380372976,
		gater: null
	},
	{
		from: 91,
		to: 368,
		weight: 0.09558018740136873,
		gater: null
	},
	{
		from: 91,
		to: 369,
		weight: 0.01266311994836325,
		gater: null
	},
	{
		from: 91,
		to: 370,
		weight: 0.06172719670721413,
		gater: null
	},
	{
		from: 91,
		to: 371,
		weight: -0.01740894961349633,
		gater: null
	},
	{
		from: 91,
		to: 372,
		weight: 0.0860839027260552,
		gater: null
	},
	{
		from: 91,
		to: 373,
		weight: -0.022295018714552972,
		gater: null
	},
	{
		from: 91,
		to: 374,
		weight: -0.06240553189375993,
		gater: null
	},
	{
		from: 91,
		to: 375,
		weight: -0.002937348428750791,
		gater: null
	},
	{
		from: 91,
		to: 376,
		weight: -0.037300014190276315,
		gater: null
	},
	{
		from: 91,
		to: 377,
		weight: -0.049165524010378325,
		gater: null
	},
	{
		from: 91,
		to: 378,
		weight: 0.035322016582169324,
		gater: null
	},
	{
		from: 91,
		to: 379,
		weight: -0.0788187568406979,
		gater: null
	},
	{
		from: 92,
		to: 360,
		weight: 0.02864804529378287,
		gater: null
	},
	{
		from: 92,
		to: 361,
		weight: 0.02200646231274636,
		gater: null
	},
	{
		from: 92,
		to: 362,
		weight: 0.022109373897547344,
		gater: null
	},
	{
		from: 92,
		to: 363,
		weight: -0.07667923334592781,
		gater: null
	},
	{
		from: 92,
		to: 364,
		weight: 0.017744348434625135,
		gater: null
	},
	{
		from: 92,
		to: 365,
		weight: -0.06449526384431686,
		gater: null
	},
	{
		from: 92,
		to: 366,
		weight: 0.09555340787754107,
		gater: null
	},
	{
		from: 92,
		to: 367,
		weight: 0.05899734462946468,
		gater: null
	},
	{
		from: 92,
		to: 368,
		weight: 0.05891282609991558,
		gater: null
	},
	{
		from: 92,
		to: 369,
		weight: 0.06641800201655293,
		gater: null
	},
	{
		from: 92,
		to: 370,
		weight: 0.03859950700323003,
		gater: null
	},
	{
		from: 92,
		to: 371,
		weight: 0.05223207137978925,
		gater: null
	},
	{
		from: 92,
		to: 372,
		weight: 0.041367186244650744,
		gater: null
	},
	{
		from: 92,
		to: 373,
		weight: 0.05447871266847654,
		gater: null
	},
	{
		from: 92,
		to: 374,
		weight: 0.022951768537207637,
		gater: null
	},
	{
		from: 92,
		to: 375,
		weight: -0.09025844895321931,
		gater: null
	},
	{
		from: 92,
		to: 376,
		weight: 0.0829468580641631,
		gater: null
	},
	{
		from: 92,
		to: 377,
		weight: 0.09691487855120468,
		gater: null
	},
	{
		from: 92,
		to: 378,
		weight: 0.05466712061901213,
		gater: null
	},
	{
		from: 92,
		to: 379,
		weight: -0.05064207197407709,
		gater: null
	},
	{
		from: 93,
		to: 360,
		weight: 0.05325062773553474,
		gater: null
	},
	{
		from: 93,
		to: 361,
		weight: 0.056407051465771796,
		gater: null
	},
	{
		from: 93,
		to: 362,
		weight: -0.008397947594613514,
		gater: null
	},
	{
		from: 93,
		to: 363,
		weight: 0.09341680449165493,
		gater: null
	},
	{
		from: 93,
		to: 364,
		weight: -0.09184557111320438,
		gater: null
	},
	{
		from: 93,
		to: 365,
		weight: -0.005280002060380443,
		gater: null
	},
	{
		from: 93,
		to: 366,
		weight: -0.08286925807694506,
		gater: null
	},
	{
		from: 93,
		to: 367,
		weight: -0.048394522143997955,
		gater: null
	},
	{
		from: 93,
		to: 368,
		weight: 0.03669039066092589,
		gater: null
	},
	{
		from: 93,
		to: 369,
		weight: -0.029447819062680666,
		gater: null
	},
	{
		from: 93,
		to: 370,
		weight: 0.05085341789161488,
		gater: null
	},
	{
		from: 93,
		to: 371,
		weight: 0.07211370661586605,
		gater: null
	},
	{
		from: 93,
		to: 372,
		weight: 0.024787933439571003,
		gater: null
	},
	{
		from: 93,
		to: 373,
		weight: 0.07398593179256469,
		gater: null
	},
	{
		from: 93,
		to: 374,
		weight: -0.01141996259005755,
		gater: null
	},
	{
		from: 93,
		to: 375,
		weight: 0.09203933394845479,
		gater: null
	},
	{
		from: 93,
		to: 376,
		weight: -0.0920054069912307,
		gater: null
	},
	{
		from: 93,
		to: 377,
		weight: -0.01115364133397545,
		gater: null
	},
	{
		from: 93,
		to: 378,
		weight: 0.05904532461285267,
		gater: null
	},
	{
		from: 93,
		to: 379,
		weight: -0.06906810225184917,
		gater: null
	},
	{
		from: 94,
		to: 360,
		weight: 0.09599743835608573,
		gater: null
	},
	{
		from: 94,
		to: 361,
		weight: -0.052400170557809926,
		gater: null
	},
	{
		from: 94,
		to: 362,
		weight: 0.022712864696984705,
		gater: null
	},
	{
		from: 94,
		to: 363,
		weight: -0.08366016023828915,
		gater: null
	},
	{
		from: 94,
		to: 364,
		weight: -0.06954607490246408,
		gater: null
	},
	{
		from: 94,
		to: 365,
		weight: 0.06047177835920611,
		gater: null
	},
	{
		from: 94,
		to: 366,
		weight: -0.08650211530399887,
		gater: null
	},
	{
		from: 94,
		to: 367,
		weight: 0.055844675588058085,
		gater: null
	},
	{
		from: 94,
		to: 368,
		weight: 0.08668196734472958,
		gater: null
	},
	{
		from: 94,
		to: 369,
		weight: 0.04926725666061174,
		gater: null
	},
	{
		from: 94,
		to: 370,
		weight: -0.052439175626688206,
		gater: null
	},
	{
		from: 94,
		to: 371,
		weight: 0.04870923198732574,
		gater: null
	},
	{
		from: 94,
		to: 372,
		weight: -0.01315343192035856,
		gater: null
	},
	{
		from: 94,
		to: 373,
		weight: 0.005830839900915888,
		gater: null
	},
	{
		from: 94,
		to: 374,
		weight: -0.007220998978522131,
		gater: null
	},
	{
		from: 94,
		to: 375,
		weight: 0.075962425892798,
		gater: null
	},
	{
		from: 94,
		to: 376,
		weight: -0.0769422331913297,
		gater: null
	},
	{
		from: 94,
		to: 377,
		weight: -0.08084172273180684,
		gater: null
	},
	{
		from: 94,
		to: 378,
		weight: 0.01160088968198289,
		gater: null
	},
	{
		from: 94,
		to: 379,
		weight: -0.039750783359706124,
		gater: null
	},
	{
		from: 95,
		to: 360,
		weight: -0.024948367434706895,
		gater: null
	},
	{
		from: 95,
		to: 361,
		weight: 0.003123987843214465,
		gater: null
	},
	{
		from: 95,
		to: 362,
		weight: -0.04996021105207667,
		gater: null
	},
	{
		from: 95,
		to: 363,
		weight: 0.011626021442637843,
		gater: null
	},
	{
		from: 95,
		to: 364,
		weight: -0.08238033719039697,
		gater: null
	},
	{
		from: 95,
		to: 365,
		weight: 0.0007123227527931209,
		gater: null
	},
	{
		from: 95,
		to: 366,
		weight: 0.023069210746342467,
		gater: null
	},
	{
		from: 95,
		to: 367,
		weight: 0.061996974187030596,
		gater: null
	},
	{
		from: 95,
		to: 368,
		weight: 0.018033709912824228,
		gater: null
	},
	{
		from: 95,
		to: 369,
		weight: 0.07566804688486056,
		gater: null
	},
	{
		from: 95,
		to: 370,
		weight: -0.0790458631919902,
		gater: null
	},
	{
		from: 95,
		to: 371,
		weight: 0.0503952622967416,
		gater: null
	},
	{
		from: 95,
		to: 372,
		weight: -0.08031688825871952,
		gater: null
	},
	{
		from: 95,
		to: 373,
		weight: 0.019545598943074033,
		gater: null
	},
	{
		from: 95,
		to: 374,
		weight: -0.09718808476624186,
		gater: null
	},
	{
		from: 95,
		to: 375,
		weight: -0.08660473011952181,
		gater: null
	},
	{
		from: 95,
		to: 376,
		weight: 0.016422303829343884,
		gater: null
	},
	{
		from: 95,
		to: 377,
		weight: 0.03708357010869898,
		gater: null
	},
	{
		from: 95,
		to: 378,
		weight: 0.0036092810117176466,
		gater: null
	},
	{
		from: 95,
		to: 379,
		weight: 0.011953860779369802,
		gater: null
	},
	{
		from: 96,
		to: 360,
		weight: -0.009112296058862587,
		gater: null
	},
	{
		from: 96,
		to: 361,
		weight: -0.035043885330889646,
		gater: null
	},
	{
		from: 96,
		to: 362,
		weight: -0.07718648271261089,
		gater: null
	},
	{
		from: 96,
		to: 363,
		weight: 0.08797468359317426,
		gater: null
	},
	{
		from: 96,
		to: 364,
		weight: -0.07902574851015896,
		gater: null
	},
	{
		from: 96,
		to: 365,
		weight: 0.09725713618580262,
		gater: null
	},
	{
		from: 96,
		to: 366,
		weight: 0.06344161186083391,
		gater: null
	},
	{
		from: 96,
		to: 367,
		weight: -0.03158410538376058,
		gater: null
	},
	{
		from: 96,
		to: 368,
		weight: 0.013071156504972009,
		gater: null
	},
	{
		from: 96,
		to: 369,
		weight: -0.025036508343068406,
		gater: null
	},
	{
		from: 96,
		to: 370,
		weight: 0.07145938761755519,
		gater: null
	},
	{
		from: 96,
		to: 371,
		weight: 0.007959721864417846,
		gater: null
	},
	{
		from: 96,
		to: 372,
		weight: 0.03827993441590977,
		gater: null
	},
	{
		from: 96,
		to: 373,
		weight: 0.007536498414288578,
		gater: null
	},
	{
		from: 96,
		to: 374,
		weight: 0.0948601777033296,
		gater: null
	},
	{
		from: 96,
		to: 375,
		weight: 0.06324526258196358,
		gater: null
	},
	{
		from: 96,
		to: 376,
		weight: -0.0039011801892721854,
		gater: null
	},
	{
		from: 96,
		to: 377,
		weight: 0.07009200581862185,
		gater: null
	},
	{
		from: 96,
		to: 378,
		weight: 0.08725219557159952,
		gater: null
	},
	{
		from: 96,
		to: 379,
		weight: 0.000684653224594628,
		gater: null
	},
	{
		from: 97,
		to: 360,
		weight: -0.004584547004266554,
		gater: null
	},
	{
		from: 97,
		to: 361,
		weight: -0.04758680597267487,
		gater: null
	},
	{
		from: 97,
		to: 362,
		weight: -0.0678422536075208,
		gater: null
	},
	{
		from: 97,
		to: 363,
		weight: 0.0017308623512876375,
		gater: null
	},
	{
		from: 97,
		to: 364,
		weight: -0.029372095903425252,
		gater: null
	},
	{
		from: 97,
		to: 365,
		weight: -0.08171033002286454,
		gater: null
	},
	{
		from: 97,
		to: 366,
		weight: 0.021767267820823916,
		gater: null
	},
	{
		from: 97,
		to: 367,
		weight: 0.08716488850446541,
		gater: null
	},
	{
		from: 97,
		to: 368,
		weight: -0.08893580047916956,
		gater: null
	},
	{
		from: 97,
		to: 369,
		weight: -0.0582751504114091,
		gater: null
	},
	{
		from: 97,
		to: 370,
		weight: -0.03272583064814309,
		gater: null
	},
	{
		from: 97,
		to: 371,
		weight: 0.031283820338530444,
		gater: null
	},
	{
		from: 97,
		to: 372,
		weight: 0.08103071961931674,
		gater: null
	},
	{
		from: 97,
		to: 373,
		weight: 0.03347872270444835,
		gater: null
	},
	{
		from: 97,
		to: 374,
		weight: -0.030553472844506893,
		gater: null
	},
	{
		from: 97,
		to: 375,
		weight: -0.07568391688386589,
		gater: null
	},
	{
		from: 97,
		to: 376,
		weight: 0.09502473039476153,
		gater: null
	},
	{
		from: 97,
		to: 377,
		weight: 0.039859371834400775,
		gater: null
	},
	{
		from: 97,
		to: 378,
		weight: -0.09225124538348761,
		gater: null
	},
	{
		from: 97,
		to: 379,
		weight: 0.026632419666819673,
		gater: null
	},
	{
		from: 98,
		to: 360,
		weight: -0.08684217248270198,
		gater: null
	},
	{
		from: 98,
		to: 361,
		weight: 0.08228469907354913,
		gater: null
	},
	{
		from: 98,
		to: 362,
		weight: 0.07978257926461937,
		gater: null
	},
	{
		from: 98,
		to: 363,
		weight: 0.05758601884148287,
		gater: null
	},
	{
		from: 98,
		to: 364,
		weight: -0.0005621592612731485,
		gater: null
	},
	{
		from: 98,
		to: 365,
		weight: 0.053536126930818745,
		gater: null
	},
	{
		from: 98,
		to: 366,
		weight: -0.004240626775769266,
		gater: null
	},
	{
		from: 98,
		to: 367,
		weight: 0.04536502301388046,
		gater: null
	},
	{
		from: 98,
		to: 368,
		weight: -0.024981680687403113,
		gater: null
	},
	{
		from: 98,
		to: 369,
		weight: 0.0012715192202258085,
		gater: null
	},
	{
		from: 98,
		to: 370,
		weight: 0.08102531983163228,
		gater: null
	},
	{
		from: 98,
		to: 371,
		weight: 0.04287820893033886,
		gater: null
	},
	{
		from: 98,
		to: 372,
		weight: -0.03052633896596034,
		gater: null
	},
	{
		from: 98,
		to: 373,
		weight: 0.0675603820526671,
		gater: null
	},
	{
		from: 98,
		to: 374,
		weight: -0.0013281107359117278,
		gater: null
	},
	{
		from: 98,
		to: 375,
		weight: 0.018870637707174925,
		gater: null
	},
	{
		from: 98,
		to: 376,
		weight: -0.08532075168356812,
		gater: null
	},
	{
		from: 98,
		to: 377,
		weight: -0.059008706425706596,
		gater: null
	},
	{
		from: 98,
		to: 378,
		weight: 0.09721333729016676,
		gater: null
	},
	{
		from: 98,
		to: 379,
		weight: 0.06254448846242502,
		gater: null
	},
	{
		from: 99,
		to: 360,
		weight: 0.029233045987029943,
		gater: null
	},
	{
		from: 99,
		to: 361,
		weight: 0.048459126578514644,
		gater: null
	},
	{
		from: 99,
		to: 362,
		weight: -0.006415531413591372,
		gater: null
	},
	{
		from: 99,
		to: 363,
		weight: -0.08710103798298907,
		gater: null
	},
	{
		from: 99,
		to: 364,
		weight: -0.09034761336081815,
		gater: null
	},
	{
		from: 99,
		to: 365,
		weight: -0.06457977737594285,
		gater: null
	},
	{
		from: 99,
		to: 366,
		weight: -0.0418816410366913,
		gater: null
	},
	{
		from: 99,
		to: 367,
		weight: 0.03955603782197953,
		gater: null
	},
	{
		from: 99,
		to: 368,
		weight: 0.03177428873948546,
		gater: null
	},
	{
		from: 99,
		to: 369,
		weight: -0.04081357636545935,
		gater: null
	},
	{
		from: 99,
		to: 370,
		weight: 0.09108569094489263,
		gater: null
	},
	{
		from: 99,
		to: 371,
		weight: -0.023326223896760062,
		gater: null
	},
	{
		from: 99,
		to: 372,
		weight: -0.09774411346396175,
		gater: null
	},
	{
		from: 99,
		to: 373,
		weight: 0.052079723292726865,
		gater: null
	},
	{
		from: 99,
		to: 374,
		weight: -0.06421470518858868,
		gater: null
	},
	{
		from: 99,
		to: 375,
		weight: -0.09881911216472977,
		gater: null
	},
	{
		from: 99,
		to: 376,
		weight: 0.09495327080467689,
		gater: null
	},
	{
		from: 99,
		to: 377,
		weight: 0.0028670433834796505,
		gater: null
	},
	{
		from: 99,
		to: 378,
		weight: -0.040571612305764365,
		gater: null
	},
	{
		from: 99,
		to: 379,
		weight: -0.008264174112241424,
		gater: null
	},
	{
		from: 100,
		to: 360,
		weight: 0.027987421608885427,
		gater: null
	},
	{
		from: 100,
		to: 361,
		weight: -0.06572205964640482,
		gater: null
	},
	{
		from: 100,
		to: 362,
		weight: -0.07023707440860445,
		gater: null
	},
	{
		from: 100,
		to: 363,
		weight: -0.03808268527874162,
		gater: null
	},
	{
		from: 100,
		to: 364,
		weight: -0.08306419875419505,
		gater: null
	},
	{
		from: 100,
		to: 365,
		weight: -0.040500843258756226,
		gater: null
	},
	{
		from: 100,
		to: 366,
		weight: -0.019621296346928482,
		gater: null
	},
	{
		from: 100,
		to: 367,
		weight: -0.01362759054621994,
		gater: null
	},
	{
		from: 100,
		to: 368,
		weight: -0.06059364627158792,
		gater: null
	},
	{
		from: 100,
		to: 369,
		weight: 0.0795550074142112,
		gater: null
	},
	{
		from: 100,
		to: 370,
		weight: -0.05594059270559355,
		gater: null
	},
	{
		from: 100,
		to: 371,
		weight: -0.028326644513751734,
		gater: null
	},
	{
		from: 100,
		to: 372,
		weight: 0.03829445159951975,
		gater: null
	},
	{
		from: 100,
		to: 373,
		weight: 0.003907763049331783,
		gater: null
	},
	{
		from: 100,
		to: 374,
		weight: -0.010831633291756848,
		gater: null
	},
	{
		from: 100,
		to: 375,
		weight: 0.09850578398937235,
		gater: null
	},
	{
		from: 100,
		to: 376,
		weight: -0.056984178754523954,
		gater: null
	},
	{
		from: 100,
		to: 377,
		weight: 0.04534574812193831,
		gater: null
	},
	{
		from: 100,
		to: 378,
		weight: -0.013578317418428382,
		gater: null
	},
	{
		from: 100,
		to: 379,
		weight: 0.07316615518355393,
		gater: null
	},
	{
		from: 101,
		to: 360,
		weight: -0.024246738416754218,
		gater: null
	},
	{
		from: 101,
		to: 361,
		weight: -0.0560679121333568,
		gater: null
	},
	{
		from: 101,
		to: 362,
		weight: -0.06133161503301632,
		gater: null
	},
	{
		from: 101,
		to: 363,
		weight: -0.09175869704094386,
		gater: null
	},
	{
		from: 101,
		to: 364,
		weight: -0.05399705462886302,
		gater: null
	},
	{
		from: 101,
		to: 365,
		weight: -0.058085287354873616,
		gater: null
	},
	{
		from: 101,
		to: 366,
		weight: -0.05505005696185519,
		gater: null
	},
	{
		from: 101,
		to: 367,
		weight: 0.09856796157716011,
		gater: null
	},
	{
		from: 101,
		to: 368,
		weight: -0.08575955190221554,
		gater: null
	},
	{
		from: 101,
		to: 369,
		weight: -0.010737242224093266,
		gater: null
	},
	{
		from: 101,
		to: 370,
		weight: -0.003212692495770053,
		gater: null
	},
	{
		from: 101,
		to: 371,
		weight: -0.03922620302135069,
		gater: null
	},
	{
		from: 101,
		to: 372,
		weight: -0.05540654307143931,
		gater: null
	},
	{
		from: 101,
		to: 373,
		weight: -0.011826049028596769,
		gater: null
	},
	{
		from: 101,
		to: 374,
		weight: -0.008848660613073808,
		gater: null
	},
	{
		from: 101,
		to: 375,
		weight: -0.01573930606142411,
		gater: null
	},
	{
		from: 101,
		to: 376,
		weight: -0.028198153638337553,
		gater: null
	},
	{
		from: 101,
		to: 377,
		weight: -0.09879149696545508,
		gater: null
	},
	{
		from: 101,
		to: 378,
		weight: -0.02010701311028798,
		gater: null
	},
	{
		from: 101,
		to: 379,
		weight: -0.03142673754104784,
		gater: null
	},
	{
		from: 102,
		to: 360,
		weight: 0.055155630803640776,
		gater: null
	},
	{
		from: 102,
		to: 361,
		weight: -0.049466855853345496,
		gater: null
	},
	{
		from: 102,
		to: 362,
		weight: -0.09279998722368901,
		gater: null
	},
	{
		from: 102,
		to: 363,
		weight: -0.031455646505744506,
		gater: null
	},
	{
		from: 102,
		to: 364,
		weight: 0.03397623002478936,
		gater: null
	},
	{
		from: 102,
		to: 365,
		weight: 0.08300546734286171,
		gater: null
	},
	{
		from: 102,
		to: 366,
		weight: -0.07721891689740717,
		gater: null
	},
	{
		from: 102,
		to: 367,
		weight: 0.05543678800165794,
		gater: null
	},
	{
		from: 102,
		to: 368,
		weight: 0.0006798650178972271,
		gater: null
	},
	{
		from: 102,
		to: 369,
		weight: -0.0727756831532517,
		gater: null
	},
	{
		from: 102,
		to: 370,
		weight: -0.05390340328146262,
		gater: null
	},
	{
		from: 102,
		to: 371,
		weight: 0.0880365214860992,
		gater: null
	},
	{
		from: 102,
		to: 372,
		weight: -0.002687937286616024,
		gater: null
	},
	{
		from: 102,
		to: 373,
		weight: 0.004470754859866671,
		gater: null
	},
	{
		from: 102,
		to: 374,
		weight: 0.03449364422900633,
		gater: null
	},
	{
		from: 102,
		to: 375,
		weight: -0.07024278608097762,
		gater: null
	},
	{
		from: 102,
		to: 376,
		weight: -0.061594063770357636,
		gater: null
	},
	{
		from: 102,
		to: 377,
		weight: 0.06393810123616461,
		gater: null
	},
	{
		from: 102,
		to: 378,
		weight: -0.06554072920717308,
		gater: null
	},
	{
		from: 102,
		to: 379,
		weight: -0.09585936889042888,
		gater: null
	},
	{
		from: 103,
		to: 360,
		weight: 0.025629502154220496,
		gater: null
	},
	{
		from: 103,
		to: 361,
		weight: -0.05161909737201867,
		gater: null
	},
	{
		from: 103,
		to: 362,
		weight: 0.06624904385846336,
		gater: null
	},
	{
		from: 103,
		to: 363,
		weight: 0.018765425957454257,
		gater: null
	},
	{
		from: 103,
		to: 364,
		weight: -0.04362920452816113,
		gater: null
	},
	{
		from: 103,
		to: 365,
		weight: -0.01099856423799786,
		gater: null
	},
	{
		from: 103,
		to: 366,
		weight: 0.0745652837388979,
		gater: null
	},
	{
		from: 103,
		to: 367,
		weight: 0.0759112895924536,
		gater: null
	},
	{
		from: 103,
		to: 368,
		weight: 0.0338232890116647,
		gater: null
	},
	{
		from: 103,
		to: 369,
		weight: 0.013202342257445737,
		gater: null
	},
	{
		from: 103,
		to: 370,
		weight: -0.06510127092085871,
		gater: null
	},
	{
		from: 103,
		to: 371,
		weight: 0.047807001055174825,
		gater: null
	},
	{
		from: 103,
		to: 372,
		weight: 0.01756498727048958,
		gater: null
	},
	{
		from: 103,
		to: 373,
		weight: -0.028279554474308105,
		gater: null
	},
	{
		from: 103,
		to: 374,
		weight: 0.0570564966446995,
		gater: null
	},
	{
		from: 103,
		to: 375,
		weight: -0.016236042761906336,
		gater: null
	},
	{
		from: 103,
		to: 376,
		weight: 0.03136296294480431,
		gater: null
	},
	{
		from: 103,
		to: 377,
		weight: 0.05717338207010553,
		gater: null
	},
	{
		from: 103,
		to: 378,
		weight: 0.04686331508122055,
		gater: null
	},
	{
		from: 103,
		to: 379,
		weight: -0.014176355939131732,
		gater: null
	},
	{
		from: 104,
		to: 360,
		weight: -0.0360081820760985,
		gater: null
	},
	{
		from: 104,
		to: 361,
		weight: 0.0705158723474327,
		gater: null
	},
	{
		from: 104,
		to: 362,
		weight: -0.08741921107554025,
		gater: null
	},
	{
		from: 104,
		to: 363,
		weight: -0.040173652217599366,
		gater: null
	},
	{
		from: 104,
		to: 364,
		weight: 0.03658845877765371,
		gater: null
	},
	{
		from: 104,
		to: 365,
		weight: 0.02737721790727407,
		gater: null
	},
	{
		from: 104,
		to: 366,
		weight: 0.059936485367640735,
		gater: null
	},
	{
		from: 104,
		to: 367,
		weight: 0.07974874286640402,
		gater: null
	},
	{
		from: 104,
		to: 368,
		weight: 0.012984168917985886,
		gater: null
	},
	{
		from: 104,
		to: 369,
		weight: -0.07674986274585516,
		gater: null
	},
	{
		from: 104,
		to: 370,
		weight: -0.04240404290307427,
		gater: null
	},
	{
		from: 104,
		to: 371,
		weight: 0.023276890351516547,
		gater: null
	},
	{
		from: 104,
		to: 372,
		weight: -0.04930415313850381,
		gater: null
	},
	{
		from: 104,
		to: 373,
		weight: -0.01128636123728452,
		gater: null
	},
	{
		from: 104,
		to: 374,
		weight: 0.07032085468325447,
		gater: null
	},
	{
		from: 104,
		to: 375,
		weight: 0.015295692276030295,
		gater: null
	},
	{
		from: 104,
		to: 376,
		weight: 0.005082841219556974,
		gater: null
	},
	{
		from: 104,
		to: 377,
		weight: 0.08771157231229695,
		gater: null
	},
	{
		from: 104,
		to: 378,
		weight: -0.034924844722765955,
		gater: null
	},
	{
		from: 104,
		to: 379,
		weight: -0.08449798142401735,
		gater: null
	},
	{
		from: 105,
		to: 360,
		weight: 0.0741460872783026,
		gater: null
	},
	{
		from: 105,
		to: 361,
		weight: 0.0046427069397018406,
		gater: null
	},
	{
		from: 105,
		to: 362,
		weight: 0.07343766027474247,
		gater: null
	},
	{
		from: 105,
		to: 363,
		weight: 0.012353403516691591,
		gater: null
	},
	{
		from: 105,
		to: 364,
		weight: 0.018766867779391516,
		gater: null
	},
	{
		from: 105,
		to: 365,
		weight: -0.010202410141750828,
		gater: null
	},
	{
		from: 105,
		to: 366,
		weight: -0.0823523223751689,
		gater: null
	},
	{
		from: 105,
		to: 367,
		weight: -0.02501093832550741,
		gater: null
	},
	{
		from: 105,
		to: 368,
		weight: 0.09420195963416811,
		gater: null
	},
	{
		from: 105,
		to: 369,
		weight: -0.018898196562840835,
		gater: null
	},
	{
		from: 105,
		to: 370,
		weight: -0.07994209155663512,
		gater: null
	},
	{
		from: 105,
		to: 371,
		weight: 0.08841084849957662,
		gater: null
	},
	{
		from: 105,
		to: 372,
		weight: 0.08543746592970455,
		gater: null
	},
	{
		from: 105,
		to: 373,
		weight: -0.07635831578601611,
		gater: null
	},
	{
		from: 105,
		to: 374,
		weight: 0.09105280049250464,
		gater: null
	},
	{
		from: 105,
		to: 375,
		weight: -0.08447267614743126,
		gater: null
	},
	{
		from: 105,
		to: 376,
		weight: -0.006510620924329219,
		gater: null
	},
	{
		from: 105,
		to: 377,
		weight: 0.05575220233823683,
		gater: null
	},
	{
		from: 105,
		to: 378,
		weight: -0.015955664025630645,
		gater: null
	},
	{
		from: 105,
		to: 379,
		weight: -0.08084837623482617,
		gater: null
	},
	{
		from: 106,
		to: 360,
		weight: 0.05121745593937979,
		gater: null
	},
	{
		from: 106,
		to: 361,
		weight: 0.09311850527652707,
		gater: null
	},
	{
		from: 106,
		to: 362,
		weight: 0.07201467527105812,
		gater: null
	},
	{
		from: 106,
		to: 363,
		weight: 0.09866571804667343,
		gater: null
	},
	{
		from: 106,
		to: 364,
		weight: -0.057344629447876154,
		gater: null
	},
	{
		from: 106,
		to: 365,
		weight: -0.04980163475106467,
		gater: null
	},
	{
		from: 106,
		to: 366,
		weight: 0.09612406654939118,
		gater: null
	},
	{
		from: 106,
		to: 367,
		weight: -0.09109069525580141,
		gater: null
	},
	{
		from: 106,
		to: 368,
		weight: 0.07740014100104586,
		gater: null
	},
	{
		from: 106,
		to: 369,
		weight: -0.011148872132324558,
		gater: null
	},
	{
		from: 106,
		to: 370,
		weight: -0.023342304157869614,
		gater: null
	},
	{
		from: 106,
		to: 371,
		weight: -0.0017948514339318766,
		gater: null
	},
	{
		from: 106,
		to: 372,
		weight: 0.06811023609051006,
		gater: null
	},
	{
		from: 106,
		to: 373,
		weight: 0.054442702674834836,
		gater: null
	},
	{
		from: 106,
		to: 374,
		weight: -0.0085381394790454,
		gater: null
	},
	{
		from: 106,
		to: 375,
		weight: 0.09629406226584544,
		gater: null
	},
	{
		from: 106,
		to: 376,
		weight: -0.09208596944410918,
		gater: null
	},
	{
		from: 106,
		to: 377,
		weight: 0.08779495065034423,
		gater: null
	},
	{
		from: 106,
		to: 378,
		weight: -0.018182313146018814,
		gater: null
	},
	{
		from: 106,
		to: 379,
		weight: -0.09401672915010995,
		gater: null
	},
	{
		from: 107,
		to: 360,
		weight: -0.0025185080106305546,
		gater: null
	},
	{
		from: 107,
		to: 361,
		weight: 0.09452360839627053,
		gater: null
	},
	{
		from: 107,
		to: 362,
		weight: -0.0784997850848836,
		gater: null
	},
	{
		from: 107,
		to: 363,
		weight: 0.020115530191451556,
		gater: null
	},
	{
		from: 107,
		to: 364,
		weight: -0.03414487024048189,
		gater: null
	},
	{
		from: 107,
		to: 365,
		weight: -0.04673651441533436,
		gater: null
	},
	{
		from: 107,
		to: 366,
		weight: 0.021937246485858264,
		gater: null
	},
	{
		from: 107,
		to: 367,
		weight: -0.062260796511924225,
		gater: null
	},
	{
		from: 107,
		to: 368,
		weight: 0.004386477445440698,
		gater: null
	},
	{
		from: 107,
		to: 369,
		weight: -0.0017319007727540914,
		gater: null
	},
	{
		from: 107,
		to: 370,
		weight: -0.07703206802232097,
		gater: null
	},
	{
		from: 107,
		to: 371,
		weight: -0.02142958020448696,
		gater: null
	},
	{
		from: 107,
		to: 372,
		weight: 0.05951055184937423,
		gater: null
	},
	{
		from: 107,
		to: 373,
		weight: -0.09772829237518166,
		gater: null
	},
	{
		from: 107,
		to: 374,
		weight: 0.016784134688134514,
		gater: null
	},
	{
		from: 107,
		to: 375,
		weight: -0.08034743186260114,
		gater: null
	},
	{
		from: 107,
		to: 376,
		weight: -0.0164297127182607,
		gater: null
	},
	{
		from: 107,
		to: 377,
		weight: -0.013080268051885918,
		gater: null
	},
	{
		from: 107,
		to: 378,
		weight: -0.05762897343686544,
		gater: null
	},
	{
		from: 107,
		to: 379,
		weight: 0.042836473645503886,
		gater: null
	},
	{
		from: 108,
		to: 360,
		weight: 0.09368277688192239,
		gater: null
	},
	{
		from: 108,
		to: 361,
		weight: 0.052382152789337555,
		gater: null
	},
	{
		from: 108,
		to: 362,
		weight: 0.013885247664081612,
		gater: null
	},
	{
		from: 108,
		to: 363,
		weight: 0.04295942649244147,
		gater: null
	},
	{
		from: 108,
		to: 364,
		weight: 0.0002144382013725965,
		gater: null
	},
	{
		from: 108,
		to: 365,
		weight: -0.010242955343669327,
		gater: null
	},
	{
		from: 108,
		to: 366,
		weight: -0.017826043781709572,
		gater: null
	},
	{
		from: 108,
		to: 367,
		weight: -0.007264744599786654,
		gater: null
	},
	{
		from: 108,
		to: 368,
		weight: -0.022717724102987447,
		gater: null
	},
	{
		from: 108,
		to: 369,
		weight: 0.0999806651248619,
		gater: null
	},
	{
		from: 108,
		to: 370,
		weight: -0.07500680788839148,
		gater: null
	},
	{
		from: 108,
		to: 371,
		weight: 0.09896490276136635,
		gater: null
	},
	{
		from: 108,
		to: 372,
		weight: 0.08121528579631929,
		gater: null
	},
	{
		from: 108,
		to: 373,
		weight: 0.0661742707758183,
		gater: null
	},
	{
		from: 108,
		to: 374,
		weight: 0.05344067502074715,
		gater: null
	},
	{
		from: 108,
		to: 375,
		weight: 0.026208420371108154,
		gater: null
	},
	{
		from: 108,
		to: 376,
		weight: -0.09121652118956863,
		gater: null
	},
	{
		from: 108,
		to: 377,
		weight: 0.04953088358771071,
		gater: null
	},
	{
		from: 108,
		to: 378,
		weight: 0.08896744917233682,
		gater: null
	},
	{
		from: 108,
		to: 379,
		weight: 0.01536793396283978,
		gater: null
	},
	{
		from: 109,
		to: 360,
		weight: -0.07286666653657892,
		gater: null
	},
	{
		from: 109,
		to: 361,
		weight: 0.08114553463454213,
		gater: null
	},
	{
		from: 109,
		to: 362,
		weight: 0.0685444605149916,
		gater: null
	},
	{
		from: 109,
		to: 363,
		weight: -0.05218382169874092,
		gater: null
	},
	{
		from: 109,
		to: 364,
		weight: -0.03281247490078175,
		gater: null
	},
	{
		from: 109,
		to: 365,
		weight: -0.08211820055186583,
		gater: null
	},
	{
		from: 109,
		to: 366,
		weight: -0.01215781749816687,
		gater: null
	},
	{
		from: 109,
		to: 367,
		weight: -0.0541588517023047,
		gater: null
	},
	{
		from: 109,
		to: 368,
		weight: 0.04679193648624094,
		gater: null
	},
	{
		from: 109,
		to: 369,
		weight: -0.033569570459633005,
		gater: null
	},
	{
		from: 109,
		to: 370,
		weight: -0.028473870891633404,
		gater: null
	},
	{
		from: 109,
		to: 371,
		weight: -0.04227173995371687,
		gater: null
	},
	{
		from: 109,
		to: 372,
		weight: 0.03550438269860062,
		gater: null
	},
	{
		from: 109,
		to: 373,
		weight: -0.014795635434570992,
		gater: null
	},
	{
		from: 109,
		to: 374,
		weight: 0.05144205053239623,
		gater: null
	},
	{
		from: 109,
		to: 375,
		weight: 0.04188869344064189,
		gater: null
	},
	{
		from: 109,
		to: 376,
		weight: 0.09375906089231642,
		gater: null
	},
	{
		from: 109,
		to: 377,
		weight: 0.0432990900924172,
		gater: null
	},
	{
		from: 109,
		to: 378,
		weight: -0.05097495296885866,
		gater: null
	},
	{
		from: 109,
		to: 379,
		weight: -0.059972671715820484,
		gater: null
	},
	{
		from: 110,
		to: 360,
		weight: 0.0990885027707896,
		gater: null
	},
	{
		from: 110,
		to: 361,
		weight: -0.049747979194736926,
		gater: null
	},
	{
		from: 110,
		to: 362,
		weight: 0.032000221869301626,
		gater: null
	},
	{
		from: 110,
		to: 363,
		weight: 0.053455241625347844,
		gater: null
	},
	{
		from: 110,
		to: 364,
		weight: 0.020013892787397403,
		gater: null
	},
	{
		from: 110,
		to: 365,
		weight: 0.060623955266489976,
		gater: null
	},
	{
		from: 110,
		to: 366,
		weight: -0.07606822038018489,
		gater: null
	},
	{
		from: 110,
		to: 367,
		weight: -0.05232835241268257,
		gater: null
	},
	{
		from: 110,
		to: 368,
		weight: -0.04024579738658383,
		gater: null
	},
	{
		from: 110,
		to: 369,
		weight: -0.02385537204898358,
		gater: null
	},
	{
		from: 110,
		to: 370,
		weight: 0.045030751867842944,
		gater: null
	},
	{
		from: 110,
		to: 371,
		weight: -0.017488290608671214,
		gater: null
	},
	{
		from: 110,
		to: 372,
		weight: 0.015461262774305956,
		gater: null
	},
	{
		from: 110,
		to: 373,
		weight: -0.07030358268352753,
		gater: null
	},
	{
		from: 110,
		to: 374,
		weight: -0.044453399659266424,
		gater: null
	},
	{
		from: 110,
		to: 375,
		weight: 0.04603530404765538,
		gater: null
	},
	{
		from: 110,
		to: 376,
		weight: 0.0060177788425791745,
		gater: null
	},
	{
		from: 110,
		to: 377,
		weight: -0.0012445635920942666,
		gater: null
	},
	{
		from: 110,
		to: 378,
		weight: 0.03308532919583493,
		gater: null
	},
	{
		from: 110,
		to: 379,
		weight: -0.04503784091757024,
		gater: null
	},
	{
		from: 111,
		to: 360,
		weight: 0.08393211821404442,
		gater: null
	},
	{
		from: 111,
		to: 361,
		weight: 0.0475981704522522,
		gater: null
	},
	{
		from: 111,
		to: 362,
		weight: 0.006414084754967672,
		gater: null
	},
	{
		from: 111,
		to: 363,
		weight: 0.06940119229978672,
		gater: null
	},
	{
		from: 111,
		to: 364,
		weight: 0.07451565604793631,
		gater: null
	},
	{
		from: 111,
		to: 365,
		weight: -0.08109324723192556,
		gater: null
	},
	{
		from: 111,
		to: 366,
		weight: -0.028179165963687594,
		gater: null
	},
	{
		from: 111,
		to: 367,
		weight: -0.07958486442788044,
		gater: null
	},
	{
		from: 111,
		to: 368,
		weight: 0.010671757583767635,
		gater: null
	},
	{
		from: 111,
		to: 369,
		weight: -0.0761943642145818,
		gater: null
	},
	{
		from: 111,
		to: 370,
		weight: 0.0995805402685328,
		gater: null
	},
	{
		from: 111,
		to: 371,
		weight: 0.01449394999690394,
		gater: null
	},
	{
		from: 111,
		to: 372,
		weight: -0.024134175594141855,
		gater: null
	},
	{
		from: 111,
		to: 373,
		weight: -0.0344035993160107,
		gater: null
	},
	{
		from: 111,
		to: 374,
		weight: 0.04697743676521887,
		gater: null
	},
	{
		from: 111,
		to: 375,
		weight: 0.08603354561485627,
		gater: null
	},
	{
		from: 111,
		to: 376,
		weight: -0.09017009435071635,
		gater: null
	},
	{
		from: 111,
		to: 377,
		weight: -0.0356709174906297,
		gater: null
	},
	{
		from: 111,
		to: 378,
		weight: -0.07615847678131096,
		gater: null
	},
	{
		from: 111,
		to: 379,
		weight: 0.05901150725932097,
		gater: null
	},
	{
		from: 112,
		to: 360,
		weight: -0.06316663261724087,
		gater: null
	},
	{
		from: 112,
		to: 361,
		weight: -0.05530150469960087,
		gater: null
	},
	{
		from: 112,
		to: 362,
		weight: 0.04239419362754537,
		gater: null
	},
	{
		from: 112,
		to: 363,
		weight: 0.09851802621465602,
		gater: null
	},
	{
		from: 112,
		to: 364,
		weight: 0.06287902143410548,
		gater: null
	},
	{
		from: 112,
		to: 365,
		weight: -0.010687932214969373,
		gater: null
	},
	{
		from: 112,
		to: 366,
		weight: -0.015475433121135612,
		gater: null
	},
	{
		from: 112,
		to: 367,
		weight: -0.061624090972119384,
		gater: null
	},
	{
		from: 112,
		to: 368,
		weight: -0.09286039226050957,
		gater: null
	},
	{
		from: 112,
		to: 369,
		weight: 0.08262126584164764,
		gater: null
	},
	{
		from: 112,
		to: 370,
		weight: 0.08300471387665298,
		gater: null
	},
	{
		from: 112,
		to: 371,
		weight: 0.03930836207126295,
		gater: null
	},
	{
		from: 112,
		to: 372,
		weight: -0.07880279259461163,
		gater: null
	},
	{
		from: 112,
		to: 373,
		weight: 0.038180989895399225,
		gater: null
	},
	{
		from: 112,
		to: 374,
		weight: -0.0744775900117754,
		gater: null
	},
	{
		from: 112,
		to: 375,
		weight: -0.07263525629107193,
		gater: null
	},
	{
		from: 112,
		to: 376,
		weight: 0.05215871937452571,
		gater: null
	},
	{
		from: 112,
		to: 377,
		weight: 0.08355780215742636,
		gater: null
	},
	{
		from: 112,
		to: 378,
		weight: -0.0027706933819771074,
		gater: null
	},
	{
		from: 112,
		to: 379,
		weight: -0.014457872545351469,
		gater: null
	},
	{
		from: 113,
		to: 360,
		weight: 0.01881504321158997,
		gater: null
	},
	{
		from: 113,
		to: 361,
		weight: -0.05486767449373669,
		gater: null
	},
	{
		from: 113,
		to: 362,
		weight: -0.08850167805493299,
		gater: null
	},
	{
		from: 113,
		to: 363,
		weight: -0.0069870621308223,
		gater: null
	},
	{
		from: 113,
		to: 364,
		weight: 0.031602305102361894,
		gater: null
	},
	{
		from: 113,
		to: 365,
		weight: -0.07034933919850364,
		gater: null
	},
	{
		from: 113,
		to: 366,
		weight: -0.08569330018059557,
		gater: null
	},
	{
		from: 113,
		to: 367,
		weight: -0.0767874315966949,
		gater: null
	},
	{
		from: 113,
		to: 368,
		weight: -0.06798780862532441,
		gater: null
	},
	{
		from: 113,
		to: 369,
		weight: -0.07994897181601478,
		gater: null
	},
	{
		from: 113,
		to: 370,
		weight: -0.07902416514867681,
		gater: null
	},
	{
		from: 113,
		to: 371,
		weight: -0.07763149538284653,
		gater: null
	},
	{
		from: 113,
		to: 372,
		weight: -0.09411955100564812,
		gater: null
	},
	{
		from: 113,
		to: 373,
		weight: 0.03623610188241427,
		gater: null
	},
	{
		from: 113,
		to: 374,
		weight: -0.0128416933452387,
		gater: null
	},
	{
		from: 113,
		to: 375,
		weight: 0.047024512216847336,
		gater: null
	},
	{
		from: 113,
		to: 376,
		weight: 0.07523137189513748,
		gater: null
	},
	{
		from: 113,
		to: 377,
		weight: 0.0992655361915992,
		gater: null
	},
	{
		from: 113,
		to: 378,
		weight: -0.04317882501030974,
		gater: null
	},
	{
		from: 113,
		to: 379,
		weight: 0.024582894120816295,
		gater: null
	},
	{
		from: 114,
		to: 360,
		weight: 0.05546356588081877,
		gater: null
	},
	{
		from: 114,
		to: 361,
		weight: -0.06912977687041014,
		gater: null
	},
	{
		from: 114,
		to: 362,
		weight: -0.013899541579967686,
		gater: null
	},
	{
		from: 114,
		to: 363,
		weight: 0.04413863586770361,
		gater: null
	},
	{
		from: 114,
		to: 364,
		weight: 0.03889481114940754,
		gater: null
	},
	{
		from: 114,
		to: 365,
		weight: -0.0959662882495016,
		gater: null
	},
	{
		from: 114,
		to: 366,
		weight: 0.01609403291067721,
		gater: null
	},
	{
		from: 114,
		to: 367,
		weight: -0.026014806676084093,
		gater: null
	},
	{
		from: 114,
		to: 368,
		weight: -0.08492344684778136,
		gater: null
	},
	{
		from: 114,
		to: 369,
		weight: -0.09440399636215786,
		gater: null
	},
	{
		from: 114,
		to: 370,
		weight: 0.020039215921070053,
		gater: null
	},
	{
		from: 114,
		to: 371,
		weight: 0.061119037833471224,
		gater: null
	},
	{
		from: 114,
		to: 372,
		weight: -0.080897356726015,
		gater: null
	},
	{
		from: 114,
		to: 373,
		weight: -0.018354592442979184,
		gater: null
	},
	{
		from: 114,
		to: 374,
		weight: -0.07055141229543249,
		gater: null
	},
	{
		from: 114,
		to: 375,
		weight: -0.04628997547175478,
		gater: null
	},
	{
		from: 114,
		to: 376,
		weight: 0.014561594713292575,
		gater: null
	},
	{
		from: 114,
		to: 377,
		weight: 0.09845157086088863,
		gater: null
	},
	{
		from: 114,
		to: 378,
		weight: -0.036724969967810855,
		gater: null
	},
	{
		from: 114,
		to: 379,
		weight: 0.06960314424116759,
		gater: null
	},
	{
		from: 115,
		to: 360,
		weight: -0.0948117614176458,
		gater: null
	},
	{
		from: 115,
		to: 361,
		weight: -0.031471803238399154,
		gater: null
	},
	{
		from: 115,
		to: 362,
		weight: 0.0833585406568704,
		gater: null
	},
	{
		from: 115,
		to: 363,
		weight: -0.097872577054902,
		gater: null
	},
	{
		from: 115,
		to: 364,
		weight: 0.06911168706621496,
		gater: null
	},
	{
		from: 115,
		to: 365,
		weight: 0.015115752023898393,
		gater: null
	},
	{
		from: 115,
		to: 366,
		weight: 0.0804099962058234,
		gater: null
	},
	{
		from: 115,
		to: 367,
		weight: -0.09686902647253676,
		gater: null
	},
	{
		from: 115,
		to: 368,
		weight: -0.07305340762953545,
		gater: null
	},
	{
		from: 115,
		to: 369,
		weight: 0.09214899312382838,
		gater: null
	},
	{
		from: 115,
		to: 370,
		weight: -0.014524280781110649,
		gater: null
	},
	{
		from: 115,
		to: 371,
		weight: -0.07409141589616697,
		gater: null
	},
	{
		from: 115,
		to: 372,
		weight: 0.0753026028354559,
		gater: null
	},
	{
		from: 115,
		to: 373,
		weight: -0.05603212641412317,
		gater: null
	},
	{
		from: 115,
		to: 374,
		weight: 0.07911685855256786,
		gater: null
	},
	{
		from: 115,
		to: 375,
		weight: -0.07034789734068535,
		gater: null
	},
	{
		from: 115,
		to: 376,
		weight: 0.09470414129196311,
		gater: null
	},
	{
		from: 115,
		to: 377,
		weight: 0.09975209696246487,
		gater: null
	},
	{
		from: 115,
		to: 378,
		weight: -0.034085591077268385,
		gater: null
	},
	{
		from: 115,
		to: 379,
		weight: 0.08605214239072678,
		gater: null
	},
	{
		from: 116,
		to: 360,
		weight: -0.05448753564708091,
		gater: null
	},
	{
		from: 116,
		to: 361,
		weight: -0.007587071811635454,
		gater: null
	},
	{
		from: 116,
		to: 362,
		weight: -0.00338659882434178,
		gater: null
	},
	{
		from: 116,
		to: 363,
		weight: 0.03444996771070338,
		gater: null
	},
	{
		from: 116,
		to: 364,
		weight: -0.061484122349132656,
		gater: null
	},
	{
		from: 116,
		to: 365,
		weight: 0.0012391574937116179,
		gater: null
	},
	{
		from: 116,
		to: 366,
		weight: 0.019718306546101877,
		gater: null
	},
	{
		from: 116,
		to: 367,
		weight: 0.07433561804391534,
		gater: null
	},
	{
		from: 116,
		to: 368,
		weight: 0.0948421020386212,
		gater: null
	},
	{
		from: 116,
		to: 369,
		weight: 0.06524632504795055,
		gater: null
	},
	{
		from: 116,
		to: 370,
		weight: 0.05661504677436882,
		gater: null
	},
	{
		from: 116,
		to: 371,
		weight: 0.06622243187543661,
		gater: null
	},
	{
		from: 116,
		to: 372,
		weight: 0.07511024895604007,
		gater: null
	},
	{
		from: 116,
		to: 373,
		weight: -0.007221214919415658,
		gater: null
	},
	{
		from: 116,
		to: 374,
		weight: 0.028800643695884753,
		gater: null
	},
	{
		from: 116,
		to: 375,
		weight: 0.04122818805616904,
		gater: null
	},
	{
		from: 116,
		to: 376,
		weight: 0.08540191977315534,
		gater: null
	},
	{
		from: 116,
		to: 377,
		weight: 0.006046594885647849,
		gater: null
	},
	{
		from: 116,
		to: 378,
		weight: 0.053299669019783336,
		gater: null
	},
	{
		from: 116,
		to: 379,
		weight: -0.023491398902382207,
		gater: null
	},
	{
		from: 117,
		to: 360,
		weight: -0.035704188132596126,
		gater: null
	},
	{
		from: 117,
		to: 361,
		weight: 0.04861294561908419,
		gater: null
	},
	{
		from: 117,
		to: 362,
		weight: 0.012557057296790658,
		gater: null
	},
	{
		from: 117,
		to: 363,
		weight: -0.08151730845330173,
		gater: null
	},
	{
		from: 117,
		to: 364,
		weight: 0.00037582213596816516,
		gater: null
	},
	{
		from: 117,
		to: 365,
		weight: 0.039885180303570966,
		gater: null
	},
	{
		from: 117,
		to: 366,
		weight: 0.017220750754006614,
		gater: null
	},
	{
		from: 117,
		to: 367,
		weight: -0.04139465488776324,
		gater: null
	},
	{
		from: 117,
		to: 368,
		weight: -0.01788952439558078,
		gater: null
	},
	{
		from: 117,
		to: 369,
		weight: -0.06398703871408365,
		gater: null
	},
	{
		from: 117,
		to: 370,
		weight: -0.005881387936894411,
		gater: null
	},
	{
		from: 117,
		to: 371,
		weight: 0.04463051578467364,
		gater: null
	},
	{
		from: 117,
		to: 372,
		weight: 0.04771591331458319,
		gater: null
	},
	{
		from: 117,
		to: 373,
		weight: 0.09847745926963644,
		gater: null
	},
	{
		from: 117,
		to: 374,
		weight: -0.04736478300476073,
		gater: null
	},
	{
		from: 117,
		to: 375,
		weight: -0.05088040874800566,
		gater: null
	},
	{
		from: 117,
		to: 376,
		weight: 0.04406449252720193,
		gater: null
	},
	{
		from: 117,
		to: 377,
		weight: -0.08937469763180124,
		gater: null
	},
	{
		from: 117,
		to: 378,
		weight: -0.0025747606260517752,
		gater: null
	},
	{
		from: 117,
		to: 379,
		weight: 0.0811378365972654,
		gater: null
	},
	{
		from: 118,
		to: 360,
		weight: 0.03889355168189326,
		gater: null
	},
	{
		from: 118,
		to: 361,
		weight: 0.07942428892525247,
		gater: null
	},
	{
		from: 118,
		to: 362,
		weight: -0.013436014129781876,
		gater: null
	},
	{
		from: 118,
		to: 363,
		weight: 0.023578407116109062,
		gater: null
	},
	{
		from: 118,
		to: 364,
		weight: -0.07697267345854267,
		gater: null
	},
	{
		from: 118,
		to: 365,
		weight: -0.07569607169417353,
		gater: null
	},
	{
		from: 118,
		to: 366,
		weight: 0.09960284330116767,
		gater: null
	},
	{
		from: 118,
		to: 367,
		weight: 0.013522251620710038,
		gater: null
	},
	{
		from: 118,
		to: 368,
		weight: 0.01975402819881658,
		gater: null
	},
	{
		from: 118,
		to: 369,
		weight: 0.07147576406527131,
		gater: null
	},
	{
		from: 118,
		to: 370,
		weight: -0.04813339704703865,
		gater: null
	},
	{
		from: 118,
		to: 371,
		weight: 0.06673160949954746,
		gater: null
	},
	{
		from: 118,
		to: 372,
		weight: -0.019889427556523426,
		gater: null
	},
	{
		from: 118,
		to: 373,
		weight: 0.04969639622650268,
		gater: null
	},
	{
		from: 118,
		to: 374,
		weight: -0.02540142617547403,
		gater: null
	},
	{
		from: 118,
		to: 375,
		weight: 0.004623385890181228,
		gater: null
	},
	{
		from: 118,
		to: 376,
		weight: -0.01210575899622808,
		gater: null
	},
	{
		from: 118,
		to: 377,
		weight: -0.09664046409566734,
		gater: null
	},
	{
		from: 118,
		to: 378,
		weight: -0.022031753096869305,
		gater: null
	},
	{
		from: 118,
		to: 379,
		weight: 0.08514961154813033,
		gater: null
	},
	{
		from: 119,
		to: 360,
		weight: 0.009855485687585569,
		gater: null
	},
	{
		from: 119,
		to: 361,
		weight: -0.07144836370249266,
		gater: null
	},
	{
		from: 119,
		to: 362,
		weight: 0.0646338708952385,
		gater: null
	},
	{
		from: 119,
		to: 363,
		weight: 0.06557711057971471,
		gater: null
	},
	{
		from: 119,
		to: 364,
		weight: -0.04714385868533788,
		gater: null
	},
	{
		from: 119,
		to: 365,
		weight: 0.02540776301095765,
		gater: null
	},
	{
		from: 119,
		to: 366,
		weight: -0.009986885132770545,
		gater: null
	},
	{
		from: 119,
		to: 367,
		weight: 0.06970019453455087,
		gater: null
	},
	{
		from: 119,
		to: 368,
		weight: -0.08487173155250956,
		gater: null
	},
	{
		from: 119,
		to: 369,
		weight: -0.09391765412708897,
		gater: null
	},
	{
		from: 119,
		to: 370,
		weight: -0.054285650676732994,
		gater: null
	},
	{
		from: 119,
		to: 371,
		weight: 0.08718811857429085,
		gater: null
	},
	{
		from: 119,
		to: 372,
		weight: 0.0183530358922845,
		gater: null
	},
	{
		from: 119,
		to: 373,
		weight: 0.03936972636418096,
		gater: null
	},
	{
		from: 119,
		to: 374,
		weight: 0.039321556933803764,
		gater: null
	},
	{
		from: 119,
		to: 375,
		weight: 0.07806942123179078,
		gater: null
	},
	{
		from: 119,
		to: 376,
		weight: 0.07649481427839697,
		gater: null
	},
	{
		from: 119,
		to: 377,
		weight: -0.03347207543315181,
		gater: null
	},
	{
		from: 119,
		to: 378,
		weight: 0.03185891605819924,
		gater: null
	},
	{
		from: 119,
		to: 379,
		weight: 0.03401376202877643,
		gater: null
	},
	{
		from: 120,
		to: 360,
		weight: 0.06317043492250218,
		gater: null
	},
	{
		from: 120,
		to: 361,
		weight: 0.034451785270943,
		gater: null
	},
	{
		from: 120,
		to: 362,
		weight: -0.051647839109712206,
		gater: null
	},
	{
		from: 120,
		to: 363,
		weight: -0.09189261103295406,
		gater: null
	},
	{
		from: 120,
		to: 364,
		weight: 0.06095540321027346,
		gater: null
	},
	{
		from: 120,
		to: 365,
		weight: -0.09925782333136235,
		gater: null
	},
	{
		from: 120,
		to: 366,
		weight: -0.0011738133310030402,
		gater: null
	},
	{
		from: 120,
		to: 367,
		weight: -0.055347555816621034,
		gater: null
	},
	{
		from: 120,
		to: 368,
		weight: -0.0791490458222167,
		gater: null
	},
	{
		from: 120,
		to: 369,
		weight: -0.028089722264720243,
		gater: null
	},
	{
		from: 120,
		to: 370,
		weight: -0.02469011134120054,
		gater: null
	},
	{
		from: 120,
		to: 371,
		weight: -0.035874880834299905,
		gater: null
	},
	{
		from: 120,
		to: 372,
		weight: 0.08057181620914383,
		gater: null
	},
	{
		from: 120,
		to: 373,
		weight: 0.026162115320622625,
		gater: null
	},
	{
		from: 120,
		to: 374,
		weight: 0.018003126473668335,
		gater: null
	},
	{
		from: 120,
		to: 375,
		weight: 0.07170512432857726,
		gater: null
	},
	{
		from: 120,
		to: 376,
		weight: -0.07371294732338703,
		gater: null
	},
	{
		from: 120,
		to: 377,
		weight: 0.051667082333547804,
		gater: null
	},
	{
		from: 120,
		to: 378,
		weight: 0.06402583875272838,
		gater: null
	},
	{
		from: 120,
		to: 379,
		weight: -0.01522943025508261,
		gater: null
	},
	{
		from: 121,
		to: 360,
		weight: -0.019150231540481594,
		gater: null
	},
	{
		from: 121,
		to: 361,
		weight: -0.04264978075744752,
		gater: null
	},
	{
		from: 121,
		to: 362,
		weight: -0.09639298620792364,
		gater: null
	},
	{
		from: 121,
		to: 363,
		weight: -0.053567659519040016,
		gater: null
	},
	{
		from: 121,
		to: 364,
		weight: -0.08557479746128815,
		gater: null
	},
	{
		from: 121,
		to: 365,
		weight: -0.08960659754314726,
		gater: null
	},
	{
		from: 121,
		to: 366,
		weight: 0.013202131310766863,
		gater: null
	},
	{
		from: 121,
		to: 367,
		weight: 0.04128799284638282,
		gater: null
	},
	{
		from: 121,
		to: 368,
		weight: 0.013244090749558568,
		gater: null
	},
	{
		from: 121,
		to: 369,
		weight: 0.04214237018940872,
		gater: null
	},
	{
		from: 121,
		to: 370,
		weight: 0.009948972553907656,
		gater: null
	},
	{
		from: 121,
		to: 371,
		weight: -0.021206699815250557,
		gater: null
	},
	{
		from: 121,
		to: 372,
		weight: 0.04279317526727869,
		gater: null
	},
	{
		from: 121,
		to: 373,
		weight: -0.032560991180451374,
		gater: null
	},
	{
		from: 121,
		to: 374,
		weight: -0.06523469528034248,
		gater: null
	},
	{
		from: 121,
		to: 375,
		weight: 0.026938240990706908,
		gater: null
	},
	{
		from: 121,
		to: 376,
		weight: -0.07105058281347053,
		gater: null
	},
	{
		from: 121,
		to: 377,
		weight: 0.06319947641518159,
		gater: null
	},
	{
		from: 121,
		to: 378,
		weight: 0.09573410065517765,
		gater: null
	},
	{
		from: 121,
		to: 379,
		weight: -0.07527158316172691,
		gater: null
	},
	{
		from: 122,
		to: 360,
		weight: -0.02603018209019932,
		gater: null
	},
	{
		from: 122,
		to: 361,
		weight: -0.02483713327848376,
		gater: null
	},
	{
		from: 122,
		to: 362,
		weight: 0.07965440951253844,
		gater: null
	},
	{
		from: 122,
		to: 363,
		weight: -0.08404508673519145,
		gater: null
	},
	{
		from: 122,
		to: 364,
		weight: -0.0583991966762111,
		gater: null
	},
	{
		from: 122,
		to: 365,
		weight: -0.05965978056444557,
		gater: null
	},
	{
		from: 122,
		to: 366,
		weight: 0.05998639648928822,
		gater: null
	},
	{
		from: 122,
		to: 367,
		weight: -0.09738939911735063,
		gater: null
	},
	{
		from: 122,
		to: 368,
		weight: 0.059522568116386426,
		gater: null
	},
	{
		from: 122,
		to: 369,
		weight: 0.08646381241836912,
		gater: null
	},
	{
		from: 122,
		to: 370,
		weight: -0.029174930583967293,
		gater: null
	},
	{
		from: 122,
		to: 371,
		weight: 0.0026483796074954213,
		gater: null
	},
	{
		from: 122,
		to: 372,
		weight: -0.021600825605514865,
		gater: null
	},
	{
		from: 122,
		to: 373,
		weight: 0.061278949040460745,
		gater: null
	},
	{
		from: 122,
		to: 374,
		weight: 0.09049743543386649,
		gater: null
	},
	{
		from: 122,
		to: 375,
		weight: -0.0012260590246409853,
		gater: null
	},
	{
		from: 122,
		to: 376,
		weight: -0.06899739751174323,
		gater: null
	},
	{
		from: 122,
		to: 377,
		weight: 0.09937470779214119,
		gater: null
	},
	{
		from: 122,
		to: 378,
		weight: 0.0130474870538944,
		gater: null
	},
	{
		from: 122,
		to: 379,
		weight: 0.017057009617957114,
		gater: null
	},
	{
		from: 123,
		to: 360,
		weight: 0.09283148758157017,
		gater: null
	},
	{
		from: 123,
		to: 361,
		weight: -0.014515067671723308,
		gater: null
	},
	{
		from: 123,
		to: 362,
		weight: -0.0402937789007066,
		gater: null
	},
	{
		from: 123,
		to: 363,
		weight: -0.09901043445107433,
		gater: null
	},
	{
		from: 123,
		to: 364,
		weight: -0.04982491892896843,
		gater: null
	},
	{
		from: 123,
		to: 365,
		weight: -0.010619811963561432,
		gater: null
	},
	{
		from: 123,
		to: 366,
		weight: 0.03280466592068382,
		gater: null
	},
	{
		from: 123,
		to: 367,
		weight: 0.0052658007702609255,
		gater: null
	},
	{
		from: 123,
		to: 368,
		weight: 0.011847526842973674,
		gater: null
	},
	{
		from: 123,
		to: 369,
		weight: -0.09739511012040786,
		gater: null
	},
	{
		from: 123,
		to: 370,
		weight: 0.007214668125614623,
		gater: null
	},
	{
		from: 123,
		to: 371,
		weight: -0.018807261961786018,
		gater: null
	},
	{
		from: 123,
		to: 372,
		weight: 0.033284055525541895,
		gater: null
	},
	{
		from: 123,
		to: 373,
		weight: 0.007160998228954746,
		gater: null
	},
	{
		from: 123,
		to: 374,
		weight: 0.05700576123739293,
		gater: null
	},
	{
		from: 123,
		to: 375,
		weight: -0.07656808253517706,
		gater: null
	},
	{
		from: 123,
		to: 376,
		weight: 0.04203195305826407,
		gater: null
	},
	{
		from: 123,
		to: 377,
		weight: 0.013858867504021918,
		gater: null
	},
	{
		from: 123,
		to: 378,
		weight: -0.03133202754784624,
		gater: null
	},
	{
		from: 123,
		to: 379,
		weight: 0.01767988635331541,
		gater: null
	},
	{
		from: 124,
		to: 360,
		weight: 0.03741775281707352,
		gater: null
	},
	{
		from: 124,
		to: 361,
		weight: 0.0774938303720751,
		gater: null
	},
	{
		from: 124,
		to: 362,
		weight: 0.06163203965323902,
		gater: null
	},
	{
		from: 124,
		to: 363,
		weight: -0.036215679066274306,
		gater: null
	},
	{
		from: 124,
		to: 364,
		weight: -0.07884096928044833,
		gater: null
	},
	{
		from: 124,
		to: 365,
		weight: -0.09206189569710471,
		gater: null
	},
	{
		from: 124,
		to: 366,
		weight: -0.07911077299360102,
		gater: null
	},
	{
		from: 124,
		to: 367,
		weight: 0.008581339625317597,
		gater: null
	},
	{
		from: 124,
		to: 368,
		weight: -0.09214397455407708,
		gater: null
	},
	{
		from: 124,
		to: 369,
		weight: -0.04488465096482779,
		gater: null
	},
	{
		from: 124,
		to: 370,
		weight: 0.034556924244263765,
		gater: null
	},
	{
		from: 124,
		to: 371,
		weight: 0.09666470108453723,
		gater: null
	},
	{
		from: 124,
		to: 372,
		weight: -0.08152157744143512,
		gater: null
	},
	{
		from: 124,
		to: 373,
		weight: -0.023890310308190138,
		gater: null
	},
	{
		from: 124,
		to: 374,
		weight: 0.051789153239791524,
		gater: null
	},
	{
		from: 124,
		to: 375,
		weight: 0.013626344449464284,
		gater: null
	},
	{
		from: 124,
		to: 376,
		weight: -0.016538559824949006,
		gater: null
	},
	{
		from: 124,
		to: 377,
		weight: 0.01958666477990581,
		gater: null
	},
	{
		from: 124,
		to: 378,
		weight: -0.029494358844469923,
		gater: null
	},
	{
		from: 124,
		to: 379,
		weight: 0.05084741117719524,
		gater: null
	},
	{
		from: 125,
		to: 360,
		weight: -0.011520959100790318,
		gater: null
	},
	{
		from: 125,
		to: 361,
		weight: 0.061124325221947245,
		gater: null
	},
	{
		from: 125,
		to: 362,
		weight: -0.0055404929100781874,
		gater: null
	},
	{
		from: 125,
		to: 363,
		weight: 0.03184082477111935,
		gater: null
	},
	{
		from: 125,
		to: 364,
		weight: 0.09153385813179038,
		gater: null
	},
	{
		from: 125,
		to: 365,
		weight: -0.03799846174514099,
		gater: null
	},
	{
		from: 125,
		to: 366,
		weight: -0.003688284717985685,
		gater: null
	},
	{
		from: 125,
		to: 367,
		weight: 0.06125105289245544,
		gater: null
	},
	{
		from: 125,
		to: 368,
		weight: 0.05035754276624735,
		gater: null
	},
	{
		from: 125,
		to: 369,
		weight: -0.09419727553418925,
		gater: null
	},
	{
		from: 125,
		to: 370,
		weight: -0.056554914633828446,
		gater: null
	},
	{
		from: 125,
		to: 371,
		weight: 0.007957889890132602,
		gater: null
	},
	{
		from: 125,
		to: 372,
		weight: 0.09830418065698451,
		gater: null
	},
	{
		from: 125,
		to: 373,
		weight: 0.04620656285280561,
		gater: null
	},
	{
		from: 125,
		to: 374,
		weight: 0.09472244426855045,
		gater: null
	},
	{
		from: 125,
		to: 375,
		weight: -0.017804985173292515,
		gater: null
	},
	{
		from: 125,
		to: 376,
		weight: -0.09878522008496558,
		gater: null
	},
	{
		from: 125,
		to: 377,
		weight: 0.06705736622717148,
		gater: null
	},
	{
		from: 125,
		to: 378,
		weight: -0.086559146449782,
		gater: null
	},
	{
		from: 125,
		to: 379,
		weight: 0.027366366276414894,
		gater: null
	},
	{
		from: 126,
		to: 360,
		weight: -0.09095050191405396,
		gater: null
	},
	{
		from: 126,
		to: 361,
		weight: 0.030011492844503884,
		gater: null
	},
	{
		from: 126,
		to: 362,
		weight: -0.05607593370898663,
		gater: null
	},
	{
		from: 126,
		to: 363,
		weight: 0.07221199616007712,
		gater: null
	},
	{
		from: 126,
		to: 364,
		weight: -0.05551758775386509,
		gater: null
	},
	{
		from: 126,
		to: 365,
		weight: -0.0232797645006034,
		gater: null
	},
	{
		from: 126,
		to: 366,
		weight: -0.02830771991254802,
		gater: null
	},
	{
		from: 126,
		to: 367,
		weight: 0.08980877360158998,
		gater: null
	},
	{
		from: 126,
		to: 368,
		weight: 0.07329403805372525,
		gater: null
	},
	{
		from: 126,
		to: 369,
		weight: -0.01743470439363279,
		gater: null
	},
	{
		from: 126,
		to: 370,
		weight: 0.08696957560562613,
		gater: null
	},
	{
		from: 126,
		to: 371,
		weight: -0.02138107131478026,
		gater: null
	},
	{
		from: 126,
		to: 372,
		weight: -0.09043822017629966,
		gater: null
	},
	{
		from: 126,
		to: 373,
		weight: -0.0670650743493367,
		gater: null
	},
	{
		from: 126,
		to: 374,
		weight: 0.07963996768579748,
		gater: null
	},
	{
		from: 126,
		to: 375,
		weight: -0.02992204853184291,
		gater: null
	},
	{
		from: 126,
		to: 376,
		weight: -0.07426307671951604,
		gater: null
	},
	{
		from: 126,
		to: 377,
		weight: -0.020400365796133718,
		gater: null
	},
	{
		from: 126,
		to: 378,
		weight: 0.042346700200593446,
		gater: null
	},
	{
		from: 126,
		to: 379,
		weight: -0.06506279977147655,
		gater: null
	},
	{
		from: 127,
		to: 360,
		weight: 0.08835837641986899,
		gater: null
	},
	{
		from: 127,
		to: 361,
		weight: -0.009509690006523061,
		gater: null
	},
	{
		from: 127,
		to: 362,
		weight: 0.06682525608202297,
		gater: null
	},
	{
		from: 127,
		to: 363,
		weight: -0.010713579277943447,
		gater: null
	},
	{
		from: 127,
		to: 364,
		weight: -0.07503582234961836,
		gater: null
	},
	{
		from: 127,
		to: 365,
		weight: -0.05356491312147127,
		gater: null
	},
	{
		from: 127,
		to: 366,
		weight: -0.09000517869183772,
		gater: null
	},
	{
		from: 127,
		to: 367,
		weight: 0.019400579102435284,
		gater: null
	},
	{
		from: 127,
		to: 368,
		weight: 0.021050281600192247,
		gater: null
	},
	{
		from: 127,
		to: 369,
		weight: 0.0337665107589038,
		gater: null
	},
	{
		from: 127,
		to: 370,
		weight: 0.06099168703153232,
		gater: null
	},
	{
		from: 127,
		to: 371,
		weight: 0.039212478900962466,
		gater: null
	},
	{
		from: 127,
		to: 372,
		weight: 0.01457969396513037,
		gater: null
	},
	{
		from: 127,
		to: 373,
		weight: -0.05059687238359363,
		gater: null
	},
	{
		from: 127,
		to: 374,
		weight: -0.05934215886150116,
		gater: null
	},
	{
		from: 127,
		to: 375,
		weight: -0.09264237661806347,
		gater: null
	},
	{
		from: 127,
		to: 376,
		weight: -0.03372346158331184,
		gater: null
	},
	{
		from: 127,
		to: 377,
		weight: -0.022946215592607053,
		gater: null
	},
	{
		from: 127,
		to: 378,
		weight: -0.09422960286229297,
		gater: null
	},
	{
		from: 127,
		to: 379,
		weight: -0.03814064790052876,
		gater: null
	},
	{
		from: 128,
		to: 360,
		weight: -0.05402873917791258,
		gater: null
	},
	{
		from: 128,
		to: 361,
		weight: -0.07897283257842691,
		gater: null
	},
	{
		from: 128,
		to: 362,
		weight: 0.05023712855116913,
		gater: null
	},
	{
		from: 128,
		to: 363,
		weight: 0.06492518933873415,
		gater: null
	},
	{
		from: 128,
		to: 364,
		weight: -0.009627434756845285,
		gater: null
	},
	{
		from: 128,
		to: 365,
		weight: -0.052486333233824616,
		gater: null
	},
	{
		from: 128,
		to: 366,
		weight: -0.031170191094553032,
		gater: null
	},
	{
		from: 128,
		to: 367,
		weight: 0.022798740747286134,
		gater: null
	},
	{
		from: 128,
		to: 368,
		weight: -0.09475119739938981,
		gater: null
	},
	{
		from: 128,
		to: 369,
		weight: -0.06938857399446335,
		gater: null
	},
	{
		from: 128,
		to: 370,
		weight: -0.007156815069544464,
		gater: null
	},
	{
		from: 128,
		to: 371,
		weight: -0.0715544627891064,
		gater: null
	},
	{
		from: 128,
		to: 372,
		weight: 0.039915514002672486,
		gater: null
	},
	{
		from: 128,
		to: 373,
		weight: -0.06402298125372635,
		gater: null
	},
	{
		from: 128,
		to: 374,
		weight: -0.06143782778040885,
		gater: null
	},
	{
		from: 128,
		to: 375,
		weight: 0.02114020664628566,
		gater: null
	},
	{
		from: 128,
		to: 376,
		weight: -0.025676129986498625,
		gater: null
	},
	{
		from: 128,
		to: 377,
		weight: -0.09251281087483854,
		gater: null
	},
	{
		from: 128,
		to: 378,
		weight: 0.07693908789225565,
		gater: null
	},
	{
		from: 128,
		to: 379,
		weight: -0.04793692553665294,
		gater: null
	},
	{
		from: 129,
		to: 360,
		weight: -0.021110678153601237,
		gater: null
	},
	{
		from: 129,
		to: 361,
		weight: -0.09665956206557956,
		gater: null
	},
	{
		from: 129,
		to: 362,
		weight: -0.09598976630027836,
		gater: null
	},
	{
		from: 129,
		to: 363,
		weight: -0.05757525634601923,
		gater: null
	},
	{
		from: 129,
		to: 364,
		weight: -0.0867066944860182,
		gater: null
	},
	{
		from: 129,
		to: 365,
		weight: 0.03199005308494579,
		gater: null
	},
	{
		from: 129,
		to: 366,
		weight: -0.045754955575787015,
		gater: null
	},
	{
		from: 129,
		to: 367,
		weight: 0.05377695317959438,
		gater: null
	},
	{
		from: 129,
		to: 368,
		weight: -0.04031286989175778,
		gater: null
	},
	{
		from: 129,
		to: 369,
		weight: -0.08274961522526612,
		gater: null
	},
	{
		from: 129,
		to: 370,
		weight: -0.0920316038581507,
		gater: null
	},
	{
		from: 129,
		to: 371,
		weight: -0.013804280600031762,
		gater: null
	},
	{
		from: 129,
		to: 372,
		weight: 0.0646891819751581,
		gater: null
	},
	{
		from: 129,
		to: 373,
		weight: -0.08890528922971437,
		gater: null
	},
	{
		from: 129,
		to: 374,
		weight: -0.05542650250786907,
		gater: null
	},
	{
		from: 129,
		to: 375,
		weight: -0.0884851795563514,
		gater: null
	},
	{
		from: 129,
		to: 376,
		weight: 0.014416991347542443,
		gater: null
	},
	{
		from: 129,
		to: 377,
		weight: 0.006338524774539028,
		gater: null
	},
	{
		from: 129,
		to: 378,
		weight: -0.028449061222762848,
		gater: null
	},
	{
		from: 129,
		to: 379,
		weight: 0.056728266794857624,
		gater: null
	},
	{
		from: 130,
		to: 360,
		weight: -0.06553714915431624,
		gater: null
	},
	{
		from: 130,
		to: 361,
		weight: -0.05979326287085503,
		gater: null
	},
	{
		from: 130,
		to: 362,
		weight: 0.04560405471421619,
		gater: null
	},
	{
		from: 130,
		to: 363,
		weight: -0.016067669669996357,
		gater: null
	},
	{
		from: 130,
		to: 364,
		weight: -0.041372266192133855,
		gater: null
	},
	{
		from: 130,
		to: 365,
		weight: 0.031165894367019276,
		gater: null
	},
	{
		from: 130,
		to: 366,
		weight: 0.019633966894755828,
		gater: null
	},
	{
		from: 130,
		to: 367,
		weight: 0.042579625138374155,
		gater: null
	},
	{
		from: 130,
		to: 368,
		weight: 0.09137290995222816,
		gater: null
	},
	{
		from: 130,
		to: 369,
		weight: -0.043042351097135306,
		gater: null
	},
	{
		from: 130,
		to: 370,
		weight: -0.09119303782450468,
		gater: null
	},
	{
		from: 130,
		to: 371,
		weight: -0.09720509475583419,
		gater: null
	},
	{
		from: 130,
		to: 372,
		weight: 0.047623736365546454,
		gater: null
	},
	{
		from: 130,
		to: 373,
		weight: 0.08624118094129371,
		gater: null
	},
	{
		from: 130,
		to: 374,
		weight: -0.015562325542906041,
		gater: null
	},
	{
		from: 130,
		to: 375,
		weight: 0.048060172692825504,
		gater: null
	},
	{
		from: 130,
		to: 376,
		weight: -0.049949215608738176,
		gater: null
	},
	{
		from: 130,
		to: 377,
		weight: 0.026990624890331827,
		gater: null
	},
	{
		from: 130,
		to: 378,
		weight: 0.03549284249541493,
		gater: null
	},
	{
		from: 130,
		to: 379,
		weight: -0.05966131330215921,
		gater: null
	},
	{
		from: 131,
		to: 360,
		weight: 0.04070556667806313,
		gater: null
	},
	{
		from: 131,
		to: 361,
		weight: 0.021941236188000215,
		gater: null
	},
	{
		from: 131,
		to: 362,
		weight: 0.09974455770025298,
		gater: null
	},
	{
		from: 131,
		to: 363,
		weight: -0.03829111779775949,
		gater: null
	},
	{
		from: 131,
		to: 364,
		weight: -0.02348530678443979,
		gater: null
	},
	{
		from: 131,
		to: 365,
		weight: -0.010181322710471494,
		gater: null
	},
	{
		from: 131,
		to: 366,
		weight: 0.06322954295173511,
		gater: null
	},
	{
		from: 131,
		to: 367,
		weight: 0.0776414994693739,
		gater: null
	},
	{
		from: 131,
		to: 368,
		weight: 0.011028182995118957,
		gater: null
	},
	{
		from: 131,
		to: 369,
		weight: 0.028092812381377008,
		gater: null
	},
	{
		from: 131,
		to: 370,
		weight: 0.05924692311472332,
		gater: null
	},
	{
		from: 131,
		to: 371,
		weight: -0.06972909066684921,
		gater: null
	},
	{
		from: 131,
		to: 372,
		weight: -0.0819878632324441,
		gater: null
	},
	{
		from: 131,
		to: 373,
		weight: 0.01586803477985295,
		gater: null
	},
	{
		from: 131,
		to: 374,
		weight: -0.036728839984979986,
		gater: null
	},
	{
		from: 131,
		to: 375,
		weight: 0.0882179183209876,
		gater: null
	},
	{
		from: 131,
		to: 376,
		weight: 0.040282626700438,
		gater: null
	},
	{
		from: 131,
		to: 377,
		weight: -0.07721880595453717,
		gater: null
	},
	{
		from: 131,
		to: 378,
		weight: -0.05463912965722977,
		gater: null
	},
	{
		from: 131,
		to: 379,
		weight: 0.0841132654607181,
		gater: null
	},
	{
		from: 132,
		to: 360,
		weight: -0.024447460501983584,
		gater: null
	},
	{
		from: 132,
		to: 361,
		weight: 0.0841272230459083,
		gater: null
	},
	{
		from: 132,
		to: 362,
		weight: -0.08187746214007588,
		gater: null
	},
	{
		from: 132,
		to: 363,
		weight: 0.03603497802380157,
		gater: null
	},
	{
		from: 132,
		to: 364,
		weight: 0.031212575058140624,
		gater: null
	},
	{
		from: 132,
		to: 365,
		weight: -0.06673080484900673,
		gater: null
	},
	{
		from: 132,
		to: 366,
		weight: 0.07831805048223664,
		gater: null
	},
	{
		from: 132,
		to: 367,
		weight: 0.05397587290146197,
		gater: null
	},
	{
		from: 132,
		to: 368,
		weight: 0.07430531984624006,
		gater: null
	},
	{
		from: 132,
		to: 369,
		weight: -0.02406209058471856,
		gater: null
	},
	{
		from: 132,
		to: 370,
		weight: 0.06586850731810409,
		gater: null
	},
	{
		from: 132,
		to: 371,
		weight: -0.0031610023176863733,
		gater: null
	},
	{
		from: 132,
		to: 372,
		weight: 0.03596696840327335,
		gater: null
	},
	{
		from: 132,
		to: 373,
		weight: 0.07867232104662444,
		gater: null
	},
	{
		from: 132,
		to: 374,
		weight: 0.048227393441157757,
		gater: null
	},
	{
		from: 132,
		to: 375,
		weight: 0.01683743784401126,
		gater: null
	},
	{
		from: 132,
		to: 376,
		weight: 0.0783575974129902,
		gater: null
	},
	{
		from: 132,
		to: 377,
		weight: -0.09595548898182643,
		gater: null
	},
	{
		from: 132,
		to: 378,
		weight: -0.007092667320063889,
		gater: null
	},
	{
		from: 132,
		to: 379,
		weight: -0.09551857530262252,
		gater: null
	},
	{
		from: 133,
		to: 360,
		weight: 0.0060089370440210566,
		gater: null
	},
	{
		from: 133,
		to: 361,
		weight: 0.0301102381550708,
		gater: null
	},
	{
		from: 133,
		to: 362,
		weight: -0.07402713278237516,
		gater: null
	},
	{
		from: 133,
		to: 363,
		weight: 0.004867123811476318,
		gater: null
	},
	{
		from: 133,
		to: 364,
		weight: 0.04517261159223285,
		gater: null
	},
	{
		from: 133,
		to: 365,
		weight: 0.0199100823992667,
		gater: null
	},
	{
		from: 133,
		to: 366,
		weight: -0.018629418853249785,
		gater: null
	},
	{
		from: 133,
		to: 367,
		weight: -0.09972500643001109,
		gater: null
	},
	{
		from: 133,
		to: 368,
		weight: -0.026791852830132662,
		gater: null
	},
	{
		from: 133,
		to: 369,
		weight: -0.014674302008225573,
		gater: null
	},
	{
		from: 133,
		to: 370,
		weight: 0.0703296726705736,
		gater: null
	},
	{
		from: 133,
		to: 371,
		weight: -0.01874520827921597,
		gater: null
	},
	{
		from: 133,
		to: 372,
		weight: -0.055731281111909906,
		gater: null
	},
	{
		from: 133,
		to: 373,
		weight: -0.06647851284110887,
		gater: null
	},
	{
		from: 133,
		to: 374,
		weight: 0.026910410590574585,
		gater: null
	},
	{
		from: 133,
		to: 375,
		weight: 0.017544093631895838,
		gater: null
	},
	{
		from: 133,
		to: 376,
		weight: 0.05147333223202907,
		gater: null
	},
	{
		from: 133,
		to: 377,
		weight: 0.005885199393696583,
		gater: null
	},
	{
		from: 133,
		to: 378,
		weight: -0.022485247533941696,
		gater: null
	},
	{
		from: 133,
		to: 379,
		weight: 0.006862243063722989,
		gater: null
	},
	{
		from: 134,
		to: 360,
		weight: 0.08282398589906276,
		gater: null
	},
	{
		from: 134,
		to: 361,
		weight: -0.00713549004111616,
		gater: null
	},
	{
		from: 134,
		to: 362,
		weight: 0.07987844019195744,
		gater: null
	},
	{
		from: 134,
		to: 363,
		weight: -0.052490250887408996,
		gater: null
	},
	{
		from: 134,
		to: 364,
		weight: -0.04444007763764031,
		gater: null
	},
	{
		from: 134,
		to: 365,
		weight: -0.09598727337929241,
		gater: null
	},
	{
		from: 134,
		to: 366,
		weight: -0.02942101089247133,
		gater: null
	},
	{
		from: 134,
		to: 367,
		weight: 0.018961411731371586,
		gater: null
	},
	{
		from: 134,
		to: 368,
		weight: 0.006626317316718172,
		gater: null
	},
	{
		from: 134,
		to: 369,
		weight: 0.053810008462588516,
		gater: null
	},
	{
		from: 134,
		to: 370,
		weight: 0.033794580219817266,
		gater: null
	},
	{
		from: 134,
		to: 371,
		weight: -0.015266457945545708,
		gater: null
	},
	{
		from: 134,
		to: 372,
		weight: 0.051964113042563514,
		gater: null
	},
	{
		from: 134,
		to: 373,
		weight: -0.019703672605964548,
		gater: null
	},
	{
		from: 134,
		to: 374,
		weight: -0.07282046107056442,
		gater: null
	},
	{
		from: 134,
		to: 375,
		weight: 0.05284560209511793,
		gater: null
	},
	{
		from: 134,
		to: 376,
		weight: -0.006068798364896905,
		gater: null
	},
	{
		from: 134,
		to: 377,
		weight: 0.07782072545239363,
		gater: null
	},
	{
		from: 134,
		to: 378,
		weight: 0.08429938546273022,
		gater: null
	},
	{
		from: 134,
		to: 379,
		weight: -0.015392172717711497,
		gater: null
	},
	{
		from: 135,
		to: 360,
		weight: 0.02222954330082194,
		gater: null
	},
	{
		from: 135,
		to: 361,
		weight: -0.025777505444112322,
		gater: null
	},
	{
		from: 135,
		to: 362,
		weight: -0.09315126631088605,
		gater: null
	},
	{
		from: 135,
		to: 363,
		weight: 0.07604374184150828,
		gater: null
	},
	{
		from: 135,
		to: 364,
		weight: -0.07884730725953149,
		gater: null
	},
	{
		from: 135,
		to: 365,
		weight: -0.06807984267062356,
		gater: null
	},
	{
		from: 135,
		to: 366,
		weight: -0.07964761198904405,
		gater: null
	},
	{
		from: 135,
		to: 367,
		weight: -0.03468943557454143,
		gater: null
	},
	{
		from: 135,
		to: 368,
		weight: -0.06191795712375173,
		gater: null
	},
	{
		from: 135,
		to: 369,
		weight: -0.016382874245371243,
		gater: null
	},
	{
		from: 135,
		to: 370,
		weight: 0.018763098020980168,
		gater: null
	},
	{
		from: 135,
		to: 371,
		weight: 0.07692817996735185,
		gater: null
	},
	{
		from: 135,
		to: 372,
		weight: -0.02864610684201417,
		gater: null
	},
	{
		from: 135,
		to: 373,
		weight: -0.02250730826144967,
		gater: null
	},
	{
		from: 135,
		to: 374,
		weight: -0.03779287843488426,
		gater: null
	},
	{
		from: 135,
		to: 375,
		weight: 0.08283970378928004,
		gater: null
	},
	{
		from: 135,
		to: 376,
		weight: 0.0677610339258625,
		gater: null
	},
	{
		from: 135,
		to: 377,
		weight: 0.012129208116782128,
		gater: null
	},
	{
		from: 135,
		to: 378,
		weight: 0.09136583543830609,
		gater: null
	},
	{
		from: 135,
		to: 379,
		weight: -0.01315032805766378,
		gater: null
	},
	{
		from: 136,
		to: 360,
		weight: -0.08377136499153291,
		gater: null
	},
	{
		from: 136,
		to: 361,
		weight: 0.013922433064574413,
		gater: null
	},
	{
		from: 136,
		to: 362,
		weight: -0.08489757680083199,
		gater: null
	},
	{
		from: 136,
		to: 363,
		weight: -0.005031224065403711,
		gater: null
	},
	{
		from: 136,
		to: 364,
		weight: -0.05142672424207517,
		gater: null
	},
	{
		from: 136,
		to: 365,
		weight: 0.03949848613864376,
		gater: null
	},
	{
		from: 136,
		to: 366,
		weight: 0.02319040084223492,
		gater: null
	},
	{
		from: 136,
		to: 367,
		weight: 0.07391471899665528,
		gater: null
	},
	{
		from: 136,
		to: 368,
		weight: -0.053127431744399406,
		gater: null
	},
	{
		from: 136,
		to: 369,
		weight: -0.07324298081378688,
		gater: null
	},
	{
		from: 136,
		to: 370,
		weight: -0.06849161959764838,
		gater: null
	},
	{
		from: 136,
		to: 371,
		weight: -0.002960023783321747,
		gater: null
	},
	{
		from: 136,
		to: 372,
		weight: -0.02240481212566245,
		gater: null
	},
	{
		from: 136,
		to: 373,
		weight: 0.01885897663796103,
		gater: null
	},
	{
		from: 136,
		to: 374,
		weight: -0.009060651635817416,
		gater: null
	},
	{
		from: 136,
		to: 375,
		weight: 0.09822074999462266,
		gater: null
	},
	{
		from: 136,
		to: 376,
		weight: 0.016784738001590555,
		gater: null
	},
	{
		from: 136,
		to: 377,
		weight: 0.06915554403450241,
		gater: null
	},
	{
		from: 136,
		to: 378,
		weight: -0.0049855422034275065,
		gater: null
	},
	{
		from: 136,
		to: 379,
		weight: -0.02830180552478763,
		gater: null
	},
	{
		from: 137,
		to: 360,
		weight: 0.07844700778062252,
		gater: null
	},
	{
		from: 137,
		to: 361,
		weight: -0.08647500214241291,
		gater: null
	},
	{
		from: 137,
		to: 362,
		weight: 0.0016801992215850908,
		gater: null
	},
	{
		from: 137,
		to: 363,
		weight: 0.04344891869486717,
		gater: null
	},
	{
		from: 137,
		to: 364,
		weight: 0.08388920673968198,
		gater: null
	},
	{
		from: 137,
		to: 365,
		weight: -0.07475750626289224,
		gater: null
	},
	{
		from: 137,
		to: 366,
		weight: -0.06762328273575288,
		gater: null
	},
	{
		from: 137,
		to: 367,
		weight: -0.05931642242488105,
		gater: null
	},
	{
		from: 137,
		to: 368,
		weight: 0.004242455606011358,
		gater: null
	},
	{
		from: 137,
		to: 369,
		weight: 0.040004835263865196,
		gater: null
	},
	{
		from: 137,
		to: 370,
		weight: 0.07586414172766412,
		gater: null
	},
	{
		from: 137,
		to: 371,
		weight: 0.032801473393977876,
		gater: null
	},
	{
		from: 137,
		to: 372,
		weight: 0.05112421587730909,
		gater: null
	},
	{
		from: 137,
		to: 373,
		weight: -0.0030374150273899253,
		gater: null
	},
	{
		from: 137,
		to: 374,
		weight: -0.000517743711409141,
		gater: null
	},
	{
		from: 137,
		to: 375,
		weight: 0.04634752871898745,
		gater: null
	},
	{
		from: 137,
		to: 376,
		weight: -0.013521831350603322,
		gater: null
	},
	{
		from: 137,
		to: 377,
		weight: -0.09354315320294626,
		gater: null
	},
	{
		from: 137,
		to: 378,
		weight: -0.008511087287839642,
		gater: null
	},
	{
		from: 137,
		to: 379,
		weight: -0.06321907671908318,
		gater: null
	},
	{
		from: 138,
		to: 360,
		weight: 0.08310356553745663,
		gater: null
	},
	{
		from: 138,
		to: 361,
		weight: -0.09024707564988046,
		gater: null
	},
	{
		from: 138,
		to: 362,
		weight: -0.06111967446849298,
		gater: null
	},
	{
		from: 138,
		to: 363,
		weight: 0.002703795498106884,
		gater: null
	},
	{
		from: 138,
		to: 364,
		weight: -0.09427029296791894,
		gater: null
	},
	{
		from: 138,
		to: 365,
		weight: 0.08931919506223782,
		gater: null
	},
	{
		from: 138,
		to: 366,
		weight: -0.0615848839771985,
		gater: null
	},
	{
		from: 138,
		to: 367,
		weight: 0.0337913122133256,
		gater: null
	},
	{
		from: 138,
		to: 368,
		weight: -0.03923433164433021,
		gater: null
	},
	{
		from: 138,
		to: 369,
		weight: 0.04549357944489443,
		gater: null
	},
	{
		from: 138,
		to: 370,
		weight: 0.07337969636435623,
		gater: null
	},
	{
		from: 138,
		to: 371,
		weight: -0.0897943243548479,
		gater: null
	},
	{
		from: 138,
		to: 372,
		weight: -0.07712084171599876,
		gater: null
	},
	{
		from: 138,
		to: 373,
		weight: 0.06361885701142919,
		gater: null
	},
	{
		from: 138,
		to: 374,
		weight: 0.07988317387258759,
		gater: null
	},
	{
		from: 138,
		to: 375,
		weight: -0.023084362085442706,
		gater: null
	},
	{
		from: 138,
		to: 376,
		weight: -0.07476160201948129,
		gater: null
	},
	{
		from: 138,
		to: 377,
		weight: -0.033831437621407154,
		gater: null
	},
	{
		from: 138,
		to: 378,
		weight: 0.09604161286527821,
		gater: null
	},
	{
		from: 138,
		to: 379,
		weight: 0.01885137405850071,
		gater: null
	},
	{
		from: 139,
		to: 360,
		weight: 0.02779288340611838,
		gater: null
	},
	{
		from: 139,
		to: 361,
		weight: -0.04963642919673044,
		gater: null
	},
	{
		from: 139,
		to: 362,
		weight: -0.03053173672441699,
		gater: null
	},
	{
		from: 139,
		to: 363,
		weight: -0.05833554535852939,
		gater: null
	},
	{
		from: 139,
		to: 364,
		weight: -0.022199260008525373,
		gater: null
	},
	{
		from: 139,
		to: 365,
		weight: -0.08388030727002223,
		gater: null
	},
	{
		from: 139,
		to: 366,
		weight: 0.08349885321154688,
		gater: null
	},
	{
		from: 139,
		to: 367,
		weight: -0.07301379339580848,
		gater: null
	},
	{
		from: 139,
		to: 368,
		weight: 0.08709260756830517,
		gater: null
	},
	{
		from: 139,
		to: 369,
		weight: -0.049409424441904194,
		gater: null
	},
	{
		from: 139,
		to: 370,
		weight: -0.05243570639213755,
		gater: null
	},
	{
		from: 139,
		to: 371,
		weight: 0.08000571978572957,
		gater: null
	},
	{
		from: 139,
		to: 372,
		weight: 0.09593958130889366,
		gater: null
	},
	{
		from: 139,
		to: 373,
		weight: -0.005869974398518482,
		gater: null
	},
	{
		from: 139,
		to: 374,
		weight: 0.05704514489664034,
		gater: null
	},
	{
		from: 139,
		to: 375,
		weight: 0.07356430390866528,
		gater: null
	},
	{
		from: 139,
		to: 376,
		weight: 0.054733626835140436,
		gater: null
	},
	{
		from: 139,
		to: 377,
		weight: 0.029307050183008748,
		gater: null
	},
	{
		from: 139,
		to: 378,
		weight: -0.01281309924851208,
		gater: null
	},
	{
		from: 139,
		to: 379,
		weight: -0.04670866724617535,
		gater: null
	},
	{
		from: 140,
		to: 360,
		weight: 0.08581834028572952,
		gater: null
	},
	{
		from: 140,
		to: 361,
		weight: 0.07507135364727624,
		gater: null
	},
	{
		from: 140,
		to: 362,
		weight: -0.02920413968916584,
		gater: null
	},
	{
		from: 140,
		to: 363,
		weight: 0.06928630738828248,
		gater: null
	},
	{
		from: 140,
		to: 364,
		weight: 0.025960889489819172,
		gater: null
	},
	{
		from: 140,
		to: 365,
		weight: 0.07802184027997044,
		gater: null
	},
	{
		from: 140,
		to: 366,
		weight: -0.033908344604040866,
		gater: null
	},
	{
		from: 140,
		to: 367,
		weight: -0.04841801977642919,
		gater: null
	},
	{
		from: 140,
		to: 368,
		weight: -0.03193465252872789,
		gater: null
	},
	{
		from: 140,
		to: 369,
		weight: 0.040480958686158475,
		gater: null
	},
	{
		from: 140,
		to: 370,
		weight: -0.00747630271504271,
		gater: null
	},
	{
		from: 140,
		to: 371,
		weight: -0.09422343144336157,
		gater: null
	},
	{
		from: 140,
		to: 372,
		weight: -0.0025254212475601945,
		gater: null
	},
	{
		from: 140,
		to: 373,
		weight: -0.05341712826144671,
		gater: null
	},
	{
		from: 140,
		to: 374,
		weight: 0.0013145157623990489,
		gater: null
	},
	{
		from: 140,
		to: 375,
		weight: 0.009690754326274129,
		gater: null
	},
	{
		from: 140,
		to: 376,
		weight: -0.017247140191573168,
		gater: null
	},
	{
		from: 140,
		to: 377,
		weight: -0.052380601019032726,
		gater: null
	},
	{
		from: 140,
		to: 378,
		weight: 0.06015793543758288,
		gater: null
	},
	{
		from: 140,
		to: 379,
		weight: -0.06843963999248381,
		gater: null
	},
	{
		from: 141,
		to: 360,
		weight: 0.07140251369334857,
		gater: null
	},
	{
		from: 141,
		to: 361,
		weight: 0.009009424925254098,
		gater: null
	},
	{
		from: 141,
		to: 362,
		weight: 0.01444502108232984,
		gater: null
	},
	{
		from: 141,
		to: 363,
		weight: -0.09369258905811786,
		gater: null
	},
	{
		from: 141,
		to: 364,
		weight: 0.05993325034549343,
		gater: null
	},
	{
		from: 141,
		to: 365,
		weight: -0.07268144783440907,
		gater: null
	},
	{
		from: 141,
		to: 366,
		weight: 0.02049002071584613,
		gater: null
	},
	{
		from: 141,
		to: 367,
		weight: 0.08675069444375963,
		gater: null
	},
	{
		from: 141,
		to: 368,
		weight: -0.08880570441803855,
		gater: null
	},
	{
		from: 141,
		to: 369,
		weight: 0.08134141791578209,
		gater: null
	},
	{
		from: 141,
		to: 370,
		weight: -0.0023369634690036667,
		gater: null
	},
	{
		from: 141,
		to: 371,
		weight: -0.03736879177415657,
		gater: null
	},
	{
		from: 141,
		to: 372,
		weight: -0.053403843330864655,
		gater: null
	},
	{
		from: 141,
		to: 373,
		weight: 0.07227368491887326,
		gater: null
	},
	{
		from: 141,
		to: 374,
		weight: 0.013096834724610845,
		gater: null
	},
	{
		from: 141,
		to: 375,
		weight: 0.07704480128123867,
		gater: null
	},
	{
		from: 141,
		to: 376,
		weight: 0.060042678644187886,
		gater: null
	},
	{
		from: 141,
		to: 377,
		weight: -0.014664709955518468,
		gater: null
	},
	{
		from: 141,
		to: 378,
		weight: 0.0813626578695461,
		gater: null
	},
	{
		from: 141,
		to: 379,
		weight: -0.0312716755527918,
		gater: null
	},
	{
		from: 142,
		to: 360,
		weight: 0.07721148659909655,
		gater: null
	},
	{
		from: 142,
		to: 361,
		weight: -0.08568283183887303,
		gater: null
	},
	{
		from: 142,
		to: 362,
		weight: -0.06464557629225048,
		gater: null
	},
	{
		from: 142,
		to: 363,
		weight: -0.05710325570788926,
		gater: null
	},
	{
		from: 142,
		to: 364,
		weight: 0.05757905918576506,
		gater: null
	},
	{
		from: 142,
		to: 365,
		weight: -0.05353921297142059,
		gater: null
	},
	{
		from: 142,
		to: 366,
		weight: -0.06704774585564319,
		gater: null
	},
	{
		from: 142,
		to: 367,
		weight: 0.04439458328103091,
		gater: null
	},
	{
		from: 142,
		to: 368,
		weight: 0.09922236362064105,
		gater: null
	},
	{
		from: 142,
		to: 369,
		weight: -0.04222185618174606,
		gater: null
	},
	{
		from: 142,
		to: 370,
		weight: 0.07931023536420012,
		gater: null
	},
	{
		from: 142,
		to: 371,
		weight: 0.012647582806263949,
		gater: null
	},
	{
		from: 142,
		to: 372,
		weight: 0.004368741762502945,
		gater: null
	},
	{
		from: 142,
		to: 373,
		weight: 0.0413931433110058,
		gater: null
	},
	{
		from: 142,
		to: 374,
		weight: -0.03414473227678974,
		gater: null
	},
	{
		from: 142,
		to: 375,
		weight: -0.05657237721667579,
		gater: null
	},
	{
		from: 142,
		to: 376,
		weight: 0.07826557140686582,
		gater: null
	},
	{
		from: 142,
		to: 377,
		weight: -0.09722141709954708,
		gater: null
	},
	{
		from: 142,
		to: 378,
		weight: -0.044715573645006536,
		gater: null
	},
	{
		from: 142,
		to: 379,
		weight: -0.03660452479759134,
		gater: null
	},
	{
		from: 143,
		to: 360,
		weight: 0.047886100978614815,
		gater: null
	},
	{
		from: 143,
		to: 361,
		weight: 0.06399495831581792,
		gater: null
	},
	{
		from: 143,
		to: 362,
		weight: -0.005585977315479121,
		gater: null
	},
	{
		from: 143,
		to: 363,
		weight: -0.053820572525804966,
		gater: null
	},
	{
		from: 143,
		to: 364,
		weight: -0.08091476359756472,
		gater: null
	},
	{
		from: 143,
		to: 365,
		weight: 0.05555773170997935,
		gater: null
	},
	{
		from: 143,
		to: 366,
		weight: 0.016418257974505496,
		gater: null
	},
	{
		from: 143,
		to: 367,
		weight: -0.03515974282901779,
		gater: null
	},
	{
		from: 143,
		to: 368,
		weight: 0.09951453804359886,
		gater: null
	},
	{
		from: 143,
		to: 369,
		weight: 0.06500658747689345,
		gater: null
	},
	{
		from: 143,
		to: 370,
		weight: -0.024758044172518326,
		gater: null
	},
	{
		from: 143,
		to: 371,
		weight: 0.049250699549907184,
		gater: null
	},
	{
		from: 143,
		to: 372,
		weight: 0.07917524456493324,
		gater: null
	},
	{
		from: 143,
		to: 373,
		weight: 0.08776272323891723,
		gater: null
	},
	{
		from: 143,
		to: 374,
		weight: 0.08479287958865153,
		gater: null
	},
	{
		from: 143,
		to: 375,
		weight: -0.01665793778166469,
		gater: null
	},
	{
		from: 143,
		to: 376,
		weight: -0.06045279073090293,
		gater: null
	},
	{
		from: 143,
		to: 377,
		weight: 0.00016755525305067742,
		gater: null
	},
	{
		from: 143,
		to: 378,
		weight: 0.09182043928126668,
		gater: null
	},
	{
		from: 143,
		to: 379,
		weight: -0.05280269897712611,
		gater: null
	},
	{
		from: 144,
		to: 360,
		weight: 0.04222710245913319,
		gater: null
	},
	{
		from: 144,
		to: 361,
		weight: 0.013560952421908024,
		gater: null
	},
	{
		from: 144,
		to: 362,
		weight: -0.04496079239362558,
		gater: null
	},
	{
		from: 144,
		to: 363,
		weight: 0.05438263593897111,
		gater: null
	},
	{
		from: 144,
		to: 364,
		weight: -0.04597681052806762,
		gater: null
	},
	{
		from: 144,
		to: 365,
		weight: -0.052081208851207886,
		gater: null
	},
	{
		from: 144,
		to: 366,
		weight: -0.03873241775386918,
		gater: null
	},
	{
		from: 144,
		to: 367,
		weight: 0.02269765254160991,
		gater: null
	},
	{
		from: 144,
		to: 368,
		weight: 0.030291996088224693,
		gater: null
	},
	{
		from: 144,
		to: 369,
		weight: -0.0956415652099071,
		gater: null
	},
	{
		from: 144,
		to: 370,
		weight: 0.06447977032371349,
		gater: null
	},
	{
		from: 144,
		to: 371,
		weight: -0.019435838799279764,
		gater: null
	},
	{
		from: 144,
		to: 372,
		weight: 0.06064993769512059,
		gater: null
	},
	{
		from: 144,
		to: 373,
		weight: -0.01843376134869054,
		gater: null
	},
	{
		from: 144,
		to: 374,
		weight: 0.023503756410950455,
		gater: null
	},
	{
		from: 144,
		to: 375,
		weight: -0.08837125583753785,
		gater: null
	},
	{
		from: 144,
		to: 376,
		weight: 0.07218371595194509,
		gater: null
	},
	{
		from: 144,
		to: 377,
		weight: 0.07244725070912947,
		gater: null
	},
	{
		from: 144,
		to: 378,
		weight: -0.06094654745110733,
		gater: null
	},
	{
		from: 144,
		to: 379,
		weight: -0.004487368070410766,
		gater: null
	},
	{
		from: 145,
		to: 360,
		weight: 0.04266780734209502,
		gater: null
	},
	{
		from: 145,
		to: 361,
		weight: 0.09158091154448766,
		gater: null
	},
	{
		from: 145,
		to: 362,
		weight: 0.09585004471411085,
		gater: null
	},
	{
		from: 145,
		to: 363,
		weight: -0.058880336446224306,
		gater: null
	},
	{
		from: 145,
		to: 364,
		weight: -0.05146536857536264,
		gater: null
	},
	{
		from: 145,
		to: 365,
		weight: -0.07488452769598278,
		gater: null
	},
	{
		from: 145,
		to: 366,
		weight: -0.08166479595855654,
		gater: null
	},
	{
		from: 145,
		to: 367,
		weight: 0.07526991174917957,
		gater: null
	},
	{
		from: 145,
		to: 368,
		weight: -0.09363612481125175,
		gater: null
	},
	{
		from: 145,
		to: 369,
		weight: 0.06362458912291843,
		gater: null
	},
	{
		from: 145,
		to: 370,
		weight: -0.0680550241020931,
		gater: null
	},
	{
		from: 145,
		to: 371,
		weight: -0.08317088437822934,
		gater: null
	},
	{
		from: 145,
		to: 372,
		weight: -0.020601523687778484,
		gater: null
	},
	{
		from: 145,
		to: 373,
		weight: -0.06444267354309274,
		gater: null
	},
	{
		from: 145,
		to: 374,
		weight: 0.054606985671722175,
		gater: null
	},
	{
		from: 145,
		to: 375,
		weight: -0.037396390279048494,
		gater: null
	},
	{
		from: 145,
		to: 376,
		weight: -0.055987579908437994,
		gater: null
	},
	{
		from: 145,
		to: 377,
		weight: -0.043506071157183704,
		gater: null
	},
	{
		from: 145,
		to: 378,
		weight: -0.099459051198669,
		gater: null
	},
	{
		from: 145,
		to: 379,
		weight: -0.05823589512858747,
		gater: null
	},
	{
		from: 146,
		to: 360,
		weight: 0.018267157591501132,
		gater: null
	},
	{
		from: 146,
		to: 361,
		weight: 0.08241574984953362,
		gater: null
	},
	{
		from: 146,
		to: 362,
		weight: 0.03167184778753382,
		gater: null
	},
	{
		from: 146,
		to: 363,
		weight: 0.03237845738336015,
		gater: null
	},
	{
		from: 146,
		to: 364,
		weight: -0.0560348929419015,
		gater: null
	},
	{
		from: 146,
		to: 365,
		weight: 0.05118432824044536,
		gater: null
	},
	{
		from: 146,
		to: 366,
		weight: 0.03789754719277011,
		gater: null
	},
	{
		from: 146,
		to: 367,
		weight: 0.05358380822508743,
		gater: null
	},
	{
		from: 146,
		to: 368,
		weight: 0.04272701442138724,
		gater: null
	},
	{
		from: 146,
		to: 369,
		weight: 0.03425883709864608,
		gater: null
	},
	{
		from: 146,
		to: 370,
		weight: -0.09276861966372048,
		gater: null
	},
	{
		from: 146,
		to: 371,
		weight: -0.06226913149479927,
		gater: null
	},
	{
		from: 146,
		to: 372,
		weight: 0.07069941043061273,
		gater: null
	},
	{
		from: 146,
		to: 373,
		weight: -0.03336903039379195,
		gater: null
	},
	{
		from: 146,
		to: 374,
		weight: 0.09937528330323486,
		gater: null
	},
	{
		from: 146,
		to: 375,
		weight: -0.09919424838877178,
		gater: null
	},
	{
		from: 146,
		to: 376,
		weight: -0.08437855367624901,
		gater: null
	},
	{
		from: 146,
		to: 377,
		weight: 0.05130765886980135,
		gater: null
	},
	{
		from: 146,
		to: 378,
		weight: -0.09419378953419236,
		gater: null
	},
	{
		from: 146,
		to: 379,
		weight: -0.08844160375766928,
		gater: null
	},
	{
		from: 147,
		to: 360,
		weight: -0.05902696326861672,
		gater: null
	},
	{
		from: 147,
		to: 361,
		weight: 0.048511776627048586,
		gater: null
	},
	{
		from: 147,
		to: 362,
		weight: 0.03478736563647655,
		gater: null
	},
	{
		from: 147,
		to: 363,
		weight: -0.025728095586557892,
		gater: null
	},
	{
		from: 147,
		to: 364,
		weight: -0.0801356698253981,
		gater: null
	},
	{
		from: 147,
		to: 365,
		weight: 0.018405827088421492,
		gater: null
	},
	{
		from: 147,
		to: 366,
		weight: -0.05273041173675304,
		gater: null
	},
	{
		from: 147,
		to: 367,
		weight: 0.09282496382355002,
		gater: null
	},
	{
		from: 147,
		to: 368,
		weight: -0.012098901075275309,
		gater: null
	},
	{
		from: 147,
		to: 369,
		weight: -0.045863739448830376,
		gater: null
	},
	{
		from: 147,
		to: 370,
		weight: -0.007269302172060371,
		gater: null
	},
	{
		from: 147,
		to: 371,
		weight: -0.026982734428467173,
		gater: null
	},
	{
		from: 147,
		to: 372,
		weight: -0.0046140774795754985,
		gater: null
	},
	{
		from: 147,
		to: 373,
		weight: -0.01632383396335553,
		gater: null
	},
	{
		from: 147,
		to: 374,
		weight: -0.06953583738631686,
		gater: null
	},
	{
		from: 147,
		to: 375,
		weight: 0.07122044843931682,
		gater: null
	},
	{
		from: 147,
		to: 376,
		weight: 0.036588478569045624,
		gater: null
	},
	{
		from: 147,
		to: 377,
		weight: -0.0373989704983381,
		gater: null
	},
	{
		from: 147,
		to: 378,
		weight: -0.046572668163650736,
		gater: null
	},
	{
		from: 147,
		to: 379,
		weight: -0.05443026326658749,
		gater: null
	},
	{
		from: 148,
		to: 360,
		weight: -0.012566410538805167,
		gater: null
	},
	{
		from: 148,
		to: 361,
		weight: 0.0781458664513604,
		gater: null
	},
	{
		from: 148,
		to: 362,
		weight: -0.008346533952072882,
		gater: null
	},
	{
		from: 148,
		to: 363,
		weight: -0.04232470314347445,
		gater: null
	},
	{
		from: 148,
		to: 364,
		weight: -0.09670335796360847,
		gater: null
	},
	{
		from: 148,
		to: 365,
		weight: 0.04058954628796543,
		gater: null
	},
	{
		from: 148,
		to: 366,
		weight: -0.08163367412178642,
		gater: null
	},
	{
		from: 148,
		to: 367,
		weight: 0.08664661242437885,
		gater: null
	},
	{
		from: 148,
		to: 368,
		weight: -0.0376711090986567,
		gater: null
	},
	{
		from: 148,
		to: 369,
		weight: -0.050459793212949,
		gater: null
	},
	{
		from: 148,
		to: 370,
		weight: 0.022782095966159585,
		gater: null
	},
	{
		from: 148,
		to: 371,
		weight: -0.06870443610302504,
		gater: null
	},
	{
		from: 148,
		to: 372,
		weight: -0.008037115801391798,
		gater: null
	},
	{
		from: 148,
		to: 373,
		weight: -0.04077207500611127,
		gater: null
	},
	{
		from: 148,
		to: 374,
		weight: -0.029724966484663676,
		gater: null
	},
	{
		from: 148,
		to: 375,
		weight: -0.06321336267662248,
		gater: null
	},
	{
		from: 148,
		to: 376,
		weight: 0.019884938186072884,
		gater: null
	},
	{
		from: 148,
		to: 377,
		weight: 0.040629178569789426,
		gater: null
	},
	{
		from: 148,
		to: 378,
		weight: -0.0632296232339827,
		gater: null
	},
	{
		from: 148,
		to: 379,
		weight: 0.037990457010400075,
		gater: null
	},
	{
		from: 149,
		to: 360,
		weight: -0.09523094899989447,
		gater: null
	},
	{
		from: 149,
		to: 361,
		weight: 0.03460113024320979,
		gater: null
	},
	{
		from: 149,
		to: 362,
		weight: -0.029316408616000628,
		gater: null
	},
	{
		from: 149,
		to: 363,
		weight: -0.0025026994043879647,
		gater: null
	},
	{
		from: 149,
		to: 364,
		weight: -0.06599285669423485,
		gater: null
	},
	{
		from: 149,
		to: 365,
		weight: -0.08434091840556271,
		gater: null
	},
	{
		from: 149,
		to: 366,
		weight: -0.03398018285308595,
		gater: null
	},
	{
		from: 149,
		to: 367,
		weight: -0.09011765214954748,
		gater: null
	},
	{
		from: 149,
		to: 368,
		weight: -0.006611603031713195,
		gater: null
	},
	{
		from: 149,
		to: 369,
		weight: -0.08842626428361361,
		gater: null
	},
	{
		from: 149,
		to: 370,
		weight: -0.04662803598121923,
		gater: null
	},
	{
		from: 149,
		to: 371,
		weight: -0.03390597467271449,
		gater: null
	},
	{
		from: 149,
		to: 372,
		weight: 0.05859249189215973,
		gater: null
	},
	{
		from: 149,
		to: 373,
		weight: 0.09295116624345323,
		gater: null
	},
	{
		from: 149,
		to: 374,
		weight: 0.08440533291418642,
		gater: null
	},
	{
		from: 149,
		to: 375,
		weight: -0.07951073223594883,
		gater: null
	},
	{
		from: 149,
		to: 376,
		weight: -0.06905629719309721,
		gater: null
	},
	{
		from: 149,
		to: 377,
		weight: 0.05555039812279114,
		gater: null
	},
	{
		from: 149,
		to: 378,
		weight: -0.042081692316650446,
		gater: null
	},
	{
		from: 149,
		to: 379,
		weight: -0.0580397410099935,
		gater: null
	},
	{
		from: 150,
		to: 360,
		weight: 0.04927694253946316,
		gater: null
	},
	{
		from: 150,
		to: 361,
		weight: -0.04727342717039145,
		gater: null
	},
	{
		from: 150,
		to: 362,
		weight: 0.0852715377415798,
		gater: null
	},
	{
		from: 150,
		to: 363,
		weight: -0.05535994601677681,
		gater: null
	},
	{
		from: 150,
		to: 364,
		weight: 0.08625150642885804,
		gater: null
	},
	{
		from: 150,
		to: 365,
		weight: -0.051091038278047445,
		gater: null
	},
	{
		from: 150,
		to: 366,
		weight: 0.0036766482121643185,
		gater: null
	},
	{
		from: 150,
		to: 367,
		weight: 0.023514858465299368,
		gater: null
	},
	{
		from: 150,
		to: 368,
		weight: -0.07791275944083709,
		gater: null
	},
	{
		from: 150,
		to: 369,
		weight: 0.03534379145851152,
		gater: null
	},
	{
		from: 150,
		to: 370,
		weight: -0.05933110208180268,
		gater: null
	},
	{
		from: 150,
		to: 371,
		weight: 0.010293484820549995,
		gater: null
	},
	{
		from: 150,
		to: 372,
		weight: -0.08461523643576202,
		gater: null
	},
	{
		from: 150,
		to: 373,
		weight: -0.030546264589018796,
		gater: null
	},
	{
		from: 150,
		to: 374,
		weight: 0.027052387540354272,
		gater: null
	},
	{
		from: 150,
		to: 375,
		weight: 0.09405102251354566,
		gater: null
	},
	{
		from: 150,
		to: 376,
		weight: -0.0450981846512121,
		gater: null
	},
	{
		from: 150,
		to: 377,
		weight: -0.02426795736791934,
		gater: null
	},
	{
		from: 150,
		to: 378,
		weight: -0.07331336039091113,
		gater: null
	},
	{
		from: 150,
		to: 379,
		weight: 0.08413389210833921,
		gater: null
	},
	{
		from: 151,
		to: 360,
		weight: -0.06710659320006784,
		gater: null
	},
	{
		from: 151,
		to: 361,
		weight: -0.0638005276525155,
		gater: null
	},
	{
		from: 151,
		to: 362,
		weight: -0.037870585050272035,
		gater: null
	},
	{
		from: 151,
		to: 363,
		weight: -0.01674924392385506,
		gater: null
	},
	{
		from: 151,
		to: 364,
		weight: -0.030548984160433168,
		gater: null
	},
	{
		from: 151,
		to: 365,
		weight: -0.09078077978518194,
		gater: null
	},
	{
		from: 151,
		to: 366,
		weight: -0.0017160874117338187,
		gater: null
	},
	{
		from: 151,
		to: 367,
		weight: 0.0940843220514622,
		gater: null
	},
	{
		from: 151,
		to: 368,
		weight: -0.027464172026898617,
		gater: null
	},
	{
		from: 151,
		to: 369,
		weight: -0.06417128940167222,
		gater: null
	},
	{
		from: 151,
		to: 370,
		weight: -0.07020725553775478,
		gater: null
	},
	{
		from: 151,
		to: 371,
		weight: -0.06564347592713632,
		gater: null
	},
	{
		from: 151,
		to: 372,
		weight: -0.09396419565182064,
		gater: null
	},
	{
		from: 151,
		to: 373,
		weight: 0.011228091938298768,
		gater: null
	},
	{
		from: 151,
		to: 374,
		weight: 0.07603882034577861,
		gater: null
	},
	{
		from: 151,
		to: 375,
		weight: 0.017286747834742794,
		gater: null
	},
	{
		from: 151,
		to: 376,
		weight: -0.017540519345294298,
		gater: null
	},
	{
		from: 151,
		to: 377,
		weight: -0.05879932912232047,
		gater: null
	},
	{
		from: 151,
		to: 378,
		weight: -0.06855618709963607,
		gater: null
	},
	{
		from: 151,
		to: 379,
		weight: 0.07970704951524143,
		gater: null
	},
	{
		from: 152,
		to: 360,
		weight: -0.08085080207455989,
		gater: null
	},
	{
		from: 152,
		to: 361,
		weight: -0.017876524772974633,
		gater: null
	},
	{
		from: 152,
		to: 362,
		weight: -0.03208328402611414,
		gater: null
	},
	{
		from: 152,
		to: 363,
		weight: -0.04720733899924876,
		gater: null
	},
	{
		from: 152,
		to: 364,
		weight: 0.09829833373466776,
		gater: null
	},
	{
		from: 152,
		to: 365,
		weight: -0.04983760012508207,
		gater: null
	},
	{
		from: 152,
		to: 366,
		weight: 0.02815432864587067,
		gater: null
	},
	{
		from: 152,
		to: 367,
		weight: 0.07944699540457845,
		gater: null
	},
	{
		from: 152,
		to: 368,
		weight: 0.03428898880200784,
		gater: null
	},
	{
		from: 152,
		to: 369,
		weight: 0.06746119967393649,
		gater: null
	},
	{
		from: 152,
		to: 370,
		weight: 0.07026018337225556,
		gater: null
	},
	{
		from: 152,
		to: 371,
		weight: -0.05267374008806787,
		gater: null
	},
	{
		from: 152,
		to: 372,
		weight: -0.00486843946702567,
		gater: null
	},
	{
		from: 152,
		to: 373,
		weight: -0.00031955796555456495,
		gater: null
	},
	{
		from: 152,
		to: 374,
		weight: 0.09941065408564312,
		gater: null
	},
	{
		from: 152,
		to: 375,
		weight: -0.04609720205670018,
		gater: null
	},
	{
		from: 152,
		to: 376,
		weight: 0.03665403173870416,
		gater: null
	},
	{
		from: 152,
		to: 377,
		weight: 0.021471766847023413,
		gater: null
	},
	{
		from: 152,
		to: 378,
		weight: 0.019994009728250717,
		gater: null
	},
	{
		from: 152,
		to: 379,
		weight: 0.04584655114335584,
		gater: null
	},
	{
		from: 153,
		to: 360,
		weight: 0.031449400736139,
		gater: null
	},
	{
		from: 153,
		to: 361,
		weight: -0.05161693847720135,
		gater: null
	},
	{
		from: 153,
		to: 362,
		weight: 0.018839765309313306,
		gater: null
	},
	{
		from: 153,
		to: 363,
		weight: -0.09130934648518828,
		gater: null
	},
	{
		from: 153,
		to: 364,
		weight: -0.061106651629016184,
		gater: null
	},
	{
		from: 153,
		to: 365,
		weight: -0.06915683673296025,
		gater: null
	},
	{
		from: 153,
		to: 366,
		weight: 0.09306810008224176,
		gater: null
	},
	{
		from: 153,
		to: 367,
		weight: -0.02445394177467501,
		gater: null
	},
	{
		from: 153,
		to: 368,
		weight: 0.08889092283223365,
		gater: null
	},
	{
		from: 153,
		to: 369,
		weight: -0.08973466185027218,
		gater: null
	},
	{
		from: 153,
		to: 370,
		weight: -0.08003199122088445,
		gater: null
	},
	{
		from: 153,
		to: 371,
		weight: -0.011321081555667384,
		gater: null
	},
	{
		from: 153,
		to: 372,
		weight: -0.06887385649334075,
		gater: null
	},
	{
		from: 153,
		to: 373,
		weight: 0.04039742889732234,
		gater: null
	},
	{
		from: 153,
		to: 374,
		weight: 0.034979018755013636,
		gater: null
	},
	{
		from: 153,
		to: 375,
		weight: -0.008455050381585755,
		gater: null
	},
	{
		from: 153,
		to: 376,
		weight: -0.024233125897233837,
		gater: null
	},
	{
		from: 153,
		to: 377,
		weight: 0.0485347552605484,
		gater: null
	},
	{
		from: 153,
		to: 378,
		weight: 0.014411671504828402,
		gater: null
	},
	{
		from: 153,
		to: 379,
		weight: 0.09187550200084718,
		gater: null
	},
	{
		from: 154,
		to: 360,
		weight: 0.049023982652102616,
		gater: null
	},
	{
		from: 154,
		to: 361,
		weight: 0.09603770579824267,
		gater: null
	},
	{
		from: 154,
		to: 362,
		weight: 0.08204532457520508,
		gater: null
	},
	{
		from: 154,
		to: 363,
		weight: -0.024607576676849388,
		gater: null
	},
	{
		from: 154,
		to: 364,
		weight: 0.0342796220762879,
		gater: null
	},
	{
		from: 154,
		to: 365,
		weight: -0.03834285743788697,
		gater: null
	},
	{
		from: 154,
		to: 366,
		weight: 0.09824506511627079,
		gater: null
	},
	{
		from: 154,
		to: 367,
		weight: -0.014503968590564659,
		gater: null
	},
	{
		from: 154,
		to: 368,
		weight: -0.08077927410432101,
		gater: null
	},
	{
		from: 154,
		to: 369,
		weight: -0.04738465868486128,
		gater: null
	},
	{
		from: 154,
		to: 370,
		weight: -0.04238547360914109,
		gater: null
	},
	{
		from: 154,
		to: 371,
		weight: -0.07308103509363857,
		gater: null
	},
	{
		from: 154,
		to: 372,
		weight: -0.0009185469426605114,
		gater: null
	},
	{
		from: 154,
		to: 373,
		weight: -0.04130790055185929,
		gater: null
	},
	{
		from: 154,
		to: 374,
		weight: -0.06524445730187858,
		gater: null
	},
	{
		from: 154,
		to: 375,
		weight: -0.0419906993649247,
		gater: null
	},
	{
		from: 154,
		to: 376,
		weight: 0.09280340004136503,
		gater: null
	},
	{
		from: 154,
		to: 377,
		weight: -0.07744416188628339,
		gater: null
	},
	{
		from: 154,
		to: 378,
		weight: -0.021261328591949402,
		gater: null
	},
	{
		from: 154,
		to: 379,
		weight: -0.02073610121352587,
		gater: null
	},
	{
		from: 155,
		to: 360,
		weight: -0.0951693825167732,
		gater: null
	},
	{
		from: 155,
		to: 361,
		weight: -0.07011216783786,
		gater: null
	},
	{
		from: 155,
		to: 362,
		weight: -0.004894313358722216,
		gater: null
	},
	{
		from: 155,
		to: 363,
		weight: -0.052593325718727435,
		gater: null
	},
	{
		from: 155,
		to: 364,
		weight: -0.08446869422726011,
		gater: null
	},
	{
		from: 155,
		to: 365,
		weight: -0.05971311586468242,
		gater: null
	},
	{
		from: 155,
		to: 366,
		weight: 0.06284689149790743,
		gater: null
	},
	{
		from: 155,
		to: 367,
		weight: -0.023150533757674688,
		gater: null
	},
	{
		from: 155,
		to: 368,
		weight: -0.03100192767632004,
		gater: null
	},
	{
		from: 155,
		to: 369,
		weight: -0.041235007976490004,
		gater: null
	},
	{
		from: 155,
		to: 370,
		weight: -0.02631305586607606,
		gater: null
	},
	{
		from: 155,
		to: 371,
		weight: -0.09188399267068044,
		gater: null
	},
	{
		from: 155,
		to: 372,
		weight: 0.00990636595131833,
		gater: null
	},
	{
		from: 155,
		to: 373,
		weight: -0.042279880948107224,
		gater: null
	},
	{
		from: 155,
		to: 374,
		weight: -0.06496214449400912,
		gater: null
	},
	{
		from: 155,
		to: 375,
		weight: 0.03488016954506462,
		gater: null
	},
	{
		from: 155,
		to: 376,
		weight: 0.09120987762939939,
		gater: null
	},
	{
		from: 155,
		to: 377,
		weight: 0.055506956582317496,
		gater: null
	},
	{
		from: 155,
		to: 378,
		weight: -0.043030513077198365,
		gater: null
	},
	{
		from: 155,
		to: 379,
		weight: 0.04408790376219568,
		gater: null
	},
	{
		from: 156,
		to: 360,
		weight: -0.09369886300168005,
		gater: null
	},
	{
		from: 156,
		to: 361,
		weight: 0.0324371241013684,
		gater: null
	},
	{
		from: 156,
		to: 362,
		weight: 0.08809109420353275,
		gater: null
	},
	{
		from: 156,
		to: 363,
		weight: -0.06078887164001201,
		gater: null
	},
	{
		from: 156,
		to: 364,
		weight: -0.00953664304570645,
		gater: null
	},
	{
		from: 156,
		to: 365,
		weight: -0.09938341949277603,
		gater: null
	},
	{
		from: 156,
		to: 366,
		weight: -0.04002594363116821,
		gater: null
	},
	{
		from: 156,
		to: 367,
		weight: -0.08848539038649812,
		gater: null
	},
	{
		from: 156,
		to: 368,
		weight: 0.04214694348956738,
		gater: null
	},
	{
		from: 156,
		to: 369,
		weight: -0.04817129574745263,
		gater: null
	},
	{
		from: 156,
		to: 370,
		weight: 0.0005265486234636158,
		gater: null
	},
	{
		from: 156,
		to: 371,
		weight: -0.08707110422194711,
		gater: null
	},
	{
		from: 156,
		to: 372,
		weight: -0.06747511218172614,
		gater: null
	},
	{
		from: 156,
		to: 373,
		weight: -0.021899287948998897,
		gater: null
	},
	{
		from: 156,
		to: 374,
		weight: -0.05047590188257032,
		gater: null
	},
	{
		from: 156,
		to: 375,
		weight: -0.050880667592109054,
		gater: null
	},
	{
		from: 156,
		to: 376,
		weight: -0.07415328296333663,
		gater: null
	},
	{
		from: 156,
		to: 377,
		weight: -0.053931083564818044,
		gater: null
	},
	{
		from: 156,
		to: 378,
		weight: 0.013795234782594923,
		gater: null
	},
	{
		from: 156,
		to: 379,
		weight: -0.08849195727679215,
		gater: null
	},
	{
		from: 157,
		to: 360,
		weight: -0.008971400017953976,
		gater: null
	},
	{
		from: 157,
		to: 361,
		weight: 0.07922831778194772,
		gater: null
	},
	{
		from: 157,
		to: 362,
		weight: 0.06374388604975906,
		gater: null
	},
	{
		from: 157,
		to: 363,
		weight: 0.02199199665818749,
		gater: null
	},
	{
		from: 157,
		to: 364,
		weight: 0.05591228128682918,
		gater: null
	},
	{
		from: 157,
		to: 365,
		weight: 0.010768142293691385,
		gater: null
	},
	{
		from: 157,
		to: 366,
		weight: -0.06268358983057981,
		gater: null
	},
	{
		from: 157,
		to: 367,
		weight: -0.006466106999474558,
		gater: null
	},
	{
		from: 157,
		to: 368,
		weight: 0.061196195935284387,
		gater: null
	},
	{
		from: 157,
		to: 369,
		weight: -0.08146050578848851,
		gater: null
	},
	{
		from: 157,
		to: 370,
		weight: -0.0019008231923798719,
		gater: null
	},
	{
		from: 157,
		to: 371,
		weight: 0.03550996187250283,
		gater: null
	},
	{
		from: 157,
		to: 372,
		weight: 0.06175612407048256,
		gater: null
	},
	{
		from: 157,
		to: 373,
		weight: 0.07393350413638361,
		gater: null
	},
	{
		from: 157,
		to: 374,
		weight: -0.021969377367701923,
		gater: null
	},
	{
		from: 157,
		to: 375,
		weight: 0.06488575275242078,
		gater: null
	},
	{
		from: 157,
		to: 376,
		weight: 0.05058270864967038,
		gater: null
	},
	{
		from: 157,
		to: 377,
		weight: 0.0797936448712922,
		gater: null
	},
	{
		from: 157,
		to: 378,
		weight: 0.01947428732067706,
		gater: null
	},
	{
		from: 157,
		to: 379,
		weight: -0.05821126683435849,
		gater: null
	},
	{
		from: 158,
		to: 360,
		weight: -0.011730210387792359,
		gater: null
	},
	{
		from: 158,
		to: 361,
		weight: -0.0572875749178281,
		gater: null
	},
	{
		from: 158,
		to: 362,
		weight: -0.08308837866578132,
		gater: null
	},
	{
		from: 158,
		to: 363,
		weight: -0.06398680689910377,
		gater: null
	},
	{
		from: 158,
		to: 364,
		weight: -0.060085199249327516,
		gater: null
	},
	{
		from: 158,
		to: 365,
		weight: -0.09785292043739742,
		gater: null
	},
	{
		from: 158,
		to: 366,
		weight: 0.024930911189857158,
		gater: null
	},
	{
		from: 158,
		to: 367,
		weight: -0.04046923914996614,
		gater: null
	},
	{
		from: 158,
		to: 368,
		weight: -0.04538594677460237,
		gater: null
	},
	{
		from: 158,
		to: 369,
		weight: -0.062020707927200075,
		gater: null
	},
	{
		from: 158,
		to: 370,
		weight: 0.09056020002645063,
		gater: null
	},
	{
		from: 158,
		to: 371,
		weight: -0.06190482500540138,
		gater: null
	},
	{
		from: 158,
		to: 372,
		weight: -0.04681236824759685,
		gater: null
	},
	{
		from: 158,
		to: 373,
		weight: 0.07791029616225273,
		gater: null
	},
	{
		from: 158,
		to: 374,
		weight: 0.027365589897063225,
		gater: null
	},
	{
		from: 158,
		to: 375,
		weight: -0.07625497856136798,
		gater: null
	},
	{
		from: 158,
		to: 376,
		weight: -0.07166152964408141,
		gater: null
	},
	{
		from: 158,
		to: 377,
		weight: 0.06940903468421636,
		gater: null
	},
	{
		from: 158,
		to: 378,
		weight: -0.06046978211286596,
		gater: null
	},
	{
		from: 158,
		to: 379,
		weight: -0.09180422606800685,
		gater: null
	},
	{
		from: 159,
		to: 360,
		weight: -0.04380434940542406,
		gater: null
	},
	{
		from: 159,
		to: 361,
		weight: -0.037638208812458857,
		gater: null
	},
	{
		from: 159,
		to: 362,
		weight: -0.023770275755335968,
		gater: null
	},
	{
		from: 159,
		to: 363,
		weight: 0.0023740658431947725,
		gater: null
	},
	{
		from: 159,
		to: 364,
		weight: 0.04059840353858313,
		gater: null
	},
	{
		from: 159,
		to: 365,
		weight: 0.09342326577749047,
		gater: null
	},
	{
		from: 159,
		to: 366,
		weight: 0.0116133584995632,
		gater: null
	},
	{
		from: 159,
		to: 367,
		weight: -0.07838693904039991,
		gater: null
	},
	{
		from: 159,
		to: 368,
		weight: 0.0348441153430466,
		gater: null
	},
	{
		from: 159,
		to: 369,
		weight: 0.08293827492450578,
		gater: null
	},
	{
		from: 159,
		to: 370,
		weight: 0.010924406301650438,
		gater: null
	},
	{
		from: 159,
		to: 371,
		weight: 0.04245180798756304,
		gater: null
	},
	{
		from: 159,
		to: 372,
		weight: 0.058401177087006234,
		gater: null
	},
	{
		from: 159,
		to: 373,
		weight: 0.05464722408036504,
		gater: null
	},
	{
		from: 159,
		to: 374,
		weight: -0.09780861347955333,
		gater: null
	},
	{
		from: 159,
		to: 375,
		weight: 0.036526621425663874,
		gater: null
	},
	{
		from: 159,
		to: 376,
		weight: 0.07629759099764227,
		gater: null
	},
	{
		from: 159,
		to: 377,
		weight: 0.002549849039179236,
		gater: null
	},
	{
		from: 159,
		to: 378,
		weight: 0.07183107705966893,
		gater: null
	},
	{
		from: 159,
		to: 379,
		weight: -0.033159709078070684,
		gater: null
	},
	{
		from: 160,
		to: 360,
		weight: -0.07812428123887766,
		gater: null
	},
	{
		from: 160,
		to: 361,
		weight: 0.017828719073059857,
		gater: null
	},
	{
		from: 160,
		to: 362,
		weight: -0.07302932345412705,
		gater: null
	},
	{
		from: 160,
		to: 363,
		weight: 0.096212680758372,
		gater: null
	},
	{
		from: 160,
		to: 364,
		weight: -0.07837224652221751,
		gater: null
	},
	{
		from: 160,
		to: 365,
		weight: -0.0010237370001337232,
		gater: null
	},
	{
		from: 160,
		to: 366,
		weight: -0.04769432278609123,
		gater: null
	},
	{
		from: 160,
		to: 367,
		weight: 0.013004401795940493,
		gater: null
	},
	{
		from: 160,
		to: 368,
		weight: -0.09471922777569826,
		gater: null
	},
	{
		from: 160,
		to: 369,
		weight: 0.07669507394037867,
		gater: null
	},
	{
		from: 160,
		to: 370,
		weight: 0.08975601688088694,
		gater: null
	},
	{
		from: 160,
		to: 371,
		weight: 0.03350318750686937,
		gater: null
	},
	{
		from: 160,
		to: 372,
		weight: -0.060243643176022446,
		gater: null
	},
	{
		from: 160,
		to: 373,
		weight: 0.035515407076771977,
		gater: null
	},
	{
		from: 160,
		to: 374,
		weight: -0.09569629303622183,
		gater: null
	},
	{
		from: 160,
		to: 375,
		weight: 0.050880413173232164,
		gater: null
	},
	{
		from: 160,
		to: 376,
		weight: 0.06189438070514128,
		gater: null
	},
	{
		from: 160,
		to: 377,
		weight: 0.03562906641227198,
		gater: null
	},
	{
		from: 160,
		to: 378,
		weight: -0.07600970884650296,
		gater: null
	},
	{
		from: 160,
		to: 379,
		weight: -0.07158049839943842,
		gater: null
	},
	{
		from: 161,
		to: 360,
		weight: 0.0773337090008562,
		gater: null
	},
	{
		from: 161,
		to: 361,
		weight: 0.06933715637656265,
		gater: null
	},
	{
		from: 161,
		to: 362,
		weight: -0.08750476054035619,
		gater: null
	},
	{
		from: 161,
		to: 363,
		weight: 0.06677655038257352,
		gater: null
	},
	{
		from: 161,
		to: 364,
		weight: -0.04515246167410299,
		gater: null
	},
	{
		from: 161,
		to: 365,
		weight: 0.05228114517441784,
		gater: null
	},
	{
		from: 161,
		to: 366,
		weight: 0.03488556837118134,
		gater: null
	},
	{
		from: 161,
		to: 367,
		weight: -0.06844299395560247,
		gater: null
	},
	{
		from: 161,
		to: 368,
		weight: 0.09054264914292612,
		gater: null
	},
	{
		from: 161,
		to: 369,
		weight: -0.06953243308557765,
		gater: null
	},
	{
		from: 161,
		to: 370,
		weight: 0.037620269691646335,
		gater: null
	},
	{
		from: 161,
		to: 371,
		weight: 0.06711760040004902,
		gater: null
	},
	{
		from: 161,
		to: 372,
		weight: 0.02835467993238655,
		gater: null
	},
	{
		from: 161,
		to: 373,
		weight: 0.02979643077101307,
		gater: null
	},
	{
		from: 161,
		to: 374,
		weight: -0.06834735591469285,
		gater: null
	},
	{
		from: 161,
		to: 375,
		weight: -0.03296642744056642,
		gater: null
	},
	{
		from: 161,
		to: 376,
		weight: -0.04789194077675832,
		gater: null
	},
	{
		from: 161,
		to: 377,
		weight: 0.07514534172554699,
		gater: null
	},
	{
		from: 161,
		to: 378,
		weight: 0.05487988274993891,
		gater: null
	},
	{
		from: 161,
		to: 379,
		weight: -0.02156990713335545,
		gater: null
	},
	{
		from: 162,
		to: 360,
		weight: 0.028662539374854967,
		gater: null
	},
	{
		from: 162,
		to: 361,
		weight: -0.07016626841644875,
		gater: null
	},
	{
		from: 162,
		to: 362,
		weight: 0.03213851839237028,
		gater: null
	},
	{
		from: 162,
		to: 363,
		weight: 0.08884726963461184,
		gater: null
	},
	{
		from: 162,
		to: 364,
		weight: 0.08009975880896844,
		gater: null
	},
	{
		from: 162,
		to: 365,
		weight: 0.0583076973074968,
		gater: null
	},
	{
		from: 162,
		to: 366,
		weight: 0.05639273769481404,
		gater: null
	},
	{
		from: 162,
		to: 367,
		weight: 0.05397314158008412,
		gater: null
	},
	{
		from: 162,
		to: 368,
		weight: -0.06709565416309768,
		gater: null
	},
	{
		from: 162,
		to: 369,
		weight: 0.09649712006355587,
		gater: null
	},
	{
		from: 162,
		to: 370,
		weight: 0.041994002503976835,
		gater: null
	},
	{
		from: 162,
		to: 371,
		weight: -0.04897568044538425,
		gater: null
	},
	{
		from: 162,
		to: 372,
		weight: -0.09577561573207705,
		gater: null
	},
	{
		from: 162,
		to: 373,
		weight: 0.0033215226739447407,
		gater: null
	},
	{
		from: 162,
		to: 374,
		weight: 0.08005150354019039,
		gater: null
	},
	{
		from: 162,
		to: 375,
		weight: -0.06366038152433191,
		gater: null
	},
	{
		from: 162,
		to: 376,
		weight: -0.01184472489134869,
		gater: null
	},
	{
		from: 162,
		to: 377,
		weight: -0.07527677749185596,
		gater: null
	},
	{
		from: 162,
		to: 378,
		weight: 0.08146871854710169,
		gater: null
	},
	{
		from: 162,
		to: 379,
		weight: -0.03423625034525504,
		gater: null
	},
	{
		from: 163,
		to: 360,
		weight: 0.07107563807604642,
		gater: null
	},
	{
		from: 163,
		to: 361,
		weight: -0.029740813713192843,
		gater: null
	},
	{
		from: 163,
		to: 362,
		weight: 0.07174735942221361,
		gater: null
	},
	{
		from: 163,
		to: 363,
		weight: -0.05112236089745923,
		gater: null
	},
	{
		from: 163,
		to: 364,
		weight: 0.06310273556984289,
		gater: null
	},
	{
		from: 163,
		to: 365,
		weight: -0.012969294442549156,
		gater: null
	},
	{
		from: 163,
		to: 366,
		weight: -0.01685054115616476,
		gater: null
	},
	{
		from: 163,
		to: 367,
		weight: -0.02052036141769631,
		gater: null
	},
	{
		from: 163,
		to: 368,
		weight: 0.015894953235803075,
		gater: null
	},
	{
		from: 163,
		to: 369,
		weight: 0.00969666620026595,
		gater: null
	},
	{
		from: 163,
		to: 370,
		weight: -0.03692567684807417,
		gater: null
	},
	{
		from: 163,
		to: 371,
		weight: 0.007529088573690584,
		gater: null
	},
	{
		from: 163,
		to: 372,
		weight: -0.05211210204301469,
		gater: null
	},
	{
		from: 163,
		to: 373,
		weight: 0.0435372344639921,
		gater: null
	},
	{
		from: 163,
		to: 374,
		weight: -0.027771445570224804,
		gater: null
	},
	{
		from: 163,
		to: 375,
		weight: -0.05198829988337326,
		gater: null
	},
	{
		from: 163,
		to: 376,
		weight: -0.09736987612862183,
		gater: null
	},
	{
		from: 163,
		to: 377,
		weight: 0.09060265345564483,
		gater: null
	},
	{
		from: 163,
		to: 378,
		weight: -0.07861738368743021,
		gater: null
	},
	{
		from: 163,
		to: 379,
		weight: -0.09437811697896824,
		gater: null
	},
	{
		from: 164,
		to: 360,
		weight: -0.07041912771901303,
		gater: null
	},
	{
		from: 164,
		to: 361,
		weight: -0.04716471064554613,
		gater: null
	},
	{
		from: 164,
		to: 362,
		weight: 0.02995308718831749,
		gater: null
	},
	{
		from: 164,
		to: 363,
		weight: 0.055674991875829694,
		gater: null
	},
	{
		from: 164,
		to: 364,
		weight: 0.0383588689362174,
		gater: null
	},
	{
		from: 164,
		to: 365,
		weight: 0.06616187043637364,
		gater: null
	},
	{
		from: 164,
		to: 366,
		weight: -0.07590749252957446,
		gater: null
	},
	{
		from: 164,
		to: 367,
		weight: 0.08433860825746026,
		gater: null
	},
	{
		from: 164,
		to: 368,
		weight: -0.0696734272641225,
		gater: null
	},
	{
		from: 164,
		to: 369,
		weight: -0.06591944821166976,
		gater: null
	},
	{
		from: 164,
		to: 370,
		weight: 0.009371573543717246,
		gater: null
	},
	{
		from: 164,
		to: 371,
		weight: 0.05823567914456662,
		gater: null
	},
	{
		from: 164,
		to: 372,
		weight: 0.046445548297082334,
		gater: null
	},
	{
		from: 164,
		to: 373,
		weight: -0.09265649682630062,
		gater: null
	},
	{
		from: 164,
		to: 374,
		weight: -0.05713551311586662,
		gater: null
	},
	{
		from: 164,
		to: 375,
		weight: -0.016731185451072064,
		gater: null
	},
	{
		from: 164,
		to: 376,
		weight: -0.00017710149424292332,
		gater: null
	},
	{
		from: 164,
		to: 377,
		weight: -0.09140169547392203,
		gater: null
	},
	{
		from: 164,
		to: 378,
		weight: 0.05323240226514936,
		gater: null
	},
	{
		from: 164,
		to: 379,
		weight: -0.009424263219209777,
		gater: null
	},
	{
		from: 165,
		to: 360,
		weight: 0.07239691808021301,
		gater: null
	},
	{
		from: 165,
		to: 361,
		weight: -0.02080042364576666,
		gater: null
	},
	{
		from: 165,
		to: 362,
		weight: 0.025673367769281252,
		gater: null
	},
	{
		from: 165,
		to: 363,
		weight: -0.07869571701344476,
		gater: null
	},
	{
		from: 165,
		to: 364,
		weight: -0.026124872751980763,
		gater: null
	},
	{
		from: 165,
		to: 365,
		weight: 0.010950570325216097,
		gater: null
	},
	{
		from: 165,
		to: 366,
		weight: -0.09969084120039291,
		gater: null
	},
	{
		from: 165,
		to: 367,
		weight: 0.0764012475110569,
		gater: null
	},
	{
		from: 165,
		to: 368,
		weight: 0.09147252884537105,
		gater: null
	},
	{
		from: 165,
		to: 369,
		weight: 0.09261829504892738,
		gater: null
	},
	{
		from: 165,
		to: 370,
		weight: -0.04830335990723729,
		gater: null
	},
	{
		from: 165,
		to: 371,
		weight: 0.05122549691690467,
		gater: null
	},
	{
		from: 165,
		to: 372,
		weight: -0.09237355087649224,
		gater: null
	},
	{
		from: 165,
		to: 373,
		weight: 0.04472361617356638,
		gater: null
	},
	{
		from: 165,
		to: 374,
		weight: 0.06700722844773929,
		gater: null
	},
	{
		from: 165,
		to: 375,
		weight: 0.030286993591264105,
		gater: null
	},
	{
		from: 165,
		to: 376,
		weight: 0.0868506469213661,
		gater: null
	},
	{
		from: 165,
		to: 377,
		weight: 0.024671515633124835,
		gater: null
	},
	{
		from: 165,
		to: 378,
		weight: 0.021190556704692123,
		gater: null
	},
	{
		from: 165,
		to: 379,
		weight: -0.07007193326628208,
		gater: null
	},
	{
		from: 166,
		to: 360,
		weight: -0.053491515687025086,
		gater: null
	},
	{
		from: 166,
		to: 361,
		weight: -0.08441679502694682,
		gater: null
	},
	{
		from: 166,
		to: 362,
		weight: -0.07104250661966144,
		gater: null
	},
	{
		from: 166,
		to: 363,
		weight: 0.05860609456458912,
		gater: null
	},
	{
		from: 166,
		to: 364,
		weight: -0.025348456660285165,
		gater: null
	},
	{
		from: 166,
		to: 365,
		weight: -0.05441871682848092,
		gater: null
	},
	{
		from: 166,
		to: 366,
		weight: -0.024381100536428765,
		gater: null
	},
	{
		from: 166,
		to: 367,
		weight: -0.04437157807357339,
		gater: null
	},
	{
		from: 166,
		to: 368,
		weight: 0.02705845186134903,
		gater: null
	},
	{
		from: 166,
		to: 369,
		weight: -0.04464178417901792,
		gater: null
	},
	{
		from: 166,
		to: 370,
		weight: 0.06929872752441346,
		gater: null
	},
	{
		from: 166,
		to: 371,
		weight: -0.05859175575518214,
		gater: null
	},
	{
		from: 166,
		to: 372,
		weight: -0.07021149029982299,
		gater: null
	},
	{
		from: 166,
		to: 373,
		weight: 0.013981845526128286,
		gater: null
	},
	{
		from: 166,
		to: 374,
		weight: 0.06484181198639322,
		gater: null
	},
	{
		from: 166,
		to: 375,
		weight: 0.04417327722097181,
		gater: null
	},
	{
		from: 166,
		to: 376,
		weight: -0.011947881656828446,
		gater: null
	},
	{
		from: 166,
		to: 377,
		weight: -0.004797214237199254,
		gater: null
	},
	{
		from: 166,
		to: 378,
		weight: -0.012612452296699758,
		gater: null
	},
	{
		from: 166,
		to: 379,
		weight: -0.01052124727344532,
		gater: null
	},
	{
		from: 167,
		to: 360,
		weight: 0.05025660456232095,
		gater: null
	},
	{
		from: 167,
		to: 361,
		weight: -0.07960520451989478,
		gater: null
	},
	{
		from: 167,
		to: 362,
		weight: -0.08658203562731087,
		gater: null
	},
	{
		from: 167,
		to: 363,
		weight: 0.05469973817070148,
		gater: null
	},
	{
		from: 167,
		to: 364,
		weight: 0.06094222232600141,
		gater: null
	},
	{
		from: 167,
		to: 365,
		weight: 0.09300489809033605,
		gater: null
	},
	{
		from: 167,
		to: 366,
		weight: -0.054979633312369686,
		gater: null
	},
	{
		from: 167,
		to: 367,
		weight: -0.0973754947540137,
		gater: null
	},
	{
		from: 167,
		to: 368,
		weight: -0.03130451626378253,
		gater: null
	},
	{
		from: 167,
		to: 369,
		weight: 0.020952207200250067,
		gater: null
	},
	{
		from: 167,
		to: 370,
		weight: -0.06696886164926825,
		gater: null
	},
	{
		from: 167,
		to: 371,
		weight: 0.062968174565701,
		gater: null
	},
	{
		from: 167,
		to: 372,
		weight: -0.0689660190938835,
		gater: null
	},
	{
		from: 167,
		to: 373,
		weight: -0.012699816798484906,
		gater: null
	},
	{
		from: 167,
		to: 374,
		weight: -0.041313526850525896,
		gater: null
	},
	{
		from: 167,
		to: 375,
		weight: 0.03816163119421892,
		gater: null
	},
	{
		from: 167,
		to: 376,
		weight: -0.03770029706745275,
		gater: null
	},
	{
		from: 167,
		to: 377,
		weight: -0.06874221380866832,
		gater: null
	},
	{
		from: 167,
		to: 378,
		weight: -0.028981840842919313,
		gater: null
	},
	{
		from: 167,
		to: 379,
		weight: -0.024506031028640463,
		gater: null
	},
	{
		from: 168,
		to: 360,
		weight: -0.04455876972192954,
		gater: null
	},
	{
		from: 168,
		to: 361,
		weight: -0.09109858829316408,
		gater: null
	},
	{
		from: 168,
		to: 362,
		weight: -0.052752652358457476,
		gater: null
	},
	{
		from: 168,
		to: 363,
		weight: 0.07996160434710284,
		gater: null
	},
	{
		from: 168,
		to: 364,
		weight: 0.0679211330501659,
		gater: null
	},
	{
		from: 168,
		to: 365,
		weight: 0.05903840835147753,
		gater: null
	},
	{
		from: 168,
		to: 366,
		weight: 0.07499842754672789,
		gater: null
	},
	{
		from: 168,
		to: 367,
		weight: 0.008954799629817017,
		gater: null
	},
	{
		from: 168,
		to: 368,
		weight: -0.020915373312409585,
		gater: null
	},
	{
		from: 168,
		to: 369,
		weight: 0.09933865736736866,
		gater: null
	},
	{
		from: 168,
		to: 370,
		weight: -0.09023889177939762,
		gater: null
	},
	{
		from: 168,
		to: 371,
		weight: 0.03260020304289207,
		gater: null
	},
	{
		from: 168,
		to: 372,
		weight: 0.0649162820942343,
		gater: null
	},
	{
		from: 168,
		to: 373,
		weight: 0.08833400637530262,
		gater: null
	},
	{
		from: 168,
		to: 374,
		weight: 0.03419994296733844,
		gater: null
	},
	{
		from: 168,
		to: 375,
		weight: -0.046053494790024185,
		gater: null
	},
	{
		from: 168,
		to: 376,
		weight: -0.01905067530617717,
		gater: null
	},
	{
		from: 168,
		to: 377,
		weight: -0.025064450626509194,
		gater: null
	},
	{
		from: 168,
		to: 378,
		weight: -0.0834574314025085,
		gater: null
	},
	{
		from: 168,
		to: 379,
		weight: 0.07482576702880617,
		gater: null
	},
	{
		from: 169,
		to: 360,
		weight: 0.06939697095330286,
		gater: null
	},
	{
		from: 169,
		to: 361,
		weight: -0.05274159294344996,
		gater: null
	},
	{
		from: 169,
		to: 362,
		weight: 0.061099706340419696,
		gater: null
	},
	{
		from: 169,
		to: 363,
		weight: -0.066853678892836,
		gater: null
	},
	{
		from: 169,
		to: 364,
		weight: 0.09393867140746978,
		gater: null
	},
	{
		from: 169,
		to: 365,
		weight: -0.06304062913756434,
		gater: null
	},
	{
		from: 169,
		to: 366,
		weight: -0.07368126307403156,
		gater: null
	},
	{
		from: 169,
		to: 367,
		weight: -0.00544623236711321,
		gater: null
	},
	{
		from: 169,
		to: 368,
		weight: 0.0023909312674123273,
		gater: null
	},
	{
		from: 169,
		to: 369,
		weight: -0.02821236426193044,
		gater: null
	},
	{
		from: 169,
		to: 370,
		weight: 0.04780305247168193,
		gater: null
	},
	{
		from: 169,
		to: 371,
		weight: -0.01569719472526114,
		gater: null
	},
	{
		from: 169,
		to: 372,
		weight: 0.09425063934911448,
		gater: null
	},
	{
		from: 169,
		to: 373,
		weight: 0.06363150568649287,
		gater: null
	},
	{
		from: 169,
		to: 374,
		weight: 0.011739499412184218,
		gater: null
	},
	{
		from: 169,
		to: 375,
		weight: 0.06999218807684082,
		gater: null
	},
	{
		from: 169,
		to: 376,
		weight: 0.0858513154280903,
		gater: null
	},
	{
		from: 169,
		to: 377,
		weight: -0.06990316932082422,
		gater: null
	},
	{
		from: 169,
		to: 378,
		weight: -0.05012784203986827,
		gater: null
	},
	{
		from: 169,
		to: 379,
		weight: -0.040186159750019046,
		gater: null
	},
	{
		from: 170,
		to: 360,
		weight: -0.09399571632191549,
		gater: null
	},
	{
		from: 170,
		to: 361,
		weight: 0.0872453561430295,
		gater: null
	},
	{
		from: 170,
		to: 362,
		weight: -0.06272141135158799,
		gater: null
	},
	{
		from: 170,
		to: 363,
		weight: 0.04030746109350547,
		gater: null
	},
	{
		from: 170,
		to: 364,
		weight: 0.04141014079887087,
		gater: null
	},
	{
		from: 170,
		to: 365,
		weight: -0.09719579200825867,
		gater: null
	},
	{
		from: 170,
		to: 366,
		weight: -0.024772859933577113,
		gater: null
	},
	{
		from: 170,
		to: 367,
		weight: -0.010583045541914388,
		gater: null
	},
	{
		from: 170,
		to: 368,
		weight: -0.05375637805034175,
		gater: null
	},
	{
		from: 170,
		to: 369,
		weight: 0.0948972033168983,
		gater: null
	},
	{
		from: 170,
		to: 370,
		weight: 0.02159316261158603,
		gater: null
	},
	{
		from: 170,
		to: 371,
		weight: -0.059142317266710626,
		gater: null
	},
	{
		from: 170,
		to: 372,
		weight: -0.06396263930252263,
		gater: null
	},
	{
		from: 170,
		to: 373,
		weight: 0.006099929333762327,
		gater: null
	},
	{
		from: 170,
		to: 374,
		weight: -0.0733609157059533,
		gater: null
	},
	{
		from: 170,
		to: 375,
		weight: -0.010373922346429643,
		gater: null
	},
	{
		from: 170,
		to: 376,
		weight: 0.09348238901154216,
		gater: null
	},
	{
		from: 170,
		to: 377,
		weight: 0.034552625795785386,
		gater: null
	},
	{
		from: 170,
		to: 378,
		weight: -0.04786606867955628,
		gater: null
	},
	{
		from: 170,
		to: 379,
		weight: -0.0015652027450635264,
		gater: null
	},
	{
		from: 171,
		to: 360,
		weight: 0.03491643783266318,
		gater: null
	},
	{
		from: 171,
		to: 361,
		weight: 0.06048693929786114,
		gater: null
	},
	{
		from: 171,
		to: 362,
		weight: 0.05296154874531789,
		gater: null
	},
	{
		from: 171,
		to: 363,
		weight: -0.06695850344343564,
		gater: null
	},
	{
		from: 171,
		to: 364,
		weight: -0.08954672381356361,
		gater: null
	},
	{
		from: 171,
		to: 365,
		weight: -0.02256237208861167,
		gater: null
	},
	{
		from: 171,
		to: 366,
		weight: -0.02580659572060183,
		gater: null
	},
	{
		from: 171,
		to: 367,
		weight: -0.011087053251781234,
		gater: null
	},
	{
		from: 171,
		to: 368,
		weight: -0.03518782272050239,
		gater: null
	},
	{
		from: 171,
		to: 369,
		weight: -0.08708061103728526,
		gater: null
	},
	{
		from: 171,
		to: 370,
		weight: 0.06143374650450317,
		gater: null
	},
	{
		from: 171,
		to: 371,
		weight: -0.07951023155704254,
		gater: null
	},
	{
		from: 171,
		to: 372,
		weight: -0.055874685353991586,
		gater: null
	},
	{
		from: 171,
		to: 373,
		weight: 0.002449728018315153,
		gater: null
	},
	{
		from: 171,
		to: 374,
		weight: 0.0689173045279746,
		gater: null
	},
	{
		from: 171,
		to: 375,
		weight: -0.008188673961109366,
		gater: null
	},
	{
		from: 171,
		to: 376,
		weight: -0.04634858456497355,
		gater: null
	},
	{
		from: 171,
		to: 377,
		weight: 0.07530338616318738,
		gater: null
	},
	{
		from: 171,
		to: 378,
		weight: 0.01455347611879762,
		gater: null
	},
	{
		from: 171,
		to: 379,
		weight: 0.01530283385012754,
		gater: null
	},
	{
		from: 172,
		to: 360,
		weight: 0.003888381359271567,
		gater: null
	},
	{
		from: 172,
		to: 361,
		weight: -0.03080283078229927,
		gater: null
	},
	{
		from: 172,
		to: 362,
		weight: -0.0023687267264246026,
		gater: null
	},
	{
		from: 172,
		to: 363,
		weight: 0.024062001868144375,
		gater: null
	},
	{
		from: 172,
		to: 364,
		weight: -0.07416875348685537,
		gater: null
	},
	{
		from: 172,
		to: 365,
		weight: 0.08324790418755157,
		gater: null
	},
	{
		from: 172,
		to: 366,
		weight: -0.06650952121620564,
		gater: null
	},
	{
		from: 172,
		to: 367,
		weight: 0.03600412451549043,
		gater: null
	},
	{
		from: 172,
		to: 368,
		weight: -0.09286552753694269,
		gater: null
	},
	{
		from: 172,
		to: 369,
		weight: -0.09766048704088322,
		gater: null
	},
	{
		from: 172,
		to: 370,
		weight: -0.04175434882213805,
		gater: null
	},
	{
		from: 172,
		to: 371,
		weight: -0.029000495535239243,
		gater: null
	},
	{
		from: 172,
		to: 372,
		weight: -0.06709239288674601,
		gater: null
	},
	{
		from: 172,
		to: 373,
		weight: -0.06409538091265046,
		gater: null
	},
	{
		from: 172,
		to: 374,
		weight: -0.08123864979215911,
		gater: null
	},
	{
		from: 172,
		to: 375,
		weight: -0.05894957157281438,
		gater: null
	},
	{
		from: 172,
		to: 376,
		weight: -0.014130179492490319,
		gater: null
	},
	{
		from: 172,
		to: 377,
		weight: -0.0248375493813838,
		gater: null
	},
	{
		from: 172,
		to: 378,
		weight: -0.01924585507244317,
		gater: null
	},
	{
		from: 172,
		to: 379,
		weight: 0.013382992905573987,
		gater: null
	},
	{
		from: 173,
		to: 360,
		weight: -0.019711072310841838,
		gater: null
	},
	{
		from: 173,
		to: 361,
		weight: 0.017168184828881213,
		gater: null
	},
	{
		from: 173,
		to: 362,
		weight: 0.08680914024363269,
		gater: null
	},
	{
		from: 173,
		to: 363,
		weight: 0.09696235616024622,
		gater: null
	},
	{
		from: 173,
		to: 364,
		weight: 0.05241123259226836,
		gater: null
	},
	{
		from: 173,
		to: 365,
		weight: -0.07935589389341448,
		gater: null
	},
	{
		from: 173,
		to: 366,
		weight: -0.061133091489854165,
		gater: null
	},
	{
		from: 173,
		to: 367,
		weight: 0.0027392675990998384,
		gater: null
	},
	{
		from: 173,
		to: 368,
		weight: 0.09727978986015068,
		gater: null
	},
	{
		from: 173,
		to: 369,
		weight: -0.07505523106417052,
		gater: null
	},
	{
		from: 173,
		to: 370,
		weight: -0.02551752728140154,
		gater: null
	},
	{
		from: 173,
		to: 371,
		weight: -0.028634926315362644,
		gater: null
	},
	{
		from: 173,
		to: 372,
		weight: -0.04993379169705858,
		gater: null
	},
	{
		from: 173,
		to: 373,
		weight: 0.07737901702138927,
		gater: null
	},
	{
		from: 173,
		to: 374,
		weight: 0.017152595535793895,
		gater: null
	},
	{
		from: 173,
		to: 375,
		weight: -0.002471070284982194,
		gater: null
	},
	{
		from: 173,
		to: 376,
		weight: 0.08987939262310914,
		gater: null
	},
	{
		from: 173,
		to: 377,
		weight: -0.02385458449843339,
		gater: null
	},
	{
		from: 173,
		to: 378,
		weight: -0.03849014898724,
		gater: null
	},
	{
		from: 173,
		to: 379,
		weight: 0.020565637762835126,
		gater: null
	},
	{
		from: 174,
		to: 360,
		weight: 0.09194735506484589,
		gater: null
	},
	{
		from: 174,
		to: 361,
		weight: -0.03023555279581243,
		gater: null
	},
	{
		from: 174,
		to: 362,
		weight: -0.007233307784221446,
		gater: null
	},
	{
		from: 174,
		to: 363,
		weight: 0.09288163962825546,
		gater: null
	},
	{
		from: 174,
		to: 364,
		weight: -0.0424241237113566,
		gater: null
	},
	{
		from: 174,
		to: 365,
		weight: 0.024732451417285833,
		gater: null
	},
	{
		from: 174,
		to: 366,
		weight: 0.08626774355888536,
		gater: null
	},
	{
		from: 174,
		to: 367,
		weight: -0.0989209013767472,
		gater: null
	},
	{
		from: 174,
		to: 368,
		weight: -0.05574179074545276,
		gater: null
	},
	{
		from: 174,
		to: 369,
		weight: 0.040106761856779416,
		gater: null
	},
	{
		from: 174,
		to: 370,
		weight: 0.07853804888209256,
		gater: null
	},
	{
		from: 174,
		to: 371,
		weight: -0.03244652971006544,
		gater: null
	},
	{
		from: 174,
		to: 372,
		weight: 0.004987719223115583,
		gater: null
	},
	{
		from: 174,
		to: 373,
		weight: 0.08270636119833488,
		gater: null
	},
	{
		from: 174,
		to: 374,
		weight: -0.04911376564175845,
		gater: null
	},
	{
		from: 174,
		to: 375,
		weight: -0.029537677797001602,
		gater: null
	},
	{
		from: 174,
		to: 376,
		weight: -0.08914313465911419,
		gater: null
	},
	{
		from: 174,
		to: 377,
		weight: -0.07322939488551024,
		gater: null
	},
	{
		from: 174,
		to: 378,
		weight: -0.0928588133216961,
		gater: null
	},
	{
		from: 174,
		to: 379,
		weight: 0.06259758285942227,
		gater: null
	},
	{
		from: 175,
		to: 360,
		weight: 0.08993531958039855,
		gater: null
	},
	{
		from: 175,
		to: 361,
		weight: 0.040849264141018804,
		gater: null
	},
	{
		from: 175,
		to: 362,
		weight: 0.09857314210031701,
		gater: null
	},
	{
		from: 175,
		to: 363,
		weight: 0.0073765453128571,
		gater: null
	},
	{
		from: 175,
		to: 364,
		weight: 0.06689867414816053,
		gater: null
	},
	{
		from: 175,
		to: 365,
		weight: -0.04754154590917401,
		gater: null
	},
	{
		from: 175,
		to: 366,
		weight: -0.07386830251853232,
		gater: null
	},
	{
		from: 175,
		to: 367,
		weight: 0.07215651975749973,
		gater: null
	},
	{
		from: 175,
		to: 368,
		weight: 0.012062050815312905,
		gater: null
	},
	{
		from: 175,
		to: 369,
		weight: -0.0776220900625627,
		gater: null
	},
	{
		from: 175,
		to: 370,
		weight: 0.09696951696702866,
		gater: null
	},
	{
		from: 175,
		to: 371,
		weight: 0.056108932358618496,
		gater: null
	},
	{
		from: 175,
		to: 372,
		weight: -0.06657265095521972,
		gater: null
	},
	{
		from: 175,
		to: 373,
		weight: 0.0997723468089518,
		gater: null
	},
	{
		from: 175,
		to: 374,
		weight: -0.035212695362577054,
		gater: null
	},
	{
		from: 175,
		to: 375,
		weight: -0.007523317026446152,
		gater: null
	},
	{
		from: 175,
		to: 376,
		weight: -0.07260875697735103,
		gater: null
	},
	{
		from: 175,
		to: 377,
		weight: 0.04255650139679007,
		gater: null
	},
	{
		from: 175,
		to: 378,
		weight: -0.04955659339149552,
		gater: null
	},
	{
		from: 175,
		to: 379,
		weight: 0.06414597556794965,
		gater: null
	},
	{
		from: 176,
		to: 360,
		weight: 0.06383998921331988,
		gater: null
	},
	{
		from: 176,
		to: 361,
		weight: 0.02428283330067367,
		gater: null
	},
	{
		from: 176,
		to: 362,
		weight: 0.07442297727651273,
		gater: null
	},
	{
		from: 176,
		to: 363,
		weight: -0.032621385950436066,
		gater: null
	},
	{
		from: 176,
		to: 364,
		weight: 0.013812383791021385,
		gater: null
	},
	{
		from: 176,
		to: 365,
		weight: 0.06452898736902354,
		gater: null
	},
	{
		from: 176,
		to: 366,
		weight: 0.09987423328207218,
		gater: null
	},
	{
		from: 176,
		to: 367,
		weight: 0.07138894323016998,
		gater: null
	},
	{
		from: 176,
		to: 368,
		weight: 0.01446377725494559,
		gater: null
	},
	{
		from: 176,
		to: 369,
		weight: 0.052699802861659206,
		gater: null
	},
	{
		from: 176,
		to: 370,
		weight: -0.06460163599282467,
		gater: null
	},
	{
		from: 176,
		to: 371,
		weight: -0.00473615972465273,
		gater: null
	},
	{
		from: 176,
		to: 372,
		weight: 0.017003483613465334,
		gater: null
	},
	{
		from: 176,
		to: 373,
		weight: 0.015523902386841912,
		gater: null
	},
	{
		from: 176,
		to: 374,
		weight: -0.09231455450899394,
		gater: null
	},
	{
		from: 176,
		to: 375,
		weight: 0.0584410353524841,
		gater: null
	},
	{
		from: 176,
		to: 376,
		weight: -0.08170418193597034,
		gater: null
	},
	{
		from: 176,
		to: 377,
		weight: -0.03169388688998778,
		gater: null
	},
	{
		from: 176,
		to: 378,
		weight: 0.08883800327191402,
		gater: null
	},
	{
		from: 176,
		to: 379,
		weight: 0.07787203113337676,
		gater: null
	},
	{
		from: 177,
		to: 360,
		weight: -0.05382393083389885,
		gater: null
	},
	{
		from: 177,
		to: 361,
		weight: 0.026281982858649078,
		gater: null
	},
	{
		from: 177,
		to: 362,
		weight: -0.03918957996023127,
		gater: null
	},
	{
		from: 177,
		to: 363,
		weight: 0.06671566773234505,
		gater: null
	},
	{
		from: 177,
		to: 364,
		weight: 0.033077236870451665,
		gater: null
	},
	{
		from: 177,
		to: 365,
		weight: 0.051304812119326915,
		gater: null
	},
	{
		from: 177,
		to: 366,
		weight: 0.04122828046259305,
		gater: null
	},
	{
		from: 177,
		to: 367,
		weight: 0.0403394637270619,
		gater: null
	},
	{
		from: 177,
		to: 368,
		weight: 0.07802364750647459,
		gater: null
	},
	{
		from: 177,
		to: 369,
		weight: 0.016583952312529293,
		gater: null
	},
	{
		from: 177,
		to: 370,
		weight: 0.05803814138732416,
		gater: null
	},
	{
		from: 177,
		to: 371,
		weight: 0.017107687369551122,
		gater: null
	},
	{
		from: 177,
		to: 372,
		weight: 0.03904926911408543,
		gater: null
	},
	{
		from: 177,
		to: 373,
		weight: 0.014266311732095319,
		gater: null
	},
	{
		from: 177,
		to: 374,
		weight: 0.08370785561636182,
		gater: null
	},
	{
		from: 177,
		to: 375,
		weight: -0.05479824871052448,
		gater: null
	},
	{
		from: 177,
		to: 376,
		weight: -0.036024236100560145,
		gater: null
	},
	{
		from: 177,
		to: 377,
		weight: 0.08285514837732869,
		gater: null
	},
	{
		from: 177,
		to: 378,
		weight: 0.06382790136054456,
		gater: null
	},
	{
		from: 177,
		to: 379,
		weight: -0.04918166000115414,
		gater: null
	},
	{
		from: 178,
		to: 360,
		weight: -0.08677769072203477,
		gater: null
	},
	{
		from: 178,
		to: 361,
		weight: -0.046338688479862125,
		gater: null
	},
	{
		from: 178,
		to: 362,
		weight: 0.06167299381237031,
		gater: null
	},
	{
		from: 178,
		to: 363,
		weight: 0.0704281316867849,
		gater: null
	},
	{
		from: 178,
		to: 364,
		weight: -0.046768503293205144,
		gater: null
	},
	{
		from: 178,
		to: 365,
		weight: -0.06795233150956102,
		gater: null
	},
	{
		from: 178,
		to: 366,
		weight: 0.0505525155727594,
		gater: null
	},
	{
		from: 178,
		to: 367,
		weight: 0.007951165930031664,
		gater: null
	},
	{
		from: 178,
		to: 368,
		weight: 0.08705844144062141,
		gater: null
	},
	{
		from: 178,
		to: 369,
		weight: 0.03502708373405523,
		gater: null
	},
	{
		from: 178,
		to: 370,
		weight: -0.0007803249547911542,
		gater: null
	},
	{
		from: 178,
		to: 371,
		weight: 0.06154301138177882,
		gater: null
	},
	{
		from: 178,
		to: 372,
		weight: 0.04975251265541725,
		gater: null
	},
	{
		from: 178,
		to: 373,
		weight: -0.04998290823447751,
		gater: null
	},
	{
		from: 178,
		to: 374,
		weight: 0.015606023749213866,
		gater: null
	},
	{
		from: 178,
		to: 375,
		weight: -0.08949572307951814,
		gater: null
	},
	{
		from: 178,
		to: 376,
		weight: -0.09725197941130494,
		gater: null
	},
	{
		from: 178,
		to: 377,
		weight: -0.0059096677440156715,
		gater: null
	},
	{
		from: 178,
		to: 378,
		weight: -0.09151326137423949,
		gater: null
	},
	{
		from: 178,
		to: 379,
		weight: -0.08482589339388508,
		gater: null
	},
	{
		from: 179,
		to: 360,
		weight: 0.010840760958176538,
		gater: null
	},
	{
		from: 179,
		to: 361,
		weight: -0.009957376682785053,
		gater: null
	},
	{
		from: 179,
		to: 362,
		weight: -0.027870927488774747,
		gater: null
	},
	{
		from: 179,
		to: 363,
		weight: -0.08622217192931839,
		gater: null
	},
	{
		from: 179,
		to: 364,
		weight: 0.06182579218105151,
		gater: null
	},
	{
		from: 179,
		to: 365,
		weight: 0.07557151642773854,
		gater: null
	},
	{
		from: 179,
		to: 366,
		weight: -0.013406212290476272,
		gater: null
	},
	{
		from: 179,
		to: 367,
		weight: -0.046249216397165824,
		gater: null
	},
	{
		from: 179,
		to: 368,
		weight: 0.09819863834885004,
		gater: null
	},
	{
		from: 179,
		to: 369,
		weight: 0.00217653034766643,
		gater: null
	},
	{
		from: 179,
		to: 370,
		weight: 0.009735978512008941,
		gater: null
	},
	{
		from: 179,
		to: 371,
		weight: -0.010775458740190489,
		gater: null
	},
	{
		from: 179,
		to: 372,
		weight: -0.006154364366285596,
		gater: null
	},
	{
		from: 179,
		to: 373,
		weight: -0.05900139557545692,
		gater: null
	},
	{
		from: 179,
		to: 374,
		weight: -0.012789154461060371,
		gater: null
	},
	{
		from: 179,
		to: 375,
		weight: 0.0999539488029417,
		gater: null
	},
	{
		from: 179,
		to: 376,
		weight: -0.09273251189116054,
		gater: null
	},
	{
		from: 179,
		to: 377,
		weight: 0.006581987892048423,
		gater: null
	},
	{
		from: 179,
		to: 378,
		weight: 0.03037285713472814,
		gater: null
	},
	{
		from: 179,
		to: 379,
		weight: 0.03523104419088901,
		gater: null
	},
	{
		from: 180,
		to: 360,
		weight: 0.08986470310360625,
		gater: null
	},
	{
		from: 180,
		to: 361,
		weight: -0.08098236808614026,
		gater: null
	},
	{
		from: 180,
		to: 362,
		weight: -0.06535465591208878,
		gater: null
	},
	{
		from: 180,
		to: 363,
		weight: -0.04940014787490399,
		gater: null
	},
	{
		from: 180,
		to: 364,
		weight: 0.05392101502774388,
		gater: null
	},
	{
		from: 180,
		to: 365,
		weight: 0.08002503178328135,
		gater: null
	},
	{
		from: 180,
		to: 366,
		weight: -0.07050702593884282,
		gater: null
	},
	{
		from: 180,
		to: 367,
		weight: 0.06466911805781198,
		gater: null
	},
	{
		from: 180,
		to: 368,
		weight: 0.04421839627398247,
		gater: null
	},
	{
		from: 180,
		to: 369,
		weight: 0.02035321437305293,
		gater: null
	},
	{
		from: 180,
		to: 370,
		weight: 0.03557475387626757,
		gater: null
	},
	{
		from: 180,
		to: 371,
		weight: -0.02818279925611762,
		gater: null
	},
	{
		from: 180,
		to: 372,
		weight: 0.03353967126581736,
		gater: null
	},
	{
		from: 180,
		to: 373,
		weight: 0.016279403418337376,
		gater: null
	},
	{
		from: 180,
		to: 374,
		weight: -0.0008690767549572875,
		gater: null
	},
	{
		from: 180,
		to: 375,
		weight: -0.04206787066717799,
		gater: null
	},
	{
		from: 180,
		to: 376,
		weight: 0.006188649853924269,
		gater: null
	},
	{
		from: 180,
		to: 377,
		weight: -0.07950016590089298,
		gater: null
	},
	{
		from: 180,
		to: 378,
		weight: 0.07028341052510761,
		gater: null
	},
	{
		from: 180,
		to: 379,
		weight: -0.07134899194793132,
		gater: null
	},
	{
		from: 181,
		to: 360,
		weight: -0.024779005906087018,
		gater: null
	},
	{
		from: 181,
		to: 361,
		weight: -0.0008157425964869375,
		gater: null
	},
	{
		from: 181,
		to: 362,
		weight: -0.002306565058452212,
		gater: null
	},
	{
		from: 181,
		to: 363,
		weight: 0.057143812182942455,
		gater: null
	},
	{
		from: 181,
		to: 364,
		weight: -0.04590811982375405,
		gater: null
	},
	{
		from: 181,
		to: 365,
		weight: 0.06083276492474052,
		gater: null
	},
	{
		from: 181,
		to: 366,
		weight: 0.04759490871564709,
		gater: null
	},
	{
		from: 181,
		to: 367,
		weight: -0.034497794804156046,
		gater: null
	},
	{
		from: 181,
		to: 368,
		weight: 0.0808695984150051,
		gater: null
	},
	{
		from: 181,
		to: 369,
		weight: 0.07678025763980001,
		gater: null
	},
	{
		from: 181,
		to: 370,
		weight: -0.09661434362755683,
		gater: null
	},
	{
		from: 181,
		to: 371,
		weight: 0.033438504640040556,
		gater: null
	},
	{
		from: 181,
		to: 372,
		weight: -0.0421547007400597,
		gater: null
	},
	{
		from: 181,
		to: 373,
		weight: -0.08459166261485862,
		gater: null
	},
	{
		from: 181,
		to: 374,
		weight: -0.00786709075861762,
		gater: null
	},
	{
		from: 181,
		to: 375,
		weight: 0.04177016262091482,
		gater: null
	},
	{
		from: 181,
		to: 376,
		weight: 0.012881832143261551,
		gater: null
	},
	{
		from: 181,
		to: 377,
		weight: 0.036329010528383776,
		gater: null
	},
	{
		from: 181,
		to: 378,
		weight: -0.08267342973351038,
		gater: null
	},
	{
		from: 181,
		to: 379,
		weight: 0.08301726603965612,
		gater: null
	},
	{
		from: 182,
		to: 360,
		weight: -0.06613253195345507,
		gater: null
	},
	{
		from: 182,
		to: 361,
		weight: 0.059296057373515,
		gater: null
	},
	{
		from: 182,
		to: 362,
		weight: 0.03714914497487234,
		gater: null
	},
	{
		from: 182,
		to: 363,
		weight: -0.04089021992035794,
		gater: null
	},
	{
		from: 182,
		to: 364,
		weight: -0.07173787793772492,
		gater: null
	},
	{
		from: 182,
		to: 365,
		weight: -0.04063915342634482,
		gater: null
	},
	{
		from: 182,
		to: 366,
		weight: 0.035873911670409056,
		gater: null
	},
	{
		from: 182,
		to: 367,
		weight: 0.0875093294704682,
		gater: null
	},
	{
		from: 182,
		to: 368,
		weight: 0.06785309413635432,
		gater: null
	},
	{
		from: 182,
		to: 369,
		weight: 0.03107492246541359,
		gater: null
	},
	{
		from: 182,
		to: 370,
		weight: -0.04292316665433095,
		gater: null
	},
	{
		from: 182,
		to: 371,
		weight: -0.09901095354044341,
		gater: null
	},
	{
		from: 182,
		to: 372,
		weight: -0.07467262059082276,
		gater: null
	},
	{
		from: 182,
		to: 373,
		weight: 0.07477536041722921,
		gater: null
	},
	{
		from: 182,
		to: 374,
		weight: -0.0055812131575179,
		gater: null
	},
	{
		from: 182,
		to: 375,
		weight: -0.05138778407594921,
		gater: null
	},
	{
		from: 182,
		to: 376,
		weight: 0.03763394575771327,
		gater: null
	},
	{
		from: 182,
		to: 377,
		weight: 0.044071443800415874,
		gater: null
	},
	{
		from: 182,
		to: 378,
		weight: -0.09210095244077893,
		gater: null
	},
	{
		from: 182,
		to: 379,
		weight: 0.07975778895503595,
		gater: null
	},
	{
		from: 183,
		to: 360,
		weight: -0.047748009181184894,
		gater: null
	},
	{
		from: 183,
		to: 361,
		weight: -0.046268898524123116,
		gater: null
	},
	{
		from: 183,
		to: 362,
		weight: 0.04454280868191995,
		gater: null
	},
	{
		from: 183,
		to: 363,
		weight: -0.06898793366980416,
		gater: null
	},
	{
		from: 183,
		to: 364,
		weight: 0.053592376469383377,
		gater: null
	},
	{
		from: 183,
		to: 365,
		weight: 0.07059371814431645,
		gater: null
	},
	{
		from: 183,
		to: 366,
		weight: 0.042919443818355066,
		gater: null
	},
	{
		from: 183,
		to: 367,
		weight: -0.0009611874868054869,
		gater: null
	},
	{
		from: 183,
		to: 368,
		weight: 0.04851161808675669,
		gater: null
	},
	{
		from: 183,
		to: 369,
		weight: 0.033139361024509074,
		gater: null
	},
	{
		from: 183,
		to: 370,
		weight: -0.00025517675200406804,
		gater: null
	},
	{
		from: 183,
		to: 371,
		weight: -0.06419153995751756,
		gater: null
	},
	{
		from: 183,
		to: 372,
		weight: -0.017452013785684978,
		gater: null
	},
	{
		from: 183,
		to: 373,
		weight: -0.04553281784449067,
		gater: null
	},
	{
		from: 183,
		to: 374,
		weight: 0.0718547268253751,
		gater: null
	},
	{
		from: 183,
		to: 375,
		weight: -0.03838123172404426,
		gater: null
	},
	{
		from: 183,
		to: 376,
		weight: -0.008668445814616543,
		gater: null
	},
	{
		from: 183,
		to: 377,
		weight: -0.019194391997071097,
		gater: null
	},
	{
		from: 183,
		to: 378,
		weight: -0.05452216030582958,
		gater: null
	},
	{
		from: 183,
		to: 379,
		weight: -0.03256902288439744,
		gater: null
	},
	{
		from: 184,
		to: 360,
		weight: -0.023291429222579582,
		gater: null
	},
	{
		from: 184,
		to: 361,
		weight: -0.07651541076948712,
		gater: null
	},
	{
		from: 184,
		to: 362,
		weight: -0.05308882404169768,
		gater: null
	},
	{
		from: 184,
		to: 363,
		weight: 0.018360962438727323,
		gater: null
	},
	{
		from: 184,
		to: 364,
		weight: 0.028136543765365882,
		gater: null
	},
	{
		from: 184,
		to: 365,
		weight: 0.02157299357105277,
		gater: null
	},
	{
		from: 184,
		to: 366,
		weight: -0.09480818914525437,
		gater: null
	},
	{
		from: 184,
		to: 367,
		weight: 0.03642251127561056,
		gater: null
	},
	{
		from: 184,
		to: 368,
		weight: 0.003097631465336416,
		gater: null
	},
	{
		from: 184,
		to: 369,
		weight: 0.040695529295865486,
		gater: null
	},
	{
		from: 184,
		to: 370,
		weight: 0.20198213147177943,
		gater: null
	},
	{
		from: 184,
		to: 371,
		weight: 0.012549555822062481,
		gater: null
	},
	{
		from: 184,
		to: 372,
		weight: 0.17853744428633644,
		gater: null
	},
	{
		from: 184,
		to: 373,
		weight: 0.04138609112176017,
		gater: null
	},
	{
		from: 184,
		to: 374,
		weight: -0.1391657241279173,
		gater: null
	},
	{
		from: 184,
		to: 375,
		weight: -0.009316480649518814,
		gater: null
	},
	{
		from: 184,
		to: 376,
		weight: -0.09668153569733415,
		gater: null
	},
	{
		from: 184,
		to: 377,
		weight: -0.09413668062204482,
		gater: null
	},
	{
		from: 184,
		to: 378,
		weight: 0.02031387886140518,
		gater: null
	},
	{
		from: 184,
		to: 379,
		weight: 0.10811828599766482,
		gater: null
	},
	{
		from: 185,
		to: 360,
		weight: 0.062297807884612116,
		gater: null
	},
	{
		from: 185,
		to: 361,
		weight: -0.0007553014397236046,
		gater: null
	},
	{
		from: 185,
		to: 362,
		weight: 0.09371547070477187,
		gater: null
	},
	{
		from: 185,
		to: 363,
		weight: 0.020532963197009257,
		gater: null
	},
	{
		from: 185,
		to: 364,
		weight: 0.01941928893406178,
		gater: null
	},
	{
		from: 185,
		to: 365,
		weight: 0.031333984783666835,
		gater: null
	},
	{
		from: 185,
		to: 366,
		weight: 0.08454658660933709,
		gater: null
	},
	{
		from: 185,
		to: 367,
		weight: 0.031892524209176626,
		gater: null
	},
	{
		from: 185,
		to: 368,
		weight: -0.0004409605129918892,
		gater: null
	},
	{
		from: 185,
		to: 369,
		weight: -0.08009756133673021,
		gater: null
	},
	{
		from: 185,
		to: 370,
		weight: -0.07242396953569084,
		gater: null
	},
	{
		from: 185,
		to: 371,
		weight: -0.032436810074590025,
		gater: null
	},
	{
		from: 185,
		to: 372,
		weight: 0.016997347529224577,
		gater: null
	},
	{
		from: 185,
		to: 373,
		weight: -0.04426007158842951,
		gater: null
	},
	{
		from: 185,
		to: 374,
		weight: -0.08162428899053596,
		gater: null
	},
	{
		from: 185,
		to: 375,
		weight: 0.027930786958283382,
		gater: null
	},
	{
		from: 185,
		to: 376,
		weight: 0.07248663209405878,
		gater: null
	},
	{
		from: 185,
		to: 377,
		weight: 0.06723121702198731,
		gater: null
	},
	{
		from: 185,
		to: 378,
		weight: -0.07669994452379184,
		gater: null
	},
	{
		from: 185,
		to: 379,
		weight: 0.08714820417225805,
		gater: null
	},
	{
		from: 186,
		to: 360,
		weight: 0.04891559915705085,
		gater: null
	},
	{
		from: 186,
		to: 361,
		weight: -0.007147613831611194,
		gater: null
	},
	{
		from: 186,
		to: 362,
		weight: -0.06456611893033415,
		gater: null
	},
	{
		from: 186,
		to: 363,
		weight: 0.0014780028008706952,
		gater: null
	},
	{
		from: 186,
		to: 364,
		weight: 0.08429807217689197,
		gater: null
	},
	{
		from: 186,
		to: 365,
		weight: 0.005838490263995896,
		gater: null
	},
	{
		from: 186,
		to: 366,
		weight: -0.07924751049799866,
		gater: null
	},
	{
		from: 186,
		to: 367,
		weight: -0.021216748103009705,
		gater: null
	},
	{
		from: 186,
		to: 368,
		weight: 0.019542817487158096,
		gater: null
	},
	{
		from: 186,
		to: 369,
		weight: -0.08749076958089295,
		gater: null
	},
	{
		from: 186,
		to: 370,
		weight: -0.0761316457303431,
		gater: null
	},
	{
		from: 186,
		to: 371,
		weight: 0.06448171771411584,
		gater: null
	},
	{
		from: 186,
		to: 372,
		weight: 0.003211087933041673,
		gater: null
	},
	{
		from: 186,
		to: 373,
		weight: 0.010898526747148238,
		gater: null
	},
	{
		from: 186,
		to: 374,
		weight: -0.09696340463678195,
		gater: null
	},
	{
		from: 186,
		to: 375,
		weight: 0.018555518362815077,
		gater: null
	},
	{
		from: 186,
		to: 376,
		weight: -0.024302929025609196,
		gater: null
	},
	{
		from: 186,
		to: 377,
		weight: 0.022027443105954614,
		gater: null
	},
	{
		from: 186,
		to: 378,
		weight: 0.05722230819199367,
		gater: null
	},
	{
		from: 186,
		to: 379,
		weight: 0.06507979318706644,
		gater: null
	},
	{
		from: 187,
		to: 360,
		weight: 0.043668500689569095,
		gater: null
	},
	{
		from: 187,
		to: 361,
		weight: -0.04317377548157744,
		gater: null
	},
	{
		from: 187,
		to: 362,
		weight: 0.03186013885017719,
		gater: null
	},
	{
		from: 187,
		to: 363,
		weight: -0.009525362879431482,
		gater: null
	},
	{
		from: 187,
		to: 364,
		weight: 0.07926721160900124,
		gater: null
	},
	{
		from: 187,
		to: 365,
		weight: 0.054138132350550594,
		gater: null
	},
	{
		from: 187,
		to: 366,
		weight: -0.04258237700396297,
		gater: null
	},
	{
		from: 187,
		to: 367,
		weight: -0.08801072754548406,
		gater: null
	},
	{
		from: 187,
		to: 368,
		weight: 0.04727335036199057,
		gater: null
	},
	{
		from: 187,
		to: 369,
		weight: 0.010961320957734472,
		gater: null
	},
	{
		from: 187,
		to: 370,
		weight: -0.03987332583356121,
		gater: null
	},
	{
		from: 187,
		to: 371,
		weight: 0.0352287757906935,
		gater: null
	},
	{
		from: 187,
		to: 372,
		weight: 0.046315494523324036,
		gater: null
	},
	{
		from: 187,
		to: 373,
		weight: -0.04443976177513558,
		gater: null
	},
	{
		from: 187,
		to: 374,
		weight: 0.023824497532502112,
		gater: null
	},
	{
		from: 187,
		to: 375,
		weight: -0.04469356967077509,
		gater: null
	},
	{
		from: 187,
		to: 376,
		weight: 0.019721091941252752,
		gater: null
	},
	{
		from: 187,
		to: 377,
		weight: 0.027988685907101768,
		gater: null
	},
	{
		from: 187,
		to: 378,
		weight: 0.09641804213047322,
		gater: null
	},
	{
		from: 187,
		to: 379,
		weight: -0.02485489966613072,
		gater: null
	},
	{
		from: 188,
		to: 360,
		weight: -0.025129322477837973,
		gater: null
	},
	{
		from: 188,
		to: 361,
		weight: 0.08816019653344323,
		gater: null
	},
	{
		from: 188,
		to: 362,
		weight: -0.022816997319128157,
		gater: null
	},
	{
		from: 188,
		to: 363,
		weight: -0.052852086315609045,
		gater: null
	},
	{
		from: 188,
		to: 364,
		weight: -0.09156540517105324,
		gater: null
	},
	{
		from: 188,
		to: 365,
		weight: 0.02174533050446452,
		gater: null
	},
	{
		from: 188,
		to: 366,
		weight: -0.007996008371027494,
		gater: null
	},
	{
		from: 188,
		to: 367,
		weight: 0.014366567056060573,
		gater: null
	},
	{
		from: 188,
		to: 368,
		weight: 0.042011987925034175,
		gater: null
	},
	{
		from: 188,
		to: 369,
		weight: 0.04881655656513426,
		gater: null
	},
	{
		from: 188,
		to: 370,
		weight: 0.026867399798300936,
		gater: null
	},
	{
		from: 188,
		to: 371,
		weight: 0.0743112448396195,
		gater: null
	},
	{
		from: 188,
		to: 372,
		weight: 0.06686255278510335,
		gater: null
	},
	{
		from: 188,
		to: 373,
		weight: 0.08767548543434171,
		gater: null
	},
	{
		from: 188,
		to: 374,
		weight: 0.02528930998122413,
		gater: null
	},
	{
		from: 188,
		to: 375,
		weight: -0.06477231636811906,
		gater: null
	},
	{
		from: 188,
		to: 376,
		weight: 0.06811864996108104,
		gater: null
	},
	{
		from: 188,
		to: 377,
		weight: 0.04078365105237855,
		gater: null
	},
	{
		from: 188,
		to: 378,
		weight: 0.017714555341771694,
		gater: null
	},
	{
		from: 188,
		to: 379,
		weight: 0.0416484683157719,
		gater: null
	},
	{
		from: 189,
		to: 360,
		weight: -0.040056450342204696,
		gater: null
	},
	{
		from: 189,
		to: 361,
		weight: -0.052338746840159045,
		gater: null
	},
	{
		from: 189,
		to: 362,
		weight: 0.01862326984212988,
		gater: null
	},
	{
		from: 189,
		to: 363,
		weight: -0.0464630286729729,
		gater: null
	},
	{
		from: 189,
		to: 364,
		weight: -0.05909443448425515,
		gater: null
	},
	{
		from: 189,
		to: 365,
		weight: -0.08310493689205926,
		gater: null
	},
	{
		from: 189,
		to: 366,
		weight: -0.06168995597550866,
		gater: null
	},
	{
		from: 189,
		to: 367,
		weight: 0.11702665687269316,
		gater: null
	},
	{
		from: 189,
		to: 368,
		weight: 0.047574357425549954,
		gater: null
	},
	{
		from: 189,
		to: 369,
		weight: 0.0026663140953100536,
		gater: null
	},
	{
		from: 189,
		to: 370,
		weight: 0.16677380413082282,
		gater: null
	},
	{
		from: 189,
		to: 371,
		weight: 0.012704625159521083,
		gater: null
	},
	{
		from: 189,
		to: 372,
		weight: 0.05318967320136423,
		gater: null
	},
	{
		from: 189,
		to: 373,
		weight: 0.08009279222937186,
		gater: null
	},
	{
		from: 189,
		to: 374,
		weight: 0.045468432630248745,
		gater: null
	},
	{
		from: 189,
		to: 375,
		weight: -0.010222450476480932,
		gater: null
	},
	{
		from: 189,
		to: 376,
		weight: -0.02034328602030417,
		gater: null
	},
	{
		from: 189,
		to: 377,
		weight: -0.04716233033758394,
		gater: null
	},
	{
		from: 189,
		to: 378,
		weight: -0.09670275131938279,
		gater: null
	},
	{
		from: 189,
		to: 379,
		weight: -0.008939140205025524,
		gater: null
	},
	{
		from: 190,
		to: 360,
		weight: -0.022383449292172654,
		gater: null
	},
	{
		from: 190,
		to: 361,
		weight: 0.031001561506673055,
		gater: null
	},
	{
		from: 190,
		to: 362,
		weight: 0.07655974607907594,
		gater: null
	},
	{
		from: 190,
		to: 363,
		weight: -0.0846113367278571,
		gater: null
	},
	{
		from: 190,
		to: 364,
		weight: 0.07269818450477906,
		gater: null
	},
	{
		from: 190,
		to: 365,
		weight: -0.026643019073200797,
		gater: null
	},
	{
		from: 190,
		to: 366,
		weight: -0.06956864626451578,
		gater: null
	},
	{
		from: 190,
		to: 367,
		weight: 0.1367678332027591,
		gater: null
	},
	{
		from: 190,
		to: 368,
		weight: -0.09877493277022813,
		gater: null
	},
	{
		from: 190,
		to: 369,
		weight: 0.07296890333821032,
		gater: null
	},
	{
		from: 190,
		to: 370,
		weight: 0.1898174826207159,
		gater: null
	},
	{
		from: 190,
		to: 371,
		weight: -0.010195573756021,
		gater: null
	},
	{
		from: 190,
		to: 372,
		weight: 0.1760928952633326,
		gater: null
	},
	{
		from: 190,
		to: 373,
		weight: -0.029367225706581724,
		gater: null
	},
	{
		from: 190,
		to: 374,
		weight: 0.07031460969515708,
		gater: null
	},
	{
		from: 190,
		to: 375,
		weight: -0.0060689734801389296,
		gater: null
	},
	{
		from: 190,
		to: 376,
		weight: -0.021139913254962873,
		gater: null
	},
	{
		from: 190,
		to: 377,
		weight: -0.021279282436524032,
		gater: null
	},
	{
		from: 190,
		to: 378,
		weight: 0.036711708500710094,
		gater: null
	},
	{
		from: 190,
		to: 379,
		weight: -0.024524475717681463,
		gater: null
	},
	{
		from: 191,
		to: 360,
		weight: 0.009688146396144631,
		gater: null
	},
	{
		from: 191,
		to: 361,
		weight: 0.06255611032063038,
		gater: null
	},
	{
		from: 191,
		to: 362,
		weight: -0.009492536072449069,
		gater: null
	},
	{
		from: 191,
		to: 363,
		weight: -0.08676755299766123,
		gater: null
	},
	{
		from: 191,
		to: 364,
		weight: 0.09411521916265317,
		gater: null
	},
	{
		from: 191,
		to: 365,
		weight: 0.06545894467185592,
		gater: null
	},
	{
		from: 191,
		to: 366,
		weight: -0.025511404180728905,
		gater: null
	},
	{
		from: 191,
		to: 367,
		weight: 0.12230573166922841,
		gater: null
	},
	{
		from: 191,
		to: 368,
		weight: -0.06917412713326639,
		gater: null
	},
	{
		from: 191,
		to: 369,
		weight: -0.053841030447613056,
		gater: null
	},
	{
		from: 191,
		to: 370,
		weight: 0.18404595446412106,
		gater: null
	},
	{
		from: 191,
		to: 371,
		weight: 0.09451693997579971,
		gater: null
	},
	{
		from: 191,
		to: 372,
		weight: 0.08362828389602509,
		gater: null
	},
	{
		from: 191,
		to: 373,
		weight: 0.06026081348819766,
		gater: null
	},
	{
		from: 191,
		to: 374,
		weight: -0.12073449902659386,
		gater: null
	},
	{
		from: 191,
		to: 375,
		weight: -0.09082160449468568,
		gater: null
	},
	{
		from: 191,
		to: 376,
		weight: -0.06497989108799948,
		gater: null
	},
	{
		from: 191,
		to: 377,
		weight: -0.029618966623289777,
		gater: null
	},
	{
		from: 191,
		to: 378,
		weight: -0.0018104207429535113,
		gater: null
	},
	{
		from: 191,
		to: 379,
		weight: 0.06210194438096319,
		gater: null
	},
	{
		from: 192,
		to: 360,
		weight: -0.013210519214680435,
		gater: null
	},
	{
		from: 192,
		to: 361,
		weight: 0.061494809603758194,
		gater: null
	},
	{
		from: 192,
		to: 362,
		weight: 0.05260569941463418,
		gater: null
	},
	{
		from: 192,
		to: 363,
		weight: -0.026169349823569818,
		gater: null
	},
	{
		from: 192,
		to: 364,
		weight: 0.01415573965431262,
		gater: null
	},
	{
		from: 192,
		to: 365,
		weight: -0.043211961714226546,
		gater: null
	},
	{
		from: 192,
		to: 366,
		weight: 0.0012515002082745706,
		gater: null
	},
	{
		from: 192,
		to: 367,
		weight: 0.04343987174715643,
		gater: null
	},
	{
		from: 192,
		to: 368,
		weight: -0.046583068306786844,
		gater: null
	},
	{
		from: 192,
		to: 369,
		weight: 0.006275821141010446,
		gater: null
	},
	{
		from: 192,
		to: 370,
		weight: -0.037021335285097726,
		gater: null
	},
	{
		from: 192,
		to: 371,
		weight: 0.024559099239831822,
		gater: null
	},
	{
		from: 192,
		to: 372,
		weight: -0.01654252403654677,
		gater: null
	},
	{
		from: 192,
		to: 373,
		weight: -0.01343313507762529,
		gater: null
	},
	{
		from: 192,
		to: 374,
		weight: 0.009236992308739117,
		gater: null
	},
	{
		from: 192,
		to: 375,
		weight: 0.09229471106219973,
		gater: null
	},
	{
		from: 192,
		to: 376,
		weight: -0.08798652975181792,
		gater: null
	},
	{
		from: 192,
		to: 377,
		weight: 0.02641338660692799,
		gater: null
	},
	{
		from: 192,
		to: 378,
		weight: -0.030556616383525793,
		gater: null
	},
	{
		from: 192,
		to: 379,
		weight: 0.02104829946733789,
		gater: null
	},
	{
		from: 193,
		to: 360,
		weight: 0.008527646639809408,
		gater: null
	},
	{
		from: 193,
		to: 361,
		weight: 0.0013763755399888286,
		gater: null
	},
	{
		from: 193,
		to: 362,
		weight: -0.02452789751286348,
		gater: null
	},
	{
		from: 193,
		to: 363,
		weight: 0.026477720461840003,
		gater: null
	},
	{
		from: 193,
		to: 364,
		weight: -0.048937885308874,
		gater: null
	},
	{
		from: 193,
		to: 365,
		weight: 0.06239972329163196,
		gater: null
	},
	{
		from: 193,
		to: 366,
		weight: 0.05367191623845299,
		gater: null
	},
	{
		from: 193,
		to: 367,
		weight: 0.184360880831491,
		gater: null
	},
	{
		from: 193,
		to: 368,
		weight: 0.07105148854865985,
		gater: null
	},
	{
		from: 193,
		to: 369,
		weight: 0.012016917216428908,
		gater: null
	},
	{
		from: 193,
		to: 370,
		weight: 0.24759838412671473,
		gater: null
	},
	{
		from: 193,
		to: 371,
		weight: 0.07487558181456133,
		gater: null
	},
	{
		from: 193,
		to: 372,
		weight: 0.03220669592621578,
		gater: null
	},
	{
		from: 193,
		to: 373,
		weight: 0.025877603961843316,
		gater: null
	},
	{
		from: 193,
		to: 374,
		weight: -0.05857716896641716,
		gater: null
	},
	{
		from: 193,
		to: 375,
		weight: 0.05766006736901936,
		gater: null
	},
	{
		from: 193,
		to: 376,
		weight: -0.0634882132379983,
		gater: null
	},
	{
		from: 193,
		to: 377,
		weight: 0.05852660687516521,
		gater: null
	},
	{
		from: 193,
		to: 378,
		weight: -0.019364828134738974,
		gater: null
	},
	{
		from: 193,
		to: 379,
		weight: 0.0831912245562381,
		gater: null
	},
	{
		from: 194,
		to: 360,
		weight: 0.061218085125019146,
		gater: null
	},
	{
		from: 194,
		to: 361,
		weight: -0.07576028404458618,
		gater: null
	},
	{
		from: 194,
		to: 362,
		weight: 0.03383655796744262,
		gater: null
	},
	{
		from: 194,
		to: 363,
		weight: -0.08681594897469254,
		gater: null
	},
	{
		from: 194,
		to: 364,
		weight: -0.07619759945599386,
		gater: null
	},
	{
		from: 194,
		to: 365,
		weight: -0.05578802743445588,
		gater: null
	},
	{
		from: 194,
		to: 366,
		weight: 0.03384746569537888,
		gater: null
	},
	{
		from: 194,
		to: 367,
		weight: -0.07600604774051739,
		gater: null
	},
	{
		from: 194,
		to: 368,
		weight: -0.03606320572335025,
		gater: null
	},
	{
		from: 194,
		to: 369,
		weight: -0.010572331413472903,
		gater: null
	},
	{
		from: 194,
		to: 370,
		weight: 0.0830784577681782,
		gater: null
	},
	{
		from: 194,
		to: 371,
		weight: -0.06488597993606555,
		gater: null
	},
	{
		from: 194,
		to: 372,
		weight: -0.09419633397796373,
		gater: null
	},
	{
		from: 194,
		to: 373,
		weight: -0.07071183812194455,
		gater: null
	},
	{
		from: 194,
		to: 374,
		weight: -0.0374315425109754,
		gater: null
	},
	{
		from: 194,
		to: 375,
		weight: 0.028186221283993954,
		gater: null
	},
	{
		from: 194,
		to: 376,
		weight: -0.06169728201448391,
		gater: null
	},
	{
		from: 194,
		to: 377,
		weight: -0.061823717673401,
		gater: null
	},
	{
		from: 194,
		to: 378,
		weight: -0.0860158365335946,
		gater: null
	},
	{
		from: 194,
		to: 379,
		weight: -0.027358235878112064,
		gater: null
	},
	{
		from: 195,
		to: 360,
		weight: 0.12061171380081644,
		gater: null
	},
	{
		from: 195,
		to: 361,
		weight: 0.006876106212516482,
		gater: null
	},
	{
		from: 195,
		to: 362,
		weight: -0.0705560118044005,
		gater: null
	},
	{
		from: 195,
		to: 363,
		weight: 0.07023465405121937,
		gater: null
	},
	{
		from: 195,
		to: 364,
		weight: 0.06886600155911234,
		gater: null
	},
	{
		from: 195,
		to: 365,
		weight: -0.04047337665322134,
		gater: null
	},
	{
		from: 195,
		to: 366,
		weight: -0.09381223350606124,
		gater: null
	},
	{
		from: 195,
		to: 367,
		weight: 0.19928040383145923,
		gater: null
	},
	{
		from: 195,
		to: 368,
		weight: 0.039186292167772536,
		gater: null
	},
	{
		from: 195,
		to: 369,
		weight: -0.04147453341303899,
		gater: null
	},
	{
		from: 195,
		to: 370,
		weight: 0.15639291929345148,
		gater: null
	},
	{
		from: 195,
		to: 371,
		weight: -0.05192250161297159,
		gater: null
	},
	{
		from: 195,
		to: 372,
		weight: 0.010631509392271298,
		gater: null
	},
	{
		from: 195,
		to: 373,
		weight: -0.025748404512251022,
		gater: null
	},
	{
		from: 195,
		to: 374,
		weight: -0.03672556935705984,
		gater: null
	},
	{
		from: 195,
		to: 375,
		weight: -0.023953217409693292,
		gater: null
	},
	{
		from: 195,
		to: 376,
		weight: -0.056238056209287776,
		gater: null
	},
	{
		from: 195,
		to: 377,
		weight: -0.08503629832047603,
		gater: null
	},
	{
		from: 195,
		to: 378,
		weight: 0.0017630219267473247,
		gater: null
	},
	{
		from: 195,
		to: 379,
		weight: -0.055612210459120695,
		gater: null
	},
	{
		from: 196,
		to: 360,
		weight: 0.008659072787032637,
		gater: null
	},
	{
		from: 196,
		to: 361,
		weight: 0.06250883672964239,
		gater: null
	},
	{
		from: 196,
		to: 362,
		weight: 0.021269757819441446,
		gater: null
	},
	{
		from: 196,
		to: 363,
		weight: 0.07354841365937537,
		gater: null
	},
	{
		from: 196,
		to: 364,
		weight: -0.04527955110065843,
		gater: null
	},
	{
		from: 196,
		to: 365,
		weight: 0.013996668401023454,
		gater: null
	},
	{
		from: 196,
		to: 366,
		weight: 0.07372897975537343,
		gater: null
	},
	{
		from: 196,
		to: 367,
		weight: -0.09710243321013663,
		gater: null
	},
	{
		from: 196,
		to: 368,
		weight: -0.027382452383042336,
		gater: null
	},
	{
		from: 196,
		to: 369,
		weight: 0.03552806129550126,
		gater: null
	},
	{
		from: 196,
		to: 370,
		weight: 0.02974871769512344,
		gater: null
	},
	{
		from: 196,
		to: 371,
		weight: 0.09334053980293722,
		gater: null
	},
	{
		from: 196,
		to: 372,
		weight: -0.06693260468706592,
		gater: null
	},
	{
		from: 196,
		to: 373,
		weight: -0.07907037925673635,
		gater: null
	},
	{
		from: 196,
		to: 374,
		weight: -0.02063285136663548,
		gater: null
	},
	{
		from: 196,
		to: 375,
		weight: 0.02483622628322761,
		gater: null
	},
	{
		from: 196,
		to: 376,
		weight: -0.08444030500683448,
		gater: null
	},
	{
		from: 196,
		to: 377,
		weight: 0.009690926371734007,
		gater: null
	},
	{
		from: 196,
		to: 378,
		weight: -0.03524569645450795,
		gater: null
	},
	{
		from: 196,
		to: 379,
		weight: -0.05327870387511267,
		gater: null
	},
	{
		from: 197,
		to: 360,
		weight: -0.017122232399290255,
		gater: null
	},
	{
		from: 197,
		to: 361,
		weight: 0.09137191248702706,
		gater: null
	},
	{
		from: 197,
		to: 362,
		weight: 0.029834034399763093,
		gater: null
	},
	{
		from: 197,
		to: 363,
		weight: -0.07761315284236497,
		gater: null
	},
	{
		from: 197,
		to: 364,
		weight: 0.060885085918628956,
		gater: null
	},
	{
		from: 197,
		to: 365,
		weight: 0.06001653581557323,
		gater: null
	},
	{
		from: 197,
		to: 366,
		weight: 0.04091859594264799,
		gater: null
	},
	{
		from: 197,
		to: 367,
		weight: -0.09424131849952651,
		gater: null
	},
	{
		from: 197,
		to: 368,
		weight: -0.04256026350460656,
		gater: null
	},
	{
		from: 197,
		to: 369,
		weight: -0.06198702612113967,
		gater: null
	},
	{
		from: 197,
		to: 370,
		weight: 0.06377687340635624,
		gater: null
	},
	{
		from: 197,
		to: 371,
		weight: -0.03692223049097221,
		gater: null
	},
	{
		from: 197,
		to: 372,
		weight: 0.038751861829284,
		gater: null
	},
	{
		from: 197,
		to: 373,
		weight: 0.05118225466424128,
		gater: null
	},
	{
		from: 197,
		to: 374,
		weight: 0.05588474968372467,
		gater: null
	},
	{
		from: 197,
		to: 375,
		weight: 0.04394722660642486,
		gater: null
	},
	{
		from: 197,
		to: 376,
		weight: -0.04547604736831521,
		gater: null
	},
	{
		from: 197,
		to: 377,
		weight: -0.030239777938371667,
		gater: null
	},
	{
		from: 197,
		to: 378,
		weight: 0.008004139877911959,
		gater: null
	},
	{
		from: 197,
		to: 379,
		weight: 0.06101526036923252,
		gater: null
	},
	{
		from: 198,
		to: 360,
		weight: -0.04361633417840763,
		gater: null
	},
	{
		from: 198,
		to: 361,
		weight: -0.06270464146352764,
		gater: null
	},
	{
		from: 198,
		to: 362,
		weight: 0.06034049579524356,
		gater: null
	},
	{
		from: 198,
		to: 363,
		weight: 0.06016280464457058,
		gater: null
	},
	{
		from: 198,
		to: 364,
		weight: -0.009226175171586928,
		gater: null
	},
	{
		from: 198,
		to: 365,
		weight: -0.048825058569660976,
		gater: null
	},
	{
		from: 198,
		to: 366,
		weight: -0.08555094689451673,
		gater: null
	},
	{
		from: 198,
		to: 367,
		weight: 0.09185803256213121,
		gater: null
	},
	{
		from: 198,
		to: 368,
		weight: -0.09699642904826918,
		gater: null
	},
	{
		from: 198,
		to: 369,
		weight: 0.08959861051915197,
		gater: null
	},
	{
		from: 198,
		to: 370,
		weight: 0.091853501875208,
		gater: null
	},
	{
		from: 198,
		to: 371,
		weight: -0.050133780464738154,
		gater: null
	},
	{
		from: 198,
		to: 372,
		weight: -0.00940193307230719,
		gater: null
	},
	{
		from: 198,
		to: 373,
		weight: -0.03148837725663993,
		gater: null
	},
	{
		from: 198,
		to: 374,
		weight: 0.0776484969943719,
		gater: null
	},
	{
		from: 198,
		to: 375,
		weight: 0.07197918462339734,
		gater: null
	},
	{
		from: 198,
		to: 376,
		weight: -0.0249372820626355,
		gater: null
	},
	{
		from: 198,
		to: 377,
		weight: -0.043358565587734654,
		gater: null
	},
	{
		from: 198,
		to: 378,
		weight: -0.03692008491768749,
		gater: null
	},
	{
		from: 198,
		to: 379,
		weight: -0.0695636718655953,
		gater: null
	},
	{
		from: 199,
		to: 360,
		weight: 0.11452546271851838,
		gater: null
	},
	{
		from: 199,
		to: 361,
		weight: -0.037380731433073605,
		gater: null
	},
	{
		from: 199,
		to: 362,
		weight: -0.02657167795588434,
		gater: null
	},
	{
		from: 199,
		to: 363,
		weight: -0.06389776098399857,
		gater: null
	},
	{
		from: 199,
		to: 364,
		weight: 0.02196415738620198,
		gater: null
	},
	{
		from: 199,
		to: 365,
		weight: 0.006879081945875926,
		gater: null
	},
	{
		from: 199,
		to: 366,
		weight: -0.029438822476728084,
		gater: null
	},
	{
		from: 199,
		to: 367,
		weight: 0.00835120360443972,
		gater: null
	},
	{
		from: 199,
		to: 368,
		weight: 0.010772481443619353,
		gater: null
	},
	{
		from: 199,
		to: 369,
		weight: 0.08717560086349803,
		gater: null
	},
	{
		from: 199,
		to: 370,
		weight: 0.14829878227417173,
		gater: null
	},
	{
		from: 199,
		to: 371,
		weight: 0.0966125406357375,
		gater: null
	},
	{
		from: 199,
		to: 372,
		weight: 0.11280216523337623,
		gater: null
	},
	{
		from: 199,
		to: 373,
		weight: 0.04813887931020381,
		gater: null
	},
	{
		from: 199,
		to: 374,
		weight: 0.08609190791723363,
		gater: null
	},
	{
		from: 199,
		to: 375,
		weight: 0.07949250780537633,
		gater: null
	},
	{
		from: 199,
		to: 376,
		weight: -0.21052269696164147,
		gater: null
	},
	{
		from: 199,
		to: 377,
		weight: 0.06762280862428431,
		gater: null
	},
	{
		from: 199,
		to: 378,
		weight: 0.09918914232994076,
		gater: null
	},
	{
		from: 199,
		to: 379,
		weight: -0.021324913452514072,
		gater: null
	},
	{
		from: 200,
		to: 360,
		weight: 0.053110691069986046,
		gater: null
	},
	{
		from: 200,
		to: 361,
		weight: 0.032374522994478766,
		gater: null
	},
	{
		from: 200,
		to: 362,
		weight: -0.05090107620603938,
		gater: null
	},
	{
		from: 200,
		to: 363,
		weight: -0.015451330094066896,
		gater: null
	},
	{
		from: 200,
		to: 364,
		weight: -0.018781761157981983,
		gater: null
	},
	{
		from: 200,
		to: 365,
		weight: -0.09138986550915633,
		gater: null
	},
	{
		from: 200,
		to: 366,
		weight: 0.0820147766525039,
		gater: null
	},
	{
		from: 200,
		to: 367,
		weight: -0.09518372592102463,
		gater: null
	},
	{
		from: 200,
		to: 368,
		weight: 0.0970224229544659,
		gater: null
	},
	{
		from: 200,
		to: 369,
		weight: -0.09197061090733905,
		gater: null
	},
	{
		from: 200,
		to: 370,
		weight: 0.021716997573947985,
		gater: null
	},
	{
		from: 200,
		to: 371,
		weight: 0.06476972569706863,
		gater: null
	},
	{
		from: 200,
		to: 372,
		weight: 0.10018333391483172,
		gater: null
	},
	{
		from: 200,
		to: 373,
		weight: -0.038716936463066544,
		gater: null
	},
	{
		from: 200,
		to: 374,
		weight: 0.017091427381232926,
		gater: null
	},
	{
		from: 200,
		to: 375,
		weight: -0.07591083431454229,
		gater: null
	},
	{
		from: 200,
		to: 376,
		weight: 0.0767269735038989,
		gater: null
	},
	{
		from: 200,
		to: 377,
		weight: 0.04842114319302488,
		gater: null
	},
	{
		from: 200,
		to: 378,
		weight: 0.004385941724351576,
		gater: null
	},
	{
		from: 200,
		to: 379,
		weight: 0.09365627069713045,
		gater: null
	},
	{
		from: 201,
		to: 360,
		weight: -0.02133592815242421,
		gater: null
	},
	{
		from: 201,
		to: 361,
		weight: -0.006914399090047162,
		gater: null
	},
	{
		from: 201,
		to: 362,
		weight: -0.06003726630811905,
		gater: null
	},
	{
		from: 201,
		to: 363,
		weight: -0.0969369927192203,
		gater: null
	},
	{
		from: 201,
		to: 364,
		weight: -0.09978095460687991,
		gater: null
	},
	{
		from: 201,
		to: 365,
		weight: -0.059815218127544485,
		gater: null
	},
	{
		from: 201,
		to: 366,
		weight: 0.09315834142204171,
		gater: null
	},
	{
		from: 201,
		to: 367,
		weight: 0.04082587206409499,
		gater: null
	},
	{
		from: 201,
		to: 368,
		weight: -0.0071324101417740895,
		gater: null
	},
	{
		from: 201,
		to: 369,
		weight: 0.08749813493574261,
		gater: null
	},
	{
		from: 201,
		to: 370,
		weight: 0.1364203748204517,
		gater: null
	},
	{
		from: 201,
		to: 371,
		weight: 0.021736463995111466,
		gater: null
	},
	{
		from: 201,
		to: 372,
		weight: -0.09519344557853267,
		gater: null
	},
	{
		from: 201,
		to: 373,
		weight: -0.06699641149945734,
		gater: null
	},
	{
		from: 201,
		to: 374,
		weight: 0.0004907435505808333,
		gater: null
	},
	{
		from: 201,
		to: 375,
		weight: 0.005264645480674047,
		gater: null
	},
	{
		from: 201,
		to: 376,
		weight: -0.015353413270826021,
		gater: null
	},
	{
		from: 201,
		to: 377,
		weight: -0.006444965606705338,
		gater: null
	},
	{
		from: 201,
		to: 378,
		weight: -0.010137904653826375,
		gater: null
	},
	{
		from: 201,
		to: 379,
		weight: 0.02190531129024262,
		gater: null
	},
	{
		from: 202,
		to: 360,
		weight: 0.09677735566094069,
		gater: null
	},
	{
		from: 202,
		to: 361,
		weight: -0.07028350876416437,
		gater: null
	},
	{
		from: 202,
		to: 362,
		weight: 0.08684993185572802,
		gater: null
	},
	{
		from: 202,
		to: 363,
		weight: -0.029780355909782542,
		gater: null
	},
	{
		from: 202,
		to: 364,
		weight: -0.055553786518760945,
		gater: null
	},
	{
		from: 202,
		to: 365,
		weight: 0.05917146104771336,
		gater: null
	},
	{
		from: 202,
		to: 366,
		weight: -0.06875759239074854,
		gater: null
	},
	{
		from: 202,
		to: 367,
		weight: 0.08813187336764976,
		gater: null
	},
	{
		from: 202,
		to: 368,
		weight: 0.08707438690173391,
		gater: null
	},
	{
		from: 202,
		to: 369,
		weight: 0.034698162840846196,
		gater: null
	},
	{
		from: 202,
		to: 370,
		weight: 0.011026586363303614,
		gater: null
	},
	{
		from: 202,
		to: 371,
		weight: 0.002218882650578371,
		gater: null
	},
	{
		from: 202,
		to: 372,
		weight: 0.07424533194034325,
		gater: null
	},
	{
		from: 202,
		to: 373,
		weight: 0.013049257089791566,
		gater: null
	},
	{
		from: 202,
		to: 374,
		weight: -0.08171359578118005,
		gater: null
	},
	{
		from: 202,
		to: 375,
		weight: -0.06347796781268304,
		gater: null
	},
	{
		from: 202,
		to: 376,
		weight: 0.02490168517101632,
		gater: null
	},
	{
		from: 202,
		to: 377,
		weight: -0.035854171754709625,
		gater: null
	},
	{
		from: 202,
		to: 378,
		weight: -0.0019700894119717336,
		gater: null
	},
	{
		from: 202,
		to: 379,
		weight: -0.043309133516259986,
		gater: null
	},
	{
		from: 203,
		to: 360,
		weight: -0.012715399750071323,
		gater: null
	},
	{
		from: 203,
		to: 361,
		weight: -0.051861942657678614,
		gater: null
	},
	{
		from: 203,
		to: 362,
		weight: -0.07107271367767568,
		gater: null
	},
	{
		from: 203,
		to: 363,
		weight: -0.03701419692884538,
		gater: null
	},
	{
		from: 203,
		to: 364,
		weight: -0.04790288788465004,
		gater: null
	},
	{
		from: 203,
		to: 365,
		weight: 0.04136493100701066,
		gater: null
	},
	{
		from: 203,
		to: 366,
		weight: 0.015264391373167492,
		gater: null
	},
	{
		from: 203,
		to: 367,
		weight: -0.09551076990802908,
		gater: null
	},
	{
		from: 203,
		to: 368,
		weight: 0.03966574758606308,
		gater: null
	},
	{
		from: 203,
		to: 369,
		weight: 0.09033776020850226,
		gater: null
	},
	{
		from: 203,
		to: 370,
		weight: 0.02114746570955613,
		gater: null
	},
	{
		from: 203,
		to: 371,
		weight: 0.04779627578553887,
		gater: null
	},
	{
		from: 203,
		to: 372,
		weight: -0.045065559391360255,
		gater: null
	},
	{
		from: 203,
		to: 373,
		weight: -0.08473211420277382,
		gater: null
	},
	{
		from: 203,
		to: 374,
		weight: -0.10368746802331467,
		gater: null
	},
	{
		from: 203,
		to: 375,
		weight: -0.057853134275116166,
		gater: null
	},
	{
		from: 203,
		to: 376,
		weight: -0.04284720915122232,
		gater: null
	},
	{
		from: 203,
		to: 377,
		weight: 0.08030956619382353,
		gater: null
	},
	{
		from: 203,
		to: 378,
		weight: -0.05898277790075138,
		gater: null
	},
	{
		from: 203,
		to: 379,
		weight: 0.05241151999092711,
		gater: null
	},
	{
		from: 204,
		to: 360,
		weight: 0.04976632704019212,
		gater: null
	},
	{
		from: 204,
		to: 361,
		weight: -0.07433397488631123,
		gater: null
	},
	{
		from: 204,
		to: 362,
		weight: -0.015995010837322476,
		gater: null
	},
	{
		from: 204,
		to: 363,
		weight: -0.0981538233908452,
		gater: null
	},
	{
		from: 204,
		to: 364,
		weight: 0.0011681948986627946,
		gater: null
	},
	{
		from: 204,
		to: 365,
		weight: 0.002280114813827947,
		gater: null
	},
	{
		from: 204,
		to: 366,
		weight: 0.03679790259095704,
		gater: null
	},
	{
		from: 204,
		to: 367,
		weight: 0.008522968305105716,
		gater: null
	},
	{
		from: 204,
		to: 368,
		weight: -0.02608263731222727,
		gater: null
	},
	{
		from: 204,
		to: 369,
		weight: -0.027663308497960663,
		gater: null
	},
	{
		from: 204,
		to: 370,
		weight: -0.027815668954558854,
		gater: null
	},
	{
		from: 204,
		to: 371,
		weight: -0.053053008738760746,
		gater: null
	},
	{
		from: 204,
		to: 372,
		weight: 0.012406903034554911,
		gater: null
	},
	{
		from: 204,
		to: 373,
		weight: 0.03240083177980682,
		gater: null
	},
	{
		from: 204,
		to: 374,
		weight: 0.08967091514555363,
		gater: null
	},
	{
		from: 204,
		to: 375,
		weight: -0.01717854332260997,
		gater: null
	},
	{
		from: 204,
		to: 376,
		weight: -0.012344101886844575,
		gater: null
	},
	{
		from: 204,
		to: 377,
		weight: -0.014408338158948871,
		gater: null
	},
	{
		from: 204,
		to: 378,
		weight: 0.047832015923447116,
		gater: null
	},
	{
		from: 204,
		to: 379,
		weight: -0.05584827499734663,
		gater: null
	},
	{
		from: 205,
		to: 360,
		weight: 0.0337082192565969,
		gater: null
	},
	{
		from: 205,
		to: 361,
		weight: -0.021897651072796717,
		gater: null
	},
	{
		from: 205,
		to: 362,
		weight: -0.08088657246594537,
		gater: null
	},
	{
		from: 205,
		to: 363,
		weight: 0.07521777901241912,
		gater: null
	},
	{
		from: 205,
		to: 364,
		weight: -0.04903723237543117,
		gater: null
	},
	{
		from: 205,
		to: 365,
		weight: -0.0680581401002156,
		gater: null
	},
	{
		from: 205,
		to: 366,
		weight: 0.08091465864296349,
		gater: null
	},
	{
		from: 205,
		to: 367,
		weight: 0.002939067364953368,
		gater: null
	},
	{
		from: 205,
		to: 368,
		weight: -0.04692012849909005,
		gater: null
	},
	{
		from: 205,
		to: 369,
		weight: -0.014983562417311292,
		gater: null
	},
	{
		from: 205,
		to: 370,
		weight: 0.1372262135927403,
		gater: null
	},
	{
		from: 205,
		to: 371,
		weight: 0.04587892012164713,
		gater: null
	},
	{
		from: 205,
		to: 372,
		weight: -0.08262938354966971,
		gater: null
	},
	{
		from: 205,
		to: 373,
		weight: 0.012216954274648143,
		gater: null
	},
	{
		from: 205,
		to: 374,
		weight: -0.0020804622326890685,
		gater: null
	},
	{
		from: 205,
		to: 375,
		weight: -0.04877496355405661,
		gater: null
	},
	{
		from: 205,
		to: 376,
		weight: 0.01956278065752104,
		gater: null
	},
	{
		from: 205,
		to: 377,
		weight: -0.04980385691682599,
		gater: null
	},
	{
		from: 205,
		to: 378,
		weight: -0.09606542425435721,
		gater: null
	},
	{
		from: 205,
		to: 379,
		weight: -0.01755129895957354,
		gater: null
	},
	{
		from: 206,
		to: 360,
		weight: 0.12873520627057314,
		gater: null
	},
	{
		from: 206,
		to: 361,
		weight: -0.04975890287647235,
		gater: null
	},
	{
		from: 206,
		to: 362,
		weight: -0.023398768753535477,
		gater: null
	},
	{
		from: 206,
		to: 363,
		weight: 0.015328687280651197,
		gater: null
	},
	{
		from: 206,
		to: 364,
		weight: -0.056074029798565336,
		gater: null
	},
	{
		from: 206,
		to: 365,
		weight: -0.019891788010459346,
		gater: null
	},
	{
		from: 206,
		to: 366,
		weight: 0.04420017281015206,
		gater: null
	},
	{
		from: 206,
		to: 367,
		weight: 0.14394819327293143,
		gater: null
	},
	{
		from: 206,
		to: 368,
		weight: 0.09490613712989586,
		gater: null
	},
	{
		from: 206,
		to: 369,
		weight: -0.00958743093111283,
		gater: null
	},
	{
		from: 206,
		to: 370,
		weight: 0.30003354035065566,
		gater: null
	},
	{
		from: 206,
		to: 371,
		weight: 0.024536813333852634,
		gater: null
	},
	{
		from: 206,
		to: 372,
		weight: 0.15154753425481116,
		gater: null
	},
	{
		from: 206,
		to: 373,
		weight: 0.00402578804686799,
		gater: null
	},
	{
		from: 206,
		to: 374,
		weight: -0.1420021266336509,
		gater: null
	},
	{
		from: 206,
		to: 375,
		weight: 0.0024426825927248872,
		gater: null
	},
	{
		from: 206,
		to: 376,
		weight: -0.17645065579003769,
		gater: null
	},
	{
		from: 206,
		to: 377,
		weight: 0.04919384332313751,
		gater: null
	},
	{
		from: 206,
		to: 378,
		weight: 0.047606373352266945,
		gater: null
	},
	{
		from: 206,
		to: 379,
		weight: 0.058744115679737516,
		gater: null
	},
	{
		from: 207,
		to: 360,
		weight: 0.07540414047455585,
		gater: null
	},
	{
		from: 207,
		to: 361,
		weight: 0.07296134928925363,
		gater: null
	},
	{
		from: 207,
		to: 362,
		weight: -0.08563043310752123,
		gater: null
	},
	{
		from: 207,
		to: 363,
		weight: -0.0009799788477168614,
		gater: null
	},
	{
		from: 207,
		to: 364,
		weight: 0.013529011378451278,
		gater: null
	},
	{
		from: 207,
		to: 365,
		weight: -0.077500144695727,
		gater: null
	},
	{
		from: 207,
		to: 366,
		weight: -0.08449637159678147,
		gater: null
	},
	{
		from: 207,
		to: 367,
		weight: -0.040468049732738015,
		gater: null
	},
	{
		from: 207,
		to: 368,
		weight: -0.0029802241568158,
		gater: null
	},
	{
		from: 207,
		to: 369,
		weight: 0.0379382250121148,
		gater: null
	},
	{
		from: 207,
		to: 370,
		weight: 0.01504758320365536,
		gater: null
	},
	{
		from: 207,
		to: 371,
		weight: -0.09694581299759744,
		gater: null
	},
	{
		from: 207,
		to: 372,
		weight: -0.08963917702276443,
		gater: null
	},
	{
		from: 207,
		to: 373,
		weight: 0.04873426512935125,
		gater: null
	},
	{
		from: 207,
		to: 374,
		weight: -0.02673325921420587,
		gater: null
	},
	{
		from: 207,
		to: 375,
		weight: 0.08726553155841837,
		gater: null
	},
	{
		from: 207,
		to: 376,
		weight: -0.04282218752032718,
		gater: null
	},
	{
		from: 207,
		to: 377,
		weight: 0.08668602946036189,
		gater: null
	},
	{
		from: 207,
		to: 378,
		weight: 0.09399042894300488,
		gater: null
	},
	{
		from: 207,
		to: 379,
		weight: -0.096340847623817,
		gater: null
	},
	{
		from: 208,
		to: 360,
		weight: -0.07609565477871603,
		gater: null
	},
	{
		from: 208,
		to: 361,
		weight: 0.0703612980401343,
		gater: null
	},
	{
		from: 208,
		to: 362,
		weight: -0.04397336954453582,
		gater: null
	},
	{
		from: 208,
		to: 363,
		weight: -0.03583951290994651,
		gater: null
	},
	{
		from: 208,
		to: 364,
		weight: -0.04071726047245577,
		gater: null
	},
	{
		from: 208,
		to: 365,
		weight: 0.052010365287057075,
		gater: null
	},
	{
		from: 208,
		to: 366,
		weight: -0.03279018708202845,
		gater: null
	},
	{
		from: 208,
		to: 367,
		weight: 0.07425385574400709,
		gater: null
	},
	{
		from: 208,
		to: 368,
		weight: -0.03375101221197156,
		gater: null
	},
	{
		from: 208,
		to: 369,
		weight: 0.018739834313459797,
		gater: null
	},
	{
		from: 208,
		to: 370,
		weight: -0.002159017982043071,
		gater: null
	},
	{
		from: 208,
		to: 371,
		weight: -0.02040928592869888,
		gater: null
	},
	{
		from: 208,
		to: 372,
		weight: -0.07859148270574567,
		gater: null
	},
	{
		from: 208,
		to: 373,
		weight: -0.08529713296035753,
		gater: null
	},
	{
		from: 208,
		to: 374,
		weight: -0.048779324812155835,
		gater: null
	},
	{
		from: 208,
		to: 375,
		weight: -0.00624086298363094,
		gater: null
	},
	{
		from: 208,
		to: 376,
		weight: 0.042339241886233114,
		gater: null
	},
	{
		from: 208,
		to: 377,
		weight: -0.028023448653645436,
		gater: null
	},
	{
		from: 208,
		to: 378,
		weight: 0.06686219690640077,
		gater: null
	},
	{
		from: 208,
		to: 379,
		weight: -0.09167972704071779,
		gater: null
	},
	{
		from: 209,
		to: 360,
		weight: -0.09716055002989364,
		gater: null
	},
	{
		from: 209,
		to: 361,
		weight: 0.09139540158195955,
		gater: null
	},
	{
		from: 209,
		to: 362,
		weight: 0.017561969431935373,
		gater: null
	},
	{
		from: 209,
		to: 363,
		weight: -0.006126383044697148,
		gater: null
	},
	{
		from: 209,
		to: 364,
		weight: 0.08105203890574117,
		gater: null
	},
	{
		from: 209,
		to: 365,
		weight: -0.09695426084267478,
		gater: null
	},
	{
		from: 209,
		to: 366,
		weight: -0.06199739151334809,
		gater: null
	},
	{
		from: 209,
		to: 367,
		weight: -0.020394485155548786,
		gater: null
	},
	{
		from: 209,
		to: 368,
		weight: 0.048838842894638385,
		gater: null
	},
	{
		from: 209,
		to: 369,
		weight: 0.08584222604444403,
		gater: null
	},
	{
		from: 209,
		to: 370,
		weight: -0.04602160055712608,
		gater: null
	},
	{
		from: 209,
		to: 371,
		weight: 0.06273414411473435,
		gater: null
	},
	{
		from: 209,
		to: 372,
		weight: -0.06147697041447016,
		gater: null
	},
	{
		from: 209,
		to: 373,
		weight: 0.0368925412411813,
		gater: null
	},
	{
		from: 209,
		to: 374,
		weight: 0.023782923983938303,
		gater: null
	},
	{
		from: 209,
		to: 375,
		weight: -0.05938345886919767,
		gater: null
	},
	{
		from: 209,
		to: 376,
		weight: -0.05731363651273558,
		gater: null
	},
	{
		from: 209,
		to: 377,
		weight: 0.08286559659817128,
		gater: null
	},
	{
		from: 209,
		to: 378,
		weight: -0.060932909762313386,
		gater: null
	},
	{
		from: 209,
		to: 379,
		weight: 0.007666165199572375,
		gater: null
	},
	{
		from: 210,
		to: 360,
		weight: 0.07091360038052986,
		gater: null
	},
	{
		from: 210,
		to: 361,
		weight: 0.08027772177681813,
		gater: null
	},
	{
		from: 210,
		to: 362,
		weight: 0.0132514953730826,
		gater: null
	},
	{
		from: 210,
		to: 363,
		weight: 0.0962824777534452,
		gater: null
	},
	{
		from: 210,
		to: 364,
		weight: -0.10181087811385083,
		gater: null
	},
	{
		from: 210,
		to: 365,
		weight: -0.0874475904269767,
		gater: null
	},
	{
		from: 210,
		to: 366,
		weight: -0.014707029263278345,
		gater: null
	},
	{
		from: 210,
		to: 367,
		weight: -0.042196358058172664,
		gater: null
	},
	{
		from: 210,
		to: 368,
		weight: 0.06362215695366054,
		gater: null
	},
	{
		from: 210,
		to: 369,
		weight: 0.009495264472917013,
		gater: null
	},
	{
		from: 210,
		to: 370,
		weight: 0.12416681219534141,
		gater: null
	},
	{
		from: 210,
		to: 371,
		weight: -0.029783338212239937,
		gater: null
	},
	{
		from: 210,
		to: 372,
		weight: 0.028548385938483602,
		gater: null
	},
	{
		from: 210,
		to: 373,
		weight: 0.04418025465544625,
		gater: null
	},
	{
		from: 210,
		to: 374,
		weight: -0.11880225246060942,
		gater: null
	},
	{
		from: 210,
		to: 375,
		weight: 0.012226332546301722,
		gater: null
	},
	{
		from: 210,
		to: 376,
		weight: -0.007027631585011356,
		gater: null
	},
	{
		from: 210,
		to: 377,
		weight: -0.0633961535214521,
		gater: null
	},
	{
		from: 210,
		to: 378,
		weight: 0.06634594543219365,
		gater: null
	},
	{
		from: 210,
		to: 379,
		weight: 0.08920385934436624,
		gater: null
	},
	{
		from: 211,
		to: 360,
		weight: -0.013348992577774955,
		gater: null
	},
	{
		from: 211,
		to: 361,
		weight: 0.10070053155906711,
		gater: null
	},
	{
		from: 211,
		to: 362,
		weight: -0.053667196178448076,
		gater: null
	},
	{
		from: 211,
		to: 363,
		weight: -0.022534719718146745,
		gater: null
	},
	{
		from: 211,
		to: 364,
		weight: 0.06116327578744941,
		gater: null
	},
	{
		from: 211,
		to: 365,
		weight: -0.06668136970524331,
		gater: null
	},
	{
		from: 211,
		to: 366,
		weight: 0.010195763994618601,
		gater: null
	},
	{
		from: 211,
		to: 367,
		weight: 0.21541887114881222,
		gater: null
	},
	{
		from: 211,
		to: 368,
		weight: 0.08264740480429862,
		gater: null
	},
	{
		from: 211,
		to: 369,
		weight: 0.012425404808498646,
		gater: null
	},
	{
		from: 211,
		to: 370,
		weight: 0.24536163639252234,
		gater: null
	},
	{
		from: 211,
		to: 371,
		weight: -0.0014356347315516514,
		gater: null
	},
	{
		from: 211,
		to: 372,
		weight: 0.15740311180190011,
		gater: null
	},
	{
		from: 211,
		to: 373,
		weight: -0.05577937754481378,
		gater: null
	},
	{
		from: 211,
		to: 374,
		weight: -0.07225982073840657,
		gater: null
	},
	{
		from: 211,
		to: 375,
		weight: -0.0009400973481002119,
		gater: null
	},
	{
		from: 211,
		to: 376,
		weight: -0.19796357000427017,
		gater: null
	},
	{
		from: 211,
		to: 377,
		weight: -0.03028328236057929,
		gater: null
	},
	{
		from: 211,
		to: 378,
		weight: 0.026215192878297308,
		gater: null
	},
	{
		from: 211,
		to: 379,
		weight: 0.09072745548847415,
		gater: null
	},
	{
		from: 212,
		to: 360,
		weight: 0.09767669214336382,
		gater: null
	},
	{
		from: 212,
		to: 361,
		weight: -0.08489856865670353,
		gater: null
	},
	{
		from: 212,
		to: 362,
		weight: 0.009291621720824025,
		gater: null
	},
	{
		from: 212,
		to: 363,
		weight: -0.019587381951971725,
		gater: null
	},
	{
		from: 212,
		to: 364,
		weight: -0.030492975768295297,
		gater: null
	},
	{
		from: 212,
		to: 365,
		weight: 0.03351847184253293,
		gater: null
	},
	{
		from: 212,
		to: 366,
		weight: -0.09081816917148586,
		gater: null
	},
	{
		from: 212,
		to: 367,
		weight: 0.09693368659787989,
		gater: null
	},
	{
		from: 212,
		to: 368,
		weight: 0.012558492856593995,
		gater: null
	},
	{
		from: 212,
		to: 369,
		weight: 0.008538003191505886,
		gater: null
	},
	{
		from: 212,
		to: 370,
		weight: 0.10534666722081634,
		gater: null
	},
	{
		from: 212,
		to: 371,
		weight: -0.006616008982053574,
		gater: null
	},
	{
		from: 212,
		to: 372,
		weight: 0.04304937882883484,
		gater: null
	},
	{
		from: 212,
		to: 373,
		weight: -0.032356640298183026,
		gater: null
	},
	{
		from: 212,
		to: 374,
		weight: 0.04618683205228192,
		gater: null
	},
	{
		from: 212,
		to: 375,
		weight: 0.03656066454504704,
		gater: null
	},
	{
		from: 212,
		to: 376,
		weight: -0.21324083148366485,
		gater: null
	},
	{
		from: 212,
		to: 377,
		weight: 0.012005609201318341,
		gater: null
	},
	{
		from: 212,
		to: 378,
		weight: 0.00007850261652304335,
		gater: null
	},
	{
		from: 212,
		to: 379,
		weight: 0.05180470455382966,
		gater: null
	},
	{
		from: 213,
		to: 360,
		weight: -0.059839741979848295,
		gater: null
	},
	{
		from: 213,
		to: 361,
		weight: -0.013484711110406139,
		gater: null
	},
	{
		from: 213,
		to: 362,
		weight: 0.03651906737242615,
		gater: null
	},
	{
		from: 213,
		to: 363,
		weight: -0.046584179809878154,
		gater: null
	},
	{
		from: 213,
		to: 364,
		weight: 0.047977288735172076,
		gater: null
	},
	{
		from: 213,
		to: 365,
		weight: 0.07862020589384357,
		gater: null
	},
	{
		from: 213,
		to: 366,
		weight: -0.0662609988431033,
		gater: null
	},
	{
		from: 213,
		to: 367,
		weight: -0.04885842884318458,
		gater: null
	},
	{
		from: 213,
		to: 368,
		weight: 0.04256371569248308,
		gater: null
	},
	{
		from: 213,
		to: 369,
		weight: -0.02928803797694239,
		gater: null
	},
	{
		from: 213,
		to: 370,
		weight: 0.03885595761089699,
		gater: null
	},
	{
		from: 213,
		to: 371,
		weight: 0.07153439271852857,
		gater: null
	},
	{
		from: 213,
		to: 372,
		weight: -0.07274604159202255,
		gater: null
	},
	{
		from: 213,
		to: 373,
		weight: -0.05130748384514464,
		gater: null
	},
	{
		from: 213,
		to: 374,
		weight: -0.007309563024325166,
		gater: null
	},
	{
		from: 213,
		to: 375,
		weight: 0.02207242402578579,
		gater: null
	},
	{
		from: 213,
		to: 376,
		weight: -0.03054157757253557,
		gater: null
	},
	{
		from: 213,
		to: 377,
		weight: -0.026690331142090507,
		gater: null
	},
	{
		from: 213,
		to: 378,
		weight: -0.03006085457371065,
		gater: null
	},
	{
		from: 213,
		to: 379,
		weight: -0.03294848717268689,
		gater: null
	},
	{
		from: 214,
		to: 360,
		weight: 0.08586510932980092,
		gater: null
	},
	{
		from: 214,
		to: 361,
		weight: -0.05326440564615043,
		gater: null
	},
	{
		from: 214,
		to: 362,
		weight: 0.05480616965976542,
		gater: null
	},
	{
		from: 214,
		to: 363,
		weight: 0.005901028055412608,
		gater: null
	},
	{
		from: 214,
		to: 364,
		weight: -0.03581420387151142,
		gater: null
	},
	{
		from: 214,
		to: 365,
		weight: 0.0290470147121672,
		gater: null
	},
	{
		from: 214,
		to: 366,
		weight: -0.013264625495850304,
		gater: null
	},
	{
		from: 214,
		to: 367,
		weight: -0.060416571934126875,
		gater: null
	},
	{
		from: 214,
		to: 368,
		weight: -0.012176948247896828,
		gater: null
	},
	{
		from: 214,
		to: 369,
		weight: 0.06793136110460184,
		gater: null
	},
	{
		from: 214,
		to: 370,
		weight: 0.05534512587157061,
		gater: null
	},
	{
		from: 214,
		to: 371,
		weight: -0.05250809643943069,
		gater: null
	},
	{
		from: 214,
		to: 372,
		weight: -0.08625393946914983,
		gater: null
	},
	{
		from: 214,
		to: 373,
		weight: 0.026450397895805118,
		gater: null
	},
	{
		from: 214,
		to: 374,
		weight: 0.013099597612238658,
		gater: null
	},
	{
		from: 214,
		to: 375,
		weight: 0.08607204788512683,
		gater: null
	},
	{
		from: 214,
		to: 376,
		weight: 0.020732595266328955,
		gater: null
	},
	{
		from: 214,
		to: 377,
		weight: -0.037253165392726134,
		gater: null
	},
	{
		from: 214,
		to: 378,
		weight: 0.09226172956259036,
		gater: null
	},
	{
		from: 214,
		to: 379,
		weight: 0.032698714112142695,
		gater: null
	},
	{
		from: 215,
		to: 360,
		weight: -0.0061491060004603935,
		gater: null
	},
	{
		from: 215,
		to: 361,
		weight: 0.03443623723291672,
		gater: null
	},
	{
		from: 215,
		to: 362,
		weight: 0.05498538011320387,
		gater: null
	},
	{
		from: 215,
		to: 363,
		weight: 0.035301394589216065,
		gater: null
	},
	{
		from: 215,
		to: 364,
		weight: -0.0024199955686525325,
		gater: null
	},
	{
		from: 215,
		to: 365,
		weight: -0.05522271262027627,
		gater: null
	},
	{
		from: 215,
		to: 366,
		weight: -0.08404927423347083,
		gater: null
	},
	{
		from: 215,
		to: 367,
		weight: 0.04203280495647566,
		gater: null
	},
	{
		from: 215,
		to: 368,
		weight: 0.013206342199429235,
		gater: null
	},
	{
		from: 215,
		to: 369,
		weight: 0.08581180082990739,
		gater: null
	},
	{
		from: 215,
		to: 370,
		weight: -0.08529889743351086,
		gater: null
	},
	{
		from: 215,
		to: 371,
		weight: -0.0017258211585034437,
		gater: null
	},
	{
		from: 215,
		to: 372,
		weight: 0.041873734390794885,
		gater: null
	},
	{
		from: 215,
		to: 373,
		weight: 0.0006089060702298218,
		gater: null
	},
	{
		from: 215,
		to: 374,
		weight: 0.032686334980695675,
		gater: null
	},
	{
		from: 215,
		to: 375,
		weight: -0.009863989453188157,
		gater: null
	},
	{
		from: 215,
		to: 376,
		weight: 0.01535316563308003,
		gater: null
	},
	{
		from: 215,
		to: 377,
		weight: -0.06614983366676634,
		gater: null
	},
	{
		from: 215,
		to: 378,
		weight: 0.09430956552660448,
		gater: null
	},
	{
		from: 215,
		to: 379,
		weight: -0.015644027299154616,
		gater: null
	},
	{
		from: 216,
		to: 360,
		weight: 0.06159500454244337,
		gater: null
	},
	{
		from: 216,
		to: 361,
		weight: 0.07058954861941892,
		gater: null
	},
	{
		from: 216,
		to: 362,
		weight: 0.02337149532294995,
		gater: null
	},
	{
		from: 216,
		to: 363,
		weight: -0.09584800608070584,
		gater: null
	},
	{
		from: 216,
		to: 364,
		weight: -0.06664551546139919,
		gater: null
	},
	{
		from: 216,
		to: 365,
		weight: -0.05081912512930784,
		gater: null
	},
	{
		from: 216,
		to: 366,
		weight: -0.10606190084339252,
		gater: null
	},
	{
		from: 216,
		to: 367,
		weight: 0.05972581996533171,
		gater: null
	},
	{
		from: 216,
		to: 368,
		weight: -0.0009557165499963111,
		gater: null
	},
	{
		from: 216,
		to: 369,
		weight: -0.027203557174151828,
		gater: null
	},
	{
		from: 216,
		to: 370,
		weight: -0.04358319845971146,
		gater: null
	},
	{
		from: 216,
		to: 371,
		weight: 0.007100901103585745,
		gater: null
	},
	{
		from: 216,
		to: 372,
		weight: 0.08231241953245781,
		gater: null
	},
	{
		from: 216,
		to: 373,
		weight: 0.03161844746056236,
		gater: null
	},
	{
		from: 216,
		to: 374,
		weight: -0.1030408919297107,
		gater: null
	},
	{
		from: 216,
		to: 375,
		weight: -0.007669516914693079,
		gater: null
	},
	{
		from: 216,
		to: 376,
		weight: 0.017328608877332185,
		gater: null
	},
	{
		from: 216,
		to: 377,
		weight: 0.021990339503365493,
		gater: null
	},
	{
		from: 216,
		to: 378,
		weight: 0.007086788284219255,
		gater: null
	},
	{
		from: 216,
		to: 379,
		weight: 0.05838838023920249,
		gater: null
	},
	{
		from: 217,
		to: 360,
		weight: 0.10254924952067918,
		gater: null
	},
	{
		from: 217,
		to: 361,
		weight: -0.027914151237163478,
		gater: null
	},
	{
		from: 217,
		to: 362,
		weight: -0.6531317860583277,
		gater: null
	},
	{
		from: 217,
		to: 363,
		weight: 0.04112374687841821,
		gater: null
	},
	{
		from: 217,
		to: 364,
		weight: -0.4900622452947915,
		gater: null
	},
	{
		from: 217,
		to: 365,
		weight: -0.4025403226350692,
		gater: null
	},
	{
		from: 217,
		to: 366,
		weight: -0.13006778055752174,
		gater: null
	},
	{
		from: 217,
		to: 367,
		weight: 0.330375530924462,
		gater: null
	},
	{
		from: 217,
		to: 368,
		weight: 0.7448305763857391,
		gater: null
	},
	{
		from: 217,
		to: 369,
		weight: -0.2138638979385103,
		gater: null
	},
	{
		from: 217,
		to: 370,
		weight: 0.34889078873219836,
		gater: null
	},
	{
		from: 217,
		to: 371,
		weight: -0.03870194566939023,
		gater: null
	},
	{
		from: 217,
		to: 372,
		weight: 0.18180302581637467,
		gater: null
	},
	{
		from: 217,
		to: 373,
		weight: 0.7159911486061042,
		gater: null
	},
	{
		from: 217,
		to: 374,
		weight: -0.22180932301413153,
		gater: null
	},
	{
		from: 217,
		to: 375,
		weight: 0.07598465345977326,
		gater: null
	},
	{
		from: 217,
		to: 376,
		weight: -1.9277709371588818,
		gater: null
	},
	{
		from: 217,
		to: 377,
		weight: 0.13817966094854725,
		gater: null
	},
	{
		from: 217,
		to: 378,
		weight: 0.14226978544975735,
		gater: null
	},
	{
		from: 217,
		to: 379,
		weight: 0.8136121304564199,
		gater: null
	},
	{
		from: 218,
		to: 360,
		weight: -0.03419805642982636,
		gater: null
	},
	{
		from: 218,
		to: 361,
		weight: 0.04347869150757139,
		gater: null
	},
	{
		from: 218,
		to: 362,
		weight: -0.055756972330059544,
		gater: null
	},
	{
		from: 218,
		to: 363,
		weight: 0.07976888476680297,
		gater: null
	},
	{
		from: 218,
		to: 364,
		weight: 0.08702492087417643,
		gater: null
	},
	{
		from: 218,
		to: 365,
		weight: 0.09048793182487286,
		gater: null
	},
	{
		from: 218,
		to: 366,
		weight: 0.057519437634605514,
		gater: null
	},
	{
		from: 218,
		to: 367,
		weight: 0.09712477055808419,
		gater: null
	},
	{
		from: 218,
		to: 368,
		weight: 0.020133247970085796,
		gater: null
	},
	{
		from: 218,
		to: 369,
		weight: -0.021623205186867403,
		gater: null
	},
	{
		from: 218,
		to: 370,
		weight: 0.09462328106601392,
		gater: null
	},
	{
		from: 218,
		to: 371,
		weight: 0.06693238632624349,
		gater: null
	},
	{
		from: 218,
		to: 372,
		weight: -0.016962535677218726,
		gater: null
	},
	{
		from: 218,
		to: 373,
		weight: -0.05515512332777939,
		gater: null
	},
	{
		from: 218,
		to: 374,
		weight: -0.030736495023903784,
		gater: null
	},
	{
		from: 218,
		to: 375,
		weight: -0.051455399141558056,
		gater: null
	},
	{
		from: 218,
		to: 376,
		weight: -0.03894134673840184,
		gater: null
	},
	{
		from: 218,
		to: 377,
		weight: 0.0527936860554544,
		gater: null
	},
	{
		from: 218,
		to: 378,
		weight: -0.08932401140324253,
		gater: null
	},
	{
		from: 218,
		to: 379,
		weight: -0.019497140480360997,
		gater: null
	},
	{
		from: 219,
		to: 360,
		weight: 0.01692094163303759,
		gater: null
	},
	{
		from: 219,
		to: 361,
		weight: -0.01900119272414824,
		gater: null
	},
	{
		from: 219,
		to: 362,
		weight: -0.0846445856382045,
		gater: null
	},
	{
		from: 219,
		to: 363,
		weight: -0.08134268050204835,
		gater: null
	},
	{
		from: 219,
		to: 364,
		weight: 0.07509711057031537,
		gater: null
	},
	{
		from: 219,
		to: 365,
		weight: -0.07604342317121154,
		gater: null
	},
	{
		from: 219,
		to: 366,
		weight: 0.05560880782426403,
		gater: null
	},
	{
		from: 219,
		to: 367,
		weight: -0.05369115025170688,
		gater: null
	},
	{
		from: 219,
		to: 368,
		weight: 0.09764846676643044,
		gater: null
	},
	{
		from: 219,
		to: 369,
		weight: -0.08234594871776002,
		gater: null
	},
	{
		from: 219,
		to: 370,
		weight: 0.03712783037970238,
		gater: null
	},
	{
		from: 219,
		to: 371,
		weight: -0.09079581660224681,
		gater: null
	},
	{
		from: 219,
		to: 372,
		weight: -0.028449154879588615,
		gater: null
	},
	{
		from: 219,
		to: 373,
		weight: -0.05537898913912764,
		gater: null
	},
	{
		from: 219,
		to: 374,
		weight: -0.09749344353351584,
		gater: null
	},
	{
		from: 219,
		to: 375,
		weight: -0.06340971884353089,
		gater: null
	},
	{
		from: 219,
		to: 376,
		weight: -0.07621150131900119,
		gater: null
	},
	{
		from: 219,
		to: 377,
		weight: -0.058369093421676954,
		gater: null
	},
	{
		from: 219,
		to: 378,
		weight: 0.06754136628396842,
		gater: null
	},
	{
		from: 219,
		to: 379,
		weight: 0.07254824845530558,
		gater: null
	},
	{
		from: 220,
		to: 360,
		weight: -0.08124640538056298,
		gater: null
	},
	{
		from: 220,
		to: 361,
		weight: 0.06786225919644172,
		gater: null
	},
	{
		from: 220,
		to: 362,
		weight: -0.05909290247088323,
		gater: null
	},
	{
		from: 220,
		to: 363,
		weight: -0.013076688104613671,
		gater: null
	},
	{
		from: 220,
		to: 364,
		weight: -0.09082040924893868,
		gater: null
	},
	{
		from: 220,
		to: 365,
		weight: 0.025387319987264224,
		gater: null
	},
	{
		from: 220,
		to: 366,
		weight: 0.09596229579536475,
		gater: null
	},
	{
		from: 220,
		to: 367,
		weight: -0.0676819206286834,
		gater: null
	},
	{
		from: 220,
		to: 368,
		weight: -0.034044262854653805,
		gater: null
	},
	{
		from: 220,
		to: 369,
		weight: -0.06784944346576771,
		gater: null
	},
	{
		from: 220,
		to: 370,
		weight: -0.04063002042627255,
		gater: null
	},
	{
		from: 220,
		to: 371,
		weight: -0.02326509802189379,
		gater: null
	},
	{
		from: 220,
		to: 372,
		weight: 0.0406578869094514,
		gater: null
	},
	{
		from: 220,
		to: 373,
		weight: 0.0961025294662608,
		gater: null
	},
	{
		from: 220,
		to: 374,
		weight: 0.01218913082922691,
		gater: null
	},
	{
		from: 220,
		to: 375,
		weight: -0.036253699950149924,
		gater: null
	},
	{
		from: 220,
		to: 376,
		weight: -0.020616106052860267,
		gater: null
	},
	{
		from: 220,
		to: 377,
		weight: 0.0990581736603919,
		gater: null
	},
	{
		from: 220,
		to: 378,
		weight: -0.015239456033447119,
		gater: null
	},
	{
		from: 220,
		to: 379,
		weight: -0.09540695993069423,
		gater: null
	},
	{
		from: 221,
		to: 360,
		weight: 0.07878147481768834,
		gater: null
	},
	{
		from: 221,
		to: 361,
		weight: -0.008547602871768006,
		gater: null
	},
	{
		from: 221,
		to: 362,
		weight: 0.2082028521909452,
		gater: null
	},
	{
		from: 221,
		to: 363,
		weight: 0.07686317244042576,
		gater: null
	},
	{
		from: 221,
		to: 364,
		weight: -0.0643157550725475,
		gater: null
	},
	{
		from: 221,
		to: 365,
		weight: -0.399934330322547,
		gater: null
	},
	{
		from: 221,
		to: 366,
		weight: -0.1953922136340887,
		gater: null
	},
	{
		from: 221,
		to: 367,
		weight: 0.2213504881900581,
		gater: null
	},
	{
		from: 221,
		to: 368,
		weight: -0.05289130297897271,
		gater: null
	},
	{
		from: 221,
		to: 369,
		weight: -0.17662227340213896,
		gater: null
	},
	{
		from: 221,
		to: 370,
		weight: 0.6376328446127915,
		gater: null
	},
	{
		from: 221,
		to: 371,
		weight: 0.017609056054471967,
		gater: null
	},
	{
		from: 221,
		to: 372,
		weight: 0.022706066582121497,
		gater: null
	},
	{
		from: 221,
		to: 373,
		weight: 1.0773953451458647,
		gater: null
	},
	{
		from: 221,
		to: 374,
		weight: -0.08846251683627894,
		gater: null
	},
	{
		from: 221,
		to: 375,
		weight: -0.021839832898331864,
		gater: null
	},
	{
		from: 221,
		to: 376,
		weight: -0.21482778183614887,
		gater: null
	},
	{
		from: 221,
		to: 377,
		weight: -0.008946959115431665,
		gater: null
	},
	{
		from: 221,
		to: 378,
		weight: 0.28041825392482916,
		gater: null
	},
	{
		from: 221,
		to: 379,
		weight: 0.6117252835646849,
		gater: null
	},
	{
		from: 222,
		to: 360,
		weight: -0.11049803570652775,
		gater: null
	},
	{
		from: 222,
		to: 361,
		weight: 0.13136322411486062,
		gater: null
	},
	{
		from: 222,
		to: 362,
		weight: -0.9896664205793262,
		gater: null
	},
	{
		from: 222,
		to: 363,
		weight: -0.05855439349917666,
		gater: null
	},
	{
		from: 222,
		to: 364,
		weight: -0.5903363741467025,
		gater: null
	},
	{
		from: 222,
		to: 365,
		weight: -0.021628135365874927,
		gater: null
	},
	{
		from: 222,
		to: 366,
		weight: -0.08224872079940101,
		gater: null
	},
	{
		from: 222,
		to: 367,
		weight: 0.03454231627678312,
		gater: null
	},
	{
		from: 222,
		to: 368,
		weight: 0.7288025855227899,
		gater: null
	},
	{
		from: 222,
		to: 369,
		weight: -0.0685274494173299,
		gater: null
	},
	{
		from: 222,
		to: 370,
		weight: -0.21025142967935892,
		gater: null
	},
	{
		from: 222,
		to: 371,
		weight: -0.01926604060762207,
		gater: null
	},
	{
		from: 222,
		to: 372,
		weight: -0.055092016819168345,
		gater: null
	},
	{
		from: 222,
		to: 373,
		weight: -0.2885919108231725,
		gater: null
	},
	{
		from: 222,
		to: 374,
		weight: -0.019603787065131793,
		gater: null
	},
	{
		from: 222,
		to: 375,
		weight: 0.010219853289633079,
		gater: null
	},
	{
		from: 222,
		to: 376,
		weight: -1.7363296306026674,
		gater: null
	},
	{
		from: 222,
		to: 377,
		weight: 0.10289863465001187,
		gater: null
	},
	{
		from: 222,
		to: 378,
		weight: -0.10120669422913946,
		gater: null
	},
	{
		from: 222,
		to: 379,
		weight: 0.36679071870187946,
		gater: null
	},
	{
		from: 223,
		to: 360,
		weight: -0.02088278370687066,
		gater: null
	},
	{
		from: 223,
		to: 361,
		weight: 0.10638507263047292,
		gater: null
	},
	{
		from: 223,
		to: 362,
		weight: -1.0631405464899213,
		gater: null
	},
	{
		from: 223,
		to: 363,
		weight: -0.0568889704867322,
		gater: null
	},
	{
		from: 223,
		to: 364,
		weight: -0.5247867822468983,
		gater: null
	},
	{
		from: 223,
		to: 365,
		weight: 0.0010199714398189024,
		gater: null
	},
	{
		from: 223,
		to: 366,
		weight: 0.06526918257313766,
		gater: null
	},
	{
		from: 223,
		to: 367,
		weight: 0.1155572125010024,
		gater: null
	},
	{
		from: 223,
		to: 368,
		weight: 0.6959609422576777,
		gater: null
	},
	{
		from: 223,
		to: 369,
		weight: -0.1970111445351101,
		gater: null
	},
	{
		from: 223,
		to: 370,
		weight: -0.2820791810405462,
		gater: null
	},
	{
		from: 223,
		to: 371,
		weight: -0.038463098480611954,
		gater: null
	},
	{
		from: 223,
		to: 372,
		weight: -0.07085398536892155,
		gater: null
	},
	{
		from: 223,
		to: 373,
		weight: -0.35155471524670023,
		gater: null
	},
	{
		from: 223,
		to: 374,
		weight: -0.191073918911207,
		gater: null
	},
	{
		from: 223,
		to: 375,
		weight: 0.01391642780845407,
		gater: null
	},
	{
		from: 223,
		to: 376,
		weight: -1.7334052132457098,
		gater: null
	},
	{
		from: 223,
		to: 377,
		weight: -0.01956273615563761,
		gater: null
	},
	{
		from: 223,
		to: 378,
		weight: -0.08699525565892445,
		gater: null
	},
	{
		from: 223,
		to: 379,
		weight: 0.307451594177267,
		gater: null
	},
	{
		from: 224,
		to: 360,
		weight: -0.039641708139764004,
		gater: null
	},
	{
		from: 224,
		to: 361,
		weight: -0.05445294072915637,
		gater: null
	},
	{
		from: 224,
		to: 362,
		weight: -1.18532417409745,
		gater: null
	},
	{
		from: 224,
		to: 363,
		weight: -0.13598358442729805,
		gater: null
	},
	{
		from: 224,
		to: 364,
		weight: -0.0060077888996602465,
		gater: null
	},
	{
		from: 224,
		to: 365,
		weight: 0.09178248377452672,
		gater: null
	},
	{
		from: 224,
		to: 366,
		weight: 0.06366674263312187,
		gater: null
	},
	{
		from: 224,
		to: 367,
		weight: 0.025101239837316557,
		gater: null
	},
	{
		from: 224,
		to: 368,
		weight: -0.034598022052796246,
		gater: null
	},
	{
		from: 224,
		to: 369,
		weight: 0.3674847021721382,
		gater: null
	},
	{
		from: 224,
		to: 370,
		weight: -0.38128212720164306,
		gater: null
	},
	{
		from: 224,
		to: 371,
		weight: -0.14068373024296527,
		gater: null
	},
	{
		from: 224,
		to: 372,
		weight: -0.033334451543454324,
		gater: null
	},
	{
		from: 224,
		to: 373,
		weight: -0.24783947731096787,
		gater: null
	},
	{
		from: 224,
		to: 374,
		weight: -0.0814174465273526,
		gater: null
	},
	{
		from: 224,
		to: 375,
		weight: 0.13961533749203794,
		gater: null
	},
	{
		from: 224,
		to: 376,
		weight: 1.4314869436616122,
		gater: null
	},
	{
		from: 224,
		to: 377,
		weight: 0.030804263687102477,
		gater: null
	},
	{
		from: 224,
		to: 378,
		weight: -0.11632646123142724,
		gater: null
	},
	{
		from: 224,
		to: 379,
		weight: 0.10760133698505286,
		gater: null
	},
	{
		from: 225,
		to: 360,
		weight: -0.025828002549268248,
		gater: null
	},
	{
		from: 225,
		to: 361,
		weight: 0.05268901850526842,
		gater: null
	},
	{
		from: 225,
		to: 362,
		weight: -0.6701209473583707,
		gater: null
	},
	{
		from: 225,
		to: 363,
		weight: -0.19259455898478728,
		gater: null
	},
	{
		from: 225,
		to: 364,
		weight: -0.5358439786058014,
		gater: null
	},
	{
		from: 225,
		to: 365,
		weight: -0.3030373583365687,
		gater: null
	},
	{
		from: 225,
		to: 366,
		weight: 0.06254245626077079,
		gater: null
	},
	{
		from: 225,
		to: 367,
		weight: 0.06364517327265026,
		gater: null
	},
	{
		from: 225,
		to: 368,
		weight: 0.6110241203349562,
		gater: null
	},
	{
		from: 225,
		to: 369,
		weight: -0.09863761877651181,
		gater: null
	},
	{
		from: 225,
		to: 370,
		weight: -0.2766370884024162,
		gater: null
	},
	{
		from: 225,
		to: 371,
		weight: -0.07167904966657845,
		gater: null
	},
	{
		from: 225,
		to: 372,
		weight: -0.018804905543021007,
		gater: null
	},
	{
		from: 225,
		to: 373,
		weight: -0.2671010822174107,
		gater: null
	},
	{
		from: 225,
		to: 374,
		weight: -0.10271304721768441,
		gater: null
	},
	{
		from: 225,
		to: 375,
		weight: 0.031691222361608276,
		gater: null
	},
	{
		from: 225,
		to: 376,
		weight: -1.6555920836388527,
		gater: null
	},
	{
		from: 225,
		to: 377,
		weight: 0.01883159433674869,
		gater: null
	},
	{
		from: 225,
		to: 378,
		weight: 0.05006296443416461,
		gater: null
	},
	{
		from: 225,
		to: 379,
		weight: 0.25942011123138686,
		gater: null
	},
	{
		from: 226,
		to: 360,
		weight: 0.06922530580229398,
		gater: null
	},
	{
		from: 226,
		to: 361,
		weight: 0.04369115283325756,
		gater: null
	},
	{
		from: 226,
		to: 362,
		weight: -0.6803741479282807,
		gater: null
	},
	{
		from: 226,
		to: 363,
		weight: -0.14794490972878735,
		gater: null
	},
	{
		from: 226,
		to: 364,
		weight: -0.51850152456958,
		gater: null
	},
	{
		from: 226,
		to: 365,
		weight: -0.4228414188295027,
		gater: null
	},
	{
		from: 226,
		to: 366,
		weight: 0.05499443992539058,
		gater: null
	},
	{
		from: 226,
		to: 367,
		weight: 0.10271510369248465,
		gater: null
	},
	{
		from: 226,
		to: 368,
		weight: 0.6897665879771755,
		gater: null
	},
	{
		from: 226,
		to: 369,
		weight: -0.23830357035785088,
		gater: null
	},
	{
		from: 226,
		to: 370,
		weight: -0.15432671985418178,
		gater: null
	},
	{
		from: 226,
		to: 371,
		weight: -0.04994693755101634,
		gater: null
	},
	{
		from: 226,
		to: 372,
		weight: -0.07524506096415631,
		gater: null
	},
	{
		from: 226,
		to: 373,
		weight: -0.19040059536143475,
		gater: null
	},
	{
		from: 226,
		to: 374,
		weight: -0.20429040573731064,
		gater: null
	},
	{
		from: 226,
		to: 375,
		weight: -0.01969718926431124,
		gater: null
	},
	{
		from: 226,
		to: 376,
		weight: -1.793797083613429,
		gater: null
	},
	{
		from: 226,
		to: 377,
		weight: 0.09287055154360076,
		gater: null
	},
	{
		from: 226,
		to: 378,
		weight: 0.016387864975669023,
		gater: null
	},
	{
		from: 226,
		to: 379,
		weight: 0.2723138027404814,
		gater: null
	},
	{
		from: 227,
		to: 360,
		weight: -0.0882232823914396,
		gater: null
	},
	{
		from: 227,
		to: 361,
		weight: -0.0636974907189946,
		gater: null
	},
	{
		from: 227,
		to: 362,
		weight: -0.8107553946272537,
		gater: null
	},
	{
		from: 227,
		to: 363,
		weight: -0.15369981850090322,
		gater: null
	},
	{
		from: 227,
		to: 364,
		weight: -0.5791694760735773,
		gater: null
	},
	{
		from: 227,
		to: 365,
		weight: -0.46380056658357166,
		gater: null
	},
	{
		from: 227,
		to: 366,
		weight: -0.18641723814410827,
		gater: null
	},
	{
		from: 227,
		to: 367,
		weight: 0.23782396837951258,
		gater: null
	},
	{
		from: 227,
		to: 368,
		weight: 0.6084641938633267,
		gater: null
	},
	{
		from: 227,
		to: 369,
		weight: -0.14547509788984606,
		gater: null
	},
	{
		from: 227,
		to: 370,
		weight: 0.1479140009278351,
		gater: null
	},
	{
		from: 227,
		to: 371,
		weight: 0.04637153282474528,
		gater: null
	},
	{
		from: 227,
		to: 372,
		weight: 0.09661504903301756,
		gater: null
	},
	{
		from: 227,
		to: 373,
		weight: 0.6997010310940296,
		gater: null
	},
	{
		from: 227,
		to: 374,
		weight: -0.025259366878978173,
		gater: null
	},
	{
		from: 227,
		to: 375,
		weight: 0.08842659380240868,
		gater: null
	},
	{
		from: 227,
		to: 376,
		weight: -1.8855566843123905,
		gater: null
	},
	{
		from: 227,
		to: 377,
		weight: 0.18979823570912627,
		gater: null
	},
	{
		from: 227,
		to: 378,
		weight: 0.27714339644600566,
		gater: null
	},
	{
		from: 227,
		to: 379,
		weight: 0.5741713851959538,
		gater: null
	},
	{
		from: 228,
		to: 360,
		weight: 1.2598561116696416,
		gater: null
	},
	{
		from: 228,
		to: 361,
		weight: 0.13538306979785833,
		gater: null
	},
	{
		from: 228,
		to: 362,
		weight: 0.9597646940714806,
		gater: null
	},
	{
		from: 228,
		to: 363,
		weight: 1.8441017754269935,
		gater: null
	},
	{
		from: 228,
		to: 364,
		weight: -0.6933336335022596,
		gater: null
	},
	{
		from: 228,
		to: 365,
		weight: -0.179517797559773,
		gater: null
	},
	{
		from: 228,
		to: 366,
		weight: -1.724114752753764,
		gater: null
	},
	{
		from: 228,
		to: 367,
		weight: 0.5206890542508484,
		gater: null
	},
	{
		from: 228,
		to: 368,
		weight: 1.5170124989537723,
		gater: null
	},
	{
		from: 228,
		to: 369,
		weight: -0.5482942921851844,
		gater: null
	},
	{
		from: 228,
		to: 370,
		weight: -3.0598684700225927,
		gater: null
	},
	{
		from: 228,
		to: 371,
		weight: -0.22308204606554022,
		gater: null
	},
	{
		from: 228,
		to: 372,
		weight: 0.5502569952414882,
		gater: null
	},
	{
		from: 228,
		to: 373,
		weight: 0.9527958380717867,
		gater: null
	},
	{
		from: 228,
		to: 374,
		weight: -0.5696721779366071,
		gater: null
	},
	{
		from: 228,
		to: 375,
		weight: 0.21078486311855527,
		gater: null
	},
	{
		from: 228,
		to: 376,
		weight: -1.4492613005894919,
		gater: null
	},
	{
		from: 228,
		to: 377,
		weight: 1.4014860916677445,
		gater: null
	},
	{
		from: 228,
		to: 378,
		weight: 0.5446922031422684,
		gater: null
	},
	{
		from: 228,
		to: 379,
		weight: 0.724880046578881,
		gater: null
	},
	{
		from: 229,
		to: 360,
		weight: 0.008619777096465074,
		gater: null
	},
	{
		from: 229,
		to: 361,
		weight: 0.059168963585062156,
		gater: null
	},
	{
		from: 229,
		to: 362,
		weight: -0.01699710091575089,
		gater: null
	},
	{
		from: 229,
		to: 363,
		weight: 0.07037743307557574,
		gater: null
	},
	{
		from: 229,
		to: 364,
		weight: -0.051130972777418696,
		gater: null
	},
	{
		from: 229,
		to: 365,
		weight: 0.042526039499360825,
		gater: null
	},
	{
		from: 229,
		to: 366,
		weight: -0.060187374546080676,
		gater: null
	},
	{
		from: 229,
		to: 367,
		weight: 0.025241696004742003,
		gater: null
	},
	{
		from: 229,
		to: 368,
		weight: 0.08764571200604235,
		gater: null
	},
	{
		from: 229,
		to: 369,
		weight: -0.06524612963010211,
		gater: null
	},
	{
		from: 229,
		to: 370,
		weight: -0.07914121907181308,
		gater: null
	},
	{
		from: 229,
		to: 371,
		weight: 0.029359433134292897,
		gater: null
	},
	{
		from: 229,
		to: 372,
		weight: 0.08017574156883217,
		gater: null
	},
	{
		from: 229,
		to: 373,
		weight: -0.08289982171259128,
		gater: null
	},
	{
		from: 229,
		to: 374,
		weight: -0.04980158249941194,
		gater: null
	},
	{
		from: 229,
		to: 375,
		weight: -0.015733949989096687,
		gater: null
	},
	{
		from: 229,
		to: 376,
		weight: 0.08303153159926668,
		gater: null
	},
	{
		from: 229,
		to: 377,
		weight: -0.022165809595741184,
		gater: null
	},
	{
		from: 229,
		to: 378,
		weight: -0.0886625683096971,
		gater: null
	},
	{
		from: 229,
		to: 379,
		weight: -0.02330429780306677,
		gater: null
	},
	{
		from: 230,
		to: 360,
		weight: 0.034303976283307856,
		gater: null
	},
	{
		from: 230,
		to: 361,
		weight: -0.027795348336674606,
		gater: null
	},
	{
		from: 230,
		to: 362,
		weight: -0.013947390376859983,
		gater: null
	},
	{
		from: 230,
		to: 363,
		weight: -0.057013094840030226,
		gater: null
	},
	{
		from: 230,
		to: 364,
		weight: 0.023127743320370354,
		gater: null
	},
	{
		from: 230,
		to: 365,
		weight: -0.08985350587569427,
		gater: null
	},
	{
		from: 230,
		to: 366,
		weight: 0.011967101788972955,
		gater: null
	},
	{
		from: 230,
		to: 367,
		weight: 0.09662647775923247,
		gater: null
	},
	{
		from: 230,
		to: 368,
		weight: -0.0633176594357806,
		gater: null
	},
	{
		from: 230,
		to: 369,
		weight: -0.0863476638573921,
		gater: null
	},
	{
		from: 230,
		to: 370,
		weight: 0.08571551739548006,
		gater: null
	},
	{
		from: 230,
		to: 371,
		weight: -0.0031243561268639772,
		gater: null
	},
	{
		from: 230,
		to: 372,
		weight: 0.01275627591361048,
		gater: null
	},
	{
		from: 230,
		to: 373,
		weight: -0.028785775416907033,
		gater: null
	},
	{
		from: 230,
		to: 374,
		weight: -0.012520642494915704,
		gater: null
	},
	{
		from: 230,
		to: 375,
		weight: -0.0787741617113992,
		gater: null
	},
	{
		from: 230,
		to: 376,
		weight: 0.0996143890775032,
		gater: null
	},
	{
		from: 230,
		to: 377,
		weight: 0.0016226781556129073,
		gater: null
	},
	{
		from: 230,
		to: 378,
		weight: -0.003353811584193148,
		gater: null
	},
	{
		from: 230,
		to: 379,
		weight: 0.06295771487129698,
		gater: null
	},
	{
		from: 231,
		to: 360,
		weight: -0.012532482413639946,
		gater: null
	},
	{
		from: 231,
		to: 361,
		weight: 0.05988847586061599,
		gater: null
	},
	{
		from: 231,
		to: 362,
		weight: -0.008755686710558768,
		gater: null
	},
	{
		from: 231,
		to: 363,
		weight: -0.01363179388312364,
		gater: null
	},
	{
		from: 231,
		to: 364,
		weight: 0.04505907066940628,
		gater: null
	},
	{
		from: 231,
		to: 365,
		weight: 0.013881919968328195,
		gater: null
	},
	{
		from: 231,
		to: 366,
		weight: -0.07108021830812931,
		gater: null
	},
	{
		from: 231,
		to: 367,
		weight: 0.016098918558468355,
		gater: null
	},
	{
		from: 231,
		to: 368,
		weight: -0.054086777365962076,
		gater: null
	},
	{
		from: 231,
		to: 369,
		weight: -0.005003314765105004,
		gater: null
	},
	{
		from: 231,
		to: 370,
		weight: -0.06481014762383411,
		gater: null
	},
	{
		from: 231,
		to: 371,
		weight: 0.06679489126791577,
		gater: null
	},
	{
		from: 231,
		to: 372,
		weight: -0.01969691683137071,
		gater: null
	},
	{
		from: 231,
		to: 373,
		weight: 0.04434938999531944,
		gater: null
	},
	{
		from: 231,
		to: 374,
		weight: 0.039243556601802024,
		gater: null
	},
	{
		from: 231,
		to: 375,
		weight: -0.08733606314329255,
		gater: null
	},
	{
		from: 231,
		to: 376,
		weight: -0.07371990817350849,
		gater: null
	},
	{
		from: 231,
		to: 377,
		weight: 0.017107805972338106,
		gater: null
	},
	{
		from: 231,
		to: 378,
		weight: 0.02106216127804141,
		gater: null
	},
	{
		from: 231,
		to: 379,
		weight: 0.08669815153624993,
		gater: null
	},
	{
		from: 232,
		to: 360,
		weight: 0.3089424771012158,
		gater: null
	},
	{
		from: 232,
		to: 361,
		weight: 0.18500731082547966,
		gater: null
	},
	{
		from: 232,
		to: 362,
		weight: 0.3125475325289864,
		gater: null
	},
	{
		from: 232,
		to: 363,
		weight: 0.09373766689341032,
		gater: null
	},
	{
		from: 232,
		to: 364,
		weight: -0.12510749954439834,
		gater: null
	},
	{
		from: 232,
		to: 365,
		weight: -0.24958932150981997,
		gater: null
	},
	{
		from: 232,
		to: 366,
		weight: -0.45780210216083556,
		gater: null
	},
	{
		from: 232,
		to: 367,
		weight: 0.30915340048628975,
		gater: null
	},
	{
		from: 232,
		to: 368,
		weight: 0.2084158264726044,
		gater: null
	},
	{
		from: 232,
		to: 369,
		weight: -0.19493490455651016,
		gater: null
	},
	{
		from: 232,
		to: 370,
		weight: 0.5472570940200954,
		gater: null
	},
	{
		from: 232,
		to: 371,
		weight: 0.05706968620461733,
		gater: null
	},
	{
		from: 232,
		to: 372,
		weight: 0.12364980888239098,
		gater: null
	},
	{
		from: 232,
		to: 373,
		weight: 1.1217917861621753,
		gater: null
	},
	{
		from: 232,
		to: 374,
		weight: -0.0474691227735457,
		gater: null
	},
	{
		from: 232,
		to: 375,
		weight: -0.276803608920714,
		gater: null
	},
	{
		from: 232,
		to: 376,
		weight: -0.896119193427877,
		gater: null
	},
	{
		from: 232,
		to: 377,
		weight: 0.0022886632728613063,
		gater: null
	},
	{
		from: 232,
		to: 378,
		weight: 0.31678657039934105,
		gater: null
	},
	{
		from: 232,
		to: 379,
		weight: 0.9052606859589746,
		gater: null
	},
	{
		from: 233,
		to: 360,
		weight: 0.8041231962177184,
		gater: null
	},
	{
		from: 233,
		to: 361,
		weight: 0.029703381071421474,
		gater: null
	},
	{
		from: 233,
		to: 362,
		weight: 0.6027037185167967,
		gater: null
	},
	{
		from: 233,
		to: 363,
		weight: 1.6194435082629035,
		gater: null
	},
	{
		from: 233,
		to: 364,
		weight: -0.7368002645940841,
		gater: null
	},
	{
		from: 233,
		to: 365,
		weight: 0.10160269224325603,
		gater: null
	},
	{
		from: 233,
		to: 366,
		weight: -1.1567823425138393,
		gater: null
	},
	{
		from: 233,
		to: 367,
		weight: 0.36161107554850014,
		gater: null
	},
	{
		from: 233,
		to: 368,
		weight: 1.2163763858691783,
		gater: null
	},
	{
		from: 233,
		to: 369,
		weight: -0.5355455889954343,
		gater: null
	},
	{
		from: 233,
		to: 370,
		weight: -3.6582905651548745,
		gater: null
	},
	{
		from: 233,
		to: 371,
		weight: -0.2696667770589593,
		gater: null
	},
	{
		from: 233,
		to: 372,
		weight: 0.3581854677887786,
		gater: null
	},
	{
		from: 233,
		to: 373,
		weight: 0.02236223526820913,
		gater: null
	},
	{
		from: 233,
		to: 374,
		weight: -0.41155729970047794,
		gater: null
	},
	{
		from: 233,
		to: 375,
		weight: 0.4013923117132453,
		gater: null
	},
	{
		from: 233,
		to: 376,
		weight: -0.39265981762360136,
		gater: null
	},
	{
		from: 233,
		to: 377,
		weight: 1.3250810439753655,
		gater: null
	},
	{
		from: 233,
		to: 378,
		weight: 0.3013086244222861,
		gater: null
	},
	{
		from: 233,
		to: 379,
		weight: -0.10423838382138237,
		gater: null
	},
	{
		from: 234,
		to: 360,
		weight: 0.9625087124536527,
		gater: null
	},
	{
		from: 234,
		to: 361,
		weight: -0.013934456164246607,
		gater: null
	},
	{
		from: 234,
		to: 362,
		weight: 0.676504459066681,
		gater: null
	},
	{
		from: 234,
		to: 363,
		weight: 1.6788739065627956,
		gater: null
	},
	{
		from: 234,
		to: 364,
		weight: -0.7087990670067542,
		gater: null
	},
	{
		from: 234,
		to: 365,
		weight: -0.014526737648434622,
		gater: null
	},
	{
		from: 234,
		to: 366,
		weight: -1.1969464934609337,
		gater: null
	},
	{
		from: 234,
		to: 367,
		weight: 0.13900026951237257,
		gater: null
	},
	{
		from: 234,
		to: 368,
		weight: 1.2992136906713652,
		gater: null
	},
	{
		from: 234,
		to: 369,
		weight: -0.18202332708417548,
		gater: null
	},
	{
		from: 234,
		to: 370,
		weight: -3.5549612390563743,
		gater: null
	},
	{
		from: 234,
		to: 371,
		weight: -0.23572664465884124,
		gater: null
	},
	{
		from: 234,
		to: 372,
		weight: 0.4792488855045504,
		gater: null
	},
	{
		from: 234,
		to: 373,
		weight: -0.02093131332954219,
		gater: null
	},
	{
		from: 234,
		to: 374,
		weight: -0.48049560895674204,
		gater: null
	},
	{
		from: 234,
		to: 375,
		weight: 0.27425140194103587,
		gater: null
	},
	{
		from: 234,
		to: 376,
		weight: -0.4861521485005664,
		gater: null
	},
	{
		from: 234,
		to: 377,
		weight: 1.3639737882534226,
		gater: null
	},
	{
		from: 234,
		to: 378,
		weight: 0.31257983521826277,
		gater: null
	},
	{
		from: 234,
		to: 379,
		weight: -0.2652020006063158,
		gater: null
	},
	{
		from: 235,
		to: 360,
		weight: 0.6883588001239107,
		gater: null
	},
	{
		from: 235,
		to: 361,
		weight: 0.2714795038933712,
		gater: null
	},
	{
		from: 235,
		to: 362,
		weight: 0.8734654597619756,
		gater: null
	},
	{
		from: 235,
		to: 363,
		weight: 1.0401999867613743,
		gater: null
	},
	{
		from: 235,
		to: 364,
		weight: 0.019578870746982054,
		gater: null
	},
	{
		from: 235,
		to: 365,
		weight: -0.1150474042703609,
		gater: null
	},
	{
		from: 235,
		to: 366,
		weight: -1.246799014825039,
		gater: null
	},
	{
		from: 235,
		to: 367,
		weight: -0.5632834608552675,
		gater: null
	},
	{
		from: 235,
		to: 368,
		weight: -0.5670338876692286,
		gater: null
	},
	{
		from: 235,
		to: 369,
		weight: 0.8343548734848968,
		gater: null
	},
	{
		from: 235,
		to: 370,
		weight: -3.9204214226410183,
		gater: null
	},
	{
		from: 235,
		to: 371,
		weight: -0.3171489370301899,
		gater: null
	},
	{
		from: 235,
		to: 372,
		weight: 0.30738431499642765,
		gater: null
	},
	{
		from: 235,
		to: 373,
		weight: -0.30156996103981404,
		gater: null
	},
	{
		from: 235,
		to: 374,
		weight: -0.07916504738553155,
		gater: null
	},
	{
		from: 235,
		to: 375,
		weight: 0.39727917926231837,
		gater: null
	},
	{
		from: 235,
		to: 376,
		weight: 2.363895808823511,
		gater: null
	},
	{
		from: 235,
		to: 377,
		weight: 1.2017259856867506,
		gater: null
	},
	{
		from: 235,
		to: 378,
		weight: 0.23510866820194568,
		gater: null
	},
	{
		from: 235,
		to: 379,
		weight: -0.9496264015133942,
		gater: null
	},
	{
		from: 236,
		to: 360,
		weight: 1.1431132724368727,
		gater: null
	},
	{
		from: 236,
		to: 361,
		weight: -0.2135415784105571,
		gater: null
	},
	{
		from: 236,
		to: 362,
		weight: 0.5069260116916351,
		gater: null
	},
	{
		from: 236,
		to: 363,
		weight: 0.685605974814051,
		gater: null
	},
	{
		from: 236,
		to: 364,
		weight: -0.13123340270204756,
		gater: null
	},
	{
		from: 236,
		to: 365,
		weight: 0.644100828370873,
		gater: null
	},
	{
		from: 236,
		to: 366,
		weight: -1.230719153767827,
		gater: null
	},
	{
		from: 236,
		to: 367,
		weight: -0.7341162388577411,
		gater: null
	},
	{
		from: 236,
		to: 368,
		weight: 0.3662803874301942,
		gater: null
	},
	{
		from: 236,
		to: 369,
		weight: 0.5007178877448972,
		gater: null
	},
	{
		from: 236,
		to: 370,
		weight: -3.472425577605529,
		gater: null
	},
	{
		from: 236,
		to: 371,
		weight: -0.20425095616398006,
		gater: null
	},
	{
		from: 236,
		to: 372,
		weight: 0.6423256393089273,
		gater: null
	},
	{
		from: 236,
		to: 373,
		weight: 0.07754643936181636,
		gater: null
	},
	{
		from: 236,
		to: 374,
		weight: -0.12368521654812058,
		gater: null
	},
	{
		from: 236,
		to: 375,
		weight: -0.11313155403818999,
		gater: null
	},
	{
		from: 236,
		to: 376,
		weight: 1.314753098709252,
		gater: null
	},
	{
		from: 236,
		to: 377,
		weight: 0.994398863805019,
		gater: null
	},
	{
		from: 236,
		to: 378,
		weight: 0.2573041408007915,
		gater: null
	},
	{
		from: 236,
		to: 379,
		weight: -1.462702282573969,
		gater: null
	},
	{
		from: 237,
		to: 360,
		weight: 0.7619287980787162,
		gater: null
	},
	{
		from: 237,
		to: 361,
		weight: -0.45748615910338136,
		gater: null
	},
	{
		from: 237,
		to: 362,
		weight: -0.11110865943659223,
		gater: null
	},
	{
		from: 237,
		to: 363,
		weight: 0.5621731916956676,
		gater: null
	},
	{
		from: 237,
		to: 364,
		weight: 0.02079266880561966,
		gater: null
	},
	{
		from: 237,
		to: 365,
		weight: 0.9251610741824312,
		gater: null
	},
	{
		from: 237,
		to: 366,
		weight: 0.3104072774166005,
		gater: null
	},
	{
		from: 237,
		to: 367,
		weight: -0.1154711503553417,
		gater: null
	},
	{
		from: 237,
		to: 368,
		weight: 0.1241900084979867,
		gater: null
	},
	{
		from: 237,
		to: 369,
		weight: 1.3281834285450418,
		gater: null
	},
	{
		from: 237,
		to: 370,
		weight: -3.153220349806298,
		gater: null
	},
	{
		from: 237,
		to: 371,
		weight: -0.3495326708273277,
		gater: null
	},
	{
		from: 237,
		to: 372,
		weight: 0.00661639347610981,
		gater: null
	},
	{
		from: 237,
		to: 373,
		weight: 0.8036145009320135,
		gater: null
	},
	{
		from: 237,
		to: 374,
		weight: -0.12880638103823083,
		gater: null
	},
	{
		from: 237,
		to: 375,
		weight: 0.37495760330977806,
		gater: null
	},
	{
		from: 237,
		to: 376,
		weight: 1.160004346263573,
		gater: null
	},
	{
		from: 237,
		to: 377,
		weight: 0.23786350667558726,
		gater: null
	},
	{
		from: 237,
		to: 378,
		weight: 0.20312447829725533,
		gater: null
	},
	{
		from: 237,
		to: 379,
		weight: -0.6131757954396815,
		gater: null
	},
	{
		from: 238,
		to: 360,
		weight: 0.7181625236483428,
		gater: null
	},
	{
		from: 238,
		to: 361,
		weight: -0.5184623071894431,
		gater: null
	},
	{
		from: 238,
		to: 362,
		weight: -0.5138298231112463,
		gater: null
	},
	{
		from: 238,
		to: 363,
		weight: 1.3427558092350982,
		gater: null
	},
	{
		from: 238,
		to: 364,
		weight: 0.03300120495304555,
		gater: null
	},
	{
		from: 238,
		to: 365,
		weight: 0.442038962390881,
		gater: null
	},
	{
		from: 238,
		to: 366,
		weight: -0.5935442134613769,
		gater: null
	},
	{
		from: 238,
		to: 367,
		weight: -0.8588503562616138,
		gater: null
	},
	{
		from: 238,
		to: 368,
		weight: -0.5313716384261634,
		gater: null
	},
	{
		from: 238,
		to: 369,
		weight: 0.7360534129793832,
		gater: null
	},
	{
		from: 238,
		to: 370,
		weight: -3.9042445798576706,
		gater: null
	},
	{
		from: 238,
		to: 371,
		weight: -0.24397443312382058,
		gater: null
	},
	{
		from: 238,
		to: 372,
		weight: 0.44238196937725066,
		gater: null
	},
	{
		from: 238,
		to: 373,
		weight: -0.5075912058699474,
		gater: null
	},
	{
		from: 238,
		to: 374,
		weight: -0.08335357213863648,
		gater: null
	},
	{
		from: 238,
		to: 375,
		weight: -0.18115588010291114,
		gater: null
	},
	{
		from: 238,
		to: 376,
		weight: 2.323247492615676,
		gater: null
	},
	{
		from: 238,
		to: 377,
		weight: 0.9489455554818116,
		gater: null
	},
	{
		from: 238,
		to: 378,
		weight: 0.171907903150402,
		gater: null
	},
	{
		from: 238,
		to: 379,
		weight: -1.4579399786837668,
		gater: null
	},
	{
		from: 239,
		to: 360,
		weight: -2.1300707397042213,
		gater: null
	},
	{
		from: 239,
		to: 361,
		weight: 0.5545976727950858,
		gater: null
	},
	{
		from: 239,
		to: 362,
		weight: -1.3119228124130093,
		gater: null
	},
	{
		from: 239,
		to: 363,
		weight: -0.467786978734981,
		gater: null
	},
	{
		from: 239,
		to: 364,
		weight: -1.1734913299540026,
		gater: null
	},
	{
		from: 239,
		to: 365,
		weight: -0.015626539370276762,
		gater: null
	},
	{
		from: 239,
		to: 366,
		weight: 0.11446494495104444,
		gater: null
	},
	{
		from: 239,
		to: 367,
		weight: 1.472335914581987,
		gater: null
	},
	{
		from: 239,
		to: 368,
		weight: -0.042612945252148295,
		gater: null
	},
	{
		from: 239,
		to: 369,
		weight: 0.34220850170135036,
		gater: null
	},
	{
		from: 239,
		to: 370,
		weight: -2.7827108263989806,
		gater: null
	},
	{
		from: 239,
		to: 371,
		weight: -0.10081822858438265,
		gater: null
	},
	{
		from: 239,
		to: 372,
		weight: 0.44654857071981213,
		gater: null
	},
	{
		from: 239,
		to: 373,
		weight: -0.18539567012643052,
		gater: null
	},
	{
		from: 239,
		to: 374,
		weight: -1.3024538810529724,
		gater: null
	},
	{
		from: 239,
		to: 375,
		weight: -0.023267208937519848,
		gater: null
	},
	{
		from: 239,
		to: 376,
		weight: 1.542894666115563,
		gater: null
	},
	{
		from: 239,
		to: 377,
		weight: -0.016183717033408374,
		gater: null
	},
	{
		from: 239,
		to: 378,
		weight: 1.6606587098658705,
		gater: null
	},
	{
		from: 239,
		to: 379,
		weight: 0.6892060561408617,
		gater: null
	},
	{
		from: 240,
		to: 360,
		weight: 0.03282579410230541,
		gater: null
	},
	{
		from: 240,
		to: 361,
		weight: 0.04973391505484953,
		gater: null
	},
	{
		from: 240,
		to: 362,
		weight: 0.08115427027366375,
		gater: null
	},
	{
		from: 240,
		to: 363,
		weight: 0.06134037984906399,
		gater: null
	},
	{
		from: 240,
		to: 364,
		weight: 0.031239726539676275,
		gater: null
	},
	{
		from: 240,
		to: 365,
		weight: -0.08828907380071327,
		gater: null
	},
	{
		from: 240,
		to: 366,
		weight: -0.0064954219530758235,
		gater: null
	},
	{
		from: 240,
		to: 367,
		weight: -0.0880409203678703,
		gater: null
	},
	{
		from: 240,
		to: 368,
		weight: -0.06179113475166512,
		gater: null
	},
	{
		from: 240,
		to: 369,
		weight: -0.2826370405590907,
		gater: null
	},
	{
		from: 240,
		to: 370,
		weight: 0.04585704141260955,
		gater: null
	},
	{
		from: 240,
		to: 371,
		weight: -0.006895762979779934,
		gater: null
	},
	{
		from: 240,
		to: 372,
		weight: 0.005684778495364471,
		gater: null
	},
	{
		from: 240,
		to: 373,
		weight: 0.09655925097284486,
		gater: null
	},
	{
		from: 240,
		to: 374,
		weight: 0.005124446725389296,
		gater: null
	},
	{
		from: 240,
		to: 375,
		weight: 0.014745134158590556,
		gater: null
	},
	{
		from: 240,
		to: 376,
		weight: -0.07032912882482588,
		gater: null
	},
	{
		from: 240,
		to: 377,
		weight: 0.05941851630473958,
		gater: null
	},
	{
		from: 240,
		to: 378,
		weight: 0.06583925544074995,
		gater: null
	},
	{
		from: 240,
		to: 379,
		weight: 0.030876287979408022,
		gater: null
	},
	{
		from: 241,
		to: 360,
		weight: -0.032402587149719934,
		gater: null
	},
	{
		from: 241,
		to: 361,
		weight: 0.004456491725507358,
		gater: null
	},
	{
		from: 241,
		to: 362,
		weight: -0.025428215417099,
		gater: null
	},
	{
		from: 241,
		to: 363,
		weight: -0.01660285957253473,
		gater: null
	},
	{
		from: 241,
		to: 364,
		weight: -0.04673103471737594,
		gater: null
	},
	{
		from: 241,
		to: 365,
		weight: 0.05545982193930807,
		gater: null
	},
	{
		from: 241,
		to: 366,
		weight: -0.07698905639477888,
		gater: null
	},
	{
		from: 241,
		to: 367,
		weight: -0.07449619442114618,
		gater: null
	},
	{
		from: 241,
		to: 368,
		weight: 0.08292747340385162,
		gater: null
	},
	{
		from: 241,
		to: 369,
		weight: -0.08685565627602394,
		gater: null
	},
	{
		from: 241,
		to: 370,
		weight: -0.011284556020459151,
		gater: null
	},
	{
		from: 241,
		to: 371,
		weight: 0.1102741876411773,
		gater: null
	},
	{
		from: 241,
		to: 372,
		weight: 0.10003668089044086,
		gater: null
	},
	{
		from: 241,
		to: 373,
		weight: 0.032511834182074546,
		gater: null
	},
	{
		from: 241,
		to: 374,
		weight: 0.020040327020744254,
		gater: null
	},
	{
		from: 241,
		to: 375,
		weight: -0.051452191911923344,
		gater: null
	},
	{
		from: 241,
		to: 376,
		weight: 0.06811659537465284,
		gater: null
	},
	{
		from: 241,
		to: 377,
		weight: 0.10012412309049569,
		gater: null
	},
	{
		from: 241,
		to: 378,
		weight: -0.05957199641990442,
		gater: null
	},
	{
		from: 241,
		to: 379,
		weight: -0.09558607704029212,
		gater: null
	},
	{
		from: 242,
		to: 360,
		weight: 0.07548534920190209,
		gater: null
	},
	{
		from: 242,
		to: 361,
		weight: -0.037324458652102,
		gater: null
	},
	{
		from: 242,
		to: 362,
		weight: 0.06270063026480575,
		gater: null
	},
	{
		from: 242,
		to: 363,
		weight: 0.09564745752614118,
		gater: null
	},
	{
		from: 242,
		to: 364,
		weight: -0.08171081250746073,
		gater: null
	},
	{
		from: 242,
		to: 365,
		weight: 0.005197355293521188,
		gater: null
	},
	{
		from: 242,
		to: 366,
		weight: 0.05654666087689683,
		gater: null
	},
	{
		from: 242,
		to: 367,
		weight: -0.005372645612874865,
		gater: null
	},
	{
		from: 242,
		to: 368,
		weight: -0.013430948061964234,
		gater: null
	},
	{
		from: 242,
		to: 369,
		weight: -0.278308750685836,
		gater: null
	},
	{
		from: 242,
		to: 370,
		weight: -0.08183875701836872,
		gater: null
	},
	{
		from: 242,
		to: 371,
		weight: 0.027920655586422035,
		gater: null
	},
	{
		from: 242,
		to: 372,
		weight: -0.06631515388465724,
		gater: null
	},
	{
		from: 242,
		to: 373,
		weight: -0.06279693911753939,
		gater: null
	},
	{
		from: 242,
		to: 374,
		weight: -0.06937121090116258,
		gater: null
	},
	{
		from: 242,
		to: 375,
		weight: 0.014563530370421946,
		gater: null
	},
	{
		from: 242,
		to: 376,
		weight: -0.0662547485970147,
		gater: null
	},
	{
		from: 242,
		to: 377,
		weight: 0.02872990511631711,
		gater: null
	},
	{
		from: 242,
		to: 378,
		weight: -0.04598877920223697,
		gater: null
	},
	{
		from: 242,
		to: 379,
		weight: -0.024335660756488853,
		gater: null
	},
	{
		from: 243,
		to: 360,
		weight: 0.7240520328562396,
		gater: null
	},
	{
		from: 243,
		to: 361,
		weight: 0.7984266768806335,
		gater: null
	},
	{
		from: 243,
		to: 362,
		weight: -1.539122980139,
		gater: null
	},
	{
		from: 243,
		to: 363,
		weight: 1.8247585290088495,
		gater: null
	},
	{
		from: 243,
		to: 364,
		weight: -0.23306290155405598,
		gater: null
	},
	{
		from: 243,
		to: 365,
		weight: -0.39153500885822945,
		gater: null
	},
	{
		from: 243,
		to: 366,
		weight: 1.682427944302067,
		gater: null
	},
	{
		from: 243,
		to: 367,
		weight: 2.9539667917864425,
		gater: null
	},
	{
		from: 243,
		to: 368,
		weight: 1.2820025081535127,
		gater: null
	},
	{
		from: 243,
		to: 369,
		weight: -0.14068470575335199,
		gater: null
	},
	{
		from: 243,
		to: 370,
		weight: -2.164566771066874,
		gater: null
	},
	{
		from: 243,
		to: 371,
		weight: 0.35636574091719636,
		gater: null
	},
	{
		from: 243,
		to: 372,
		weight: -0.17629640732275403,
		gater: null
	},
	{
		from: 243,
		to: 373,
		weight: 0.36982809103139475,
		gater: null
	},
	{
		from: 243,
		to: 374,
		weight: -1.3982351939006532,
		gater: null
	},
	{
		from: 243,
		to: 375,
		weight: -0.2819719467104882,
		gater: null
	},
	{
		from: 243,
		to: 376,
		weight: 1.46911026688037,
		gater: null
	},
	{
		from: 243,
		to: 377,
		weight: 0.396899949220756,
		gater: null
	},
	{
		from: 243,
		to: 378,
		weight: 0.1691006093518336,
		gater: null
	},
	{
		from: 243,
		to: 379,
		weight: 0.3945437812423668,
		gater: null
	},
	{
		from: 244,
		to: 360,
		weight: -2.8175924344480454,
		gater: null
	},
	{
		from: 244,
		to: 361,
		weight: -0.26853366141760227,
		gater: null
	},
	{
		from: 244,
		to: 362,
		weight: 0.47965905536201603,
		gater: null
	},
	{
		from: 244,
		to: 363,
		weight: -2.324527089487467,
		gater: null
	},
	{
		from: 244,
		to: 364,
		weight: -0.8508062055797317,
		gater: null
	},
	{
		from: 244,
		to: 365,
		weight: 0.1170388999122574,
		gater: null
	},
	{
		from: 244,
		to: 366,
		weight: -1.8227082078901757,
		gater: null
	},
	{
		from: 244,
		to: 367,
		weight: -1.1837728882107774,
		gater: null
	},
	{
		from: 244,
		to: 368,
		weight: -1.2946777433060754,
		gater: null
	},
	{
		from: 244,
		to: 369,
		weight: 0.1559600887309337,
		gater: null
	},
	{
		from: 244,
		to: 370,
		weight: -0.5000868761861123,
		gater: null
	},
	{
		from: 244,
		to: 371,
		weight: -0.5883236438995518,
		gater: null
	},
	{
		from: 244,
		to: 372,
		weight: 0.6761530812435841,
		gater: null
	},
	{
		from: 244,
		to: 373,
		weight: -0.5780262634658448,
		gater: null
	},
	{
		from: 244,
		to: 374,
		weight: -0.2681349688353492,
		gater: null
	},
	{
		from: 244,
		to: 375,
		weight: 0.2323417896140278,
		gater: null
	},
	{
		from: 244,
		to: 376,
		weight: -0.025567949219599612,
		gater: null
	},
	{
		from: 244,
		to: 377,
		weight: -0.2694831324135519,
		gater: null
	},
	{
		from: 244,
		to: 378,
		weight: 1.41897896852131,
		gater: null
	},
	{
		from: 244,
		to: 379,
		weight: 0.32754576475810687,
		gater: null
	},
	{
		from: 245,
		to: 360,
		weight: -2.522363027042134,
		gater: null
	},
	{
		from: 245,
		to: 361,
		weight: -0.23104648542485473,
		gater: null
	},
	{
		from: 245,
		to: 362,
		weight: 0.6102508466767959,
		gater: null
	},
	{
		from: 245,
		to: 363,
		weight: -1.0232111658496807,
		gater: null
	},
	{
		from: 245,
		to: 364,
		weight: -0.7962841327698632,
		gater: null
	},
	{
		from: 245,
		to: 365,
		weight: 0.19330528600697403,
		gater: null
	},
	{
		from: 245,
		to: 366,
		weight: -1.7375588730609208,
		gater: null
	},
	{
		from: 245,
		to: 367,
		weight: -1.1263408059866489,
		gater: null
	},
	{
		from: 245,
		to: 368,
		weight: -1.3136231065043817,
		gater: null
	},
	{
		from: 245,
		to: 369,
		weight: -0.09676365392849795,
		gater: null
	},
	{
		from: 245,
		to: 370,
		weight: -0.331128482862057,
		gater: null
	},
	{
		from: 245,
		to: 371,
		weight: -0.48324303542458885,
		gater: null
	},
	{
		from: 245,
		to: 372,
		weight: 0.7457675400516414,
		gater: null
	},
	{
		from: 245,
		to: 373,
		weight: -0.5298520694987587,
		gater: null
	},
	{
		from: 245,
		to: 374,
		weight: -0.1638437468818699,
		gater: null
	},
	{
		from: 245,
		to: 375,
		weight: 0.26908807475667507,
		gater: null
	},
	{
		from: 245,
		to: 376,
		weight: 0.038886849770273645,
		gater: null
	},
	{
		from: 245,
		to: 377,
		weight: -0.23730421966719972,
		gater: null
	},
	{
		from: 245,
		to: 378,
		weight: 1.5735572443388743,
		gater: null
	},
	{
		from: 245,
		to: 379,
		weight: 0.9468246948945512,
		gater: null
	},
	{
		from: 246,
		to: 360,
		weight: -3.1782546066751034,
		gater: null
	},
	{
		from: 246,
		to: 361,
		weight: 0.6888999083540993,
		gater: null
	},
	{
		from: 246,
		to: 362,
		weight: 1.8389553028144296,
		gater: null
	},
	{
		from: 246,
		to: 363,
		weight: -3.8840156827913055,
		gater: null
	},
	{
		from: 246,
		to: 364,
		weight: -1.1105638265044484,
		gater: null
	},
	{
		from: 246,
		to: 365,
		weight: -0.9973878489836339,
		gater: null
	},
	{
		from: 246,
		to: 366,
		weight: -0.0617263295487141,
		gater: null
	},
	{
		from: 246,
		to: 367,
		weight: 2.313581749774757,
		gater: null
	},
	{
		from: 246,
		to: 368,
		weight: -0.31544794593272046,
		gater: null
	},
	{
		from: 246,
		to: 369,
		weight: -0.5387339895306763,
		gater: null
	},
	{
		from: 246,
		to: 370,
		weight: 1.0561065023748255,
		gater: null
	},
	{
		from: 246,
		to: 371,
		weight: -0.32586854250186587,
		gater: null
	},
	{
		from: 246,
		to: 372,
		weight: 0.3232725524567645,
		gater: null
	},
	{
		from: 246,
		to: 373,
		weight: 0.13795222772191507,
		gater: null
	},
	{
		from: 246,
		to: 374,
		weight: 0.26515032487739126,
		gater: null
	},
	{
		from: 246,
		to: 375,
		weight: 0.1420708582617364,
		gater: null
	},
	{
		from: 246,
		to: 376,
		weight: 0.820096635574717,
		gater: null
	},
	{
		from: 246,
		to: 377,
		weight: 0.8763679186582597,
		gater: null
	},
	{
		from: 246,
		to: 378,
		weight: 1.4120507862254754,
		gater: null
	},
	{
		from: 246,
		to: 379,
		weight: 0.4788000857067545,
		gater: null
	},
	{
		from: 247,
		to: 360,
		weight: -0.5693075163546073,
		gater: null
	},
	{
		from: 247,
		to: 361,
		weight: -0.12808794067772344,
		gater: null
	},
	{
		from: 247,
		to: 362,
		weight: 0.7348343873661154,
		gater: null
	},
	{
		from: 247,
		to: 363,
		weight: -1.320312178591242,
		gater: null
	},
	{
		from: 247,
		to: 364,
		weight: -1.2236028377594272,
		gater: null
	},
	{
		from: 247,
		to: 365,
		weight: -0.4192510474413832,
		gater: null
	},
	{
		from: 247,
		to: 366,
		weight: -0.08701629772991289,
		gater: null
	},
	{
		from: 247,
		to: 367,
		weight: -1.5790689046718827,
		gater: null
	},
	{
		from: 247,
		to: 368,
		weight: -1.1874496067086833,
		gater: null
	},
	{
		from: 247,
		to: 369,
		weight: 1.1013448018971779,
		gater: null
	},
	{
		from: 247,
		to: 370,
		weight: -0.46453362549399296,
		gater: null
	},
	{
		from: 247,
		to: 371,
		weight: 1.1941045075783778,
		gater: null
	},
	{
		from: 247,
		to: 372,
		weight: 0.0022340799812845613,
		gater: null
	},
	{
		from: 247,
		to: 373,
		weight: -1.584175890095257,
		gater: null
	},
	{
		from: 247,
		to: 374,
		weight: -1.5197739792115317,
		gater: null
	},
	{
		from: 247,
		to: 375,
		weight: 2.4725998973206975,
		gater: null
	},
	{
		from: 247,
		to: 376,
		weight: -1.8208146699505003,
		gater: null
	},
	{
		from: 247,
		to: 377,
		weight: -1.9188251135119245,
		gater: null
	},
	{
		from: 247,
		to: 378,
		weight: 0.5766783065950272,
		gater: null
	},
	{
		from: 247,
		to: 379,
		weight: 2.528489685403631,
		gater: null
	},
	{
		from: 248,
		to: 360,
		weight: -3.2510692733727713,
		gater: null
	},
	{
		from: 248,
		to: 361,
		weight: -0.5089408928367601,
		gater: null
	},
	{
		from: 248,
		to: 362,
		weight: -1.0020731346887117,
		gater: null
	},
	{
		from: 248,
		to: 363,
		weight: -3.518111744172826,
		gater: null
	},
	{
		from: 248,
		to: 364,
		weight: -0.8523619979666036,
		gater: null
	},
	{
		from: 248,
		to: 365,
		weight: -0.3197280226777593,
		gater: null
	},
	{
		from: 248,
		to: 366,
		weight: 1.1662081370913,
		gater: null
	},
	{
		from: 248,
		to: 367,
		weight: -0.1813084409412237,
		gater: null
	},
	{
		from: 248,
		to: 368,
		weight: 4.139120590537633,
		gater: null
	},
	{
		from: 248,
		to: 369,
		weight: -1.4425970810006843,
		gater: null
	},
	{
		from: 248,
		to: 370,
		weight: 0.14754778235403618,
		gater: null
	},
	{
		from: 248,
		to: 371,
		weight: -0.3484045084449058,
		gater: null
	},
	{
		from: 248,
		to: 372,
		weight: 0.43315432533266923,
		gater: null
	},
	{
		from: 248,
		to: 373,
		weight: -1.5210037529410898,
		gater: null
	},
	{
		from: 248,
		to: 374,
		weight: -1.0631523135848029,
		gater: null
	},
	{
		from: 248,
		to: 375,
		weight: 1.9805940652497735,
		gater: null
	},
	{
		from: 248,
		to: 376,
		weight: -1.366426902598396,
		gater: null
	},
	{
		from: 248,
		to: 377,
		weight: -1.4479708955563808,
		gater: null
	},
	{
		from: 248,
		to: 378,
		weight: 0.6283937266946545,
		gater: null
	},
	{
		from: 248,
		to: 379,
		weight: -1.5147476725950826,
		gater: null
	},
	{
		from: 249,
		to: 360,
		weight: -2.533347746132074,
		gater: null
	},
	{
		from: 249,
		to: 361,
		weight: -0.31883869263900166,
		gater: null
	},
	{
		from: 249,
		to: 362,
		weight: -2.077911707252131,
		gater: null
	},
	{
		from: 249,
		to: 363,
		weight: 0.7103048035596808,
		gater: null
	},
	{
		from: 249,
		to: 364,
		weight: -0.24010845051941673,
		gater: null
	},
	{
		from: 249,
		to: 365,
		weight: -0.777164949483068,
		gater: null
	},
	{
		from: 249,
		to: 366,
		weight: 0.04379226329824264,
		gater: null
	},
	{
		from: 249,
		to: 367,
		weight: -2.0032091255443336,
		gater: null
	},
	{
		from: 249,
		to: 368,
		weight: 1.0971332888811172,
		gater: null
	},
	{
		from: 249,
		to: 369,
		weight: 0.5618937982693741,
		gater: null
	},
	{
		from: 249,
		to: 370,
		weight: -0.8660875880138604,
		gater: null
	},
	{
		from: 249,
		to: 371,
		weight: 0.5451475170784231,
		gater: null
	},
	{
		from: 249,
		to: 372,
		weight: 0.3428507674423738,
		gater: null
	},
	{
		from: 249,
		to: 373,
		weight: -1.2941041091576608,
		gater: null
	},
	{
		from: 249,
		to: 374,
		weight: -1.0969572229153106,
		gater: null
	},
	{
		from: 249,
		to: 375,
		weight: 1.8044063058643416,
		gater: null
	},
	{
		from: 249,
		to: 376,
		weight: -0.7900865272808234,
		gater: null
	},
	{
		from: 249,
		to: 377,
		weight: -0.7280642744405195,
		gater: null
	},
	{
		from: 249,
		to: 378,
		weight: 0.9476216694010785,
		gater: null
	},
	{
		from: 249,
		to: 379,
		weight: 0.5575569953752506,
		gater: null
	},
	{
		from: 250,
		to: 360,
		weight: -2.582127859961188,
		gater: null
	},
	{
		from: 250,
		to: 361,
		weight: -0.21054951760413493,
		gater: null
	},
	{
		from: 250,
		to: 362,
		weight: -0.8745701012043827,
		gater: null
	},
	{
		from: 250,
		to: 363,
		weight: 0.269650473663974,
		gater: null
	},
	{
		from: 250,
		to: 364,
		weight: -0.2746266021560094,
		gater: null
	},
	{
		from: 250,
		to: 365,
		weight: 2.4341191199952474,
		gater: null
	},
	{
		from: 250,
		to: 366,
		weight: 0.10611676256550064,
		gater: null
	},
	{
		from: 250,
		to: 367,
		weight: -0.1310133434130785,
		gater: null
	},
	{
		from: 250,
		to: 368,
		weight: -1.7039449091389722,
		gater: null
	},
	{
		from: 250,
		to: 369,
		weight: -1.0196511907361345,
		gater: null
	},
	{
		from: 250,
		to: 370,
		weight: 3.7055498959043067,
		gater: null
	},
	{
		from: 250,
		to: 371,
		weight: -1.411677882047417,
		gater: null
	},
	{
		from: 250,
		to: 372,
		weight: 1.4120236827794108,
		gater: null
	},
	{
		from: 250,
		to: 373,
		weight: -0.25823916681356546,
		gater: null
	},
	{
		from: 250,
		to: 374,
		weight: 1.6973781117842606,
		gater: null
	},
	{
		from: 250,
		to: 375,
		weight: -3.4640225694788063,
		gater: null
	},
	{
		from: 250,
		to: 376,
		weight: -4.810325782226923,
		gater: null
	},
	{
		from: 250,
		to: 377,
		weight: 3.3001620291673333,
		gater: null
	},
	{
		from: 250,
		to: 378,
		weight: 3.3896534993932868,
		gater: null
	},
	{
		from: 250,
		to: 379,
		weight: 0.013072434038539941,
		gater: null
	},
	{
		from: 251,
		to: 360,
		weight: 0.12286312934702047,
		gater: null
	},
	{
		from: 251,
		to: 361,
		weight: 0.045615136541933866,
		gater: null
	},
	{
		from: 251,
		to: 362,
		weight: 0.0317382953700738,
		gater: null
	},
	{
		from: 251,
		to: 363,
		weight: 0.09174298595698809,
		gater: null
	},
	{
		from: 251,
		to: 364,
		weight: -0.09340495454809444,
		gater: null
	},
	{
		from: 251,
		to: 365,
		weight: -0.07393643728657888,
		gater: null
	},
	{
		from: 251,
		to: 366,
		weight: -0.14393211162553965,
		gater: null
	},
	{
		from: 251,
		to: 367,
		weight: 0.23737896622668553,
		gater: null
	},
	{
		from: 251,
		to: 368,
		weight: 0.03865933569875742,
		gater: null
	},
	{
		from: 251,
		to: 369,
		weight: -0.025001506402811548,
		gater: null
	},
	{
		from: 251,
		to: 370,
		weight: 0.00853399872581858,
		gater: null
	},
	{
		from: 251,
		to: 371,
		weight: 0.024980408848220784,
		gater: null
	},
	{
		from: 251,
		to: 372,
		weight: -0.0013647670293778194,
		gater: null
	},
	{
		from: 251,
		to: 373,
		weight: 0.06815332671892207,
		gater: null
	},
	{
		from: 251,
		to: 374,
		weight: -0.04526953103439339,
		gater: null
	},
	{
		from: 251,
		to: 375,
		weight: -0.04550808156081956,
		gater: null
	},
	{
		from: 251,
		to: 376,
		weight: 0.00937215799671129,
		gater: null
	},
	{
		from: 251,
		to: 377,
		weight: -0.08021888981660051,
		gater: null
	},
	{
		from: 251,
		to: 378,
		weight: -0.0889582531180861,
		gater: null
	},
	{
		from: 251,
		to: 379,
		weight: -0.03922975015646292,
		gater: null
	},
	{
		from: 252,
		to: 360,
		weight: 0.1273275697974273,
		gater: null
	},
	{
		from: 252,
		to: 361,
		weight: -0.023338957213443992,
		gater: null
	},
	{
		from: 252,
		to: 362,
		weight: 0.15817251641913146,
		gater: null
	},
	{
		from: 252,
		to: 363,
		weight: 0.15766446989356073,
		gater: null
	},
	{
		from: 252,
		to: 364,
		weight: -0.14314349076631086,
		gater: null
	},
	{
		from: 252,
		to: 365,
		weight: -0.8296919946479488,
		gater: null
	},
	{
		from: 252,
		to: 366,
		weight: -0.14746403475734884,
		gater: null
	},
	{
		from: 252,
		to: 367,
		weight: 0.2752196960540369,
		gater: null
	},
	{
		from: 252,
		to: 368,
		weight: 0.17661937587305,
		gater: null
	},
	{
		from: 252,
		to: 369,
		weight: -0.28611876139199055,
		gater: null
	},
	{
		from: 252,
		to: 370,
		weight: -0.04344898910504673,
		gater: null
	},
	{
		from: 252,
		to: 371,
		weight: 1.0175377859741424,
		gater: null
	},
	{
		from: 252,
		to: 372,
		weight: 0.015080223494022087,
		gater: null
	},
	{
		from: 252,
		to: 373,
		weight: 0.09396054010049208,
		gater: null
	},
	{
		from: 252,
		to: 374,
		weight: -0.29948376799094034,
		gater: null
	},
	{
		from: 252,
		to: 375,
		weight: 0.05098400127002585,
		gater: null
	},
	{
		from: 252,
		to: 376,
		weight: -0.5032998920621735,
		gater: null
	},
	{
		from: 252,
		to: 377,
		weight: 0.08999542300865335,
		gater: null
	},
	{
		from: 252,
		to: 378,
		weight: 0.042586373215452944,
		gater: null
	},
	{
		from: 252,
		to: 379,
		weight: 0.28137260295639865,
		gater: null
	},
	{
		from: 253,
		to: 360,
		weight: 0.062565602779736,
		gater: null
	},
	{
		from: 253,
		to: 361,
		weight: 0.0502324373537376,
		gater: null
	},
	{
		from: 253,
		to: 362,
		weight: 0.27976850561920374,
		gater: null
	},
	{
		from: 253,
		to: 363,
		weight: 0.07244283899038469,
		gater: null
	},
	{
		from: 253,
		to: 364,
		weight: -0.21431696135526848,
		gater: null
	},
	{
		from: 253,
		to: 365,
		weight: -0.7868326981499136,
		gater: null
	},
	{
		from: 253,
		to: 366,
		weight: -0.28880525641037885,
		gater: null
	},
	{
		from: 253,
		to: 367,
		weight: 0.1568592806903418,
		gater: null
	},
	{
		from: 253,
		to: 368,
		weight: 0.229780021165754,
		gater: null
	},
	{
		from: 253,
		to: 369,
		weight: -0.4512441614590115,
		gater: null
	},
	{
		from: 253,
		to: 370,
		weight: 0.09004726045447198,
		gater: null
	},
	{
		from: 253,
		to: 371,
		weight: 1.0780813511972076,
		gater: null
	},
	{
		from: 253,
		to: 372,
		weight: 0.14574826568765453,
		gater: null
	},
	{
		from: 253,
		to: 373,
		weight: 0.13293028995505868,
		gater: null
	},
	{
		from: 253,
		to: 374,
		weight: -0.17119687520259044,
		gater: null
	},
	{
		from: 253,
		to: 375,
		weight: 0.03111338491300443,
		gater: null
	},
	{
		from: 253,
		to: 376,
		weight: -0.4626331204936997,
		gater: null
	},
	{
		from: 253,
		to: 377,
		weight: -0.04949671460293233,
		gater: null
	},
	{
		from: 253,
		to: 378,
		weight: -0.02174346836426588,
		gater: null
	},
	{
		from: 253,
		to: 379,
		weight: 0.30890583285627204,
		gater: null
	},
	{
		from: 254,
		to: 360,
		weight: -5.074147177008523,
		gater: null
	},
	{
		from: 254,
		to: 361,
		weight: 0.7283624268328935,
		gater: null
	},
	{
		from: 254,
		to: 362,
		weight: -3.493536226566997,
		gater: null
	},
	{
		from: 254,
		to: 363,
		weight: -1.9256250046704873,
		gater: null
	},
	{
		from: 254,
		to: 364,
		weight: 0.0828338554182045,
		gater: null
	},
	{
		from: 254,
		to: 365,
		weight: 2.626417032734298,
		gater: null
	},
	{
		from: 254,
		to: 366,
		weight: 2.0143030057533475,
		gater: null
	},
	{
		from: 254,
		to: 367,
		weight: 0.42659928013934106,
		gater: null
	},
	{
		from: 254,
		to: 368,
		weight: -3.115281961954821,
		gater: null
	},
	{
		from: 254,
		to: 369,
		weight: 1.3726417393774746,
		gater: null
	},
	{
		from: 254,
		to: 370,
		weight: 2.0393527827192,
		gater: null
	},
	{
		from: 254,
		to: 371,
		weight: 0.21404793763710375,
		gater: null
	},
	{
		from: 254,
		to: 372,
		weight: 0.9430130460879115,
		gater: null
	},
	{
		from: 254,
		to: 373,
		weight: 2.856604522645436,
		gater: null
	},
	{
		from: 254,
		to: 374,
		weight: 0.8998814863075187,
		gater: null
	},
	{
		from: 254,
		to: 375,
		weight: -6.170358988622468,
		gater: null
	},
	{
		from: 254,
		to: 376,
		weight: -3.638616168301938,
		gater: null
	},
	{
		from: 254,
		to: 377,
		weight: 1.312855644445589,
		gater: null
	},
	{
		from: 254,
		to: 378,
		weight: 4.814853726856258,
		gater: null
	},
	{
		from: 254,
		to: 379,
		weight: 1.7661555365637227,
		gater: null
	},
	{
		from: 255,
		to: 360,
		weight: 2.5975772892535702,
		gater: null
	},
	{
		from: 255,
		to: 361,
		weight: -0.9922600441686805,
		gater: null
	},
	{
		from: 255,
		to: 362,
		weight: 3.023969281212528,
		gater: null
	},
	{
		from: 255,
		to: 363,
		weight: 2.133026842985971,
		gater: null
	},
	{
		from: 255,
		to: 364,
		weight: -0.359088872472412,
		gater: null
	},
	{
		from: 255,
		to: 365,
		weight: -0.8508074181438169,
		gater: null
	},
	{
		from: 255,
		to: 366,
		weight: -2.135072651283125,
		gater: null
	},
	{
		from: 255,
		to: 367,
		weight: -0.49632115932206966,
		gater: null
	},
	{
		from: 255,
		to: 368,
		weight: 1.6847164984927983,
		gater: null
	},
	{
		from: 255,
		to: 369,
		weight: -3.2127104051753546,
		gater: null
	},
	{
		from: 255,
		to: 370,
		weight: 1.6642729144284198,
		gater: null
	},
	{
		from: 255,
		to: 371,
		weight: -0.5656131608721251,
		gater: null
	},
	{
		from: 255,
		to: 372,
		weight: 0.5687879955998704,
		gater: null
	},
	{
		from: 255,
		to: 373,
		weight: -3.1573663308302273,
		gater: null
	},
	{
		from: 255,
		to: 374,
		weight: 0.6049198587371626,
		gater: null
	},
	{
		from: 255,
		to: 375,
		weight: 2.7594127246285076,
		gater: null
	},
	{
		from: 255,
		to: 376,
		weight: -1.6343412629134646,
		gater: null
	},
	{
		from: 255,
		to: 377,
		weight: 1.9963034694733783,
		gater: null
	},
	{
		from: 255,
		to: 378,
		weight: -1.4779407069948711,
		gater: null
	},
	{
		from: 255,
		to: 379,
		weight: -1.5460998323064854,
		gater: null
	},
	{
		from: 256,
		to: 360,
		weight: 2.9750113533814546,
		gater: null
	},
	{
		from: 256,
		to: 361,
		weight: -0.9930822040619561,
		gater: null
	},
	{
		from: 256,
		to: 362,
		weight: 1.5957939908568637,
		gater: null
	},
	{
		from: 256,
		to: 363,
		weight: 3.0032495445682366,
		gater: null
	},
	{
		from: 256,
		to: 364,
		weight: -0.307651424272755,
		gater: null
	},
	{
		from: 256,
		to: 365,
		weight: -1.0457706202344408,
		gater: null
	},
	{
		from: 256,
		to: 366,
		weight: -1.3462711310352165,
		gater: null
	},
	{
		from: 256,
		to: 367,
		weight: 0.1297738407062254,
		gater: null
	},
	{
		from: 256,
		to: 368,
		weight: -1.4661723145948071,
		gater: null
	},
	{
		from: 256,
		to: 369,
		weight: -3.5266980468939226,
		gater: null
	},
	{
		from: 256,
		to: 370,
		weight: 0.26074944054234594,
		gater: null
	},
	{
		from: 256,
		to: 371,
		weight: 0.45961069346061334,
		gater: null
	},
	{
		from: 256,
		to: 372,
		weight: 0.7046081490609051,
		gater: null
	},
	{
		from: 256,
		to: 373,
		weight: -3.260211589383119,
		gater: null
	},
	{
		from: 256,
		to: 374,
		weight: 0.8650121251689776,
		gater: null
	},
	{
		from: 256,
		to: 375,
		weight: 2.422079312378584,
		gater: null
	},
	{
		from: 256,
		to: 376,
		weight: 3.228403763429071,
		gater: null
	},
	{
		from: 256,
		to: 377,
		weight: 2.4113899991775383,
		gater: null
	},
	{
		from: 256,
		to: 378,
		weight: -1.2135943356253354,
		gater: null
	},
	{
		from: 256,
		to: 379,
		weight: 1.1213688684588217,
		gater: null
	},
	{
		from: 257,
		to: 360,
		weight: -3.1158997518165954,
		gater: null
	},
	{
		from: 257,
		to: 361,
		weight: 1.1876573566352855,
		gater: null
	},
	{
		from: 257,
		to: 362,
		weight: 1.732134232405295,
		gater: null
	},
	{
		from: 257,
		to: 363,
		weight: 3.114670686878298,
		gater: null
	},
	{
		from: 257,
		to: 364,
		weight: 0.895218107785602,
		gater: null
	},
	{
		from: 257,
		to: 365,
		weight: -0.4477535668069133,
		gater: null
	},
	{
		from: 257,
		to: 366,
		weight: 3.630675389461837,
		gater: null
	},
	{
		from: 257,
		to: 367,
		weight: 3.069332641488781,
		gater: null
	},
	{
		from: 257,
		to: 368,
		weight: 2.1515501859021002,
		gater: null
	},
	{
		from: 257,
		to: 369,
		weight: 0.7961620158583382,
		gater: null
	},
	{
		from: 257,
		to: 370,
		weight: 3.2057275296793835,
		gater: null
	},
	{
		from: 257,
		to: 371,
		weight: -1.2666611127895055,
		gater: null
	},
	{
		from: 257,
		to: 372,
		weight: -2.3385497285932293,
		gater: null
	},
	{
		from: 257,
		to: 373,
		weight: -0.46216778608955916,
		gater: null
	},
	{
		from: 257,
		to: 374,
		weight: -1.37562011220684,
		gater: null
	},
	{
		from: 257,
		to: 375,
		weight: -2.3444994007967104,
		gater: null
	},
	{
		from: 257,
		to: 376,
		weight: 0.12594033329069146,
		gater: null
	},
	{
		from: 257,
		to: 377,
		weight: -8.018376876068253,
		gater: null
	},
	{
		from: 257,
		to: 378,
		weight: -3.323812881181945,
		gater: null
	},
	{
		from: 257,
		to: 379,
		weight: 0.10123932037004212,
		gater: null
	},
	{
		from: 258,
		to: 360,
		weight: -0.8171819567084443,
		gater: null
	},
	{
		from: 258,
		to: 361,
		weight: -0.8925746752848708,
		gater: null
	},
	{
		from: 258,
		to: 362,
		weight: -4.961288772025503,
		gater: null
	},
	{
		from: 258,
		to: 363,
		weight: -4.07331487705399,
		gater: null
	},
	{
		from: 258,
		to: 364,
		weight: -2.4019497451455862,
		gater: null
	},
	{
		from: 258,
		to: 365,
		weight: -0.3257375539597054,
		gater: null
	},
	{
		from: 258,
		to: 366,
		weight: -4.4369714314933395,
		gater: null
	},
	{
		from: 258,
		to: 367,
		weight: -1.6613988737677563,
		gater: null
	},
	{
		from: 258,
		to: 368,
		weight: -1.7489936368377283,
		gater: null
	},
	{
		from: 258,
		to: 369,
		weight: 1.3327778851524332,
		gater: null
	},
	{
		from: 258,
		to: 370,
		weight: -0.41237915416992826,
		gater: null
	},
	{
		from: 258,
		to: 371,
		weight: 0.3909100955028298,
		gater: null
	},
	{
		from: 258,
		to: 372,
		weight: 4.444039812433282,
		gater: null
	},
	{
		from: 258,
		to: 373,
		weight: -0.5756783211890193,
		gater: null
	},
	{
		from: 258,
		to: 374,
		weight: -2.96099537256277,
		gater: null
	},
	{
		from: 258,
		to: 375,
		weight: -2.809413969358759,
		gater: null
	},
	{
		from: 258,
		to: 376,
		weight: -4.8885084246390145,
		gater: null
	},
	{
		from: 258,
		to: 377,
		weight: -5.58849565705452,
		gater: null
	},
	{
		from: 258,
		to: 378,
		weight: -2.5669111873943162,
		gater: null
	},
	{
		from: 258,
		to: 379,
		weight: -0.7052101794693978,
		gater: null
	},
	{
		from: 259,
		to: 360,
		weight: 4.214060983855175,
		gater: null
	},
	{
		from: 259,
		to: 361,
		weight: 0.024011093200703344,
		gater: null
	},
	{
		from: 259,
		to: 362,
		weight: -1.8894220816848455,
		gater: null
	},
	{
		from: 259,
		to: 363,
		weight: 3.949804807744822,
		gater: null
	},
	{
		from: 259,
		to: 364,
		weight: 2.506902071624783,
		gater: null
	},
	{
		from: 259,
		to: 365,
		weight: 0.23876526776838689,
		gater: null
	},
	{
		from: 259,
		to: 366,
		weight: 3.4500651803011158,
		gater: null
	},
	{
		from: 259,
		to: 367,
		weight: -0.7690950175393835,
		gater: null
	},
	{
		from: 259,
		to: 368,
		weight: 3.726743270124681,
		gater: null
	},
	{
		from: 259,
		to: 369,
		weight: -7.768939823627605,
		gater: null
	},
	{
		from: 259,
		to: 370,
		weight: -1.2947623508902262,
		gater: null
	},
	{
		from: 259,
		to: 371,
		weight: 2.9834076271196928,
		gater: null
	},
	{
		from: 259,
		to: 372,
		weight: -2.777007738935023,
		gater: null
	},
	{
		from: 259,
		to: 373,
		weight: 0.5871105853305945,
		gater: null
	},
	{
		from: 259,
		to: 374,
		weight: 2.126256042757243,
		gater: null
	},
	{
		from: 259,
		to: 375,
		weight: -8.436834001811942,
		gater: null
	},
	{
		from: 259,
		to: 376,
		weight: -2.2598857332794307,
		gater: null
	},
	{
		from: 259,
		to: 377,
		weight: 2.6724930853740845,
		gater: null
	},
	{
		from: 259,
		to: 378,
		weight: 1.9483787389979554,
		gater: null
	},
	{
		from: 259,
		to: 379,
		weight: -0.503338945932496,
		gater: null
	},
	{
		from: 260,
		to: 360,
		weight: -1.8471456332515153,
		gater: null
	},
	{
		from: 260,
		to: 361,
		weight: 1.807077600881713,
		gater: null
	},
	{
		from: 260,
		to: 362,
		weight: -4.796202113241691,
		gater: null
	},
	{
		from: 260,
		to: 363,
		weight: -1.1764014700005292,
		gater: null
	},
	{
		from: 260,
		to: 364,
		weight: -0.7283436813467474,
		gater: null
	},
	{
		from: 260,
		to: 365,
		weight: 2.541751251047247,
		gater: null
	},
	{
		from: 260,
		to: 366,
		weight: 1.1586728848775616,
		gater: null
	},
	{
		from: 260,
		to: 367,
		weight: 2.6704407876909184,
		gater: null
	},
	{
		from: 260,
		to: 368,
		weight: -0.2668642045199958,
		gater: null
	},
	{
		from: 260,
		to: 369,
		weight: -1.4996825566138123,
		gater: null
	},
	{
		from: 260,
		to: 370,
		weight: -0.34223948178275704,
		gater: null
	},
	{
		from: 260,
		to: 371,
		weight: -6.136347633522279,
		gater: null
	},
	{
		from: 260,
		to: 372,
		weight: -1.883249078810893,
		gater: null
	},
	{
		from: 260,
		to: 373,
		weight: 2.8064566371695205,
		gater: null
	},
	{
		from: 260,
		to: 374,
		weight: -1.6477673599610756,
		gater: null
	},
	{
		from: 260,
		to: 375,
		weight: 1.696065051733206,
		gater: null
	},
	{
		from: 260,
		to: 376,
		weight: 0.9974005091069277,
		gater: null
	},
	{
		from: 260,
		to: 377,
		weight: 7.24190359724459,
		gater: null
	},
	{
		from: 260,
		to: 378,
		weight: 3.7238108972244612,
		gater: null
	},
	{
		from: 260,
		to: 379,
		weight: 0.7919096849841163,
		gater: null
	},
	{
		from: 261,
		to: 360,
		weight: 0.7945053738452156,
		gater: null
	},
	{
		from: 261,
		to: 361,
		weight: 1.418129477146479,
		gater: null
	},
	{
		from: 261,
		to: 362,
		weight: 6.229651232140061,
		gater: null
	},
	{
		from: 261,
		to: 363,
		weight: -7.956251587212727,
		gater: null
	},
	{
		from: 261,
		to: 364,
		weight: -3.314195217771539,
		gater: null
	},
	{
		from: 261,
		to: 365,
		weight: -3.5397182463885697,
		gater: null
	},
	{
		from: 261,
		to: 366,
		weight: -1.346016563897209,
		gater: null
	},
	{
		from: 261,
		to: 367,
		weight: -1.1669254434302363,
		gater: null
	},
	{
		from: 261,
		to: 368,
		weight: -1.9122644783494644,
		gater: null
	},
	{
		from: 261,
		to: 369,
		weight: -1.632463113481459,
		gater: null
	},
	{
		from: 261,
		to: 370,
		weight: -4.216108764400201,
		gater: null
	},
	{
		from: 261,
		to: 371,
		weight: 2.8431439643445446,
		gater: null
	},
	{
		from: 261,
		to: 372,
		weight: 6.148529986176817,
		gater: null
	},
	{
		from: 261,
		to: 373,
		weight: 1.0304862915784252,
		gater: null
	},
	{
		from: 261,
		to: 374,
		weight: 1.8459106683102655,
		gater: null
	},
	{
		from: 261,
		to: 375,
		weight: 4.035727275888762,
		gater: null
	},
	{
		from: 261,
		to: 376,
		weight: -4.4014761634372395,
		gater: null
	},
	{
		from: 261,
		to: 377,
		weight: 1.2668331154787074,
		gater: null
	},
	{
		from: 261,
		to: 378,
		weight: -5.579313641207295,
		gater: null
	},
	{
		from: 261,
		to: 379,
		weight: 0.20380743689752465,
		gater: null
	},
	{
		from: 262,
		to: 360,
		weight: 0.05129302994985514,
		gater: null
	},
	{
		from: 262,
		to: 361,
		weight: 0.09357916913670103,
		gater: null
	},
	{
		from: 262,
		to: 362,
		weight: 0.21038292471061049,
		gater: null
	},
	{
		from: 262,
		to: 363,
		weight: -0.033402638163234244,
		gater: null
	},
	{
		from: 262,
		to: 364,
		weight: -0.14009432065727725,
		gater: null
	},
	{
		from: 262,
		to: 365,
		weight: -0.7070098506378938,
		gater: null
	},
	{
		from: 262,
		to: 366,
		weight: 0.07614611938887267,
		gater: null
	},
	{
		from: 262,
		to: 367,
		weight: 0.04419935118632693,
		gater: null
	},
	{
		from: 262,
		to: 368,
		weight: -0.005219155853674504,
		gater: null
	},
	{
		from: 262,
		to: 369,
		weight: -0.48037514403678827,
		gater: null
	},
	{
		from: 262,
		to: 370,
		weight: 0.10692053960529566,
		gater: null
	},
	{
		from: 262,
		to: 371,
		weight: 1.00139501675614,
		gater: null
	},
	{
		from: 262,
		to: 372,
		weight: 0.0706023915827357,
		gater: null
	},
	{
		from: 262,
		to: 373,
		weight: 0.0473283678064511,
		gater: null
	},
	{
		from: 262,
		to: 374,
		weight: -0.003746554155106331,
		gater: null
	},
	{
		from: 262,
		to: 375,
		weight: 0.029015612222567343,
		gater: null
	},
	{
		from: 262,
		to: 376,
		weight: -0.3615649060528859,
		gater: null
	},
	{
		from: 262,
		to: 377,
		weight: 0.052552115125556895,
		gater: null
	},
	{
		from: 262,
		to: 378,
		weight: 0.06032031386132785,
		gater: null
	},
	{
		from: 262,
		to: 379,
		weight: 0.23004177859886699,
		gater: null
	},
	{
		from: 263,
		to: 360,
		weight: 0.19676035428057537,
		gater: null
	},
	{
		from: 263,
		to: 361,
		weight: -0.05610363428732402,
		gater: null
	},
	{
		from: 263,
		to: 362,
		weight: 0.05740589741034024,
		gater: null
	},
	{
		from: 263,
		to: 363,
		weight: 0.09160635761974482,
		gater: null
	},
	{
		from: 263,
		to: 364,
		weight: -0.06951851379015686,
		gater: null
	},
	{
		from: 263,
		to: 365,
		weight: -0.12851333232931259,
		gater: null
	},
	{
		from: 263,
		to: 366,
		weight: -0.4359220948783726,
		gater: null
	},
	{
		from: 263,
		to: 367,
		weight: 0.03440315986909737,
		gater: null
	},
	{
		from: 263,
		to: 368,
		weight: 0.23046378466602185,
		gater: null
	},
	{
		from: 263,
		to: 369,
		weight: -0.0010818765240379533,
		gater: null
	},
	{
		from: 263,
		to: 370,
		weight: 0.031729102759703615,
		gater: null
	},
	{
		from: 263,
		to: 371,
		weight: 0.12358356158037735,
		gater: null
	},
	{
		from: 263,
		to: 372,
		weight: 0.07136826717970754,
		gater: null
	},
	{
		from: 263,
		to: 373,
		weight: 0.06105133662908103,
		gater: null
	},
	{
		from: 263,
		to: 374,
		weight: -0.26983106303804516,
		gater: null
	},
	{
		from: 263,
		to: 375,
		weight: -0.07991017841630095,
		gater: null
	},
	{
		from: 263,
		to: 376,
		weight: -0.06903788717022648,
		gater: null
	},
	{
		from: 263,
		to: 377,
		weight: -0.021036189980987406,
		gater: null
	},
	{
		from: 263,
		to: 378,
		weight: 0.09010472417339195,
		gater: null
	},
	{
		from: 263,
		to: 379,
		weight: 0.022702559661523836,
		gater: null
	},
	{
		from: 264,
		to: 360,
		weight: 0.20596943724327968,
		gater: null
	},
	{
		from: 264,
		to: 361,
		weight: 0.1039119426913156,
		gater: null
	},
	{
		from: 264,
		to: 362,
		weight: 0.16042252534291243,
		gater: null
	},
	{
		from: 264,
		to: 363,
		weight: 0.07270179324243843,
		gater: null
	},
	{
		from: 264,
		to: 364,
		weight: 0.058773308181200024,
		gater: null
	},
	{
		from: 264,
		to: 365,
		weight: 0.04063943150528273,
		gater: null
	},
	{
		from: 264,
		to: 366,
		weight: -0.3405322457921822,
		gater: null
	},
	{
		from: 264,
		to: 367,
		weight: 0.07855653649105589,
		gater: null
	},
	{
		from: 264,
		to: 368,
		weight: 0.04435366454062514,
		gater: null
	},
	{
		from: 264,
		to: 369,
		weight: -0.28628667014993797,
		gater: null
	},
	{
		from: 264,
		to: 370,
		weight: -0.057075623159969995,
		gater: null
	},
	{
		from: 264,
		to: 371,
		weight: 0.04421865677311274,
		gater: null
	},
	{
		from: 264,
		to: 372,
		weight: 0.010970856287724495,
		gater: null
	},
	{
		from: 264,
		to: 373,
		weight: -0.027934286853269142,
		gater: null
	},
	{
		from: 264,
		to: 374,
		weight: -0.0929544130986828,
		gater: null
	},
	{
		from: 264,
		to: 375,
		weight: -0.08050285408187843,
		gater: null
	},
	{
		from: 264,
		to: 376,
		weight: -0.08422692634520089,
		gater: null
	},
	{
		from: 264,
		to: 377,
		weight: 0.0707361457875159,
		gater: null
	},
	{
		from: 264,
		to: 378,
		weight: -0.06685290725101373,
		gater: null
	},
	{
		from: 264,
		to: 379,
		weight: 0.06517200886587539,
		gater: null
	},
	{
		from: 265,
		to: 360,
		weight: -2.1078026521195947,
		gater: null
	},
	{
		from: 265,
		to: 361,
		weight: 1.839550239356933,
		gater: null
	},
	{
		from: 265,
		to: 362,
		weight: 7.492363121425088,
		gater: null
	},
	{
		from: 265,
		to: 363,
		weight: -3.6569292407013467,
		gater: null
	},
	{
		from: 265,
		to: 364,
		weight: -3.0699581925215296,
		gater: null
	},
	{
		from: 265,
		to: 365,
		weight: -0.8085904481078398,
		gater: null
	},
	{
		from: 265,
		to: 366,
		weight: -3.824226453467218,
		gater: null
	},
	{
		from: 265,
		to: 367,
		weight: 1.7331495634030631,
		gater: null
	},
	{
		from: 265,
		to: 368,
		weight: -2.4055081552588744,
		gater: null
	},
	{
		from: 265,
		to: 369,
		weight: -1.2662604954859658,
		gater: null
	},
	{
		from: 265,
		to: 370,
		weight: -1.1469664882019297,
		gater: null
	},
	{
		from: 265,
		to: 371,
		weight: 1.3930348548932954,
		gater: null
	},
	{
		from: 265,
		to: 372,
		weight: 4.175195753882496,
		gater: null
	},
	{
		from: 265,
		to: 373,
		weight: 1.461506239902118,
		gater: null
	},
	{
		from: 265,
		to: 374,
		weight: -0.5235759154367216,
		gater: null
	},
	{
		from: 265,
		to: 375,
		weight: -0.7979202580559234,
		gater: null
	},
	{
		from: 265,
		to: 376,
		weight: 0.6129322406947103,
		gater: null
	},
	{
		from: 265,
		to: 377,
		weight: 0.5924192602196579,
		gater: null
	},
	{
		from: 265,
		to: 378,
		weight: -1.8405018326827725,
		gater: null
	},
	{
		from: 265,
		to: 379,
		weight: 2.0044569786714326,
		gater: null
	},
	{
		from: 266,
		to: 360,
		weight: 3.364881369110758,
		gater: null
	},
	{
		from: 266,
		to: 361,
		weight: 0.14502512090700015,
		gater: null
	},
	{
		from: 266,
		to: 362,
		weight: -1.4469592395478357,
		gater: null
	},
	{
		from: 266,
		to: 363,
		weight: -4.22605908654228,
		gater: null
	},
	{
		from: 266,
		to: 364,
		weight: -0.47640737864961646,
		gater: null
	},
	{
		from: 266,
		to: 365,
		weight: -3.2683569481618004,
		gater: null
	},
	{
		from: 266,
		to: 366,
		weight: 1.0337459012585757,
		gater: null
	},
	{
		from: 266,
		to: 367,
		weight: -2.3359170835326744,
		gater: null
	},
	{
		from: 266,
		to: 368,
		weight: 0.4129076860174227,
		gater: null
	},
	{
		from: 266,
		to: 369,
		weight: -0.5957115838570426,
		gater: null
	},
	{
		from: 266,
		to: 370,
		weight: -2.9511128538548603,
		gater: null
	},
	{
		from: 266,
		to: 371,
		weight: 1.5286382505524043,
		gater: null
	},
	{
		from: 266,
		to: 372,
		weight: 2.332707136319326,
		gater: null
	},
	{
		from: 266,
		to: 373,
		weight: -0.4413806333483935,
		gater: null
	},
	{
		from: 266,
		to: 374,
		weight: 1.294743781982955,
		gater: null
	},
	{
		from: 266,
		to: 375,
		weight: 4.649113488110083,
		gater: null
	},
	{
		from: 266,
		to: 376,
		weight: -5.307697397535736,
		gater: null
	},
	{
		from: 266,
		to: 377,
		weight: 0.7200676347450538,
		gater: null
	},
	{
		from: 266,
		to: 378,
		weight: -3.656819558456251,
		gater: null
	},
	{
		from: 266,
		to: 379,
		weight: -1.31998243536229,
		gater: null
	},
	{
		from: 267,
		to: 360,
		weight: 3.129541985762323,
		gater: null
	},
	{
		from: 267,
		to: 361,
		weight: -0.21599699993521373,
		gater: null
	},
	{
		from: 267,
		to: 362,
		weight: 0.3106452349151747,
		gater: null
	},
	{
		from: 267,
		to: 363,
		weight: 5.773171139432724,
		gater: null
	},
	{
		from: 267,
		to: 364,
		weight: -1.2951559038164535,
		gater: null
	},
	{
		from: 267,
		to: 365,
		weight: -0.25184048746900267,
		gater: null
	},
	{
		from: 267,
		to: 366,
		weight: -4.765785226807371,
		gater: null
	},
	{
		from: 267,
		to: 367,
		weight: 3.9045671339915797,
		gater: null
	},
	{
		from: 267,
		to: 368,
		weight: 1.0495231618607987,
		gater: null
	},
	{
		from: 267,
		to: 369,
		weight: -2.922224074119012,
		gater: null
	},
	{
		from: 267,
		to: 370,
		weight: -3.129414960624106,
		gater: null
	},
	{
		from: 267,
		to: 371,
		weight: 1.7128714924194866,
		gater: null
	},
	{
		from: 267,
		to: 372,
		weight: 0.14137032728735882,
		gater: null
	},
	{
		from: 267,
		to: 373,
		weight: 0.8849912211502445,
		gater: null
	},
	{
		from: 267,
		to: 374,
		weight: -1.696608857426108,
		gater: null
	},
	{
		from: 267,
		to: 375,
		weight: 6.782576504051139,
		gater: null
	},
	{
		from: 267,
		to: 376,
		weight: 4.994600133115843,
		gater: null
	},
	{
		from: 267,
		to: 377,
		weight: 3.8456957375335348,
		gater: null
	},
	{
		from: 267,
		to: 378,
		weight: -4.515057687924691,
		gater: null
	},
	{
		from: 267,
		to: 379,
		weight: 2.8454969751568875,
		gater: null
	},
	{
		from: 268,
		to: 360,
		weight: -4.577186090711977,
		gater: null
	},
	{
		from: 268,
		to: 361,
		weight: -1.3991539034917033,
		gater: null
	},
	{
		from: 268,
		to: 362,
		weight: 10.993676276853483,
		gater: null
	},
	{
		from: 268,
		to: 363,
		weight: 5.624216624243592,
		gater: null
	},
	{
		from: 268,
		to: 364,
		weight: 1.1527673974505506,
		gater: null
	},
	{
		from: 268,
		to: 365,
		weight: 0.7810620843345836,
		gater: null
	},
	{
		from: 268,
		to: 366,
		weight: 2.3606967250605133,
		gater: null
	},
	{
		from: 268,
		to: 367,
		weight: -1.3029593878780057,
		gater: null
	},
	{
		from: 268,
		to: 368,
		weight: 5.21838948222339,
		gater: null
	},
	{
		from: 268,
		to: 369,
		weight: 1.3934362648563272,
		gater: null
	},
	{
		from: 268,
		to: 370,
		weight: 3.346249150863603,
		gater: null
	},
	{
		from: 268,
		to: 371,
		weight: 0.5152967301754388,
		gater: null
	},
	{
		from: 268,
		to: 372,
		weight: -5.6771790543052205,
		gater: null
	},
	{
		from: 268,
		to: 373,
		weight: 0.7117127083590038,
		gater: null
	},
	{
		from: 268,
		to: 374,
		weight: 1.3257783984050104,
		gater: null
	},
	{
		from: 268,
		to: 375,
		weight: 6.449209115642112,
		gater: null
	},
	{
		from: 268,
		to: 376,
		weight: 1.5481521242763214,
		gater: null
	},
	{
		from: 268,
		to: 377,
		weight: -2.9482479008232008,
		gater: null
	},
	{
		from: 268,
		to: 378,
		weight: -4.139517938449389,
		gater: null
	},
	{
		from: 268,
		to: 379,
		weight: 1.4528156383698825,
		gater: null
	},
	{
		from: 269,
		to: 360,
		weight: 1.8797859357369937,
		gater: null
	},
	{
		from: 269,
		to: 361,
		weight: -0.5151476708423665,
		gater: null
	},
	{
		from: 269,
		to: 362,
		weight: -10.564215926690114,
		gater: null
	},
	{
		from: 269,
		to: 363,
		weight: -1.5122074660550262,
		gater: null
	},
	{
		from: 269,
		to: 364,
		weight: -7.808502571975101,
		gater: null
	},
	{
		from: 269,
		to: 365,
		weight: 5.711236011479134,
		gater: null
	},
	{
		from: 269,
		to: 366,
		weight: 2.700473134617084,
		gater: null
	},
	{
		from: 269,
		to: 367,
		weight: 0.1380224992655666,
		gater: null
	},
	{
		from: 269,
		to: 368,
		weight: -0.038414433094842396,
		gater: null
	},
	{
		from: 269,
		to: 369,
		weight: -9.319442341998682,
		gater: null
	},
	{
		from: 269,
		to: 370,
		weight: 2.537968053183417,
		gater: null
	},
	{
		from: 269,
		to: 371,
		weight: -2.5777445227113995,
		gater: null
	},
	{
		from: 269,
		to: 372,
		weight: 1.8050072651025395,
		gater: null
	},
	{
		from: 269,
		to: 373,
		weight: 4.422594305351193,
		gater: null
	},
	{
		from: 269,
		to: 374,
		weight: -1.0714607661818152,
		gater: null
	},
	{
		from: 269,
		to: 375,
		weight: -4.148908930908785,
		gater: null
	},
	{
		from: 269,
		to: 376,
		weight: -1.8445052385704857,
		gater: null
	},
	{
		from: 269,
		to: 377,
		weight: -8.319146707151518,
		gater: null
	},
	{
		from: 269,
		to: 378,
		weight: -1.627226925744922,
		gater: null
	},
	{
		from: 269,
		to: 379,
		weight: -0.09513374294913979,
		gater: null
	},
	{
		from: 270,
		to: 360,
		weight: -2.3615196549717643,
		gater: null
	},
	{
		from: 270,
		to: 361,
		weight: 1.9564329376201053,
		gater: null
	},
	{
		from: 270,
		to: 362,
		weight: -1.5231582551514449,
		gater: null
	},
	{
		from: 270,
		to: 363,
		weight: -0.1626240889596269,
		gater: null
	},
	{
		from: 270,
		to: 364,
		weight: 4.169627511450015,
		gater: null
	},
	{
		from: 270,
		to: 365,
		weight: -1.1843734470798897,
		gater: null
	},
	{
		from: 270,
		to: 366,
		weight: -2.5212733548167274,
		gater: null
	},
	{
		from: 270,
		to: 367,
		weight: 2.0885371093093013,
		gater: null
	},
	{
		from: 270,
		to: 368,
		weight: 5.19891214753505,
		gater: null
	},
	{
		from: 270,
		to: 369,
		weight: -4.8415635529672905,
		gater: null
	},
	{
		from: 270,
		to: 370,
		weight: 3.8847275513017854,
		gater: null
	},
	{
		from: 270,
		to: 371,
		weight: -0.8619396864399904,
		gater: null
	},
	{
		from: 270,
		to: 372,
		weight: -3.915431447270802,
		gater: null
	},
	{
		from: 270,
		to: 373,
		weight: -0.3714567943596295,
		gater: null
	},
	{
		from: 270,
		to: 374,
		weight: -0.9711218274087212,
		gater: null
	},
	{
		from: 270,
		to: 375,
		weight: -0.5830538018736068,
		gater: null
	},
	{
		from: 270,
		to: 376,
		weight: 5.467360337018952,
		gater: null
	},
	{
		from: 270,
		to: 377,
		weight: -3.411156886691014,
		gater: null
	},
	{
		from: 270,
		to: 378,
		weight: 8.568585922188321,
		gater: null
	},
	{
		from: 270,
		to: 379,
		weight: -4.647677554692076,
		gater: null
	},
	{
		from: 271,
		to: 360,
		weight: 3.491692205614917,
		gater: null
	},
	{
		from: 271,
		to: 361,
		weight: -0.2553058510608496,
		gater: null
	},
	{
		from: 271,
		to: 362,
		weight: -3.60937953871049,
		gater: null
	},
	{
		from: 271,
		to: 363,
		weight: 0.43459347834945505,
		gater: null
	},
	{
		from: 271,
		to: 364,
		weight: -8.332777750077224,
		gater: null
	},
	{
		from: 271,
		to: 365,
		weight: -0.21008041315881343,
		gater: null
	},
	{
		from: 271,
		to: 366,
		weight: 0.9463680327131938,
		gater: null
	},
	{
		from: 271,
		to: 367,
		weight: -1.3724480254016231,
		gater: null
	},
	{
		from: 271,
		to: 368,
		weight: 0.016146798958815843,
		gater: null
	},
	{
		from: 271,
		to: 369,
		weight: -9.178502409368484,
		gater: null
	},
	{
		from: 271,
		to: 370,
		weight: -2.658962394211756,
		gater: null
	},
	{
		from: 271,
		to: 371,
		weight: -4.108466109775091,
		gater: null
	},
	{
		from: 271,
		to: 372,
		weight: -1.0466101276523452,
		gater: null
	},
	{
		from: 271,
		to: 373,
		weight: -0.8736562538460102,
		gater: null
	},
	{
		from: 271,
		to: 374,
		weight: -3.099014493379234,
		gater: null
	},
	{
		from: 271,
		to: 375,
		weight: 0.9925378513694011,
		gater: null
	},
	{
		from: 271,
		to: 376,
		weight: 2.157674749189705,
		gater: null
	},
	{
		from: 271,
		to: 377,
		weight: 5.41880445104209,
		gater: null
	},
	{
		from: 271,
		to: 378,
		weight: 4.627442177518004,
		gater: null
	},
	{
		from: 271,
		to: 379,
		weight: -0.8771344952853611,
		gater: null
	},
	{
		from: 272,
		to: 360,
		weight: 3.3765260993724344,
		gater: null
	},
	{
		from: 272,
		to: 361,
		weight: 1.6867173330361787,
		gater: null
	},
	{
		from: 272,
		to: 362,
		weight: 3.572602484155449,
		gater: null
	},
	{
		from: 272,
		to: 363,
		weight: 1.2493488869846323,
		gater: null
	},
	{
		from: 272,
		to: 364,
		weight: 7.864510396406949,
		gater: null
	},
	{
		from: 272,
		to: 365,
		weight: 3.76298583584206,
		gater: null
	},
	{
		from: 272,
		to: 366,
		weight: 1.0603565374818773,
		gater: null
	},
	{
		from: 272,
		to: 367,
		weight: -1.1228681615901,
		gater: null
	},
	{
		from: 272,
		to: 368,
		weight: -4.639336854621466,
		gater: null
	},
	{
		from: 272,
		to: 369,
		weight: 2.1850862079613247,
		gater: null
	},
	{
		from: 272,
		to: 370,
		weight: -1.3453623570931486,
		gater: null
	},
	{
		from: 272,
		to: 371,
		weight: 3.844679064671412,
		gater: null
	},
	{
		from: 272,
		to: 372,
		weight: -0.44084124660458174,
		gater: null
	},
	{
		from: 272,
		to: 373,
		weight: -2.715454100551875,
		gater: null
	},
	{
		from: 272,
		to: 374,
		weight: -0.5531297388641448,
		gater: null
	},
	{
		from: 272,
		to: 375,
		weight: -1.9567791080082686,
		gater: null
	},
	{
		from: 272,
		to: 376,
		weight: -0.4545267838036722,
		gater: null
	},
	{
		from: 272,
		to: 377,
		weight: 5.44706224013607,
		gater: null
	},
	{
		from: 272,
		to: 378,
		weight: -2.9466081359759033,
		gater: null
	},
	{
		from: 272,
		to: 379,
		weight: 3.9286703871972626,
		gater: null
	},
	{
		from: 273,
		to: 360,
		weight: 0.12423903956883328,
		gater: null
	},
	{
		from: 273,
		to: 361,
		weight: 0.42773400894632396,
		gater: null
	},
	{
		from: 273,
		to: 362,
		weight: -0.40252124758179325,
		gater: null
	},
	{
		from: 273,
		to: 363,
		weight: -0.0031550343052918354,
		gater: null
	},
	{
		from: 273,
		to: 364,
		weight: -0.31867552160372015,
		gater: null
	},
	{
		from: 273,
		to: 365,
		weight: -0.206498254564326,
		gater: null
	},
	{
		from: 273,
		to: 366,
		weight: -0.3933821848661094,
		gater: null
	},
	{
		from: 273,
		to: 367,
		weight: 0.26404644065131516,
		gater: null
	},
	{
		from: 273,
		to: 368,
		weight: -0.32955872213773685,
		gater: null
	},
	{
		from: 273,
		to: 369,
		weight: -0.1254625487967403,
		gater: null
	},
	{
		from: 273,
		to: 370,
		weight: 0.009901074576473228,
		gater: null
	},
	{
		from: 273,
		to: 371,
		weight: -0.04062267796054017,
		gater: null
	},
	{
		from: 273,
		to: 372,
		weight: 0.08922286608109475,
		gater: null
	},
	{
		from: 273,
		to: 373,
		weight: 0.08591497526108995,
		gater: null
	},
	{
		from: 273,
		to: 374,
		weight: -0.06767855913400268,
		gater: null
	},
	{
		from: 273,
		to: 375,
		weight: -0.017074131881667252,
		gater: null
	},
	{
		from: 273,
		to: 376,
		weight: -0.11565787955601255,
		gater: null
	},
	{
		from: 273,
		to: 377,
		weight: -0.06124733524270968,
		gater: null
	},
	{
		from: 273,
		to: 378,
		weight: 0.06809575089651232,
		gater: null
	},
	{
		from: 273,
		to: 379,
		weight: 0.17954141833928883,
		gater: null
	},
	{
		from: 274,
		to: 360,
		weight: 0.2459597156455239,
		gater: null
	},
	{
		from: 274,
		to: 361,
		weight: 0.7480213451843395,
		gater: null
	},
	{
		from: 274,
		to: 362,
		weight: 0.356880242956372,
		gater: null
	},
	{
		from: 274,
		to: 363,
		weight: -0.002099722551357599,
		gater: null
	},
	{
		from: 274,
		to: 364,
		weight: -0.3132574825046921,
		gater: null
	},
	{
		from: 274,
		to: 365,
		weight: -0.8962416225849513,
		gater: null
	},
	{
		from: 274,
		to: 366,
		weight: -0.5654804227453846,
		gater: null
	},
	{
		from: 274,
		to: 367,
		weight: 0.5994003444553507,
		gater: null
	},
	{
		from: 274,
		to: 368,
		weight: 0.3286680848404582,
		gater: null
	},
	{
		from: 274,
		to: 369,
		weight: -0.4010501828338987,
		gater: null
	},
	{
		from: 274,
		to: 370,
		weight: 0.18835230736343603,
		gater: null
	},
	{
		from: 274,
		to: 371,
		weight: 1.119388865914283,
		gater: null
	},
	{
		from: 274,
		to: 372,
		weight: 0.2951373588880404,
		gater: null
	},
	{
		from: 274,
		to: 373,
		weight: 0.11210812744996561,
		gater: null
	},
	{
		from: 274,
		to: 374,
		weight: -0.256817461195413,
		gater: null
	},
	{
		from: 274,
		to: 375,
		weight: -0.1493685133113083,
		gater: null
	},
	{
		from: 274,
		to: 376,
		weight: -0.562228784766015,
		gater: null
	},
	{
		from: 274,
		to: 377,
		weight: 0.05076168469740296,
		gater: null
	},
	{
		from: 274,
		to: 378,
		weight: 0.15035451657908844,
		gater: null
	},
	{
		from: 274,
		to: 379,
		weight: 0.8643877826111932,
		gater: null
	},
	{
		from: 275,
		to: 360,
		weight: 0.07687040760503892,
		gater: null
	},
	{
		from: 275,
		to: 361,
		weight: -0.15791254418741077,
		gater: null
	},
	{
		from: 275,
		to: 362,
		weight: -0.1691842578225442,
		gater: null
	},
	{
		from: 275,
		to: 363,
		weight: 0.046311194886233344,
		gater: null
	},
	{
		from: 275,
		to: 364,
		weight: -0.143423989358725,
		gater: null
	},
	{
		from: 275,
		to: 365,
		weight: -0.7494160611441447,
		gater: null
	},
	{
		from: 275,
		to: 366,
		weight: -0.35913623725330435,
		gater: null
	},
	{
		from: 275,
		to: 367,
		weight: 0.635524944875511,
		gater: null
	},
	{
		from: 275,
		to: 368,
		weight: -0.29592344866948284,
		gater: null
	},
	{
		from: 275,
		to: 369,
		weight: -0.36034940004064914,
		gater: null
	},
	{
		from: 275,
		to: 370,
		weight: 0.1935157504888223,
		gater: null
	},
	{
		from: 275,
		to: 371,
		weight: 1.2009833832214085,
		gater: null
	},
	{
		from: 275,
		to: 372,
		weight: 0.28775739621655394,
		gater: null
	},
	{
		from: 275,
		to: 373,
		weight: 0.03462509900853688,
		gater: null
	},
	{
		from: 275,
		to: 374,
		weight: -0.1196682373156819,
		gater: null
	},
	{
		from: 275,
		to: 375,
		weight: -0.0994016516374516,
		gater: null
	},
	{
		from: 275,
		to: 376,
		weight: -0.6442304746852626,
		gater: null
	},
	{
		from: 275,
		to: 377,
		weight: 0.09087436450808786,
		gater: null
	},
	{
		from: 275,
		to: 378,
		weight: -0.009538839135012286,
		gater: null
	},
	{
		from: 275,
		to: 379,
		weight: -0.20935049528173658,
		gater: null
	},
	{
		from: 276,
		to: 360,
		weight: 7.311035416645519,
		gater: null
	},
	{
		from: 276,
		to: 361,
		weight: 1.0741019067130237,
		gater: null
	},
	{
		from: 276,
		to: 362,
		weight: -1.3829161226887525,
		gater: null
	},
	{
		from: 276,
		to: 363,
		weight: -0.027259999661964403,
		gater: null
	},
	{
		from: 276,
		to: 364,
		weight: 6.396867110033694,
		gater: null
	},
	{
		from: 276,
		to: 365,
		weight: -0.25125363175924825,
		gater: null
	},
	{
		from: 276,
		to: 366,
		weight: -0.6859686699473734,
		gater: null
	},
	{
		from: 276,
		to: 367,
		weight: 0.8762144260604412,
		gater: null
	},
	{
		from: 276,
		to: 368,
		weight: -2.866784514137293,
		gater: null
	},
	{
		from: 276,
		to: 369,
		weight: -1.4037399703258606,
		gater: null
	},
	{
		from: 276,
		to: 370,
		weight: -1.9158437312772112,
		gater: null
	},
	{
		from: 276,
		to: 371,
		weight: 3.5821776279242363,
		gater: null
	},
	{
		from: 276,
		to: 372,
		weight: 0.9621221962205393,
		gater: null
	},
	{
		from: 276,
		to: 373,
		weight: -2.0104903750819956,
		gater: null
	},
	{
		from: 276,
		to: 374,
		weight: -1.5911684387373548,
		gater: null
	},
	{
		from: 276,
		to: 375,
		weight: 4.4114409280965114,
		gater: null
	},
	{
		from: 276,
		to: 376,
		weight: -0.377674074427634,
		gater: null
	},
	{
		from: 276,
		to: 377,
		weight: 3.070136648372744,
		gater: null
	},
	{
		from: 276,
		to: 378,
		weight: -2.1936690413120132,
		gater: null
	},
	{
		from: 276,
		to: 379,
		weight: 1.5719866498456745,
		gater: null
	},
	{
		from: 277,
		to: 360,
		weight: -3.6044682787037674,
		gater: null
	},
	{
		from: 277,
		to: 361,
		weight: 0.7368102588089186,
		gater: null
	},
	{
		from: 277,
		to: 362,
		weight: 5.265972954718405,
		gater: null
	},
	{
		from: 277,
		to: 363,
		weight: 1.1623602094068686,
		gater: null
	},
	{
		from: 277,
		to: 364,
		weight: 1.2730226624082814,
		gater: null
	},
	{
		from: 277,
		to: 365,
		weight: 2.8274730742748346,
		gater: null
	},
	{
		from: 277,
		to: 366,
		weight: 0.8813648743846528,
		gater: null
	},
	{
		from: 277,
		to: 367,
		weight: -0.5736864669552215,
		gater: null
	},
	{
		from: 277,
		to: 368,
		weight: -1.4494577903901156,
		gater: null
	},
	{
		from: 277,
		to: 369,
		weight: 2.7346836479751992,
		gater: null
	},
	{
		from: 277,
		to: 370,
		weight: 0.9516287617248183,
		gater: null
	},
	{
		from: 277,
		to: 371,
		weight: 0.653184270414194,
		gater: null
	},
	{
		from: 277,
		to: 372,
		weight: -0.8354001825750008,
		gater: null
	},
	{
		from: 277,
		to: 373,
		weight: -0.6829472063065471,
		gater: null
	},
	{
		from: 277,
		to: 374,
		weight: -0.14242487262219866,
		gater: null
	},
	{
		from: 277,
		to: 375,
		weight: -6.634281079519285,
		gater: null
	},
	{
		from: 277,
		to: 376,
		weight: -0.7691283082687835,
		gater: null
	},
	{
		from: 277,
		to: 377,
		weight: 2.3123052050040607,
		gater: null
	},
	{
		from: 277,
		to: 378,
		weight: -0.4257810526717805,
		gater: null
	},
	{
		from: 277,
		to: 379,
		weight: 2.640538549515479,
		gater: null
	},
	{
		from: 278,
		to: 360,
		weight: -0.797836784426635,
		gater: null
	},
	{
		from: 278,
		to: 361,
		weight: -1.0932969309321912,
		gater: null
	},
	{
		from: 278,
		to: 362,
		weight: -6.767631848144872,
		gater: null
	},
	{
		from: 278,
		to: 363,
		weight: 0.5547497168732786,
		gater: null
	},
	{
		from: 278,
		to: 364,
		weight: -0.05835599548782552,
		gater: null
	},
	{
		from: 278,
		to: 365,
		weight: -8.481102096931084,
		gater: null
	},
	{
		from: 278,
		to: 366,
		weight: 3.5743225068781963,
		gater: null
	},
	{
		from: 278,
		to: 367,
		weight: -0.5961094852667047,
		gater: null
	},
	{
		from: 278,
		to: 368,
		weight: -1.140661079068377,
		gater: null
	},
	{
		from: 278,
		to: 369,
		weight: 3.3231920658936582,
		gater: null
	},
	{
		from: 278,
		to: 370,
		weight: 2.3167153909553324,
		gater: null
	},
	{
		from: 278,
		to: 371,
		weight: 0.8857583667342186,
		gater: null
	},
	{
		from: 278,
		to: 372,
		weight: 5.721574066390143,
		gater: null
	},
	{
		from: 278,
		to: 373,
		weight: -0.8566054377400159,
		gater: null
	},
	{
		from: 278,
		to: 374,
		weight: -0.2567933929283985,
		gater: null
	},
	{
		from: 278,
		to: 375,
		weight: -7.064792104072912,
		gater: null
	},
	{
		from: 278,
		to: 376,
		weight: -1.6902063567428145,
		gater: null
	},
	{
		from: 278,
		to: 377,
		weight: 1.6328054288967537,
		gater: null
	},
	{
		from: 278,
		to: 378,
		weight: 3.541566235462372,
		gater: null
	},
	{
		from: 278,
		to: 379,
		weight: -3.550893334567662,
		gater: null
	},
	{
		from: 279,
		to: 360,
		weight: -3.9868113808495904,
		gater: null
	},
	{
		from: 279,
		to: 361,
		weight: 0.11525858067597586,
		gater: null
	},
	{
		from: 279,
		to: 362,
		weight: 5.309603324882838,
		gater: null
	},
	{
		from: 279,
		to: 363,
		weight: 9.490541206043916,
		gater: null
	},
	{
		from: 279,
		to: 364,
		weight: 9.996484162525444,
		gater: null
	},
	{
		from: 279,
		to: 365,
		weight: -1.918879882234785,
		gater: null
	},
	{
		from: 279,
		to: 366,
		weight: -0.5950251217547476,
		gater: null
	},
	{
		from: 279,
		to: 367,
		weight: -0.13336753717198616,
		gater: null
	},
	{
		from: 279,
		to: 368,
		weight: -10.295418209075647,
		gater: null
	},
	{
		from: 279,
		to: 369,
		weight: 1.6925415028664887,
		gater: null
	},
	{
		from: 279,
		to: 370,
		weight: -4.805784079181977,
		gater: null
	},
	{
		from: 279,
		to: 371,
		weight: -3.2050856265247973,
		gater: null
	},
	{
		from: 279,
		to: 372,
		weight: -1.20864546036129,
		gater: null
	},
	{
		from: 279,
		to: 373,
		weight: -2.4864216110952255,
		gater: null
	},
	{
		from: 279,
		to: 374,
		weight: 0.7437363749329368,
		gater: null
	},
	{
		from: 279,
		to: 375,
		weight: 0.5535977267237099,
		gater: null
	},
	{
		from: 279,
		to: 376,
		weight: -4.983423155571182,
		gater: null
	},
	{
		from: 279,
		to: 377,
		weight: -0.9997770837358583,
		gater: null
	},
	{
		from: 279,
		to: 378,
		weight: 1.5734568669425917,
		gater: null
	},
	{
		from: 279,
		to: 379,
		weight: 2.427747216529684,
		gater: null
	},
	{
		from: 280,
		to: 360,
		weight: -5.667441622286253,
		gater: null
	},
	{
		from: 280,
		to: 361,
		weight: -1.056868712253546,
		gater: null
	},
	{
		from: 280,
		to: 362,
		weight: -5.559435287036079,
		gater: null
	},
	{
		from: 280,
		to: 363,
		weight: -2.507332065069937,
		gater: null
	},
	{
		from: 280,
		to: 364,
		weight: 10.256441510880753,
		gater: null
	},
	{
		from: 280,
		to: 365,
		weight: -2.353689902593068,
		gater: null
	},
	{
		from: 280,
		to: 366,
		weight: -2.472861374147096,
		gater: null
	},
	{
		from: 280,
		to: 367,
		weight: 1.9532968398151418,
		gater: null
	},
	{
		from: 280,
		to: 368,
		weight: 2.336785010678745,
		gater: null
	},
	{
		from: 280,
		to: 369,
		weight: -8.679772454602752,
		gater: null
	},
	{
		from: 280,
		to: 370,
		weight: -0.17878573982421597,
		gater: null
	},
	{
		from: 280,
		to: 371,
		weight: -1.152508007368212,
		gater: null
	},
	{
		from: 280,
		to: 372,
		weight: -1.7296279829106975,
		gater: null
	},
	{
		from: 280,
		to: 373,
		weight: -0.7619761483189992,
		gater: null
	},
	{
		from: 280,
		to: 374,
		weight: -2.0809829969096687,
		gater: null
	},
	{
		from: 280,
		to: 375,
		weight: 5.922427545155997,
		gater: null
	},
	{
		from: 280,
		to: 376,
		weight: 0.15794041481092844,
		gater: null
	},
	{
		from: 280,
		to: 377,
		weight: -1.5424256681392197,
		gater: null
	},
	{
		from: 280,
		to: 378,
		weight: 6.548555445667878,
		gater: null
	},
	{
		from: 280,
		to: 379,
		weight: 1.7302929280802126,
		gater: null
	},
	{
		from: 281,
		to: 360,
		weight: -1.5288808231772937,
		gater: null
	},
	{
		from: 281,
		to: 361,
		weight: 0.9126813546679019,
		gater: null
	},
	{
		from: 281,
		to: 362,
		weight: 0.38395555965627276,
		gater: null
	},
	{
		from: 281,
		to: 363,
		weight: -3.6314638177888776,
		gater: null
	},
	{
		from: 281,
		to: 364,
		weight: -2.21044658652315,
		gater: null
	},
	{
		from: 281,
		to: 365,
		weight: -4.333348331839576,
		gater: null
	},
	{
		from: 281,
		to: 366,
		weight: -4.422174435114886,
		gater: null
	},
	{
		from: 281,
		to: 367,
		weight: 0.09067730112089632,
		gater: null
	},
	{
		from: 281,
		to: 368,
		weight: -2.5384162202045246,
		gater: null
	},
	{
		from: 281,
		to: 369,
		weight: 9.224304885214359,
		gater: null
	},
	{
		from: 281,
		to: 370,
		weight: 4.935842202235514,
		gater: null
	},
	{
		from: 281,
		to: 371,
		weight: 1.7158465771143556,
		gater: null
	},
	{
		from: 281,
		to: 372,
		weight: -2.704586479524635,
		gater: null
	},
	{
		from: 281,
		to: 373,
		weight: 5.5350373497988015,
		gater: null
	},
	{
		from: 281,
		to: 374,
		weight: -1.1236452180610252,
		gater: null
	},
	{
		from: 281,
		to: 375,
		weight: 7.167063646307615,
		gater: null
	},
	{
		from: 281,
		to: 376,
		weight: 1.4651543290489883,
		gater: null
	},
	{
		from: 281,
		to: 377,
		weight: -4.617467169694195,
		gater: null
	},
	{
		from: 281,
		to: 378,
		weight: -5.365117224910856,
		gater: null
	},
	{
		from: 281,
		to: 379,
		weight: -0.9202405615930909,
		gater: null
	},
	{
		from: 282,
		to: 360,
		weight: 0.4193651554749021,
		gater: null
	},
	{
		from: 282,
		to: 361,
		weight: -1.3468284672706423,
		gater: null
	},
	{
		from: 282,
		to: 362,
		weight: 3.214639152586774,
		gater: null
	},
	{
		from: 282,
		to: 363,
		weight: 2.7974703299641095,
		gater: null
	},
	{
		from: 282,
		to: 364,
		weight: -4.0208138798991735,
		gater: null
	},
	{
		from: 282,
		to: 365,
		weight: 2.3258882976054456,
		gater: null
	},
	{
		from: 282,
		to: 366,
		weight: -3.185918965347246,
		gater: null
	},
	{
		from: 282,
		to: 367,
		weight: 0.31444522839144834,
		gater: null
	},
	{
		from: 282,
		to: 368,
		weight: -1.8723421071630881,
		gater: null
	},
	{
		from: 282,
		to: 369,
		weight: 1.7999283136091078,
		gater: null
	},
	{
		from: 282,
		to: 370,
		weight: 1.5432736770974462,
		gater: null
	},
	{
		from: 282,
		to: 371,
		weight: -2.52127042494755,
		gater: null
	},
	{
		from: 282,
		to: 372,
		weight: 6.946178843043347,
		gater: null
	},
	{
		from: 282,
		to: 373,
		weight: 4.625505046215926,
		gater: null
	},
	{
		from: 282,
		to: 374,
		weight: 0.9273748531581799,
		gater: null
	},
	{
		from: 282,
		to: 375,
		weight: -12.908839428452698,
		gater: null
	},
	{
		from: 282,
		to: 376,
		weight: -0.5560800935651828,
		gater: null
	},
	{
		from: 282,
		to: 377,
		weight: -7.0338490562232145,
		gater: null
	},
	{
		from: 282,
		to: 378,
		weight: -11.617000318036514,
		gater: null
	},
	{
		from: 282,
		to: 379,
		weight: -0.16869253362691825,
		gater: null
	},
	{
		from: 283,
		to: 360,
		weight: -6.8786373975239306,
		gater: null
	},
	{
		from: 283,
		to: 361,
		weight: 2.8530922384011372,
		gater: null
	},
	{
		from: 283,
		to: 362,
		weight: -1.784415315892992,
		gater: null
	},
	{
		from: 283,
		to: 363,
		weight: 0.9003027284625509,
		gater: null
	},
	{
		from: 283,
		to: 364,
		weight: 4.7063434274631195,
		gater: null
	},
	{
		from: 283,
		to: 365,
		weight: 1.324235958034038,
		gater: null
	},
	{
		from: 283,
		to: 366,
		weight: -6.197298553195255,
		gater: null
	},
	{
		from: 283,
		to: 367,
		weight: 0.8785867523155972,
		gater: null
	},
	{
		from: 283,
		to: 368,
		weight: 3.867682959711732,
		gater: null
	},
	{
		from: 283,
		to: 369,
		weight: -0.031005738640746298,
		gater: null
	},
	{
		from: 283,
		to: 370,
		weight: 0.23922671991975122,
		gater: null
	},
	{
		from: 283,
		to: 371,
		weight: 0.0968948036127089,
		gater: null
	},
	{
		from: 283,
		to: 372,
		weight: 1.408440708811141,
		gater: null
	},
	{
		from: 283,
		to: 373,
		weight: 1.443437321026956,
		gater: null
	},
	{
		from: 283,
		to: 374,
		weight: -1.490801562515464,
		gater: null
	},
	{
		from: 283,
		to: 375,
		weight: 0.3244338745330572,
		gater: null
	},
	{
		from: 283,
		to: 376,
		weight: 1.7957096798908407,
		gater: null
	},
	{
		from: 283,
		to: 377,
		weight: -1.3014770989059936,
		gater: null
	},
	{
		from: 283,
		to: 378,
		weight: -7.249008611885563,
		gater: null
	},
	{
		from: 283,
		to: 379,
		weight: 1.1593456878035404,
		gater: null
	},
	{
		from: 284,
		to: 360,
		weight: 0.053315180241309455,
		gater: null
	},
	{
		from: 284,
		to: 361,
		weight: -0.15646845613132188,
		gater: null
	},
	{
		from: 284,
		to: 362,
		weight: -0.36963080443193075,
		gater: null
	},
	{
		from: 284,
		to: 363,
		weight: 0.03000689901115585,
		gater: null
	},
	{
		from: 284,
		to: 364,
		weight: 0.01809423092468901,
		gater: null
	},
	{
		from: 284,
		to: 365,
		weight: -0.30378194222272986,
		gater: null
	},
	{
		from: 284,
		to: 366,
		weight: -0.3157530845141557,
		gater: null
	},
	{
		from: 284,
		to: 367,
		weight: 0.2360079050455329,
		gater: null
	},
	{
		from: 284,
		to: 368,
		weight: -0.33959104619085545,
		gater: null
	},
	{
		from: 284,
		to: 369,
		weight: -0.09417920226201246,
		gater: null
	},
	{
		from: 284,
		to: 370,
		weight: 0.10914775480259173,
		gater: null
	},
	{
		from: 284,
		to: 371,
		weight: -0.01064870028397667,
		gater: null
	},
	{
		from: 284,
		to: 372,
		weight: -0.15796819601368187,
		gater: null
	},
	{
		from: 284,
		to: 373,
		weight: 0.07072218709562526,
		gater: null
	},
	{
		from: 284,
		to: 374,
		weight: -0.5972276206891234,
		gater: null
	},
	{
		from: 284,
		to: 375,
		weight: 0.027794971069435525,
		gater: null
	},
	{
		from: 284,
		to: 376,
		weight: -0.037625520161250994,
		gater: null
	},
	{
		from: 284,
		to: 377,
		weight: -0.012339660148005598,
		gater: null
	},
	{
		from: 284,
		to: 378,
		weight: 0.014635902626654634,
		gater: null
	},
	{
		from: 284,
		to: 379,
		weight: -0.6210909904136209,
		gater: null
	},
	{
		from: 285,
		to: 360,
		weight: -0.07739422015772873,
		gater: null
	},
	{
		from: 285,
		to: 361,
		weight: -0.17296866701054628,
		gater: null
	},
	{
		from: 285,
		to: 362,
		weight: -2.2254935661646678,
		gater: null
	},
	{
		from: 285,
		to: 363,
		weight: -0.0681364340652296,
		gater: null
	},
	{
		from: 285,
		to: 364,
		weight: 0.675498901049949,
		gater: null
	},
	{
		from: 285,
		to: 365,
		weight: -1.024850076084931,
		gater: null
	},
	{
		from: 285,
		to: 366,
		weight: -0.7268746584730479,
		gater: null
	},
	{
		from: 285,
		to: 367,
		weight: 0.4908583366765933,
		gater: null
	},
	{
		from: 285,
		to: 368,
		weight: -0.2626994526151974,
		gater: null
	},
	{
		from: 285,
		to: 369,
		weight: -0.3839103199393486,
		gater: null
	},
	{
		from: 285,
		to: 370,
		weight: -0.09805094924377349,
		gater: null
	},
	{
		from: 285,
		to: 371,
		weight: 0.16676742374764894,
		gater: null
	},
	{
		from: 285,
		to: 372,
		weight: 0.0979260464194456,
		gater: null
	},
	{
		from: 285,
		to: 373,
		weight: 0.09937372837925887,
		gater: null
	},
	{
		from: 285,
		to: 374,
		weight: 0.8346809395781575,
		gater: null
	},
	{
		from: 285,
		to: 375,
		weight: -0.10714733657571313,
		gater: null
	},
	{
		from: 285,
		to: 376,
		weight: -0.35547000630584125,
		gater: null
	},
	{
		from: 285,
		to: 377,
		weight: -0.08850743267463992,
		gater: null
	},
	{
		from: 285,
		to: 378,
		weight: -0.03717254755631431,
		gater: null
	},
	{
		from: 285,
		to: 379,
		weight: -0.40093102749310505,
		gater: null
	},
	{
		from: 286,
		to: 360,
		weight: -0.24906013461178453,
		gater: null
	},
	{
		from: 286,
		to: 361,
		weight: 1.675853034832818,
		gater: null
	},
	{
		from: 286,
		to: 362,
		weight: -2.1937876498096847,
		gater: null
	},
	{
		from: 286,
		to: 363,
		weight: -0.15608066981329274,
		gater: null
	},
	{
		from: 286,
		to: 364,
		weight: 0.6139707461099496,
		gater: null
	},
	{
		from: 286,
		to: 365,
		weight: -0.7173089731921323,
		gater: null
	},
	{
		from: 286,
		to: 366,
		weight: -0.595933433465066,
		gater: null
	},
	{
		from: 286,
		to: 367,
		weight: 0.4371720645778118,
		gater: null
	},
	{
		from: 286,
		to: 368,
		weight: -0.27476722295001244,
		gater: null
	},
	{
		from: 286,
		to: 369,
		weight: -0.17882368378128677,
		gater: null
	},
	{
		from: 286,
		to: 370,
		weight: -0.04317274988685768,
		gater: null
	},
	{
		from: 286,
		to: 371,
		weight: 0.10575834256081697,
		gater: null
	},
	{
		from: 286,
		to: 372,
		weight: 0.11320838182144828,
		gater: null
	},
	{
		from: 286,
		to: 373,
		weight: 0.09490683485539388,
		gater: null
	},
	{
		from: 286,
		to: 374,
		weight: 0.9199624238715268,
		gater: null
	},
	{
		from: 286,
		to: 375,
		weight: -0.04820378273004057,
		gater: null
	},
	{
		from: 286,
		to: 376,
		weight: -0.35343067611072715,
		gater: null
	},
	{
		from: 286,
		to: 377,
		weight: -0.01364740866200112,
		gater: null
	},
	{
		from: 286,
		to: 378,
		weight: -0.009239780072206044,
		gater: null
	},
	{
		from: 286,
		to: 379,
		weight: 1.1197061830275512,
		gater: null
	},
	{
		from: 287,
		to: 360,
		weight: -6.9370731333532625,
		gater: null
	},
	{
		from: 287,
		to: 361,
		weight: -0.4798241029954694,
		gater: null
	},
	{
		from: 287,
		to: 362,
		weight: -7.13964311440608,
		gater: null
	},
	{
		from: 287,
		to: 363,
		weight: 3.8575040515530046,
		gater: null
	},
	{
		from: 287,
		to: 364,
		weight: 4.977606247796173,
		gater: null
	},
	{
		from: 287,
		to: 365,
		weight: -0.8480394134472954,
		gater: null
	},
	{
		from: 287,
		to: 366,
		weight: -3.3878358548526437,
		gater: null
	},
	{
		from: 287,
		to: 367,
		weight: 1.6773271388691386,
		gater: null
	},
	{
		from: 287,
		to: 368,
		weight: 1.8986725920393859,
		gater: null
	},
	{
		from: 287,
		to: 369,
		weight: 5.920611292066538,
		gater: null
	},
	{
		from: 287,
		to: 370,
		weight: 5.414668405321888,
		gater: null
	},
	{
		from: 287,
		to: 371,
		weight: -0.7408616173359498,
		gater: null
	},
	{
		from: 287,
		to: 372,
		weight: 3.693004456777099,
		gater: null
	},
	{
		from: 287,
		to: 373,
		weight: 1.0887938694972725,
		gater: null
	},
	{
		from: 287,
		to: 374,
		weight: 1.941859876771479,
		gater: null
	},
	{
		from: 287,
		to: 375,
		weight: -2.2128140714485416,
		gater: null
	},
	{
		from: 287,
		to: 376,
		weight: -3.1273024595961054,
		gater: null
	},
	{
		from: 287,
		to: 377,
		weight: 0.16912371883238572,
		gater: null
	},
	{
		from: 287,
		to: 378,
		weight: -9.589592722013093,
		gater: null
	},
	{
		from: 287,
		to: 379,
		weight: 1.8123878075210536,
		gater: null
	},
	{
		from: 288,
		to: 360,
		weight: -0.4882094895057073,
		gater: null
	},
	{
		from: 288,
		to: 361,
		weight: 1.2771178553669524,
		gater: null
	},
	{
		from: 288,
		to: 362,
		weight: 0.40057231941002974,
		gater: null
	},
	{
		from: 288,
		to: 363,
		weight: -3.3475648615198548,
		gater: null
	},
	{
		from: 288,
		to: 364,
		weight: 2.2927265230506335,
		gater: null
	},
	{
		from: 288,
		to: 365,
		weight: 2.2383787534336763,
		gater: null
	},
	{
		from: 288,
		to: 366,
		weight: -2.705938916770268,
		gater: null
	},
	{
		from: 288,
		to: 367,
		weight: -0.16985819970072724,
		gater: null
	},
	{
		from: 288,
		to: 368,
		weight: 1.7060212200352163,
		gater: null
	},
	{
		from: 288,
		to: 369,
		weight: -5.363734906043258,
		gater: null
	},
	{
		from: 288,
		to: 370,
		weight: -7.519363251641372,
		gater: null
	},
	{
		from: 288,
		to: 371,
		weight: -1.957167777940334,
		gater: null
	},
	{
		from: 288,
		to: 372,
		weight: -1.827504195274343,
		gater: null
	},
	{
		from: 288,
		to: 373,
		weight: 0.2649572559436232,
		gater: null
	},
	{
		from: 288,
		to: 374,
		weight: 0.2200127860935898,
		gater: null
	},
	{
		from: 288,
		to: 375,
		weight: 2.570972915578465,
		gater: null
	},
	{
		from: 288,
		to: 376,
		weight: 5.325890353122971,
		gater: null
	},
	{
		from: 288,
		to: 377,
		weight: -1.8465047437609239,
		gater: null
	},
	{
		from: 288,
		to: 378,
		weight: 2.353664430660461,
		gater: null
	},
	{
		from: 288,
		to: 379,
		weight: -1.6168151010400473,
		gater: null
	},
	{
		from: 289,
		to: 360,
		weight: -5.561403338661375,
		gater: null
	},
	{
		from: 289,
		to: 361,
		weight: -3.225570400875918,
		gater: null
	},
	{
		from: 289,
		to: 362,
		weight: -8.104071222016369,
		gater: null
	},
	{
		from: 289,
		to: 363,
		weight: 4.19983024885171,
		gater: null
	},
	{
		from: 289,
		to: 364,
		weight: -4.75137044718552,
		gater: null
	},
	{
		from: 289,
		to: 365,
		weight: -4.07998017202211,
		gater: null
	},
	{
		from: 289,
		to: 366,
		weight: 0.6131064114715327,
		gater: null
	},
	{
		from: 289,
		to: 367,
		weight: 0.22646896677901426,
		gater: null
	},
	{
		from: 289,
		to: 368,
		weight: -2.5285395593738653,
		gater: null
	},
	{
		from: 289,
		to: 369,
		weight: -10.769259943434648,
		gater: null
	},
	{
		from: 289,
		to: 370,
		weight: 4.702204910253615,
		gater: null
	},
	{
		from: 289,
		to: 371,
		weight: -0.5763042782468575,
		gater: null
	},
	{
		from: 289,
		to: 372,
		weight: 5.9921438236197755,
		gater: null
	},
	{
		from: 289,
		to: 373,
		weight: 0.44874354721341264,
		gater: null
	},
	{
		from: 289,
		to: 374,
		weight: -2.4520898105064335,
		gater: null
	},
	{
		from: 289,
		to: 375,
		weight: 4.591213285130109,
		gater: null
	},
	{
		from: 289,
		to: 376,
		weight: -4.4124673030134405,
		gater: null
	},
	{
		from: 289,
		to: 377,
		weight: -1.6777372684492744,
		gater: null
	},
	{
		from: 289,
		to: 378,
		weight: 5.2220892480909455,
		gater: null
	},
	{
		from: 289,
		to: 379,
		weight: 2.311142684570877,
		gater: null
	},
	{
		from: 290,
		to: 360,
		weight: -1.0783103755677101,
		gater: null
	},
	{
		from: 290,
		to: 361,
		weight: 2.1340493380089627,
		gater: null
	},
	{
		from: 290,
		to: 362,
		weight: -6.53986898914536,
		gater: null
	},
	{
		from: 290,
		to: 363,
		weight: 3.23302558379055,
		gater: null
	},
	{
		from: 290,
		to: 364,
		weight: 10.584250739227237,
		gater: null
	},
	{
		from: 290,
		to: 365,
		weight: -3.210786014920869,
		gater: null
	},
	{
		from: 290,
		to: 366,
		weight: -1.26233796831354,
		gater: null
	},
	{
		from: 290,
		to: 367,
		weight: 1.1065344759705675,
		gater: null
	},
	{
		from: 290,
		to: 368,
		weight: 0.7828717896319906,
		gater: null
	},
	{
		from: 290,
		to: 369,
		weight: 14.16857991329076,
		gater: null
	},
	{
		from: 290,
		to: 370,
		weight: 0.170903126523614,
		gater: null
	},
	{
		from: 290,
		to: 371,
		weight: 2.238256062795318,
		gater: null
	},
	{
		from: 290,
		to: 372,
		weight: -2.0044908316777965,
		gater: null
	},
	{
		from: 290,
		to: 373,
		weight: 6.205000293271527,
		gater: null
	},
	{
		from: 290,
		to: 374,
		weight: 1.1321984357349308,
		gater: null
	},
	{
		from: 290,
		to: 375,
		weight: -2.939220758287574,
		gater: null
	},
	{
		from: 290,
		to: 376,
		weight: -2.0607577809125543,
		gater: null
	},
	{
		from: 290,
		to: 377,
		weight: 9.87693281053316,
		gater: null
	},
	{
		from: 290,
		to: 378,
		weight: 0.04617885676456312,
		gater: null
	},
	{
		from: 290,
		to: 379,
		weight: 1.6370211335376228,
		gater: null
	},
	{
		from: 291,
		to: 360,
		weight: 3.513476385321743,
		gater: null
	},
	{
		from: 291,
		to: 361,
		weight: 1.4840993676248546,
		gater: null
	},
	{
		from: 291,
		to: 362,
		weight: 0.8486369726643989,
		gater: null
	},
	{
		from: 291,
		to: 363,
		weight: -2.8514631950033484,
		gater: null
	},
	{
		from: 291,
		to: 364,
		weight: -9.796161183921331,
		gater: null
	},
	{
		from: 291,
		to: 365,
		weight: 2.2358288575727188,
		gater: null
	},
	{
		from: 291,
		to: 366,
		weight: 1.7046562427574237,
		gater: null
	},
	{
		from: 291,
		to: 367,
		weight: -0.88399057415067,
		gater: null
	},
	{
		from: 291,
		to: 368,
		weight: 4.434609799380179,
		gater: null
	},
	{
		from: 291,
		to: 369,
		weight: -0.07225202044745964,
		gater: null
	},
	{
		from: 291,
		to: 370,
		weight: 7.957766022094972,
		gater: null
	},
	{
		from: 291,
		to: 371,
		weight: -0.22885193439095375,
		gater: null
	},
	{
		from: 291,
		to: 372,
		weight: -3.0852466139232315,
		gater: null
	},
	{
		from: 291,
		to: 373,
		weight: 0.9183093597900585,
		gater: null
	},
	{
		from: 291,
		to: 374,
		weight: -1.2262678965332598,
		gater: null
	},
	{
		from: 291,
		to: 375,
		weight: -9.226888653260005,
		gater: null
	},
	{
		from: 291,
		to: 376,
		weight: 0.8475037596634731,
		gater: null
	},
	{
		from: 291,
		to: 377,
		weight: -1.4796040739766896,
		gater: null
	},
	{
		from: 291,
		to: 378,
		weight: -9.201035226229829,
		gater: null
	},
	{
		from: 291,
		to: 379,
		weight: -2.240012616091744,
		gater: null
	},
	{
		from: 292,
		to: 360,
		weight: -7.255080905145934,
		gater: null
	},
	{
		from: 292,
		to: 361,
		weight: -0.5889513073149654,
		gater: null
	},
	{
		from: 292,
		to: 362,
		weight: 3.3208392985315704,
		gater: null
	},
	{
		from: 292,
		to: 363,
		weight: -2.1708519987477826,
		gater: null
	},
	{
		from: 292,
		to: 364,
		weight: -6.017894755577643,
		gater: null
	},
	{
		from: 292,
		to: 365,
		weight: -0.531709102898295,
		gater: null
	},
	{
		from: 292,
		to: 366,
		weight: -0.11004259494302371,
		gater: null
	},
	{
		from: 292,
		to: 367,
		weight: 0.22393043851839295,
		gater: null
	},
	{
		from: 292,
		to: 368,
		weight: 2.658375668744739,
		gater: null
	},
	{
		from: 292,
		to: 369,
		weight: -0.5668757420669464,
		gater: null
	},
	{
		from: 292,
		to: 370,
		weight: 3.323161130480996,
		gater: null
	},
	{
		from: 292,
		to: 371,
		weight: 0.122605133885972,
		gater: null
	},
	{
		from: 292,
		to: 372,
		weight: 6.927177757994668,
		gater: null
	},
	{
		from: 292,
		to: 373,
		weight: -3.0398465812576045,
		gater: null
	},
	{
		from: 292,
		to: 374,
		weight: -0.15225475671160502,
		gater: null
	},
	{
		from: 292,
		to: 375,
		weight: 2.6838441142132075,
		gater: null
	},
	{
		from: 292,
		to: 376,
		weight: 5.5646996070378405,
		gater: null
	},
	{
		from: 292,
		to: 377,
		weight: 4.8414166183868605,
		gater: null
	},
	{
		from: 292,
		to: 378,
		weight: 0.8782544254953063,
		gater: null
	},
	{
		from: 292,
		to: 379,
		weight: -0.619679808141559,
		gater: null
	},
	{
		from: 293,
		to: 360,
		weight: 2.310556580395311,
		gater: null
	},
	{
		from: 293,
		to: 361,
		weight: -0.8371434602675556,
		gater: null
	},
	{
		from: 293,
		to: 362,
		weight: 3.902673768037366,
		gater: null
	},
	{
		from: 293,
		to: 363,
		weight: 0.03356435818541889,
		gater: null
	},
	{
		from: 293,
		to: 364,
		weight: 4.091182708310755,
		gater: null
	},
	{
		from: 293,
		to: 365,
		weight: 1.0063261796301863,
		gater: null
	},
	{
		from: 293,
		to: 366,
		weight: 1.3650664119140512,
		gater: null
	},
	{
		from: 293,
		to: 367,
		weight: -0.6525815738414439,
		gater: null
	},
	{
		from: 293,
		to: 368,
		weight: -2.0224243250428575,
		gater: null
	},
	{
		from: 293,
		to: 369,
		weight: -0.48037909270491924,
		gater: null
	},
	{
		from: 293,
		to: 370,
		weight: -0.7912838741236993,
		gater: null
	},
	{
		from: 293,
		to: 371,
		weight: 0.8035227572880497,
		gater: null
	},
	{
		from: 293,
		to: 372,
		weight: -6.073316553681156,
		gater: null
	},
	{
		from: 293,
		to: 373,
		weight: -0.28608326657189553,
		gater: null
	},
	{
		from: 293,
		to: 374,
		weight: -1.4992294900687018,
		gater: null
	},
	{
		from: 293,
		to: 375,
		weight: -6.032296919008462,
		gater: null
	},
	{
		from: 293,
		to: 376,
		weight: -5.704078381690562,
		gater: null
	},
	{
		from: 293,
		to: 377,
		weight: 4.385164717287335,
		gater: null
	},
	{
		from: 293,
		to: 378,
		weight: -2.1736270159775377,
		gater: null
	},
	{
		from: 293,
		to: 379,
		weight: 0.9259715816657305,
		gater: null
	},
	{
		from: 294,
		to: 360,
		weight: 1.0187407159541284,
		gater: null
	},
	{
		from: 294,
		to: 361,
		weight: -1.9047161473986272,
		gater: null
	},
	{
		from: 294,
		to: 362,
		weight: -13.367153016733994,
		gater: null
	},
	{
		from: 294,
		to: 363,
		weight: -0.6361929937470531,
		gater: null
	},
	{
		from: 294,
		to: 364,
		weight: 5.306556302979098,
		gater: null
	},
	{
		from: 294,
		to: 365,
		weight: -1.8272108058800556,
		gater: null
	},
	{
		from: 294,
		to: 366,
		weight: -0.3927822296862799,
		gater: null
	},
	{
		from: 294,
		to: 367,
		weight: 5.0816455798837765,
		gater: null
	},
	{
		from: 294,
		to: 368,
		weight: 4.657607374793141,
		gater: null
	},
	{
		from: 294,
		to: 369,
		weight: -3.82469151972474,
		gater: null
	},
	{
		from: 294,
		to: 370,
		weight: -3.212038266818427,
		gater: null
	},
	{
		from: 294,
		to: 371,
		weight: 1.5442190597111267,
		gater: null
	},
	{
		from: 294,
		to: 372,
		weight: -6.311458609046986,
		gater: null
	},
	{
		from: 294,
		to: 373,
		weight: 2.329329777853084,
		gater: null
	},
	{
		from: 294,
		to: 374,
		weight: -1.265452031211931,
		gater: null
	},
	{
		from: 294,
		to: 375,
		weight: 9.339304154748822,
		gater: null
	},
	{
		from: 294,
		to: 376,
		weight: -7.69807414975401,
		gater: null
	},
	{
		from: 294,
		to: 377,
		weight: -4.9325185752519385,
		gater: null
	},
	{
		from: 294,
		to: 378,
		weight: 0.4712578618136838,
		gater: null
	},
	{
		from: 294,
		to: 379,
		weight: 1.3725055164067603,
		gater: null
	},
	{
		from: 295,
		to: 360,
		weight: -0.11513529395227705,
		gater: null
	},
	{
		from: 295,
		to: 361,
		weight: 0.0811092394056933,
		gater: null
	},
	{
		from: 295,
		to: 362,
		weight: -0.572506251859184,
		gater: null
	},
	{
		from: 295,
		to: 363,
		weight: -0.05003461747984044,
		gater: null
	},
	{
		from: 295,
		to: 364,
		weight: 1.1027815404070638,
		gater: null
	},
	{
		from: 295,
		to: 365,
		weight: -0.0899760015229555,
		gater: null
	},
	{
		from: 295,
		to: 366,
		weight: -0.09815364177838419,
		gater: null
	},
	{
		from: 295,
		to: 367,
		weight: 1.1273042010590266,
		gater: null
	},
	{
		from: 295,
		to: 368,
		weight: -0.17346370771357048,
		gater: null
	},
	{
		from: 295,
		to: 369,
		weight: -0.09824101414974573,
		gater: null
	},
	{
		from: 295,
		to: 370,
		weight: -1.935433912190224,
		gater: null
	},
	{
		from: 295,
		to: 371,
		weight: -1.7350030333404385,
		gater: null
	},
	{
		from: 295,
		to: 372,
		weight: -0.8645516981147604,
		gater: null
	},
	{
		from: 295,
		to: 373,
		weight: 0.018938371025845502,
		gater: null
	},
	{
		from: 295,
		to: 374,
		weight: -0.05688685726069122,
		gater: null
	},
	{
		from: 295,
		to: 375,
		weight: -0.22061585862455044,
		gater: null
	},
	{
		from: 295,
		to: 376,
		weight: 0.17145439855503825,
		gater: null
	},
	{
		from: 295,
		to: 377,
		weight: -0.15091502785244884,
		gater: null
	},
	{
		from: 295,
		to: 378,
		weight: -0.021091010254614427,
		gater: null
	},
	{
		from: 295,
		to: 379,
		weight: -0.0875985371906894,
		gater: null
	},
	{
		from: 296,
		to: 360,
		weight: -0.4752364605423639,
		gater: null
	},
	{
		from: 296,
		to: 361,
		weight: -0.33888571089341274,
		gater: null
	},
	{
		from: 296,
		to: 362,
		weight: -2.652880861667748,
		gater: null
	},
	{
		from: 296,
		to: 363,
		weight: -0.20759474152499408,
		gater: null
	},
	{
		from: 296,
		to: 364,
		weight: 0.7645438430995092,
		gater: null
	},
	{
		from: 296,
		to: 365,
		weight: -0.3821444749556216,
		gater: null
	},
	{
		from: 296,
		to: 366,
		weight: 0.38016745492047616,
		gater: null
	},
	{
		from: 296,
		to: 367,
		weight: 0.36899109595221136,
		gater: null
	},
	{
		from: 296,
		to: 368,
		weight: -0.5277906025647886,
		gater: null
	},
	{
		from: 296,
		to: 369,
		weight: -0.07992248113737212,
		gater: null
	},
	{
		from: 296,
		to: 370,
		weight: -0.6685776397868295,
		gater: null
	},
	{
		from: 296,
		to: 371,
		weight: -1.0212412054171294,
		gater: null
	},
	{
		from: 296,
		to: 372,
		weight: 1.5049796888354983,
		gater: null
	},
	{
		from: 296,
		to: 373,
		weight: -0.008831109721587913,
		gater: null
	},
	{
		from: 296,
		to: 374,
		weight: 2.140365865252095,
		gater: null
	},
	{
		from: 296,
		to: 375,
		weight: 0.0782174563616414,
		gater: null
	},
	{
		from: 296,
		to: 376,
		weight: -0.1260252130882449,
		gater: null
	},
	{
		from: 296,
		to: 377,
		weight: -0.13295896071147392,
		gater: null
	},
	{
		from: 296,
		to: 378,
		weight: -0.07182021357242215,
		gater: null
	},
	{
		from: 296,
		to: 379,
		weight: -0.21488595679022168,
		gater: null
	},
	{
		from: 297,
		to: 360,
		weight: -0.11498142583681373,
		gater: null
	},
	{
		from: 297,
		to: 361,
		weight: -0.2351330849622192,
		gater: null
	},
	{
		from: 297,
		to: 362,
		weight: -3.0892203333691692,
		gater: null
	},
	{
		from: 297,
		to: 363,
		weight: -0.04848376490803402,
		gater: null
	},
	{
		from: 297,
		to: 364,
		weight: 1.7110749326149952,
		gater: null
	},
	{
		from: 297,
		to: 365,
		weight: -0.7652024727022867,
		gater: null
	},
	{
		from: 297,
		to: 366,
		weight: -0.23854298699992815,
		gater: null
	},
	{
		from: 297,
		to: 367,
		weight: 1.2416913869145516,
		gater: null
	},
	{
		from: 297,
		to: 368,
		weight: -0.571486560706026,
		gater: null
	},
	{
		from: 297,
		to: 369,
		weight: -0.05430662411717595,
		gater: null
	},
	{
		from: 297,
		to: 370,
		weight: -2.0168889764335867,
		gater: null
	},
	{
		from: 297,
		to: 371,
		weight: -0.8263719254318598,
		gater: null
	},
	{
		from: 297,
		to: 372,
		weight: -0.9957221354395427,
		gater: null
	},
	{
		from: 297,
		to: 373,
		weight: 0.0304081320612669,
		gater: null
	},
	{
		from: 297,
		to: 374,
		weight: 1.5448361809132438,
		gater: null
	},
	{
		from: 297,
		to: 375,
		weight: -0.2332339238069879,
		gater: null
	},
	{
		from: 297,
		to: 376,
		weight: -0.14484745052763268,
		gater: null
	},
	{
		from: 297,
		to: 377,
		weight: -0.04357072614645012,
		gater: null
	},
	{
		from: 297,
		to: 378,
		weight: -0.04275487234566831,
		gater: null
	},
	{
		from: 297,
		to: 379,
		weight: -0.37547866486714254,
		gater: null
	},
	{
		from: 298,
		to: 360,
		weight: -1.9620555126445376,
		gater: null
	},
	{
		from: 298,
		to: 361,
		weight: -0.24085861077120677,
		gater: null
	},
	{
		from: 298,
		to: 362,
		weight: -9.073216048651345,
		gater: null
	},
	{
		from: 298,
		to: 363,
		weight: 6.77060383650773,
		gater: null
	},
	{
		from: 298,
		to: 364,
		weight: 3.4590183456751267,
		gater: null
	},
	{
		from: 298,
		to: 365,
		weight: -3.6914126865354895,
		gater: null
	},
	{
		from: 298,
		to: 366,
		weight: -1.3149083882151533,
		gater: null
	},
	{
		from: 298,
		to: 367,
		weight: 4.591407455899333,
		gater: null
	},
	{
		from: 298,
		to: 368,
		weight: 3.3327474937569987,
		gater: null
	},
	{
		from: 298,
		to: 369,
		weight: 2.6704142223906486,
		gater: null
	},
	{
		from: 298,
		to: 370,
		weight: -3.7109141346412446,
		gater: null
	},
	{
		from: 298,
		to: 371,
		weight: 2.255926934063385,
		gater: null
	},
	{
		from: 298,
		to: 372,
		weight: 0.7240945353700036,
		gater: null
	},
	{
		from: 298,
		to: 373,
		weight: 4.326548998679381,
		gater: null
	},
	{
		from: 298,
		to: 374,
		weight: -1.0752826190941178,
		gater: null
	},
	{
		from: 298,
		to: 375,
		weight: -0.5388106824820104,
		gater: null
	},
	{
		from: 298,
		to: 376,
		weight: -3.7903496230050617,
		gater: null
	},
	{
		from: 298,
		to: 377,
		weight: -4.033599781167263,
		gater: null
	},
	{
		from: 298,
		to: 378,
		weight: 0.5791097450121757,
		gater: null
	},
	{
		from: 298,
		to: 379,
		weight: 1.284806007910686,
		gater: null
	},
	{
		from: 299,
		to: 360,
		weight: 3.266348297466685,
		gater: null
	},
	{
		from: 299,
		to: 361,
		weight: -1.5413290778659985,
		gater: null
	},
	{
		from: 299,
		to: 362,
		weight: -4.105768361336094,
		gater: null
	},
	{
		from: 299,
		to: 363,
		weight: -7.450666987132548,
		gater: null
	},
	{
		from: 299,
		to: 364,
		weight: 1.4578074986380924,
		gater: null
	},
	{
		from: 299,
		to: 365,
		weight: 0.437027447169283,
		gater: null
	},
	{
		from: 299,
		to: 366,
		weight: 0.5172533700831161,
		gater: null
	},
	{
		from: 299,
		to: 367,
		weight: 2.4479063021154355,
		gater: null
	},
	{
		from: 299,
		to: 368,
		weight: 0.5472194579686768,
		gater: null
	},
	{
		from: 299,
		to: 369,
		weight: -6.794941664533789,
		gater: null
	},
	{
		from: 299,
		to: 370,
		weight: 0.8222078795319461,
		gater: null
	},
	{
		from: 299,
		to: 371,
		weight: 0.8526123348268544,
		gater: null
	},
	{
		from: 299,
		to: 372,
		weight: -5.987197847732366,
		gater: null
	},
	{
		from: 299,
		to: 373,
		weight: -1.8014430296105086,
		gater: null
	},
	{
		from: 299,
		to: 374,
		weight: -0.8377105386770913,
		gater: null
	},
	{
		from: 299,
		to: 375,
		weight: 9.472222782466227,
		gater: null
	},
	{
		from: 299,
		to: 376,
		weight: -4.784688163165586,
		gater: null
	},
	{
		from: 299,
		to: 377,
		weight: -1.0055191028004873,
		gater: null
	},
	{
		from: 299,
		to: 378,
		weight: 0.16343845953584019,
		gater: null
	},
	{
		from: 299,
		to: 379,
		weight: 1.680925720533928,
		gater: null
	},
	{
		from: 300,
		to: 360,
		weight: 0.2155521461329949,
		gater: null
	},
	{
		from: 300,
		to: 361,
		weight: 1.2115685828336902,
		gater: null
	},
	{
		from: 300,
		to: 362,
		weight: 2.7932765255141723,
		gater: null
	},
	{
		from: 300,
		to: 363,
		weight: 3.6123321414932112,
		gater: null
	},
	{
		from: 300,
		to: 364,
		weight: -4.204822530945988,
		gater: null
	},
	{
		from: 300,
		to: 365,
		weight: -0.07880109907353762,
		gater: null
	},
	{
		from: 300,
		to: 366,
		weight: 0.4521716973843591,
		gater: null
	},
	{
		from: 300,
		to: 367,
		weight: 1.4884642974794509,
		gater: null
	},
	{
		from: 300,
		to: 368,
		weight: 2.316614617948927,
		gater: null
	},
	{
		from: 300,
		to: 369,
		weight: 13.121028482487002,
		gater: null
	},
	{
		from: 300,
		to: 370,
		weight: -4.126848932347096,
		gater: null
	},
	{
		from: 300,
		to: 371,
		weight: 4.5021989518918915,
		gater: null
	},
	{
		from: 300,
		to: 372,
		weight: 11.34188056376827,
		gater: null
	},
	{
		from: 300,
		to: 373,
		weight: 5.581475428482351,
		gater: null
	},
	{
		from: 300,
		to: 374,
		weight: -3.0247616902813905,
		gater: null
	},
	{
		from: 300,
		to: 375,
		weight: -11.47064691774197,
		gater: null
	},
	{
		from: 300,
		to: 376,
		weight: 5.671092816954162,
		gater: null
	},
	{
		from: 300,
		to: 377,
		weight: -0.036861662476913484,
		gater: null
	},
	{
		from: 300,
		to: 378,
		weight: -0.04475925217497873,
		gater: null
	},
	{
		from: 300,
		to: 379,
		weight: -2.4533194798467863,
		gater: null
	},
	{
		from: 301,
		to: 360,
		weight: -2.983711491815828,
		gater: null
	},
	{
		from: 301,
		to: 361,
		weight: -0.28127815668949596,
		gater: null
	},
	{
		from: 301,
		to: 362,
		weight: -0.9969707531781499,
		gater: null
	},
	{
		from: 301,
		to: 363,
		weight: -1.7427628922745835,
		gater: null
	},
	{
		from: 301,
		to: 364,
		weight: 0.7778345904674654,
		gater: null
	},
	{
		from: 301,
		to: 365,
		weight: -1.2704343329782763,
		gater: null
	},
	{
		from: 301,
		to: 366,
		weight: -0.9296437049933868,
		gater: null
	},
	{
		from: 301,
		to: 367,
		weight: 1.7844154344524248,
		gater: null
	},
	{
		from: 301,
		to: 368,
		weight: -0.2643086858887818,
		gater: null
	},
	{
		from: 301,
		to: 369,
		weight: 2.1894465403061245,
		gater: null
	},
	{
		from: 301,
		to: 370,
		weight: 2.9938055589416086,
		gater: null
	},
	{
		from: 301,
		to: 371,
		weight: -1.0729641276143695,
		gater: null
	},
	{
		from: 301,
		to: 372,
		weight: -4.166290607242904,
		gater: null
	},
	{
		from: 301,
		to: 373,
		weight: -1.548587778734828,
		gater: null
	},
	{
		from: 301,
		to: 374,
		weight: 0.021735344880055244,
		gater: null
	},
	{
		from: 301,
		to: 375,
		weight: -0.39520986986862056,
		gater: null
	},
	{
		from: 301,
		to: 376,
		weight: -2.359473157109694,
		gater: null
	},
	{
		from: 301,
		to: 377,
		weight: -0.4973078891506171,
		gater: null
	},
	{
		from: 301,
		to: 378,
		weight: -2.3789317012664193,
		gater: null
	},
	{
		from: 301,
		to: 379,
		weight: 0.7903903519865124,
		gater: null
	},
	{
		from: 302,
		to: 360,
		weight: 2.6809371884143918,
		gater: null
	},
	{
		from: 302,
		to: 361,
		weight: 0.02736973978778201,
		gater: null
	},
	{
		from: 302,
		to: 362,
		weight: 1.1994098522018117,
		gater: null
	},
	{
		from: 302,
		to: 363,
		weight: -2.5990845205256274,
		gater: null
	},
	{
		from: 302,
		to: 364,
		weight: 0.593852950902584,
		gater: null
	},
	{
		from: 302,
		to: 365,
		weight: 2.6581059544709498,
		gater: null
	},
	{
		from: 302,
		to: 366,
		weight: -1.485397338096774,
		gater: null
	},
	{
		from: 302,
		to: 367,
		weight: 0.09110240936171592,
		gater: null
	},
	{
		from: 302,
		to: 368,
		weight: 0.21521264763411926,
		gater: null
	},
	{
		from: 302,
		to: 369,
		weight: 4.355308707950019,
		gater: null
	},
	{
		from: 302,
		to: 370,
		weight: -0.8998208178437898,
		gater: null
	},
	{
		from: 302,
		to: 371,
		weight: -0.3624827844597344,
		gater: null
	},
	{
		from: 302,
		to: 372,
		weight: -2.503665152698405,
		gater: null
	},
	{
		from: 302,
		to: 373,
		weight: 1.4750730088541748,
		gater: null
	},
	{
		from: 302,
		to: 374,
		weight: -1.651755654212399,
		gater: null
	},
	{
		from: 302,
		to: 375,
		weight: 0.35877856475230696,
		gater: null
	},
	{
		from: 302,
		to: 376,
		weight: 0.46534780522985464,
		gater: null
	},
	{
		from: 302,
		to: 377,
		weight: -0.6605269309936728,
		gater: null
	},
	{
		from: 302,
		to: 378,
		weight: 4.208028830907438,
		gater: null
	},
	{
		from: 302,
		to: 379,
		weight: -0.487082862683166,
		gater: null
	},
	{
		from: 303,
		to: 360,
		weight: 5.188307037314776,
		gater: null
	},
	{
		from: 303,
		to: 361,
		weight: 0.13801400420808685,
		gater: null
	},
	{
		from: 303,
		to: 362,
		weight: -3.505999927970456,
		gater: null
	},
	{
		from: 303,
		to: 363,
		weight: 1.4777586853423619,
		gater: null
	},
	{
		from: 303,
		to: 364,
		weight: -5.4011170372524635,
		gater: null
	},
	{
		from: 303,
		to: 365,
		weight: 0.6673217030754115,
		gater: null
	},
	{
		from: 303,
		to: 366,
		weight: -3.618597600759378,
		gater: null
	},
	{
		from: 303,
		to: 367,
		weight: -0.5262863476282239,
		gater: null
	},
	{
		from: 303,
		to: 368,
		weight: -5.417789968828406,
		gater: null
	},
	{
		from: 303,
		to: 369,
		weight: 1.2000655866968868,
		gater: null
	},
	{
		from: 303,
		to: 370,
		weight: 1.2211643957796439,
		gater: null
	},
	{
		from: 303,
		to: 371,
		weight: 3.0943510102146417,
		gater: null
	},
	{
		from: 303,
		to: 372,
		weight: 2.9105418868801953,
		gater: null
	},
	{
		from: 303,
		to: 373,
		weight: 2.3066729827832235,
		gater: null
	},
	{
		from: 303,
		to: 374,
		weight: 0.08712718087510249,
		gater: null
	},
	{
		from: 303,
		to: 375,
		weight: 3.471433257768137,
		gater: null
	},
	{
		from: 303,
		to: 376,
		weight: 0.8766205589938768,
		gater: null
	},
	{
		from: 303,
		to: 377,
		weight: -2.7086458820082493,
		gater: null
	},
	{
		from: 303,
		to: 378,
		weight: -1.0075335773723437,
		gater: null
	},
	{
		from: 303,
		to: 379,
		weight: -0.4608954782681783,
		gater: null
	},
	{
		from: 304,
		to: 360,
		weight: 3.2130325960970185,
		gater: null
	},
	{
		from: 304,
		to: 361,
		weight: 1.9888381133836532,
		gater: null
	},
	{
		from: 304,
		to: 362,
		weight: 8.669341167258375,
		gater: null
	},
	{
		from: 304,
		to: 363,
		weight: -0.3937922219217661,
		gater: null
	},
	{
		from: 304,
		to: 364,
		weight: 2.9322799228109053,
		gater: null
	},
	{
		from: 304,
		to: 365,
		weight: 1.988796135249739,
		gater: null
	},
	{
		from: 304,
		to: 366,
		weight: -2.273312591236209,
		gater: null
	},
	{
		from: 304,
		to: 367,
		weight: 0.6289005622798648,
		gater: null
	},
	{
		from: 304,
		to: 368,
		weight: -2.4394746788018598,
		gater: null
	},
	{
		from: 304,
		to: 369,
		weight: 2.0002592244565953,
		gater: null
	},
	{
		from: 304,
		to: 370,
		weight: 0.8644806529117576,
		gater: null
	},
	{
		from: 304,
		to: 371,
		weight: 0.7936801677172706,
		gater: null
	},
	{
		from: 304,
		to: 372,
		weight: 2.3927091255854926,
		gater: null
	},
	{
		from: 304,
		to: 373,
		weight: -1.0176749017139701,
		gater: null
	},
	{
		from: 304,
		to: 374,
		weight: -0.5733204520907942,
		gater: null
	},
	{
		from: 304,
		to: 375,
		weight: 0.2564641514163425,
		gater: null
	},
	{
		from: 304,
		to: 376,
		weight: -1.8041033263732478,
		gater: null
	},
	{
		from: 304,
		to: 377,
		weight: 4.13154617940119,
		gater: null
	},
	{
		from: 304,
		to: 378,
		weight: 2.1000498612136855,
		gater: null
	},
	{
		from: 304,
		to: 379,
		weight: -1.187984533645809,
		gater: null
	},
	{
		from: 305,
		to: 360,
		weight: 3.89928161978886,
		gater: null
	},
	{
		from: 305,
		to: 361,
		weight: -4.43589616096401,
		gater: null
	},
	{
		from: 305,
		to: 362,
		weight: -2.0258670055667363,
		gater: null
	},
	{
		from: 305,
		to: 363,
		weight: -6.473190597144339,
		gater: null
	},
	{
		from: 305,
		to: 364,
		weight: 0.12168056274627319,
		gater: null
	},
	{
		from: 305,
		to: 365,
		weight: 0.9203356290998913,
		gater: null
	},
	{
		from: 305,
		to: 366,
		weight: -4.3697173779704395,
		gater: null
	},
	{
		from: 305,
		to: 367,
		weight: 2.168784648439911,
		gater: null
	},
	{
		from: 305,
		to: 368,
		weight: -6.937187079195515,
		gater: null
	},
	{
		from: 305,
		to: 369,
		weight: -3.119185441013466,
		gater: null
	},
	{
		from: 305,
		to: 370,
		weight: -3.9130095311213804,
		gater: null
	},
	{
		from: 305,
		to: 371,
		weight: 1.643520494549861,
		gater: null
	},
	{
		from: 305,
		to: 372,
		weight: 0.28244140654016375,
		gater: null
	},
	{
		from: 305,
		to: 373,
		weight: -3.3019541820687683,
		gater: null
	},
	{
		from: 305,
		to: 374,
		weight: 1.6256578731044706,
		gater: null
	},
	{
		from: 305,
		to: 375,
		weight: -3.7044593756681263,
		gater: null
	},
	{
		from: 305,
		to: 376,
		weight: 6.671478024288537,
		gater: null
	},
	{
		from: 305,
		to: 377,
		weight: 2.1112461522617085,
		gater: null
	},
	{
		from: 305,
		to: 378,
		weight: 6.955718828903023,
		gater: null
	},
	{
		from: 305,
		to: 379,
		weight: 5.02987466397489,
		gater: null
	},
	{
		from: 306,
		to: 360,
		weight: -0.3993455068267721,
		gater: null
	},
	{
		from: 306,
		to: 361,
		weight: 0.06874374492118164,
		gater: null
	},
	{
		from: 306,
		to: 362,
		weight: -1.7594897865098202,
		gater: null
	},
	{
		from: 306,
		to: 363,
		weight: -0.15265429207892522,
		gater: null
	},
	{
		from: 306,
		to: 364,
		weight: 0.673164638922065,
		gater: null
	},
	{
		from: 306,
		to: 365,
		weight: -0.0866076076437555,
		gater: null
	},
	{
		from: 306,
		to: 366,
		weight: -0.229050615462204,
		gater: null
	},
	{
		from: 306,
		to: 367,
		weight: 1.402247470243773,
		gater: null
	},
	{
		from: 306,
		to: 368,
		weight: -1.1467129695236058,
		gater: null
	},
	{
		from: 306,
		to: 369,
		weight: 0.4309985205351717,
		gater: null
	},
	{
		from: 306,
		to: 370,
		weight: -0.1418666703324762,
		gater: null
	},
	{
		from: 306,
		to: 371,
		weight: -0.5794672070305279,
		gater: null
	},
	{
		from: 306,
		to: 372,
		weight: 0.8425809297684926,
		gater: null
	},
	{
		from: 306,
		to: 373,
		weight: 0.0006231278660994158,
		gater: null
	},
	{
		from: 306,
		to: 374,
		weight: 1.1479903248407766,
		gater: null
	},
	{
		from: 306,
		to: 375,
		weight: -0.20414798347340274,
		gater: null
	},
	{
		from: 306,
		to: 376,
		weight: 0.031295599864509124,
		gater: null
	},
	{
		from: 306,
		to: 377,
		weight: -0.29106251269845007,
		gater: null
	},
	{
		from: 306,
		to: 378,
		weight: 0.02356364327412075,
		gater: null
	},
	{
		from: 306,
		to: 379,
		weight: 0.8639638214263488,
		gater: null
	},
	{
		from: 307,
		to: 360,
		weight: -0.10762688895582301,
		gater: null
	},
	{
		from: 307,
		to: 361,
		weight: -0.028210174494921317,
		gater: null
	},
	{
		from: 307,
		to: 362,
		weight: -0.2540922015423916,
		gater: null
	},
	{
		from: 307,
		to: 363,
		weight: -0.2169213964565022,
		gater: null
	},
	{
		from: 307,
		to: 364,
		weight: -0.2492837876074925,
		gater: null
	},
	{
		from: 307,
		to: 365,
		weight: -0.8610126364854209,
		gater: null
	},
	{
		from: 307,
		to: 366,
		weight: -0.2420293943507341,
		gater: null
	},
	{
		from: 307,
		to: 367,
		weight: 1.2778520182116477,
		gater: null
	},
	{
		from: 307,
		to: 368,
		weight: -0.6549807608124317,
		gater: null
	},
	{
		from: 307,
		to: 369,
		weight: -0.3346617766753817,
		gater: null
	},
	{
		from: 307,
		to: 370,
		weight: -0.1465675669872046,
		gater: null
	},
	{
		from: 307,
		to: 371,
		weight: 2.3796107339805728,
		gater: null
	},
	{
		from: 307,
		to: 372,
		weight: 0.6750961366890404,
		gater: null
	},
	{
		from: 307,
		to: 373,
		weight: 0.0822098163139633,
		gater: null
	},
	{
		from: 307,
		to: 374,
		weight: -0.6189106704144753,
		gater: null
	},
	{
		from: 307,
		to: 375,
		weight: -0.27792055021215545,
		gater: null
	},
	{
		from: 307,
		to: 376,
		weight: -0.5642176091884104,
		gater: null
	},
	{
		from: 307,
		to: 377,
		weight: -0.5051863301226398,
		gater: null
	},
	{
		from: 307,
		to: 378,
		weight: 0.0367300977548821,
		gater: null
	},
	{
		from: 307,
		to: 379,
		weight: 0.09687248823158295,
		gater: null
	},
	{
		from: 308,
		to: 360,
		weight: -0.2004996065209548,
		gater: null
	},
	{
		from: 308,
		to: 361,
		weight: 0.1379284750024718,
		gater: null
	},
	{
		from: 308,
		to: 362,
		weight: -0.33739387066090304,
		gater: null
	},
	{
		from: 308,
		to: 363,
		weight: -0.1762475458696925,
		gater: null
	},
	{
		from: 308,
		to: 364,
		weight: 0.9384084297575518,
		gater: null
	},
	{
		from: 308,
		to: 365,
		weight: -0.6855204432193323,
		gater: null
	},
	{
		from: 308,
		to: 366,
		weight: -0.39706580001318037,
		gater: null
	},
	{
		from: 308,
		to: 367,
		weight: 1.5378371788062368,
		gater: null
	},
	{
		from: 308,
		to: 368,
		weight: -0.4566353743281107,
		gater: null
	},
	{
		from: 308,
		to: 369,
		weight: -0.20921212547425863,
		gater: null
	},
	{
		from: 308,
		to: 370,
		weight: -1.8276108856205597,
		gater: null
	},
	{
		from: 308,
		to: 371,
		weight: 1.9342712452210513,
		gater: null
	},
	{
		from: 308,
		to: 372,
		weight: -0.3006038407355723,
		gater: null
	},
	{
		from: 308,
		to: 373,
		weight: -0.012741010418749319,
		gater: null
	},
	{
		from: 308,
		to: 374,
		weight: -0.4714206180169788,
		gater: null
	},
	{
		from: 308,
		to: 375,
		weight: -0.2848991289398264,
		gater: null
	},
	{
		from: 308,
		to: 376,
		weight: -0.2987817142785212,
		gater: null
	},
	{
		from: 308,
		to: 377,
		weight: -0.43384258577144963,
		gater: null
	},
	{
		from: 308,
		to: 378,
		weight: 0.13554866631844117,
		gater: null
	},
	{
		from: 308,
		to: 379,
		weight: 0.6460950055998647,
		gater: null
	},
	{
		from: 309,
		to: 360,
		weight: 6.631856723285707,
		gater: null
	},
	{
		from: 309,
		to: 361,
		weight: -1.4618358010232573,
		gater: null
	},
	{
		from: 309,
		to: 362,
		weight: -1.8578423634996015,
		gater: null
	},
	{
		from: 309,
		to: 363,
		weight: -2.9208504336525576,
		gater: null
	},
	{
		from: 309,
		to: 364,
		weight: 1.2840954338863177,
		gater: null
	},
	{
		from: 309,
		to: 365,
		weight: -0.005047576675054227,
		gater: null
	},
	{
		from: 309,
		to: 366,
		weight: -0.05826730518760507,
		gater: null
	},
	{
		from: 309,
		to: 367,
		weight: 2.5683549990519796,
		gater: null
	},
	{
		from: 309,
		to: 368,
		weight: -4.149903942126388,
		gater: null
	},
	{
		from: 309,
		to: 369,
		weight: 5.504093766254772,
		gater: null
	},
	{
		from: 309,
		to: 370,
		weight: -1.029987515519077,
		gater: null
	},
	{
		from: 309,
		to: 371,
		weight: 1.7681458353638015,
		gater: null
	},
	{
		from: 309,
		to: 372,
		weight: -0.6675192405730339,
		gater: null
	},
	{
		from: 309,
		to: 373,
		weight: -1.6336196738147668,
		gater: null
	},
	{
		from: 309,
		to: 374,
		weight: -0.829094263856558,
		gater: null
	},
	{
		from: 309,
		to: 375,
		weight: -3.6909713246823004,
		gater: null
	},
	{
		from: 309,
		to: 376,
		weight: -1.0081080108736082,
		gater: null
	},
	{
		from: 309,
		to: 377,
		weight: 6.0635538287711555,
		gater: null
	},
	{
		from: 309,
		to: 378,
		weight: -0.5731436885308707,
		gater: null
	},
	{
		from: 309,
		to: 379,
		weight: 4.639149584041487,
		gater: null
	},
	{
		from: 310,
		to: 360,
		weight: -2.047827928319527,
		gater: null
	},
	{
		from: 310,
		to: 361,
		weight: 1.7539327859924767,
		gater: null
	},
	{
		from: 310,
		to: 362,
		weight: -0.7253782701259371,
		gater: null
	},
	{
		from: 310,
		to: 363,
		weight: -3.528224696723551,
		gater: null
	},
	{
		from: 310,
		to: 364,
		weight: -2.208232381095013,
		gater: null
	},
	{
		from: 310,
		to: 365,
		weight: -0.22526231007143652,
		gater: null
	},
	{
		from: 310,
		to: 366,
		weight: -4.466158012649637,
		gater: null
	},
	{
		from: 310,
		to: 367,
		weight: 2.04054131350916,
		gater: null
	},
	{
		from: 310,
		to: 368,
		weight: -2.5849043416576802,
		gater: null
	},
	{
		from: 310,
		to: 369,
		weight: -8.695853256484769,
		gater: null
	},
	{
		from: 310,
		to: 370,
		weight: -5.939251866947224,
		gater: null
	},
	{
		from: 310,
		to: 371,
		weight: 5.192908627609976,
		gater: null
	},
	{
		from: 310,
		to: 372,
		weight: -0.4011386026452337,
		gater: null
	},
	{
		from: 310,
		to: 373,
		weight: -1.5990277612367072,
		gater: null
	},
	{
		from: 310,
		to: 374,
		weight: 1.615133390675501,
		gater: null
	},
	{
		from: 310,
		to: 375,
		weight: -0.6578355381969433,
		gater: null
	},
	{
		from: 310,
		to: 376,
		weight: 7.7107235177828155,
		gater: null
	},
	{
		from: 310,
		to: 377,
		weight: -4.120677527823603,
		gater: null
	},
	{
		from: 310,
		to: 378,
		weight: 7.696265993574564,
		gater: null
	},
	{
		from: 310,
		to: 379,
		weight: 0.3760040406959584,
		gater: null
	},
	{
		from: 311,
		to: 360,
		weight: 14.360988841285119,
		gater: null
	},
	{
		from: 311,
		to: 361,
		weight: -0.8814952045007887,
		gater: null
	},
	{
		from: 311,
		to: 362,
		weight: -3.4454159623719605,
		gater: null
	},
	{
		from: 311,
		to: 363,
		weight: -2.250079408227608,
		gater: null
	},
	{
		from: 311,
		to: 364,
		weight: 7.596505092264199,
		gater: null
	},
	{
		from: 311,
		to: 365,
		weight: 2.9614050916718666,
		gater: null
	},
	{
		from: 311,
		to: 366,
		weight: 4.29029669886808,
		gater: null
	},
	{
		from: 311,
		to: 367,
		weight: 0.1319493441666934,
		gater: null
	},
	{
		from: 311,
		to: 368,
		weight: -0.8940530908766212,
		gater: null
	},
	{
		from: 311,
		to: 369,
		weight: 2.3065847587878845,
		gater: null
	},
	{
		from: 311,
		to: 370,
		weight: 1.0990648874185498,
		gater: null
	},
	{
		from: 311,
		to: 371,
		weight: -4.760834482726371,
		gater: null
	},
	{
		from: 311,
		to: 372,
		weight: 4.74201724969624,
		gater: null
	},
	{
		from: 311,
		to: 373,
		weight: 0.37072264212738654,
		gater: null
	},
	{
		from: 311,
		to: 374,
		weight: -4.495107107762085,
		gater: null
	},
	{
		from: 311,
		to: 375,
		weight: -1.5276403061647852,
		gater: null
	},
	{
		from: 311,
		to: 376,
		weight: -6.2149627246114845,
		gater: null
	},
	{
		from: 311,
		to: 377,
		weight: -2.2054374161602377,
		gater: null
	},
	{
		from: 311,
		to: 378,
		weight: -0.14541310657223422,
		gater: null
	},
	{
		from: 311,
		to: 379,
		weight: 1.1012102708471183,
		gater: null
	},
	{
		from: 312,
		to: 360,
		weight: 1.0978777344109463,
		gater: null
	},
	{
		from: 312,
		to: 361,
		weight: -2.3737476879174984,
		gater: null
	},
	{
		from: 312,
		to: 362,
		weight: 7.722444732945528,
		gater: null
	},
	{
		from: 312,
		to: 363,
		weight: 3.337912885528239,
		gater: null
	},
	{
		from: 312,
		to: 364,
		weight: 1.753415445447419,
		gater: null
	},
	{
		from: 312,
		to: 365,
		weight: 0.24398695315105648,
		gater: null
	},
	{
		from: 312,
		to: 366,
		weight: -0.5650944198259304,
		gater: null
	},
	{
		from: 312,
		to: 367,
		weight: 0.9440393646462022,
		gater: null
	},
	{
		from: 312,
		to: 368,
		weight: 3.159944739504524,
		gater: null
	},
	{
		from: 312,
		to: 369,
		weight: 6.073980485186934,
		gater: null
	},
	{
		from: 312,
		to: 370,
		weight: 2.697202879677405,
		gater: null
	},
	{
		from: 312,
		to: 371,
		weight: -4.541958604762824,
		gater: null
	},
	{
		from: 312,
		to: 372,
		weight: -3.002141854547001,
		gater: null
	},
	{
		from: 312,
		to: 373,
		weight: -0.3644120659339554,
		gater: null
	},
	{
		from: 312,
		to: 374,
		weight: -0.43963914100432894,
		gater: null
	},
	{
		from: 312,
		to: 375,
		weight: 8.286325303600888,
		gater: null
	},
	{
		from: 312,
		to: 376,
		weight: -5.2786771303790605,
		gater: null
	},
	{
		from: 312,
		to: 377,
		weight: 2.7354002327659286,
		gater: null
	},
	{
		from: 312,
		to: 378,
		weight: -4.608143327688123,
		gater: null
	},
	{
		from: 312,
		to: 379,
		weight: -0.4989182627503634,
		gater: null
	},
	{
		from: 313,
		to: 360,
		weight: 3.153534752869467,
		gater: null
	},
	{
		from: 313,
		to: 361,
		weight: 1.0084733580702658,
		gater: null
	},
	{
		from: 313,
		to: 362,
		weight: 0.30116214926339296,
		gater: null
	},
	{
		from: 313,
		to: 363,
		weight: -0.920074776644663,
		gater: null
	},
	{
		from: 313,
		to: 364,
		weight: -1.2971313477418016,
		gater: null
	},
	{
		from: 313,
		to: 365,
		weight: -1.286464863567255,
		gater: null
	},
	{
		from: 313,
		to: 366,
		weight: 1.8682108925469914,
		gater: null
	},
	{
		from: 313,
		to: 367,
		weight: 0.012962116004162121,
		gater: null
	},
	{
		from: 313,
		to: 368,
		weight: -0.7998830824139173,
		gater: null
	},
	{
		from: 313,
		to: 369,
		weight: -7.9547721352025755,
		gater: null
	},
	{
		from: 313,
		to: 370,
		weight: -1.0242486201374545,
		gater: null
	},
	{
		from: 313,
		to: 371,
		weight: -0.14217062899674252,
		gater: null
	},
	{
		from: 313,
		to: 372,
		weight: -2.3694221837515563,
		gater: null
	},
	{
		from: 313,
		to: 373,
		weight: 1.4813944232187544,
		gater: null
	},
	{
		from: 313,
		to: 374,
		weight: 0.014356351999761797,
		gater: null
	},
	{
		from: 313,
		to: 375,
		weight: 4.673855027574548,
		gater: null
	},
	{
		from: 313,
		to: 376,
		weight: 0.17159869130465302,
		gater: null
	},
	{
		from: 313,
		to: 377,
		weight: 0.7952322870859485,
		gater: null
	},
	{
		from: 313,
		to: 378,
		weight: -6.016141852498839,
		gater: null
	},
	{
		from: 313,
		to: 379,
		weight: 1.3683123185891246,
		gater: null
	},
	{
		from: 314,
		to: 360,
		weight: -8.758991227371451,
		gater: null
	},
	{
		from: 314,
		to: 361,
		weight: -1.060893501983149,
		gater: null
	},
	{
		from: 314,
		to: 362,
		weight: 0.7317271425687678,
		gater: null
	},
	{
		from: 314,
		to: 363,
		weight: -7.82231269361176,
		gater: null
	},
	{
		from: 314,
		to: 364,
		weight: -6.416842041756933,
		gater: null
	},
	{
		from: 314,
		to: 365,
		weight: -2.326962142939672,
		gater: null
	},
	{
		from: 314,
		to: 366,
		weight: 0.10035611868893358,
		gater: null
	},
	{
		from: 314,
		to: 367,
		weight: 1.3371405858492151,
		gater: null
	},
	{
		from: 314,
		to: 368,
		weight: -4.160952959607109,
		gater: null
	},
	{
		from: 314,
		to: 369,
		weight: -0.06382790670557305,
		gater: null
	},
	{
		from: 314,
		to: 370,
		weight: 0.36664674779626544,
		gater: null
	},
	{
		from: 314,
		to: 371,
		weight: 4.770746633962936,
		gater: null
	},
	{
		from: 314,
		to: 372,
		weight: -1.3757130535647686,
		gater: null
	},
	{
		from: 314,
		to: 373,
		weight: 1.832052245277692,
		gater: null
	},
	{
		from: 314,
		to: 374,
		weight: -0.3829173505991609,
		gater: null
	},
	{
		from: 314,
		to: 375,
		weight: -4.8593091010947,
		gater: null
	},
	{
		from: 314,
		to: 376,
		weight: 1.5491361989332468,
		gater: null
	},
	{
		from: 314,
		to: 377,
		weight: -3.1774776654327246,
		gater: null
	},
	{
		from: 314,
		to: 378,
		weight: -1.3786980828688775,
		gater: null
	},
	{
		from: 314,
		to: 379,
		weight: -1.2840608365393913,
		gater: null
	},
	{
		from: 315,
		to: 360,
		weight: -3.8949647321713203,
		gater: null
	},
	{
		from: 315,
		to: 361,
		weight: 1.4346461120945317,
		gater: null
	},
	{
		from: 315,
		to: 362,
		weight: 1.5425142379620909,
		gater: null
	},
	{
		from: 315,
		to: 363,
		weight: 2.7603506844131434,
		gater: null
	},
	{
		from: 315,
		to: 364,
		weight: 3.58664381730348,
		gater: null
	},
	{
		from: 315,
		to: 365,
		weight: -1.162204885626899,
		gater: null
	},
	{
		from: 315,
		to: 366,
		weight: 0.3542784120709962,
		gater: null
	},
	{
		from: 315,
		to: 367,
		weight: -0.4040243183537497,
		gater: null
	},
	{
		from: 315,
		to: 368,
		weight: -1.192371355264066,
		gater: null
	},
	{
		from: 315,
		to: 369,
		weight: -3.7722622058193123,
		gater: null
	},
	{
		from: 315,
		to: 370,
		weight: -1.8990611114796223,
		gater: null
	},
	{
		from: 315,
		to: 371,
		weight: -2.4020862369598355,
		gater: null
	},
	{
		from: 315,
		to: 372,
		weight: -0.6978606154473,
		gater: null
	},
	{
		from: 315,
		to: 373,
		weight: 2.01345401684568,
		gater: null
	},
	{
		from: 315,
		to: 374,
		weight: -3.769822855317304,
		gater: null
	},
	{
		from: 315,
		to: 375,
		weight: 0.9315158816178026,
		gater: null
	},
	{
		from: 315,
		to: 376,
		weight: -2.0414545779840045,
		gater: null
	},
	{
		from: 315,
		to: 377,
		weight: -9.42369229454787,
		gater: null
	},
	{
		from: 315,
		to: 378,
		weight: -1.9240066784777474,
		gater: null
	},
	{
		from: 315,
		to: 379,
		weight: 0.4391504414223376,
		gater: null
	},
	{
		from: 316,
		to: 360,
		weight: 3.1096170148144013,
		gater: null
	},
	{
		from: 316,
		to: 361,
		weight: -2.689549507480183,
		gater: null
	},
	{
		from: 316,
		to: 362,
		weight: 9.047023648461849,
		gater: null
	},
	{
		from: 316,
		to: 363,
		weight: 3.131398101976603,
		gater: null
	},
	{
		from: 316,
		to: 364,
		weight: 6.390294946808073,
		gater: null
	},
	{
		from: 316,
		to: 365,
		weight: 5.551506077506165,
		gater: null
	},
	{
		from: 316,
		to: 366,
		weight: -0.3687154445605968,
		gater: null
	},
	{
		from: 316,
		to: 367,
		weight: -3.632277740109584,
		gater: null
	},
	{
		from: 316,
		to: 368,
		weight: 3.7827688463789775,
		gater: null
	},
	{
		from: 316,
		to: 369,
		weight: -2.765768829796214,
		gater: null
	},
	{
		from: 316,
		to: 370,
		weight: 7.324056664406943,
		gater: null
	},
	{
		from: 316,
		to: 371,
		weight: -3.551983171606208,
		gater: null
	},
	{
		from: 316,
		to: 372,
		weight: -5.259742321116853,
		gater: null
	},
	{
		from: 316,
		to: 373,
		weight: -2.848306351239749,
		gater: null
	},
	{
		from: 316,
		to: 374,
		weight: 1.4090913762124586,
		gater: null
	},
	{
		from: 316,
		to: 375,
		weight: -4.044200840540446,
		gater: null
	},
	{
		from: 316,
		to: 376,
		weight: 6.595113970132777,
		gater: null
	},
	{
		from: 316,
		to: 377,
		weight: 4.259862875591628,
		gater: null
	},
	{
		from: 316,
		to: 378,
		weight: 4.468031674253953,
		gater: null
	},
	{
		from: 316,
		to: 379,
		weight: -1.7776619706245833,
		gater: null
	},
	{
		from: 317,
		to: 360,
		weight: 0.5705133472730252,
		gater: null
	},
	{
		from: 317,
		to: 361,
		weight: 4.554646213665822,
		gater: null
	},
	{
		from: 317,
		to: 362,
		weight: -0.03980176150686644,
		gater: null
	},
	{
		from: 317,
		to: 363,
		weight: 0.11124554051085281,
		gater: null
	},
	{
		from: 317,
		to: 364,
		weight: -2.542900904587245,
		gater: null
	},
	{
		from: 317,
		to: 365,
		weight: -1.2740013390372877,
		gater: null
	},
	{
		from: 317,
		to: 366,
		weight: -0.106672887345238,
		gater: null
	},
	{
		from: 317,
		to: 367,
		weight: 0.06514201479391844,
		gater: null
	},
	{
		from: 317,
		to: 368,
		weight: -0.2757354372574218,
		gater: null
	},
	{
		from: 317,
		to: 369,
		weight: -0.038489052411351636,
		gater: null
	},
	{
		from: 317,
		to: 370,
		weight: 0.2520826207603675,
		gater: null
	},
	{
		from: 317,
		to: 371,
		weight: 0.08741817926829164,
		gater: null
	},
	{
		from: 317,
		to: 372,
		weight: -0.5137165423974545,
		gater: null
	},
	{
		from: 317,
		to: 373,
		weight: 0.023898168185090347,
		gater: null
	},
	{
		from: 317,
		to: 374,
		weight: -1.447257123306645,
		gater: null
	},
	{
		from: 317,
		to: 375,
		weight: -0.10754440209830322,
		gater: null
	},
	{
		from: 317,
		to: 376,
		weight: 0.0000645285790945214,
		gater: null
	},
	{
		from: 317,
		to: 377,
		weight: 0.12338800182131612,
		gater: null
	},
	{
		from: 317,
		to: 378,
		weight: 0.0900426563947068,
		gater: null
	},
	{
		from: 317,
		to: 379,
		weight: -0.503268847121634,
		gater: null
	},
	{
		from: 318,
		to: 360,
		weight: 0.39539689989379384,
		gater: null
	},
	{
		from: 318,
		to: 361,
		weight: 4.450077771647166,
		gater: null
	},
	{
		from: 318,
		to: 362,
		weight: -0.04753865043548986,
		gater: null
	},
	{
		from: 318,
		to: 363,
		weight: 0.1136933602311151,
		gater: null
	},
	{
		from: 318,
		to: 364,
		weight: -2.593353871415821,
		gater: null
	},
	{
		from: 318,
		to: 365,
		weight: -0.9931466669475768,
		gater: null
	},
	{
		from: 318,
		to: 366,
		weight: -0.10471998930028545,
		gater: null
	},
	{
		from: 318,
		to: 367,
		weight: 0.014328893360538525,
		gater: null
	},
	{
		from: 318,
		to: 368,
		weight: -0.2893022705732064,
		gater: null
	},
	{
		from: 318,
		to: 369,
		weight: -0.006800445709480619,
		gater: null
	},
	{
		from: 318,
		to: 370,
		weight: 0.05012048183806489,
		gater: null
	},
	{
		from: 318,
		to: 371,
		weight: 0.19929755872862076,
		gater: null
	},
	{
		from: 318,
		to: 372,
		weight: -0.4826636361723175,
		gater: null
	},
	{
		from: 318,
		to: 373,
		weight: 0.04071205327349724,
		gater: null
	},
	{
		from: 318,
		to: 374,
		weight: -0.8993342206956891,
		gater: null
	},
	{
		from: 318,
		to: 375,
		weight: 0.04080721905060448,
		gater: null
	},
	{
		from: 318,
		to: 376,
		weight: -0.058839921358248934,
		gater: null
	},
	{
		from: 318,
		to: 377,
		weight: -0.009574654189270074,
		gater: null
	},
	{
		from: 318,
		to: 378,
		weight: -0.004461325151514725,
		gater: null
	},
	{
		from: 318,
		to: 379,
		weight: -0.5512785527323392,
		gater: null
	},
	{
		from: 319,
		to: 360,
		weight: 0.47827501112278126,
		gater: null
	},
	{
		from: 319,
		to: 361,
		weight: 0.2463938808811793,
		gater: null
	},
	{
		from: 319,
		to: 362,
		weight: 0.019855434292141757,
		gater: null
	},
	{
		from: 319,
		to: 363,
		weight: -0.07688205677642063,
		gater: null
	},
	{
		from: 319,
		to: 364,
		weight: 2.870697435288025,
		gater: null
	},
	{
		from: 319,
		to: 365,
		weight: -1.3249396734201122,
		gater: null
	},
	{
		from: 319,
		to: 366,
		weight: -0.23509746792153002,
		gater: null
	},
	{
		from: 319,
		to: 367,
		weight: 0.27134479296208514,
		gater: null
	},
	{
		from: 319,
		to: 368,
		weight: 0.09034011078111709,
		gater: null
	},
	{
		from: 319,
		to: 369,
		weight: -0.13902169723736682,
		gater: null
	},
	{
		from: 319,
		to: 370,
		weight: 0.3490500512509945,
		gater: null
	},
	{
		from: 319,
		to: 371,
		weight: 0.023146897532337837,
		gater: null
	},
	{
		from: 319,
		to: 372,
		weight: -0.5160060905292922,
		gater: null
	},
	{
		from: 319,
		to: 373,
		weight: -1.2815078626732956,
		gater: null
	},
	{
		from: 319,
		to: 374,
		weight: -1.9857029012373817,
		gater: null
	},
	{
		from: 319,
		to: 375,
		weight: 0.04617591198841083,
		gater: null
	},
	{
		from: 319,
		to: 376,
		weight: -0.12078080726886616,
		gater: null
	},
	{
		from: 319,
		to: 377,
		weight: 0.11557165374159949,
		gater: null
	},
	{
		from: 319,
		to: 378,
		weight: -0.2656281648324146,
		gater: null
	},
	{
		from: 319,
		to: 379,
		weight: -0.006801570878181325,
		gater: null
	},
	{
		from: 320,
		to: 360,
		weight: 6.0481717574659335,
		gater: null
	},
	{
		from: 320,
		to: 361,
		weight: 4.342207641118804,
		gater: null
	},
	{
		from: 320,
		to: 362,
		weight: 7.788694202978953,
		gater: null
	},
	{
		from: 320,
		to: 363,
		weight: 3.583153775993006,
		gater: null
	},
	{
		from: 320,
		to: 364,
		weight: 2.1878814362920767,
		gater: null
	},
	{
		from: 320,
		to: 365,
		weight: 1.8749348836828317,
		gater: null
	},
	{
		from: 320,
		to: 366,
		weight: -1.5574930653338663,
		gater: null
	},
	{
		from: 320,
		to: 367,
		weight: -1.0875567213740633,
		gater: null
	},
	{
		from: 320,
		to: 368,
		weight: 3.7277132738349095,
		gater: null
	},
	{
		from: 320,
		to: 369,
		weight: -1.3457101636280435,
		gater: null
	},
	{
		from: 320,
		to: 370,
		weight: 4.115583554417936,
		gater: null
	},
	{
		from: 320,
		to: 371,
		weight: -10.466951624910573,
		gater: null
	},
	{
		from: 320,
		to: 372,
		weight: 0.11634989699202015,
		gater: null
	},
	{
		from: 320,
		to: 373,
		weight: -0.40786883396707174,
		gater: null
	},
	{
		from: 320,
		to: 374,
		weight: -1.0731992893624582,
		gater: null
	},
	{
		from: 320,
		to: 375,
		weight: 0.09476425764652903,
		gater: null
	},
	{
		from: 320,
		to: 376,
		weight: 5.846684331768609,
		gater: null
	},
	{
		from: 320,
		to: 377,
		weight: 2.102777512028042,
		gater: null
	},
	{
		from: 320,
		to: 378,
		weight: -0.05368200786792999,
		gater: null
	},
	{
		from: 320,
		to: 379,
		weight: -0.7880110006848238,
		gater: null
	},
	{
		from: 321,
		to: 360,
		weight: -2.8678234058562873,
		gater: null
	},
	{
		from: 321,
		to: 361,
		weight: -6.847775495687372,
		gater: null
	},
	{
		from: 321,
		to: 362,
		weight: 0.8396204070533259,
		gater: null
	},
	{
		from: 321,
		to: 363,
		weight: -0.750163968196097,
		gater: null
	},
	{
		from: 321,
		to: 364,
		weight: 2.7940351846443523,
		gater: null
	},
	{
		from: 321,
		to: 365,
		weight: 2.7499339211184672,
		gater: null
	},
	{
		from: 321,
		to: 366,
		weight: 1.2353254525660409,
		gater: null
	},
	{
		from: 321,
		to: 367,
		weight: -1.290146441316872,
		gater: null
	},
	{
		from: 321,
		to: 368,
		weight: -0.07277328288436839,
		gater: null
	},
	{
		from: 321,
		to: 369,
		weight: -1.3776920530182417,
		gater: null
	},
	{
		from: 321,
		to: 370,
		weight: 1.02060850914063,
		gater: null
	},
	{
		from: 321,
		to: 371,
		weight: 4.780890332342982,
		gater: null
	},
	{
		from: 321,
		to: 372,
		weight: -6.615784874810622,
		gater: null
	},
	{
		from: 321,
		to: 373,
		weight: -1.3426080080687646,
		gater: null
	},
	{
		from: 321,
		to: 374,
		weight: 1.6207303615565536,
		gater: null
	},
	{
		from: 321,
		to: 375,
		weight: -4.488493207397793,
		gater: null
	},
	{
		from: 321,
		to: 376,
		weight: 0.9547496656473093,
		gater: null
	},
	{
		from: 321,
		to: 377,
		weight: 2.216983771697431,
		gater: null
	},
	{
		from: 321,
		to: 378,
		weight: 4.660195385718031,
		gater: null
	},
	{
		from: 321,
		to: 379,
		weight: -0.2820007089028983,
		gater: null
	},
	{
		from: 322,
		to: 360,
		weight: -2.3563868412554063,
		gater: null
	},
	{
		from: 322,
		to: 361,
		weight: 3.1249182688579613,
		gater: null
	},
	{
		from: 322,
		to: 362,
		weight: 3.3534099510066184,
		gater: null
	},
	{
		from: 322,
		to: 363,
		weight: -8.007255809684377,
		gater: null
	},
	{
		from: 322,
		to: 364,
		weight: -4.720880480153753,
		gater: null
	},
	{
		from: 322,
		to: 365,
		weight: -2.6612669040790498,
		gater: null
	},
	{
		from: 322,
		to: 366,
		weight: -0.2156791485004481,
		gater: null
	},
	{
		from: 322,
		to: 367,
		weight: 3.5938947791697498,
		gater: null
	},
	{
		from: 322,
		to: 368,
		weight: -6.426578513493781,
		gater: null
	},
	{
		from: 322,
		to: 369,
		weight: 5.271973795421442,
		gater: null
	},
	{
		from: 322,
		to: 370,
		weight: 3.638229988991943,
		gater: null
	},
	{
		from: 322,
		to: 371,
		weight: -8.278621216694201,
		gater: null
	},
	{
		from: 322,
		to: 372,
		weight: 0.25027941469090803,
		gater: null
	},
	{
		from: 322,
		to: 373,
		weight: 6.949186426817694,
		gater: null
	},
	{
		from: 322,
		to: 374,
		weight: -2.294409800807411,
		gater: null
	},
	{
		from: 322,
		to: 375,
		weight: -3.508327889297146,
		gater: null
	},
	{
		from: 322,
		to: 376,
		weight: 4.399782833668435,
		gater: null
	},
	{
		from: 322,
		to: 377,
		weight: 9.251437997733081,
		gater: null
	},
	{
		from: 322,
		to: 378,
		weight: -4.057031445409858,
		gater: null
	},
	{
		from: 322,
		to: 379,
		weight: -2.8473757441625027,
		gater: null
	},
	{
		from: 323,
		to: 360,
		weight: 2.6256631495697884,
		gater: null
	},
	{
		from: 323,
		to: 361,
		weight: -3.6734014557792625,
		gater: null
	},
	{
		from: 323,
		to: 362,
		weight: 6.9688278420619945,
		gater: null
	},
	{
		from: 323,
		to: 363,
		weight: 2.8849116824415595,
		gater: null
	},
	{
		from: 323,
		to: 364,
		weight: -1.1097321080777034,
		gater: null
	},
	{
		from: 323,
		to: 365,
		weight: 0.6295274360085524,
		gater: null
	},
	{
		from: 323,
		to: 366,
		weight: -0.44385420929089275,
		gater: null
	},
	{
		from: 323,
		to: 367,
		weight: 1.6380658867280313,
		gater: null
	},
	{
		from: 323,
		to: 368,
		weight: -12.137415916120105,
		gater: null
	},
	{
		from: 323,
		to: 369,
		weight: -8.155272056396015,
		gater: null
	},
	{
		from: 323,
		to: 370,
		weight: -6.380690107122976,
		gater: null
	},
	{
		from: 323,
		to: 371,
		weight: -3.6128937623094215,
		gater: null
	},
	{
		from: 323,
		to: 372,
		weight: 3.0736428824190756,
		gater: null
	},
	{
		from: 323,
		to: 373,
		weight: -4.238373935730224,
		gater: null
	},
	{
		from: 323,
		to: 374,
		weight: -3.401499743680592,
		gater: null
	},
	{
		from: 323,
		to: 375,
		weight: -1.9334036389660079,
		gater: null
	},
	{
		from: 323,
		to: 376,
		weight: -1.8537704147007315,
		gater: null
	},
	{
		from: 323,
		to: 377,
		weight: 6.963216604511348,
		gater: null
	},
	{
		from: 323,
		to: 378,
		weight: 1.05664355458902,
		gater: null
	},
	{
		from: 323,
		to: 379,
		weight: -4.071501414429823,
		gater: null
	},
	{
		from: 324,
		to: 360,
		weight: 0.7490836694378938,
		gater: null
	},
	{
		from: 324,
		to: 361,
		weight: 6.8561899621152325,
		gater: null
	},
	{
		from: 324,
		to: 362,
		weight: -0.4014124725956652,
		gater: null
	},
	{
		from: 324,
		to: 363,
		weight: 0.3076388645281631,
		gater: null
	},
	{
		from: 324,
		to: 364,
		weight: 1.8872793204140663,
		gater: null
	},
	{
		from: 324,
		to: 365,
		weight: 1.4914799790668165,
		gater: null
	},
	{
		from: 324,
		to: 366,
		weight: 3.143574011836672,
		gater: null
	},
	{
		from: 324,
		to: 367,
		weight: -0.6836428176717753,
		gater: null
	},
	{
		from: 324,
		to: 368,
		weight: 1.0117547968441811,
		gater: null
	},
	{
		from: 324,
		to: 369,
		weight: 3.1995372809040554,
		gater: null
	},
	{
		from: 324,
		to: 370,
		weight: 5.24709412166742,
		gater: null
	},
	{
		from: 324,
		to: 371,
		weight: -0.2663776897738553,
		gater: null
	},
	{
		from: 324,
		to: 372,
		weight: -2.648064565119502,
		gater: null
	},
	{
		from: 324,
		to: 373,
		weight: -2.937474164215112,
		gater: null
	},
	{
		from: 324,
		to: 374,
		weight: -1.837937919719968,
		gater: null
	},
	{
		from: 324,
		to: 375,
		weight: 0.008625062724819046,
		gater: null
	},
	{
		from: 324,
		to: 376,
		weight: 0.6370846762510577,
		gater: null
	},
	{
		from: 324,
		to: 377,
		weight: -1.4079467405547221,
		gater: null
	},
	{
		from: 324,
		to: 378,
		weight: 5.27718468205079,
		gater: null
	},
	{
		from: 324,
		to: 379,
		weight: 1.7951622567621521,
		gater: null
	},
	{
		from: 325,
		to: 360,
		weight: 1.1175520361889202,
		gater: null
	},
	{
		from: 325,
		to: 361,
		weight: 4.187554694235621,
		gater: null
	},
	{
		from: 325,
		to: 362,
		weight: 3.8256661920102553,
		gater: null
	},
	{
		from: 325,
		to: 363,
		weight: 6.4042129478511995,
		gater: null
	},
	{
		from: 325,
		to: 364,
		weight: 3.2058368648510394,
		gater: null
	},
	{
		from: 325,
		to: 365,
		weight: -2.3079337570964897,
		gater: null
	},
	{
		from: 325,
		to: 366,
		weight: 2.4022446870347025,
		gater: null
	},
	{
		from: 325,
		to: 367,
		weight: 0.36081849562391693,
		gater: null
	},
	{
		from: 325,
		to: 368,
		weight: -5.015484917778806,
		gater: null
	},
	{
		from: 325,
		to: 369,
		weight: -1.495431987646005,
		gater: null
	},
	{
		from: 325,
		to: 370,
		weight: -5.831263343419206,
		gater: null
	},
	{
		from: 325,
		to: 371,
		weight: 1.656089042376231,
		gater: null
	},
	{
		from: 325,
		to: 372,
		weight: -0.26288379562254716,
		gater: null
	},
	{
		from: 325,
		to: 373,
		weight: 0.05317165224168614,
		gater: null
	},
	{
		from: 325,
		to: 374,
		weight: 1.5737381495929272,
		gater: null
	},
	{
		from: 325,
		to: 375,
		weight: -0.8810874969804889,
		gater: null
	},
	{
		from: 325,
		to: 376,
		weight: -1.7355726549009314,
		gater: null
	},
	{
		from: 325,
		to: 377,
		weight: -1.7404433849479972,
		gater: null
	},
	{
		from: 325,
		to: 378,
		weight: -11.596469669281499,
		gater: null
	},
	{
		from: 325,
		to: 379,
		weight: -0.36935612764256853,
		gater: null
	},
	{
		from: 326,
		to: 360,
		weight: 7.8219599133200965,
		gater: null
	},
	{
		from: 326,
		to: 361,
		weight: 8.551627229843914,
		gater: null
	},
	{
		from: 326,
		to: 362,
		weight: -1.8968420332090539,
		gater: null
	},
	{
		from: 326,
		to: 363,
		weight: 3.3784199941784894,
		gater: null
	},
	{
		from: 326,
		to: 364,
		weight: -6.827108482677297,
		gater: null
	},
	{
		from: 326,
		to: 365,
		weight: 2.6508603117395446,
		gater: null
	},
	{
		from: 326,
		to: 366,
		weight: 0.449394352730673,
		gater: null
	},
	{
		from: 326,
		to: 367,
		weight: -0.4676706974146308,
		gater: null
	},
	{
		from: 326,
		to: 368,
		weight: -8.863307510168998,
		gater: null
	},
	{
		from: 326,
		to: 369,
		weight: -0.8815889931156836,
		gater: null
	},
	{
		from: 326,
		to: 370,
		weight: 0.3428004260712991,
		gater: null
	},
	{
		from: 326,
		to: 371,
		weight: -0.3892676927149753,
		gater: null
	},
	{
		from: 326,
		to: 372,
		weight: -0.4289485600013727,
		gater: null
	},
	{
		from: 326,
		to: 373,
		weight: 1.5587641265347785,
		gater: null
	},
	{
		from: 326,
		to: 374,
		weight: -3.845775066195797,
		gater: null
	},
	{
		from: 326,
		to: 375,
		weight: 8.67738849195006,
		gater: null
	},
	{
		from: 326,
		to: 376,
		weight: 2.7039822037801238,
		gater: null
	},
	{
		from: 326,
		to: 377,
		weight: 5.915688805971017,
		gater: null
	},
	{
		from: 326,
		to: 378,
		weight: 4.197194709084062,
		gater: null
	},
	{
		from: 326,
		to: 379,
		weight: 1.1427266435645402,
		gater: null
	},
	{
		from: 327,
		to: 360,
		weight: 4.805035836250911,
		gater: null
	},
	{
		from: 327,
		to: 361,
		weight: -3.5924741781152387,
		gater: null
	},
	{
		from: 327,
		to: 362,
		weight: 0.49887113050001786,
		gater: null
	},
	{
		from: 327,
		to: 363,
		weight: 2.31180591127854,
		gater: null
	},
	{
		from: 327,
		to: 364,
		weight: 0.2636597519344798,
		gater: null
	},
	{
		from: 327,
		to: 365,
		weight: 6.158956487564783,
		gater: null
	},
	{
		from: 327,
		to: 366,
		weight: 1.772189814960196,
		gater: null
	},
	{
		from: 327,
		to: 367,
		weight: -5.992453574309052,
		gater: null
	},
	{
		from: 327,
		to: 368,
		weight: 6.883320601543406,
		gater: null
	},
	{
		from: 327,
		to: 369,
		weight: 0.021401395803813526,
		gater: null
	},
	{
		from: 327,
		to: 370,
		weight: 2.5234107648231365,
		gater: null
	},
	{
		from: 327,
		to: 371,
		weight: -4.685756261310992,
		gater: null
	},
	{
		from: 327,
		to: 372,
		weight: 3.1922814397824277,
		gater: null
	},
	{
		from: 327,
		to: 373,
		weight: -3.0616039810506663,
		gater: null
	},
	{
		from: 327,
		to: 374,
		weight: 3.831633244877017,
		gater: null
	},
	{
		from: 327,
		to: 375,
		weight: 1.8070795273444198,
		gater: null
	},
	{
		from: 327,
		to: 376,
		weight: -1.7054724093912246,
		gater: null
	},
	{
		from: 327,
		to: 377,
		weight: 3.2628163508632544,
		gater: null
	},
	{
		from: 327,
		to: 378,
		weight: 0.6025473395801473,
		gater: null
	},
	{
		from: 327,
		to: 379,
		weight: -5.042909174544717,
		gater: null
	},
	{
		from: 328,
		to: 360,
		weight: -0.154284681439607,
		gater: null
	},
	{
		from: 328,
		to: 361,
		weight: -0.05586362125508938,
		gater: null
	},
	{
		from: 328,
		to: 362,
		weight: 0.0013399022720675358,
		gater: null
	},
	{
		from: 328,
		to: 363,
		weight: -0.12230498552992317,
		gater: null
	},
	{
		from: 328,
		to: 364,
		weight: 0.06953321045450793,
		gater: null
	},
	{
		from: 328,
		to: 365,
		weight: -0.07802796243481208,
		gater: null
	},
	{
		from: 328,
		to: 366,
		weight: -0.03246861262050069,
		gater: null
	},
	{
		from: 328,
		to: 367,
		weight: -0.02664516373110325,
		gater: null
	},
	{
		from: 328,
		to: 368,
		weight: 0.02145669492580395,
		gater: null
	},
	{
		from: 328,
		to: 369,
		weight: -0.04816047317925864,
		gater: null
	},
	{
		from: 328,
		to: 370,
		weight: -0.3563672696047259,
		gater: null
	},
	{
		from: 328,
		to: 371,
		weight: -0.8089578936347047,
		gater: null
	},
	{
		from: 328,
		to: 372,
		weight: 0.019292710329599606,
		gater: null
	},
	{
		from: 328,
		to: 373,
		weight: 0.04437956346370903,
		gater: null
	},
	{
		from: 328,
		to: 374,
		weight: -0.013927572785364599,
		gater: null
	},
	{
		from: 328,
		to: 375,
		weight: -0.00016076107518884258,
		gater: null
	},
	{
		from: 328,
		to: 376,
		weight: 0.03707569673521523,
		gater: null
	},
	{
		from: 328,
		to: 377,
		weight: 0.005411266572183451,
		gater: null
	},
	{
		from: 328,
		to: 378,
		weight: -0.07102957416234912,
		gater: null
	},
	{
		from: 328,
		to: 379,
		weight: 0.003405816275651334,
		gater: null
	},
	{
		from: 329,
		to: 360,
		weight: -0.13130255386754916,
		gater: null
	},
	{
		from: 329,
		to: 361,
		weight: -0.00018317257817080583,
		gater: null
	},
	{
		from: 329,
		to: 362,
		weight: 0.0320398059656013,
		gater: null
	},
	{
		from: 329,
		to: 363,
		weight: -0.21742465983105502,
		gater: null
	},
	{
		from: 329,
		to: 364,
		weight: 0.05487594745661824,
		gater: null
	},
	{
		from: 329,
		to: 365,
		weight: 0.051538320708995444,
		gater: null
	},
	{
		from: 329,
		to: 366,
		weight: 0.17838649628916237,
		gater: null
	},
	{
		from: 329,
		to: 367,
		weight: 0.08315803809993277,
		gater: null
	},
	{
		from: 329,
		to: 368,
		weight: 0.0709479554574499,
		gater: null
	},
	{
		from: 329,
		to: 369,
		weight: 0.08166097899456577,
		gater: null
	},
	{
		from: 329,
		to: 370,
		weight: -0.35573107849265234,
		gater: null
	},
	{
		from: 329,
		to: 371,
		weight: -0.8690477354651692,
		gater: null
	},
	{
		from: 329,
		to: 372,
		weight: -0.12735081499554024,
		gater: null
	},
	{
		from: 329,
		to: 373,
		weight: -0.003057737645489311,
		gater: null
	},
	{
		from: 329,
		to: 374,
		weight: 0.0893282608738889,
		gater: null
	},
	{
		from: 329,
		to: 375,
		weight: 0.09222175379656808,
		gater: null
	},
	{
		from: 329,
		to: 376,
		weight: 0.09092581374775327,
		gater: null
	},
	{
		from: 329,
		to: 377,
		weight: -0.04833787516998179,
		gater: null
	},
	{
		from: 329,
		to: 378,
		weight: -0.11477734597981822,
		gater: null
	},
	{
		from: 329,
		to: 379,
		weight: -0.044672236465657,
		gater: null
	},
	{
		from: 330,
		to: 360,
		weight: -0.22867092639470754,
		gater: null
	},
	{
		from: 330,
		to: 361,
		weight: -0.09381186930575039,
		gater: null
	},
	{
		from: 330,
		to: 362,
		weight: -0.013365479135455475,
		gater: null
	},
	{
		from: 330,
		to: 363,
		weight: -0.25798072514330517,
		gater: null
	},
	{
		from: 330,
		to: 364,
		weight: 0.007712442901261003,
		gater: null
	},
	{
		from: 330,
		to: 365,
		weight: 0.0839964980183545,
		gater: null
	},
	{
		from: 330,
		to: 366,
		weight: 0.256310390329383,
		gater: null
	},
	{
		from: 330,
		to: 367,
		weight: 0.012442400317226762,
		gater: null
	},
	{
		from: 330,
		to: 368,
		weight: 0.06088015013194021,
		gater: null
	},
	{
		from: 330,
		to: 369,
		weight: -0.014115621255912291,
		gater: null
	},
	{
		from: 330,
		to: 370,
		weight: -0.3671985317011836,
		gater: null
	},
	{
		from: 330,
		to: 371,
		weight: -0.9424851318395576,
		gater: null
	},
	{
		from: 330,
		to: 372,
		weight: -0.11260861544225967,
		gater: null
	},
	{
		from: 330,
		to: 373,
		weight: 0.006681465605355035,
		gater: null
	},
	{
		from: 330,
		to: 374,
		weight: -0.07142000247073219,
		gater: null
	},
	{
		from: 330,
		to: 375,
		weight: 0.10890666582612547,
		gater: null
	},
	{
		from: 330,
		to: 376,
		weight: -0.06165627454159444,
		gater: null
	},
	{
		from: 330,
		to: 377,
		weight: -0.1531049620136526,
		gater: null
	},
	{
		from: 330,
		to: 378,
		weight: 0.0470709662826815,
		gater: null
	},
	{
		from: 330,
		to: 379,
		weight: 0.03584911521325017,
		gater: null
	},
	{
		from: 331,
		to: 360,
		weight: 8.708915013778117,
		gater: null
	},
	{
		from: 331,
		to: 361,
		weight: 2.2834671875590895,
		gater: null
	},
	{
		from: 331,
		to: 362,
		weight: -2.3078307372504345,
		gater: null
	},
	{
		from: 331,
		to: 363,
		weight: -1.268635783145977,
		gater: null
	},
	{
		from: 331,
		to: 364,
		weight: -5.0276307453765225,
		gater: null
	},
	{
		from: 331,
		to: 365,
		weight: 0.9594824395800251,
		gater: null
	},
	{
		from: 331,
		to: 366,
		weight: -1.3831235799062354,
		gater: null
	},
	{
		from: 331,
		to: 367,
		weight: -6.309820385069377,
		gater: null
	},
	{
		from: 331,
		to: 368,
		weight: -0.3610894102340818,
		gater: null
	},
	{
		from: 331,
		to: 369,
		weight: 2.0289919470765403,
		gater: null
	},
	{
		from: 331,
		to: 370,
		weight: -0.5541335719307285,
		gater: null
	},
	{
		from: 331,
		to: 371,
		weight: -1.7568138816812089,
		gater: null
	},
	{
		from: 331,
		to: 372,
		weight: 1.0278104368732452,
		gater: null
	},
	{
		from: 331,
		to: 373,
		weight: -3.556795619276408,
		gater: null
	},
	{
		from: 331,
		to: 374,
		weight: 2.5243128489063476,
		gater: null
	},
	{
		from: 331,
		to: 375,
		weight: -0.7114540897338061,
		gater: null
	},
	{
		from: 331,
		to: 376,
		weight: -3.4334244410568813,
		gater: null
	},
	{
		from: 331,
		to: 377,
		weight: 9.17479788806973,
		gater: null
	},
	{
		from: 331,
		to: 378,
		weight: -5.798075252651911,
		gater: null
	},
	{
		from: 331,
		to: 379,
		weight: -1.0030310278149412,
		gater: null
	},
	{
		from: 332,
		to: 360,
		weight: -3.682271557708763,
		gater: null
	},
	{
		from: 332,
		to: 361,
		weight: -5.92096944826371,
		gater: null
	},
	{
		from: 332,
		to: 362,
		weight: 2.7887269184463377,
		gater: null
	},
	{
		from: 332,
		to: 363,
		weight: 3.616907362861784,
		gater: null
	},
	{
		from: 332,
		to: 364,
		weight: 5.347010110159978,
		gater: null
	},
	{
		from: 332,
		to: 365,
		weight: 5.179757723931036,
		gater: null
	},
	{
		from: 332,
		to: 366,
		weight: 3.1358208212027643,
		gater: null
	},
	{
		from: 332,
		to: 367,
		weight: 0.22508985641222717,
		gater: null
	},
	{
		from: 332,
		to: 368,
		weight: 7.4135008696583276,
		gater: null
	},
	{
		from: 332,
		to: 369,
		weight: -2.0760076920803248,
		gater: null
	},
	{
		from: 332,
		to: 370,
		weight: 3.2740556045560565,
		gater: null
	},
	{
		from: 332,
		to: 371,
		weight: -2.813528258331658,
		gater: null
	},
	{
		from: 332,
		to: 372,
		weight: 1.9698648279736521,
		gater: null
	},
	{
		from: 332,
		to: 373,
		weight: 0.5211046282296232,
		gater: null
	},
	{
		from: 332,
		to: 374,
		weight: 1.3021126982429059,
		gater: null
	},
	{
		from: 332,
		to: 375,
		weight: 2.4266827444579864,
		gater: null
	},
	{
		from: 332,
		to: 376,
		weight: 1.673038639071761,
		gater: null
	},
	{
		from: 332,
		to: 377,
		weight: -5.936020756755102,
		gater: null
	},
	{
		from: 332,
		to: 378,
		weight: 6.3322999979420205,
		gater: null
	},
	{
		from: 332,
		to: 379,
		weight: -4.206169691989615,
		gater: null
	},
	{
		from: 333,
		to: 360,
		weight: -2.9213989174771275,
		gater: null
	},
	{
		from: 333,
		to: 361,
		weight: -16.6913003598155,
		gater: null
	},
	{
		from: 333,
		to: 362,
		weight: 14.651453034616116,
		gater: null
	},
	{
		from: 333,
		to: 363,
		weight: -5.661911191414634,
		gater: null
	},
	{
		from: 333,
		to: 364,
		weight: -4.175744228268476,
		gater: null
	},
	{
		from: 333,
		to: 365,
		weight: -4.478518513948167,
		gater: null
	},
	{
		from: 333,
		to: 366,
		weight: 6.4044880269996085,
		gater: null
	},
	{
		from: 333,
		to: 367,
		weight: 7.00482436986531,
		gater: null
	},
	{
		from: 333,
		to: 368,
		weight: -6.343419073932898,
		gater: null
	},
	{
		from: 333,
		to: 369,
		weight: 4.872735404324456,
		gater: null
	},
	{
		from: 333,
		to: 370,
		weight: -5.764929541771872,
		gater: null
	},
	{
		from: 333,
		to: 371,
		weight: -1.2938241975927414,
		gater: null
	},
	{
		from: 333,
		to: 372,
		weight: 7.532337484270568,
		gater: null
	},
	{
		from: 333,
		to: 373,
		weight: 1.7227981375728518,
		gater: null
	},
	{
		from: 333,
		to: 374,
		weight: -0.041684352806954046,
		gater: null
	},
	{
		from: 333,
		to: 375,
		weight: -6.612990860669186,
		gater: null
	},
	{
		from: 333,
		to: 376,
		weight: 2.2225598838443292,
		gater: null
	},
	{
		from: 333,
		to: 377,
		weight: -9.448461514330464,
		gater: null
	},
	{
		from: 333,
		to: 378,
		weight: -1.762017561006451,
		gater: null
	},
	{
		from: 333,
		to: 379,
		weight: 1.1646363084111568,
		gater: null
	},
	{
		from: 334,
		to: 360,
		weight: -10.064253032639444,
		gater: null
	},
	{
		from: 334,
		to: 361,
		weight: -6.301295681336108,
		gater: null
	},
	{
		from: 334,
		to: 362,
		weight: 4.892395911428797,
		gater: null
	},
	{
		from: 334,
		to: 363,
		weight: -4.250144498765209,
		gater: null
	},
	{
		from: 334,
		to: 364,
		weight: -10.991500505980854,
		gater: null
	},
	{
		from: 334,
		to: 365,
		weight: -1.0544726976466168,
		gater: null
	},
	{
		from: 334,
		to: 366,
		weight: 8.032961870117777,
		gater: null
	},
	{
		from: 334,
		to: 367,
		weight: 1.9628829490696085,
		gater: null
	},
	{
		from: 334,
		to: 368,
		weight: -18.623947444776014,
		gater: null
	},
	{
		from: 334,
		to: 369,
		weight: 10.611256022186842,
		gater: null
	},
	{
		from: 334,
		to: 370,
		weight: 13.126427952193232,
		gater: null
	},
	{
		from: 334,
		to: 371,
		weight: 0.8266134682500862,
		gater: null
	},
	{
		from: 334,
		to: 372,
		weight: -1.5125998622373444,
		gater: null
	},
	{
		from: 334,
		to: 373,
		weight: -0.24383759049022782,
		gater: null
	},
	{
		from: 334,
		to: 374,
		weight: 0.8031943181168668,
		gater: null
	},
	{
		from: 334,
		to: 375,
		weight: 4.6824053559847005,
		gater: null
	},
	{
		from: 334,
		to: 376,
		weight: -0.9154453667528034,
		gater: null
	},
	{
		from: 334,
		to: 377,
		weight: -1.4411486475624264,
		gater: null
	},
	{
		from: 334,
		to: 378,
		weight: 17.621432209363665,
		gater: null
	},
	{
		from: 334,
		to: 379,
		weight: 5.131812173084304,
		gater: null
	},
	{
		from: 335,
		to: 360,
		weight: -16.195465565176356,
		gater: null
	},
	{
		from: 335,
		to: 361,
		weight: 19.65725873384224,
		gater: null
	},
	{
		from: 335,
		to: 362,
		weight: -0.8607106588623568,
		gater: null
	},
	{
		from: 335,
		to: 363,
		weight: 2.2407469205568518,
		gater: null
	},
	{
		from: 335,
		to: 364,
		weight: -3.2086054620005595,
		gater: null
	},
	{
		from: 335,
		to: 365,
		weight: -3.585741501095301,
		gater: null
	},
	{
		from: 335,
		to: 366,
		weight: -3.994501012196339,
		gater: null
	},
	{
		from: 335,
		to: 367,
		weight: 10.505233138068576,
		gater: null
	},
	{
		from: 335,
		to: 368,
		weight: 9.971613226021297,
		gater: null
	},
	{
		from: 335,
		to: 369,
		weight: 9.482397487959101,
		gater: null
	},
	{
		from: 335,
		to: 370,
		weight: 3.560458166826041,
		gater: null
	},
	{
		from: 335,
		to: 371,
		weight: 3.5578115719936516,
		gater: null
	},
	{
		from: 335,
		to: 372,
		weight: -15.100671980343792,
		gater: null
	},
	{
		from: 335,
		to: 373,
		weight: -16.38942555143492,
		gater: null
	},
	{
		from: 335,
		to: 374,
		weight: -1.7859579038371096,
		gater: null
	},
	{
		from: 335,
		to: 375,
		weight: -7.502743826319173,
		gater: null
	},
	{
		from: 335,
		to: 376,
		weight: 4.480941874053311,
		gater: null
	},
	{
		from: 335,
		to: 377,
		weight: 12.005708126029205,
		gater: null
	},
	{
		from: 335,
		to: 378,
		weight: 0.6167215269648185,
		gater: null
	},
	{
		from: 335,
		to: 379,
		weight: 9.674433856491298,
		gater: null
	},
	{
		from: 336,
		to: 360,
		weight: 18.388198476752304,
		gater: null
	},
	{
		from: 336,
		to: 361,
		weight: -9.132785862847273,
		gater: null
	},
	{
		from: 336,
		to: 362,
		weight: 2.904161291197859,
		gater: null
	},
	{
		from: 336,
		to: 363,
		weight: 6.875683061352439,
		gater: null
	},
	{
		from: 336,
		to: 364,
		weight: 11.720007389472835,
		gater: null
	},
	{
		from: 336,
		to: 365,
		weight: 7.683666984170229,
		gater: null
	},
	{
		from: 336,
		to: 366,
		weight: -0.16734825985981344,
		gater: null
	},
	{
		from: 336,
		to: 367,
		weight: -2.4013763070314496,
		gater: null
	},
	{
		from: 336,
		to: 368,
		weight: 14.826186752126244,
		gater: null
	},
	{
		from: 336,
		to: 369,
		weight: -1.7174177860722133,
		gater: null
	},
	{
		from: 336,
		to: 370,
		weight: 0.8582793683005875,
		gater: null
	},
	{
		from: 336,
		to: 371,
		weight: -2.3923847729119383,
		gater: null
	},
	{
		from: 336,
		to: 372,
		weight: 19.473534674273647,
		gater: null
	},
	{
		from: 336,
		to: 373,
		weight: -8.185665117727345,
		gater: null
	},
	{
		from: 336,
		to: 374,
		weight: 0.6252651422421486,
		gater: null
	},
	{
		from: 336,
		to: 375,
		weight: 10.161135289488582,
		gater: null
	},
	{
		from: 336,
		to: 376,
		weight: 14.320313522408131,
		gater: null
	},
	{
		from: 336,
		to: 377,
		weight: -13.81396950453595,
		gater: null
	},
	{
		from: 336,
		to: 378,
		weight: 11.195967685402024,
		gater: null
	},
	{
		from: 336,
		to: 379,
		weight: -5.957426883241118,
		gater: null
	},
	{
		from: 337,
		to: 360,
		weight: -11.062848266943476,
		gater: null
	},
	{
		from: 337,
		to: 361,
		weight: -10.051055154850724,
		gater: null
	},
	{
		from: 337,
		to: 362,
		weight: 16.11933366863067,
		gater: null
	},
	{
		from: 337,
		to: 363,
		weight: 8.162924342238458,
		gater: null
	},
	{
		from: 337,
		to: 364,
		weight: -1.6055662501246395,
		gater: null
	},
	{
		from: 337,
		to: 365,
		weight: -7.16153779377711,
		gater: null
	},
	{
		from: 337,
		to: 366,
		weight: 16.62224032627629,
		gater: null
	},
	{
		from: 337,
		to: 367,
		weight: -5.839616299927961,
		gater: null
	},
	{
		from: 337,
		to: 368,
		weight: 0.9356969989671348,
		gater: null
	},
	{
		from: 337,
		to: 369,
		weight: 0.4773404315066373,
		gater: null
	},
	{
		from: 337,
		to: 370,
		weight: -10.937909498445533,
		gater: null
	},
	{
		from: 337,
		to: 371,
		weight: 2.2464299551043694,
		gater: null
	},
	{
		from: 337,
		to: 372,
		weight: -7.377242804037478,
		gater: null
	},
	{
		from: 337,
		to: 373,
		weight: 1.7322804099551752,
		gater: null
	},
	{
		from: 337,
		to: 374,
		weight: 1.7420682081596974,
		gater: null
	},
	{
		from: 337,
		to: 375,
		weight: 4.720151058520393,
		gater: null
	},
	{
		from: 337,
		to: 376,
		weight: -7.661366627403808,
		gater: null
	},
	{
		from: 337,
		to: 377,
		weight: 19.051768795483014,
		gater: null
	},
	{
		from: 337,
		to: 378,
		weight: 2.6108444955222136,
		gater: null
	},
	{
		from: 337,
		to: 379,
		weight: -1.4818593478077864,
		gater: null
	},
	{
		from: 338,
		to: 360,
		weight: 3.8077653715271826,
		gater: null
	},
	{
		from: 338,
		to: 361,
		weight: -3.8577614848289983,
		gater: null
	},
	{
		from: 338,
		to: 362,
		weight: -0.7701831301302072,
		gater: null
	},
	{
		from: 338,
		to: 363,
		weight: 2.108495652063381,
		gater: null
	},
	{
		from: 338,
		to: 364,
		weight: 0.5196091108560881,
		gater: null
	},
	{
		from: 338,
		to: 365,
		weight: 6.273796795384265,
		gater: null
	},
	{
		from: 338,
		to: 366,
		weight: 4.214494077107985,
		gater: null
	},
	{
		from: 338,
		to: 367,
		weight: -6.1117767426199885,
		gater: null
	},
	{
		from: 338,
		to: 368,
		weight: 6.787381940880764,
		gater: null
	},
	{
		from: 338,
		to: 369,
		weight: 0.14045810792473926,
		gater: null
	},
	{
		from: 338,
		to: 370,
		weight: 1.5436039623352362,
		gater: null
	},
	{
		from: 338,
		to: 371,
		weight: -4.688598761634221,
		gater: null
	},
	{
		from: 338,
		to: 372,
		weight: 3.110634848852771,
		gater: null
	},
	{
		from: 338,
		to: 373,
		weight: -3.1270468167404655,
		gater: null
	},
	{
		from: 338,
		to: 374,
		weight: 6.597517479763682,
		gater: null
	},
	{
		from: 338,
		to: 375,
		weight: 1.8555550511227705,
		gater: null
	},
	{
		from: 338,
		to: 376,
		weight: 0.8494738278653504,
		gater: null
	},
	{
		from: 338,
		to: 377,
		weight: 2.5248673496871508,
		gater: null
	},
	{
		from: 338,
		to: 378,
		weight: 0.20633249171951495,
		gater: null
	},
	{
		from: 338,
		to: 379,
		weight: -5.218456344124767,
		gater: null
	},
	{
		from: 339,
		to: 360,
		weight: 0.06148607187481236,
		gater: null
	},
	{
		from: 339,
		to: 361,
		weight: 0.02470928140520462,
		gater: null
	},
	{
		from: 339,
		to: 362,
		weight: -0.0822369580638544,
		gater: null
	},
	{
		from: 339,
		to: 363,
		weight: -0.09830621468794568,
		gater: null
	},
	{
		from: 339,
		to: 364,
		weight: 0.08674073508700399,
		gater: null
	},
	{
		from: 339,
		to: 365,
		weight: -0.018885802792347774,
		gater: null
	},
	{
		from: 339,
		to: 366,
		weight: 0.06326551498132127,
		gater: null
	},
	{
		from: 339,
		to: 367,
		weight: 0.0045052575146310985,
		gater: null
	},
	{
		from: 339,
		to: 368,
		weight: 0.09295856434601385,
		gater: null
	},
	{
		from: 339,
		to: 369,
		weight: -0.06509089537803396,
		gater: null
	},
	{
		from: 339,
		to: 370,
		weight: 0.0051048967744118535,
		gater: null
	},
	{
		from: 339,
		to: 371,
		weight: -0.1080483344051043,
		gater: null
	},
	{
		from: 339,
		to: 372,
		weight: -0.07965450014300267,
		gater: null
	},
	{
		from: 339,
		to: 373,
		weight: -0.08160976894243889,
		gater: null
	},
	{
		from: 339,
		to: 374,
		weight: 0.058725993331463854,
		gater: null
	},
	{
		from: 339,
		to: 375,
		weight: 0.03723017005817597,
		gater: null
	},
	{
		from: 339,
		to: 376,
		weight: 0.005582595141943958,
		gater: null
	},
	{
		from: 339,
		to: 377,
		weight: -0.006949525265239897,
		gater: null
	},
	{
		from: 339,
		to: 378,
		weight: 0.01599947794605271,
		gater: null
	},
	{
		from: 339,
		to: 379,
		weight: -0.09925729502599348,
		gater: null
	},
	{
		from: 340,
		to: 360,
		weight: -0.03816627330915179,
		gater: null
	},
	{
		from: 340,
		to: 361,
		weight: 0.02137308103996159,
		gater: null
	},
	{
		from: 340,
		to: 362,
		weight: 0.08003097580967423,
		gater: null
	},
	{
		from: 340,
		to: 363,
		weight: 0.06919241510564697,
		gater: null
	},
	{
		from: 340,
		to: 364,
		weight: 0.10499576769247579,
		gater: null
	},
	{
		from: 340,
		to: 365,
		weight: 0.04961902823572069,
		gater: null
	},
	{
		from: 340,
		to: 366,
		weight: 0.022093330782132423,
		gater: null
	},
	{
		from: 340,
		to: 367,
		weight: -0.09636519619106275,
		gater: null
	},
	{
		from: 340,
		to: 368,
		weight: 0.07653042130534313,
		gater: null
	},
	{
		from: 340,
		to: 369,
		weight: 0.030364132682931446,
		gater: null
	},
	{
		from: 340,
		to: 370,
		weight: -0.09958963487742886,
		gater: null
	},
	{
		from: 340,
		to: 371,
		weight: -0.0910461037779113,
		gater: null
	},
	{
		from: 340,
		to: 372,
		weight: -0.05289493364378367,
		gater: null
	},
	{
		from: 340,
		to: 373,
		weight: -0.03161202688198768,
		gater: null
	},
	{
		from: 340,
		to: 374,
		weight: 0.012415995422776775,
		gater: null
	},
	{
		from: 340,
		to: 375,
		weight: 0.011183186011004041,
		gater: null
	},
	{
		from: 340,
		to: 376,
		weight: -0.051108154496146,
		gater: null
	},
	{
		from: 340,
		to: 377,
		weight: -0.01907790639298276,
		gater: null
	},
	{
		from: 340,
		to: 378,
		weight: -0.05575696839009972,
		gater: null
	},
	{
		from: 340,
		to: 379,
		weight: 0.08871582223427854,
		gater: null
	},
	{
		from: 341,
		to: 360,
		weight: -0.1933305349945081,
		gater: null
	},
	{
		from: 341,
		to: 361,
		weight: -0.047655580384202936,
		gater: null
	},
	{
		from: 341,
		to: 362,
		weight: -0.038705568037927886,
		gater: null
	},
	{
		from: 341,
		to: 363,
		weight: -0.18455717682358655,
		gater: null
	},
	{
		from: 341,
		to: 364,
		weight: 0.12866171521608666,
		gater: null
	},
	{
		from: 341,
		to: 365,
		weight: 0.04697102832751842,
		gater: null
	},
	{
		from: 341,
		to: 366,
		weight: 0.059594707283488035,
		gater: null
	},
	{
		from: 341,
		to: 367,
		weight: -0.0520559899178492,
		gater: null
	},
	{
		from: 341,
		to: 368,
		weight: -0.004853215519718321,
		gater: null
	},
	{
		from: 341,
		to: 369,
		weight: 0.08073519428476522,
		gater: null
	},
	{
		from: 341,
		to: 370,
		weight: -0.3389546746042274,
		gater: null
	},
	{
		from: 341,
		to: 371,
		weight: -0.8617987694476422,
		gater: null
	},
	{
		from: 341,
		to: 372,
		weight: -0.12215362985657133,
		gater: null
	},
	{
		from: 341,
		to: 373,
		weight: 0.0167675266407084,
		gater: null
	},
	{
		from: 341,
		to: 374,
		weight: 0.05992761680850035,
		gater: null
	},
	{
		from: 341,
		to: 375,
		weight: 0.0539423654951863,
		gater: null
	},
	{
		from: 341,
		to: 376,
		weight: 0.0939773803376576,
		gater: null
	},
	{
		from: 341,
		to: 377,
		weight: 0.013661653135928181,
		gater: null
	},
	{
		from: 341,
		to: 378,
		weight: -0.07132330380063856,
		gater: null
	},
	{
		from: 341,
		to: 379,
		weight: 0.0675672273824291,
		gater: null
	},
	{
		from: 342,
		to: 360,
		weight: 5.613496330624918,
		gater: null
	},
	{
		from: 342,
		to: 361,
		weight: -3.5334662081825208,
		gater: null
	},
	{
		from: 342,
		to: 362,
		weight: 1.414576769581834,
		gater: null
	},
	{
		from: 342,
		to: 363,
		weight: -0.5927726592012115,
		gater: null
	},
	{
		from: 342,
		to: 364,
		weight: 1.7250555863658261,
		gater: null
	},
	{
		from: 342,
		to: 365,
		weight: 8.809156104738866,
		gater: null
	},
	{
		from: 342,
		to: 366,
		weight: 4.83475699165755,
		gater: null
	},
	{
		from: 342,
		to: 367,
		weight: -12.196429121882874,
		gater: null
	},
	{
		from: 342,
		to: 368,
		weight: 3.697556917351237,
		gater: null
	},
	{
		from: 342,
		to: 369,
		weight: -0.817010704752295,
		gater: null
	},
	{
		from: 342,
		to: 370,
		weight: -7.665109651220135,
		gater: null
	},
	{
		from: 342,
		to: 371,
		weight: 3.7036442751941334,
		gater: null
	},
	{
		from: 342,
		to: 372,
		weight: 1.4542007448521437,
		gater: null
	},
	{
		from: 342,
		to: 373,
		weight: 0.07270462842045308,
		gater: null
	},
	{
		from: 342,
		to: 374,
		weight: 6.755661333645293,
		gater: null
	},
	{
		from: 342,
		to: 375,
		weight: 0.19449761031778912,
		gater: null
	},
	{
		from: 342,
		to: 376,
		weight: -1.3340617893452695,
		gater: null
	},
	{
		from: 342,
		to: 377,
		weight: 4.199964389002933,
		gater: null
	},
	{
		from: 342,
		to: 378,
		weight: 1.7780228029294443,
		gater: null
	},
	{
		from: 342,
		to: 379,
		weight: -9.19288199881818,
		gater: null
	},
	{
		from: 343,
		to: 360,
		weight: -1.6649670424157614,
		gater: null
	},
	{
		from: 343,
		to: 361,
		weight: -0.18119261669200765,
		gater: null
	},
	{
		from: 343,
		to: 362,
		weight: -2.27308725807571,
		gater: null
	},
	{
		from: 343,
		to: 363,
		weight: 2.8647357818418318,
		gater: null
	},
	{
		from: 343,
		to: 364,
		weight: -1.0689652068213233,
		gater: null
	},
	{
		from: 343,
		to: 365,
		weight: -2.4713242531833406,
		gater: null
	},
	{
		from: 343,
		to: 366,
		weight: -0.3835052631904629,
		gater: null
	},
	{
		from: 343,
		to: 367,
		weight: 6.245843789856039,
		gater: null
	},
	{
		from: 343,
		to: 368,
		weight: 3.0248677070165235,
		gater: null
	},
	{
		from: 343,
		to: 369,
		weight: 1.0109697834392548,
		gater: null
	},
	{
		from: 343,
		to: 370,
		weight: 9.225614567618141,
		gater: null
	},
	{
		from: 343,
		to: 371,
		weight: -8.577316138324429,
		gater: null
	},
	{
		from: 343,
		to: 372,
		weight: 1.7125343352678168,
		gater: null
	},
	{
		from: 343,
		to: 373,
		weight: -3.256443249567659,
		gater: null
	},
	{
		from: 343,
		to: 374,
		weight: -0.22571492805253118,
		gater: null
	},
	{
		from: 343,
		to: 375,
		weight: 1.7020801389515676,
		gater: null
	},
	{
		from: 343,
		to: 376,
		weight: 2.071120700940934,
		gater: null
	},
	{
		from: 343,
		to: 377,
		weight: -1.5969990680070625,
		gater: null
	},
	{
		from: 343,
		to: 378,
		weight: -1.58659184485448,
		gater: null
	},
	{
		from: 343,
		to: 379,
		weight: 3.8791531846525973,
		gater: null
	},
	{
		from: 344,
		to: 360,
		weight: -1.6536422024370736,
		gater: null
	},
	{
		from: 344,
		to: 361,
		weight: -0.35816432627594624,
		gater: null
	},
	{
		from: 344,
		to: 362,
		weight: -2.248797176098474,
		gater: null
	},
	{
		from: 344,
		to: 363,
		weight: 2.367448665583619,
		gater: null
	},
	{
		from: 344,
		to: 364,
		weight: 0.38174983391133743,
		gater: null
	},
	{
		from: 344,
		to: 365,
		weight: -2.49825683733513,
		gater: null
	},
	{
		from: 344,
		to: 366,
		weight: -0.5939021021481619,
		gater: null
	},
	{
		from: 344,
		to: 367,
		weight: 5.971084215756619,
		gater: null
	},
	{
		from: 344,
		to: 368,
		weight: 2.8224941897074487,
		gater: null
	},
	{
		from: 344,
		to: 369,
		weight: 1.516904891089578,
		gater: null
	},
	{
		from: 344,
		to: 370,
		weight: 2.0570761527566206,
		gater: null
	},
	{
		from: 344,
		to: 371,
		weight: -7.632942764206268,
		gater: null
	},
	{
		from: 344,
		to: 372,
		weight: -1.3513636249122885,
		gater: null
	},
	{
		from: 344,
		to: 373,
		weight: -3.329590041458684,
		gater: null
	},
	{
		from: 344,
		to: 374,
		weight: -0.14000419914732887,
		gater: null
	},
	{
		from: 344,
		to: 375,
		weight: 1.986606532053444,
		gater: null
	},
	{
		from: 344,
		to: 376,
		weight: 2.170389362226065,
		gater: null
	},
	{
		from: 344,
		to: 377,
		weight: -1.784326330492773,
		gater: null
	},
	{
		from: 344,
		to: 378,
		weight: -1.6034429275518798,
		gater: null
	},
	{
		from: 344,
		to: 379,
		weight: 3.804606028639375,
		gater: null
	},
	{
		from: 345,
		to: 360,
		weight: -1.5948709396552248,
		gater: null
	},
	{
		from: 345,
		to: 361,
		weight: 7.664238245694828,
		gater: null
	},
	{
		from: 345,
		to: 362,
		weight: 0.9536240513470114,
		gater: null
	},
	{
		from: 345,
		to: 363,
		weight: 16.522324148224218,
		gater: null
	},
	{
		from: 345,
		to: 364,
		weight: -0.9131541206853009,
		gater: null
	},
	{
		from: 345,
		to: 365,
		weight: -22.413621088407815,
		gater: null
	},
	{
		from: 345,
		to: 366,
		weight: -13.973035959829957,
		gater: null
	},
	{
		from: 345,
		to: 367,
		weight: -10.91441922546355,
		gater: null
	},
	{
		from: 345,
		to: 368,
		weight: -16.676419529659697,
		gater: null
	},
	{
		from: 345,
		to: 369,
		weight: 13.01670363043928,
		gater: null
	},
	{
		from: 345,
		to: 370,
		weight: -5.37952555903227,
		gater: null
	},
	{
		from: 345,
		to: 371,
		weight: -1.6679713974529957,
		gater: null
	},
	{
		from: 345,
		to: 372,
		weight: 14.914048627201607,
		gater: null
	},
	{
		from: 345,
		to: 373,
		weight: -11.64749355109929,
		gater: null
	},
	{
		from: 345,
		to: 374,
		weight: -16.621758856784666,
		gater: null
	},
	{
		from: 345,
		to: 375,
		weight: -2.2240570148595493,
		gater: null
	},
	{
		from: 345,
		to: 376,
		weight: -3.5807231599375933,
		gater: null
	},
	{
		from: 345,
		to: 377,
		weight: 8.053797046227007,
		gater: null
	},
	{
		from: 345,
		to: 378,
		weight: 2.528815861892163,
		gater: null
	},
	{
		from: 345,
		to: 379,
		weight: -12.891687853214034,
		gater: null
	},
	{
		from: 346,
		to: 360,
		weight: -4.341792091008754,
		gater: null
	},
	{
		from: 346,
		to: 361,
		weight: -13.050721715773786,
		gater: null
	},
	{
		from: 346,
		to: 362,
		weight: 7.570970868603568,
		gater: null
	},
	{
		from: 346,
		to: 363,
		weight: 6.674054237657924,
		gater: null
	},
	{
		from: 346,
		to: 364,
		weight: 8.888809638042835,
		gater: null
	},
	{
		from: 346,
		to: 365,
		weight: 7.911529839400369,
		gater: null
	},
	{
		from: 346,
		to: 366,
		weight: 0.9712606258082837,
		gater: null
	},
	{
		from: 346,
		to: 367,
		weight: -13.16114171404295,
		gater: null
	},
	{
		from: 346,
		to: 368,
		weight: 0.620790281802581,
		gater: null
	},
	{
		from: 346,
		to: 369,
		weight: -8.485198471477199,
		gater: null
	},
	{
		from: 346,
		to: 370,
		weight: -20.26593251746342,
		gater: null
	},
	{
		from: 346,
		to: 371,
		weight: 1.444408050005659,
		gater: null
	},
	{
		from: 346,
		to: 372,
		weight: 4.105787479115644,
		gater: null
	},
	{
		from: 346,
		to: 373,
		weight: -14.705017138175213,
		gater: null
	},
	{
		from: 346,
		to: 374,
		weight: 6.708902572256512,
		gater: null
	},
	{
		from: 346,
		to: 375,
		weight: 8.043844195370715,
		gater: null
	},
	{
		from: 346,
		to: 376,
		weight: -0.9269630454649759,
		gater: null
	},
	{
		from: 346,
		to: 377,
		weight: -4.469630985055908,
		gater: null
	},
	{
		from: 346,
		to: 378,
		weight: -0.09168723831387833,
		gater: null
	},
	{
		from: 346,
		to: 379,
		weight: -5.057759827432717,
		gater: null
	},
	{
		from: 347,
		to: 360,
		weight: 14.580225731533147,
		gater: null
	},
	{
		from: 347,
		to: 361,
		weight: -5.953997076672915,
		gater: null
	},
	{
		from: 347,
		to: 362,
		weight: -3.7679920451621696,
		gater: null
	},
	{
		from: 347,
		to: 363,
		weight: 17.021019512861148,
		gater: null
	},
	{
		from: 347,
		to: 364,
		weight: -1.2759900294657553,
		gater: null
	},
	{
		from: 347,
		to: 365,
		weight: 13.709732706316512,
		gater: null
	},
	{
		from: 347,
		to: 366,
		weight: 14.058829986409393,
		gater: null
	},
	{
		from: 347,
		to: 367,
		weight: 0.1753637971909013,
		gater: null
	},
	{
		from: 347,
		to: 368,
		weight: -7.832022378472383,
		gater: null
	},
	{
		from: 347,
		to: 369,
		weight: 5.677135101595165,
		gater: null
	},
	{
		from: 347,
		to: 370,
		weight: 11.35906165081847,
		gater: null
	},
	{
		from: 347,
		to: 371,
		weight: 11.460003673158997,
		gater: null
	},
	{
		from: 347,
		to: 372,
		weight: -5.661378512633749,
		gater: null
	},
	{
		from: 347,
		to: 373,
		weight: 11.556491720802702,
		gater: null
	},
	{
		from: 347,
		to: 374,
		weight: 18.61807439342951,
		gater: null
	},
	{
		from: 347,
		to: 375,
		weight: 12.75916613482207,
		gater: null
	},
	{
		from: 347,
		to: 376,
		weight: 6.882753148074089,
		gater: null
	},
	{
		from: 347,
		to: 377,
		weight: 12.54326411337056,
		gater: null
	},
	{
		from: 347,
		to: 378,
		weight: 6.793816089013701,
		gater: null
	},
	{
		from: 347,
		to: 379,
		weight: 9.33588875686235,
		gater: null
	},
	{
		from: 348,
		to: 360,
		weight: -5.783637820258157,
		gater: null
	},
	{
		from: 348,
		to: 361,
		weight: -1.0756952412636873,
		gater: null
	},
	{
		from: 348,
		to: 362,
		weight: -4.471854311793158,
		gater: null
	},
	{
		from: 348,
		to: 363,
		weight: -7.677594351038116,
		gater: null
	},
	{
		from: 348,
		to: 364,
		weight: 0.1147641696302184,
		gater: null
	},
	{
		from: 348,
		to: 365,
		weight: -17.393136683824064,
		gater: null
	},
	{
		from: 348,
		to: 366,
		weight: -3.788621283131308,
		gater: null
	},
	{
		from: 348,
		to: 367,
		weight: -12.116080010253762,
		gater: null
	},
	{
		from: 348,
		to: 368,
		weight: 11.393846396480402,
		gater: null
	},
	{
		from: 348,
		to: 369,
		weight: 6.390368167779496,
		gater: null
	},
	{
		from: 348,
		to: 370,
		weight: 15.596793886833629,
		gater: null
	},
	{
		from: 348,
		to: 371,
		weight: 12.78300033274346,
		gater: null
	},
	{
		from: 348,
		to: 372,
		weight: -16.32937163875998,
		gater: null
	},
	{
		from: 348,
		to: 373,
		weight: -5.048099407589588,
		gater: null
	},
	{
		from: 348,
		to: 374,
		weight: -13.638315534450445,
		gater: null
	},
	{
		from: 348,
		to: 375,
		weight: -0.9775084510697742,
		gater: null
	},
	{
		from: 348,
		to: 376,
		weight: 0.8393764337040531,
		gater: null
	},
	{
		from: 348,
		to: 377,
		weight: 2.1540401404268352,
		gater: null
	},
	{
		from: 348,
		to: 378,
		weight: -1.4401552213942421,
		gater: null
	},
	{
		from: 348,
		to: 379,
		weight: -12.323863276037827,
		gater: null
	},
	{
		from: 349,
		to: 360,
		weight: 3.6882933885805698,
		gater: null
	},
	{
		from: 349,
		to: 361,
		weight: -3.8923271371208914,
		gater: null
	},
	{
		from: 349,
		to: 362,
		weight: -0.7837521726220548,
		gater: null
	},
	{
		from: 349,
		to: 363,
		weight: 2.2879865446899585,
		gater: null
	},
	{
		from: 349,
		to: 364,
		weight: 0.4774616491075479,
		gater: null
	},
	{
		from: 349,
		to: 365,
		weight: 6.316344511552388,
		gater: null
	},
	{
		from: 349,
		to: 366,
		weight: 4.32506306156617,
		gater: null
	},
	{
		from: 349,
		to: 367,
		weight: -6.0092131676805876,
		gater: null
	},
	{
		from: 349,
		to: 368,
		weight: 6.862806934686014,
		gater: null
	},
	{
		from: 349,
		to: 369,
		weight: 0.2689756928658359,
		gater: null
	},
	{
		from: 349,
		to: 370,
		weight: 1.6665998721827688,
		gater: null
	},
	{
		from: 349,
		to: 371,
		weight: -4.81794869376217,
		gater: null
	},
	{
		from: 349,
		to: 372,
		weight: 3.026106440708827,
		gater: null
	},
	{
		from: 349,
		to: 373,
		weight: -3.0873847739835245,
		gater: null
	},
	{
		from: 349,
		to: 374,
		weight: 6.614509541497848,
		gater: null
	},
	{
		from: 349,
		to: 375,
		weight: 1.8383353922465269,
		gater: null
	},
	{
		from: 349,
		to: 376,
		weight: 0.8657722664265237,
		gater: null
	},
	{
		from: 349,
		to: 377,
		weight: 2.610687254966048,
		gater: null
	},
	{
		from: 349,
		to: 378,
		weight: 0.11783576428604452,
		gater: null
	},
	{
		from: 349,
		to: 379,
		weight: -5.176528948111277,
		gater: null
	},
	{
		from: 350,
		to: 360,
		weight: -0.08368138585827896,
		gater: null
	},
	{
		from: 350,
		to: 361,
		weight: -0.092373138583448,
		gater: null
	},
	{
		from: 350,
		to: 362,
		weight: 0.027320496323344823,
		gater: null
	},
	{
		from: 350,
		to: 363,
		weight: -0.07777754072233836,
		gater: null
	},
	{
		from: 350,
		to: 364,
		weight: 0.03864125518986389,
		gater: null
	},
	{
		from: 350,
		to: 365,
		weight: 0.0927491277777317,
		gater: null
	},
	{
		from: 350,
		to: 366,
		weight: 0.05373421952824539,
		gater: null
	},
	{
		from: 350,
		to: 367,
		weight: 0.05944311617039785,
		gater: null
	},
	{
		from: 350,
		to: 368,
		weight: -0.002091347816225178,
		gater: null
	},
	{
		from: 350,
		to: 369,
		weight: -0.0730308158609173,
		gater: null
	},
	{
		from: 350,
		to: 370,
		weight: 0.02102420440569648,
		gater: null
	},
	{
		from: 350,
		to: 371,
		weight: 0.05878232320542051,
		gater: null
	},
	{
		from: 350,
		to: 372,
		weight: -0.054898142004809226,
		gater: null
	},
	{
		from: 350,
		to: 373,
		weight: 0.053378923468393374,
		gater: null
	},
	{
		from: 350,
		to: 374,
		weight: 0.04668733614760648,
		gater: null
	},
	{
		from: 350,
		to: 375,
		weight: -0.08448772685350514,
		gater: null
	},
	{
		from: 350,
		to: 376,
		weight: -0.06107282902330278,
		gater: null
	},
	{
		from: 350,
		to: 377,
		weight: 0.07329136719801962,
		gater: null
	},
	{
		from: 350,
		to: 378,
		weight: -0.06943963752258875,
		gater: null
	},
	{
		from: 350,
		to: 379,
		weight: -0.013568829395504342,
		gater: null
	},
	{
		from: 351,
		to: 360,
		weight: 0.07951488821362199,
		gater: null
	},
	{
		from: 351,
		to: 361,
		weight: 0.07213285946227463,
		gater: null
	},
	{
		from: 351,
		to: 362,
		weight: 0.013272098080083602,
		gater: null
	},
	{
		from: 351,
		to: 363,
		weight: -0.003983025074567603,
		gater: null
	},
	{
		from: 351,
		to: 364,
		weight: -0.07444367820218818,
		gater: null
	},
	{
		from: 351,
		to: 365,
		weight: 0.07088944445321307,
		gater: null
	},
	{
		from: 351,
		to: 366,
		weight: 0.0932755995602341,
		gater: null
	},
	{
		from: 351,
		to: 367,
		weight: 0.06404948589833345,
		gater: null
	},
	{
		from: 351,
		to: 368,
		weight: -0.08985186330721305,
		gater: null
	},
	{
		from: 351,
		to: 369,
		weight: 0.04869748358545417,
		gater: null
	},
	{
		from: 351,
		to: 370,
		weight: -0.07125192853890319,
		gater: null
	},
	{
		from: 351,
		to: 371,
		weight: 0.040961061408817,
		gater: null
	},
	{
		from: 351,
		to: 372,
		weight: -0.006846841116305263,
		gater: null
	},
	{
		from: 351,
		to: 373,
		weight: 0.0865963149290474,
		gater: null
	},
	{
		from: 351,
		to: 374,
		weight: 0.0725135706329712,
		gater: null
	},
	{
		from: 351,
		to: 375,
		weight: -0.04386260793572636,
		gater: null
	},
	{
		from: 351,
		to: 376,
		weight: -0.06754284527429158,
		gater: null
	},
	{
		from: 351,
		to: 377,
		weight: -0.037903134793496655,
		gater: null
	},
	{
		from: 351,
		to: 378,
		weight: 0.04165402159196402,
		gater: null
	},
	{
		from: 351,
		to: 379,
		weight: -0.018759203336816382,
		gater: null
	},
	{
		from: 352,
		to: 360,
		weight: 0.022232631141771764,
		gater: null
	},
	{
		from: 352,
		to: 361,
		weight: 0.09442548489426375,
		gater: null
	},
	{
		from: 352,
		to: 362,
		weight: -0.07655589025409465,
		gater: null
	},
	{
		from: 352,
		to: 363,
		weight: -0.09030197073839125,
		gater: null
	},
	{
		from: 352,
		to: 364,
		weight: 0.04518315926169869,
		gater: null
	},
	{
		from: 352,
		to: 365,
		weight: 0.05767311719792284,
		gater: null
	},
	{
		from: 352,
		to: 366,
		weight: -0.08150467693050181,
		gater: null
	},
	{
		from: 352,
		to: 367,
		weight: 0.09761121971182024,
		gater: null
	},
	{
		from: 352,
		to: 368,
		weight: -0.0567030765288866,
		gater: null
	},
	{
		from: 352,
		to: 369,
		weight: 0.026261139862540916,
		gater: null
	},
	{
		from: 352,
		to: 370,
		weight: 0.06978257739578739,
		gater: null
	},
	{
		from: 352,
		to: 371,
		weight: -0.07831769375600457,
		gater: null
	},
	{
		from: 352,
		to: 372,
		weight: -0.01640467428946088,
		gater: null
	},
	{
		from: 352,
		to: 373,
		weight: -0.0600430032915404,
		gater: null
	},
	{
		from: 352,
		to: 374,
		weight: 0.09714774584282973,
		gater: null
	},
	{
		from: 352,
		to: 375,
		weight: 0.03733346805812249,
		gater: null
	},
	{
		from: 352,
		to: 376,
		weight: -0.05245677298944469,
		gater: null
	},
	{
		from: 352,
		to: 377,
		weight: 0.011913354061678927,
		gater: null
	},
	{
		from: 352,
		to: 378,
		weight: 0.05722933810708017,
		gater: null
	},
	{
		from: 352,
		to: 379,
		weight: 0.09343737288038509,
		gater: null
	},
	{
		from: 353,
		to: 360,
		weight: 4.370190381694497,
		gater: null
	},
	{
		from: 353,
		to: 361,
		weight: -1.0085975452194285,
		gater: null
	},
	{
		from: 353,
		to: 362,
		weight: 2.5940623549857027,
		gater: null
	},
	{
		from: 353,
		to: 363,
		weight: 1.9057287556054225,
		gater: null
	},
	{
		from: 353,
		to: 364,
		weight: -1.6980269405336637,
		gater: null
	},
	{
		from: 353,
		to: 365,
		weight: 2.9421441496500105,
		gater: null
	},
	{
		from: 353,
		to: 366,
		weight: 1.42732081901674,
		gater: null
	},
	{
		from: 353,
		to: 367,
		weight: -0.4947021115380428,
		gater: null
	},
	{
		from: 353,
		to: 368,
		weight: 0.5935658360269709,
		gater: null
	},
	{
		from: 353,
		to: 369,
		weight: -1.891569439817563,
		gater: null
	},
	{
		from: 353,
		to: 370,
		weight: -0.955730024232779,
		gater: null
	},
	{
		from: 353,
		to: 371,
		weight: -2.519353599038773,
		gater: null
	},
	{
		from: 353,
		to: 372,
		weight: -3.3313783744848524,
		gater: null
	},
	{
		from: 353,
		to: 373,
		weight: -1.1543079836758174,
		gater: null
	},
	{
		from: 353,
		to: 374,
		weight: 3.8827480543636876,
		gater: null
	},
	{
		from: 353,
		to: 375,
		weight: 0.24014345141541488,
		gater: null
	},
	{
		from: 353,
		to: 376,
		weight: 1.28826088490738,
		gater: null
	},
	{
		from: 353,
		to: 377,
		weight: 1.123914289483231,
		gater: null
	},
	{
		from: 353,
		to: 378,
		weight: 1.1278212846694724,
		gater: null
	},
	{
		from: 353,
		to: 379,
		weight: -0.8836540246421123,
		gater: null
	},
	{
		from: 354,
		to: 360,
		weight: -0.6395047647825554,
		gater: null
	},
	{
		from: 354,
		to: 361,
		weight: -2.8376142568136618,
		gater: null
	},
	{
		from: 354,
		to: 362,
		weight: -3.3021396255842106,
		gater: null
	},
	{
		from: 354,
		to: 363,
		weight: 0.21897953493226344,
		gater: null
	},
	{
		from: 354,
		to: 364,
		weight: 2.211579378450446,
		gater: null
	},
	{
		from: 354,
		to: 365,
		weight: 3.221571123021105,
		gater: null
	},
	{
		from: 354,
		to: 366,
		weight: 2.975658355718317,
		gater: null
	},
	{
		from: 354,
		to: 367,
		weight: -5.641010655111621,
		gater: null
	},
	{
		from: 354,
		to: 368,
		weight: 6.280173691791401,
		gater: null
	},
	{
		from: 354,
		to: 369,
		weight: 2.0492421788938366,
		gater: null
	},
	{
		from: 354,
		to: 370,
		weight: 2.4129334575536254,
		gater: null
	},
	{
		from: 354,
		to: 371,
		weight: -2.347084516844515,
		gater: null
	},
	{
		from: 354,
		to: 372,
		weight: 6.429784185415102,
		gater: null
	},
	{
		from: 354,
		to: 373,
		weight: -1.828628890386967,
		gater: null
	},
	{
		from: 354,
		to: 374,
		weight: 2.6387641562517365,
		gater: null
	},
	{
		from: 354,
		to: 375,
		weight: 1.665107207519944,
		gater: null
	},
	{
		from: 354,
		to: 376,
		weight: -0.46006654567626604,
		gater: null
	},
	{
		from: 354,
		to: 377,
		weight: 1.412726061300925,
		gater: null
	},
	{
		from: 354,
		to: 378,
		weight: -0.9021229865113204,
		gater: null
	},
	{
		from: 354,
		to: 379,
		weight: -4.236124979416898,
		gater: null
	},
	{
		from: 355,
		to: 360,
		weight: -0.6697020208666034,
		gater: null
	},
	{
		from: 355,
		to: 361,
		weight: -2.961093836285517,
		gater: null
	},
	{
		from: 355,
		to: 362,
		weight: -3.317702675006461,
		gater: null
	},
	{
		from: 355,
		to: 363,
		weight: 0.12868976509183505,
		gater: null
	},
	{
		from: 355,
		to: 364,
		weight: 2.1698623920426843,
		gater: null
	},
	{
		from: 355,
		to: 365,
		weight: 3.1761574496686813,
		gater: null
	},
	{
		from: 355,
		to: 366,
		weight: 3.084711512840327,
		gater: null
	},
	{
		from: 355,
		to: 367,
		weight: -5.591594656559892,
		gater: null
	},
	{
		from: 355,
		to: 368,
		weight: 6.361382303197566,
		gater: null
	},
	{
		from: 355,
		to: 369,
		weight: 2.062739562765502,
		gater: null
	},
	{
		from: 355,
		to: 370,
		weight: 2.3932687698794033,
		gater: null
	},
	{
		from: 355,
		to: 371,
		weight: -2.405988487929306,
		gater: null
	},
	{
		from: 355,
		to: 372,
		weight: 6.426566751979811,
		gater: null
	},
	{
		from: 355,
		to: 373,
		weight: -1.9632835550922736,
		gater: null
	},
	{
		from: 355,
		to: 374,
		weight: 2.606396962895093,
		gater: null
	},
	{
		from: 355,
		to: 375,
		weight: 1.7304339409588037,
		gater: null
	},
	{
		from: 355,
		to: 376,
		weight: -0.5766882908059165,
		gater: null
	},
	{
		from: 355,
		to: 377,
		weight: 1.4343892425640759,
		gater: null
	},
	{
		from: 355,
		to: 378,
		weight: -0.9870495709528252,
		gater: null
	},
	{
		from: 355,
		to: 379,
		weight: -4.292948061112693,
		gater: null
	},
	{
		from: 356,
		to: 360,
		weight: 4.36463837400964,
		gater: null
	},
	{
		from: 356,
		to: 361,
		weight: -0.9428402488437653,
		gater: null
	},
	{
		from: 356,
		to: 362,
		weight: 2.5598367086316176,
		gater: null
	},
	{
		from: 356,
		to: 363,
		weight: 1.6488977331538819,
		gater: null
	},
	{
		from: 356,
		to: 364,
		weight: -1.344815270772433,
		gater: null
	},
	{
		from: 356,
		to: 365,
		weight: 3.0965489504271426,
		gater: null
	},
	{
		from: 356,
		to: 366,
		weight: 1.4035330381315256,
		gater: null
	},
	{
		from: 356,
		to: 367,
		weight: -0.48497105009474734,
		gater: null
	},
	{
		from: 356,
		to: 368,
		weight: 0.2694793231289678,
		gater: null
	},
	{
		from: 356,
		to: 369,
		weight: -1.9456526741200926,
		gater: null
	},
	{
		from: 356,
		to: 370,
		weight: -0.8502274121907091,
		gater: null
	},
	{
		from: 356,
		to: 371,
		weight: -2.4374258843587198,
		gater: null
	},
	{
		from: 356,
		to: 372,
		weight: -3.3021236159034513,
		gater: null
	},
	{
		from: 356,
		to: 373,
		weight: -1.1811155063719634,
		gater: null
	},
	{
		from: 356,
		to: 374,
		weight: 4.047624560739472,
		gater: null
	},
	{
		from: 356,
		to: 375,
		weight: 0.32159616474942,
		gater: null
	},
	{
		from: 356,
		to: 376,
		weight: 1.452393428944533,
		gater: null
	},
	{
		from: 356,
		to: 377,
		weight: 1.101283252515015,
		gater: null
	},
	{
		from: 356,
		to: 378,
		weight: 1.0729444905957353,
		gater: null
	},
	{
		from: 356,
		to: 379,
		weight: -0.7476013018647072,
		gater: null
	},
	{
		from: 357,
		to: 360,
		weight: 4.345727000246383,
		gater: null
	},
	{
		from: 357,
		to: 361,
		weight: -0.8789277219632133,
		gater: null
	},
	{
		from: 357,
		to: 362,
		weight: 2.4991139230510124,
		gater: null
	},
	{
		from: 357,
		to: 363,
		weight: 1.8915207957816476,
		gater: null
	},
	{
		from: 357,
		to: 364,
		weight: -1.6797959051675948,
		gater: null
	},
	{
		from: 357,
		to: 365,
		weight: 3.0339955706710873,
		gater: null
	},
	{
		from: 357,
		to: 366,
		weight: 1.3079296157039189,
		gater: null
	},
	{
		from: 357,
		to: 367,
		weight: -0.4500541177294221,
		gater: null
	},
	{
		from: 357,
		to: 368,
		weight: 0.4084890677734963,
		gater: null
	},
	{
		from: 357,
		to: 369,
		weight: -2.023626046087732,
		gater: null
	},
	{
		from: 357,
		to: 370,
		weight: -0.9182040352845838,
		gater: null
	},
	{
		from: 357,
		to: 371,
		weight: -2.5453454429251505,
		gater: null
	},
	{
		from: 357,
		to: 372,
		weight: -3.393947891687039,
		gater: null
	},
	{
		from: 357,
		to: 373,
		weight: -1.212431419934698,
		gater: null
	},
	{
		from: 357,
		to: 374,
		weight: 3.9753513488432026,
		gater: null
	},
	{
		from: 357,
		to: 375,
		weight: 0.27600091276227284,
		gater: null
	},
	{
		from: 357,
		to: 376,
		weight: 1.3162596761344292,
		gater: null
	},
	{
		from: 357,
		to: 377,
		weight: 1.1742408046566168,
		gater: null
	},
	{
		from: 357,
		to: 378,
		weight: 1.0704783590837192,
		gater: null
	},
	{
		from: 357,
		to: 379,
		weight: -0.8937405620655432,
		gater: null
	},
	{
		from: 358,
		to: 360,
		weight: 4.50147150646222,
		gater: null
	},
	{
		from: 358,
		to: 361,
		weight: -0.8802316688778559,
		gater: null
	},
	{
		from: 358,
		to: 362,
		weight: 2.5581414133166995,
		gater: null
	},
	{
		from: 358,
		to: 363,
		weight: 1.9116560354991536,
		gater: null
	},
	{
		from: 358,
		to: 364,
		weight: -1.6402298850108636,
		gater: null
	},
	{
		from: 358,
		to: 365,
		weight: 3.030712737906124,
		gater: null
	},
	{
		from: 358,
		to: 366,
		weight: 1.2688533132679798,
		gater: null
	},
	{
		from: 358,
		to: 367,
		weight: -0.5215170100594683,
		gater: null
	},
	{
		from: 358,
		to: 368,
		weight: 0.4612454420452931,
		gater: null
	},
	{
		from: 358,
		to: 369,
		weight: -1.8509613139491596,
		gater: null
	},
	{
		from: 358,
		to: 370,
		weight: -0.8366892550238726,
		gater: null
	},
	{
		from: 358,
		to: 371,
		weight: -2.4076743325726624,
		gater: null
	},
	{
		from: 358,
		to: 372,
		weight: -3.2909782459215546,
		gater: null
	},
	{
		from: 358,
		to: 373,
		weight: -1.197263046756721,
		gater: null
	},
	{
		from: 358,
		to: 374,
		weight: 3.9206070072763173,
		gater: null
	},
	{
		from: 358,
		to: 375,
		weight: 0.14859598251740877,
		gater: null
	},
	{
		from: 358,
		to: 376,
		weight: 1.417718566261295,
		gater: null
	},
	{
		from: 358,
		to: 377,
		weight: 1.1600214991027646,
		gater: null
	},
	{
		from: 358,
		to: 378,
		weight: 1.0228913735654848,
		gater: null
	},
	{
		from: 358,
		to: 379,
		weight: -0.8398798936113647,
		gater: null
	},
	{
		from: 359,
		to: 360,
		weight: 4.39908097922693,
		gater: null
	},
	{
		from: 359,
		to: 361,
		weight: -0.9378678189492198,
		gater: null
	},
	{
		from: 359,
		to: 362,
		weight: 2.6070061250732954,
		gater: null
	},
	{
		from: 359,
		to: 363,
		weight: 1.6387638847267163,
		gater: null
	},
	{
		from: 359,
		to: 364,
		weight: -1.3442761037156141,
		gater: null
	},
	{
		from: 359,
		to: 365,
		weight: 3.0214063395932325,
		gater: null
	},
	{
		from: 359,
		to: 366,
		weight: 1.4301386439358,
		gater: null
	},
	{
		from: 359,
		to: 367,
		weight: -0.495436229197007,
		gater: null
	},
	{
		from: 359,
		to: 368,
		weight: 0.1566984998633215,
		gater: null
	},
	{
		from: 359,
		to: 369,
		weight: -1.8612331121935073,
		gater: null
	},
	{
		from: 359,
		to: 370,
		weight: -0.8259592548411027,
		gater: null
	},
	{
		from: 359,
		to: 371,
		weight: -2.472782854635379,
		gater: null
	},
	{
		from: 359,
		to: 372,
		weight: -3.378846812062529,
		gater: null
	},
	{
		from: 359,
		to: 373,
		weight: -1.069691986150117,
		gater: null
	},
	{
		from: 359,
		to: 374,
		weight: 3.93514823855464,
		gater: null
	},
	{
		from: 359,
		to: 375,
		weight: 0.28850099752272496,
		gater: null
	},
	{
		from: 359,
		to: 376,
		weight: 1.3490054722709286,
		gater: null
	},
	{
		from: 359,
		to: 377,
		weight: 1.0698291706804854,
		gater: null
	},
	{
		from: 359,
		to: 378,
		weight: 1.0475621730366882,
		gater: null
	},
	{
		from: 359,
		to: 379,
		weight: -0.9040711550413685,
		gater: null
	},
	{
		from: 360,
		to: 380,
		weight: 4.851104608619242,
		gater: null
	},
	{
		from: 361,
		to: 380,
		weight: 15.258010841595835,
		gater: null
	},
	{
		from: 362,
		to: 380,
		weight: 4.2908385021844095,
		gater: null
	},
	{
		from: 363,
		to: 380,
		weight: 7.713600178712544,
		gater: null
	},
	{
		from: 364,
		to: 380,
		weight: -5.038419686697337,
		gater: null
	},
	{
		from: 365,
		to: 380,
		weight: -6.620930091799726,
		gater: null
	},
	{
		from: 366,
		to: 380,
		weight: -8.079016315762848,
		gater: null
	},
	{
		from: 367,
		to: 380,
		weight: 9.828920742958898,
		gater: null
	},
	{
		from: 368,
		to: 380,
		weight: 5.864599531672722,
		gater: null
	},
	{
		from: 369,
		to: 380,
		weight: -3.8021588502908856,
		gater: null
	},
	{
		from: 370,
		to: 380,
		weight: 6.821049224358472,
		gater: null
	},
	{
		from: 371,
		to: 380,
		weight: 10.375776256498382,
		gater: null
	},
	{
		from: 372,
		to: 380,
		weight: 6.3063846839852165,
		gater: null
	},
	{
		from: 373,
		to: 380,
		weight: 9.980708488559976,
		gater: null
	},
	{
		from: 374,
		to: 380,
		weight: -7.6840161844612584,
		gater: null
	},
	{
		from: 375,
		to: 380,
		weight: -3.831052166614439,
		gater: null
	},
	{
		from: 376,
		to: 380,
		weight: -10.292844233398343,
		gater: null
	},
	{
		from: 377,
		to: 380,
		weight: 4.768712798988777,
		gater: null
	},
	{
		from: 378,
		to: 380,
		weight: 3.782612298808119,
		gater: null
	},
	{
		from: 379,
		to: 380,
		weight: 11.358005862294014,
		gater: null
	}
];
var pohorielovaStructure = {
	neurons: neurons,
	connections: connections
};

var pohorielovaCache = {
	"барна": "noun",
	"біла": "adjective",
	"велика": "adjective",
	"врецьона": "noun",
	"глибока": "adjective",
	"висока": "adjective",
	"гладка": "adjective",
	"дика": "adjective",
	"капуста": "noun",
	"кицька": "noun",
	"лепка": "adjective",
	"петрина": "noun",
	"прудка": "adjective",
	"семенина": "noun",
	"возна": "adjective",
	"крива": "adjective",
	"сліпа": "adjective",
	"глуха": "adjective",
	"добра": "adjective",
	"застара": "adjective",
	"чуйна": "adjective",
	"така": "adjective",
	"гиржа": "noun",
	"глибина": "noun",
	"корова": "noun",
	"мала": "adjective",
	"весна": "noun",
	"свята": "adjective",
	"тихонька": "adjective",
	"жива": "adjective",
	"ніяка": "adjective",
	"мертва": "adjective",
	"відмова": "noun",
	"друга": "adjective",
	"ціла": "adjective",
	"парубка": "adjective",
	"молода": "adjective",
	"наша": "adjective",
	"далека": "adjective",
	"взута": "adjective",
	"золота": "adjective",
	"дорога": "adjective",
	"ваша": "adjective",
	"менша": "adjective",
	"коса": "adjective",
	"сама": "adjective",
	"чужа": "adjective",
	"котра": "adjective",
	"ставна": "adjective",
	"чутка": "adjective",
	"ганна": "noun",
	"уляна": "noun",
	"перша": "adjective",
	"охріма": "adjective",
	"василина": "noun",
	"нижня": "adjective",
	"спрагла": "adjective",
	"накинута": "adjective",
	"крута": "adjective",
	"метка": "adjective",
	"тяжка": "adjective",
	"своя": "adjective",
	"життя": "noun",
	"чимала": "adjective",
	"тиха": "adjective",
	"сила": "noun",
	"твоя": "adjective",
	"божа": "adjective",
	"єдина": "adjective",
	"інша": "adjective",
	"весела": "adjective",
	"тайна": "noun",
	"неважка": "adjective",
	"суха": "adjective",
	"мара": "noun",
	"рання": "adjective",
	"весняна": "adjective",
	"стіна": "noun",
	"глупа": "adjective",
	"важка": "adjective",
	"хороша": "adjective",
	"бежева": "adjective",
	"легка": "adjective",
	"нова": "adjective",
	"минула": "adjective",
	"дядина": "adjective",
	"простора": "adjective",
	"дешевша": "adjective",
	"недужа": "adjective",
	"бліда": "adjective",
	"розлога": "adjective",
	"третя": "adjective",
	"вилита": "adjective",
	"нелегка": "adjective",
	"гостра": "adjective",
	"широка": "adjective",
	"щоденна": "adjective",
	"косоока": "adjective",
	"сира": "adjective",
	"безнога": "adjective",
	"задовга": "adjective",
	"коротка": "adjective",
	"хутка": "adjective",
	"гидка": "adjective",
	"борза": "adjective",
	"двоока": "adjective",
	"крихка": "adjective",
	"чітка": "adjective",
	"абияка": "adjective",
	"голуба": "adjective",
	"чайна": "adjective",
	"сіра": "adjective",
	"сутула": "adjective",
	"млява": "adjective",
	"квола": "adjective",
	"дебела": "adjective",
	"мокра": "adjective",
	"убога": "adjective",
	"вбога": "adjective",
	"пряма": "adjective",
	"забута": "adjective",
	"укрита": "adjective",
	"мита": "adjective",
	"мила": "adjective",
	"боса": "adjective",
	"гола": "adjective",
	"дівча": "noun",
	"ліва": "adjective",
	"права": "adjective",
	"сьома": "adjective",
	"ряба": "adjective",
	"гожа": "adjective",
	"кисла": "adjective",
	"черства": "adjective",
	"стигла": "adjective",
	"змокла": "adjective",
	"пихата": "adjective",
	"світла": "adjective",
	"дволика": "adjective",
	"мудра": "adjective",
	"дужа": "adjective",
	"бадьора": "adjective",
	"кужа": "noun",
	"прихожа": "adjective",
	"побожа": "adjective",
	"пригожа": "adjective",
	"німенька": "adjective",
	"сиза": "adjective",
	"маза": "adjective",
	"богза": "noun",
	"цимарна": "adjective",
	"удовина": "adjective",
	"улина": "adjective",
	"ейвена": "adjective",
	"прошута": "noun",
	"джужа": "noun",
	"дожжа": "noun",
	"свіжа": "adjective",
	"рижа": "adjective",
	"костюша": "noun",
	"ворона": "adjective",
	"горіла": "adjective",
	"гула": "adjective",
	"певна": "adjective",
	"підпала": "adjective",
	"чала": "adjective",
	"немудра": "adjective",
	"далекора": "adjective",
	"прозора": "adjective",
	"гнила": "adjective",
	"хижа": "adjective",
	"куца": "adjective",
	"безверха": "adjective",
	"усата": "adjective",
	"пишна": "adjective",
	"хоружа": "adjective",
	"долга": "adjective",
	"бєла": "adjective",
	"хлівна": "adjective",
	"мягка": "adjective",
	"товста": "adjective",
	"блага": "adjective",
	"захожа": "adjective",
	"боліла": "adjective",
	"драна": "adjective",
	"куса": "adjective",
	"ласкава": "adjective",
	"кругла": "adjective",
	"плоха": "adjective",
	"лужна": "adjective",
	"тверда": "adjective",
	"жеребна": "adjective",
	"рівна": "adjective",
	"картава": "adjective",
	"черна": "adjective",
	"шита": "adjective",
	"сіда": "adjective",
	"пальона": "adjective",
	"гнуча": "adjective",
	"желєзна": "adjective",
	"бистра": "adjective",
	"парубоча": "adjective",
	"ровна": "adjective",
	"табачна": "adjective",
	"загрива": "adjective",
	"мазна": "adjective",
	"шалена": "adjective",
	"сливна": "adjective",
	"одинока": "adjective",
	"славна": "adjective",
	"яшна": "adjective",
	"железна": "adjective",
	"мура": "adjective",
	"ріпна": "adjective",
	"вяла": "adjective",
	"лиха": "adjective",
	"бзова": "adjective",
	"зайшла": "adjective",
	"мерзла": "adjective",
	"горда": "adjective",
	"кичата": "adjective",
	"шумна": "adjective",
	"тонка": "adjective",
	"коптіла": "adjective",
	"погожа": "adjective",
	"німа": "adjective",
	"пекна": "adjective",
	"росла": "adjective",
	"строга": "adjective",
	"крамна": "adjective",
	"душна": "adjective",
	"змерзла": "adjective",
	"положа": "adjective",
	"думна": "adjective",
	"скупа": "adjective",
	"точона": "adjective",
	"бібла": "adjective",
	"сміла": "adjective",
	"щедра": "adjective",
	"шерстка": "adjective",
	"безкишка": "adjective",
	"піша": "adjective",
	"тягла": "adjective",
	"шубала": "adjective",
	"яна": "adjective",
	"кунта": "adjective",
	"шпарка": "adjective",
	"бучна": "adjective",
	"глива": "adjective",
	"любима": "adjective",
	"осова": "adjective",
	"шията": "adjective",
	"безборода": "adjective",
	"война": "adjective",
	"голомоза": "adjective",
	"горєла": "adjective",
	"єжела": "adjective",
	"квасна": "adjective",
	"надута": "adjective",
	"погорела": "adjective",
	"тупа": "adjective",
	"дзяна": "adjective",
	"жовкла": "adjective",
	"моруга": "adjective",
	"світа": "adjective",
	"цвіла": "adjective",
	"чупла": "adjective",
	"жилава": "adjective",
	"ласа": "adjective",
	"льогка": "adjective",
	"бушна": "adjective",
	"кріпка": "adjective",
	"лакома": "adjective",
	"майна": "adjective",
	"нагла": "adjective",
	"осядла": "adjective",
	"рапава": "adjective",
	"суща": "adjective",
	"ячна": "adjective",
	"галянта": "adjective",
	"одажа": "adjective",
	"сепіта": "adjective",
	"слабка": "adjective",
	"шамка": "adjective",
	"остиста": "adjective",
	"пяна": "adjective",
	"сладка": "adjective",
	"довгорука": "adjective",
	"ліска": "adjective",
	"межена": "adjective",
	"обмокла": "adjective",
	"пшива": "adjective",
	"хлевна": "adjective",
	"гірка": "adjective",
	"горька": "adjective",
	"диська": "adjective",
	"досужа": "adjective",
	"драпята": "adjective",
	"колота": "adjective",
	"неумита": "adjective",
	"підла": "adjective",
	"польва": "adjective",
	"твереза": "adjective",
	"болєла": "adjective",
	"дирява": "adjective",
	"жарка": "adjective",
	"мгка": "adjective",
	"немята": "adjective",
	"подпала": "adjective",
	"рибна": "adjective",
	"ріба": "adjective",
	"беспята": "adjective",
	"дута": "adjective",
	"куплена": "adjective",
	"ланна": "adjective",
	"мора": "adjective",
	"яцина": "adjective",
	"солоха": "adjective",
	"проскура": "adjective",
	"дуброва": "noun",
	"глова": "adjective",
	"родіна": "noun",
	"стеблина": "adjective",
	"доброва": "adjective",
	"галуза": "noun",
	"гущина": "adjective",
	"підкова": "noun",
	"крайня": "adjective",
	"лига": "noun",
	"щетина": "noun",
	"сотула": "adjective",
	"йова": "noun",
	"бордюжа": "adjective",
	"стецина": "adjective",
	"ребрина": "adjective",
	"зарудня": "adjective",
	"пазина": "adjective",
	"бурдужа": "adjective",
	"кошуба": "noun",
	"гаїна": "noun",
	"пащина": "noun",
	"кремена": "noun",
	"гира": "noun",
	"гармата": "noun",
	"замана": "noun",
	"чепела": "adjective",
	"михайлуца": "noun",
	"семенча": "noun",
	"любота": "noun",
	"пахолка": "adjective",
	"борта": "noun",
	"єріна": "adjective",
	"заплава": "noun",
	"сидора": "adjective",
	"юшина": "adjective",
	"бружа": "noun",
	"чечина": "adjective",
	"маліна": "noun",
	"папуча": "noun",
	"немна": "noun",
	"павлина": "adjective",
	"знова": "adjective",
	"нейчева": "noun",
	"гужева": "adjective",
	"матьора": "adjective",
	"начева": "adjective",
	"гадючка": "noun",
	"кльова": "noun",
	"недолуга": "adjective",
	"морева": "adjective",
	"місюна": "noun",
	"вершина": "noun",
	"разіна": "adjective",
	"радіна": "adjective",
	"шаня": "noun",
	"авершина": "adjective",
	"долгая": "adjective",
	"основа": "noun",
	"ремша": "noun",
	"дуліна": "noun",
	"палесіка": "noun",
	"танана": "noun",
	"турчіна": "noun",
	"кочина": "noun",
	"похмура": "adjective",
	"тинда": "noun",
	"софина": "adjective",
	"блозва": "noun",
	"губина": "adjective",
	"колчина": "adjective",
	"закалата": "noun",
	"безгіна": "noun",
	"домніна": "noun",
	"перезва": "noun",
	"купина": "noun",
	"макушина": "adjective",
	"марїна": "adjective",
	"шкурина": "adjective",
	"шукатка": "noun",
	"борча": "noun",
	"чепинога": "adjective",
	"васина": "noun",
	"воїна": "noun",
	"герела": "noun",
	"копина": "noun",
	"мерена": "noun",
	"кнзєва": "noun",
	"декіна": "adjective",
	"зоська": "noun",
	"кузява": "noun",
	"стицина": "adjective",
	"чигрина": "adjective",
	"галина": "adjective",
	"добрева": "adjective",
	"жепка": "noun",
	"мицька": "noun",
	"моша": "noun",
	"харчева": "adjective",
	"бесяда": "noun",
	"божагора": "noun",
	"осадчая": "adjective",
	"пруба": "noun",
	"хижня": "adjective",
	"янева": "adjective",
	"івануна": "noun",
	"лигомина": "noun",
	"мандина": "adjective",
	"махина": "noun",
	"патраніка": "adjective",
	"пищимуха": "noun",
	"фтемова": "adjective",
	"чупита": "noun",
	"башева": "noun",
	"гольча": "noun",
	"густа": "adjective",
	"кадина": "adjective",
	"киржа": "noun",
	"кірна": "adjective",
	"клепча": "noun",
	"крапіва": "noun",
	"мамона": "noun",
	"плюха": "noun",
	"пріхна": "noun",
	"вербина": "adjective",
	"гержина": "adjective",
	"гочева": "adjective",
	"запрута": "noun",
	"кобрина": "adjective",
	"малюська": "noun",
	"мизина": "noun",
	"сувора": "adjective",
	"сціра": "noun",
	"щепна": "adjective",
	"псина": "noun",
	"бариляста": "adjective",
	"олениця": "adjective",
	"планіда": "adjective",
	"пшава": "noun",
	"рашина": "adjective",
	"салайда": "adjective",
	"яцева": "adjective",
	"бачина": "noun",
	"безкорса": "adjective",
	"бружина": "noun",
	"крицина": "adjective",
	"мазнева": "adjective",
	"пенькна": "noun",
	"скобла": "noun",
	"сютра": "noun",
	"трізна": "noun",
	"човча": "noun",
	"юліна": "adjective",
	"важна": "adjective",
	"гевела": "adjective",
	"главна": "adjective",
	"гнєда": "adjective",
	"грицута": "noun",
	"лапина": "adjective",
	"муравя": "noun",
	"мурина": "adjective",
	"несина": "adjective",
	"петраша": "noun",
	"сороніна": "noun",
	"царева": "adjective",
	"андрусіва": "noun",
	"бочева": "adjective",
	"бурча": "noun",
	"голина": "adjective",
	"дудра": "noun",
	"кабіна": "noun",
	"калеберда": "adjective",
	"калужина": "adjective",
	"кірста": "adjective",
	"кослина": "adjective",
	"лхова": "adjective",
	"мигалина": "noun",
	"місна": "adjective",
	"мужева": "adjective",
	"ніколіца": "adjective",
	"парникоза": "adjective",
	"подкова": "noun",
	"смєла": "noun",
	"степина": "adjective",
	"суда": "noun",
	"ухата": "adjective",
	"юдина": "adjective",
	"блазина": "adjective",
	"богдєва": "noun",
	"бурдина": "adjective",
	"веремєва": "noun",
	"винова": "noun",
	"гафина": "adjective",
	"гридчина": "adjective",
	"дерена": "adjective",
	"епова": "adjective",
	"жоржа": "noun",
	"моркова": "noun",
	"мужчина": "noun",
	"нецька": "noun",
	"пожарна": "adjective",
	"пуста": "adjective",
	"сулева": "adjective",
	"триднівка": "adjective",
	"троша": "noun",
	"утрата": "noun",
	"цнота": "noun",
	"шадна": "noun",
	"амоша": "noun",
	"безена": "noun",
	"безуглая": "noun",
	"безшкура": "adjective",
	"безязика": "adjective",
	"бешуля": "noun",
	"большая": "adjective",
	"волжина": "adjective",
	"гапона": "noun",
	"грицька": "noun",
	"доцина": "adjective",
	"жидка": "noun",
	"канана": "noun",
	"качна": "noun",
	"русая": "adjective"
};

var neurons$1 = [
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 0,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0,
		old: 0,
		activation: 1,
		bias: 0,
		layer: "input",
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -5.233117094621708,
		old: -2.2971964833623844,
		activation: 0.005308532921515502,
		bias: -0.17206312640439023,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -1.1134977037825142,
		old: -4.029307747414652,
		activation: 0.24721938366601798,
		bias: 0.2094274208329453,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 4.222916450896195,
		old: 3.9984099572322562,
		activation: 0.9855558520280653,
		bias: 0.34620198394189466,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -0.001396041972741395,
		old: -1.407948698612479,
		activation: 0.49965098956349785,
		bias: 0.06424293256820614,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 3.7125512372435767,
		old: 4.718804035569004,
		activation: 0.976166737891288,
		bias: -0.29271266196925794,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0.8561723793853728,
		old: 3.960434417101273,
		activation: 0.7018603348646655,
		bias: -0.36227624173886075,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -1.2678408466662685,
		old: 6.556159681926926,
		activation: 0.21962708757133023,
		bias: 0.33398947730025047,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 7.44786620903044,
		old: 0.5268350143638361,
		activation: 0.9994176557108061,
		bias: 0.41589506959999883,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -3.0392296870286106,
		old: 8.876939633166982,
		activation: 0.045684742866842924,
		bias: 0.38348870789657635,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -0.6562661227941873,
		old: 2.374075914818235,
		activation: 0.34157887336835924,
		bias: 0.28000977074014805,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 2.4842155756808757,
		old: 2.6335494174513387,
		activation: 0.9230278383768127,
		bias: 0.16196485122025997,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -8.051323839944255,
		old: -2.9284835921043775,
		activation: 0.000318578237670978,
		bias: -0.44496601525442186,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 1.5789709913124608,
		old: 1.287835005653748,
		activation: 0.8290587358832909,
		bias: 0.3331422120644125,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 2.8548293849919535,
		old: 2.3269179810560514,
		activation: 0.9455677836270521,
		bias: 0.0009121282315054542,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -6.707600363965545,
		old: -0.5358040182817847,
		activation: 0.0012201015202057556,
		bias: 0.002589864537608013,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 8.227865608930422,
		old: 8.880209717673011,
		activation: 0.9997329654959054,
		bias: 0.02127138378177605,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -1.7375215850425036,
		old: -2.4255877171354605,
		activation: 0.1496280129731694,
		bias: -0.04652341834643829,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -5.217931914929274,
		old: -0.9349811933898114,
		activation: 0.005389321350100428,
		bias: -0.41783706062226783,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: -3.3618543345348764,
		old: -1.5873904141224016,
		activation: 0.03350911635241952,
		bias: -0.10550030999184326,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 5.1602458804654985,
		old: 1.246009926878652,
		activation: 0.994292474751779,
		bias: 0.04805129434178438,
		layer: 0,
		squash: "LOGISTIC"
	},
	{
		trace: {
			elegibility: {
			},
			extended: {
			}
		},
		state: 0.05823404326576842,
		old: -2.830088953049464,
		activation: 0.5145543979714251,
		bias: -0.9369705894559843,
		layer: "output",
		squash: "LOGISTIC"
	}
];
var connections$1 = [
	{
		from: 0,
		to: 360,
		weight: 0.09020677997486204,
		gater: null
	},
	{
		from: 0,
		to: 361,
		weight: 0.0051772643501990095,
		gater: null
	},
	{
		from: 0,
		to: 362,
		weight: 0.04585140141725902,
		gater: null
	},
	{
		from: 0,
		to: 363,
		weight: 0.05312766938245339,
		gater: null
	},
	{
		from: 0,
		to: 364,
		weight: -0.02594099811925603,
		gater: null
	},
	{
		from: 0,
		to: 365,
		weight: -0.08466137521625115,
		gater: null
	},
	{
		from: 0,
		to: 366,
		weight: -0.06506227020034921,
		gater: null
	},
	{
		from: 0,
		to: 367,
		weight: -0.047064579976541676,
		gater: null
	},
	{
		from: 0,
		to: 368,
		weight: -0.017496714299590682,
		gater: null
	},
	{
		from: 0,
		to: 369,
		weight: -0.015744382533524753,
		gater: null
	},
	{
		from: 0,
		to: 370,
		weight: 0.018582333122858424,
		gater: null
	},
	{
		from: 0,
		to: 371,
		weight: -0.007999567500527285,
		gater: null
	},
	{
		from: 0,
		to: 372,
		weight: -0.01333530970532068,
		gater: null
	},
	{
		from: 0,
		to: 373,
		weight: -0.004878532848778636,
		gater: null
	},
	{
		from: 0,
		to: 374,
		weight: 0.01761342128601337,
		gater: null
	},
	{
		from: 0,
		to: 375,
		weight: -0.08175013143015107,
		gater: null
	},
	{
		from: 0,
		to: 376,
		weight: 0.06397689419421462,
		gater: null
	},
	{
		from: 0,
		to: 377,
		weight: -0.09345615367434741,
		gater: null
	},
	{
		from: 0,
		to: 378,
		weight: -0.0852020005058189,
		gater: null
	},
	{
		from: 0,
		to: 379,
		weight: 0.07184734485567021,
		gater: null
	},
	{
		from: 1,
		to: 360,
		weight: 0.05958213901862336,
		gater: null
	},
	{
		from: 1,
		to: 361,
		weight: 0.0941700718835008,
		gater: null
	},
	{
		from: 1,
		to: 362,
		weight: 0.0193905007274668,
		gater: null
	},
	{
		from: 1,
		to: 363,
		weight: -0.012789418258373833,
		gater: null
	},
	{
		from: 1,
		to: 364,
		weight: -0.08694153441631457,
		gater: null
	},
	{
		from: 1,
		to: 365,
		weight: -0.0003217726904455598,
		gater: null
	},
	{
		from: 1,
		to: 366,
		weight: 0.04274873042352939,
		gater: null
	},
	{
		from: 1,
		to: 367,
		weight: 0.09306156019775222,
		gater: null
	},
	{
		from: 1,
		to: 368,
		weight: -0.07922525177555838,
		gater: null
	},
	{
		from: 1,
		to: 369,
		weight: -0.07859325500092984,
		gater: null
	},
	{
		from: 1,
		to: 370,
		weight: 0.09356348410180756,
		gater: null
	},
	{
		from: 1,
		to: 371,
		weight: -0.05341878830609277,
		gater: null
	},
	{
		from: 1,
		to: 372,
		weight: -0.03175590142859619,
		gater: null
	},
	{
		from: 1,
		to: 373,
		weight: 0.00548769100503925,
		gater: null
	},
	{
		from: 1,
		to: 374,
		weight: 0.07677195794721478,
		gater: null
	},
	{
		from: 1,
		to: 375,
		weight: -0.046275166615969976,
		gater: null
	},
	{
		from: 1,
		to: 376,
		weight: 0.08947945655907374,
		gater: null
	},
	{
		from: 1,
		to: 377,
		weight: -0.027557695796221277,
		gater: null
	},
	{
		from: 1,
		to: 378,
		weight: 0.09967302494954611,
		gater: null
	},
	{
		from: 1,
		to: 379,
		weight: 0.06889321112495525,
		gater: null
	},
	{
		from: 2,
		to: 360,
		weight: 0.08725700234910927,
		gater: null
	},
	{
		from: 2,
		to: 361,
		weight: 0.003146492871333839,
		gater: null
	},
	{
		from: 2,
		to: 362,
		weight: -0.07663523084450095,
		gater: null
	},
	{
		from: 2,
		to: 363,
		weight: 0.033976172025139334,
		gater: null
	},
	{
		from: 2,
		to: 364,
		weight: 0.009666752732340328,
		gater: null
	},
	{
		from: 2,
		to: 365,
		weight: -0.0735532585678266,
		gater: null
	},
	{
		from: 2,
		to: 366,
		weight: 0.03027753650033152,
		gater: null
	},
	{
		from: 2,
		to: 367,
		weight: 0.02133555192804884,
		gater: null
	},
	{
		from: 2,
		to: 368,
		weight: 0.04332731367428716,
		gater: null
	},
	{
		from: 2,
		to: 369,
		weight: -0.0062974967249212754,
		gater: null
	},
	{
		from: 2,
		to: 370,
		weight: 0.09182291535502807,
		gater: null
	},
	{
		from: 2,
		to: 371,
		weight: -0.02716162523484754,
		gater: null
	},
	{
		from: 2,
		to: 372,
		weight: -0.008269573471732808,
		gater: null
	},
	{
		from: 2,
		to: 373,
		weight: -0.06784727611689587,
		gater: null
	},
	{
		from: 2,
		to: 374,
		weight: 0.02953472419162631,
		gater: null
	},
	{
		from: 2,
		to: 375,
		weight: -0.03540437914600113,
		gater: null
	},
	{
		from: 2,
		to: 376,
		weight: 0.03725612162785685,
		gater: null
	},
	{
		from: 2,
		to: 377,
		weight: 0.06546410120214596,
		gater: null
	},
	{
		from: 2,
		to: 378,
		weight: -0.0288403292538022,
		gater: null
	},
	{
		from: 2,
		to: 379,
		weight: 0.07668116379420017,
		gater: null
	},
	{
		from: 3,
		to: 360,
		weight: -0.03736084139742894,
		gater: null
	},
	{
		from: 3,
		to: 361,
		weight: -0.010639905998797827,
		gater: null
	},
	{
		from: 3,
		to: 362,
		weight: -0.024151998943143266,
		gater: null
	},
	{
		from: 3,
		to: 363,
		weight: 0.05490647333180068,
		gater: null
	},
	{
		from: 3,
		to: 364,
		weight: -0.07667186895091689,
		gater: null
	},
	{
		from: 3,
		to: 365,
		weight: -0.07428523923662343,
		gater: null
	},
	{
		from: 3,
		to: 366,
		weight: -0.09575436083573159,
		gater: null
	},
	{
		from: 3,
		to: 367,
		weight: -0.04703904085255402,
		gater: null
	},
	{
		from: 3,
		to: 368,
		weight: -0.06755357740470277,
		gater: null
	},
	{
		from: 3,
		to: 369,
		weight: -0.06411462617956518,
		gater: null
	},
	{
		from: 3,
		to: 370,
		weight: 0.06547952428106343,
		gater: null
	},
	{
		from: 3,
		to: 371,
		weight: -0.0445803022255185,
		gater: null
	},
	{
		from: 3,
		to: 372,
		weight: -0.08281651373706961,
		gater: null
	},
	{
		from: 3,
		to: 373,
		weight: 0.05329775720672256,
		gater: null
	},
	{
		from: 3,
		to: 374,
		weight: -0.06893175925897471,
		gater: null
	},
	{
		from: 3,
		to: 375,
		weight: -0.036007739535008826,
		gater: null
	},
	{
		from: 3,
		to: 376,
		weight: -0.08759335977912008,
		gater: null
	},
	{
		from: 3,
		to: 377,
		weight: 0.03216407844063801,
		gater: null
	},
	{
		from: 3,
		to: 378,
		weight: 0.09017368220885544,
		gater: null
	},
	{
		from: 3,
		to: 379,
		weight: 0.07311214397557905,
		gater: null
	},
	{
		from: 4,
		to: 360,
		weight: -0.011894951987958008,
		gater: null
	},
	{
		from: 4,
		to: 361,
		weight: -0.07460349871069663,
		gater: null
	},
	{
		from: 4,
		to: 362,
		weight: 0.08546695755665468,
		gater: null
	},
	{
		from: 4,
		to: 363,
		weight: 0.06818055975694279,
		gater: null
	},
	{
		from: 4,
		to: 364,
		weight: 0.005491264976457938,
		gater: null
	},
	{
		from: 4,
		to: 365,
		weight: -0.0035651142531802904,
		gater: null
	},
	{
		from: 4,
		to: 366,
		weight: -0.0030724638142599903,
		gater: null
	},
	{
		from: 4,
		to: 367,
		weight: 0.023700793379185556,
		gater: null
	},
	{
		from: 4,
		to: 368,
		weight: -0.003457705066643474,
		gater: null
	},
	{
		from: 4,
		to: 369,
		weight: -0.09430587480911341,
		gater: null
	},
	{
		from: 4,
		to: 370,
		weight: 0.05795607219108545,
		gater: null
	},
	{
		from: 4,
		to: 371,
		weight: 0.059219146575888504,
		gater: null
	},
	{
		from: 4,
		to: 372,
		weight: -0.023749658388073996,
		gater: null
	},
	{
		from: 4,
		to: 373,
		weight: 0.06143460961023281,
		gater: null
	},
	{
		from: 4,
		to: 374,
		weight: -0.06377022824765896,
		gater: null
	},
	{
		from: 4,
		to: 375,
		weight: -0.0752997457458584,
		gater: null
	},
	{
		from: 4,
		to: 376,
		weight: 0.08994762900936096,
		gater: null
	},
	{
		from: 4,
		to: 377,
		weight: -0.0028569644400683603,
		gater: null
	},
	{
		from: 4,
		to: 378,
		weight: 0.04119815360441495,
		gater: null
	},
	{
		from: 4,
		to: 379,
		weight: -0.01135334455825876,
		gater: null
	},
	{
		from: 5,
		to: 360,
		weight: -0.0584304462869369,
		gater: null
	},
	{
		from: 5,
		to: 361,
		weight: 0.03227140969533751,
		gater: null
	},
	{
		from: 5,
		to: 362,
		weight: 0.06706524909438696,
		gater: null
	},
	{
		from: 5,
		to: 363,
		weight: 0.09823115314494743,
		gater: null
	},
	{
		from: 5,
		to: 364,
		weight: -0.00367096216328551,
		gater: null
	},
	{
		from: 5,
		to: 365,
		weight: 0.025329164972972856,
		gater: null
	},
	{
		from: 5,
		to: 366,
		weight: 0.0898910804814311,
		gater: null
	},
	{
		from: 5,
		to: 367,
		weight: -0.05682768557144438,
		gater: null
	},
	{
		from: 5,
		to: 368,
		weight: -0.049618173002981304,
		gater: null
	},
	{
		from: 5,
		to: 369,
		weight: -0.028815945297991072,
		gater: null
	},
	{
		from: 5,
		to: 370,
		weight: 0.06547871320905949,
		gater: null
	},
	{
		from: 5,
		to: 371,
		weight: 0.039397829358096825,
		gater: null
	},
	{
		from: 5,
		to: 372,
		weight: -0.08391975829263765,
		gater: null
	},
	{
		from: 5,
		to: 373,
		weight: 0.07974697154310043,
		gater: null
	},
	{
		from: 5,
		to: 374,
		weight: 0.02177588469372886,
		gater: null
	},
	{
		from: 5,
		to: 375,
		weight: -0.08450630344874638,
		gater: null
	},
	{
		from: 5,
		to: 376,
		weight: 0.02732797860713404,
		gater: null
	},
	{
		from: 5,
		to: 377,
		weight: 0.07392160137545961,
		gater: null
	},
	{
		from: 5,
		to: 378,
		weight: -0.007133788296758994,
		gater: null
	},
	{
		from: 5,
		to: 379,
		weight: 0.0710187616998603,
		gater: null
	},
	{
		from: 6,
		to: 360,
		weight: -0.09783402372920676,
		gater: null
	},
	{
		from: 6,
		to: 361,
		weight: -0.000028405106806156377,
		gater: null
	},
	{
		from: 6,
		to: 362,
		weight: -0.022264358799340744,
		gater: null
	},
	{
		from: 6,
		to: 363,
		weight: 0.07751705657824179,
		gater: null
	},
	{
		from: 6,
		to: 364,
		weight: -0.07457906947562276,
		gater: null
	},
	{
		from: 6,
		to: 365,
		weight: 0.050059521240945454,
		gater: null
	},
	{
		from: 6,
		to: 366,
		weight: -0.07901061678750715,
		gater: null
	},
	{
		from: 6,
		to: 367,
		weight: -0.04765620474816093,
		gater: null
	},
	{
		from: 6,
		to: 368,
		weight: -0.033484987176002345,
		gater: null
	},
	{
		from: 6,
		to: 369,
		weight: 0.07714053553669392,
		gater: null
	},
	{
		from: 6,
		to: 370,
		weight: 0.03728108681716208,
		gater: null
	},
	{
		from: 6,
		to: 371,
		weight: -0.08252362418160103,
		gater: null
	},
	{
		from: 6,
		to: 372,
		weight: -0.016920447262916485,
		gater: null
	},
	{
		from: 6,
		to: 373,
		weight: 0.02669995613545284,
		gater: null
	},
	{
		from: 6,
		to: 374,
		weight: 0.06004306487730343,
		gater: null
	},
	{
		from: 6,
		to: 375,
		weight: 0.096866210128284,
		gater: null
	},
	{
		from: 6,
		to: 376,
		weight: 0.06926453953428666,
		gater: null
	},
	{
		from: 6,
		to: 377,
		weight: 0.08213024928778939,
		gater: null
	},
	{
		from: 6,
		to: 378,
		weight: -0.05300671878128376,
		gater: null
	},
	{
		from: 6,
		to: 379,
		weight: -0.08149676945728711,
		gater: null
	},
	{
		from: 7,
		to: 360,
		weight: 0.03383440783352348,
		gater: null
	},
	{
		from: 7,
		to: 361,
		weight: 0.07644222477712712,
		gater: null
	},
	{
		from: 7,
		to: 362,
		weight: -0.07176921141065368,
		gater: null
	},
	{
		from: 7,
		to: 363,
		weight: 0.01417070538497249,
		gater: null
	},
	{
		from: 7,
		to: 364,
		weight: -0.013363742274978427,
		gater: null
	},
	{
		from: 7,
		to: 365,
		weight: 0.07398862881822033,
		gater: null
	},
	{
		from: 7,
		to: 366,
		weight: 0.013095715693568488,
		gater: null
	},
	{
		from: 7,
		to: 367,
		weight: -0.05479318287419548,
		gater: null
	},
	{
		from: 7,
		to: 368,
		weight: -0.022017294192662323,
		gater: null
	},
	{
		from: 7,
		to: 369,
		weight: -0.0005353495771968364,
		gater: null
	},
	{
		from: 7,
		to: 370,
		weight: 0.049652155522125124,
		gater: null
	},
	{
		from: 7,
		to: 371,
		weight: -0.06847758031574087,
		gater: null
	},
	{
		from: 7,
		to: 372,
		weight: 0.026657795517323418,
		gater: null
	},
	{
		from: 7,
		to: 373,
		weight: -0.0845967022467003,
		gater: null
	},
	{
		from: 7,
		to: 374,
		weight: 0.0702911950859979,
		gater: null
	},
	{
		from: 7,
		to: 375,
		weight: 0.035922416357951986,
		gater: null
	},
	{
		from: 7,
		to: 376,
		weight: -0.09773501268295402,
		gater: null
	},
	{
		from: 7,
		to: 377,
		weight: 0.005041451483644849,
		gater: null
	},
	{
		from: 7,
		to: 378,
		weight: -0.051024312540326244,
		gater: null
	},
	{
		from: 7,
		to: 379,
		weight: 0.05256664654830462,
		gater: null
	},
	{
		from: 8,
		to: 360,
		weight: 0.026591441136885885,
		gater: null
	},
	{
		from: 8,
		to: 361,
		weight: -0.021108139617856958,
		gater: null
	},
	{
		from: 8,
		to: 362,
		weight: 0.03469643073249867,
		gater: null
	},
	{
		from: 8,
		to: 363,
		weight: -0.09492637463932017,
		gater: null
	},
	{
		from: 8,
		to: 364,
		weight: 0.07796477254493236,
		gater: null
	},
	{
		from: 8,
		to: 365,
		weight: 0.08688542978518227,
		gater: null
	},
	{
		from: 8,
		to: 366,
		weight: -0.09917285381868966,
		gater: null
	},
	{
		from: 8,
		to: 367,
		weight: -0.08071525129544091,
		gater: null
	},
	{
		from: 8,
		to: 368,
		weight: -0.048549468909701646,
		gater: null
	},
	{
		from: 8,
		to: 369,
		weight: 0.019619359114182083,
		gater: null
	},
	{
		from: 8,
		to: 370,
		weight: 0.00848715707696926,
		gater: null
	},
	{
		from: 8,
		to: 371,
		weight: -0.05003355282162634,
		gater: null
	},
	{
		from: 8,
		to: 372,
		weight: 0.014563158204912566,
		gater: null
	},
	{
		from: 8,
		to: 373,
		weight: 0.08168242972806392,
		gater: null
	},
	{
		from: 8,
		to: 374,
		weight: 0.05729631051456102,
		gater: null
	},
	{
		from: 8,
		to: 375,
		weight: -0.005656604259367842,
		gater: null
	},
	{
		from: 8,
		to: 376,
		weight: 0.02903249379705647,
		gater: null
	},
	{
		from: 8,
		to: 377,
		weight: -0.09117741385173771,
		gater: null
	},
	{
		from: 8,
		to: 378,
		weight: -0.08307936577648128,
		gater: null
	},
	{
		from: 8,
		to: 379,
		weight: -0.09696471636958788,
		gater: null
	},
	{
		from: 9,
		to: 360,
		weight: 0.07474007716267703,
		gater: null
	},
	{
		from: 9,
		to: 361,
		weight: 0.05700038325065604,
		gater: null
	},
	{
		from: 9,
		to: 362,
		weight: -0.08588413462220612,
		gater: null
	},
	{
		from: 9,
		to: 363,
		weight: -0.06835880541774686,
		gater: null
	},
	{
		from: 9,
		to: 364,
		weight: -0.08741941482729071,
		gater: null
	},
	{
		from: 9,
		to: 365,
		weight: 0.011675375487945769,
		gater: null
	},
	{
		from: 9,
		to: 366,
		weight: 0.09750579592743577,
		gater: null
	},
	{
		from: 9,
		to: 367,
		weight: -0.06329461944222166,
		gater: null
	},
	{
		from: 9,
		to: 368,
		weight: -0.067664765723437,
		gater: null
	},
	{
		from: 9,
		to: 369,
		weight: -0.08237404532358782,
		gater: null
	},
	{
		from: 9,
		to: 370,
		weight: -0.044896581995109576,
		gater: null
	},
	{
		from: 9,
		to: 371,
		weight: -0.043288132971943144,
		gater: null
	},
	{
		from: 9,
		to: 372,
		weight: 0.0020608066660473823,
		gater: null
	},
	{
		from: 9,
		to: 373,
		weight: 0.06574631729820318,
		gater: null
	},
	{
		from: 9,
		to: 374,
		weight: -0.009484627302578777,
		gater: null
	},
	{
		from: 9,
		to: 375,
		weight: 0.07153187160368649,
		gater: null
	},
	{
		from: 9,
		to: 376,
		weight: -0.01614277412795402,
		gater: null
	},
	{
		from: 9,
		to: 377,
		weight: 0.08195101529607746,
		gater: null
	},
	{
		from: 9,
		to: 378,
		weight: 0.06785518445601896,
		gater: null
	},
	{
		from: 9,
		to: 379,
		weight: -0.006517612224983121,
		gater: null
	},
	{
		from: 10,
		to: 360,
		weight: 0.029498792144613428,
		gater: null
	},
	{
		from: 10,
		to: 361,
		weight: 0.0010483908723825375,
		gater: null
	},
	{
		from: 10,
		to: 362,
		weight: -0.08866644327983662,
		gater: null
	},
	{
		from: 10,
		to: 363,
		weight: -0.0893376944976815,
		gater: null
	},
	{
		from: 10,
		to: 364,
		weight: 0.06913388080244418,
		gater: null
	},
	{
		from: 10,
		to: 365,
		weight: -0.0708606515927138,
		gater: null
	},
	{
		from: 10,
		to: 366,
		weight: -0.07737973215385217,
		gater: null
	},
	{
		from: 10,
		to: 367,
		weight: -0.06595936354787515,
		gater: null
	},
	{
		from: 10,
		to: 368,
		weight: -0.01510322363990775,
		gater: null
	},
	{
		from: 10,
		to: 369,
		weight: -0.017712209632056372,
		gater: null
	},
	{
		from: 10,
		to: 370,
		weight: 0.09258630198745196,
		gater: null
	},
	{
		from: 10,
		to: 371,
		weight: 0.04044422729641156,
		gater: null
	},
	{
		from: 10,
		to: 372,
		weight: -0.015318123804702571,
		gater: null
	},
	{
		from: 10,
		to: 373,
		weight: 0.0363624346198399,
		gater: null
	},
	{
		from: 10,
		to: 374,
		weight: 0.0034632382613709878,
		gater: null
	},
	{
		from: 10,
		to: 375,
		weight: 0.03400171264816812,
		gater: null
	},
	{
		from: 10,
		to: 376,
		weight: -0.08356423592195515,
		gater: null
	},
	{
		from: 10,
		to: 377,
		weight: 0.09447702302667982,
		gater: null
	},
	{
		from: 10,
		to: 378,
		weight: -0.01650148531568614,
		gater: null
	},
	{
		from: 10,
		to: 379,
		weight: -0.016887071083204086,
		gater: null
	},
	{
		from: 11,
		to: 360,
		weight: 0.04394153681999918,
		gater: null
	},
	{
		from: 11,
		to: 361,
		weight: 0.007989400643238082,
		gater: null
	},
	{
		from: 11,
		to: 362,
		weight: -0.055380948765506324,
		gater: null
	},
	{
		from: 11,
		to: 363,
		weight: -0.08822498084125963,
		gater: null
	},
	{
		from: 11,
		to: 364,
		weight: 0.02544849432552007,
		gater: null
	},
	{
		from: 11,
		to: 365,
		weight: -0.07842100941667525,
		gater: null
	},
	{
		from: 11,
		to: 366,
		weight: 0.04984875937347408,
		gater: null
	},
	{
		from: 11,
		to: 367,
		weight: 0.038763712741274686,
		gater: null
	},
	{
		from: 11,
		to: 368,
		weight: 0.09057421712963984,
		gater: null
	},
	{
		from: 11,
		to: 369,
		weight: -0.07041959784756609,
		gater: null
	},
	{
		from: 11,
		to: 370,
		weight: -0.0995570883029247,
		gater: null
	},
	{
		from: 11,
		to: 371,
		weight: -0.06985003291526906,
		gater: null
	},
	{
		from: 11,
		to: 372,
		weight: 0.07829648888334637,
		gater: null
	},
	{
		from: 11,
		to: 373,
		weight: -0.07230938435638926,
		gater: null
	},
	{
		from: 11,
		to: 374,
		weight: 0.04948037820977641,
		gater: null
	},
	{
		from: 11,
		to: 375,
		weight: 0.03886840138071598,
		gater: null
	},
	{
		from: 11,
		to: 376,
		weight: -0.027684486788252555,
		gater: null
	},
	{
		from: 11,
		to: 377,
		weight: -0.08284448784298074,
		gater: null
	},
	{
		from: 11,
		to: 378,
		weight: 0.08323269028898808,
		gater: null
	},
	{
		from: 11,
		to: 379,
		weight: -0.06591730046896656,
		gater: null
	},
	{
		from: 12,
		to: 360,
		weight: -0.05840757983470444,
		gater: null
	},
	{
		from: 12,
		to: 361,
		weight: -0.09074806500205135,
		gater: null
	},
	{
		from: 12,
		to: 362,
		weight: -0.08338221932143926,
		gater: null
	},
	{
		from: 12,
		to: 363,
		weight: -0.05644928706882349,
		gater: null
	},
	{
		from: 12,
		to: 364,
		weight: 0.05938755975134888,
		gater: null
	},
	{
		from: 12,
		to: 365,
		weight: 0.08015120705705026,
		gater: null
	},
	{
		from: 12,
		to: 366,
		weight: 0.044215360226923905,
		gater: null
	},
	{
		from: 12,
		to: 367,
		weight: -0.059042813459285574,
		gater: null
	},
	{
		from: 12,
		to: 368,
		weight: 0.044118600313801076,
		gater: null
	},
	{
		from: 12,
		to: 369,
		weight: 0.09636919444733635,
		gater: null
	},
	{
		from: 12,
		to: 370,
		weight: -0.040077446901883335,
		gater: null
	},
	{
		from: 12,
		to: 371,
		weight: 0.015826064636891873,
		gater: null
	},
	{
		from: 12,
		to: 372,
		weight: 0.054760587689307,
		gater: null
	},
	{
		from: 12,
		to: 373,
		weight: 0.09491966403011717,
		gater: null
	},
	{
		from: 12,
		to: 374,
		weight: -0.009883934452423526,
		gater: null
	},
	{
		from: 12,
		to: 375,
		weight: 0.005646158247997676,
		gater: null
	},
	{
		from: 12,
		to: 376,
		weight: -0.004867706344714451,
		gater: null
	},
	{
		from: 12,
		to: 377,
		weight: -0.09428021725803806,
		gater: null
	},
	{
		from: 12,
		to: 378,
		weight: -0.06703957618711956,
		gater: null
	},
	{
		from: 12,
		to: 379,
		weight: 0.02140139126831757,
		gater: null
	},
	{
		from: 13,
		to: 360,
		weight: -0.018803124528172302,
		gater: null
	},
	{
		from: 13,
		to: 361,
		weight: 0.020706682430568613,
		gater: null
	},
	{
		from: 13,
		to: 362,
		weight: 0.056286295391494184,
		gater: null
	},
	{
		from: 13,
		to: 363,
		weight: -0.06252570153392996,
		gater: null
	},
	{
		from: 13,
		to: 364,
		weight: -0.004939244734438339,
		gater: null
	},
	{
		from: 13,
		to: 365,
		weight: -0.09886087603764718,
		gater: null
	},
	{
		from: 13,
		to: 366,
		weight: 0.03561744332768629,
		gater: null
	},
	{
		from: 13,
		to: 367,
		weight: 0.09770952040779757,
		gater: null
	},
	{
		from: 13,
		to: 368,
		weight: -0.018913653149380802,
		gater: null
	},
	{
		from: 13,
		to: 369,
		weight: -0.04363670668389901,
		gater: null
	},
	{
		from: 13,
		to: 370,
		weight: -0.08658037620869657,
		gater: null
	},
	{
		from: 13,
		to: 371,
		weight: -0.06545055817992948,
		gater: null
	},
	{
		from: 13,
		to: 372,
		weight: 0.06312783251158988,
		gater: null
	},
	{
		from: 13,
		to: 373,
		weight: 0.014305393037117572,
		gater: null
	},
	{
		from: 13,
		to: 374,
		weight: 0.061234617497563815,
		gater: null
	},
	{
		from: 13,
		to: 375,
		weight: -0.049037338777387786,
		gater: null
	},
	{
		from: 13,
		to: 376,
		weight: -0.0819246925317057,
		gater: null
	},
	{
		from: 13,
		to: 377,
		weight: 0.09256381102374722,
		gater: null
	},
	{
		from: 13,
		to: 378,
		weight: -0.04777420508227399,
		gater: null
	},
	{
		from: 13,
		to: 379,
		weight: 0.030448654598977887,
		gater: null
	},
	{
		from: 14,
		to: 360,
		weight: -0.03308024267941949,
		gater: null
	},
	{
		from: 14,
		to: 361,
		weight: 0.031084204333177018,
		gater: null
	},
	{
		from: 14,
		to: 362,
		weight: 0.09350677396634391,
		gater: null
	},
	{
		from: 14,
		to: 363,
		weight: -0.07866444223266017,
		gater: null
	},
	{
		from: 14,
		to: 364,
		weight: 0.05920561044061495,
		gater: null
	},
	{
		from: 14,
		to: 365,
		weight: -0.041581115413736706,
		gater: null
	},
	{
		from: 14,
		to: 366,
		weight: -0.01721680325781136,
		gater: null
	},
	{
		from: 14,
		to: 367,
		weight: -0.07638909767594991,
		gater: null
	},
	{
		from: 14,
		to: 368,
		weight: -0.07274807498740393,
		gater: null
	},
	{
		from: 14,
		to: 369,
		weight: 0.008137643872522027,
		gater: null
	},
	{
		from: 14,
		to: 370,
		weight: 0.002463123104913964,
		gater: null
	},
	{
		from: 14,
		to: 371,
		weight: -0.06299443830909018,
		gater: null
	},
	{
		from: 14,
		to: 372,
		weight: -0.014721590333929058,
		gater: null
	},
	{
		from: 14,
		to: 373,
		weight: 0.0412245882639799,
		gater: null
	},
	{
		from: 14,
		to: 374,
		weight: -0.06942122871340684,
		gater: null
	},
	{
		from: 14,
		to: 375,
		weight: 0.00019246476777667887,
		gater: null
	},
	{
		from: 14,
		to: 376,
		weight: 0.03123912077275942,
		gater: null
	},
	{
		from: 14,
		to: 377,
		weight: 0.0934705898961409,
		gater: null
	},
	{
		from: 14,
		to: 378,
		weight: -0.08543292845097442,
		gater: null
	},
	{
		from: 14,
		to: 379,
		weight: -0.03706822631966333,
		gater: null
	},
	{
		from: 15,
		to: 360,
		weight: -0.03854031447329596,
		gater: null
	},
	{
		from: 15,
		to: 361,
		weight: -0.07602879932292135,
		gater: null
	},
	{
		from: 15,
		to: 362,
		weight: -0.04307309283647092,
		gater: null
	},
	{
		from: 15,
		to: 363,
		weight: 0.03154560352654162,
		gater: null
	},
	{
		from: 15,
		to: 364,
		weight: 0.06259204029490989,
		gater: null
	},
	{
		from: 15,
		to: 365,
		weight: 0.009759551036607791,
		gater: null
	},
	{
		from: 15,
		to: 366,
		weight: -0.06449559416067846,
		gater: null
	},
	{
		from: 15,
		to: 367,
		weight: -0.005466215791504678,
		gater: null
	},
	{
		from: 15,
		to: 368,
		weight: -0.035571598294299595,
		gater: null
	},
	{
		from: 15,
		to: 369,
		weight: -0.004382887192970003,
		gater: null
	},
	{
		from: 15,
		to: 370,
		weight: -0.09118926216575073,
		gater: null
	},
	{
		from: 15,
		to: 371,
		weight: 0.05871605175692235,
		gater: null
	},
	{
		from: 15,
		to: 372,
		weight: -0.016815790059865512,
		gater: null
	},
	{
		from: 15,
		to: 373,
		weight: -0.010191248383262283,
		gater: null
	},
	{
		from: 15,
		to: 374,
		weight: 0.030832443093233325,
		gater: null
	},
	{
		from: 15,
		to: 375,
		weight: 0.0882097777666033,
		gater: null
	},
	{
		from: 15,
		to: 376,
		weight: 0.0397093617610596,
		gater: null
	},
	{
		from: 15,
		to: 377,
		weight: -0.062108970917277476,
		gater: null
	},
	{
		from: 15,
		to: 378,
		weight: -0.08617366390441156,
		gater: null
	},
	{
		from: 15,
		to: 379,
		weight: 0.0046180334087026625,
		gater: null
	},
	{
		from: 16,
		to: 360,
		weight: 0.09361308700847523,
		gater: null
	},
	{
		from: 16,
		to: 361,
		weight: -0.010281991994149739,
		gater: null
	},
	{
		from: 16,
		to: 362,
		weight: 0.04646617755785712,
		gater: null
	},
	{
		from: 16,
		to: 363,
		weight: 0.011203842363808517,
		gater: null
	},
	{
		from: 16,
		to: 364,
		weight: 0.016740610595424282,
		gater: null
	},
	{
		from: 16,
		to: 365,
		weight: 0.08877322253804895,
		gater: null
	},
	{
		from: 16,
		to: 366,
		weight: 0.002162857085449721,
		gater: null
	},
	{
		from: 16,
		to: 367,
		weight: -0.054162974601768846,
		gater: null
	},
	{
		from: 16,
		to: 368,
		weight: -0.0328288588290707,
		gater: null
	},
	{
		from: 16,
		to: 369,
		weight: 0.037714662483989386,
		gater: null
	},
	{
		from: 16,
		to: 370,
		weight: 0.029085458958151067,
		gater: null
	},
	{
		from: 16,
		to: 371,
		weight: -0.03880501735546291,
		gater: null
	},
	{
		from: 16,
		to: 372,
		weight: 0.07824661268228317,
		gater: null
	},
	{
		from: 16,
		to: 373,
		weight: 0.04476365690765721,
		gater: null
	},
	{
		from: 16,
		to: 374,
		weight: -0.009832027403664206,
		gater: null
	},
	{
		from: 16,
		to: 375,
		weight: 0.09459356615177966,
		gater: null
	},
	{
		from: 16,
		to: 376,
		weight: 0.05931414770077789,
		gater: null
	},
	{
		from: 16,
		to: 377,
		weight: 0.04358737275651814,
		gater: null
	},
	{
		from: 16,
		to: 378,
		weight: -0.01103306989951855,
		gater: null
	},
	{
		from: 16,
		to: 379,
		weight: 0.07152629214545966,
		gater: null
	},
	{
		from: 17,
		to: 360,
		weight: -0.010685586439054484,
		gater: null
	},
	{
		from: 17,
		to: 361,
		weight: 0.0951075162822532,
		gater: null
	},
	{
		from: 17,
		to: 362,
		weight: 0.0232081402222942,
		gater: null
	},
	{
		from: 17,
		to: 363,
		weight: -0.044192323093999744,
		gater: null
	},
	{
		from: 17,
		to: 364,
		weight: -0.06600750654741568,
		gater: null
	},
	{
		from: 17,
		to: 365,
		weight: -0.09748595679269534,
		gater: null
	},
	{
		from: 17,
		to: 366,
		weight: -0.049981318167659605,
		gater: null
	},
	{
		from: 17,
		to: 367,
		weight: 0.09807690992623538,
		gater: null
	},
	{
		from: 17,
		to: 368,
		weight: -0.08313322871559713,
		gater: null
	},
	{
		from: 17,
		to: 369,
		weight: 0.03228164722612986,
		gater: null
	},
	{
		from: 17,
		to: 370,
		weight: 0.06065085461713915,
		gater: null
	},
	{
		from: 17,
		to: 371,
		weight: 0.00446292488312125,
		gater: null
	},
	{
		from: 17,
		to: 372,
		weight: 0.057007311284583834,
		gater: null
	},
	{
		from: 17,
		to: 373,
		weight: 0.01614454214289776,
		gater: null
	},
	{
		from: 17,
		to: 374,
		weight: 0.048676989386572,
		gater: null
	},
	{
		from: 17,
		to: 375,
		weight: -0.09699035584152932,
		gater: null
	},
	{
		from: 17,
		to: 376,
		weight: 0.09839823774096787,
		gater: null
	},
	{
		from: 17,
		to: 377,
		weight: 0.024963243974790356,
		gater: null
	},
	{
		from: 17,
		to: 378,
		weight: 0.07832046669358336,
		gater: null
	},
	{
		from: 17,
		to: 379,
		weight: -0.03865160875474727,
		gater: null
	},
	{
		from: 18,
		to: 360,
		weight: -0.04510937049743431,
		gater: null
	},
	{
		from: 18,
		to: 361,
		weight: -0.07764975359063123,
		gater: null
	},
	{
		from: 18,
		to: 362,
		weight: -0.04664147887203756,
		gater: null
	},
	{
		from: 18,
		to: 363,
		weight: -0.05015458984253991,
		gater: null
	},
	{
		from: 18,
		to: 364,
		weight: -0.08622270687245398,
		gater: null
	},
	{
		from: 18,
		to: 365,
		weight: 0.05462124171091842,
		gater: null
	},
	{
		from: 18,
		to: 366,
		weight: -0.04125368866456052,
		gater: null
	},
	{
		from: 18,
		to: 367,
		weight: 0.08431207891647216,
		gater: null
	},
	{
		from: 18,
		to: 368,
		weight: -0.05515729387919768,
		gater: null
	},
	{
		from: 18,
		to: 369,
		weight: 0.006733328980459599,
		gater: null
	},
	{
		from: 18,
		to: 370,
		weight: 0.09227438935430077,
		gater: null
	},
	{
		from: 18,
		to: 371,
		weight: -0.07403958361274268,
		gater: null
	},
	{
		from: 18,
		to: 372,
		weight: 0.027420176150914022,
		gater: null
	},
	{
		from: 18,
		to: 373,
		weight: 0.088727311832664,
		gater: null
	},
	{
		from: 18,
		to: 374,
		weight: -0.07767457547910102,
		gater: null
	},
	{
		from: 18,
		to: 375,
		weight: -0.08555104521920587,
		gater: null
	},
	{
		from: 18,
		to: 376,
		weight: 0.052559669585389435,
		gater: null
	},
	{
		from: 18,
		to: 377,
		weight: 0.0032353084610008825,
		gater: null
	},
	{
		from: 18,
		to: 378,
		weight: -0.033074916957979775,
		gater: null
	},
	{
		from: 18,
		to: 379,
		weight: -0.021130143154673056,
		gater: null
	},
	{
		from: 19,
		to: 360,
		weight: 0.06483573264222486,
		gater: null
	},
	{
		from: 19,
		to: 361,
		weight: -0.01533997030735379,
		gater: null
	},
	{
		from: 19,
		to: 362,
		weight: -0.04753080044222627,
		gater: null
	},
	{
		from: 19,
		to: 363,
		weight: -0.0334712625746663,
		gater: null
	},
	{
		from: 19,
		to: 364,
		weight: 0.0717621725408093,
		gater: null
	},
	{
		from: 19,
		to: 365,
		weight: -0.025938060136802096,
		gater: null
	},
	{
		from: 19,
		to: 366,
		weight: -0.09363735404838569,
		gater: null
	},
	{
		from: 19,
		to: 367,
		weight: -0.05056224856720007,
		gater: null
	},
	{
		from: 19,
		to: 368,
		weight: -0.013989990363193663,
		gater: null
	},
	{
		from: 19,
		to: 369,
		weight: 0.05932120401849947,
		gater: null
	},
	{
		from: 19,
		to: 370,
		weight: -0.06559160141771381,
		gater: null
	},
	{
		from: 19,
		to: 371,
		weight: -0.08565332151408085,
		gater: null
	},
	{
		from: 19,
		to: 372,
		weight: -0.06106172294673438,
		gater: null
	},
	{
		from: 19,
		to: 373,
		weight: 0.03234215833019016,
		gater: null
	},
	{
		from: 19,
		to: 374,
		weight: 0.04995132332741328,
		gater: null
	},
	{
		from: 19,
		to: 375,
		weight: -0.08515376999324667,
		gater: null
	},
	{
		from: 19,
		to: 376,
		weight: 0.06706234122797491,
		gater: null
	},
	{
		from: 19,
		to: 377,
		weight: 0.053107118556635274,
		gater: null
	},
	{
		from: 19,
		to: 378,
		weight: 0.07037136723076207,
		gater: null
	},
	{
		from: 19,
		to: 379,
		weight: 0.06534016745324367,
		gater: null
	},
	{
		from: 20,
		to: 360,
		weight: 0.06308987686466169,
		gater: null
	},
	{
		from: 20,
		to: 361,
		weight: 0.07736496843981211,
		gater: null
	},
	{
		from: 20,
		to: 362,
		weight: -0.06207535006128531,
		gater: null
	},
	{
		from: 20,
		to: 363,
		weight: -0.09992610408144881,
		gater: null
	},
	{
		from: 20,
		to: 364,
		weight: -0.049384342064017255,
		gater: null
	},
	{
		from: 20,
		to: 365,
		weight: -0.012990514900556832,
		gater: null
	},
	{
		from: 20,
		to: 366,
		weight: -0.017144375361800315,
		gater: null
	},
	{
		from: 20,
		to: 367,
		weight: -0.05763853244645212,
		gater: null
	},
	{
		from: 20,
		to: 368,
		weight: 0.043799875808540806,
		gater: null
	},
	{
		from: 20,
		to: 369,
		weight: 0.08522311211085074,
		gater: null
	},
	{
		from: 20,
		to: 370,
		weight: -0.03791258836929008,
		gater: null
	},
	{
		from: 20,
		to: 371,
		weight: 0.06540595105460745,
		gater: null
	},
	{
		from: 20,
		to: 372,
		weight: -0.06544175988009929,
		gater: null
	},
	{
		from: 20,
		to: 373,
		weight: -0.08965276154921967,
		gater: null
	},
	{
		from: 20,
		to: 374,
		weight: -0.01735345238916515,
		gater: null
	},
	{
		from: 20,
		to: 375,
		weight: 0.07890541923006275,
		gater: null
	},
	{
		from: 20,
		to: 376,
		weight: 0.08304728392737246,
		gater: null
	},
	{
		from: 20,
		to: 377,
		weight: 0.030230315937438357,
		gater: null
	},
	{
		from: 20,
		to: 378,
		weight: 0.051905710324438886,
		gater: null
	},
	{
		from: 20,
		to: 379,
		weight: 0.09135332969443352,
		gater: null
	},
	{
		from: 21,
		to: 360,
		weight: 0.06956034419535526,
		gater: null
	},
	{
		from: 21,
		to: 361,
		weight: -0.07000476314906146,
		gater: null
	},
	{
		from: 21,
		to: 362,
		weight: -0.019764951867220715,
		gater: null
	},
	{
		from: 21,
		to: 363,
		weight: -0.06781857262918453,
		gater: null
	},
	{
		from: 21,
		to: 364,
		weight: -0.038780527068214665,
		gater: null
	},
	{
		from: 21,
		to: 365,
		weight: 0.07129844152363934,
		gater: null
	},
	{
		from: 21,
		to: 366,
		weight: 0.0477716634019254,
		gater: null
	},
	{
		from: 21,
		to: 367,
		weight: -0.02375444146704249,
		gater: null
	},
	{
		from: 21,
		to: 368,
		weight: -0.09076969975865296,
		gater: null
	},
	{
		from: 21,
		to: 369,
		weight: 0.030034088826168676,
		gater: null
	},
	{
		from: 21,
		to: 370,
		weight: -0.01925191220471749,
		gater: null
	},
	{
		from: 21,
		to: 371,
		weight: -0.04101823515841785,
		gater: null
	},
	{
		from: 21,
		to: 372,
		weight: 0.03155955702004376,
		gater: null
	},
	{
		from: 21,
		to: 373,
		weight: -0.05492370851735946,
		gater: null
	},
	{
		from: 21,
		to: 374,
		weight: -0.0027013564445232535,
		gater: null
	},
	{
		from: 21,
		to: 375,
		weight: 0.05554930080291595,
		gater: null
	},
	{
		from: 21,
		to: 376,
		weight: -0.08323157301650795,
		gater: null
	},
	{
		from: 21,
		to: 377,
		weight: -0.0718671241042273,
		gater: null
	},
	{
		from: 21,
		to: 378,
		weight: -0.022567179051971253,
		gater: null
	},
	{
		from: 21,
		to: 379,
		weight: 0.06588858740162781,
		gater: null
	},
	{
		from: 22,
		to: 360,
		weight: 0.06148932845319158,
		gater: null
	},
	{
		from: 22,
		to: 361,
		weight: -0.08242878566912637,
		gater: null
	},
	{
		from: 22,
		to: 362,
		weight: 0.003793591614350472,
		gater: null
	},
	{
		from: 22,
		to: 363,
		weight: -0.033971974224254714,
		gater: null
	},
	{
		from: 22,
		to: 364,
		weight: -0.042217409379930265,
		gater: null
	},
	{
		from: 22,
		to: 365,
		weight: 0.058582284821949715,
		gater: null
	},
	{
		from: 22,
		to: 366,
		weight: -0.08034573659543282,
		gater: null
	},
	{
		from: 22,
		to: 367,
		weight: -0.09603105061609739,
		gater: null
	},
	{
		from: 22,
		to: 368,
		weight: 0.008322057595061022,
		gater: null
	},
	{
		from: 22,
		to: 369,
		weight: 0.028442547289681486,
		gater: null
	},
	{
		from: 22,
		to: 370,
		weight: -0.01677104336176813,
		gater: null
	},
	{
		from: 22,
		to: 371,
		weight: 0.07312581782629657,
		gater: null
	},
	{
		from: 22,
		to: 372,
		weight: -0.05986014024865871,
		gater: null
	},
	{
		from: 22,
		to: 373,
		weight: -0.06740442984965829,
		gater: null
	},
	{
		from: 22,
		to: 374,
		weight: -0.02295718670800259,
		gater: null
	},
	{
		from: 22,
		to: 375,
		weight: -0.04835386369155792,
		gater: null
	},
	{
		from: 22,
		to: 376,
		weight: 0.003566417307009531,
		gater: null
	},
	{
		from: 22,
		to: 377,
		weight: 0.03766878978271926,
		gater: null
	},
	{
		from: 22,
		to: 378,
		weight: 0.0939575247688266,
		gater: null
	},
	{
		from: 22,
		to: 379,
		weight: -0.08963644972570056,
		gater: null
	},
	{
		from: 23,
		to: 360,
		weight: -0.07449259568473582,
		gater: null
	},
	{
		from: 23,
		to: 361,
		weight: 0.0028482783743191964,
		gater: null
	},
	{
		from: 23,
		to: 362,
		weight: -0.0008819848903575817,
		gater: null
	},
	{
		from: 23,
		to: 363,
		weight: -0.06627414688624605,
		gater: null
	},
	{
		from: 23,
		to: 364,
		weight: -0.0009723977597919237,
		gater: null
	},
	{
		from: 23,
		to: 365,
		weight: 0.08094558933251017,
		gater: null
	},
	{
		from: 23,
		to: 366,
		weight: 0.03322402830312057,
		gater: null
	},
	{
		from: 23,
		to: 367,
		weight: -0.08747677311505844,
		gater: null
	},
	{
		from: 23,
		to: 368,
		weight: -0.005215274750320825,
		gater: null
	},
	{
		from: 23,
		to: 369,
		weight: 0.046339191020741494,
		gater: null
	},
	{
		from: 23,
		to: 370,
		weight: -0.09668911126180171,
		gater: null
	},
	{
		from: 23,
		to: 371,
		weight: 0.030465784713428368,
		gater: null
	},
	{
		from: 23,
		to: 372,
		weight: 0.030035996384006308,
		gater: null
	},
	{
		from: 23,
		to: 373,
		weight: -0.07121042866041671,
		gater: null
	},
	{
		from: 23,
		to: 374,
		weight: -0.09623619266825673,
		gater: null
	},
	{
		from: 23,
		to: 375,
		weight: 0.09539363004181797,
		gater: null
	},
	{
		from: 23,
		to: 376,
		weight: -0.03264285229652204,
		gater: null
	},
	{
		from: 23,
		to: 377,
		weight: 0.08584424141291197,
		gater: null
	},
	{
		from: 23,
		to: 378,
		weight: -0.025946215920739632,
		gater: null
	},
	{
		from: 23,
		to: 379,
		weight: 0.013500060628874697,
		gater: null
	},
	{
		from: 24,
		to: 360,
		weight: 0.09080864762835147,
		gater: null
	},
	{
		from: 24,
		to: 361,
		weight: -0.008525971558513576,
		gater: null
	},
	{
		from: 24,
		to: 362,
		weight: 0.02566024977526174,
		gater: null
	},
	{
		from: 24,
		to: 363,
		weight: -0.022112529429536162,
		gater: null
	},
	{
		from: 24,
		to: 364,
		weight: 0.04507503576747185,
		gater: null
	},
	{
		from: 24,
		to: 365,
		weight: 0.06755570173083547,
		gater: null
	},
	{
		from: 24,
		to: 366,
		weight: -0.07723081076524352,
		gater: null
	},
	{
		from: 24,
		to: 367,
		weight: -0.07214393507386362,
		gater: null
	},
	{
		from: 24,
		to: 368,
		weight: -0.06443195989205691,
		gater: null
	},
	{
		from: 24,
		to: 369,
		weight: 0.0636240187340146,
		gater: null
	},
	{
		from: 24,
		to: 370,
		weight: 0.010946106142222384,
		gater: null
	},
	{
		from: 24,
		to: 371,
		weight: -0.019081766344717768,
		gater: null
	},
	{
		from: 24,
		to: 372,
		weight: 0.07922110045913475,
		gater: null
	},
	{
		from: 24,
		to: 373,
		weight: -0.022949674195074626,
		gater: null
	},
	{
		from: 24,
		to: 374,
		weight: -0.0006149290426011034,
		gater: null
	},
	{
		from: 24,
		to: 375,
		weight: 0.06459856682642942,
		gater: null
	},
	{
		from: 24,
		to: 376,
		weight: 0.01665614239452995,
		gater: null
	},
	{
		from: 24,
		to: 377,
		weight: -0.004733505134728366,
		gater: null
	},
	{
		from: 24,
		to: 378,
		weight: -0.00014036718036387896,
		gater: null
	},
	{
		from: 24,
		to: 379,
		weight: 0.05695765617586593,
		gater: null
	},
	{
		from: 25,
		to: 360,
		weight: 0.07337547790194895,
		gater: null
	},
	{
		from: 25,
		to: 361,
		weight: 0.03304247008653824,
		gater: null
	},
	{
		from: 25,
		to: 362,
		weight: 0.04271330768641879,
		gater: null
	},
	{
		from: 25,
		to: 363,
		weight: -0.0598093765600952,
		gater: null
	},
	{
		from: 25,
		to: 364,
		weight: 0.029595183017654264,
		gater: null
	},
	{
		from: 25,
		to: 365,
		weight: 0.028890056702165767,
		gater: null
	},
	{
		from: 25,
		to: 366,
		weight: -0.0372002376947143,
		gater: null
	},
	{
		from: 25,
		to: 367,
		weight: -0.09968811748104432,
		gater: null
	},
	{
		from: 25,
		to: 368,
		weight: -0.01065248803016039,
		gater: null
	},
	{
		from: 25,
		to: 369,
		weight: -0.08197900707677892,
		gater: null
	},
	{
		from: 25,
		to: 370,
		weight: 0.00812291874772883,
		gater: null
	},
	{
		from: 25,
		to: 371,
		weight: -0.01758875988888567,
		gater: null
	},
	{
		from: 25,
		to: 372,
		weight: -0.055142035930730374,
		gater: null
	},
	{
		from: 25,
		to: 373,
		weight: 0.039128134300215084,
		gater: null
	},
	{
		from: 25,
		to: 374,
		weight: -0.02380674150231879,
		gater: null
	},
	{
		from: 25,
		to: 375,
		weight: 0.07834693436426221,
		gater: null
	},
	{
		from: 25,
		to: 376,
		weight: 0.057991452013009426,
		gater: null
	},
	{
		from: 25,
		to: 377,
		weight: 0.03602399304531537,
		gater: null
	},
	{
		from: 25,
		to: 378,
		weight: 0.04116282910773833,
		gater: null
	},
	{
		from: 25,
		to: 379,
		weight: -0.0954495430612321,
		gater: null
	},
	{
		from: 26,
		to: 360,
		weight: 0.09651211254660672,
		gater: null
	},
	{
		from: 26,
		to: 361,
		weight: 0.054607395497410366,
		gater: null
	},
	{
		from: 26,
		to: 362,
		weight: -0.03145755663865617,
		gater: null
	},
	{
		from: 26,
		to: 363,
		weight: -0.07544788579417716,
		gater: null
	},
	{
		from: 26,
		to: 364,
		weight: 0.08494733731664425,
		gater: null
	},
	{
		from: 26,
		to: 365,
		weight: -0.05324726854074249,
		gater: null
	},
	{
		from: 26,
		to: 366,
		weight: -0.06316481536344476,
		gater: null
	},
	{
		from: 26,
		to: 367,
		weight: 0.0239466470922165,
		gater: null
	},
	{
		from: 26,
		to: 368,
		weight: 0.05782978235640304,
		gater: null
	},
	{
		from: 26,
		to: 369,
		weight: -0.05538163234035629,
		gater: null
	},
	{
		from: 26,
		to: 370,
		weight: 0.0006943188251430088,
		gater: null
	},
	{
		from: 26,
		to: 371,
		weight: -0.009342055170809618,
		gater: null
	},
	{
		from: 26,
		to: 372,
		weight: -0.0800872355247444,
		gater: null
	},
	{
		from: 26,
		to: 373,
		weight: 0.02112166756851637,
		gater: null
	},
	{
		from: 26,
		to: 374,
		weight: 0.08354765181413426,
		gater: null
	},
	{
		from: 26,
		to: 375,
		weight: 0.06126822199427667,
		gater: null
	},
	{
		from: 26,
		to: 376,
		weight: 0.0650013430433398,
		gater: null
	},
	{
		from: 26,
		to: 377,
		weight: -0.0963567493305201,
		gater: null
	},
	{
		from: 26,
		to: 378,
		weight: -0.0032538485707198223,
		gater: null
	},
	{
		from: 26,
		to: 379,
		weight: -0.011014389095900468,
		gater: null
	},
	{
		from: 27,
		to: 360,
		weight: -0.09052367146741465,
		gater: null
	},
	{
		from: 27,
		to: 361,
		weight: -0.0372627208510751,
		gater: null
	},
	{
		from: 27,
		to: 362,
		weight: -0.03968043359425155,
		gater: null
	},
	{
		from: 27,
		to: 363,
		weight: 0.02891307755844466,
		gater: null
	},
	{
		from: 27,
		to: 364,
		weight: 0.016383785227806674,
		gater: null
	},
	{
		from: 27,
		to: 365,
		weight: -0.08198899886148917,
		gater: null
	},
	{
		from: 27,
		to: 366,
		weight: 0.027494719473428464,
		gater: null
	},
	{
		from: 27,
		to: 367,
		weight: -0.03075043094802221,
		gater: null
	},
	{
		from: 27,
		to: 368,
		weight: 0.06633773150375574,
		gater: null
	},
	{
		from: 27,
		to: 369,
		weight: 0.06561497602426064,
		gater: null
	},
	{
		from: 27,
		to: 370,
		weight: -0.06922688015797102,
		gater: null
	},
	{
		from: 27,
		to: 371,
		weight: 0.026920850838701105,
		gater: null
	},
	{
		from: 27,
		to: 372,
		weight: -0.08872025830116943,
		gater: null
	},
	{
		from: 27,
		to: 373,
		weight: 0.0658273804849035,
		gater: null
	},
	{
		from: 27,
		to: 374,
		weight: 0.035146258130593466,
		gater: null
	},
	{
		from: 27,
		to: 375,
		weight: -0.048230261519149976,
		gater: null
	},
	{
		from: 27,
		to: 376,
		weight: 0.06034570395924482,
		gater: null
	},
	{
		from: 27,
		to: 377,
		weight: 0.03829887928889453,
		gater: null
	},
	{
		from: 27,
		to: 378,
		weight: -0.038459575943670554,
		gater: null
	},
	{
		from: 27,
		to: 379,
		weight: 0.03666024348760866,
		gater: null
	},
	{
		from: 28,
		to: 360,
		weight: -0.01462657307450313,
		gater: null
	},
	{
		from: 28,
		to: 361,
		weight: -0.02195845339175828,
		gater: null
	},
	{
		from: 28,
		to: 362,
		weight: 0.031407801741978186,
		gater: null
	},
	{
		from: 28,
		to: 363,
		weight: -0.09006978819742661,
		gater: null
	},
	{
		from: 28,
		to: 364,
		weight: 0.048092474334122365,
		gater: null
	},
	{
		from: 28,
		to: 365,
		weight: 0.08866582506571527,
		gater: null
	},
	{
		from: 28,
		to: 366,
		weight: 0.06167751385140216,
		gater: null
	},
	{
		from: 28,
		to: 367,
		weight: 0.015172223782465008,
		gater: null
	},
	{
		from: 28,
		to: 368,
		weight: -0.06312646035226033,
		gater: null
	},
	{
		from: 28,
		to: 369,
		weight: 0.02446088854161363,
		gater: null
	},
	{
		from: 28,
		to: 370,
		weight: -0.08675924842105474,
		gater: null
	},
	{
		from: 28,
		to: 371,
		weight: 0.04896671035259445,
		gater: null
	},
	{
		from: 28,
		to: 372,
		weight: 0.04556829812264801,
		gater: null
	},
	{
		from: 28,
		to: 373,
		weight: 0.004526962207074894,
		gater: null
	},
	{
		from: 28,
		to: 374,
		weight: -0.06221428780768839,
		gater: null
	},
	{
		from: 28,
		to: 375,
		weight: 0.0948737226238022,
		gater: null
	},
	{
		from: 28,
		to: 376,
		weight: 0.02258997504090221,
		gater: null
	},
	{
		from: 28,
		to: 377,
		weight: 0.059987761292306735,
		gater: null
	},
	{
		from: 28,
		to: 378,
		weight: -0.05769049306640786,
		gater: null
	},
	{
		from: 28,
		to: 379,
		weight: 0.046484093699054846,
		gater: null
	},
	{
		from: 29,
		to: 360,
		weight: 0.07198086033297818,
		gater: null
	},
	{
		from: 29,
		to: 361,
		weight: 0.01798483062795153,
		gater: null
	},
	{
		from: 29,
		to: 362,
		weight: -0.0651462841555523,
		gater: null
	},
	{
		from: 29,
		to: 363,
		weight: -0.008378163182312368,
		gater: null
	},
	{
		from: 29,
		to: 364,
		weight: 0.0979058199188601,
		gater: null
	},
	{
		from: 29,
		to: 365,
		weight: -0.08207010174593986,
		gater: null
	},
	{
		from: 29,
		to: 366,
		weight: -0.002346815832879795,
		gater: null
	},
	{
		from: 29,
		to: 367,
		weight: -0.026288437127074987,
		gater: null
	},
	{
		from: 29,
		to: 368,
		weight: 0.06538612365486426,
		gater: null
	},
	{
		from: 29,
		to: 369,
		weight: -0.01195111325494258,
		gater: null
	},
	{
		from: 29,
		to: 370,
		weight: -0.09473562346201247,
		gater: null
	},
	{
		from: 29,
		to: 371,
		weight: 0.08681635517818834,
		gater: null
	},
	{
		from: 29,
		to: 372,
		weight: -0.02149065675559632,
		gater: null
	},
	{
		from: 29,
		to: 373,
		weight: -0.05599072572077582,
		gater: null
	},
	{
		from: 29,
		to: 374,
		weight: 0.04206065214242383,
		gater: null
	},
	{
		from: 29,
		to: 375,
		weight: -0.05688360359158051,
		gater: null
	},
	{
		from: 29,
		to: 376,
		weight: 0.0860959685528607,
		gater: null
	},
	{
		from: 29,
		to: 377,
		weight: -0.0030639584442466727,
		gater: null
	},
	{
		from: 29,
		to: 378,
		weight: -0.0772633653986346,
		gater: null
	},
	{
		from: 29,
		to: 379,
		weight: -0.05549205324312996,
		gater: null
	},
	{
		from: 30,
		to: 360,
		weight: 0.08418067235631285,
		gater: null
	},
	{
		from: 30,
		to: 361,
		weight: 0.03577964057136382,
		gater: null
	},
	{
		from: 30,
		to: 362,
		weight: -0.09266818252214636,
		gater: null
	},
	{
		from: 30,
		to: 363,
		weight: 0.06140972277626777,
		gater: null
	},
	{
		from: 30,
		to: 364,
		weight: -0.04206057886273902,
		gater: null
	},
	{
		from: 30,
		to: 365,
		weight: -0.029365160591001874,
		gater: null
	},
	{
		from: 30,
		to: 366,
		weight: -0.017264356524042096,
		gater: null
	},
	{
		from: 30,
		to: 367,
		weight: 0.06449156398974365,
		gater: null
	},
	{
		from: 30,
		to: 368,
		weight: -0.07098680079165756,
		gater: null
	},
	{
		from: 30,
		to: 369,
		weight: -0.07063867489518816,
		gater: null
	},
	{
		from: 30,
		to: 370,
		weight: -0.057635400505866,
		gater: null
	},
	{
		from: 30,
		to: 371,
		weight: -0.07213908962024546,
		gater: null
	},
	{
		from: 30,
		to: 372,
		weight: -0.07302235138540412,
		gater: null
	},
	{
		from: 30,
		to: 373,
		weight: -0.04692383298001173,
		gater: null
	},
	{
		from: 30,
		to: 374,
		weight: -0.01344451445727221,
		gater: null
	},
	{
		from: 30,
		to: 375,
		weight: -0.0314740435861474,
		gater: null
	},
	{
		from: 30,
		to: 376,
		weight: -0.07677604299815047,
		gater: null
	},
	{
		from: 30,
		to: 377,
		weight: 0.0669158505120718,
		gater: null
	},
	{
		from: 30,
		to: 378,
		weight: -0.0478320715172198,
		gater: null
	},
	{
		from: 30,
		to: 379,
		weight: 0.03669028773115984,
		gater: null
	},
	{
		from: 31,
		to: 360,
		weight: -0.017732048385267346,
		gater: null
	},
	{
		from: 31,
		to: 361,
		weight: -0.08870018032929963,
		gater: null
	},
	{
		from: 31,
		to: 362,
		weight: -0.036061801270758226,
		gater: null
	},
	{
		from: 31,
		to: 363,
		weight: 0.025274506300456523,
		gater: null
	},
	{
		from: 31,
		to: 364,
		weight: 0.03461254547440115,
		gater: null
	},
	{
		from: 31,
		to: 365,
		weight: 0.0758075035598548,
		gater: null
	},
	{
		from: 31,
		to: 366,
		weight: -0.09936604337963165,
		gater: null
	},
	{
		from: 31,
		to: 367,
		weight: 0.041660275471349706,
		gater: null
	},
	{
		from: 31,
		to: 368,
		weight: -0.09536047931349434,
		gater: null
	},
	{
		from: 31,
		to: 369,
		weight: 0.03847003970576965,
		gater: null
	},
	{
		from: 31,
		to: 370,
		weight: 0.03849131823872201,
		gater: null
	},
	{
		from: 31,
		to: 371,
		weight: -0.023045026954562606,
		gater: null
	},
	{
		from: 31,
		to: 372,
		weight: -0.003440706577834976,
		gater: null
	},
	{
		from: 31,
		to: 373,
		weight: 0.03543735535237569,
		gater: null
	},
	{
		from: 31,
		to: 374,
		weight: 0.005956331982149662,
		gater: null
	},
	{
		from: 31,
		to: 375,
		weight: -0.018946204968154357,
		gater: null
	},
	{
		from: 31,
		to: 376,
		weight: -0.06460248080845407,
		gater: null
	},
	{
		from: 31,
		to: 377,
		weight: 0.06252351626959532,
		gater: null
	},
	{
		from: 31,
		to: 378,
		weight: -0.05215922234894981,
		gater: null
	},
	{
		from: 31,
		to: 379,
		weight: -0.06336308140174238,
		gater: null
	},
	{
		from: 32,
		to: 360,
		weight: -0.03532387340023253,
		gater: null
	},
	{
		from: 32,
		to: 361,
		weight: 0.0921662762795182,
		gater: null
	},
	{
		from: 32,
		to: 362,
		weight: 0.07052150222789386,
		gater: null
	},
	{
		from: 32,
		to: 363,
		weight: -0.05240446693277874,
		gater: null
	},
	{
		from: 32,
		to: 364,
		weight: 0.07336052635830265,
		gater: null
	},
	{
		from: 32,
		to: 365,
		weight: 0.0979206832893528,
		gater: null
	},
	{
		from: 32,
		to: 366,
		weight: -0.023267227376904925,
		gater: null
	},
	{
		from: 32,
		to: 367,
		weight: 0.032382321160008415,
		gater: null
	},
	{
		from: 32,
		to: 368,
		weight: 0.037558643142207165,
		gater: null
	},
	{
		from: 32,
		to: 369,
		weight: -0.02134765103665459,
		gater: null
	},
	{
		from: 32,
		to: 370,
		weight: -0.07512801838288233,
		gater: null
	},
	{
		from: 32,
		to: 371,
		weight: -0.04560116617328922,
		gater: null
	},
	{
		from: 32,
		to: 372,
		weight: 0.010128273780138558,
		gater: null
	},
	{
		from: 32,
		to: 373,
		weight: 0.0952578622682633,
		gater: null
	},
	{
		from: 32,
		to: 374,
		weight: 0.019687030865911392,
		gater: null
	},
	{
		from: 32,
		to: 375,
		weight: -0.056829402075866134,
		gater: null
	},
	{
		from: 32,
		to: 376,
		weight: 0.0663140114941323,
		gater: null
	},
	{
		from: 32,
		to: 377,
		weight: 0.00964481718186061,
		gater: null
	},
	{
		from: 32,
		to: 378,
		weight: 0.06712141337914643,
		gater: null
	},
	{
		from: 32,
		to: 379,
		weight: -0.05176615519293795,
		gater: null
	},
	{
		from: 33,
		to: 360,
		weight: -0.042068884602767524,
		gater: null
	},
	{
		from: 33,
		to: 361,
		weight: 0.08328115606823064,
		gater: null
	},
	{
		from: 33,
		to: 362,
		weight: -0.09425202383950544,
		gater: null
	},
	{
		from: 33,
		to: 363,
		weight: 0.04588001702823283,
		gater: null
	},
	{
		from: 33,
		to: 364,
		weight: -0.08399402160163305,
		gater: null
	},
	{
		from: 33,
		to: 365,
		weight: 0.012387297422135957,
		gater: null
	},
	{
		from: 33,
		to: 366,
		weight: 0.06234573861610623,
		gater: null
	},
	{
		from: 33,
		to: 367,
		weight: -0.05953018178881058,
		gater: null
	},
	{
		from: 33,
		to: 368,
		weight: -0.04655564144992477,
		gater: null
	},
	{
		from: 33,
		to: 369,
		weight: -0.06306466166085847,
		gater: null
	},
	{
		from: 33,
		to: 370,
		weight: -0.08373321602274181,
		gater: null
	},
	{
		from: 33,
		to: 371,
		weight: -0.03287488442075341,
		gater: null
	},
	{
		from: 33,
		to: 372,
		weight: 0.045824299991186146,
		gater: null
	},
	{
		from: 33,
		to: 373,
		weight: -0.09101781308034998,
		gater: null
	},
	{
		from: 33,
		to: 374,
		weight: -0.0128823871575586,
		gater: null
	},
	{
		from: 33,
		to: 375,
		weight: 0.09026171106923853,
		gater: null
	},
	{
		from: 33,
		to: 376,
		weight: -0.08796723946996568,
		gater: null
	},
	{
		from: 33,
		to: 377,
		weight: -0.05989692168001786,
		gater: null
	},
	{
		from: 33,
		to: 378,
		weight: -0.060945915488214465,
		gater: null
	},
	{
		from: 33,
		to: 379,
		weight: 0.09335622790950554,
		gater: null
	},
	{
		from: 34,
		to: 360,
		weight: -0.029518712465463587,
		gater: null
	},
	{
		from: 34,
		to: 361,
		weight: -0.005788446808604866,
		gater: null
	},
	{
		from: 34,
		to: 362,
		weight: 0.08620316550955706,
		gater: null
	},
	{
		from: 34,
		to: 363,
		weight: -0.08525865978102948,
		gater: null
	},
	{
		from: 34,
		to: 364,
		weight: -0.06607499171026698,
		gater: null
	},
	{
		from: 34,
		to: 365,
		weight: 0.05648744962156607,
		gater: null
	},
	{
		from: 34,
		to: 366,
		weight: -0.07144810156291542,
		gater: null
	},
	{
		from: 34,
		to: 367,
		weight: -0.03794572307622568,
		gater: null
	},
	{
		from: 34,
		to: 368,
		weight: -0.005956740044074982,
		gater: null
	},
	{
		from: 34,
		to: 369,
		weight: -0.04314930680297029,
		gater: null
	},
	{
		from: 34,
		to: 370,
		weight: 0.037004962737921365,
		gater: null
	},
	{
		from: 34,
		to: 371,
		weight: -0.04453971722612718,
		gater: null
	},
	{
		from: 34,
		to: 372,
		weight: -0.09180056642976325,
		gater: null
	},
	{
		from: 34,
		to: 373,
		weight: 0.09712688209816336,
		gater: null
	},
	{
		from: 34,
		to: 374,
		weight: -0.08474908175781644,
		gater: null
	},
	{
		from: 34,
		to: 375,
		weight: 0.059627024796400335,
		gater: null
	},
	{
		from: 34,
		to: 376,
		weight: -0.08341327710541435,
		gater: null
	},
	{
		from: 34,
		to: 377,
		weight: -0.055423809415976244,
		gater: null
	},
	{
		from: 34,
		to: 378,
		weight: -0.09189432442861092,
		gater: null
	},
	{
		from: 34,
		to: 379,
		weight: -0.054276240555759664,
		gater: null
	},
	{
		from: 35,
		to: 360,
		weight: 0.03216852009268295,
		gater: null
	},
	{
		from: 35,
		to: 361,
		weight: 0.010768035023526495,
		gater: null
	},
	{
		from: 35,
		to: 362,
		weight: 0.04908597767987341,
		gater: null
	},
	{
		from: 35,
		to: 363,
		weight: -0.007311862490472443,
		gater: null
	},
	{
		from: 35,
		to: 364,
		weight: -0.058189332983751285,
		gater: null
	},
	{
		from: 35,
		to: 365,
		weight: -0.07556849444670335,
		gater: null
	},
	{
		from: 35,
		to: 366,
		weight: 0.0025444437827437244,
		gater: null
	},
	{
		from: 35,
		to: 367,
		weight: 0.07031878415461024,
		gater: null
	},
	{
		from: 35,
		to: 368,
		weight: 0.034238393970605296,
		gater: null
	},
	{
		from: 35,
		to: 369,
		weight: 0.05827794324298968,
		gater: null
	},
	{
		from: 35,
		to: 370,
		weight: -0.08409256765599525,
		gater: null
	},
	{
		from: 35,
		to: 371,
		weight: 0.023181731956247467,
		gater: null
	},
	{
		from: 35,
		to: 372,
		weight: 0.018546180661752926,
		gater: null
	},
	{
		from: 35,
		to: 373,
		weight: -0.09349545993466513,
		gater: null
	},
	{
		from: 35,
		to: 374,
		weight: -0.058202177034530546,
		gater: null
	},
	{
		from: 35,
		to: 375,
		weight: 0.008273950333431479,
		gater: null
	},
	{
		from: 35,
		to: 376,
		weight: -0.05693187427966256,
		gater: null
	},
	{
		from: 35,
		to: 377,
		weight: -0.046395740985120254,
		gater: null
	},
	{
		from: 35,
		to: 378,
		weight: 0.027651559320350516,
		gater: null
	},
	{
		from: 35,
		to: 379,
		weight: -0.08708731992923063,
		gater: null
	},
	{
		from: 36,
		to: 360,
		weight: 0.023399464948211435,
		gater: null
	},
	{
		from: 36,
		to: 361,
		weight: -0.004480342193125653,
		gater: null
	},
	{
		from: 36,
		to: 362,
		weight: -0.04232317092356222,
		gater: null
	},
	{
		from: 36,
		to: 363,
		weight: -0.0747033698949688,
		gater: null
	},
	{
		from: 36,
		to: 364,
		weight: -0.04056433349438691,
		gater: null
	},
	{
		from: 36,
		to: 365,
		weight: 0.0673578551352152,
		gater: null
	},
	{
		from: 36,
		to: 366,
		weight: -0.04747020372662143,
		gater: null
	},
	{
		from: 36,
		to: 367,
		weight: 0.0930649751851663,
		gater: null
	},
	{
		from: 36,
		to: 368,
		weight: -0.07889071189869382,
		gater: null
	},
	{
		from: 36,
		to: 369,
		weight: 0.06580831551313532,
		gater: null
	},
	{
		from: 36,
		to: 370,
		weight: -0.04549202595782678,
		gater: null
	},
	{
		from: 36,
		to: 371,
		weight: 0.012461986761105506,
		gater: null
	},
	{
		from: 36,
		to: 372,
		weight: 0.08278194928646562,
		gater: null
	},
	{
		from: 36,
		to: 373,
		weight: -0.026206135944956313,
		gater: null
	},
	{
		from: 36,
		to: 374,
		weight: 0.04482401104313047,
		gater: null
	},
	{
		from: 36,
		to: 375,
		weight: 0.05327863774226707,
		gater: null
	},
	{
		from: 36,
		to: 376,
		weight: -0.03553669227369709,
		gater: null
	},
	{
		from: 36,
		to: 377,
		weight: 0.0013551460761381112,
		gater: null
	},
	{
		from: 36,
		to: 378,
		weight: 0.06521452416561146,
		gater: null
	},
	{
		from: 36,
		to: 379,
		weight: -0.0459435476549154,
		gater: null
	},
	{
		from: 37,
		to: 360,
		weight: -0.030360398311408646,
		gater: null
	},
	{
		from: 37,
		to: 361,
		weight: 0.029440005705325678,
		gater: null
	},
	{
		from: 37,
		to: 362,
		weight: -0.07530016440797534,
		gater: null
	},
	{
		from: 37,
		to: 363,
		weight: -0.0023546698521187126,
		gater: null
	},
	{
		from: 37,
		to: 364,
		weight: 0.06412459827838055,
		gater: null
	},
	{
		from: 37,
		to: 365,
		weight: -0.08614146017163433,
		gater: null
	},
	{
		from: 37,
		to: 366,
		weight: 0.0592558052514692,
		gater: null
	},
	{
		from: 37,
		to: 367,
		weight: -0.0556294798429021,
		gater: null
	},
	{
		from: 37,
		to: 368,
		weight: -0.020934058327702593,
		gater: null
	},
	{
		from: 37,
		to: 369,
		weight: -0.012806361842125288,
		gater: null
	},
	{
		from: 37,
		to: 370,
		weight: -0.03402258525468689,
		gater: null
	},
	{
		from: 37,
		to: 371,
		weight: -0.007949982536265665,
		gater: null
	},
	{
		from: 37,
		to: 372,
		weight: -0.09102908717132517,
		gater: null
	},
	{
		from: 37,
		to: 373,
		weight: 0.07905828210237939,
		gater: null
	},
	{
		from: 37,
		to: 374,
		weight: -0.022012125327366808,
		gater: null
	},
	{
		from: 37,
		to: 375,
		weight: -0.05781600797588729,
		gater: null
	},
	{
		from: 37,
		to: 376,
		weight: 0.03502725675172341,
		gater: null
	},
	{
		from: 37,
		to: 377,
		weight: -0.03675271231716373,
		gater: null
	},
	{
		from: 37,
		to: 378,
		weight: -0.05674086686888966,
		gater: null
	},
	{
		from: 37,
		to: 379,
		weight: 0.09213358892019727,
		gater: null
	},
	{
		from: 38,
		to: 360,
		weight: 0.0530740974990076,
		gater: null
	},
	{
		from: 38,
		to: 361,
		weight: 0.021996050122756697,
		gater: null
	},
	{
		from: 38,
		to: 362,
		weight: 0.08280971438831372,
		gater: null
	},
	{
		from: 38,
		to: 363,
		weight: 0.04663135256691042,
		gater: null
	},
	{
		from: 38,
		to: 364,
		weight: -0.039096199129425774,
		gater: null
	},
	{
		from: 38,
		to: 365,
		weight: 0.023586078690535833,
		gater: null
	},
	{
		from: 38,
		to: 366,
		weight: 0.08792429291773099,
		gater: null
	},
	{
		from: 38,
		to: 367,
		weight: -0.07018727534198868,
		gater: null
	},
	{
		from: 38,
		to: 368,
		weight: 0.062104430575741054,
		gater: null
	},
	{
		from: 38,
		to: 369,
		weight: 0.0195909970584673,
		gater: null
	},
	{
		from: 38,
		to: 370,
		weight: 0.0979149957601114,
		gater: null
	},
	{
		from: 38,
		to: 371,
		weight: 0.0018020364864312077,
		gater: null
	},
	{
		from: 38,
		to: 372,
		weight: -0.007886455793757505,
		gater: null
	},
	{
		from: 38,
		to: 373,
		weight: -0.03780263407538618,
		gater: null
	},
	{
		from: 38,
		to: 374,
		weight: -0.08542836491036523,
		gater: null
	},
	{
		from: 38,
		to: 375,
		weight: 0.021952147194838775,
		gater: null
	},
	{
		from: 38,
		to: 376,
		weight: 0.006423473040264097,
		gater: null
	},
	{
		from: 38,
		to: 377,
		weight: 0.012642440105215508,
		gater: null
	},
	{
		from: 38,
		to: 378,
		weight: -0.00995358019233708,
		gater: null
	},
	{
		from: 38,
		to: 379,
		weight: -0.07886593009673404,
		gater: null
	},
	{
		from: 39,
		to: 360,
		weight: 0.0830138381101774,
		gater: null
	},
	{
		from: 39,
		to: 361,
		weight: 0.08664193384977109,
		gater: null
	},
	{
		from: 39,
		to: 362,
		weight: -0.04328833255994083,
		gater: null
	},
	{
		from: 39,
		to: 363,
		weight: -0.018277714911678136,
		gater: null
	},
	{
		from: 39,
		to: 364,
		weight: 0.006498108265723751,
		gater: null
	},
	{
		from: 39,
		to: 365,
		weight: 0.03179616997583695,
		gater: null
	},
	{
		from: 39,
		to: 366,
		weight: 0.023615634395390425,
		gater: null
	},
	{
		from: 39,
		to: 367,
		weight: 0.007801834444709138,
		gater: null
	},
	{
		from: 39,
		to: 368,
		weight: 0.021062044414432712,
		gater: null
	},
	{
		from: 39,
		to: 369,
		weight: 0.09412402695866709,
		gater: null
	},
	{
		from: 39,
		to: 370,
		weight: -0.09989947319978612,
		gater: null
	},
	{
		from: 39,
		to: 371,
		weight: 0.013429414423970082,
		gater: null
	},
	{
		from: 39,
		to: 372,
		weight: -0.030829853444475266,
		gater: null
	},
	{
		from: 39,
		to: 373,
		weight: -0.046342360721971246,
		gater: null
	},
	{
		from: 39,
		to: 374,
		weight: 0.05939455326168072,
		gater: null
	},
	{
		from: 39,
		to: 375,
		weight: -0.026714580546127478,
		gater: null
	},
	{
		from: 39,
		to: 376,
		weight: -0.05798058246387701,
		gater: null
	},
	{
		from: 39,
		to: 377,
		weight: -0.01262014517014283,
		gater: null
	},
	{
		from: 39,
		to: 378,
		weight: 0.056624248579065534,
		gater: null
	},
	{
		from: 39,
		to: 379,
		weight: 0.03933748313859686,
		gater: null
	},
	{
		from: 40,
		to: 360,
		weight: -0.06789802866394043,
		gater: null
	},
	{
		from: 40,
		to: 361,
		weight: 0.04794183645433758,
		gater: null
	},
	{
		from: 40,
		to: 362,
		weight: -0.010390374105925831,
		gater: null
	},
	{
		from: 40,
		to: 363,
		weight: 0.009143860052995084,
		gater: null
	},
	{
		from: 40,
		to: 364,
		weight: 0.015370547479037017,
		gater: null
	},
	{
		from: 40,
		to: 365,
		weight: -0.09628474920918868,
		gater: null
	},
	{
		from: 40,
		to: 366,
		weight: -0.012728428592891514,
		gater: null
	},
	{
		from: 40,
		to: 367,
		weight: -0.09431720549210812,
		gater: null
	},
	{
		from: 40,
		to: 368,
		weight: -0.06353448434023573,
		gater: null
	},
	{
		from: 40,
		to: 369,
		weight: -0.06986548904246721,
		gater: null
	},
	{
		from: 40,
		to: 370,
		weight: 0.07403255272574608,
		gater: null
	},
	{
		from: 40,
		to: 371,
		weight: -0.06964499199572245,
		gater: null
	},
	{
		from: 40,
		to: 372,
		weight: 0.04035787310756933,
		gater: null
	},
	{
		from: 40,
		to: 373,
		weight: -0.019738808233260977,
		gater: null
	},
	{
		from: 40,
		to: 374,
		weight: 0.07134480549837613,
		gater: null
	},
	{
		from: 40,
		to: 375,
		weight: 0.017123416241193207,
		gater: null
	},
	{
		from: 40,
		to: 376,
		weight: -0.0908540259108007,
		gater: null
	},
	{
		from: 40,
		to: 377,
		weight: -0.036450424359809386,
		gater: null
	},
	{
		from: 40,
		to: 378,
		weight: -0.08039000458389922,
		gater: null
	},
	{
		from: 40,
		to: 379,
		weight: -0.007713147245984639,
		gater: null
	},
	{
		from: 41,
		to: 360,
		weight: -0.04846029060114261,
		gater: null
	},
	{
		from: 41,
		to: 361,
		weight: -0.011126891122432439,
		gater: null
	},
	{
		from: 41,
		to: 362,
		weight: -0.04944231415435621,
		gater: null
	},
	{
		from: 41,
		to: 363,
		weight: 0.03707686943031563,
		gater: null
	},
	{
		from: 41,
		to: 364,
		weight: -0.08794762144476592,
		gater: null
	},
	{
		from: 41,
		to: 365,
		weight: 0.09788732830172342,
		gater: null
	},
	{
		from: 41,
		to: 366,
		weight: -0.0429572908943205,
		gater: null
	},
	{
		from: 41,
		to: 367,
		weight: -0.026126722593677834,
		gater: null
	},
	{
		from: 41,
		to: 368,
		weight: 0.06320638115737642,
		gater: null
	},
	{
		from: 41,
		to: 369,
		weight: 0.05469437376580452,
		gater: null
	},
	{
		from: 41,
		to: 370,
		weight: -0.07597188211838449,
		gater: null
	},
	{
		from: 41,
		to: 371,
		weight: 0.09260565403336271,
		gater: null
	},
	{
		from: 41,
		to: 372,
		weight: 0.027339655788422318,
		gater: null
	},
	{
		from: 41,
		to: 373,
		weight: 0.06798064253107558,
		gater: null
	},
	{
		from: 41,
		to: 374,
		weight: 0.009331043992872573,
		gater: null
	},
	{
		from: 41,
		to: 375,
		weight: 0.02988159511170832,
		gater: null
	},
	{
		from: 41,
		to: 376,
		weight: -0.07466714323611355,
		gater: null
	},
	{
		from: 41,
		to: 377,
		weight: 0.05734795168631157,
		gater: null
	},
	{
		from: 41,
		to: 378,
		weight: 0.09827481740446534,
		gater: null
	},
	{
		from: 41,
		to: 379,
		weight: -0.07507683991914607,
		gater: null
	},
	{
		from: 42,
		to: 360,
		weight: -0.0028847598194563506,
		gater: null
	},
	{
		from: 42,
		to: 361,
		weight: -0.06911319937284405,
		gater: null
	},
	{
		from: 42,
		to: 362,
		weight: -0.004174185980738529,
		gater: null
	},
	{
		from: 42,
		to: 363,
		weight: -0.07470104237792691,
		gater: null
	},
	{
		from: 42,
		to: 364,
		weight: -0.09259421445317857,
		gater: null
	},
	{
		from: 42,
		to: 365,
		weight: -0.09890869537355869,
		gater: null
	},
	{
		from: 42,
		to: 366,
		weight: 0.06973321508129324,
		gater: null
	},
	{
		from: 42,
		to: 367,
		weight: -0.056428054208692215,
		gater: null
	},
	{
		from: 42,
		to: 368,
		weight: -0.045650717078596206,
		gater: null
	},
	{
		from: 42,
		to: 369,
		weight: -0.06312190695748328,
		gater: null
	},
	{
		from: 42,
		to: 370,
		weight: -0.01938463375147567,
		gater: null
	},
	{
		from: 42,
		to: 371,
		weight: 0.03398986956161795,
		gater: null
	},
	{
		from: 42,
		to: 372,
		weight: -0.056093287857838625,
		gater: null
	},
	{
		from: 42,
		to: 373,
		weight: 0.0019878164699784345,
		gater: null
	},
	{
		from: 42,
		to: 374,
		weight: 0.08262330006026083,
		gater: null
	},
	{
		from: 42,
		to: 375,
		weight: 0.06213663344674539,
		gater: null
	},
	{
		from: 42,
		to: 376,
		weight: -0.0736195759715736,
		gater: null
	},
	{
		from: 42,
		to: 377,
		weight: 0.02869086723903519,
		gater: null
	},
	{
		from: 42,
		to: 378,
		weight: -0.02556188338564773,
		gater: null
	},
	{
		from: 42,
		to: 379,
		weight: -0.06571464255029791,
		gater: null
	},
	{
		from: 43,
		to: 360,
		weight: 0.09029025846073169,
		gater: null
	},
	{
		from: 43,
		to: 361,
		weight: 0.03419971290532825,
		gater: null
	},
	{
		from: 43,
		to: 362,
		weight: -0.010565381909787869,
		gater: null
	},
	{
		from: 43,
		to: 363,
		weight: -0.057931171201060484,
		gater: null
	},
	{
		from: 43,
		to: 364,
		weight: 0.05314056671593295,
		gater: null
	},
	{
		from: 43,
		to: 365,
		weight: -0.04837971382790061,
		gater: null
	},
	{
		from: 43,
		to: 366,
		weight: -0.0038559911843973893,
		gater: null
	},
	{
		from: 43,
		to: 367,
		weight: -0.09762646666135627,
		gater: null
	},
	{
		from: 43,
		to: 368,
		weight: 0.07859400800417035,
		gater: null
	},
	{
		from: 43,
		to: 369,
		weight: 0.07247617181046612,
		gater: null
	},
	{
		from: 43,
		to: 370,
		weight: -0.07123676404656494,
		gater: null
	},
	{
		from: 43,
		to: 371,
		weight: 0.07172476314121701,
		gater: null
	},
	{
		from: 43,
		to: 372,
		weight: -0.015050881373293953,
		gater: null
	},
	{
		from: 43,
		to: 373,
		weight: -0.09029780671910204,
		gater: null
	},
	{
		from: 43,
		to: 374,
		weight: 0.0005343156185872167,
		gater: null
	},
	{
		from: 43,
		to: 375,
		weight: -0.09033486026179323,
		gater: null
	},
	{
		from: 43,
		to: 376,
		weight: -0.002883960891230733,
		gater: null
	},
	{
		from: 43,
		to: 377,
		weight: -0.0744779044718123,
		gater: null
	},
	{
		from: 43,
		to: 378,
		weight: 0.028456830734398697,
		gater: null
	},
	{
		from: 43,
		to: 379,
		weight: 0.08665853907115531,
		gater: null
	},
	{
		from: 44,
		to: 360,
		weight: 0.08945043915534603,
		gater: null
	},
	{
		from: 44,
		to: 361,
		weight: 0.04167919612103099,
		gater: null
	},
	{
		from: 44,
		to: 362,
		weight: 0.04304208870021514,
		gater: null
	},
	{
		from: 44,
		to: 363,
		weight: 0.05264703634750903,
		gater: null
	},
	{
		from: 44,
		to: 364,
		weight: 0.02764073264380662,
		gater: null
	},
	{
		from: 44,
		to: 365,
		weight: -0.07480266674372055,
		gater: null
	},
	{
		from: 44,
		to: 366,
		weight: -0.001955413970723144,
		gater: null
	},
	{
		from: 44,
		to: 367,
		weight: 0.03192076268551386,
		gater: null
	},
	{
		from: 44,
		to: 368,
		weight: 0.059684911584482386,
		gater: null
	},
	{
		from: 44,
		to: 369,
		weight: -0.0636903535892996,
		gater: null
	},
	{
		from: 44,
		to: 370,
		weight: -0.030555251188837576,
		gater: null
	},
	{
		from: 44,
		to: 371,
		weight: 0.08710669908244287,
		gater: null
	},
	{
		from: 44,
		to: 372,
		weight: -0.08496264241466056,
		gater: null
	},
	{
		from: 44,
		to: 373,
		weight: -0.004973597290997139,
		gater: null
	},
	{
		from: 44,
		to: 374,
		weight: 0.06431907546827054,
		gater: null
	},
	{
		from: 44,
		to: 375,
		weight: 0.02976440352306109,
		gater: null
	},
	{
		from: 44,
		to: 376,
		weight: -0.007267912155597994,
		gater: null
	},
	{
		from: 44,
		to: 377,
		weight: -0.019056854356623715,
		gater: null
	},
	{
		from: 44,
		to: 378,
		weight: 0.012870779437532717,
		gater: null
	},
	{
		from: 44,
		to: 379,
		weight: 0.012085594578177705,
		gater: null
	},
	{
		from: 45,
		to: 360,
		weight: 0.0060773247390064206,
		gater: null
	},
	{
		from: 45,
		to: 361,
		weight: 0.016110786920520592,
		gater: null
	},
	{
		from: 45,
		to: 362,
		weight: -0.047218985068688824,
		gater: null
	},
	{
		from: 45,
		to: 363,
		weight: -0.0869519321843602,
		gater: null
	},
	{
		from: 45,
		to: 364,
		weight: 0.0620377056226977,
		gater: null
	},
	{
		from: 45,
		to: 365,
		weight: 0.08113782053821081,
		gater: null
	},
	{
		from: 45,
		to: 366,
		weight: -0.022411890712566954,
		gater: null
	},
	{
		from: 45,
		to: 367,
		weight: 0.0832845767576916,
		gater: null
	},
	{
		from: 45,
		to: 368,
		weight: 0.07900777694456212,
		gater: null
	},
	{
		from: 45,
		to: 369,
		weight: -0.019187800633982816,
		gater: null
	},
	{
		from: 45,
		to: 370,
		weight: 0.05274139067391678,
		gater: null
	},
	{
		from: 45,
		to: 371,
		weight: -0.0810528790918471,
		gater: null
	},
	{
		from: 45,
		to: 372,
		weight: 0.09807714582990057,
		gater: null
	},
	{
		from: 45,
		to: 373,
		weight: -0.05124422078145905,
		gater: null
	},
	{
		from: 45,
		to: 374,
		weight: -0.02146596015679854,
		gater: null
	},
	{
		from: 45,
		to: 375,
		weight: -0.08969682751202357,
		gater: null
	},
	{
		from: 45,
		to: 376,
		weight: 0.02071864486967305,
		gater: null
	},
	{
		from: 45,
		to: 377,
		weight: -0.022981472383467816,
		gater: null
	},
	{
		from: 45,
		to: 378,
		weight: 0.0311430422783138,
		gater: null
	},
	{
		from: 45,
		to: 379,
		weight: -0.08419376741072476,
		gater: null
	},
	{
		from: 46,
		to: 360,
		weight: 0.053798004451845044,
		gater: null
	},
	{
		from: 46,
		to: 361,
		weight: 0.018387963988626452,
		gater: null
	},
	{
		from: 46,
		to: 362,
		weight: -0.00133898417233147,
		gater: null
	},
	{
		from: 46,
		to: 363,
		weight: 0.0836577177493576,
		gater: null
	},
	{
		from: 46,
		to: 364,
		weight: -0.08450492506689972,
		gater: null
	},
	{
		from: 46,
		to: 365,
		weight: -0.018534427858927227,
		gater: null
	},
	{
		from: 46,
		to: 366,
		weight: 0.004707793853345563,
		gater: null
	},
	{
		from: 46,
		to: 367,
		weight: 0.0617626535448593,
		gater: null
	},
	{
		from: 46,
		to: 368,
		weight: -0.0015197205188904606,
		gater: null
	},
	{
		from: 46,
		to: 369,
		weight: 0.07976207219823231,
		gater: null
	},
	{
		from: 46,
		to: 370,
		weight: 0.07770494217423632,
		gater: null
	},
	{
		from: 46,
		to: 371,
		weight: -0.08773041233281559,
		gater: null
	},
	{
		from: 46,
		to: 372,
		weight: 0.09316799188701852,
		gater: null
	},
	{
		from: 46,
		to: 373,
		weight: -0.059031568212197266,
		gater: null
	},
	{
		from: 46,
		to: 374,
		weight: -0.001674097985566364,
		gater: null
	},
	{
		from: 46,
		to: 375,
		weight: 0.010699694620982608,
		gater: null
	},
	{
		from: 46,
		to: 376,
		weight: -0.027014432257847873,
		gater: null
	},
	{
		from: 46,
		to: 377,
		weight: 0.049830301153750256,
		gater: null
	},
	{
		from: 46,
		to: 378,
		weight: -0.08592532148079456,
		gater: null
	},
	{
		from: 46,
		to: 379,
		weight: 0.0022148055892623475,
		gater: null
	},
	{
		from: 47,
		to: 360,
		weight: -0.07445530194093478,
		gater: null
	},
	{
		from: 47,
		to: 361,
		weight: 0.06505171697281079,
		gater: null
	},
	{
		from: 47,
		to: 362,
		weight: -0.012331608623753973,
		gater: null
	},
	{
		from: 47,
		to: 363,
		weight: -0.007920237284672282,
		gater: null
	},
	{
		from: 47,
		to: 364,
		weight: -0.007310618129430055,
		gater: null
	},
	{
		from: 47,
		to: 365,
		weight: -0.049853235199250494,
		gater: null
	},
	{
		from: 47,
		to: 366,
		weight: 0.04120941424766067,
		gater: null
	},
	{
		from: 47,
		to: 367,
		weight: 0.006481610813224445,
		gater: null
	},
	{
		from: 47,
		to: 368,
		weight: 0.06548249782992607,
		gater: null
	},
	{
		from: 47,
		to: 369,
		weight: 0.05658179586039744,
		gater: null
	},
	{
		from: 47,
		to: 370,
		weight: -0.02656327349961965,
		gater: null
	},
	{
		from: 47,
		to: 371,
		weight: -0.06173230033634272,
		gater: null
	},
	{
		from: 47,
		to: 372,
		weight: 0.0040605638365572155,
		gater: null
	},
	{
		from: 47,
		to: 373,
		weight: 0.05825627968812466,
		gater: null
	},
	{
		from: 47,
		to: 374,
		weight: 0.08484971155204396,
		gater: null
	},
	{
		from: 47,
		to: 375,
		weight: 0.01354052825968037,
		gater: null
	},
	{
		from: 47,
		to: 376,
		weight: -0.03679696518868024,
		gater: null
	},
	{
		from: 47,
		to: 377,
		weight: 0.03755355349215034,
		gater: null
	},
	{
		from: 47,
		to: 378,
		weight: 0.0924906177596013,
		gater: null
	},
	{
		from: 47,
		to: 379,
		weight: -0.03641366887011292,
		gater: null
	},
	{
		from: 48,
		to: 360,
		weight: 0.017029935858697345,
		gater: null
	},
	{
		from: 48,
		to: 361,
		weight: -0.05912640232588928,
		gater: null
	},
	{
		from: 48,
		to: 362,
		weight: 0.060132428285564504,
		gater: null
	},
	{
		from: 48,
		to: 363,
		weight: -0.03212926931609994,
		gater: null
	},
	{
		from: 48,
		to: 364,
		weight: 0.0538797909662804,
		gater: null
	},
	{
		from: 48,
		to: 365,
		weight: -0.07341534365206633,
		gater: null
	},
	{
		from: 48,
		to: 366,
		weight: -0.07881805273673903,
		gater: null
	},
	{
		from: 48,
		to: 367,
		weight: 0.010276810786419552,
		gater: null
	},
	{
		from: 48,
		to: 368,
		weight: -0.09889322420658941,
		gater: null
	},
	{
		from: 48,
		to: 369,
		weight: -0.02726299523062181,
		gater: null
	},
	{
		from: 48,
		to: 370,
		weight: 0.07905546965042731,
		gater: null
	},
	{
		from: 48,
		to: 371,
		weight: -0.05054699237533758,
		gater: null
	},
	{
		from: 48,
		to: 372,
		weight: -0.03954789504902534,
		gater: null
	},
	{
		from: 48,
		to: 373,
		weight: 0.08265079563849032,
		gater: null
	},
	{
		from: 48,
		to: 374,
		weight: -0.04002140332735902,
		gater: null
	},
	{
		from: 48,
		to: 375,
		weight: 0.06079967462581487,
		gater: null
	},
	{
		from: 48,
		to: 376,
		weight: -0.028436764817764318,
		gater: null
	},
	{
		from: 48,
		to: 377,
		weight: 0.010916376413707504,
		gater: null
	},
	{
		from: 48,
		to: 378,
		weight: -0.006418759370058341,
		gater: null
	},
	{
		from: 48,
		to: 379,
		weight: -0.05979536602788285,
		gater: null
	},
	{
		from: 49,
		to: 360,
		weight: 0.036595319540151244,
		gater: null
	},
	{
		from: 49,
		to: 361,
		weight: -0.07141583329472256,
		gater: null
	},
	{
		from: 49,
		to: 362,
		weight: -0.06067798761698624,
		gater: null
	},
	{
		from: 49,
		to: 363,
		weight: -0.051544132477104654,
		gater: null
	},
	{
		from: 49,
		to: 364,
		weight: -0.05598026759506483,
		gater: null
	},
	{
		from: 49,
		to: 365,
		weight: 0.06657656655157118,
		gater: null
	},
	{
		from: 49,
		to: 366,
		weight: -0.07931386328674908,
		gater: null
	},
	{
		from: 49,
		to: 367,
		weight: 0.04907542468605444,
		gater: null
	},
	{
		from: 49,
		to: 368,
		weight: -0.04328538554954329,
		gater: null
	},
	{
		from: 49,
		to: 369,
		weight: 0.06241801386681464,
		gater: null
	},
	{
		from: 49,
		to: 370,
		weight: -0.044383722688552486,
		gater: null
	},
	{
		from: 49,
		to: 371,
		weight: 0.012183781837762142,
		gater: null
	},
	{
		from: 49,
		to: 372,
		weight: 0.09642661034598685,
		gater: null
	},
	{
		from: 49,
		to: 373,
		weight: -0.023365806208567277,
		gater: null
	},
	{
		from: 49,
		to: 374,
		weight: -0.07468671247446249,
		gater: null
	},
	{
		from: 49,
		to: 375,
		weight: 0.07189879664281482,
		gater: null
	},
	{
		from: 49,
		to: 376,
		weight: 0.09748787270301504,
		gater: null
	},
	{
		from: 49,
		to: 377,
		weight: 0.09098267977189148,
		gater: null
	},
	{
		from: 49,
		to: 378,
		weight: 0.08717463002775819,
		gater: null
	},
	{
		from: 49,
		to: 379,
		weight: -0.049507588987679665,
		gater: null
	},
	{
		from: 50,
		to: 360,
		weight: 0.008675044926242229,
		gater: null
	},
	{
		from: 50,
		to: 361,
		weight: -0.037967563133175286,
		gater: null
	},
	{
		from: 50,
		to: 362,
		weight: 0.09725044563787436,
		gater: null
	},
	{
		from: 50,
		to: 363,
		weight: 0.09774686856288181,
		gater: null
	},
	{
		from: 50,
		to: 364,
		weight: -0.06104941825278907,
		gater: null
	},
	{
		from: 50,
		to: 365,
		weight: 0.018747046019636615,
		gater: null
	},
	{
		from: 50,
		to: 366,
		weight: 0.015342940340066002,
		gater: null
	},
	{
		from: 50,
		to: 367,
		weight: -0.005159365924588141,
		gater: null
	},
	{
		from: 50,
		to: 368,
		weight: -0.004942189295657637,
		gater: null
	},
	{
		from: 50,
		to: 369,
		weight: -0.0624874908262981,
		gater: null
	},
	{
		from: 50,
		to: 370,
		weight: -0.040108858686756045,
		gater: null
	},
	{
		from: 50,
		to: 371,
		weight: 0.051773592995620815,
		gater: null
	},
	{
		from: 50,
		to: 372,
		weight: -0.056750589996936496,
		gater: null
	},
	{
		from: 50,
		to: 373,
		weight: 0.019569345065815646,
		gater: null
	},
	{
		from: 50,
		to: 374,
		weight: 0.034808427733695246,
		gater: null
	},
	{
		from: 50,
		to: 375,
		weight: -0.06229241383527176,
		gater: null
	},
	{
		from: 50,
		to: 376,
		weight: 0.033793993920458926,
		gater: null
	},
	{
		from: 50,
		to: 377,
		weight: -0.007882690903295547,
		gater: null
	},
	{
		from: 50,
		to: 378,
		weight: -0.07415203236479542,
		gater: null
	},
	{
		from: 50,
		to: 379,
		weight: 0.05035288230219212,
		gater: null
	},
	{
		from: 51,
		to: 360,
		weight: -0.011748869937237047,
		gater: null
	},
	{
		from: 51,
		to: 361,
		weight: 0.008999118179061627,
		gater: null
	},
	{
		from: 51,
		to: 362,
		weight: 0.0776982626165629,
		gater: null
	},
	{
		from: 51,
		to: 363,
		weight: -0.020256207651310157,
		gater: null
	},
	{
		from: 51,
		to: 364,
		weight: -0.021606972530983135,
		gater: null
	},
	{
		from: 51,
		to: 365,
		weight: -0.05804597632494342,
		gater: null
	},
	{
		from: 51,
		to: 366,
		weight: -0.019441904503844448,
		gater: null
	},
	{
		from: 51,
		to: 367,
		weight: -0.026327230557297687,
		gater: null
	},
	{
		from: 51,
		to: 368,
		weight: -0.055631226549146096,
		gater: null
	},
	{
		from: 51,
		to: 369,
		weight: 0.07987568483738725,
		gater: null
	},
	{
		from: 51,
		to: 370,
		weight: -0.033972509846301555,
		gater: null
	},
	{
		from: 51,
		to: 371,
		weight: -0.08219171332543218,
		gater: null
	},
	{
		from: 51,
		to: 372,
		weight: 0.06550975045932286,
		gater: null
	},
	{
		from: 51,
		to: 373,
		weight: -0.010371764661093949,
		gater: null
	},
	{
		from: 51,
		to: 374,
		weight: 0.08094784535800534,
		gater: null
	},
	{
		from: 51,
		to: 375,
		weight: -0.051248421125839674,
		gater: null
	},
	{
		from: 51,
		to: 376,
		weight: 0.03661431466682791,
		gater: null
	},
	{
		from: 51,
		to: 377,
		weight: 0.06772571973945843,
		gater: null
	},
	{
		from: 51,
		to: 378,
		weight: 0.0564913656442613,
		gater: null
	},
	{
		from: 51,
		to: 379,
		weight: 0.045542521057339413,
		gater: null
	},
	{
		from: 52,
		to: 360,
		weight: -0.003329645845894097,
		gater: null
	},
	{
		from: 52,
		to: 361,
		weight: 0.05383229246675972,
		gater: null
	},
	{
		from: 52,
		to: 362,
		weight: -0.020277526715693564,
		gater: null
	},
	{
		from: 52,
		to: 363,
		weight: -0.06833273112049962,
		gater: null
	},
	{
		from: 52,
		to: 364,
		weight: 0.08708870832224136,
		gater: null
	},
	{
		from: 52,
		to: 365,
		weight: 0.06859221535582433,
		gater: null
	},
	{
		from: 52,
		to: 366,
		weight: 0.0579127124170602,
		gater: null
	},
	{
		from: 52,
		to: 367,
		weight: 0.05084844999711899,
		gater: null
	},
	{
		from: 52,
		to: 368,
		weight: -0.024399112042938542,
		gater: null
	},
	{
		from: 52,
		to: 369,
		weight: 0.06752801166313122,
		gater: null
	},
	{
		from: 52,
		to: 370,
		weight: 0.03343296539457552,
		gater: null
	},
	{
		from: 52,
		to: 371,
		weight: -0.07118093461484208,
		gater: null
	},
	{
		from: 52,
		to: 372,
		weight: 0.09254854550798516,
		gater: null
	},
	{
		from: 52,
		to: 373,
		weight: -0.09520638685925659,
		gater: null
	},
	{
		from: 52,
		to: 374,
		weight: 0.009182584043605807,
		gater: null
	},
	{
		from: 52,
		to: 375,
		weight: -0.011723712794365237,
		gater: null
	},
	{
		from: 52,
		to: 376,
		weight: -0.02987333745749457,
		gater: null
	},
	{
		from: 52,
		to: 377,
		weight: -0.031873215925203494,
		gater: null
	},
	{
		from: 52,
		to: 378,
		weight: -0.041035049312769,
		gater: null
	},
	{
		from: 52,
		to: 379,
		weight: -0.007135331947031087,
		gater: null
	},
	{
		from: 53,
		to: 360,
		weight: -0.05703530436325597,
		gater: null
	},
	{
		from: 53,
		to: 361,
		weight: 0.06524227488567855,
		gater: null
	},
	{
		from: 53,
		to: 362,
		weight: -0.05864428100306909,
		gater: null
	},
	{
		from: 53,
		to: 363,
		weight: 0.002403313489748801,
		gater: null
	},
	{
		from: 53,
		to: 364,
		weight: 0.08929360281943324,
		gater: null
	},
	{
		from: 53,
		to: 365,
		weight: 0.031969206406119804,
		gater: null
	},
	{
		from: 53,
		to: 366,
		weight: 0.0846238665312675,
		gater: null
	},
	{
		from: 53,
		to: 367,
		weight: -0.06798327130652129,
		gater: null
	},
	{
		from: 53,
		to: 368,
		weight: 0.08132070744283562,
		gater: null
	},
	{
		from: 53,
		to: 369,
		weight: 0.04810590775864415,
		gater: null
	},
	{
		from: 53,
		to: 370,
		weight: 0.09082623393950368,
		gater: null
	},
	{
		from: 53,
		to: 371,
		weight: -0.04943528113711215,
		gater: null
	},
	{
		from: 53,
		to: 372,
		weight: -0.0817878317952947,
		gater: null
	},
	{
		from: 53,
		to: 373,
		weight: -0.09210660810165848,
		gater: null
	},
	{
		from: 53,
		to: 374,
		weight: 0.08238093935759738,
		gater: null
	},
	{
		from: 53,
		to: 375,
		weight: 0.0931845640037817,
		gater: null
	},
	{
		from: 53,
		to: 376,
		weight: -0.0771395937528602,
		gater: null
	},
	{
		from: 53,
		to: 377,
		weight: 0.007081879190825632,
		gater: null
	},
	{
		from: 53,
		to: 378,
		weight: -0.002938078007140049,
		gater: null
	},
	{
		from: 53,
		to: 379,
		weight: 0.041623717779333214,
		gater: null
	},
	{
		from: 54,
		to: 360,
		weight: 0.028092036985235186,
		gater: null
	},
	{
		from: 54,
		to: 361,
		weight: 0.06612229138997128,
		gater: null
	},
	{
		from: 54,
		to: 362,
		weight: -0.024767548824067648,
		gater: null
	},
	{
		from: 54,
		to: 363,
		weight: -0.09339779616251187,
		gater: null
	},
	{
		from: 54,
		to: 364,
		weight: -0.02565645697642545,
		gater: null
	},
	{
		from: 54,
		to: 365,
		weight: -0.015105792260226639,
		gater: null
	},
	{
		from: 54,
		to: 366,
		weight: -0.042345481620610186,
		gater: null
	},
	{
		from: 54,
		to: 367,
		weight: -0.03178342702222432,
		gater: null
	},
	{
		from: 54,
		to: 368,
		weight: 0.005867874520679758,
		gater: null
	},
	{
		from: 54,
		to: 369,
		weight: -0.08663544382103311,
		gater: null
	},
	{
		from: 54,
		to: 370,
		weight: -0.08819636145560068,
		gater: null
	},
	{
		from: 54,
		to: 371,
		weight: 0.05528581866992796,
		gater: null
	},
	{
		from: 54,
		to: 372,
		weight: 0.05422411100547106,
		gater: null
	},
	{
		from: 54,
		to: 373,
		weight: 0.09691226436579911,
		gater: null
	},
	{
		from: 54,
		to: 374,
		weight: 0.08599138786507463,
		gater: null
	},
	{
		from: 54,
		to: 375,
		weight: -0.046292929459640454,
		gater: null
	},
	{
		from: 54,
		to: 376,
		weight: 0.06692153330617856,
		gater: null
	},
	{
		from: 54,
		to: 377,
		weight: -0.02402120673464961,
		gater: null
	},
	{
		from: 54,
		to: 378,
		weight: -0.014739063779384803,
		gater: null
	},
	{
		from: 54,
		to: 379,
		weight: -0.028029112767836803,
		gater: null
	},
	{
		from: 55,
		to: 360,
		weight: 0.0001621650513265599,
		gater: null
	},
	{
		from: 55,
		to: 361,
		weight: -0.060548974062893106,
		gater: null
	},
	{
		from: 55,
		to: 362,
		weight: 0.0679113714009422,
		gater: null
	},
	{
		from: 55,
		to: 363,
		weight: 0.06653968536549587,
		gater: null
	},
	{
		from: 55,
		to: 364,
		weight: -0.0785808892962646,
		gater: null
	},
	{
		from: 55,
		to: 365,
		weight: 0.05707362892124443,
		gater: null
	},
	{
		from: 55,
		to: 366,
		weight: 0.029317759638110508,
		gater: null
	},
	{
		from: 55,
		to: 367,
		weight: -0.05311211764534867,
		gater: null
	},
	{
		from: 55,
		to: 368,
		weight: 0.0656396359597089,
		gater: null
	},
	{
		from: 55,
		to: 369,
		weight: 0.06234655089516558,
		gater: null
	},
	{
		from: 55,
		to: 370,
		weight: 0.023049720548095468,
		gater: null
	},
	{
		from: 55,
		to: 371,
		weight: -0.05828544319964002,
		gater: null
	},
	{
		from: 55,
		to: 372,
		weight: 0.08113203503336863,
		gater: null
	},
	{
		from: 55,
		to: 373,
		weight: -0.0746430529147836,
		gater: null
	},
	{
		from: 55,
		to: 374,
		weight: -0.06607149130542841,
		gater: null
	},
	{
		from: 55,
		to: 375,
		weight: -0.04209615614696127,
		gater: null
	},
	{
		from: 55,
		to: 376,
		weight: 0.09729659860110301,
		gater: null
	},
	{
		from: 55,
		to: 377,
		weight: -0.07162185743118932,
		gater: null
	},
	{
		from: 55,
		to: 378,
		weight: 0.027072346579733703,
		gater: null
	},
	{
		from: 55,
		to: 379,
		weight: -0.058378726861453116,
		gater: null
	},
	{
		from: 56,
		to: 360,
		weight: 0.00811874807073773,
		gater: null
	},
	{
		from: 56,
		to: 361,
		weight: -0.05316665370528657,
		gater: null
	},
	{
		from: 56,
		to: 362,
		weight: 0.06852145854426595,
		gater: null
	},
	{
		from: 56,
		to: 363,
		weight: 0.02723307973789177,
		gater: null
	},
	{
		from: 56,
		to: 364,
		weight: -0.02538615311517485,
		gater: null
	},
	{
		from: 56,
		to: 365,
		weight: -0.061584698276536946,
		gater: null
	},
	{
		from: 56,
		to: 366,
		weight: 0.037646183690480006,
		gater: null
	},
	{
		from: 56,
		to: 367,
		weight: -0.05231736498381232,
		gater: null
	},
	{
		from: 56,
		to: 368,
		weight: -0.05690174890903852,
		gater: null
	},
	{
		from: 56,
		to: 369,
		weight: -0.06049255915390433,
		gater: null
	},
	{
		from: 56,
		to: 370,
		weight: -0.0621746253572189,
		gater: null
	},
	{
		from: 56,
		to: 371,
		weight: -0.05362127317783916,
		gater: null
	},
	{
		from: 56,
		to: 372,
		weight: -0.09543758373146219,
		gater: null
	},
	{
		from: 56,
		to: 373,
		weight: -0.030970133244100806,
		gater: null
	},
	{
		from: 56,
		to: 374,
		weight: 0.07904226327696406,
		gater: null
	},
	{
		from: 56,
		to: 375,
		weight: 0.028739975705771137,
		gater: null
	},
	{
		from: 56,
		to: 376,
		weight: -0.09803811874273745,
		gater: null
	},
	{
		from: 56,
		to: 377,
		weight: -0.04374453659439928,
		gater: null
	},
	{
		from: 56,
		to: 378,
		weight: 0.03657762011041976,
		gater: null
	},
	{
		from: 56,
		to: 379,
		weight: 0.020965103573182417,
		gater: null
	},
	{
		from: 57,
		to: 360,
		weight: -0.006465590691415543,
		gater: null
	},
	{
		from: 57,
		to: 361,
		weight: -0.004529634521074716,
		gater: null
	},
	{
		from: 57,
		to: 362,
		weight: 0.03207403146799903,
		gater: null
	},
	{
		from: 57,
		to: 363,
		weight: 0.03510187803616596,
		gater: null
	},
	{
		from: 57,
		to: 364,
		weight: 0.031903495494424616,
		gater: null
	},
	{
		from: 57,
		to: 365,
		weight: 0.00945855517747543,
		gater: null
	},
	{
		from: 57,
		to: 366,
		weight: -0.07165446674772534,
		gater: null
	},
	{
		from: 57,
		to: 367,
		weight: -0.07100480655117686,
		gater: null
	},
	{
		from: 57,
		to: 368,
		weight: -0.07715360861271209,
		gater: null
	},
	{
		from: 57,
		to: 369,
		weight: -0.0882124149005934,
		gater: null
	},
	{
		from: 57,
		to: 370,
		weight: -0.012588751472750376,
		gater: null
	},
	{
		from: 57,
		to: 371,
		weight: 0.053868712917896716,
		gater: null
	},
	{
		from: 57,
		to: 372,
		weight: -0.000688331738073783,
		gater: null
	},
	{
		from: 57,
		to: 373,
		weight: 0.06301138127266942,
		gater: null
	},
	{
		from: 57,
		to: 374,
		weight: 0.06421014003936662,
		gater: null
	},
	{
		from: 57,
		to: 375,
		weight: 0.02430627618884093,
		gater: null
	},
	{
		from: 57,
		to: 376,
		weight: -0.0426232452021905,
		gater: null
	},
	{
		from: 57,
		to: 377,
		weight: 0.046614704340239704,
		gater: null
	},
	{
		from: 57,
		to: 378,
		weight: -0.09897869696696825,
		gater: null
	},
	{
		from: 57,
		to: 379,
		weight: -0.0340223080461831,
		gater: null
	},
	{
		from: 58,
		to: 360,
		weight: 0.08108648749101369,
		gater: null
	},
	{
		from: 58,
		to: 361,
		weight: -0.032595079883736625,
		gater: null
	},
	{
		from: 58,
		to: 362,
		weight: -0.03406911227621512,
		gater: null
	},
	{
		from: 58,
		to: 363,
		weight: -0.09769964346708622,
		gater: null
	},
	{
		from: 58,
		to: 364,
		weight: -0.04468053806762393,
		gater: null
	},
	{
		from: 58,
		to: 365,
		weight: -0.049763655927343026,
		gater: null
	},
	{
		from: 58,
		to: 366,
		weight: 0.08794251751188478,
		gater: null
	},
	{
		from: 58,
		to: 367,
		weight: 0.04365916115153415,
		gater: null
	},
	{
		from: 58,
		to: 368,
		weight: -0.022682224087342634,
		gater: null
	},
	{
		from: 58,
		to: 369,
		weight: -0.08982151672259087,
		gater: null
	},
	{
		from: 58,
		to: 370,
		weight: 0.025842852682657014,
		gater: null
	},
	{
		from: 58,
		to: 371,
		weight: 0.09858332476058326,
		gater: null
	},
	{
		from: 58,
		to: 372,
		weight: 0.07030502548625892,
		gater: null
	},
	{
		from: 58,
		to: 373,
		weight: 0.09410581794689077,
		gater: null
	},
	{
		from: 58,
		to: 374,
		weight: 0.028460967441858165,
		gater: null
	},
	{
		from: 58,
		to: 375,
		weight: -0.07948053902309647,
		gater: null
	},
	{
		from: 58,
		to: 376,
		weight: -0.07282389017082949,
		gater: null
	},
	{
		from: 58,
		to: 377,
		weight: -0.0400245128632752,
		gater: null
	},
	{
		from: 58,
		to: 378,
		weight: -0.042449489056776014,
		gater: null
	},
	{
		from: 58,
		to: 379,
		weight: 0.06984028144793131,
		gater: null
	},
	{
		from: 59,
		to: 360,
		weight: -0.07675663190992346,
		gater: null
	},
	{
		from: 59,
		to: 361,
		weight: 0.07823625463698133,
		gater: null
	},
	{
		from: 59,
		to: 362,
		weight: -0.07340503572846031,
		gater: null
	},
	{
		from: 59,
		to: 363,
		weight: 0.015912632682592687,
		gater: null
	},
	{
		from: 59,
		to: 364,
		weight: -0.05247726228867653,
		gater: null
	},
	{
		from: 59,
		to: 365,
		weight: 0.00479072873403022,
		gater: null
	},
	{
		from: 59,
		to: 366,
		weight: -0.00026705696502027365,
		gater: null
	},
	{
		from: 59,
		to: 367,
		weight: 0.042930214478527295,
		gater: null
	},
	{
		from: 59,
		to: 368,
		weight: 0.006271667449446697,
		gater: null
	},
	{
		from: 59,
		to: 369,
		weight: 0.09244017251795286,
		gater: null
	},
	{
		from: 59,
		to: 370,
		weight: -0.08195282756953026,
		gater: null
	},
	{
		from: 59,
		to: 371,
		weight: 0.08704882145835602,
		gater: null
	},
	{
		from: 59,
		to: 372,
		weight: 0.04226529283830621,
		gater: null
	},
	{
		from: 59,
		to: 373,
		weight: 0.07060866529391632,
		gater: null
	},
	{
		from: 59,
		to: 374,
		weight: 0.018204934731212402,
		gater: null
	},
	{
		from: 59,
		to: 375,
		weight: 0.08925028084031045,
		gater: null
	},
	{
		from: 59,
		to: 376,
		weight: 0.08379417817770368,
		gater: null
	},
	{
		from: 59,
		to: 377,
		weight: 0.00842176526722134,
		gater: null
	},
	{
		from: 59,
		to: 378,
		weight: -0.07838176288214958,
		gater: null
	},
	{
		from: 59,
		to: 379,
		weight: -0.011564037548667944,
		gater: null
	},
	{
		from: 60,
		to: 360,
		weight: 0.02840340838313965,
		gater: null
	},
	{
		from: 60,
		to: 361,
		weight: 0.017073509039087623,
		gater: null
	},
	{
		from: 60,
		to: 362,
		weight: -0.05814486383710356,
		gater: null
	},
	{
		from: 60,
		to: 363,
		weight: 0.07484767961504477,
		gater: null
	},
	{
		from: 60,
		to: 364,
		weight: -0.04957562370810784,
		gater: null
	},
	{
		from: 60,
		to: 365,
		weight: 0.03641922923959179,
		gater: null
	},
	{
		from: 60,
		to: 366,
		weight: -0.07918874940211738,
		gater: null
	},
	{
		from: 60,
		to: 367,
		weight: -0.0027685860386338634,
		gater: null
	},
	{
		from: 60,
		to: 368,
		weight: -0.09433811496170526,
		gater: null
	},
	{
		from: 60,
		to: 369,
		weight: 0.006697394875410462,
		gater: null
	},
	{
		from: 60,
		to: 370,
		weight: 0.07301916411607534,
		gater: null
	},
	{
		from: 60,
		to: 371,
		weight: 0.02680733367343957,
		gater: null
	},
	{
		from: 60,
		to: 372,
		weight: -0.09178135967650079,
		gater: null
	},
	{
		from: 60,
		to: 373,
		weight: 0.021968059321850794,
		gater: null
	},
	{
		from: 60,
		to: 374,
		weight: -0.020507923146989487,
		gater: null
	},
	{
		from: 60,
		to: 375,
		weight: -0.07093397692532566,
		gater: null
	},
	{
		from: 60,
		to: 376,
		weight: -0.053677905129883824,
		gater: null
	},
	{
		from: 60,
		to: 377,
		weight: 0.06430155664336099,
		gater: null
	},
	{
		from: 60,
		to: 378,
		weight: -0.05692537711232553,
		gater: null
	},
	{
		from: 60,
		to: 379,
		weight: 0.06714087562908158,
		gater: null
	},
	{
		from: 61,
		to: 360,
		weight: 0.004642984689817192,
		gater: null
	},
	{
		from: 61,
		to: 361,
		weight: 0.053509210445097294,
		gater: null
	},
	{
		from: 61,
		to: 362,
		weight: 0.042664899882314616,
		gater: null
	},
	{
		from: 61,
		to: 363,
		weight: -0.04501532668814559,
		gater: null
	},
	{
		from: 61,
		to: 364,
		weight: -0.014948448890819144,
		gater: null
	},
	{
		from: 61,
		to: 365,
		weight: -0.08631151106553077,
		gater: null
	},
	{
		from: 61,
		to: 366,
		weight: -0.00006804149456636488,
		gater: null
	},
	{
		from: 61,
		to: 367,
		weight: 0.051706855012491476,
		gater: null
	},
	{
		from: 61,
		to: 368,
		weight: -0.03716247209065342,
		gater: null
	},
	{
		from: 61,
		to: 369,
		weight: 0.049996404568840636,
		gater: null
	},
	{
		from: 61,
		to: 370,
		weight: -0.04043134075548136,
		gater: null
	},
	{
		from: 61,
		to: 371,
		weight: 0.092229451034093,
		gater: null
	},
	{
		from: 61,
		to: 372,
		weight: -0.09092415643061896,
		gater: null
	},
	{
		from: 61,
		to: 373,
		weight: -0.017204897647333656,
		gater: null
	},
	{
		from: 61,
		to: 374,
		weight: 0.022007865060273787,
		gater: null
	},
	{
		from: 61,
		to: 375,
		weight: -0.04319089298034284,
		gater: null
	},
	{
		from: 61,
		to: 376,
		weight: 0.01534158307051374,
		gater: null
	},
	{
		from: 61,
		to: 377,
		weight: 0.058748686061454114,
		gater: null
	},
	{
		from: 61,
		to: 378,
		weight: -0.06546723669430699,
		gater: null
	},
	{
		from: 61,
		to: 379,
		weight: -0.055512148851573656,
		gater: null
	},
	{
		from: 62,
		to: 360,
		weight: 0.027335610386609643,
		gater: null
	},
	{
		from: 62,
		to: 361,
		weight: 0.05892258642849382,
		gater: null
	},
	{
		from: 62,
		to: 362,
		weight: -0.016405707761023042,
		gater: null
	},
	{
		from: 62,
		to: 363,
		weight: -0.048563924776843195,
		gater: null
	},
	{
		from: 62,
		to: 364,
		weight: -0.050288998167676804,
		gater: null
	},
	{
		from: 62,
		to: 365,
		weight: -0.013547693222372634,
		gater: null
	},
	{
		from: 62,
		to: 366,
		weight: -0.08198451607943236,
		gater: null
	},
	{
		from: 62,
		to: 367,
		weight: -0.08449054986926559,
		gater: null
	},
	{
		from: 62,
		to: 368,
		weight: -0.009100426528089178,
		gater: null
	},
	{
		from: 62,
		to: 369,
		weight: -0.008476809909595318,
		gater: null
	},
	{
		from: 62,
		to: 370,
		weight: 0.04139111491985284,
		gater: null
	},
	{
		from: 62,
		to: 371,
		weight: -0.09791291384197001,
		gater: null
	},
	{
		from: 62,
		to: 372,
		weight: -0.001117710887863138,
		gater: null
	},
	{
		from: 62,
		to: 373,
		weight: -0.011192797249229086,
		gater: null
	},
	{
		from: 62,
		to: 374,
		weight: 0.009223112917867482,
		gater: null
	},
	{
		from: 62,
		to: 375,
		weight: -0.037297196042720776,
		gater: null
	},
	{
		from: 62,
		to: 376,
		weight: 0.014472456938802836,
		gater: null
	},
	{
		from: 62,
		to: 377,
		weight: 0.0024513779905350336,
		gater: null
	},
	{
		from: 62,
		to: 378,
		weight: -0.033762369400584816,
		gater: null
	},
	{
		from: 62,
		to: 379,
		weight: 0.037550451074170876,
		gater: null
	},
	{
		from: 63,
		to: 360,
		weight: 0.09340905245281075,
		gater: null
	},
	{
		from: 63,
		to: 361,
		weight: 0.08923092634327726,
		gater: null
	},
	{
		from: 63,
		to: 362,
		weight: -0.09459407558704656,
		gater: null
	},
	{
		from: 63,
		to: 363,
		weight: -0.0409399332214575,
		gater: null
	},
	{
		from: 63,
		to: 364,
		weight: 0.05926910751892517,
		gater: null
	},
	{
		from: 63,
		to: 365,
		weight: 0.08507447631621684,
		gater: null
	},
	{
		from: 63,
		to: 366,
		weight: -0.017162816525515018,
		gater: null
	},
	{
		from: 63,
		to: 367,
		weight: -0.02548890394126145,
		gater: null
	},
	{
		from: 63,
		to: 368,
		weight: -0.03610941447663532,
		gater: null
	},
	{
		from: 63,
		to: 369,
		weight: 0.009191552475062939,
		gater: null
	},
	{
		from: 63,
		to: 370,
		weight: 0.023898957541559268,
		gater: null
	},
	{
		from: 63,
		to: 371,
		weight: -0.0026854130707360674,
		gater: null
	},
	{
		from: 63,
		to: 372,
		weight: 0.035868768640121285,
		gater: null
	},
	{
		from: 63,
		to: 373,
		weight: -0.060425568427665735,
		gater: null
	},
	{
		from: 63,
		to: 374,
		weight: 0.07087153414417077,
		gater: null
	},
	{
		from: 63,
		to: 375,
		weight: 0.057969620241326514,
		gater: null
	},
	{
		from: 63,
		to: 376,
		weight: 0.06823270544479115,
		gater: null
	},
	{
		from: 63,
		to: 377,
		weight: -0.029231874849540554,
		gater: null
	},
	{
		from: 63,
		to: 378,
		weight: -0.06069644822940377,
		gater: null
	},
	{
		from: 63,
		to: 379,
		weight: 0.09962181140991078,
		gater: null
	},
	{
		from: 64,
		to: 360,
		weight: 0.005803305642328643,
		gater: null
	},
	{
		from: 64,
		to: 361,
		weight: 0.0005762092461385898,
		gater: null
	},
	{
		from: 64,
		to: 362,
		weight: 0.08206641868080983,
		gater: null
	},
	{
		from: 64,
		to: 363,
		weight: -0.0970060204728665,
		gater: null
	},
	{
		from: 64,
		to: 364,
		weight: -0.059102012907049244,
		gater: null
	},
	{
		from: 64,
		to: 365,
		weight: 0.07560796020939642,
		gater: null
	},
	{
		from: 64,
		to: 366,
		weight: 0.05031263685114237,
		gater: null
	},
	{
		from: 64,
		to: 367,
		weight: -0.01801084367113326,
		gater: null
	},
	{
		from: 64,
		to: 368,
		weight: 0.047330191402875504,
		gater: null
	},
	{
		from: 64,
		to: 369,
		weight: 0.011139518994704639,
		gater: null
	},
	{
		from: 64,
		to: 370,
		weight: -0.01822021851402278,
		gater: null
	},
	{
		from: 64,
		to: 371,
		weight: 0.08367154156330919,
		gater: null
	},
	{
		from: 64,
		to: 372,
		weight: 0.00038285287301328963,
		gater: null
	},
	{
		from: 64,
		to: 373,
		weight: -0.011300674793889742,
		gater: null
	},
	{
		from: 64,
		to: 374,
		weight: -0.04836048183286974,
		gater: null
	},
	{
		from: 64,
		to: 375,
		weight: 0.03587587212551774,
		gater: null
	},
	{
		from: 64,
		to: 376,
		weight: -0.0459781219375858,
		gater: null
	},
	{
		from: 64,
		to: 377,
		weight: 0.08021436150886826,
		gater: null
	},
	{
		from: 64,
		to: 378,
		weight: -0.020936232282371986,
		gater: null
	},
	{
		from: 64,
		to: 379,
		weight: -0.023835161289393184,
		gater: null
	},
	{
		from: 65,
		to: 360,
		weight: 0.08933854196465668,
		gater: null
	},
	{
		from: 65,
		to: 361,
		weight: 0.09342671904265282,
		gater: null
	},
	{
		from: 65,
		to: 362,
		weight: -0.0749935186158865,
		gater: null
	},
	{
		from: 65,
		to: 363,
		weight: 0.013030728140729808,
		gater: null
	},
	{
		from: 65,
		to: 364,
		weight: 0.09140182745860279,
		gater: null
	},
	{
		from: 65,
		to: 365,
		weight: 0.021998233266223632,
		gater: null
	},
	{
		from: 65,
		to: 366,
		weight: 0.008913013382989735,
		gater: null
	},
	{
		from: 65,
		to: 367,
		weight: 0.07189793378711298,
		gater: null
	},
	{
		from: 65,
		to: 368,
		weight: 0.09177236848537018,
		gater: null
	},
	{
		from: 65,
		to: 369,
		weight: -0.052716169277976066,
		gater: null
	},
	{
		from: 65,
		to: 370,
		weight: 0.06803599751942344,
		gater: null
	},
	{
		from: 65,
		to: 371,
		weight: 0.03246958336686653,
		gater: null
	},
	{
		from: 65,
		to: 372,
		weight: -0.018948186743203574,
		gater: null
	},
	{
		from: 65,
		to: 373,
		weight: 0.0015769906760430413,
		gater: null
	},
	{
		from: 65,
		to: 374,
		weight: 0.020882404115965023,
		gater: null
	},
	{
		from: 65,
		to: 375,
		weight: 0.060727036958373504,
		gater: null
	},
	{
		from: 65,
		to: 376,
		weight: -0.0564978362750046,
		gater: null
	},
	{
		from: 65,
		to: 377,
		weight: -0.07831210502969461,
		gater: null
	},
	{
		from: 65,
		to: 378,
		weight: 0.053283295086025445,
		gater: null
	},
	{
		from: 65,
		to: 379,
		weight: -0.004346947991137912,
		gater: null
	},
	{
		from: 66,
		to: 360,
		weight: 0.058228679184387205,
		gater: null
	},
	{
		from: 66,
		to: 361,
		weight: -0.023207120749007035,
		gater: null
	},
	{
		from: 66,
		to: 362,
		weight: 0.04953019873112341,
		gater: null
	},
	{
		from: 66,
		to: 363,
		weight: 0.002368637215824476,
		gater: null
	},
	{
		from: 66,
		to: 364,
		weight: -0.09771721971203218,
		gater: null
	},
	{
		from: 66,
		to: 365,
		weight: -0.0019758697258487334,
		gater: null
	},
	{
		from: 66,
		to: 366,
		weight: -0.02768435227123693,
		gater: null
	},
	{
		from: 66,
		to: 367,
		weight: 0.09926345666359251,
		gater: null
	},
	{
		from: 66,
		to: 368,
		weight: -0.09140945413193298,
		gater: null
	},
	{
		from: 66,
		to: 369,
		weight: 0.05443108714876002,
		gater: null
	},
	{
		from: 66,
		to: 370,
		weight: 0.041140486925657804,
		gater: null
	},
	{
		from: 66,
		to: 371,
		weight: -0.04404882624054434,
		gater: null
	},
	{
		from: 66,
		to: 372,
		weight: 0.03894387179664349,
		gater: null
	},
	{
		from: 66,
		to: 373,
		weight: -0.031188584875667183,
		gater: null
	},
	{
		from: 66,
		to: 374,
		weight: 0.07165736129742545,
		gater: null
	},
	{
		from: 66,
		to: 375,
		weight: -0.0573068849154093,
		gater: null
	},
	{
		from: 66,
		to: 376,
		weight: -0.033057690647016275,
		gater: null
	},
	{
		from: 66,
		to: 377,
		weight: -0.030231851443935295,
		gater: null
	},
	{
		from: 66,
		to: 378,
		weight: -0.055637119713342245,
		gater: null
	},
	{
		from: 66,
		to: 379,
		weight: -0.0015042936045301936,
		gater: null
	},
	{
		from: 67,
		to: 360,
		weight: 0.043512331458260306,
		gater: null
	},
	{
		from: 67,
		to: 361,
		weight: -0.08005220642886664,
		gater: null
	},
	{
		from: 67,
		to: 362,
		weight: 0.03515607005222082,
		gater: null
	},
	{
		from: 67,
		to: 363,
		weight: -0.05617072695377212,
		gater: null
	},
	{
		from: 67,
		to: 364,
		weight: -0.06034958629504499,
		gater: null
	},
	{
		from: 67,
		to: 365,
		weight: -0.09312496039048952,
		gater: null
	},
	{
		from: 67,
		to: 366,
		weight: -0.01977232850397495,
		gater: null
	},
	{
		from: 67,
		to: 367,
		weight: -0.010897781554279451,
		gater: null
	},
	{
		from: 67,
		to: 368,
		weight: -0.07032639729348916,
		gater: null
	},
	{
		from: 67,
		to: 369,
		weight: 0.022206482628940136,
		gater: null
	},
	{
		from: 67,
		to: 370,
		weight: 0.01873638869352709,
		gater: null
	},
	{
		from: 67,
		to: 371,
		weight: 0.05012691661661425,
		gater: null
	},
	{
		from: 67,
		to: 372,
		weight: -0.004344602285722754,
		gater: null
	},
	{
		from: 67,
		to: 373,
		weight: 0.07198629058562261,
		gater: null
	},
	{
		from: 67,
		to: 374,
		weight: -0.024196529571140907,
		gater: null
	},
	{
		from: 67,
		to: 375,
		weight: -0.016496961996002396,
		gater: null
	},
	{
		from: 67,
		to: 376,
		weight: 0.06909527168928992,
		gater: null
	},
	{
		from: 67,
		to: 377,
		weight: 0.015470893215776022,
		gater: null
	},
	{
		from: 67,
		to: 378,
		weight: 0.08547312773087198,
		gater: null
	},
	{
		from: 67,
		to: 379,
		weight: 0.05645419767024504,
		gater: null
	},
	{
		from: 68,
		to: 360,
		weight: -0.02540089098916752,
		gater: null
	},
	{
		from: 68,
		to: 361,
		weight: 0.056003077279859786,
		gater: null
	},
	{
		from: 68,
		to: 362,
		weight: 0.05286503619882579,
		gater: null
	},
	{
		from: 68,
		to: 363,
		weight: -0.04477352677295441,
		gater: null
	},
	{
		from: 68,
		to: 364,
		weight: 0.013170454977733531,
		gater: null
	},
	{
		from: 68,
		to: 365,
		weight: -0.04288044025080606,
		gater: null
	},
	{
		from: 68,
		to: 366,
		weight: -0.05471907972466164,
		gater: null
	},
	{
		from: 68,
		to: 367,
		weight: -0.022572981352131413,
		gater: null
	},
	{
		from: 68,
		to: 368,
		weight: -0.05629138439624764,
		gater: null
	},
	{
		from: 68,
		to: 369,
		weight: -0.024306593845297625,
		gater: null
	},
	{
		from: 68,
		to: 370,
		weight: -0.027404468655394698,
		gater: null
	},
	{
		from: 68,
		to: 371,
		weight: -0.052819794200216874,
		gater: null
	},
	{
		from: 68,
		to: 372,
		weight: 0.009797365800396252,
		gater: null
	},
	{
		from: 68,
		to: 373,
		weight: -0.021320777725554102,
		gater: null
	},
	{
		from: 68,
		to: 374,
		weight: 0.07068819758680847,
		gater: null
	},
	{
		from: 68,
		to: 375,
		weight: 0.008611390833731483,
		gater: null
	},
	{
		from: 68,
		to: 376,
		weight: -0.09480460770558291,
		gater: null
	},
	{
		from: 68,
		to: 377,
		weight: -0.05059480300946859,
		gater: null
	},
	{
		from: 68,
		to: 378,
		weight: 0.04013789862878231,
		gater: null
	},
	{
		from: 68,
		to: 379,
		weight: 0.07441432843374174,
		gater: null
	},
	{
		from: 69,
		to: 360,
		weight: 0.029026854531662538,
		gater: null
	},
	{
		from: 69,
		to: 361,
		weight: -0.08560793541480219,
		gater: null
	},
	{
		from: 69,
		to: 362,
		weight: -0.09488021034418939,
		gater: null
	},
	{
		from: 69,
		to: 363,
		weight: 0.013179596363585455,
		gater: null
	},
	{
		from: 69,
		to: 364,
		weight: 0.08745826665579984,
		gater: null
	},
	{
		from: 69,
		to: 365,
		weight: 0.05195875969825678,
		gater: null
	},
	{
		from: 69,
		to: 366,
		weight: 0.09758691287130936,
		gater: null
	},
	{
		from: 69,
		to: 367,
		weight: 0.006191818303674795,
		gater: null
	},
	{
		from: 69,
		to: 368,
		weight: 0.05200008644954651,
		gater: null
	},
	{
		from: 69,
		to: 369,
		weight: 0.004023604640565587,
		gater: null
	},
	{
		from: 69,
		to: 370,
		weight: 0.03953933849690511,
		gater: null
	},
	{
		from: 69,
		to: 371,
		weight: 0.009833702577638007,
		gater: null
	},
	{
		from: 69,
		to: 372,
		weight: 0.03745260966998623,
		gater: null
	},
	{
		from: 69,
		to: 373,
		weight: 0.09456761503670816,
		gater: null
	},
	{
		from: 69,
		to: 374,
		weight: 0.024062259802014235,
		gater: null
	},
	{
		from: 69,
		to: 375,
		weight: -0.015314644801651053,
		gater: null
	},
	{
		from: 69,
		to: 376,
		weight: -0.01795035904641984,
		gater: null
	},
	{
		from: 69,
		to: 377,
		weight: 0.07406490125888424,
		gater: null
	},
	{
		from: 69,
		to: 378,
		weight: -0.09194973274148044,
		gater: null
	},
	{
		from: 69,
		to: 379,
		weight: 0.040956268731047046,
		gater: null
	},
	{
		from: 70,
		to: 360,
		weight: 0.021317808433934493,
		gater: null
	},
	{
		from: 70,
		to: 361,
		weight: -0.02482729965565414,
		gater: null
	},
	{
		from: 70,
		to: 362,
		weight: -0.057823263291269904,
		gater: null
	},
	{
		from: 70,
		to: 363,
		weight: -0.08773498022478764,
		gater: null
	},
	{
		from: 70,
		to: 364,
		weight: -0.07154428471599356,
		gater: null
	},
	{
		from: 70,
		to: 365,
		weight: -0.0043456236325488395,
		gater: null
	},
	{
		from: 70,
		to: 366,
		weight: 0.05469733292765319,
		gater: null
	},
	{
		from: 70,
		to: 367,
		weight: 0.0925204968777251,
		gater: null
	},
	{
		from: 70,
		to: 368,
		weight: -0.026096488460775863,
		gater: null
	},
	{
		from: 70,
		to: 369,
		weight: -0.0478981409845487,
		gater: null
	},
	{
		from: 70,
		to: 370,
		weight: -0.029630459544997254,
		gater: null
	},
	{
		from: 70,
		to: 371,
		weight: -0.044237493363865094,
		gater: null
	},
	{
		from: 70,
		to: 372,
		weight: 0.026195090081624572,
		gater: null
	},
	{
		from: 70,
		to: 373,
		weight: 0.04075664003767043,
		gater: null
	},
	{
		from: 70,
		to: 374,
		weight: -0.09955110164665451,
		gater: null
	},
	{
		from: 70,
		to: 375,
		weight: -0.03778994061899841,
		gater: null
	},
	{
		from: 70,
		to: 376,
		weight: -0.08508442228044832,
		gater: null
	},
	{
		from: 70,
		to: 377,
		weight: 0.07369782800498084,
		gater: null
	},
	{
		from: 70,
		to: 378,
		weight: -0.024733970080859397,
		gater: null
	},
	{
		from: 70,
		to: 379,
		weight: 0.054622971167894246,
		gater: null
	},
	{
		from: 71,
		to: 360,
		weight: -0.05132578995305442,
		gater: null
	},
	{
		from: 71,
		to: 361,
		weight: 0.06968633246465458,
		gater: null
	},
	{
		from: 71,
		to: 362,
		weight: -0.02671494405562612,
		gater: null
	},
	{
		from: 71,
		to: 363,
		weight: 0.08334388402427231,
		gater: null
	},
	{
		from: 71,
		to: 364,
		weight: 0.006046013912314227,
		gater: null
	},
	{
		from: 71,
		to: 365,
		weight: 0.06697914055063242,
		gater: null
	},
	{
		from: 71,
		to: 366,
		weight: 0.08609996727144262,
		gater: null
	},
	{
		from: 71,
		to: 367,
		weight: 0.03692661668087957,
		gater: null
	},
	{
		from: 71,
		to: 368,
		weight: 0.034474812709601954,
		gater: null
	},
	{
		from: 71,
		to: 369,
		weight: 0.026385298658155032,
		gater: null
	},
	{
		from: 71,
		to: 370,
		weight: 0.09292886258686256,
		gater: null
	},
	{
		from: 71,
		to: 371,
		weight: -0.052227445593787315,
		gater: null
	},
	{
		from: 71,
		to: 372,
		weight: -0.017426469646928622,
		gater: null
	},
	{
		from: 71,
		to: 373,
		weight: -0.026198072208030485,
		gater: null
	},
	{
		from: 71,
		to: 374,
		weight: 0.03553220559830733,
		gater: null
	},
	{
		from: 71,
		to: 375,
		weight: -0.03812067514657298,
		gater: null
	},
	{
		from: 71,
		to: 376,
		weight: 0.043867875913299714,
		gater: null
	},
	{
		from: 71,
		to: 377,
		weight: 0.010434374063112983,
		gater: null
	},
	{
		from: 71,
		to: 378,
		weight: -0.05057500481146535,
		gater: null
	},
	{
		from: 71,
		to: 379,
		weight: 0.060020969253728546,
		gater: null
	},
	{
		from: 72,
		to: 360,
		weight: -0.049291617826987856,
		gater: null
	},
	{
		from: 72,
		to: 361,
		weight: 0.017145665691877185,
		gater: null
	},
	{
		from: 72,
		to: 362,
		weight: 0.05860551814823217,
		gater: null
	},
	{
		from: 72,
		to: 363,
		weight: 0.009286294237719428,
		gater: null
	},
	{
		from: 72,
		to: 364,
		weight: -0.02760644883364481,
		gater: null
	},
	{
		from: 72,
		to: 365,
		weight: -0.05891298472771807,
		gater: null
	},
	{
		from: 72,
		to: 366,
		weight: 0.0483610842679873,
		gater: null
	},
	{
		from: 72,
		to: 367,
		weight: -0.05644126383671071,
		gater: null
	},
	{
		from: 72,
		to: 368,
		weight: -0.00624284701032414,
		gater: null
	},
	{
		from: 72,
		to: 369,
		weight: 0.0516711115236593,
		gater: null
	},
	{
		from: 72,
		to: 370,
		weight: 0.07392914051092828,
		gater: null
	},
	{
		from: 72,
		to: 371,
		weight: 0.07559736905916412,
		gater: null
	},
	{
		from: 72,
		to: 372,
		weight: 0.013657368561322117,
		gater: null
	},
	{
		from: 72,
		to: 373,
		weight: -0.08716243817428469,
		gater: null
	},
	{
		from: 72,
		to: 374,
		weight: -0.07974144541258354,
		gater: null
	},
	{
		from: 72,
		to: 375,
		weight: -0.07866313835947146,
		gater: null
	},
	{
		from: 72,
		to: 376,
		weight: 0.03287275106050522,
		gater: null
	},
	{
		from: 72,
		to: 377,
		weight: 0.06663408796366152,
		gater: null
	},
	{
		from: 72,
		to: 378,
		weight: -0.043621132144904755,
		gater: null
	},
	{
		from: 72,
		to: 379,
		weight: 0.02631085690501625,
		gater: null
	},
	{
		from: 73,
		to: 360,
		weight: -0.08257092810341048,
		gater: null
	},
	{
		from: 73,
		to: 361,
		weight: 0.032174279224039315,
		gater: null
	},
	{
		from: 73,
		to: 362,
		weight: -0.09729713334576916,
		gater: null
	},
	{
		from: 73,
		to: 363,
		weight: 0.038565006704629534,
		gater: null
	},
	{
		from: 73,
		to: 364,
		weight: -0.05653160631999974,
		gater: null
	},
	{
		from: 73,
		to: 365,
		weight: 0.08740865344049328,
		gater: null
	},
	{
		from: 73,
		to: 366,
		weight: 0.07136874452001002,
		gater: null
	},
	{
		from: 73,
		to: 367,
		weight: -0.0019321239740226481,
		gater: null
	},
	{
		from: 73,
		to: 368,
		weight: 0.09219302383459219,
		gater: null
	},
	{
		from: 73,
		to: 369,
		weight: 0.0005052095323035688,
		gater: null
	},
	{
		from: 73,
		to: 370,
		weight: 0.003686046842652016,
		gater: null
	},
	{
		from: 73,
		to: 371,
		weight: 0.08034394090266589,
		gater: null
	},
	{
		from: 73,
		to: 372,
		weight: -0.07205329569307649,
		gater: null
	},
	{
		from: 73,
		to: 373,
		weight: 0.03346747861639035,
		gater: null
	},
	{
		from: 73,
		to: 374,
		weight: -0.0848165863150277,
		gater: null
	},
	{
		from: 73,
		to: 375,
		weight: 0.03132652674238057,
		gater: null
	},
	{
		from: 73,
		to: 376,
		weight: -0.02737747005993199,
		gater: null
	},
	{
		from: 73,
		to: 377,
		weight: -0.07271222219520075,
		gater: null
	},
	{
		from: 73,
		to: 378,
		weight: 0.06476347860145643,
		gater: null
	},
	{
		from: 73,
		to: 379,
		weight: 0.04355005093725178,
		gater: null
	},
	{
		from: 74,
		to: 360,
		weight: -0.09502467120173513,
		gater: null
	},
	{
		from: 74,
		to: 361,
		weight: -0.03540706665944464,
		gater: null
	},
	{
		from: 74,
		to: 362,
		weight: 0.08561250840414322,
		gater: null
	},
	{
		from: 74,
		to: 363,
		weight: -0.003435936885825483,
		gater: null
	},
	{
		from: 74,
		to: 364,
		weight: -0.04470552883908883,
		gater: null
	},
	{
		from: 74,
		to: 365,
		weight: 0.025341554435563157,
		gater: null
	},
	{
		from: 74,
		to: 366,
		weight: -0.024379319281550682,
		gater: null
	},
	{
		from: 74,
		to: 367,
		weight: 0.033261920694164615,
		gater: null
	},
	{
		from: 74,
		to: 368,
		weight: 0.03851895571338679,
		gater: null
	},
	{
		from: 74,
		to: 369,
		weight: 0.09049386822618319,
		gater: null
	},
	{
		from: 74,
		to: 370,
		weight: -0.04566073401097324,
		gater: null
	},
	{
		from: 74,
		to: 371,
		weight: 0.08642483620718022,
		gater: null
	},
	{
		from: 74,
		to: 372,
		weight: -0.032801445088240164,
		gater: null
	},
	{
		from: 74,
		to: 373,
		weight: 0.025819136487005123,
		gater: null
	},
	{
		from: 74,
		to: 374,
		weight: 0.018079369213345547,
		gater: null
	},
	{
		from: 74,
		to: 375,
		weight: 0.05710630782584919,
		gater: null
	},
	{
		from: 74,
		to: 376,
		weight: -0.0889493266957918,
		gater: null
	},
	{
		from: 74,
		to: 377,
		weight: -0.07871658091026826,
		gater: null
	},
	{
		from: 74,
		to: 378,
		weight: -0.09038343403651639,
		gater: null
	},
	{
		from: 74,
		to: 379,
		weight: -0.048597605107932075,
		gater: null
	},
	{
		from: 75,
		to: 360,
		weight: 0.019278410268600818,
		gater: null
	},
	{
		from: 75,
		to: 361,
		weight: -0.02047301077942469,
		gater: null
	},
	{
		from: 75,
		to: 362,
		weight: -0.04122232226457432,
		gater: null
	},
	{
		from: 75,
		to: 363,
		weight: -0.037921775223542835,
		gater: null
	},
	{
		from: 75,
		to: 364,
		weight: 0.03195627259803899,
		gater: null
	},
	{
		from: 75,
		to: 365,
		weight: 0.0340494999693329,
		gater: null
	},
	{
		from: 75,
		to: 366,
		weight: -0.0463977040669866,
		gater: null
	},
	{
		from: 75,
		to: 367,
		weight: 0.05995040667511492,
		gater: null
	},
	{
		from: 75,
		to: 368,
		weight: 0.04155131050054925,
		gater: null
	},
	{
		from: 75,
		to: 369,
		weight: 0.03649439188175907,
		gater: null
	},
	{
		from: 75,
		to: 370,
		weight: 0.07703793326700228,
		gater: null
	},
	{
		from: 75,
		to: 371,
		weight: 0.01618911957568718,
		gater: null
	},
	{
		from: 75,
		to: 372,
		weight: -0.08010419271665326,
		gater: null
	},
	{
		from: 75,
		to: 373,
		weight: 0.0044560428230268345,
		gater: null
	},
	{
		from: 75,
		to: 374,
		weight: 0.04795102294305287,
		gater: null
	},
	{
		from: 75,
		to: 375,
		weight: 0.03841971353422996,
		gater: null
	},
	{
		from: 75,
		to: 376,
		weight: -0.06124817624033816,
		gater: null
	},
	{
		from: 75,
		to: 377,
		weight: 0.07466598449354953,
		gater: null
	},
	{
		from: 75,
		to: 378,
		weight: -0.037829110581215276,
		gater: null
	},
	{
		from: 75,
		to: 379,
		weight: 0.014732137066239437,
		gater: null
	},
	{
		from: 76,
		to: 360,
		weight: 0.02091084166448054,
		gater: null
	},
	{
		from: 76,
		to: 361,
		weight: -0.030742876728593466,
		gater: null
	},
	{
		from: 76,
		to: 362,
		weight: 0.0753819135540145,
		gater: null
	},
	{
		from: 76,
		to: 363,
		weight: -0.04795364628290826,
		gater: null
	},
	{
		from: 76,
		to: 364,
		weight: -0.05985412098008047,
		gater: null
	},
	{
		from: 76,
		to: 365,
		weight: 0.04798895962424701,
		gater: null
	},
	{
		from: 76,
		to: 366,
		weight: 0.0971096653855896,
		gater: null
	},
	{
		from: 76,
		to: 367,
		weight: -0.0929420670574655,
		gater: null
	},
	{
		from: 76,
		to: 368,
		weight: -0.083643578663672,
		gater: null
	},
	{
		from: 76,
		to: 369,
		weight: 0.08768312668179742,
		gater: null
	},
	{
		from: 76,
		to: 370,
		weight: -0.07300292627667862,
		gater: null
	},
	{
		from: 76,
		to: 371,
		weight: -0.0987457827176998,
		gater: null
	},
	{
		from: 76,
		to: 372,
		weight: 0.016833694334556698,
		gater: null
	},
	{
		from: 76,
		to: 373,
		weight: -0.047329659856205325,
		gater: null
	},
	{
		from: 76,
		to: 374,
		weight: -0.01441655798427885,
		gater: null
	},
	{
		from: 76,
		to: 375,
		weight: 0.006948343024916953,
		gater: null
	},
	{
		from: 76,
		to: 376,
		weight: -0.07488610675007608,
		gater: null
	},
	{
		from: 76,
		to: 377,
		weight: -0.024534988893581702,
		gater: null
	},
	{
		from: 76,
		to: 378,
		weight: -0.026420363278496867,
		gater: null
	},
	{
		from: 76,
		to: 379,
		weight: 0.0458414132509902,
		gater: null
	},
	{
		from: 77,
		to: 360,
		weight: -0.01892475128889788,
		gater: null
	},
	{
		from: 77,
		to: 361,
		weight: 0.09897551231004462,
		gater: null
	},
	{
		from: 77,
		to: 362,
		weight: -0.016121747859645902,
		gater: null
	},
	{
		from: 77,
		to: 363,
		weight: -0.028621338089902748,
		gater: null
	},
	{
		from: 77,
		to: 364,
		weight: 0.004677381373518141,
		gater: null
	},
	{
		from: 77,
		to: 365,
		weight: 0.09363599489661653,
		gater: null
	},
	{
		from: 77,
		to: 366,
		weight: -0.08601256288801742,
		gater: null
	},
	{
		from: 77,
		to: 367,
		weight: -0.07312483853579708,
		gater: null
	},
	{
		from: 77,
		to: 368,
		weight: 0.07466055589014173,
		gater: null
	},
	{
		from: 77,
		to: 369,
		weight: -0.0024242822805763675,
		gater: null
	},
	{
		from: 77,
		to: 370,
		weight: -0.06417585769219675,
		gater: null
	},
	{
		from: 77,
		to: 371,
		weight: -0.004374127100886582,
		gater: null
	},
	{
		from: 77,
		to: 372,
		weight: -0.06783735423306525,
		gater: null
	},
	{
		from: 77,
		to: 373,
		weight: -0.08940447908021057,
		gater: null
	},
	{
		from: 77,
		to: 374,
		weight: -0.04740708793960194,
		gater: null
	},
	{
		from: 77,
		to: 375,
		weight: -0.06967096176303743,
		gater: null
	},
	{
		from: 77,
		to: 376,
		weight: -0.07648125977270226,
		gater: null
	},
	{
		from: 77,
		to: 377,
		weight: -0.04817763677215186,
		gater: null
	},
	{
		from: 77,
		to: 378,
		weight: -0.07662820807160778,
		gater: null
	},
	{
		from: 77,
		to: 379,
		weight: 0.017696596490648184,
		gater: null
	},
	{
		from: 78,
		to: 360,
		weight: 0.026202169834907613,
		gater: null
	},
	{
		from: 78,
		to: 361,
		weight: 0.08741929138970375,
		gater: null
	},
	{
		from: 78,
		to: 362,
		weight: 0.0985662565759042,
		gater: null
	},
	{
		from: 78,
		to: 363,
		weight: -0.07486333963358782,
		gater: null
	},
	{
		from: 78,
		to: 364,
		weight: 0.01007152459455099,
		gater: null
	},
	{
		from: 78,
		to: 365,
		weight: -0.044175192489690845,
		gater: null
	},
	{
		from: 78,
		to: 366,
		weight: 0.06608878319788727,
		gater: null
	},
	{
		from: 78,
		to: 367,
		weight: -0.043791110366992084,
		gater: null
	},
	{
		from: 78,
		to: 368,
		weight: -0.013533544914334297,
		gater: null
	},
	{
		from: 78,
		to: 369,
		weight: -0.007624856977392541,
		gater: null
	},
	{
		from: 78,
		to: 370,
		weight: -0.07292547267033887,
		gater: null
	},
	{
		from: 78,
		to: 371,
		weight: 0.03298239706179418,
		gater: null
	},
	{
		from: 78,
		to: 372,
		weight: -0.04434834161195966,
		gater: null
	},
	{
		from: 78,
		to: 373,
		weight: -0.005710132126852188,
		gater: null
	},
	{
		from: 78,
		to: 374,
		weight: -0.044757101526182154,
		gater: null
	},
	{
		from: 78,
		to: 375,
		weight: 0.062142158091663874,
		gater: null
	},
	{
		from: 78,
		to: 376,
		weight: 0.05226841397602941,
		gater: null
	},
	{
		from: 78,
		to: 377,
		weight: 0.018728991581649618,
		gater: null
	},
	{
		from: 78,
		to: 378,
		weight: -0.09002671921232991,
		gater: null
	},
	{
		from: 78,
		to: 379,
		weight: -0.05394856361032061,
		gater: null
	},
	{
		from: 79,
		to: 360,
		weight: 0.046627484642790484,
		gater: null
	},
	{
		from: 79,
		to: 361,
		weight: -0.004586910270550387,
		gater: null
	},
	{
		from: 79,
		to: 362,
		weight: 0.09540523907360937,
		gater: null
	},
	{
		from: 79,
		to: 363,
		weight: -0.0243508783032845,
		gater: null
	},
	{
		from: 79,
		to: 364,
		weight: -0.06314590044024633,
		gater: null
	},
	{
		from: 79,
		to: 365,
		weight: -0.03405142775226655,
		gater: null
	},
	{
		from: 79,
		to: 366,
		weight: -0.04005939558695326,
		gater: null
	},
	{
		from: 79,
		to: 367,
		weight: 0.0911493061992307,
		gater: null
	},
	{
		from: 79,
		to: 368,
		weight: 0.09472118120021986,
		gater: null
	},
	{
		from: 79,
		to: 369,
		weight: 0.08192879929238414,
		gater: null
	},
	{
		from: 79,
		to: 370,
		weight: 0.03922023195634455,
		gater: null
	},
	{
		from: 79,
		to: 371,
		weight: 0.0647651188939736,
		gater: null
	},
	{
		from: 79,
		to: 372,
		weight: 0.066005925296444,
		gater: null
	},
	{
		from: 79,
		to: 373,
		weight: 0.055234914674004904,
		gater: null
	},
	{
		from: 79,
		to: 374,
		weight: 0.08447249093445747,
		gater: null
	},
	{
		from: 79,
		to: 375,
		weight: 0.0027467098280617996,
		gater: null
	},
	{
		from: 79,
		to: 376,
		weight: -0.00020782722064693893,
		gater: null
	},
	{
		from: 79,
		to: 377,
		weight: -0.04699462100180414,
		gater: null
	},
	{
		from: 79,
		to: 378,
		weight: -0.014825182372329992,
		gater: null
	},
	{
		from: 79,
		to: 379,
		weight: -0.0998149327078599,
		gater: null
	},
	{
		from: 80,
		to: 360,
		weight: -0.015808792550426748,
		gater: null
	},
	{
		from: 80,
		to: 361,
		weight: -0.06617439358121852,
		gater: null
	},
	{
		from: 80,
		to: 362,
		weight: -0.030336172446519427,
		gater: null
	},
	{
		from: 80,
		to: 363,
		weight: 0.046636463781634496,
		gater: null
	},
	{
		from: 80,
		to: 364,
		weight: -0.0653003049065009,
		gater: null
	},
	{
		from: 80,
		to: 365,
		weight: 0.002789295770180944,
		gater: null
	},
	{
		from: 80,
		to: 366,
		weight: -0.07318400937174202,
		gater: null
	},
	{
		from: 80,
		to: 367,
		weight: 0.06646738731613913,
		gater: null
	},
	{
		from: 80,
		to: 368,
		weight: -0.0647833675802151,
		gater: null
	},
	{
		from: 80,
		to: 369,
		weight: 0.01955466880069104,
		gater: null
	},
	{
		from: 80,
		to: 370,
		weight: -0.022990013167504667,
		gater: null
	},
	{
		from: 80,
		to: 371,
		weight: 0.012782567194175656,
		gater: null
	},
	{
		from: 80,
		to: 372,
		weight: 0.039543116269424416,
		gater: null
	},
	{
		from: 80,
		to: 373,
		weight: 0.08216766923984037,
		gater: null
	},
	{
		from: 80,
		to: 374,
		weight: 0.0477029209960107,
		gater: null
	},
	{
		from: 80,
		to: 375,
		weight: 0.09505732933639807,
		gater: null
	},
	{
		from: 80,
		to: 376,
		weight: -0.029652074051345387,
		gater: null
	},
	{
		from: 80,
		to: 377,
		weight: -0.06764382622431775,
		gater: null
	},
	{
		from: 80,
		to: 378,
		weight: -0.08994075387728638,
		gater: null
	},
	{
		from: 80,
		to: 379,
		weight: 0.050843790564222474,
		gater: null
	},
	{
		from: 81,
		to: 360,
		weight: -0.09497508507203044,
		gater: null
	},
	{
		from: 81,
		to: 361,
		weight: 0.06854925907882761,
		gater: null
	},
	{
		from: 81,
		to: 362,
		weight: -0.061641255424411415,
		gater: null
	},
	{
		from: 81,
		to: 363,
		weight: -0.0539270254395928,
		gater: null
	},
	{
		from: 81,
		to: 364,
		weight: -0.06963212768640142,
		gater: null
	},
	{
		from: 81,
		to: 365,
		weight: -0.01261907761859779,
		gater: null
	},
	{
		from: 81,
		to: 366,
		weight: -0.04242446399155928,
		gater: null
	},
	{
		from: 81,
		to: 367,
		weight: 0.06105844315631628,
		gater: null
	},
	{
		from: 81,
		to: 368,
		weight: -0.027671083111905623,
		gater: null
	},
	{
		from: 81,
		to: 369,
		weight: 0.0023232225962807745,
		gater: null
	},
	{
		from: 81,
		to: 370,
		weight: 0.05063787931474156,
		gater: null
	},
	{
		from: 81,
		to: 371,
		weight: -0.06082336796627579,
		gater: null
	},
	{
		from: 81,
		to: 372,
		weight: 0.03749337780258827,
		gater: null
	},
	{
		from: 81,
		to: 373,
		weight: -0.056312927403515456,
		gater: null
	},
	{
		from: 81,
		to: 374,
		weight: -0.049444634707054735,
		gater: null
	},
	{
		from: 81,
		to: 375,
		weight: 0.04341856985160594,
		gater: null
	},
	{
		from: 81,
		to: 376,
		weight: 0.08291441341717892,
		gater: null
	},
	{
		from: 81,
		to: 377,
		weight: 0.055709589767553025,
		gater: null
	},
	{
		from: 81,
		to: 378,
		weight: 0.0317557495499754,
		gater: null
	},
	{
		from: 81,
		to: 379,
		weight: 0.08503896928342775,
		gater: null
	},
	{
		from: 82,
		to: 360,
		weight: -0.0575130239739611,
		gater: null
	},
	{
		from: 82,
		to: 361,
		weight: -0.009462241499034144,
		gater: null
	},
	{
		from: 82,
		to: 362,
		weight: -0.07361137804797271,
		gater: null
	},
	{
		from: 82,
		to: 363,
		weight: -0.03758375391746265,
		gater: null
	},
	{
		from: 82,
		to: 364,
		weight: -0.09645217327130094,
		gater: null
	},
	{
		from: 82,
		to: 365,
		weight: -0.005874986654970021,
		gater: null
	},
	{
		from: 82,
		to: 366,
		weight: -0.07291354202060268,
		gater: null
	},
	{
		from: 82,
		to: 367,
		weight: -0.007774663670507345,
		gater: null
	},
	{
		from: 82,
		to: 368,
		weight: 0.0709236528324464,
		gater: null
	},
	{
		from: 82,
		to: 369,
		weight: -0.03611884304846531,
		gater: null
	},
	{
		from: 82,
		to: 370,
		weight: -0.08286384589892277,
		gater: null
	},
	{
		from: 82,
		to: 371,
		weight: -0.05212382085041707,
		gater: null
	},
	{
		from: 82,
		to: 372,
		weight: 0.0019229925886302401,
		gater: null
	},
	{
		from: 82,
		to: 373,
		weight: -0.018992023014473863,
		gater: null
	},
	{
		from: 82,
		to: 374,
		weight: -0.01471937537986627,
		gater: null
	},
	{
		from: 82,
		to: 375,
		weight: 0.010570942716290416,
		gater: null
	},
	{
		from: 82,
		to: 376,
		weight: -0.021718759232995308,
		gater: null
	},
	{
		from: 82,
		to: 377,
		weight: 0.09795958487753684,
		gater: null
	},
	{
		from: 82,
		to: 378,
		weight: 0.03541440741089974,
		gater: null
	},
	{
		from: 82,
		to: 379,
		weight: -0.04079077552276811,
		gater: null
	},
	{
		from: 83,
		to: 360,
		weight: 0.03225984789295838,
		gater: null
	},
	{
		from: 83,
		to: 361,
		weight: 0.013093071517175398,
		gater: null
	},
	{
		from: 83,
		to: 362,
		weight: 0.08788629995300198,
		gater: null
	},
	{
		from: 83,
		to: 363,
		weight: -0.03149888485459332,
		gater: null
	},
	{
		from: 83,
		to: 364,
		weight: 0.03942148498932255,
		gater: null
	},
	{
		from: 83,
		to: 365,
		weight: -0.07575911682177248,
		gater: null
	},
	{
		from: 83,
		to: 366,
		weight: 0.006478656254033682,
		gater: null
	},
	{
		from: 83,
		to: 367,
		weight: 0.00020763475695209643,
		gater: null
	},
	{
		from: 83,
		to: 368,
		weight: 0.048396830674937746,
		gater: null
	},
	{
		from: 83,
		to: 369,
		weight: 0.05823293752503633,
		gater: null
	},
	{
		from: 83,
		to: 370,
		weight: 0.08641321992726989,
		gater: null
	},
	{
		from: 83,
		to: 371,
		weight: -0.09560157093809192,
		gater: null
	},
	{
		from: 83,
		to: 372,
		weight: -0.09905869526242124,
		gater: null
	},
	{
		from: 83,
		to: 373,
		weight: 0.05085783642219474,
		gater: null
	},
	{
		from: 83,
		to: 374,
		weight: 0.036102955050900165,
		gater: null
	},
	{
		from: 83,
		to: 375,
		weight: -0.04025074564141669,
		gater: null
	},
	{
		from: 83,
		to: 376,
		weight: -0.03615885490612443,
		gater: null
	},
	{
		from: 83,
		to: 377,
		weight: 0.07422555122653249,
		gater: null
	},
	{
		from: 83,
		to: 378,
		weight: 0.06045743783549354,
		gater: null
	},
	{
		from: 83,
		to: 379,
		weight: -0.06567792289601866,
		gater: null
	},
	{
		from: 84,
		to: 360,
		weight: -0.09135806355561785,
		gater: null
	},
	{
		from: 84,
		to: 361,
		weight: 0.05311400943590919,
		gater: null
	},
	{
		from: 84,
		to: 362,
		weight: 0.010555902954441754,
		gater: null
	},
	{
		from: 84,
		to: 363,
		weight: -0.05376759894278145,
		gater: null
	},
	{
		from: 84,
		to: 364,
		weight: -0.04462784707913068,
		gater: null
	},
	{
		from: 84,
		to: 365,
		weight: -0.08668765935453049,
		gater: null
	},
	{
		from: 84,
		to: 366,
		weight: -0.09825859589770736,
		gater: null
	},
	{
		from: 84,
		to: 367,
		weight: -0.07245016526688906,
		gater: null
	},
	{
		from: 84,
		to: 368,
		weight: -0.035098259175220026,
		gater: null
	},
	{
		from: 84,
		to: 369,
		weight: 0.04260097934365986,
		gater: null
	},
	{
		from: 84,
		to: 370,
		weight: -0.05688485631794955,
		gater: null
	},
	{
		from: 84,
		to: 371,
		weight: 0.008819089667445643,
		gater: null
	},
	{
		from: 84,
		to: 372,
		weight: -0.08623757962056625,
		gater: null
	},
	{
		from: 84,
		to: 373,
		weight: -0.013208342259997036,
		gater: null
	},
	{
		from: 84,
		to: 374,
		weight: 0.007861082286335336,
		gater: null
	},
	{
		from: 84,
		to: 375,
		weight: -0.0074865754016557595,
		gater: null
	},
	{
		from: 84,
		to: 376,
		weight: -0.062232410266864685,
		gater: null
	},
	{
		from: 84,
		to: 377,
		weight: -0.09778966730743353,
		gater: null
	},
	{
		from: 84,
		to: 378,
		weight: -0.05075589642277052,
		gater: null
	},
	{
		from: 84,
		to: 379,
		weight: -0.019787399802872224,
		gater: null
	},
	{
		from: 85,
		to: 360,
		weight: 0.08323105343798193,
		gater: null
	},
	{
		from: 85,
		to: 361,
		weight: 0.02361633819349529,
		gater: null
	},
	{
		from: 85,
		to: 362,
		weight: -0.08753487202767661,
		gater: null
	},
	{
		from: 85,
		to: 363,
		weight: 0.09520309791131051,
		gater: null
	},
	{
		from: 85,
		to: 364,
		weight: -0.008334432838052755,
		gater: null
	},
	{
		from: 85,
		to: 365,
		weight: -0.017315216087034416,
		gater: null
	},
	{
		from: 85,
		to: 366,
		weight: 0.03762441208888001,
		gater: null
	},
	{
		from: 85,
		to: 367,
		weight: 0.06266959856230345,
		gater: null
	},
	{
		from: 85,
		to: 368,
		weight: 0.06281392459827209,
		gater: null
	},
	{
		from: 85,
		to: 369,
		weight: 0.08527842094208715,
		gater: null
	},
	{
		from: 85,
		to: 370,
		weight: 0.02087744432165936,
		gater: null
	},
	{
		from: 85,
		to: 371,
		weight: -0.021899039498590955,
		gater: null
	},
	{
		from: 85,
		to: 372,
		weight: 0.09984702927610126,
		gater: null
	},
	{
		from: 85,
		to: 373,
		weight: -0.08036273698046573,
		gater: null
	},
	{
		from: 85,
		to: 374,
		weight: 0.05514324202839577,
		gater: null
	},
	{
		from: 85,
		to: 375,
		weight: 0.05607128093765837,
		gater: null
	},
	{
		from: 85,
		to: 376,
		weight: -0.05339745919647916,
		gater: null
	},
	{
		from: 85,
		to: 377,
		weight: -0.07045314794118207,
		gater: null
	},
	{
		from: 85,
		to: 378,
		weight: -0.05920416656609202,
		gater: null
	},
	{
		from: 85,
		to: 379,
		weight: -0.013366759477668966,
		gater: null
	},
	{
		from: 86,
		to: 360,
		weight: 0.07504866671232158,
		gater: null
	},
	{
		from: 86,
		to: 361,
		weight: 0.043192428357240686,
		gater: null
	},
	{
		from: 86,
		to: 362,
		weight: 0.0749861225345789,
		gater: null
	},
	{
		from: 86,
		to: 363,
		weight: -0.013380158340615012,
		gater: null
	},
	{
		from: 86,
		to: 364,
		weight: -0.004167479903402785,
		gater: null
	},
	{
		from: 86,
		to: 365,
		weight: 0.05834320130591855,
		gater: null
	},
	{
		from: 86,
		to: 366,
		weight: -0.03036000060290714,
		gater: null
	},
	{
		from: 86,
		to: 367,
		weight: 0.053828340123546925,
		gater: null
	},
	{
		from: 86,
		to: 368,
		weight: 0.012069868311863713,
		gater: null
	},
	{
		from: 86,
		to: 369,
		weight: 0.048837353755909335,
		gater: null
	},
	{
		from: 86,
		to: 370,
		weight: 0.09016317721039444,
		gater: null
	},
	{
		from: 86,
		to: 371,
		weight: 0.06236268340778914,
		gater: null
	},
	{
		from: 86,
		to: 372,
		weight: -0.09241904375868232,
		gater: null
	},
	{
		from: 86,
		to: 373,
		weight: 0.05167435169191867,
		gater: null
	},
	{
		from: 86,
		to: 374,
		weight: -0.08464097683730709,
		gater: null
	},
	{
		from: 86,
		to: 375,
		weight: -0.020367105518068085,
		gater: null
	},
	{
		from: 86,
		to: 376,
		weight: 0.008624761324089916,
		gater: null
	},
	{
		from: 86,
		to: 377,
		weight: 0.058231322011888104,
		gater: null
	},
	{
		from: 86,
		to: 378,
		weight: -0.0812393938503579,
		gater: null
	},
	{
		from: 86,
		to: 379,
		weight: 0.05661293173397283,
		gater: null
	},
	{
		from: 87,
		to: 360,
		weight: 0.07245123738911899,
		gater: null
	},
	{
		from: 87,
		to: 361,
		weight: -0.02166399474811978,
		gater: null
	},
	{
		from: 87,
		to: 362,
		weight: 0.06091676342765129,
		gater: null
	},
	{
		from: 87,
		to: 363,
		weight: 0.048652364605116294,
		gater: null
	},
	{
		from: 87,
		to: 364,
		weight: -0.09349627717272169,
		gater: null
	},
	{
		from: 87,
		to: 365,
		weight: 0.08451381415793341,
		gater: null
	},
	{
		from: 87,
		to: 366,
		weight: -0.06677466136179114,
		gater: null
	},
	{
		from: 87,
		to: 367,
		weight: 0.08239700026199107,
		gater: null
	},
	{
		from: 87,
		to: 368,
		weight: -0.06645602106034029,
		gater: null
	},
	{
		from: 87,
		to: 369,
		weight: -0.02710659218438534,
		gater: null
	},
	{
		from: 87,
		to: 370,
		weight: 0.052263692730316086,
		gater: null
	},
	{
		from: 87,
		to: 371,
		weight: -0.010455678424658596,
		gater: null
	},
	{
		from: 87,
		to: 372,
		weight: -0.061877119926835845,
		gater: null
	},
	{
		from: 87,
		to: 373,
		weight: 0.005691261752310078,
		gater: null
	},
	{
		from: 87,
		to: 374,
		weight: 0.07283519304331684,
		gater: null
	},
	{
		from: 87,
		to: 375,
		weight: 0.029335968493541476,
		gater: null
	},
	{
		from: 87,
		to: 376,
		weight: -0.07351402322900427,
		gater: null
	},
	{
		from: 87,
		to: 377,
		weight: 0.06189850143665551,
		gater: null
	},
	{
		from: 87,
		to: 378,
		weight: 0.08584600093662295,
		gater: null
	},
	{
		from: 87,
		to: 379,
		weight: -0.06239414056117303,
		gater: null
	},
	{
		from: 88,
		to: 360,
		weight: -0.03538455822190466,
		gater: null
	},
	{
		from: 88,
		to: 361,
		weight: 0.045778983330095585,
		gater: null
	},
	{
		from: 88,
		to: 362,
		weight: 0.04452509040759184,
		gater: null
	},
	{
		from: 88,
		to: 363,
		weight: -0.0912730711523126,
		gater: null
	},
	{
		from: 88,
		to: 364,
		weight: 0.055874691372946705,
		gater: null
	},
	{
		from: 88,
		to: 365,
		weight: 0.05842172954587155,
		gater: null
	},
	{
		from: 88,
		to: 366,
		weight: 0.00628253267367733,
		gater: null
	},
	{
		from: 88,
		to: 367,
		weight: 0.06017606118262636,
		gater: null
	},
	{
		from: 88,
		to: 368,
		weight: -0.05199941638811781,
		gater: null
	},
	{
		from: 88,
		to: 369,
		weight: 0.08500460331311907,
		gater: null
	},
	{
		from: 88,
		to: 370,
		weight: 0.04267246914561054,
		gater: null
	},
	{
		from: 88,
		to: 371,
		weight: -0.08951873126708883,
		gater: null
	},
	{
		from: 88,
		to: 372,
		weight: -0.029153273338976424,
		gater: null
	},
	{
		from: 88,
		to: 373,
		weight: -0.04428739470106629,
		gater: null
	},
	{
		from: 88,
		to: 374,
		weight: 0.05221803433355712,
		gater: null
	},
	{
		from: 88,
		to: 375,
		weight: 0.043383437807455266,
		gater: null
	},
	{
		from: 88,
		to: 376,
		weight: 0.043877214648421564,
		gater: null
	},
	{
		from: 88,
		to: 377,
		weight: -0.08289929984775513,
		gater: null
	},
	{
		from: 88,
		to: 378,
		weight: -0.011244843239466909,
		gater: null
	},
	{
		from: 88,
		to: 379,
		weight: -0.04308404579638894,
		gater: null
	},
	{
		from: 89,
		to: 360,
		weight: 0.06851704154672605,
		gater: null
	},
	{
		from: 89,
		to: 361,
		weight: 0.09916764302963729,
		gater: null
	},
	{
		from: 89,
		to: 362,
		weight: 0.007876029263929676,
		gater: null
	},
	{
		from: 89,
		to: 363,
		weight: 0.0976477023037548,
		gater: null
	},
	{
		from: 89,
		to: 364,
		weight: -0.05418011603072279,
		gater: null
	},
	{
		from: 89,
		to: 365,
		weight: 0.09783014605626641,
		gater: null
	},
	{
		from: 89,
		to: 366,
		weight: 0.049427008117699345,
		gater: null
	},
	{
		from: 89,
		to: 367,
		weight: -0.05255020880372481,
		gater: null
	},
	{
		from: 89,
		to: 368,
		weight: -0.047563440331306196,
		gater: null
	},
	{
		from: 89,
		to: 369,
		weight: 0.09455874981711637,
		gater: null
	},
	{
		from: 89,
		to: 370,
		weight: 0.012753525971903962,
		gater: null
	},
	{
		from: 89,
		to: 371,
		weight: -0.009120890073279098,
		gater: null
	},
	{
		from: 89,
		to: 372,
		weight: -0.03999799128839761,
		gater: null
	},
	{
		from: 89,
		to: 373,
		weight: 0.056279240534228336,
		gater: null
	},
	{
		from: 89,
		to: 374,
		weight: -0.059694058241482176,
		gater: null
	},
	{
		from: 89,
		to: 375,
		weight: -0.03294434703285609,
		gater: null
	},
	{
		from: 89,
		to: 376,
		weight: 0.054827013539318126,
		gater: null
	},
	{
		from: 89,
		to: 377,
		weight: 0.003734709386439314,
		gater: null
	},
	{
		from: 89,
		to: 378,
		weight: -0.049363148970352766,
		gater: null
	},
	{
		from: 89,
		to: 379,
		weight: 0.014180937989836731,
		gater: null
	},
	{
		from: 90,
		to: 360,
		weight: -0.0015182341072209338,
		gater: null
	},
	{
		from: 90,
		to: 361,
		weight: -0.06346491047400611,
		gater: null
	},
	{
		from: 90,
		to: 362,
		weight: -0.030139268589774032,
		gater: null
	},
	{
		from: 90,
		to: 363,
		weight: -0.06564705388628664,
		gater: null
	},
	{
		from: 90,
		to: 364,
		weight: 0.08877716309232042,
		gater: null
	},
	{
		from: 90,
		to: 365,
		weight: 0.027406927406629478,
		gater: null
	},
	{
		from: 90,
		to: 366,
		weight: 0.005580935749911836,
		gater: null
	},
	{
		from: 90,
		to: 367,
		weight: -0.07234986355974855,
		gater: null
	},
	{
		from: 90,
		to: 368,
		weight: -0.0434285957514152,
		gater: null
	},
	{
		from: 90,
		to: 369,
		weight: -0.09050338508280556,
		gater: null
	},
	{
		from: 90,
		to: 370,
		weight: 0.051804900166501494,
		gater: null
	},
	{
		from: 90,
		to: 371,
		weight: -0.03660814959555987,
		gater: null
	},
	{
		from: 90,
		to: 372,
		weight: 0.08413993468275036,
		gater: null
	},
	{
		from: 90,
		to: 373,
		weight: 0.07594611098399909,
		gater: null
	},
	{
		from: 90,
		to: 374,
		weight: 0.07750746801200253,
		gater: null
	},
	{
		from: 90,
		to: 375,
		weight: 0.06546948446975503,
		gater: null
	},
	{
		from: 90,
		to: 376,
		weight: 0.030864160424168563,
		gater: null
	},
	{
		from: 90,
		to: 377,
		weight: -0.01448080273913574,
		gater: null
	},
	{
		from: 90,
		to: 378,
		weight: 0.083134480462938,
		gater: null
	},
	{
		from: 90,
		to: 379,
		weight: 0.030072494408037415,
		gater: null
	},
	{
		from: 91,
		to: 360,
		weight: 0.047750035559048276,
		gater: null
	},
	{
		from: 91,
		to: 361,
		weight: -0.014408155490257354,
		gater: null
	},
	{
		from: 91,
		to: 362,
		weight: 0.07247373930512888,
		gater: null
	},
	{
		from: 91,
		to: 363,
		weight: -0.06438248691841193,
		gater: null
	},
	{
		from: 91,
		to: 364,
		weight: -0.0153998364345449,
		gater: null
	},
	{
		from: 91,
		to: 365,
		weight: 0.09699780332825575,
		gater: null
	},
	{
		from: 91,
		to: 366,
		weight: -0.007694669807272264,
		gater: null
	},
	{
		from: 91,
		to: 367,
		weight: -0.007032180379052955,
		gater: null
	},
	{
		from: 91,
		to: 368,
		weight: -0.09525182207495973,
		gater: null
	},
	{
		from: 91,
		to: 369,
		weight: -0.02550630073555045,
		gater: null
	},
	{
		from: 91,
		to: 370,
		weight: 0.038287722555607834,
		gater: null
	},
	{
		from: 91,
		to: 371,
		weight: -0.03258349900932944,
		gater: null
	},
	{
		from: 91,
		to: 372,
		weight: -0.022494739908219014,
		gater: null
	},
	{
		from: 91,
		to: 373,
		weight: 0.06172993743320507,
		gater: null
	},
	{
		from: 91,
		to: 374,
		weight: -0.08961162831704882,
		gater: null
	},
	{
		from: 91,
		to: 375,
		weight: 0.09832084820190268,
		gater: null
	},
	{
		from: 91,
		to: 376,
		weight: -0.027410374278499378,
		gater: null
	},
	{
		from: 91,
		to: 377,
		weight: -0.05242502982494779,
		gater: null
	},
	{
		from: 91,
		to: 378,
		weight: -0.0416689020710241,
		gater: null
	},
	{
		from: 91,
		to: 379,
		weight: 0.08220475746668518,
		gater: null
	},
	{
		from: 92,
		to: 360,
		weight: -0.020056479035834143,
		gater: null
	},
	{
		from: 92,
		to: 361,
		weight: -0.09850977121026494,
		gater: null
	},
	{
		from: 92,
		to: 362,
		weight: 0.05852181519912966,
		gater: null
	},
	{
		from: 92,
		to: 363,
		weight: 0.08915543892499486,
		gater: null
	},
	{
		from: 92,
		to: 364,
		weight: 0.052919873826168445,
		gater: null
	},
	{
		from: 92,
		to: 365,
		weight: -0.05747929464128872,
		gater: null
	},
	{
		from: 92,
		to: 366,
		weight: 0.0362593713382752,
		gater: null
	},
	{
		from: 92,
		to: 367,
		weight: 0.05190645052852308,
		gater: null
	},
	{
		from: 92,
		to: 368,
		weight: -0.04193996265119085,
		gater: null
	},
	{
		from: 92,
		to: 369,
		weight: 0.052286844903354085,
		gater: null
	},
	{
		from: 92,
		to: 370,
		weight: -0.05064791064759442,
		gater: null
	},
	{
		from: 92,
		to: 371,
		weight: 0.04841729240459794,
		gater: null
	},
	{
		from: 92,
		to: 372,
		weight: -0.004481368072504835,
		gater: null
	},
	{
		from: 92,
		to: 373,
		weight: 0.0741866326095415,
		gater: null
	},
	{
		from: 92,
		to: 374,
		weight: -0.03988060694453171,
		gater: null
	},
	{
		from: 92,
		to: 375,
		weight: 0.01871085731023192,
		gater: null
	},
	{
		from: 92,
		to: 376,
		weight: -0.003178362538897514,
		gater: null
	},
	{
		from: 92,
		to: 377,
		weight: 0.015224893436888903,
		gater: null
	},
	{
		from: 92,
		to: 378,
		weight: 0.05285734448429488,
		gater: null
	},
	{
		from: 92,
		to: 379,
		weight: -0.070701979413615,
		gater: null
	},
	{
		from: 93,
		to: 360,
		weight: 0.004494801051852182,
		gater: null
	},
	{
		from: 93,
		to: 361,
		weight: -0.07645322617846757,
		gater: null
	},
	{
		from: 93,
		to: 362,
		weight: 0.08113368564288681,
		gater: null
	},
	{
		from: 93,
		to: 363,
		weight: -0.006441297903571994,
		gater: null
	},
	{
		from: 93,
		to: 364,
		weight: -0.015483210461865404,
		gater: null
	},
	{
		from: 93,
		to: 365,
		weight: -0.03741979887409,
		gater: null
	},
	{
		from: 93,
		to: 366,
		weight: -0.08356400886062142,
		gater: null
	},
	{
		from: 93,
		to: 367,
		weight: 0.0751881801835412,
		gater: null
	},
	{
		from: 93,
		to: 368,
		weight: -0.07936664368032723,
		gater: null
	},
	{
		from: 93,
		to: 369,
		weight: 0.038311155364466026,
		gater: null
	},
	{
		from: 93,
		to: 370,
		weight: 0.09236048132437885,
		gater: null
	},
	{
		from: 93,
		to: 371,
		weight: -0.018084129643498675,
		gater: null
	},
	{
		from: 93,
		to: 372,
		weight: 0.0533785986535755,
		gater: null
	},
	{
		from: 93,
		to: 373,
		weight: 0.028738480385060466,
		gater: null
	},
	{
		from: 93,
		to: 374,
		weight: 0.022798473503282235,
		gater: null
	},
	{
		from: 93,
		to: 375,
		weight: 0.06258355038307992,
		gater: null
	},
	{
		from: 93,
		to: 376,
		weight: -0.0017547786709541102,
		gater: null
	},
	{
		from: 93,
		to: 377,
		weight: 0.009872415942000681,
		gater: null
	},
	{
		from: 93,
		to: 378,
		weight: 0.006952846812046817,
		gater: null
	},
	{
		from: 93,
		to: 379,
		weight: 0.06147669111901122,
		gater: null
	},
	{
		from: 94,
		to: 360,
		weight: 0.023083117099139724,
		gater: null
	},
	{
		from: 94,
		to: 361,
		weight: 0.003076912908974494,
		gater: null
	},
	{
		from: 94,
		to: 362,
		weight: -0.05288949723555869,
		gater: null
	},
	{
		from: 94,
		to: 363,
		weight: 0.02072138527332741,
		gater: null
	},
	{
		from: 94,
		to: 364,
		weight: 0.07632437957000243,
		gater: null
	},
	{
		from: 94,
		to: 365,
		weight: -0.05865981935820091,
		gater: null
	},
	{
		from: 94,
		to: 366,
		weight: -0.03948140955842976,
		gater: null
	},
	{
		from: 94,
		to: 367,
		weight: 0.019497692693046048,
		gater: null
	},
	{
		from: 94,
		to: 368,
		weight: -0.09234790266317178,
		gater: null
	},
	{
		from: 94,
		to: 369,
		weight: -0.01573030764746801,
		gater: null
	},
	{
		from: 94,
		to: 370,
		weight: -0.006480146128645628,
		gater: null
	},
	{
		from: 94,
		to: 371,
		weight: -0.06879193558269377,
		gater: null
	},
	{
		from: 94,
		to: 372,
		weight: -0.05049504225363282,
		gater: null
	},
	{
		from: 94,
		to: 373,
		weight: -0.060815360359789364,
		gater: null
	},
	{
		from: 94,
		to: 374,
		weight: 0.005500115518100077,
		gater: null
	},
	{
		from: 94,
		to: 375,
		weight: 0.03163892382665018,
		gater: null
	},
	{
		from: 94,
		to: 376,
		weight: -0.07587267870965611,
		gater: null
	},
	{
		from: 94,
		to: 377,
		weight: -0.04915731067686733,
		gater: null
	},
	{
		from: 94,
		to: 378,
		weight: -0.06548916275249157,
		gater: null
	},
	{
		from: 94,
		to: 379,
		weight: -0.017482220967455622,
		gater: null
	},
	{
		from: 95,
		to: 360,
		weight: 0.04085003257942904,
		gater: null
	},
	{
		from: 95,
		to: 361,
		weight: -0.04233522367201151,
		gater: null
	},
	{
		from: 95,
		to: 362,
		weight: -0.06872924953811191,
		gater: null
	},
	{
		from: 95,
		to: 363,
		weight: -0.01154419088111483,
		gater: null
	},
	{
		from: 95,
		to: 364,
		weight: -0.07178390251115002,
		gater: null
	},
	{
		from: 95,
		to: 365,
		weight: -0.019070260947008005,
		gater: null
	},
	{
		from: 95,
		to: 366,
		weight: 0.0813582983546812,
		gater: null
	},
	{
		from: 95,
		to: 367,
		weight: 0.07466241376766522,
		gater: null
	},
	{
		from: 95,
		to: 368,
		weight: -0.06046435282807292,
		gater: null
	},
	{
		from: 95,
		to: 369,
		weight: 0.04263472208485028,
		gater: null
	},
	{
		from: 95,
		to: 370,
		weight: -0.09082158779497274,
		gater: null
	},
	{
		from: 95,
		to: 371,
		weight: 0.043398681539912415,
		gater: null
	},
	{
		from: 95,
		to: 372,
		weight: -0.0969453016305216,
		gater: null
	},
	{
		from: 95,
		to: 373,
		weight: 0.0754839780793721,
		gater: null
	},
	{
		from: 95,
		to: 374,
		weight: -0.0576963954726673,
		gater: null
	},
	{
		from: 95,
		to: 375,
		weight: 0.04399884852381075,
		gater: null
	},
	{
		from: 95,
		to: 376,
		weight: 0.02660734363699091,
		gater: null
	},
	{
		from: 95,
		to: 377,
		weight: -0.03133079614319745,
		gater: null
	},
	{
		from: 95,
		to: 378,
		weight: -0.024903468509805474,
		gater: null
	},
	{
		from: 95,
		to: 379,
		weight: -0.09926681414692191,
		gater: null
	},
	{
		from: 96,
		to: 360,
		weight: 0.012917782120140456,
		gater: null
	},
	{
		from: 96,
		to: 361,
		weight: 0.023759526828469518,
		gater: null
	},
	{
		from: 96,
		to: 362,
		weight: -0.054978213813478144,
		gater: null
	},
	{
		from: 96,
		to: 363,
		weight: 0.015405549640321453,
		gater: null
	},
	{
		from: 96,
		to: 364,
		weight: 0.0002765582785515114,
		gater: null
	},
	{
		from: 96,
		to: 365,
		weight: 0.06926517596465986,
		gater: null
	},
	{
		from: 96,
		to: 366,
		weight: 0.01111118933936317,
		gater: null
	},
	{
		from: 96,
		to: 367,
		weight: 0.026204751544229687,
		gater: null
	},
	{
		from: 96,
		to: 368,
		weight: 0.006420070559051319,
		gater: null
	},
	{
		from: 96,
		to: 369,
		weight: -0.06971507674282229,
		gater: null
	},
	{
		from: 96,
		to: 370,
		weight: -0.002733924940393484,
		gater: null
	},
	{
		from: 96,
		to: 371,
		weight: -0.003372315858516828,
		gater: null
	},
	{
		from: 96,
		to: 372,
		weight: 0.0032782663610796126,
		gater: null
	},
	{
		from: 96,
		to: 373,
		weight: 0.0031614186759306995,
		gater: null
	},
	{
		from: 96,
		to: 374,
		weight: -0.004685938301066589,
		gater: null
	},
	{
		from: 96,
		to: 375,
		weight: -0.08053345958163725,
		gater: null
	},
	{
		from: 96,
		to: 376,
		weight: -0.008770179989987387,
		gater: null
	},
	{
		from: 96,
		to: 377,
		weight: -0.029575919559369543,
		gater: null
	},
	{
		from: 96,
		to: 378,
		weight: 0.09694011428959823,
		gater: null
	},
	{
		from: 96,
		to: 379,
		weight: 0.08580984597197214,
		gater: null
	},
	{
		from: 97,
		to: 360,
		weight: 0.0681454395888273,
		gater: null
	},
	{
		from: 97,
		to: 361,
		weight: -0.023673523236764055,
		gater: null
	},
	{
		from: 97,
		to: 362,
		weight: -0.09918778349487063,
		gater: null
	},
	{
		from: 97,
		to: 363,
		weight: 0.04460148528681157,
		gater: null
	},
	{
		from: 97,
		to: 364,
		weight: -0.003758817179534149,
		gater: null
	},
	{
		from: 97,
		to: 365,
		weight: 0.07686540779170317,
		gater: null
	},
	{
		from: 97,
		to: 366,
		weight: 0.09856034744427036,
		gater: null
	},
	{
		from: 97,
		to: 367,
		weight: 0.018074619962935398,
		gater: null
	},
	{
		from: 97,
		to: 368,
		weight: -0.008824780271997623,
		gater: null
	},
	{
		from: 97,
		to: 369,
		weight: -0.025207221405726538,
		gater: null
	},
	{
		from: 97,
		to: 370,
		weight: 0.008156744004397476,
		gater: null
	},
	{
		from: 97,
		to: 371,
		weight: 0.007843247213671273,
		gater: null
	},
	{
		from: 97,
		to: 372,
		weight: 0.014527688550757617,
		gater: null
	},
	{
		from: 97,
		to: 373,
		weight: 0.011159621636125522,
		gater: null
	},
	{
		from: 97,
		to: 374,
		weight: -0.07719952775500222,
		gater: null
	},
	{
		from: 97,
		to: 375,
		weight: -0.010012474381302289,
		gater: null
	},
	{
		from: 97,
		to: 376,
		weight: 0.07879346797132578,
		gater: null
	},
	{
		from: 97,
		to: 377,
		weight: -0.020985750806674197,
		gater: null
	},
	{
		from: 97,
		to: 378,
		weight: 0.00803565885759601,
		gater: null
	},
	{
		from: 97,
		to: 379,
		weight: -0.006928451795856466,
		gater: null
	},
	{
		from: 98,
		to: 360,
		weight: -0.05542691316930975,
		gater: null
	},
	{
		from: 98,
		to: 361,
		weight: -0.017323901247521117,
		gater: null
	},
	{
		from: 98,
		to: 362,
		weight: 0.07933417188664965,
		gater: null
	},
	{
		from: 98,
		to: 363,
		weight: 0.049488204252298384,
		gater: null
	},
	{
		from: 98,
		to: 364,
		weight: 0.0003123718967596584,
		gater: null
	},
	{
		from: 98,
		to: 365,
		weight: 0.09781848783661187,
		gater: null
	},
	{
		from: 98,
		to: 366,
		weight: 0.033337779382579175,
		gater: null
	},
	{
		from: 98,
		to: 367,
		weight: 0.020378349460263484,
		gater: null
	},
	{
		from: 98,
		to: 368,
		weight: 0.044303661032507685,
		gater: null
	},
	{
		from: 98,
		to: 369,
		weight: 0.016574194217819874,
		gater: null
	},
	{
		from: 98,
		to: 370,
		weight: 0.05679485611073373,
		gater: null
	},
	{
		from: 98,
		to: 371,
		weight: -0.027407663339907767,
		gater: null
	},
	{
		from: 98,
		to: 372,
		weight: -0.0996414934119033,
		gater: null
	},
	{
		from: 98,
		to: 373,
		weight: -0.07022949513299981,
		gater: null
	},
	{
		from: 98,
		to: 374,
		weight: -0.011681874164487335,
		gater: null
	},
	{
		from: 98,
		to: 375,
		weight: -0.010373279827881318,
		gater: null
	},
	{
		from: 98,
		to: 376,
		weight: 0.0661903461024512,
		gater: null
	},
	{
		from: 98,
		to: 377,
		weight: 0.010017120762355128,
		gater: null
	},
	{
		from: 98,
		to: 378,
		weight: -0.015185321865538406,
		gater: null
	},
	{
		from: 98,
		to: 379,
		weight: 0.07686288296159471,
		gater: null
	},
	{
		from: 99,
		to: 360,
		weight: -0.060251682702409375,
		gater: null
	},
	{
		from: 99,
		to: 361,
		weight: 0.0217548685569815,
		gater: null
	},
	{
		from: 99,
		to: 362,
		weight: 0.0672338576181574,
		gater: null
	},
	{
		from: 99,
		to: 363,
		weight: -0.05325484312300897,
		gater: null
	},
	{
		from: 99,
		to: 364,
		weight: -0.0954791399911556,
		gater: null
	},
	{
		from: 99,
		to: 365,
		weight: 0.059971022120798745,
		gater: null
	},
	{
		from: 99,
		to: 366,
		weight: 0.042092655169316734,
		gater: null
	},
	{
		from: 99,
		to: 367,
		weight: 0.06564607755187277,
		gater: null
	},
	{
		from: 99,
		to: 368,
		weight: 0.07387235780168369,
		gater: null
	},
	{
		from: 99,
		to: 369,
		weight: -0.05273481419003696,
		gater: null
	},
	{
		from: 99,
		to: 370,
		weight: 0.009112458524099323,
		gater: null
	},
	{
		from: 99,
		to: 371,
		weight: 0.05648089874247725,
		gater: null
	},
	{
		from: 99,
		to: 372,
		weight: 0.04057921345502907,
		gater: null
	},
	{
		from: 99,
		to: 373,
		weight: -0.06339361098490498,
		gater: null
	},
	{
		from: 99,
		to: 374,
		weight: 0.02227084944711244,
		gater: null
	},
	{
		from: 99,
		to: 375,
		weight: 0.08302167637512822,
		gater: null
	},
	{
		from: 99,
		to: 376,
		weight: -0.04972834162828752,
		gater: null
	},
	{
		from: 99,
		to: 377,
		weight: 0.09524533448297987,
		gater: null
	},
	{
		from: 99,
		to: 378,
		weight: -0.09274940934356271,
		gater: null
	},
	{
		from: 99,
		to: 379,
		weight: 0.04585939471233877,
		gater: null
	},
	{
		from: 100,
		to: 360,
		weight: -0.025718714463023012,
		gater: null
	},
	{
		from: 100,
		to: 361,
		weight: -0.030675954178560977,
		gater: null
	},
	{
		from: 100,
		to: 362,
		weight: 0.09214351084908046,
		gater: null
	},
	{
		from: 100,
		to: 363,
		weight: -0.0575559059438954,
		gater: null
	},
	{
		from: 100,
		to: 364,
		weight: 0.058369894449893905,
		gater: null
	},
	{
		from: 100,
		to: 365,
		weight: -0.029549927279018284,
		gater: null
	},
	{
		from: 100,
		to: 366,
		weight: -0.07479097400319486,
		gater: null
	},
	{
		from: 100,
		to: 367,
		weight: -0.09393352337621655,
		gater: null
	},
	{
		from: 100,
		to: 368,
		weight: -0.002837071824626808,
		gater: null
	},
	{
		from: 100,
		to: 369,
		weight: -0.08552950881203075,
		gater: null
	},
	{
		from: 100,
		to: 370,
		weight: -0.06767562868808188,
		gater: null
	},
	{
		from: 100,
		to: 371,
		weight: 0.05885793505040149,
		gater: null
	},
	{
		from: 100,
		to: 372,
		weight: 0.057390081099349594,
		gater: null
	},
	{
		from: 100,
		to: 373,
		weight: 0.0037728209048428357,
		gater: null
	},
	{
		from: 100,
		to: 374,
		weight: 0.05698440214346842,
		gater: null
	},
	{
		from: 100,
		to: 375,
		weight: -0.0690589626248399,
		gater: null
	},
	{
		from: 100,
		to: 376,
		weight: 0.022683149730282667,
		gater: null
	},
	{
		from: 100,
		to: 377,
		weight: -0.01823554495440108,
		gater: null
	},
	{
		from: 100,
		to: 378,
		weight: -0.09885013752850025,
		gater: null
	},
	{
		from: 100,
		to: 379,
		weight: 0.010817051901252567,
		gater: null
	},
	{
		from: 101,
		to: 360,
		weight: 0.03820535227008098,
		gater: null
	},
	{
		from: 101,
		to: 361,
		weight: -0.000045034487860334815,
		gater: null
	},
	{
		from: 101,
		to: 362,
		weight: -0.031201447209027053,
		gater: null
	},
	{
		from: 101,
		to: 363,
		weight: -0.016823320344663092,
		gater: null
	},
	{
		from: 101,
		to: 364,
		weight: 0.05254639499424352,
		gater: null
	},
	{
		from: 101,
		to: 365,
		weight: 0.015962750152608368,
		gater: null
	},
	{
		from: 101,
		to: 366,
		weight: -0.03865023817599056,
		gater: null
	},
	{
		from: 101,
		to: 367,
		weight: -0.07044720092447809,
		gater: null
	},
	{
		from: 101,
		to: 368,
		weight: 0.023204738744293477,
		gater: null
	},
	{
		from: 101,
		to: 369,
		weight: 0.08965667455841972,
		gater: null
	},
	{
		from: 101,
		to: 370,
		weight: 0.02124091999993656,
		gater: null
	},
	{
		from: 101,
		to: 371,
		weight: -0.03209810748156326,
		gater: null
	},
	{
		from: 101,
		to: 372,
		weight: 0.03461337231071632,
		gater: null
	},
	{
		from: 101,
		to: 373,
		weight: 0.005686264565750984,
		gater: null
	},
	{
		from: 101,
		to: 374,
		weight: 0.08037470639327379,
		gater: null
	},
	{
		from: 101,
		to: 375,
		weight: -0.09077100358346578,
		gater: null
	},
	{
		from: 101,
		to: 376,
		weight: -0.0197561906219013,
		gater: null
	},
	{
		from: 101,
		to: 377,
		weight: -0.00850673865658122,
		gater: null
	},
	{
		from: 101,
		to: 378,
		weight: 0.08863803414576485,
		gater: null
	},
	{
		from: 101,
		to: 379,
		weight: -0.09835985867436033,
		gater: null
	},
	{
		from: 102,
		to: 360,
		weight: 0.03458250457166087,
		gater: null
	},
	{
		from: 102,
		to: 361,
		weight: -0.007301454245375177,
		gater: null
	},
	{
		from: 102,
		to: 362,
		weight: 0.07668583308263274,
		gater: null
	},
	{
		from: 102,
		to: 363,
		weight: -0.022418617240055477,
		gater: null
	},
	{
		from: 102,
		to: 364,
		weight: 0.011441038470210649,
		gater: null
	},
	{
		from: 102,
		to: 365,
		weight: 0.05289903335221191,
		gater: null
	},
	{
		from: 102,
		to: 366,
		weight: 0.0032690570171527433,
		gater: null
	},
	{
		from: 102,
		to: 367,
		weight: 0.041571643043852774,
		gater: null
	},
	{
		from: 102,
		to: 368,
		weight: -0.03571337179761547,
		gater: null
	},
	{
		from: 102,
		to: 369,
		weight: -0.0662002430206437,
		gater: null
	},
	{
		from: 102,
		to: 370,
		weight: -0.0888981052121019,
		gater: null
	},
	{
		from: 102,
		to: 371,
		weight: -0.05678577859217877,
		gater: null
	},
	{
		from: 102,
		to: 372,
		weight: -0.05630960312085396,
		gater: null
	},
	{
		from: 102,
		to: 373,
		weight: -0.02122528813996674,
		gater: null
	},
	{
		from: 102,
		to: 374,
		weight: -0.09426713678973919,
		gater: null
	},
	{
		from: 102,
		to: 375,
		weight: -0.003850025505545668,
		gater: null
	},
	{
		from: 102,
		to: 376,
		weight: 0.06190354547667118,
		gater: null
	},
	{
		from: 102,
		to: 377,
		weight: 0.018643075627955905,
		gater: null
	},
	{
		from: 102,
		to: 378,
		weight: -0.019349881809552064,
		gater: null
	},
	{
		from: 102,
		to: 379,
		weight: 0.07606349143336386,
		gater: null
	},
	{
		from: 103,
		to: 360,
		weight: -0.020357964023191094,
		gater: null
	},
	{
		from: 103,
		to: 361,
		weight: 0.07198389583219086,
		gater: null
	},
	{
		from: 103,
		to: 362,
		weight: -0.03817333622715342,
		gater: null
	},
	{
		from: 103,
		to: 363,
		weight: 0.03760836801315204,
		gater: null
	},
	{
		from: 103,
		to: 364,
		weight: 0.058608710215216325,
		gater: null
	},
	{
		from: 103,
		to: 365,
		weight: -0.06748969395063362,
		gater: null
	},
	{
		from: 103,
		to: 366,
		weight: -0.04252028699615478,
		gater: null
	},
	{
		from: 103,
		to: 367,
		weight: -0.04465676790757658,
		gater: null
	},
	{
		from: 103,
		to: 368,
		weight: 0.0040604954145822825,
		gater: null
	},
	{
		from: 103,
		to: 369,
		weight: 0.049013197254919316,
		gater: null
	},
	{
		from: 103,
		to: 370,
		weight: -0.008715265783224652,
		gater: null
	},
	{
		from: 103,
		to: 371,
		weight: 0.07573745151412581,
		gater: null
	},
	{
		from: 103,
		to: 372,
		weight: -0.02802305058092673,
		gater: null
	},
	{
		from: 103,
		to: 373,
		weight: -0.012128233303187269,
		gater: null
	},
	{
		from: 103,
		to: 374,
		weight: 0.09491842005526202,
		gater: null
	},
	{
		from: 103,
		to: 375,
		weight: -0.0788511678059182,
		gater: null
	},
	{
		from: 103,
		to: 376,
		weight: -0.05324817657987642,
		gater: null
	},
	{
		from: 103,
		to: 377,
		weight: -0.040812113065395964,
		gater: null
	},
	{
		from: 103,
		to: 378,
		weight: 0.04729028690272852,
		gater: null
	},
	{
		from: 103,
		to: 379,
		weight: -0.09546379934487392,
		gater: null
	},
	{
		from: 104,
		to: 360,
		weight: -0.07587220222673641,
		gater: null
	},
	{
		from: 104,
		to: 361,
		weight: -0.050680991762111605,
		gater: null
	},
	{
		from: 104,
		to: 362,
		weight: 0.006612766797948394,
		gater: null
	},
	{
		from: 104,
		to: 363,
		weight: 0.09762428276458365,
		gater: null
	},
	{
		from: 104,
		to: 364,
		weight: -0.0385689216618351,
		gater: null
	},
	{
		from: 104,
		to: 365,
		weight: 0.03976470218027067,
		gater: null
	},
	{
		from: 104,
		to: 366,
		weight: 0.02616053279337449,
		gater: null
	},
	{
		from: 104,
		to: 367,
		weight: 0.07502004393941575,
		gater: null
	},
	{
		from: 104,
		to: 368,
		weight: 0.08439516590580753,
		gater: null
	},
	{
		from: 104,
		to: 369,
		weight: -0.0329739701965107,
		gater: null
	},
	{
		from: 104,
		to: 370,
		weight: -0.08127477982295682,
		gater: null
	},
	{
		from: 104,
		to: 371,
		weight: 0.08839804338356347,
		gater: null
	},
	{
		from: 104,
		to: 372,
		weight: -0.027695954606105966,
		gater: null
	},
	{
		from: 104,
		to: 373,
		weight: -0.06278635843828337,
		gater: null
	},
	{
		from: 104,
		to: 374,
		weight: -0.0019891574193043604,
		gater: null
	},
	{
		from: 104,
		to: 375,
		weight: 0.07113546004965596,
		gater: null
	},
	{
		from: 104,
		to: 376,
		weight: -0.09830361342387968,
		gater: null
	},
	{
		from: 104,
		to: 377,
		weight: 0.031350528099391595,
		gater: null
	},
	{
		from: 104,
		to: 378,
		weight: -0.015468796147854388,
		gater: null
	},
	{
		from: 104,
		to: 379,
		weight: 0.004653329476966173,
		gater: null
	},
	{
		from: 105,
		to: 360,
		weight: -0.05045765914728251,
		gater: null
	},
	{
		from: 105,
		to: 361,
		weight: 0.04096555813676103,
		gater: null
	},
	{
		from: 105,
		to: 362,
		weight: 0.04723761596464321,
		gater: null
	},
	{
		from: 105,
		to: 363,
		weight: -0.03710920135063622,
		gater: null
	},
	{
		from: 105,
		to: 364,
		weight: 0.07678375802283674,
		gater: null
	},
	{
		from: 105,
		to: 365,
		weight: 0.032125566829688645,
		gater: null
	},
	{
		from: 105,
		to: 366,
		weight: -0.04575020050511798,
		gater: null
	},
	{
		from: 105,
		to: 367,
		weight: 0.024104666928525198,
		gater: null
	},
	{
		from: 105,
		to: 368,
		weight: 0.07230464154857241,
		gater: null
	},
	{
		from: 105,
		to: 369,
		weight: -0.010208850326824725,
		gater: null
	},
	{
		from: 105,
		to: 370,
		weight: -0.0017469842168784666,
		gater: null
	},
	{
		from: 105,
		to: 371,
		weight: -0.018014988343663912,
		gater: null
	},
	{
		from: 105,
		to: 372,
		weight: 0.018277124910639306,
		gater: null
	},
	{
		from: 105,
		to: 373,
		weight: -0.0033682538685955166,
		gater: null
	},
	{
		from: 105,
		to: 374,
		weight: -0.04827137889593694,
		gater: null
	},
	{
		from: 105,
		to: 375,
		weight: -0.03368272970748558,
		gater: null
	},
	{
		from: 105,
		to: 376,
		weight: 0.04980351139030731,
		gater: null
	},
	{
		from: 105,
		to: 377,
		weight: -0.03302574014839857,
		gater: null
	},
	{
		from: 105,
		to: 378,
		weight: -0.05239785490973419,
		gater: null
	},
	{
		from: 105,
		to: 379,
		weight: 0.0036026330515171318,
		gater: null
	},
	{
		from: 106,
		to: 360,
		weight: 0.06821981489467338,
		gater: null
	},
	{
		from: 106,
		to: 361,
		weight: 0.010055666195566332,
		gater: null
	},
	{
		from: 106,
		to: 362,
		weight: 0.016618350172269203,
		gater: null
	},
	{
		from: 106,
		to: 363,
		weight: -0.09363348438703856,
		gater: null
	},
	{
		from: 106,
		to: 364,
		weight: -0.02183179346252087,
		gater: null
	},
	{
		from: 106,
		to: 365,
		weight: 0.0875434061825843,
		gater: null
	},
	{
		from: 106,
		to: 366,
		weight: -0.08227752294786375,
		gater: null
	},
	{
		from: 106,
		to: 367,
		weight: -0.02534695349647982,
		gater: null
	},
	{
		from: 106,
		to: 368,
		weight: 0.0975278749145086,
		gater: null
	},
	{
		from: 106,
		to: 369,
		weight: -0.05308550938688819,
		gater: null
	},
	{
		from: 106,
		to: 370,
		weight: 0.04043451681248453,
		gater: null
	},
	{
		from: 106,
		to: 371,
		weight: 0.034734545542982886,
		gater: null
	},
	{
		from: 106,
		to: 372,
		weight: -0.03412651182250688,
		gater: null
	},
	{
		from: 106,
		to: 373,
		weight: -0.09717603841520953,
		gater: null
	},
	{
		from: 106,
		to: 374,
		weight: 0.05637349813307885,
		gater: null
	},
	{
		from: 106,
		to: 375,
		weight: -0.04517637531740846,
		gater: null
	},
	{
		from: 106,
		to: 376,
		weight: 0.04380315130486054,
		gater: null
	},
	{
		from: 106,
		to: 377,
		weight: -0.09023686467005265,
		gater: null
	},
	{
		from: 106,
		to: 378,
		weight: -0.08281831153481028,
		gater: null
	},
	{
		from: 106,
		to: 379,
		weight: 0.02676354118530791,
		gater: null
	},
	{
		from: 107,
		to: 360,
		weight: 0.06810318705383814,
		gater: null
	},
	{
		from: 107,
		to: 361,
		weight: -0.07572865712146806,
		gater: null
	},
	{
		from: 107,
		to: 362,
		weight: -0.05702533551600491,
		gater: null
	},
	{
		from: 107,
		to: 363,
		weight: 0.05839886212845399,
		gater: null
	},
	{
		from: 107,
		to: 364,
		weight: 0.09519738925111673,
		gater: null
	},
	{
		from: 107,
		to: 365,
		weight: 0.047065936202988434,
		gater: null
	},
	{
		from: 107,
		to: 366,
		weight: -0.07998297925510296,
		gater: null
	},
	{
		from: 107,
		to: 367,
		weight: -0.033863473563519805,
		gater: null
	},
	{
		from: 107,
		to: 368,
		weight: 0.07220840779494112,
		gater: null
	},
	{
		from: 107,
		to: 369,
		weight: 0.01915251514132099,
		gater: null
	},
	{
		from: 107,
		to: 370,
		weight: 0.040924977747914676,
		gater: null
	},
	{
		from: 107,
		to: 371,
		weight: -0.06759085849238775,
		gater: null
	},
	{
		from: 107,
		to: 372,
		weight: -0.09260346625946125,
		gater: null
	},
	{
		from: 107,
		to: 373,
		weight: 0.049397805139988676,
		gater: null
	},
	{
		from: 107,
		to: 374,
		weight: 0.009751502245805593,
		gater: null
	},
	{
		from: 107,
		to: 375,
		weight: 0.07720207378031319,
		gater: null
	},
	{
		from: 107,
		to: 376,
		weight: 0.0667534709994084,
		gater: null
	},
	{
		from: 107,
		to: 377,
		weight: -0.02144073333481429,
		gater: null
	},
	{
		from: 107,
		to: 378,
		weight: -0.09202026151193926,
		gater: null
	},
	{
		from: 107,
		to: 379,
		weight: -0.029622834213642868,
		gater: null
	},
	{
		from: 108,
		to: 360,
		weight: -0.07616911687561263,
		gater: null
	},
	{
		from: 108,
		to: 361,
		weight: -0.08171026596783998,
		gater: null
	},
	{
		from: 108,
		to: 362,
		weight: -0.056981018187003546,
		gater: null
	},
	{
		from: 108,
		to: 363,
		weight: -0.014016459708833612,
		gater: null
	},
	{
		from: 108,
		to: 364,
		weight: -0.03961680425115741,
		gater: null
	},
	{
		from: 108,
		to: 365,
		weight: -0.04318150613645484,
		gater: null
	},
	{
		from: 108,
		to: 366,
		weight: 0.00008858263628486185,
		gater: null
	},
	{
		from: 108,
		to: 367,
		weight: -0.04017970778715019,
		gater: null
	},
	{
		from: 108,
		to: 368,
		weight: -0.02144161385445434,
		gater: null
	},
	{
		from: 108,
		to: 369,
		weight: -0.00041614697655564803,
		gater: null
	},
	{
		from: 108,
		to: 370,
		weight: 0.003589262268184526,
		gater: null
	},
	{
		from: 108,
		to: 371,
		weight: 0.008352099905507337,
		gater: null
	},
	{
		from: 108,
		to: 372,
		weight: -0.06415072032388976,
		gater: null
	},
	{
		from: 108,
		to: 373,
		weight: -0.03693677575402475,
		gater: null
	},
	{
		from: 108,
		to: 374,
		weight: -0.058571694790022916,
		gater: null
	},
	{
		from: 108,
		to: 375,
		weight: 0.0535089643061791,
		gater: null
	},
	{
		from: 108,
		to: 376,
		weight: -0.04744911628147613,
		gater: null
	},
	{
		from: 108,
		to: 377,
		weight: -0.0016604427302399777,
		gater: null
	},
	{
		from: 108,
		to: 378,
		weight: -0.09352480913633072,
		gater: null
	},
	{
		from: 108,
		to: 379,
		weight: -0.07528986135427798,
		gater: null
	},
	{
		from: 109,
		to: 360,
		weight: -0.01951696411471278,
		gater: null
	},
	{
		from: 109,
		to: 361,
		weight: -0.043913007731856406,
		gater: null
	},
	{
		from: 109,
		to: 362,
		weight: 0.03085836723692914,
		gater: null
	},
	{
		from: 109,
		to: 363,
		weight: 0.030101579294309733,
		gater: null
	},
	{
		from: 109,
		to: 364,
		weight: 0.03793175881819827,
		gater: null
	},
	{
		from: 109,
		to: 365,
		weight: -0.07847668984860655,
		gater: null
	},
	{
		from: 109,
		to: 366,
		weight: -0.03320632328314983,
		gater: null
	},
	{
		from: 109,
		to: 367,
		weight: -0.055472254359970344,
		gater: null
	},
	{
		from: 109,
		to: 368,
		weight: 0.018853097816399433,
		gater: null
	},
	{
		from: 109,
		to: 369,
		weight: 0.060732285553874776,
		gater: null
	},
	{
		from: 109,
		to: 370,
		weight: -0.018487025749973005,
		gater: null
	},
	{
		from: 109,
		to: 371,
		weight: 0.03522162667057288,
		gater: null
	},
	{
		from: 109,
		to: 372,
		weight: 0.0080973585063739,
		gater: null
	},
	{
		from: 109,
		to: 373,
		weight: 0.08353462384358337,
		gater: null
	},
	{
		from: 109,
		to: 374,
		weight: 0.027680056567596756,
		gater: null
	},
	{
		from: 109,
		to: 375,
		weight: 0.07439417891424016,
		gater: null
	},
	{
		from: 109,
		to: 376,
		weight: -0.09992563204211376,
		gater: null
	},
	{
		from: 109,
		to: 377,
		weight: 0.034737979140679276,
		gater: null
	},
	{
		from: 109,
		to: 378,
		weight: -0.03840573114463979,
		gater: null
	},
	{
		from: 109,
		to: 379,
		weight: -0.02967645787846887,
		gater: null
	},
	{
		from: 110,
		to: 360,
		weight: 0.07460817856267124,
		gater: null
	},
	{
		from: 110,
		to: 361,
		weight: 0.05148992000818817,
		gater: null
	},
	{
		from: 110,
		to: 362,
		weight: 0.038723425476151346,
		gater: null
	},
	{
		from: 110,
		to: 363,
		weight: -0.03833661975051195,
		gater: null
	},
	{
		from: 110,
		to: 364,
		weight: 0.0727018299087284,
		gater: null
	},
	{
		from: 110,
		to: 365,
		weight: -0.09094582760907009,
		gater: null
	},
	{
		from: 110,
		to: 366,
		weight: 0.06252723669278512,
		gater: null
	},
	{
		from: 110,
		to: 367,
		weight: -0.04844528438304945,
		gater: null
	},
	{
		from: 110,
		to: 368,
		weight: 0.04437082367976494,
		gater: null
	},
	{
		from: 110,
		to: 369,
		weight: -0.09999192834976922,
		gater: null
	},
	{
		from: 110,
		to: 370,
		weight: 0.07211240325459417,
		gater: null
	},
	{
		from: 110,
		to: 371,
		weight: 0.04889929006556165,
		gater: null
	},
	{
		from: 110,
		to: 372,
		weight: 0.003163465650418515,
		gater: null
	},
	{
		from: 110,
		to: 373,
		weight: 0.0719638321897283,
		gater: null
	},
	{
		from: 110,
		to: 374,
		weight: -0.007361910053019199,
		gater: null
	},
	{
		from: 110,
		to: 375,
		weight: -0.036013335801485094,
		gater: null
	},
	{
		from: 110,
		to: 376,
		weight: -0.09131494322906929,
		gater: null
	},
	{
		from: 110,
		to: 377,
		weight: 0.08294539832992531,
		gater: null
	},
	{
		from: 110,
		to: 378,
		weight: 0.061476634650609346,
		gater: null
	},
	{
		from: 110,
		to: 379,
		weight: -0.04632934674548448,
		gater: null
	},
	{
		from: 111,
		to: 360,
		weight: 0.04749253250157176,
		gater: null
	},
	{
		from: 111,
		to: 361,
		weight: 0.030557183854952374,
		gater: null
	},
	{
		from: 111,
		to: 362,
		weight: 0.07898289831101965,
		gater: null
	},
	{
		from: 111,
		to: 363,
		weight: 0.04846158725935559,
		gater: null
	},
	{
		from: 111,
		to: 364,
		weight: -0.028100664134027037,
		gater: null
	},
	{
		from: 111,
		to: 365,
		weight: -0.09058932583504227,
		gater: null
	},
	{
		from: 111,
		to: 366,
		weight: 0.06687288000001829,
		gater: null
	},
	{
		from: 111,
		to: 367,
		weight: -0.08645874581316569,
		gater: null
	},
	{
		from: 111,
		to: 368,
		weight: 0.02173666092793161,
		gater: null
	},
	{
		from: 111,
		to: 369,
		weight: -0.031904632237492875,
		gater: null
	},
	{
		from: 111,
		to: 370,
		weight: 0.07878214498911085,
		gater: null
	},
	{
		from: 111,
		to: 371,
		weight: -0.03936116098215173,
		gater: null
	},
	{
		from: 111,
		to: 372,
		weight: 0.07123168556150478,
		gater: null
	},
	{
		from: 111,
		to: 373,
		weight: 0.009224794884727716,
		gater: null
	},
	{
		from: 111,
		to: 374,
		weight: -0.044206510564511664,
		gater: null
	},
	{
		from: 111,
		to: 375,
		weight: 0.0200993928694774,
		gater: null
	},
	{
		from: 111,
		to: 376,
		weight: -0.023441032913127963,
		gater: null
	},
	{
		from: 111,
		to: 377,
		weight: 0.07036535594497936,
		gater: null
	},
	{
		from: 111,
		to: 378,
		weight: -0.08171738067019817,
		gater: null
	},
	{
		from: 111,
		to: 379,
		weight: 0.048072899055517204,
		gater: null
	},
	{
		from: 112,
		to: 360,
		weight: -0.08019636807969843,
		gater: null
	},
	{
		from: 112,
		to: 361,
		weight: -0.09184332303044439,
		gater: null
	},
	{
		from: 112,
		to: 362,
		weight: 0.09583201595646182,
		gater: null
	},
	{
		from: 112,
		to: 363,
		weight: 0.052296403713821826,
		gater: null
	},
	{
		from: 112,
		to: 364,
		weight: -0.03134763729165528,
		gater: null
	},
	{
		from: 112,
		to: 365,
		weight: -0.05354198177087435,
		gater: null
	},
	{
		from: 112,
		to: 366,
		weight: -0.0259510880179009,
		gater: null
	},
	{
		from: 112,
		to: 367,
		weight: 0.03905517278776402,
		gater: null
	},
	{
		from: 112,
		to: 368,
		weight: 0.015517121609139914,
		gater: null
	},
	{
		from: 112,
		to: 369,
		weight: 0.07550852303117647,
		gater: null
	},
	{
		from: 112,
		to: 370,
		weight: -0.02632463807126531,
		gater: null
	},
	{
		from: 112,
		to: 371,
		weight: -0.05953621216188987,
		gater: null
	},
	{
		from: 112,
		to: 372,
		weight: -0.05268908368833607,
		gater: null
	},
	{
		from: 112,
		to: 373,
		weight: -0.03341377542645377,
		gater: null
	},
	{
		from: 112,
		to: 374,
		weight: -0.05085625306662398,
		gater: null
	},
	{
		from: 112,
		to: 375,
		weight: -0.07606102750536757,
		gater: null
	},
	{
		from: 112,
		to: 376,
		weight: -0.07146147585719885,
		gater: null
	},
	{
		from: 112,
		to: 377,
		weight: -0.034167234552037726,
		gater: null
	},
	{
		from: 112,
		to: 378,
		weight: 0.06606732130200471,
		gater: null
	},
	{
		from: 112,
		to: 379,
		weight: 0.08128129367992196,
		gater: null
	},
	{
		from: 113,
		to: 360,
		weight: 0.008207094169384893,
		gater: null
	},
	{
		from: 113,
		to: 361,
		weight: 0.07341725239542685,
		gater: null
	},
	{
		from: 113,
		to: 362,
		weight: 0.06789892896969282,
		gater: null
	},
	{
		from: 113,
		to: 363,
		weight: -0.05901383842252699,
		gater: null
	},
	{
		from: 113,
		to: 364,
		weight: -0.007951902319310644,
		gater: null
	},
	{
		from: 113,
		to: 365,
		weight: 0.02210666630193056,
		gater: null
	},
	{
		from: 113,
		to: 366,
		weight: 0.07036467663979593,
		gater: null
	},
	{
		from: 113,
		to: 367,
		weight: -0.06433336307616894,
		gater: null
	},
	{
		from: 113,
		to: 368,
		weight: 0.0037244602144599764,
		gater: null
	},
	{
		from: 113,
		to: 369,
		weight: -0.05198776356061599,
		gater: null
	},
	{
		from: 113,
		to: 370,
		weight: 0.057546542002394396,
		gater: null
	},
	{
		from: 113,
		to: 371,
		weight: 0.02886252009948112,
		gater: null
	},
	{
		from: 113,
		to: 372,
		weight: 0.07161803264528213,
		gater: null
	},
	{
		from: 113,
		to: 373,
		weight: 0.028030119015091115,
		gater: null
	},
	{
		from: 113,
		to: 374,
		weight: 0.0013336963319655892,
		gater: null
	},
	{
		from: 113,
		to: 375,
		weight: 0.008654268743211263,
		gater: null
	},
	{
		from: 113,
		to: 376,
		weight: 0.04590821686613214,
		gater: null
	},
	{
		from: 113,
		to: 377,
		weight: -0.03668324092695774,
		gater: null
	},
	{
		from: 113,
		to: 378,
		weight: -0.0316006845391331,
		gater: null
	},
	{
		from: 113,
		to: 379,
		weight: -0.07171226487393755,
		gater: null
	},
	{
		from: 114,
		to: 360,
		weight: 0.09139268770865083,
		gater: null
	},
	{
		from: 114,
		to: 361,
		weight: -0.06550036960324968,
		gater: null
	},
	{
		from: 114,
		to: 362,
		weight: 0.06677776897688267,
		gater: null
	},
	{
		from: 114,
		to: 363,
		weight: 0.017263980550738814,
		gater: null
	},
	{
		from: 114,
		to: 364,
		weight: 0.04807519891957163,
		gater: null
	},
	{
		from: 114,
		to: 365,
		weight: 0.07949987293568284,
		gater: null
	},
	{
		from: 114,
		to: 366,
		weight: -0.01939330535892489,
		gater: null
	},
	{
		from: 114,
		to: 367,
		weight: -0.015323045435028826,
		gater: null
	},
	{
		from: 114,
		to: 368,
		weight: 0.013279326028479005,
		gater: null
	},
	{
		from: 114,
		to: 369,
		weight: -0.05199684684405477,
		gater: null
	},
	{
		from: 114,
		to: 370,
		weight: 0.013011983532047383,
		gater: null
	},
	{
		from: 114,
		to: 371,
		weight: -0.06860730529842854,
		gater: null
	},
	{
		from: 114,
		to: 372,
		weight: 0.07108779384640163,
		gater: null
	},
	{
		from: 114,
		to: 373,
		weight: 0.029397698293368885,
		gater: null
	},
	{
		from: 114,
		to: 374,
		weight: 0.05282759632808595,
		gater: null
	},
	{
		from: 114,
		to: 375,
		weight: -0.016836566842323458,
		gater: null
	},
	{
		from: 114,
		to: 376,
		weight: 0.04044773450468267,
		gater: null
	},
	{
		from: 114,
		to: 377,
		weight: 0.06168156835699845,
		gater: null
	},
	{
		from: 114,
		to: 378,
		weight: -0.04604175456927702,
		gater: null
	},
	{
		from: 114,
		to: 379,
		weight: 0.0469947396167229,
		gater: null
	},
	{
		from: 115,
		to: 360,
		weight: 0.018881830832593052,
		gater: null
	},
	{
		from: 115,
		to: 361,
		weight: 0.07620618356117395,
		gater: null
	},
	{
		from: 115,
		to: 362,
		weight: -0.05594506083858502,
		gater: null
	},
	{
		from: 115,
		to: 363,
		weight: 0.013086613652458251,
		gater: null
	},
	{
		from: 115,
		to: 364,
		weight: -0.06797405900827558,
		gater: null
	},
	{
		from: 115,
		to: 365,
		weight: -0.0045088914604521635,
		gater: null
	},
	{
		from: 115,
		to: 366,
		weight: 0.008217220856771415,
		gater: null
	},
	{
		from: 115,
		to: 367,
		weight: 0.02150190899044642,
		gater: null
	},
	{
		from: 115,
		to: 368,
		weight: 0.0948485812980362,
		gater: null
	},
	{
		from: 115,
		to: 369,
		weight: 0.016110080905255855,
		gater: null
	},
	{
		from: 115,
		to: 370,
		weight: -0.07173165024667219,
		gater: null
	},
	{
		from: 115,
		to: 371,
		weight: -0.03191790016460434,
		gater: null
	},
	{
		from: 115,
		to: 372,
		weight: -0.06939199173253763,
		gater: null
	},
	{
		from: 115,
		to: 373,
		weight: 0.011487167170528695,
		gater: null
	},
	{
		from: 115,
		to: 374,
		weight: -0.00808937635299252,
		gater: null
	},
	{
		from: 115,
		to: 375,
		weight: -0.05507498899693406,
		gater: null
	},
	{
		from: 115,
		to: 376,
		weight: 0.02999625498946501,
		gater: null
	},
	{
		from: 115,
		to: 377,
		weight: 0.07922052396567056,
		gater: null
	},
	{
		from: 115,
		to: 378,
		weight: -0.016391543564350325,
		gater: null
	},
	{
		from: 115,
		to: 379,
		weight: -0.07622314609877937,
		gater: null
	},
	{
		from: 116,
		to: 360,
		weight: 0.0022383196486497753,
		gater: null
	},
	{
		from: 116,
		to: 361,
		weight: -0.09200665107133857,
		gater: null
	},
	{
		from: 116,
		to: 362,
		weight: -0.0824008085738158,
		gater: null
	},
	{
		from: 116,
		to: 363,
		weight: -0.09461758167900705,
		gater: null
	},
	{
		from: 116,
		to: 364,
		weight: 0.08176743950342433,
		gater: null
	},
	{
		from: 116,
		to: 365,
		weight: -0.07963828490517738,
		gater: null
	},
	{
		from: 116,
		to: 366,
		weight: 0.03795067060647356,
		gater: null
	},
	{
		from: 116,
		to: 367,
		weight: -0.019858389085769174,
		gater: null
	},
	{
		from: 116,
		to: 368,
		weight: 0.07864961132172793,
		gater: null
	},
	{
		from: 116,
		to: 369,
		weight: 0.009487048863357966,
		gater: null
	},
	{
		from: 116,
		to: 370,
		weight: 0.010978193914363207,
		gater: null
	},
	{
		from: 116,
		to: 371,
		weight: 0.01615494559783874,
		gater: null
	},
	{
		from: 116,
		to: 372,
		weight: 0.016116131936853018,
		gater: null
	},
	{
		from: 116,
		to: 373,
		weight: 0.040414994474591376,
		gater: null
	},
	{
		from: 116,
		to: 374,
		weight: -0.02564274611647828,
		gater: null
	},
	{
		from: 116,
		to: 375,
		weight: 0.056016329607500165,
		gater: null
	},
	{
		from: 116,
		to: 376,
		weight: 0.08832208011180859,
		gater: null
	},
	{
		from: 116,
		to: 377,
		weight: 0.09691007857063139,
		gater: null
	},
	{
		from: 116,
		to: 378,
		weight: 0.05992227217100485,
		gater: null
	},
	{
		from: 116,
		to: 379,
		weight: -0.020814527443322864,
		gater: null
	},
	{
		from: 117,
		to: 360,
		weight: -0.025159008418696338,
		gater: null
	},
	{
		from: 117,
		to: 361,
		weight: -0.049862545792415516,
		gater: null
	},
	{
		from: 117,
		to: 362,
		weight: 0.008141955156988484,
		gater: null
	},
	{
		from: 117,
		to: 363,
		weight: 0.060093916301124845,
		gater: null
	},
	{
		from: 117,
		to: 364,
		weight: 0.02403542190185562,
		gater: null
	},
	{
		from: 117,
		to: 365,
		weight: 0.005739111287337867,
		gater: null
	},
	{
		from: 117,
		to: 366,
		weight: -0.08130116010013642,
		gater: null
	},
	{
		from: 117,
		to: 367,
		weight: 0.024810017425708028,
		gater: null
	},
	{
		from: 117,
		to: 368,
		weight: 0.02261231656948795,
		gater: null
	},
	{
		from: 117,
		to: 369,
		weight: 0.015769806360857966,
		gater: null
	},
	{
		from: 117,
		to: 370,
		weight: -0.008967316243082418,
		gater: null
	},
	{
		from: 117,
		to: 371,
		weight: 0.09673290130631138,
		gater: null
	},
	{
		from: 117,
		to: 372,
		weight: -0.01054019752929522,
		gater: null
	},
	{
		from: 117,
		to: 373,
		weight: 0.0037800326835906173,
		gater: null
	},
	{
		from: 117,
		to: 374,
		weight: -0.0007139308118254972,
		gater: null
	},
	{
		from: 117,
		to: 375,
		weight: 0.0889432672237489,
		gater: null
	},
	{
		from: 117,
		to: 376,
		weight: 0.03946079553444565,
		gater: null
	},
	{
		from: 117,
		to: 377,
		weight: 0.02558864622213658,
		gater: null
	},
	{
		from: 117,
		to: 378,
		weight: 0.09223027159135899,
		gater: null
	},
	{
		from: 117,
		to: 379,
		weight: 0.08926495650230734,
		gater: null
	},
	{
		from: 118,
		to: 360,
		weight: 0.010626281927673092,
		gater: null
	},
	{
		from: 118,
		to: 361,
		weight: 0.0552513588282936,
		gater: null
	},
	{
		from: 118,
		to: 362,
		weight: 0.0857272973669006,
		gater: null
	},
	{
		from: 118,
		to: 363,
		weight: -0.06670202989646654,
		gater: null
	},
	{
		from: 118,
		to: 364,
		weight: -0.05048673165373705,
		gater: null
	},
	{
		from: 118,
		to: 365,
		weight: 0.04352606130608111,
		gater: null
	},
	{
		from: 118,
		to: 366,
		weight: -0.02549720686483546,
		gater: null
	},
	{
		from: 118,
		to: 367,
		weight: 0.0485275538162806,
		gater: null
	},
	{
		from: 118,
		to: 368,
		weight: 0.038507178767294814,
		gater: null
	},
	{
		from: 118,
		to: 369,
		weight: -0.05381073278208608,
		gater: null
	},
	{
		from: 118,
		to: 370,
		weight: -0.0005229943086586114,
		gater: null
	},
	{
		from: 118,
		to: 371,
		weight: 0.04628638088880374,
		gater: null
	},
	{
		from: 118,
		to: 372,
		weight: -0.09677565638597536,
		gater: null
	},
	{
		from: 118,
		to: 373,
		weight: 0.0636525503136002,
		gater: null
	},
	{
		from: 118,
		to: 374,
		weight: 0.05563709502527017,
		gater: null
	},
	{
		from: 118,
	},
