'use strict';

class HomeController {
  /**
   */
  constructor() {
    this.index = this.index.bind(this);
  }

  /**
   * Render home page.
   *
   * @param req
   * @param res
   */
  index(req, res) {
    res.render('home.ejs', { flashes: req.flash('flashes') });
  }
}

module.exports = HomeController;
