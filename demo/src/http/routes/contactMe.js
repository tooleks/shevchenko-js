/**
 * @param {MailgunMailer} mailer
 * @param {UrlService} urlService
 */
module.exports = (mailer, urlService) => {
  return async (req, res, next) => {
    try {
      await mailer.send({
        from: `${req.body.name} <${req.body.email}>`,
        to: process.env.APP_EMAIL,
        subject: `${process.env.APP_NAME} - ${req.__('contactMe')}`,
        text: req.body.message,
      });
      req.flash('flashes', { type: 'success', message: req.__('messageSent') });
      res.redirect(urlService.getUrl('/', req.getLocale()));
    } catch (err) {
      next(err);
    }
  };
};
