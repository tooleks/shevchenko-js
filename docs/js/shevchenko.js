/* shevchenko v1.2.0, Copyright (c) 2020 Oleksandr Tolochko <tooleks@gmail.com>, License: MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.shevchenko = {}));
}(this, (function (exports) { 'use strict';

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

    /**
     * Validates anthroponym object.
     * Throws an error if validation fails.
     *
     * @throws TypeError
     */
    function validateAnthroponym(anthroponym) {
        if (anthroponym == null) {
            throw new TypeError('"anthroponym" must be an object.');
        }
        if (typeof anthroponym !== 'object') {
            throw new TypeError('"anthroponym" must be an object.');
        }
        if (![Gender$1.Male, Gender$1.Female].includes(anthroponym.gender)) {
            throw new TypeError("\"anthroponym.gender\" must be one of the following: \"" + Gender$1.Male + "\", \"" + Gender$1.Female + "\".");
        }
        // tslint:disable-next-line max-line-length
        if (typeof anthroponym.firstName === 'undefined' && typeof anthroponym.middleName === 'undefined' && typeof anthroponym.lastName === 'undefined') {
            // tslint:disable-next-line max-line-length
            throw new TypeError('At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
        }
        if (typeof anthroponym.firstName !== 'undefined' && typeof anthroponym.firstName !== 'string') {
            throw new TypeError('"anthroponym.firstName" must be a string.');
        }
        if (typeof anthroponym.middleName !== 'undefined' && typeof anthroponym.middleName !== 'string') {
            throw new TypeError('"anthroponym.middleName" must be a string.');
        }
        if (typeof anthroponym.lastName !== 'undefined' && typeof anthroponym.lastName !== 'string') {
            throw new TypeError('"anthroponym.lastName" must be a string.');
        }
    }

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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var synaptic = createCommonjsModule(function (module, exports) {
    /*!
     * The MIT License (MIT)
     * 
     * Copyright (c) 2017 Juan Cazala - https://caza.la
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE
     * 
     * 
     * 
     * ********************************************************************************************
     *                                   SYNAPTIC (v1.1.4)
     * ********************************************************************************************
     * 
     * Synaptic is a javascript neural network library for node.js and the browser, its generalized
     * algorithm is architecture-free, so you can build and train basically any type of first order
     * or even second order neural network architectures.
     * 
     * http://en.wikipedia.org/wiki/Recurrent_neural_network#Second_Order_Recurrent_Neural_Network
     * 
     * The library includes a few built-in architectures like multilayer perceptrons, multilayer
     * long-short term memory networks (LSTM) or liquid state machines, and a trainer capable of
     * training any given network, and includes built-in training tasks/tests like solving an XOR,
     * passing a Distracted Sequence Recall test or an Embeded Reber Grammar test.
     * 
     * The algorithm implemented by this library has been taken from Derek D. Monner's paper:
     * 
     * 
     * A generalized LSTM-like training algorithm for second-order recurrent neural networks
     * http://www.overcomplete.net/papers/nn2012.pdf
     * 
     * There are references to the equations in that paper commented through the source code.
     * 
     */
    (function webpackUniversalModuleDefinition(root, factory) {
    	module.exports = factory();
    })(commonjsGlobal, function() {
    return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, {
    /******/ 				configurable: false,
    /******/ 				enumerable: true,
    /******/ 				get: getter
    /******/ 			});
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 4);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _LayerConnection = __webpack_require__(6);

    var _LayerConnection2 = _interopRequireDefault(_LayerConnection);

    var _Neuron = __webpack_require__(2);

    var _Neuron2 = _interopRequireDefault(_Neuron);

    var _Network = __webpack_require__(1);

    var _Network2 = _interopRequireDefault(_Network);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    // types of connections
    var connectionType = {
      ALL_TO_ALL: "ALL TO ALL",
      ONE_TO_ONE: "ONE TO ONE",
      ALL_TO_ELSE: "ALL TO ELSE"
    };

    // types of gates
    var gateType = {
      INPUT: "INPUT",
      OUTPUT: "OUTPUT",
      ONE_TO_ONE: "ONE TO ONE"
    };

    var Layer = function () {
      function Layer(size) {
        _classCallCheck(this, Layer);

        this.size = size | 0;
        this.list = [];

        this.connectedTo = [];

        while (size--) {
          var neuron = new _Neuron2.default();
          this.list.push(neuron);
        }
      }

      // activates all the neurons in the layer


      _createClass(Layer, [{
        key: 'activate',
        value: function activate(input) {

          var activations = [];

          if (typeof input != 'undefined') {
            if (input.length != this.size) throw new Error('INPUT size and LAYER size must be the same to activate!');

            for (var id in this.list) {
              var neuron = this.list[id];
              var activation = neuron.activate(input[id]);
              activations.push(activation);
            }
          } else {
            for (var id in this.list) {
              var neuron = this.list[id];
              var activation = neuron.activate();
              activations.push(activation);
            }
          }
          return activations;
        }

        // propagates the error on all the neurons of the layer

      }, {
        key: 'propagate',
        value: function propagate(rate, target) {

          if (typeof target != 'undefined') {
            if (target.length != this.size) throw new Error('TARGET size and LAYER size must be the same to propagate!');

            for (var id = this.list.length - 1; id >= 0; id--) {
              var neuron = this.list[id];
              neuron.propagate(rate, target[id]);
            }
          } else {
            for (var id = this.list.length - 1; id >= 0; id--) {
              var neuron = this.list[id];
              neuron.propagate(rate);
            }
          }
        }

        // projects a connection from this layer to another one

      }, {
        key: 'project',
        value: function project(layer, type, weights) {

          if (layer instanceof _Network2.default) layer = layer.layers.input;

          if (layer instanceof Layer) {
            if (!this.connected(layer)) return new _LayerConnection2.default(this, layer, type, weights);
          } else throw new Error('Invalid argument, you can only project connections to LAYERS and NETWORKS!');
        }

        // gates a connection betwenn two layers

      }, {
        key: 'gate',
        value: function gate(connection, type) {

          if (type == Layer.gateType.INPUT) {
            if (connection.to.size != this.size) throw new Error('GATER layer and CONNECTION.TO layer must be the same size in order to gate!');

            for (var id in connection.to.list) {
              var neuron = connection.to.list[id];
              var gater = this.list[id];
              for (var input in neuron.connections.inputs) {
                var gated = neuron.connections.inputs[input];
                if (gated.ID in connection.connections) gater.gate(gated);
              }
            }
          } else if (type == Layer.gateType.OUTPUT) {
            if (connection.from.size != this.size) throw new Error('GATER layer and CONNECTION.FROM layer must be the same size in order to gate!');

            for (var id in connection.from.list) {
              var neuron = connection.from.list[id];
              var gater = this.list[id];
              for (var projected in neuron.connections.projected) {
                var gated = neuron.connections.projected[projected];
                if (gated.ID in connection.connections) gater.gate(gated);
              }
            }
          } else if (type == Layer.gateType.ONE_TO_ONE) {
            if (connection.size != this.size) throw new Error('The number of GATER UNITS must be the same as the number of CONNECTIONS to gate!');

            for (var id in connection.list) {
              var gater = this.list[id];
              var gated = connection.list[id];
              gater.gate(gated);
            }
          }
          connection.gatedfrom.push({ layer: this, type: type });
        }

        // true or false whether the whole layer is self-connected or not

      }, {
        key: 'selfconnected',
        value: function selfconnected() {

          for (var id in this.list) {
            var neuron = this.list[id];
            if (!neuron.selfconnected()) return false;
          }
          return true;
        }

        // true of false whether the layer is connected to another layer (parameter) or not

      }, {
        key: 'connected',
        value: function connected(layer) {
          // Check if ALL to ALL connection
          var connections = 0;
          for (var here in this.list) {
            for (var there in layer.list) {
              var from = this.list[here];
              var to = layer.list[there];
              var connected = from.connected(to);
              if (connected.type == 'projected') connections++;
            }
          }
          if (connections == this.size * layer.size) return Layer.connectionType.ALL_TO_ALL;

          // Check if ONE to ONE connection
          connections = 0;
          for (var neuron in this.list) {
            var from = this.list[neuron];
            var to = layer.list[neuron];
            var connected = from.connected(to);
            if (connected.type == 'projected') connections++;
          }
          if (connections == this.size) return Layer.connectionType.ONE_TO_ONE;
        }

        // clears all the neuorns in the layer

      }, {
        key: 'clear',
        value: function clear() {
          for (var id in this.list) {
            var neuron = this.list[id];
            neuron.clear();
          }
        }

        // resets all the neurons in the layer

      }, {
        key: 'reset',
        value: function reset() {
          for (var id in this.list) {
            var neuron = this.list[id];
            neuron.reset();
          }
        }

        // returns all the neurons in the layer (array)

      }, {
        key: 'neurons',
        value: function neurons() {
          return this.list;
        }

        // adds a neuron to the layer

      }, {
        key: 'add',
        value: function add(neuron) {
          neuron = neuron || new _Neuron2.default();
          this.list.push(neuron);
          this.size++;
        }
      }, {
        key: 'set',
        value: function set(options) {
          options = options || {};

          for (var i in this.list) {
            var neuron = this.list[i];
            if (options.label) neuron.label = options.label + '_' + neuron.ID;
            if (options.squash) neuron.squash = options.squash;
            if (options.bias) neuron.bias = options.bias;
          }
          return this;
        }
      }]);

      return Layer;
    }();

    Layer.connectionType = connectionType;
    Layer.gateType = gateType;
    exports.default = Layer;

    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _Neuron = __webpack_require__(2);

    var _Neuron2 = _interopRequireDefault(_Neuron);

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    var _Trainer = __webpack_require__(3);

    var _Trainer2 = _interopRequireDefault(_Trainer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Network = function () {
      function Network(layers) {
        _classCallCheck(this, Network);

        if (typeof layers != 'undefined') {
          this.layers = {
            input: layers.input || null,
            hidden: layers.hidden || [],
            output: layers.output || null
          };
          this.optimized = null;
        }
      }

      // feed-forward activation of all the layers to produce an ouput


      _createClass(Network, [{
        key: 'activate',
        value: function activate(input) {
          if (this.optimized === false) {
            this.layers.input.activate(input);
            for (var i = 0; i < this.layers.hidden.length; i++) {
              this.layers.hidden[i].activate();
            }return this.layers.output.activate();
          } else {
            if (this.optimized == null) this.optimize();
            return this.optimized.activate(input);
          }
        }

        // back-propagate the error thru the network

      }, {
        key: 'propagate',
        value: function propagate(rate, target) {
          if (this.optimized === false) {
            this.layers.output.propagate(rate, target);
            for (var i = this.layers.hidden.length - 1; i >= 0; i--) {
              this.layers.hidden[i].propagate(rate);
            }
          } else {
            if (this.optimized == null) this.optimize();
            this.optimized.propagate(rate, target);
          }
        }

        // project a connection to another unit (either a network or a layer)

      }, {
        key: 'project',
        value: function project(unit, type, weights) {
          if (this.optimized) this.optimized.reset();

          if (unit instanceof Network) return this.layers.output.project(unit.layers.input, type, weights);

          if (unit instanceof _Layer2.default) return this.layers.output.project(unit, type, weights);

          throw new Error('Invalid argument, you can only project connections to LAYERS and NETWORKS!');
        }

        // let this network gate a connection

      }, {
        key: 'gate',
        value: function gate(connection, type) {
          if (this.optimized) this.optimized.reset();
          this.layers.output.gate(connection, type);
        }

        // clear all elegibility traces and extended elegibility traces (the network forgets its context, but not what was trained)

      }, {
        key: 'clear',
        value: function clear() {
          this.restore();

          var inputLayer = this.layers.input,
              outputLayer = this.layers.output;

          inputLayer.clear();
          for (var i = 0; i < this.layers.hidden.length; i++) {
            this.layers.hidden[i].clear();
          }
          outputLayer.clear();

          if (this.optimized) this.optimized.reset();
        }

        // reset all weights and clear all traces (ends up like a new network)

      }, {
        key: 'reset',
        value: function reset() {
          this.restore();

          var inputLayer = this.layers.input,
              outputLayer = this.layers.output;

          inputLayer.reset();
          for (var i = 0; i < this.layers.hidden.length; i++) {
            this.layers.hidden[i].reset();
          }
          outputLayer.reset();

          if (this.optimized) this.optimized.reset();
        }

        // hardcodes the behaviour of the whole network into a single optimized function

      }, {
        key: 'optimize',
        value: function optimize() {
          var that = this;
          var optimized = {};
          var neurons = this.neurons();

          for (var i = 0; i < neurons.length; i++) {
            var neuron = neurons[i].neuron;
            var layer = neurons[i].layer;
            while (neuron.neuron) {
              neuron = neuron.neuron;
            }optimized = neuron.optimize(optimized, layer);
          }

          for (var i = 0; i < optimized.propagation_sentences.length; i++) {
            optimized.propagation_sentences[i].reverse();
          }optimized.propagation_sentences.reverse();

          var hardcode = '';
          hardcode += 'var F = Float64Array ? new Float64Array(' + optimized.memory + ') : []; ';
          for (var i in optimized.variables) {
            hardcode += 'F[' + optimized.variables[i].id + '] = ' + (optimized.variables[i].value || 0) + '; ';
          }hardcode += 'var activate = function(input){\n';
          for (var i = 0; i < optimized.inputs.length; i++) {
            hardcode += 'F[' + optimized.inputs[i] + '] = input[' + i + ']; ';
          }for (var i = 0; i < optimized.activation_sentences.length; i++) {
            if (optimized.activation_sentences[i].length > 0) {
              for (var j = 0; j < optimized.activation_sentences[i].length; j++) {
                hardcode += optimized.activation_sentences[i][j].join(' ');
                hardcode += optimized.trace_sentences[i][j].join(' ');
              }
            }
          }
          hardcode += ' var output = []; ';
          for (var i = 0; i < optimized.outputs.length; i++) {
            hardcode += 'output[' + i + '] = F[' + optimized.outputs[i] + ']; ';
          }hardcode += 'return output; }; ';
          hardcode += 'var propagate = function(rate, target){\n';
          hardcode += 'F[' + optimized.variables.rate.id + '] = rate; ';
          for (var i = 0; i < optimized.targets.length; i++) {
            hardcode += 'F[' + optimized.targets[i] + '] = target[' + i + ']; ';
          }for (var i = 0; i < optimized.propagation_sentences.length; i++) {
            for (var j = 0; j < optimized.propagation_sentences[i].length; j++) {
              hardcode += optimized.propagation_sentences[i][j].join(' ') + ' ';
            }
          }hardcode += ' };\n';
          hardcode += 'var ownership = function(memoryBuffer){\nF = memoryBuffer;\nthis.memory = F;\n};\n';
          hardcode += 'return {\nmemory: F,\nactivate: activate,\npropagate: propagate,\nownership: ownership\n};';
          hardcode = hardcode.split(';').join(';\n');

          var constructor = new Function(hardcode);

          var network = constructor();
          network.data = {
            variables: optimized.variables,
            activate: optimized.activation_sentences,
            propagate: optimized.propagation_sentences,
            trace: optimized.trace_sentences,
            inputs: optimized.inputs,
            outputs: optimized.outputs,
            check_activation: this.activate,
            check_propagation: this.propagate
          };

          network.reset = function () {
            if (that.optimized) {
              that.optimized = null;
              that.activate = network.data.check_activation;
              that.propagate = network.data.check_propagation;
            }
          };

          this.optimized = network;
          this.activate = network.activate;
          this.propagate = network.propagate;
        }

        // restores all the values from the optimized network the their respective objects in order to manipulate the network

      }, {
        key: 'restore',
        value: function restore() {
          if (!this.optimized) return;

          var optimized = this.optimized;

          var getValue = function getValue() {
            var args = Array.prototype.slice.call(arguments);

            var unit = args.shift();
            var prop = args.pop();

            var id = prop + '_';
            for (var property in args) {
              id += args[property] + '_';
            }id += unit.ID;

            var memory = optimized.memory;
            var variables = optimized.data.variables;

            if (id in variables) return memory[variables[id].id];
            return 0;
          };

          var list = this.neurons();

          // link id's to positions in the array
          for (var i = 0; i < list.length; i++) {
            var neuron = list[i].neuron;
            while (neuron.neuron) {
              neuron = neuron.neuron;
            }neuron.state = getValue(neuron, 'state');
            neuron.old = getValue(neuron, 'old');
            neuron.activation = getValue(neuron, 'activation');
            neuron.bias = getValue(neuron, 'bias');

            for (var input in neuron.trace.elegibility) {
              neuron.trace.elegibility[input] = getValue(neuron, 'trace', 'elegibility', input);
            }for (var gated in neuron.trace.extended) {
              for (var input in neuron.trace.extended[gated]) {
                neuron.trace.extended[gated][input] = getValue(neuron, 'trace', 'extended', gated, input);
              }
            } // get connections
            for (var j in neuron.connections.projected) {
              var connection = neuron.connections.projected[j];
              connection.weight = getValue(connection, 'weight');
              connection.gain = getValue(connection, 'gain');
            }
          }
        }

        // returns all the neurons in the network

      }, {
        key: 'neurons',
        value: function neurons() {
          var neurons = [];

          var inputLayer = this.layers.input.neurons(),
              outputLayer = this.layers.output.neurons();

          for (var i = 0; i < inputLayer.length; i++) {
            neurons.push({
              neuron: inputLayer[i],
              layer: 'input'
            });
          }

          for (var i = 0; i < this.layers.hidden.length; i++) {
            var hiddenLayer = this.layers.hidden[i].neurons();
            for (var j = 0; j < hiddenLayer.length; j++) {
              neurons.push({
                neuron: hiddenLayer[j],
                layer: i
              });
            }
          }

          for (var i = 0; i < outputLayer.length; i++) {
            neurons.push({
              neuron: outputLayer[i],
              layer: 'output'
            });
          }

          return neurons;
        }

        // returns number of inputs of the network

      }, {
        key: 'inputs',
        value: function inputs() {
          return this.layers.input.size;
        }

        // returns number of outputs of hte network

      }, {
        key: 'outputs',
        value: function outputs() {
          return this.layers.output.size;
        }

        // sets the layers of the network

      }, {
        key: 'set',
        value: function set(layers) {
          this.layers = {
            input: layers.input || null,
            hidden: layers.hidden || [],
            output: layers.output || null
          };
          if (this.optimized) this.optimized.reset();
        }
      }, {
        key: 'setOptimize',
        value: function setOptimize(bool) {
          this.restore();
          if (this.optimized) this.optimized.reset();
          this.optimized = bool ? null : false;
        }

        // returns a json that represents all the neurons and connections of the network

      }, {
        key: 'toJSON',
        value: function toJSON(ignoreTraces) {
          this.restore();

          var list = this.neurons();
          var neurons = [];
          var connections = [];

          // link id's to positions in the array
          var ids = {};
          for (var i = 0; i < list.length; i++) {
            var neuron = list[i].neuron;
            while (neuron.neuron) {
              neuron = neuron.neuron;
            }ids[neuron.ID] = i;

            var copy = {
              trace: {
                elegibility: {},
                extended: {}
              },
              state: neuron.state,
              old: neuron.old,
              activation: neuron.activation,
              bias: neuron.bias,
              layer: list[i].layer
            };

            copy.squash = neuron.squash == _Neuron2.default.squash.LOGISTIC ? 'LOGISTIC' : neuron.squash == _Neuron2.default.squash.TANH ? 'TANH' : neuron.squash == _Neuron2.default.squash.IDENTITY ? 'IDENTITY' : neuron.squash == _Neuron2.default.squash.HLIM ? 'HLIM' : neuron.squash == _Neuron2.default.squash.RELU ? 'RELU' : null;

            neurons.push(copy);
          }

          for (var i = 0; i < list.length; i++) {
            var neuron = list[i].neuron;
            while (neuron.neuron) {
              neuron = neuron.neuron;
            }for (var j in neuron.connections.projected) {
              var connection = neuron.connections.projected[j];
              connections.push({
                from: ids[connection.from.ID],
                to: ids[connection.to.ID],
                weight: connection.weight,
                gater: connection.gater ? ids[connection.gater.ID] : null
              });
            }
            if (neuron.selfconnected()) {
              connections.push({
                from: ids[neuron.ID],
                to: ids[neuron.ID],
                weight: neuron.selfconnection.weight,
                gater: neuron.selfconnection.gater ? ids[neuron.selfconnection.gater.ID] : null
              });
            }
          }

          return {
            neurons: neurons,
            connections: connections
          };
        }

        // export the topology into dot language which can be visualized as graphs using dot
        /* example: ... console.log(net.toDotLang());
                    $ node example.js > example.dot
                    $ dot example.dot -Tpng > out.png
        */

      }, {
        key: 'toDot',
        value: function toDot(edgeConnection) {
          if (!(typeof edgeConnection === 'undefined' ? 'undefined' : _typeof(edgeConnection))) edgeConnection = false;
          var code = 'digraph nn {\n    rankdir = BT\n';
          var layers = [this.layers.input].concat(this.layers.hidden, this.layers.output);
          for (var i = 0; i < layers.length; i++) {
            for (var j = 0; j < layers[i].connectedTo.length; j++) {
              // projections
              var connection = layers[i].connectedTo[j];
              var layerTo = connection.to;
              var size = connection.size;
              var layerID = layers.indexOf(layers[i]);
              var layerToID = layers.indexOf(layerTo);
              /* http://stackoverflow.com/questions/26845540/connect-edges-with-graph-dot
               * DOT does not support edge-to-edge connections
               * This workaround produces somewhat weird graphs ...
              */
              if (edgeConnection) {
                if (connection.gatedfrom.length) {
                  var fakeNode = 'fake' + layerID + '_' + layerToID;
                  code += '    ' + fakeNode + ' [label = "", shape = point, width = 0.01, height = 0.01]\n';
                  code += '    ' + layerID + ' -> ' + fakeNode + ' [label = ' + size + ', arrowhead = none]\n';
                  code += '    ' + fakeNode + ' -> ' + layerToID + '\n';
                } else code += '    ' + layerID + ' -> ' + layerToID + ' [label = ' + size + ']\n';
                for (var from in connection.gatedfrom) {
                  // gatings
                  var layerfrom = connection.gatedfrom[from].layer;
                  var layerfromID = layers.indexOf(layerfrom);
                  code += '    ' + layerfromID + ' -> ' + fakeNode + ' [color = blue]\n';
                }
              } else {
                code += '    ' + layerID + ' -> ' + layerToID + ' [label = ' + size + ']\n';
                for (var from in connection.gatedfrom) {
                  // gatings
                  var layerfrom = connection.gatedfrom[from].layer;
                  var layerfromID = layers.indexOf(layerfrom);
                  code += '    ' + layerfromID + ' -> ' + layerToID + ' [color = blue]\n';
                }
              }
            }
          }
          code += '}\n';
          return {
            code: code,
            link: 'https://chart.googleapis.com/chart?chl=' + escape(code.replace('/ /g', '+')) + '&cht=gv'
          };
        }

        // returns a function that works as the activation of the network and can be used without depending on the library

      }, {
        key: 'standalone',
        value: function standalone() {
          if (!this.optimized) this.optimize();

          var data = this.optimized.data;

          // build activation function
          var activation = 'function (input) {\n';

          // build inputs
          for (var i = 0; i < data.inputs.length; i++) {
            activation += 'F[' + data.inputs[i] + '] = input[' + i + '];\n';
          } // build network activation
          for (var i = 0; i < data.activate.length; i++) {
            // shouldn't this be layer?
            for (var j = 0; j < data.activate[i].length; j++) {
              activation += data.activate[i][j].join('') + '\n';
            }
          }

          // build outputs
          activation += 'var output = [];\n';
          for (var i = 0; i < data.outputs.length; i++) {
            activation += 'output[' + i + '] = F[' + data.outputs[i] + '];\n';
          }activation += 'return output;\n}';

          // reference all the positions in memory
          var memory = activation.match(/F\[(\d+)\]/g);
          var dimension = 0;
          var ids = {};

          for (var i = 0; i < memory.length; i++) {
            var tmp = memory[i].match(/\d+/)[0];
            if (!(tmp in ids)) {
              ids[tmp] = dimension++;
            }
          }
          var hardcode = 'F = {\n';

          for (var i in ids) {
            hardcode += ids[i] + ': ' + this.optimized.memory[i] + ',\n';
          }hardcode = hardcode.substring(0, hardcode.length - 2) + '\n};\n';
          hardcode = 'var run = ' + activation.replace(/F\[(\d+)]/g, function (index) {
            return 'F[' + ids[index.match(/\d+/)[0]] + ']';
          }).replace('{\n', '{\n' + hardcode + '') + ';\n';
          hardcode += 'return run';

          // return standalone function
          return new Function(hardcode)();
        }

        // Return a HTML5 WebWorker specialized on training the network stored in `memory`.
        // Train based on the given dataSet and options.
        // The worker returns the updated `memory` when done.

      }, {
        key: 'worker',
        value: function worker(memory, set, options) {
          // Copy the options and set defaults (options might be different for each worker)
          var workerOptions = {};
          if (options) workerOptions = options;
          workerOptions.rate = workerOptions.rate || .2;
          workerOptions.iterations = workerOptions.iterations || 100000;
          workerOptions.error = workerOptions.error || .005;
          workerOptions.cost = workerOptions.cost || null;
          workerOptions.crossValidate = workerOptions.crossValidate || null;

          // Cost function might be different for each worker
          var costFunction = '// REPLACED BY WORKER\nvar cost = ' + (options && options.cost || this.cost || _Trainer2.default.cost.MSE) + ';\n';
          var workerFunction = Network.getWorkerSharedFunctions();
          workerFunction = workerFunction.replace(/var cost = options && options\.cost \|\| this\.cost \|\| Trainer\.cost\.MSE;/g, costFunction);

          // Set what we do when training is finished
          workerFunction = workerFunction.replace('return results;', 'postMessage({action: "done", message: results, memoryBuffer: F}, [F.buffer]);');

          // Replace log with postmessage
          workerFunction = workerFunction.replace('console.log(\'iterations\', iterations, \'error\', error, \'rate\', currentRate)', 'postMessage({action: \'log\', message: {\n' + 'iterations: iterations,\n' + 'error: error,\n' + 'rate: currentRate\n' + '}\n' + '})');

          // Replace schedule with postmessage
          workerFunction = workerFunction.replace('abort = this.schedule.do({ error: error, iterations: iterations, rate: currentRate })', 'postMessage({action: \'schedule\', message: {\n' + 'iterations: iterations,\n' + 'error: error,\n' + 'rate: currentRate\n' + '}\n' + '})');

          if (!this.optimized) this.optimize();

          var hardcode = 'var inputs = ' + this.optimized.data.inputs.length + ';\n';
          hardcode += 'var outputs = ' + this.optimized.data.outputs.length + ';\n';
          hardcode += 'var F =  new Float64Array([' + this.optimized.memory.toString() + ']);\n';
          hardcode += 'var activate = ' + this.optimized.activate.toString() + ';\n';
          hardcode += 'var propagate = ' + this.optimized.propagate.toString() + ';\n';
          hardcode += 'onmessage = function(e) {\n' + 'if (e.data.action == \'startTraining\') {\n' + 'train(' + JSON.stringify(set) + ',' + JSON.stringify(workerOptions) + ');\n' + '}\n' + '}';

          var workerSourceCode = workerFunction + '\n' + hardcode;
          var blob = new Blob([workerSourceCode]);
          var blobURL = window.URL.createObjectURL(blob);

          return new Worker(blobURL);
        }

        // returns a copy of the network

      }, {
        key: 'clone',
        value: function clone() {
          return Network.fromJSON(this.toJSON());
        }

        /**
         * Creates a static String to store the source code of the functions
         *  that are identical for all the workers (train, _trainSet, test)
         *
         * @return {String} Source code that can train a network inside a worker.
         * @static
         */

      }], [{
        key: 'getWorkerSharedFunctions',
        value: function getWorkerSharedFunctions() {
          // If we already computed the source code for the shared functions
          if (typeof Network._SHARED_WORKER_FUNCTIONS !== 'undefined') return Network._SHARED_WORKER_FUNCTIONS;

          // Otherwise compute and return the source code
          // We compute them by simply copying the source code of the train, _trainSet and test functions
          //  using the .toString() method

          // Load and name the train function
          var train_f = _Trainer2.default.prototype.train.toString();
          train_f = train_f.replace(/this._trainSet/g, '_trainSet');
          train_f = train_f.replace(/this.test/g, 'test');
          train_f = train_f.replace(/this.crossValidate/g, 'crossValidate');
          train_f = train_f.replace('crossValidate = true', '// REMOVED BY WORKER');

          // Load and name the _trainSet function
          var _trainSet_f = _Trainer2.default.prototype._trainSet.toString().replace(/this.network./g, '');

          // Load and name the test function
          var test_f = _Trainer2.default.prototype.test.toString().replace(/this.network./g, '');

          return Network._SHARED_WORKER_FUNCTIONS = train_f + '\n' + _trainSet_f + '\n' + test_f;
        }
      }, {
        key: 'fromJSON',
        value: function fromJSON(json) {
          var neurons = [];

          var layers = {
            input: new _Layer2.default(),
            hidden: [],
            output: new _Layer2.default()
          };

          for (var i = 0; i < json.neurons.length; i++) {
            var config = json.neurons[i];

            var neuron = new _Neuron2.default();
            neuron.trace.elegibility = {};
            neuron.trace.extended = {};
            neuron.state = config.state;
            neuron.old = config.old;
            neuron.activation = config.activation;
            neuron.bias = config.bias;
            neuron.squash = config.squash in _Neuron2.default.squash ? _Neuron2.default.squash[config.squash] : _Neuron2.default.squash.LOGISTIC;
            neurons.push(neuron);

            if (config.layer == 'input') layers.input.add(neuron);else if (config.layer == 'output') layers.output.add(neuron);else {
              if (typeof layers.hidden[config.layer] == 'undefined') layers.hidden[config.layer] = new _Layer2.default();
              layers.hidden[config.layer].add(neuron);
            }
          }

          for (var i = 0; i < json.connections.length; i++) {
            var config = json.connections[i];
            var from = neurons[config.from];
            var to = neurons[config.to];
            var weight = config.weight;
            var gater = neurons[config.gater];

            var connection = from.project(to, weight);
            if (gater) gater.gate(connection);
          }

          return new Network(layers);
        }
      }]);

      return Network;
    }();

    exports.default = Network;

    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _Connection = __webpack_require__(5);

    var _Connection2 = _interopRequireDefault(_Connection);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var neurons = 0;

    // squashing functions
    var squash = {
      // eq. 5 & 5'
      LOGISTIC: function LOGISTIC(x, derivate) {
        var fx = 1 / (1 + Math.exp(-x));
        if (!derivate) return fx;
        return fx * (1 - fx);
      },
      TANH: function TANH(x, derivate) {
        if (derivate) return 1 - Math.pow(Math.tanh(x), 2);
        return Math.tanh(x);
      },
      IDENTITY: function IDENTITY(x, derivate) {
        return derivate ? 1 : x;
      },
      HLIM: function HLIM(x, derivate) {
        return derivate ? 1 : x > 0 ? 1 : 0;
      },
      RELU: function RELU(x, derivate) {
        if (derivate) return x > 0 ? 1 : 0;
        return x > 0 ? x : 0;
      }
    };

    var Neuron = function () {
      function Neuron() {
        _classCallCheck(this, Neuron);

        this.ID = Neuron.uid();

        this.connections = {
          inputs: {},
          projected: {},
          gated: {}
        };
        this.error = {
          responsibility: 0,
          projected: 0,
          gated: 0
        };
        this.trace = {
          elegibility: {},
          extended: {},
          influences: {}
        };
        this.state = 0;
        this.old = 0;
        this.activation = 0;
        this.selfconnection = new _Connection2.default(this, this, 0); // weight = 0 -> not connected
        this.squash = Neuron.squash.LOGISTIC;
        this.neighboors = {};
        this.bias = Math.random() * .2 - .1;
      }

      // activate the neuron


      _createClass(Neuron, [{
        key: 'activate',
        value: function activate(input) {
          // activation from enviroment (for input neurons)
          if (typeof input != 'undefined') {
            this.activation = input;
            this.derivative = 0;
            this.bias = 0;
            return this.activation;
          }

          // old state
          this.old = this.state;

          // eq. 15
          this.state = this.selfconnection.gain * this.selfconnection.weight * this.state + this.bias;

          for (var i in this.connections.inputs) {
            var input = this.connections.inputs[i];
            this.state += input.from.activation * input.weight * input.gain;
          }

          // eq. 16
          this.activation = this.squash(this.state);

          // f'(s)
          this.derivative = this.squash(this.state, true);

          // update traces
          var influences = [];
          for (var id in this.trace.extended) {
            // extended elegibility trace
            var neuron = this.neighboors[id];

            // if gated neuron's selfconnection is gated by this unit, the influence keeps track of the neuron's old state
            var influence = neuron.selfconnection.gater == this ? neuron.old : 0;

            // index runs over all the incoming connections to the gated neuron that are gated by this unit
            for (var incoming in this.trace.influences[neuron.ID]) {
              // captures the effect that has an input connection to this unit, on a neuron that is gated by this unit
              influence += this.trace.influences[neuron.ID][incoming].weight * this.trace.influences[neuron.ID][incoming].from.activation;
            }
            influences[neuron.ID] = influence;
          }

          for (var i in this.connections.inputs) {
            var input = this.connections.inputs[i];

            // elegibility trace - Eq. 17
            this.trace.elegibility[input.ID] = this.selfconnection.gain * this.selfconnection.weight * this.trace.elegibility[input.ID] + input.gain * input.from.activation;

            for (var id in this.trace.extended) {
              // extended elegibility trace
              var xtrace = this.trace.extended[id];
              var neuron = this.neighboors[id];
              var influence = influences[neuron.ID];

              // eq. 18
              xtrace[input.ID] = neuron.selfconnection.gain * neuron.selfconnection.weight * xtrace[input.ID] + this.derivative * this.trace.elegibility[input.ID] * influence;
            }
          }

          //  update gated connection's gains
          for (var connection in this.connections.gated) {
            this.connections.gated[connection].gain = this.activation;
          }

          return this.activation;
        }

        // back-propagate the error

      }, {
        key: 'propagate',
        value: function propagate(rate, target) {
          // error accumulator
          var error = 0;

          // whether or not this neuron is in the output layer
          var isOutput = typeof target != 'undefined';

          // output neurons get their error from the enviroment
          if (isOutput) this.error.responsibility = this.error.projected = target - this.activation; // Eq. 10

          else // the rest of the neuron compute their error responsibilities by backpropagation
            {
              // error responsibilities from all the connections projected from this neuron
              for (var id in this.connections.projected) {
                var connection = this.connections.projected[id];
                var neuron = connection.to;
                // Eq. 21
                error += neuron.error.responsibility * connection.gain * connection.weight;
              }

              // projected error responsibility
              this.error.projected = this.derivative * error;

              error = 0;
              // error responsibilities from all the connections gated by this neuron
              for (var id in this.trace.extended) {
                var neuron = this.neighboors[id]; // gated neuron
                var influence = neuron.selfconnection.gater == this ? neuron.old : 0; // if gated neuron's selfconnection is gated by this neuron

                // index runs over all the connections to the gated neuron that are gated by this neuron
                for (var input in this.trace.influences[id]) {
                  // captures the effect that the input connection of this neuron have, on a neuron which its input/s is/are gated by this neuron
                  influence += this.trace.influences[id][input].weight * this.trace.influences[neuron.ID][input].from.activation;
                }
                // eq. 22
                error += neuron.error.responsibility * influence;
              }

              // gated error responsibility
              this.error.gated = this.derivative * error;

              // error responsibility - Eq. 23
              this.error.responsibility = this.error.projected + this.error.gated;
            }

          // learning rate
          rate = rate || .1;

          // adjust all the neuron's incoming connections
          for (var id in this.connections.inputs) {
            var input = this.connections.inputs[id];

            // Eq. 24
            var gradient = this.error.projected * this.trace.elegibility[input.ID];
            for (var id in this.trace.extended) {
              var neuron = this.neighboors[id];
              gradient += neuron.error.responsibility * this.trace.extended[neuron.ID][input.ID];
            }
            input.weight += rate * gradient; // adjust weights - aka learn
          }

          // adjust bias
          this.bias += rate * this.error.responsibility;
        }
      }, {
        key: 'project',
        value: function project(neuron, weight) {
          // self-connection
          if (neuron == this) {
            this.selfconnection.weight = 1;
            return this.selfconnection;
          }

          // check if connection already exists
          var connected = this.connected(neuron);
          if (connected && connected.type == 'projected') {
            // update connection
            if (typeof weight != 'undefined') connected.connection.weight = weight;
            // return existing connection
            return connected.connection;
          } else {
            // create a new connection
            var connection = new _Connection2.default(this, neuron, weight);
          }

          // reference all the connections and traces
          this.connections.projected[connection.ID] = connection;
          this.neighboors[neuron.ID] = neuron;
          neuron.connections.inputs[connection.ID] = connection;
          neuron.trace.elegibility[connection.ID] = 0;

          for (var id in neuron.trace.extended) {
            var trace = neuron.trace.extended[id];
            trace[connection.ID] = 0;
          }

          return connection;
        }
      }, {
        key: 'gate',
        value: function gate(connection) {
          // add connection to gated list
          this.connections.gated[connection.ID] = connection;

          var neuron = connection.to;
          if (!(neuron.ID in this.trace.extended)) {
            // extended trace
            this.neighboors[neuron.ID] = neuron;
            var xtrace = this.trace.extended[neuron.ID] = {};
            for (var id in this.connections.inputs) {
              var input = this.connections.inputs[id];
              xtrace[input.ID] = 0;
            }
          }

          // keep track
          if (neuron.ID in this.trace.influences) this.trace.influences[neuron.ID].push(connection);else this.trace.influences[neuron.ID] = [connection];

          // set gater
          connection.gater = this;
        }

        // returns true or false whether the neuron is self-connected or not

      }, {
        key: 'selfconnected',
        value: function selfconnected() {
          return this.selfconnection.weight !== 0;
        }

        // returns true or false whether the neuron is connected to another neuron (parameter)

      }, {
        key: 'connected',
        value: function connected(neuron) {
          var result = {
            type: null,
            connection: false
          };

          if (this == neuron) {
            if (this.selfconnected()) {
              result.type = 'selfconnection';
              result.connection = this.selfconnection;
              return result;
            } else return false;
          }

          for (var type in this.connections) {
            for (var connection in this.connections[type]) {
              var connection = this.connections[type][connection];
              if (connection.to == neuron) {
                result.type = type;
                result.connection = connection;
                return result;
              } else if (connection.from == neuron) {
                result.type = type;
                result.connection = connection;
                return result;
              }
            }
          }

          return false;
        }

        // clears all the traces (the neuron forgets it's context, but the connections remain intact)

      }, {
        key: 'clear',
        value: function clear() {
          for (var trace in this.trace.elegibility) {
            this.trace.elegibility[trace] = 0;
          }

          for (var trace in this.trace.extended) {
            for (var extended in this.trace.extended[trace]) {
              this.trace.extended[trace][extended] = 0;
            }
          }

          this.error.responsibility = this.error.projected = this.error.gated = 0;
        }

        // all the connections are randomized and the traces are cleared

      }, {
        key: 'reset',
        value: function reset() {
          this.clear();

          for (var type in this.connections) {
            for (var connection in this.connections[type]) {
              this.connections[type][connection].weight = Math.random() * .2 - .1;
            }
          }

          this.bias = Math.random() * .2 - .1;
          this.old = this.state = this.activation = 0;
        }

        // hardcodes the behaviour of the neuron into an optimized function

      }, {
        key: 'optimize',
        value: function optimize(optimized, layer) {

          optimized = optimized || {};
          var store_activation = [];
          var store_trace = [];
          var store_propagation = [];
          var varID = optimized.memory || 0;
          var neurons = optimized.neurons || 1;
          var inputs = optimized.inputs || [];
          var targets = optimized.targets || [];
          var outputs = optimized.outputs || [];
          var variables = optimized.variables || {};
          var activation_sentences = optimized.activation_sentences || [];
          var trace_sentences = optimized.trace_sentences || [];
          var propagation_sentences = optimized.propagation_sentences || [];
          var layers = optimized.layers || { __count: 0, __neuron: 0 };

          // allocate sentences
          var allocate = function allocate(store) {
            var allocated = layer in layers && store[layers.__count];
            if (!allocated) {
              layers.__count = store.push([]) - 1;
              layers[layer] = layers.__count;
            }
          };
          allocate(activation_sentences);
          allocate(trace_sentences);
          allocate(propagation_sentences);
          var currentLayer = layers.__count;

          // get/reserve space in memory by creating a unique ID for a variablel
          var getVar = function getVar() {
            var args = Array.prototype.slice.call(arguments);

            if (args.length == 1) {
              if (args[0] == 'target') {
                var id = 'target_' + targets.length;
                targets.push(varID);
              } else var id = args[0];
              if (id in variables) return variables[id];
              return variables[id] = {
                value: 0,
                id: varID++
              };
            } else {
              var extended = args.length > 2;
              if (extended) var value = args.pop();

              var unit = args.shift();
              var prop = args.pop();

              if (!extended) var value = unit[prop];

              var id = prop + '_';
              for (var i = 0; i < args.length; i++) {
                id += args[i] + '_';
              }id += unit.ID;
              if (id in variables) return variables[id];

              return variables[id] = {
                value: value,
                id: varID++
              };
            }
          };

          // build sentence
          var buildSentence = function buildSentence() {
            var args = Array.prototype.slice.call(arguments);
            var store = args.pop();
            var sentence = '';
            for (var i = 0; i < args.length; i++) {
              if (typeof args[i] == 'string') sentence += args[i];else sentence += 'F[' + args[i].id + ']';
            }store.push(sentence + ';');
          };

          // helper to check if an object is empty
          var isEmpty = function isEmpty(obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) return false;
            }
            return true;
          };

          // characteristics of the neuron
          var noProjections = isEmpty(this.connections.projected);
          var noGates = isEmpty(this.connections.gated);
          var isInput = layer == 'input' ? true : isEmpty(this.connections.inputs);
          var isOutput = layer == 'output' ? true : noProjections && noGates;

          // optimize neuron's behaviour
          var rate = getVar('rate');
          var activation = getVar(this, 'activation');
          if (isInput) inputs.push(activation.id);else {
            activation_sentences[currentLayer].push(store_activation);
            trace_sentences[currentLayer].push(store_trace);
            propagation_sentences[currentLayer].push(store_propagation);
            var old = getVar(this, 'old');
            var state = getVar(this, 'state');
            var bias = getVar(this, 'bias');
            if (this.selfconnection.gater) var self_gain = getVar(this.selfconnection, 'gain');
            if (this.selfconnected()) var self_weight = getVar(this.selfconnection, 'weight');
            buildSentence(old, ' = ', state, store_activation);
            if (this.selfconnected()) {
              if (this.selfconnection.gater) buildSentence(state, ' = ', self_gain, ' * ', self_weight, ' * ', state, ' + ', bias, store_activation);else buildSentence(state, ' = ', self_weight, ' * ', state, ' + ', bias, store_activation);
            } else buildSentence(state, ' = ', bias, store_activation);
            for (var i in this.connections.inputs) {
              var input = this.connections.inputs[i];
              var input_activation = getVar(input.from, 'activation');
              var input_weight = getVar(input, 'weight');
              if (input.gater) var input_gain = getVar(input, 'gain');
              if (this.connections.inputs[i].gater) buildSentence(state, ' += ', input_activation, ' * ', input_weight, ' * ', input_gain, store_activation);else buildSentence(state, ' += ', input_activation, ' * ', input_weight, store_activation);
            }
            var derivative = getVar(this, 'derivative');
            switch (this.squash) {
              case Neuron.squash.LOGISTIC:
                buildSentence(activation, ' = (1 / (1 + Math.exp(-', state, ')))', store_activation);
                buildSentence(derivative, ' = ', activation, ' * (1 - ', activation, ')', store_activation);
                break;
              case Neuron.squash.TANH:
                var eP = getVar('aux');
                var eN = getVar('aux_2');
                buildSentence(eP, ' = Math.exp(', state, ')', store_activation);
                buildSentence(eN, ' = 1 / ', eP, store_activation);
                buildSentence(activation, ' = (', eP, ' - ', eN, ') / (', eP, ' + ', eN, ')', store_activation);
                buildSentence(derivative, ' = 1 - (', activation, ' * ', activation, ')', store_activation);
                break;
              case Neuron.squash.IDENTITY:
                buildSentence(activation, ' = ', state, store_activation);
                buildSentence(derivative, ' = 1', store_activation);
                break;
              case Neuron.squash.HLIM:
                buildSentence(activation, ' = +(', state, ' > 0)', store_activation);
                buildSentence(derivative, ' = 1', store_activation);
                break;
              case Neuron.squash.RELU:
                buildSentence(activation, ' = ', state, ' > 0 ? ', state, ' : 0', store_activation);
                buildSentence(derivative, ' = ', state, ' > 0 ? 1 : 0', store_activation);
                break;
            }

            for (var id in this.trace.extended) {
              // calculate extended elegibility traces in advance
              var neuron = this.neighboors[id];
              var influence = getVar('influences[' + neuron.ID + ']');
              var neuron_old = getVar(neuron, 'old');
              var initialized = false;
              if (neuron.selfconnection.gater == this) {
                buildSentence(influence, ' = ', neuron_old, store_trace);
                initialized = true;
              }
              for (var incoming in this.trace.influences[neuron.ID]) {
                var incoming_weight = getVar(this.trace.influences[neuron.ID][incoming], 'weight');
                var incoming_activation = getVar(this.trace.influences[neuron.ID][incoming].from, 'activation');

                if (initialized) buildSentence(influence, ' += ', incoming_weight, ' * ', incoming_activation, store_trace);else {
                  buildSentence(influence, ' = ', incoming_weight, ' * ', incoming_activation, store_trace);
                  initialized = true;
                }
              }
            }

            for (var i in this.connections.inputs) {
              var input = this.connections.inputs[i];
              if (input.gater) var input_gain = getVar(input, 'gain');
              var input_activation = getVar(input.from, 'activation');
              var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace.elegibility[input.ID]);
              if (this.selfconnected()) {
                if (this.selfconnection.gater) {
                  if (input.gater) buildSentence(trace, ' = ', self_gain, ' * ', self_weight, ' * ', trace, ' + ', input_gain, ' * ', input_activation, store_trace);else buildSentence(trace, ' = ', self_gain, ' * ', self_weight, ' * ', trace, ' + ', input_activation, store_trace);
                } else {
                  if (input.gater) buildSentence(trace, ' = ', self_weight, ' * ', trace, ' + ', input_gain, ' * ', input_activation, store_trace);else buildSentence(trace, ' = ', self_weight, ' * ', trace, ' + ', input_activation, store_trace);
                }
              } else {
                if (input.gater) buildSentence(trace, ' = ', input_gain, ' * ', input_activation, store_trace);else buildSentence(trace, ' = ', input_activation, store_trace);
              }
              for (var id in this.trace.extended) {
                // extended elegibility trace
                var neuron = this.neighboors[id];
                var influence = getVar('influences[' + neuron.ID + ']');

                var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace.elegibility[input.ID]);
                var xtrace = getVar(this, 'trace', 'extended', neuron.ID, input.ID, this.trace.extended[neuron.ID][input.ID]);
                if (neuron.selfconnected()) var neuron_self_weight = getVar(neuron.selfconnection, 'weight');
                if (neuron.selfconnection.gater) var neuron_self_gain = getVar(neuron.selfconnection, 'gain');
                if (neuron.selfconnected()) {
                  if (neuron.selfconnection.gater) buildSentence(xtrace, ' = ', neuron_self_gain, ' * ', neuron_self_weight, ' * ', xtrace, ' + ', derivative, ' * ', trace, ' * ', influence, store_trace);else buildSentence(xtrace, ' = ', neuron_self_weight, ' * ', xtrace, ' + ', derivative, ' * ', trace, ' * ', influence, store_trace);
                } else buildSentence(xtrace, ' = ', derivative, ' * ', trace, ' * ', influence, store_trace);
              }
            }
            for (var connection in this.connections.gated) {
              var gated_gain = getVar(this.connections.gated[connection], 'gain');
              buildSentence(gated_gain, ' = ', activation, store_activation);
            }
          }
          if (!isInput) {
            var responsibility = getVar(this, 'error', 'responsibility', this.error.responsibility);
            if (isOutput) {
              var target = getVar('target');
              buildSentence(responsibility, ' = ', target, ' - ', activation, store_propagation);
              for (var id in this.connections.inputs) {
                var input = this.connections.inputs[id];
                var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace.elegibility[input.ID]);
                var input_weight = getVar(input, 'weight');
                buildSentence(input_weight, ' += ', rate, ' * (', responsibility, ' * ', trace, ')', store_propagation);
              }
              outputs.push(activation.id);
            } else {
              if (!noProjections && !noGates) {
                var error = getVar('aux');
                for (var id in this.connections.projected) {
                  var connection = this.connections.projected[id];
                  var neuron = connection.to;
                  var connection_weight = getVar(connection, 'weight');
                  var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                  if (connection.gater) {
                    var connection_gain = getVar(connection, 'gain');
                    buildSentence(error, ' += ', neuron_responsibility, ' * ', connection_gain, ' * ', connection_weight, store_propagation);
                  } else buildSentence(error, ' += ', neuron_responsibility, ' * ', connection_weight, store_propagation);
                }
                var projected = getVar(this, 'error', 'projected', this.error.projected);
                buildSentence(projected, ' = ', derivative, ' * ', error, store_propagation);
                buildSentence(error, ' = 0', store_propagation);
                for (var id in this.trace.extended) {
                  var neuron = this.neighboors[id];
                  var influence = getVar('aux_2');
                  var neuron_old = getVar(neuron, 'old');
                  if (neuron.selfconnection.gater == this) buildSentence(influence, ' = ', neuron_old, store_propagation);else buildSentence(influence, ' = 0', store_propagation);
                  for (var input in this.trace.influences[neuron.ID]) {
                    var connection = this.trace.influences[neuron.ID][input];
                    var connection_weight = getVar(connection, 'weight');
                    var neuron_activation = getVar(connection.from, 'activation');
                    buildSentence(influence, ' += ', connection_weight, ' * ', neuron_activation, store_propagation);
                  }
                  var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                  buildSentence(error, ' += ', neuron_responsibility, ' * ', influence, store_propagation);
                }
                var gated = getVar(this, 'error', 'gated', this.error.gated);
                buildSentence(gated, ' = ', derivative, ' * ', error, store_propagation);
                buildSentence(responsibility, ' = ', projected, ' + ', gated, store_propagation);
                for (var id in this.connections.inputs) {
                  var input = this.connections.inputs[id];
                  var gradient = getVar('aux');
                  var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace.elegibility[input.ID]);
                  buildSentence(gradient, ' = ', projected, ' * ', trace, store_propagation);
                  for (var id in this.trace.extended) {
                    var neuron = this.neighboors[id];
                    var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                    var xtrace = getVar(this, 'trace', 'extended', neuron.ID, input.ID, this.trace.extended[neuron.ID][input.ID]);
                    buildSentence(gradient, ' += ', neuron_responsibility, ' * ', xtrace, store_propagation);
                  }
                  var input_weight = getVar(input, 'weight');
                  buildSentence(input_weight, ' += ', rate, ' * ', gradient, store_propagation);
                }
              } else if (noGates) {
                buildSentence(responsibility, ' = 0', store_propagation);
                for (var id in this.connections.projected) {
                  var connection = this.connections.projected[id];
                  var neuron = connection.to;
                  var connection_weight = getVar(connection, 'weight');
                  var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                  if (connection.gater) {
                    var connection_gain = getVar(connection, 'gain');
                    buildSentence(responsibility, ' += ', neuron_responsibility, ' * ', connection_gain, ' * ', connection_weight, store_propagation);
                  } else buildSentence(responsibility, ' += ', neuron_responsibility, ' * ', connection_weight, store_propagation);
                }
                buildSentence(responsibility, ' *= ', derivative, store_propagation);
                for (var id in this.connections.inputs) {
                  var input = this.connections.inputs[id];
                  var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace.elegibility[input.ID]);
                  var input_weight = getVar(input, 'weight');
                  buildSentence(input_weight, ' += ', rate, ' * (', responsibility, ' * ', trace, ')', store_propagation);
                }
              } else if (noProjections) {
                buildSentence(responsibility, ' = 0', store_propagation);
                for (var id in this.trace.extended) {
                  var neuron = this.neighboors[id];
                  var influence = getVar('aux');
                  var neuron_old = getVar(neuron, 'old');
                  if (neuron.selfconnection.gater == this) buildSentence(influence, ' = ', neuron_old, store_propagation);else buildSentence(influence, ' = 0', store_propagation);
                  for (var input in this.trace.influences[neuron.ID]) {
                    var connection = this.trace.influences[neuron.ID][input];
                    var connection_weight = getVar(connection, 'weight');
                    var neuron_activation = getVar(connection.from, 'activation');
                    buildSentence(influence, ' += ', connection_weight, ' * ', neuron_activation, store_propagation);
                  }
                  var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                  buildSentence(responsibility, ' += ', neuron_responsibility, ' * ', influence, store_propagation);
                }
                buildSentence(responsibility, ' *= ', derivative, store_propagation);
                for (var id in this.connections.inputs) {
                  var input = this.connections.inputs[id];
                  var gradient = getVar('aux');
                  buildSentence(gradient, ' = 0', store_propagation);
                  for (var id in this.trace.extended) {
                    var neuron = this.neighboors[id];
                    var neuron_responsibility = getVar(neuron, 'error', 'responsibility', neuron.error.responsibility);
                    var xtrace = getVar(this, 'trace', 'extended', neuron.ID, input.ID, this.trace.extended[neuron.ID][input.ID]);
                    buildSentence(gradient, ' += ', neuron_responsibility, ' * ', xtrace, store_propagation);
                  }
                  var input_weight = getVar(input, 'weight');
                  buildSentence(input_weight, ' += ', rate, ' * ', gradient, store_propagation);
                }
              }
            }
            buildSentence(bias, ' += ', rate, ' * ', responsibility, store_propagation);
          }
          return {
            memory: varID,
            neurons: neurons + 1,
            inputs: inputs,
            outputs: outputs,
            targets: targets,
            variables: variables,
            activation_sentences: activation_sentences,
            trace_sentences: trace_sentences,
            propagation_sentences: propagation_sentences,
            layers: layers
          };
        }
      }], [{
        key: 'uid',
        value: function uid() {
          return neurons++;
        }
      }, {
        key: 'quantity',
        value: function quantity() {
          return {
            neurons: neurons,
            connections: _Connection.connections
          };
        }
      }]);

      return Neuron;
    }();

    Neuron.squash = squash;
    exports.default = Neuron;

    /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffleInplace(o) {
      //v1.0
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
      return o;
    }
    // Built-in cost functions
    var cost = {
      // Eq. 9
      CROSS_ENTROPY: function CROSS_ENTROPY(target, output) {
        var crossentropy = 0;
        for (var i in output) {
          crossentropy -= target[i] * Math.log(output[i] + 1e-15) + (1 - target[i]) * Math.log(1 + 1e-15 - output[i]);
        } // +1e-15 is a tiny push away to avoid Math.log(0)
        return crossentropy;
      },
      MSE: function MSE(target, output) {
        var mse = 0;
        for (var i = 0; i < output.length; i++) {
          mse += Math.pow(target[i] - output[i], 2);
        }return mse / output.length;
      },
      BINARY: function BINARY(target, output) {
        var misses = 0;
        for (var i = 0; i < output.length; i++) {
          misses += Math.round(target[i] * 2) != Math.round(output[i] * 2);
        }return misses;
      }
    };

    var Trainer = function () {
      function Trainer(network, options) {
        _classCallCheck(this, Trainer);

        options = options || {};
        this.network = network;
        this.rate = options.rate || .2;
        this.iterations = options.iterations || 100000;
        this.error = options.error || .005;
        this.cost = options.cost || null;
        this.crossValidate = options.crossValidate || null;
      }

      // trains any given set to a network


      _createClass(Trainer, [{
        key: 'train',
        value: function train(set, options) {
          var error = 1;
          var iterations = bucketSize = 0;
          var abort = false;
          var currentRate;
          var cost = options && options.cost || this.cost || Trainer.cost.MSE;
          var crossValidate = false,
              testSet,
              trainSet;

          var start = Date.now();

          if (options) {
            if (options.iterations) this.iterations = options.iterations;
            if (options.error) this.error = options.error;
            if (options.rate) this.rate = options.rate;
            if (options.cost) this.cost = options.cost;
            if (options.schedule) this.schedule = options.schedule;
            if (options.customLog) {
              // for backward compatibility with code that used customLog
              console.log('Deprecated: use schedule instead of customLog');
              this.schedule = options.customLog;
            }
            if (this.crossValidate || options.crossValidate) {
              if (!this.crossValidate) this.crossValidate = {};
              crossValidate = true;
              if (options.crossValidate.testSize) this.crossValidate.testSize = options.crossValidate.testSize;
              if (options.crossValidate.testError) this.crossValidate.testError = options.crossValidate.testError;
            }
          }

          currentRate = this.rate;
          if (Array.isArray(this.rate)) {
            var bucketSize = Math.floor(this.iterations / this.rate.length);
          }

          if (crossValidate) {
            var numTrain = Math.ceil((1 - this.crossValidate.testSize) * set.length);
            trainSet = set.slice(0, numTrain);
            testSet = set.slice(numTrain);
          }

          var lastError = 0;
          while (!abort && iterations < this.iterations && error > this.error) {
            if (crossValidate && error <= this.crossValidate.testError) {
              break;
            }

            var currentSetSize = set.length;
            error = 0;
            iterations++;

            if (bucketSize > 0) {
              var currentBucket = Math.floor(iterations / bucketSize);
              currentRate = this.rate[currentBucket] || currentRate;
            }

            if (typeof this.rate === 'function') {
              currentRate = this.rate(iterations, lastError);
            }

            if (crossValidate) {
              this._trainSet(trainSet, currentRate, cost);
              error += this.test(testSet).error;
              currentSetSize = 1;
            } else {
              error += this._trainSet(set, currentRate, cost);
              currentSetSize = set.length;
            }

            // check error
            error /= currentSetSize;
            lastError = error;

            if (options) {
              if (this.schedule && this.schedule.every && iterations % this.schedule.every == 0) abort = this.schedule.do({ error: error, iterations: iterations, rate: currentRate });else if (options.log && iterations % options.log == 0) {
                console.log('iterations', iterations, 'error', error, 'rate', currentRate);
              }
              if (options.shuffle) shuffleInplace(set);
            }
          }

          var results = {
            error: error,
            iterations: iterations,
            time: Date.now() - start
          };

          return results;
        }

        // trains any given set to a network, using a WebWorker (only for the browser). Returns a Promise of the results.

      }, {
        key: 'trainAsync',
        value: function trainAsync(set, options) {
          var train = this.workerTrain.bind(this);
          return new Promise(function (resolve, reject) {
            try {
              train(set, resolve, options, true);
            } catch (e) {
              reject(e);
            }
          });
        }

        // preforms one training epoch and returns the error (private function used in this.train)

      }, {
        key: '_trainSet',
        value: function _trainSet(set, currentRate, costFunction) {
          var errorSum = 0;
          for (var i = 0; i < set.length; i++) {
            var input = set[i].input;
            var target = set[i].output;

            var output = this.network.activate(input);
            this.network.propagate(currentRate, target);

            errorSum += costFunction(target, output);
          }
          return errorSum;
        }

        // tests a set and returns the error and elapsed time

      }, {
        key: 'test',
        value: function test(set, options) {
          var error = 0;
          var input, output, target;
          var cost = options && options.cost || this.cost || Trainer.cost.MSE;

          var start = Date.now();

          for (var i = 0; i < set.length; i++) {
            input = set[i].input;
            target = set[i].output;
            output = this.network.activate(input);
            error += cost(target, output);
          }

          error /= set.length;

          var results = {
            error: error,
            time: Date.now() - start
          };

          return results;
        }

        // trains any given set to a network using a WebWorker [deprecated: use trainAsync instead]

      }, {
        key: 'workerTrain',
        value: function workerTrain(set, callback, options, suppressWarning) {
          if (!suppressWarning) {
            console.warn('Deprecated: do not use `workerTrain`, use `trainAsync` instead.');
          }
          var that = this;

          if (!this.network.optimized) this.network.optimize();

          // Create a new worker
          var worker = this.network.worker(this.network.optimized.memory, set, options);

          // train the worker
          worker.onmessage = function (e) {
            switch (e.data.action) {
              case 'done':
                var iterations = e.data.message.iterations;
                var error = e.data.message.error;
                var time = e.data.message.time;

                that.network.optimized.ownership(e.data.memoryBuffer);

                // Done callback
                callback({
                  error: error,
                  iterations: iterations,
                  time: time
                });

                // Delete the worker and all its associated memory
                worker.terminate();
                break;

              case 'log':
                console.log(e.data.message);

              case 'schedule':
                if (options && options.schedule && typeof options.schedule.do === 'function') {
                  var scheduled = options.schedule.do;
                  scheduled(e.data.message);
                }
                break;
            }
          };

          // Start the worker
          worker.postMessage({ action: 'startTraining' });
        }

        // trains an XOR to the network

      }, {
        key: 'XOR',
        value: function XOR(options) {
          if (this.network.inputs() != 2 || this.network.outputs() != 1) throw new Error('Incompatible network (2 inputs, 1 output)');

          var defaults = {
            iterations: 100000,
            log: false,
            shuffle: true,
            cost: Trainer.cost.MSE
          };

          if (options) for (var i in options) {
            defaults[i] = options[i];
          }return this.train([{
            input: [0, 0],
            output: [0]
          }, {
            input: [1, 0],
            output: [1]
          }, {
            input: [0, 1],
            output: [1]
          }, {
            input: [1, 1],
            output: [0]
          }], defaults);
        }

        // trains the network to pass a Distracted Sequence Recall test

      }, {
        key: 'DSR',
        value: function DSR(options) {
          options = options || {};

          var targets = options.targets || [2, 4, 7, 8];
          var distractors = options.distractors || [3, 5, 6, 9];
          var prompts = options.prompts || [0, 1];
          var length = options.length || 24;
          var criterion = options.success || 0.95;
          var iterations = options.iterations || 100000;
          var rate = options.rate || .1;
          var log = options.log || 0;
          var schedule = options.schedule || {};
          var cost = options.cost || this.cost || Trainer.cost.CROSS_ENTROPY;

          var trial, correct, i, j, success;
          trial = correct = i = j = success = 0;
          var error = 1,
              symbols = targets.length + distractors.length + prompts.length;

          var noRepeat = function noRepeat(range, avoid) {
            var number = Math.random() * range | 0;
            var used = false;
            for (var i in avoid) {
              if (number == avoid[i]) used = true;
            }return used ? noRepeat(range, avoid) : number;
          };

          var equal = function equal(prediction, output) {
            for (var i in prediction) {
              if (Math.round(prediction[i]) != output[i]) return false;
            }return true;
          };

          var start = Date.now();

          while (trial < iterations && (success < criterion || trial % 1000 != 0)) {
            // generate sequence
            var sequence = [],
                sequenceLength = length - prompts.length;
            for (i = 0; i < sequenceLength; i++) {
              var any = Math.random() * distractors.length | 0;
              sequence.push(distractors[any]);
            }
            var indexes = [],
                positions = [];
            for (i = 0; i < prompts.length; i++) {
              indexes.push(Math.random() * targets.length | 0);
              positions.push(noRepeat(sequenceLength, positions));
            }
            positions = positions.sort();
            for (i = 0; i < prompts.length; i++) {
              sequence[positions[i]] = targets[indexes[i]];
              sequence.push(prompts[i]);
            }

            //train sequence
            var distractorsCorrect;
            var targetsCorrect = distractorsCorrect = 0;
            error = 0;
            for (i = 0; i < length; i++) {
              // generate input from sequence
              var input = [];
              for (j = 0; j < symbols; j++) {
                input[j] = 0;
              }input[sequence[i]] = 1;

              // generate target output
              var output = [];
              for (j = 0; j < targets.length; j++) {
                output[j] = 0;
              }if (i >= sequenceLength) {
                var index = i - sequenceLength;
                output[indexes[index]] = 1;
              }

              // check result
              var prediction = this.network.activate(input);

              if (equal(prediction, output)) {
                if (i < sequenceLength) distractorsCorrect++;else targetsCorrect++;
              } else {
                this.network.propagate(rate, output);
              }

              error += cost(output, prediction);

              if (distractorsCorrect + targetsCorrect == length) correct++;
            }

            // calculate error
            if (trial % 1000 == 0) correct = 0;
            trial++;
            var divideError = trial % 1000;
            divideError = divideError == 0 ? 1000 : divideError;
            success = correct / divideError;
            error /= length;

            // log
            if (log && trial % log == 0) console.log('iterations:', trial, ' success:', success, ' correct:', correct, ' time:', Date.now() - start, ' error:', error);
            if (schedule.do && schedule.every && trial % schedule.every == 0) schedule.do({
              iterations: trial,
              success: success,
              error: error,
              time: Date.now() - start,
              correct: correct
            });
          }

          return {
            iterations: trial,
            success: success,
            error: error,
            time: Date.now() - start
          };
        }

        // train the network to learn an Embeded Reber Grammar

      }, {
        key: 'ERG',
        value: function ERG(options) {

          options = options || {};
          var iterations = options.iterations || 150000;
          var criterion = options.error || .05;
          var rate = options.rate || .1;
          var log = options.log || 500;
          var cost = options.cost || this.cost || Trainer.cost.CROSS_ENTROPY;

          // gramar node
          var Node = function Node() {
            this.paths = [];
          };
          Node.prototype = {
            connect: function connect(node, value) {
              this.paths.push({
                node: node,
                value: value
              });
              return this;
            },
            any: function any() {
              if (this.paths.length == 0) return false;
              var index = Math.random() * this.paths.length | 0;
              return this.paths[index];
            },
            test: function test(value) {
              for (var i in this.paths) {
                if (this.paths[i].value == value) return this.paths[i];
              }return false;
            }
          };

          var reberGrammar = function reberGrammar() {

            // build a reber grammar
            var output = new Node();
            var n1 = new Node().connect(output, 'E');
            var n2 = new Node().connect(n1, 'S');
            var n3 = new Node().connect(n1, 'V').connect(n2, 'P');
            var n4 = new Node().connect(n2, 'X');
            n4.connect(n4, 'S');
            var n5 = new Node().connect(n3, 'V');
            n5.connect(n5, 'T');
            n2.connect(n5, 'X');
            var n6 = new Node().connect(n4, 'T').connect(n5, 'P');
            var input = new Node().connect(n6, 'B');

            return {
              input: input,
              output: output
            };
          };

          // build an embeded reber grammar
          var embededReberGrammar = function embededReberGrammar() {
            var reber1 = reberGrammar();
            var reber2 = reberGrammar();

            var output = new Node();
            var n1 = new Node().connect(output, 'E');
            reber1.output.connect(n1, 'T');
            reber2.output.connect(n1, 'P');
            var n2 = new Node().connect(reber1.input, 'P').connect(reber2.input, 'T');
            var input = new Node().connect(n2, 'B');

            return {
              input: input,
              output: output
            };
          };

          // generate an ERG sequence
          var generate = function generate() {
            var node = embededReberGrammar().input;
            var next = node.any();
            var str = '';
            while (next) {
              str += next.value;
              next = next.node.any();
            }
            return str;
          };

          // test if a string matches an embeded reber grammar
          var test = function test(str) {
            var node = embededReberGrammar().input;
            var i = 0;
            var ch = str.charAt(i);
            while (i < str.length) {
              var next = node.test(ch);
              if (!next) return false;
              node = next.node;
              ch = str.charAt(++i);
            }
            return true;
          };

          // helper to check if the output and the target vectors match
          var different = function different(array1, array2) {
            var max1 = 0;
            var i1 = -1;
            var max2 = 0;
            var i2 = -1;
            for (var i in array1) {
              if (array1[i] > max1) {
                max1 = array1[i];
                i1 = i;
              }
              if (array2[i] > max2) {
                max2 = array2[i];
                i2 = i;
              }
            }

            return i1 != i2;
          };

          var iteration = 0;
          var error = 1;
          var table = {
            'B': 0,
            'P': 1,
            'T': 2,
            'X': 3,
            'S': 4,
            'E': 5
          };

          var start = Date.now();
          while (iteration < iterations && error > criterion) {
            var i = 0;
            error = 0;

            // ERG sequence to learn
            var sequence = generate();

            // input
            var read = sequence.charAt(i);
            // target
            var predict = sequence.charAt(i + 1);

            // train
            while (i < sequence.length - 1) {
              var input = [];
              var target = [];
              for (var j = 0; j < 6; j++) {
                input[j] = 0;
                target[j] = 0;
              }
              input[table[read]] = 1;
              target[table[predict]] = 1;

              var output = this.network.activate(input);

              if (different(output, target)) this.network.propagate(rate, target);

              read = sequence.charAt(++i);
              predict = sequence.charAt(i + 1);

              error += cost(target, output);
            }
            error /= sequence.length;
            iteration++;
            if (iteration % log == 0) {
              console.log('iterations:', iteration, ' time:', Date.now() - start, ' error:', error);
            }
          }

          return {
            iterations: iteration,
            error: error,
            time: Date.now() - start,
            test: test,
            generate: generate
          };
        }
      }, {
        key: 'timingTask',
        value: function timingTask(options) {

          if (this.network.inputs() != 2 || this.network.outputs() != 1) throw new Error('Invalid Network: must have 2 inputs and one output');

          if (typeof options == 'undefined') options = {};

          // helper
          function getSamples(trainingSize, testSize) {

            // sample size
            var size = trainingSize + testSize;

            // generate samples
            var t = 0;
            var set = [];
            for (var i = 0; i < size; i++) {
              set.push({ input: [0, 0], output: [0] });
            }
            while (t < size - 20) {
              var n = Math.round(Math.random() * 20);
              set[t].input[0] = 1;
              for (var j = t; j <= t + n; j++) {
                set[j].input[1] = n / 20;
                set[j].output[0] = 0.5;
              }
              t += n;
              n = Math.round(Math.random() * 20);
              for (var k = t + 1; k <= t + n && k < size; k++) {
                set[k].input[1] = set[t].input[1];
              }t += n;
            }

            // separate samples between train and test sets
            var trainingSet = [];
            var testSet = [];
            for (var l = 0; l < size; l++) {
              (l < trainingSize ? trainingSet : testSet).push(set[l]);
            } // return samples
            return {
              train: trainingSet,
              test: testSet
            };
          }

          var iterations = options.iterations || 200;
          var error = options.error || .005;
          var rate = options.rate || [.03, .02];
          var log = options.log === false ? false : options.log || 10;
          var cost = options.cost || this.cost || Trainer.cost.MSE;
          var trainingSamples = options.trainSamples || 7000;
          var testSamples = options.trainSamples || 1000;

          // samples for training and testing
          var samples = getSamples(trainingSamples, testSamples);

          // train
          var result = this.train(samples.train, {
            rate: rate,
            log: log,
            iterations: iterations,
            error: error,
            cost: cost
          });

          return {
            train: result,
            test: this.test(samples.test)
          };
        }
      }]);

      return Trainer;
    }();

    Trainer.cost = cost;
    exports.default = Trainer;

    /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Architect = exports.Network = exports.Trainer = exports.Layer = exports.Neuron = undefined;

    var _Neuron = __webpack_require__(2);

    Object.defineProperty(exports, 'Neuron', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Neuron).default;
      }
    });

    var _Layer = __webpack_require__(0);

    Object.defineProperty(exports, 'Layer', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Layer).default;
      }
    });

    var _Trainer = __webpack_require__(3);

    Object.defineProperty(exports, 'Trainer', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Trainer).default;
      }
    });

    var _Network = __webpack_require__(1);

    Object.defineProperty(exports, 'Network', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Network).default;
      }
    });

    var _architect = __webpack_require__(7);

    var Architect = _interopRequireWildcard(_architect);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    exports.Architect = Architect;

    /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var connections = exports.connections = 0;

    var Connection = function () {
      function Connection(from, to, weight) {
        _classCallCheck(this, Connection);

        if (!from || !to) throw new Error("Connection Error: Invalid neurons");

        this.ID = Connection.uid();
        this.from = from;
        this.to = to;
        this.weight = typeof weight == 'undefined' ? Math.random() * .2 - .1 : weight;
        this.gain = 1;
        this.gater = null;
      }

      _createClass(Connection, null, [{
        key: "uid",
        value: function uid() {
          return exports.connections = connections += 1, connections - 1;
        }
      }]);

      return Connection;
    }();

    exports.default = Connection;

    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.connections = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    // represents a connection from one layer to another, and keeps track of its weight and gain
    var connections = exports.connections = 0;

    var LayerConnection = function () {
      function LayerConnection(fromLayer, toLayer, type, weights) {
        _classCallCheck(this, LayerConnection);

        this.ID = LayerConnection.uid();
        this.from = fromLayer;
        this.to = toLayer;
        this.selfconnection = toLayer == fromLayer;
        this.type = type;
        this.connections = {};
        this.list = [];
        this.size = 0;
        this.gatedfrom = [];

        if (typeof this.type == 'undefined') {
          if (fromLayer == toLayer) this.type = _Layer2.default.connectionType.ONE_TO_ONE;else this.type = _Layer2.default.connectionType.ALL_TO_ALL;
        }

        if (this.type == _Layer2.default.connectionType.ALL_TO_ALL || this.type == _Layer2.default.connectionType.ALL_TO_ELSE) {
          for (var here in this.from.list) {
            for (var there in this.to.list) {
              var from = this.from.list[here];
              var to = this.to.list[there];
              if (this.type == _Layer2.default.connectionType.ALL_TO_ELSE && from == to) continue;
              var connection = from.project(to, weights);

              this.connections[connection.ID] = connection;
              this.size = this.list.push(connection);
            }
          }
        } else if (this.type == _Layer2.default.connectionType.ONE_TO_ONE) {

          for (var neuron in this.from.list) {
            var from = this.from.list[neuron];
            var to = this.to.list[neuron];
            var connection = from.project(to, weights);

            this.connections[connection.ID] = connection;
            this.size = this.list.push(connection);
          }
        }

        fromLayer.connectedTo.push(this);
      }

      _createClass(LayerConnection, null, [{
        key: 'uid',
        value: function uid() {
          return exports.connections = connections += 1, connections - 1;
        }
      }]);

      return LayerConnection;
    }();

    exports.default = LayerConnection;

    /***/ }),
    /* 7 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Perceptron = __webpack_require__(8);

    Object.defineProperty(exports, 'Perceptron', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Perceptron).default;
      }
    });

    var _LSTM = __webpack_require__(9);

    Object.defineProperty(exports, 'LSTM', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_LSTM).default;
      }
    });

    var _Liquid = __webpack_require__(10);

    Object.defineProperty(exports, 'Liquid', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Liquid).default;
      }
    });

    var _Hopfield = __webpack_require__(11);

    Object.defineProperty(exports, 'Hopfield', {
      enumerable: true,
      get: function get() {
        return _interopRequireDefault(_Hopfield).default;
      }
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Network2 = __webpack_require__(1);

    var _Network3 = _interopRequireDefault(_Network2);

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var Perceptron = function (_Network) {
      _inherits(Perceptron, _Network);

      function Perceptron() {
        _classCallCheck(this, Perceptron);

        var _this = _possibleConstructorReturn(this, (Perceptron.__proto__ || Object.getPrototypeOf(Perceptron)).call(this));

        var args = Array.prototype.slice.call(arguments); // convert arguments to Array
        if (args.length < 3) throw new Error('not enough layers (minimum 3) !!');

        var inputs = args.shift(); // first argument
        var outputs = args.pop(); // last argument
        var layers = args; // all the arguments in the middle

        var input = new _Layer2.default(inputs);
        var hidden = [];
        var output = new _Layer2.default(outputs);

        var previous = input;

        // generate hidden layers
        for (var i = 0; i < layers.length; i++) {
          var size = layers[i];
          var layer = new _Layer2.default(size);
          hidden.push(layer);
          previous.project(layer);
          previous = layer;
        }
        previous.project(output);

        // set layers of the neural network
        _this.set({
          input: input,
          hidden: hidden,
          output: output
        });
        return _this;
      }

      return Perceptron;
    }(_Network3.default);

    exports.default = Perceptron;

    /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Network2 = __webpack_require__(1);

    var _Network3 = _interopRequireDefault(_Network2);

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var LSTM = function (_Network) {
      _inherits(LSTM, _Network);

      function LSTM() {
        _classCallCheck(this, LSTM);

        var _this = _possibleConstructorReturn(this, (LSTM.__proto__ || Object.getPrototypeOf(LSTM)).call(this));

        var args = Array.prototype.slice.call(arguments); // convert arguments to array
        if (args.length < 3) throw new Error("not enough layers (minimum 3) !!");

        var last = args.pop();
        var option = {
          peepholes: _Layer2.default.connectionType.ALL_TO_ALL,
          hiddenToHidden: false,
          outputToHidden: false,
          outputToGates: false,
          inputToOutput: true
        };
        if (typeof last != 'number') {
          var outputs = args.pop();
          if (last.hasOwnProperty('peepholes')) option.peepholes = last.peepholes;
          if (last.hasOwnProperty('hiddenToHidden')) option.hiddenToHidden = last.hiddenToHidden;
          if (last.hasOwnProperty('outputToHidden')) option.outputToHidden = last.outputToHidden;
          if (last.hasOwnProperty('outputToGates')) option.outputToGates = last.outputToGates;
          if (last.hasOwnProperty('inputToOutput')) option.inputToOutput = last.inputToOutput;
        } else {
          var outputs = last;
        }

        var inputs = args.shift();
        var layers = args;

        var inputLayer = new _Layer2.default(inputs);
        var hiddenLayers = [];
        var outputLayer = new _Layer2.default(outputs);

        var previous = null;

        // generate layers
        for (var i = 0; i < layers.length; i++) {
          // generate memory blocks (memory cell and respective gates)
          var size = layers[i];

          var inputGate = new _Layer2.default(size).set({
            bias: 1
          });
          var forgetGate = new _Layer2.default(size).set({
            bias: 1
          });
          var memoryCell = new _Layer2.default(size);
          var outputGate = new _Layer2.default(size).set({
            bias: 1
          });

          hiddenLayers.push(inputGate);
          hiddenLayers.push(forgetGate);
          hiddenLayers.push(memoryCell);
          hiddenLayers.push(outputGate);

          // connections from input layer
          var input = inputLayer.project(memoryCell);
          inputLayer.project(inputGate);
          inputLayer.project(forgetGate);
          inputLayer.project(outputGate);

          // connections from previous memory-block layer to this one
          if (previous != null) {
            var cell = previous.project(memoryCell);
            previous.project(inputGate);
            previous.project(forgetGate);
            previous.project(outputGate);
          }

          // connections from memory cell
          var output = memoryCell.project(outputLayer);

          // self-connection
          var self = memoryCell.project(memoryCell);

          // hidden to hidden recurrent connection
          if (option.hiddenToHidden) memoryCell.project(memoryCell, _Layer2.default.connectionType.ALL_TO_ELSE);

          // out to hidden recurrent connection
          if (option.outputToHidden) outputLayer.project(memoryCell);

          // out to gates recurrent connection
          if (option.outputToGates) {
            outputLayer.project(inputGate);
            outputLayer.project(outputGate);
            outputLayer.project(forgetGate);
          }

          // peepholes
          memoryCell.project(inputGate, option.peepholes);
          memoryCell.project(forgetGate, option.peepholes);
          memoryCell.project(outputGate, option.peepholes);

          // gates
          inputGate.gate(input, _Layer2.default.gateType.INPUT);
          forgetGate.gate(self, _Layer2.default.gateType.ONE_TO_ONE);
          outputGate.gate(output, _Layer2.default.gateType.OUTPUT);
          if (previous != null) inputGate.gate(cell, _Layer2.default.gateType.INPUT);

          previous = memoryCell;
        }

        // input to output direct connection
        if (option.inputToOutput) inputLayer.project(outputLayer);

        // set the layers of the neural network
        _this.set({
          input: inputLayer,
          hidden: hiddenLayers,
          output: outputLayer
        });
        return _this;
      }

      return LSTM;
    }(_Network3.default);

    exports.default = LSTM;

    /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Network2 = __webpack_require__(1);

    var _Network3 = _interopRequireDefault(_Network2);

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var Liquid = function (_Network) {
      _inherits(Liquid, _Network);

      function Liquid(inputs, hidden, outputs, connections, gates) {
        _classCallCheck(this, Liquid);

        // create layers
        var _this = _possibleConstructorReturn(this, (Liquid.__proto__ || Object.getPrototypeOf(Liquid)).call(this));

        var inputLayer = new _Layer2.default(inputs);
        var hiddenLayer = new _Layer2.default(hidden);
        var outputLayer = new _Layer2.default(outputs);

        // make connections and gates randomly among the neurons
        var neurons = hiddenLayer.neurons();
        var connectionList = [];

        for (var i = 0; i < connections; i++) {
          // connect two random neurons
          var from = Math.random() * neurons.length | 0;
          var to = Math.random() * neurons.length | 0;
          var connection = neurons[from].project(neurons[to]);
          connectionList.push(connection);
        }

        for (var j = 0; j < gates; j++) {
          // pick a random gater neuron
          var gater = Math.random() * neurons.length | 0;
          // pick a random connection to gate
          var connection = Math.random() * connectionList.length | 0;
          // let the gater gate the connection
          neurons[gater].gate(connectionList[connection]);
        }

        // connect the layers
        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        // set the layers of the network
        _this.set({
          input: inputLayer,
          hidden: [hiddenLayer],
          output: outputLayer
        });
        return _this;
      }

      return Liquid;
    }(_Network3.default);

    exports.default = Liquid;

    /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _Network2 = __webpack_require__(1);

    var _Network3 = _interopRequireDefault(_Network2);

    var _Trainer = __webpack_require__(3);

    var _Trainer2 = _interopRequireDefault(_Trainer);

    var _Layer = __webpack_require__(0);

    var _Layer2 = _interopRequireDefault(_Layer);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var Hopfield = function (_Network) {
      _inherits(Hopfield, _Network);

      function Hopfield(size) {
        _classCallCheck(this, Hopfield);

        var _this = _possibleConstructorReturn(this, (Hopfield.__proto__ || Object.getPrototypeOf(Hopfield)).call(this));

        var inputLayer = new _Layer2.default(size);
        var outputLayer = new _Layer2.default(size);

        inputLayer.project(outputLayer, _Layer2.default.connectionType.ALL_TO_ALL);

        _this.set({
          input: inputLayer,
          hidden: [],
          output: outputLayer
        });

        _this.trainer = new _Trainer2.default(_this);
        return _this;
      }

      _createClass(Hopfield, [{
        key: 'learn',
        value: function learn(patterns) {
          var set = [];
          for (var p in patterns) {
            set.push({
              input: patterns[p],
              output: patterns[p]
            });
          }return this.trainer.train(set, {
            iterations: 500000,
            error: .00005,
            rate: 1
          });
        }
      }, {
        key: 'feed',
        value: function feed(pattern) {
          var output = this.activate(pattern);

          var pattern = [];
          for (var i in output) {
            pattern[i] = output[i] > .5 ? 1 : 0;
          }return pattern;
        }
      }]);

      return Hopfield;
    }(_Network3.default);

    exports.default = Hopfield;

    /***/ })
    /******/ ]);
    });
    });

    var synaptic$1 = unwrapExports(synaptic);
    var synaptic_1 = synaptic.Neuron;
    var synaptic_2 = synaptic.Layer;
    var synaptic_3 = synaptic.Trainer;
    var synaptic_4 = synaptic.Network;
    var synaptic_5 = synaptic.Perceptron;
    var synaptic_6 = synaptic.LSTM;
    var synaptic_7 = synaptic.Liquid;
    var synaptic_8 = synaptic.Hopfield;

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
            this.network = new synaptic$1.Architect.Perceptron(NeuralNetworkParameters.InputLayerSize, NeuralNetworkParameters.HiddenLayerSize, NeuralNetworkParameters.OutputLayerSize);
        }
        /**
         * Creates a neural network from JSON.
         */
        NeuralNetwork.fromJSON = function (structure) {
            var instance = new this();
            instance.network = synaptic$1.Network.fromJSON(structure);
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
            new synaptic$1.Trainer(this.network).train(trainingSet, trainingOptions);
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
    		gater: null
    	},

