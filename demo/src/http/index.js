import {mailer, urlService} from "../services";

import ContactMeController from "./ContactMeController";
import HomeController from "./HomeController";

const contactMeController = new ContactMeController(mailer, urlService);
const homeController = new HomeController();

export {contactMeController, homeController};
