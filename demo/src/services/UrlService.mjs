import {URL} from "url";

export default class UrlService {
    /**
     * UrlService constructor.
     */
    constructor() {
        this.genAbsoluteUrl = this.genAbsoluteUrl.bind(this);
    }

    /**
     * Generate absolute URL.
     *
     * @param {string} [relativeUrl='']
     * @param {Object} [params={}]
     * @param {string} {params.locale='en']
     * @return {URL}
     */
    genAbsoluteUrl(relativeUrl = "", {locale = "en"} = {}) {
        const host = process.env.APP_URL;
        const url = relativeUrl;
        const absoluteUrl = new URL(host + url);
        if (!absoluteUrl.searchParams.has("lang")) {
            absoluteUrl.searchParams.set("lang", locale);
        }
        return absoluteUrl;
    }
}
