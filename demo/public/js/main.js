(function () {

    var writers = [
        {"gender": "male", "lastName": "Шевченко", "firstName": "Тарас", "middleName": "Григорович"},
        {"gender": "male", "lastName": "Франко", "firstName": "Іван", "middleName": "Якович"},
        {"gender": "male", "lastName": "Нечуй-Левицький", "firstName": "Іван", "middleName": "Семенович"},
        {"gender": "male", "lastName": "Рудченко", "firstName": "Панас", "middleName": "Якович"},
        {"gender": "male", "lastName": "Рудченко", "firstName": "Іван", "middleName": "Якович"},
        {"gender": "male", "lastName": "Лозов'яга", "firstName": "Іван", "middleName": "Павлович"},
        {"gender": "male", "lastName": "Котляревський", "firstName": "Іван", "middleName": "Петрович"},
        {"gender": "male", "lastName": "Сосюра", "firstName": "Володимир", "middleName": "Миколайович"},
        {"gender": "male", "lastName": "Тичина", "firstName": "Павло", "middleName": "Григорович"},
        {"gender": "male", "lastName": "Симоненко", "firstName": "Василь", "middleName": "Андрійович"},
        {"gender": "male", "lastName": "Фітільов", "firstName": "Микола", "middleName": "Григорович"},
        {"gender": "male", "lastName": "Коцюбинський", "firstName": "Михайло", "middleName": "Михайлович"},
        {"gender": "male", "lastName": "Сковорода", "firstName": "Григорій", "middleName": "Савич"},
        {"gender": "male", "lastName": "Куліш", "firstName": "Пантелеймон", "middleName": "Олександрович"},
        {"gender": "male", "lastName": "Глібов", "firstName": "Леонід", "middleName": "Іванович"},
        {"gender": "male", "lastName": "Гончар", "firstName": "Олександр", "middleName": "Терентійович"},
        {"gender": "male", "lastName": "Довженко", "firstName": "Олександр", "middleName": "Петрович"},
        {"gender": "female", "lastName": "Косач-Квітка", "firstName": "Лариса", "middleName": "Петрівна"},
        {"gender": "female", "lastName": "Косач", "firstName": "Ольга", "middleName": "Петрівна"},
        {"gender": "female", "lastName": "Вілінська", "firstName": "Марія", "middleName": "Олександрівна"},
        {"gender": "female", "lastName": "Кобилянська", "firstName": "Ольга", "middleName": "Юліанівна"},
    ];

    function initializeInflectionPreview(index, callback) {
        index = typeof index === "undefined" ? randomNumber(0, writers.length - 1) : 0;
        var inflectedPerson = shevchenko.inVocative(writers[index]);
        var value = inflectedPerson.firstName + " " + inflectedPerson.middleName + " " + inflectedPerson.lastName;
        callback(value);
    }

    function randomNumber(min, max) {
        var random = Math.floor(Math.random() * max);
        return min ? random + min : random;
    }

    function buildPerson(gender, lastName, firstName, middleName) {
        var person = {};
        person.gender = gender;
        person.lastName = lastName;
        person.firstName = firstName;
        person.middleName = middleName;
        return person;
    }

    function getDefaultPerson() {
        return buildPerson("male", "Шевченко", "Тарас", "Григорович");
    }

    function inflect(person, successCallback) {
        const results = shevchenko.inAll(person);
        for (var caseName in results) {
            if (results.hasOwnProperty(caseName)) {
                successCallback(person, caseName, results[caseName]);
            }
        }
    }

    function setInflectionResult(person, caseName, result) {
        var genderResultSelector = $("#" + caseName + "Gender");
        var lastNameResultSelector = $("#" + caseName + "LastName");
        var firstNameResultSelector = $("#" + caseName + "FirstName");
        var middleNameResultSelector = $("#" + caseName + "MiddleName");
        if (person.gender === "male") {
            genderResultSelector.text("Чоловік");
        } else if (person.gender === "female") {
            genderResultSelector.text("Жінка");
        } else {
            genderResultSelector.text("");
        }
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
        previewSelector.fadeOut(400, function () {
            previewSelector.text(value);
            previewSelector.fadeIn(400);
        });
    }

    initializeInflectionPreview(0, setInflectionPreview);
    setInterval(function () {
        var undefined;
        initializeInflectionPreview(undefined, setInflectionPreview);
    }, 5000);

    $(document).ready(function () {
        var person = getDefaultPerson();
        inflect(person, setInflectionResult);
    });

    $("#inflection-form").submit(function (event) {
        event.preventDefault();
        var person = buildPerson(
            $("[name=gender]:checked").val().trim(),
            $("[name=lastName]").val().trim(),
            $("[name=firstName]").val().trim(),
            $("[name=middleName]").val().trim()
        );
        if (!person.firstName.length && !person.lastName.length && !person.middleName.length) {
            person = getDefaultPerson();
        }
        inflect(person, setInflectionResult);
    });

    $.get("https://api.github.com/repos/tooleks/shevchenko-js", function (data) {
        setIssuesCount(data.open_issues_count);
    });

})();
