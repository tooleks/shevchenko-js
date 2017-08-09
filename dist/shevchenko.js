"use strict";

(function () {

    /**
     * Inflection rules. / Правила відмінювання.
     *
     * @type {Array<object>}
     */
    shevchenko.rules = [{"description":"ім'я федір","priority":5,"gender":["male"],"regexp":{"find":"^федір$","modify":"ір$"},"applyType":"replace","examples":["федір"],"cases":{"nominative":[""],"genitive":["ора"],"dative":["ору","орові"],"accusative":["ора"],"ablative":["ором"],"locative":["орові"],"vocative":["оре"]}},{"description":"чоловічі прізвища на -приголосна-приголосна-ець, окрім -лець","types":["lastName"],"priority":5,"gender":["male"],"regexp":{"find":"(б|в|г|ґ|д|дз|дж|ж|з|й|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)(б|в|г|ґ|д|дз|дж|ж|з|й|к|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)ець$","modify":"ць$"},"applyType":"replace","examples":["жнець"],"cases":{"nominative":[""],"genitive":["ця"],"dative":["цю","цеві"],"accusative":["ця"],"ablative":["цем"],"locative":["цю","цеві"],"vocative":["цю"]}},{"description":"чоловічі прізвища на -лець","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"лець$","modify":"ець$"},"applyType":"replace","examples":["стрілець"],"cases":{"nominative":[""],"genitive":["ьця"],"dative":["ьцю","ьцеві"],"accusative":["ьця"],"ablative":["ьцем"],"locative":["ьцю","ьцеві"],"vocative":["ьцю"]}},{"description":"чоловічі прізвища на -кінь","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"кінь$","modify":"інь$"},"applyType":"replace","examples":["сивокінь"],"cases":{"nominative":[""],"genitive":["оня"],"dative":["оню","оневі"],"accusative":["оня"],"ablative":["онем"],"locative":["оні","оневі"],"vocative":["оню"]}},{"description":"чоловічі прізвища на -мінь","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"мінь$","modify":"інь$"},"applyType":"replace","examples":["кремінь"],"cases":{"nominative":[""],"genitive":["еня"],"dative":["еню","еневі"],"accusative":["еня"],"ablative":["енем"],"locative":["ені","еневі"],"vocative":["еню"]}},{"description":"чоловічі прізвища на -ишин","types":["lastName"],"priority":4,"gender":["male"],"regexp":{"find":"ишин$","modify":""},"applyType":"append","examples":["ковалишин"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е"]}},{"description":"жіночі прізвища на -цька","types":["lastName"],"priority":4,"gender":["female"],"regexp":{"find":"цька$","modify":"а$"},"applyType":"replace","examples":["ільницька"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"жіночі прізвища на -ська","types":["lastName"],"priority":4,"gender":["female"],"regexp":{"find":"ська$","modify":"а$"},"applyType":"replace","examples":["сумська"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"ім'я ігор","types":["firstName"],"priority":4,"gender":["male"],"regexp":{"find":"^ігор$","modify":"^ігор$"},"applyType":"replace","examples":["ігор"],"cases":{"nominative":[""],"genitive":["ігоря"],"dative":["ігорю","ігореві"],"accusative":["ігоря"],"ablative":["ігорем"],"locative":["ігорю","ігореві"],"vocative":["ігорю"]}},{"description":"чоловічі прізвища на -єць","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"єць$","modify":"єць$"},"applyType":"replace","examples":["заєць"],"cases":{"nominative":[""],"genitive":["йця"],"dative":["йцю","йцеві"],"accusative":["йця"],"ablative":["йцем"],"locative":["йцю","йцеві"],"vocative":["йцю"]}},{"description":"чоловічі прізвища на -их, -аго, -ово","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"(их|аго|ово)$","modify":""},"applyType":"replace","examples":["бряних"],"cases":{"nominative":[""],"genitive":[""],"dative":[""],"accusative":[""],"ablative":[""],"locative":[""],"vocative":[""]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення на -ляр","priority":3,"gender":["male"],"regexp":{"find":"ляр$","modify":""},"applyType":"append","examples":["скляр"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","еві"],"accusative":["а"],"ablative":["ем"],"locative":["еві","у"],"vocative":["е",""]}},{"description":"друга відміна / чоловічий рід / мішана група / нульове закінчення на -кіш","priority":3,"gender":["male"],"regexp":{"find":"кіш$","modify":"іш$"},"applyType":"replace","examples":["розкіш"],"cases":{"nominative":[""],"genitive":["оша"],"dative":["ошеві"],"accusative":["оша"],"ablative":["ошем"],"locative":["ошеві"],"vocative":["оше"]}},{"description":"чоловічі, жіночі прізвища на -ніс","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ніс$","modify":"іс$"},"applyType":"replace","examples":["кривоніс"],"cases":{"nominative":[""],"genitive":["оса"],"dative":["осу","осові"],"accusative":["оса"],"ablative":["осом"],"locative":["осу","осові"],"vocative":["осе"]}},{"description":"чоловічі прізвища на -ідь","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ідь$","modify":"ідь$"},"applyType":"replace","examples":["лебідь"],"cases":{"nominative":[""],"genitive":["едя"],"dative":["едю","едеві"],"accusative":["едя"],"ablative":["едем"],"locative":["едю","едеві"],"vocative":["едю"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -іт, окрім -віт","priority":3,"gender":["male"],"regexp":{"find":"[^в]іт$","modify":"іт$"},"applyType":"replace","examples":["кіт"],"cases":{"nominative":[""],"genitive":["ота"],"dative":["оту","отові"],"accusative":["ота"],"ablative":["отом"],"locative":["отові"],"vocative":["оте"]}},{"description":"чоловічі прізвища на -ець","types":["lastName"],"priority":3,"gender":["male"],"regexp":{"find":"ець$","modify":"ець$"},"applyType":"replace","examples":["свинець"],"cases":{"nominative":[""],"genitive":["ця"],"dative":["цю","цеві"],"accusative":["ця"],"ablative":["цем"],"locative":["цю","цеві"],"vocative":["цю"]}},{"description":"жіночі прізвища на -ва, -на","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"(ва|на)$","modify":"а$"},"applyType":"replace","examples":["іванова"],"cases":{"nominative":[""],"genitive":["ої"],"dative":["ій"],"accusative":["у"],"ablative":["ою"],"locative":["ій"],"vocative":[""]}},{"description":"чоловічі прізвища на -ий","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ий$","modify":"ий$"},"applyType":"replace","examples":["сухомлинський"],"cases":{"nominative":[""],"genitive":["ого"],"dative":["ому"],"accusative":["ого"],"ablative":["им"],"locative":["ому"],"vocative":[""]}},{"description":"чоловічі прізвища на -ов","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ов$","modify":""},"applyType":"append","examples":["павлов"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е"]}},{"description":"чоловічі прізвища на -ів","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ів$","modify":""},"applyType":"append","examples":["ковалів"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["им"],"locative":["у"],"vocative":["е",""]}},{"description":"чоловічі прізвища на -ьо","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ьо$","modify":"ьо$"},"applyType":"replace","examples":["іваньо"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ьові"],"accusative":["я"],"ablative":["ьом"],"locative":["ьові"],"vocative":[""]}},{"description":"жіночі прізвища на -о, -ь і на приголосні","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"(о|ь|б|в|г|ґ|д|дз|дж|ж|з|й|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)$","modify":""},"applyType":"replace","examples":["шевченко"],"cases":{"nominative":[""],"genitive":[""],"dative":[""],"accusative":[""],"ablative":[""],"locative":[""],"vocative":[""]}},{"description":"жіночі прізвища на -ня","types":["lastName"],"priority":2,"gender":["female"],"regexp":{"find":"ня$","modify":"я$"},"applyType":"replace","examples":["задорожня"],"cases":{"nominative":[""],"genitive":["ьої"],"dative":["ій"],"accusative":["ю"],"ablative":["ьою"],"locative":["ій"],"vocative":[""]}},{"description":"чоловічі прізвища на -ич","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ич$","modify":""},"applyType":"append","examples":["риндич"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ем"],"locative":["у"],"vocative":["у"]}},{"description":"чоловічі прізвища на -ек","types":["lastName"],"priority":2,"gender":["male"],"regexp":{"find":"ек$","modify":""},"applyType":"append","examples":["марек"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"чоловічі, жіночі прізвища на -ґа","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"ґа$","modify":"ґа$"},"applyType":"replace","examples":["гаджеґа"],"cases":{"nominative":[""],"genitive":["ґа"],"dative":["зі"],"accusative":["ґу"],"ablative":["ґою"],"locative":["зі"],"vocative":["ґо"]}},{"description":"чоловічі, жіночі прізвища на -га","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["гаджега"],"cases":{"nominative":[""],"genitive":["га"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го"]}},{"description":"чоловічі, жіночі прізвища на -[^н]я","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"(б|в|г|ґ|д|дз|дж|ж|з|й|к|л|м|п|р|с|т|ф|х|ц|ч|ш|щ)я$","modify":"я$"},"applyType":"replace","examples":["гмиря"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["е"]}},{"description":"чоловічі по батькові на -ич / друга відміна / мішана група","types":["middleName"],"priority":2,"gender":["male"],"regexp":{"find":"ич$","modify":""},"applyType":"append","examples":["валерійович"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":["а"],"ablative":["ем"],"locative":["у"],"vocative":["у"]}},{"description":"жіночі по батькові на -на / перша відміна / тверда група / закінчення на -а","types":["middleName"],"priority":2,"gender":["female"],"regexp":{"find":"на$","modify":"а$"},"applyType":"replace","examples":["юріївна"],"cases":{"nominative":[""],"genitive":["и"],"dative":["і"],"accusative":["у"],"ablative":["ою"],"locative":["і"],"vocative":["о"]}},{"description":"жіночі імена на -ов","types":["firstName"],"priority":2,"gender":["female"],"regexp":{"find":"ов$","modify":""},"applyType":"append","examples":["любов"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":[""],"ablative":["'ю"],"locative":["і"],"vocative":["е"]}},{"description":"перша відміна / жіночий рід / тверда група / на -га","priority":2,"gender":["female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["ольга"],"cases":{"nominative":[""],"genitive":["ги"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го"]}},{"description":"перша відміна / чоловічий, жіночий роди / тверда група / на -ка","priority":2,"gender":["male","female"],"regexp":{"find":"ка$","modify":"ка$"},"applyType":"replace","examples":["аничка"],"cases":{"nominative":[""],"genitive":["ки"],"dative":["ці"],"accusative":["ку"],"ablative":["кою"],"locative":["ці"],"vocative":["ко"]}},{"description":"перша відміна / чоловічий, жіночий роди / мішана група / на -а","priority":2,"gender":["male","female"],"regexp":{"find":"(дж|ж|ч|ш)а$","modify":"а$"},"applyType":"replace","examples":["саша"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["у"],"ablative":["ею"],"locative":["і"],"vocative":["о"]}},{"description":"перша відміна / чоловічий, жіночий роди / м'яка група / на -я","priority":2,"gender":["male","female"],"regexp":{"find":"(і|ь)я$","modify":"я$"},"applyType":"replace","examples":["юлія"],"cases":{"nominative":[""],"genitive":["ї"],"dative":["ї"],"accusative":["ю"],"ablative":["єю"],"locative":["ї"],"vocative":["є"]}},{"description":"перша відміна / жіночий рід / м'яка група / на -я","priority":2,"gender":["female"],"regexp":{"find":"(б|в|г|ґ|д|дз|дж|ж|з|й|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)я$","modify":"я$"},"applyType":"replace","examples":["неля"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["ю"]}},{"description":"перша відміна / чоловічий рід / м'яка група / на -ля","types":["firstName"],"priority":2,"gender":["male"],"regexp":{"find":"ля$","modify":"я$"},"applyType":"replace","examples":["ілля"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":["ю"],"ablative":["ею"],"locative":["і"],"vocative":["е"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -о, окрім -ко","priority":2,"gender":["male"],"regexp":{"find":"(б|в|г|ґ|д|дз|дж|ж|з|й|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)о$","modify":"о$"},"applyType":"replace","examples":["петро","павло"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові","і"],"vocative":["е"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -ко","priority":2,"gender":["male"],"regexp":{"find":"ко$","modify":"о$"},"applyType":"replace","examples":["марко"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"третя відміна / жіночий рід /  на -ль","priority":2,"gender":["female"],"regexp":{"find":"ль$","modify":"ь$"},"applyType":"replace","examples":["нінель"],"cases":{"nominative":[""],"genitive":["і"],"dative":["і"],"accusative":[""],"ablative":["лю"],"locative":["і"],"vocative":["е"]}},{"description":"перша відміна / чоловічий, жіночий рід / тверда група / на -ха","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"ха$","modify":"ха$"},"applyType":"replace","examples":["старуха"],"cases":{"nominative":[""],"genitive":["хи"],"dative":["сі"],"accusative":["ху"],"ablative":["хою"],"locative":["сі"],"vocative":["хо","ха"]}},{"description":"перша відміна / чоловічий, жіночий рід / тверда група / на -га","types":["lastName"],"priority":2,"gender":["male","female"],"regexp":{"find":"га$","modify":"га$"},"applyType":"replace","examples":["нудьга"],"cases":{"nominative":[""],"genitive":["ги"],"dative":["зі"],"accusative":["гу"],"ablative":["гою"],"locative":["зі"],"vocative":["го","га"]}},{"description":"друга відміна / чоловічий рід / тверда група / на -ок","priority":2,"gender":["male"],"regexp":{"find":"ок$","modify":"ок$"},"applyType":"replace","examples":["сашок"],"cases":{"nominative":[""],"genitive":["ка"],"dative":["ку","кові"],"accusative":["ка"],"ablative":["ком"],"locative":["кові"],"vocative":["ку"]}},{"description":"друга відміна / середній рід / м'яка група / на -ле","priority":2,"gender":["male","female"],"regexp":{"find":"ле$","modify":"е$"},"applyType":"replace","examples":["поле"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю"],"accusative":["е"],"ablative":["ем"],"locative":["і"],"vocative":[""]}},{"description":"друга відміна / середній рід / на -е, окрім -ле","priority":1,"gender":["male","female"],"regexp":{"find":"[^л]е$","modify":"е$"},"applyType":"replace","examples":["прізвище"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у"],"accusative":[""],"ablative":["ем"],"locative":["і"],"vocative":[""]}},{"description":"перша відміна / чоловічий, жіночий роди / тверда група / на -а","priority":1,"gender":["male","female"],"regexp":{"find":"а$","modify":"а$"},"applyType":"replace","examples":["анна"],"cases":{"nominative":[""],"genitive":["и"],"dative":["і"],"accusative":["у"],"ablative":["ою"],"locative":["і"],"vocative":["о"]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення / окрім -г, -ґ, -дж, -ж, -й, -к, -ч, -ш","priority":1,"gender":["male"],"regexp":{"find":"(б|в|д|дз|з|л|м|н|п|р|с|т|ф|х|ц|ч|щ)$","modify":""},"applyType":"append","examples":["олександр"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові","і"],"vocative":["е"]}},{"description":"друга відміна / чоловічий рід / тверда група / нульове закінчення / на -г, -ґ, -к","priority":1,"gender":["male"],"regexp":{"find":"(г|ґ|к)$","modify":""},"applyType":"append","examples":["грег"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","ові"],"accusative":["а"],"ablative":["ом"],"locative":["ові"],"vocative":["у"]}},{"description":"друга відміна / чоловічий рід / м'яка група / на -й","priority":1,"gender":["male"],"regexp":{"find":"й$","modify":"й$"},"applyType":"replace","examples":["валерій","андрій"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю","єві"],"accusative":["я"],"ablative":["єм"],"locative":["єві","ю","ї"],"vocative":["ю"]}},{"description":"друга відміна / чоловічий рід / м'яка група / на -ь","priority":1,"gender":["male"],"regexp":{"find":"ь$","modify":"ь$"},"applyType":"replace","examples":["василь"],"cases":{"nominative":[""],"genitive":["я"],"dative":["ю","еві"],"accusative":["я"],"ablative":["ем"],"locative":["еві","ю","і"],"vocative":["ю"]}},{"description":"друга відміна / чоловічий рід / мішана група","priority":1,"gender":["male"],"regexp":{"find":"(дж|ж|ч|ш)$","modify":""},"applyType":"append","examples":["януш","джордж"],"cases":{"nominative":[""],"genitive":["а"],"dative":["у","еві"],"accusative":["а"],"ablative":["ем"],"locative":["еві","і","у"],"vocative":["е"]}}];

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
     * Inflect the person first, last and middle names in nominative case. / Відмінити прізвище, ім'я та по батькові особи в називному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inNominative = function (person) {
        return shevchenko(person, shevchenko.caseNameNominative);
    };

    /**
     * Inflect the person first, last and middle names in genitive case. / Відмінити прізвище, ім'я та по батькові особи в родовому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inGenitive = function (person) {
        return shevchenko(person, shevchenko.caseNameGenitive);
    };

    /**
     * Inflect the person first, last and middle names in dative case. / Відмінити прізвище, ім'я та по батькові особи в давальному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inDative = function (person) {
        return shevchenko(person, shevchenko.caseNameDative);
    };

    /**
     * Inflect the person first, last and middle names in accusative case. / Відмінити прізвище, ім'я та по батькові особи в знахідному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAccusative = function (person) {
        return shevchenko(person, shevchenko.caseNameAccusative);
    };

    /**
     * Inflect the person first, last and middle names in ablative case. / Відмінити прізвище, ім'я та по батькові особи в орудному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAblative = function (person) {
        return shevchenko(person, shevchenko.caseNameAblative);
    };

    /**
     * Inflect the person first, last and middle names in locative case. / Відмінити прізвище, ім'я та по батькові особи в місцевому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inLocative = function (person) {
        return shevchenko(person, shevchenko.caseNameLocative);
    };

    /**
     * Inflect the person first, last and middle names in vocative case. / Відмінити прізвище, ім'я та по батькові особи в кличному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inVocative = function (person) {
        return shevchenko(person, shevchenko.caseNameVocative);
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
        validator.validatePersonParameter(person);
        validator.validateCaseNameParameter(caseName);

        var result = {};

        if (typeof person.lastName === "string") {
            result.lastName = inflector.inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
            if (typeof result.lastName === "undefined") {
                result.lastName = person.lastName;
            }
            result.lastName = formatter.capitalize(result.lastName);
        }

        if (typeof person.firstName === "string") {
            result.firstName = inflector.inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
            if (typeof result.firstName === "undefined") {
                result.firstName = person.firstName;
            }
            result.firstName = formatter.capitalize(result.firstName);
        }

        if (typeof person.middleName === "string") {
            result.middleName = inflector.inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
            if (typeof result.middleName === "undefined") {
                result.middleName = person.middleName;
            }
            result.middleName = formatter.capitalize(result.middleName);
        }

        return result;
    }

    var inflector = {};

    inflector.inflectLastName = function (gender, lastName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "lastName");
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, lastName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "lastName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, lastName);
        }).shift();
    };

    inflector.inflectFirstName = function (gender, firstName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "firstName");
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, firstName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "firstName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, firstName);
        }).shift();
    };

    inflector.inflectMiddleName = function (gender, middleName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "middleName", true);
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, middleName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "middleName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, middleName);
        }).shift();
    };

    inflector.inflectByRule = function (rule, caseName, word) {
        var ruleType = rule.applyType;
        var regexp = rule.regexp.modify;
        var modifier = rule.cases[caseName][0];
        return inflector.getInflectionCallbacks()[ruleType](regexp, modifier, word);
    };

    inflector.getInflectionCallbacks = function () {
        return {
            "append": function (regexp, modifier, word) {
                assert.string(regexp, "Invalid regexp type of the rule.");
                assert.string(modifier, "Invalid word type of the rule.");
                assert.string(modifier, "Invalid caseValue type of the rule.");
                return modifier.length
                    ? word + modifier
                    : word;
            },
            "replace": function (regexp, modifier, word) {
                assert.string(regexp, "Invalid regexp type of the rule.");
                assert.string(modifier, "Invalid word type of the rule.");
                assert.string(modifier, "Invalid caseValue type of the rule.");
                return modifier.length
                    ? word.replace(new RegExp(regexp, "gm"), modifier)
                    : word;
            }
        };
    };

    var assert = {};

    assert.object = function (value, error) {
        if (typeof value !== "object") assert.throw(error);
    };

    assert.string = function (value, error) {
        if (typeof value !== "string") assert.throw(error);
    };

    assert.inArray = function (array, value, error) {
        if (array.indexOf(value) === -1) assert.throw(error);
    };

    assert.throw = function (error) {
        throw new Error(error);
    };

    var validator = {};

    validator.validatePersonParameter = function (person) {
        assert.object(person, "Invalid person parameter type.");
        if (!person.hasOwnProperty("gender")) assert.throw("No gender property found in the person parameter.");
        assert.string(person.gender, "Invalid gender property type provided in the person parameter.");
        assert.inArray(shevchenko.getGenders(), person.gender, "Invalid gender property value provided in the person parameter.");
        if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
            assert.throw("No name properties found in the person parameter.");
        }
        if (person.hasOwnProperty("lastName")) assert.string(person.lastName, "Invalid person lastName parameter type.");
        if (person.hasOwnProperty("firstName")) assert.string(person.firstName, "Invalid person firstName parameter type.");
        if (person.hasOwnProperty("middleName")) assert.string(person.middleName, "Invalid person middleName parameter type.");
    };

    validator.validateCaseNameParameter = function (caseName) {
        assert.string(caseName, "Invalid caseName parameter type.");
        assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid caseName parameter value.");
    };

    var sort = {};

    sort.rulesByTypeDesc = function (firstRule, secondRule, type) {
        return !firstRule.hasOwnProperty("types") && secondRule.hasOwnProperty("types") && secondRule.types.indexOf(type) !== -1;
    };

    var filter = {};

    filter.rulesByType = function (rule, type, strict) {
        if (rule.hasOwnProperty("types")) {
            return rule.types.some(function (ruleType) {
                return ruleType === type;
            });
        }
        return !strict;
    };

    filter.rulesByGender = function (rule, gender) {
        return rule.gender.indexOf(gender) !== -1;
    };

    filter.rulesByRegexp = function (rule, value) {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    };

    var formatter = {};

    formatter.capitalize = function (string) {
        return typeof string === "string"
            ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
            : string;
    };

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
