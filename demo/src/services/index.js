"use strict";

const Mailer = require("./Mailer");
const MailgunMailerDriver = require("./MailgunMailerDriver");
const ShareLinksProvider = require("./ShareLinksProvider");
const UrlService = require("./UrlService");

const mailgunMailDriver = new MailgunMailerDriver();
const mailer = new Mailer(mailgunMailDriver);
const shareLinksProvider = new ShareLinksProvider();
const urlService = new UrlService();

module.exports = {mailer, shareLinksProvider, urlService};
