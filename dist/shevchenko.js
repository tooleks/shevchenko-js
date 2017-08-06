"use strict";

(function () {

    /**
     * Inflection rules. / Правила відмінювання.
     *
     * @type {Array<object>}
     */
    shevchenko.rules = [{"description":"чоловічі прізвища на -ець","types":["lastName"],"priority":7,"gender":["male"],"regexp":{"find":"^(жнець|швець|чернець|перець)$","modify":"ць$"},"applyType":"replace","examples":["жнець"],"cases":{"nominative":[""],"genitive":["ця"],"dative":["цю","цеві"],"accusative":["ця"],"ablative":["цем"],"locative":["цю","цеві"],"vocative":["цю"]}},{"description":"ім'я федір","priority":5,"gender":["male"],"regexp":{"find":"^федір$","modify":"ір$"},"applyType":"replace","examples":["федір"],"cases":{"nominative":[""],"genitive":["ора"],"dative":["ору","орові"],"accusative":["ора"],"ablative":["ором"],"locative":["орові"],"vocative":["оре"]}},{"description":"чоловічі прізвища на -мінь","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"мінь$","modify":"інь$"},"applyType":"replace","examples":["кремінь"],"cases":{"nominative":[""],"genitive":["еня"],"dative":["еню","еневі"],"accusative":["еня"],"ablative":["енем"],"locative":["ені","еневі"],"vocative":["еню"]}},{"description":"жіночі прізвища на -ська","types":["lastName"],"priority":4,"gender":["female"],"regexp":{"find":"ська$","modify":"а$"},"applyType":"replace","examples":["сумська"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"жіночі прізвища на -цька","types":["lastName"],"priority":4,"gender":["female"],"regexp":{"find":"цька$","modify":"а$"},"applyType":"replace","examples":["ільницька"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"чоловічі прізвища на -ишин","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"ишин$","modify":""},"applyType":"append","examples":["ковалишин"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е"]}},{"description":"чоловічі прізвища на -кінь","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"кінь$","modify":"інь$"},"applyType":"replace","examples":["сивокінь"],"cases":{"nominative":[""],"genitive":["оня"],"dative":["оню","оневі"],"accusative":["оня"],"ablative":["онем"],"locative":["оні","оневі"],"vocative":["оню"]}},{"description":"чоловічі прізвища на -лець","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"лець$","modify":"ець$"},"applyType":"replace","examples":["стрілець"],"cases":{"nominative":[""],"genitive":["ьця"],"dative":["ьцю","ьцеві"],"accusative":["ьця"],"ablative":["ьцем"],"locative":["ьцю","ьцеві"],"vocative":["ьцю"]}},{"description":"ім'я ігор","types":["firstName"],"priority":4,"gender":["male"],"regexp":{"find":"^ігор$","modify":"^ігор$"},"applyType":"replace","examples":["ігор"],"cases":{"nominative":[""],"genitive":["ігоря"],"dative":["ігорю","ігореві"],"accusative":["ігоря"],"ablative":["ігорем"],"locative":["ігорю","ігореві"],"vocative":["ігорю"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -іт, окрім -віт","priority":3,"gender":["male"],"regexp":{"find":"[^в]іт$","modify":"іт$"},"applyType":"replace","examples":["кіт"],"cases":{"nominative":[""],"genitive":["ота"],"dative":["оту","отові"],"accusative":["ота"],"ablative":["отом"],"locative":["отові"],"vocative":["оте"]}},{"description":"чоловічі прізвища на -ідь","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ідь$","modify":"ідь$"},"applyType":"replace","examples":["лебідь"],"cases":{"nominative":[""],"genitive":["едя"],"dative":["едю","едеві"],"accusative":["едя"],"ablative":["едем"],"locative":["едю","едеві"],"vocative":["едю"]}},{"description":"чоловічі, жіночі прізвища на -ніс","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ніс$","modify":"іс$"},"applyType":"replace","examples":["кривоніс"],"cases":{"nominative":[""],"genitive":["оса"],"dative":["осу","осові"],"accusative":["оса"],"ablative":["осом"],"locative":["осу","осові"],"vocative":["осе"]}},{"description":"друга відміна / чоловічий рід / мішана група / нульове закінчення на -кіш","priority":3,"gender":["male"],"regexp":{"find":"кіш$","modify":"іш$"},"applyType":"replace","examples":["розкіш"],"cases":{"nominative":[""],"genitive":["оша"],"dative":["ошеві"],"accusative":["оша"],"ablative":["ошем"],"locative":["ошеві"],"vocative":["оше"]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення на -ляр","priority":3,"gender":["male"],"regexp":{"find":"ляр$","modify":""},"applyType":"append","examples":["скляр"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","еві"],"accusative":["а"],"ablative":["ем"],"locative":["еві","у"],"vocative":["е",""]}},{"description":"чоловічі прізвища на -их, -аго, -ово","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"(их|аго|ово)$","modify":""},"applyType":"replace","examples":["бряних"],"cases":{"nominative":[""],"genitive":[""],"dative":[""],"accusative":[""],"ablative":[""],"locative":[""],"vocative":[""]}},{"description":"чоловічі прізвища на -єць","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"єць$","modify":"єць$"},"applyType":"replace","examples":["заєць"],"cases":{"nominative":[""],"genitive":["йця"],"dative":["йцю","йцеві"],"accusative":["йця"],"ablative":["йцем"],"locative":["йцю","йцеві"],"vocative":["йцю"]}},{"description":"чоловічі прізвища на -ець","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ець$","modify":"ець$"},"applyType":"replace","examples":["свинець"],"cases":{"nominative":[""],"genitive":["ця"],"dative":["цю","цеві"],"accusative":["ця"],"ablative":["цем"],"locative":["цю","цеві"],"vocative":["цю"]}},{"description":"перша відміна / чоловічий, жіночий роди / м'яка група / на -я","priority":2,"gender":["male","female"],"regexp":{"find":"(і|ь)я$","modify":"я$"},"applyType":"replace","examples":["юлія"],"cases":{"nominative":[""],"genitive":["ї"],"dative":["ї"],"accusative":["ю"],"ablative":["єю"],"locative":["ї"],"vocative":["є"]}},{"description":"жіночі по батькові на -на / перша відміна / тверда група / закінчення на -а","types":["middleName"],"priority":2,"gender":["female"],"regexp":{"find":"на$","modify":"а$"},"applyType":"replace","examples":["юріївна"],"cases":{"nominative":[""],"genitive":["и"],"dative":["і"],"accusative":["у"],"ablative":["ою"],"locative":["і"],"vocative":["о"]}},{"description":"чоловічі по батькові на -ич / друга відміна / мішана група","types":["middleName"],"priority":2,"gender":["male"],"regexp":{"find":"ич$","modify":""},"applyType":"append","examples":["валерійович"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ем"],"locative":["у"],"vocative":["у"]}},{"description":"чоловічі, жіночі прізвища на -я","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"(ц|к|г|щ|з|х|ґ|ф|в|п|р|л|д|с|м|т|б)я$","modify":"я$"},"applyType":"replace","examples":["гмиря"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["е"]}},{"description":"жіночі імена на -ов","types":["firstName"],"priority":2,"gender":["female"],"regexp":{"find":"ов$","modify":""},"applyType":"append","examples":["любов"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":[""],"ablative":["'ю"],"locative":["і"],"vocative":["е"]}},{"description":"чоловічі, жіночі прізвища на -га","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["гаджега"],"cases":{"nominative":[""],"genitive":["га"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го"]}},{"description":"чоловічі, жіночі прізвища на -ґа","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"ґа$","modify":"ґа$"},"applyType":"replace","examples":["гаджеґа"],"cases":{"nominative":[""],"genitive":["ґа"],"dative":["зі"],"accusative":["ґу"],"ablative":["ґою"],"locative":["зі"],"vocative":["ґо"]}},{"description":"чоловічі прізвища на -ек","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ек$","modify":""},"applyType":"append","examples":["марек"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"перша відміна / жіночий рід / тверда група / на -га","priority":2,"gender":["female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["ольга"],"cases":{"nominative":[""],"genitive":["ги"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го"]}},{"description":"перша відміна / чоловічий, жіночий рід / тверда група / на -га","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["нудьга"],"cases":{"nominative":[""],"genitive":["ги"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го","га"]}},{"description":"перша відміна / чоловічий, жіночий рід / тверда група / на -ха","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"ха$","modify":"ха$"},"applyType":"replace","examples":["старуха"],"cases":{"nominative":[""],"genitive":["хи"],"dative":["сі"],"accusative":["ху"],"ablative":["хою"],"locative":["сі"],"vocative":["хо","ха"]}},{"description":"третя відміна / жіночий рід /  на -ль","priority":2,"gender":["female"],"regexp":{"find":"ль$","modify":"ь$"},"applyType":"replace","examples":["нінель"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":[""],"ablative":["лю"],"locative":["і"],"vocative":["е"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -ко","priority":2,"gender":["male"],"regexp":{"find":"ко$","modify":"о$"},"applyType":"replace","examples":["марко"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -о","priority":2,"gender":["male"],"regexp":{"find":"(ц|н|г|щ|з|х|ґ|ф|в|п|р|л|д|с|м|т|б)о$","modify":"о$"},"applyType":"replace","examples":["петро","павло"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові","і"],"vocative":["е"]}},{"description":"перша відміна / чоловічий рід / м'яка група / на -ля","types":["firstName"],"priority":2,"gender":["male"],"regexp":{"find":"ля$","modify":"я$"},"applyType":"replace","examples":["ілля"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["е"]}},{"description":"перша відміна / жіночий рід / м'яка група / на -я","priority":2,"gender":["female"],"regexp":{"find":"(ц|к|н|г|щ|з|х|ґ|ф|в|п|р|л|д|с|м|т|б)я$","modify":"я$"},"applyType":"replace","examples":["неля"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["ю"]}},{"description":"чоловічі прізвища на -ич","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ич$","modify":""},"applyType":"append","examples":["риндич"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ем"],"locative":["у"],"vocative":["у"]}},{"description":"перша відміна / чоловічий, жіночий роди / мішана група / на -а","priority":2,"gender":["male","female"],"regexp":{"find":"(ш|ч|ж|дж)а$","modify":"а$"},"applyType":"replace","examples":["саша"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["у"],"ablative":["ею"],"locative":["і"],"vocative":["о"]}},{"description":"перша відміна / чоловічий, жіночий роди / тверда група / на -ка","priority":2,"gender":["male","female"],"regexp":{"find":"ка$","modify":"ка$"},"applyType":"replace","examples":["аничка"],"cases":{"nominative":[""],"genitive":["ки"],"dative":["ці"],"accusative":["ку"],"ablative":["кою"],"locative":["ці"],"vocative":["ко"]}},{"description":"жіночі прізвища на -ва, -на","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"(ва|на)$","modify":"а$"},"applyType":"replace","examples":["іванова"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"чоловічі прізвища на -ий","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ий$","modify":"ий$"},"applyType":"replace","examples":["сухомлинський"],"cases":{"nominative":[""],"genitive":["ого"],"dative":["ому"],"accusative":["ого"],"ablative":["им"],"locative":["ому"],"vocative":[""]}},{"description":"чоловічі прізвища на -ов","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ов$","modify":""},"applyType":"append","examples":["павлов"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е"]}},{"description":"чоловічі прізвища на -ів","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ів$","modify":""},"applyType":"append","examples":["ковалів"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е",""]}},{"description":"чоловічі прізвища на -ьо","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ьо$","modify":"ьо$"},"applyType":"replace","examples":["іваньо"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ьові"],"accusative":["я"],"ablative":["ьом"],"locative":["ьові"],"vocative":[""]}},{"description":"жіночі прізвища на -о, -ь і на приголосні","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"(о|ь|б|в|г|ґ|д|ж|з|й|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$","modify":""},"applyType":"replace","examples":["шевченко"],"cases":{"nominative":[""],"genitive":[""],"dative":[""],"accusative":[""],"ablative":[""],"locative":[""],"vocative":[""]}},{"description":"жіночі прізвища на -ня","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"ня$","modify":"я$"},"applyType":"replace","examples":["задорожня"],"cases":{"nominative":[""],"genitive":["ьої"],"dative":["ій"],"accusative":["ю"],"ablative":["ьою"],"locative":["ій"],"vocative":[""]}},{"description":"друга відміна / чоловічий рід / мішана група","priority":1,"gender":["male"],"regexp":{"find":"(ш|ч|ж|дж)$","modify":""},"applyType":"append","examples":["януш","джордж"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","еві"],"accusative":["а"],"ablative":["ем"],"locative":["еві","і","у"],"vocative":["е"]}},{"description":"друга відміна / середній рід / м'яка група / на -е","priority":1,"gender":["male","female"],"regexp":{"find":"е$","modify":"е$"},"applyType":"replace","examples":["поле"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю"],"accusative":["е"],"ablative":["ем"],"locative":["і"],"vocative":[""]}},{"description":"перша відміна / чоловічий, жіночий роди / тверда група / на -а","priority":1,"gender":["male","female"],"regexp":{"find":"а$","modify":"а$"},"applyType":"replace","examples":["анна"],"cases":{"nominative":[""],"genitive":["и"],"dative":["і"],"accusative":["у"],"ablative":["ою"],"locative":["і"],"vocative":["о"]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення","priority":1,"gender":["male"],"regexp":{"find":"(ц|к|н|щ|з|х|ф|в|п|р|л|д|с|м|т|б)$","modify":""},"applyType":"append","examples":["олександр"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові","і"],"vocative":["е"]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення / на -г, -ґ","priority":1,"gender":["male"],"regexp":{"find":"(г|ґ)$","modify":""},"applyType":"append","examples":["грег"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"друга відміна / чоловічий рід / м'яка група / на -й","priority":1,"gender":["male"],"regexp":{"find":"й$","modify":"й$"},"applyType":"replace","examples":["валерій","андрій"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю","єві"],"accusative":["я"],"ablative":["єм"],"locative":["єві","ю","ї"],"vocative":["ю"]}},{"description":"друга відміна / чоловічий рід / м'яка група / на -ь","priority":1,"gender":["male"],"regexp":{"find":"ь$","modify":"ь$"},"applyType":"replace","examples":["василь"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю","еві"],"accusative":["я"],"ablative":["ем"],"locative":["еві","ю","і"],"vocative":["ю"]}}];

    /**
     * Male gender. / Чоловічий рід.
     *
     * @type {string}
     */
    shevchenko.genderMale = "male";

    /**
     * Female gender. / Жіночий рід.
     *
     * @type {string}
     */
    shevchenko.genderFemale = "female";

    /**
     * Nominative case. / Називний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameNominative = "nominative";

    /**
     * Genitive case. / Родовий відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameGenitive = "genitive";

    /**
     * Dative case. / Давальний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameDative = "dative";

    /**
     * Accusative case. / Знахідний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameAccusative = "accusative";

    /**
     * Ablative case. / Орудний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameAblative = "ablative";

    /**
     * Locative case. / Місцевий відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameLocative = "locative";

    /**
     * Vocative case. / Кличний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameVocative = "vocative";

    /**
     * Get available rules. / Отримати доступні правила.
     *
     * @returns {Array<object>}
     */
    shevchenko.getRules = function () {
        return shevchenko.rules.slice(0);
    };

    /**
     * Get available genders. / Отримати доступні роди.
     *
     * @returns {Array<string>}
     */
    shevchenko.getGenders = function () {
        return [
            shevchenko.genderMale,
            shevchenko.genderFemale
        ];
    };

    /**
     * Get available case names. / Отримати доступні відмінки.
     *
     * @returns {Array<string>}
     */
    shevchenko.getCaseNames = function () {
        return [
            shevchenko.caseNameNominative,
            shevchenko.caseNameGenitive,
            shevchenko.caseNameDative,
            shevchenko.caseNameAccusative,
            shevchenko.caseNameAblative,
            shevchenko.caseNameLocative,
            shevchenko.caseNameVocative
        ];
    };

    /**
     * Inflect the person first, last and middle names. / Відмінити прізвище, ім'я та по батькові особи.
     *
     * @example var result = shevchenko({
     *     gender: "male",
     *     lastName: "Петренко",
     *     firstName: "Петро",
     *     middleName: "Петрович"
     * }, shevchenko.caseNameVocative);
     *
     * @param {object} person
     * @param {string} caseName
     * @returns {object}
     */
    function shevchenko(person, caseName) {
        assertPerson(person);
        assertCaseName(caseName);
        normalizePerson(person);

        var result = {};

        if (typeof person.lastName !== "undefined") {
            result.lastName = inflectLastName(person.gender, person.lastName, caseName);
        }
        if (typeof person.firstName !== "undefined") {
            result.firstName = inflectFirstName(person.gender, person.firstName, caseName);
        }
        if (typeof person.middleName !== "undefined") {
            result.middleName = inflectMiddleName(person.gender, person.middleName, caseName);
        }

        if (typeof person.lastName !== "undefined" && typeof result.lastName === "undefined") {
            result.lastName = person.lastName;
        }
        if (typeof person.fistName !== "undefined" && typeof result.lastName === "undefined") {
            result.fistName = person.fistName;
        }
        if (typeof person.middleName !== "undefined" && typeof result.lastName === "undefined") {
            result.middleName = person.middleName;
        }

        return result;
    }

    function assertPerson(person) {
        if (typeof person !== "object") {
            throw new Error("Invalid person object type.");
        }
        if (!person.hasOwnProperty("gender")) {
            throw new Error("No gender property found in the person object.");
        }
        if (typeof person.gender !== "string") {
            throw new Error("Invalid gender property type provided in the person object.");
        }
        if (shevchenko.getGenders().indexOf(person.gender) === -1) {
            throw new Error("Invalid gender property value provided in the person object.");
        }
        if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
            throw new Error("No name properties found in the person object.");
        }
    }

    function assertCaseName(caseName) {
        if (typeof caseName !== "string") {
            throw new Error("Invalid caseName type.");
        }
        if (shevchenko.getCaseNames().indexOf(caseName) === -1) {
            throw new Error("Invalid caseName value.");
        }
    }

    function normalizePerson(person) {
        if (person.hasOwnProperty("lastName") && typeof person.lastName !== "undefined") {
            person.lastName = person.lastName.toLowerCase();
        }
        if (person.hasOwnProperty("firstName") && typeof person.firstName !== "undefined") {
            person.firstName = person.firstName.toLowerCase();
        }
        if (person.hasOwnProperty("middleName") && typeof person.middleName !== "undefined") {
            person.middleName = person.middleName.toLowerCase();
        }
    }

    function inflectLastName(gender, lastName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "lastName");
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, lastName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "lastName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, lastName);
        }).shift();
    }

    function inflectFirstName(gender, firstName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "firstName");
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, firstName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "firstName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, firstName);
        }).shift();
    }

    function inflectMiddleName(gender, middleName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "middleName", true);
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, middleName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "middleName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, middleName);
        }).shift();
    }

    function inflectByRule(rule, caseName, word) {
        var ruleType = rule.applyType;
        var regexp = rule.regexp.modify;
        var caseValue = rule.cases[caseName][0];
        return getInflectionCallbacks()[ruleType](regexp, word, caseValue);
    }

    function getInflectionCallbacks() {
        return {
            "append": function (regexp, word, caseValue) {
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (caseValue.length) {
                    return word + caseValue;
                }
                return word;
            },
            "replace": function (regexp, word, caseValue) {
                if (typeof regexp !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (caseValue.length) {
                    return word.replace(new RegExp(regexp, "gm"), caseValue);
                }
                return word;
            }
        };
    }

    function sortByTypeAndPriorityDesc(firstRule, secondRule, type) {
        return !firstRule.hasOwnProperty("types") && secondRule.hasOwnProperty("types") && secondRule.types.indexOf(type) !== -1
            ? 1
            : 0;
    }

    function filterRulesByType(rule, type, strict) {
        if (!rule.hasOwnProperty("types")) {
            return !strict;
        }
        return rule.types.some(function (ruleType) {
            return ruleType === type;
        });
    }

    function filterRulesByGender(rule, gender) {
        return rule.gender.indexOf(gender) !== -1;
    }

    function filterRulesByRegexp(rule, value) {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    }

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
