(function() {
  var writers = [
    { gender: "male", lastName: "Шевченко", firstName: "Тарас", middleName: "Григорович" },
    { gender: "male", lastName: "Франко", firstName: "Іван", middleName: "Якович" },
    { gender: "male", lastName: "Нечуй-Левицький", firstName: "Іван", middleName: "Семенович" },
    { gender: "male", lastName: "Рудченко", firstName: "Панас", middleName: "Якович" },
    { gender: "male", lastName: "Рудченко", firstName: "Іван", middleName: "Якович" },
    { gender: "male", lastName: "Лозов'яга", firstName: "Іван", middleName: "Павлович" },
    { gender: "male", lastName: "Котляревський", firstName: "Іван", middleName: "Петрович" },
    { gender: "male", lastName: "Сосюра", firstName: "Володимир", middleName: "Миколайович" },
    { gender: "male", lastName: "Тичина", firstName: "Павло", middleName: "Григорович" },
    { gender: "male", lastName: "Симоненко", firstName: "Василь", middleName: "Андрійович" },
    { gender: "male", lastName: "Фітільов", firstName: "Микола", middleName: "Григорович" },
    { gender: "male", lastName: "Коцюбинський", firstName: "Михайло", middleName: "Михайлович" },
    { gender: "male", lastName: "Сковорода", firstName: "Григорій", middleName: "Савич" },
    { gender: "male", lastName: "Куліш", firstName: "Пантелеймон", middleName: "Олександрович" },
    { gender: "male", lastName: "Глібов", firstName: "Леонід", middleName: "Іванович" },
    { gender: "male", lastName: "Гончар", firstName: "Олександр", middleName: "Терентійович" },
    { gender: "male", lastName: "Довженко", firstName: "Олександр", middleName: "Петрович" },
    { gender: "female", lastName: "Косач-Квітка", firstName: "Лариса", middleName: "Петрівна" },
    { gender: "female", lastName: "Косач", firstName: "Ольга", middleName: "Петрівна" },
    { gender: "female", lastName: "Вілінська", firstName: "Марія", middleName: "Олександрівна" },
    { gender: "female", lastName: "Кобилянська", firstName: "Ольга", middleName: "Юліанівна" },
  ];

  function initializeInflectionPreview(index, callback) {
    index = typeof index === "undefined" ? randomNumber(0, writers.length - 1) : 0;
    var inflectedAnthroponym = shevchenko.inVocative(writers[index]);
    var value =
      inflectedAnthroponym.firstName + " " + inflectedAnthroponym.middleName + " " + inflectedAnthroponym.lastName;
    callback(value);
  }

  function randomNumber(min, max) {
    var random = Math.floor(Math.random() * max);
    return min ? random + min : random;
  }

  function buildAnthroponym(gender, lastName, firstName, middleName) {
    var anthroponym = {};
    anthroponym.gender = gender;
    anthroponym.lastName = lastName;
    anthroponym.firstName = firstName;
    anthroponym.middleName = middleName;
    return anthroponym;
  }

  function getDefaultAnthroponym() {
    return buildAnthroponym("male", "Шевченко", "Тарас", "Григорович");
  }

  function inflect(anthroponym, successCallback) {
    const results = shevchenko.inAll(anthroponym);
    for (var caseName in results) {
      if (results.hasOwnProperty(caseName)) {
        successCallback(anthroponym, caseName, results[caseName]);
      }
    }
  }

  function setInflectionResult(anthroponym, caseName, result) {
    var lastNameResultSelector = $("#" + caseName + "LastName");
    var firstNameResultSelector = $("#" + caseName + "FirstName");
    var middleNameResultSelector = $("#" + caseName + "MiddleName");
    var lastName = typeof result.lastName !== "undefined" ? result.lastName : "";
    lastNameResultSelector.text(lastName);
    var firstName = typeof result.firstName !== "undefined" ? result.firstName : "";
    firstNameResultSelector.text(firstName);
    var middleName = typeof result.middleName !== "undefined" ? result.middleName : "";
    middleNameResultSelector.text(middleName);
  }

  function setIssuesCount(value) {
    $("#issuesCount").text(parseInt(value));
  }

  function setInflectionPreview(value) {
    var previewSelector = $("#preview");
    if (previewSelector.text() === value) return;
    previewSelector.fadeOut(400, function() {
      previewSelector.text(value);
      previewSelector.fadeIn(400);
    });
  }

  initializeInflectionPreview(0, setInflectionPreview);
  setInterval(function() {
    var undefined;
    initializeInflectionPreview(undefined, setInflectionPreview);
  }, 5000);

  $(document).ready(function() {
    var anthroponym = getDefaultAnthroponym();
    inflect(anthroponym, setInflectionResult);
  });

  $("#inflection-form").submit(function(event) {
    event.preventDefault();
    var anthroponym = buildAnthroponym(
      $("[name=gender]:checked")
        .val()
        .trim(),
      $("[name=lastName]")
        .val()
        .trim(),
      $("[name=firstName]")
        .val()
        .trim(),
      $("[name=middleName]")
        .val()
        .trim(),
    );
    if (!anthroponym.firstName.length && !anthroponym.lastName.length && !anthroponym.middleName.length) {
      anthroponym = getDefaultAnthroponym();
    }
    inflect(anthroponym, setInflectionResult);
  });

  $.get("https://api.github.com/repos/tooleks/shevchenko-js", function(data) {
    setIssuesCount(data.open_issues_count);
  });
})();
