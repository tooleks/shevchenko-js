"use strict";

/**
 * RedirectToHome class.
 */
class RedirectToHome {
    /**
     * RedirectToHome constructor.
     */
    constructor() {
        this.handle = this.handle.bind(this);
    }

    /**
     * Redirect to home.
     *
     * @param req
     * @param res
     */
    handle(req, res) {
        res.redirect(req.generateUrl("/"));
    }
}

module.exports = RedirectToHome;
