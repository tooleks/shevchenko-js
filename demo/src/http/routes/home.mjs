export default function (app, dc) {
    app.get("/", dc.controllers.homeController.index);
}