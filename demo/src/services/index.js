import Mailer from "./Mailer";
import MailgunMailerDriver from "./MailgunMailerDriver";
import ShareLinksProvider from "./ShareLinksProvider";
import UrlService from "./UrlService";

const mailgunMailDriver = new MailgunMailerDriver();
const mailer = new Mailer(mailgunMailDriver);
const shareLinksProvider = new ShareLinksProvider();
const urlService = new UrlService();

export {mailer, shareLinksProvider, urlService};
