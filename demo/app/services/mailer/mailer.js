"use strict";

const driver = require("./drivers/mailgun");

const send = async (data) => {
    return driver.send(data);
};

module.exports = {send};
