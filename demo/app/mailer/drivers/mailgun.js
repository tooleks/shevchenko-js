"use strict";

const Mailgun = require("mailgun-js");

const mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const send = async (data) => {
    return new Promise((resolve, reject) => {
        mailgun.messages().send(data, (error, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
};

module.exports = {send};
