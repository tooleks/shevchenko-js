"use strict";

/**
 * ContactMeController class.
 */
class ContactMeController {
    /**
     * ContactMeController constructor.
     *
     * @param {Mailer} mailer
     */
    constructor(mailer) {
        this._mailer = mailer;
        this.send = this.send.bind(this);
    }

    /**
     * Send contact me message.
     *
     * @param req
     * @param res
     * @param next
     */
    async send(req, res, next) {
        const from = `${req.body.name} <${req.body.email}>`;
        const to = process.env.APP_EMAIL;
        const subject = `${process.env.APP_NAME} - ${req.__("contact_me")}`;
        const text = req.body.message;

        try {
            await this._mailer.send({from, to, subject, text});
        } catch (err) {
            next(err);
            return;
        }

        req.flash("flashes", {type: "success", message: req.__("contact_me_form_success_alert")});
        res.redirect(req.generateUrl("/"));
    }
}

module.exports = ContactMeController;
