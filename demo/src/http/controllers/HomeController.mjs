/**
 * HomeController class.
 */
export default class HomeController {
    /**
     * HomeController constructor.
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
        res.render("home.ejs", {flashes: req.flash("flashes")});
    }
}
