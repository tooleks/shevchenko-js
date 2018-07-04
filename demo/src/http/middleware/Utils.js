"use strict";

const {URL} = require("url");
const i18n = require("i18n");

/**
 * Utils class.
 */
class Utils {
    /**
     * Utils constructor.
     *
     * @param {ShareLinksProvider} shareLinksProvider
     */
    constructor(shareLinksProvider) {
        this._shareLinksProvider = shareLinksProvider;
        this.handle = this.handle.bind(this);
    }

    /**
     * Add utils API to req and res.
     *
     * @param req
     * @param res
     * @param next
     */
    handle(req, res, next) {
        // Apply generate URL API to req, res objects.
        const generateUrl = (relativeUrl = "") => {
            const absoluteUrl = new URL(process.env.APP_URL + relativeUrl);
            if (!absoluteUrl.searchParams.has("lang")) {
                absoluteUrl.searchParams.set("lang", req.getLocale());
            }
            return absoluteUrl;
        };
        req.generateUrl = generateUrl;
        res.locals.generateUrl = generateUrl;

        // Apply current URL API to res object.
        res.locals.currentUrl = new URL(process.env.APP_URL + req.url);

        // Apply share on social URL's API to res object.
        res.locals.shareOnFacebookUrl = this._shareLinksProvider.facebook(
            res.locals.currentUrl,
            req.__("app_description"),
        );
        res.locals.shareOnTwitterUrl = this._shareLinksProvider.twitter(
            res.locals.currentUrl,
            req.__("app_description"),
        );
        res.locals.shareOnGooglePlusUrl = this._shareLinksProvider.googlePlus(
            res.locals.currentUrl,
            req.__("app_description"),
        );
        res.locals.shareOnLinkedInUrl = this._shareLinksProvider.linkedIn(
            res.locals.currentUrl,
            req.__("app_description"),
        );

        // Apply language switcher API to res object.
        res.locals.languageSwitcher = i18n.getLocales().map((locale) => {
            const url = new URL(process.env.APP_URL + req.url);
            url.searchParams.set("lang", locale);
            const title = i18n.__({phrase: `${locale}_language`, locale});
            return {url, title};
        });

        //
        next();
    }
}

module.exports = Utils;
