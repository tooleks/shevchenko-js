import * as servicesFactory from '../../services/factory';
import ErrorHandler from './ErrorHandler';
import RedirectToHome from './RedirectToHome';
import Utils from './Utils';

/** @return {function} */
export function errorHandler() {
  return new ErrorHandler(servicesFactory.urlService()).handle;
}

/** @return {function} */
export function redirectToHome() {
  return new RedirectToHome(servicesFactory.urlService()).handle;
}

/** @return {function} */
export function utils() {
  return new Utils(servicesFactory.urlService(), servicesFactory.shareLinksProvider()).handle;
}
