"use strict";

const {URL} = require("url");

const generate = (req, url) => {
    const absoluteUrl = new URL(process.env.APP_URL + url);
    absoluteUrl.searchParams.set("lang", req.getLocale());
    return absoluteUrl;
};

module.exports = {generate};
