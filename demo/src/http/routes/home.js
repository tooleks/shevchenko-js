module.exports = () => (req, res, next) => {
  try {
    res.render('home.ejs', { flashes: req.flash('flashes') });
  } catch (err) {
    next(err);
  }
};
