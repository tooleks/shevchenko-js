"use strict";

const i18n = require("i18n");

/**
 * Utils class.
 */
class Utils {
    /**
     * Utils constructor.
     *
     * @param {UrlService} urlService
     * @param {ShareLinksProvider} shareLinksProvider
     */
    constructor(urlService, shareLinksProvider) {
        this._urlService = urlService;
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
        // Apply generate URL helper method.
        res.locals.genUrl = (url) => this._urlService.genAbsoluteUrl(url, {locale: req.getLocale()});
        res.locals.currentUrl = this._urlService.genAbsoluteUrl(req.url, {locale: req.getLocale()});

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
            const url = this._urlService.genAbsoluteUrl(req.url, {locale});
            url.searchParams.set("lang", locale);
            const title = i18n.__({phrase: `${locale}_language`, locale});
            return {url, title};
        });

        next();
    }
}

module.exports = Utils;
