"use strict";

function buildPerson(gender, lastName, firstName, middleName) {
    return {
        gender: gender,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
    };
}

module.exports = buildPerson;
