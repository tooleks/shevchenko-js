import * as servicesFactory from '../../services/factory';
import ContactMeController from './ContactMeController';
import HomeController from './HomeController';

/** @return {ContactMeController} */
export function contactMeController() {
  return new ContactMeController(servicesFactory.mailer(), servicesFactory.urlService());
}

/** @return {HomeController} */
export function homeController() {
  return new HomeController();
}
