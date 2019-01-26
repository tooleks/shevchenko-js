import * as servicesFactory from '../../services/factory';
import ErrorHandler from './ErrorHandler';
import RedirectToHome from './RedirectToHome';
import Utils from './Utils';

/** @return {ErrorHandler} */
export function errorHandler() {
  return new ErrorHandler(servicesFactory.urlService());
}

/** @return {RedirectToHome} */
export function redirectToHome() {
  return new RedirectToHome(servicesFactory.urlService());
}

/** @return {Utils} */
export function utils() {
  return new Utils(servicesFactory.urlService(), servicesFactory.shareLinksProvider());
}
