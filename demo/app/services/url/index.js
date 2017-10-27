"use strict";

const {URL} = require("url");

const generate = (req, url) => {
    const absoluteUrl = new URL(process.env.APP_URL + url);
    if (!absoluteUrl.searchParams.has("lang")) {
        absoluteUrl.searchParams.set("lang", req.getLocale());
    }
    return absoluteUrl;
};

module.exports = {generate};
