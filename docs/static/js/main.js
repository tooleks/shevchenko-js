(function () {

  'use strict';

  $(document).ready(onDocumentReady);
  $('#inflection-form').submit(onFormSubmit);
  $.get('https://api.github.com/repos/tooleks/shevchenko-js', onGitHubResponse);
  setTimeout(onPreviewInterval, 0);
  setInterval(onPreviewInterval, 5000);

  /*
   * Handlers
   */

  function onDocumentReady() {
    var anthroponym = getDefaultAnthroponym();
    inflect(anthroponym, renderInflectionResult);
  }

  function onPreviewInterval() {
    var anthroponym = shevchenko.inVocative(getRandomAnthroponym());
    var preview = anthroponym.firstName + ' ' + anthroponym.middleName + ' ' + anthroponym.lastName;
    renderInflectionPreview(preview);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    var anthroponym = getFormAnthroponym()
    if (!anthroponym.firstName.length && !anthroponym.lastName.length && !anthroponym.middleName.length) {
      anthroponym = getDefaultAnthroponym();
    }
    inflect(anthroponym, renderInflectionResult);
  }

  function onGitHubResponse(response) {
    renderIssuesCount(response.open_issues_count);
  }

  /*
   * DOM
   */

  function renderInflectionPreview(preview) {
    var previewElem = $('#preview');
    if (previewElem.text() === preview) return;
    previewElem.fadeOut(400, function () {
      previewElem.text(preview);
      previewElem.fadeIn(400);
    });
  }

  function renderInflectionResult(anthroponym, grammaticalCase) {
    $('#' + grammaticalCase + 'FirstName').text(anthroponym.firstName);
    $('#' + grammaticalCase + 'LastName').text(anthroponym.lastName);
    $('#' + grammaticalCase + 'MiddleName').text(anthroponym.middleName);
  }

  function renderIssuesCount(count) {
    $('#issuesCount').text(parseInt(count));
  }

  function getFormAnthroponym() {
    return {
      gender: $('[name=gender]:checked').val().trim(),
      firstName: $('[name=firstName]').val().trim(),
      middleName: $('[name=middleName]').val().trim(),
      lastName: $('[name=lastName]').val().trim(),
    };
  }

  /*
   * Utils
   */

  function getRandomNumber(min, max) {
    var random = Math.floor(Math.random() * max);
    return min ? random + min : random;
  }

  /*
   * Core
   */

  var anthroponyms = [
    { gender: 'male', lastName: 'Шевченко', firstName: 'Тарас', middleName: 'Григорович' },
    { gender: 'male', lastName: 'Франко', firstName: 'Іван', middleName: 'Якович' },
    { gender: 'male', lastName: 'Нечуй-Левицький', firstName: 'Іван', middleName: 'Семенович' },
    { gender: 'male', lastName: 'Рудченко', firstName: 'Панас', middleName: 'Якович' },
    { gender: 'male', lastName: 'Рудченко', firstName: 'Іван', middleName: 'Якович' },
    { gender: 'male', lastName: 'Лозов\'яга', firstName: 'Іван', middleName: 'Павлович' },
    { gender: 'male', lastName: 'Котляревський', firstName: 'Іван', middleName: 'Петрович' },
    { gender: 'male', lastName: 'Сосюра', firstName: 'Володимир', middleName: 'Миколайович' },
    { gender: 'male', lastName: 'Тичина', firstName: 'Павло', middleName: 'Григорович' },
    { gender: 'male', lastName: 'Симоненко', firstName: 'Василь', middleName: 'Андрійович' },
    { gender: 'male', lastName: 'Фітільов', firstName: 'Микола', middleName: 'Григорович' },
    { gender: 'male', lastName: 'Коцюбинський', firstName: 'Михайло', middleName: 'Михайлович' },
    { gender: 'male', lastName: 'Сковорода', firstName: 'Григорій', middleName: 'Савич' },
    { gender: 'male', lastName: 'Куліш', firstName: 'Пантелеймон', middleName: 'Олександрович' },
    { gender: 'male', lastName: 'Глібов', firstName: 'Леонід', middleName: 'Іванович' },
    { gender: 'male', lastName: 'Гончар', firstName: 'Олександр', middleName: 'Терентійович' },
    { gender: 'male', lastName: 'Довженко', firstName: 'Олександр', middleName: 'Петрович' },
    { gender: 'female', lastName: 'Косач-Квітка', firstName: 'Лариса', middleName: 'Петрівна' },
    { gender: 'female', lastName: 'Косач', firstName: 'Ольга', middleName: 'Петрівна' },
    { gender: 'female', lastName: 'Вілінська', firstName: 'Марія', middleName: 'Олександрівна' },
    { gender: 'female', lastName: 'Кобилянська', firstName: 'Ольга', middleName: 'Юліанівна' },
  ];

  function getDefaultAnthroponym() {
    return anthroponyms[0];
  }

  function getRandomAnthroponym() {
    var index = getRandomNumber(0, anthroponyms.length - 1);
    return anthroponyms[index];
  }

  function inflect(anthroponym, callback) {
    callback(shevchenko.inNominative(anthroponym), 'nominative');
    callback(shevchenko.inGenitive(anthroponym), 'genitive');
    callback(shevchenko.inDative(anthroponym), 'dative');
    callback(shevchenko.inAccusative(anthroponym), 'accusative');
    callback(shevchenko.inAblative(anthroponym), 'ablative');
    callback(shevchenko.inLocative(anthroponym), 'locative');
    callback(shevchenko.inVocative(anthroponym), 'vocative');
  }

})();
