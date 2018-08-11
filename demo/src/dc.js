import Mailer from "./services/Mailer";
import MailgunMailerDriver from "./services/MailgunMailerDriver";
import ShareLinksProvider from "./services/ShareLinksProvider";
import UrlService from "./services/UrlService";

import ErrorHandler from "./http/middleware/ErrorHandler";
import RedirectToHome from "./http/middleware/RedirectToHome";
import Utils from "./http/middleware/Utils";

import ContactMeController from "./http/controllers/ContactMeController";
import HomeController from "./http/controllers/HomeController";

/**
 * Initialize services.
 *
 * @return {{mailer: Mailer, shareLinksProvider: ShareLinksProvider, urlService: UrlService}}
 */
function initializeServices() {
    const mailgunMailDriver = new MailgunMailerDriver();
    const mailer = new Mailer(mailgunMailDriver);
    const shareLinksProvider = new ShareLinksProvider();
    const urlService = new UrlService();
    return {mailer, shareLinksProvider, urlService};
}

/**
 * Initialize middleware.
 *
 * @param {object} dependencies
 * @param {ShareLinksProvider} dependencies.shareLinksProvider
 * @param {UrlService} dependencies.urlService
 * @return {{errorHandler: ErrorHandler, redirectToHome: RedirectToHome, utils: Utils}}
 */
function initializeMiddleware({shareLinksProvider, urlService}) {
    const errorHandler = new ErrorHandler(urlService);
    const redirectToHome = new RedirectToHome(urlService);
    const utils = new Utils(urlService, shareLinksProvider);
    return {errorHandler, redirectToHome, utils};
}

/**
 * Initialize controllers.
 *
 * @param {object} dependencies
 * @param {Mailer} dependencies.mailer
 * @param {UrlService} dependencies.urlService
 * @return {{contactMeController: ContactMeController, homeController: HomeController}}
 */
function initializeControllers({mailer, urlService}) {
    const contactMeController = new ContactMeController(mailer, urlService);
    const homeController = new HomeController();
    return {contactMeController, homeController};
}

const services = initializeServices();
const middleware = initializeMiddleware(services);
const controllers = initializeControllers(services);

export default {services, middleware, controllers};
