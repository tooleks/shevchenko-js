export default function(app, dc) {
    app.post("/contact-me", dc.controllers.contactMeController.send);
}
