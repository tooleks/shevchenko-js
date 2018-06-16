"use strict";

/**
 * ErrorHandler class.
 */
class ErrorHandler {
    /**
     * ErrorHandler constructor.
     */
    constructor() {
        this.handle = this.handle.bind(this);
    }

    /**
     * Handle application errors.
     *
     * @param err
     * @param req
     * @param res
     * @param next
     */
    handle(err, req, res, next) {
        console.error(err);
        req.flash("flashes", {type: "danger", message: req.__("internal-server-error")});
        res.redirect(req.generateUrl("/"));
    }
}

module.exports = ErrorHandler;
