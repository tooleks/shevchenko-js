import ContactMeController from "./ContactMeController";
import HomeController from "./HomeController";
import * as servicesFactory from "../../services/factory";

/** @return {ContactMeController} */
export function contactMeController() {
    return new ContactMeController(servicesFactory.mailer(), servicesFactory.urlService());
}

/** @return {HomeController} */
export function homeController() {
    return new HomeController();
}
