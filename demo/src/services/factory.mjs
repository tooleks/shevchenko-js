import MailgunMailerDriver from './MailgunMailerDriver';
import Mailer from './Mailer';
import ShareLinksProvider from './ShareLinksProvider';
import UrlService from './UrlService';

/** @return {MailgunMailerDriver} */
export function mailgunMailDriver() {
  return new MailgunMailerDriver();
}

/** @return {Mailer} */
export function mailer() {
  return new Mailer(mailgunMailDriver());
}

/** @return {ShareLinksProvider} */
export function shareLinksProvider() {
  return new ShareLinksProvider();
}

/** @return {UrlService} */
export function urlService() {
  return new UrlService();
}
