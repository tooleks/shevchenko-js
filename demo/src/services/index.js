"use strict";

const Mailer = require("./Mailer");
const MailgunMailerDriver = require("./MailgunMailerDriver");
const ShareLinksProvider = require("./ShareLinksProvider");

const mailgunMailDriver = new MailgunMailerDriver();
const mailer = new Mailer(mailgunMailDriver);
const shareLinksProvider = new ShareLinksProvider();

module.exports = {mailer, shareLinksProvider};
